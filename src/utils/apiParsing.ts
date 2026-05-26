import type { AlbumSummary, ArtistSummary, PlaybackStatus, PlaylistSummary, QueueItem, RepeatMode, Track } from "@/src/services/cider/CiderTypes";

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" ? (value as Record<string, unknown>) : null;
}

function pickString(obj: Record<string, unknown> | null, keys: string[]): string {
  if (!obj) return "";
  for (const key of keys) {
    const val = obj[key];
    if (typeof val === "string" && val.length > 0) return val;
  }
  return "";
}

function pickNumber(obj: Record<string, unknown> | null, keys: string[]): number | undefined {
  if (!obj) return undefined;
  for (const key of keys) {
    const val = obj[key];
    if (typeof val === "number") return val;
  }
  return undefined;
}

export function parseTrack(raw: unknown): Track | null {
  const obj = asRecord(raw);
  if (!obj) return null;
  const attrs = asRecord(obj.attributes) ?? obj;
  const id = pickString(obj, ["id", "trackId", "adamId"]) || pickString(attrs, ["id", "trackId"]);
  const title = pickString(attrs, ["name", "title", "trackName"]);
  if (!title) return null;
  return {
    id: id || title,
    title,
    artist: pickString(attrs, ["artistName", "artist", "subtitle"]),
    album: pickString(attrs, ["albumName", "album"]),
    artworkUrl: pickString(attrs, ["artworkUrl", "artwork", "thumbnailUrl"]) || undefined,
    durationMs: pickNumber(attrs, ["durationInMillis", "durationMs", "duration"]),
  };
}

export function parsePlaybackStatus(raw: unknown): PlaybackStatus {
  const obj = asRecord(raw);
  if (!obj) return "unknown";
  const state = pickString(obj, ["state", "status", "playbackState"]).toLowerCase();
  if (state.includes("play")) return "playing";
  if (state.includes("pause")) return "paused";
  if (state.includes("stop")) return "stopped";
  if (obj.isPlaying === true) return "playing";
  if (obj.isPlaying === false) return "paused";
  return "unknown";
}

export function parseRepeatMode(raw: unknown): RepeatMode {
  const obj = asRecord(raw);
  const value = pickString(obj, ["repeat", "repeatMode", "mode"]).toLowerCase();
  if (value.includes("one")) return "one";
  if (value.includes("all")) return "all";
  if (obj?.repeatMode === 1) return "one";
  if (obj?.repeatMode === 2) return "all";
  return "off";
}

export function parseQueueItems(raw: unknown): QueueItem[] {
  const obj = asRecord(raw);
  const list = Array.isArray(raw)
    ? raw
    : Array.isArray(obj?.items)
      ? obj!.items
      : obj && Array.isArray(obj.queue)
        ? obj.queue
        : obj && Array.isArray(obj.data)
          ? obj.data
          : [];

  return list
    .map((item, index) => {
      const track = parseTrack(item);
      if (!track) return null;
      const itemObj = asRecord(item);
      return {
        id: track.id,
        track,
        index: pickNumber(itemObj, ["index", "queueIndex"]) ?? index,
      };
    })
    .filter((item): item is QueueItem => item !== null);
}

export function parsePlaylistSummaries(raw: unknown): PlaylistSummary[] {
  const obj = asRecord(raw);
  const list = Array.isArray(raw) ? raw : Array.isArray(obj?.playlists) ? obj!.playlists : Array.isArray(obj?.data) ? obj!.data : [];
  const results: PlaylistSummary[] = [];
  for (const item of list) {
    const record = asRecord(item);
    const attrs = asRecord(record?.attributes) ?? record;
    const name = pickString(attrs, ["name", "title"]);
    if (!name) continue;
    results.push({
      id: pickString(record, ["id"]) || name,
      name,
      artworkUrl: pickString(attrs, ["artworkUrl", "artwork"]) || undefined,
      trackCount: pickNumber(attrs, ["trackCount", "count"]),
    });
  }
  return results;
}

export function parseAlbumSummaries(raw: unknown): AlbumSummary[] {
  const obj = asRecord(raw);
  const list = Array.isArray(raw) ? raw : Array.isArray(obj?.albums) ? obj!.albums : Array.isArray(obj?.data) ? obj!.data : [];
  const results: AlbumSummary[] = [];
  for (const item of list) {
    const record = asRecord(item);
    const attrs = asRecord(record?.attributes) ?? record;
    const name = pickString(attrs, ["name", "title"]);
    if (!name) continue;
    results.push({
      id: pickString(record, ["id"]) || name,
      name,
      artist: pickString(attrs, ["artistName", "artist"]),
      artworkUrl: pickString(attrs, ["artworkUrl", "artwork"]) || undefined,
    });
  }
  return results;
}

export function parseArtistSummaries(raw: unknown): ArtistSummary[] {
  const obj = asRecord(raw);
  const list = Array.isArray(raw) ? raw : Array.isArray(obj?.artists) ? obj!.artists : Array.isArray(obj?.data) ? obj!.data : [];
  const results: ArtistSummary[] = [];
  for (const item of list) {
    const record = asRecord(item);
    const attrs = asRecord(record?.attributes) ?? record;
    const name = pickString(attrs, ["name", "title"]);
    if (!name) continue;
    results.push({
      id: pickString(record, ["id"]) || name,
      name,
      artworkUrl: pickString(attrs, ["artworkUrl", "artwork"]) || undefined,
    });
  }
  return results;
}

export function parseVolume(raw: unknown): number | null {
  const obj = asRecord(raw);
  if (!obj) return null;
  const value = pickNumber(obj, ["volume", "value", "level"]);
  if (value === undefined) return null;
  return value > 1 ? value / 100 : value;
}

export function parseProgress(raw: unknown): { progressMs: number; durationMs: number } {
  const obj = asRecord(raw);
  return {
    progressMs: pickNumber(obj, ["progressMs", "currentPlaybackTime", "position", "elapsed"]) ?? 0,
    durationMs: pickNumber(obj, ["durationMs", "currentPlaybackDuration", "duration"]) ?? 0,
  };
}
