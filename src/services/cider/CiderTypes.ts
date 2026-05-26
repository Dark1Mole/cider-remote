export type HttpMethod = "GET" | "POST" | "PATCH" | "DELETE";

export type CiderApiConfig = {
  host: string;
  port: number;
  token?: string | null;
  timeoutMs?: number;
};

export type CiderApiRequest = {
  method: HttpMethod;
  path: string;
  body?: unknown;
  label: string;
  id: string;
};

export type CiderApiDebugResult = {
  id: string;
  label: string;
  path: string;
  endpoint: string;
  method: HttpMethod;
  requestBody: string | null;
  statusCode: number | null;
  responseTimeMs: number;
  rawJson: string | null;
  parsedResult: unknown;
  errorCode: string | null;
  missingScopeError: boolean;
  timeoutError: boolean;
  networkError: string | null;
  success: boolean;
  apiVersion: "v2" | "v1";
};

export const CIDER_DEFAULT_PORT = 10767;
export const CIDER_DEFAULT_TIMEOUT_MS = 10_000;

export const API_V2_TESTS: CiderApiRequest[] = [
  {
    id: "client-info",
    label: "Client Info",
    method: "GET",
    path: "/api/v2/client/info",
  },
  {
    id: "auth-request",
    label: "Auth Request",
    method: "POST",
    path: "/api/v2/auth/request",
    body: {},
  },
  {
    id: "playback",
    label: "Playback",
    method: "GET",
    path: "/api/v2/playback",
  },
  {
    id: "playback-state",
    label: "Playback State",
    method: "GET",
    path: "/api/v2/playback/state",
  },
  {
    id: "queue",
    label: "Queue",
    method: "GET",
    path: "/api/v2/queue",
  },
  {
    id: "volume",
    label: "Volume",
    method: "GET",
    path: "/api/v2/audio/volume",
  },
  {
    id: "playlists",
    label: "Library Playlists",
    method: "GET",
    path: "/api/v2/library/playlists",
  },
];

/** Known v1 fallbacks — only used after v2 failure is confirmed. */
export const API_V1_FALLBACKS: Partial<Record<string, CiderApiRequest>> = {
  "client-info": {
    id: "client-info-v1",
    label: "Client Info (v1 fallback)",
    method: "GET",
    path: "/api/v1/playback/active",
  },
  playback: {
    id: "playback-v1",
    label: "Playback (v1 fallback)",
    method: "GET",
    path: "/api/v1/playback/now-playing",
  },
  "playback-state": {
    id: "playback-state-v1",
    label: "Playback State (v1 fallback)",
    method: "GET",
    path: "/api/v1/playback/is-playing",
  },
  queue: {
    id: "queue-v1",
    label: "Queue (v1 fallback)",
    method: "GET",
    path: "/api/v1/playback/queue",
  },
  volume: {
    id: "volume-v1",
    label: "Volume (v1 fallback)",
    method: "GET",
    path: "/api/v1/playback/volume",
  },
};
