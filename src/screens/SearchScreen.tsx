import { useState } from "react";
import { TextInput, Text } from "react-native-paper";
import { AppScaffold } from "@/src/components/AppScaffold";
import { TrackRow } from "@/src/components/TrackRow";
import { useLibraryStore } from "@/src/stores/libraryStore";

export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const songs = useLibraryStore((s) => s.songs);
  const results = songs.filter((s) =>
    `${s.title} ${s.artist} ${s.album}`.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AppScaffold>
      <Text variant="headlineMedium">Search</Text>
      <TextInput label="Search library" value={query} onChangeText={setQuery} mode="outlined" />
      {results.map((track) => <TrackRow key={track.id} track={track} />)}
    </AppScaffold>
  );
}
