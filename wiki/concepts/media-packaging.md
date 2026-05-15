---
title: "Media Packaging: LOC vs CMAF"
tags: [concept, media, container]
date: 2026-04-10
last_updated: 2026-05-15
status: current
---

The MOQ ecosystem has two container format philosophies for packaging media.

# LOC - Low Overhead Container

**[[moq-loc]]** (draft-ietf-moq-loc-02)

- Minimal encapsulation overhead
- WebCodecs-native: aligns directly with browser APIs
- Optimized for real-time and interactive use (<500ms latency)
- Codec-agnostic via metadata properties
- No existing tooling ecosystem

# CMAF - Common Media Application Format

Used via **[[moq-cmsf]]** (draft-ietf-moq-cmsf-00)

- Industry standard for OTT streaming (HLS/DASH)
- Broad tooling support: encoders, packagers, players
- Higher overhead per object
- Well-understood by CDN operators
- Supports DRM workflows

# Bridges Between LOC and CMAF

Two proposals attempt to bridge LOC's low overhead with CMAF's compatibility — coming from opposite directions:

## Compressed MP4 (spec-side, varint compression of ISO BMFF)

[[compressed-mp4|draft-lcurley-compressed-mp4-00]] ([[luke-curley]], submitted 17 March 2026). **Approach**: keep the ISO BMFF box hierarchy but rewrite the encoding — a `cmpd` table in `moov` maps varint IDs ↔ 4-char box type names, and four compressed box variants (`cmfh`, `cfhd`, `cfdt`, `crun`) replace fixed-width payload fields with QUIC-style varints. Reduces per-fragment overhead from ~96 to ~21 bytes (~78%) and is **losslessly reversible** to standard fMP4. Original framing: *"it's kinda gross, but maybe it's enough to bridge the gap between LOC and CMAF so we don't have a container split based on the use-case."*

## LOCMAF (impl-side, structural compression) — experimental

**Hugo Björs** (Eyevinn) introduced **LOCMAF (Low Overhead CMAF)** in twin PRs ([moqlivemock #79](https://github.com/Eyevinn/moqlivemock/pull/79) +2697/−83 and [warp-player #120](https://github.com/Eyevinn/warp-player/pull/120) +2211/−188, both opened May 7 2026). **Approach**: encode only **non-derivable** CMAF fields as LOC-style key-value pairs, leveraging properties LOC already defines for varint+byte-string encoding.

Key design points:
- Fields encoded as MoQT/LOC-style KV pairs with LOCMAF IDs.
- All values aggregated into **one LOCMAF property** rather than one LOC property per CMAF field — *"compatible with LOC while avoiding a large number of new globally coordinated property IDs."*
- **3 LOCMAF properties**: init segment (reconstructs CMAF `ftyp` + `moov`), full header (reconstructs complete `moof` header, sent at SAP + first object in MoQT group), delta header (differences vs. previous header, with "deleted" semantics resetting to defaults).
- **Optimizations**: `tfdt.baseMediaDecodeTime` calculated from prior `baseMediaDecodeTime` + sample durations (omitted from wire); single-sample fragments omit sample size (equals payload length).

**Status**: Experimental, both PRs open. Concrete measurements pending Hugo Björs's master's thesis. A separate warp-player branch tests LOCMAF + DRM.

| Approach | Path | Author | Status |
|----------|------|--------|--------|
| **compressed-mp4** | Rewrite ISO BMFF box headers + four common boxes with QUIC-style varints | [[luke-curley]] | [[compressed-mp4\|Individual draft -00]] Mar 17 |
| **LOCMAF** | Encode only non-derivable CMAF fields as LOC KV pairs | Hugo Björs (Eyevinn) | Experimental impl May 7 |

# Media Interop (Concrete Wire Format)

**[[moq-media-interop]]** (draft-cenzano-moq-media-interop-03, individual, expires 2026-04-23)

- Defines a concrete media wire format on top of LOC
- Covers H.264 video (AVCC), Opus audio, AAC-LC audio, and UTF-8 text
- Uses MOQT extension headers for metadata (PTS, DTS, timebase, wallclock)
- Supports mid-stream encoding parameter changes
- Authored by Jorge Cenzano-Ferret and [[alan-frindell]] at Meta
- Documents the wire format used by [[moxygen]]

# Current State

Both approaches coexist within [[moq-msf]]:
- MSF supports LOC-packaged media natively
- CMSF extends MSF with CMAF packaging support
- The community has not converged on one approach

# Which to Use?

| Use Case | Recommended |
|----------|------------|
| Real-time conferencing | LOC |
| Live interactive streaming | LOC |
| OTT broadcast-style | CMAF via CMSF |
| Existing CMAF pipeline | CMAF via CMSF |
| WebCodecs-first browser app | LOC |

# Related

- [[moq-loc]] - LOC specification
- [[moq-cmsf]] - CMAF via MSF
- [[moq-media-interop]] - Concrete wire format for LOC media
- [[moq-msf]] - Parent streaming format
- [[adaptive-bitrate]] - ABR works with both approaches
