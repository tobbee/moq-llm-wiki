---
title: "TEMPO - Timing Extension for Media Playout Orchestration"
tags: [draft, timing, synchronization, individual]
date: 2026-07-08
last_updated: 2026-07-08
status: current
draft_version: "00"
ietf_url: "https://datatracker.ietf.org/doc/draft-nandakumar-moq-tempo/"
---

> **2026-07-08**: **`draft-nandakumar-moq-tempo-00` surfaces (submitted July 6, 14 pp; [[suhas-nandakumar|Suhas Nandakumar]] + [[cullen-jennings|Cullen Jennings]], Cisco) — a synchronized-playout mechanism for MoQ media tracks, and the timing companion to the Cisco [[moq-mocha|MOCHA]] suite.** The draft was published July 6 (same day as the transport-19 draft wave) but only surfaces in the wiki now, backing [[suhas-nandakumar|Suhas]]'s July-7 IETF-126 agenda request (*"Agenda Time Request : MoQ Tempo Draft"*). **Mechanism**: the **Original Publisher** stamps each Object with *when it should be played out* and *when it was sent*; **relays replace the send-time stamp with their own clock** as they forward, so each subscriber gets a fresh timing reference from its nearest relay; **subscribers** use these timestamps to decide when to render each Object and **report their sync state to a coordination server (`PlaySyncServer`)**, which can tell the media publisher to adjust timing when subscribers fall behind. This is the *distributed-audience synchronized playout* problem (watch parties, second-screen, live-event sync) expressed natively in MoQ terms — related to but distinct from [[luke-curley|Luke Curley]]'s [[moq-timestamp|Object Timestamp Extension]] (age-based *relay* decisions) in that TEMPO targets end-to-end *playout* coordination with a feedback loop. Individual draft, not yet WG-adopted or discussed; an IETF-126 (Vienna) agenda candidate. See [[moq-mocha]], [[interim-meetings]], [[discussions-2026-07]].

**draft-nandakumar-moq-tempo-00** | 14 pages | Submitted 2026-07-06 | [Datatracker](https://datatracker.ietf.org/doc/draft-nandakumar-moq-tempo/)

# Authors
- [[suhas-nandakumar|Suhas Nandakumar]] (Cisco)
- [[cullen-jennings|Cullen Jennings]] (Cisco)

# Abstract

TEMPO (Timing Extension for Media Playout Orchestration) defines a synchronized playout mechanism for media tracks delivered over [[moq-transport|MoQT]]. Each Object carries a desired playout time and a send time; relays rewrite the send time with their own clock on forwarding; subscribers use the pair to schedule rendering and report their sync state to a `PlaySyncServer` coordination server, which instructs the publisher to adjust timing when subscribers drift.

# Mechanism

1. **Publisher stamping** — the Original Publisher annotates each Object with *desired playout time* + *send time* (capture-relative timing metadata).
2. **Relay rewrite** — each relay replaces the send-time stamp with its own clock as it forwards, giving every subscriber a timing reference anchored to its *nearest* relay (removing accumulated upstream path delay from the subscriber's local calculation).
3. **Subscriber scheduling** — subscribers compute when to render each Object from the (playout, send) pair.
4. **Feedback loop** — subscribers report sync state to a `PlaySyncServer`; when subscribers fall behind, the server tells the media publisher to adjust timing to re-converge the audience.

# Relationship to other work

- **[[moq-timestamp|Object Timestamp Extension]]** ([[luke-curley|Luke Curley]]) — carries Timescale/Timestamp/Duration for *age-based relay* drop/forward decisions; TEMPO instead targets *end-to-end playout* coordination across a distributed audience with an explicit coordination server.
- **[[moq-mocha|MOCHA]]** — TEMPO is the timing/synchronization companion to the Cisco MOCHA real-time-communication suite (both authored by Nandakumar + Jennings, both published July 6).

# Related
- [[moq-transport]] — base transport
- [[moq-mocha]] — MOCHA RTC suite (same authors)
- [[moq-timestamp]] — Object Timestamp Extension
