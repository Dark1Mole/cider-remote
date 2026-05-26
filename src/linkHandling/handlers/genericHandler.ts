import type { ParsedMusicLink } from "../linkParser";
import type { LinkRouteResult } from "../linkRouter";
export function handleGeneric(link: ParsedMusicLink): LinkRouteResult {
  return { action: "unsupported", message: "Unsupported link", canPlayNow: false, canAddNext: false, canAddLater: false };
}
