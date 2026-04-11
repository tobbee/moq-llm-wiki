---
title: "moq-dev/moq (Luke Curley)"
tags: [implementation, rust, typescript, moq-lite, hang]
date: 2026-04-11
status: current
---

# moq-dev/moq

**Language**: Rust + TypeScript (monorepo)
**Maintainer**: [[luke-curley]]
**GitHub**: [moq-dev/moq](https://github.com/moq-dev/moq) (was kixelated/moq-rs → kixelated/moq)
**Website**: [moq.dev](https://moq.dev)
**Slack**: #moq-rs (C09CG9V7A2Y) — shared channel, covers both this and [[moq-rs]]

## Overview

Luke Curley's original MOQ implementation, now a monorepo containing both Rust and TypeScript packages. Implements **moq-lite**, a simplified subset of the IETF moq-transport spec that prioritizes simplicity and practical deployment. Also includes **Hang**, a media-specific protocol layer on top of moq-lite (analogous to HLS/DASH) handling codecs, containers, and catalog management.

The project describes itself as "generic for any live data, not just media" though video streaming is the primary use case.

## History

- **2022-06-29**: Created as `kixelated/moq-rs` — the original Rust MOQ implementation
- **2023-05-24**: `kixelated/moq-js` created as a companion TypeScript library
- **~2024-10**: Mike English forked the codebase to create an IETF WG-aligned version (see [[moq-rs]] and [[moq-js]])
- **2025-06-20**: `kixelated/moq-js` archived ("Moved to kixelated/moq. It's much better now.")
- **Later**: Renamed/transferred to `moq-dev/moq` as a combined Rust + TypeScript monorepo

The project diverged from strict IETF WG spec compliance when Luke pursued his own moq-lite design. It now has adapter shims for IETF MoQ WG drafts, enabling interop with IETF-aligned implementations.

## Protocol

- **moq-lite**: Simplified transport protocol (Luke's own spec)
- **Hang**: Media-specific encoding/streaming layer on top of moq-lite
- **IETF adapter shims**: Allow interop with IETF draft implementations (draft-14 through draft-17)

## Rust Packages

- `moq-lite` — core transport library
- `moq-relay` — server/relay
- `moq-token` — authentication
- `moq-native` — QUIC helpers

## TypeScript Packages (js/)

- `lite` — browser-compatible moq-lite transport
- `hang` — Hang media layer (total rewrite, not derived from kixelated/moq-js)
- `watch` — viewer/subscriber
- `publish` — publisher
- `ui-core` — UI components
- `signals`, `clock`, `common`, `token` — supporting packages

## Public Infrastructure

- `cdn.moq.dev/anon` — browser pub/sub testing (QUIC + WebTransport)
- Interop docs: [doc.moq.dev/concept/standard/interop.html](https://doc.moq.dev/concept/standard/interop.html)

## Interop

- Registered in [[interop-runner]] as **moq-dev-rs** (Rust) and **moq-dev-js** (JS/Hang)
- v17 interop achieved with [[lorenzo-miniero]]'s [[imquic]] (2026-04-01): "Rust publisher, JS subscriber, so that counts as two interops"
- moq-dev-rs <-> [[libquicr]]: 6/6 pass in interop runner
- moq-dev-rs <-> [[moxygen]]: 6/6 pass in interop runner

## Relationship to Cloudflare moq-rs

Both projects started from Luke's original codebase. [[moq-rs]] (cloudflare/moq-rs) forked when Luke was not going to support the IETF WG specs directly. They are now considered **sibling implementations** — neither is upstream of the other. The codebases are "not too too dissimilar" on the Rust side, and ideas and code can flow back and forth. See [[moq-rs]] for the Cloudflare/IETF-aligned version.

## Related

- [[moq-rs]] - Cloudflare's IETF-aligned Rust sibling (cloudflare/moq-rs)
- [[moq-js]] - IETF-aligned JS sibling (video-dev/moq-js)
- [[interop-status]] - Cross-implementation testing
- [[interop-endpoints]] - Full endpoint listing
