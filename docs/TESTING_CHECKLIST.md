# Testing Checklist

Manual verification checklist for Cider Remote Pixel (Step 11).

## API Tests

- [ ] Valid host connects
- [ ] Invalid host shows error
- [ ] Wrong port shows error
- [ ] Missing token handled
- [ ] Wrong token shows unauthorized
- [ ] Insufficient scope detected in API Debug
- [ ] Cider offline shows network error
- [ ] Cider restart recovers after reconnect
- [ ] v2 unavailable offers v1 fallback
- [ ] Slow response respects timeout
- [ ] Malformed response logged in debug

## Playback Tests

- [ ] Play/pause toggle
- [ ] Next track
- [ ] Previous track
- [ ] Seek
- [ ] Shuffle toggle
- [ ] Repeat cycle
- [ ] Volume change
- [ ] Now playing updates
- [ ] Artwork displays
- [ ] Paused state
- [ ] Stopped state

## Queue Tests

- [ ] Queue loads
- [ ] Current item highlighted
- [ ] Add next (Apple Music links)
- [ ] Add later (Apple Music links)
- [ ] Remove item
- [ ] Reorder if supported
- [ ] Empty queue state

## Link Tests

- [ ] Apple Music track
- [ ] Apple Music album
- [ ] Apple Music playlist
- [ ] Spotify track (external)
- [ ] Spotify album (external)
- [ ] YouTube Music track (external)
- [ ] SoundCloud track (external)
- [ ] Invalid link error
- [ ] Unsupported platform message

## Android Tests

- [ ] Android 10+
- [ ] Notification controls
- [ ] Lock screen metadata
- [ ] Background/foreground polling pause/resume
- [ ] Huawei battery optimization warning

## UI Tests

- [ ] Dark theme
- [ ] Small screen layout
- [ ] Large screen layout
- [ ] No artwork placeholder
- [ ] Long song title truncation
- [ ] Long artist truncation
- [ ] Disconnected state
- [ ] Loading skeletons
- [ ] API error banner
