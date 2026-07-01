---
title: "Media over QUIC Overview"
tags: [draft, individual, overview, informational]
date: 2026-07-01
last_updated: 2026-07-01
status: current
draft_version: "00"
ietf_url: "https://datatracker.ietf.org/doc/draft-westerlund-moq-overview/"
---

> **2026-07-01**: **First-look — a new individual I-D provides a top-down overview of the whole MoQ protocol suite, and it is authored by a WG co-chair.** **`draft-westerlund-moq-overview-00`** *"Media over QUIC Overview"* was published on the Datatracker **June 30 2026** by **Magnus Westerlund (Ericsson)** — a MoQ WG **co-chair** — and **Zaheduzzaman Sarker (Nokia)**. Magnus announced it to the moq@ietf.org list the same day (*"FW: I-D Action: draft-westerlund-moq-overview-00.txt"*). It is an **Informational** document that ties the MoQ deliverables together: architecture, the [[subgroups-and-objects|data model]], the [[moq-transport|transport]], the streaming-format layers ([[moq-msf|MSF]] / [[moq-cmsf|CMSF]] / [[moq-loc|LOC]]), and security. Brand new and not yet discussed; logged here as a first-look.

**draft-westerlund-moq-overview-00** | individual submission | published 2026-06-30 | Informational

# Authors
- Magnus Westerlund (Ericsson) — MoQ WG co-chair
- Zaheduzzaman Sarker (Nokia)

# Abstract (summary)

An **Informational overview** of the Media over QUIC (MoQ) protocol suite. Rather than defining new wire mechanisms, it aims to give readers a single map of how the pieces fit: the overall **architecture** (publishers, subscribers, relays/CDNs), the **object/data model** ([[subgroups-and-objects|Groups → Subgroups → Objects]]), the **[[moq-transport|MOQT]] transport** and its pub/sub + prioritized-delivery primitives, the **streaming-format** layer(s) that package media on top ([[moq-msf|MSF]], [[moq-cmsf|CMSF]], [[moq-loc|LOC]]), and the **security/authorization** story ([[moq-secure-objects|Secure Objects]], the auth workstream).

# Why it matters

- **First suite-level overview document** the wiki has tracked — the MoQ WG's output has grown into many documents ([[moq-transport|transport]], [[moq-msf|MSF]], [[moq-cmsf|CMSF]], [[moq-loc|LOC]], [[moq-secure-objects|secure-objects]], [[moq-privacy-pass|privacy-pass]], [[moq-c4m|C4M]], plus individual drafts like [[moq-lite]] / [[moq-timestamp]] / [[moq-locmaf]]), and a single orienting document lowers the on-ramp for new readers and implementers.
- **Co-chair authorship** signals it is intended as a reference/roadmap for the group rather than a competing design; an overview I-D is a common precursor to (or companion for) a WG's architecture document.
- Complements — does not compete with — the normative drafts: it adds no transport change, mirroring the "keep the core lean" posture the WG has held approaching WGLC on transport-18.

# Status & Caveats

- **Individual draft, -00, just published (June 30 2026)** — not adopted, not yet discussed on the moq@ietf.org list beyond the announcement as of this writing.
- Detailed section contents not yet mirrored here; this is a **first-look** page. Watch for WG-list reaction, a potential call for adoption as a WG informational/architecture document, and follow-on revisions.

# Related
- [[moq-transport]] — the core transport the overview frames
- [[moq-msf]] / [[moq-cmsf]] / [[moq-loc]] — streaming-format layers the overview surveys
- [[moq-secure-objects]] / [[moq-privacy-pass]] / [[moq-c4m]] — the security / authorization pieces
- [[subgroups-and-objects]] — the object/data model
- [[magnus-westerlund]] — co-chair, lead author

# External Links
- [Datatracker](https://datatracker.ietf.org/doc/draft-westerlund-moq-overview/)
