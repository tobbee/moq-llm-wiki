---
title: "Yu You"
tags: [person, nokia, implementer, author]
date: 2026-08-22
last_updated: 2026-09-05
status: current
---

**Organization**: Nokia
**Email**: yu.you@nokia.com
**Role**: Nokia relay implementer; corresponding author of [[moq-conditional-filtering]]

# Contributions

- **Corresponding author of `draft-yuyou-conditional-filtering-00`** (submitted 2026-08-17, announced 2026-08-18) — *"Conditional Range Filters for Media over QUIC Transport"*, **Nokia's first individual MoQ I-D**. Co-authored with Serhan Gül, [[ali-begen|Ali C. Begen]], and [[zaheduzzaman-sarker|ANM Zaheduzzaman Sarker]]. See [[moq-conditional-filtering]].
- **Nokia relay implementation (`moqt-nr`, `moqt.nokiaresearch.com:4443`)** — the source of most of Yu You's WG input. Ran a **basic v18 conformance client** against [[mike-english|Mike English]]'s draft-18 relay during the Vienna Hackathon: **4 / 7 tests pass**, with announce-subscribe, object-vectors, and subscribe-before-announce failing because the relay rejected `PUBLISH` (`errCode=0x0 reason="not supported"`).
- **Sep-3–4 draft-18 hackathon relay hardening + draft-19 registration** — after missing the Sep-2 virtual interop, Yu You patched the Nokia relay overnight and reported **6 interop clients passing** (stitcher-moq, moq-dev-rs, moq-rs-draft-18, moq-dev-js, moqtopus, moq5); [[steven-riedl|Steven Riedl]]'s client scored **12/12 on both transports**. He then **registered `moqt-nr` for draft-19** in the [[interop-runner]] (the first draft-19 relay registration; `add moqt-19` commit + [runner #124](https://github.com/englishm/moq-interop-runner/pull/124) switching the WT endpoint to a `moqt://` URL). On **Sep-4** he traced the priority-0 + duplicate-object failures to one root cause (a uni-stream object delivered both from the pending buffer and its live copy as `0/0`) and **redeployed**, also fixing a **FETCH End-Location off-by-one** ([[aman-sharma|Aman Sharma]]: the relay treated End Location as inclusive; the spec says *"the end Location, plus 1"*). [[alan-frindell|afrind]]'s re-run confirmed the **duplicate object gone** but **publisher priority still wrong (now `Actual=128 Expected=200`** — a partial fix from 0), and Aman found a **new FORWARD=0 bug** (a second subscriber with FORWARD=0 still receives the first group). Earlier Sep-3 probe items still tracked: an undefined **Type-0 parameter** in `REQUEST_OK`, a **FIN-instead-of-reset** on a mid-subgroup upstream reset, and **never sending `NAMESPACE_DONE`**. See [[interop-runner]] and [[discussions-2026-09]].
- **Aug-17 implementer feedback** on [[mo-zanaty|Mo Zanaty]]'s Top Tracks Filter [PR #1830](https://github.com/moq-wg/moq-transport/pull/1830), raised *"while implementing the Track Filter in our Relay"* — the request that directly seeded the conditional-filtering draft.
- **Aug-3 DATAGRAM object-fragmentation** design thread on Slack.
- **June 2026 SSTS demo** — the pre-recorded three-track (500/1500/3000 kbps) switching demo [[will-law|Will Law]] presented at `interim-17`, showing smooth relay-side forwarding-state switching and stable 1080p with switching disabled.
- **Top-N × SSTS two-step model** (July 28 list reply): the Top-N filter answers *"what"* (evaluate a namespace's tracks by property, promote the N highest), SSTS answers *"how"* (forward exactly one; hold upstream to all N but set downstream forwarding to 0 for the unselected) — *"Top-1 delivery"* without overdelivery.

# Related

- [[moq-conditional-filtering]], [[moq-transport]], [[switch-abr]], [[zaheduzzaman-sarker]]
- [[interop-endpoints]] — Nokia Research relay `moqt.nokiaresearch.com:4443`
