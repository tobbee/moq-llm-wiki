---
title: "Steven Riedl"
tags: [person, pluto-tv, paramount, ssai, author]
date: 2026-08-22
last_updated: 2026-09-05
status: current
---

**Organization**: Pluto TV (Paramount)
**Title**: Principal Product Architect, Advertising Integration
**GitHub**: [riedlse](https://github.com/riedlse)
**Role**: Brings the **ad-supported streaming / SSAI** operator perspective to MoQ interop

# Contributions

- **Corresponding author of `draft-riedl-moq-ad-creative-signaling-00`** (datatracker rev-00, posted 2026-09-03 18:21 UTC) — *"Ad Creative Signaling over the MSF Event Timeline,"* Riedl's **first individual MoQ I-D**. It carries the ad-supported-streaming / SSAI perspective onto the standards track: signalling ad-creative boundaries as entries on [[will-law|Will Law]]'s [[moq-msf|MSF]] event timeline so downstream players and stitchers can act on them — the first draft to build directly on the MSF event-timeline mechanism. Not yet WG-adopted or discussed on-list.
- **First RSVP to the [[interim-meetings|2026-09-02 virtual interop hackathon]]** (list, Aug-21 18:36 UTC), committing 09:00–17:00 ET and offering:
  - a **public relay endpoint** running stock **moq-relay v0.14.8**, supporting **drafts 14–19**, on UDP 443 with a valid certificate;
  - **two live SSAI channels running continuously**;
  - client tooling for catalog and session inspection.
- Registered those endpoints as **`stitcher-moq`** in runner [PR #112](https://github.com/englishm/moq-interop-runner/pull/112) — a GCP `us-central1` deployment at `34-72-6-160.sslip.io:443`, L4 passthrough for UDP 443 (WebTransport + raw QUIC) and TCP 443, real ACME cert, anonymous subscribe and anonymous publish scoped to a `moq-test` prefix.
- **Argued for live-media interop coverage** over short clips: continuously-running live channels with **mid-stream joiners** *"surface different behavior than short test clips"* — a push toward data-plane and live-join testing that lines up with [[mike-english|Mike English]]'s stated plan to broaden data-plane coverage in the runner.
- Earlier (Aug-14) posted the `#moq` Slack thread comparing [[aiomoqt]] against [[moq-dev]] behavior.

# Why it matters

Riedl is one of the few voices in MoQ interop representing a **large ad-supported streaming operator**. SSAI (server-side ad insertion) exercises track switching, discontinuities, and mid-stream joins — exactly the areas the automated matrix's short-clip tests do not reach.

# Related

- [[interop-runner]], [[interim-meetings]], [[mike-english]], [[aiomoqt]]
