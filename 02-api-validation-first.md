# 02 – API Validation First

## Goal

Before building UI, prove the Cider API actually works.

This project previously had API issues, so do not build fake UI on top of broken endpoints.

## Base API

```txt
http://<CIDER_HOST>:10767/api/v2
```

## Auth Header

```txt
apptoken: <TOKEN>
```

## Required Test Screen

Create:

```txt
src/screens/ApiDebugScreen.tsx
```

## Required API Tests

The screen must test these endpoints one by one:

```txt
GET  /api/v2/client/info
POST /api/v2/auth/request
GET  /api/v2/playback
GET  /api/v2/playback/state
GET  /api/v2/queue
GET  /api/v2/audio/volume
GET  /api/v2/library/playlists
```

## Debug UI Must Show

For each request:

- endpoint
- method
- request body
- status code
- response time
- raw JSON
- parsed result
- error code
- missing scope error
- timeout error

## Rules

- Do not continue guessing endpoints if they fail.
- Log the exact response.
- Adapt the API client based on real responses.
- Use v2 first.
- Add v1 fallback only after v2 failure is confirmed.
