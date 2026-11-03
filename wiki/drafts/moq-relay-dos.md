---
title: "Relay Denial-of-Service Considerations"
tags: [draft, individual, security, relays, dos]
date: 2026-08-22
last_updated: 2026-11-03
status: current
draft_version: "02"
ietf_url: "https://datatracker.ietf.org/doc/draft-englishm-moq-relay-dos/"
---

**draft-englishm-moq-relay-dos-02** | individual submission | **-02 published 2026-11-03** (00:06 UTC, just after the IETF 127 cutoff day; -01 2026-07-06) | 20 pages | [[mike-english|Mike English]] (Cloudflare)

# Overview

Enumerates the denial-of-service surface a **MOQT relay** exposes, and the mitigations available to operators. It is the written output of the WG's **DoS design team**, whose readout [[mike-english|Mike English]] presented at the **London interim** (June 12, `interim-2026-moq-10`).

The relevance is structural: MOQT relays accept work on behalf of unauthenticated or weakly-authenticated peers — subscriptions, announcements, fetches — and each of those is an amplification or state-exhaustion opportunity. Several core-transport decisions have been made with this document's analysis in view.

# Relationship to core transport decisions

- **Switching-set DDoS negotiation properties were removed** from the SSTS design at the June-22 interim (`interim-17`) — the per-set concurrent-track and throughput limits [[gwendal-simon|Gwendal Simon]] had raised on [PR #1638](https://github.com/moq-wg/moq-transport/pull/1638). The WG chose to rely on **authorization tokens plus existing relay-side protections** instead of negotiating limits in-band. See [[switch-abr]].
- **Top-N DDoS** was a distinct concern [[cullen-jennings|Cullen Jennings]] presented at London, bearing on [[mo-zanaty|Mo Zanaty]]'s Top Tracks Filter work.
- **Authorization** is the WG's preferred first line of defence, which is why [[moq-c4m|C4M]] (CAT tokens) and [[moq-privacy-pass|Privacy Pass]] matter to the DoS story.

# Status

- **-02 (2026-11-03).** The document is now organised around a threat model (misbehaving subscriber, publisher and relay; amplification properties), control-plane costs (authoritative state, rapid request cycles and update coalescing, namespace-advertisement flooding), data-plane costs (slow subscribers, join-time buffering, unknown Track Aliases, flow-control limits), relay dual-role issues (resource isolation, upstream protection, paused subscriptions, multi-publisher fan-out), and operational guidance. A new section, *Tracking Protocol Load-Bearing Mitigations*, tabulates which MOQT limits the relay's defences depend on, such as **fill counts and the FILL_TIMEOUT budget**. It also covers **GOAWAY-redirect abuse**: a compromised server could point many clients at a victim. [[aman-sharma|Sharma]]'s transport [PR #2050](https://github.com/moq-wg/moq-transport/pull/2050) (make GOAWAY redirection optional and authorize destinations) addresses relay-dos issue #4. [[mike-english|English]] asked for 25 minutes at IETF 127 (10 to present, 15 to discuss) on the open fill-fetch and GOAWAY-redirect questions.

**Individual draft, not adopted.** Published at **-01** on 2026-07-06 as part of the coordinated post-interim-18 draft wave (alongside [[moq-loc|loc-03]], [[moq-secure-objects|secure-objects-01]], and [[moq-privacy-pass|privacy-pass-auth-03]]).

# Related

- [[relays]] — relay behaviour and topology
- [[mike-english]] — author; also operates the [[interop-runner]]
- [[moq-transport]], [[moq-c4m]], [[moq-privacy-pass]], [[switch-abr]]
