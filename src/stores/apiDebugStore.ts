import { create } from "zustand";
import type { CiderApiDebugResult } from "@/src/services/cider/CiderTypes";

type ApiDebugStore = {
  results: Record<string, CiderApiDebugResult>;
  logs: string[];
  setResult: (result: CiderApiDebugResult) => void;
  appendLog: (message: string) => void;
  clear: () => void;
  exportLogs: () => string;
};

export const useApiDebugStore = create<ApiDebugStore>((set, get) => ({
  results: {},
  logs: [],
  setResult: (result) =>
    set((state) => ({
      results: { ...state.results, [result.id]: result },
      logs: [...state.logs, `${result.method} ${result.path} -> ${result.statusCode ?? "ERR"} (${result.responseTimeMs}ms)`],
    })),
  appendLog: (message) => set((state) => ({ logs: [...state.logs, message] })),
  clear: () => set({ results: {}, logs: [] }),
  exportLogs: () => {
    const { results, logs } = get();
    return JSON.stringify({ logs, results }, null, 2);
  },
}));
