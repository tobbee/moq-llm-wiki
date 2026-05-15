---
title: "Compressed MP4 - varint compression scheme for ISO BMFF"
tags: [draft, media, container, fmp4, isobmff, individual]
date: 2026-05-15
last_updated: 2026-05-15
status: current
draft_version: "00"
ietf_url: "https://datatracker.ietf.org/doc/draft-lcurley-compressed-mp4/"
---

**draft-lcurley-compressed-mp4-00** | 12 pages | Informational | Submitted 17 March 2026 | Expires 18 September 2026

# Author
- **[[luke-curley]]** (Independent / moq-dev) — also author of [[moq-lite]] and `draft-lcurley-moq-hang`

# Abstract

Fragmented MP4 (fMP4) is widely used for live streaming, but the ISO Base Media File Format (ISOBMFF) box structure imposes significant per-fragment overhead. Each box header requires 8 bytes (4-byte size + 4-byte type), and payload fields use fixed-width integers (u32/u64). For low-latency streaming with single-frame fragments this overhead can exceed the media payload itself.

This document defines a compression scheme that replaces box headers with QUIC-style varint-encoded identifiers + sizes, and defines compressed variants of commonly used boxes with varint payload fields. The scheme reduces per-fragment overhead from ~96 bytes to ~21 bytes (≈78% reduction) while preserving the full ISO BMFF box hierarchy.

# Why It Matters

A direct response to the per-frame container-overhead problem that has been a recurring critique of CMAF/fMP4 in MoQ contexts. For Opus audio frames (4–20 bytes payload) or low-bitrate single-frame video fragments (100–500 bytes payload), classic fMP4 headers can be **larger than the media itself**. Compressed MP4 keeps the ISOBMFF box model — and therefore tool, debugger, and pipeline compatibility — while removing the byte-level overhead that motivated [[moq-loc|LOC]] as an alternative container.

Strategically positions itself between [[moq-loc|LOC]] (new wire format, no ISO BMFF tooling) and [[moq-cmsf|CMSF]] (full standard fMP4, full overhead).

# Key Design

## Two Compression Layers
1. **Header compression** — a `cmpd` (Compression Table) box inside `moov` maps varint IDs ↔ 4-character box type names. All top-level boxes following `moov` use `[varint ID][varint size]` instead of `[u32 size][4-char type]`. The size field carries **payload size only** (no header inclusion, no extended-size escape — varints scale natively).
2. **Payload compression** — compressed variants of the four hottest boxes replace fixed-width integer fields with varints.

## Variable-Length Integer Encoding
Reuses QUIC varint encoding from [RFC 9000 §16] — 2 MSBs of byte 0 select length 1 / 2 / 4 / 8, giving 6 / 14 / 30 / 62 usable bits.

## Compression Table (`cmpd`)
- Inside `moov`, uses standard ISO BMFF header (compression takes effect *after* `moov`).
- Maps varint ID → 4-char box type name. Encoder SHOULD assign IDs starting from 0 for minimum encoding size.
- Typical 7-entry table (IDs 0–6) for `moof / mdat / mfhd / traf / tfhd / tfdt / trun` — every ID fits in 1 byte.

## Compressed Box Variants
| Compressed | Replaces | Notes |
|------------|----------|-------|
| `cmfh` | `mfhd` | Sequence number as varint (1 byte if < 64). |
| `cfhd` | `tfhd` | Track ID + flags as varints; optional fields gated by renumbered flag bits (0x01 base-data-offset, 0x02 sample-description-index, 0x08 default-sample-duration, 0x10 default-sample-size, 0x20 default-sample-flags). |
| `cfdt` | `tfdt` | Base decode time as a single varint (no version/flags word, no fixed 32/64 split). |
| `crun` | `trun` | Sample count + flags as varints; per-sample fields gated by flag bits 0x100 / 0x200 / 0x400 / 0x800. |

An encoder MAY use a standard box (with a compressed header) OR the compressed variant for any given box — the `cmpd` table determines which type name is bound to which ID.

## Worked Example — single-frame fragment (seq=42, track=1, decode-time=3840, sample-size=200)

| Layer | Standard fMP4 | Compressed |
|-------|---------------|------------|
| `moof` header + `mfhd` | 8 + 16 | 2 + 2 + 1 |
| `traf` + `tfhd` | 8 + 16 | 2 + 2 + 1 |
| `tfdt` | 20 (with 8-byte u64 timestamp) | 2 + 2 |
| `trun` | 20 | 2 + 1 + 2 + 2 |
| `mdat` header | 8 | 2 |
| **Total overhead** | **96 bytes** | **~21 bytes** |

# Status

**Individual submission** — not adopted by the MOQ working group. Submitted 17 March 2026; source + issue tracker at https://github.com/kixelated/moq-drafts. Discussion intended on `moq@ietf.org`. Acknowledgments note: *"This draft was generated with the assistance of AI (Claude)."*

Security and IANA sections are **stub** in -00 (`TODO Security`; IANA section registers 5 box types: `cmpd`, `cmfh`, `cfhd`, `cfdt`, `crun`).

# External Links
- [Datatracker](https://datatracker.ietf.org/doc/draft-lcurley-compressed-mp4/)
- [Latest revision (HTML)](https://www.ietf.org/archive/id/draft-lcurley-compressed-mp4-00.html)
- [Latest revision (TXT)](https://www.ietf.org/archive/id/draft-lcurley-compressed-mp4-00.txt)
- [Source / issue tracker](https://github.com/kixelated/moq-drafts)

# Related
- [[moq-loc]] — Low Overhead Container; alternative approach (new wire format rather than compression of fMP4)
- [[moq-cmsf]] — CMAF-compliant standard-fMP4 packaging under MSF
- [[moq-msfts]] — MPEG-2 TS packaging under MSF (sibling individual draft from a different author)
- [[media-packaging]] — Container format comparison
- [[luke-curley]] — Author; also responsible for [[moq-lite]] and Hang
