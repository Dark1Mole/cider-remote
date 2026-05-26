import * as SecureStore from "expo-secure-store";

const KEYS = {
  host: "cider.host",
  port: "cider.port",
  token: "cider.token",
  onboardingComplete: "cider.onboardingComplete",
  savedDevices: "cider.savedDevices",
} as const;

export type SavedDevice = {
  id: string;
  name: string;
  host: string;
  port: number;
};

export async function saveConnection(host: string, port: number, token: string | null) {
  await SecureStore.setItemAsync(KEYS.host, host);
  await SecureStore.setItemAsync(KEYS.port, String(port));
  if (token) {
    await SecureStore.setItemAsync(KEYS.token, token);
  } else {
    await SecureStore.deleteItemAsync(KEYS.token);
  }
}

export async function loadConnection(): Promise<{ host: string; port: number; token: string | null } | null> {
  const host = await SecureStore.getItemAsync(KEYS.host);
  const port = await SecureStore.getItemAsync(KEYS.port);
  const token = await SecureStore.getItemAsync(KEYS.token);
  if (!host) return null;
  return { host, port: port ? Number.parseInt(port, 10) : 10767, token };
}

export async function setOnboardingComplete(complete: boolean) {
  await SecureStore.setItemAsync(KEYS.onboardingComplete, complete ? "1" : "0");
}

export async function isOnboardingComplete(): Promise<boolean> {
  return (await SecureStore.getItemAsync(KEYS.onboardingComplete)) === "1";
}

export async function loadSavedDevices(): Promise<SavedDevice[]> {
  const raw = await SecureStore.getItemAsync(KEYS.savedDevices);
  if (!raw) return [];
  try { return JSON.parse(raw) as SavedDevice[]; } catch { return []; }
}

export async function saveSavedDevices(devices: SavedDevice[]) {
  await SecureStore.setItemAsync(KEYS.savedDevices, JSON.stringify(devices));
}

export async function resetAppData() {
  await Promise.all(Object.values(KEYS).map((key) => SecureStore.deleteItemAsync(key)));
}
