---
title: "CMSF - CMAF Compliant MOQT Streaming Format"
tags: [draft, media, cmaf, streaming-format]
date: 2026-04-10
last_updated: 2026-05-23
status: current
draft_version: "00"
ietf_url: "https://datatracker.ietf.org/doc/draft-ietf-moq-cmsf/"
---

> **2026-05-23**: **CMSF unified pipeline lands in [[moq-dev|moq-dev/moq]] via [PR #1444](https://github.com/moq-dev/moq/pull/1444) MERGED May 22 21:12 UTC** (+1278/−14, [[luke-curley|kixelated]]) — kixelated forks AWS's #1429 (which had superseded #1408), strips out-of-scope C API + caller-driven group boundaries, ships the MSF-catalog core. **Third AWS-vs-kixelated design-cycle resolution in 9 days** (#1413 close → #1408→#1429 50% shrink → #1429→#1444 33% shrink); total AWS net code in merged result is ~25-30% of original #1408 scope. **Architectural principle**: *"CMSF is CMAF with a different catalog format"* — `hang::Catalog` serves as intermediate representation, single import pipeline serializes to MSF or Hang catalog formats. **First fully-working CMSF muxer/demuxer in any tracked open-source MoQ implementation**.

**draft-ietf-moq-cmsf-00** | 9 pages | Expires 2025-12-01

# Authors
- [[will-law]] (Akamai)

# Abstract

CMSF extends [[moq-msf]] by introducing CMAF-packaged media support. It describes the syntax and semantics for adding CMAF-packaged media to MSF, enabling delivery of CMAF and LOC-compliant content over [[moq-transport]] while maintaining all existing MSF capabilities.

# Relationship to MSF and LOC

- **[[moq-msf]]** is the base streaming format
- **[[moq-loc]]** is the low-overhead container for interactive use
- **CMSF** adds CMAF packaging for traditional OTT/broadcast workflows
- All three work together: CMSF inherits MSF's catalog, timeline, ABR, and LOC support

# Design Tension

The MOQ ecosystem has two container philosophies:
1. **LOC** - Minimal overhead, WebCodecs-native, optimized for real-time
2. **CMAF** - Industry standard for OTT, broad tooling support, higher overhead

CMSF bridges this by allowing CMAF content to flow through the same MSF infrastructure alongside LOC content. [[luke-curley]]'s [compressed-mp4 proposal](https://www.ietf.org/archive/id/draft-lcurley-compressed-mp4-00.html) is another approach to reduce CMAF overhead.

See [[media-packaging]] for a full comparison.

# History

CMSF originated as **draft-law-moq-carp-00** ("CARP - a CMAF compliant implementation of WARP") submitted by [[will-law]] in November 2025. The draft was adopted by the MOQ working group and published as draft-ietf-moq-cmsf-00 in December 2025.

# ContentProtection Signaling

[PR #18](https://github.com/moq-wg/cmsf/pull/18) (merged Apr 14 by [[will-law]]) added ContentProtection signaling to the CMSF spec. The design, proposed by Torbjörn Einarsson ([[moqlivemock|Eyevinn]]), is roughly based on DASH/DASH-IF content protection signaling:

- Defines `contentProtections` as a top-level array of protection descriptors with `refID`s in the catalog
- Each encrypted track references applicable protections via a `contentProtectionRefIDs` array
- Supports the same attributes as DASH/DASH-IF: Widevine, PlayReady, FairPlay, and ECCP (clear key)
- Addresses [issue #8](https://github.com/moq-wg/cmsf/issues/8)

**Implementations**:
- [[moqlivemock]] — Running implementation with Widevine, PlayReady, and FairPlay at [moqlivemock.demo.osaas.io](https://moqlivemock.demo.osaas.io/warp-player/)
- [[shaka-player]] — [PR #9972](https://github.com/shaka-project/shaka-player/pull/9972) merged Apr 14, adding CMSF contentProtection support

Key rotation is not yet defined — future work can build on this for live catalogs with new `refID`s.

# Open Issues & PRs

- **Issue #17** (Apr 14, DenizUgur) - Explicit signalling of DRM/C2PA key-rotation or init segment updates. Proposals discussed at MSF Feb 5 meeting: (a) separate init-segment track with sync concerns, or (b) inline update signaling. Links to the broader [[moq-msf]] `initTrack` debate.
- **PR #19** (Apr 14, wilaw) - Clarify media content and group packaging requirements (fixes #12)

# Related

- [[moq-msf]] - Base streaming format
- [[moq-loc]] - Low overhead container
- [[media-packaging]] - Container format discussion

# External Links
- [GitHub repo](https://github.com/moq-wg/cmsf)
- [Datatracker](https://datatracker.ietf.org/doc/draft-ietf-moq-cmsf/)
