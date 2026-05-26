import { parsePlaybackStatus, parseProgress, parseRepeatMode, parseTrack } from "@/src/utils/apiParsing";
import type { PlaybackStatus, RepeatMode, Track } from "./CiderTypes";
import { getCiderClient } from "./clientInstance";

export type PlaybackSnapshot = {
  track: Track | null;
  state: PlaybackStatus;
  progressMs: number;
  durationMs: number;
  shuffle: boolean;
  repeat: RepeatMode;
  autoplay: boolean;
};

function parseSnapshot(raw: unknown): PlaybackSnapshot {
  const obj = raw && typeof raw === "object" ? (raw as Record<string, unknown>) : {};
  const trackRaw = obj.nowPlaying ?? obj.track ?? obj.item ?? obj.current ?? raw;
  const progress = parseProgress(obj);
  return {
    track: parseTrack(trackRaw),
    state: parsePlaybackStatus(obj.state ?? obj),
    progressMs: progress.progressMs,
    durationMs: progress.durationMs,
    shuffle: Boolean(obj.shuffle ?? obj.shuffleMode),
    repeat: parseRepeatMode(obj),
    autoplay: Boolean(obj.autoplay),
  };
}

export class CiderPlaybackService {
  async getPlayback() {
    const result = await getCiderClient().request("GET", "/api/v2/playback", undefined, { retry: true });
    return { ...result, snapshot: result.data ? parseSnapshot(result.data) : null };
  }

  async getState() {
    const result = await getCiderClient().request("GET", "/api/v2/playback/state", undefined, { retry: true });
    return { ...result, state: result.data ? parsePlaybackStatus(result.data) : "unknown" as PlaybackStatus };
  }

  async toggle() {
    return getCiderClient().request("POST", "/api/v2/playback/toggle");
  }

  async next() {
    return getCiderClient().request("POST", "/api/v2/playback/next");
  }

  async previous() {
    return getCiderClient().request("POST", "/api/v2/playback/previous");
  }

  async seek(positionMs: number) {
    return getCiderClient().request("PATCH", "/api/v2/playback/seek", { positionMs, position: positionMs });
  }

  async setShuffle(enabled: boolean) {
    return getCiderClient().request("PATCH", "/api/v2/playback/shuffle", { enabled, shuffle: enabled });
  }

  async setRepeat(mode: RepeatMode) {
    return getCiderClient().request("PATCH", "/api/v2/playback/repeat", { mode, repeat: mode });
  }

  async setAutoplay(enabled: boolean) {
    return getCiderClient().request("PATCH", "/api/v2/playback/autoplay", { enabled, autoplay: enabled });
  }
}

export const ciderPlaybackService = new CiderPlaybackService();
