import { create } from "zustand";
import { resetAppData, setOnboardingComplete } from "@/src/services/storage/connectionStorage";

type SettingsStore = {
  darkMode: boolean;
  accentColor: string;
  showDebugTools: boolean;
  setDarkMode: (enabled: boolean) => void;
  setAccentColor: (color: string) => void;
  setShowDebugTools: (enabled: boolean) => void;
  resetAppData: () => Promise<void>;
  completeOnboarding: () => Promise<void>;
};

export const useSettingsStore = create<SettingsStore>((set) => ({
  darkMode: true,
  accentColor: "#BB86FC",
  showDebugTools: __DEV__,
  setDarkMode: (enabled) => set({ darkMode: enabled }),
  setAccentColor: (color) => set({ accentColor: color }),
  setShowDebugTools: (enabled) => set({ showDebugTools: enabled }),
  resetAppData: async () => {
    await resetAppData();
  },
  completeOnboarding: async () => {
    await setOnboardingComplete(true);
  },
}));
