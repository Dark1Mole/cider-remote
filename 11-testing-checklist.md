# 11 – Testing Checklist

## API Tests

Test:

- valid host
- invalid host
- wrong port
- missing token
- wrong token
- insufficient scope
- Cider offline
- Cider restarted
- v2 unavailable
- slow response
- malformed response

## Playback Tests

Test:

- play/pause
- next
- previous
- seek
- shuffle
- repeat
- volume
- now playing update
- artwork update
- paused state
- stopped state

## Queue Tests

Test:

- queue loading
- current item highlighted
- add next
- add later
- remove item
- reorder if supported
- empty queue

## Link Tests

Test:

- Apple Music track
- Apple Music album
- Apple Music playlist
- Spotify track
- Spotify album
- YouTube Music track
- SoundCloud track
- invalid link
- unsupported platform

## Android Tests

Test:

- Android 10
- Android 11
- Android 12+
- notification controls
- lockscreen controls
- background/foreground
- Huawei EMUI if available

## UI Tests

Test:

- dark theme
- small screen
- large screen
- no artwork
- long song title
- long artist name
- disconnected state
- loading state
- API error state
