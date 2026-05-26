import { Text } from "react-native-paper";
import { AppScaffold } from "@/src/components/AppScaffold";
import { useLibraryStore } from "@/src/stores/libraryStore";

export default function AlbumsScreen() {
  const albums = useLibraryStore((s) => s.albums);
  return (
    <AppScaffold>
      <Text variant="headlineMedium">Albums</Text>
      {albums.map((a) => <Text key={a.id} variant="bodyMedium">{a.name}</Text>)}
    </AppScaffold>
  );
}
