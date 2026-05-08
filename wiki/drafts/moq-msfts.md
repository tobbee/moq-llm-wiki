---
title: "MSFTS - MPEG-2 Transport Stream Packaging for Media Over QUIC Transport"
tags: [draft, media, streaming-format, mpeg2-ts, individual]
date: 2026-05-08
last_updated: 2026-05-08
status: current
draft_version: "00"
ietf_url: "https://datatracker.ietf.org/doc/draft-gregoire-moq-msfts/"
---

**draft-gregoire-moq-msfts-00** | 21 pages | Informational | Expires 7 November 2026 | Submitted 6 May 2026

# Authors
- **Paul Gregoire** (Red5) — also maintainer of moqxr; first MoQ contribution
- **[[gwendal-simon]]** (Synamedia) — first IETF-side artifact after the late-April SWITCH cross-pollination

# Abstract

Extends the [[moq-msf|MOQT Streaming Format (MSF)]] by registering the **`m2ts`** packaging value for carrying MPEG-2 Transport Stream and M2TS source packets over [[moq-transport|MOQT]]. Defines catalog fields for transport-stream track description and specifies receiver and relay behavior for joining, switching, and validating packetized streams. Aimed at publishers that already produce packetized MPEG-2 TS output — contribution feeds, broadcast workflows, and systems currently segmenting TS for HTTP delivery.

# Why It Matters

First non-CMAF, non-LOC packaging extension proposed for MSF. MSFTS extends MoQ from OTT-style workflows (CMAF, LOC) into broadcast/contribution territory where MPEG-2 TS remains the dominant container.

# Key Design

## Packaging Modes
- **TS packet** — 188-octet MPEG-2 Transport Stream packet ([ISO138181])
- **M2TS source packet** — 192-octet packet consisting of a 4-octet source-packet timestamp followed by a 188-octet TS packet
- Source-packet size signaled by the catalog (`m2tsPacketSize` = 188 or 192)

## Object Mapping
Consecutive source packets are mapped into MOQT Objects. The format does **not** define a new elementary-stream container — it preserves the packet stream end-to-end. LOC packaging does not apply to `m2ts` tracks; equivalent behavior is defined in this draft.

## Catalog Fields (10 m2ts-specific)
- `m2tsPacketSize` — 188 or 192
- `m2tsPacketsPerObject` — packetization granularity
- `m2tsProgramNumber` — for SPTS or selecting one program from MPTS
- `m2tsPmtPid` — Program Map Table PID
- `m2tsPcrPid` — Program Clock Reference PID
- `m2tsPsiInterval` — PSI table repetition interval
- `m2tsRandomAccess` — random access point signaling
- `m2tsTimestampMode` — timing/timestamp interpretation
- `m2tsScte35Pid` — SCTE-35 splice signaling PID
- `initData` — Base64-encoded initialization packets (PAT/PMT/etc.)

## Multi-Program Source Handling
A multi-program transport stream (MPTS) can be split into multiple `m2ts` MoQ tracks, one per program — each track selected via `m2tsProgramNumber`.

# Status

**Individual submission** — not adopted by the MOQ working group. Submitted 6 May 2026; no mailing-list announcement at submission time.

# External Links
- [Datatracker](https://datatracker.ietf.org/doc/draft-gregoire-moq-msfts/)
- [Latest revision (HTML)](https://mondain.github.io/msfts/draft-gregoire-moq-msfts.html)
- [GitHub source / issue tracker](https://github.com/mondain/msfts)

# Related
- [[moq-msf]] — Umbrella streaming-format draft this extends
- [[moq-cmsf]] — CMAF packaging extension (sibling under MSF)
- [[moq-loc]] — Low Overhead Container (the existing MSF default packaging)
- [[media-packaging]] — Container format comparison
