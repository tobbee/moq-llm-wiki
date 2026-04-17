---
title: "Media over QUIC Transport (MOQT)"
tags: [draft, transport, core]
date: 2026-04-13
last_updated: 2026-04-17
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

# Active Issues (as of 2026-04-17)

## Design Issues
- **#1603** - What is the use case for required-request-id (questions if field is needed beyond REQUEST_UPDATE/FETCH)
- **#1602** - Joining Fetch should be on the SUBSCRIBE/PUBLISH stream
- **#1598** - Why PUBLISH_OK not REQUEST_OK? (Needs PR, Editorial & Minor Design)
- **#1582** - Caching and propagation of REQUEST_ERRORs (Design)
- **#1581** - Request cancellation should be able to specify an error code (addressed by PR #1606)
- **#1578** - Bikeshed: `Largest Object` should be `Next Object`
- **#1550** - Properties Type collision between moq-16 and loc-01 (LOC issue #10; loc-02 also has collisions per [[alan-frindell]] Apr 16)
- **#1507** - (Referenced by Session-Level Tracks extension point)
- **#1405** - Single Object Subgroups don't need a Subgroup ID (likely closing — no WG appetite for change)

## Open PRs
- **PR #1606** - Generalize stream reset codes to all request streams, add GOING_AWAY / EXPIRED_AUTH_TOKEN / SESSION_CLOSED, align TOO_FAR_BEHIND and EXPIRED codes with PUBLISH_DONE, rename registry ([[alan-frindell]], Apr 16). Fixes #1581.
- **PR #1605** - Split DELIVERY_TIMEOUT into two types of timeout ([[victor-vasiliev|Victor Vasiliev]], Apr 14)
- **PR #1604** - Joining FETCH with subscription (implements #1602) — active review; Gwendal Simon (Apr 16) notes this is the subscriber-initiated sibling of the relay-initiated PUBLISH+catch-up pattern in SWITCH #1378
- **PR #1593** - RFC: Allow framing single Objects without Subgroup ID
- **PR #1591** - RFC: Add flow control for Subscriptions
- **PR #1588** - Add internationalization statement for moqt URI scheme
- **PR #1586** - Make Object ID and Group ID delta encoded in Fetch responses
- **PR #1542** - Split SUBSCRIBE_NAMESPACE into SUBSCRIBE_NAMESPACE (0x50, namespace discovery) and SUBSCRIBE_TRACKS (0x51, track subscriptions) ([[alan-frindell]], updated Apr 16). Removes SUBSCRIBE_NAMESPACE_OPTIONS + BOTH mode; adds TRACK_NAMESPACE_PREFIX (0x34) for REQUEST_UPDATE prefix changes. Fixes #1458.
- **PR #1378** - SWITCH for Client-Side ABR — relay-initiated PUBLISH + inline catch-up design; Apr 16 polish pass by Gwendal Simon. See [[switch-abr]].

## Recently Merged
- **PR #1596** - Exclude your own tracks from SUBSCRIBE_NAMESPACE (Apr 16, fixes #1585)
- **PR #1562** - RFC: Add Session-Level Tracks reserved namespace (**merged Apr 16** by [[alan-frindell]]) — reserves `.session` namespace tuple[0] for transport-internal tracks; relays MUST NOT forward; unknown session tracks MUST be rejected with NOT_SUPPORTED; IANA registry established under Specification Required policy
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

## Consensus Call on draft-17 (March 2026)
[[martin-duke]] initiated a consensus call on the mailing list (2026-03-24) for draft-17 changes. The thread received responses through April 10, 2026.

## 7-Byte Varint Encoding Debate
Multi-week mailing list thread (March 19 - April 7) about the new varint format introduced in draft-17. The 7-byte encoding (6 leading ones) was initially marked invalid. Discussion among [[alan-frindell]], [[martin-duke]], [[suhas-nandakumar]], [[ian-swett|Ian Swett]], Mo Zanaty, and Christian Huitema led to PR #1595 allowing 7-byte varint and non-minimal encodings.

# External Links
- [GitHub repo](https://github.com/moq-wg/moq-transport)
- [Latest HTML](https://moq-wg.github.io/moq-transport/draft-ietf-moq-transport.html)
- [Datatracker](https://datatracker.ietf.org/doc/draft-ietf-moq-transport/)
- [moq-wg wiki](https://github.com/moq-wg/moq-transport/wiki)
