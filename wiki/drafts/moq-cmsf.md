---
title: "CMSF - CMAF Compliant MOQT Streaming Format"
tags: [draft, media, cmaf, streaming-format]
date: 2026-04-10
last_updated: 2026-04-15
status: current
draft_version: "00"
ietf_url: "https://datatracker.ietf.org/doc/draft-ietf-moq-cmsf/"
---

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

- Defines `contentProtections` with `refID`s in the catalog
- Each encrypted track uses a `contentProtectionRefIDs` array referencing available protections
- Supports the same attributes as DASH/DASH-IF: Widevine, PlayReady, FairPlay, and ECCP (clear key)
- Addresses [issue #8](https://github.com/moq-wg/cmsf/issues/8)

**Implementations**:
- [[moqlivemock]] — Running implementation with Widevine, PlayReady, and FairPlay at [moqlivemock.demo.osaas.io](https://moqlivemock.demo.osaas.io/warp-player/)
- [[shaka-player]] — [PR #9972](https://github.com/shaka-project/shaka-player/pull/9972) merged Apr 14, adding CMSF contentProtection support

Key rotation is not yet defined — future work can build on this for live catalogs with new `refID`s.

# Related

- [[moq-msf]] - Base streaming format
- [[moq-loc]] - Low overhead container
- [[media-packaging]] - Container format discussion

# External Links
- [GitHub repo](https://github.com/moq-wg/cmsf)
- [Datatracker](https://datatracker.ietf.org/doc/draft-ietf-moq-cmsf/)
