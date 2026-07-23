---
title: "moqlivemock (Eyevinn)"
tags: [implementation, go, javascript, eyevinn, cmsf, loc, msf, drm, locmaf]
date: 2026-04-12
last_updated: 2026-07-23
status: current
---

**Language**: Go (moqtransport, moqlivemock) + TypeScript/JavaScript (warp-player)
**Organization**: Eyevinn Technology
**Maintainer**: [[tobbe-einarsson|Torbjörn Einarsson]]
**GitHub**: [Eyevinn/moqtransport](https://github.com/Eyevinn/moqtransport) · [Eyevinn/moqlivemock](https://github.com/Eyevinn/moqlivemock) · [Eyevinn/warp-player](https://github.com/Eyevinn/warp-player)
**Demo**: [moqlivemock.demo.osaas.io](https://moqlivemock.demo.osaas.io/)
**Draft support**: draft-14 and draft-16 (ALPN-based version negotiation)
**Packaging formats**: CMSF, LOC (HEVC + AVC + AAC + Opus), MSF, moq-mi (since v0.8.0), LOCMAF v0.1

# Overview

Eyevinn's MoQ stack spans three repositories that together cover the full media pipeline: a Go transport library, a Go live publisher/subscriber test app, and a browser-based TypeScript player using MSE. It exercises CMSF, LOC, MSF, moq-mi, and LOCMAF packaging with commercial DRM and interop testing.

# Components

## moqtransport
- **GitHub**: [Eyevinn/moqtransport](https://github.com/Eyevinn/moqtransport) — Go. Latest: **v0.9.0** (Jul 4, 2026).
- Media over QUIC Transport library implementing [[moq-transport]] draft-14 and draft-16.

## moqlivemock
- **GitHub**: [Eyevinn/moqlivemock](https://github.com/Eyevinn/moqlivemock) — Go. Latest: **v0.11.1** (Jun 9, 2026).
- Live MoQ publisher (`mlmpub`) and subscriber (`mlmsub`) test tools with CMSF, LOC, MSF, moq-mi, and LOCMAF media support, DRM, and interop testing — plus `mlmtest` for the [[interop-runner]] framework.

## warp-player
- **GitHub**: [Eyevinn/warp-player](https://github.com/Eyevinn/warp-player) — JavaScript / TypeScript. Latest: **v0.9.0** (May 17, 2026).
- Browser-based player for [[moq-cmsf|CMSF]] media (MSE), LOC media (WebCodecs), and LOCMAF (compressed CMAF) over MoQ. Supports Widevine, PlayReady, FairPlay, and ClearKey on the MSE path.

# Catalog Handling

Supports both **FETCH** and **SUBSCRIBE** for retrieving the MSF catalog. Each `cmsf/*` and `msf/*` namespace serves its own catalog describing the available tracks under that namespace. The `moq-mi/clear` namespace has no catalog — moq-mi is identified by namespace prefix convention (see `IsMoqMINamespace` in `internal/sub/moqmi.go`).

# Media Support

- **Video**: H.264, HEVC, **AV1** (AV1 in the CMSF/CMAF + LOCMAF path only — gracefully excluded from LOC/moq-mi; **warp-player AV1 playback landed July 22** via the WebCodecs/LOC pipeline)
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

The CMSF ContentProtection signaling spec ([moq-wg/cmsf PR #18](https://github.com/moq-wg/cmsf/pull/18), merged Apr 14) was proposed by Eyevinn based on the moqlivemock implementation. DRM support in moqlivemock and warp-player was implemented by [[hugo-bjoers|Hugo Björs]] (Eyevinn). warp-player supports Widevine, PlayReady, FairPlay, and ClearKey/ECCP. It was the first running implementation, now joined by [[shaka-player]] ([PR #9972](https://github.com/shaka-project/shaka-player/pull/9972), also merged Apr 14).

# LOCMAF (Low Overhead CMAF)

**LOCMAF** is a compact LOC-inspired/compatible CMAF packaging format for MoQT, encoding only the non-derivable `moof`/`moov` fields as MoQT key-value pairs using QUIC varints (first object = full moof, subsequent objects = delta moofs). It carries a `locmafVersion` field in the CMSF catalog and follows a `locmaf-vX.Y` git-tag snapshot policy. **v0.1** shipped in moqlivemock/warp-player **v0.9.0** (May 17, 2026), including an encoder/decoder, a `cmd/locmaf roundtrip` CLI, a design doc, and a DRM section. Initial support originated in a Master's-thesis context (Hugo Björs). See [[media-packaging]] for the full design and comparison vs. compressed-mp4.

# Demo

- **Live demo**: [moqlivemock.demo.osaas.io](https://moqlivemock.demo.osaas.io/)
- [[shaka-player]] by Álvaro Velad Galván (Atème) works with moqlivemock including subtitle display and DRM

# Recent Highlights (as of July 2026)

Day-by-day PR/issue history lives in [[log|the wiki log]]; this section keeps only durable milestones.

- **AV1 as a first-class CMSF codec** (Jul 21, [PR #102](https://github.com/Eyevinn/moqlivemock/pull/102)): AV1 (`av01`) joins AVC and HEVC in the CMSF/CMAF + LOCMAF path — SVT-AV1 low-delay CBR test content, appearing in every CMSF catalog as CMAF + LOCMAF renditions, with a new `Codec:` overlay line on all generated video. AV1 is **gracefully excluded from LOC/moq-mi** (those paths keep AVC/HEVC). moqlivemock's first AV1-over-MoQ media path. **warp-player AV1 playback landed the next day** (Jul 22, [warp-player PR #155](https://github.com/Eyevinn/warp-player/pull/155), +440/−9) — AV1 (`av01`) video decode via the WebCodecs/LOC pipeline — completing the AV1 capture→publish→play round trip. Separately, a **"Add TS support" request** ([issue #103](https://github.com/Eyevinn/moqlivemock/issues/103)) was filed by Álvaro Velad Galván (Shaka Player).
- **v0.12.0 ships LOCMAF v0.3, codec extracted to a standalone module** (Jul 6): the LOCMAF implementation was pulled out of moqlivemock into the standalone [Eyevinn/locmaf](https://github.com/Eyevinn/locmaf) module (shared with the [[moq-locmaf|LOCMAF]] draft).
- **Joining-FETCH catalog retrieval** (Jul 4) landed across all three repos: a subscriber retrieves the current catalog object via a relative joining FETCH instead of SUBSCRIBE-and-wait. moqtransport **v0.9.0** ([PR #14](https://github.com/Eyevinn/moqtransport/pull/14)) added publisher-side joining-FETCH resolution (draft-16); moqlivemock ([PR #95](https://github.com/Eyevinn/moqlivemock/pull/95)) added a `-catalog-mode` flag; warp-player ([PR #149](https://github.com/Eyevinn/warp-player/pull/149)) mirrored it in the TS/MSE player.
- **Interop-robustness hardening** (Jun, moqlivemock v0.11.1): bound interop SETUP by the per-test deadline and refuse a silent WebTransport draft-14 downgrade, so one hung peer can't stall the sequential interop matrix. The fix was pushed down into moqtransport itself so any consumer benefits.
- **LOCMAF v0.1** (May 17, v0.9.0): wire format frozen at v0.1 with publisher and player released together, ready for interop.
- **LOCMAF DRM support**: end-to-end encrypted-CMAF → LOCMAF-wire → reconstructed-CMAF → MSE/EME/CDM pipeline (mdat bytes byte-equal end-to-end so the CDM sees identical ciphertext); catalog `contentProtections` covering both cenc and cbcs schemes.
- **v0.8.0** (May 5): added HEVC LOC packaging, MSF/LOC/moq-mi support, and accurate per-packaging bitrate exposed in the catalog.

# Interop

- [[shaka-player]] subscribing to moqlivemock publisher (including CMSF ContentProtection)
- `mlmtest` client available for the [[interop-runner]] framework
- Draft-16 support opens interop with [[moq-rs]], [[moxygen]], [[libquicr]], and other draft-16 implementations

# Related

- [[moq-transport]] - Protocol spec
- [[moq-cmsf]] - CMAF format used by warp-player
- [[media-packaging]] - LOC vs CMAF approaches
- [[interop-status]] - Cross-implementation testing
