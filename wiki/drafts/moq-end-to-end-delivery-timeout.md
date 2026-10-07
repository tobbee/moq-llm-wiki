---
title: "End-to-End Delivery Timeouts for MOQT"
tags: [draft, transport, extension, delivery-timeout, timestamp, individual]
date: 2026-10-07
last_updated: 2026-10-07
status: current
draft_version: "00"
ietf_url: "https://datatracker.ietf.org/doc/draft-sharma-moq-end-to-end-delivery-timeout/"
---

**draft-sharma-moq-end-to-end-delivery-timeout-00** | Individual submission | **-00 posted 2026-10-06** | 6 pages | expires 2027-04-09 | [Datatracker](https://datatracker.ietf.org/doc/draft-sharma-moq-end-to-end-delivery-timeout/)

# Authors
- [[aman-sharma|Aman Sharma]] (Meta)

# Abstract

A standards-track [[moq-transport]] extension that lets objects carry a **total delivery deadline measured from the original source**, rather than a per-hop budget that resets at every [[relays|relay]]. MOQT's existing `OBJECT_DELIVERY_TIMEOUT` / `SUBGROUP_DELIVERY_TIMEOUT` restart at each relay, so a single object can accumulate a fresh timeout at every hop and stale content can pile up delay across a multi-relay path without ever being dropped. This draft adds an **end-to-end** timeout that tracks the elapsed time since the publisher first forwarded the object, so any relay (or the final subscriber) can discard content that is already too old overall.

[[aman-sharma|Sharma]] posted it 2026-10-06 in the *"Timestamp Draft"* thread, noting it is *"based on your TIMESTAMP draft and inspired by the discussion Martin started earlier"* — i.e. it builds on the [[moq-timestamp-properties|timestamp-as-properties]] work and on [[martin-duke|Martin Duke]]'s delivery-timeout framing.

# Key Technical Details

- **END_TO_END_DELIVERY_TIMEOUT Setup Option** — negotiates the extension at session setup.
- **END_TO_END_OBJECT_DELIVERY_TIMEOUT Message Parameter** — a varint in milliseconds, carried on `SUBSCRIBE`, `SUBSCRIBE_TRACKS`, `PUBLISH`, or `REQUEST_UPDATE`.
- **Reference timestamp / reference time** — the publisher records the timestamp and local wall-clock time of the first forwarded object and uses them as the baseline. An object's deadline is then computed as `deadline = reference_time + (T − reference_timestamp) / timescale + timeout`, where `T` is the object's timestamp. No synchronized clocks are required between endpoints — each hop reasons about accumulated delay from the same reference pair.
- **Independent of the per-hop timeouts** — the draft states this timeout is independent of `OBJECT_DELIVERY_TIMEOUT` and `SUBGROUP_DELIVERY_TIMEOUT`; **the first applicable timeout to expire determines the result.**

# Relationship to other work

- **Builds on the timestamp drafts.** It consumes the object timestamp / timescale that [[moq-timestamp-properties|`draft-frindell-moq-timestamp`]] and [[moq-timestamp|`draft-lcurley-moq-timestamp`]] define as properties — a concrete example of the "factor timestamps out as a reusable property layer, then build semantics on top" approach [[alan-frindell|Frindell]] described on-list, and of the layering [[luke-curley|Luke Curley]] endorsed in the same thread.
- **Delivery-timeout lineage.** Directly continues [[martin-duke|Martin Duke]]'s long-running *"timestamps solve delivery timeout"* argument (the motivation behind [[moq-timestamp]] in June 2026) — the gap being that per-hop timeouts can't bound total source-to-sink age.
- **Implementation echo.** [[quiche-moq|google/quiche]] moqt **split `delivery_timeout` into separate subgroup and object delivery timeouts** (commit 2026-10-06), refining the per-hop timeout machinery this draft layers an end-to-end bound on top of.

# Notes

Individual submission by Aman Sharma (Meta); **not WG-adopted**. Posted 2026-10-06, the newest MoQ document on the datatracker, days before the [[interim-meetings|Oct 12–15 Seattle hybrid interim]]. See [[moq-timestamp-properties]], [[moq-timestamp]], [[moq-transport]], [[discussions-2026-10]].

# Links

- **Datatracker**: https://datatracker.ietf.org/doc/draft-sharma-moq-end-to-end-delivery-timeout/
- **Discussion**: moq@ietf.org mailing list, *"Timestamp Draft"* thread ([permalink](https://mailarchive.ietf.org/arch/msg/moq/kA2TP_PCfKOpKk-jXnaqss875rM/), announcement 2026-10-06)
