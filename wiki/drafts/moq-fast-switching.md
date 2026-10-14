---
title: "Subscriber-Side Multi-Variant Fast Track Switching for MOQT"
tags: [draft, transport, abr, switch, media, individual]
date: 2026-10-14
last_updated: 2026-10-14
status: current
draft_version: "00"
ietf_url: "https://datatracker.ietf.org/doc/draft-ugur-moq-fast-switching/"
---

**draft-ugur-moq-fast-switching-00** | Individual submission | **-00 posted 2026-10-13** | 13 pages | Standards Track | [Datatracker](https://datatracker.ietf.org/doc/draft-ugur-moq-fast-switching/)

# Authors
- Deniz Ugur (Ozyegin University)
- [[zafer-gurel|Zafer Gürel]] (Ozyegin University, [[moqtail]])
- [[ali-begen|Ali C. Begen]] (Networked Media)

# Abstract

A standards-track [[moq-transport]] technique that lets a subscriber **switch between tracks encoded at the *same* bitrate but with *different* keyframe (GoP) intervals**, getting both the compression efficiency of a long GoP and the switching responsiveness of a short GoP. The problem it addresses is a classic [[adaptive-bitrate|ABR]] tension: long GoPs compress better but force a subscriber to wait for the next keyframe before it can change renditions, while short GoPs switch fast but waste bits. This draft keeps multiple keyframe variants *per bitrate* and lets the subscriber pick the variant that makes the next switch happen soonest — then fall back to the efficient long-GoP variant once it has caught up.

# Key Technical Details

- **Switch Sets and the GoP Ladder.** A publisher packages related tracks into a **"Switch Set"** identified by a common **`altGroup`** identifier. Within a single bitrate, a **"GoP Ladder"** holds several tracks that differ *only* in keyframe interval. Publishers **advertise keyframe spacing in the catalog**, so a subscriber can reason about switch opportunities without decoding.
- **Aligned Group IDs → comparable Frame Numbers.** Tracks in a Switch Set **align their Group IDs**, which lets a subscriber compute a **Frame Number that is comparable across every track in the set**. That shared coordinate is what makes a clean cross-track switch point identifiable.
- **Subscriber-side switch-point computation.** The subscriber (not the publisher) **computes the optimal switch point** — the earliest aligned boundary at which the target track has a keyframe — and executes the transition with a `SUBSCRIBE` or `REQUEST_UPDATE` carrying the **`SWITCH_FROM` soft-mode parameter** targeting that point. This reuses the existing [[switch-abr|SWITCH_FROM]] mechanism rather than inventing a new control message.
- **Combines long- and short-GoP strengths.** By keeping both a long-GoP (efficient) and short-GoP (agile) variant at each bitrate and switching into the short variant only when a fast change is needed, the client gets responsive adaptation without paying the steady-state bitrate cost of universally short GoPs.

# Relationship to other work

- **A media / ABR building block built on SWITCH_FROM.** It is an explicit client-driven use of the [[switch-abr|SWITCH_FROM soft-mode]] parameter that the WG settled in June 2026, extended to the *keyframe-interval* dimension rather than just the bitrate dimension — squarely in the wiki's media focus area. Where [[moq-probing]] measures *whether* a hop can carry more, this draft governs *how* to move between representations once that decision is made.
- **Adjacent to the live track-selection debate.** `SWITCH_FROM` is one of the three mechanisms [[cullen-jennings|Cullen Jennings]]'s [#1982](https://github.com/moq-wg/moq-transport/pull/1982) ("selection sets and policy") proposes to unify (alongside Top-N and SSTS; see also [[mo-zanaty|Mo Zanaty]]'s Top-Tracks-Filter [#1981](https://github.com/moq-wg/moq-transport/pull/1981)) — so this draft is a concrete consumer of exactly the primitive that debate is reshaping, posted during the same [[interim-meetings|Seattle interim]].
- **Authored by the [[moqtail]] / Ozyegin team.** Deniz Ugur, [[zafer-gurel|Zafer Gürel]] and [[ali-begen|Ali C. Begen]] — the second media-focused individual input from this group this week, right after [[moq-probing|`draft-gurel-moq-probing-00`]] (Oct-12). It is now the newest MoQ document on the datatracker (Oct-13).

# Notes

Individual submission by Deniz Ugur, Zafer Gürel and Ali C. Begen; **not WG-adopted**. Posted 2026-10-13, during the [[interim-meetings|Oct 12–15 Seattle hybrid interim]]. See [[adaptive-bitrate]], [[switch-abr]], [[moq-transport]], [[moq-probing]], [[moqtail]], [[catalog-format]], [[discussions-2026-10]].

# Links

- **Datatracker**: https://datatracker.ietf.org/doc/draft-ugur-moq-fast-switching/
