import Slider from "@react-native-community/slider";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { colors } from "@/src/theme";

type SeekBarProps = {
  progressMs: number;
  durationMs: number;
  onSeek: (value: number) => void;
};

function formatTime(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function SeekBar({ progressMs, durationMs, onSeek }: SeekBarProps) {
  const max = Math.max(durationMs, 1);
  return (
    <View style={styles.container}>
      <Slider
        minimumValue={0}
        maximumValue={max}
        value={progressMs}
        onSlidingComplete={onSeek}
        minimumTrackTintColor={colors.accent}
        maximumTrackTintColor={colors.borderStrong}
        thumbTintColor={colors.accent}
      />
      <View style={styles.labels}>
        <Text variant="labelSmall">{formatTime(progressMs)}</Text>
        <Text variant="labelSmall">{formatTime(durationMs)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: "100%" },
  labels: { flexDirection: "row", justifyContent: "space-between" },
});
