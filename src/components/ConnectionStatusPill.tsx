import { StyleSheet } from "react-native";
import { Chip } from "react-native-paper";
import { colors } from "@/src/theme";

type ConnectionStatusPillProps = {
  connected: boolean;
  connecting?: boolean;
  label?: string;
};

export function ConnectionStatusPill({ connected, connecting, label }: ConnectionStatusPillProps) {
  const text = label ?? (connecting ? "Connecting…" : connected ? "Connected" : "Disconnected");
  const bg = connecting ? colors.warning : connected ? colors.success : colors.error;
  return <Chip compact style={[styles.chip, { backgroundColor: bg }]} textStyle={styles.text}>{text}</Chip>;
}

const styles = StyleSheet.create({
  chip: { alignSelf: "flex-start" },
  text: { color: "#000", fontWeight: "600" },
});
