# 08 – Live Updates

## Goal

Keep app state synced with Cider.

## Strategy

Use:

1. WebSocket/event stream if available
2. REST polling fallback

## Required File

```txt
src/services/cider/CiderEventsService.ts
```

## Event Service Must

- connect after successful auth
- listen for playback updates
- listen for queue updates
- listen for volume updates
- reconnect on failure
- expose connection state
- stop when disconnected

## Polling Fallback

If WebSocket fails:

- poll playback every 2 seconds while app is active
- poll queue every 5 seconds
- poll volume every 5 seconds
- pause polling when app goes background
- resume on foreground

## Rules

- Do not spam the API.
- Do not run polling and WebSocket duplicate updates unless needed.
- Keep progress timer local between server updates.
- Correct progress when fresh playback data arrives.
