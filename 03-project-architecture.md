# 03 – Project Architecture

## Goal

Create a clean app structure before building screens.

## Required Folder Structure

```txt
src/
  components/
    AppScaffold.tsx
    GlassCard.tsx
    AnimatedButton.tsx
    MiniPlayer.tsx
    FullPlayer.tsx
    AlbumArtwork.tsx
    PlaybackControls.tsx
    VolumeSlider.tsx
    SeekBar.tsx
    QueueItem.tsx
    TrackRow.tsx
    PlaylistCard.tsx
    ConnectionStatusPill.tsx
    ApiStatusCard.tsx
    ErrorBanner.tsx

  screens/
    OnboardingScreen.tsx
    ConnectScreen.tsx
    HomeScreen.tsx
    NowPlayingScreen.tsx
    QueueScreen.tsx
    LibraryScreen.tsx
    PlaylistsScreen.tsx
    AlbumsScreen.tsx
    ArtistsScreen.tsx
    SongsScreen.tsx
    SearchScreen.tsx
    SettingsScreen.tsx
    ApiDebugScreen.tsx
    LinkHandlerScreen.tsx

  services/
    cider/
    storage/
    playback/

  stores/

  theme/

  navigation/

  linkHandling/

  utils/

  platform/
    android/
```

## Required Tech

- React Native
- Expo or Expo Dev Client
- TypeScript strict mode
- React Navigation
- Zustand or Redux Toolkit
- SecureStore or equivalent for tokens
- React Native Reanimated
- Haptics
- React Native Paper or equivalent Material component base

## Rules

- Keep services separate from UI.
- Do not call API directly from screens.
- Use stores for shared state.
- Keep components reusable.
- Every screen must handle loading, empty, error, and success states.
