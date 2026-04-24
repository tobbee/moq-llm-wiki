---
title: "Media over QUIC Transport (MOQT)"
tags: [draft, transport, core]
date: 2026-04-13
last_updated: 2026-04-24
status: current
draft_version: 17
ietf_url: "https://datatracker.ietf.org/doc/draft-ietf-moq-transport/"
---

**draft-ietf-moq-transport-17** | 121 pages | Expires 2026-09-03

# Authors
- [[alan-frindell]] (Meta)
- [[ian-swett]] (Google)
- [[suhas-nandakumar]] (Cisco)
- [[victor-vasiliev]] (Google)

# Abstract

MOQT defines a media transport protocol operating over QUIC and WebTransport. It uses a [[publish-subscribe]] model where producers publish data that is consumed by multiple endpoints via subscription. The protocol treats [[relays]] as first-class citizens, enabling intermediate content distribution networks for high-scale, low-latency distribution.

# Key Concepts

- **[[publish-subscribe]]**: Core messaging pattern - PUBLISH, SUBSCRIBE, FETCH, REQUEST_OK/REQUEST_ERROR, PUBLISH_DONE
- **[[subgroups-and-objects]]**: Data hierarchy: Track > Group > Subgroup > Object
- **[[relays]]**: First-class relay support for CDN-style distribution
- **[[track-properties]]**: Metadata attached to tracks and objects via Key-Value Pairs
- **[[joining-fetch]]**: Mechanism to fetch historical data when joining a live session
- **[[qmux]]**: TCP fallback via QUIC multiplexing over TLS+TCP
- **URI Scheme**: `moqt://` URI scheme with fragment identifier support (PR #1571)

# Recent Changes (draft-17)

Draft-17 was published 2026-03-02 with significant changes from draft-16:
- Unidirectional control streams for 0-RTT subscribe capability
- SUBSCRIBE_NAMESPACE split into two messages: SUBSCRIBE_NAMESPACE (namespace info) and SUBSCRIBE_TRACKS (PUBLISH notifications)
- Subscription filters moved to be a Param (PR #1590)
- Track Properties added to REQUEST_OK (PR #1576)
- Allow 7-byte varint and non-minimal encodings (PR #1595)
- Editorial: consistent use of "MOQT" for protocol references (PR #1597)
- Editorial: use "message" instead of "frame" (PR #1587)

# Active Issues (as of 2026-04-24)

## Design Issues
- **#1612** - What happens to Joining FETCH if fwd changes to 0? Opened Apr 23 by [[martin-duke]]. **Apr 23 21:02 UTC**: [[alan-frindell]] replied: "Changing the subscription from 1 to 0 after joining fetch has no effect on the FETCH. We can update the spec. Though now it seems like requiring fwd=1 is causing a lot of problems. I wonder if we should just allow fwd=0." **Apr 23 20:57**: PR #1604 description updated to "Now fixes #1612 as well".
- **#1603** - What is the use case for required-request-id. **Apr 23**: [[martin-duke]] escalated with a **DoS concern** — "a malicious client could use every other request ID to maximize my state" (request IDs multiply via REQUEST_UPDATE even on one stream). Martin's proposed resolution: eliminate RRID except for REQUEST_UPDATE and FETCH, move Joining FETCH to the SUBSCRIBE stream (per PR #1604), use SWITCH or accept REQUEST_ERROR for ordering. **Apr 23 23:10**: [[alan-frindell]] responded with PR #1613 adding per-stream flow control for REQUEST_UPDATE.
- **#1602** - Joining Fetch should be on the SUBSCRIBE/PUBLISH stream (addressed by PR #1604)
- **#1601** - Joining FETCH session errors are subject to a race condition (addressed by PR #1609)
- **#1598** - Why PUBLISH_OK not REQUEST_OK? (addressed by PR #1611)
- **#1582** - Caching and propagation of REQUEST_ERRORs (Design)
- **#1581** - Request cancellation should be able to specify an error code (resolved — PR #1606 merged Apr 23)
- **#1578** - Bikeshed: `Largest Object` should be `Next Object`. **Apr 23**: [[ian-swett]] agrees with the rename.
- **#1550** - Properties Type collision between moq-16 and loc-01 (LOC issue #10; loc-02 also has collisions per [[alan-frindell]] Apr 16)
- **#1534** - REDIRECT. **Apr 23 editor call**: Remove REDIRECT message from PR. Use GOAWAY on a bidi stream to mean what REDIRECT did.
- **#1507** - (Referenced by Session-Level Tracks extension point)
- **#1476** - DELIVERY_TIMEOUT is both Track and Object extension. **Apr 23**: Victor asks whether zero→non-zero transition is permitted.
- **#1405** - Single Object Subgroups don't need a Subgroup ID (**closed by PR #1608**)

## Open PRs
- **PR #1613** (Apr 23 23:10 UTC, [[alan-frindell]], +30/0, label: `Design`) — *Add MAX_REQUEST_UPDATES setup option and TOO_MANY_REQUEST_UPDATES error* (references #1063). Adds **per-stream flow control** for REQUEST_UPDATE messages via a new `MAX_REQUEST_UPDATES` Setup Option; each REQUEST_OK / REQUEST_ERROR response restores one unit of capacity; default is 1 if not present. **Apr 23 23:28–23:31 UTC**: [[martin-duke]] initially pushed back — "this doesn't solve the problem at all… if the sender sends 1,000 REQUEST_UPDATES skipping valid IDs each time, and each is OKed, I still have credit to do more requests, but the receiver still has to store 1,000 request IDs in case there is a reference to them later". **Apr 24 00:42 UTC**: After an offline chat, Martin posted "OK, we chatted online and I get it now. Given the number of authorized streams, there's a cap on the maximum possible request ID assuming the peer isn't skipping request IDs, which it shouldn't. So this does finitely bound the non-contiguous request ID table. However, this PR is missing any text that endpoints have to check the request ID against this theoretical maximum. That's crucial, and a little tricky to write." Direct response to the RRID DoS escalation in #1603; now the alternative-frame to PR #1604's structural reshuffling.
- **PR #1611** (Apr 23, [[alan-frindell]]) — *Remove PUBLISH_OK message type, make it a REQUEST_OK alias* (fixes #1598, +11/−30). **Wire format change**: PUBLISH_OK has the same wire format as REQUEST_OK (no Track Properties, only Parameters), so the code point is removed and PUBLISH_OK becomes a textual shorthand. Author note: retarget main branch after #1610 lands.
- **PR #1610** (Apr 23, [[alan-frindell]]) — *Define textual aliases for REQUEST_OK by request type* (+22/−17). Editorial: introduces `REQUEST_UPDATE_OK`, `TRACK_STATUS_OK`, `SUBSCRIBE_NAMESPACE_OK`, `PUBLISH_NAMESPACE_OK` as shorthand for `REQUEST_OK (in response to X)`.
- **PR #1609** (Apr 23, [[alan-frindell]]) — *Joining Fetch forward state mismatch is a request error* (fixes #1601, +3/−2). Downgrades session-fatal forward-state mismatch (race between REQUEST_UPDATE fwd=1 and joining FETCH on different streams) to a request error.
- **PR #1608** (Apr 23, [[ian-swett]] via Jules AI) — *Make Subgroup ID identical to first Object Id in the Subgroup* (fixes #1405, closes #1593, +9/−10). Follow-up to Ian's Apr 23 01:29 UTC comment on #1607. First review comment from [[alan-frindell]]: "still relevant if you have a group with SG=0 and datagrams."
- **PR #1607** (Apr 18) - [Draft/RFC] Largest Available Group filter ([[victor-vasiliev|Victor Vasiliev]]). Simpler alternative to REWIND: current group only, always serves complete group, no relay-side backfill. Coalescing point of the Apr 17–18 mailing-list convergence on LargestGroup/CurrentGroup. **Apr 19**: [[luke-curley]] left the first review — pushes back on the "MUST serve a complete group" / "full cache only" framing. **Apr 23**: [[suhas-nandakumar]] marked the PR **CHANGES_REQUESTED** (15:07 UTC, the first hard blocker). Separately, [[ian-swett]]'s Apr 23 inline "force Subgroup ID = first Object ID" suggestion has now been split into standalone PR #1608. See [[joining-fetch-dissent]].
- **PR #1605** - Split DELIVERY_TIMEOUT into two types of timeout ([[victor-vasiliev|Victor Vasiliev]], Apr 14). `OBJECT_DELIVERY_TIMEOUT` replaces existing `DELIVERY_TIMEOUT`; new `SUBGROUP_DELIVERY_TIMEOUT` covers subgroups that have been fully queued but not yet fully delivered. Fixes #667 and #606. **Apr 23 morning**: First review by [[ian-swett]] — "this looks reasonable, but I don't intuitively understand why two timeouts are necessary". **Apr 23 afternoon**: [[alan-frindell]] added three suggestions — explicitly permit cancellation of retransmissions after delivery timeout, and evaluate delivery timeout "as late as possible" after internal queuing. On the Apr 27 interim agenda.
- **PR #1604** - Joining FETCH with subscription (implements #1602) — active review; Gwendal Simon (Apr 16) notes this is the subscriber-initiated sibling of the relay-initiated PUBLISH+catch-up pattern in SWITCH #1378. **Apr 23**: [[alan-frindell]] asked [[martin-duke]] for thoughts on Gwendal's FETCH+PUBLISH_DONE race proposal; Martin replies that REQUEST_UPDATE ordering is a general problem and orthogonal to this PR. **Apr 23 20:55 UTC**: Martin added text that "killing SUBSCRIBE also kills the FETCH. I'm not sure how else to do it; there's no other way to turn off the SUBSCRIBE." **Apr 23 20:57 UTC**: Martin noted the PR "Now fixes #1612 as well". Branch is `dirty` (merge conflict with `main`).
- **PR #1593** - RFC: Allow framing single Objects without Subgroup ID (now set to be **closed by #1608**).
- **PR #1591** - RFC: Add flow control for Subscriptions
- **PR #1588** - Add internationalization statement for moqt URI scheme
- **PR #1586** - Make Object ID and Group ID delta encoded in Fetch responses. **Apr 23**: [[alan-frindell]] flagged a "first object in the group" ambiguity for mid-group FETCH starts (17:46 UTC); [[ian-swett]] added a suggestion clarifying the Group-ID-Delta-present semantics (19:44 UTC).
- **PR #1542** - Split SUBSCRIBE_NAMESPACE into SUBSCRIBE_NAMESPACE (0x50, namespace discovery) and SUBSCRIBE_TRACKS (0x51, track subscriptions) ([[alan-frindell]], updated Apr 16). Removes SUBSCRIBE_NAMESPACE_OPTIONS + BOTH mode; adds TRACK_NAMESPACE_PREFIX (0x34) for REQUEST_UPDATE prefix changes. Fixes #1458.
- **PR #1534** - Add REDIRECT for request errors and established subscriptions. **Apr 23 editor call decision**: remove the REDIRECT message from this PR; use GOAWAY on a bidi stream to mean what REDIRECT did. [[alan-frindell]] will revise.
- **PR #1378** - SWITCH for Client-Side ABR — relay-initiated PUBLISH + inline catch-up design; Apr 16 polish pass by Gwendal Simon. See [[switch-abr]].

## Recently Merged
- **PR #1606** - *Generalize stream reset codes to all request streams* (**merged Apr 23 18:32 UTC** by [[alan-frindell]], fixes #1581). Adds `GOING_AWAY` (0x4), `EXPIRED_AUTH_TOKEN` (0x7), `SESSION_CLOSED`; aligns `TOO_FAR_BEHIND` / `EXPIRED` codes between stream-reset and `PUBLISH_DONE` registries. First merge to `main` since draft-17 publication.
- **PR #1596** - Exclude your own tracks from SUBSCRIBE_NAMESPACE (Apr 16, fixes #1585)
- **PR #1562** - RFC: Add Session-Level Tracks reserved namespace (**merged Apr 16** by [[alan-frindell]]) — reserves `.session` namespace tuple[0] for transport-internal tracks; relays MUST NOT forward; unknown session tracks MUST be rejected with NOT_SUPPORTED; IANA registry established under Specification Required policy
- **PR #1490** - FILL_TIMEOUT parameter (Apr 14; subscriber's max wait to fill a FETCH gap before Unknown; addresses part of #1023)

## Previously Merged (Apr 9-10)
- **PR #1599** - Move normative text on Track Alias
- **PR #1597** - Consistently use MOQT for protocol references
- **PR #1595** - Allow 7-byte varint and non-minimal encodings
- **PR #1590** - Subscription filters are a Param
- **PR #1583** - Allow publisher to reopen subgroup after REQUEST_UPDATE fwd 0->1
- **PR #1577** - Clarify Joining Fetch ordering with Forward State transitions
- **PR #1576** - Add Track Properties to REQUEST_OK
- **PR #1540** - Allow coalescing REQUEST_UPDATE processing

# ALPN Negotiation

Draft-17 uses ALPN strings for version negotiation:
- `qmux-00.moqt-17` - QUIC multiplexed, draft-17
- `qmux-00.moqt-16` - QUIC multiplexed, draft-16
- `qmux-00` with no suffix implies draft-14 (legacy)

# Related Drafts
- [[moq-msf]] - Streaming format built on MOQT
- [[moq-loc]] - Low overhead container for MOQT objects
- [[moq-secure-objects]] - E2E encryption for MOQT
- [[moq-privacy-pass]] - Authentication for MOQT

# Mailing List

## REWIND Consensus Call (Apr 16, 2026)
Chair [Magnus Westerlund](mailto:magnus.westerlund@ericsson.com) opened a consensus call on how to proceed with [draft-duke-moq-subscribe-rewind](https://martinduke.github.io/draft-duke-moq-subscribe-rewind/draft-duke-moq-subscribe-rewind.html) following [[interim-meetings|interim-13]]. Three options on the ballot: (1) no action until MOQT is published, (2) adopt as an MOQT extension, (3) use as the basis for a PR to merge when editors decide. Deadline: **May 1, 2026**. The draft targets issues #861, #1039, #1358, #1362, and #1386 plus Boulder-meeting concerns about head-of-line blocking in Joining Fetch.

Over Apr 17–18 the thread pivoted toward a simpler **LargestGroup / CurrentGroup / CurrentGroupFill filter** ([[alan-frindell]], [[luke-curley]], [[victor-vasiliev]] all aligned). Alan backed **Option 1** Apr 17 (FILL_TIMEOUT=0 already solves core HOL-blocking scenarios). Vasiliev captured the emerging direction as **PR #1607** (Draft/RFC) — current group only, always complete group, no relay backfill. Emerging practical consensus: drop REWIND for v1, land the narrow filter. See [[joining-fetch-dissent]] and [[discussions-2026-04]].

## Consensus Call on draft-17 (March 2026)
[[martin-duke]] initiated a consensus call on the mailing list (2026-03-24) for draft-17 changes. The thread received responses through April 10, 2026.

## 7-Byte Varint Encoding Debate
Multi-week mailing list thread (March 19 - April 7) about the new varint format introduced in draft-17. The 7-byte encoding (6 leading ones) was initially marked invalid. Discussion among [[alan-frindell]], [[martin-duke]], [[suhas-nandakumar]], [[ian-swett|Ian Swett]], Mo Zanaty, and Christian Huitema led to PR #1595 allowing 7-byte varint and non-minimal encodings.

# External Links
- [GitHub repo](https://github.com/moq-wg/moq-transport)
- [Latest HTML](https://moq-wg.github.io/moq-transport/draft-ietf-moq-transport.html)
- [Datatracker](https://datatracker.ietf.org/doc/draft-ietf-moq-transport/)
- [moq-wg wiki](https://github.com/moq-wg/moq-transport/wiki)
