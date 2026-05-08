---
title: "MOQ Interop Runner"
tags: [interop, testing, tooling]
date: 2026-04-14
last_updated: 2026-05-08
status: current
---

Standardized cross-implementation test framework for MOQ protocol interoperability testing.

# Overview

The interop runner automates testing between MOQ implementations, publishing results as a matrix showing pass/fail status for each implementation pair.

**GitHub**: [englishm/moq-interop-runner](https://github.com/englishm/moq-interop-runner)
**Results**: [englishm.github.io/moq-interop-runner](https://englishm.github.io/moq-interop-runner/)

# Registered Implementations (as of April 2026)

1. **moq-dev-js** - [[moq-dev|moq-dev/moq]] JavaScript/Hang player ([[luke-curley]])
2. **moq-dev-rs** - [[moq-dev|moq-dev/moq]] Rust ([[luke-curley]])
3. **moq-rs** - [[moq-rs|cloudflare/moq-rs]] (draft-14)
4. **moq-rs-draft-16** - Cloudflare moq-rs (draft-16 branch)
5. **moxygen** - [[moxygen|Meta's C++ relay]]
6. **xquic** - [[xquic-moq|Alibaba's XQUIC]]
7. **imquic** - [[lorenzo-miniero]]'s C library
8. **libquicr** - [[libquicr|Cisco's C++ library]]
9. **moqtail** - [[moqtail|Zafer Gurel's Rust/TS implementation]]
10. **quiche-moq** - Google's C++ MoQT ([[martin-duke]], [[victor-vasiliev|Victor Vasiliev]])
11. **moqx** - [[openmoq|OpenMOQ]]'s moxygen fork relay (PR #59 merged Apr 11)

# Pending PRs

- **[PR #63](https://github.com/englishm/moq-interop-runner/pull/63)** (Apr 12–17, Torbjörn Einarsson) — Add `mlmtest` from [[moqlivemock]] as an interop-runner client. Supports **both draft-14 and draft-16** via a `DRAFT` env var (auto-tries both if unset). Published image builds from the moqlivemock repo.
- **[PR #57](https://github.com/englishm/moq-interop-runner/pull/57)** (Lorenzo Miniero, open since Mar 19) — Add imquic relay and client docker images.

# Current Target

The interop runner currently targets **draft-16** for automated testing.

# Test Results History

| Period | Total Tests | Pass | Fail | Skip |
|--------|------------|------|------|------|
| **May 8, 2026** | **105** | **19** | **72** | **14** |
| May 7, 2026 | 105 | 20 | 71 | 14 |
| May 6, 2026 | 105 | 20 | 71 | 14 |
| May 5, 2026 | 105 | 20 | 71 | 14 |
| May 4, 2026 | 105 | 24 | 67 | 14 |
| May 3, 2026 | 105 | 24 | 67 | 14 |
| May 2, 2026 | 105 | 25 | 66 | 14 |
| May 1, 2026 | 105 | 24 | 67 | 14 |
| April 30, 2026 | 105 | 23 | 68 | 14 |
| April 29, 2026 | 105 | 23 | 68 | 14 |
| April 28, 2026 | 105 | 22 | 69 | 14 |
| April 27, 2026 | 105 | 23 | 68 | 14 |
| April 26, 2026 | 105 | 22 | 69 | 14 |
| April 25, 2026 | 105 | 24 | 67 | 14 |
| April 24, 2026 | 105 | 23 | 68 | 14 |
| April 23, 2026 | 105 | 22 | 69 | 14 |
| April 22, 2026 | 105 | 22 | 69 | 14 |
| April 21, 2026 | 105 | 20 | 71 | 14 |
| April 20, 2026 | 105 | 18 | 73 | 14 |
| April 19, 2026 | 105 | 18 | 73 | 14 |
| April 17, 2026 | 105 | 18 | 73 | 14 |
| April 16, 2026 | 105 | 23 | 68 | 14 |
| April 15, 2026 | 105 | 23 | 68 | 14 |
| April 14, 2026 | 105 | 21 | 70 | 14 |
| April 13, 2026 | 105 | 20 | 71 | 14 |
| April 12, 2026 | 105 | 21 | 70 | 14 |
| Early April 2026 | 93 | 19-22 | 59-62 | 12 |
| Mid-March 2026 | 93-97 | 24-25 | ~60 | 12 |
| Early March 2026 | 71 | 18-22 | varies | varies |
| February 2026 (draft-14) | 11-14 | 9-10 | 2-5 | varies |

The jump from 93 to 105 tests (Apr 12) coincides with moqx joining the matrix, adding new client-relay pairs. Transition from draft-14 to draft-16 target occurred in mid-February 2026, which temporarily reduced pass rates as implementations updated.

**April 17 regression**: 5 tests flipped from pass to fail between the Apr 16 and Apr 17 runs. The regression coincides with the large moqtail draft-16 merges on Apr 14–16 (unified message registry, REQUEST_ERROR consolidation, message parameter fixes) and moq-dev/moq changes landed on Apr 16–17 (broadcast replacement queue, auth module refactor, `--cert`/`--key` flag split). Need investigation to identify which pair(s) regressed.

**April 18–20**: Still at 18/73/14 — no recovery from the Apr 17 regression across three consecutive daily runs. Pair-level investigation remains pending.

**April 21**: First partial recovery — **20 / 71 / 14** (+2 pass, −2 fail) after four days flat at the regression floor. The lift coincides with ongoing draft-16 fixes in [[moqtail]] and [[moq-dev]] plus iteration on the SUBSCRIBE_NAMESPACE relay flow in [[moq-rs]] PR #157. Still 3 short of the Apr 16 baseline (23/68/14). Need pair-level diff to identify which tests flipped.

**April 22**: Second consecutive partial recovery — **22 / 69 / 14** (+2 pass, −2 fail vs Apr 21). Two daily improvements in a row; the likely drivers are moqtail PR #175 (subscription timeout 1s → 5s, merged Apr 21) and Suhas's follow-up forwarding/datagram fixes on [[moq-rs]] PR #157 (Apr 21 06:39–08:46 UTC, notably restoring the datagram forwarding rate from 1/sec back to 50/sec). Now just **1 short** of the Apr 16 baseline (23/68/14).

**April 23**: Flat at **22 / 69 / 14** (00:35 UTC run). First day without movement after the two-day Apr 21–22 recovery (18 → 20 → 22). The 1-test gap to the Apr 16 baseline remains. Apr 22–23 implementation work was dominated by spec/refactor PRs in [[moq-dev]] (none on `main` yet besides docs) and moq-wg review activity — no new fixes landed that would move the matrix.

**April 24**: **23 / 68 / 14** at 00:35 UTC — matrix finally ticks up one pass, matching the Apr 15–16 baseline. A single test flipped fail → pass since the Apr 23 run; pair-level diff not directly exposed in the summary report, but the timing is consistent with the moq-dev/moq hop-based-clustering merge (PR #1322, Apr 23 23:26 UTC) flowing through moq-dev-rs / moq-dev-js docker rebuilds. Still well below the 105-test theoretical ceiling — the draft-17 matrix remains far from complete.

**April 25**: **24 / 67 / 14** at 00:32 UTC — second consecutive day of improvement and a **new April 2026 high-water mark** (Apr 15–16 baseline was 23/68/14). One more test flipped fail → pass. This is the first time since draft-17 publication that the matrix has improved on two consecutive days. No moq-dev/moq merges to `main` happened between the Apr 24 and Apr 25 runs (PR #1322 was the most recent landing); the gain is more likely attributable to ongoing moqtail or moq-rs container rebuilds. Eve of the Apr 27 IETF interim — the matrix enters the meeting at its strongest April reading.

**April 26**: **22 / 69 / 14** at 00:34 UTC — **two-test regression** from the Apr 25 high-water mark, breaking the three-day improvement arc (22 → 23 → 24 → 22) and dropping back to the Apr 21–23 plateau. The two flipped tests are not exposed in the summary report. Implementation activity in the Apr 25 02:00 UTC → Apr 26 00:34 UTC window: moqtail merged PR #168 + PR #169 into the **`draft-16` integration branch** (not yet on `main`, so docker images shouldn't have changed); moq-dev/moq merged a Python examples PR (#1345) and a dependabot bump (#1347) — neither of which touches the wire path. Most likely a flaky test or an upstream image rebuild for one of the other matrix entries (moq-rs, moq-rs-draft-16, moqx, quiche-moq, libquicr, xquic, imquic). The matrix enters the **Apr 27 IETF interim at the Apr 21–23 plateau**, not at peak strength.

**April 27**: **23 / 68 / 14** at 00:34 UTC — **one-test recovery** from the Apr 26 dip, matching the Apr 24 reading and the Apr 15–16 baseline. Still **−1 below** the Apr 25 high (24/67/14). Improvement-arc-with-regression: 22 → 23 → 24 → 22 → 23. The flipped test is not exposed in the summary report. Implementation activity in the Apr 26 02:00 UTC → Apr 27 00:34 UTC window includes moq-dev/moq's two `main` merges: PR #1340 (`wait_for_broadcast` / deprecate `consume_broadcast` — directly affects relay/origin lookups) and PR #1343 (subdomain-based slug routing — affects connection URL handling but not the matrix's connection URLs). PR #1340 is the more plausible cause for a `moq-dev-rs` / `moq-dev-js` image rebuild that flipped one pair. The matrix walks into the Apr 27 interim **at parity with Apr 24**, neither at peak nor at the Apr 21–23 plateau.

**April 29**: **23 / 68 / 14** at 00:38 UTC — **+1 pass recovery** from Apr 28 (22/69/14), back to the Apr 24 / Apr 27 reading. Walking arc since draft-17 publication: 22 → 23 → 24 → 22 → 23 → 22 → 23. Still −1 below the Apr 25 high (24/67/14). The two interim-PR merges (moq-transport #1611, #1609) merged Apr 29 00:03–00:04 UTC are **spec-only** and don't trigger an implementation rebuild; the moq-dev/moq merges (#1352, #1353, #1355) merged after the Apr 29 00:38 UTC run, so they couldn't have driven the +1. Most likely a flaky test or an upstream image rebuild for one of the other matrix entries.

**April 30**: **23 / 68 / 14** at 00:38 UTC — **unchanged from Apr 29**. Walking arc: 22 → 23 → 24 → 22 → 23 → 22 → 23 → 23. The four moq-dev/moq merges (PRs #1357 fetch_group + #1350 mTLS HTTPS + #1349 static catalog + #1360 jemalloc) all landed Apr 29 16:08 UTC → Apr 30 00:01 UTC, **after** the Apr 30 00:38 UTC interop run. Apr 30 spec-only merge PR #1619 (NAMESPACE response name) doesn't drive interop. Expect possible matrix shift in the May 1 → May 2 window from `moq-dev-rs` / `moq-dev-js` image rebuilds.

**May 3**: **24 / 67 / 14** at 00:38 UTC — **first regression after the 4-day +1/day recovery streak** (−1 pass / +1 fail vs May 2's 25/66/14). Walking arc: 22 → 23 → 24 → 22 → 23 → 22 → 23 → 23 → 23 → 24 → 25 → **24**. Implementation activity in the May 2 00:37 UTC → May 3 00:38 UTC window: moqtail's PR #180 (separate stream for SUBSCRIBE_NAMESPACE) merged into the `draft-16` branch — but moqtail's docker images point at the `draft-16` branch already, so a rebuild could change the matrix; moq-dev/moq's PR #1366 (flake bump), PR #1368 (doc), and PR #1369 (moqsink EOS) all merged. Luke's notable PR #1372 (revert of fetch_group + TrackDynamic) merged May 2 21:18 UTC, **after** the May 3 00:38 UTC report — its effect would only show up in the May 4 run. Most plausible cause: the moqtail draft-16 branch image rebuild flipped one pair from pass to fail.

**May 4**: **24 / 67 / 14** at 00:38 UTC — **flat day** (identical to May 3 reading). Walking arc: 22 → 23 → 24 → 22 → 23 → 22 → 23 → 23 → 23 → 24 → 25 → 24 → **24**. The May 2 21:18 UTC PR #1372 revert (Luke removing the partial fetch_group / Subscription API merged Apr 30) presumably reached the moq-dev-rs / moq-dev-js builder before this run, so any restoration-effect from undoing the broken-API change is already baked in — net zero on the matrix. Other implementation activity in the May 3 02:00 UTC → May 4 00:38 UTC window: moqtail PR #145 (umbrella draft-16) picked up 3 commits May 3 (two race-condition fixes + a logging refactor) but stayed on the un-merged branch; no `main` merges in moq-dev/moq or moq-transport. The matrix has now stabilized at 24 pass for two consecutive days, with one excursion to 25 on May 2.

**May 5**: **20 / 71 / 14** at 00:37 UTC — **major regression: −4 pass / +4 fail vs May 4**. Largest single-day regression since the Apr 17 drop, returning to that floor level. Walking arc: 22 → 23 → 22 → 23 → 23 → 23 → 24 → 25 → 24 → 24 → **20**. Most plausible cause: [[moqtail]] PR #145 merged into `main` May 4 19:23 UTC — the wholesale draft-14→draft-16 migration (216 files, +17,114/−11,744) — image rebuilds for `moqtail-relay` and `moq-dev-rs` / `moq-dev-js` likely flipping multiple pairs to fail. moq-dev/moq PR #1374 (DATAGRAMS Lite05, opened May 4 22:57 UTC) is **not yet merged**, so does not affect this run. No moq-transport `main` merges in the May 4 02:00 UTC → May 5 00:37 UTC window. This is the first time in the May arc the matrix has returned to a 20-pass reading — pair-level diff inspection warranted.

**May 7**: **20 / 71 / 14** at 00:38 UTC — **flat day**, third consecutive day at the Apr 17–21 floor reading. Walking arc: 22 → 23 → 22 → 23 → 23 → 23 → 24 → 25 → 24 → 24 → 20 → 20 → **20**. PR #1341 (moq-mux backport) merged May 6 01:20 UTC was expected to potentially affect the May 7 report — **no movement observed**, suggesting the moq-mux structural refactor preserved wire interop as designed (catalog-side `Container::Cmaf { init: Bytes }` is the only schema change but is internal to moq-dev's hang catalog format, not a moq-transport wire change). Other May 6 → May 7 implementation activity in the relevant window: moq-dev/moq merged 3 small PRs (#1382 test-fixture cleanup, #1383 watch broadcast-flap fix, **#1385 revert of #1356 insert_track-takes-TrackConsumer**) — all post-May 6 00:36 UTC interop run, but #1385 is a same-day pull-back of yesterday's API change, so the net builder-side delta is zero. moqtail merged #186/#187/#188 (sharmafb upstream-FETCH series, relay code) + #179 (davemevans Firefox docs) — relay code change in #186/#187/#188 (+240 lines) **could** trigger a `moqtail-relay` rebuild that would appear in the May 8 report. **The post-PR #145 floor at 20 pass continues for a third consecutive day** — the matrix is not recovering from the May 5 −4 regression on its own.

**May 6**: **20 / 71 / 14** at 00:36 UTC — **flat day**, identical to May 5's 20/71/14. Walking arc: 22 → 23 → 22 → 23 → 23 → 23 → 24 → 25 → 24 → 24 → 20 → **20**. Two consecutive days at the Apr 17–21 floor reading; no recovery from the May 5 regression. Implementation activity in the May 5 02:00 UTC → May 6 00:36 UTC window: **moq-dev/moq merged 7 PRs** (#1341, #1356, #1377, #1378, #1379, #1380, #1381) — final merge `34dc7c9` at May 6 01:20 UTC was **after** the May 6 00:36 UTC interop run, so the moq-mux backport (largest of the day) does **not** affect this report. Earlier merges (PRs #1377–#1380, all merged 17:17–22:15 UTC May 5) **could** be reflected if `moq-dev-rs` / `moq-dev-js` builders rebuilt before the run; none are wire-format changes (API surface tightening, Origin renames, DNS fix, TOML config), so wire interop should be preserved. **moqtail merged PR #189 + #191 + #190** (May 5 13:40–14:04 UTC) — `moqtail-ts`-only changes; Rust relay code unchanged, so the moqtail-relay rows should be unaffected. moq-transport had no `main` merges. The post-PR #145 moqtail-relay state is the new normal until specific pair-level fixes land. PR #1341 (moq-mux backport) merged after this run; matrix shift could appear in the May 7 report.

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
