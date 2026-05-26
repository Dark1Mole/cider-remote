import MusicControl, { Command } from "react-native-music-control";
import type { Track, PlaybackStatus } from "@/src/services/cider/CiderTypes";

export type PlaybackMode = "remote-cider" | "local-phone";

let currentMode: PlaybackMode = "remote-cider";

export function setPlaybackMode(mode: PlaybackMode) {
  currentMode = mode;
}

export function getPlaybackMode(): PlaybackMode {
  return currentMode;
}

export function setupMediaControls(handlers: {
  onPlay: () => void;
  onPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onSeek?: (pos: number) => void;
}) {
  MusicControl.enableBackgroundMode(true);
  MusicControl.enableControl("play", true);
  MusicControl.enableControl("pause", true);
  MusicControl.enableControl("nextTrack", true);
  MusicControl.enableControl("previousTrack", true);
  MusicControl.enableControl("seek", true);

  MusicControl.on(Command.play, handlers.onPlay);
  MusicControl.on(Command.pause, handlers.onPause);
  MusicControl.on(Command.nextTrack, handlers.onNext);
  MusicControl.on(Command.previousTrack, handlers.onPrevious);
  if (handlers.onSeek) {
    MusicControl.on(Command.seek, handlers.onSeek);
  }
}

export function updateMediaNotification(track: Track | null, state: PlaybackStatus, elapsedSec = 0) {
  if (currentMode !== "remote-cider" || !track) {
    MusicControl.stopControl();
    return;
  }

  MusicControl.setNowPlaying({
    title: track.title,
    artist: track.artist,
    artwork: track.artworkUrl,
    duration: track.durationMs ? track.durationMs / 1000 : 0,
    elapsedTime: elapsedSec,
    description: track.album,
  });

  MusicControl.updatePlayback({
    state: state === "playing" ? MusicControl.STATE_PLAYING : MusicControl.STATE_PAUSED,
    elapsedTime: elapsedSec,
  });
}

export function resetMediaNotification() {
  MusicControl.stopControl();
}
