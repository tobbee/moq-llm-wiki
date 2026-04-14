---
title: "Discussions - April 2026"
tags: [discussions, slack, github]
date: 2026-04-14
last_updated: 2026-04-14
status: current
---

Summary of active discussions in the MOQ ecosystem during April 2026.

# Slack #moq Highlights

## London Interim Visa Invitation (Apr 14)
Aman Sharma asked in #moq about obtaining a letter of invitation for the London interim (for visa/travel purposes). [[alan-frindell]] tagged [[mike-english|Mike English]] on this.

## Joining Fetch Restriction Removed (Apr 9)
[[martin-duke]] asked if there's still a requirement that Joining FETCH only be with largest object subscribes. [[alan-frindell]] confirmed: "We did remove it. You can joining fetch any subscription at any time - it fetches to Joining Location." See [[joining-fetch]].

## Rewind vs Join Filters Status (Apr 8)
[[will-law]] asked [[alan-frindell]] and [[martin-duke]] about the status between Martin's [Subscribe Rewind](https://martinduke.github.io/draft-duke-moq-subscribe-rewind/draft-duke-moq-subscribe-rewind.html) and Alan's [Join Subscription Filters](https://afrind.github.io/draft-frindell-moq-join-filters/draft-frindell-moq-join-filters.html). Both provide mechanisms for retrieving a group behind live at join time. Alan indicated his idea was "more of an extension to Martin's."

## v17 Interop Achievement (Apr 1)
[[lorenzo-miniero]] reported first proper v17 interop working with [[luke-curley]]'s stack. Luke confirmed: "Rust publisher, JS subscriber, so that counts as two interops." See [[interop-status]].

## Track Properties Parsing Clarification (Apr 1)
[[alan-frindell]] detailed confusion about Properties in datagram/subgroup objects: the draft-14->16 diff removed the explicit length field from the diagram but the text still references it. Two open questions:
1. How are implementations doing this in draft-16?
2. What should the final state be?
See [[track-properties]].

# GitHub Activity

## moq-wg/msf
- **PR #118** (Merged Apr 13) - Add details of authorization flows ([[suhas-nandakumar]])
- **Issue #119** (Closed Apr 13) - Add authz details

## moq-transport
**Merged PRs**:
- PR #1599 - Move normative text on Track Alias
- PR #1597 - Consistently use MOQT for protocol references  
- PR #1595 - Allow 7-byte varint and non-minimal encodings
- PR #1590 - Subscription filters are a Param
- PR #1583 - Allow publisher to reopen subgroup after REQUEST_UPDATE fwd 0->1
- PR #1540 - Allow coalescing REQUEST_UPDATE processing

**New Issues**:
- #1603 - What is the use case for required-request-id
- #1602 - Joining Fetch should be on the SUBSCRIBE/PUBLISH stream
- #1601 (Closed) - Joining FETCH session errors race condition
- #1600 (Closed) - Can the same Track be published multiple times into different namespaces?

**Open PRs under review**:
- PR #1604 - Joining FETCH with subscription (implements #1602)
- PR #1596 - Exclude your own tracks from SUBSCRIBE_NAMESPACE
- PR #1593 - Allow framing single Objects without Subgroup ID
- PR #1591 - Add flow control for Subscriptions
- PR #1588 - Add internationalization statement for moqt URI scheme
- PR #1586 - Delta encoding of Group/Object ID in Fetch responses

## moq-wg/msf (earlier)
- PR #152 (Merged) - Clarify MSF URL construction and fragment parameters
- PR #141 (Merged) - Add support for InitTracks
- PR #121 (Merged) - Pub tracks, logs and metrics
- Issue #153 - `initTrack` does not work (vasilvv reports synchronization problem; favors removing initTrack entirely)

## PUBLISH_DONE and Subgroup FIN Handling (Mar 31)
[[alan-frindell]] asked relay implementers: "How do you handle the case where you receive a PUBLISH_DONE but some subgroups have not received a FIN? What will the downstream subscriber(s) see?" Options discussed: timer-based cleanup (preferred by [[suhas-nandakumar]]), RESET_STREAM_AT, or resetting streams.

# Mailing List Highlights

## MOQT for GraphQL Subscriptions (Apr 13)
[[alan-frindell]] posted to the mailing list arguing that implementing GraphQL subscriptions over MOQT SUBSCRIBE reveals several draft-17 limitations:
1. **Track name encoding**: Unknown message parameters are a protocol violation in draft-17, forcing the query body into the track namespace/name. The 4KB track name limit is restrictive for complex queries.
2. **Parameter negotiation**: A cleaner design using a custom parameter for the query body "requires extension and feels fragile" since custom parameters must be negotiated at every hop.
3. **Control message size**: The 64KB control message size limit may be too small for complex queries.
4. **HTTP integration gap**: HTTP intermediaries can forward GraphQL subscriptions using headers (e.g., recording client IP for authentication), but MOQT has no equivalent mechanism.

Alan concluded that "making message params inflexible in draft-17 may have been a mistake, and we should reconsider." This raises broader questions about MOQT's suitability for non-media use cases.

## Consensus Call on draft-17 (Mar 24 → Apr 10)
[[martin-duke]] issued a consensus call on the mailing list (2026-03-24) for changes in draft-17. Discussion continued through April 10 with responses from Martin Duke.

## 7-Byte Varint Encoding Debate (Mar 19 → Apr 7)
Multi-week discussion on the mailing list about the new varint encoding in draft-17. Participants: [[alan-frindell]], [[martin-duke]], [[suhas-nandakumar]], Ian Swett, Mo Zanaty, Christian Huitema. Key issue: whether to allow the 7-byte encoding (6 leading ones) which was marked invalid in the initial spec. Resolved with PR #1595 (merged Apr 9) allowing 7-byte varint and non-minimal encodings.

## Agenda for Virtual Interim 13 - April 13 (Apr 9)
Magnus Westerlund posted the agenda. Key topic: REWIND slides and discussion of [[joining-fetch]] alternatives. See [[interim-meetings]].

## Minutes for March 30 Virtual Interim (Apr 9)
Magnus Westerlund posted the minutes for interim-2026-moq-12. Included discussion of SUBSCRIBE_NAMESPACE split.

## Weekly GitHub Digest (Apr 5)
Automated summary of moq-wg repository activity.

## Required-Request-ID Debate (Apr 10-11)
[[martin-duke]] filed issue #1603 questioning whether `required-request-id` is needed for all request types. He argues only REQUEST_UPDATE and FETCH genuinely need it, and maintaining state for all request IDs creates unnecessary overhead and enables a malicious client to maximize state by using every other request ID. [[alan-frindell]] countered that QUIC's maximum bidirectional streams naturally bound the state, but Martin questioned whether stream IDs are actually bound to request IDs. Ian Swett (Apr 11) noted that **stream IDs in WebTransport and some QUIC implementations aren't exposed to the application**, and that `required-request-id` was added to achieve "feature parity" with the single control stream model but "it was never clear exactly what functionality this provided." Ian also expressed that Joining FETCH's dependency on another Request is one reason he dislikes it.

## Joining FETCH Redesign (Apr 10)
[[martin-duke]] opened PR #1604 implementing the proposal from issue #1602 to move Joining FETCH onto the SUBSCRIBE/PUBLISH stream. He noted it was "much spicier than expected" due to parameter state sharing. [[alan-frindell]] reviewed and flagged that subscriber priority cannot differ between fetch and subscription under this model.

## Subscribe Rewind draft-02 Published (Apr 2)
[[martin-duke]]'s [draft-duke-moq-subscribe-rewind-02](https://datatracker.ietf.org/doc/draft-duke-moq-subscribe-rewind/) was published April 2. The "Rewind" subscription filter allows subscribers to request past groups using SUBSCRIBE semantics (multiple streams, best-effort) rather than FETCH semantics (single stream, complete). This is a key topic for the interim-13 meeting on Apr 13.

## Single Object Subgroup ID Likely Closing (Apr 12)
Ian Swett commented on issue #1405 (originally filed Dec 2025) proposing that single-object subgroups don't need a Subgroup ID. After PR #1593 (allow framing single objects without subgroup ID) saw limited WG interest, Ian wrote: "Discussion of the PR so far indicates we don't really want to bother with #1593. I'm inclined to close this issue with no action, but I'll put it before the WG to confirm." The related idea of simplifying prioritization (#1446) also lacked appetite.

## Interop Runner Expansion (Apr 12–14)
The [[interop-runner]] expanded from 93 to 105 tests with the addition of **moqx** ([[openmoq|OpenMOQ]]'s moxygen fork) as an 11th implementation. Results have fluctuated slightly: 21/70 (Apr 12) → 20/71 (Apr 13) → 21/70 (Apr 14), with 14 skip unchanged. moqx shows strong interop: moq-dev-js <-> moqx achieves 6/6, moq-rs-draft-16 <-> moqx achieves 5-6/6.

## Weekly GitHub Digest (Apr 12)
Automated weekly summary of moq-wg repository activity posted to the mailing list.

## New Individual Drafts on Datatracker

Two individual drafts appeared on the IETF datatracker this period:
- **[[moq-lite|draft-lcurley-moq-lite-04]]** (Apr 9) — [[luke-curley]]'s simplified transport protocol, now at version 04. Removes subgroups, object properties, datagrams, and 30+ message types from [[moq-transport]], using a pull-only, stream-based architecture. This is the spec behind the [[moq-dev]] implementation.
- **[[moq-nmsf|draft-herz-moq-nmsf-01]]** (Apr 7) — Erik Herz (Vivoh) proposes extending [[moq-msf]] with a `nvc` packaging type for Neural Video Codecs. Uses a dual-track model (hyperprior + latent) for priority-aware delivery. Supports DCVC-RT, SSF, FVC, and other learned codecs.

# Upcoming

## London In-Person Interim (June 11-12)
Four MOQ sessions scheduled at County Hall / The Riverside Building, Belvedere Road, London SE1 7PB. June 11 has 2 sessions (likely hackathon/interop), June 12 has 3 working sessions. Similar format to the [[discussions-2026-02|Boulder interim]]. See [[interim-meetings]] for details.

# Key Themes

1. **Joining mechanism convergence** - Active work to reconcile Joining Fetch, Rewind (-02 published), and Join Filters; PR #1604 proposes a concrete redesign. Discussed at interim 13 (Apr 13).
2. **Non-media use cases** - Alan Frindell's GraphQL subscriptions analysis (Apr 13) highlights draft-17 parameter inflexibility and questions MOQT's readiness for non-media workloads.
3. **Protocol simplification** - Growing consensus that required-request-id may be unnecessary (Ian Swett supports); single-object subgroup ID (#1405) likely closing with no action
4. **Interop progress** - v17 interop achieved between moq-rs and Meetecho; moqx joins interop runner with strong results; runner at 21/70/14 (Apr 14)
5. **Wire format refinement** - Varint encoding, delta encoding, property parsing
6. **Consensus process** - draft-17 consensus call active on mailing list
7. **New individual drafts** - moq-lite-04 (simplified transport) and NMSF-01 (neural video codec packaging) published
8. **London interim** - In-person interim June 11-12 at County Hall, London with hackathon + working sessions
