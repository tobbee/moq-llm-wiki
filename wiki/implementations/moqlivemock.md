---
title: "moqlivemock (Eyevinn)"
tags: [implementation, go, javascript, eyevinn, cmsf, loc, msf, drm, locmaf]
date: 2026-04-12
last_updated: 2026-05-09
status: current
---

**Organization**: Eyevinn Technology
**Draft support**: draft-14 and draft-16 (ALPN-based version negotiation)
**Packaging formats**: CMSF, **LOC** (HEVC + AVC + AAC + Opus), **MSF**, **moq-mi** (since v0.8.0); **LOCMAF in PR** (May 7, experimental)
**Demo**: [moqlivemock.demo.osaas.io](https://moqlivemock.demo.osaas.io/)

# Repositories

## moqtransport (v0.8.1 — Apr 17, 2026)
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

Supports both **FETCH** and **SUBSCRIBE** for retrieving the MSF catalog. Each `cmsf/*` and `msf/*` namespace serves its own catalog describing the available tracks under that namespace. The `moq-mi/clear` namespace has no catalog — moq-mi is identified by namespace prefix convention (see `IsMoqMINamespace` in `internal/sub/moqmi.go`).

# Media Support

- **Video**: H.264, HEVC
- **Audio**: AAC, Opus, AC-3
- **Subtitles**: wvtt, stpp (dynamically generated with timestamps and group numbers)
- **Sync**: Wall-clock synchronized — group X starts at second X, video clock aligned with UTC modulo 10s, audio beeps on seconds
- **Format**: [[moq-cmsf|CMSF]] (CMAF chunks over MOQT)

# Namespaces

`mlmpub` announces a fixed set of namespaces, each carrying a different packaging and (for CMSF) protection mode. Subscribers pick a namespace to select packaging/protection:

| Namespace | Packaging | Protection | Details |
|-----------|-----------|------------|---------|
| `cmsf/clear` | CMSF (CMAF chunks) | None | Unencrypted CMSF — default for `mlmsub` |
| `cmsf/drm-{scheme}` | CMSF (CMAF chunks) | Commercial DRM | Widevine, PlayReady, FairPlay via CPIX; `{scheme}` = `cenc` or `cbcs` |
| `cmsf/eccp-{scheme}` | CMSF (CMAF chunks) | ClearKey / ECCP | Explicit key delivery via HTTP `/clearkey` side endpoint |
| `msf/clear` | LOC (raw codec frames) | None | MSF catalog describing LOC tracks (HEVC + AVC + AAC + Opus) |
| `moq-mi/clear` | moq-mi | None | MoQ Media Interop format (no catalog; convention-based namespace prefix) |

All five namespaces are announced concurrently when `mlmpub` runs, so subscribers can choose the packaging and protection model independently. The CMSF DRM/ECCP namespaces are only announced when a DRM config or ClearKey IV/KID is provided.

# CMSF ContentProtection

The CMSF ContentProtection signaling spec ([moq-wg/cmsf PR #18](https://github.com/moq-wg/cmsf/pull/18), merged Apr 14) was proposed by Eyevinn based on the moqlivemock implementation. DRM support in moqlivemock and warp-player was implemented by Hugo Björs (Eyevinn). warp-player supports Widevine, PlayReady, FairPlay, and ClearKey/ECCP. It was the first running implementation, now joined by [[shaka-player]] ([PR #9972](https://github.com/shaka-project/shaka-player/pull/9972), also merged Apr 14).

# LOCMAF (Low Overhead CMAF) — experimental, in PR

**[Eyevinn/moqlivemock PR #79](https://github.com/Eyevinn/moqlivemock/pull/79)** (Hugo Björs, **OPEN** since May 7 2026, +2697/−83, 17 files) and **[Eyevinn/warp-player PR #120](https://github.com/Eyevinn/warp-player/pull/120)** (+2211/−188, 14 files) introduce **LOCMAF** — a compact LOC-inspired/compatible CMAF packaging format for MoQT. **Master's-thesis context**, with measurements pending. See [[media-packaging]] for the full design and comparison vs. compressed-mp4. A separate warp-player branch tests LOCMAF + DRM (not in PR #120).

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
