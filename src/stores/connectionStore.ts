import { create } from "zustand";
import { configureCiderClient } from "@/src/services/cider/clientInstance";
import { ciderAuthService } from "@/src/services/cider/CiderAuthService";
import { ciderEventsService } from "@/src/services/cider/CiderEventsService";
import { loadConnection, saveConnection, type SavedDevice, loadSavedDevices, saveSavedDevices } from "@/src/services/storage/connectionStorage";
import { hapticError, hapticSuccess } from "@/src/utils/haptics";

type ConnectionState = {
  host: string;
  port: number;
  token: string | null;
  connected: boolean;
  connecting: boolean;
  lastError: string | null;
  lastConnectedAt: string | null;
  savedDevices: SavedDevice[];
  eventsState: "disconnected" | "connecting" | "connected" | "polling";
  setHost: (host: string) => void;
  setPort: (port: number) => void;
  setToken: (token: string | null) => void;
  loadSavedConnection: () => Promise<void>;
  saveConnection: () => Promise<void>;
  testConnection: () => Promise<boolean>;
  connect: () => Promise<boolean>;
  disconnect: () => void;
  addSavedDevice: (device: SavedDevice) => Promise<void>;
};

export const useConnectionStore = create<ConnectionState>((set, get) => ({
  host: "127.0.0.1",
  port: 10767,
  token: null,
  connected: false,
  connecting: false,
  lastError: null,
  lastConnectedAt: null,
  savedDevices: [],
  eventsState: "disconnected",
  setHost: (host) => set({ host }),
  setPort: (port) => set({ port }),
  setToken: (token) => set({ token }),
  loadSavedConnection: async () => {
    const saved = await loadConnection();
    const devices = await loadSavedDevices();
    if (saved) {
      set({ host: saved.host, port: saved.port, token: saved.token, savedDevices: devices });
      configureCiderClient(saved);
    } else {
      set({ savedDevices: devices });
    }
  },
  saveConnection: async () => {
    const { host, port, token } = get();
    await saveConnection(host, port, token);
  },
  testConnection: async () => {
    const { host, port, token } = get();
    configureCiderClient({ host, port, token });
    set({ connecting: true, lastError: null });
    const result = await ciderAuthService.getClientInfo();
    set({ connecting: false });
    if (result.ok) {
      await hapticSuccess();
      return true;
    }
    set({ lastError: result.error ?? "Connection failed" });
    await hapticError();
    return false;
  },
  connect: async () => {
    const { host, port, token } = get();
    configureCiderClient({ host, port, token });
    set({ connecting: true, lastError: null });
    const ok = await ciderAuthService.getClientInfo().then((r) => r.ok);
    if (!ok) {
      set({ connecting: false, connected: false, lastError: "Unable to reach Cider" });
      await hapticError();
      return false;
    }
    await get().saveConnection();
    ciderEventsService.setCallbacks({
      onConnectionChange: (state) => set({ eventsState: state }),
      onPlaybackUpdate: () => {
        import("@/src/stores/playbackStore").then(({ usePlaybackStore }) => usePlaybackStore.getState().refreshPlayback());
      },
      onQueueUpdate: () => {
        import("@/src/stores/queueStore").then(({ useQueueStore }) => useQueueStore.getState().refreshQueue());
      },
      onVolumeUpdate: () => {
        import("@/src/stores/playbackStore").then(({ usePlaybackStore }) => usePlaybackStore.getState().refreshVolume());
      },
    });
    await ciderEventsService.connect(host, port, token);
    set({ connecting: false, connected: true, lastConnectedAt: new Date().toISOString() });
    await hapticSuccess();
    return true;
  },
  disconnect: () => {
    ciderEventsService.disconnect();
    set({ connected: false, eventsState: "disconnected" });
  },
  addSavedDevice: async (device) => {
    const devices = [...get().savedDevices.filter((d) => d.id !== device.id), device];
    set({ savedDevices: devices });
    await saveSavedDevices(devices);
  },
}));
