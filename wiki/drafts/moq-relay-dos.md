---
title: "Relay Denial-of-Service Considerations"
tags: [draft, individual, security, relays, dos]
date: 2026-08-22
last_updated: 2026-08-22
status: current
draft_version: "01"
ietf_url: "https://datatracker.ietf.org/doc/draft-englishm-moq-relay-dos/"
---

**draft-englishm-moq-relay-dos-01** | individual submission | **-01 published 2026-07-06** | [[mike-english|Mike English]] (Cloudflare)

# Overview

Enumerates the denial-of-service surface a **MOQT relay** exposes, and the mitigations available to operators. It is the written output of the WG's **DoS design team**, whose readout [[mike-english|Mike English]] presented at the **London interim** (June 12, `interim-2026-moq-10`).

The relevance is structural: MOQT relays accept work on behalf of unauthenticated or weakly-authenticated peers — subscriptions, announcements, fetches — and each of those is an amplification or state-exhaustion opportunity. Several core-transport decisions have been made with this document's analysis in view.

# Relationship to core transport decisions

- **Switching-set DDoS negotiation properties were removed** from the SSTS design at the June-22 interim (`interim-17`) — the per-set concurrent-track and throughput limits [[gwendal-simon|Gwendal Simon]] had raised on [PR #1638](https://github.com/moq-wg/moq-transport/pull/1638). The WG chose to rely on **authorization tokens plus existing relay-side protections** instead of negotiating limits in-band. See [[switch-abr]].
- **Top-N DDoS** was a distinct concern [[cullen-jennings|Cullen Jennings]] presented at London, bearing on [[mo-zanaty|Mo Zanaty]]'s Top Tracks Filter work.
- **Authorization** is the WG's preferred first line of defence, which is why [[moq-c4m|C4M]] (CAT tokens) and [[moq-privacy-pass|Privacy Pass]] matter to the DoS story.

# Status

**Individual draft, not adopted.** Published at **-01** on 2026-07-06 as part of the coordinated post-interim-18 draft wave (alongside [[moq-loc|loc-03]], [[moq-secure-objects|secure-objects-01]], and [[moq-privacy-pass|privacy-pass-auth-03]]).

# Related

- [[relays]] — relay behaviour and topology
- [[mike-english]] — author; also operates the [[interop-runner]]
- [[moq-transport]], [[moq-c4m]], [[moq-privacy-pass]], [[switch-abr]]
