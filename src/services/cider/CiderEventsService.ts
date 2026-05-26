import { AppState, AppStateStatus } from "react-native";
import { io, Socket } from "socket.io-client";
import { configureCiderClient, getCiderClient } from "./clientInstance";
import { ciderAudioService } from "./CiderAudioService";
import { ciderPlaybackService } from "./CiderPlaybackService";
import { ciderQueueService } from "./CiderQueueService";

export type EventsConnectionState = "disconnected" | "connecting" | "connected" | "polling";

type EventsCallbacks = {
  onPlaybackUpdate?: () => void;
  onQueueUpdate?: () => void;
  onVolumeUpdate?: () => void;
  onConnectionChange?: (state: EventsConnectionState) => void;
};

const PLAYBACK_POLL_MS = 2000;
const QUEUE_POLL_MS = 5000;
const VOLUME_POLL_MS = 5000;

export class CiderEventsService {
  private socket: Socket | null = null;
  private callbacks: EventsCallbacks = {};
  private connectionState: EventsConnectionState = "disconnected";
  private pollingTimers: ReturnType<typeof setInterval>[] = [];
  private appState: AppStateStatus = AppState.currentState;
  private appStateSub: { remove: () => void } | null = null;
  private progressTimer: ReturnType<typeof setInterval> | null = null;
  private localProgressMs = 0;
  private localIsPlaying = false;

  setCallbacks(callbacks: EventsCallbacks) {
    this.callbacks = callbacks;
  }

  async connect(host: string, port: number, token: string | null) {
    this.disconnect();
    configureCiderClient({ host, port, token });
    this.setState("connecting");

    try {
      const socket = io(getCiderClient().getBaseUrl(), {
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        timeout: 10000,
        transports: ["websocket", "polling"],
        extraHeaders: token ? { apptoken: token } : undefined,
      });

      this.socket = socket;

      socket.on("connect", () => {
        this.setState("connected");
        this.stopPolling();
      });

      socket.on("disconnect", () => {
        this.startPolling();
      });

      const notifyPlayback = () => this.callbacks.onPlaybackUpdate?.();
      const notifyQueue = () => this.callbacks.onQueueUpdate?.();
      const notifyVolume = () => this.callbacks.onVolumeUpdate?.();

      socket.on("API:Playback", notifyPlayback);
      socket.on("playbackUpdate", notifyPlayback);
      socket.on("songUpdate", notifyPlayback);
      socket.on("statesUpdate", notifyPlayback);
      socket.on("queueUpdate", notifyQueue);
      socket.on("volumeUpdate", notifyVolume);

      socket.on("connect_error", () => {
        this.startPolling();
      });

      this.appStateSub = AppState.addEventListener("change", this.handleAppState);
      this.startLocalProgressTimer();

      setTimeout(() => {
        if (this.connectionState === "connecting") {
          this.startPolling();
        }
      }, 3000);
    } catch {
      this.startPolling();
    }
  }

  disconnect() {
    this.socket?.disconnect();
    this.socket = null;
    this.stopPolling();
    this.stopLocalProgressTimer();
    this.appStateSub?.remove();
    this.appStateSub = null;
    this.setState("disconnected");
  }

  updateLocalProgress(progressMs: number, isPlaying: boolean) {
    this.localProgressMs = progressMs;
    this.localIsPlaying = isPlaying;
  }

  getLocalProgressMs() {
    return this.localProgressMs;
  }

  private handleAppState = (nextState: AppStateStatus) => {
    this.appState = nextState;
    if (nextState === "active" && this.connectionState === "polling") {
      this.startPolling();
    } else if (nextState !== "active") {
      this.stopPolling();
    }
  };

  private setState(state: EventsConnectionState) {
    this.connectionState = state;
    this.callbacks.onConnectionChange?.(state);
  }

  private startPolling() {
    if (this.appState !== "active") return;
    this.stopPolling();
    this.setState("polling");

    this.pollingTimers.push(
      setInterval(async () => {
        await ciderPlaybackService.getPlayback();
        this.callbacks.onPlaybackUpdate?.();
      }, PLAYBACK_POLL_MS)
    );

    this.pollingTimers.push(
      setInterval(async () => {
        await ciderQueueService.getQueue();
        this.callbacks.onQueueUpdate?.();
      }, QUEUE_POLL_MS)
    );

    this.pollingTimers.push(
      setInterval(async () => {
        await ciderAudioService.getVolume();
        this.callbacks.onVolumeUpdate?.();
      }, VOLUME_POLL_MS)
    );
  }

  private stopPolling() {
    this.pollingTimers.forEach(clearInterval);
    this.pollingTimers = [];
  }

  private startLocalProgressTimer() {
    this.stopLocalProgressTimer();
    this.progressTimer = setInterval(() => {
      if (this.localIsPlaying) {
        this.localProgressMs += 1000;
        this.callbacks.onPlaybackUpdate?.();
      }
    }, 1000);
  }

  private stopLocalProgressTimer() {
    if (this.progressTimer) clearInterval(this.progressTimer);
    this.progressTimer = null;
  }
}

export const ciderEventsService = new CiderEventsService();
