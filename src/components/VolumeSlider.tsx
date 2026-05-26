import Slider from "@react-native-community/slider";
import { StyleSheet, View } from "react-native";
import { Icon, Text } from "react-native-paper";
import { colors } from "@/src/theme";

type VolumeSliderProps = {
  volume: number;
  onChange: (value: number) => void;
};

export function VolumeSlider({ volume, onChange }: VolumeSliderProps) {
  return (
    <View style={styles.row}>
      <Icon source="volume-low" size={20} />
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={1}
        value={volume}
        onSlidingComplete={onChange}
        minimumTrackTintColor={colors.accent}
        maximumTrackTintColor={colors.borderStrong}
        thumbTintColor={colors.accent}
      />
      <Text variant="labelSmall">{Math.round(volume * 100)}%</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", gap: 8 },
  slider: { flex: 1, height: 40 },
});
