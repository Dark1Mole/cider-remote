# 06 – Cider API Services

## Goal

Create typed Cider API services.

## Required Files

```txt
src/services/cider/
  CiderApiClient.ts
  CiderAuthService.ts
  CiderPlaybackService.ts
  CiderQueueService.ts
  CiderLibraryService.ts
  CiderAudioService.ts
  CiderEventsService.ts
  CiderTypes.ts
  CiderErrors.ts
```

## CiderApiClient Requirements

Must support:

- base URL config
- `apptoken` header
- JSON request body
- timeout
- normalized response
- normalized error
- debug logging
- request duration
- safe GET retry
- v2 availability check

## Auth Service

Implement:

```txt
GET  /api/v2/client/info
POST /api/v2/auth/request
```

## Playback Service

Implement:

```txt
GET   /api/v2/playback
GET   /api/v2/playback/state
POST  /api/v2/playback/toggle
POST  /api/v2/playback/next
POST  /api/v2/playback/previous
PATCH /api/v2/playback/seek
PATCH /api/v2/playback/shuffle
PATCH /api/v2/playback/repeat
PATCH /api/v2/playback/autoplay
```

Only add play-item/play-url after confirming the exact API body.

## Queue Service

Implement after validation:

```txt
GET    /api/v2/queue
POST   /api/v2/queue/add-next
POST   /api/v2/queue/add-later
PATCH  /api/v2/queue/move
DELETE /api/v2/queue/:id
```

Adapt names based on real API results.

## Audio Service

Implement:

```txt
GET   /api/v2/audio/volume
PATCH /api/v2/audio/volume
```

Then add:

```txt
crossfade
automix
atmos
```

only after endpoint validation.

## Library Service

Implement:

```txt
GET /api/v2/library/playlists
GET /api/v2/library/albums
GET /api/v2/library/artists
GET /api/v2/library/songs
```

## Rules

- No fake endpoints.
- No hardcoded success.
- Every method must return typed data.
- Every method must expose raw error data for debug mode.
