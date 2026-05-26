import { parseQueueItems } from "@/src/utils/apiParsing";
import type { QueueItem } from "./CiderTypes";
import { getCiderClient } from "./clientInstance";

export class CiderQueueService {
  async getQueue() {
    const result = await getCiderClient().request("GET", "/api/v2/queue", undefined, { retry: true });
    const items: QueueItem[] = result.data ? parseQueueItems(result.data) : [];
    const currentIndex = items.findIndex((_, i) => i === 0);
    return { ...result, items, currentIndex: currentIndex >= 0 ? currentIndex : null };
  }

  async addNext(payload: Record<string, unknown>) {
    return getCiderClient().request("POST", "/api/v2/queue/add-next", payload);
  }

  async addLater(payload: Record<string, unknown>) {
    return getCiderClient().request("POST", "/api/v2/queue/add-later", payload);
  }

  async move(fromIndex: number, toIndex: number) {
    return getCiderClient().request("PATCH", "/api/v2/queue/move", { fromIndex, toIndex, startIndex: fromIndex, destinationIndex: toIndex });
  }

  async remove(id: string) {
    return getCiderClient().request("DELETE", `/api/v2/queue/${encodeURIComponent(id)}`);
  }
}

export const ciderQueueService = new CiderQueueService();
