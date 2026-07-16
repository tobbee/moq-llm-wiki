---
title: "moq-dev/moq (Luke Curley)"
tags: [implementation, rust, typescript, moq-lite, hang]
date: 2026-04-12
last_updated: 2026-07-16
status: current
---

**Language**: Rust + TypeScript (monorepo)
**Maintainer**: [[luke-curley]]
**GitHub**: [moq-dev/moq](https://github.com/moq-dev/moq) (was kixelated/moq-rs → kixelated/moq)
**Website**: [moq.dev](https://moq.dev)
**Documentation**: [doc.moq.dev](https://doc.moq.dev/)
**Slack**: #moq-rs (C09CG9V7A2Y) — shared channel, covers both this and [[moq-rs]]

# Overview

Luke Curley's original MOQ implementation, now a monorepo containing both Rust and TypeScript packages. Implements **moq-lite**, a simplified subset of the IETF moq-transport spec that prioritizes simplicity and practical deployment. Also includes **Hang**, a media-specific protocol layer on top of moq-lite (analogous to HLS/DASH) handling codecs, containers, and catalog management.

The project describes itself as "generic for any live data, not just media" though video streaming is the primary use case.

# History

- **2022-06-29**: Created as `kixelated/moq-rs` — the original Rust MOQ implementation
- **2023-05-24**: `kixelated/moq-js` created as a companion TypeScript library
- **~2024-10**: Mike English forked the codebase to create an IETF WG-aligned version (see [[moq-rs]] and [[moq-js]])
- **2025-06-20**: `kixelated/moq-js` archived ("Moved to kixelated/moq. It's much better now.")
- **Later**: Renamed/transferred to `moq-dev/moq` as a combined Rust + TypeScript monorepo

The project diverged from strict IETF WG spec compliance when Luke pursued his own moq-lite design. It now has adapter shims for IETF MoQ WG drafts, enabling interop with IETF-aligned implementations.

# Protocol

- **[[moq-lite]]**: Simplified transport protocol (Luke's own spec, [draft-lcurley-moq-lite](https://datatracker.ietf.org/doc/draft-lcurley-moq-lite/)); wire tracks the **-05** revision (published 2026-06-30), hardened by a pre-merge moq-net/js API pass ([PR #2170](https://github.com/moq-dev/moq/pull/2170), July 12) with session Role now advertised in the -05 SETUP ([PR #2201](https://github.com/moq-dev/moq/pull/2201), merged July 14). A **-06** design cycle is underway in-repo — the `moq-lite-06-wip` PRs add typed announce ids ([PR #2160](https://github.com/moq-dev/moq/pull/2160), merged July 12) and cost-based cache-aware routing with a vendored route-cost Internet-Draft ([PR #2179](https://github.com/moq-dev/moq/pull/2179), July 12, OPEN). IETF draft sources are now vendored into the monorepo and built with nix + just ([PR #2159](https://github.com/moq-dev/moq/pull/2159), July 10).
- **Hang**: Media-specific encoding/streaming layer on top of moq-lite
- **[[moq-msf|MSF]]**: draft-01 supported behind a version-agnostic snapshot
- **IETF adapter shims**: interop with IETF draft implementations (draft-14 through **draft-19**); first open-source implementation to ship draft-18 ([PR #1418](https://github.com/moq-dev/moq/pull/1418), 2026-05-18), and shipped draft-19 (`moqt-19`) within hours of the July-6 cut ([PR #2106](https://github.com/moq-dev/moq/pull/2106))

# Rust Packages

- `moq-lite` — core transport library
- `moq-relay` — server/relay; exposes a Prometheus `/metrics` endpoint for node traffic ([PR #2172](https://github.com/moq-dev/moq/pull/2172), July 12)
- `moq-token` — authentication; the connection transport is now forwarded to the `--auth-api` hook ([PR #2132](https://github.com/moq-dev/moq/pull/2132), July 12)
- `moq-native` — QUIC helpers; the **default QUIC backend flipped to quinn** ([PR #2285](https://github.com/moq-dev/moq/pull/2285), July 15; previously moq-dev's own `noq` with quinn opt-in), with `quic::Client` / `quic::Server` transport config ([PR #2161](https://github.com/moq-dev/moq/pull/2161), July 11)
- `moq-mux` — media pipeline (per-codec splitters, container import/export)
- `moq-transcode` — just-in-time transcoding of Hang broadcasts (NVENC-capable), so one ingested broadcast can be served in multiple codecs/renditions ([PR #2140](https://github.com/moq-dev/moq/pull/2140), July 10); a `moq transcode` CLI verb plus decode-once-per-source + GPU resize fanout followed ([PR #2158](https://github.com/moq-dev/moq/pull/2158), July 12)
- `moq-json` — generic (non-media) JSON tracks, split into snapshot/stream modules and exposed through moq-ffi/libmoq ([PR #2196](https://github.com/moq-dev/moq/pull/2196), July 12) — reinforces the "generic for any live data" framing
- `moq-hls`, `moq-rtmp`, `moq-srt`, `moq-rtc` — media gateway crates (see Media gateways below)
- `moq-ffi` / `libmoq` — C FFI surface for Go/Swift/Kotlin bindings; the July 11–12 expansion added a group-FETCH API ([PR #2142](https://github.com/moq-dev/moq/pull/2142)), a reworked raw-track C ABI ([PR #2171](https://github.com/moq-dev/moq/pull/2171)), track-info accessors ([PR #2177](https://github.com/moq-dev/moq/pull/2177)), raw-frame timestamps + track datagrams ([PR #2174](https://github.com/moq-dev/moq/pull/2174) / [PR #2175](https://github.com/moq-dev/moq/pull/2175)), JSON tracks, and a Go-wrapper catch-up ([PR #2168](https://github.com/moq-dev/moq/pull/2168)); July 13 layered ergonomic per-language wrappers on top — Swift JSON wrappers with explicit snapshot mode ([PR #2236](https://github.com/moq-dev/moq/pull/2236)), Go raw-frame-timestamp writes ([PR #2230](https://github.com/moq-dev/moq/pull/2230)), a compile+test Kotlin `just kt check` ([PR #2227](https://github.com/moq-dev/moq/pull/2227)), and a **Python `moq-rs` 0.3.2** release with JSON stream wrappers ([PR #2214](https://github.com/moq-dev/moq/pull/2214))
- `moq-video` — native capture/encode/decode; gained **PipeWire screen capture on Linux** ([PR #2238](https://github.com/moq-dev/moq/pull/2238), July 13), a native desktop capture source alongside the browser capture paths

# TypeScript Packages (js/)

- `lite` — browser-compatible moq-lite transport
- `hang` — Hang media layer (total rewrite, not derived from kixelated/moq-js)
- `watch` — viewer/subscriber; the **MSE backend was removed and the WebCodecs pipeline inlined** ([PR #2288](https://github.com/moq-dev/moq/pull/2288), July 15) — the player is now WebCodecs-only
- `publish` — publisher
- `signals`, `clock`, `common`, `token` — supporting packages

(The UI migrated from SolidJS to vanilla Web Components in May 2026, removing `@moq/ui-core`.)

**Safari support** landed July 12 (fperex): `net` handles WebTransport datagram-API variants ([PR #2198](https://github.com/moq-dev/moq/pull/2198)) and exposes the negotiated transport on `Established` ([PR #2192](https://github.com/moq-dev/moq/pull/2192)); `watch` surfaces unsupported-codec errors ([PR #2197](https://github.com/moq-dev/moq/pull/2197)) and no longer latches the connection off after a Safari `pagehide` ([PR #2185](https://github.com/moq-dev/moq/pull/2185)); Safari hardware-encode + worker capture on the `publish` side and 48 kHz-Opus resampling remain in flight ([PR #2190](https://github.com/moq-dev/moq/pull/2190) / [PR #2191](https://github.com/moq-dev/moq/pull/2191), OPEN). This superseded the earlier single umbrella PR #2163, which was closed and split into these focused changes.

# Media gateways

Bidirectional ingest **and** egress bridges between MoQ broadcasts and legacy media transports, built on `moq-mux`:

- **RTMP / enhanced-RTMP**, **SRT**, **WebRTC (WHIP/WHEP)**, **HLS / LL-HLS**, **MPEG-TS** — WHIP ingest bridges H.264/H.265/AV1 symmetric with WHEP egress ([PR #2139](https://github.com/moq-dev/moq/pull/2139), July 10)
- Native hardware codecs (H.264/H.265 encode + decode via VideoToolbox, Media Foundation/DXGI, NVENC/**NVDEC** — NVDEC now also decodes **AV1**, [PR #2178](https://github.com/moq-dev/moq/pull/2178), July 12 — VAAPI), dropping the ffmpeg runtime dependency; a **zero-copy NVDEC → NVENC** GPU transcode path keeps frames in GPU memory ([PR #2145](https://github.com/moq-dev/moq/pull/2145), July 10)
- CMSF muxer/demuxer (first contributed by AWS)

# Public Infrastructure

- `cdn.moq.dev/anon` — browser pub/sub testing (QUIC + WebTransport)
- Interop docs: [doc.moq.dev/concept/standard/interop.html](https://doc.moq.dev/concept/standard/interop.html)

# Recent Highlights (as of July 2026)

Day-by-day PR/issue history lives in [[log|the wiki log]]; this section keeps only durable milestones.

- **First open-source impl to ship IETF draft-18** ([PR #1418](https://github.com/moq-dev/moq/pull/1418), May 18) — 6 days after publication, the fastest draft-revision turnaround the wiki has tracked. Wire `0xff000012` / ALPN `moqt-18`. Version matching switched to "newest defaults forward" so future drafts inherit unless opted out.
- **moq-lite-05 wire** landed late June and was finalized in early July: SETUP + PATH parameter, TRACK_INFO, SUBSCRIBE_END, mandatory per-frame timestamps + per-track timescale, and QUIC datagram delivery.
- **Media-gateway breadth reached `main`** through June via `dev` → `main` backport sweeps — the full `moq-mux` pipeline plus the RTMP/SRT/RTC/HLS gateway crates. External users now file gateway bugs (e.g. open-GOP round-trip, catalog-track lifetime), a sign of real usage. **`moq-hls` is being hardened into a standalone HLS origin** (July 14–15): `export::Broadcaster` rewritten as an owned poll-driven state machine ([PR #2258](https://github.com/moq-dev/moq/pull/2258)) plus byte-range honoring, master-variant audio-group handling, and catalog-rendition reconciliation ([PR #2271](https://github.com/moq-dev/moq/pull/2271) / [PR #2264](https://github.com/moq-dev/moq/pull/2264) / [PR #2266](https://github.com/moq-dev/moq/pull/2266)) — the behavior needed to serve legacy HLS players from a MoQ ingest.
- **GPU transcoding pipeline** landed July 10: a new `moq-transcode` crate for just-in-time NVENC transcode of Hang broadcasts plus NVDEC hardware decode and a zero-copy NVDEC → NVENC path — a complete GPU decode→transcode→encode chain — and the WebRTC WHIP ingest gained H.265/AV1 bridges to match WHEP egress. A `moq transcode` CLI verb + decode-once/GPU-resize fanout and NVDEC AV1 decode followed July 12.
- **C-FFI / embedding surface expansion** (July 11–13): the `moq-ffi` / `libmoq` C ABI grew a group-FETCH API, raw-track ABI, track-info accessors, raw-frame timestamps, track datagrams, and generic JSON tracks, with the Go wrapper caught up; July 13 layered ergonomic per-language wrappers on top — Swift JSON wrappers with explicit snapshot mode, Go raw-frame-timestamp writes, a compile+test Kotlin build check, and a Python `moq-rs` 0.3.2 release — the plumbing that lets non-Rust (Go/Swift/Kotlin/Python) consumers drive the gateway, transcode, and generic-data features.
- **Platform reach broadened** (July 12–14): Safari support landed in the TS `net`/`watch`/`publish` stack (WebTransport datagram-API variants, negotiated-transport exposure, `pagehide` connection fix, unsupported-codec errors), and the Safari hardware-encode path closed out July 14 with fperex's [PR #2211](https://github.com/moq-dev/moq/pull/2211) (prefer the codecs Safari actually HW-encodes); `moq-video` also gained **PipeWire screen capture on Linux** ([PR #2238](https://github.com/moq-dev/moq/pull/2238)) — MoQ now reaches more browsers and more native capture sources, not just Chromium + camera.
- **Compression experiment** (group-scoped DEFLATE, extracted into a `moq-flate` / `@moq/flate` crate) is being reconsidered rather than linearly shipped — the code side of Luke's June "MoQ + Compression" list thread.
- **Corporate-contributor footprint** spans Cloudflare, Nokia, Eyevinn, OpenMOQ, and AWS. Most day-to-day churn is Luke Curley's "codex" AI-assisted bugfix/backport batches.

# Interop

- Registered in [[interop-runner]] as **moq-dev-rs** (Rust) and **moq-dev-js** (JS/Hang)
- v17 interop achieved with [[lorenzo-miniero]]'s [[imquic]] (2026-04-01): "Rust publisher, JS subscriber, so that counts as two interops"
- moq-dev-rs <-> [[libquicr]]: 6/6 pass in interop runner
- moq-dev-rs <-> [[moxygen]]: 6/6 pass in interop runner

# Relationship to Cloudflare moq-rs

Both projects started from Luke's original codebase. [[moq-rs]] (cloudflare/moq-rs) forked when Luke was not going to support the IETF WG specs directly. They are now considered **sibling implementations** — neither is upstream of the other. The codebases are "not too too dissimilar" on the Rust side, and ideas and code can flow back and forth. See [[moq-rs]] for the Cloudflare/IETF-aligned version.

# Related

- [[moq-rs]] - Cloudflare's IETF-aligned Rust sibling (cloudflare/moq-rs)
- [[moq-js]] - IETF-aligned JS sibling (video-dev/moq-js)
- [[interop-status]] - Cross-implementation testing
- [[interop-endpoints]] - Full endpoint listing
