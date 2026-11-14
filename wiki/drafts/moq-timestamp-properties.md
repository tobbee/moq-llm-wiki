---
title: "Timestamp Properties for MOQT"
tags: [draft, transport, extension, timestamp, individual]
date: 2026-10-06
last_updated: 2026-11-14
status: current
draft_version: "01"
ietf_url: "https://datatracker.ietf.org/doc/draft-frindell-moq-timestamp/"
---

**draft-frindell-moq-timestamp-01** | Individual submission | **-01 posted 2026-11-02** (IETF 127 deadline; -00 2026-10-05) | 15 pages | expires 2027-05-06 | [Datatracker](https://datatracker.ietf.org/doc/draft-frindell-moq-timestamp/) · [GitHub](https://github.com/afrind/draft-frindell-moq-timestamp)

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

- **First detailed WG review of -01 (list, Nov-13), ahead of IETF 127.** [[magnus-westerlund|Magnus Westerlund]] opened *"Comments on draft-frindell-moq-timestamp-01"* with three points: (1) a single Object may need **multiple distinct timestamps** — original sampling time, original transmission time (to judge cross-relay delay), proposed playout time, and a relative playout timescale — so a timestamp's **purpose should be encoded** and scope its properties; (2) the **TAI clock zero point** is defined relative to UTC rather than TAI's true 1958 epoch; (3) the **timestamp origin** needs more thought on rounding error (a 16 kHz media clock can only place a start time to ~1/32000 s) and on varint wrapping (a timescale above ~2³⁴ ticks/s wraps at a present-day origin). [[alan-frindell|Frindell]] agreed the mechanism is meant to let **other specs layer additional timestamps** (e.g. playout) as zig-zag-encoded offsets from the transport TIMESTAMP, called the TAI zero "likely an oversight," and said he is "loath to allow numbers greater than 64 bits" — suggesting high-precision apps define a second fine-granularity property while using the draft's TIMESCALE for the coarse unit. [[gwendal-simon|Gwendal Simon]] defended the TAI zero as **intentional**: his issue #10 requested the **1970 PTP epoch** because it matches IEEE 1588 / SMPTE ST 2059 and Linux `CLOCK_TAI` (a publisher can stamp from PTP with **no offset**), and a later epoch would gain only ~2.5 bits of wrap headroom while the driving use case (MPEG-2 TS emission time) needs only ~2²⁴·⁷ ticks/s. See [[discussions-2026-11]].
- **Framed on-list (Oct-6) as a foundational property layer, not a straight rival.** The *"Timestamp Draft"* thread drew replies from [[luke-curley|Luke Curley]], [[aman-sharma|Aman Sharma]], [[cullen-jennings|Cullen Jennings]] and [[steven-riedl|Steven Riedl]] ([permalinks](https://mailarchive.ietf.org/arch/msg/moq/kA2TP_PCfKOpKk-jXnaqss875rM/)). [[alan-frindell|Frindell]] explained the strategy is to **"factor out the mechanism for conveying timestamps as properties,"** so other drafts assign *application semantics* on top — answering Cullen's "how does this compare to [[moq-tempo|Tempo]]?" by saying Tempo can **build on these properties** rather than compete with them (Suhas had pointed him to Tempo; he will add the reference in -01). [[luke-curley|Curley]] was enthusiastic about timestamps generally (a subscriber can just ask for *"anything newer than 3s"*, and a generic relay can make better caching/delivery decisions) and noted he dropped **DURATION** from his own extension in favour of a timestamped empty frame at each video group's end. [[aman-sharma|Sharma]] went further and wrote a new draft — [[moq-end-to-end-delivery-timeout|`draft-sharma-moq-end-to-end-delivery-timeout`]] — *on top of* the timestamp work. So the two drafts now read as **layerable** rather than strictly either/or.
- **Overlap with lcurley's draft.** This draft still overlaps [[moq-timestamp|`draft-lcurley-moq-timestamp`]] ([[luke-curley|Luke Curley]], -01) — both attach presentation time to MoQ objects so relays can reason about age — but differs in scope: lcurley's is a minimal **Timescale / Timestamp / Duration** triple framed on the [[moq-loc|LOC]]-registered properties, while this draft defines a **richer property set** (clock identity, a delta/origin compression scheme, and a mapping that can derive timestamps from object IDs) and is explicitly **property-only, relay-behaviour-deferred**. Which design (or a merge) the WG adopts is an open question for the Seattle interim and beyond.
- **Draft-18 property codepoints**: overlaps the existing [[moq-transport]] §15.8 `TIMESTAMP` / `TIMESCALE` property assignments and the LOC property-ID coordination work; codepoint alignment will be a question if this is taken up by the WG.
- **Delivery timeout / age-based relay decisions**: like the lcurley draft, motivated by giving relays a uniform basis for delivery-timeout and age-drop decisions without parsing the media container.

# Notes

**-01 (2026-11-02).** It still defines the four Track properties (TIMESCALE, CLOCK_ID, TIMESTAMP_ORIGIN, TIMESTAMP_MAPPING) and OBJECT_TIMESTAMP. It has sections on locating Objects by time, publisher restarts and defining additional timestamps, and creates a **MOQ Clock IDs** IANA registry. Note: LOC-05 registers its own TIMESCALE (0x08) and TIMESTAMP (0x10), so codepoint alignment with [[moq-loc]] remains an open question.


Individual submission by Alan Frindell (Meta) and Ian Swett (Google); **not WG-adopted**. Posted 2026-10-05, nine days before the [[interim-meetings|Oct 12–15 Seattle hybrid interim]]. The draft currently specifies the properties and their compression, not how relays act on them. See [[moq-timestamp]], [[moq-transport]], [[discussions-2026-10]].

# Links

- **Datatracker**: https://datatracker.ietf.org/doc/draft-frindell-moq-timestamp/
- **GitHub**: https://github.com/afrind/draft-frindell-moq-timestamp
- **Announcement**: moq@ietf.org mailing list, *"Timestamp Draft"* (2026-10-05, [permalink](https://mailarchive.ietf.org/arch/msg/moq/kA2TP_PCfKOpKk-jXnaqss875rM/))
