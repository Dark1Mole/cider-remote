import { AppScaffold } from "@/src/components/AppScaffold";
import { TrackRow } from "@/src/components/TrackRow";
import { useLibraryStore } from "@/src/stores/libraryStore";

export default function SongsScreen() {
  const songs = useLibraryStore((s) => s.songs);
  return (
    <AppScaffold>
      {songs.map((s) => <TrackRow key={s.id} track={s} />)}
    </AppScaffold>
  );
}
