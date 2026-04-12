---
title: "Media Packaging: LOC vs CMAF"
tags: [concept, media, container]
date: 2026-04-10
status: current
---

# Media Packaging: LOC vs CMAF

The MOQ ecosystem has two container format philosophies for packaging media.

## LOC - Low Overhead Container

**[[moq-loc]]** (draft-ietf-moq-loc-02)

- Minimal encapsulation overhead
- WebCodecs-native: aligns directly with browser APIs
- Optimized for real-time and interactive use (<500ms latency)
- Codec-agnostic via metadata properties
- No existing tooling ecosystem

## CMAF - Common Media Application Format

Used via **[[moq-cmsf]]** (draft-ietf-moq-cmsf-00)

- Industry standard for OTT streaming (HLS/DASH)
- Broad tooling support: encoders, packagers, players
- Higher overhead per object
- Well-understood by CDN operators
- Supports DRM workflows

## The Bridge: Compressed MP4

[[luke-curley]] proposed [draft-lcurley-compressed-mp4-00](https://www.ietf.org/archive/id/draft-lcurley-compressed-mp4-00.html) (2026-03-18) as a way to compress CMAF containers, potentially bridging the gap between LOC's low overhead and CMAF's compatibility. His comment: "it's kinda gross, but maybe it's enough to bridge the gap between LOC and CMAF so we don't have a container split based on the use-case."

## Media Interop (Concrete Wire Format)

**[[moq-media-interop]]** (draft-cenzano-moq-media-interop-03, individual, expires 2026-04-23)

- Defines a concrete media wire format on top of LOC
- Covers H.264 video (AVCC), Opus audio, AAC-LC audio, and UTF-8 text
- Uses MOQT extension headers for metadata (PTS, DTS, timebase, wallclock)
- Supports mid-stream encoding parameter changes
- Authored by Jorge Cenzano-Ferret and [[alan-frindell]] at Meta
- Documents the wire format used by [[moxygen]]

## Current State

Both approaches coexist within [[moq-msf]]:
- MSF supports LOC-packaged media natively
- CMSF extends MSF with CMAF packaging support
- The community has not converged on one approach

## Which to Use?

| Use Case | Recommended |
|----------|------------|
| Real-time conferencing | LOC |
| Live interactive streaming | LOC |
| OTT broadcast-style | CMAF via CMSF |
| Existing CMAF pipeline | CMAF via CMSF |
| WebCodecs-first browser app | LOC |

## Related

- [[moq-loc]] - LOC specification
- [[moq-cmsf]] - CMAF via MSF
- [[moq-media-interop]] - Concrete wire format for LOC media
- [[moq-msf]] - Parent streaming format
- [[adaptive-bitrate]] - ABR works with both approaches
