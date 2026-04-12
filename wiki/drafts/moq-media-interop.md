---
title: "MoQ Media Interop"
tags: [draft, media, interop, loc, individual]
date: 2026-04-12
status: current
expires: 2026-04-23
---

# MoQ Media Interop

**Draft**: draft-cenzano-moq-media-interop-03
**Status**: Active Internet-Draft (individual submission, not WG-adopted)
**Authors**: Jorge Cenzano-Ferret (Meta), [[alan-frindell]] (Meta)
**Published**: 2025-10-20
**Expires**: 2026-04-23 (11 days from now — **track for renewal**)
**Datatracker**: [draft-cenzano-moq-media-interop](https://datatracker.ietf.org/doc/draft-cenzano-moq-media-interop/)
**HTML**: [afrind.github.io](https://afrind.github.io/draft-cenzano-media-interop/draft-cenzano-moq-media-interop.html)
**Repository**: [github.com/afrind/draft-cenzano-media-interop](https://github.com/afrind/draft-cenzano-media-interop)

## Overview

Specifies a concrete media wire format for sending video and audio over [[moq-loc|LOC]], targeting both live-streaming and video-conferencing use cases. Defines how to map H.264 video, Opus audio, AAC-LC audio, and UTF-8 text into MOQT objects using extension headers.

A key feature is support for updating encoding parameters mid-stream (frame rate, resolution, codec) without interrupting transmission.

## Track Naming

- Publishers choose a namespace and announce it via MOQT
- Media tracks follow naming convention `videoX` and `audioX` (X = integer starting at 0)
- Multiple tracks in the same namespace share synchronized timestamps

## Mapping to MOQT Object Model

- **Video**: New groups begin at each IDR (keyframe); object 0 is always an IDR frame
- **Audio**: New groups begin with each audio object
- Both use single subgroups with standardized formats

## Timestamps

Two-component representation to avoid rounding errors:
- Timestamp numerator (PTS, DTS, duration)
- Timebase for conversion
- Formula: `timestamp(seconds) = numerator ÷ timebase`

## Extension Headers

Uses MOQT extension headers for media metadata:

| Type ID | Name | Description |
|---------|------|-------------|
| 0x0A | Media Type | Mandatory in all objects — identifies payload type |
| 0x15 | Video H.264 AVCC Metadata | Sequence ID, PTS, DTS, timebase, duration, wallclock |
| 0x0D | Video H.264 AVCC Extradata | AVCDecoderConfigurationRecord (at group start / param change) |
| 0x0F | Audio Opus Bitstream Data | Sequence ID, PTS, timebase, sample freq, channels, duration, wallclock |
| 0x11 | UTF-8 Text | Sequence ID only |
| 0x13 | Audio AAC-LC MPEG4 | Same fields as Opus header |

## Supported Media Types

| Value | Type | Payload Format |
|-------|------|----------------|
| 0x0 | Video H.264 in AVCC | AVC1 bitstream (ISO/IEC 14496-15:2019 §5.3), 4-byte size fields |
| 0x1 | Audio Opus | Opus packets (RFC 6716 §3) |
| 0x2 | UTF-8 Text | UTF-8 (RFC 3629) |
| 0x3 | Audio AAC-LC in MPEG4 | raw_data_block() (ISO/IEC 14496-3:2009 §4.4.2.1) |

## Relationship to Other Drafts

- Builds on [[moq-loc]] for container format
- Uses [[moq-transport]] extension headers for metadata
- Complements [[moq-msf]] — MSF defines the streaming format framework; this draft defines a concrete media-level wire format on top of LOC
- Alternative media packaging approach to [[moq-cmsf]] (CMAF-based)

## Open Items (TODOs in draft)

- Datagram forwarding preference and audio frame sizing
- Negative timestamp handling for initial priming
- Security considerations (currently empty)
- Links to LOC specification documentation

## Revision History

| Version | Notes |
|---------|-------|
| 03 | Current (2025-10-20) |
| 02 | — |
| 01 | — |
| 00 | Initial |

## Expiration Watch

**Expires 2026-04-23.** If not renewed by that date, the draft lapses. This is relevant because the draft documents the wire format used by Meta's [[moxygen]] relay and is referenced by implementations doing LOC-based media interop. Check the [datatracker page](https://datatracker.ietf.org/doc/draft-cenzano-moq-media-interop/) for renewal status.

## Related

- [[moq-loc]] - Container format this builds on
- [[moq-msf]] - Streaming format framework
- [[media-packaging]] - LOC vs CMAF comparison
- [[alan-frindell]] - Co-author
- [[moxygen]] - Meta's relay implementation (uses this format)
