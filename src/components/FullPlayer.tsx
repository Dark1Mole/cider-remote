import { StyleSheet, View } from "react-native";
import { Text, IconButton } from "react-native-paper";
import { BlurredBackground } from "./BlurredBackground";
import { AlbumArtwork } from "./AlbumArtwork";
import { PlaybackControls } from "./PlaybackControls";
import { SeekBar } from "./SeekBar";
import { VolumeSlider } from "./VolumeSlider";
import type { RepeatMode, Track } from "@/src/services/cider/CiderTypes";
import { colors } from "@/src/theme";

type FullPlayerProps = {
  track: Track | null;
  isPlaying: boolean;
  progressMs: number;
  durationMs: number;
  volume: number;
  shuffle: boolean;
  repeat: RepeatMode;
  onToggle: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onSeek: (ms: number) => void;
  onVolume: (v: number) => void;
  onShuffle: () => void;
  onRepeat: () => void;
};

export function FullPlayer(props: FullPlayerProps) {
  const { track } = props;
  if (!track) {
    return (
      <View style={styles.empty}>
        <Text variant="titleMedium">Nothing playing</Text>
      </View>
    );
  }

  return (
    <BlurredBackground artworkUrl={track.artworkUrl}>
      <View style={styles.content}>
        <AlbumArtwork uri={track.artworkUrl} size={300} />
        <Text variant="headlineSmall" style={styles.title}>{track.title}</Text>
        <Text variant="titleMedium" style={styles.subtitle}>{track.artist}</Text>
        <Text variant="bodyMedium" style={styles.album}>{track.album}</Text>
        <SeekBar progressMs={props.progressMs} durationMs={props.durationMs} onSeek={props.onSeek} />
        <PlaybackControls
          large
          isPlaying={props.isPlaying}
          onToggle={props.onToggle}
          onNext={props.onNext}
          onPrevious={props.onPrevious}
          onShuffle={props.onShuffle}
          onRepeat={props.onRepeat}
          shuffle={props.shuffle}
          repeat={props.repeat}
        />
        <VolumeSlider volume={props.volume} onChange={props.onVolume} />
        <View style={styles.actions}>
          <IconButton icon="heart-outline" />
          <IconButton icon="playlist-plus" />
        </View>
      </View>
    </BlurredBackground>
  );
}

const styles = StyleSheet.create({
  content: { flex: 1, alignItems: "center", justifyContent: "center", padding: 24, gap: 12 },
  title: { color: colors.textPrimary, textAlign: "center" },
  subtitle: { color: colors.textSecondary, textAlign: "center" },
  album: { color: colors.textMuted, textAlign: "center" },
  actions: { flexDirection: "row" },
  empty: { flex: 1, alignItems: "center", justifyContent: "center" },
});
