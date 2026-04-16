---
title: "Discussions - April 2026"
tags: [discussions, slack, github]
date: 2026-04-14
last_updated: 2026-04-16
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

## moq-wg/cmsf
- **PR #18** (Merged Apr 14) — Initial proposal for ContentProtection signaling (Torbjörn Einarsson, [[moqlivemock|Eyevinn]]). Adds DRM signaling based on DASH/DASH-IF attributes: Widevine, PlayReady, FairPlay, ECCP. Merged by [[will-law]].

## shaka-project/shaka-player
- **PR #9972** (Merged Apr 14) — Add CMSF contentProtection signaling support (Álvaro Velad Galván, Atème). Second implementation of [[moq-cmsf]] ContentProtection after [[moqlivemock|warp-player]].

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

**New PRs**:
- PR #1605 - Split DELIVERY_TIMEOUT into two types of timeout ([[victor-vasiliev|Victor Vasiliev]], Apr 14)

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
Multi-week discussion on the mailing list about the new varint encoding in draft-17. Participants: [[alan-frindell]], [[martin-duke]], [[suhas-nandakumar]], [[ian-swett|Ian Swett]], Mo Zanaty, Christian Huitema. Key issue: whether to allow the 7-byte encoding (6 leading ones) which was marked invalid in the initial spec. Resolved with PR #1595 (merged Apr 9) allowing 7-byte varint and non-minimal encodings.

## Agenda for Virtual Interim 13 - April 13 (Apr 9)
Magnus Westerlund posted the agenda. Key topic: REWIND slides and discussion of [[joining-fetch]] alternatives. See [[interim-meetings]].

## Minutes for March 30 Virtual Interim (Apr 9)
Magnus Westerlund posted the minutes for interim-2026-moq-12. Included discussion of SUBSCRIBE_NAMESPACE split.

## Weekly GitHub Digest (Apr 5)
Automated summary of moq-wg repository activity.

## Required-Request-ID Debate (Apr 10-11)
[[martin-duke]] filed issue #1603 questioning whether `required-request-id` is needed for all request types. He argues only REQUEST_UPDATE and FETCH genuinely need it, and maintaining state for all request IDs creates unnecessary overhead and enables a malicious client to maximize state by using every other request ID. [[alan-frindell]] countered that QUIC's maximum bidirectional streams naturally bound the state, but Martin questioned whether stream IDs are actually bound to request IDs. [[ian-swett|Ian Swett]] (Apr 11) noted that **stream IDs in WebTransport and some QUIC implementations aren't exposed to the application**, and that `required-request-id` was added to achieve "feature parity" with the single control stream model but "it was never clear exactly what functionality this provided." Ian also expressed that Joining FETCH's dependency on another Request is one reason he dislikes it.

## Joining FETCH Redesign (Apr 10)
[[martin-duke]] opened PR #1604 implementing the proposal from issue #1602 to move Joining FETCH onto the SUBSCRIBE/PUBLISH stream. He noted it was "much spicier than expected" due to parameter state sharing. [[alan-frindell]] reviewed and flagged that subscriber priority cannot differ between fetch and subscription under this model.

## Subscribe Rewind draft-02 Published (Apr 2)
[[martin-duke]]'s [draft-duke-moq-subscribe-rewind-02](https://datatracker.ietf.org/doc/draft-duke-moq-subscribe-rewind/) was published April 2. The "Rewind" subscription filter allows subscribers to request past groups using SUBSCRIBE semantics (multiple streams, best-effort) rather than FETCH semantics (single stream, complete). This is a key topic for the interim-13 meeting on Apr 13.

## Single Object Subgroup ID Likely Closing (Apr 12)
[[ian-swett|Ian Swett]] commented on issue #1405 (originally filed Dec 2025) proposing that single-object subgroups don't need a Subgroup ID. After PR #1593 (allow framing single objects without subgroup ID) saw limited WG interest, Ian wrote: "Discussion of the PR so far indicates we don't really want to bother with #1593. I'm inclined to close this issue with no action, but I'll put it before the WG to confirm." The related idea of simplifying prioritization (#1446) also lacked appetite.

## DELIVERY_TIMEOUT Split Proposal (Apr 14)
[[victor-vasiliev|Victor Vasiliev]] opened PR #1605 proposing to split DELIVERY_TIMEOUT into two separate types of timeout. This addresses a design concern about the existing single-timeout approach.

