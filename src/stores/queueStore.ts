import { create } from "zustand";
import { ciderQueueService } from "@/src/services/cider/CiderQueueService";
import type { QueueItem } from "@/src/services/cider/CiderTypes";

type QueueStore = {
  items: QueueItem[];
  currentIndex: number | null;
  loading: boolean;
  error: string | null;
  refreshQueue: () => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  moveItem: (fromIndex: number, toIndex: number) => Promise<void>;
};

export const useQueueStore = create<QueueStore>((set) => ({
  items: [],
  currentIndex: null,
  loading: false,
  error: null,
  refreshQueue: async () => {
    set({ loading: true, error: null });
    const result = await ciderQueueService.getQueue();
    set({
      items: result.items,
      currentIndex: result.currentIndex,
      loading: false,
      error: result.ok ? null : result.error,
    });
  },
  removeItem: async (id) => {
    await ciderQueueService.remove(id);
    const result = await ciderQueueService.getQueue();
    set({ items: result.items, currentIndex: result.currentIndex });
  },
  moveItem: async (fromIndex, toIndex) => {
    await ciderQueueService.move(fromIndex, toIndex);
    const result = await ciderQueueService.getQueue();
    set({ items: result.items, currentIndex: result.currentIndex });
  },
}));
