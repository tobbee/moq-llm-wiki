---
title: "moqlivemock"
tags: [implementation, go, javascript, eyevinn, cmsf, drm]
date: 2026-04-12
last_updated: 2026-04-14
status: current
---

**Organization**: Eyevinn Technology
**Draft support**: draft-14 and draft-16 (ALPN-based version negotiation)
**Demo**: [moqlivemock.demo.osaas.io](https://moqlivemock.demo.osaas.io/)

# Repositories

## moqtransport (v0.7.0)
- **GitHub**: [Eyevinn/moqtransport](https://github.com/Eyevinn/moqtransport)
- **Language**: Go
- **Description**: Media over QUIC Transport library supporting draft-14 and draft-16

## moqlivemock (v0.7.0)
- **GitHub**: [Eyevinn/moqlivemock](https://github.com/Eyevinn/moqlivemock)
- **Language**: Go
- **Description**: Live MoQ publisher/subscriber with CMSF media, DRM, and interop testing support

## warp-player (v0.7.1)
- **GitHub**: [Eyevinn/warp-player](https://github.com/Eyevinn/warp-player)
- **Language**: JavaScript
- **Description**: Browser-based player for CMSF media over MoQ using MSE playback. Supports Widevine, ClearKey, and experimental PlayReady.

# Architecture

The stack covers the full media pipeline:
- **moqtransport** - Go library implementing [[moq-transport]] draft-14 and draft-16
- **moqlivemock** - Publisher (`mlmpub`) and subscriber (`mlmsub`) test tools, plus `mlmtest` for the [[interop-runner]] framework
- **warp-player** - Browser-based player using [[moq-cmsf]] with MSE for playback

# Catalog Handling

Supports both **FETCH** and **SUBSCRIBE** for retrieving the MSF catalog. Each namespace provides its own catalog describing available tracks.

# Media Support

- **Video**: H.264, HEVC
- **Audio**: AAC, Opus, AC-3
- **Subtitles**: wvtt, stpp (dynamically generated with timestamps and group numbers)
- **Sync**: Wall-clock synchronized — group X starts at second X, video clock aligned with UTC modulo 10s, audio beeps on seconds
- **Format**: [[moq-cmsf|CMSF]] (CMAF chunks over MOQT)

# Content Protection & Namespaces

Three content protection modes, each served under its own namespace:

| Namespace | Protection | Details |
|-----------|-----------|---------|
| `cmsf/clear` | None | Unencrypted CMSF |
| `cmsf/drm-{scheme}` | Commercial DRM | Widevine, PlayReady, FairPlay via CPIX |
| `cmsf/eccp-{scheme}` | ClearKey / ECCP | Explicit key delivery via HTTP |

All three modes run simultaneously, allowing subscribers to choose their preferred protection level by subscribing to the appropriate namespace.

# Demo

- **Live demo**: [moqlivemock.demo.osaas.io](https://moqlivemock.demo.osaas.io/)
- [[shaka-player]] POC by Alvaro Velad (Atème) works with moqlivemock including subtitle display

# Interop

- [[shaka-player]] POC subscribing to moqlivemock publisher
- `mlmtest` client available for the [[interop-runner]] framework
- Draft-16 support opens interop with [[moq-rs]], [[moxygen]], [[libquicr]], and other draft-16 implementations

# Related

- [[moq-transport]] - Protocol spec
- [[moq-cmsf]] - CMAF format used by warp-player
- [[media-packaging]] - LOC vs CMAF approaches
- [[interop-status]] - Cross-implementation testing
