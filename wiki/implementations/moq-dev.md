---
title: "moq-dev/moq (Luke Curley)"
tags: [implementation, rust, typescript, moq-lite, hang]
date: 2026-04-12
last_updated: 2026-08-22
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

- **[[moq-lite]]**: Simplified transport protocol (Luke's own spec, [draft-lcurley-moq-lite](https://datatracker.ietf.org/doc/draft-lcurley-moq-lite/)); wire tracks the **-05** revision (published 2026-06-30), hardened by a pre-merge moq-net/js API pass ([PR #2170](https://github.com/moq-dev/moq/pull/2170), July 12) with session Role now advertised in the -05 SETUP ([PR #2201](https://github.com/moq-dev/moq/pull/2201), merged July 14). A **-06** design cycle is underway in-repo — the `moq-lite-06-wip` PRs add typed announce ids ([PR #2160](https://github.com/moq-dev/moq/pull/2160), merged July 12) and cost-based cache-aware routing with a vendored route-cost Internet-Draft ([PR #2179](https://github.com/moq-dev/moq/pull/2179), July 12). **Cost-based routing landed July 20** — [PR #2424](https://github.com/moq-dev/moq/pull/2424) *route by cumulative cost on lite-06 announcements* (+1174/−109), paired with [PR #2419](https://github.com/moq-dev/moq/pull/2419) unannounce-as-soon-as-the-last-route-detaches. IETF draft sources are now vendored into the monorepo and built with nix + just ([PR #2159](https://github.com/moq-dev/moq/pull/2159), July 10). On **2026-08-04 Luke Curley submitted three of these vendored drafts to the IETF Datatracker** in one ~02:08 UTC batch: the new **[[moq-cluster|`draft-lcurley-moq-cluster-00`]]** (relay-mesh Hop-ID path vector + accumulated route cost — the standards form of the route-cost/gossip work above), **[[moq-timestamp|`draft-lcurley-moq-timestamp-01`]]** (age-based relay decisions, re-framed onto the LOC-registered TIMESTAMP/TIMESCALE properties), and **[[moq-hang|`draft-lcurley-moq-hang-02`]]** (the Hang conferencing profile). The cluster extension was **implemented over IETF moq-transport** (not just moq-lite) in [PR #2629](https://github.com/moq-dev/moq/pull/2629) (**merged 2026-08-05**, +2662/−408).
- **[[moq-hang|Hang]]**: Media-specific conferencing/streaming layer on top of moq-lite ([`draft-lcurley-moq-hang-02`](https://datatracker.ietf.org/doc/draft-lcurley-moq-hang/), 2026-08-04; also the intended home for MoQ recording/DVR after [PR #2574](https://github.com/moq-dev/moq/pull/2574) folded `moq-archive` in as a "Recording" section)
- **[[moq-msf|MSF]]**: draft-01 supported behind a version-agnostic snapshot
- **IETF adapter shims**: interop with IETF draft implementations (draft-14 through **draft-19**); first open-source implementation to ship draft-18 ([PR #1418](https://github.com/moq-dev/moq/pull/1418), 2026-05-18), and shipped draft-19 (`moqt-19`) within hours of the July-6 cut ([PR #2106](https://github.com/moq-dev/moq/pull/2106)). **The Hang CDN (`cdn.moq.pro`) does not implement the draft-19 filters and Luke says it likely never will** — filters *"complicate billing"* (a relay would have to charge on the unfiltered byte count), stated at the July-19 Vienna Hackathon. The IETF path is also *"nowhere near as tested"* as Hang's own clients (unsolicited `PUBLISH_NAMESPACE` holdover, SUBSCRIBE-against-foreign-publisher gaps surfaced at the Hackathon).

# Rust Packages

- `moq-lite` — core transport library
- `moq-relay` — server/relay; exposes a Prometheus `/metrics` endpoint for node traffic ([PR #2172](https://github.com/moq-dev/moq/pull/2172), July 12)
- `moq-token` — authentication; the connection transport is now forwarded to the `--auth-api` hook ([PR #2132](https://github.com/moq-dev/moq/pull/2132), July 12), private key files are written owner-only (0600) ([PR #2596](https://github.com/moq-dev/moq/pull/2596), Aug 2), and **`moq-cli` gained a `token` subcommand** for generating/managing tokens ([PR #2593](https://github.com/moq-dev/moq/pull/2593), Aug 2)
- `moq-tokio` — QUIC helpers (**renamed from `moq-native`** in the breaking [PR #2896](https://github.com/moq-dev/moq/pull/2896), Aug 17, +1722/−1662); the **default QUIC backend flipped to quinn** ([PR #2285](https://github.com/moq-dev/moq/pull/2285), July 15; previously moq-dev's own `noq` with quinn opt-in), with `quic::Client` / `quic::Server` transport config ([PR #2161](https://github.com/moq-dev/moq/pull/2161), July 11); the alternate **quiche backend was brought to parity with quinn** ([PR #2514](https://github.com/moq-dev/moq/pull/2514), July 25, breaking)
- `moq-mux` — media pipeline (per-codec splitters, container import/export)
- `moq-transcode` — just-in-time transcoding of Hang broadcasts (NVENC-capable), so one ingested broadcast can be served in multiple codecs/renditions ([PR #2140](https://github.com/moq-dev/moq/pull/2140), July 10); a `moq transcode` CLI verb plus decode-once-per-source + GPU resize fanout followed ([PR #2158](https://github.com/moq-dev/moq/pull/2158), July 12)
- `moq-json` — generic (non-media) JSON tracks, split into snapshot/stream modules and exposed through moq-ffi/libmoq ([PR #2196](https://github.com/moq-dev/moq/pull/2196), July 12) — reinforces the "generic for any live data" framing
- `moq-hls`, `moq-rtmp`, `moq-srt`, `moq-rtc` — media gateway crates (see Media gateways below)
- `moq-ffi` / `libmoq` — C FFI surface for Go/Swift/Kotlin bindings; the July 11–12 expansion added a group-FETCH API ([PR #2142](https://github.com/moq-dev/moq/pull/2142)), a reworked raw-track C ABI ([PR #2171](https://github.com/moq-dev/moq/pull/2171)), track-info accessors ([PR #2177](https://github.com/moq-dev/moq/pull/2177)), raw-frame timestamps + track datagrams ([PR #2174](https://github.com/moq-dev/moq/pull/2174) / [PR #2175](https://github.com/moq-dev/moq/pull/2175)), JSON tracks, and a Go-wrapper catch-up ([PR #2168](https://github.com/moq-dev/moq/pull/2168)); July 13 layered ergonomic per-language wrappers on top — Swift JSON wrappers with explicit snapshot mode ([PR #2236](https://github.com/moq-dev/moq/pull/2236)), Go raw-frame-timestamp writes ([PR #2230](https://github.com/moq-dev/moq/pull/2230)), a compile+test Kotlin `just kt check` ([PR #2227](https://github.com/moq-dev/moq/pull/2227)), and a **Python `moq-rs` 0.3.2** release with JSON stream wrappers ([PR #2214](https://github.com/moq-dev/moq/pull/2214))
- `moq-video` — native capture/encode/decode; gained **PipeWire screen capture on Linux** ([PR #2238](https://github.com/moq-dev/moq/pull/2238), July 13) and **macOS window/app/system-audio capture + device enumeration** ([PR #2293](https://github.com/moq-dev/moq/pull/2293), July 16) as native capture sources alongside the browser paths, and now **adapts encoder bitrate to the congestion-control estimate** ([PR #2303](https://github.com/moq-dev/moq/pull/2303), July 16 — the first congestion-control → encoder link, implementing roadmap [issue #2283](https://github.com/moq-dev/moq/issues/2283))
- `moq-audio` — native audio capture/encode/decode; a **July-24 audio push** added a **PCM codec** ([PR #2493](https://github.com/moq-dev/moq/pull/2493)), **Opus pre-skip + encoder-control propagation** ([PR #2492](https://github.com/moq-dev/moq/pull/2492)), a **bounded capture-buffer queue** ([PR #2487](https://github.com/moq-dev/moq/pull/2487)), and **capture-source enumeration on Linux/Windows** ([PR #2486](https://github.com/moq-dev/moq/pull/2486)); a plan to upstream the **iroh-live native media stack** (playback engine + echo cancellation, [issue #2478](https://github.com/moq-dev/moq/issues/2478)/[#2481](https://github.com/moq-dev/moq/issues/2481)) is in flight

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

# Recent Highlights

Day-by-day PR/issue history lives in [[log|the wiki log]]; this section keeps only durable milestones.

- **First open-source impl to ship IETF draft-18** ([PR #1418](https://github.com/moq-dev/moq/pull/1418), May 18) — 6 days after publication, the fastest draft-revision turnaround the wiki has tracked. Wire `0xff000012` / ALPN `moqt-18`. Version matching switched to "newest defaults forward" so future drafts inherit unless opted out.
- **moq-lite-05 wire** landed late June and was finalized in early July: SETUP + PATH parameter, TRACK_INFO, SUBSCRIBE_END, mandatory per-frame timestamps + per-track timescale, and QUIC datagram delivery.
- **Cross-language contract convergence** (July 2026, ongoing): after months of *widening* the multi-language / multi-gateway surface, [[luke-curley|kixelated]] audited where the Rust core, the `js/net` port, the C bindings, and the draft had silently diverged (issues [#2309](https://github.com/moq-dev/moq/issues/2309)–[#2325](https://github.com/moq-dev/moq/issues/2325)) and then converged them: the Rust/JS token contract aligned, `SUBSCRIBE_END` corrected to the draft's exclusive semantics, and — the durable outcome — **Python, Swift, Kotlin and Go converged onto a single wrapper contract** ([#2345](https://github.com/moq-dev/moq/pull/2345)) with unified `moq-ffi` shapes. A **`moq-stats` crate** was extracted in the same pass. This is the repo's answer to a structural problem: one protocol core exposed through five language surfaces drifts unless it is periodically re-pinned.
- **The origin became a full media gateway** (June–August 2026): the whole `moq-mux` pipeline plus RTMP/SRT/WebRTC/HLS gateway crates reached `main`, then `moq-hls` was hardened into a standalone **HLS origin** and then gained **DASH manifest serving** from the same timeline ([#2566](https://github.com/moq-dev/moq/pull/2566)) — so a MoQ ingest can serve legacy HLS *and* DASH players. A **GPU transcoding chain** (`moq-transcode`: NVENC encode, NVDEC decode, zero-copy NVDEC→NVENC) and native capture on Linux (PipeWire) and macOS landed alongside, plus **Safari** support in the TypeScript stack and an expanded `moq-ffi` / `libmoq` C ABI (group-FETCH, raw tracks, track datagrams) that lets Go, Swift, Kotlin and Python consumers drive the gateway and transcode features.
- **MoQ Cluster extension implemented over moq-transport** ([#2629](https://github.com/moq-dev/moq/pull/2629), merged 2026-08-05, +2662/−408; wired into the JS/net stack by [#2910](https://github.com/moq-dev/moq/pull/2910), Aug-18) — carrying [[moq-cluster|`draft-lcurley-moq-cluster-00`]] onto the IETF wire in the same repo that authors it. Relay-mesh work continued through August with **per-core QUIC workers steered by connection ID** ([#2921](https://github.com/moq-dev/moq/pull/2921)) and **warm/cold route pricing** so warm relays can be ranked ([#2925](https://github.com/moq-dev/moq/pull/2925)).
- **Latency became a first-class, enforced concept** (August 2026): a **subscriber latency budget** landed in `moq-net` ([#2890](https://github.com/moq-dev/moq/pull/2890), +3607/−453) and in the JS stack ([#2919](https://github.com/moq-dev/moq/pull/2919)), and the older `Latency` type was replaced by a plain `max_age` ([#2955](https://github.com/moq-dev/moq/pull/2955), breaking). Paired with partial **PROBE** reporting ([#2945](https://github.com/moq-dev/moq/pull/2945)).
- **Spec authoring happens in-repo.** The vendored **moq-lite-06** draft gained broadcast epochs and ended/VOD broadcast semantics; drafts are pruned, renamed, and simplified as code changes. The `moq-archive` chunked-archival format was drafted here and then **folded into [[moq-hang|Hang]] as a "Recording" section** rather than submitted as `draft-lcurley-moq-archive`. LOC-04 timestamp code points were adopted within two weeks of publication.
- **Media-format breadth kept growing** (August 2026): **AAC-LC decode** ([#2968](https://github.com/moq-dev/moq/pull/2968)), MPEG-TS **PCR as a uniform grid** ([#2967](https://github.com/moq-dev/moq/pull/2967)), TS/DVB service information carried as opaque SI sections and proxied TDT/TOT, resampler timestamp correctness ([#2992](https://github.com/moq-dev/moq/pull/2992)), and containers mapped **one-to-one onto [[moq-msf|MSF]] packaging** ([#2987](https://github.com/moq-dev/moq/pull/2987), @arielmol). A **GStreamer** front (`moq-gst`) is under active third-party development.
- **Packaging (breaking, 2026-08-21)**: the **Go wrapper is now published as `moq.dev/moq`** ([#2957](https://github.com/moq-dev/moq/pull/2957)) — a durable import-path change for Go consumers.
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
