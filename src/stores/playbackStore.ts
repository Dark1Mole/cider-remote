import { create } from "zustand";
import { ciderAudioService } from "@/src/services/cider/CiderAudioService";
import { ciderEventsService } from "@/src/services/cider/CiderEventsService";
import { ciderPlaybackService } from "@/src/services/cider/CiderPlaybackService";
import type { PlaybackStatus, RepeatMode, Track } from "@/src/services/cider/CiderTypes";
import { hapticLight, hapticSelection } from "@/src/utils/haptics";

type PlaybackStore = {
  state: PlaybackStatus;
  nowPlaying: Track | null;
  progressMs: number;
  durationMs: number;
  volume: number;
  shuffle: boolean;
  repeat: RepeatMode;
  autoplay: boolean;
  loading: boolean;
  error: string | null;
  refreshPlayback: () => Promise<void>;
  refreshVolume: () => Promise<void>;
  togglePlayPause: () => Promise<void>;
  next: () => Promise<void>;
  previous: () => Promise<void>;
  seek: (positionMs: number) => Promise<void>;
  setVolume: (volume: number) => Promise<void>;
  setShuffle: (enabled: boolean) => Promise<void>;
  setRepeat: (mode: RepeatMode) => Promise<void>;
  tickProgress: () => void;
};

export const usePlaybackStore = create<PlaybackStore>((set, get) => ({
  state: "unknown",
  nowPlaying: null,
  progressMs: 0,
  durationMs: 0,
  volume: 0.5,
  shuffle: false,
  repeat: "off",
  autoplay: false,
  loading: false,
  error: null,
  refreshPlayback: async () => {
    set({ loading: true, error: null });
    const result = await ciderPlaybackService.getPlayback();
    if (result.snapshot) {
      const { snapshot } = result;
      ciderEventsService.updateLocalProgress(snapshot.progressMs, snapshot.state === "playing");
      set({
        state: snapshot.state,
        nowPlaying: snapshot.track,
        progressMs: snapshot.progressMs,
        durationMs: snapshot.durationMs,
        shuffle: snapshot.shuffle,
        repeat: snapshot.repeat,
        autoplay: snapshot.autoplay,
        loading: false,
      });
      return;
    }
    set({ loading: false, error: result.error ?? null });
  },
  refreshVolume: async () => {
    const result = await ciderAudioService.getVolume();
    if (result.volume !== null) set({ volume: result.volume });
  },
  togglePlayPause: async () => {
    await hapticLight();
    await ciderPlaybackService.toggle();
    await get().refreshPlayback();
  },
  next: async () => {
    await hapticLight();
    await ciderPlaybackService.next();
    await get().refreshPlayback();
  },
  previous: async () => {
    await hapticLight();
    await ciderPlaybackService.previous();
    await get().refreshPlayback();
  },
  seek: async (positionMs) => {
    await hapticSelection();
    await ciderPlaybackService.seek(positionMs);
    ciderEventsService.updateLocalProgress(positionMs, get().state === "playing");
    set({ progressMs: positionMs });
  },
  setVolume: async (volume) => {
    await hapticSelection();
    await ciderAudioService.setVolume(volume);
    set({ volume });
  },
  setShuffle: async (enabled) => {
    await ciderPlaybackService.setShuffle(enabled);
    set({ shuffle: enabled });
  },
  setRepeat: async (mode) => {
    await ciderPlaybackService.setRepeat(mode);
    set({ repeat: mode });
  },
  tickProgress: () => {
    const { state, progressMs, durationMs } = get();
    if (state === "playing" && durationMs > 0 && progressMs < durationMs) {
      set({ progressMs: progressMs + 1000 });
    }
  },
}));
