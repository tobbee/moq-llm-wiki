---
title: "Forward Error Correction for Media over QUIC"
tags: [draft, media, fec, broadcast, individual]
date: 2026-10-15
last_updated: 2026-11-03
status: current
draft_version: "01 (split into fec-core, fec-block-codes, fec-catalog, fec-multicast -00)"
ietf_url: "https://datatracker.ietf.org/doc/draft-ramadan-moq-fec/"
---

> **Split into four drafts at the IETF 127 deadline (2026-11-02).** `draft-ramadan-moq-fec` reached -01 on 2026-10-28 (113 pages) and was then broken into four -00 documents:
> - [`draft-ramadan-moq-fec-core`](https://datatracker.ietf.org/doc/draft-ramadan-moq-fec-core/) (69 pp): the code-independent mechanism. It covers source-symbol numbering and blocks, carrying symbols in the source track or a separate symbol track for datagram delivery, layered repair tracks, the repair object format, and repair Group IDs that make repair fetchable per block.
> - [`draft-ramadan-moq-fec-block-codes`](https://datatracker.ietf.org/doc/draft-ramadan-moq-fec-block-codes/) (26 pp): Reed-Solomon over GF(2^8) from ISO/IEC 23008-10 (**mandatory to implement**) and RaptorQ (RFC 6330, optional), with test vectors.
> - [`draft-ramadan-moq-fec-catalog`](https://datatracker.ietf.org/doc/draft-ramadan-moq-fec-catalog/) (27 pp): the [[moq-msf|MSF]]/[[moq-cmsf|CMSF]] catalog binding, with a track-level `fec` array and `fec-repair`/`fec-source` packaging values.
> - [`draft-ramadan-moq-fec-multicast`](https://datatracker.ietf.org/doc/draft-ramadan-moq-fec-multicast/) (32 pp): repair-only multicast endpoints and a receiver policy of in-band FEC first, then per-block unicast repair. See [[moq-multicast]].
>
> The rest of this page describes the original single-document design (-00).

**draft-ramadan-moq-fec-00** | Individual submission | **-00 posted 2026-10-14** | 75 pages | Standards Track | [Datatracker](https://datatracker.ietf.org/doc/draft-ramadan-moq-fec/)

# Authors
- **Omar Ramadan** (Blockcast)

# Abstract

Defines **Forward Error Correction (FEC)** for [[moq-transport|Media over QUIC]] so that receivers can recover lost packets from **redundant repair data carried alongside the source media**, without waiting for a retransmission round-trip. The draft specifies **catalog-based signaling of FEC configuration**, **repair-track naming conventions**, **repair-object formats**, and a block profile based on **ISO/IEC 23008-1 (MMT)**. **RaptorQ (RFC 6330)** is the mandatory-to-implement FEC scheme, with an algorithm registry left open for extensions. The design is aimed at bridging MoQ with broadcast systems — explicitly citing **ATSC 3.0** and **ARIB STD-B60** compatibility.

# Why It Matters

FEC targets delivery paths where retransmission is expensive or impossible — large-fan-out live distribution and, especially, the **multicast / broadcast** paths this draft's companions describe. It is the first MoQ document to bring a concrete loss-recovery scheme (RaptorQ) with an explicit broadcast-interop goal into the ecosystem, moving MoQ toward the one-to-many, lossy-channel regime that unicast QUIC's own loss recovery does not cover.

# Key Design

- **Repair tracks.** Repair symbols travel as their own MoQ track(s) alongside the source media track, discoverable and configured via the **catalog** rather than inline signaling — a late-joining or selective subscriber can choose whether to pull repair data.
- **RaptorQ MTI + registry.** **RaptorQ (RFC 6330)** is mandatory to implement; an algorithm registry permits other FEC schemes without a new document.
- **MMT block profile.** Repair-block structure reuses the **ISO/IEC 23008-1 (MPEG Media Transport)** block profile — tying FEC to the same MMT substrate as the companion [[moq-mmt]] packaging and [[moq-multicast]] delivery drafts.
- **Broadcast compatibility.** Formats are chosen so a stream protected for **ATSC 3.0 / ARIB STD-B60** broadcast can be carried over MoQ (and vice-versa) with the FEC parameters intact.

# Relationship to other work

- **Part of a three-draft Blockcast cluster (Omar Ramadan, 2026-10-14).** Posted the same day as [[moq-mmt|`draft-ramadan-moq-mmt-00`]] (MMT packaging) and [[moq-multicast|`draft-ramadan-moq-multicast-00`]] (multicast delivery + endpoint discovery). The three are interdependent: MMT provides the container, multicast the delivery path, and FEC the loss recovery for an integrity-unprotected UDP multicast channel.
- **Broadcast-over-MoQ direction.** Complements the MPEG-TS packaging work ([[moq-msfts]], [[moq-mpegts]]) by moving MoQ further into broadcast/contribution territory — here on the *resilience* axis rather than the container axis.

# Status

**Individual submission** — not adopted by the MOQ working group. Posted 2026-10-14; no mailing-list announcement at submission time. See [[moq-mmt]], [[moq-multicast]], [[moq-transport]], [[moq-msf]], [[catalog-format]], [[discussions-2026-10]].

# Links

- **Datatracker**: https://datatracker.ietf.org/doc/draft-ramadan-moq-fec/
