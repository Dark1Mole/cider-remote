import { StyleSheet, View } from "react-native";
import { AnimatedButton } from "./AnimatedButton";

type PlaybackControlsProps = {
  isPlaying: boolean;
  onToggle: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onShuffle?: () => void;
  onRepeat?: () => void;
  shuffle?: boolean;
  repeat?: "off" | "one" | "all";
  large?: boolean;
};

export function PlaybackControls({
  isPlaying,
  onToggle,
  onNext,
  onPrevious,
  onShuffle,
  onRepeat,
  shuffle,
  repeat,
  large,
}: PlaybackControlsProps) {
  const size = large ? 36 : 28;
  return (
    <View style={styles.row}>
      {onShuffle ? (
        <AnimatedButton icon={shuffle ? "shuffle" : "shuffle-disabled"} onPress={onShuffle} size={size} />
      ) : null}
      <AnimatedButton icon="skip-previous" onPress={onPrevious} size={size + 4} />
      <AnimatedButton icon={isPlaying ? "pause-circle" : "play-circle"} onPress={onToggle} size={size + 12} />
      <AnimatedButton icon="skip-next" onPress={onNext} size={size + 4} />
      {onRepeat ? (
        <AnimatedButton
          icon={repeat === "one" ? "repeat-once" : repeat === "all" ? "repeat" : "repeat-off"}
          onPress={onRepeat}
          size={size}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8 },
});
