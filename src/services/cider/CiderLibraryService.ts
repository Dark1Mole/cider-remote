import { parseAlbumSummaries, parseArtistSummaries, parsePlaylistSummaries, parseTrack } from "@/src/utils/apiParsing";
import { getCiderClient } from "./clientInstance";

export class CiderLibraryService {
  async getPlaylists() {
    const result = await getCiderClient().request("GET", "/api/v2/library/playlists", undefined, { retry: true });
    return { ...result, playlists: result.data ? parsePlaylistSummaries(result.data) : [] };
  }

  async getAlbums() {
    const result = await getCiderClient().request("GET", "/api/v2/library/albums", undefined, { retry: true });
    return { ...result, albums: result.data ? parseAlbumSummaries(result.data) : [] };
  }

  async getArtists() {
    const result = await getCiderClient().request("GET", "/api/v2/library/artists", undefined, { retry: true });
    return { ...result, artists: result.data ? parseArtistSummaries(result.data) : [] };
  }

  async getSongs() {
    const result = await getCiderClient().request("GET", "/api/v2/library/songs", undefined, { retry: true });
    const obj = result.data;
    const list = Array.isArray(obj) ? obj : Array.isArray((obj as Record<string, unknown>)?.songs) ? (obj as { songs: unknown[] }).songs : [];
    const songs = list.map(parseTrack).filter(Boolean);
    return { ...result, songs };
  }
}

export const ciderLibraryService = new CiderLibraryService();
