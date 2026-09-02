---
title: "moqlivemock (Eyevinn)"
tags: [implementation, go, javascript, eyevinn, cmsf, loc, msf, drm, locmaf]
date: 2026-04-12
last_updated: 2026-09-02
status: current
---

**Language**: Go (moqtransport, moqlivemock) + TypeScript/JavaScript (warp-player)
**Organization**: Eyevinn Technology
**Maintainer**: [[tobbe-einarsson|Torbjörn Einarsson]]
**GitHub**: [Eyevinn/moqtransport](https://github.com/Eyevinn/moqtransport) · [Eyevinn/moqlivemock](https://github.com/Eyevinn/moqlivemock) · [Eyevinn/warp-player](https://github.com/Eyevinn/warp-player)
**Demo**: [moqlivemock.demo.osaas.io](https://moqlivemock.demo.osaas.io/)
**Draft support**: **draft-18** (migrated 2026-08-30, ALPN-based version negotiation) — the whole stack cut **v0.14.0 "draft-18 rewrite"** tags on 2026-08-31: [[moqlivemock]] v0.14.0, [[warp-player]] v0.14.0 (draft-18-only), on top of the Go library [[moqtransport]] — now **v0.13.0** "RENDEZVOUS_TIMEOUT on SUBSCRIBE" (Sep-2; v0.11.0 draft-18 rewrite Aug-30, v0.11.1 "qlog payload cap" Aug-31, v0.12.0 "receive-side fixes for relays" Sep-1, the base of the new `mlmrel` relay)
**Packaging formats**: CMSF, LOC (HEVC + AVC + AAC + Opus), MSF, moq-mi (since v0.8.0), LOCMAF v0.1

# Overview

Eyevinn's MoQ stack spans three repositories that together cover the full media pipeline: a Go transport library, a Go live publisher/subscriber test app, and a browser-based TypeScript player using MSE. It exercises CMSF, LOC, MSF, moq-mi, and LOCMAF packaging with commercial DRM and interop testing.

# Components

## moqtransport
- **GitHub**: [Eyevinn/moqtransport](https://github.com/Eyevinn/moqtransport) — Go. Latest: **v0.13.0 "RENDEZVOUS_TIMEOUT on SUBSCRIBE"** (Sep 2, 2026; v0.12.0 "receive-side fixes for relays" Sep 1, v0.11.1 "qlog payload cap" Aug 31, v0.11.0 draft-18 rewrite Aug 30).
- Media over QUIC Transport library implementing [[moq-transport]] **draft-18** (migrated from draft-14/16 in v0.11.0; see [[moqtransport]] for the fork/upstream split).

## moqlivemock
- **GitHub**: [Eyevinn/moqlivemock](https://github.com/Eyevinn/moqlivemock) — Go. Latest release: **v0.14.0 "draft-18 rewrite"** (Aug 31, 2026, tagging the draft-18 migration merged to `main` Aug 30 via [#129](https://github.com/Eyevinn/moqlivemock/pull/129); v0.14.0 also moved the LOC Timestamp property to `0x10` per [draft-ietf-moq-loc-04](https://datatracker.ietf.org/doc/draft-ietf-moq-loc/), [#130](https://github.com/Eyevinn/moqlivemock/pull/130)).
- Live MoQ publisher (`mlmpub`) and subscriber (`mlmsub`) test tools with CMSF, LOC, MSF, moq-mi, and LOCMAF media support, DRM, and interop testing — plus `mlmtest` for the [[interop-runner]] framework, and (since Sep-1, 2026) a relay `mlmrel`.
- **`mlmrel` — MoQ relay** ([#136](https://github.com/Eyevinn/moqlivemock/pull/136), Sep-1, 2026, +2913/−233): a MoQ relay with **fanout, a group cache, and FETCH relaying**, built on [[moqtransport]] v0.12.0. Gives the Eyevinn stack its own relay role alongside publisher/subscriber/interop-client. Hardened for the [[interop-runner]] on Sep-2 (see below); not yet in a tagged release (v0.14.0 stands). OPEN: further relay work ([#135](https://github.com/Eyevinn/moqlivemock/issues/135)), `moqt://` subscriber URLs + Setup-Options path/authority in `mlmsub` ([#134](https://github.com/Eyevinn/moqlivemock/issues/134)).
  - **Runner packaging** ([#137](https://github.com/Eyevinn/moqlivemock/pull/137), +167/−0): `Dockerfile.mlmrel` + `entrypoint-relay.sh` publish **`ghcr.io/eyevinn/mlmrel`** from CI, mapping the runner's `MOQT_ROLE`/`MOQT_PORT`/`MOQT_CERT`/`MOQT_KEY`/`MOQT_MLOG_DIR` contract to mlmrel flags, with best-effort qlog when the bind-mounted mlog dir isn't writable.
  - **Answer-don't-hang fixes** ([#138](https://github.com/Eyevinn/moqlivemock/pull/138), +145/−12): a SUBSCRIBE the relay can't accept now gets **REQUEST_ERROR NOT_SUPPORTED** with the decode error as reason (surfaced by moxygen's undefined SUBSCRIPTION_FILTER type 250), and a new `-upstream-timeout` (default 5s) bounds the wait for an upstream answer, replying **TIMEOUT** downstream instead of letting the requester hang.
  - **Subscriber-owned rendezvous hold** ([#139](https://github.com/Eyevinn/moqlivemock/pull/139), +105/−58): per draft-18 §10.2.6 the hold is now the subscriber's **RENDEZVOUS_TIMEOUT** capped by `-max-rendezvous` (default 10s) — DOES_NOT_EXIST at once when the parameter is absent, TIMEOUT when the hold expires. The fixed `-pending-wait` is gone; needs [[moqtransport]] **v0.13.0**.

## warp-player
- **GitHub**: [Eyevinn/warp-player](https://github.com/Eyevinn/warp-player) — JavaScript / TypeScript. Latest: **v0.14.0 "draft-18 rewrite"** (Aug 31, 2026 — breaking [#190](https://github.com/Eyevinn/warp-player/pull/190) *"speak MoQ Transport draft-18 only"*, dropping the draft-14/16 paths).
- Browser-based player for [[moq-cmsf|CMSF]] media (MSE), LOC media (WebCodecs), and LOCMAF (compressed CMAF) over MoQ. Supports Widevine, PlayReady, FairPlay, and ClearKey on the MSE path. **CTA-608 closed-caption extraction + overlay rendering** landed Aug 2–3, 2026 on both the WebCodecs/LOC and MSE/CMAF+LOCMAF paths, with the **CC on/off toggle completed Aug 3** (see Recent Highlights). Captions render for **AVC and HEVC but not yet AV1** (AV1 caption extraction is not yet supported in the common media library); the CC button is struck through when captions are impossible.

# Catalog Handling

Supports both **FETCH** and **SUBSCRIBE** for retrieving the MSF catalog. Each `cmsf/*` and `msf/*` namespace serves its own catalog describing the available tracks under that namespace. The `moq-mi/clear` namespace has no catalog — moq-mi is identified by namespace prefix convention (see `IsMoqMINamespace` in `internal/sub/moqmi.go`).

# Media Support

- **Video**: H.264, HEVC, **AV1** (AV1 in the CMSF/CMAF + LOCMAF path only — gracefully excluded from LOC/moq-mi; **warp-player AV1 playback landed July 22** via the WebCodecs/LOC pipeline)
- **Audio**: AAC, Opus, AC-3
- **Subtitles**: wvtt, stpp (dynamically generated with timestamps and group numbers)
- **Closed captions**: **CTA-608** — auto-generated in-band caption SEI messages injected by `mlmpub` across the CMAF/LOCMAF/LOC/moq-mi serve paths and all three video codecs (AVC/HEVC/AV1), advertised in the catalog as an accessibility descriptor with cross-packaging decode round-trip verified (July 2026); a **`-cc608mode`** flag selects **paint-on** (default) / pop-on / roll-up presentation (Aug 2026). Player-side rendering is complete for AVC/HEVC; **AV1 caption rendering is pending common-media-library support**.
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

# Recent Highlights (as of September 2026)

Day-by-day PR/issue history lives in [[log|the wiki log]]; this section keeps only durable milestones.

- **`mlmrel` — the stack gains its own relay, and takes it into the interop runner** (Sep-1→2, 2026): moqlivemock added a MoQ **relay** with fanout, group cache and FETCH relaying ([#136](https://github.com/Eyevinn/moqlivemock/pull/136), +2913/−233) on [[moqtransport]] **v0.12.0**, giving the Eyevinn stack a fourth role beyond `mlmpub` / `mlmsub` / `mlmtest`. On **Sep-2** it was packaged and hardened for the [[interop-runner]]: a CI-published `ghcr.io/eyevinn/mlmrel` image ([#137](https://github.com/Eyevinn/moqlivemock/pull/137)), two answer-don't-hang fixes ([#138](https://github.com/Eyevinn/moqlivemock/pull/138) — REQUEST_ERROR NOT_SUPPORTED for un-decodable SUBSCRIBE parameters, `-upstream-timeout` bounding the upstream wait), and a **draft-18 §10.2.6 rendezvous fix** ([#139](https://github.com/Eyevinn/moqlivemock/pull/139)) moving the pending-SUBSCRIBE hold from a fixed `-pending-wait` to the subscriber's **RENDEZVOUS_TIMEOUT** — which required exposing that parameter in [[moqtransport]] **v0.13.0** ([#25](https://github.com/Eyevinn/moqtransport/pull/25)). Registration as a runner **relay** is OPEN as [runner #120](https://github.com/englishm/moq-interop-runner/pull/120) (`moqt://relay:4443`, since `mlmtest` dials raw QUIC). Still untagged in moqlivemock (v0.14.0 stands).
- **Draft-18 migration → v0.14.0 tags** (Aug 30–31, 2026): the Eyevinn stack moved off draft-14/16 to **[[moq-transport]] draft-18** ahead of the **Sep-2 virtual interop hackathon**, and **tagged v0.14.0 "draft-18 rewrite" across the stack on Aug-31**. The Go library [[moqtransport]] shipped the draft-18 rewrite as **v0.11.0** ([PR #18](https://github.com/Eyevinn/moqtransport/pull/18), +16,989/−13,359, Aug-30), bumped to **v0.11.1** ("qlog payload cap", Aug-31); **moqlivemock** migrated in [PR #129](https://github.com/Eyevinn/moqlivemock/pull/129) (+977/−436, Aug-30) then cut **v0.14.0** (Aug-31), which also **moved the LOC Timestamp property to `0x10`** per [draft-ietf-moq-loc-04](https://datatracker.ietf.org/doc/draft-ietf-moq-loc/) ([#130](https://github.com/Eyevinn/moqlivemock/pull/130)); **[[warp-player]]** cut a breaking **v0.14.0** ([#190](https://github.com/Eyevinn/warp-player/pull/190) *"speak MoQ Transport draft-18 only"*, Aug-31). The migration surfaced a §11.4.4.2 End-of-Range clarity question [[tobbe-einarsson|tobbee]] filed as [moq-transport #1861](https://github.com/moq-wg/moq-transport/issues/1861), but **[[alan-frindell|afrind]] closed it Aug-31 as *"agentic output"*** (part of a WG-wide crackdown on AI-generated issues; see [[moq-transport]] open questions and [[discussions-2026-08]]) — the underlying question stands unresolved, awaiting a re-file in the WG's preferred human style.
- **Coordinated v0.13.0 release wave** (Aug 6): moqlivemock **v0.13.0**, warp-player **v0.13.0**, and moqtransport **v0.10.0** shipped together, consolidating the CTA-608 caption + AV1 work. moqlivemock gained a selectable **`-cc608mode`** (paint-on default / pop-on / roll-up, [#125](https://github.com/Eyevinn/moqlivemock/pull/125)), a **`go-608` v0.9.0** bump ([#124](https://github.com/Eyevinn/moqlivemock/pull/124)), and a **deterministic catalog codec ordering** (video AVC → HEVC → AV1, audio AAC → Opus → AC-3, [#126](https://github.com/Eyevinn/moqlivemock/pull/126)); warp-player added a **struck-through CC button when captions are impossible** ([#180](https://github.com/Eyevinn/warp-player/pull/180)) and completed its cc608 end-to-end verification ([#177](https://github.com/Eyevinn/warp-player/pull/177)). AV1 now carries CTA-608 like AVC/HEVC on both the WebCodecs and MSE/EME paths, though **warp-player does not yet render AV1 captions**. This wave shipped on **draft-14 & draft-16**; the stack has since **migrated to draft-18** (Aug 30, 2026 — see the top highlight).
- **CTA-608 in-band closed captions** (Jul 24–25): `mlmpub` gained an internal `cc608` package that generates CTA-608 caption data as H.264/HEVC SEI messages ([PR #114](https://github.com/Eyevinn/moqlivemock/pull/114)), injected across all four serve paths — CMAF/LOCMAF/LOC/moq-mi ([PR #115](https://github.com/Eyevinn/moqlivemock/pull/115)), then **advertised in the catalog as an accessibility descriptor with cross-packaging decode-round-trip verification** ([PR #117](https://github.com/Eyevinn/moqlivemock/pull/117), merged Jul 25, +278/−5) — completing the publisher side of the caption epic. **The warp-player player side landed Aug 2** (resolving [warp-player #156](https://github.com/Eyevinn/warp-player/issues/156)): CTA-608 *extraction* on both the WebCodecs/LOC path ([warp-player #169](https://github.com/Eyevinn/warp-player/pull/169)) and the MSE/CMAF+LOCMAF path ([#171](https://github.com/Eyevinn/warp-player/pull/171)), plus a timed-text overlay seam + CTA-608 *renderer* ([#170](https://github.com/Eyevinn/warp-player/pull/170), ~4,700 LOC total). The **CC on/off toggle + caption-sink wiring completed Aug 3** ([#173](https://github.com/Eyevinn/warp-player/pull/173) merged), closing the CTA-608 capture→publish→extract→render round trip end to end. An **encrypted-playback thread then opened**: a test proving **CTA-608 captions survive cbcs subsample encryption** ([#174](https://github.com/Eyevinn/warp-player/pull/174) merged Aug 3) landed alongside a new bug — **encrypted playback failing on the first audio packet** ([warp-player #175](https://github.com/Eyevinn/warp-player/issues/175), OPEN, blocking the encrypted interop rows). Makes the Eyevinn stack an accessibility-signaling testbed on top of its AVC/HEVC/AV1 codec coverage.
- **AV1 as a first-class CMSF codec** (Jul 21, [PR #102](https://github.com/Eyevinn/moqlivemock/pull/102)): AV1 (`av01`) joins AVC and HEVC in the CMSF/CMAF + LOCMAF path — SVT-AV1 low-delay CBR test content, appearing in every CMSF catalog as CMAF + LOCMAF renditions, with a new `Codec:` overlay line on all generated video. AV1 is **gracefully excluded from LOC/moq-mi** (those paths keep AVC/HEVC). moqlivemock's first AV1-over-MoQ media path. **warp-player AV1 playback landed the next day** (Jul 22, [warp-player PR #155](https://github.com/Eyevinn/warp-player/pull/155), +440/−9) — AV1 (`av01`) video decode via the WebCodecs/LOC pipeline — completing the AV1 capture→publish→play round trip. Separately, a **"Add TS support" request** ([issue #103](https://github.com/Eyevinn/moqlivemock/issues/103)) was filed by Álvaro Velad Galván (Shaka Player).
- **Joining-FETCH catalog retrieval** (Jul 4) landed across all three repos: a subscriber retrieves the current catalog object via a relative joining FETCH instead of SUBSCRIBE-and-wait. moqtransport **v0.9.0** ([PR #14](https://github.com/Eyevinn/moqtransport/pull/14)) added publisher-side joining-FETCH resolution (draft-16); moqlivemock ([PR #95](https://github.com/Eyevinn/moqlivemock/pull/95)) added a `-catalog-mode` flag; warp-player ([PR #149](https://github.com/Eyevinn/warp-player/pull/149)) mirrored it in the TS/MSE player.
- **Interop-robustness hardening** (Jun, moqlivemock v0.11.1): bound interop SETUP by the per-test deadline and refuse a silent WebTransport draft-14 downgrade, so one hung peer can't stall the sequential interop matrix. The fix was pushed down into moqtransport itself so any consumer benefits.
- **LOCMAF: frozen, DRM-capable, then extracted** (May–Jul): the wire format froze at **v0.1** in **v0.9.0** (May 17), publisher and player released together for interop, with an end-to-end **encrypted** path (encrypted-CMAF → LOCMAF-wire → reconstructed-CMAF → MSE/EME/CDM, mdat bytes byte-equal so the CDM sees identical ciphertext; catalog `contentProtections` covering cenc and cbcs). **v0.12.0** (Jul 6) then pulled the implementation out into the standalone [Eyevinn/locmaf](https://github.com/Eyevinn/locmaf) module shared with the [[moq-locmaf|LOCMAF]] draft, shipping LOCMAF v0.3. Earlier, **v0.8.0** (May 5) added HEVC LOC packaging, MSF/LOC/moq-mi support, and accurate per-packaging bitrate in the catalog.

# Interop

- [[shaka-player]] subscribing to moqlivemock publisher (including CMSF ContentProtection)
- **`mlmtest` — registered draft-18 client** in the [[interop-runner]] (moved to draft-18 via [runner #114](https://github.com/englishm/moq-interop-runner/pull/114), Sep-1)
- **`mlmrel` — relay role**, registration OPEN as [runner #120](https://github.com/englishm/moq-interop-runner/pull/120). Locally, mlmrel passes all six relay cases against `mlmtest`, and **8 of the 12 registered draft-18 clients** pass against it (aiomoqt, imquic, moq-dev-rs, moqlivemock, stitcher-moq, xquic-draft-18, moq5, moqtopus); the four failures are client-side — [[moq-js|moq-dev-js]] needs a WebTransport URL, [[moq-rs]] fails only its own two extra PUBLISH cases (unimplemented in [[moqtransport]]), and [[moxygen]]/[[openmoq|moqx]] send an undefined SUBSCRIPTION_FILTER type 250 (`LargestGroup`)
- Draft-18 alignment (Aug-30) puts the stack on the current interop target shared with [[moq-rs]], [[moxygen]], [[libquicr]], [[imquic]] and the rest of the draft-18 roster

# Related

- [[moq-transport]] - Protocol spec
- [[moq-cmsf]] - CMAF format used by warp-player
- [[media-packaging]] - LOC vs CMAF approaches
- [[interop-status]] - Cross-implementation testing
