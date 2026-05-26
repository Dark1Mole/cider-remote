import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { useRouter } from "expo-router";
import { GlassCard } from "./GlassCard";
import { AlbumArtwork } from "./AlbumArtwork";
import { AnimatedButton } from "./AnimatedButton";
import type { Track } from "@/src/services/cider/CiderTypes";
import { colors } from "@/src/theme";

type MiniPlayerProps = {
  track: Track | null;
  isPlaying: boolean;
  onToggle: () => void;
  onNext: () => void;
  visible: boolean;
};

export function MiniPlayer({ track, isPlaying, onToggle, onNext, visible }: MiniPlayerProps) {
  const router = useRouter();
  if (!visible || !track) return null;

  return (
    <GlassCard onPress={() => router.push("/(tabs)/now-playing")} style={styles.card}>
      <View style={styles.row}>
        <AlbumArtwork uri={track.artworkUrl} size={48} rounded={8} />
        <View style={styles.meta}>
          <Text numberOfLines={1} variant="titleSmall">{track.title}</Text>
          <Text numberOfLines={1} variant="bodySmall" style={styles.subtitle}>{track.artist}</Text>
        </View>
        <AnimatedButton icon={isPlaying ? "pause" : "play"} onPress={onToggle} size={24} />
        <AnimatedButton icon="skip-next" onPress={onNext} size={24} />
      </View>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  card: { marginHorizontal: 8, marginBottom: 4 },
  row: { flexDirection: "row", alignItems: "center", gap: 12 },
  meta: { flex: 1 },
  subtitle: { color: colors.textSecondary },
});
