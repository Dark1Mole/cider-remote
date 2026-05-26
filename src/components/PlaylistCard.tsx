import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { GlassCard } from "./GlassCard";
import { AlbumArtwork } from "./AlbumArtwork";
import type { PlaylistSummary } from "@/src/services/cider/CiderTypes";
import { colors } from "@/src/theme";

type PlaylistCardProps = {
  playlist: PlaylistSummary;
  onPress?: () => void;
};

export function PlaylistCard({ playlist, onPress }: PlaylistCardProps) {
  return (
    <GlassCard onPress={onPress} style={styles.card}>
      <AlbumArtwork uri={playlist.artworkUrl} size={120} rounded={12} />
      <View style={styles.meta}>
        <Text numberOfLines={2} variant="titleSmall">{playlist.name}</Text>
        {playlist.trackCount !== undefined ? (
          <Text variant="labelSmall" style={styles.sub}>{playlist.trackCount} tracks</Text>
        ) : null}
      </View>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  card: { width: 160, gap: 8 },
  meta: { gap: 4 },
  sub: { color: colors.textMuted },
});
