---
title: "OpenMOQ Software Consortium"
tags: [implementation, consortium, organization]
date: 2026-04-12
last_updated: 2026-05-30
status: current
---

> **2026-05-30**: **openmoq/moqx — afrind multi-thread sprint Day 3 May 29** (3 PRs MERGED, lighter cadence than May 27-28 13+6 events). **MERGED May 29**: **[PR #346](https://github.com/openmoq/moqx/pull/346)** *"test: add relay-level PublishOk NGR forwarding tests; remove last dynamic_cast"* (14:03 UTC) — closes the relay-level PublishOk NGR forwarding test gap from the May 27 sprint; **[PR #352](https://github.com/openmoq/moqx/pull/352)** *"relay: wrap consumer in CrossExecFilter inside PublisherCrossExecFilter"* (13:20 UTC) — completes the cross-exec wrapping work started May 27; **[PR #354](https://github.com/openmoq/moqx/pull/354)** automated moxygen submodule sync `608fca6` (11:51 UTC). 3-day cumulative event count: 13 (May 27) + 6 (May 28) + 3 (May 29) = **22 events** = largest 3-day push by any contributor across any MoQ implementation tracked. **[[paul-mondain|Paul Mondain]] CAT token integration continues**: **[PR #264](https://github.com/openmoq/moqx/pull/264)** OPEN since May 1 *"feat: Add opt-in CAT token authorization"* (+1804/−11, 20 files) — per-service auth config block, signed CWT/HMAC token verifier for `exp`/`moqt`/`moqt-reval` claims, AUTHORIZATION_TOKEN setup credential validation, authorizes PUBLISH_NAMESPACE/PUBLISH/SUBSCRIBE_NAMESPACE/SUBSCRIBE/FETCH/TRACK_STATUS requests, preserves existing relay peering token behavior. Updated May 30 05:47 UTC. **[PR #286](https://github.com/openmoq/moqx/pull/286)** OPEN since May 4 *"auth: integrate Catapult CAT token verification"* (+179/−521, 7 files) — stacked on #264, adds `Quicr/catapult` submodule wired into CMake + Docker builds, replaces local v1 token envelope/CBOR/HMAC parsing with Catapult CWT validation. Updated May 30 04:48 UTC. mondain's CAT token integration now stacked on afrind's multi-thread refactor and pending review — **first openmoq/moqx external-contrib-driven auth path**. **Carry-forward**: PR #331 (`relay_thread` config + allow > 1 thread) remains the last PR-merge away from `threads > 1` being usable in production; with the cBPF steering filter (PR #350 May 28) + recvmmsg batch (PR #337 May 28) + IOThreadPoolExecutor ownership (PR #351 May 28) + cross-exec filter wrapping (PR #352 May 29) all infrastructure-merged, **the multi-thread story is `relay_thread`-knob-flip away from production-ready** — afrind's London Day-1 0900-1045 MOQT Issues 180-min slot now structurally backed by a deployable multi-threaded MoQ relay reference impl.
>
> **2026-05-29**: **openmoq/moqx — afrind multi-thread sprint Day 2 May 28** (6 PRs MERGED + 3 PRs OPEN, continuing from May 27's 13-event single-day burst). **MERGED May 28**: [PR #348](https://github.com/openmoq/moqx/pull/348) *"test: wire up res→reply coroutine in relay publish tests"* (14:03 UTC, +15/−0); **[PR #349](https://github.com/openmoq/moqx/pull/349)** *"build: add TSan (ThreadSanitizer) build mode"* (14:04 UTC, +38/−0); **[PR #350](https://github.com/openmoq/moqx/pull/350)** *"bpf: attach classic reuseport steering filter to QUIC worker sockets"* (14:04 UTC, +141/−4) — foundational cBPF reuseport filter routing non-initial QUIC packets to owning worker by decoding workerId from mvfst V1 connection ID encoding, long-header (initial/handshake) packets spread by UDP source port; **[PR #351](https://github.com/openmoq/moqx/pull/351)** *"relay: IOThreadPoolExecutor owned exclusively by main"* (15:03 UTC, +13/−16) — simplifies ownership for multi-thread mode; **[PR #337](https://github.com/openmoq/moqx/pull/337)** *"mvfst: enable recvmmsg by default, bump recv batch size to 64"* (14:03 UTC) — production-grade batch UDP receives; **[PR #353](https://github.com/openmoq/moqx/pull/353)** automated moxygen submodule sync 059ed9e (12:01 UTC). **OPEN**: **[PR #352](https://github.com/openmoq/moqx/pull/352)** CrossExecFilter wrapping inside PublisherCrossExecFilter; **[PR #346](https://github.com/openmoq/moqx/pull/346)** relay-level PublishOk NGR forwarding tests; **[PR #331](https://github.com/openmoq/moqx/pull/331)** `relay_thread` config + allow > 1 thread in config — this is the **last PR-merge away from `threads > 1` being usable in production** (May 27 PR #350 added the cBPF steering filter, May 28 PR #351 isolated IOThreadPoolExecutor ownership, May 28 PR #337 enabled recvmmsg — PR #331's relay_thread config is the user-facing knob that flips the multi-thread story from "infrastructure ready" to "deployable"). **Carry-forward**: afrind has the **London Day-1 0900-1045 "MOQT Issues" 180-min slot**; the openmoq/moqx multi-thread story is being assembled PR-by-PR to be production-ready by London. Two days of sustained sprint May 27-28 = 19 total events (13 May 27 + 6 merges + 3 opens May 28) make this **the largest two-day push by any contributor across any MoQ implementation tracked**.
>
> **2026-05-28**: **openmoq/moqx — afrind 13-event single-day burst May 27** (6 PRs MERGED + 6 PRs OPEN + Issue #347 OPEN = **largest single-author single-day push the wiki has tracked across any MoQ implementation**, exceeding kixelated's overnight ~17-PR waves in moq-dev/moq which spanned 8+ hours; afrind's 13 events all landed within a ~6-hour window May 27 17:29-23:37 UTC). **Merged**: [PR #338](https://github.com/openmoq/moqx/pull/338) moxygen submodule sync 5c8f066; [PR #341](https://github.com/openmoq/moqx/pull/341) *"scripts: perf-test and perf-metrics improvements"* (+111/−10) adds `--perf-events`/`--perf-stat`/`--trace-script`/`--client-args`, macOS port-in-use fallback `lsof`↔`ss`, per-io-thread CPU% via /proc; [PR #342](https://github.com/openmoq/moqx/pull/342) *"relay: add cross-exec handle wrappers for Publisher/Subscriber results"* (+213/−8) — *"The original filters only handled the initial verbs (publish, subscribe, etc). The returned handles that are used for e.g. unsubscribe, requestUpdate, and the passed relay→session (pubNsCancel, subNs response) were missed"*; [PR #343](https://github.com/openmoq/moqx/pull/343) adds publisherInterface/subscriberInterface accessors to relay test fixture; [PR #344](https://github.com/openmoq/moqx/pull/344) wraps relay state queries in verifyOnRelayExec; [PR #345](https://github.com/openmoq/moqx/pull/345) removes MoQForwarder::Subscriber downcast (last dynamic_cast). **Open**: [PR #346](https://github.com/openmoq/moqx/pull/346) relay-level PublishOk NGR forwarding tests; [PR #348](https://github.com/openmoq/moqx/pull/348) res→reply coroutine wiring; [PR #349](https://github.com/openmoq/moqx/pull/349) TSan build mode; **[PR #350](https://github.com/openmoq/moqx/pull/350)** *"bpf: attach classic reuseport steering filter to QUIC worker sockets"* (+141/−4) — *"Adds MOQX_ENABLE_BPF_STEERING (default ON on Linux) which overrides mvfst's weak mvfst_hook_on_socket_create hook to attach a cBPF filter that routes non-initial QUIC packets directly to the owning worker by decoding the workerId from mvfst's default V1 connection ID encoding. Long-header (initial/handshake) packets are spread by UDP source port. Note: threads is still forced to 1 so this doesn't do anything yet but it will real soon now (TM)"*; [PR #351](https://github.com/openmoq/moqx/pull/351) IOThreadPoolExecutor owned exclusively by main; [PR #352](https://github.com/openmoq/moqx/pull/352) CrossExecFilter wrapping inside PublisherCrossExecFilter. **[Issue #347](https://github.com/openmoq/moqx/issues/347)** OPEN 23:20 UTC — *"moqx+picoquic can block when the highest pri stream is flow control blocked"*: choppy video relayed through pico EVB server traced to processEgressEvents marking only one stream active at a time in picoquic's priority queue, with no mechanism to skip flow-control-blocked stream heads. **Theme**: cross-exec thread-safety + multi-threaded I/O prep (cBPF reuseport steering is foundational mvfst multi-thread infra) + relay-level test scaffolding + perf measurement. **Carry-forward**: afrind has the London Day-1 0900-1045 *"MOQT Issues"* 180-min slot; combined with PR #350 + #351 + #352 + Issue #310 *"Support multiple IO threads"*, the openmoq/moqx multi-thread story is being assembled PR-by-PR with explicit acknowledgement that thread count is still forced to 1 (*"will real soon now (TM)"*). Positions openmoq/moqx as the multi-threaded MoQ relay reference impl for London.
>
> **2026-05-22**: **mondain/moqxr +3 more commits May 21** (17-commit running total May 19-21) by [[paul-gregoire|Paul Gregoire]]. The May 21 commits shift from documentation/i18n (May 20) to **feature-adding capability commits**: `8255194` *"Add live object publish API"* (15:49 UTC) — first publisher-side runtime API beyond the May 17 ingest-CLI scope; `8e90a0e` *"Add optional MSF media timeline track"* (17:12 UTC) — first MSF/CMSF-aware track-publishing capability inside moqxr; `5c3cf91` *"Merge PR #13 from mondain/jemalloc"* (17:17 UTC) — memory-allocator swap (mondain-internal). **17 commits in 3 days makes mondain/moqxr the highest-cadence open-source MoQ C++ implementation tracked for May 2026** — exceeds [[imquic]]'s May draft-18 work by commit count. **Net structural arc May 19-21**: 8 wire-fix commits → 6 docs/i18n → 3 feature-adds. Paul has shifted out of stabilisation and into capability-expansion within 3 days of Lorenzo Miniero's first bilateral interop attempt.
>
> **2026-05-21**: **mondain/moqxr +6 more commits May 20 (14-commit running total May 19-20)** by Paul Gregoire. The May 20 commits shift from **wire-protocol fixes** to **documentation + localization**: `617a582` *"Add localized publisher API docs"* (13:15), `cf0b22b` *"Restructure README and add localized versions"* (13:31), `0d7c082` *"Add MOQT draft transport specs"* (13:32), `7779575` *"Fix WebTransport protocol offer formatting"* (14:25), `95b912d` *"Document WebTransport protocol offer formatting"* (14:31), plus carryover `d759426` *"Fix draft 18 request stream polling"* (00:11). **4 of 6 are docs/i18n** — Paul considers the wire-protocol gap structurally closed after May 19's 8-commit fix-up sprint. **No Lorenzo Miniero re-test** in the Slack thread after May 19 13:21 UTC ack; bilateral interop session has not been re-attempted post-fix. **Paul Gregoire `#moq` May 20 15:31 UTC**: in reply to gazzy's new `Moqintosh` iOS impl announcement, Paul mentions he had a similar private `moqntosh` "toy" he was *"messing around with over the weekend"* — same name play. **Day-22 since OpenMOQ governance fallout** (April 25 Mike English / Giovanni Marzot incident, fully resolved May 18 23:17 UTC); the consortium's most-visible technical contribution is now Paul Gregoire's mondain/moqxr fix-up cadence rather than the original moqx fork.
>
> **2026-05-20**: **mondain/moqxr 8-commit draft-18 fix-up sprint May 19 14:17 → May 20 00:11 UTC** after Lorenzo Miniero's first interop attempt against the May 18 announcement found a **bidi-vs-uni SETUP-stream divergence** (moqxr defaulted to draft-14 unless `--draft 18` was set, and used a bidirectional stream for SETUP when draft-18 requires two unidirectional streams). Paul Gregoire's 8 commits include *"Align draft-18 WebTransport stream handling"* (`53ee899`), *"Fix MoQT control compliance gaps"* (`40ee48c`), *"Fix MoQT publish framing and metadata"* (`c426d2d`), *"Fix draft 17 and 18 MoQT wire semantics"* (`96baf5a`), *"Fix MoQT pass 3 compliance gaps"* (`7bebe08`), *"Fix WebTransport protocol offers"* (`f73427a`), *"Fix draft-18 setup option delta encoding"* (`1f222b0`), *"Fix draft 18 request stream polling"* (`d759426`). This is the **first cross-impl hands-on draft-18 interop attempt the wiki has tracked** (moqxr ↔ [[imquic]]); the 10-hour turnaround on 8 fixes validates moqxr as an actively-maintained second draft-18 endpoint heading into [[2026-06-09-london-interim|London]]. Mike English ↔ [[giovanni-marzot]] resolved May 18 23:17 UTC the *"suspicious AI PR"* incident from April: the moq-interop-runner PR was *"just Claude being overzealous about tackling a slightly under-specified prompt"* — Giovanni Marzot back in the contributor loop with Mike *"looking forward to working together more on improving the interop runner"*.
>
> **2026-05-19**: **mondain/moqxr ships draft-18 support** (10 commits May 16–18 by Paul Gregoire — *"Implement draft-18 subscribe tracks"* / *"fix draft 18 subgroup header encoding"* / *"Add cross-draft MoQ message serde tests"*). Paul Gregoire publicly announced on `#moq` May 18 18:44 UTC: *"@Lorenzo Miniero I've got moqxr updated to 18; github.com/mondain/moqxr."* **Third open-source implementation to ship draft-18** (after [[moq-dev|moq-dev/moq]] and [[imquic]]). First OpenMOQ-derived implementation to come up on the `#moq` channel in a positive technical context (vs the May 10 openmoq/moqx governance fallout).

**Website**: [openmoq.org](http://openmoq.org/)
**GitHub**: [openmoq](https://github.com/openmoq)

# Overview

An industry consortium advancing MOQ-based technology through high-performance, open-source software. Mission: deliver practical implementations that enable the next generation of media transport.

# Members

## Charter Members
- Akamai
- CDN77
- Cisco
- RED5
- Synamedia
- YouTube

## Standard Members
- Ateme
- Bitmovin
- Nano Cosmos
- Qualabs
- Vindral
- Wowza

## Academic Members
- University of Klagenfurt
- Özyeğin University

# Repositories

## openmoq/moxygen (moqx)
- **GitHub**: [openmoq/moxygen](https://github.com/openmoq/moxygen)
- Fork of Meta's [[moxygen]] relay, serving as the buffer repo for the planned **moqx** server/relay
- C++
- Updated: 2026-04-10
- **Now in the [[interop-runner]]** (added Apr 2026): strong results as a relay — moq-dev-js <-> moqx 6/6, moq-rs-draft-16 <-> moqx 5-6/6, moq-rs <-> moqx all pass

## openmoq/moq-relay-test
- **GitHub**: [openmoq/moq-relay-test](https://github.com/openmoq/moq-relay-test)
- Interop testing tool for MOQT relays
- Updated: 2026-03-20

## mondain/moqxr
- **GitHub**: [mondain/moqxr](https://github.com/mondain/moqxr)
- Origin Publisher, Contribution, and Ingest CLI for OpenMOQ
- C++
- **draft-18 support shipped May 16–18, 2026** — 10 commits including *"Implement draft-18 subscribe tracks"* (`fe6ba73f`), *"fix draft 18 subgroup header encoding"* (`cca10631`), *"Add cross-draft MoQ message serde tests"* (`d284c21c`). Slack `#moq` announcement May 18 18:44 UTC.
- **Active sprint May 19-21, 2026** — 17 commits total: 8 draft-18 wire-fix commits May 19 + 6 docs/i18n May 20 + 3 feature-adds May 21 (`8255194` *"Add live object publish API"*, `8e90a0e` *"Add optional MSF media timeline track"*, `5c3cf91` *"Merge PR #13 from mondain/jemalloc"*). **Highest-cadence open-source MoQ C++ implementation for May 2026.**
- Latest release: **v0.2.1** (Apr 17, 2026) — draft-16 interop fixes (release tag predates the draft-18 work)
- Prior: v0.2.0 (Apr 15) added draft-16 SUBSCRIBE KVP parser, dropped WebTransport subprotocol for draft-14, and made control-message handling non-blocking
- Updated: 2026-05-21

## red5pro/moq-playa (planned)
- Player component for OpenMOQ
- Not yet publicly available (as of 2026-04-10)

# Goals

- Distribute development costs across organizations
- Accelerate MOQ through collective expertise
- Ensure interoperability via standardized implementations
- Lower market barriers for new use cases beyond media (financial feeds, gaming, IoT, AR/VR)

# Development Status

Core infrastructure development is ongoing. The consortium has completed industry alignment, established a technical roadmap, and finalized legal structure and governance.

# Related

- [[moxygen]] - Meta's original relay that openmoq/moxygen forks
- [[interop-runner]] - Interop testing (moq-relay-test is a related tool)
- [[will-law]] - Akamai, charter member
- [[suhas-nandakumar]] - Cisco, charter member
