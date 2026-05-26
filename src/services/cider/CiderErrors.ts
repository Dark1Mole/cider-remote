export type CiderErrorPayload = {
  error?: string;
  code?: string;
  message?: string;
  statusCode?: number;
};

const SCOPE_ERROR_PATTERNS = [
  "INSUFFICIENT_SCOPE",
  "MISSING_SCOPE",
  "SCOPE_REQUIRED",
  "FORBIDDEN_SCOPE",
];

export function parseCiderErrorPayload(raw: string | null): CiderErrorPayload | null {
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as CiderErrorPayload;
  } catch {
    return { message: raw };
  }
}

export function extractErrorCode(payload: CiderErrorPayload | null): string | null {
  if (!payload) {
    return null;
  }

  return payload.error ?? payload.code ?? payload.message ?? null;
}

export function isMissingScopeError(payload: CiderErrorPayload | null): boolean {
  const code = extractErrorCode(payload);
  if (!code) {
    return false;
  }

  const normalized = code.toUpperCase();
  return SCOPE_ERROR_PATTERNS.some((pattern) => normalized.includes(pattern));
}

export function formatNetworkError(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return String(error);
}

export function isTimeoutError(error: unknown): boolean {
  if (!(error instanceof Error)) {
    return false;
  }

  return (
    error.name === "AbortError" ||
    error.message.toLowerCase().includes("timeout") ||
    error.message.toLowerCase().includes("aborted")
  );
}
