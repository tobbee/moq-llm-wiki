---
title: "Multicast Delivery and Endpoint Discovery for Media over QUIC"
tags: [draft, multicast, broadcast, discovery, security, individual]
date: 2026-10-15
last_updated: 2026-10-15
status: current
draft_version: "00"
ietf_url: "https://datatracker.ietf.org/doc/draft-ramadan-moq-multicast/"
---

**draft-ramadan-moq-multicast-00** | Individual submission | **-00 posted 2026-10-14** | 27 pages | Standards Track | [Datatracker](https://datatracker.ietf.org/doc/draft-ramadan-moq-multicast/)

# Authors
- **Omar Ramadan** (Blockcast)

# Abstract

Describes how [[moq-transport|MoQ]] integrates **multicast delivery** with unicast QUIC sessions to achieve scalable live streaming. **MMTP (MPEG Media Transport) packets** are used uniformly across every delivery path — native **SSM (Source-Specific Multicast)**, **AMT** tunneling, and **broadcast television** — while **catalog-based endpoint discovery** lets a receiver find the right source regardless of path. A manifest-based authentication profile, **"bc-provenance,"** protects multicast content through **per-group signed digests**, so a receiver can verify symbols independently of the delivery path or FEC recovery — securing an otherwise integrity-unprotected UDP multicast channel.

# Why It Matters

Unicast QUIC does not scale to broadcast-sized audiences; native IP multicast does, but is integrity-unprotected and awkward to discover and authenticate. This draft is the **delivery-path half** of the Blockcast broadcast-interop cluster: it lets MoQ ride SSM / AMT / broadcast for the many-receiver leg while keeping the unicast QUIC control relationship, and it adds the signing layer multicast has always lacked.

# Key Design

- **MMTP as the uniform packet.** The same **MMTP** packet format (from the companion [[moq-mmt]] draft) is carried over native SSM, AMT tunnels, and broadcast TV — one wire shape across heterogeneous paths.
- **Catalog-based endpoint discovery.** Receivers discover multicast sources and their parameters through the MoQ **catalog**, maintaining the unicast-style discovery model on a multicast channel.
- **`bc-provenance` authentication.** A manifest-based profile protects content with **per-group signed digests**, letting a receiver verify each symbol regardless of which path delivered it or whether it was reconstructed by **FEC** ([[moq-fec]]).
- **Multicast ⟷ unicast bridging.** Multicast delivery is paired with the unicast QUIC session rather than replacing it, so control, authorization, and fallback stay on the unicast leg.

# Relationship to other work

- **Part of a three-draft Blockcast cluster (Omar Ramadan, 2026-10-14).** It consumes [[moq-mmt|`draft-ramadan-moq-mmt-00`]]'s MMTP packets and leans on [[moq-fec|`draft-ramadan-moq-fec-00`]] for recovery on the lossy multicast leg; `bc-provenance` secures what FEC reconstructs.
- **A distinct take on discovery.** Where [[moq-discovery|`draft-jennings-moq-uri-00`]] defines a `moqt` URI scheme and DNS-based discovery for unicast, this draft defines **catalog-based endpoint discovery for multicast/broadcast** sources — a different problem on the same ecosystem axis.
- **Broadcast-over-MoQ direction.** With [[moq-msfts]] / [[moq-mpegts]] (MPEG-TS packaging) and the MMT/FEC companions, this completes a Blockcast-driven push to make MoQ a first-class bridge to ATSC 3.0 / ARIB-style broadcast.

# Status

**Individual submission** — not adopted by the MOQ working group. Posted 2026-10-14; no mailing-list announcement at submission time. See [[moq-mmt]], [[moq-fec]], [[moq-discovery]], [[moq-transport]], [[catalog-format]], [[discussions-2026-10]].

# Links

- **Datatracker**: https://datatracker.ietf.org/doc/draft-ramadan-moq-multicast/
