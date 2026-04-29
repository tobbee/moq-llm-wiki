---
title: "moq-dev/moq (Luke Curley)"
tags: [implementation, rust, typescript, moq-lite, hang]
date: 2026-04-12
last_updated: 2026-04-29
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

## Apr 28–29 Post-Interim Wave: Two Merges (#1352, #1353) + Five New PRs (#1356–#1360) + ksletmoe-aws + Qizot

[[luke-curley]] turned both Apr 27's open PRs into merged code, then **opened five more substantive PRs** in the same window. External contributors `Qizot` and `ksletmoe-aws` (AWS) also landed activity.

### Two merges (post-interim PRs land)

- **[PR #1352](https://github.com/moq-dev/moq/pull/1352) MERGED** Apr 29 01:32:29 UTC by [[luke-curley]] (final +10/−2) — *Handle relays without announcement subscription support*. Lands the `mediaoverquic.com`-specific announcementless-relay handling (issue #1346 fix). Final size grew by 4 lines vs the original +6/0 after the CodeRabbit suffix-match-false-positive fix.
- **[PR #1353](https://github.com/moq-dev/moq/pull/1353) MERGED** Apr 29 01:49:24 UTC by [[luke-curley]] (final +347/−147) — *moq-lite: per-frame buffer + BufMut producer to cut relay memory*. The production-profiled memory optimization (~234 MB / ~254 MB / ~446 MB attribution) lands, replacing `Vec<Bytes>` per-frame chunks with single `Arc<FrameBuf>` allocations and `BufMut`-driven direct writes from quinn streams. **First memory-cost-per-connection optimization to land in moq-relay.**
- **PR #1350** (mTLS for HTTPS callers) — **still OPEN**. Last activity Apr 27 23:33 UTC. The CodeRabbit-flagged 🟠 Major (CORS+browser-readable-GET issue) hasn't been addressed in pushed code yet.
- **[PR #1355](https://github.com/moq-dev/moq/pull/1355) MERGED** Apr 28 20:04:23 UTC by [[luke-curley]] (+7/−2, author **Qizot**) — *Add encoder's AudioContext sampleRate override*. Routine fix.

### Five new PRs from Luke (Apr 28 16:11 UTC → 23:55 UTC)

- **[PR #1356](https://github.com/moq-dev/moq/pull/1356) OPENED** Apr 28 16:11 UTC (+27/−86) — *moq-lite: switch insert_track to take TrackConsumer*. Changes `BroadcastProducer::insert_track` to take `TrackConsumer` (by value) instead of `&TrackProducer`. Removes `TrackConsumer::produce()` (added in #1300 as a workaround). Adds `TrackConsumer::weak()` (`pub(crate)`).
- **[PR #1357](https://github.com/moq-dev/moq/pull/1357) OPENED** Apr 28 16:33 UTC (+319/−24) — *moq-lite: add fetch_group API + TrackDynamic*. **Ties together the FETCH-readiness work.** New `TrackConsumer::fetch_group(seq) -> Result<GroupConsumer>` — first-class FETCH path at the track level. *"The breaking API change is captured here so the wire-side hookup (lite ControlType::Fetch, ietf::run_fetch_stream) can land as a clean follow-up."* Pairs with PR #1348 (Subscription model API).
- **[PR #1358](https://github.com/moq-dev/moq/pull/1358) OPENED** Apr 28 19:20 UTC (+994/−1289) — *moq-lite: rewrite Origin as a poll-driven, conducer-based model*. **Massive rewrite**: replaces `OriginNode`/`NotifyNode` tree, per-publish `web_async::spawn` cleanup, and per-consumer `mpsc` fan-out with a flat `HashMap<PathOwned, Entry>` behind a `Mutex` plus per-consumer queues. Consumers register a single `conducer::Waiter` on both the shared state and each tracked entry. Net −295 lines.
- **[PR #1360](https://github.com/moq-dev/moq/pull/1360) OPENED** Apr 28 23:55 UTC (+29/−10) — *moq-native: relocate jemalloc helper; wire it into moq-boy*. Moves the `jemalloc` SIGUSR1-dump helper from `moq-relay` into `moq-native` behind a `jemalloc` feature, re-exports `tikv_jemallocator`. Wires `moq-boy` for jemalloc heap profiling — *"its 6 production instances..."* suggests **moq-boy is now in production at 6+ instances**.

### External contributor activity

- **[PR #1359](https://github.com/moq-dev/moq/pull/1359) OPENED** Apr 28 21:22 UTC by **ksletmoe-aws** (Karl Sletmoe, AWS) (+64/−67) — *fix(watch): process CMAF groups sequentially in WebCodecs decoder*. *"The CMAF WebCodecs decoder path in `js/watch/src/video/decoder.ts` and `audio/decoder.ts` spawns a concurrent async task per MoQ group via `effect.spawn()`. When groups contain a single large frame (e.g. CMAF passthrough where each group is one moof+mdat blob), `readFrame()` resolves immediately..."* — concrete bug exposed by CMAF passthrough where each group is one moof+mdat blob. **First moq-dev/moq PR from an AWS contributor.**
- **[PR #1354](https://github.com/moq-dev/moq/pull/1354) OPENED** Apr 28 07:23 UTC by **Qizot** (+21/−11) — *Fix missing channel samples for audio encoder*. **iOS Safari WebCodecs/getUserMedia mismatch.** *"On iOS safari the line `channelCount: settings.channelCount ?? root.channelCount,` resolves to `2`, but afterwards we receive mono audio in `onmessage`. Since the number of channels in `AudioData` must match the number of channels the encoder has been initialized with, we are fixing the `AudioData` by copying the active channel to the missing one."*
- **Issues #1310 (worklet plugin) + #1328 (js tooling)** — beeequeue's longstanding tooling questions saw substantive Luke replies Apr 28 → Apr 29 01:24 UTC about Vite-specific URL resolution.

### Net effect

The merge wave continues the SaaS-multi-tenancy push from Apr 26. The five new PRs split into two threads: **moq-lite-fetch readiness API** (#1356/#1357 build the TrackConsumer/`fetch_group` surface PR #1348 is meant to consume) and **runtime substrate** (#1358 Origin rewrite, #1359 ksletmoe-aws decoder fix, #1360 jemalloc-in-moq-native for moq-boy production heap profiling). External contributors (`Qizot`, `ksletmoe-aws`, earlier `skirsten` on #1349, earlier `kubo6472` on issue #1346) are now driving 4 of the last 12 PRs/issues — the contributor base is widening rapidly.

## Apr 27–28 Post-Interim Burst: Three New PRs (#1350, #1352, #1353) + Issue #1351 Closed
[[luke-curley]] opened **three substantive PRs in <2 hours** after the Apr 27 interim, plus a quick issue cycle:

- **[PR #1350](https://github.com/moq-dev/moq/pull/1350)** OPENED Apr 27 22:24 UTC (+351/−18) — *moq-relay: authenticate HTTPS callers via the cluster mTLS CA*. The QUIC server already short-circuits to `AuthToken::unrestricted()` when a peer presents a client cert signed by `--server-tls-root` (`connection.rs:34`). The HTTPS web server (`/announced`, `/fetch`, `/ws/*`) didn't — it required a JWT in the query string. PR wires the same path through the HTTPS listener: when `--server-tls-root` is set, the listener installs a `WebPkiClientVerifier` (with `.allow_unauthenticated()` so JWT-only callers still work), and a verified peer cert produces `AuthToken::unrestricted()` via a new `WebState::resolve_token` helper. A tiny `MtlsAcceptor` wraps `RustlsAcceptor`; `SetMtlsExtension` middleware injects `Option<MtlsPeer>` per request. Cert hot-reload via SIGUSR1 preserved (`reload_from_pem_file` would silently strip client-cert verification, so the mTLS path re-runs the full builder via `reload_from_config`). 4 new tests in `web::tests`. CodeRabbit flagged 🟠 Major: with `CorsLayer::allow_origin(Any)`, an arbitrary website could read `/announced` and `/fetch` through a browser that auto-selects or has approved a matching client cert.
- **[PR #1352](https://github.com/moq-dev/moq/pull/1352)** OPENED Apr 27 23:59 UTC (+6/0) — *Handle relays without announcement subscription support*. **Direct response to issue #1346** (kubo6472's Apr 24 cross-impl Cloudflare-relay catalog-discovery bug). Changes `announced` getter type from `Set<Path.Valid>` to `Set<Path.Valid> | undefined`. When connecting to `mediaoverquic.com`, explicitly sets `announced` to `undefined`; broadcast reload logic treats `undefined` as `reload=false`. **Pragmatic move**: hardcodes the Cloudflare relay URL into moq-lite source — preserves user-visible behavior of `<moq-watch catalog-format=msf>` against a Cloudflare endpoint at the cost of a layered hardcode. CodeRabbit flagged hostname-suffix matching false-positive risk; Luke pushed a fix Apr 28 00:07 UTC.
- **[PR #1353](https://github.com/moq-dev/moq/pull/1353)** OPENED Apr 28 00:27 UTC (+346/−146) — *moq-lite: per-frame buffer + BufMut producer to cut relay memory*. **Production-profiled memory optimization**. Luke profiled a relay with ~66 connections at 2.7 GB RSS on a 4 GB box, attributing:
  - **~234 MB** to `FrameProducer::create` (per-chunk 32 B `Bytes` headers in `Vec<Bytes>` plus growth)
  - **~254 MB** to `GroupProducer::create_group` (`VecDeque<FrameProducer>` + retained frame state)
  - **~446 MB** to `quinn::endpoint::RecvState::poll_socket` — quinn's reassembly arena being **pinned by held `Bytes`** (the returned `Bytes` is a refcounted slice into quinn's arena)

  Replaces `FrameState.chunks: Vec<Bytes>` with `FrameBuf` — a single Arc-shared, fixed-capacity heap allocation per frame. `FrameProducer` now `impl bytes::BufMut`, so the receive path writes quinn stream bytes directly into the pre-allocated buffer via `read_buf` (one memcpy, no per-chunk Bytes headers, no quinn-arena pinning). `FrameConsumer` tracks a byte cursor and materializes transient `Bytes` views via `Bytes::from_owner(buf.clone()).slice(..)`.

- **[Issue #1351](https://github.com/moq-dev/moq/issues/1351)** OPENED Apr 27 23:15 UTC by **metapox** (taku) → CLOSED Apr 28 00:10 UTC by reporter. *"Container.Legacy.Consumer.next() returns undefined after 20-60 frames with multiple concurrent tracks"*. Reported against `@moq/hang` 0.2.4 + `@moq/lite` 0.2.2. Luke replied Apr 27 23:18 UTC: *"recvGroup() should only return undefined when the track has finished. Yeah, I need more information, this should never happen."* metapox couldn't reproduce in clean environment; closed as false alarm with *"The original report was likely caused by an unstable publisher on my side."*

PRs #1349 (skirsten static catalog) and #1348 (moq-lite-fetch Subscription model) remained open with only CodeRabbit re-reviews. **No new merges to `main`** in the Apr 26 → Apr 28 window.

Net: moq-relay entered the post-interim period with the **operational layer being attacked from three directions** — HTTPS auth (mTLS), peer-impl-difference handling (Cloudflare relay specifically), and memory cost-per-connection (production-profiled).

## Apr 26 Big Day: PR #1343 + #1340 MERGED, #1348 Opens for FETCH, External PR #1349 (Apr 26 15:38 → Apr 27 01:32 UTC)
A productive Apr 26 afternoon UTC, plus a new external contribution overnight:

- **[PR #1340](https://github.com/moq-dev/moq/pull/1340) MERGED** Apr 26 16:26 UTC by [[luke-curley]] (+182/−5) — *moq-lite: add OriginConsumer::wait_for_broadcast; deprecate consume_broadcast*. Lands the announcement-aware lookup that fixes the moq-gst footgun where a sync `consume_broadcast` returned `None` because announcements hadn't arrived over the wire yet. Both `OriginProducer::consume_broadcast` and `OriginConsumer::consume_broadcast` are now deprecated in favor of the new alternative.
- **[PR #1343](https://github.com/moq-dev/moq/pull/1343) MERGED** Apr 26 16:35 UTC by [[luke-curley]] (+283/−26) — *relay: add subdomain-based slug routing for customer isolation*. The subdomain-routing primitive lands after a week of self-review and CodeRabbit iteration. Adds `--auth-domain`/`MOQ_AUTH_DOMAIN`/TOML `domains` to configure suffix lists for host-based routing. When a connection URL host is `<slug>.<suffix>`, the slug is prepended to the path before auth runs, so `customer.cdn.moq.dev/foo` is equivalent to `cdn.moq.dev/customer/foo`. Multi-label slugs (`a.b.<suffix>`) are rejected as `400 InvalidHost`. The 🔴 Critical WS/web auth-handler bypass that CodeRabbit flagged Apr 23 was resolved before merge. **First SaaS-style multi-tenancy primitive in moq-relay.**
- **[PR #1348](https://github.com/moq-dev/moq/pull/1348)** OPENED Apr 26 15:38 UTC by [[luke-curley]] (+1049/−471) — *moq-lite: backport Subscription model API for FETCH readiness*. **First FETCH-readiness commit** on `moq-lite-fetch`. Backports the `Subscription` / `TrackSubscriber` model-layer API from `dev`'s PR #1134. Goal is *"to land the API surface FETCH needs without implementing FETCH wire/stream handling — fetch can plug into TrackSubscriber::update once the wire path is added."* Surgery: `Track` loses `priority`; new `Subscription { priority, ordered, max_latency, start, end }` carries that state. New `TrackSubscriber` owns group iteration (`recv_group`, `next_group`, `next_group_ordered`, `read_frame`) and per-subscriber `Subscription` state. CodeRabbit flagged 🔴 Critical: aggregator's `start`/`end` reduce treats `None` as "no preference" — but the struct doc says `start: None` means "deliver all cached history" and `end: None` means "no end (live)" — a semantics mismatch that needs fixing.
- **[PR #1341](https://github.com/moq-dev/moq/pull/1341)** (Refactor media producers, open since Apr 23) — [[luke-curley]] posted **8 inline self-review comments** Apr 26 16:08–16:16 UTC after the morning merges. Highlights: *"release-plz will bump this; don't manually do it."* / *"just call it `init` honestly. Also is there some serde_as thing we could use instead of String?"* / *"Could we avoid making this pub? I don't want users to accidentally call the wrong methods?"* / *"I don't think we should remove these jitter calculations. Maybe make a jitter.rs helper instead of copy-pasting? `jitter` isn't a great name, really it should be `min_frame_duration` or something."* — same self-review pattern as PR #1343 used before merging.
- **[PR #1349](https://github.com/moq-dev/moq/pull/1349)** OPENED Apr 27 01:32 UTC by **skirsten** (Simon Kirsten) — *@moq/watch: add static catalog format* (+196/−13). External contributor adds a third catalog mode beyond `hang` and `msf`: a `"static"` mode where callers pass a `Catalog.Root` directly rather than fetching it via a catalog track. Also promotes `Broadcast.catalog` from a getter to a writable `Signal<Catalog.Root | undefined>`. New `demo/web/src/static.html` page with a textarea + Apply button to manually drive `<moq-watch catalog-format="static">`. CodeRabbit flagged 🟡 Minor: `finally` unconditionally clearing a potentially user-owned signal. **Second contributor-driven catalog-format extension** to `<moq-watch>` after Luke's own MSF (PR #1330) — the catalog-format-as-attribute API is gaining contributor mindshare.

Net effect: moq-dev/moq enters the Apr 27 interim with two relay infra primitives merged (slug routing, wait_for_broadcast), a major moq-lite-fetch foundation PR open, a self-reviewed media producers refactor in flight, and the catalog-format API ecosystem extending via external contribution.

## Apr 25 Merges + PR #1343 Self-Review + Issue #1346 Root-Cause (Apr 25 UTC)
- **PR #1345 MERGED** Apr 25 15:13 UTC by [[luke-curley]] (+108/−0) — *py/moq-lite: add clock + announced examples*. Adds two Python examples for the moq-lite Python bindings.
- **PR #1347 MERGED** Apr 25 14:47 UTC by dependabot[bot] (+2/−2) — Bump `rustls-webpki` 0.103.12 → 0.103.13. Routine.
- **PR #1343** (subdomain-based slug routing) — still **OPEN**. Luke posted **two self-review rounds** on Apr 25 (22:09 UTC, 22:40 UTC) with five inline comments addressing CodeRabbit's earlier feedback ("IMO do one strip_suffix call." / "Maybe add the leading . to the domain after parsing the config file?" / "We could replace . with / to support multiple paths." / "We should also lowercase and add a . prefix here." / "Why is this public? IDK seems like it's too specific."). A new CodeRabbit review (Apr 24 22:22 UTC) suggests pre-canonicalizing suffixes to lowercase in `Auth::new`. The 🔴 Critical WS/web auth-handler bypass is **still not addressed in pushed code** — these self-review notes signal an incoming rework before the next push.
- **Issue #1346** (catalog-discovery / "how to build something with this") — saw ~7 substantive exchanges between @kubo6472 and Luke on Apr 25 14:17–19:15 UTC. kubo6472 reported tearing/lagging on `moq.dev/watch` (Chrome/Android 12; Firefox on Linux Mint with a GTX1080) and a black screen against the Cloudflare relay. Luke pushed back on the tearing as a browser/GPU/driver issue and pointed at the OBS plugin and the moq.dev blog. **Root cause confirmed at 19:15 UTC**: kubo6472 switched to Chromium on Linux Mint and both `/watch/live` and `moq.dev/watch` started working — original tearing was a Firefox/GPU/driver issue. Luke also confirmed *"I'm working on DVR (rewind). It'll be at least a few months."* The underlying cross-impl Cloudflare-relay catalog-discovery bug (`SUBSCRIBE_NAMESPACE` not implemented) and the docs gap remain. Issue still OPEN.

## Subdomain Routing Activity + First External MSF Bug Report (Apr 24 UTC)
- **PR #1343** (open) — Subdomain-based slug routing (see Apr 22–23 burst section below). Updated Apr 24 22:22 UTC after CodeRabbit flagged a 🔴 Critical issue (the WS/web auth handlers build `AuthParams` directly without consulting `Auth::domains`, leaking the slug-based isolation in the WebSocket path). Awaiting Luke's response.
- **PR #1347** (open, Apr 24 17:04 UTC, dependabot[bot]) — Bump `rustls-webpki` from 0.103.12 to 0.103.13 in the cargo group.
- **Issue #1346** (open, Apr 24 08:24 UTC, @kubo6472) — *"Q: how to build something with this?"*. First externally-reported bug exercising the new `<moq-watch catalog-format="msf">` element (PR #1330, Apr 20). User pointed `<moq-watch url="https://draft-14.cloudflare.mediaoverquic.com" name="room/bbb" catalog-format="msf">` at the Cloudflare draft-14 endpoint, hits `Cloudflare relay does not support broadcast discovery yet; skipping subscribe_namespace` warning + `subscribe error: id=0 broadcast=room/bbb track=catalog error=SUBSCRIBE error: code=0 reason=internal error: Internal error`. Confirms cross-impl friction at the catalog discovery layer between moq-lite/moq-dev clients and the Cloudflare moq-rs relay (which still doesn't implement `SUBSCRIBE_NAMESPACE`). No reply yet from Luke.

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
