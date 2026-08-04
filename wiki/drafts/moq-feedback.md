---
title: "MoQ Feedback (Multimodal Feedback / MMF)"
tags: [draft, individual, feedback, congestion-control, ai-agent]
date: 2026-08-04
last_updated: 2026-08-04
status: current
draft_version: "00"
ietf_url: "https://datatracker.ietf.org/doc/draft-liu-moq-feedback/"
---

> **2026-08-04**: **First-look — a new individual I-D adds a receiver→sender delivery-quality feedback mechanism to MOQT, the first MoQ *feedback/quality-signalling* draft the wiki has tracked.** **`draft-liu-moq-feedback-00`** *"MoQ Feedback"* was submitted **July 31 2026** (41 pages) by **Yanmei Liu** and **Minghui Jiang** (Alibaba Inc.) with **Ronghua Wu** (Ant Group), and **announced to the moq@ietf.org list Aug 3** (04:10 UTC) — drawing an immediate reply from **[[cullen-jennings|Cullen Jennings]]** (16:18 UTC). Individual draft, not adopted; logged as a first-look. See [[discussions-2026-08]].

**draft-liu-moq-feedback-00** | individual submission | submitted 2026-07-31, 41 pages | announced to moq@ietf.org 2026-08-03

# Authors
- Yanmei Liu (Alibaba Inc.)
- Minghui Jiang (Alibaba Inc.)
- Ronghua Wu (Ant Group)

# Abstract (summary)

Defines an MOQT extension that lets **receivers report delivery-quality information back to senders**. The proposal introduces **Multimodal Feedback (MMF)**, which operates at the **MoQ semantic layer** to *supplement* — not replace — packet-level QUIC transport feedback. Rather than adding new control messages, MMF **reuses the existing Track/Object data model**: delivery-status reports are carried on a dedicated **"Feedback Track"** as per-Object status objects.

# Key Ideas

- **Feedback Track instead of new control messages.** Per-Object delivery-status reports (e.g. **received / late / lost / partially received**) ride the normal Track/Object hierarchy, so no new wire message type is introduced and relays need no special handling.
- **Fills a transport blind spot.** QUIC's transport-layer feedback (ACKs, loss, RTT) cannot perceive **frame integrity, frame type, or deadline** — MMF surfaces those application-visible facts to the sender for adaptation decisions.
- **Three-layer architecture.** The MoQ layer **synthesizes MMF signals with the local congestion-control output** and issues commands (target **bitrate**, **pacing** rate) down to the CC algorithm — a semantic-layer signal informing transport-layer pacing.
- **Two target scenarios.** Supports both **unidirectional live streaming** and **bidirectional AI-inference** sessions (the latter tying into the same author's [[moq-live-agent-interaction|Live Agent Interaction]] work).

# Why it matters

- **First delivery-quality / feedback draft** in the WG's document space. MoQ has so far leaned on QUIC transport feedback plus application-level filters ([[switch-abr|SWITCH_FROM]], Top Tracks Filter, SSTS); this proposes an explicit **object-granular quality channel** back to the publisher.
- **Timely against live design threads.** It lands the same window as the Slack **DATAGRAM object-fragmentation / partial-reliability** discussion (afrind, [[mathis-engelbart|Mathis Engelbart]], [[luke-curley|Luke Curley]]) and Ian Swett's July **"Top Tracks and SSTS (or ABR in general)"** list thread — all circling how a MoQ sender should learn what actually arrived and adapt.
- **Continued Alibaba/Ant MoQ investment.** A second Alibaba-authored MoQ artifact from Yanmei Liu (after [[moq-live-agent-interaction]]), alongside the [[xquic-moq|XQUIC]] implementation — reinforcing the "MoQ as a reusable real-time substrate" thesis, here extended toward AI-inference feedback.

# Status & Caveats

- **Individual draft at -00** (submitted July 31 2026) — not adopted, no WG call for adoption. First list traffic is the Aug-3 announcement + Cullen Jennings' reply.
- The wiki tracks individual drafts that are actively discussed or referenced; this is logged as a **first-look** because it opens a new *feedback/quality-signalling* category for MoQ. Watch for WG-list reaction, a follow-on revision, or reference from an implementation.

# Related

- [[moq-transport]] — the transport this extension augments (MMF reuses its Track/Object model as a Feedback Track)
- [[moq-live-agent-interaction]] — the same author's AI-agent application profile; MMF's bidirectional-inference scenario ties into it
- [[switch-abr]] / [[adaptive-bitrate]] — existing MoQ adaptation signals this complements
- [[xquic-moq]] — Alibaba's MoQ implementation
- [[subgroups-and-objects]] — the Group/Subgroup/Object data model MMF's Feedback Track rides on

# External Links
- [Datatracker](https://datatracker.ietf.org/doc/draft-liu-moq-feedback/)
- [List announcement (Aug 3)](https://mailarchive.ietf.org/arch/msg/moq/7QysuqPJa1_sKhNE057S1PdTdbw/)
- [Cullen Jennings reply (Aug 3)](https://mailarchive.ietf.org/arch/msg/moq/2LsjqfTrk68dMAZRCslzpRre4kY/)
