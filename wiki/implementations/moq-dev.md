---
title: "moq-dev/moq (Luke Curley)"
tags: [implementation, rust, typescript, moq-lite, hang]
date: 2026-04-12
last_updated: 2026-05-05
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

# Recent Activity (April–May 2026)

## May 4 → May 5 Luke OPENS PR #1374 (DATAGRAMS control stream + QUIC datagram delivery, **Lite05 wire version**)

The biggest moq-lite wire-level addition since the protocol's inception — opt-in unreliable datagram delivery as a brand-new wire version, opened in the late-night UTC hours.

- **[PR #1374](https://github.com/moq-dev/moq/pull/1374) OPENED** May 4 22:57:32 UTC by [[luke-curley]] — *moq-lite: add DATAGRAMS control stream + QUIC datagram delivery (Lite05)* (+1615/−7 across 21 files; both Rust and TypeScript libraries). Body: *"New wire version Lite05 / DRAFT_05 (ALPN moq-lite-05, code 0xff0dad05) gating an opt-in unreliable delivery path."* Key elements:
  - **New `DATAGRAMS` bidi control stream (`0x6`)** parallel to `SUBSCRIBE`. Sharing the same `subscribe_id` namespace lets a single QUIC datagram body be routed by ID alone.
  - **QUIC datagram body**: `subscribe_id (i) | sequence (i) | payload (b)`, **payload capped at 1200 B**. Sequence number is preserved on the wire (ignored by Lite05 semantics) so a future moq-transport adapter can reuse the encoding.
  - **33 ms publisher-side cache**; per-subscriber `max_latency` filters stale entries on forward. *"max_latency = 0 is strict: only fresh arrivals (no congestion-delayed retries)."*
  - **Public API**: groups-mirroring — `TrackProducer.write_datagram` / `append_datagram`, `TrackConsumer.subscribe_datagrams` → `DatagramsConsumer`. JS exposes `Track.writeDatagram` / `appendDatagram` / `recvDatagram` / `skipDatagramsToLatest`.
  - **Rust files**: `lite/datagram.rs` + `model/datagram.rs` added; `model/track.rs`, `lite/publisher.rs`, `lite/subscriber.rs`, version + `ControlType` enums updated.
  - **TS files**: `lite/datagram.ts` + `datagram.ts` added; `track.ts`, `lite/connection.ts`, `lite/publisher.ts`, `lite/subscriber.ts`, version + `StreamId` updated.
  - **Spec draft**: section + Lite05 changelog entry live in the **separate `moq-wg/moq-drafts` repo**.
  - 17 new Rust tests, 12 new TS tests; manual relay round-trip and Lite04↔Lite05 cross-version sanity still pending. Out of scope: subscriber-configurable cache age, chunked datagrams >1200B, moq-transport adapter using sequence for ordering, migrating hang/publish/watch layers to use datagrams.
  - PR body explicitly notes: *"🤖 Generated with [Claude Code](https://claude.com/claude-code)"*.
- **[PR #1356](https://github.com/moq-dev/moq/pull/1356) updated** May 4 23:10 UTC by [[luke-curley]] — *moq-lite: switch insert_track to take TrackConsumer* (+39/−93). Body: *"The `&TrackProducer` parameter was effectively a witness... `TrackConsumer` is the honest type for 'I have a handle to this track.'"* Removes `TrackConsumer::produce()` from #1300; adds `TrackConsumer::weak()` so the broadcast can derive its `TrackWeak` from a consumer.
- **[PR #1373](https://github.com/moq-dev/moq/pull/1373) updated** May 4 22:25 UTC by **skirsten** — playback stalls / frame-rate beating fix (still open, follow-up to PR #1367).
- **[PR #1341](https://github.com/moq-dev/moq/pull/1341) updated** May 4 22:24 UTC by [[luke-curley]] — *Refactor media producers and simplify fMP4 CMAF passthrough* (+3808/−2025 across 79 files). Module reorg `moq_mux::import` → `moq_mux::producer`, removed feature gates (`mp4`/`h264`/`h265`/`hls`/`av1`/`aac`/`opus`), init-segments now base64-encoded ftyp+moov in catalog, `Decoder` → `Framed` rename.
- **[PR #1359](https://github.com/moq-dev/moq/pull/1359) CLOSED** May 4 21:25 UTC (status: closed-not-merged). ksletmoe-aws's *unify Consumer across container formats* did not land in the form opened.
- **[PR #1338](https://github.com/moq-dev/moq/pull/1338) updated** May 4 21:47 UTC — `chore: release` (moq-bot) — staging release commits.

**Net**: PR #1374 introduces the **Lite05 wire version**, opening unreliable datagram delivery as a peer dimension to subgroup-stream delivery. The 33ms freshness cap is firm; per-subscriber `max_latency` is a novel knob. Lite05 spec text lives in moq-drafts (a separate repo not yet visible to the wiki crawler). Notable that this is a **wire-version increment** — earlier moq-lite changes typically remained inside Lite04.

## May 3 → May 4 skirsten OPENS PR #1373 superseding own PR #1367 (pull-mode renderer); ksletmoe-aws revises PR #1359

A quieter-than-May-2 day: no new merges, no new Luke PRs, no new external-contributor issues. Two notable contributor turn-arounds.

- **[PR #1373](https://github.com/moq-dev/moq/pull/1373) OPENED** May 3 16:53:49 UTC by **skirsten** (+146/−144 across 6 files, *@moq/watch: fix playback stalls and frame-rate beating*, **closes #1367**). Body terse: *"Detailed description of both fixes is in the commits."* Effectively supersedes skirsten's own May 1 [PR #1367](https://github.com/moq-dev/moq/pull/1367) (pull-mode renderer for 144Hz+ Chrome at vsync). The closes-#1367 directive treats #1373 as the proper landing of that work, addressing two distinct symptoms (playback stalls + frame-rate beating) rather than just the original 144Hz issue. coderabbitai bot review (May 3 17:02): *"No actionable comments were generated."* skirsten now has 4 PRs in the May 1–3 window (#1349 + #1365 merged; #1367 + #1373 open with #1373 superseding).
- **[PR #1359](https://github.com/moq-dev/moq/pull/1359) revised** May 3 04:30 UTC by **ksletmoe-aws** — now +1002/−1173 across 14 files (vs. earlier reading of +971/...). Author summary unchanged: *"Replace the two separate consumer implementations (Legacy and CMAF) with a single generic `Consumer` class that accepts a `ContainerFormat` strategy for frame parsing. This mirrors the Rust `moq-mux` `Consumer<F: Container>` pattern... Additionally, add a `sequential` delivery mode flag to fix audio stuttering caused by inter-group serialization."* The May 3 push presumably addresses Luke's May 2 review nits (*"Just call it `Frame`... `Legacy.LegacyFormat` should be avoided IMO... We should reuse `Frame` and `DecodedFrame`"*) — first revision turn-around since Luke's Apr 30 design suggestion to refactor as `OrderedConsumer<F: Container>`.
- **No merges in the window.** Open-PR slate going into May 4: PR #1370 (metapox PriorityQueue bug-with-fix-offer), #1371 (Luke cross-broadcast track refs), #1367 (skirsten pull-mode, now superseded by #1373), #1373 (skirsten playback fix), #1359 (ksletmoe-aws Consumer unify), #1362 (Qizot audio reconfiguration), #1356/#1358/#1341 (Luke earlier work). No new Luke PRs since the Apr 29 wave's tail (#1356).

## May 2 → May 3 Luke REVERTS PR #1357 fetch_group + TrackDynamic via PR #1372; metapox opens detailed SUBSCRIBE_UPDATE PriorityQueue bug PR #1370; Luke opens cross-broadcast PR #1371; sidsethupathi PR #1369 MERGED

A surprisingly busy day on `moq-dev/moq` for May 2 — a notable design U-turn from [[luke-curley]], a substantive bug report with fix offer from a new external contributor, and a new feature PR.

- **[PR #1372](https://github.com/moq-dev/moq/pull/1372) MERGED** May 2 21:18:50 UTC by [[luke-curley]] — *Revert moq-lite FETCH/Subscription API changes*. **Reverts [PR #1357](https://github.com/moq-dev/moq/pull/1357) (fetch_group API + TrackDynamic) and [PR #1348](https://github.com/moq-dev/moq/pull/1348) (Subscription model API for FETCH readiness).** Body: *"FETCH isn't hooked up yet, so the breaking API change isn't worth it; the API also wasn't quite right."* Hop-based clustering (PR #1322) and per-frame buffer changes (PR #1353) are preserved. **Notable U-turn**: PR #1357 was merged Apr 30 00:01 UTC and was described in the Apr 30 wiki entry as the *"first track-level FETCH path API"*. Three days later Luke pulls it back as not-ready.
- **[PR #1371](https://github.com/moq-dev/moq/pull/1371) OPENED** May 2 20:28:59 UTC by [[luke-curley]] — *hang: cross-broadcast track references in renditions*. Adds optional `broadcast` field on video/audio rendition configs (e.g. `"../source"`) so a downstream catalog can reference tracks published in another broadcast without republishing bytes. New `PathRelative` type + `Path::resolve` in moq-lite Rust with full unit coverage; mirror `resolveBroadcast` helper for `@moq/hang`. `@moq/watch`'s `Broadcast.trackBroadcast(effect, configBroadcast)` looks up the override broadcast on the same connection; audio/video decoder + MSE backends honor it. Body explicitly notes *"🤖 Generated with [Claude Code](https://claude.com/claude-code)"*. Use case: worker-style flow where a sidecar catalog aggregates source tracks without re-broadcasting them.
- **[PR #1370](https://github.com/moq-dev/moq/pull/1370) OPENED** May 2 15:28:56 UTC by **metapox** — *fix(lite): PriorityQueue does not update in-flight groups on SUBSCRIBE_UPDATE*. Detailed bug report citing [draft-ietf-moq-transport-13 §6.1](https://www.ietf.org/archive/id/draft-ietf-moq-transport-13.html#section-6.1): *"When subscriber priority is changed, a best effort SHOULD be made to apply the change to all objects that have not been sent."* `PriorityQueue::insert()` copies the `track` value at insertion time; when `run_track` receives `SUBSCRIBE_UPDATE`, the `PriorityQueue` is not notified — existing `PriorityHandle`s keep their stale position. Real-world impact: *"Switching camera focus via SUBSCRIBE_UPDATE takes several seconds because old groups from the previously-focused camera continue to be served at high priority, starving the newly-focused camera."* Proposed fix: add `subscription_id` to `PriorityItem`; `PriorityQueue::update_subscription(subscription_id, new_track)` re-sorts and notifies handles via watch channels; widen quinn priority spread to `index * 64`; wrap `write_all` in `tokio::select!` with `priority.next()`. metapox: *"We have a working implementation in our fork and can submit a PR if interested."* References Issues #699 (priority tie-breaking) and #1363 (own JS SUBSCRIBE_UPDATE issue). **First substantive bug-report-with-fix-offer from metapox.**
- **[PR #1369](https://github.com/moq-dev/moq/pull/1369) MERGED** May 2 14:53:33 UTC by [[luke-curley]] (sidsethupathi author, +39/−2, *moq-gst: fix moqsink eos*). The gst-launch EOS fix opened May 2 03:27 UTC lands in ~11.5 hours. **sidsethupathi's second merged PR** after #1294 (Apr 12). MLB engineering presence on `moq-gst` solidifying.

## May 1 → May 2 Doc fix + new contributor PRs (skirsten pull-mode renderer, sidsethupathi moqsink EOS)

[[luke-curley]] kept main moving forward with a small Cloudflare doc fix and a flake bump; two new contributor-driven PRs opened.

- **[PR #1366](https://github.com/moq-dev/moq/pull/1366) MERGED** May 1 14:58 UTC — flake.lock dependency bump. Routine.
- **[PR #1368](https://github.com/moq-dev/moq/pull/1368) MERGED** May 1 18:08:59 UTC by [[luke-curley]] (+1/−1, *Update Cloudflare limitation note for latency=real-time*). Single-line doc note clarifying that Cloudflare doesn't support both `reload` AND `latency=real-time`.
- **[PR #1367](https://github.com/moq-dev/moq/pull/1367) OPENED** May 1 15:17:12 UTC by **skirsten** (Simon Kirsten) (+46/−4, *@moq/watch: add pull mode to video renderer*). Body: on Chrome with 144Hz+ monitors the existing Renderer caused Chrome to render at 120fps despite the draw logic being correct. Wrapping `requestAnimationFrame` recursively syncs to the monitor's vsync. Adds `mode: "push" | "pull"` prop on Renderer; `"pull"` runs self-recursive rAF and redraws only on frame change. MultiBackend WebCodecs path now uses `mode: "pull"`. skirsten notes *"we can also drop the push mode if you want."* — fourth skirsten PR after #1349, #1355, #1365 (all now merged).
- **[PR #1369](https://github.com/moq-dev/moq/pull/1369) OPENED** May 2 03:27:40 UTC by **sidsethupathi** (Sid Sethupathi, MLB) (+39/−2, *moq-gst: fix moqsink eos*). Fixes the gst-launch pipeline `videotestsrc num-buffers=120 ! ... ! moqsink` so EOS from `num-buffers` is honored — previously the pipeline ran indefinitely; with the fix it exits after 2 seconds. **Second sidsethupathi PR** after #1294 (Apr 12 *"use generated name if no sink pad name provided"*) — the moq-gst contributor base is solidifying around MLB engineering.

## May 1 Audio Polish + Cloudflare Relay Bug Report (May 1 01:38 → Apr 30 21:16 UTC)

- **[PR #1365](https://github.com/moq-dev/moq/pull/1365) MERGED** May 1 01:38:38 UTC by **skirsten** (Simon Kirsten) (+11/0) — *@moq/watch: expose AudioContext on the audio backend*. Body: *"The WebCodecs decoder owns its own AudioContext but doesn't surface it past the Decoder class. Browsers create the context in `suspended` state when there's no user gesture, and applications need a handle on it to prompt the user (e.g. a 'click to enable audio' button) and call `resume()` from within the gesture handler."* Companion to PR #1349 (static catalog format) and PR #1355 (sampleRate override) — completes the Hang/moq-watch audio-handling polish for end users hitting browser autoplay policies.
- **[PR #1359](https://github.com/moq-dev/moq/pull/1359) STILL OPEN** — ksletmoe-aws posted self-summary Apr 30 21:16:33 UTC: *"This PR grew a bit from the original fix — I took the opportunity to create a unified `Consumer` that mirrors the Rust `Consumer<F: Container>` pattern."* Apr 30 22:10:45 UTC follow-up: *"Sorry for the churn on this one — the commit history is messier than it should be."* **[[luke-curley]] Apr 30 22:29:47 UTC**: *"No worries, I'll take a look at it soon."* PR remains open with major scope increase per Luke's design suggestion (1083 +/1173 −).
- **New Issue [#1364](https://github.com/moq-dev/moq/issues/1364)** *"Cloudflare Relay"* opened Apr 30 14:20:51 UTC by **danrossi** (David Ross). Reports moq-js can't connect to Cloudflare's draft-14/draft-07 relays from `moqlivemock` URLs. CodeRabbit auto-flagged as possible duplicate of #586. Same class of cross-impl friction as Issue #1346 (kubo6472, Apr 24).

## Apr 29–30 Continued Wave: Four MERGES (#1357 fetch_group + #1350 mTLS + #1349 static catalog + #1360 jemalloc); Qizot replaces #1354 with #1362; ksletmoe-aws pivots #1359 to generic OrderedConsumer refactor; metapox opens issue #1363

[[luke-curley]] turned all four open Apr 28 PRs into merged code in a ~16-hour window (Apr 29 16:08 UTC → Apr 30 00:01 UTC). Two external contributor PRs were redesigned in flight, and a new external bug arrived.

### Four merges to `main`

- **[PR #1357](https://github.com/moq-dev/moq/pull/1357) MERGED** Apr 30 00:01:46 UTC by [[luke-curley]] (final +427/−133) — *moq-lite: add fetch_group API + TrackDynamic*. **First FETCH path API at the track level lands.**
  - New `TrackConsumer::fetch_group(seq) -> Result<GroupConsumer>` with three branches: cache hit returns the cached consumer; cache miss + no fetch handler returns `Err(NotFound)`; cache miss + handler queues a request and returns a consumer that fills as the publisher writes frames. **Concurrent fetches for the same sequence share the in-flight group.**
  - New `TrackConsumer::latest_group() -> Option<GroupConsumer>` (replaces `latest()` returning `Option<u64>`).
  - New `TrackProducer::dynamic() -> TrackDynamic` mirrors `BroadcastProducer::dynamic()`. Drop the last dynamic and pending requests are aborted with `Error::Cancel`.
  - New `TrackDynamic::poll_requested_group` / `requested_group` yields `GroupProducer` for the publisher to fill.
  - Caller migrations: `moq-relay/src/web.rs` fetch handler drops the upfront `subscribe_track` round-trip; `lite/publisher.rs` and `ietf/publisher.rs` use `latest_group()` for the LargestObject case.
  - 8 new unit tests (`fetch_group_cache_hit`, `fetch_group_no_handler_returns_not_found`, `fetch_group_via_dynamic_handler`, `fetch_group_shares_in_flight`, `fetch_group_aborted_by_publisher`, `fetch_pending_aborted_when_dynamic_dropped`, `latest_group_returns_max_sequence_consumer`, `latest_group_none_on_empty_track`). `cargo test --workspace` = 290 moq-lite tests pass (up from 282).
  - **Wire-side FETCH hookup intentionally still returns errors**: `lite::ControlType::Fetch` returns `Error::UnexpectedStream`; `ietf::run_fetch_stream` Standalone returns "not supported". The breaking API change captures the in-process API; the wire format choice is its own conversation.
- **[PR #1350](https://github.com/moq-dev/moq/pull/1350) MERGED** Apr 29 16:46:18 UTC by [[luke-curley]] — *moq-relay: authenticate HTTPS callers via the cluster mTLS CA*. **mTLS HTTPS auth lands.** The CodeRabbit-flagged 🟠 Major (CORS+browser-readable-GET) was apparently resolved offline.
- **[PR #1349](https://github.com/moq-dev/moq/pull/1349) MERGED** Apr 29 16:08:52 UTC by [[luke-curley]] (skirsten's *@moq/watch: add static catalog format*). Third catalog mode lands — `<moq-watch catalog-format="static">` plus writable `Signal<Catalog.Root | undefined>` for `Broadcast.catalog`.
- **[PR #1360](https://github.com/moq-dev/moq/pull/1360) MERGED** Apr 29 16:29:05 UTC by [[luke-curley]] (+29/−10) — *moq-native: relocate jemalloc helper; wire it into moq-boy*. **moq-boy now production-instrumented for jemalloc heap profiling at 6+ instances.**
- **PR #1361 OPENED+CLOSED** Apr 29 16:17 → 16:29 UTC by [[luke-curley]] — *moq-native: move jemalloc profiling helper from moq-relay*. Replaced by PR #1360.

### External contributor activity Apr 29–30

- **[PR #1354](https://github.com/moq-dev/moq/pull/1354) CLOSED unmerged** Apr 29 16:54:30 UTC by Qizot. Closing comment: *"This was wrong approach, we should have reconfigured the encoder instead."*
- **[PR #1362](https://github.com/moq-dev/moq/pull/1362) OPENED** Apr 29 17:04:41 UTC by Qizot (+40/−17) — *Add audio encoder reconfiguration*. **Replaces PR #1354.** When iOS Safari mismatch is detected (worklet's `channelCount` resolves to 2 but `onmessage` receives mono), the encoder is **reconfigured** rather than padding the AudioData. Cleaner solution. Open under CodeRabbit review.
- **[PR #1359](https://github.com/moq-dev/moq/pull/1359) — TITLE CHANGED + RESCOPED.** Originally *"fix(watch): process CMAF groups sequentially in WebCodecs decoder"* (+64/−67). **Now *"feat(hang): unify OrderedConsumer across container formats"* (+971/−...).** After Luke's Apr 28 23:00 UTC review comment: *"I think we need a generic `OrderedConsumer`. The problem is that `recvGroup` (and MoQ in general) returns groups out-of-order. The idea behind `OrderedConsumer` is that we skip groups based on the target latency, which requires timestamp information unfortunately."* and Apr 29 00:29 UTC: *"On the Rust side, I made an interface to parse the timestamp out of each frame. Then OrderedConsumer can be reusable."* — **ksletmoe-aws (AWS) rewrote the PR as a generic `OrderedConsumer<F: Container>` refactor** that unifies Legacy + CMAF containers behind a `ContainerFormat` strategy interface. Mirrors the Rust `moq-mux` `Consumer<F: Container>` pattern. New files: `container/format.ts`, `container/consumer.ts`, `container/cmaf/format.ts`, `container/consumer.test.ts` (25 tests). 4 watch decoders migrated. Apr 30 01:43 UTC ksletmoe-aws addressed CodeRabbit nitpicks. **First instance of an external moq-dev/moq contributor's PR being expanded in scope at the maintainer's request** to align JS-side architecture with the Rust side.
- **[Issue #1363](https://github.com/moq-dev/moq/issues/1363) OPENED** Apr 30 00:43:26 UTC by **metapox** (taku): *"feat(lite): JS Subscriber lacks SUBSCRIBE_UPDATE support for dynamic priority changes"*. Concrete use case: **multi-camera streaming where the viewer switches focus** between cameras. Each camera has a subscription, and the focused one should get higher priority — but the close→re-subscribe path causes a 1s keyframe-wait gap on every switch, while SUBSCRIBE_UPDATE would be seamless. **Rust subscriber already handles this** via `TrackSubscriber::update()`; JS subscriber is missing the equivalent. Issue includes a proposed implementation (track.ts adds priority Signal + updatePriority; lite/subscriber.ts watches for priority changes and sends SubscribeUpdate; lite/publisher.ts applies received priority). Tested in metapox's [moq-multicam](https://github.com/metapox/moq-multicam) app. Total diff: 30 inserts/4 deletes across 3 files. Second time metapox surfaces a moq-lite/JS issue (after Apr 27 #1351 false-alarm).

### Net effect

moq-relay's operational layer is substantially upgraded — mTLS HTTPS auth, jemalloc heap profiling, FETCH-readiness API, third catalog mode all merged in one ~16-hour window. The model layer is fully scaffolded for FETCH; only wire-side hookup remains. External contributors are now driving non-trivial design redesigns (ksletmoe-aws's #1359 rescoping is unprecedented in moq-dev/moq), and metapox's #1363 issue brings a multi-camera streaming use case to JS-side priority handling.

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
