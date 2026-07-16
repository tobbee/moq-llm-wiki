---
title: "MOQtail"
tags: [implementation, relay, publisher, subscriber]
date: 2026-04-10
last_updated: 2026-07-16
status: current
---

**GitHub**: [moqtail/moqtail](https://github.com/moqtail/moqtail)
**Maintainers**: [[zafer-gurel|Zafer Gürel]], Ali C. Begen
**Draft support**: **draft-16 on `main`, with a draft-18 alignment sprint underway** (July 2026) — ALPN bumped to `moqt-18`, Extension Headers renamed to Properties, draft-18 constants + varint conformance vectors added; the moqtail-ts API break is tracked in a ~20-issue backlog (draft-14 docs removed May 4 2026)

# Overview

MOQ Transport protocol libraries for publisher, subscriber, and relay components. Features real-time, live, and on-demand demo applications using both [[moq-loc|LOC]] and [[moq-cmsf|CMSF]] formats. Libraries are published as `moqtail-rs` (Rust) and `moqtail-ts` (TypeScript).

# Components

- **Relay** — public relay at `relay.moqtail.dev`
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

- **draft-18 alignment sprint (July 2026)**: after months at draft-16, moqtail began converging on the interop-runner's **draft-18** target — ALPN bumped to `moqt-18` ([PR #280](https://github.com/moqtail/moqtail/pull/280)), **Extension Headers renamed to Properties** ([PR #281](https://github.com/moqtail/moqtail/pull/281), the -18/-19 terminology), and **draft-18 constants + varint conformance vectors** shared for cross-impl testing ([PR #283](https://github.com/moqtail/moqtail/pull/283)). The `moqtail-ts` API break — `moqt://` URL scheme, the SUBSCRIBE_NAMESPACE / SUBSCRIBE_TRACKS split, PUBLISH_BLOCKED, GREASE, and a LOC property-id renumber ([#282](https://github.com/moqtail/moqtail/issues/282)) — is tracked in a ~20-issue backlog. Makes moqtail a second non-moq-dev implementation actively converging on the runner's target.
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
