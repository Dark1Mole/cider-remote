import {
  extractErrorCode,
  formatNetworkError,
  isMissingScopeError,
  isTimeoutError,
  parseCiderErrorPayload,
} from "./CiderErrors";
import {
  CIDER_DEFAULT_PORT,
  CIDER_DEFAULT_TIMEOUT_MS,
  CiderApiConfig,
  CiderApiDebugResult,
  CiderApiRequest,
  HttpMethod,
} from "./CiderTypes";

export function normalizeHost(host: string): string {
  return host
    .trim()
    .replace(/^https?:\/\//, "")
    .replace(/\/+$/, "")
    .split(":")[0];
}

export function buildBaseUrl(host: string, port: number = CIDER_DEFAULT_PORT): string {
  const normalizedHost = normalizeHost(host);
  return `http://${normalizedHost}:${port}`;
}

export class CiderApiClient {
  private config: CiderApiConfig;

  constructor(config: CiderApiConfig) {
    this.config = {
      timeoutMs: CIDER_DEFAULT_TIMEOUT_MS,
      ...config,
      host: normalizeHost(config.host),
    };
  }

  updateConfig(config: Partial<CiderApiConfig>): void {
    this.config = {
      ...this.config,
      ...config,
      host: config.host ? normalizeHost(config.host) : this.config.host,
    };
  }

  getBaseUrl(): string {
    return buildBaseUrl(this.config.host, this.config.port);
  }

  async runDebugRequest(
    request: CiderApiRequest,
    apiVersion: "v2" | "v1" = "v2"
  ): Promise<CiderApiDebugResult> {
    const baseUrl = this.getBaseUrl();
    const endpoint = `${baseUrl}${request.path}`;
    const requestBody =
      request.body !== undefined ? JSON.stringify(request.body, null, 2) : null;

    const startedAt = Date.now();

    try {
      const response = await this.fetchWithTimeout(endpoint, {
        method: request.method,
        headers: this.buildHeaders(request.method),
        body: requestBody,
      });

      const responseTimeMs = Date.now() - startedAt;
      const rawText = await response.text();
      const rawJson = rawText.length > 0 ? rawText : null;
      const payload = parseCiderErrorPayload(rawJson);
      let parsedResult: unknown = null;

      if (rawJson) {
        try {
          parsedResult = JSON.parse(rawJson);
        } catch {
          parsedResult = rawText;
        }
      }

      const success = response.ok;
      const errorCode = success ? null : extractErrorCode(payload);

      if (__DEV__) {
        console.log(
          `[CiderApi] ${request.method} ${request.path} -> ${response.status} (${responseTimeMs}ms)`
        );
        if (!success) {
          console.warn("[CiderApi] Error response:", rawJson);
        }
      }

      return {
        id: request.id,
        label: request.label,
        path: request.path,
        endpoint,
        method: request.method,
        requestBody,
        statusCode: response.status,
        responseTimeMs,
        rawJson,
        parsedResult,
        errorCode,
        missingScopeError: isMissingScopeError(payload),
        timeoutError: false,
        networkError: success ? null : (errorCode ?? `HTTP ${response.status}`),
        success,
        apiVersion,
      };
    } catch (error) {
      const responseTimeMs = Date.now() - startedAt;
      const timeoutError = isTimeoutError(error);
      const networkError = formatNetworkError(error);

      if (__DEV__) {
        console.error(
          `[CiderApi] ${request.method} ${request.path} failed:`,
          networkError
        );
      }

      return {
        id: request.id,
        label: request.label,
        path: request.path,
        endpoint,
        method: request.method,
        requestBody,
        statusCode: null,
        responseTimeMs,
        rawJson: null,
        parsedResult: null,
        errorCode: timeoutError ? "TIMEOUT" : "NETWORK_ERROR",
        missingScopeError: false,
        timeoutError,
        networkError,
        success: false,
        apiVersion,
      };
    }
  }

  private buildHeaders(method: HttpMethod): Record<string, string> {
    const headers: Record<string, string> = {
      Accept: "application/json",
    };

    if (method !== "GET" && method !== "DELETE") {
      headers["Content-Type"] = "application/json";
    }

    if (this.config.token) {
      headers.apptoken = this.config.token;
    }

    return headers;
  }

  private async fetchWithTimeout(
    url: string,
    init: RequestInit
  ): Promise<Response> {
    const controller = new AbortController();
    const timeoutMs = this.config.timeoutMs ?? CIDER_DEFAULT_TIMEOUT_MS;
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
      return await fetch(url, {
        ...init,
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timeoutId);
    }
  }
}
