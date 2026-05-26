import { useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { useRouter } from "expo-router";
import { AppScaffold } from "@/src/components/AppScaffold";
import { ApiStatusCard } from "@/src/components/ApiStatusCard";
import { ConnectionStatusPill } from "@/src/components/ConnectionStatusPill";
import { ErrorBanner } from "@/src/components/ErrorBanner";
import { GlassCard } from "@/src/components/GlassCard";
import { LoadingSkeleton } from "@/src/components/ErrorBanner";
import { PlaybackControls } from "@/src/components/PlaybackControls";
import { PlaylistCard } from "@/src/components/PlaylistCard";
import { QueueItem } from "@/src/components/QueueItem";
import { TrackRow } from "@/src/components/TrackRow";
import { useConnectionStore } from "@/src/stores/connectionStore";
import { useLibraryStore } from "@/src/stores/libraryStore";
import { usePlaybackStore } from "@/src/stores/playbackStore";
import { useQueueStore } from "@/src/stores/queueStore";
import { spacing } from "@/src/theme";

const MOCK_TRACK = {
  id: "mock-1",
  title: "Demo Track",
  artist: "Demo Artist",
  album: "Demo Album",
};

export default function HomeScreen() {
  const router = useRouter();
  const connected = useConnectionStore((s) => s.connected);
  const { nowPlaying, state, loading, error, refreshPlayback, togglePlayPause, next, previous } = usePlaybackStore();
  const { items, refreshQueue, loading: queueLoading } = useQueueStore();
  const { playlists, refreshPlaylists, loading: libLoading } = useLibraryStore();

  useEffect(() => {
    if (connected) {
      refreshPlayback();
      refreshQueue();
      refreshPlaylists();
    }
  }, [connected, refreshPlayback, refreshQueue, refreshPlaylists]);

  const track = nowPlaying ?? (!connected ? MOCK_TRACK : null);
  const queuePreview = connected ? items.slice(0, 3) : [];

  return (
    <AppScaffold>
      <View style={styles.header}>
        <Text variant="headlineMedium">Home</Text>
        <ConnectionStatusPill connected={connected} />
      </View>
      <ErrorBanner message={error ?? ""} />
      <ApiStatusCard
        healthy={connected}
        message={connected ? "Live sync active" : "Connect to Cider to control playback"}
        onPress={() => router.push("/modals/api-debug")}
      />
      <GlassCard style={styles.section}>
        <Text variant="titleMedium">Now Playing</Text>
        {loading ? <LoadingSkeleton lines={2} /> : track ? (
          <>
            <TrackRow track={track} onPress={() => router.push("/(tabs)/now-playing")} />
            <PlaybackControls
              isPlaying={state === "playing"}
              onToggle={togglePlayPause}
              onNext={next}
              onPrevious={previous}
            />
          </>
        ) : (
          <Text variant="bodySmall">Nothing playing</Text>
        )}
      </GlassCard>
      <Text variant="titleMedium" style={styles.sectionTitle}>Queue Preview</Text>
      {queueLoading ? <LoadingSkeleton /> : queuePreview.length ? (
        queuePreview.map((item, i) => <QueueItem key={item.id} item={item} active={i === 0} />)
      ) : (
        <Text variant="bodySmall">Queue is empty</Text>
      )}
      <Text variant="titleMedium" style={styles.sectionTitle}>Recent Playlists</Text>
      {libLoading ? <LoadingSkeleton /> : (
        <FlatList
          horizontal
          data={playlists.slice(0, 6)}
          keyExtractor={(p) => p.id}
          renderItem={({ item }) => <PlaylistCard playlist={item} />}
          ItemSeparatorComponent={() => <View style={{ width: spacing.sm }} />}
          showsHorizontalScrollIndicator={false}
        />
      )}
    </AppScaffold>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: spacing.md },
  section: { marginTop: spacing.md, gap: spacing.sm },
  sectionTitle: { marginTop: spacing.lg, marginBottom: spacing.sm },
});
