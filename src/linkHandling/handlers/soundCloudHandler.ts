import type { ParsedMusicLink } from "../linkParser";
import type { LinkRouteResult } from "../linkRouter";
export function handleSpotify(link: ParsedMusicLink): LinkRouteResult {
  return { action: "external-app", message: "Spotify opens externally", canPlayNow: false, canAddNext: false, canAddLater: false, externalUrl: link.url };
}
