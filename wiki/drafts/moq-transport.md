---
title: "Media over QUIC Transport (MOQT)"
tags: [draft, transport, core]
date: 2026-04-10
status: current
draft_version: 17
ietf_url: "https://datatracker.ietf.org/doc/draft-ietf-moq-transport/"
---

# Media over QUIC Transport (MOQT)

**draft-ietf-moq-transport-17** | 121 pages | Expires 2026-09-03

## Authors
- [[suhas-nandakumar]] (Cisco)
- Victor Vasiliev (Google)
- Ian Swett (Google)
- [[alan-frindell]] (Meta)

## Abstract

MOQT defines a media transport protocol operating over QUIC and WebTransport. It uses a [[publish-subscribe]] model where producers publish data that is consumed by multiple endpoints via subscription. The protocol treats [[relays]] as first-class citizens, enabling intermediate content distribution networks for high-scale, low-latency distribution.

## Key Concepts

- **[[publish-subscribe]]**: Core messaging pattern - PUBLISH, SUBSCRIBE, REQUEST, PUBLISH_DONE
- **[[subgroups-and-objects]]**: Data hierarchy: Track > Group > Subgroup > Object
- **[[relays]]**: First-class relay support for CDN-style distribution
- **[[track-properties]]**: Metadata attached to tracks and objects via Key-Value Pairs
- **[[joining-fetch]]**: Mechanism to fetch historical data when joining a live session
- **[[qmux]]**: TCP fallback via QUIC multiplexing over TLS+TCP
- **URI Scheme**: `moqt://` URI scheme with fragment identifier support (PR #1571)

## Recent Changes (draft-17)

Draft-17 was published 2026-03-02 with significant changes from draft-16:
- Unidirectional control streams for 0-RTT subscribe capability
- SUBSCRIBE_NAMESPACE split into two messages: SUBSCRIBE_NAMESPACE (namespace info) and SUBSCRIBE_TRACKS (PUBLISH notifications)
- Subscription filters moved to be a Param (PR #1590)
- Track Properties added to REQUEST_OK (PR #1576)
- Allow 7-byte varint and non-minimal encodings (PR #1595)
- Editorial: consistent use of "MOQT" for protocol references (PR #1597)
- Editorial: use "message" instead of "frame" (PR #1587)

## Active Issues (as of 2026-04-11)

### Design Issues
- **#1603** - What is the use case for required-request-id (questions if field is needed beyond REQUEST_UPDATE/FETCH)
- **#1602** - Joining Fetch should be on the SUBSCRIBE/PUBLISH stream
- **#1598** - Why PUBLISH_OK not REQUEST_OK? (Needs PR, Editorial & Minor Design)
- **#1585** - Exclude your own tracks from SUBSCRIBE_NAMESPACE
- **#1582** - Caching and propagation of REQUEST_ERRORs (Design)
- **#1581** - Request cancellation should be able to specify an error code
- **#1578** - Bikeshed: `Largest Object` should be `Next Object`
- **#1550** - Properties Type collision between moq-16 and loc-01

### Open PRs
- **PR #1604** - Joining FETCH with subscription (implements #1602)
- **PR #1596** - Exclude your own tracks from SUBSCRIBE_NAMESPACE
- **PR #1593** - RFC: Allow framing single Objects without Subgroup ID
- **PR #1591** - RFC: Add flow control for Subscriptions
- **PR #1588** - Add internationalization statement for moqt URI scheme
- **PR #1586** - Make Object ID and Group ID delta encoded in Fetch responses
- **PR #1562** - RFC: Add Session-Level Tracks reserved namespace

### Recently Merged
- **PR #1599** - Move normative text on Track Alias
- **PR #1597** - Consistently use MOQT for protocol references
- **PR #1595** - Allow 7-byte varint and non-minimal encodings
- **PR #1590** - Subscription filters are a Param
- **PR #1583** - Allow publisher to reopen subgroup after REQUEST_UPDATE fwd 0->1
- **PR #1577** - Clarify Joining Fetch ordering with Forward State transitions
- **PR #1576** - Add Track Properties to REQUEST_OK
- **PR #1540** - Allow coalescing REQUEST_UPDATE processing

## ALPN Negotiation

Draft-17 uses ALPN strings for version negotiation:
- `qmux-00.moqt-17` - QUIC multiplexed, draft-17
- `qmux-00.moqt-16` - QUIC multiplexed, draft-16
- `qmux-00` with no suffix implies draft-14 (legacy)

## Related Drafts
- [[moq-msf]] - Streaming format built on MOQT
- [[moq-loc]] - Low overhead container for MOQT objects
- [[moq-secure-objects]] - E2E encryption for MOQT
- [[moq-privacy-pass]] - Authentication for MOQT

## Mailing List

### Consensus Call on draft-17 (March 2026)
[[martin-duke]] initiated a consensus call on the mailing list (2026-03-24) for draft-17 changes. The thread received responses through April 10, 2026.

### 7-Byte Varint Encoding Debate
Multi-week mailing list thread (March 19 - April 7) about the new varint format introduced in draft-17. The 7-byte encoding (6 leading ones) was initially marked invalid. Discussion among [[alan-frindell]], [[martin-duke]], [[suhas-nandakumar]], Ian Swett, Mo Zanaty, and Christian Huitema led to PR #1595 allowing 7-byte varint and non-minimal encodings.

## External Links
- [GitHub repo](https://github.com/moq-wg/moq-transport)
- [Latest HTML](https://moq-wg.github.io/moq-transport/draft-ietf-moq-transport.html)
- [Datatracker](https://datatracker.ietf.org/doc/draft-ietf-moq-transport/)
- [moq-wg wiki](https://github.com/moq-wg/moq-transport/wiki)
