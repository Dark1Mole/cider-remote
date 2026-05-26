import { StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { colors, radius } from "@/src/theme";

type ErrorBannerProps = {
  message: string;
};

export function ErrorBanner({ message }: ErrorBannerProps) {
  if (!message) return null;
  return (
    <Text style={styles.banner} variant="bodySmall">{message}</Text>
  );
}

export function EmptyState({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <>
      <Text variant="titleMedium" style={styles.emptyTitle}>{title}</Text>
      {subtitle ? <Text variant="bodySmall" style={styles.emptySub}>{subtitle}</Text> : null}
    </>
  );
}

export function LoadingSkeleton({ lines = 3 }: { lines?: number }) {
  return (
    <>
      {Array.from({ length: lines }).map((_, i) => (
        <Text key={i} style={styles.skeleton}>▬▬▬▬▬▬▬▬▬▬▬▬▬</Text>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: colors.error,
    color: "#fff",
    padding: 12,
    borderRadius: radius.md,
    overflow: "hidden",
  },
  emptyTitle: { textAlign: "center", color: colors.textSecondary },
  emptySub: { textAlign: "center", color: colors.textMuted, marginTop: 4 },
  skeleton: { color: colors.surfaceHigh, marginVertical: 6 },
});
