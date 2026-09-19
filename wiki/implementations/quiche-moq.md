---
title: "Google QUICHE MoQT (quiche-moq)"
tags: [implementation, cpp, google]
date: 2026-04-15
last_updated: 2026-09-19
status: current
---

**Language**: C++
**Organization**: Google
**Primary developers**: [[martin-duke]], [[victor-vasiliev|Victor Vasiliev]], with contributions from asedeno, dschinazi
**GitHub**: [google/quiche](https://github.com/google/quiche/tree/main/quiche/quic/moqt) (MoQT module within Google's QUICHE library)

# Overview

A substantial C++ MoQT implementation inside Google's QUICHE library (part of Chromium). Includes ~74+ source files plus a tools directory with relay, server, client, chat, and simulator applications. This is one of the more actively developed implementations in the ecosystem, with commits continuing into mid-2026.

# Draft Support

- **draft-16** — current target for the public relay
- Passed 41/41 conformance tests from [[alan-frindell]] (Feb 2026)
- Protocol work lands on `main` ahead of the relay: newer draft-tracking refactors merge in the module while the public relay's registered interop target still lags at draft-16.
- **draft-18 migration underway on `main`** (July 2026) — the module is being reshaped toward the draft-18 wire: SUBSCRIBE moved onto a dedicated bidirectional stream, the SUBSCRIBE_NAMESPACE/SUBSCRIBE_TRACKS split, and a codebase-wide class rename (see Recent Highlights). This is Google converging on the [[interop-runner]]'s draft-18 target from a very different C++ base than [[moqtail]]/[[moxygen]].

# Public Infrastructure

- **`quichemoq.dev:443`** — [[martin-duke]]'s relay (draft-16)
- Registered in [[interop-runner]] as **quiche-moq**

# Recent Highlights

Day-by-day PR/issue history lives in [[log|the wiki log]]; this section keeps only durable milestones.

- **draft-18 update sprint + NEW_GROUP_REQUEST support** (Sep 16–18, 2026) — after a ~12-day quiet stretch (first commit since Sep-4), the module ran a burst of draft-18 work. It **moved FETCH off the control stream onto its own bidirectional stream** (commit [`bc4e3dd9`](https://github.com/google/quiche/commit/bc4e3dd9be), Sep-16 22:08 UTC — the same treatment SUBSCRIBE, TRACK_STATUS and PUBLISH_NAMESPACE already got, and removing `request_id` from FETCH_OK / REQUEST_ERROR to match the wire), then Sep-17 **updated SUBSCRIBE_OK and REQUEST_OK to draft-18** (`81f59114`) and — the new capability — **added NEW_GROUP_REQUEST support** in two parts (`7f1f920d` "part 1" + `cffebe23` wiring it into `MoqtRelayTrackPublisher`), plus a cache-non-empty guard when pulling from the outgoing queue (`8734d018`) and two OSS-build fixes (`95b12df5`, `ae779d8d`). Sep-18 continued it: a **third NEW_GROUP_REQUEST commit** allowing it **on subscription update, including PUBLISH_OK** (`f44c3550c`), and a **`TrackExtensions` → `TrackProperties` rename** to conform to draft-18 terminology (`213deeca6`). NEW_GROUP_REQUEST is the dynamic-groups mechanism the WG is actively refining (moq-transport [#1947](https://github.com/moq-wg/moq-transport/issues/1947)/[#1948](https://github.com/moq-wg/moq-transport/issues/1948)), and the rename tracks the extensions→track-properties reshape behind [#1950](https://github.com/moq-wg/moq-transport/issues/1950); quiche is now implementing both (all marked *"Not in production"*).
- **Control channel → a pair of unidirectional streams** (Aug 27, 2026) — [[victor-vasiliev|Victor Vasiliev]]'s commit `e88d141` *"Use a pair of unidirectional streams for control messages"* (23:38 UTC) reworks the control channel itself — a step beyond the July–Aug work that had peeled individual control messages (SUBSCRIBE, TRACK_STATUS, PUBLISH_NAMESPACE) onto dedicated *bidirectional* streams. The draft-18 wire-migration continues from quiche's distinct C++ base.
- **Wire-migration resumed** (Aug 11–12, 2026) — after being quiet in the module since Aug-4, four commits continue peeling control messages onto dedicated bidirectional streams: **TRACK_STATUS moved to a separate stream** (`c57a70d2`, Aug-11), a `MoqtResponseCallback` invocation-consistency fix (`8a147ac8`), **PUBLISH_NAMESPACE moved onto a bidi stream** (`4b2d81f4`, Aug-12), and an OSS-build fix (`d01a24d4`). Extends the July-17 SUBSCRIBE-to-bidi pattern; the PUBLISH_NAMESPACE move coincided (on the stream-carriage axis) with [[moq-dev]]'s Aug-12 unsolicited-announce work ([#2748](https://github.com/moq-dev/moq/pull/2748)) and [[moq-transport]] issue [#1854](https://github.com/moq-wg/moq-transport/issues/1854).
- **draft-18 migration burst** (July 17, 2026) — after being quiet in the module since July 8, three substantial commits move the impl toward draft-18: **SUBSCRIBE moved to a dedicated bidirectional stream** (`78341592`; new `MoqtSubscribeRequestStream`/`ResponseStream`, SUBSCRIBE/SUBSCRIBE_OK/UNSUBSCRIBE removed from the control stream, `MoqtUnsubscribe` message type dropped, session no longer owns subscriptions), a **codebase-wide class rename** (`2f4ea0dd`; `SubscriptionPublisher`→`LivePublisher`, `SubscribeRemoteTrack`→`LiveSubscriber`, `RemoteTrack`→`ObjectSubscriber`), and the **SUBSCRIBE_NAMESPACE / SUBSCRIBE_TRACKS split** (`d106f181`). Makes quiche a fifth codebase converging on the runner's draft-18 target.
- **PUBLISH moved to a bidirectional stream** (June 2026) — aligns Google's C++ impl with the draft direction of carrying PUBLISH on a bidi stream.
- **Control-stream architecture refactor** (June 2026) — control-message handlers were folded into the session and the control stream split in two; a dedicated WebTransport-only client class was split out of `MoqtClient`.
- **Session parameter control API** (April 2026) — `MoqtClient` and `MoqtServer` can control session parameters, groundwork for partial-object delivery on the relay.
- **Removed `moqt::SubscribeWindow`** (April 2026) — dropped legacy SUBSCRIBE window tracking as draft-17's PUBLISH/SUBSCRIBE model settled.
- **Joining FETCH work** (April 2026) — Joining FETCH limited to `largest_object` at time of SUBSCRIBE, with responsibility moved from `MoqtOutgoingQueue` to the session layer, preparing for REWIND's joining FETCH aspects.

# Interop

- Successfully tested with [[moxygen]], [[moq-rs]], and [[moqtail]] at Boulder hackathon (Feb 2026)
- Registered in the [[interop-runner]] matrix

# Disambiguation

There is also a separate **Rust** project called [birneee/quiche_moq](https://github.com/birneee/quiche_moq) by Leon Birne, built on Cloudflare's `quiche` crate (a Rust QUIC library). Created 2025-10-17. That project supports drafts 07-13 and 16 but is **not** in the interop runner. The naming collision is coincidental — both are named after QUIC libraries that happen to share the name "quiche."

# Related

- [[martin-duke]] - Primary developer, runs the public relay
- [[interop-endpoints]] - Public relay endpoints
- [[interop-runner]] - Automated test framework
