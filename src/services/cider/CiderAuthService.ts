import { getCiderClient } from "./clientInstance";

export class CiderAuthService {
  async getClientInfo() {
    return getCiderClient().request("GET", "/api/v2/client/info", undefined, { retry: true });
  }

  async requestToken(body: Record<string, unknown> = {}) {
    return getCiderClient().request("POST", "/api/v2/auth/request", body);
  }
}

export const ciderAuthService = new CiderAuthService();
