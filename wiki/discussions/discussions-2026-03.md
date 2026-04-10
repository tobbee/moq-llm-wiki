---
title: "Discussions - March 2026 (IETF 125 Shenzhen)"
tags: [discussions, slack, github, ietf125]
date: 2026-04-10
status: current
---

# Discussions - March 2026

March 2026 was dominated by IETF 125 in Shenzhen and the resulting hackathon/interop activity.

## IETF 125 Shenzhen (Week of Mar 14-18)

### Hackathon Interop
Major interop testing during the IETF hackathon:
- [[moq-rs]] (Cloudflare) provided multiple relay endpoints for testing
- [[xquic-moq]] (Alibaba) passed all interop runner tests
- [[moxygen]] (Meta) relay available at usual endpoints
- 10+ implementations registered in [[interop-runner]]

### MOQ Dinner
[[will-law]] organized a MOQ dinner on Thursday evening at a local restaurant, guided by Giovanni Marzot's wife.

### AI Minutes
Magnus Westerlund announced that EKR's AI minute tool now does Meetecho virtual interims. MOQ AI minutes available at: https://ietfminutes.org/minutes/wg/moq.html

## Slack #moq Key Discussions

### SUBSCRIBE_NAMESPACE Split (Mar 31)
[[alan-frindell]] announced the split of SUBSCRIBE_NAMESPACE into two messages:
- **SUBSCRIBE_NAMESPACE** - gets namespace information (NAMESPACE/DONE)
- **SUBSCRIBE_TRACKS** - gets PUBLISH notifications
Overlaps not permitted among same type, but permitted across types. Can use REQUEST_UPDATE to modify prefix.

### QMux Design (Mar 15)
Significant discussion about [[qmux]] ALPN negotiation:
- [[luke-curley]]: `qmux-00.moqt-16` syntax, noting `qmux-01` would double permutations
- [[alan-frindell]]: "I sort of think the right answer is to use moqt-16, and define that TLS+TCP moqt-16 => qmux-00"
- Joseph Beshay set up QMux relay at `fb.mvfst.net:9449`

### Track Properties Confusion (Mar 18)
[[lorenzo-miniero]] raised parsing confusion about Track Properties in request messages (no explicit length prefix). Generated a 20-reply thread that led to spec clarification. See [[track-properties]].

### Draft-17 Interop Testing (Mar 17-23)
[[luke-curley]] released initial draft-17 support - 74 replies in the thread. Daiki Matsui tested against `cdn.moq.dev/anon` and reported several questions about relay behavior:
1. Relay sends SUBSCRIBE_NAMESPACE back after PUBLISH_NAMESPACE
2. DOES_NOT_EXIST reply causes session drop
3. Relay keeps sending PUBLISH_NAMESPACE for other namespaces

### New Implementations Announced
- [[suhas-nandakumar]]: Go bindings for QuicR - [quicr-go](https://github.com/Quicr/quicr-go) (Mar 25)
- Giovanni Marzot: Python [[aiomoqt]] up to draft-14, draft-16 in progress (Mar 23)
- Giovanni Marzot: Python [aiopquic](https://github.com/gmarzot/aiopquic) bindings to picoquic (Mar 23)

### CMAF Compression Proposal (Mar 18)
[[luke-curley]] proposed [draft-lcurley-compressed-mp4-00](https://www.ietf.org/archive/id/draft-lcurley-compressed-mp4-00.html) to bridge LOC and CMAF. See [[media-packaging]].

### qlog for MOQ (Mar 18)
Lucas Pardue updated his PR to quiche for MOQ qlog support: [cloudflare/quiche#1960](https://github.com/cloudflare/quiche/pull/1960). Aligns with [draft-pardue-moq-qlog-moq-events-06](https://www.ietf.org/archive/id/draft-pardue-moq-qlog-moq-events-06.html), targeting draft-16. Includes qlog-dancer for text/HTML reports and wirefilter-based semantic filtering.

### 0-RTT Subscribe (Mar 16)
[[alan-frindell]]: "I don't support all of draft-17, but I did get 16 + uni control streams to do a true 0-RTT subscribe"

### Issue Milestone (Mar 15)
[[alan-frindell]]: "There are now fewer than 100 open issues in the moq-transport repo."

## Key Themes

1. **IETF 125 hackathon** drove significant interop progress
2. **QMux** emerged as important for Safari/TCP fallback
3. **Wire format details** (properties, encoding) consumed significant discussion
4. **New implementations** joining the ecosystem (Go, Python)
5. **Tooling** improving (qlog, interop runner, AI minutes)
