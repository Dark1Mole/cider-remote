import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { SegmentedButtons, Text } from "react-native-paper";
import { useRouter } from "expo-router";
import { AppScaffold } from "@/src/components/AppScaffold";
import { EmptyState, LoadingSkeleton } from "@/src/components/ErrorBanner";
import { PlaylistCard } from "@/src/components/PlaylistCard";
import { TrackRow } from "@/src/components/TrackRow";
import { useConnectionStore } from "@/src/stores/connectionStore";
import { useLibraryStore } from "@/src/stores/libraryStore";
import { spacing } from "@/src/theme";

export default function LibraryScreen() {
  const router = useRouter();
  const connected = useConnectionStore((s) => s.connected);
  const library = useLibraryStore();
  const [tab, setTab] = useState("playlists");

  useEffect(() => {
    if (connected) library.refreshAll();
  }, [connected, library]);

  return (
    <AppScaffold>
      <Text variant="headlineMedium">Library</Text>
      <SegmentedButtons
        value={tab}
        onValueChange={setTab}
        buttons={[
          { value: "playlists", label: "Playlists" },
          { value: "albums", label: "Albums" },
          { value: "artists", label: "Artists" },
          { value: "songs", label: "Songs" },
        ]}
        style={styles.tabs}
      />
      {library.loading ? <LoadingSkeleton lines={4} /> : (
        <>
          {tab === "playlists" && (library.playlists.length ? library.playlists.map((p) => (
            <View key={p.id} style={styles.item}><PlaylistCard playlist={p} onPress={() => router.push(`/playlists/${p.id}`)} /></View>
          )) : <EmptyState title="No playlists" />)}
          {tab === "albums" && (library.albums.length ? library.albums.map((a) => (
            <Text key={a.id} variant="bodyMedium" style={styles.item}>{a.name} — {a.artist}</Text>
          )) : <EmptyState title="No albums" />)}
          {tab === "artists" && (library.artists.length ? library.artists.map((a) => (
            <Text key={a.id} variant="bodyMedium" style={styles.item}>{a.name}</Text>
          )) : <EmptyState title="No artists" />)}
          {tab === "songs" && (library.songs.length ? library.songs.map((s) => (
            <TrackRow key={s.id} track={s} />
          )) : <EmptyState title="No songs" />)}
        </>
      )}
    </AppScaffold>
  );
}

const styles = StyleSheet.create({
  tabs: { marginVertical: spacing.md },
  item: { marginBottom: spacing.sm },
});
