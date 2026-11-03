---
title: "MOQT Object Acknowledgements"
tags: [draft, individual, transport, extension, abr, congestion]
date: 2026-11-03
last_updated: 2026-11-03
status: current
draft_version: "00"
ietf_url: "https://datatracker.ietf.org/doc/draft-vvv-moqt-object-acks/"
---

**draft-vvv-moqt-object-acks-00** | Individual submission | **-00 posted 2026-11-02** (IETF 127 deadline) | 8 pages | expires 2027-05-06 | [Datatracker](https://datatracker.ietf.org/doc/draft-vvv-moqt-object-acks/)

# Authors
- [[victor-vasiliev|Victor Vasiliev]] (Google)

# Abstract

A [[moq-transport]] extension that lets a **subscriber acknowledge each object it has received and processed**. Each acknowledgement carries a **time delta from an application deadline**, so the publisher gets a direct signal for **publisher-side bitrate adaptation**. QUIC's own ACKs don't serve this purpose: the W3C WebTransport API does not expose them, and a QUIC ACK only means the bytes arrived, not that the application processed them. [[victor-vasiliev|Vasiliev]] said on the list (Nov-2, *"MOQT Object ACKs"*) that this writes up a mechanism **already implemented in Google's MOQT stack** (quiche `moqt`).

# Key Technical Details

- **Negotiation**: a `SUPPORT_OBJECT_ACKS` SETUP Option (0 or 1; enabled only if both sides send 1). The draft defines it **for draft-22 only**, over both raw QUIC and WebTransport.
- **Per subscription**: an `OBJECT_ACK_WINDOW_SIZE` parameter (µs; 0 = off) in SUBSCRIBE, PUBLISH_OK or REQUEST_UPDATE. When it is non-zero, the subscriber **must ACK every Normal-status, subscription-delivered object** and must not FIN its request stream until the subscription ends.
- **`OBJECT_ACK` message** (provisional type 0x3184), sent on the subscription's request stream: Group ID, Object ID, and **Delta from Deadline** as a new **signed varint (`svi64`)**, sign-magnitude on the MOQT varint. A positive delta means early and a negative one late. Deltas ≥ the window size count as safely on time. For a player with a fixed buffer, the window is the buffer size and the delta is the playback time left when the object arrived.
- It is **hop-by-hop**. The publisher can adjust the encoder (if it is the original publisher) or switch between existing renditions (for example under [[switch-abr|SSTS]] on a relay). ACKs are unilateral: they use no Request ID and get no reply. **There is no coalescing**, so traffic is one ACK per object.
- Open TODOs in -00: security considerations (speculative ACKs), interaction with SUBSCRIBE_TRACKS, PUBLISH_OK now carrying only EXPIRES, and a nicer signed encoding.

# Relationship to other work

- **Publisher-side ABR signal**, complementing the subscriber-side approaches in [[moq-probing|probe tracks]] and [[moq-fast-switching|fast switching]], the [[moq-feedback|MoQ Feedback]] quality-signalling draft, and the SSTS algorithms including [`draft-zengin-moq-ssts-backpressure`](https://datatracker.ietf.org/doc/draft-zengin-moq-ssts-backpressure/). See [[adaptive-bitrate]].
- **Implementation-first.** The draft documents running code in [[quiche-moq|google/quiche moqt]] rather than proposing a new design.

# Notes

Individual submission; **not WG-adopted**. Posted the day the [[moq-transport|transport-23]] text was cut. See [[discussions-2026-11]].

# Links

- **Datatracker**: https://datatracker.ietf.org/doc/draft-vvv-moqt-object-acks/
- **Announcement**: moq@ietf.org, *"MOQT Object ACKs"* (Victor Vasiliev, 2026-11-02, [permalink](https://mailarchive.ietf.org/arch/msg/moq/COncXoHJNMfAhJf6PvpNmc-E4Dc/))
