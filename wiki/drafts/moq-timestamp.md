---
title: "MoQ Object Timestamp Extension"
tags: [draft, transport, extension, timestamp, individual]
date: 2026-06-13
last_updated: 2026-06-13
status: current
draft_version: 0
ietf_url: "https://datatracker.ietf.org/doc/draft-lcurley-moq-timestamp/"
---

> **2026-06-13**: **New individual I-D — `draft-lcurley-moq-timestamp-00` posted June 12 2026** by [[luke-curley|Luke Curley]] (expires Dec 14 2026), out of the formal London interim. It lifts the per-frame timestamp+duration carriage Luke merged on the moq-lite-05 wire ([[moq-dev|moq-dev/moq]] [PR #1681](https://github.com/moq-dev/moq/pull/1681), June 12) into a **portable, container-agnostic [[moq-transport]] extension**: a track-level **Timescale** property + an object-level **Timestamp** property + an optional **Duration** property, so that **relays can make consistent age-based drop/timeout decisions without parsing the media container**. It is the concrete spec behind [[martin-duke|Martin Duke]]'s June-12 mailing-list thread *"How timestamps totally solve delivery timeout"* — the same delivery-timeout question behind the June-11 close of moq-transport [Issue #1489](https://github.com/moq-wg/moq-transport/issues/1489) and the long-running `TIMESTAMP` / `SUBGROUP_DELIVERY_TIMEOUT` property work in draft-18 §15.8. Individual submission, not yet WG-adopted. See [[discussions-2026-06]], [[moq-transport]], [[moq-dev]].

**draft-lcurley-moq-timestamp-00** | Individual submission | Posted 2026-06-12 | Expires 2026-12-14 | [Datatracker](https://datatracker.ietf.org/doc/draft-lcurley-moq-timestamp/)

# Authors
- [[luke-curley|Luke Curley]]

# Abstract

This extension for [[moq-transport]] defines how to attach **media presentation timestamps and durations to objects**. Without a common timestamp, intermediate [[relays]] cannot reason about object age uniformly — buffering, jitter, and clock differences mean each hop might drop or time out objects inconsistently. By carrying a timestamp on the object itself, every relay along the path makes the **same age-based decision** (drop, prioritize, or apply a delivery timeout) regardless of where it sits, and **without having to parse the media payload / container** to recover timing.

# Key Technical Details

Three key-value pairs:

- **Timescale** (track-level property) — establishes the time unit for timestamps on the track (e.g. ticks per second), so timestamps are integers rather than fractional seconds.
- **Timestamp** (object-level property) — the object's presentation time, in `Timescale` units.
- **Duration** (object-level property, optional) — how long the object's media is presented for.

Because timing lives in transport-layer properties rather than inside the codec/container payload, the extension is **container-agnostic**: it works the same whether the payload is [[moq-loc|LOC]], CMAF, or any other packaging, and a relay never needs to crack open the media to apply age-based logic.

# Relationship to other work

- **moq-lite-05 wire (implementation precursor)**: [[moq-dev|moq-dev/moq]] [PR #1681](https://github.com/moq-dev/moq/pull/1681) (MERGED June 12) already carries per-frame **timestamp + duration** on the moq-lite-05 FRAME wire and negotiates lite-05 by default. This I-D is the standards-track, [[moq-transport]]-extension form of that change.
- **Delivery timeout**: directly motivated by [[martin-duke|Martin Duke]]'s *"How timestamps totally solve delivery timeout"* list thread (June 12) — object timestamps give relays a uniform basis for delivery-timeout / age-drop decisions, the gap behind moq-transport [Issue #1489](https://github.com/moq-wg/moq-transport/issues/1489) (Reconnect/delivery timeout, CLOSED June 11).
- **Draft-18 property codepoints**: overlaps the existing draft-18 `TIMESTAMP` (0x06) / `TIMESCALE` (0x08) property assignments in [[moq-transport]] §15.8 and the [[moq-loc|LOC]] property-ID coordination dispute ([moq-wg/loc Issue #20](https://github.com/moq-wg/loc/issues/20)) — codepoint alignment will be a question if/when this is taken up by the WG.

# Notes

This is an individual submission by Luke Curley (not yet adopted by the MOQ working group). Posted June 12 2026 during the formal London interim. It is one of several Luke Curley individual drafts ([[moq-lite]], [[compressed-mp4]]) that prototype mechanisms first in the moq-dev/moq stack and then surface as portable transport extensions.

# Links

- **Datatracker**: https://datatracker.ietf.org/doc/draft-lcurley-moq-timestamp/
- **Discussion**: moq@ietf.org mailing list (*"How timestamps totally solve delivery timeout"*, June 12 2026)
