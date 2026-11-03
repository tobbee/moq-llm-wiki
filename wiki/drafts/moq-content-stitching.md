---
title: "Content Stitching for Media over QUIC"
tags: [draft, individual, media, relays, caching, ad-insertion]
date: 2026-11-03
last_updated: 2026-11-03
status: current
draft_version: "00"
ietf_url: "https://datatracker.ietf.org/doc/draft-englishm-moq-content-stitching/"
---

**draft-englishm-moq-content-stitching-00** | Individual submission | **-00 posted 2026-11-02** (IETF 127 deadline) | 11 pages | expires 2027-05-06 | [Datatracker](https://datatracker.ietf.org/doc/draft-englishm-moq-content-stitching/)

# Authors
- [[mike-english|Mike English]] (Cloudflare)

# Abstract

MOQT requires an Object to be the **same bytes wherever it is fetched**, and two different tracks in the same scope to have different names. That is what lets a relay serve any subscriber from cache. It also means that when audiences need different content (ad substitution, blackouts, regional or personalised variants), the simple approach of one complete track per variant **multiplies cache footprint by the number of variants**, even when most objects are shared. HTTP streaming solves this in the manifest. MOQT has no manifest in the delivery path, and request parameters don't change what a track contains.

**Content stitching** builds the tracks subscribers receive (**composed tracks**) out of objects taken from other (**ingredient**) tracks, following an application-defined **recipe** that may react to **signals**. Shared objects are then cached once while each audience still gets a track of its own.

# Key Ideas

- **A stitcher is an Application, not a Relay.** It is the Original Publisher of the composed track and an End Subscriber of each ingredient. It will often run next to a relay, because that is where the ingredients are already cached. English says this is explicitly **not an expectation of MOQT relays**.
- **Identity and numbering**: a composed track has its own Full Track Name. The stitcher assigns its Group/Subgroup/Object IDs, priorities and Object Properties, which need not match the ingredients, though Group IDs must still increase with time. Because objects are immutable, **every decision about an object must be made before it is published**.
- The draft also covers where the uniqueness lives (in the objects or only in the recipe), transitions between ingredients, Object Properties, signal lead time, placement and cost, and how composed tracks get created. Its examples cover substituting a span of groups, responding to a signal, and composing individual objects.
- **Deliberately vocabulary-only for now.** It does **not** define stitcher configuration, signal carriage or a composition format. Those could be standardised later if implementations need to interoperate on them.

# Relationship to other work

- **Ad insertion over MoQ**: complements [[steven-riedl|Riedl]]'s SCTE-35 and ad-creative signalling on the [[moq-msf|MSF]] Event Timeline (`draft-riedl-moq-ad-creative-signaling-01`, also seeking IETF 127 time). Those drafts carry signals that a stitcher could act on, and the Pluto TV/Paramount `stitcher-moq` endpoint in the [[interop-runner]] is a working stitcher.
- **Relay caching model**: relies on the object-immutability and naming rules in [[moq-transport]] §2. It does not propose any change to relays. See [[relays]].

# Notes

Individual submission; **not WG-adopted**. English announced it on the list (Nov-2, *"Fwd: New Version Notification for draft-englishm-moq-content-stitching-00.txt"*) as *"intentionally mostly vocabulary for now"* and asked for feedback on framing and terminology. See [[discussions-2026-11]].

# Links

- **Datatracker**: https://datatracker.ietf.org/doc/draft-englishm-moq-content-stitching/
- **Announcement**: moq@ietf.org (2026-11-02, [permalink](https://mailarchive.ietf.org/arch/msg/moq/xIStU_6vp52VvdN5ccvLBbw7QXA/))
