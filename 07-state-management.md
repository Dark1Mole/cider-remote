# 07 – State Management

## Goal

Create predictable global app state.

## Stores

Create:

```txt
src/stores/
  connectionStore.ts
  playbackStore.ts
  queueStore.ts
  libraryStore.ts
  settingsStore.ts
  apiDebugStore.ts
```

## connectionStore

State:

```ts
type ConnectionState = {
  host: string;
  port: number;
  token: string | null;
  connected: boolean;
  connecting: boolean;
  lastError: string | null;
  lastConnectedAt: string | null;
};
```

Actions:

```ts
setHost()
setToken()
testConnection()
connect()
disconnect()
loadSavedConnection()
saveConnection()
```

## playbackStore

State:

```ts
type PlaybackState = {
  state: "playing" | "paused" | "stopped" | "unknown";
  nowPlaying: Track | null;
  progressMs: number;
  durationMs: number;
  volume: number;
  shuffle: boolean;
  repeat: "off" | "one" | "all";
  loading: boolean;
  error: string | null;
};
```

Actions:

```ts
refreshPlayback()
togglePlayPause()
next()
previous()
seek()
setVolume()
setShuffle()
setRepeat()
```

## queueStore

State:

```ts
type QueueState = {
  items: QueueItem[];
  currentIndex: number | null;
  loading: boolean;
  error: string | null;
};
```

## Rules

- Screens read from stores.
- Services do API work.
- Stores call services.
- Components do not directly call services unless isolated and justified.
