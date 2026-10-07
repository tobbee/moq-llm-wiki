---
title: "Timestamp Properties for MOQT"
tags: [draft, transport, extension, timestamp, individual]
date: 2026-10-06
last_updated: 2026-10-07
status: current
draft_version: "00"
ietf_url: "https://datatracker.ietf.org/doc/draft-frindell-moq-timestamp/"
---

**draft-frindell-moq-timestamp-00** | Individual submission | **-00 posted 2026-10-05** | 13 pages | expires 2027-04-08 | [Datatracker](https://datatracker.ietf.org/doc/draft-frindell-moq-timestamp/) · [GitHub](https://github.com/afrind/draft-frindell-moq-timestamp)

# Authors
- [[alan-frindell|Alan Frindell]] (Meta)
- [[ian-swett|Ian Swett]] (Google)

# Abstract

A standards-track [[moq-transport]] extension that defines a **reusable set of timestamp-related track and object properties** for MOQT, so that implementations do not each reinvent their own. It specifies the **properties only** — not relay behaviour — and offers compression techniques (an origin + delta encoding) to keep per-object timestamp overhead small. [[alan-frindell|Frindell]] announced it on the mailing list on 2026-10-05 (*"Timestamp Draft"*, [permalink](https://mailarchive.ietf.org/arch/msg/moq/kA2TP_PCfKOpKk-jXnaqss875rM/)), noting it builds on prior timestamp implementations and inviting feedback via the GitHub repo.

# Key Technical Details

**Four Track properties:**
- **TIMESCALE** (required) — the time unit granularity for the track's timestamps (ticks per second), so timestamps are integers rather than fractional seconds.
- **CLOCK_ID** (optional) — references a common time source, letting receivers relate timestamps across tracks/sources.
- **TIMESTAMP_ORIGIN** (optional) — a baseline for **delta encoding**, so object timestamps can be carried as small offsets rather than absolute values.
- **TIMESTAMP_MAPPING** (optional) — lets object timestamps be *computed* from object identifiers instead of carried per object.

**One Object property:**
- **OBJECT_TIMESTAMP** (optional) — a per-object adjustment or delta from the track's origin/mapping.

# Relationship to other work

- **Framed on-list (Oct-6) as a foundational property layer, not a straight rival.** The *"Timestamp Draft"* thread drew replies from [[luke-curley|Luke Curley]], [[aman-sharma|Aman Sharma]], [[cullen-jennings|Cullen Jennings]] and [[steven-riedl|Steven Riedl]] ([permalinks](https://mailarchive.ietf.org/arch/msg/moq/kA2TP_PCfKOpKk-jXnaqss875rM/)). [[alan-frindell|Frindell]] explained the strategy is to **"factor out the mechanism for conveying timestamps as properties,"** so other drafts assign *application semantics* on top — answering Cullen's "how does this compare to [[moq-tempo|Tempo]]?" by saying Tempo can **build on these properties** rather than compete with them (Suhas had pointed him to Tempo; he will add the reference in -01). [[luke-curley|Curley]] was enthusiastic about timestamps generally (a subscriber can just ask for *"anything newer than 3s"*, and a generic relay can make better caching/delivery decisions) and noted he dropped **DURATION** from his own extension in favour of a timestamped empty frame at each video group's end. [[aman-sharma|Sharma]] went further and wrote a new draft — [[moq-end-to-end-delivery-timeout|`draft-sharma-moq-end-to-end-delivery-timeout`]] — *on top of* the timestamp work. So the two drafts now read as **layerable** rather than strictly either/or.
- **Overlap with lcurley's draft.** This draft still overlaps [[moq-timestamp|`draft-lcurley-moq-timestamp`]] ([[luke-curley|Luke Curley]], -01) — both attach presentation time to MoQ objects so relays can reason about age — but differs in scope: lcurley's is a minimal **Timescale / Timestamp / Duration** triple framed on the [[moq-loc|LOC]]-registered properties, while this draft defines a **richer property set** (clock identity, a delta/origin compression scheme, and a mapping that can derive timestamps from object IDs) and is explicitly **property-only, relay-behaviour-deferred**. Which design (or a merge) the WG adopts is an open question for the Seattle interim and beyond.
- **Draft-18 property codepoints**: overlaps the existing [[moq-transport]] §15.8 `TIMESTAMP` / `TIMESCALE` property assignments and the LOC property-ID coordination work; codepoint alignment will be a question if this is taken up by the WG.
- **Delivery timeout / age-based relay decisions**: like the lcurley draft, motivated by giving relays a uniform basis for delivery-timeout and age-drop decisions without parsing the media container.

# Notes

Individual submission by Alan Frindell (Meta) and Ian Swett (Google); **not WG-adopted**. Posted 2026-10-05, nine days before the [[interim-meetings|Oct 12–15 Seattle hybrid interim]]. The draft currently specifies the properties and their compression, not how relays act on them. See [[moq-timestamp]], [[moq-transport]], [[discussions-2026-10]].

# Links

- **Datatracker**: https://datatracker.ietf.org/doc/draft-frindell-moq-timestamp/
- **GitHub**: https://github.com/afrind/draft-frindell-moq-timestamp
- **Announcement**: moq@ietf.org mailing list, *"Timestamp Draft"* (2026-10-05, [permalink](https://mailarchive.ietf.org/arch/msg/moq/kA2TP_PCfKOpKk-jXnaqss875rM/))
