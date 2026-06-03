---
title: "LOCMAF - Low Overhead CMAF for Media over QUIC"
tags: [draft, media, cmaf, low-overhead, individual]
date: 2026-06-03
last_updated: 2026-06-03
status: current
draft_version: "00"
ietf_url: "https://datatracker.ietf.org/doc/draft-einarsson-moq-locmaf/"
---

> **2026-06-03**: **NEW individual draft submitted June 2 2026** by **[[tobbe-einarsson|Torbjörn Einarsson]] (Eyevinn Technology) and Hugo Björs (KTH)** — *"Low Overhead CMAF for Media over QUIC (LOCMAF)"*. Per the abstract, LOCMAF defines a compact wire format that lets low-latency CMAF media be delivered over [[moq-transport]] with significantly reduced per-object overhead by carrying CMAF chunk metadata as tagged fields while preserving sample data unchanged. The receiver reconstructs functionally equivalent CMAF chunks suitable for MSE/EME playback pipelines. **Slots into the design space between [[moq-loc|LOC]] and [[moq-cmsf|CMSF]]**: LOC strips fMP4 overhead but loses MSE/EME compatibility; CMSF keeps full CMAF chunk semantics; **LOCMAF aims for the middle** — compact-fMP4 carrier the player reconstructs to a CMAF chunk before handing to MSE. **First IETF artifact from the wiki maintainer** (Tobbe), aligns with Eyevinn's longstanding interest in MSE/EME-compatible MoQ playback (see [[moqlivemock]] + [[warp-player|Eyevinn/warp-player]]). **Carry-forward**: LOCMAF may surface at the **London Day-2 35-min MSF/CMSF/MSFTS slot** as one of three competing low-overhead carriers for fMP4-style payloads alongside [[compressed-mp4]] (mzanaty, varint compression of fMP4 boxes) and [[moq-media-interop]] (LOC wire format for H.264/Opus/AAC, expired Apr 23).

**draft-einarsson-moq-locmaf-00** | Individual | Submitted 2 June 2026 | Expires 2 December 2026 (approx.) | [Datatracker](https://datatracker.ietf.org/doc/draft-einarsson-moq-locmaf/)

# Authors
- **[[tobbe-einarsson|Torbjörn Einarsson]]** (Eyevinn Technology) — wiki maintainer; author of [[moqlivemock]] + mlmtest interop client
- **Hugo Björs** (KTH) — first IETF MoQ-side artifact

# Abstract

LOCMAF defines a compact wire format that enables streaming low-latency CMAF media over MoQ Transport with significantly reduced per-object overhead. The format carries CMAF chunk metadata as tagged fields while preserving sample data unchanged, with the receiver reconstructing functionally equivalent CMAF chunks suitable for MSE/EME playback pipelines.

# Position in the design space

| Format | Wire shape | MSE/EME compatibility | Standardization |
|--------|-----------|------------------------|------------------|
| [[moq-cmsf\|CMSF]] | Full CMAF chunks (init + chunks per CMAF spec) | Direct passthrough to MSE | WG (draft-ietf-moq-cmsf-00) |
| **LOCMAF** | **Tagged fields + unchanged sample data; receiver reconstructs CMAF chunk** | **Reconstructed; MSE-compatible after receiver-side rebuild** | **Individual (draft-einarsson-moq-locmaf-00)** |
| [[moq-loc\|LOC]] | Codec-aware compact frame format | No (requires non-MSE pipeline) | WG (draft-ietf-moq-loc-02) |
| [[compressed-mp4]] | Varint-compressed fMP4 boxes (96 → ~21 bytes per fragment) | After decompression: MSE-compatible | Individual |
| [[moq-media-interop]] | LOC wire format for H.264/Opus/AAC | No | Individual, expired Apr 23 |

LOCMAF's distinguishing choice: **carry CMAF chunk metadata as tagged fields**, **preserve sample data unchanged**, **reconstruct the CMAF chunk receiver-side**. This makes it transparent to MSE/EME consumers (the player still sees standard CMAF chunks) while removing redundant box headers from the wire.

# Why this matters

- **Eyevinn's MoQ adoption path**: Eyevinn's existing CMAF-based pipeline (HLS/DASH origins + low-latency CMAF chunked encoding) needs a MoQ wire shape that doesn't force re-architecting the player-side MSE/EME glue. LOCMAF preserves that.
- **MSE/EME compatibility constraint**: Safari (notably for FairPlay DRM) requires `avc1`/`hvc1` sample entries with parameter sets in the decoder configuration record, not `avc3`/`hev1` with inline parameter sets (see Tobbe's [moq-wg/msf Issue #153](https://github.com/moq-wg/msf/issues/153) Point 4). LOC's self-initializing segments break this. LOCMAF can carry the parameter sets out-of-band as tagged fields and reconstruct an MSE-compatible CMAF chunk.
- **Streaming Tech Sweden + IETF prior work**: presented as a low-overhead extension to CMAF in pre-IETF venues; the -00 submission formalizes the proposal.

# Status

- **-00 submitted**: 2026-06-02
- **WG adoption call**: not yet
- **Implementation reports**: none yet

# Related drafts and concepts

- [[moq-loc]] — Low Overhead Media Container (WG, draft-02) — the LOC-family WG draft from which LOCMAF differentiates
- [[moq-cmsf]] — CMAF-compliant MSF (WG, draft-00) — the CMAF-equivalent reference point
- [[compressed-mp4]] — Varint compression of fMP4 boxes (Mo Zanaty individual)
- [[moq-media-interop]] — LOC media wire format for H.264/Opus/AAC
- [[moq-transport]] — base wire protocol
- [[moq-msf]] — MSF packaging umbrella draft

# Authors and stakeholders

- [[tobbe-einarsson]] — Eyevinn Technology, wiki maintainer
- Hugo Björs — KTH (Royal Institute of Technology), Stockholm

# References

- [draft-einarsson-moq-locmaf-00](https://datatracker.ietf.org/doc/draft-einarsson-moq-locmaf/) on Datatracker
- [[moqlivemock]] / mlmtest — Tobbe's interop client likely to be the first LOCMAF implementation
