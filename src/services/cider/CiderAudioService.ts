import { parseVolume } from "@/src/utils/apiParsing";
import { getCiderClient } from "./clientInstance";

export class CiderAudioService {
  async getVolume() {
    const result = await getCiderClient().request("GET", "/api/v2/audio/volume", undefined, { retry: true });
    return { ...result, volume: result.data ? parseVolume(result.data) : null };
  }

  async setVolume(volume: number) {
    const normalized = volume > 1 ? volume / 100 : volume;
    return getCiderClient().request("PATCH", "/api/v2/audio/volume", { volume: normalized, value: normalized });
  }
}

export const ciderAudioService = new CiderAudioService();
