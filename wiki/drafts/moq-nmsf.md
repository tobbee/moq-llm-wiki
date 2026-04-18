---
title: "NMSF - Neural Video Codec Packaging for MOQT Streaming Format"
tags: [draft, media, neural-codec, individual]
date: 2026-04-13
last_updated: 2026-04-18
status: current
draft_version: "01"
ietf_url: "https://datatracker.ietf.org/doc/draft-herz-moq-nmsf/"
---

**draft-herz-moq-nmsf-01** | 18 pages | Expires 2026-10-09

# Author
- Erik Herz (Vivoh, Inc.)

# Abstract

NMSF extends the [[moq-msf|MOQT Streaming Format]] by defining packaging for Neural Video Codecs (NVCs). Neural video codecs use learned neural transforms instead of traditional block-based compression (like H.264/H.265). The spec maps neural keyframes (Intra) and delta frames (Inter) onto MoQ Groups and Objects, and introduces a dual-track model separating hyperprior metadata from latent bitstreams for priority-aware delivery over MoQ relays.

# Key Design

## Dual-Track Model
NVC compressed video is split into two independent MoQ tracks with distinct delivery priorities:
1. **Hyperprior track** — statistical metadata needed for decoding (higher priority)
2. **Latent track** — compressed frame data (lower priority, larger)

This separation enables congestion-aware prioritization where relays can preserve the critical hyperprior data during network congestion.

## Packaging Type
Introduces a new `nvc` packaging type for [[moq-msf]].

## Wire Format
A 26-byte header precedes each variable-length compressed bitstream:
- 1 byte: `frame_type` (Intra/Inter indicator)
- 1 byte: `quality` parameter (qp)
- 4 bytes: `frame_number` (uint32, big-endian)
- 8 bytes: `pts_ms` timestamp (uint64, milliseconds since epoch)
- 4 bytes: `width` (uint32, pixels)
- 4 bytes: `height` (uint32, pixels)
- 4 bytes: `payload_len` (uint32, bytes)
- Variable: entropy-coded bitstream payload

## Supported Codecs
- **DCVC-RT** (Deep Contextual Video Compression - Real Time)
- **DCVC-FM**, **DCVC-DC** (DCVC variants)
- **SSF** (Scale-Space Flow)
- **FVC** (Feature-space Video Coding)
- **RLVC** (Recurrent Learned Video Compression)
- **ELFVC** (Efficient Learned Flexible Video Coding)

# Frame Types and Group Structure
- **Intra frames** (keyframes) — start a new Group, decodable independently
- **Inter frames** (delta) — depend on previous frames within the same Group

# Status

Individual submission — not adopted by the MOQ working group. This is a novel extension exploring the intersection of neural video compression and MOQ delivery.

# External Links
- [Datatracker](https://datatracker.ietf.org/doc/draft-herz-moq-nmsf/)

# Related
- [[moq-msf]] — The streaming format that NMSF extends
- [[media-packaging]] — Media packaging approaches in MOQ
