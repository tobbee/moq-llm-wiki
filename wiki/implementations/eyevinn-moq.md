---
title: "Eyevinn MOQ Stack"
tags: [implementation, go, javascript, eyevinn]
date: 2026-04-10
status: current
---

# Eyevinn MOQ Stack

**Organization**: Eyevinn Technology
**Draft support**: draft-14

## Repositories

### moqtransport
- **GitHub**: [Eyevinn/moqtransport](https://github.com/Eyevinn/moqtransport)
- **Language**: Go
- **Description**: Media over QUIC Transport implementation
- **Updated**: 2026-04-09

### moqlivemock
- **GitHub**: [Eyevinn/moqlivemock](https://github.com/Eyevinn/moqlivemock)
- **Description**: Test application simulating a live MoQ video+audio publisher. Includes a subscriber app.
- **Updated**: 2026-04-07

### warp-player
- **GitHub**: [Eyevinn/warp-player](https://github.com/Eyevinn/warp-player)
- **Language**: JavaScript
- **Description**: Player for CMSF media over MoQ transport using MSE playback
- **Updated**: 2026-04-07

## Architecture

The stack covers the full media pipeline:
- **moqtransport** - Go library implementing [[moq-transport]] draft-14
- **moqlivemock** - Publisher/subscriber test tool using moqtransport
- **warp-player** - Browser-based player using [[moq-cmsf]] with MSE for playback

## Media Support (as of Jan 2026)

- **Video**: H.264, HEVC
- **Audio**: AAC, Opus, AC-3
- **Subtitles**: wvtt, stpp (live, not yet in warp-player)
- **Sync**: Wall-clock synchronized - group X starts at second X, video clock aligned with UTC modulo 10s, audio beeps on seconds
- **Catalog**: Via SUBSCRIBE (no FETCH support yet)

## Demo

- Online demo: `moqlivemock.demo.osaas.io`
- Shaka-player POC by Alvaro Velad (Atème) works with moqlivemock including subtitle display

## Interop

Currently on draft-14, which has the widest interop support. Compatible with:
- [[moq-rs]] (main branch)
- [[moxygen]] (Meta relay)
- [[xquic-moq]] (Alibaba)
- Cloudflare edge relays at `draft-14.cloudflare.mediaoverquic.com:443`

See [[interop-endpoints]] for public relay endpoints.

## Related

- [[moq-transport]] - Protocol spec (currently on draft-17, Eyevinn supports draft-14)
- [[moq-cmsf]] - CMAF format used by warp-player
- [[media-packaging]] - LOC vs CMAF approaches
- [[interop-status]] - Cross-implementation testing
