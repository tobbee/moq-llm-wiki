---
title: "MOQ Interop Runner"
tags: [interop, testing, tooling]
date: 2026-04-14
last_updated: 2026-08-06
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

The runner's most recent published cut is the **[2026-08-05 00:32:35 UTC report](https://englishm.github.io/moq-interop-runner/results/2026-08-05_003235/report.html): 350 cells; 130 pass / 209 fail / 11 skip** (~37.1% pass; **at-target draft-18 220** · 0 ahead · 130 behind) — a marginal **+1 pass / −1 fail** move versus the Aug-4 cut (matrix, skip, and at-target all flat). Fourteenth straight cut on the settled 350-cell / at-target-220 matrix; pass 130 stays inside the recent band (126–133, high 133 on July 31). Still targets **draft-18**. No Aug-6 cut at check time.

The prior cuts were the **[2026-08-04 00:34:04 UTC report](https://englishm.github.io/moq-interop-runner/results/2026-08-04_003404/report.html): 350 / 129 / 210 / 11** (at-target 220) — a **−2 pass / +2 fail** move versus the **[2026-08-03 00:36:00 UTC report](https://englishm.github.io/moq-interop-runner/results/2026-08-03_003600/report.html): 350 / 131 / 208 / 11** (at-target 220) — a **+1 pass / −1 fail** move versus the **[2026-08-02 00:35:00 UTC report](https://englishm.github.io/moq-interop-runner/results/2026-08-02_003500/report.html): 350 / 130 / 209 / 11** (at-target 220) — **byte-for-byte identical to the Aug-1 cut** (0 pass change; matrix/skip/at-target flat) — itself the same as the **[2026-08-01 00:34:17 UTC report](https://englishm.github.io/moq-interop-runner/results/2026-08-01_003417/report.html): 350 / 130 / 209 / 11** (at-target 220) — a **−3 pass / +3 fail** drift versus the **[2026-07-31 00:35:11 UTC report](https://englishm.github.io/moq-interop-runner/results/2026-07-31_003511/report.html): 350 / 133 / 206 / 11** (at-target 220) — a **+1 pass / −1 fail** move to a **350-cell-matrix pass high of 133** versus the **[2026-07-30 00:31:32 UTC report](https://englishm.github.io/moq-interop-runner/results/2026-07-30_003132/report.html): 350 / 132 / 207 / 11** (at-target 220) — a **+6 pass / −6 fail** recovery versus the **[2026-07-29 00:30:51 UTC report](https://englishm.github.io/moq-interop-runner/results/2026-07-29_003051/report.html): 350 / 126 / 213 / 11** (at-target 220) — a marginal **−2 pass / +2 fail** versus the **[2026-07-28 00:33:50 UTC report](https://englishm.github.io/moq-interop-runner/results/2026-07-28_003350/report.html): 350 / 128 / 211 / 11** (at-target 220) — a **−1 pass / +1 fail** drift from the **[2026-07-27 00:35:46 UTC report](https://englishm.github.io/moq-interop-runner/results/2026-07-27_003546/report.html): 350 / 129 / 210 / 11** (at-target 220) — **byte-for-byte identical** to the **[2026-07-26 00:37:06 UTC report](https://englishm.github.io/moq-interop-runner/results/2026-07-26_003706/report.html): 350 / 129 / 210 / 11** (at-target 220), itself a **+1 pass** recovery versus the **[2026-07-25 00:34:23 UTC report](https://englishm.github.io/moq-interop-runner/results/2026-07-25_003423/report.html): 350 / 128 / 211 / 11** (at-target 220) — itself a slight **−3 pass** regression versus the **[2026-07-24 00:31:11 UTC report](https://englishm.github.io/moq-interop-runner/results/2026-07-24_003111/report.html): 350 / 131 / 208 / 11** (at-target 220) — itself essentially flat (**+1 pass, −1 fail**) versus the **[2026-07-23 20:52:38 UTC report](https://englishm.github.io/moq-interop-runner/results/2026-07-23_205238/report.html): 350 / 130 / 209 / 11** (at-target 220), an **off-cadence second run** on July 23 distinct from that day's 00:33 UTC daily cut (330/136/184/10). Versus the July-22 baseline (338/142/196/0, at-target 190), the matrix grew **+12 to 350** and at-target jumped **+30 to 220** as fresh draft-18 endpoints registered during Hackathon week, but **pass fell −12 (142 → 130)**, fail rose +13, and **skips reappeared (0 → 11)** — the newly-wired cells failing or skipping on their first appearance, the same first-cut-regression pattern seen on the July-20 expansion.

A July-7 structural expansion grew the matrix +25 cells to 319 and cleared all 34 skips to zero (every cell now runs); pass then climbed for three straight cuts as the newly-added cross-version cells converted green — +14 (93 → 107) July-8, +17 (107 → 124) July-9, +8 (124 → 132) July-10 — then **oscillated 130↔132** for a week on a byte-for-byte identical matrix: −2 (132 → 130) July-11, +2 (130 → 132) July-12, flat 132 July-13, −2 (132 → 130) July-14, flat 130 July-15 — before **breaking upward to 136** July-16 (+6), edging to **137** July-17 (+1), slipping back to **132** July-18 (−5), recovering **+2 to 134** July-19, holding **flat at 134** July-20 as a **second structural expansion (+19 to 338)** wired in fresh draft-18 endpoints that all failed on their first cut, then **climbing +8 to 142** July-21 as eight of those newly-added cells began converging green, holding **flat at 142** July-22, then **regressing −12 to 130** on the July-23 20:52 cut as a third structural expansion (+12 to 350) wired in fresh draft-18 endpoints — pushing at-target to 220 while pass fell and skips reappeared (0 → 11) — then edging **+1 to 131** on the July-24 cut, slipping **−3 to 128** on the July-25 cut, recovering **+1 to 129** on the July-26 cut, holding **flat at 129** on the July-27 cut, slipping **−1 to 128** on the July-28 cut, slipping **−2 to 126** on the July-29 cut, recovering **+6 to 132** on the July-30 cut, edging **+1 to 133** on the July-31 cut — a new high for the 350-cell matrix — slipping **−3 to 130** on the Aug-1 cut, holding **flat at 130** on the Aug-2 cut (byte-for-byte identical to Aug-1; matrix/skip/at-target flat throughout), edging **+1 to 131** on the Aug-3 cut, slipping **−2 to 129** on the Aug-4 cut, and recovering **+1 to 130** on the Aug-5 cut. Read across the run (107 → 124 → 132 → 130 → 132 → 132 → 130 → 130 → 136 → 137 → 132 → 134 → 134 → 142 → 142 → 130 → 131 → 128 → 129 → 129 → 128 → 126 → 132 → 133 → 130 → 130 → 131 → 129 → 130) the July-8–10 hardening phase gave way to a settled band, the July-16/17 uptick did not hold, and each structural expansion (July-20, July-23) drops pass on the first cut before the new cells converge; at-target rose 171 → 190 (July-20) → 220 (July-23) as new endpoints registered and has held at 220 for all fourteen cuts on the 350-cell matrix. This followed the July-2 expansion (matrix +28 to 294; at-target draft-18 78 → 152) and five straight cuts holding at-target 152 through the draft-18-only era (July 2–6). The runner still targets **draft-18** and has not advanced to draft-19.

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
