import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { AlbumArtwork } from "./AlbumArtwork";
import type { QueueItem as QueueItemType } from "@/src/services/cider/CiderTypes";
import { colors } from "@/src/theme";

type QueueItemProps = {
  item: QueueItemType;
  active?: boolean;
  onRemove?: () => void;
};

export function QueueItem({ item, active }: QueueItemProps) {
  return (
    <View style={[styles.row, active && styles.active]}>
      <AlbumArtwork uri={item.track.artworkUrl} size={48} rounded={8} />
      <View style={styles.meta}>
        <Text numberOfLines={1} variant="titleSmall">{item.track.title}</Text>
        <Text numberOfLines={1} variant="bodySmall" style={styles.sub}>{item.track.artist}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", gap: 12, paddingVertical: 8, alignItems: "center" },
  active: { backgroundColor: colors.glass, borderRadius: 12, paddingHorizontal: 8 },
  meta: { flex: 1 },
  sub: { color: colors.textSecondary },
});
