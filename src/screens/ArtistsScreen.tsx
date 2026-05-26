import { Text } from "react-native-paper";
import { AppScaffold } from "@/src/components/AppScaffold";
import { useLibraryStore } from "@/src/stores/libraryStore";

export default function ArtistsScreen() {
  const artists = useLibraryStore((s) => s.artists);
  return (
    <AppScaffold>
      <Text variant="headlineMedium">Artists</Text>
      {artists.map((a) => <Text key={a.id} variant="bodyMedium">{a.name}</Text>)}
    </AppScaffold>
  );
}
