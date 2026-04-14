---
title: "Low Overhead Media Container (LOC)"
tags: [draft, media, container]
date: 2026-04-10
last_updated: 2026-04-14
status: current
draft_version: "02"
ietf_url: "https://datatracker.ietf.org/doc/draft-ietf-moq-loc/"
---

**draft-ietf-moq-loc-02** | 19 pages | Expires 2026-03-15

# Authors
- Mo Zanaty (Cisco)
- [[suhas-nandakumar]] (Cisco)
- Peter Thatcher (Microsoft)

# Abstract

LOC presents a container format for encoded audio and video media intended primarily for interactive streaming over QUIC. It emphasizes minimal encapsulation overhead and compatibility with WebCodecs standards.

# Key Features

- **Minimal overhead**: Designed for low-latency interactive use cases
- **WebCodecs compatible**: Aligns with browser WebCodecs API
- **Codec agnostic**: Metadata properties for both audio and video
- **E2E encryption**: Supports [[moq-secure-objects]] integration
- **Extension mechanism**: Header extensions for timestamps, video frame marking, audio level

# Extensions (draft-02)

LOC uses numbered extensions in the object header:
- Timestamp
- Video Frame Marking (ID=4)
- Audio Level
- Note: **Issue #13** - Duplicate extension ID (0x06) for Timestamp and Audio Level

# Active Issues (moq-wg/loc)

- **#18** - Moving redundant properties in the catalog?
- **#17** - Delta compress timestamps
- **#16** - Unix epoch + Timescale
- **#15** - Ambiguity in Video Frame Marking vi64 encoding
- **#14** - WebCodecs issue: fix new avc3/hev1 formats
- **#13** - Duplicate extension ID for Timestamp and Audio Level
- **#10** - Properties Type collision between moqt-draft17 and loc-01
- **#9** - Track Property can't be authenticated
- **#5** - Move LOC header metadata from object header extensions to object payload

# Related

- [[moq-transport]] - Transport layer
- [[moq-msf]] - Streaming format that uses LOC
- [[moq-cmsf]] - CMAF variant that also supports LOC
- [[media-packaging]] - Comparison with CMAF approach

# Design Tension: LOC vs CMAF

LOC represents the "low overhead" approach optimized for interactive/real-time use cases, while [[moq-cmsf]] provides CMAF compatibility for traditional OTT streaming. [[luke-curley]] has proposed [CMAF compression](https://www.ietf.org/archive/id/draft-lcurley-compressed-mp4-00.html) as a potential bridge between the two approaches.

# External Links
- [GitHub repo](https://github.com/moq-wg/loc)
- [Datatracker](https://datatracker.ietf.org/doc/draft-ietf-moq-loc/)
