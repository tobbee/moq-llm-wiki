---
title: "MOCHA - MoQ Open Communication & Hosting Architecture"
tags: [draft, rtc, conferencing, messaging, suite, individual]
date: 2026-07-08
last_updated: 2026-07-08
status: current
draft_version: "00"
ietf_url: "https://datatracker.ietf.org/doc/draft-jennings-moq-mocha-chat/"
---

> **2026-07-08**: **A six-part Cisco individual-draft suite — MOCHA ("MoQ Open Communication & Hosting Architecture") — surfaces (all `-00`, submitted July 6; [[cullen-jennings|Cullen Jennings]] + [[suhas-nandakumar|Suhas Nandakumar]], Cisco), building a full real-time-communication platform (chat, meetings, identity, MLS keying, reactions, address book) on top of [[moq-transport|MoQT]] publish/subscribe.** The drafts were published July 6 (alongside the transport-19 wave) but only surface in the wiki now, backing [[cullen-jennings|Cullen]]'s July-7 IETF-126 agenda request (*"Re: IETF 126 Agenda requests for MoQ Mocha"*). MOCHA is the clearest signal yet of MoQ being pushed **beyond media transport into an application layer**: a decentralized conferencing/messaging architecture where **each device publishes on its own track within a channel namespace** and relays fan messages out, with **[[moq-mls|MLS]]-based end-to-end keying**, identity, meetings, and reactions layered on the same pub/sub substrate. Paired with the timing draft [[moq-tempo|TEMPO]] (same authors, same day), it stakes out a Cisco vision for MoQ as a WebRTC-adjacent RTC stack. All six are individual drafts, not WG-adopted or discussed; IETF-126 (Vienna) agenda candidates. See [[moq-tempo]], [[interim-meetings]], [[discussions-2026-07]].

**Suite of 6 individual drafts** | all `-00` | Submitted 2026-07-06 | [Datatracker (MoQ documents)](https://datatracker.ietf.org/group/moq/documents/)

# Authors
- [[cullen-jennings|Cullen Fluffy Jennings]] (Cisco)
- [[suhas-nandakumar|Suhas Nandakumar]] (Cisco)

# The suite

| Draft | Focus |
|-------|-------|
| `draft-jennings-moq-mocha-chat-00` | **MOCHA Chat: Messaging over MoQ Transport** — text messaging in channels using MoQT pub/sub; each device publishes messages on its own track within a channel namespace (decentralized production + relay fan-out); covers naming, format, causal ordering, delivery, roster management, channel discovery. |
| `draft-jennings-moq-mocha-identity-00` | Participant identity for MOCHA. |
| `draft-jennings-moq-mocha-meetings-00` | Meetings / conferencing semantics. |
| `draft-jennings-moq-mocha-mls-keying-00` | **MLS**-based end-to-end key management for MOCHA channels. |
| `draft-jennings-moq-mocha-pab-00` | Personal address book / directory. |
| `draft-jennings-moq-mocha-reactions-00` | Reactions (emoji/ephemeral signals) over MoQ. |

The chat draft references a broader **MOCHA-ARCH / MOCHA-IDENTITY** framing, indicating a coordinated architecture rather than isolated drafts.

# Architecture (as described in MOCHA Chat)

- **Per-device tracks** — each participant device publishes its own messages on a dedicated track within a shared **channel namespace**, so message production is decentralized (no central sequencer) and relays handle fan-out.
- **Causal ordering** — the chat spec defines causal-ordering guarantees over the independent per-device tracks.
- **Roster + discovery** — channel membership (roster) and channel discovery are part of the messaging layer.
- **End-to-end security** — the `mls-keying` draft supplies MLS group keying so message content is E2E-encrypted independent of relays (aligning with [[moq-secure-objects|secure-objects]]' object-level encryption philosophy).

# Significance

MOCHA is the first tracked example of MoQ being used as the substrate for a **full RTC application suite** rather than a media-delivery format. It complements — rather than competes with — the media-format drafts ([[moq-loc|LOC]], [[moq-cmsf|CMSF]], [[moq-locmaf|LOCMAF]]): those define *how media rides on MoQ*, MOCHA defines *how a communication application rides on MoQ*. Watch whether Vienna treats it as WG-relevant or purely individual/experimental.

# Related
- [[moq-transport]] — base pub/sub transport
- [[moq-tempo]] — TEMPO playout-timing draft (same authors, same day)
- [[moq-secure-objects]] — object-level E2E encryption (parallel security model)
- [[cullen-jennings]], [[suhas-nandakumar]]
