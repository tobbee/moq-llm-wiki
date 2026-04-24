---
title: "moq-dev/moq (Luke Curley)"
tags: [implementation, rust, typescript, moq-lite, hang]
date: 2026-04-12
last_updated: 2026-04-25
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

- **[[moq-lite]]**: Simplified transport protocol (Luke's own spec, [draft-lcurley-moq-lite-04](https://datatracker.ietf.org/doc/draft-lcurley-moq-lite/))
- **Hang**: Media-specific encoding/streaming layer on top of moq-lite
- **IETF adapter shims**: Allow interop with IETF draft implementations (draft-14 through draft-17)

# Rust Packages

- `moq-lite` — core transport library
- `moq-relay` — server/relay
- `moq-token` — authentication
- `moq-native` — QUIC helpers

# TypeScript Packages (js/)

- `lite` — browser-compatible moq-lite transport
- `hang` — Hang media layer (total rewrite, not derived from kixelated/moq-js)
- `watch` — viewer/subscriber
- `publish` — publisher
- `ui-core` — UI components
- `signals`, `clock`, `common`, `token` — supporting packages

# Public Infrastructure

- `cdn.moq.dev/anon` — browser pub/sub testing (QUIC + WebTransport)
- Interop docs: [doc.moq.dev/concept/standard/interop.html](https://doc.moq.dev/concept/standard/interop.html)

# Recent Activity (April 2026)

## Hop-Based Clustering MERGED (PR #1322, Apr 23 23:26 UTC)
After four days of work on the `hops-port` branch (opened Apr 19), [[luke-curley]] **merged [PR #1322](https://github.com/moq-dev/moq/pull/1322)** (+961/−979 on the final diff) — the full port of the hop-based clustering design from `origin/dev` (#1082 + #1152) onto `main`. This is the **first substantive protocol change merge to `main` in weeks** and a structural rework of moq-relay's cluster plane:

- **`OriginId`**: new non-zero 62-bit varint type encoded as `u64` on the wire.
- **`Broadcast::hops: Vec<OriginId>`**: every Broadcast carries its origin chain; `BroadcastProducer` / `BroadcastConsumer` / `BroadcastDynamic` expose it via a `pub info: Broadcast` field plus `Deref<Target = Broadcast>`.
- **Loop refusal + shortest-path**: `OriginProducer::publish_broadcast` refuses broadcasts whose hop chain already contains our id; on equal hop lengths the newer broadcast wins (test change: `test_duplicate` now expects this).
- **Cluster CLI**: `--cluster-root` / `--cluster-node` / `--cluster-prefix` collapse into `--cluster-connect` (repeat or comma-separated for mesh peers) + optional `--cluster-origin-id` for deterministic IDs in tests/logs. `primary` / `secondary` / `combined` tiers are gone; the `internal/origins/*` registration dance is gone.
- **`Claims::cluster`**: now `#[deprecated]` — existing signed tokens still parse, but the flag no longer affects routing. The one call site that unavoidably reads it for back-compat uses `#[allow(deprecated)]`.
- **`Lite04` `Announce`**: changes from `Vec<u64>` to `Vec<OriginId>`. `Lite03` still sends count-only, decoded as `UNKNOWN` placeholders. `MAX_HOPS` tightened from 256 → 32.
- **JS `Publisher`**: generates a random 53-bit non-zero `originId` via `crypto.getRandomValues` per session and appends it to `hops` on every outbound `Announce::Active`. Browser clients only publish their own broadcasts (no forwarding), so a per-connection id is enough for the relay to tag/dedupe.
- **Demo configs**: `demo/relay/{leaf0,leaf1,root}.toml` switched to the mesh `connect = [...]` format with pinned per-node `origin_id`s (1 / 10 / 11) for readable logs.
- `cargo-semver-checks` will flag this as a **breaking change** on `moq-lite` and `moq-relay`; release-plz is expected to pick up the version bumps automatically.
- **Local smoke test and browser-publisher interop checks remain on the unchecked test plan** (wire-compatible by design, but the JS origin-id plumbing is newly executed).

A `chore: release` PR (#1338, moq-bot) was refreshed at Apr 23 23:42 UTC to pick up the version bumps. PR #1322 was authored with Claude Code (see the `🤖 Generated with [Claude Code]` trailer in the description) — the largest Claude Code–authored PR to land on moq-dev `main` to date.

## Python Examples: clock + announced (PR #1345, Apr 23)
- **PR #1345** (open, Apr 23 20:39 UTC, +108/0) — `py/moq-lite: add clock + announced examples`. Two new CLI examples in the Python binding:
  - `examples/clock.py` — Python twin of `rs/moq-clock` with `publish` / `subscribe` subcommands; publishes UTC timestamps at one group per minute, one frame per second.
  - `examples/announced.py` — lists broadcasts announced under a given prefix.

Both use `argparse` + `async with moq.Client(...)`. Extends the Python surface that Lullabee's PR #1318 started (raw track publish/consume). Fifth PR in the Apr 22–23 burst.

## Catalog-Format Docs, wait_for_broadcast, Producer Refactor, Subdomain Routing (Apr 22–23)
Four-PR burst by [[luke-curley]] on `main`:
- **PR #1339** (merged Apr 22 16:51 UTC, +5/−5) — Bump JS patch versions to publish `recvGroup`. `@moq/lite@0.2.1` on NPM was published Apr 16 **before** the `recvGroup` API added in PR #1324 (Apr 17). `@moq/watch@0.2.9` built against the new API declared `@moq/lite: ^0.2.1`, resolving to the broken 0.2.1 for consumers and triggering runtime errors on `recvGroup`.
- **PR #1340** (open, Apr 22 17:16 UTC, +182/−5) — `moq-lite: add OriginConsumer::wait_for_broadcast; deprecate consume_broadcast`. Synchronous `consume_broadcast` is a footgun: a freshly-connected origin has not yet received announcements over the wire, so a sync lookup returns `None` even when the broadcast is about to arrive. moq-gst's source hit this directly. `wait_for_broadcast(path)` scopes a fresh consumer to the path and loops.
- **PR #1341** (open, Apr 23 00:01 UTC, +748/−1145) — `Refactor media producers and simplify fMP4 CMAF passthrough`. Renames `moq_mux::import` → `moq_mux::producer`, removes `Fmp4Config` passthrough flag, makes CMAF passthrough the only fMP4 mode.
- **PR #1343** (open, Apr 23 00:24 UTC, +226/−37) — `relay: add subdomain-based slug routing for customer isolation`. New `--auth-domain`/`MOQ_AUTH_DOMAIN`/TOML `domains` suffix list. When a connection URL host is `<slug>.<suffix>`, the slug is prepended to the path before auth runs: `customer.cdn.moq.dev/foo` equals `cdn.moq.dev/customer/foo`. Hosts matching a suffix exactly or matching none fall back to plain path routing.
- **PR #1344** (merged Apr 23 01:12 UTC, +31/−0) — Catalog-format docs for `@moq/watch`: `hang` (default) vs `msf`, HTML example, auto-negotiation note.
- **Issue #1342** (open, Apr 23) — *"Raw QUIC doesn't support paths"*: No PATH SETUP parameter means only WebTransport works with path-based auth today.

## Hop-Based Clustering, MSF Catalog, DNS Bind (Apr 19–20)
- **PR #1322** (**merged Apr 23 23:26 UTC** — see top of this page): Major refactor — ports the hop-based clustering design from `origin/dev` (#1082 + #1152) to `main`. Replaces three-tier `primary`/`secondary`/`combined` origin model and `cluster: bool` token flag with a single `OriginProducer` per relay tagged with a stable `OriginId`. Every `Broadcast` now carries `hops: Vec<OriginId>` so loops are refused and the shortest path wins. `Lite04` `Announce` changes to `Vec<OriginId>`; `Lite03` decodes as `UNKNOWN` placeholders. `MAX_HOPS` tightened 256 → 32. CLI: `--cluster-root`/`--cluster-node`/`--cluster-prefix` collapse into `--cluster-connect` for a full mesh, plus optional `--cluster-origin-id`. `Claims::cluster` is now `#[deprecated]`. Browser clients generate random 53-bit non-zero `originId` per session. Flagged as a `cargo-semver-checks` **breaking change** on `moq-lite` and `moq-relay`. +857/-900 lines.
- **PR #1330** (open, Apr 19–20): **MSF catalog format support** with auto-negotiation. New `@moq/msf` package with Zod-validated schema + encode/decode/fetch helpers. `js/watch/src/msf.ts` converts MSF catalogs into the internal Hang shape. `<moq-watch>` gains a `catalog="hang"|"msf"|"auto"` attribute. Negotiation: Hang gets a 100ms head start, then `Promise.any()` picks the first successful catalog; winner continues for subsequent updates.
- **PR #1335** (open, Apr 19): Raise WebSocket fallback head start 200ms → 500ms to give QUIC more runway; adds a synchronous check so the WebSocket connect attempt bails out when WebTransport has already won the race.
- **PR #1332** (merged Apr 19): `moq-native` resolves DNS hostnames in `--server-bind` — accepts `host:port` inputs like `fly-global-services:443` on Fly.io. `ServerConfig::bind` changes from `SocketAddr` to `String`; first resolved address is used since Quinn can't bind to multiple addresses.
- **PR #1331** (merged Apr 19): Update `fly.toml` to use the hosted docker image.
- **PR #1333** (merged Apr 19): Update `flake.lock` dependencies.
- **PR #1284** (merged Apr 19): Add `README` files for Rust crates.
- **PR #1336 / #1337** (merged Apr 20): Nix: downgrade crane to avoid requiring Rust 1.95; align toolchain with devShell's `rust-overlay` stable.
- **Releases** (Apr 19–20): `chore: release` PRs #1321 and #1334.

## Broadcast Queuing, Auth Refactor, TLS Flags (Apr 16–17)
- **PR #1319** (merged Apr 17): Broadcast **backup queue** replaces the prior replace-and-reannounce strategy. A newly published broadcast on an already-active path is held in a FIFO queue; when the active broadcast closes, the oldest backup is promoted. Avoids unnecessary reannounces on rapid republishing.
- **PR #1311** (merged Apr 16): Major `moq-relay` auth refactor. `AuthError` now propagates via `thiserror` `#[from]`, PublicAccess.api flow fixed (sets `claims.root`, only calls API with zero overlap to static prefixes, propagates HTTP errors as `ApiUnavailable`). ~15 new tests using `wiremock` covering success/404/500/network/decode/cache paths, plus an integration test with `axum-server` + self-signed CA + `WebPkiClientVerifier` verifying `--auth-tls-identity` is presented during TLS handshake.
- **PR #1308** (merged Apr 16): Replace `--identity` (single bundled PEM) with separate `--cert` and `--key` flags — matches curl's behavior.
- **PR #1315/#1313/#1312/#1316** (merged Apr 16): moq-boy game server maintenance — `capybara`→`songbird`, `fofk`→`runiestory` (ROMs on R2), volume slider, keyboard input fix, inline landing page HTML for Nix build.
- **PR #1318** (open): Python `py_lib` raw (non-media) track publishing/consuming — `RawProducer`/`RawConsumer` classes wrapping FFI types; `publish_raw()`/`subscribe_raw()` methods (author: Lullabee).
- **Releases** (Apr 17): moq-lite 0.15.14, moq-cli 0.7.18, moq-clock 0.10.16, moq-ffi 0.2.6.

## Browser Compatibility Push (Apr 15–16)
[[luke-curley]] landed a burst of fixes and improvements:
- **Safari fixes**: avc3→avc1 codec string compatibility, CSS grid layout fix
- **Firefox fixes**: AudioDecoder 6-channel output for stereo Opus, WebTransport BiDi stream bug workaround (force WebSocket fallback on Firefox)
- **moq-lite negotiation**: Fallback SETUP negotiation for Lite03+ when ALPN unavailable (Firefox workaround)
- **Token encoding**: Default to base64url for JWK output
- **Relay landing page**: HTML page for non-MoQ browser clients directing to moq.dev
- **Release**: moq-cli v0.7.18, moq-relay v0.10.21

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
