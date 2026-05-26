export type MusicPlatform =
  | "apple-music"
  | "spotify"
  | "youtube-music"
  | "soundcloud"
  | "deezer"
  | "tidal"
  | "amazon-music"
  | "unknown";

export type ContentType = "track" | "album" | "playlist" | "artist" | "unknown";

export type ParsedMusicLink = {
  url: string;
  platform: MusicPlatform;
  contentType: ContentType;
  id?: string;
  raw: string;
};

const patterns: Array<{ platform: MusicPlatform; regex: RegExp; type: ContentType }> = [
  { platform: "apple-music", regex: /music\.apple\.com\/.*\/(song|album|playlist|artist)\//i, type: "track" },
  { platform: "apple-music", regex: /^music:\/\//i, type: "track" },
  { platform: "spotify", regex: /open\.spotify\.com\/(track|album|playlist|artist)\//i, type: "track" },
  { platform: "spotify", regex: /^spotify:(track|album|playlist|artist):/i, type: "track" },
  { platform: "youtube-music", regex: /music\.youtube\.com\/(watch|playlist)/i, type: "track" },
  { platform: "soundcloud", regex: /soundcloud\.com\/.+/i, type: "track" },
  { platform: "deezer", regex: /deezer\.com\/(track|album|playlist|artist)\//i, type: "track" },
  { platform: "tidal", regex: /tidal\.com\/(browse|album|track|playlist|artist)\//i, type: "track" },
  { platform: "amazon-music", regex: /music\.amazon\..+/i, type: "track" },
];

export function detectPlatform(url: string): MusicPlatform {
  for (const p of patterns) {
    if (p.regex.test(url)) return p.platform;
  }
  return "unknown";
}

export function detectContentType(url: string): ContentType {
  if (/playlist|sets|list=/i.test(url)) return "playlist";
  if (/album/i.test(url)) return "album";
  if (/artist/i.test(url)) return "artist";
  if (/track|song|watch\?v=/i.test(url)) return "track";
  return "unknown";
}

export function parseMusicLink(raw: string): ParsedMusicLink {
  const url = raw.trim();
  const platform = detectPlatform(url);
  const contentType = detectContentType(url);
  const idMatch = url.match(/(?:track|album|playlist|artist|song|sets)[\/:]([A-Za-z0-9_-]+)/i);
  return { url, platform, contentType, id: idMatch?.[1], raw };
}
