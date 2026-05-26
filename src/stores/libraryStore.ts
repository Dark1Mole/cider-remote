import { create } from "zustand";
import { ciderLibraryService } from "@/src/services/cider/CiderLibraryService";
import type { AlbumSummary, ArtistSummary, PlaylistSummary, Track } from "@/src/services/cider/CiderTypes";

type LibraryStore = {
  playlists: PlaylistSummary[];
  albums: AlbumSummary[];
  artists: ArtistSummary[];
  songs: Track[];
  loading: boolean;
  error: string | null;
  refreshPlaylists: () => Promise<void>;
  refreshAlbums: () => Promise<void>;
  refreshArtists: () => Promise<void>;
  refreshSongs: () => Promise<void>;
  refreshAll: () => Promise<void>;
};

export const useLibraryStore = create<LibraryStore>((set) => ({
  playlists: [],
  albums: [],
  artists: [],
  songs: [],
  loading: false,
  error: null,
  refreshPlaylists: async () => {
    set({ loading: true });
    const result = await ciderLibraryService.getPlaylists();
    set({ playlists: result.playlists, loading: false, error: result.ok ? null : result.error });
  },
  refreshAlbums: async () => {
    set({ loading: true });
    const result = await ciderLibraryService.getAlbums();
    set({ albums: result.albums, loading: false, error: result.ok ? null : result.error });
  },
  refreshArtists: async () => {
    set({ loading: true });
    const result = await ciderLibraryService.getArtists();
    set({ artists: result.artists, loading: false, error: result.ok ? null : result.error });
  },
  refreshSongs: async () => {
    set({ loading: true });
    const result = await ciderLibraryService.getSongs();
    set({ songs: result.songs.filter(Boolean) as Track[], loading: false, error: result.ok ? null : result.error });
  },
  refreshAll: async () => {
    set({ loading: true });
    const [playlists, albums, artists, songs] = await Promise.all([
      ciderLibraryService.getPlaylists(),
      ciderLibraryService.getAlbums(),
      ciderLibraryService.getArtists(),
      ciderLibraryService.getSongs(),
    ]);
    set({
      playlists: playlists.playlists,
      albums: albums.albums,
      artists: artists.artists,
      songs: songs.songs.filter(Boolean) as Track[],
      loading: false,
      error: null,
    });
  },
}));
