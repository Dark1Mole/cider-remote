import { CiderApiClient } from "./CiderApiClient";

let sharedClient: CiderApiClient | null = null;

export function getCiderClient(): CiderApiClient {
  if (!sharedClient) {
    sharedClient = new CiderApiClient({ host: "127.0.0.1", port: 10767 });
  }
  return sharedClient;
}

export function configureCiderClient(config: Parameters<CiderApiClient["updateConfig"]>[0]): CiderApiClient {
  const client = getCiderClient();
  client.updateConfig(config);
  return client;
}
