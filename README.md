# Cider Remote Pixel

A Cider Remote Android app with PixelPlayer-inspired Material 3 Expressive UI, controlling a Cider desktop client over the local network.

## Features

- Cider v2 API client with debug tooling and v1 fallbacks
- Material 3 Expressive dark-first design system
- Playback, queue, and library controls via Zustand stores
- WebSocket live updates with REST polling fallback
- Multi-platform music link handling (Apple Music → Cider, others → external)
- Android media notification controls (remote Cider mode)
- Huawei/EMUI compatibility helpers

## Project Structure

```txt
src/
  components/     # UI building blocks (GlassCard, MiniPlayer, etc.)
  screens/        # App screens
  services/       # Cider API, storage, playback, events
  stores/           # Zustand global state
  theme/          # Material 3 design tokens
  linkHandling/   # Music link parser and router
  navigation/     # Navigation helpers
  platform/       # Android-specific helpers
app/              # Expo Router routes
docs/             # Testing checklist
```

## Get Started

```bash
corepack enable
yarn install
yarn android
```

## Build Plan Status

| Step | Status |
|------|--------|
| 01 Repo Strategy | Done |
| 02 API Validation | Done |
| 03 Architecture | Done |
| 04 Design System | Done |
| 05 Navigation & Screens | Done |
| 06 Cider API Services | Done |
| 07 State Management | Done |
| 08 Live Updates | Done |
| 09 Music Link Handling | Done |
| 10 Android Media Controls | Done |
| 11 Testing Checklist | Done (`docs/TESTING_CHECKLIST.md`) |
| 12 Final Polish | Done |

## Testing

See [docs/TESTING_CHECKLIST.md](docs/TESTING_CHECKLIST.md) for manual verification steps against a live Cider instance.

## License

Apache License 2.0 with Commons Clause. See [LICENSE](LICENSE).
