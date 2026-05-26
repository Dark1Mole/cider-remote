# 01 – Repo Strategy

## Goal

Use both repositories correctly without creating a cursed Frankenstein project.

## Repositories

Design inspiration:

```txt
https://github.com/theovilardo/PixelPlayer
```

Functionality reference:

```txt
https://github.com/ciderapp/Cider-Remote-RN
```

## Required Strategy

1. Fork both repositories.
2. Create a new working repo:

```txt
Cider-Remote-Pixel
```

3. Use Cider Remote RN as the functional base if it is already React Native.
4. Use PixelPlayer as a design reference only.
5. Do not directly copy Kotlin/Compose code into React Native.
6. Recreate PixelPlayer-style UI using React Native components.

## Folder Setup

Create this structure:

```txt
/reference/
  PixelPlayer/
  Cider-Remote-RN/

src/
  components/
  screens/
  services/
  stores/
  theme/
  linkHandling/
  navigation/
  utils/
  platform/
```

## Rules

- Do not merge both repos blindly.
- Do not copy unused files.
- Do not add native Android complexity until the base app works.
- Keep Android 10+ compatibility.
- Use TypeScript strict mode.
