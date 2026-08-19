---
title: "Conditional Range Filters for MOQT"
tags: [draft, individual, filters, congestion, nokia]
date: 2026-08-19
last_updated: 2026-08-19
status: current
draft_version: "00"
ietf_url: "https://datatracker.ietf.org/doc/draft-yuyou-conditional-filtering/"
---

> **2026-08-19**: **First-look — a new individual I-D lets a relay switch media filters *on its own* in response to real-time network conditions, rather than waiting for the subscriber to re-signal.** **`draft-yuyou-conditional-filtering-00`** *"Conditional Range Filters for Media over QUIC Transport"* was submitted to the datatracker **2026-08-17** and announced on **moq@ietf.org Aug-18 07:40 UTC** ([permalink](https://mailarchive.ietf.org/arch/msg/moq/vHEvOh5TZNbj1CTai8HzfOWY66o/)) by **[[yu-you|Yu You]] (Nokia)**. Individual draft, not adopted. It is Nokia's first individual MoQ I-D and grows directly out of their relay-side filter-implementation work — the Aug-17 implementer-feedback comment on [[mo-zanaty|Mo Zanaty]]'s open [Top Tracks Filter PR #1830](https://github.com/moq-wg/moq-transport/pull/1830) and the Aug-3 [[discussions-2026-08|DATAGRAM-fragmentation]] design thread. See [[discussions-2026-08]].

**draft-yuyou-conditional-filtering-00** | individual submission | submitted 2026-08-17, rev -00 | announced to moq@ietf.org 2026-08-18

# Authors
- Yu You (Nokia)

# Abstract (summary)

Proposes making [[moq-transport|MOQT]]'s range filters **conditional** so a relay can activate or deactivate a filter set autonomously based on real-time metrics, instead of the subscriber having to send an explicit `REQUEST_UPDATE` each time conditions change. The draft argues today's filters are **static** — changing them requires subscriber signaling, which is slow to react precisely when it matters most (during congestion). It adds a new **`RANGE_FILTER_CONDITION`** parameter that binds a filter set to a trigger (e.g. a throughput threshold), and a **`PRIOR_SUBGROUP_ID_GAP`** signal so a subscriber can tell an intentional filter-induced gap from genuine network loss. The mechanism is designed to stay compatible with the existing SetID-based filters.

# Key Ideas

- **`RANGE_FILTER_CONDITION` parameter.** Attaches a real-time condition (such as a measured-throughput threshold) to a filter set. When the condition is met, the relay activates or deactivates that filter **without** a further subscriber round-trip — cutting reaction latency under congestion.
- **Relay-autonomous filtering.** Moves the "when to shed which tracks/ranges" decision closer to where the congestion is observed (the relay), rather than round-tripping every change back through the subscriber via `REQUEST_UPDATE`.
- **`PRIOR_SUBGROUP_ID_GAP`.** A companion signal that lets subscribers distinguish an *intentional* gap in delivered subgroups (because a conditional filter deactivated a set) from *network loss* — so the receiver does not misread deliberate shedding as an error.
- **Compatible with existing SetID filters.** Layered on top of the current filter design rather than replacing it, so it can coexist with static SetID-based filtering.

# Why it matters

- **A congestion-reactive complement to the WG's filter work.** The WG has been building out static filters — Location filters, [[mo-zanaty|Mo Zanaty]]'s [Top Tracks Filter #1830](https://github.com/moq-wg/moq-transport/pull/1830), the split-filters-out-of-core-transport direction from IETF-126. This draft argues the *dynamics* of switching filters under load need their own mechanism, and proposes one.
- **Implementer-driven.** It comes straight from Nokia's relay implementation experience: Yu You raised the Aug-17 clarification request while implementing the Top Tracks Filter *"in our Relay,"* and had earlier driven the Aug-3 DATAGRAM object-fragmentation thread. This is feedback from building a relay turning into a spec proposal.
- **Nokia's first individual MoQ draft.** Nokia has been an active WG-thread and interop participant (the Vienna Hackathon draft-18 conformance relay, the DATAGRAM-fragmentation discussion), but this is their first authored individual I-D in the MoQ space.

# Status & Caveats

- **Individual draft at -00** (submitted 2026-08-17, announced 2026-08-18) — not adopted, no WG call for adoption.
- The wiki tracks individual drafts that are actively discussed or tied to WG work; this is logged as a **first-look** because it proposes a concrete new filter-signaling mechanism directly adjacent to the WG's live filter discussions. Watch for WG-list reaction, referencing implementations, or a relationship to the Top Tracks / Location filter PRs.

# Related

- [[moq-transport]] — the transport whose range filters this draft makes conditional
- [[yu-you]] — the author (Nokia); see also the Aug-3 DATAGRAM-fragmentation and Aug-17 Top-Tracks-Filter threads
- [[discussions-2026-08]] — the August discussion digest where the announcement and the related filter-PR feedback are recorded

# External Links
- [Datatracker](https://datatracker.ietf.org/doc/draft-yuyou-conditional-filtering/)
- [Announcement on moq@ietf.org (Aug-18)](https://mailarchive.ietf.org/arch/msg/moq/vHEvOh5TZNbj1CTai8HzfOWY66o/)
