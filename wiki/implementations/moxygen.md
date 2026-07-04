---
title: "Moxygen (Meta)"
tags: [implementation, cpp, meta]
date: 2026-04-10
last_updated: 2026-07-04
status: current
---

> **2026-07-04**: **A real spec-compliance fix lands — by direct commit, not a GitHub PR.** Moxygen merges to `main` via Meta's internal-diff workflow (direct commits, no GitHub PRs), so PR-based scans miss it: on **July 3** two commits landed — **`c14a6bb9`** (02:23 UTC) *"Draft 16 and below: DELIVERY_TIMEOUT of 0 is PROTOCOL_VIOLATION"* — enforces that a **zero `DELIVERY_TIMEOUT` is a protocol violation** on draft ≤16 (a wire-conformance tightening on the versions moxygen actually advertises) — plus a routine **`e0b58105`** *"Updating hashes"*. The July-1 afrind qlog/viz PRs (#205/#206) and gmarzot's #207 logging fix remain OPEN; relay/stats/TLS work still routes to the [[openmoq|moqx]] fork. See [[openmoq]], [[discussions-2026-07]].
>
> **2026-07-03**: **A quiet window upstream — one new OPEN logging fix.** **[PR #207](https://github.com/facebookexperimental/moxygen/pull/207)** (gmarzot, July 2 21:02) *"Fix `FOLLY_XLOG_STRIP_PREFIXES` to strip moxygen's own root"* — corrects the XLOG prefix stripping so log lines show paths relative to moxygen's own source root. No merges July 2–3; the July-1 afrind qlog/viz PRs (#205/#206) remain OPEN. The relay/stats/TLS development this window continues to land on the **[[openmoq|moqx]]** fork (afrind's #478/#477 stats, gmarzot's #460 PKCS#12 TLS) rather than upstream — the standing routing pattern. See [[openmoq]], [[discussions-2026-07]].
>
> **2026-07-02**: **The upstream tree pivots to qlog/visualization tooling — two OPEN afrind PRs land July 1.** **[PR #205](https://github.com/facebookexperimental/moxygen/pull/205)** *"Overhaul MoQ viz: NDJSON input, track-alias reconstruction, no CDN dep"* (+1511/−966, OPEN) — a substantial rewrite of the MoQ visualization tool to take NDJSON input, reconstruct track aliases, and drop the CDN dependency; and **[PR #206](https://github.com/facebookexperimental/moxygen/pull/206)** *"qlog: Wire per-connection QLogger via `HQServerTransportFactory::setQLoggerFactory`"* (+13/−0, OPEN) — per-connection qlog wiring (the counterpart to the [[openmoq|moqx]] qlog #464 line). The June-30/July-1 stats/test cluster (#204 stats callbacks, #203/#201 test fixes, #200/#199 relay lifecycle) all stayed **CLOSED-unmerged** via Meta's internal-diff workflow, with only #202 lingering OPEN — so the retraction pattern holds while the new work is qlog/viz rather than relay/stats. See [[openmoq]], [[discussions-2026-07]].
>
> **2026-07-01**: **The upstream tree keeps RETRACTING afrind's PRs — Meta's internal-diff workflow closes them unmerged and the work lands via the [[openmoq|moqx]] fork instead.** **CLOSED-unmerged** in-window: **[PR #204](https://github.com/facebookexperimental/moxygen/pull/204)** (+109/−5, *stats: add `onSubgroupReset` + `recordObjectAckLatency` callbacks*, July 1 — this exact work reappears as moqx **[#462](https://github.com/openmoq/moqx/pull/462)**), plus **[#203](https://github.com/facebookexperimental/moxygen/pull/203)**/**[#201](https://github.com/facebookexperimental/moxygen/pull/201)** (test fixes, June 30) and the earlier **[#200](https://github.com/facebookexperimental/moxygen/pull/200)** (reset open subgroup consumers on `SubgroupForwarder` detach) / **[#199](https://github.com/facebookexperimental/moxygen/pull/199)** (getKeepAlive on MoQExecutor), all CLOSED-unmerged June 30. Only **[#202](https://github.com/facebookexperimental/moxygen/pull/202)** (+62/−1, reset open subgroups when a subscription is cancelled) stays OPEN. So the upstream repo shows near-zero net merges while afrind's relay/stats hardening flows through moqx — the same pattern the wiki has tracked for weeks. See [[openmoq]], [[discussions-2026-06]].
>
> **2026-06-30**: **The upstream relay/test work continues — three more OPEN afrind PRs land directly on `facebookexperimental/moxygen` (June 29), all still unmerged.** **[PR #202](https://github.com/facebookexperimental/moxygen/pull/202)** *"Reset open subgroups when a subscription is cancelled"* (+62/−1) — a subgroup-lifecycle fix conceptually sibling to June-28's **[#200](https://github.com/facebookexperimental/moxygen/pull/200)** (reset subgroup consumers on `SubgroupForwarder` detach), now handling the subscription-cancel path; plus two test-infra PRs: **[#201](https://github.com/facebookexperimental/moxygen/pull/201)** *"Use gtest_discover_tests for accurate test registration"* (+2/−4) and **[#203](https://github.com/facebookexperimental/moxygen/pull/203)** *"test: fix dangling peer handler in DeleteFromCallback tests"* (+6/−2). With June-28's #199/#200 still OPEN, afrind now has five OPEN relay/test PRs on the upstream tree — the upstream source of the [[openmoq|moqx]] sync-bot mirrors. The active *development* line stays the moqx fork. See [[openmoq]], [[discussions-2026-06]].
>
> **2026-06-29**: **The upstream tree wakes again — two new OPEN afrind relay PRs land directly on `facebookexperimental/moxygen`.** **[PR #199](https://github.com/facebookexperimental/moxygen/pull/199)** *"Add getKeepAlive() to MoQExecutor for keeping the backing loop alive"* (+13/−0) and **[PR #200](https://github.com/facebookexperimental/moxygen/pull/200)** *"relay: reset open subgroup consumers on SubgroupForwarder detach"* (+53/−0), both **OPEN** (June 28, afrind) — small relay-lifecycle fixes (executor keep-alive + subgroup-consumer reset on forwarder detach). These are the **upstream source of the omoq-sync-bot mirrors** that land on the [[openmoq|openmoq/moqx]] fork (the fork's #457 sync June 28). The earlier June-24/25 cluster has mostly closed unmerged via Meta's internal-diff workflow (#192/#193/#196/#197), with #194/#195 still OPEN. So the upstream repo continues to surface afrind's relay work in bursts while the active *development* line stays the moqx fork. See [[openmoq]], [[discussions-2026-06]].
>
> **2026-06-27**: **The upstream wake-up retracts further — a fourth PR closes *unmerged*.** **[PR #193](https://github.com/facebookexperimental/moxygen/pull/193)** *"MoQRelaySession: fall back to SUBSCRIBE_NAMESPACE on draft < 18"* is now **CLOSED without merge** (June 26), joining #192/#196/#197 — so four of the six June-24/25 upstream PRs have closed unmerged via Meta's internal-diff (Phabricator) workflow. **Only [#194](https://github.com/facebookexperimental/moxygen/pull/194)** (server-initiated PUBLISH via SUBSCRIBE_TRACKS) and **[#195](https://github.com/facebookexperimental/moxygen/pull/195)** (graceful SIGINT/SIGTERM shutdown) remain OPEN. The active moxygen *development* line stays the [[openmoq|openmoq/moqx]] fork (afrind's June-26 LF-mode relay batch). See [[openmoq]], [[discussions-2026-06]].
>
> **2026-06-26**: **Three of the June-24/25 upstream PRs close *unmerged* — the wake-up partly retracts.** **[PR #196](https://github.com/facebookexperimental/moxygen/pull/196)** (Subscriber requestID from PUBLISH_OK), **[PR #197](https://github.com/facebookexperimental/moxygen/pull/197)** (mock `fetch()` on MockMoQSession), and **[PR #192](https://github.com/facebookexperimental/moxygen/pull/192)** (request session in handleTrackStatus) are all **CLOSED without merge** June 24–25 — consistent with Meta's internal-diff (Phabricator) workflow, where the canonical landing happens internally and the GitHub PR mirror is closed rather than merged. **Still OPEN**: **[#193](https://github.com/facebookexperimental/moxygen/pull/193)** (draft<18 SUBSCRIBE_NAMESPACE fallback), **[#194](https://github.com/facebookexperimental/moxygen/pull/194)** (server-initiated PUBLISH via SUBSCRIBE_TRACKS), **[#195](https://github.com/facebookexperimental/moxygen/pull/195)** (graceful SIGINT/SIGTERM shutdown). See [[openmoq]], [[discussions-2026-06]].
>
> **2026-06-25**: **The upstream repo wakes up — four new OPEN PRs land on `facebookexperimental/moxygen` itself (June 24–25), after weeks where the active moxygen work was happening on the [[openmoq|openmoq/moqx]] fork.** All on the draft-18 PUBLISH / SUBSCRIBE_TRACKS surface: **[PR #194](https://github.com/facebookexperimental/moxygen/pull/194)** *"moqtest: support server-initiated PUBLISH via SUBSCRIBE_TRACKS"* (+430/−21) — exercises the draft-18 server-initiated PUBLISH path; **[PR #195](https://github.com/facebookexperimental/moxygen/pull/195)** *"moqtest: graceful SIGINT/SIGTERM shutdown for client and server"* (+551/−42); **[PR #196](https://github.com/facebookexperimental/moxygen/pull/196)** *"MoQForwarder: set Subscriber requestID from PUBLISH_OK"* (+3/−0); **[PR #193](https://github.com/facebookexperimental/moxygen/pull/193)** *"MoQRelaySession: fall back to SUBSCRIBE_NAMESPACE on draft < 18"* (+54/−4) — version-negotiation fallback so the relay handles pre-18 peers. This is the same message-shape work the fork has been doing surfacing on the upstream tree. See [[openmoq]], [[discussions-2026-06]].
>
> **2026-06-10**: **moxygen relay live on draft-18 at the London hackathon.** [[alan-frindell|afrind]] brought the relay up at `fb.mvfst.net:9448` (QUIC + WebTransport) supporting **versions 14/16/18** on June 9 — the first publicly-announced draft-18 relay endpoint. Known gaps: no REDIRECT errors, no GOAWAY-on-request-stream, no PUBLISH_BLOCKED. afrind also shipped a draft-18 wire decoder (`moqx/tools/moq_decode.py`, [openmoq/moqx PR #398](https://github.com/openmoq/moqx/pull/398)) to help debug interop failures. See [[interop-endpoints]], [[discussions-2026-06]], [[openmoq]].

**Language**: C++ (mvfst-based)
**Organization**: Meta
**Maintainer**: [[alan-frindell]], Joseph Beshay
**GitHub**: [facebookexperimental/moxygen](https://github.com/facebookexperimental/moxygen)
**Relay endpoint**: `fb.mvfst.net`

# Overview

Meta's open-source C++ MOQ implementation built on their mvfst QUIC library. Includes relay, client, and protocol library. [[openmoq|OpenMOQ]] maintains a fork ([openmoq/moxygen](https://github.com/openmoq/moxygen)) as a buffer repo for their planned moqx server.

# Draft Support

- Draft 14 and 16 supported
- Can negotiate draft 15
- [[qmux]] support on port 9449

# Public Infrastructure

- **QUIC relay**: `moqt://fb.mvfst.net:9448` / `https://fb.mvfst.net:9448/moq-relay`
- **QMux relay**: `fb.mvfst.net:9449` (TLS/TCP and QUIC)
- **WebSocket proxy**: `wss://fb.mvfst.net:9450` (proxying to TLS on 9449)

# Notable

- [[alan-frindell]] achieved 0-RTT subscribe with draft-16 + unidirectional control streams (2026-03-16)
- Frequently used as the "reference relay" for interop testing

# Related

- [[moq-rs]] - Alternative relay implementation
- [[interop-endpoints]] - Full endpoint listing
