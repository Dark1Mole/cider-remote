# 09 – Music Link Handling

## Goal

Handle links from Apple Music, Spotify, YouTube Music, SoundCloud, Deezer, Tidal, and Amazon Music.

## Required Files

```txt
src/linkHandling/
  linkParser.ts
  linkRouter.ts
  musicLinkDetector.ts
  deepLinkConfig.ts
  handlers/
    appleMusicHandler.ts
    spotifyHandler.ts
    youTubeMusicHandler.ts
    soundCloudHandler.ts
    deezerHandler.ts
    tidalHandler.ts
    amazonMusicHandler.ts
    genericHandler.ts
```

## Supported Links

Apple Music:

```txt
https://music.apple.com/.../album/...
https://music.apple.com/.../playlist/...
https://music.apple.com/.../artist/...
https://music.apple.com/.../song/...
music://...
```

Spotify:

```txt
https://open.spotify.com/track/...
https://open.spotify.com/album/...
https://open.spotify.com/playlist/...
spotify:track:...
```

YouTube Music:

```txt
https://music.youtube.com/watch?v=...
https://music.youtube.com/playlist?list=...
```

SoundCloud:

```txt
https://soundcloud.com/artist/track
https://soundcloud.com/artist/sets/playlist
```

## Behavior

Apple Music:
- route to Cider
- play now, add next, or add later if supported

Spotify / YouTube / SoundCloud / Deezer / Tidal:
- try native app
- fallback to web

## LinkHandlerScreen

Must show:

- loading state
- detected platform
- detected content type
- success state
- error state
- action buttons:
  - Play now
  - Add next
  - Add later
  - Open externally

## Rules

- Do not assume Spotify can play through Cider unless API supports it.
- Do not silently fail.
- Show clear routing result.
