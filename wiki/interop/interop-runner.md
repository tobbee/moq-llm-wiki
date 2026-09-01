---
title: "MOQ Interop Runner"
tags: [interop, testing, tooling]
date: 2026-04-14
last_updated: 2026-09-01
status: current
---

Standardized cross-implementation test framework for MOQ protocol interoperability testing.

# Overview

The interop runner automates testing between MOQ implementations, publishing results as a matrix showing pass/fail status for each implementation pair.

**GitHub**: [englishm/moq-interop-runner](https://github.com/englishm/moq-interop-runner)
**Results**: [englishm.github.io/moq-interop-runner](https://englishm.github.io/moq-interop-runner/)

# Registered Implementations

Roster as actually exercised by the **2026-08-22** cut — **15 client endpoints × 16 relay endpoints**. Several projects register more than one endpoint (a draft-pinned variant, or separate client and relay roles), so endpoint names are not 1:1 with projects. The **2026-08-27 14:16 cut expanded to 351 cells (15 clients × 17 relays)** by enrolling the new **`stitcher-moq`** relay (Pluto TV / Paramount, runner [PR #112](https://github.com/englishm/moq-interop-runner/pull/112)) — see [Current standing](#current-standing).

**Client endpoints (15)** — `aiomoqt`, `imquic`, `moq-dev-js`, `moq-dev-rs`, `moq-go`, `moq-rs`, `moq-rs-draft-14`, `moq-rs-draft-18`, `moq5`, `moqlivemock`, `moqtopus`, `moqx`, `moxygen`, `xquic`, `xquic-draft-18`

**Relay endpoints (16)** — `aiomoqt-relay`, `aiomoqt-relay-quic`, `imquic`, `libquicr`, `moq-dev-rs`, `moq-go`, `moq-rs`, `moq-rs-draft-14`, `moq-rs-draft-18`, `moqt-nr`, `moqtail`, `moqx`, `moxygen`, `quiche-moq`, `xquic`, `xquic-draft-18`

| Endpoint | Project | Draft (Aug-22) | Notes |
|---|---|---|---|
| `aiomoqt`, `aiomoqt-relay`, `aiomoqt-relay-quic` | [[aiomoqt]] — Python asyncio ([[giovanni-marzot|gmarzot]]) | 18 | Client + two relay roles; **18/18 vs moqx, moxygen, moq-rs-draft-18** on the Aug-22 cut |
| `imquic` | [[imquic]] — [[lorenzo-miniero]]'s C library | 18 | Client and relay |
| `moq-dev-js`, `moq-dev-rs` | [[moq-dev|moq-dev/moq]] ([[luke-curley]]) | 18 | JS/Hang player + Rust client and relay |
| `moq-go` | **Go implementation — not yet covered by a wiki page** | **19** | **Only endpoint ahead of target**; since Aug-19 pairs only with itself (6/6) |
| `moq-rs`, `moq-rs-draft-14`, `moq-rs-draft-18` | [[moq-rs|cloudflare/moq-rs]] | 16 / 14 / 18 | Three draft-pinned endpoints; `moq-rs-draft-18` is [[mike-english]]'s single-instance relay |
| `moq5` | **Client — not yet covered by a wiki page** | 18 | |
| `moqlivemock` | [[moqlivemock|Eyevinn moqlivemock]] (`mlmtest`, [[tobbe-einarsson]]) | — | Client role |
| `moqt-nr` | **Relay — not yet covered by a wiki page** | 18 | |
| `moqtail` | [[moqtail]] (Zafer Gurel) | 16 | Relay |
| `moqtopus` | Moqtopus — C++/MsQuic for Unreal Engine (Kota Yatagai) | 18 | Client |
| `moqx` | [[openmoq|OpenMOQ moqx]] | 18 | Client + relay |
| `moxygen` | [[moxygen|Meta's C++ relay]] | 18 | Client + relay; interop **client** ALPN gap tracked in runner [PR #111](https://github.com/englishm/moq-interop-runner/pull/111); **announce-subscribe case publishes the wrong namespace** (`moq-interop-test` vs the spec `moq-test/interop`), so it fails 5/6 as *unauthorized* on prefix-scoped relays (Steven Riedl/Pluto TV, Slack Aug-26; afrind: "will fix") |
| `quiche-moq` | [[quiche-moq|google/quiche]] ([[martin-duke]], [[victor-vasiliev]]) | 16 | Relay |
| `stitcher-moq` | **Pluto TV / Paramount relay — not yet covered by a wiki page** ([[steven-riedl|Steven Riedl]]) | 18 | Relay; **enrolled 2026-08-27** (runner [PR #112](https://github.com/englishm/moq-interop-runner/pull/112)), expanding the matrix to 351 cells |
| `xquic`, `xquic-draft-18` | [[xquic-moq|Alibaba XQUIC]] | 14 / 18 | Client + relay; draft-18 relay image reported unavailable on the Aug-22 cut |
| `libquicr` | [[libquicr|Cisco]] | 14 | Relay |

> **Coverage gap**: `moq-go`, `moq5`, `moqt-nr`, and (since Aug-27) `stitcher-moq` are registered and running but have **no wiki page yet**. `moq-go` is the most significant — it is the only implementation in the runner ahead of the draft-18 target; `stitcher-moq` is Pluto TV / Paramount's public relay, enrolled ahead of the Sep-2 hackathon.

**Registration history** (PRs on [englishm/moq-interop-runner](https://github.com/englishm/moq-interop-runner)): `moqx` relay #59 (Apr 11); then a May-13 batch — `mlmtest`/moqlivemock #63, `moqx` client #66, `aiomoqt` #67, and Nokia Docker `RELAY_URL` support #65 enabling Nokia's in-house v17 relay. **Merged Aug-27**: [#112](https://github.com/englishm/moq-interop-runner/pull/112) registering Pluto TV / Paramount's `stitcher-moq` public relay endpoints (Steven Riedl, 14:01 UTC — this expanded the matrix to 351 cells on the 14:16 cut) and [#111](https://github.com/englishm/moq-interop-runner/pull/111) documenting the moxygen/moqx draft-18 client ALPN limitation (14:02 UTC). **Open now**: [#110](https://github.com/englishm/moq-interop-runner/pull/110) registering the `kvick` relay (Mattias Bergström, since Aug-15).

# Current Target

The interop runner targets **draft-18** for automated testing. The WG (per [[mike-english]]'s Interop Report) agreed to hold draft-18 as the interop target while expanding case coverage from a handful of cases to ~70. Each matrix cell is categorized as at-target (both endpoints on draft-18), ahead, or behind.

[[alan-frindell|Alan Frindell]] **reaffirmed on Slack (July 18) that the official interop target for moq-transport is still draft-18** — "since there's been some confusion" — while welcoming intrepid implementers to try draft-19 because filter feedback is valuable. This came as the Vienna Hackathon began generating the first draft-19 activity (see Live interop below).

**A dedicated draft-18 interop push is now scheduled**: [[mike-english|Mike English]] announced a **Virtual Interop Hackathon on Wednesday 2026-09-02** (list, Aug-21, [permalink](https://mailarchive.ietf.org/arch/msg/moq/zB7VU82ER6YB0xQg8ndLzLF4cAA/)) — an all-day drop-in/drop-out session **targeting draft-18**, framed explicitly as hardening draft-18 interop *before* **draft-20** becomes the target at the **Oct 12–15 Seattle hybrid interim**. English flags two expected runner changes for it: **broader data-plane test coverage** and a possible **redesign of the results presentation**. Participants are asked to register implementations in the runner and refresh Docker images / relay endpoints in advance. See [[interim-meetings]].

The **[[interim-meetings|interim-2026-moq-21]] minutes (posted 2026-08-14)** name a **named successor**: after draft-20 (a purely-editorial cut) and draft-21 (the editorial-meeting output), *"Draft 22 will be published as the next official interop target."* So draft-18 holds as the automated target for now, with draft-22 slated to replace it once the editorial passes land.

# Current standing

**Latest cut: [2026-08-31 04:12:16 UTC](https://englishm.github.io/moq-interop-runner/results/2026-08-31_041216/report.html) — 351 cells / 125 pass / 216 fail / 10 skip** (35.6% pass; **at-target draft-18 210 · ahead 3 · behind 138**). This is the **second Aug-31 cut**: an earlier [2026-08-31 00:29:26 UTC](https://englishm.github.io/moq-interop-runner/results/2026-08-31_002926/report.html) run posted **351 / 122 / 219 / 10**, so pass climbed **116 (Aug-30) → 122 → 125** across the day — a **+9 pass recovery** that erases the Aug-30 low and sets a new high on the expanded 351-cell matrix. The version breakdown held **210 · 3 · 138** byte-identical (now six straight cuts), so this is a genuine same-matrix gain, and it lines up with the **draft-18 conformance work landing on the relays** — [[moq-rs|cloudflare/moq-rs]] merged its *"support draft-18 subgroup modifiers"* fix ([#224](https://github.com/cloudflare/moq-rs/pull/224)) at **02:39 UTC**, between the two Aug-31 cuts (the 04:12 run reflects it). Still targets **draft-18**. (See [Conformance sweep](#conformance-sweep-live-relays) below — afrind's moxygen conformance run drove the same moq-rs fixes; moq-rs went from failing before SUBSCRIBE on Aug-30 to passing Section 1 tests 1–3 on Aug-31.)

The **four prior 351-cell cuts**: [2026-08-30 00:28:30 UTC](https://englishm.github.io/moq-interop-runner/results/2026-08-30_002830/report.html) — **351 / 116 / 225 / 10** — the **−7 slip to the expanded-matrix low** this recovery erases; [2026-08-29 00:23:47 UTC](https://englishm.github.io/moq-interop-runner/results/2026-08-29_002347/report.html) — **351 / 123 / 218 / 10** — the **+2 bounce** (first up-day on the expanded matrix); [2026-08-28 02:52:10 UTC](https://englishm.github.io/moq-interop-runner/results/2026-08-28_025210/report.html) — **351 / 121 / 220 / 10** — the **first clean nightly on the expanded matrix** (pass −8 vs the expansion re-run, a new low on 351 as `stitcher-moq` and drift settled in); and [2026-08-27 14:16:15 UTC](https://englishm.github.io/moq-interop-runner/results/2026-08-27_141615/report.html) — **351 / 129 / 212 / 10** — the **matrix expansion (+30 cells, 321 → 351)** itself, the runner's fourth structural expansion and its first *growth* since the Aug-19 contraction: the **`stitcher-moq` relay** (Pluto TV / Paramount) was enrolled when runner [PR #112](https://github.com/englishm/moq-interop-runner/pull/112) merged **14:01 UTC** (alongside [PR #111](https://github.com/englishm/moq-interop-runner/pull/111) documenting the moxygen/moqx draft-18 client ALPN gap). **at-target rose 190 → 210 (+20)**, **ahead 1 → 3 (+2)**, **behind 130 → 138 (+8)**; pass ticked +1 to 129 but fail jumped +29 to 212 as the freshly-wired cells mostly failed on their first cut — the runner's recurring first-cut-of-an-expansion pattern (so the absolute pass number is not comparable across the expansion). This is the pre-Sep-2-hackathon broadening [[mike-english|Mike English]] flagged (more data-plane coverage, possible results-presentation redesign). Aug-27 also had a ~nightly [01:30:43](https://englishm.github.io/moq-interop-runner/results/2026-08-27_013043/report.html) run on the old 321-cell matrix — **321 / 122 / 189 / 10** (at-target 190 · ahead 1 · behind 130), a **−6 pass** post-contraction low — before the 14:16 expansion re-run once #112/#111 landed.

## Conformance sweep: live relays

Separate from the nightly runner, **[[alan-frindell|afrind]] has been driving [[moxygen]]'s draft-18 conformance script against the live relay endpoints registered in the runner**, and expanding its coverage (PUBLISH tests landed; FETCH and joining-FETCH expected in place by the **Sep-2 hackathon**). The **Aug-30** baseline run (posted to Slack `#moq`) found draft-18 interop in rough shape — of the eight relays probed, only **[[moxygen]] (Meta) and [[openmoq|moqx]] (OpenMOQ)** cleared **Section 1 (Basic Forwarding Preferences)** 4/4 over both QUIC and WebTransport; the rest failed before a subscribe could complete:

| Relay | Where it broke (afrind's Aug-30 probe) | Aug-31 status |
|---|---|---|
| [[moq-rs]] (draft-18) | SUBSCRIBE reaches the server and SubscribeOk is sent, the relay opens subgroup stream id=6 — then **resets it ~39 ms later, error=0**, so no objects flow | **Fixed to Section 1 tests 1–3** after [[mike-english]] landed conformance fixes; only **Test 4 (DATAGRAM)** still fails (0 objects on QUIC; subscribe rejected "internal error" on WebTransport) — English landing a datagram fix on `draft-18-dev` |
| [[moq-dev|moq-dev-rs]] | PUBLISH accepted, but the relay **never forwards the subscribe upstream** (0 received); client gets `onSubscribeOk`, then nothing | — |
| [[imquic]] | H3 `connectSuccess`, then **total silence — no MoQ SETUP** on either side | — |
| `moqt-nr` ([[yu-you|Nokia]]) | **Frame underflow → parse error**, conn error=3 parsing their SETUP (wire-format mismatch) | — |
| `stitcher-moq` (Pluto TV / Paramount) | `PublishNamespaceError code=400 reason=unauthorized` on `moq-test-00` | — |

afrind noted the failures **could equally be moxygen (the test client) bugs**.

> **Correction (Aug-31): the "OpenMOQ commit `86bbc5e` uint8-vs-varint" diagnosis was retracted.** A prior version of this page recorded [[luke-curley|Luke Curley]]'s Aug-30 claim that OpenMOQ's `decode_subscribe_message` mis-decoded raw-`uint8` SUBSCRIBE parameters (`FORWARD`/`SUBSCRIBER_PRIORITY`/`GROUP_ORDER`) as varints. On Aug-31 afrind pointed out the referenced code *"isn't OpenMOQ — this is facebookexperimental/moxygen. The paths you reference aren't moxygen code,"* and Luke withdrew it: *"ignore me i trusted AI."* The diagnosis was AI-hallucinated (it cited a commit/paths that don't correspond to real moxygen/OpenMOQ code) and is **void** — moxygen/moqx were the two relays that *passed* Section 1, not the ones failing. afrind added he is *"cracking down on ai generated issues in the repo"* (see [[discussions-2026-08]]).

**Aug-31 progress.** After the retraction, [[mike-english|Mike English]] landed real fixes to moq-rs — *"We definitely weren't handling all of the permutations correctly before"* — and a re-run showed **moq-rs now passes Section 1 tests 1, 2 and 3 on both QUIC and WebTransport**, with only **Test 4 (DATAGRAM)** still failing; English is landing a datagram fix on the `draft-18-dev` branch. This lifted the automated runner too (see [Current standing](#current-standing): 116 → 125 across Aug-31, with moq-rs [#224](https://github.com/cloudflare/moq-rs/pull/224) landing between the two cuts). Meanwhile English began **folding this conformance coverage into the interop runner itself** ([englishm/moq-interop-runner [PR #103](https://github.com/englishm/moq-interop-runner/pull/103)], new PUBLISH-focused test cases, plus a plan to cover afrind's subgroup-delivery permutations), reusing afrind's portable `moq-test` publisher class — discussed in the dedicated **`#moq-interop-runner`** Slack channel. This is the concrete draft-18-readiness picture the [[interim-meetings|Sep-2 virtual interop hackathon]] is meant to harden.

## The Aug-19 contraction — one implementation moved ahead and left the matrix

The headline number changed shape on **2026-08-19**, and the cause is specific rather than a generic "resize": **`moq-go` upgraded itself from draft-18 to draft-19**, and in doing so fell out of nearly every pairing in the runner.

- On the **Aug-18** cut, `moq-go` ran at **draft-18** against ~13 relay endpoints (aiomoqt-relay ×2, imquic ×3 transports, moq-dev-rs ×3, moq-rs-draft-18 ×3, moqt-nr ×2, moqx ×3, moxygen ×3, xquic-draft-18) plus itself — around **30 at-target runs**, most of them failing 0/6.
- On the **Aug-19 cut and since**, `moq-go` is labeled **draft-19** and appears in exactly **one** pairing: **`moq-go → moq-go`, draft-19, docker, 6/6 pass**. Every cross-implementation cell it had is gone, because the runner only pairs endpoints that version-match.
- That accounts for the whole move: **at-target 220 → 190 (−30)**, **ahead 0 → 1 (+1)** — the self-pair reclassified — for a net **−29 cells (350 → 321)**. `behind` stayed frozen at **130** (the draft-14 / draft-16 endpoints).

**Two readings follow, and both matter:**

1. **The raw pass drop is not a regression.** Pass fell 135 → 126, but pass *rate* rose: **38.6% (135/350) on Aug-18 → 39.3% (126/321) on Aug-22**. The cells that vanished were disproportionately `moq-go` failures. The genuine signal is the small **−3 drift across Aug-19 → Aug-21** on a constant 321-cell matrix (129 → 128 → 126), then **flat on Aug-22**.
2. **Running ahead of the target currently costs you all cross-implementation coverage.** `moq-go` is the first endpoint ever scored *ahead*, and its reward is a matrix row that only tests against itself. With the **[[interim-meetings|Sep-2 virtual interop hackathon]] explicitly targeting draft-18**, and draft-20 not becoming the target until the **Oct 12–15 Seattle interim**, an implementation that jumps to draft-19 early is invisible to the shared matrix in the meantime. Worth watching whether the runner grows cross-version pairing before draft-22 lands as the next official target.

Aug-22 report detail: **`aiomoqt` scores a clean 18/18** against `moqx`, `moxygen`, and `moq-rs-draft-18`; **`xquic` over the docker transport fails broadly** across relays, while the **remote-quic transport outperforms docker** for several draft-18 pairings. One skip source is a missing relay image (`moq-interop-runner-xquic-moq-relay-draft-18:latest` reported unavailable).

Day-over-day cell churn (per the gh-pages summaries):
- **Aug 19→20 (−1)**: moq-rs→moqtail d16 WT and moq-rs-draft-14→moq-dev-rs d14 WT went pass→fail; moqlivemock→imquic d16 WT went **fail→pass**.
- **Aug 20→21 (−2)**: moq-rs→moqtail d16 WT recovered; moq-rs-draft-14→moqx d14 (QUIC *and* WT) and →moxygen d14 WT went pass→fail.
- **Aug 21→22 (flat, 4 up / 4 down)**: aiomoqt→moq-dev-rs d18 WT, imquic→moxygen d18 docker, moq-rs-draft-14→moxygen d14 WT, and moxygen→imquic d18 remote-QUIC all went **fail→pass**; imquic→moq-rs-draft-18 docker, moq-rs→moq-rs d16 docker, moq-rs-draft-14→moxygen d14 QUIC, and moxygen→aiomoqt-relay d18 docker went pass→fail.

## Daily cuts

| Cut (UTC) | Cells | Pass | Fail | Skip | At-target | Ahead | Δ pass | Note |
|---|---|---|---|---|---|---|---|---|
| 2026-08-30 00:28:30 | 351 | 116 | 225 | 10 | 210 | 3 | −7 | new low on the expanded matrix; gives back the Aug-29 bounce |
| 2026-08-29 00:23:47 | 351 | 123 | 218 | 10 | 210 | 3 | +2 | first up-day on the expanded matrix; bounce off the Aug-28 low |
| 2026-08-28 02:52:10 | 351 | 121 | 220 | 10 | 210 | 3 | −8 | first clean nightly on the 351-cell matrix; new low on the expanded matrix |
| 2026-08-27 14:16:15 | 351 | 129 | 212 | 10 | 210 | 3 | +7 | **matrix +30 → 351: `stitcher-moq` relay enrolled (PR #112); at-target +20, first growth since the contraction (Δ vs the same-day 01:30 cut)** |
| 2026-08-27 01:30:43 | 321 | 122 | 189 | 10 | 190 | 1 | −6 | nightly cut on the old matrix; post-contraction low |
| 2026-08-26 00:13:53 | 321 | 128 | 183 | 10 | 190 | 1 | +3 | biggest gain since the contraction |
| 2026-08-25 00:12:46 | 321 | 125 | 186 | 10 | 190 | 1 | +1 | third straight +1/day |
| 2026-08-24 00:13:06 | 321 | 124 | 187 | 10 | 190 | 1 | +1 | |
| 2026-08-23 00:14:05 | 321 | 123 | 188 | 10 | 190 | 1 | −3 | post-contraction low |
| 2026-08-22 00:13:58 | 321 | 126 | 185 | 10 | 190 | 1 | 0 | flat |
| 2026-08-21 00:13:55 | 321 | 126 | 185 | 10 | 190 | 1 | −2 | |
| 2026-08-20 00:12:54 | 321 | 128 | 183 | 10 | 190 | 1 | −1 | |
| 2026-08-19 00:12:57 | 321 | 129 | 182 | 10 | 190 | 1 | −6 | **`moq-go` → draft-19; its ~30 pairings leave the matrix (−29 cells); first-ever "ahead" cell** |
| 2026-08-18 00:13:26 | 350 | 135 | 204 | 11 | 220 | 0 | +2 | 2nd-best on 350-cell matrix |
| 2026-08-17 00:12:07 | 350 | 133 | 206 | 11 | 220 | 0 | +2 | |
| 2026-08-16 00:12:41 | 350 | 131 | 208 | 11 | 220 | 0 | −3 | |
| 2026-08-15 00:12:56 | 350 | 134 | 205 | 11 | 220 | 0 | +5 | |
| 2026-08-14 00:24:37 | 350 | 129 | 210 | 11 | 220 | 0 | −6 | |
| 2026-08-13 00:23:34 | 350 | 135 | 204 | 11 | 220 | 0 | −1 | |
| 2026-08-12 00:22:23 | 350 | 136 | 203 | 11 | 220 | 0 | +9 | **350-cell-matrix pass high** |
| 2026-08-11 00:18:17 | 350 | 127 | 212 | 11 | 220 | 0 | −6 | |
| 2026-08-10 00:19:31 | 350 | 133 | 206 | 11 | 220 | 0 | +2 | morning of Aug-10 interim |
| 2026-08-09 00:18:24 | 350 | 131 | 208 | 11 | 220 | 0 | −1 | |
| 2026-08-08 00:18:10 | 350 | 132 | 207 | 11 | 220 | 0 | 0 | byte-identical to Aug-7 |
| 2026-08-07 01:14:34 | 350 | 132 | 207 | 11 | 220 | 0 | +3 | |
| 2026-08-06 00:29:02 | 350 | 129 | 210 | 11 | 220 | 0 | −1 | |
| 2026-08-05 00:32:35 | 350 | 130 | 209 | 11 | 220 | 0 | +1 | |
| 2026-08-04 00:34:04 | 350 | 129 | 210 | 11 | 220 | 0 | −2 | |
| 2026-08-03 00:36:00 | 350 | 131 | 208 | 11 | 220 | 0 | +1 | |
| 2026-08-02 00:35:00 | 350 | 130 | 209 | 11 | 220 | 0 | 0 | byte-identical to Aug-1 |
| 2026-08-01 00:34:17 | 350 | 130 | 209 | 11 | 220 | 0 | −3 | |
| 2026-07-31 00:35:11 | 350 | 133 | 206 | 11 | 220 | 0 | +1 | first 350-cell high |

## Longer history

The runner has gone through **three structural expansions and one contraction**, and each one moves the pass count more than any week of real implementation work does:

- **July 2** — matrix +28 to 294; at-target draft-18 78 → 152, which then held for five cuts through the draft-18-only era (July 2–6).
- **July 7** — matrix +25 to 319 and all 34 skips cleared to zero. Pass then climbed three straight cuts as new cross-version cells converted green: +14 (93→107) July-8, +17 (→124) July-9, +8 (→132) July-10. It then **oscillated 130↔132 for a week** on a byte-identical matrix, broke up to **136** July-16 and **137** July-17, slipped to 132 July-18, recovered to 134 July-19.
- **July 20** — matrix +19 to 338; fresh draft-18 endpoints all failed on their first cut (pass flat at 134), then **+8 to 142** July-21 as they converged, flat 142 July-22.
- **July 23** — matrix +12 to **350**, at-target to **220**; pass fell **−12 to 130** and skips reappeared (0 → 11). The 350-cell matrix then held for **27 consecutive cuts** (July 23 → Aug 18), pass wandering in a **126–136 band**.
- **Aug 19** — the first **contraction**: −29 to **321**, at-target 220 → **190**, and the first-ever `ahead` cell — caused not by a runner change but by **`moq-go` moving to draft-19** and losing every version-matched pairing.
- **Aug 27** — the fourth **expansion** and first *growth* since the contraction: +30 to **351**, at-target 190 → **210**, ahead 1 → **3**, behind 130 → **138**, when the **`stitcher-moq` relay (Pluto TV / Paramount)** was enrolled (runner [PR #112](https://github.com/englishm/moq-interop-runner/pull/112), 14:01 UTC). Pass ticked +1 to 129 while fail jumped +29 to 212 — the freshly-wired cells failing on their first cut, exactly as prior expansions did. (The same day's earlier 01:30 nightly cut, still on the 321-cell matrix, had slipped −6 to a post-contraction-low 122.)

The recurring pattern: **every structural change drops the raw pass count on its first cut** before the newly-wired cells converge — so cross-expansion comparisons of the absolute pass number are close to meaningless. Pass *rate* and the at-target/ahead/behind split are the durable readings.

The runner still targets **draft-18** and has not advanced to draft-19 — though `moq-go` is now running draft-19 ahead of it, and the [[interim-meetings|interim-2026-moq-21]] minutes name **draft-22** as the eventual next official target.


# Live interop (Vienna Hackathon)

The IETF-126 Hackathon (Vienna, week of July 20) began generating **live, human-run interop** on July 18 — supplementing the automated nightly runner:

- **[[mike-english|Mike English]]'s draft-18 single-instance testing relay** `draft-18-interop.cloudflare.mediaoverquic.com:443` (also the runner's `moq-rs-draft-18` endpoint) was put forward for live testing. [[yu-you|Yu You]] (Nokia) ran a basic v18 conformance client against it: **4 / 7 tests pass** (setup-only, announce-only, publish-namespace-done, subscribe-error) but **announce-subscribe, object-vectors, and subscribe-before-announce all fail** — the relay rejects `PUBLISH` with `errCode=0x0 reason="not supported"` (the Cloudflare draft-18 relay does not yet accept the upstream PUBLISH flow).
- **[[lorenzo-miniero|Lorenzo Miniero]]'s first draft-19 [[imquic]] relay** at `lminiero.it:9000` (see [[interop-endpoints]]) — a call for draft-19 peers, with filters only partially supported.
- **[[luke-curley|Luke Curley]]'s Hang stack** demoed against Jordi Cenzano (Meta): `cdn.moq.pro/anon` (draft 14-19), the `moq.pub` / `moq.watch` JS clients, the `moq-cli` Rust CLI, and RTMP/SRT/WHEP converters — all fronting the same broadcast.

**July 19 (Hackathon Day 1, Sunday)** was the window's richest live-interop day — **five relays under simultaneous cross-implementation test**, with results logged to the [ad-hoc interop wiki](https://github.com/moq-wg/moq-transport/wiki/ad-hoc-interop-reports#2026-07-ietf-126-vienna) ([[mike-english|Mike English]] gathering notes for Friday's interop report):

- **Relays exercised:** [[moxygen|Moxygen]] `fb.mvfst.net:9448/moq-relay` (afrind), [[imquic]] `lminiero.it:9000` (Miniero, draft-19), [[yu-you|Nokia]] `moqt://moqt.nokiaresearch.com:4443/moq` (Yu You, draft-18, with July-19 fixes for redundant request_ids + subscriber-forced forwarding), [[mike-english|Cloudflare]] `draft-18-interop.cloudflare.mediaoverquic.com:443`, and [[luke-curley|Luke Curley]]'s `cdn.moq.pro/anon`.
- **Jordi Cenzano's matrix** (Meta `moq-encoder-player`, MOQ-MIv3 packager migrating to LOC): **Moxygen, imquic (Miniero's), and Nokia all achieved full video+audio publish/subscribe**; **Cloudflare failed on PUBLISH** (*"seems NOT implemented"*), and **`cdn.moq.pro/anon` failed on subscribe** (*"publisher not found"* / *"Track does not exist"*).
- **[[kota-yatagai|Kota Yatagai]]'s Moqtopus** (draft-18 subscriber) verified SETUP/SUBSCRIBE/SUBSCRIBE_OK/REQUEST_ERROR against Moxygen, plus PUB_NS+SUBSCRIBE against Nokia (subgroup + datagram modes) and REQUEST_UPDATE OK/ERROR — logged in a +2007-line publisher/subscriber-flow commit *"at IETF126."*
- **[[aiomoqt]]** (Giovanni Marzot, v0.10.6) ran a Python **control-plane interop regression** with *"good results."*
- **Two spec-interpretation findings surfaced on the floor:** (1) a **rendezvous-timeout semantics** debate — whether a relay should always issue upstream subscriptions when a PUBLISH_NAMESPACE is advertised, or only after a `RENDEZVOUS_TIMEOUT` (afrind ↔ Yu You; Nokia deployed a mid-Hackathon fix so PUB_NS-then-SUBSCRIBE routes without a timeout); (2) **`cdn.moq.pro`'s IETF path is *"nowhere near as tested"* as Hang's own clients** — it sends unsolicited `PUBLISH_NAMESPACE` (a legacy holdover) and SUBSCRIBE against a foreign publisher was failing. Luke Curley also stated Hang **will likely never implement the draft-19 filters** because they *"complicate billing."*

**July 20 (Hackathon Day 2, Monday)** produced the window's biggest interop milestone and continued the debugging:

- **First cross-implementation draft-19 interop.** [[luke-curley|Luke Curley]]'s Rust `moq-cli` (moq-dev build `0.8.7-24f8528ed`) interoped successfully with [[lorenzo-miniero|Miniero]]'s [[imquic]] draft-19 relay `lminiero.it:9000`: auto-negotiation produced a 124,451-byte fMP4 (`ffprobe`-validated H.264 320×180), **forced draft-19 succeeded** (76,804 bytes, 5.23 s) and forced draft-18 also succeeded — two independent draft-19 codebases on the wire together for the first time. (Drafts 16/17 connected but produced no media; 14/15 failed at H3 CONNECT — Miniero has dropped 14/15 support.)
- **moq-cli ↔ Moxygen** (`fb.mvfst.net:9448`): **raw-QUIC draft-18 succeeded end-to-end** (2.48 MB MP4, H.264 320×180 @ 30 fps, AAC, clean FFmpeg decode), but **HTTPS/WebTransport failed** — both sides hit `WT_BUFFERED_STREAM_REJECTED (0x3994bd84)` and the subscriber received zero bytes; [[alan-frindell|afrind]] shipped a buffered-stream fix later July 20.
- **Nokia** (`moqt://moqt.nokiaresearch.com:4443/moq`) — Yu You fixed the `SUBSCRIBE_TRACKS` / `SUBSCRIBE_NAMESPACE` split and a lingering deprecated `STREAM_HEADER_TRACK (0x50)` stream opener, redeploying twice July 20 for Luke Curley to test.
- **Cloudflare** (`draft-18-interop.cloudflare.mediaoverquic.com:443`) — mixed: [[kota-yatagai|Kota Yatagai]]'s Moqtopus reached **full PASS** (PUB_NS + SUBSCRIBE in both subgroup and datagram modes, plus REQUEST_UPDATE OK/ERROR — logged to the ad-hoc wiki July 20), but Jordi Cenzano's `moq-encoder-player` still failed with objects not flowing because *"the relay closes the control QUIC streams for those subscriptions immediately after the publisher sends SUBSCRIBE_OK."*
- **`cdn.moq.pro/anon`** stayed broken over native QUIC — `/anon` returns a `401` and QUIC `PATH` is not wired through for the IETF path (only for moq-lite / qmux), so afrind could not authenticate; Luke suggested the authenticated `?jwt=` URL or qmux (TCP/TLS/WebSocket) as workarounds. A durable **auth-model design signal** emerged: Luke wants `SUBSCRIBE_NAMESPACE` mandatory with `PUBLISH_NAMESPACE` as an optional RTT optimization, while afrind noted the two carry **different authorization models** (SUBSCRIBE_NAMESPACE = the subscriber implicitly trusts the publisher for any track under the namespace; PUBLISH_NAMESPACE is separately authorized).
- **afrind asked for a canonical list of available draft-18 relays** and pointed testers at **moxygen's data-plane conformance suite** for relays (requires prefix-based routing).

Per the [ad-hoc interop wiki](https://github.com/moq-wg/moq-transport/wiki/ad-hoc-interop-reports#2026-07-ietf-126-vienna) (Kota's July-20 edit), the Moqtopus draft-18 matrix now shows **Nokia, Meetecho, Moxygen, and Cloudflare all PASS** PUB_NS/SUBSCRIBE (subgroup + datagram); only `moq.pro` fails (peer shutdown after SETUP). [[mike-english|Mike English]] is gathering these ad-hoc reports for **Friday's (July 24) interop report**.

**July 22 (between sessions) — afrind's data-plane conformance suite becomes the de-facto draft-18 relay benchmark.** [[alan-frindell|afrind]] ran his **41-test draft-18 data-plane conformance suite** (moxygen's suite, `moq-test`-based, requires prefix-based routing) against the live relays and reported that **[[yu-you|Nokia]]'s relay passed all 41 tests over *both* raw QUIC and WebTransport** — the first relay to clear the full suite — and challenged others to match it. [[zafer-gurel|Zafer Gürel]] said [[moqtail]] is "working on it, a few issues left" (and shipped a matching second relay batch the same day — FETCH range/joining-fetch semantics, reserved-namespace rejection, PUBLISH_BLOCKED on stream exhaustion). [[lorenzo-miniero|Miniero]]'s [[imquic]] needs a prefix-routing fix before it can be tested against the `moq-test`-based suite. afrind still could not get subscriptions running through `cdn.moq.pro` and was unsure of the current Cloudflare relay status. This 41-test suite (distinct from Yu You's earlier 7-test client check) is emerging as the concrete relay-readiness bar ahead of Friday's interop report.

**July 23 (IETF-126 Thu/Fri) — MOQtail joins the full-A/V set; MOQtail deploys a public draft-18 relay.** Jordi Cenzano's updated **v18-MOQMIv3 `moq-encoder-player` matrix** now shows **MOQtail carrying full video + audio** alongside [[moxygen|Moxygen]], [[imquic]] (Miniero's), and [[yu-you|Nokia]] — while **[[moq-rs|Cloudflare]] and `cdn.moq.pro` both fail on SUBSCRIBE**, each closing the QUIC stream. [[kota-yatagai|Kota Yatagai]] root-caused the Cloudflare failure: the relay **retains a namespace/track-name after the session ends**, so a same-name re-publish is treated as a request arriving *after* `PUBLISH_DONE`. [[zafer-gurel|Zafer Gürel]] brought a **public MOQtail draft-18 relay online at `relay18.moqtail.dev`** (public Grafana dashboard; see [[interop-endpoints]]); early testing found raw-QUIC ALPN=`moqt-18` negotiation failing for Moqtopus and afrind (relay also advertises `h3`) though imquic's client connects. Jordi is migrating his packager MOQMI→LOC and reported a player refactor that simplified audio/A-V sync via newer `AudioContext` capabilities. [[mike-english|Mike English]] gathered the ad-hoc reports (including Giovanni Marzot's aiomoqt run) for Friday's interop report — which is **not yet published** in any official source.

The full day-by-day score history lives in [[log|the wiki log]] (Interop bullet in each daily entry).

# Best Performing Pairs

- **moq-rs-draft-16 <-> moq-rs-draft-16**: All tests pass (self-test)
- **moq-dev-js <-> moqx**: 6/6 pass
- **moq-rs-draft-16 <-> moqx**: 5-6/6 pass
- **moq-rs-draft-16 <-> moxygen**: 5-6/6 pass
- **moq-rs-draft-16 <-> imquic**: 5-6/6 pass
- **moq-rs <-> moq-rs**: All tests pass (self-test, draft-14)
- **moq-rs <-> moqx**: All tests pass (draft-14)

# Getting Started

To add a new implementation to the runner, see the [getting started guide](https://github.com/englishm/moq-interop-runner/blob/main/docs/GETTING-STARTED.md).

# Related

- [[interop-status]] - Overall interop testing status
- [[interop-endpoints]] - Public relay endpoints
