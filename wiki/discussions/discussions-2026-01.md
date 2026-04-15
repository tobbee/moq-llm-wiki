---
title: "Discussions - January 2026"
tags: [discussions, slack, github]
date: 2026-04-10
last_updated: 2026-04-14
status: current
---

# Key Events

## Draft-16 Published (Jan 14)
[[alan-frindell]]: "Behold: Draft 16. Go forth and implement. But don't file any issues." - 12 replies. Major changes from draft-14/15 include:
- ALPN negotiation (no more version in CLIENT_SETUP/SERVER_SETUP)
- REQUEST_OK/REQUEST_ERROR consolidation
- SUBSCRIBE_NAMESPACE moved to its own bidirectional stream
- Delta-encoding of KVP
- Changes to OBJECT_DATAGRAM/SUBGROUP_HEADER and FETCH serialization

## Joining Fetch Discussion with Claude (Jan 13)
[[alan-frindell]] shared that he "had a chat with claude about MOQT and Joining Fetch" - generated 22 replies. Early exploration of alternatives to the current joining fetch mechanism.

## Immutable Extensions Debate (Jan 22-27)
[[martin-duke]] raised questions about which extensions should be in the immutable block. Key points:
- ID_GAP extension placement unclear
- Text allows relays to drop ID_GAP for fetches, but immutable block prevents that
- [[victor-vasiliev|Victor Vasiliev]]: "I would assume payload only"
- Discussion around what "immutable" means for varint encoding differences

## DELIVERY_TIMEOUT Semantics (Jan 13-16)
Discussion about how DELIVERY_TIMEOUT works:
- Should it default to zero?
- How to update to infinite? No way to express infinity in REQUEST_UPDATE
- Publisher's timeout overrides subscriber's (should be min of the two)
- AUTH tokens on separate SUB_NS stream need QPACK-type rules

## WARP -> MSF / CARP -> CMSF Rename Confusion (Jan 12)
[[mike-english|Mike English]] noticed confusion on datatracker: CMSF and CARP both showed as adopted documents, but MSF (the replacement for WARP) didn't appear correctly. 7-reply thread to sort it out.

# Eyevinn Update (Jan 27)
[[Torbjorn Einarsson|Torbjörn Einarsson]] announced updates to [[moqlivemock]]:
- moqlivemock and warp-player updated to MOQT draft-14 and CMSF draft-0
- Added HEVC video, Opus and AC-3 audio, live subtitles (wvtt and stpp)
- Wall-clock synchronized: group X starts at second X
- Video clock aligned with UTC modulo 10s (10s looped clip)
- Audio beeps aligned with seconds
- Online demo at `moqlivemock.demo.osaas.io`
- Shaka-player POC by Alvaro Velad (Atème) works with moqlivemock including subtitles
- No FETCH support yet (catalog via SUBSCRIBE)

# Implementation Activity

- [[suhas-nandakumar]]: Implemented Mo's filter PR in libquicr (Jan 12)
- [[martin-duke]]: Working on draft-16 relay implementation, skipping draft-15
- [[lorenzo-miniero]]: Updated relay to support v16 (supports v11 through v16)
- Paul Gregoire: Asking about skipping draft-15 in relay implementations (consensus: yes, skip it)
