---
title: "moq-dev/moq (Luke Curley)"
tags: [implementation, rust, typescript, moq-lite, hang]
date: 2026-04-12
last_updated: 2026-07-09
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

- **[[moq-lite]]**: Simplified transport protocol (Luke's own spec, [draft-lcurley-moq-lite](https://datatracker.ietf.org/doc/draft-lcurley-moq-lite/)); wire tracks the **-05** revision (published 2026-06-30)
- **Hang**: Media-specific encoding/streaming layer on top of moq-lite
- **[[moq-msf|MSF]]**: draft-01 supported behind a version-agnostic snapshot
- **IETF adapter shims**: interop with IETF draft implementations (draft-14 through **draft-18**); first open-source implementation to ship draft-18 ([PR #1418](https://github.com/moq-dev/moq/pull/1418), 2026-05-18)

# Rust Packages

- `moq-lite` — core transport library
- `moq-relay` — server/relay
- `moq-token` — authentication
- `moq-native` — QUIC helpers (default backend is moq-dev's own `noq`, quinn opt-in)
- `moq-mux` — media pipeline (per-codec splitters, container import/export)
- `moq-hls`, `moq-rtmp`, `moq-srt`, `moq-rtc` — media gateway crates (see Media gateways below)
- `moq-ffi` / `libmoq` — C FFI surface for Go/Swift/Kotlin bindings

# TypeScript Packages (js/)

- `lite` — browser-compatible moq-lite transport
- `hang` — Hang media layer (total rewrite, not derived from kixelated/moq-js)
- `watch` — viewer/subscriber
- `publish` — publisher
- `signals`, `clock`, `common`, `token` — supporting packages

(The UI migrated from SolidJS to vanilla Web Components in May 2026, removing `@moq/ui-core`.)

# Media gateways

Bidirectional ingest **and** egress bridges between MoQ broadcasts and legacy media transports, built on `moq-mux`:

- **RTMP / enhanced-RTMP**, **SRT**, **WebRTC (WHIP/WHEP)**, **HLS / LL-HLS**, **MPEG-TS**
- Native hardware codecs (H.264/H.265 encode + decode via VideoToolbox, Media Foundation/DXGI, NVENC, VAAPI), dropping the ffmpeg runtime dependency
- CMSF muxer/demuxer (first contributed by AWS)

# Public Infrastructure

- `cdn.moq.dev/anon` — browser pub/sub testing (QUIC + WebTransport)
- Interop docs: [doc.moq.dev/concept/standard/interop.html](https://doc.moq.dev/concept/standard/interop.html)

# Recent Highlights (as of July 2026)

Day-by-day PR/issue history lives in [[log|the wiki log]]; this section keeps only durable milestones.

- **First open-source impl to ship IETF draft-18** ([PR #1418](https://github.com/moq-dev/moq/pull/1418), May 18) — 6 days after publication, the fastest draft-revision turnaround the wiki has tracked. Wire `0xff000012` / ALPN `moqt-18`. Version matching switched to "newest defaults forward" so future drafts inherit unless opted out.
- **moq-lite-05 wire** landed late June / early July: SETUP + PATH parameter, TRACK_INFO, SUBSCRIBE_END, mandatory per-frame timestamps + per-track timescale, and QUIC datagram delivery.
- **Media-gateway breadth reached `main`** through June via `dev` → `main` backport sweeps — the full `moq-mux` pipeline plus the RTMP/SRT/RTC/HLS gateway crates. External users now file gateway bugs (e.g. open-GOP round-trip, catalog-track lifetime), a sign of real usage.
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
