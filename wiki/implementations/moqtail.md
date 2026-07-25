---
title: "MOQtail"
tags: [implementation, relay, publisher, subscriber]
date: 2026-04-10
last_updated: 2026-07-25
status: current
---

**GitHub**: [moqtail/moqtail](https://github.com/moqtail/moqtail)
**Maintainers**: [[zafer-gurel|Zafer Gürel]], Ali C. Begen
**Draft support**: **draft-16 on `main`, with a draft-18 alignment sprint underway** (July 2026) — ALPN bumped to `moqt-18`, Extension Headers renamed to Properties, single unified SETUP (CLIENT_SETUP/SERVER_SETUP collapsed), split delivery timeouts, control-message-type table + LOC property ids renumbered to draft-18, and draft-18 constants + varint conformance vectors added; the moqtail-ts API break is tracked in a ~20-issue backlog (draft-14 docs removed May 4 2026)

# Overview

MOQ Transport protocol libraries for publisher, subscriber, and relay components. Features real-time, live, and on-demand demo applications using both [[moq-loc|LOC]] and [[moq-cmsf|CMSF]] formats. Libraries are published as `moqtail-rs` (Rust) and `moqtail-ts` (TypeScript).

# Components

- **Relay** — public relays at `relay.moqtail.dev` (draft-14) and **`relay18.moqtail.dev` (draft-18, online July 23 2026** for IETF-126 conformance testing, with a public [Grafana dashboard](https://grafana.moqtail.dev/); see [[interop-endpoints]])
- **Publisher** — media publishing library
- **Subscriber** — media subscription library
- **Demo apps** — real-time, live, and on-demand examples, plus `apps/client-js` (browser subscriber) and `apps/meet` (WebRTC-over-MoQ video-conferencing demo)
- **Transports** — WebTransport and raw QUIC (raw-QUIC support added June 2026, [PR #204](https://github.com/moqtail/moqtail/pull/204) / [#205](https://github.com/moqtail/moqtail/pull/205))

# Draft support

**draft-16** on `main` — full [draft-ietf-moq-transport-16](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-16) compliance landed May 4 2026 via the umbrella [PR #145](https://github.com/moqtail/moqtail/pull/145) (open since March 6, +17k/−11k). draft-14 documentation was removed the same day, making moqtail a single-draft project. The draft-16 work brought:

- ALPN-based ClientSetup/ServerSetup negotiation
- typed **MessageParameter** control parameters (replacing VersionParameter), plus **Track** and **Object Extensions**
- a unified request-ID registry correlating REQUEST_OK / REQUEST_ERROR / REQUEST_UPDATE with their source requests
- the finalized FETCH-object wire format (bitmask serialization flags, delta encoding, end-of-range markers)

**draft-17 features shipped ahead of full adoption**:

- the **§7.2 relay scheduling algorithm** ([PR #178](https://github.com/moqtail/moqtail/pull/178), Apr 30) — relay priorities computed from subscriber and publisher priorities; first moqtail merge of a draft-17-specific feature
- the **SUBSCRIBE_NAMESPACE / SUBSCRIBE_TRACKS stream split** ([PR #180](https://github.com/moqtail/moqtail/pull/180), May 1) — merged ~10h before upstream [[moq-transport]] PR #1542, the first implementation to ship the split design

# Recent Highlights

Day-by-day PR/issue history lives in [[log|the wiki log]]; this section keeps only durable milestones.

- **draft-18 alignment sprint (July 2026)**: after months at draft-16, moqtail began converging on the interop-runner's **draft-18** target. Day 1 (July 15): ALPN bumped to `moqt-18` ([PR #280](https://github.com/moqtail/moqtail/pull/280)) and **Extension Headers renamed to Properties** ([PR #281](https://github.com/moqtail/moqtail/pull/281), the -18/-19 terminology). Day 2 (July 16) landed the bulk of the wire changes: **CLIENT_SETUP/SERVER_SETUP collapsed into a single SETUP** ([PR #286](https://github.com/moqtail/moqtail/pull/286)), **delivery timeouts split** into object/subgroup + rendezvous/fill with param numbers aligned ([PR #287](https://github.com/moqtail/moqtail/pull/287)), the **control-message-type table** moved to draft-18 ([PR #284](https://github.com/moqtail/moqtail/pull/284)), **LOC property ids renumbered** ([PR #285](https://github.com/moqtail/moqtail/pull/285), pairing with [[moq-loc|loc]] #25), plus **draft-18 constants + varint conformance vectors** shared for cross-impl testing ([PR #283](https://github.com/moqtail/moqtail/pull/283)). Day 3 (July 17) closed the wire work: **the FIRST_OBJECT SUBGROUP_HEADER bit** ([PR #290](https://github.com/moqtail/moqtail/pull/290), MERGED) and **the moqtail-ts control-message-type table** ([PR #291](https://github.com/moqtail/moqtail/pull/291), Kerem Bekmez, MERGED). Then a **large control-plane-restructure wave landed over the July-19/20 Hackathon weekend — ~11 PRs (#292–#302)** working down the RS-/CL-/RL- task list (issues #230–#242): **request types moved onto their own bidirectional streams** ([#297](https://github.com/moqtail/moqtail/pull/297)), the **control plane onto a pair of uni streams** ([#294](https://github.com/moqtail/moqtail/pull/294)), **PUBLISH_OK folded into REQUEST_OK + Track Properties added** ([#299](https://github.com/moqtail/moqtail/pull/299)), **MAX_REQUEST_ID / REQUESTS_BLOCKED removed** ([#298](https://github.com/moqtail/moqtail/pull/298)), **Request ID removed from response messages** ([#302](https://github.com/moqtail/moqtail/pull/302)), **REQUEST_UPDATE rejection/failure handling** ([#301](https://github.com/moqtail/moqtail/pull/301)), **stream reset codes + reset path** ([#300](https://github.com/moqtail/moqtail/pull/300)), **GREASE + reserved Property ranges** ([#296](https://github.com/moqtail/moqtail/pull/296)), **`moqt://` as the unified selectable-transport scheme** ([#295](https://github.com/moqtail/moqtail/pull/295)), **Mandatory Track Properties enforced (0x4000–0x7FFF)** ([#293](https://github.com/moqtail/moqtail/pull/293)), and **delta-encoded Group/Object IDs in FETCH responses** ([#292](https://github.com/moqtail/moqtail/pull/292)). The sprint **continued through July 20** (#303–#308): the **SUBSCRIBE_NAMESPACE / SUBSCRIBE_TRACKS split** ([#305](https://github.com/moqtail/moqtail/pull/305)), **removal of the cancel/teardown message family** ([#303](https://github.com/moqtail/moqtail/pull/303), −857 LOC), **zero-element track namespaces** ([#306](https://github.com/moqtail/moqtail/pull/306)), and the **PUBLISH_BLOCKED message** ([#308](https://github.com/moqtail/moqtail/pull/308), merged July 21 — see the relay-resilience batch below). The `moqtail-ts` API break — `moqt://` URL scheme, the SUBSCRIBE_NAMESPACE / SUBSCRIBE_TRACKS split, PUBLISH_BLOCKED, GREASE — is tracked in a ~20-issue backlog, with **Kerem Bekmez** now a second active contributor. Makes moqtail a second non-moq-dev implementation actively converging on the runner's target.
- **Relay-resilience / DoS-protection batch (July 21)**: with the wire format aligned, [[zafer-gurel|Zafer Gürel]] built out the relay's operational surface from the RL-* task list — the **PUBLISH_BLOCKED message** ([#308](https://github.com/moqtail/moqtail/pull/308), +151/−11), **GOAWAY Request ID + Timeout and the REDIRECT structure** ([#310](https://github.com/moqtail/moqtail/pull/310), +300/−66), **EXCESSIVE_LOAD shedding on request streams** ([#311](https://github.com/moqtail/moqtail/pull/311)), **graceful SIGTERM drain** (send GOAWAY + reject new requests, [#312](https://github.com/moqtail/moqtail/pull/312), RL-5), **TOO_FAR_BEHIND reset of slow subscribers** ([#313](https://github.com/moqtail/moqtail/pull/313)), and **SUBSCRIBE precedence over SUBSCRIBE_TRACKS** ([#314](https://github.com/moqtail/moqtail/pull/314)) — i.e. the graceful-shutdown, load-management, and DoS-protection surface a relay needs beyond interop conformance. A **second batch landed July 22** (eight more PRs, all Zafer Gürel): **standalone FETCH range validation + End Location clamp** ([#317](https://github.com/moqtail/moqtail/pull/317)), **joining-fetch forward-state semantics (RL-7a)** ([#318](https://github.com/moqtail/moqtail/pull/318)), **FETCH Stream Count + prior-gap semantics (RL-7b)** ([#319](https://github.com/moqtail/moqtail/pull/319)), **rejecting reserved namespaces `.session`/`.` locally (RS-17a)** ([#324](https://github.com/moqtail/moqtail/pull/324)), **PUBLISH_BLOCKED on stream exhaustion (RL-2)** ([#326](https://github.com/moqtail/moqtail/pull/326)), forwarding SUBSCRIBE_TRACKS PUBLISH on its own bidi stream ([#327](https://github.com/moqtail/moqtail/pull/327)), a subgroup-reopen test (RS-17b, [#325](https://github.com/moqtail/moqtail/pull/325)), and moqtail-rs EndGroup-delta / datagram status+properties / padding ([#320](https://github.com/moqtail/moqtail/pull/320)). GOAWAY per-request migration / REDIRECT retry (#309) remains open. A **third, lifecycle-correctness batch landed July 23** (Zafer Gürel): ***remove track when the last subscriber leaves*** ([#330](https://github.com/moqtail/moqtail/pull/330), +26/−8) — freeing per-track relay state on the final unsubscribe — plus per-bidi control-message logging ([#329](https://github.com/moqtail/moqtail/pull/329)) and a comment cleanup ([#328](https://github.com/moqtail/moqtail/pull/328)); a **July-24 follow-up fixed a resubscribe regression** the #330 change introduced ([#331](https://github.com/moqtail/moqtail/pull/331), *fix relay resubscribe after last subscriber*). Motivating this: at IETF-126 (July 22) [[alan-frindell|afrind]] began running his **41-test draft-18 data-plane conformance suite** against relays; [[zafer-gurel|Zafer Gürel]] said moqtail is "working on it, a few issues left," then **brought a public draft-18 relay online at `relay18.moqtail.dev`** July 23 (public Grafana dashboard) and put it forward for testing — in Jordi Cenzano's `moq-encoder-player` matrix it now carries **full video+audio**. No new release — relay@0.14.1 stands.
- **Wire-correctness fixes (interop-relevant)**: Key-Value-Pair parameters, previously serialized as absolute values, are now delta-encoded as the draft mandates ([PR #208](https://github.com/moqtail/moqtail/pull/208)); subgroup-header type detection moved to bitmask dispatch ([PR #211](https://github.com/moqtail/moqtail/pull/211)). Both target cross-version mismatches that surface as interop failures.
- **Relay conformance hardening**: FETCH_OK is now sent for all non-empty fetch ranges ([PR #199](https://github.com/moqtail/moqtail/pull/199)), and late subscribers joining a track mid-subgroup receive the in-progress subgroup from its start instead of silently dropping objects ([PR #201](https://github.com/moqtail/moqtail/pull/201)).
- **Upstream FETCH on cache miss**: the relay now sends FETCHes upstream to the publisher for groups missing from its local cache — a contributor-led capability landed via sharmafb's [1/n]–[3/n] series ([PR #186](https://github.com/moqtail/moqtail/pull/186) / [#187](https://github.com/moqtail/moqtail/pull/187) / [#188](https://github.com/moqtail/moqtail/pull/188)) and completed in [PR #193](https://github.com/moqtail/moqtail/pull/193).
- **Per-subscription early-discard**: `setEarlyDiscardPolicy` (cancel slow subgroup streams after a timeout) can be set per subscription rather than globally ([PR #189](https://github.com/moqtail/moqtail/pull/189)).
- **Widening contributor base**: beyond maintainers Zafer Gürel and Ali C. Begen, external contributors now land code — sharmafb / Aman Sharma (also a [[moq-transport]] editor, contributing FETCH-priority test tooling), davemevans / David Evans (Firefox private-CA test docs), Kerem Bekmez, and thexeos.

# Known Issues

- Reported sending AUTHORITY param back in server setup (Feb 2026, noted by sandarsh)
- Empty extensionHeaders bug reported by Daiki Matsui ([moqtail#147](https://github.com/moqtail/moqtail/issues/147))

# Interop

- Registered in [[interop-runner]] matrix
- Successfully tested with [[moq-rs]] and [[moxygen]] (Feb 2026 Boulder hackathon)
- Published namespace, subscribed to tracks, and received objects with both relays
- FETCH working with [[moxygen]]

# Related

- [[interop-runner]] - Automated test framework
- [[interop-endpoints]] - Public relay endpoints
- [[interop-status]] - Cross-implementation testing
