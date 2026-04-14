---
title: "Discussions - March 2026 (IETF 125 Shenzhen)"
tags: [discussions, slack, github, ietf125]
date: 2026-04-10
last_updated: 2026-04-14
status: current
---

March 2026 was dominated by IETF 125 in Shenzhen and the resulting hackathon/interop activity.

# IETF 125 Shenzhen (Week of Mar 14-18)

## Hackathon Interop
Major interop testing during the IETF hackathon:
- [[moq-rs]] (Cloudflare) provided multiple relay endpoints for testing
- [[xquic-moq]] (Alibaba) passed all interop runner tests
- [[moxygen]] (Meta) relay available at usual endpoints
- 10+ implementations registered in [[interop-runner]]

## MOQ Dinner
[[will-law]] organized a MOQ dinner on Thursday evening at a local restaurant, guided by Giovanni Marzot's wife.

## AI Minutes
Magnus Westerlund announced that EKR's AI minute tool now does Meetecho virtual interims. MOQ AI minutes available at: https://ietfminutes.org/minutes/wg/moq.html

# Slack #moq Key Discussions

## SUBSCRIBE_NAMESPACE Split (Mar 31)
[[alan-frindell]] announced the split of SUBSCRIBE_NAMESPACE into two messages:
- **SUBSCRIBE_NAMESPACE** - gets namespace information (NAMESPACE/DONE)
- **SUBSCRIBE_TRACKS** - gets PUBLISH notifications
Overlaps not permitted among same type, but permitted across types. Can use REQUEST_UPDATE to modify prefix.

## QMux Design (Mar 15)
Significant discussion about [[qmux]] ALPN negotiation:
- [[luke-curley]]: `qmux-00.moqt-16` syntax, noting `qmux-01` would double permutations
- [[alan-frindell]]: "I sort of think the right answer is to use moqt-16, and define that TLS+TCP moqt-16 => qmux-00"
- Joseph Beshay set up QMux relay at `fb.mvfst.net:9449`

## Track Properties Confusion (Mar 18)
[[lorenzo-miniero]] raised parsing confusion about Track Properties in request messages (no explicit length prefix). Generated a 20-reply thread that led to spec clarification. See [[track-properties]].

## Draft-17 Interop Testing (Mar 17-23)
[[luke-curley]] released initial draft-17 support in [[moq-dev]] - 74 replies in the thread. Daiki Matsui tested against `cdn.moq.dev/anon` and reported several questions about relay behavior:
1. Relay sends SUBSCRIBE_NAMESPACE back after PUBLISH_NAMESPACE
2. DOES_NOT_EXIST reply causes session drop
3. Relay keeps sending PUBLISH_NAMESPACE for other namespaces

## New Implementations Announced
- [[suhas-nandakumar]]: Go bindings for QuicR - [quicr-go](https://github.com/Quicr/quicr-go) (Mar 25)
- Giovanni Marzot: Python [[aiomoqt]] up to draft-14, draft-16 in progress (Mar 23)
- Giovanni Marzot: Python [aiopquic](https://github.com/gmarzot/aiopquic) bindings to picoquic (Mar 23)

## CMAF Compression Proposal (Mar 18)
[[luke-curley]] proposed [draft-lcurley-compressed-mp4-00](https://www.ietf.org/archive/id/draft-lcurley-compressed-mp4-00.html) to bridge LOC and CMAF. See [[media-packaging]].

## qlog for MOQ (Mar 18)
Lucas Pardue updated his PR to quiche for MOQ qlog support: [cloudflare/quiche#1960](https://github.com/cloudflare/quiche/pull/1960). Aligns with [draft-pardue-moq-qlog-moq-events-06](https://www.ietf.org/archive/id/draft-pardue-moq-qlog-moq-events-06.html), targeting draft-16. Includes qlog-dancer for text/HTML reports and wirefilter-based semantic filtering.

## 0-RTT Subscribe (Mar 16)
[[alan-frindell]]: "I don't support all of draft-17, but I did get 16 + uni control streams to do a true 0-RTT subscribe"

## Issue Milestone (Mar 15)
[[alan-frindell]]: "There are now fewer than 100 open issues in the moq-transport repo."

## Shaka Player v5.0.5 Update (Mar 11)
Daiki Matsui announced Shaka Player's MOQT support updated from draft-11 to draft-14. See [[shaka-player]].

## Luke Curley Blog Post (Mar 10)
[[luke-curley]] published a blog post about a security camera use case: [On a Boat](https://moq.dev/blog/on-a-boat/)

## New Varint Encoding Bugs (Mar 3)
[[lorenzo-miniero]] found issues with the new MoQ varint examples in draft-17. [[alan-frindell]] confirmed example 4 has a bug (`0xdd7f3e7d` should decode to 1,933,118, not 494,878,333). Alan shared a Python reference implementation and validated it with Claude. Lorenzo confirmed only the `0xdd7f3e7d` example was broken.

# Mailing List Highlights

## Consensus Call on draft-17 (Mar 24)
[[martin-duke]] initiated a consensus call on draft-17 changes. Thread received responses through April 10.

## The 7-Byte MOQT Varint Encoding (Mar 19 → Apr 7)
Major mailing list thread about the new varint encoding format. Participants: [[alan-frindell]], [[martin-duke]], [[suhas-nandakumar]], Ian Swett, Mo Zanaty, Christian Huitema. Debated whether to allow the previously-invalid 7-byte encoding. Result: PR #1595 allowing 7-byte varints and non-minimal encodings.

## MoQ Charter and QMUX (Mar 20-23)
Magnus Westerlund, Lucas Pardue, [[luke-curley]], and [[suhas-nandakumar]] discussed whether [[qmux]] fits within MOQ's charter scope.

## Presence/Notifications Protocol (Mar 30)
Phillip Hallam-Baker posted about presence/notifications protocol design for MOQ.

## MOQPACK Compression (Mar 20)
[[alan-frindell]] commented on MOQPACK (QPACK-like compression for MOQT).

## Draft Minutes for IETF 125 (Mar 23)
Magnus Westerlund posted draft minutes for the MOQ sessions at IETF 125 Shenzhen.

## LOC-02 Published (Mar 15)
I-D Action announcement: draft-ietf-moq-loc-02.txt published.

# Key Themes

1. **IETF 125 hackathon** drove significant interop progress
2. **QMux** emerged as important for Safari/TCP fallback
3. **Wire format details** (properties, encoding, varint) consumed significant discussion
4. **New implementations** joining the ecosystem (Go, Python)
5. **Tooling** improving (qlog, interop runner, AI minutes)
6. **Consensus process** - draft-17 consensus call initiated