## Interop Runner Expansion (Apr 12–15)
The [[interop-runner]] expanded from 93 to 105 tests with the addition of **moqx** ([[openmoq|OpenMOQ]]'s moxygen fork) as an 11th implementation. Results have fluctuated: 21/70 (Apr 12) → 20/71 (Apr 13) → 21/70 (Apr 14) → **23/68** (Apr 15), with 14 skip unchanged. The Apr 15 run shows a notable improvement with 2 additional passing tests. moqx shows strong interop: moq-dev-js <-> moqx achieves 6/6, moq-rs-draft-16 <-> moqx achieves 5-6/6.

## Weekly GitHub Digest (Apr 12)
Automated weekly summary of moq-wg repository activity posted to the mailing list.

## New Individual Drafts on Datatracker

Two individual drafts appeared on the IETF datatracker this period:
- **[[moq-lite|draft-lcurley-moq-lite-04]]** (Apr 9) — [[luke-curley]]'s simplified transport protocol, now at version 04. Removes subgroups, object properties, datagrams, and 30+ message types from [[moq-transport]], using a pull-only, stream-based architecture. This is the spec behind the [[moq-dev]] implementation.
- **[[moq-nmsf|draft-herz-moq-nmsf-01]]** (Apr 7) — Erik Herz (Vivoh) proposes extending [[moq-msf]] with a `nvc` packaging type for Neural Video Codecs. Uses a dual-track model (hyperprior + latent) for priority-aware delivery. Supports DCVC-RT, SSF, FVC, and other learned codecs.

# Upcoming

## London In-Person Interim (June 11-12)
Four MOQ sessions scheduled at County Hall / The Riverside Building, Belvedere Road, London SE1 7PB. June 11 has 2 sessions (likely hackathon/interop), June 12 has 3 working sessions. Similar format to the [[discussions-2026-02|Boulder interim]]. See [[interim-meetings]] for details.

# NAB Show 2026 — MoQ Industry Showcase (Apr 18–22)

NAB Show in Las Vegas (April 18–22) features the largest public display of MoQ technology to date, with multiple companies demonstrating live MoQ workflows:

## Wowza + Cloudflare
Live demo of a next-generation streaming architecture built on MoQ. Workflow: OBS → Wowza origin → Cloudflare [[moq-rs]] relay → MoQ playback. Barry Owen (Wowza Chief Solutions Architect) presenting at Cloudflare booth W2300 (Sunday noon–1pm, Tuesday 2–3pm). Wowza built a CMAF-to-MoQ relay using Java modules (Kwik QUIC / Flupke WebTransport). Published [April 6 blog post](https://www.wowza.com/blog/moq-streaming-with-wowza-streaming-engine-and-claude-ai) documenting the architecture.

## Oracle Video @ Edge (OVE)
Oracle's MoQT relay network — functions as a relay fabric (not CDN origin), with short sliding-window cache (~1 GOP) for late-joining subscribers. NAB partner demos with:
- **Ateme** — encoding/ingest entry point into the OVE relay
- **Broadpeak** — packaging within the relay workflow
- **Bitmovin Player Web X** — commercial-grade MoQ playback

## Bitmovin Player Web X
Commercial MoQ player using WebTransport + WebCodecs API. Plugin architecture enables MoQ support without touching core player code. Successfully tested against Cloudflare's global relay network (330+ cities). [Live demo with Cloudflare at NAB](https://bitmovin.com/blog/media-over-quic-bitmovin-cloudflare/). Sub-second latency confirmed. Roadmap includes MSE and WebRTC fallback.

## Broadpeak
"Half MoQ relay" approach for HAS/MoQ coexistence — both protocols from the same cache infrastructure. Frame or small group-of-frames delivery. Live demo at booth W3034. Technical contacts: Guillaume Bichot, Christoph Neumann, Nominoë Kervadec. White paper forthcoming.

## Synamedia
Quortex PowerVu & MEG providing "next-generation MoQ track-based distribution" for affiliates. Demonstrated alongside dynamic channel creation and ATSC 3.0 reception.

This represents a significant milestone for MoQ commercialization — major CDN, player, encoder, and platform vendors are all demonstrating interoperable MoQ workflows simultaneously.

# GitHub Activity (Apr 15–16)

## moq-transport

**PR #1378 (SWITCH) — Major Redesign (Apr 15–16)**:
Gwendal Simon pushed 7 commits redesigning SWITCH for client-side ABR. The new approach replaces FETCH+SUBSCRIBE delivery with **relay-initiated PUBLISH + inline catch-up**. Catch-up data is delivered on the PUBLISH bidi stream rather than requiring a separate FETCH. This addresses earlier concerns about the complexity of coordinating FETCH and SUBSCRIBE delivery during track switches. See [[switch-abr]].

**PR #1604 (Joining FETCH) — New Feedback (Apr 15)**:
Gwendal Simon posted detailed review comments on [[martin-duke]]'s proposal:
- Raised edge case where SUBSCRIBE_PRIORITY in a Joining FETCH inadvertently changes live delivery priority
- Noted the problem of publisher closing the request stream while Joining FETCH data is still delivering
- Analyzed how relays can unilaterally assign higher QUIC stream priority to FETCH data during catch-up
- Pointed out that a subscriber cannot include a parameter that applies only to the FETCH portion

**PR #1562 (Session-Level Tracks) — 4th Approval (Apr 15)**:
[[suhas-nandakumar]] approved [[alan-frindell]]'s PR to reserve the `.session` namespace tuple for session-level tracks. Now has 4 approvals (from [[ian-swett]], sharmafb, [[victor-vasiliev|vasilvv]], and suhasHere). Appears close to merge.

## Implementation Repos

**[[moq-dev]] — Very Active (Apr 15–16)**:
[[luke-curley]] landed 4 PRs and opened 4 more in 24 hours:
- **PR #1304** (merged): Safari/Firefox moq-boy compatibility — fixes Safari WebCodecs issue (avc3 vs avc1), Firefox AudioDecoder 6-channel output for stereo Opus
- **PR #1280** (merged): Landing page for non-MoQ browser clients connecting to relay
- **PR #1302** (merged): Release moq-cli v0.7.18, moq-relay v0.10.21
- **PR #1307** (open): moq-lite negotiate Lite03+ via legacy SETUP when ALPN unavailable (Firefox workaround)
- **PR #1306** (open): Disable WebTransport on Firefox, force WebSocket fallback (Firefox BiDi stream bug)
- **PR #1308** (open): Replace `--identity` with separate `--cert` and `--key` flags
- **PR #1309** (open): moq-token default to base64url encoding for JWK output

**[[moqtail]] — Major Merge Day (Apr 14–15)**:
Five draft-16 PRs merged, representing a major push toward draft-16 compliance:
- **PR #163**: Unified registry mapping messages to request_ids (+937/−1398, 47 files)
- **PR #160**: SubgroupHeader per draft-16 §10.4.2 (24 new type definitions)
- **PR #162**: Consolidated OK messages into unified REQUEST_OK
- **PR #159**: REQUEST_UPDATE refactoring
- **PR #157**: Datagram draft-16 compatibility
- v0.9.1 release pending (fixes race condition causing negative object deltas)

**[[moq-rs]] — qlog Alignment (Apr 14)**:
[[mike-english]] opened PR #163 aligning mlog qlog output with draft-pardue-moq-qlog-moq-events-03 (+346/−242, 6 files). Includes epoch-relative timestamps, typed parameter formatting, and authorization token redaction. Addresses feedback from Lucas Pardue ([@LPardue](https://github.com/LPardue)) at IETF 125.

**[[quiche-moq]] — Joining FETCH Fix (Apr 14)**:
[[martin-duke]] committed a fix to limit Joining FETCH to `largest_object` at time of SUBSCRIBE rather than using current value. Moves responsibility from `MoqtOutgoingQueue` to the session layer. Prepares for REWIND implementation.

**video-dev/[[moq-js]]**: No activity since mid-March.

# Interop Runner (Apr 16)

Unchanged at **23 pass / 68 fail / 14 skip** (105 tests). Same results as April 15. Latest run: 2026-04-16.

# Draft Status Watch

- **[[moq-media-interop|draft-cenzano-moq-media-interop-03]]** expires in **7 days** (April 23). Still no renewal or version -04 published.
- **MoQ Monthly #1** not yet published — #0 was published March 4 with "See you in April!" but no new issue yet.

# Key Themes

1. **NAB Show MoQ showcase** - Biggest industry milestone: Wowza, Oracle, Bitmovin, Broadpeak, Synamedia, Ateme, and Cloudflare all demoing MoQ workflows at NAB (Apr 18–22)
2. **Joining mechanism convergence** - Active work to reconcile Joining Fetch, Rewind (-02 published), and Join Filters; PR #1604 getting detailed design feedback from Gwendal Simon
3. **SWITCH redesign** - PR #1378 significantly reworked to use relay-initiated PUBLISH+catch-up instead of FETCH+SUBSCRIBE
4. **Session-Level Tracks** - PR #1562 has 4 approvals, nearing merge
5. **moqtail draft-16 push** - 5 PRs merged in one day, major unified message registry refactoring
6. **moq-dev browser compat** - Luke Curley actively fixing Safari/Firefox issues, implementing ALPN fallback for Firefox
7. **Non-media use cases** - Alan Frindell's GraphQL subscriptions analysis (Apr 13) highlights draft-17 parameter inflexibility
8. **Protocol simplification** - Growing consensus that required-request-id may be unnecessary
9. **Interop stable** - Runner holding at 23/68/14 with 11 implementations
10. **London interim** - In-person interim June 11-12 at County Hall, London with hackathon + working sessions
11. **CMSF ContentProtection** - DRM signaling merged into CMSF spec, with two implementations
12. **media-interop expiry** - draft-cenzano-moq-media-interop-03 expires April 23, still no renewal
