---
title: "MOQ Interop Runner"
tags: [interop, testing, tooling]
date: 2026-04-14
last_updated: 2026-07-20
status: current
---

Standardized cross-implementation test framework for MOQ protocol interoperability testing.

# Overview

The interop runner automates testing between MOQ implementations, publishing results as a matrix showing pass/fail status for each implementation pair.

**GitHub**: [englishm/moq-interop-runner](https://github.com/englishm/moq-interop-runner)
**Results**: [englishm.github.io/moq-interop-runner](https://englishm.github.io/moq-interop-runner/)

# Registered Implementations

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
12. **mlmtest** - [[moqlivemock|Eyevinn moqlivemock]] interop client ([[tobbe-einarsson|Torbjörn Einarsson]], PR #63 merged **May 13 17:25 UTC**) — supports both draft-14 and draft-16 via `DRAFT` env var
13. **moqx (client)** - OpenMOQ moqx client role ([[giovanni-marzot]], PR #66 merged **May 13 17:24 UTC**) — adds the client-side image to complement the existing moqx relay
14. **aiomoqt** - Python asyncio MoQT client ([[giovanni-marzot]], PR #67 merged **May 13 17:23 UTC**)
15. **Nokia v17 (via Docker RELAY_URL)** - yuyou (Nokia) Docker relay-URL configuration support (PR #65 merged **May 13 17:25 UTC**) — enables Nokia's in-house v17 implementation to slot into the matrix

# Current Target

The interop runner targets **draft-18** for automated testing. The WG (per [[mike-english]]'s Interop Report) agreed to hold draft-18 as the interop target while expanding case coverage from a handful of cases to ~70. Each matrix cell is categorized as at-target (both endpoints on draft-18), ahead, or behind.

[[alan-frindell|Alan Frindell]] **reaffirmed on Slack (July 18) that the official interop target for moq-transport is still draft-18** — "since there's been some confusion" — while welcoming intrepid implementers to try draft-19 because filter feedback is valuable. This came as the Vienna Hackathon began generating the first draft-19 activity (see Live interop below).

# Current standing

The runner's most recent published cut is the **[2026-07-19 00:33:22 UTC report](https://englishm.github.io/moq-interop-runner/results/2026-07-19_003322/report.html): 319 cells; 134 pass / 185 fail / 0 skip** (~42.0% pass), run against the same expanded implementation set — **pass +2 versus the July-18 cut** (132 → 134), with matrix/skip/at-target flat at 319/0/171. A modest recovery from the July-18 dip, still inside the week-plus 130↔137 flake band. The cut ran at 00:33 UTC, before the July-19 Vienna Hackathon day's activity (imquic's draft-19 merge, moqtail's control-plane sprint, moq-rs's SUBSCRIBE_NAMESPACE) — none of which the automated runner reflects yet; that work is being exercised **manually** on the Hackathon floor (see Live interop below). No July-20 cut at check time.

A July-7 structural expansion grew the matrix +25 cells to 319 and cleared all 34 skips to zero (every cell now runs); pass then climbed for three straight cuts as the newly-added cross-version cells converted green — +14 (93 → 107) July-8, +17 (107 → 124) July-9, +8 (124 → 132) July-10 — then **oscillated 130↔132** for a week on a byte-for-byte identical matrix: −2 (132 → 130) July-11, +2 (130 → 132) July-12, flat 132 July-13, −2 (132 → 130) July-14, flat 130 July-15 — before **breaking upward to 136** July-16 (+6), edging to **137** July-17 (+1), slipping back to **132** July-18 (−5), and recovering **+2 to 134** July-19. Read across the run (107 → 124 → 132 → 130 → 132 → 132 → 130 → 130 → 136 → 137 → 132 → 134) the July-8–10 hardening phase gave way to a settled band, the July-16/17 uptick did not hold, and with at-target frozen at 171 throughout the moves read as cell-conversion/flake within the existing set, not new coverage. This followed the July-2 expansion (matrix +28 to 294; at-target draft-18 78 → 152) and five straight cuts holding at-target 152 through the draft-18-only era (July 2–6). The runner still targets **draft-18** and has not advanced to draft-19.

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
