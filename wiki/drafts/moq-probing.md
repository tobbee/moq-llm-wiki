---
title: "Probe Tracks for Bandwidth Estimation in MoQ Transport"
tags: [draft, transport, bandwidth-estimation, abr, media, individual]
date: 2026-10-13
last_updated: 2026-10-13
status: current
draft_version: "00"
ietf_url: "https://datatracker.ietf.org/doc/draft-gurel-moq-probing/"
---

**draft-gurel-moq-probing-00** | Individual submission | **-00 posted 2026-10-12** | 27 pages | Standards Track | [Datatracker](https://datatracker.ietf.org/doc/draft-gurel-moq-probing/)

# Authors
- [[zafer-gurel|Zafer Gürel]] ([[moqtail]])
- [[ali-begen|Ali C. Begen]]
- Deniz Ugur

# Abstract

A standards-track [[moq-transport]] extension that defines **probe tracks** — synthetic, on-demand media streams a MoQT endpoint uses to **measure the available bandwidth on a single connection hop** before switching to a higher-quality representation. The problem it solves is fundamental to [[adaptive-bitrate|adaptive delivery]]: a subscriber receiving a 1 Mbps track only ever learns that *at least* 1 Mbps is available — the throughput measurement is capped by the media's own bitrate, so it cannot tell whether a 3 Mbps rendition would sustain. Probe tracks let an endpoint deliberately generate measurable traffic at a chosen rate without perturbing the real media, and — crucially — **without the probe being cached or forwarded beyond the hop it targets**, so the measurement reflects that hop alone rather than an end-to-end path.

# Key Technical Details

- **Two probe directions.**
  - **Downlink probe** — the subscriber requests a probe via `SUBSCRIBE` in the **`(.session, .probe)`** namespace; the relay (or publisher) synthesizes objects to fill the measured capacity toward the subscriber.
  - **Uplink probe** — the publisher generates objects into the **`(.session, .sink)`** namespace; the relay consumes (sinks) them, measuring the publisher→relay hop.
- **Session-scoped, non-forwarded.** Probe tracks live under reserved session-local namespaces and are terminated at the target hop — they are never cached nor relayed onward, so a probe measures exactly one link.
- **Probe "shapes".** Probes are parameterized by a *shape* — e.g. **paced** (deliver at a target rate) or **greedy** (bulk transfer to saturate the link) — with the shape parameters encoded in the track name and **resolved deterministically by both endpoints**, so no extra negotiation message is needed.
- **Complements, not replaces, padding.** It positions relay-managed probe tracks alongside MOQT's existing object **padding** mechanism, adding an explicit, controllable measurement capability rather than relying on incidental padding.

# Relationship to other work

- **A media / ABR building block.** Bandwidth headroom estimation is the input [[switch-abr|switch-based ABR]] and [[adaptive-bitrate|rate adaptation]] need to decide *when* to step up a rendition — squarely in the wiki's media focus area. Where [[moq-subscription-flow-control]] bounds what a publisher may *push*, this draft measures what a hop can *carry*.
- **Authored by the [[moqtail]] team.** [[zafer-gurel|Zafer Gürel]] and [[ali-begen|Ali C. Begen]] maintain [[moqtail]]; this is the second Gürel-authored individual input of the week after [[moqtail]]'s draft-18/20 wire work, and it lands during the [[interim-meetings|Seattle interim]].
- **Part of the October individual-draft flurry.** It is the newest MoQ document on the datatracker (Oct-12), ahead of [[moq-discovery|`draft-jennings-moq-uri-00`]] (Oct-7), [[moq-subscription-flow-control]] (Oct-7), [[moq-end-to-end-delivery-timeout]] (Oct-6) and the two timestamp drafts.

# Notes

Individual submission by Zafer Gürel, Ali C. Begen and Deniz Ugur; **not WG-adopted**. Posted 2026-10-12, during the [[interim-meetings|Oct 12–15 Seattle hybrid interim]]. See [[adaptive-bitrate]], [[switch-abr]], [[moq-transport]], [[moqtail]], [[discussions-2026-10]].

# Links

- **Datatracker**: https://datatracker.ietf.org/doc/draft-gurel-moq-probing/
