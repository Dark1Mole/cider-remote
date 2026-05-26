import { StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { GlassCard } from "./GlassCard";
import { colors } from "@/src/theme";

type ApiStatusCardProps = {
  healthy: boolean;
  message: string;
  onPress?: () => void;
};

export function ApiStatusCard({ healthy, message, onPress }: ApiStatusCardProps) {
  return (
    <GlassCard onPress={onPress} style={styles.card}>
      <Text variant="labelSmall" style={{ color: healthy ? colors.success : colors.warning }}>
        API {healthy ? "Healthy" : "Check Required"}
      </Text>
      <Text variant="bodySmall" style={styles.msg}>{message}</Text>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  card: { gap: 4 },
  msg: { color: colors.textSecondary },
});
