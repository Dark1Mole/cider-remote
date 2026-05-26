import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { AlbumArtwork } from "./AlbumArtwork";
import type { Track } from "@/src/services/cider/CiderTypes";
import { colors } from "@/src/theme";
import { AnimatedPressable } from "./AnimatedButton";

type TrackRowProps = {
  track: Track;
  onPress?: () => void;
};

export function TrackRow({ track, onPress }: TrackRowProps) {
  const content = (
    <View style={styles.row}>
      <AlbumArtwork uri={track.artworkUrl} size={48} rounded={8} />
      <View style={styles.meta}>
        <Text numberOfLines={1} variant="titleSmall">{track.title}</Text>
        <Text numberOfLines={1} variant="bodySmall" style={styles.sub}>{track.artist}</Text>
      </View>
    </View>
  );
  if (!onPress) return content;
  return <AnimatedPressable onPress={onPress}>{content}</AnimatedPressable>;
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", gap: 12, paddingVertical: 8, alignItems: "center" },
  meta: { flex: 1 },
  sub: { color: colors.textSecondary },
});
