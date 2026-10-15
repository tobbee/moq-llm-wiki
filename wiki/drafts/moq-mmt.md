---
title: "MPEG Media Transport (MMT) Packaging for Media over QUIC"
tags: [draft, media, mmt, packaging, broadcast, individual]
date: 2026-10-15
last_updated: 2026-10-15
status: current
draft_version: "00"
ietf_url: "https://datatracker.ietf.org/doc/draft-ramadan-moq-mmt/"
---

**draft-ramadan-moq-mmt-00** | Individual submission | **-00 posted 2026-10-14** | 49 pages | Standards Track | [Datatracker](https://datatracker.ietf.org/doc/draft-ramadan-moq-mmt/)

# Authors
- **Omar Ramadan** (Blockcast, omar@blockcast.network)

# Abstract

Enables delivery of **MPEG Media Transport (MMT)** containers across [[moq-transport|MoQ]] infrastructure, bridging broadcast systems (**ATSC 3.0**, **ARIB STD-B60**), multicast, and unicast QUIC **without requiring transcoding**. The core mechanism maps MMT's layered architecture — **MMTP protocol packets** and **MPU (Media Processing Unit)** media units — directly onto MoQ's object model, preserving FEC parameters, metadata ordering, and sample timing so a stream can move between a broadcast and a MoQ delivery path with minimal processing.

# Why It Matters

MMT is the packaging used by next-generation broadcast (ATSC 3.0 in North America, ARIB STD-B60 in Japan). A faithful MMT-over-MoQ mapping lets those broadcast workflows reach MoQ relays and unicast subscribers — and lets MoQ content be injected into broadcast — without a transcode/repackage step. It is the container half of the Blockcast broadcast-interop cluster, where [[moq-multicast]] supplies the delivery path and [[moq-fec]] the loss recovery.

# Key Design

- **MMTP packet → MoQ object.** Each MMTP packet becomes one MoQ Object, preserving the packet stream end-to-end rather than defining a new elementary-stream container.
- **MPU boundaries → Group boundaries.** MPU boundaries define MoQ **Group** boundaries, and individual MPU data units map to **subgroups** — giving late-join subscribers a natural random-access point.
- **S-TSID ↔ catalog conversion.** The draft specifies conversion between **S-TSID** broadcast signaling and MoQ **catalogs**, so endpoint discovery and track description survive the broadcast↔MoQ crossing.
- **Preservation over re-encoding.** FEC parameters, metadata ordering, and sample timing are carried intact, enabling relay-based distribution with minimal processing overhead.

# Relationship to other work

- **Part of a three-draft Blockcast cluster (Omar Ramadan, 2026-10-14).** Companion to [[moq-multicast|`draft-ramadan-moq-multicast-00`]] (which reuses MMTP packets across SSM/AMT/broadcast paths) and [[moq-fec|`draft-ramadan-moq-fec-00`]] (whose repair-block profile is the ISO/IEC 23008-1 MMT profile).
- **Sibling to the MPEG-TS packaging work.** Where [[moq-msfts]] packages MPEG-2 Transport Stream into MOQT and [[moq-mpegts]] preserves TS catalog detail through demux, this draft does the analogous job for **MMT** — the other major MPEG systems-layer container, and the one used by modern broadcast rather than legacy contribution.

# Status

**Individual submission** — not adopted by the MOQ working group. Posted 2026-10-14; no mailing-list announcement at submission time. See [[moq-fec]], [[moq-multicast]], [[moq-transport]], [[moq-msf]], [[catalog-format]], [[discussions-2026-10]].

# Links

- **Datatracker**: https://datatracker.ietf.org/doc/draft-ramadan-moq-mmt/
