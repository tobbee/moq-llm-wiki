---
title: "Media Packaging: LOC vs CMAF"
tags: [concept, media, container]
date: 2026-04-10
last_updated: 2026-06-22
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

Used via **[[moq-cmsf]]** (draft-ietf-moq-cmsf-01, submitted 2026-06-03)

- Industry standard for OTT streaming (HLS/DASH)
- Broad tooling support: encoders, packagers, players
- Higher overhead per object
- Well-understood by CDN operators
- Supports DRM workflows

# Bridges Between LOC and CMAF

Two proposals attempt to bridge LOC's low overhead with CMAF's compatibility — coming from opposite directions:

## Compressed MP4 (spec-side, varint compression of ISO BMFF)

[[compressed-mp4|draft-lcurley-compressed-mp4-00]] ([[luke-curley]], submitted 17 March 2026). **Approach**: keep the ISO BMFF box hierarchy but rewrite the encoding — a `cmpd` table in `moov` maps varint IDs ↔ 4-char box type names, and four compressed box variants (`cmfh`, `cfhd`, `cfdt`, `crun`) replace fixed-width payload fields with QUIC-style varints. Reduces per-fragment overhead from ~96 to ~21 bytes (~78%) and is **losslessly reversible** to standard fMP4. Original framing: *"it's kinda gross, but maybe it's enough to bridge the gap between LOC and CMAF so we don't have a container split based on the use-case."*

## LOCMAF (impl-side, structural compression) — now an individual draft

**[[moq-locmaf|LOCMAF (Low Overhead CMAF)]]** graduated from an Eyevinn experiment (twin PRs [moqlivemock #79](https://github.com/Eyevinn/moqlivemock/pull/79) / [warp-player #120](https://github.com/Eyevinn/warp-player/pull/120), May 7) into a formal IETF individual draft, **[[moq-locmaf|draft-einarsson-moq-locmaf-00]]** (submitted **2026-06-02**, authors **[[tobbe-einarsson|Torbjörn Einarsson]]** (Eyevinn) + **Hugo Björs** (KTH); no WG adoption call yet). **Approach**: carry CMAF chunk metadata as **tagged LOC-style fields** while leaving sample data **unchanged**; the receiver **reconstructs a functionally equivalent CMAF chunk** for MSE/EME playback. Gets per-object overhead to ~2 bytes steady-state (even with common encryption) — LOC-like overhead while staying MSE/EME-compatible. Slots between LOC (no MSE/EME) and CMSF (full CMAF chunks).

**0.2 dropped initData compression** (the v0.1 impl had carried a compressed init-segment property): now LOCMAF relies on **catalog-referenced init**, leaning on the `initData` type that **[[moq-msf|MSF -01]]** added to the [[catalog-format|catalog]] (so `"cmaf"` and `"locmaf"` packagings can share one initData) plus MSF-01's catalog compression. LOCMAF carries only the per-object delta-compressed chunk metadata. Shipped in moqlivemock v0.11.0 (PR #91, June 4) and warp-player v0.11.0.

| Approach | Path | Author | Status |
|----------|------|--------|--------|
| **compressed-mp4** | Rewrite ISO BMFF box headers + four common boxes with QUIC-style varints | [[luke-curley]] | [[compressed-mp4\|Individual draft -00]] Mar 17 |
| **LOCMAF** | Carry CMAF chunk metadata as tagged LOC fields, receiver reconstructs the chunk; catalog-referenced init | Tobbe Einarsson + Hugo Björs | [[moq-locmaf\|Individual draft -00]] Jun 2 |

# Media Interop (Concrete Wire Format)

**[[moq-media-interop]]** (draft-cenzano-moq-media-interop-03, individual, **EXPIRED 2026-04-23 — no -04 published**)

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

The individual-draft landscape is now **stratified by container/initData semantics**: **CMSF** = full CMAF chunks; **LOCMAF** = delta-compressed CMAF chunk metadata + catalog-referenced init; **LOC** = strips fMP4 entirely; **compressed-mp4** = varint-compressed fMP4 boxes; **[[moq-msfts|MSFTS]]** = MPEG-2 TS.

## Convergence: shared init carriage (June 2026)

Both **[[moq-msf|MSF -01]]** (June 2) and **[[moq-cmsf|CMSF -01]]** (June 3) landed in the same window and reframed how init data is carried. MSF-01's catalog-referenceable **`initData` type** is what let LOCMAF 0.2 drop its own init compression and made `"cmaf"`/`"locmaf"` packagings able to **share one initData** (see [[catalog-format#Initialization Data|catalog init data]]).

The open design question — *where* init data lives — narrowed at the June London CMSF slot. [[will-law|Will Law]]'s proposal: carry init via **both a Track property AND an Object property** — a stable **Track** property for steady-state init, an **Object** property for synchronized mid-track changes (DASH-period switch, DRM key rotation). This answers the long-running [moq-msf Issue #153](https://github.com/moq-wg/msf/issues/153) `initTrack` problem and gives LOCMAF a spec-blessed home for its catalog-referenced init. See [[moq-locmaf]], [[catalog-format]].

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
- [[moq-locmaf]] - Low Overhead CMAF (individual draft)
- [[compressed-mp4]] - Varint-compressed fMP4 boxes
- [[moq-media-interop]] - Concrete wire format for LOC media (expired)
- [[moq-msf]] - Parent streaming format
- [[catalog-format]] - Where shared init data is referenced
- [[adaptive-bitrate]] - ABR works with both approaches
