import * as Linking from "expo-linking";

export const deepLinkConfig = {
  prefixes: [Linking.createURL("/"), "cider-remote://"],
  screens: {
    "modals/link-handler": "link",
  },
} as const;

export function getInitialLink(): Promise<string | null> {
  return Linking.getInitialURL();
}

export function subscribeLinks(handler: (url: string) => void) {
  const sub = Linking.addEventListener("url", ({ url }) => handler(url));
  return () => sub.remove();
}
