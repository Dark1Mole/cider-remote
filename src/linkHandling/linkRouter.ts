import * as Linking from "expo-linking";
import type { ParsedMusicLink } from "./linkParser";

export type LinkRouteResult = {
  action: "cider" | "external-app" | "external-web" | "unsupported";
  message: string;
  canPlayNow: boolean;
  canAddNext: boolean;
  canAddLater: boolean;
  externalUrl?: string;
};

export async function routeMusicLink(link: ParsedMusicLink): Promise<LinkRouteResult> {
  if (link.platform === "apple-music") {
    return {
      action: "cider",
      message: "Apple Music links can be routed to Cider",
      canPlayNow: true,
      canAddNext: true,
      canAddLater: true,
    };
  }

  const externalSchemes: Record<string, string> = {
    spotify: "spotify://",
    "youtube-music": "vnd.youtube.music://",
    soundcloud: "soundcloud://",
    deezer: "deezer://",
    tidal: "tidal://",
    "amazon-music": "amazonmusic://",
  };

  const scheme = externalSchemes[link.platform];
  if (scheme) {
    const canOpen = await Linking.canOpenURL(scheme);
    return {
      action: canOpen ? "external-app" : "external-web",
      message: canOpen ? `Opening in ${link.platform} app` : `Opening ${link.platform} in browser`,
      canPlayNow: false,
      canAddNext: false,
      canAddLater: false,
      externalUrl: link.url,
    };
  }

  return {
    action: "unsupported",
    message: "Unsupported link platform",
    canPlayNow: false,
    canAddNext: false,
    canAddLater: false,
  };
}
