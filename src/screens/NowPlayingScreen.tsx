import { useEffect } from "react";
import { AppScaffold } from "@/src/components/AppScaffold";
import { FullPlayer } from "@/src/components/FullPlayer";
import { useConnectionStore } from "@/src/stores/connectionStore";
import { usePlaybackStore } from "@/src/stores/playbackStore";

export default function NowPlayingScreen() {
  const connected = useConnectionStore((s) => s.connected);
  const playback = usePlaybackStore();

  useEffect(() => {
    if (connected) playback.refreshPlayback();
    const id = setInterval(() => playback.tickProgress(), 1000);
    return () => clearInterval(id);
  }, [connected, playback]);

  const cycleRepeat = () => {
    const next = playback.repeat === "off" ? "all" : playback.repeat === "all" ? "one" : "off";
    playback.setRepeat(next);
  };

  return (
    <AppScaffold scroll={false}>
      <FullPlayer
        track={playback.nowPlaying}
        isPlaying={playback.state === "playing"}
        progressMs={playback.progressMs}
        durationMs={playback.durationMs}
        volume={playback.volume}
        shuffle={playback.shuffle}
        repeat={playback.repeat}
        onToggle={playback.togglePlayPause}
        onNext={playback.next}
        onPrevious={playback.previous}
        onSeek={playback.seek}
        onVolume={playback.setVolume}
        onShuffle={() => playback.setShuffle(!playback.shuffle)}
        onRepeat={cycleRepeat}
      />
    </AppScaffold>
  );
}
