import { useEffect } from "react";
import { usePlaybackStore } from "@/src/stores/playbackStore";
import { setupMediaControls, updateMediaNotification } from "@/src/services/playback/mediaControlService";

export function useMediaControlsBridge() {
  const playback = usePlaybackStore();

  useEffect(() => {
    setupMediaControls({
      onPlay: () => playback.togglePlayPause(),
      onPause: () => playback.togglePlayPause(),
      onNext: () => playback.next(),
      onPrevious: () => playback.previous(),
      onSeek: (pos) => playback.seek(pos * 1000),
    });
  }, [playback]);

  useEffect(() => {
    updateMediaNotification(
      playback.nowPlaying,
      playback.state,
      Math.floor(playback.progressMs / 1000)
    );
  }, [playback.nowPlaying, playback.state, playback.progressMs]);
}
