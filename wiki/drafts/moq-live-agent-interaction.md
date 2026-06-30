---
title: "Live Agent Interaction over MoQ"
tags: [draft, individual, ai-agent, application-profile]
date: 2026-06-30
last_updated: 2026-06-30
status: current
draft_version: "00"
ietf_url: "https://datatracker.ietf.org/doc/draft-liu-moq-live-agent-interaction/"
---

> **2026-06-30**: **First-look — a new individual I-D applies MoQ to real-time AI-agent (voice) interaction, the first MoQ + AI-agent draft the wiki has tracked.** **`draft-liu-moq-live-agent-interaction-00`** *"Live Agent Interaction over MoQ"* was submitted **June 29 2026** by **Yanmei Liu (Alibaba Inc.)** and **Dapeng Liu (Alibaba Cloud)** — the second Alibaba MoQ artifact alongside the [[xquic-moq|XQUIC]] implementation. It is a **pure application profile**: it adds no transport-layer mechanism, instead defining **semantic conventions** for mapping a live conversational AI session onto [[moq-transport|MOQT]]'s object hierarchy. Brand new and not yet discussed on the WG list; logged here as a first-look pending any uptake.

**draft-liu-moq-live-agent-interaction-00** | individual submission | submitted 2026-06-29

# Authors
- Yanmei Liu (Alibaba Inc.)
- Dapeng Liu (Alibaba Cloud)

# Abstract (summary)

Defines an application-layer protocol for **real-time interactive communication between users and AI agents** over [[moq-transport|Media over QUIC Transport]]. It specifies how streaming inference outputs — **ASR transcripts, LLM tokens, and TTS audio** — map onto MOQT's object hierarchy, defines **turn-taking control with interruption (barge-in) support** for voice conversations, and establishes track-structure conventions for live agent sessions. It operates as a **pure application profile**: it does not modify underlying transport semantics.

# Key Ideas

- **Maps the conversational structure onto the MOQT data model**:
  - conversational **turns → Groups**
  - inference **steps → Subgroups**
  - **token batches → Objects**
- **Leverages MOQT primitives directly**: publish/subscribe, prioritized delivery, group-based organization, and the relay infrastructure.
- **Turn-taking + barge-in**: turn-control mechanisms with interruption support, the latency-critical requirement for natural voice conversation.
- **Relay-transparent**: because the structure is expressed in MOQT's native Group/Subgroup/Object hierarchy, relays can route AI-agent traffic correctly **without payload inspection** — no new relay behavior required.

# Why it matters

- **First MoQ + AI-agent draft** in the WG's document space — extends MoQ's framing beyond live media (video/audio/data) into **conversational AI / voice-agent** transport, a distinct application class.
- Demonstrates the **"MoQ as a reusable real-time substrate"** thesis: rather than a new wire protocol, it is a convention layer on top of the existing transport — the same "pure application profile" stance the WG has favored for keeping the core spec lean as it approaches WGLC.
- A second concrete **Alibaba** contribution to MoQ (after [[xquic-moq]]).

# Status & Caveats

- **Individual draft, -00, just submitted (June 29 2026)** — not adopted, not yet discussed on the moq@ietf.org list as of this writing.
- The wiki tracks individual drafts that are actively discussed or referenced; this one is logged as a **first-look** because it opens a new application category for MoQ. Watch for any WG-list reaction or follow-on revision.

# Related

- [[moq-transport]] — the transport this profile runs over (turns→Groups, steps→Subgroups, tokens→Objects)
- [[moq-msf]] / [[moq-cmsf]] — streaming-format layers for media payloads (this draft is an application profile, not a media container)
- [[xquic-moq]] — Alibaba's MoQ implementation
- [[subgroups-and-objects]] — the Group/Subgroup/Object data model this draft maps onto

# External Links
- [Datatracker](https://datatracker.ietf.org/doc/draft-liu-moq-live-agent-interaction/)
