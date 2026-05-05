---
title: "moqlivemock"
tags: [implementation, go, javascript, eyevinn, cmsf, loc, msf, drm]
date: 2026-04-12
last_updated: 2026-05-05
status: current
---

**Organization**: Eyevinn Technology
**Draft support**: draft-14 and draft-16 (ALPN-based version negotiation)
**Packaging formats**: CMSF, **LOC** (HEVC + AVC + AAC + Opus), **MSF**, **moq-mi** (since v0.8.0)
**Demo**: [moqlivemock.demo.osaas.io](https://moqlivemock.demo.osaas.io/)

# Repositories

## moqtransport (v0.7.x)
- **GitHub**: [Eyevinn/moqtransport](https://github.com/Eyevinn/moqtransport)
- **Language**: Go
- **Description**: Media over QUIC Transport library supporting draft-14 and draft-16

## moqlivemock (v0.8.0 — May 5, 2026)
- **GitHub**: [Eyevinn/moqlivemock](https://github.com/Eyevinn/moqlivemock)
- **Language**: Go
- **Description**: Live MoQ publisher/subscriber with CMSF, LOC, MSF, and moq-mi media support, DRM, and interop testing
- **v0.8.0 highlights**: HEVC support for LOC packaging, accurate per-packaging bitrate exposed in catalog, MSF/LOC/moq-mi support added

## warp-player (v0.8.0 — May 5, 2026)
- **GitHub**: [Eyevinn/warp-player](https://github.com/Eyevinn/warp-player)
- **Language**: JavaScript / TypeScript
- **Description**: Browser-based player for CMSF media (MSE) **and LOC media (WebCodecs)** over MoQ. Supports Widevine, PlayReady, FairPlay, and ClearKey on the MSE path.
- **v0.8.0 highlights**: WebCodecs LOC pipeline (HEVC + AVC + AAC + Opus), MSF catalog support, mute toggle UI, namespace filtering UI, Safari `wt.closed` rejection fix

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

# CMSF ContentProtection

The CMSF ContentProtection signaling spec ([moq-wg/cmsf PR #18](https://github.com/moq-wg/cmsf/pull/18), merged Apr 14) was proposed by Eyevinn based on the moqlivemock implementation. DRM support in moqlivemock and warp-player was implemented by Hugo Björs (Eyevinn). warp-player supports Widevine, PlayReady, FairPlay, and ClearKey/ECCP. It was the first running implementation, now joined by [[shaka-player]] ([PR #9972](https://github.com/shaka-project/shaka-player/pull/9972), also merged Apr 14).

# Demo

- **Live demo**: [moqlivemock.demo.osaas.io](https://moqlivemock.demo.osaas.io/)
- [[shaka-player]] by Álvaro Velad Galván (Atème) works with moqlivemock including subtitle display and DRM

# Interop

- [[shaka-player]] subscribing to moqlivemock publisher (including CMSF ContentProtection)
- `mlmtest` client available for the [[interop-runner]] framework
- Draft-16 support opens interop with [[moq-rs]], [[moxygen]], [[libquicr]], and other draft-16 implementations

# Related

- [[moq-transport]] - Protocol spec
- [[moq-cmsf]] - CMAF format used by warp-player
- [[media-packaging]] - LOC vs CMAF approaches
- [[interop-status]] - Cross-implementation testing
