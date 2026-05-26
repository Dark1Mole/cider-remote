# Reference Repositories

Local clones used as read-only references during development. These directories are not committed to git.

## Clone Commands

```bash
git clone https://github.com/ciderapp/Cider-Remote-RN.git reference/Cider-Remote-RN
git clone https://github.com/theovilardo/PixelPlayer.git reference/PixelPlayer
```

## Usage

| Repository | Role |
|------------|------|
| [Cider-Remote-RN](https://github.com/ciderapp/Cider-Remote-RN) | Functional base — API calls, playback logic, Expo setup |
| [PixelPlayer](https://github.com/theovilardo/PixelPlayer) | Design reference only — Material 3 Expressive UI patterns |

## Rules

- Do not copy Kotlin/Compose code from PixelPlayer into React Native.
- Do not merge both repos blindly.
- Recreate PixelPlayer-style UI using React Native components.
