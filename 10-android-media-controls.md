# 10 – Android Media Controls

## Goal

Support Android system media controls.

## Required Features

- media notification
- lock screen metadata
- play/pause control
- next control
- previous control
- artwork
- current title/artist
- notification channel
- Android 10+ support

## Important Distinction

The app has two possible playback modes:

```ts
type PlaybackMode = "remote-cider" | "local-phone";
```

Remote Cider mode:
- controls desktop Cider
- media notification mirrors remote state
- does not fake local audio

Local phone mode:
- uses local playback engine
- controls phone playback directly

## Suggested Library

Use `react-native-track-player` only if local playback or media session bridging needs it.

## Huawei Support

Create:

```txt
src/platform/android/HuaweiCompatibility.ts
```

Add:

- manufacturer detection
- battery optimization warning
- notification permission check
- background permission helper
- EMUI-specific instruction screen

## Rules

- Do not break remote playback to force notification support.
- Do not claim local playback works until tested.
- Keep Android 10 compatibility.
