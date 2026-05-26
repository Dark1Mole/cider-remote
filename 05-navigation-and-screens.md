# 05 – Navigation and Screens

## Goal

Create the app shell and core screens.

## Navigation Structure

```txt
RootNavigator
  OnboardingStack
    OnboardingScreen
    ConnectScreen

  MainTabs
    HomeScreen
    LibraryScreen
    NowPlayingScreen
    QueueScreen
    SettingsScreen

  Modals
    ApiDebugScreen
    LinkHandlerScreen
```

## Bottom Tabs

Use:

- Home
- Library
- Now Playing
- Queue
- Settings

## Mini Player

The MiniPlayer must stay visible above the tab bar when:

- connected to Cider
- nowPlaying exists

## Home Screen

Must show:

- connection status
- now playing card
- playback quick controls
- queue preview
- recent playlists
- API health/debug card

## Now Playing Screen

Must show:

- blurred artwork background
- album artwork
- title
- artist
- album
- seekbar
- play/pause
- next/previous
- shuffle
- repeat
- volume
- favorite/library buttons

## Settings Screen

Must show:

- host/IP
- port
- token
- request token button
- test connection button
- saved devices
- API debug button
- theme settings
- reset app data

## Rules

- Every screen must work with mock data before API connection.
- Replace mock data with store data after services are complete.
- Do not block layout work on API work.
