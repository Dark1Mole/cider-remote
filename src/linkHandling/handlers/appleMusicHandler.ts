import type { LinkRouteResult } from "../linkRouter";
import type { ParsedMusicLink } from "../linkParser";

export function handleAppleMusic(link: ParsedMusicLink): LinkRouteResult {
  return {
    action: "cider",
    message: `Apple Music ${link.contentType} ready for Cider`,
    canPlayNow: true,
    canAddNext: true,
    canAddLater: true,
  };
}

export function handleSpotify(link: ParsedMusicLink): LinkRouteResult {
  return {
    action: "external-app",
    message: "Spotify links open externally — Cider playback not assumed",
    canPlayNow: false,
    canAddNext: false,
    canAddLater: false,
    externalUrl: link.url,
  };
}

export function handleYouTubeMusic(link: ParsedMusicLink): LinkRouteResult {
  return { action: "external-web", message: "YouTube Music opens externally", canPlayNow: false, canAddNext: false, canAddLater: false, externalUrl: link.url };
}

export function handleSoundCloud(link: ParsedMusicLink): LinkRouteResult {
  return { action: "external-web", message: "SoundCloud opens externally", canPlayNow: false, canAddNext: false, canAddLater: false, externalUrl: link.url };
}

export function handleDeezer(link: ParsedMusicLink): LinkRouteResult {
  return { action: "external-web", message: "Deezer opens externally", canPlayNow: false, canAddNext: false, canAddLater: false, externalUrl: link.url };
}

export function handleTidal(link: ParsedMusicLink): LinkRouteResult {
  return { action: "external-web", message: "Tidal opens externally", canPlayNow: false, canAddNext: false, canAddLater: false, externalUrl: link.url };
}

export function handleAmazonMusic(link: ParsedMusicLink): LinkRouteResult {
  return { action: "external-web", message: "Amazon Music opens externally", canPlayNow: false, canAddNext: false, canAddLater: false, externalUrl: link.url };
}

export function handleGeneric(link: ParsedMusicLink): LinkRouteResult {
  return { action: "unsupported", message: `Unsupported link: ${link.url}`, canPlayNow: false, canAddNext: false, canAddLater: false };
}
