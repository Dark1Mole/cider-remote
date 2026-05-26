# 04 – Design System

## Goal

Recreate PixelPlayer-inspired Material 3 Expressive design in React Native.

## Design Direction

The app should look like:

- modern Android music app
- Material 3 Expressive
- dark-first
- smooth
- premium
- rounded
- animated
- clean

## Create Theme Files

```txt
src/theme/
  colors.ts
  typography.ts
  spacing.ts
  radius.ts
  motion.ts
  shadows.ts
  index.ts
```

## Color Rules

Use:

- dark OLED background
- elevated surfaces
- subtle borders
- dynamic accent color
- music artwork-based accents later
- clear error/success/warning colors

## Component Style

Build these first:

```txt
GlassCard
AnimatedButton
BlurredBackground
MiniPlayer
PlaybackControls
AlbumArtwork
```

## Motion Rules

Use animations for:

- button press scale
- mini-player appear/disappear
- full-player transition
- screen transitions
- card press states
- queue item movement
- loading skeletons

## Haptics

Use haptics for:

- play/pause
- next/previous
- slider release
- connect success
- connect failure
- long press
- queue actions

## Rules

- Do not overuse blur.
- Do not make everything transparent.
- Keep readable contrast.
- Keep touch targets large.
- Match PixelPlayer’s modern Android feeling, not Apple Music cloning.
