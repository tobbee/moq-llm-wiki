---
title: "Subscription Flow Control Extension for MOQT"
tags: [draft, transport, extension, flow-control, individual]
date: 2026-10-08
last_updated: 2026-10-08
status: current
draft_version: "00"
ietf_url: "https://datatracker.ietf.org/doc/draft-frindell-moq-subscription-flow-control/"
---

**draft-frindell-moq-subscription-flow-control-00** | Individual submission | **-00 posted 2026-10-07** | 12 pages | Standards Track | expires 2027-04-10 | [Datatracker](https://datatracker.ietf.org/doc/draft-frindell-moq-subscription-flow-control/)

# Authors
- [[alan-frindell|Alan Frindell]] (Meta, editor)
- [[ian-swett|Ian Swett]] (Google, editor)

# Abstract

A standards-track [[moq-transport]] extension that adds **subscription-level flow control** to MOQT. QUIC and WebTransport already provide per-stream and per-session flow control, but a single MOQT subscription can fan out across *many* subgroup streams, and today a subscriber has no way to bound the total streams or bytes a publisher may open for one subscription. This leaves a subscriber (or a relay acting as subscriber) exposed to resource exhaustion when a publisher — buggy or malicious — sends excessive streams or data for a single subscription. The extension lets the subscriber advertise, and dynamically raise, explicit limits that span the whole subscription.

# Key Technical Details

- **SUBSCRIPTION_FLOW_CONTROL Setup Option** — negotiated at session setup; carries the initial per-subscription limits.
- **MAX_SUB_STREAMS** — caps the total number of subgroup streams a publisher may open for a subscription.
- **MAX_SUB_BYTES** — caps the cumulative bytes across all of a subscription's streams.
- **SUB_FLOW_CONTROL_UPDATE** — the subscriber's credit-grant message, raising `MAX_SUB_STREAMS` / `MAX_SUB_BYTES` as it drains buffers (the subscription analogue of QUIC's `MAX_STREAMS` / `MAX_DATA`).
- **SUB_STREAMS_BLOCKED / SUB_BYTES_BLOCKED** — the publisher's "I've hit the limit" signals, mirroring QUIC's `STREAMS_BLOCKED` / `DATA_BLOCKED`.
- **Stream Sequence field** in subgroup headers — a per-subscription stream index so both ends can account streams unambiguously against the stream limit.
- **SUBGROUP_RESET** — reports the final byte count of a reset stream so byte accounting stays exact when a subgroup is abandoned.

# Relationship to other work

- **Same authors, adjacent problem.** [[alan-frindell|Frindell]] and [[ian-swett|Swett]] are also the authors of [[moq-timestamp-properties|`draft-frindell-moq-timestamp`]] (Oct-5); this flow-control draft is the second individual extension the pair has lined up for the [[interim-meetings|Seattle interim]]. Where the timestamp draft factors out *properties*, this one factors out *resource limits* that a subscription needs beyond transport-layer flow control.
- **Part of the early-October drafts flurry.** It is the **fourth individual MoQ draft in a week** — after [[moq-timestamp|`draft-lcurley-moq-timestamp`]], [[moq-timestamp-properties|`draft-frindell-moq-timestamp`]] and [[moq-end-to-end-delivery-timeout|`draft-sharma-moq-end-to-end-delivery-timeout`]] — and is now the **newest MoQ document on the datatracker** (Oct-7, ahead of Sharma's Oct-6 submission).
- **DoS / relay-resilience lineage.** Bounding what a publisher can push per subscription is the same resource-protection concern as the relay-DoS work ([[moq-relay-dos]]) and the EXCESSIVE_LOAD / TOO_FAR_BEHIND shedding relays already implement — but applied at subscription granularity rather than per-connection.

# Notes

Individual submission by Alan Frindell (Meta) and Ian Swett (Google); **not WG-adopted**. Posted 2026-10-07, days before the [[interim-meetings|Oct 12–15 Seattle hybrid interim]]. No on-list announcement thread had appeared by the Oct-8 wiki sweep. See [[moq-timestamp-properties]], [[moq-end-to-end-delivery-timeout]], [[moq-transport]], [[discussions-2026-10]].

# Links

- **Datatracker**: https://datatracker.ietf.org/doc/draft-frindell-moq-subscription-flow-control/
