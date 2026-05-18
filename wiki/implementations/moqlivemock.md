---
title: "moqlivemock (Eyevinn)"
tags: [implementation, go, javascript, eyevinn, cmsf, loc, msf, drm, locmaf]
date: 2026-04-12
last_updated: 2026-05-18
status: current
---

> **2026-05-17**: **moqlivemock v0.9.0 + warp-player v0.9.0 synchronised LOCMAF release** by [[tobbe-einarsson|tobbee]]. **3 moqlivemock PRs merged 06:47 → 09:36 UTC** plus the warp-player release at 09:40 UTC: [PR #85](https://github.com/Eyevinn/moqlivemock/pull/85) MERGED May 17 06:47 UTC (+354/−8) *"fix(audio): regenerate 10s loops with uniform MP4 sample durations"* — adds `utils/contentgen/trimaudio` post-processor that strips whole-frame encoder priming, drops trailing short sample, trims to codec target frame count, removes the `elst`, and re-anchors tfdts at 0; `internal/asset.go::GenCMAFChunk` now emits `orig.Dur`. **Audio-loop drift fix** surfacing during multi-loop soak testing. [PR #86](https://github.com/Eyevinn/moqlivemock/pull/86) MERGED 08:58 UTC (+180/−1) *"docs(LOCMAF): add document version banner, logo, and revision history"* — adds the LOCMAF logo (light/dark via `<picture>`), an explicit *"Document version: 0.1 (2026-05-17) — Wire-format `locmafVersion`: \"0.1\""* banner, and a revision-history table with the `locmaf-vX.Y` git-tag snapshot policy. **First formal LOCMAF spec versioning artifact**. [PR #87](https://github.com/Eyevinn/moqlivemock/pull/87) MERGED 09:36 UTC (+66/−7) *"chore(release): prepare v0.9.0"* — v0.9.0 changelog covers LOCMAF packaging + audio loop drift fix. [warp-player PR #129](https://github.com/Eyevinn/warp-player/pull/129) MERGED 09:40 UTC (+91/−13) *"chore: prepare v0.9.0 release"* — new `src/locmaf/` module parses LOCMAF init / `moof` / delta-`moof` per v0.1 with QUIC varints + derived `baseMediaDecodeTime`, routed through MSE; gated on catalog `locmafVersion`. **Eyevinn's pre-London setup is now: LOCMAF wire format frozen at v0.1, publisher + player released together at v0.9.0, ready for interop**.
>
> **2026-05-16**: **LOCMAF DRM documentation lands** — [PR #84](https://github.com/Eyevinn/moqlivemock/pull/84) MERGED May 16 06:55 → 10:36 UTC by [[tobbe-einarsson|tobbee]] (+326/−0, docs-only), *"docs: add DRM section to LOCMAF.md"*. New `## DRM with LOCMAF` section covers: end-to-end encrypted-CMAF → LOCMAF-wire → reconstructed-CMAF → MSE/EME/CDM pipeline (mdat bytes byte-equal end-to-end so the CDM sees identical ciphertext); catalog `contentProtections` array + per-track `contentProtectionRefIDs` + `DRMSystem` object (systemID, robustness, laURL/authzURL/certURL, pssh); **cenc vs cbcs IV-on-the-wire comparison table** (cenc carries per-sample IV on every fragment, cbcs carries constant IV once in moov); byte-lossy moof reconstruction is DRM-safe (every field the CDM consumes survives the round-trip). Completes the publisher-side documentation surface for the [[2026-06-09-london-interim|London interim]] LOCMAF demonstration with [[warp-player]] (PR #120 still open). **4 PRs by tobbee in 36 hours** (May 15 PRs #81, #82, #83 + May 16 PR #84).
>
> **2026-05-14 to 2026-05-15**: **LOCMAF tooling lands and stabilises before London** — 4 LOCMAF PRs merged in 36 hours totalling ~+5215 LOC. [PR #79](https://github.com/Eyevinn/moqlivemock/pull/79) ([[hugo-bjoers|hugobjoers]], May 14 08:08 UTC, +2886/−83) brought initial LOCMAF support. Then [[tobbe-einarsson|tobbee]] landed a tooling-iteration trio: [PR #81](https://github.com/Eyevinn/moqlivemock/pull/81) (May 15 09:36 UTC, +2115/−61) — encoder/decoder fixes (tfhd `Has*()` gating, signed `elst.media_time`, stpp/wvtt subtitle entries, BMDT discontinuity handling), a new `cmd/locmaf roundtrip` CLI, and a LOCMAF design doc. [PR #82](https://github.com/Eyevinn/moqlivemock/pull/82) (May 15 16:45 UTC, +70/−3) added an explicit **`locmafVersion`** field to the CMSF catalog (LOCMAF wire format is still evolving, e.g. field ID 10 changed semantics for absolute `moofBaseMediaDecodeTime` override). [PR #83](https://github.com/Eyevinn/moqlivemock/pull/83) (May 15 19:37 UTC, +144/−4) fixed CMSF-catalog bitrate reporting for LOCMAF tracks — calls `calcLocmafBitrate` (one full + one delta object pair) instead of misreporting CMAF wire bitrate (128 kbps AAC at one-sample-per-object was reporting 171.5 kbps; correct is ~131.9 kbps).

**Organization**: Eyevinn Technology
**Draft support**: draft-14 and draft-16 (ALPN-based version negotiation)
**Packaging formats**: CMSF, **LOC** (HEVC + AVC + AAC + Opus), **MSF**, **moq-mi** (since v0.8.0); **LOCMAF v0.1** (released v0.9.0 May 17 — encoder/decoder + roundtrip CLI + design doc with logo + catalog `locmafVersion: "0.1"` + LOCMAF-accurate bitrate reporting + DRM section)
**Demo**: [moqlivemock.demo.osaas.io](https://moqlivemock.demo.osaas.io/)

# Repositories

## moqtransport (v0.8.1 — Apr 17, 2026)
- **GitHub**: [Eyevinn/moqtransport](https://github.com/Eyevinn/moqtransport)
- **Language**: Go
- **Description**: Media over QUIC Transport library supporting draft-14 and draft-16

## moqlivemock (v0.9.0 — May 17, 2026)
- **GitHub**: [Eyevinn/moqlivemock](https://github.com/Eyevinn/moqlivemock)
- **Language**: Go
- **Description**: Live MoQ publisher/subscriber with CMSF, LOC, MSF, moq-mi, and **LOCMAF** media support, DRM, and interop testing
- **v0.9.0 highlights** (May 17): **LOCMAF (Low Overhead CMAF) v0.1 packaging** — LOC-inspired variant of CMAF encoding only the non-derivable `moof`/`moov` fields as MoQT key-value pairs using QUIC varints (first object = full moof, subsequent objects = delta moofs); audio-loop drift fix via `trimaudio` post-processor; formal `locmaf-vX.Y` git-tag snapshot policy
- **v0.8.0 highlights** (May 5): HEVC support for LOC packaging, accurate per-packaging bitrate exposed in catalog, MSF/LOC/moq-mi support added

## warp-player (v0.9.0 — May 17, 2026)
- **GitHub**: [Eyevinn/warp-player](https://github.com/Eyevinn/warp-player)
- **Language**: JavaScript / TypeScript
- **Description**: Browser-based player for CMSF media (MSE), LOC media (WebCodecs), and **LOCMAF (compressed CMAF)** over MoQ. Supports Widevine, PlayReady, FairPlay, and ClearKey on the MSE path.
- **v0.9.0 highlights** (May 17): **LOCMAF v0.1 packaging support** — new `src/locmaf/` module parses LOCMAF init / `moof` / delta-`moof` objects per v0.1 with QUIC varints and derived `baseMediaDecodeTime`, routed through the MSE pipeline; gated on catalog `locmafVersion`. TypeScript 6 + dep bumps
- **v0.8.0 highlights** (May 5): WebCodecs LOC pipeline (HEVC + AVC + AAC + Opus), MSF catalog support, mute toggle UI, namespace filtering UI, Safari `wt.closed` rejection fix

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
