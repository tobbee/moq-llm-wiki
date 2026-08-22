---
title: "Yu You"
tags: [person, nokia, implementer, author]
date: 2026-08-22
last_updated: 2026-08-22
status: current
---

**Organization**: Nokia
**Email**: yu.you@nokia.com
**Role**: Nokia relay implementer; corresponding author of [[moq-conditional-filtering]]

# Contributions

- **Corresponding author of `draft-yuyou-conditional-filtering-00`** (submitted 2026-08-17, announced 2026-08-18) — *"Conditional Range Filters for Media over QUIC Transport"*, **Nokia's first individual MoQ I-D**. Co-authored with Serhan Gül, [[ali-begen|Ali C. Begen]], and [[zaheduzzaman-sarker|ANM Zaheduzzaman Sarker]]. See [[moq-conditional-filtering]].
- **Nokia relay implementation** — the source of most of Yu You's WG input. Ran a **basic v18 conformance client** against [[mike-english|Mike English]]'s draft-18 relay during the Vienna Hackathon: **4 / 7 tests pass**, with announce-subscribe, object-vectors, and subscribe-before-announce failing because the relay rejected `PUBLISH` (`errCode=0x0 reason="not supported"`).
- **Aug-17 implementer feedback** on [[mo-zanaty|Mo Zanaty]]'s Top Tracks Filter [PR #1830](https://github.com/moq-wg/moq-transport/pull/1830), raised *"while implementing the Track Filter in our Relay"* — the request that directly seeded the conditional-filtering draft.
- **Aug-3 DATAGRAM object-fragmentation** design thread on Slack.
- **June 2026 SSTS demo** — the pre-recorded three-track (500/1500/3000 kbps) switching demo [[will-law|Will Law]] presented at `interim-17`, showing smooth relay-side forwarding-state switching and stable 1080p with switching disabled.
- **Top-N × SSTS two-step model** (July 28 list reply): the Top-N filter answers *"what"* (evaluate a namespace's tracks by property, promote the N highest), SSTS answers *"how"* (forward exactly one; hold upstream to all N but set downstream forwarding to 0 for the unselected) — *"Top-1 delivery"* without overdelivery.

# Related

- [[moq-conditional-filtering]], [[moq-transport]], [[switch-abr]], [[zaheduzzaman-sarker]]
- [[interop-endpoints]] — Nokia Research relay `moqt.nokiaresearch.com:4443`
