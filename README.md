# Cider Remote Pixel

A Cider Remote Android app with PixelPlayer-inspired Material 3 Expressive UI, controlling a Cider desktop client over the local network.

## Reference Repositories

| Repo | Purpose |
|------|---------|
| [Cider-Remote-RN](https://github.com/ciderapp/Cider-Remote-RN) | Functional base (React Native + Expo) |
| [PixelPlayer](https://github.com/theovilardo/PixelPlayer) | Design reference (Material 3 Expressive) |

Clone locally into `reference/` — see [reference/README.md](reference/README.md).

## Project Structure

```txt
reference/          # Local clones (gitignored)
src/                # Target architecture (new code goes here)
app/                # Expo Router screens (legacy from Cider-Remote-RN)
components/         # Shared UI (legacy, migrating to src/)
lib/                # API/services (legacy, migrating to src/services/)
00-README.md …      # Step-by-step build plan
```

## Requirements

- Node 22+
- Yarn 4+
- Android SDK (Android 10+ target)

## Get Started

```bash
corepack enable
yarn install
yarn android
```

## Build Plan

Follow the numbered plan files in order. Each step must be completed, tested, and committed before moving to the next.

1. `01-repo-strategy.md` — Repo setup
2. `02-api-validation-first.md` — API debug screen
3. `03-project-architecture.md` — App structure
4. … see `00-README.md` for the full list

## License

Apache License 2.0 with Commons Clause. See [LICENSE](LICENSE).
