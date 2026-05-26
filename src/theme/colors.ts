export const colors = {
  background: "#000000",
  surface: "#121212",
  surfaceElevated: "#1E1E1E",
  surfaceHigh: "#2A2A2A",
  border: "rgba(255,255,255,0.08)",
  borderStrong: "rgba(255,255,255,0.16)",
  textPrimary: "#FFFFFF",
  textSecondary: "rgba(255,255,255,0.72)",
  textMuted: "rgba(255,255,255,0.48)",
  accent: "#BB86FC",
  accentVariant: "#9A67EA",
  onAccent: "#000000",
  error: "#CF6679",
  success: "#4CAF50",
  warning: "#FFB74D",
  overlay: "rgba(0,0,0,0.6)",
  glass: "rgba(255,255,255,0.06)",
} as const;

export type AppColors = typeof colors;
