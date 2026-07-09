---
title: "LOCMAF - Low Overhead CMAF for Media over QUIC"
tags: [draft, media, cmaf, low-overhead, individual]
date: 2026-06-03
last_updated: 2026-07-08
status: current
draft_version: "01"
ietf_url: "https://datatracker.ietf.org/doc/draft-einarsson-moq-locmaf/"
---

**draft-einarsson-moq-locmaf-01** | Individual | published 2026-07-05 (41 pp) | [Datatracker](https://datatracker.ietf.org/doc/draft-einarsson-moq-locmaf/)
**draft-einarsson-moq-locmaf-00** | Submitted 2 June 2026

# Authors
- **[[tobbe-einarsson|Torbjörn Einarsson]]** (Eyevinn Technology) — wiki maintainer; author of [[moqlivemock]] + mlmtest interop client
- **Hugo Björs** (KTH) — first IETF MoQ-side artifact

# Abstract

LOCMAF defines a compact wire format that enables streaming low-latency CMAF media over MoQ Transport with significantly reduced per-object overhead. The format carries CMAF chunk metadata as tagged fields while preserving sample data unchanged, with the receiver reconstructing functionally equivalent CMAF chunks suitable for MSE/EME playback pipelines.

# Position in the design space

| Format | Wire shape | MSE/EME compatibility | Standardization |
|--------|-----------|------------------------|------------------|
| [[moq-cmsf\|CMSF]] | Full CMAF chunks (init + chunks per CMAF spec) | Direct passthrough to MSE | WG (draft-ietf-moq-cmsf-00) |
| **LOCMAF** | **Tagged fields + unchanged sample data; receiver reconstructs CMAF chunk (canonical, byte-identical)** | **Reconstructed; MSE-compatible after receiver-side rebuild** | **Individual (draft-einarsson-moq-locmaf-01)** |
| [[moq-loc\|LOC]] | Codec-aware compact frame format | No (requires non-MSE pipeline) | WG (draft-ietf-moq-loc-03) |
| [[compressed-mp4]] | Varint-compressed fMP4 boxes (96 → ~21 bytes per fragment) | After decompression: MSE-compatible | Individual |
| [[moq-media-interop]] | LOC wire format for H.264/Opus/AAC | No | Individual, expired Apr 23 |

LOCMAF's distinguishing choice: **carry CMAF chunk metadata as tagged fields**, **preserve sample data unchanged**, **reconstruct the CMAF chunk receiver-side**. This makes it transparent to MSE/EME consumers (the player still sees standard CMAF chunks) while removing redundant box headers from the wire. Two further properties frame it as a candidate CMSF packaging mode: it is **end-to-end** (relays forward the Object payload unchanged) and uses **catalog-referenced init** (relying on [[moq-msf|MSF]] -01's `initData` type so `cmaf` and `locmaf` tracks can reference the same init).

# Why this matters

- **Eyevinn's MoQ adoption path**: Eyevinn's existing CMAF-based pipeline (HLS/DASH origins + low-latency CMAF chunked encoding) needs a MoQ wire shape that doesn't force re-architecting the player-side MSE/EME glue. LOCMAF preserves that.
- **MSE/EME compatibility constraint**: Safari (notably for FairPlay DRM) requires `avc1`/`hvc1` sample entries with parameter sets in the decoder configuration record, not `avc3`/`hev1` with inline parameter sets (see Tobbe's [moq-wg/msf Issue #153](https://github.com/moq-wg/msf/issues/153) Point 4). LOC's self-initializing segments break this. LOCMAF can carry the parameter sets out-of-band as tagged fields and reconstruct an MSE-compatible CMAF chunk.
- **Streaming Tech Sweden + IETF prior work**: presented as a low-overhead extension to CMAF in pre-IETF venues; the -00 submission formalizes the proposal.

# Status

- **-01 published**: 2026-07-05 (41 pp) — a major consistency rewrite; **-00** submitted 2026-06-02
- **Relationship to CMSF**: [[moq-cmsf|CMSF]] registers LOCMAF as a `locmaf` packaging **by normative reference** (moq-wg/cmsf PR #27), so LOCMAF keeps its independent standalone-draft path rather than being folded into CMSF
- **Implementation reports**: LOCMAF v0.3 shipped in [[moqlivemock]] v0.12.0, with the codec extracted into the standalone [Eyevinn/locmaf](https://github.com/Eyevinn/locmaf) module; [[warp-player|Eyevinn/warp-player]] on the MSE/EME playback side

# Recent Highlights

Day-by-day activity lives in [[log|the wiki log]]; this section keeps only durable milestones.

- **`draft-einarsson-moq-locmaf-01` cut 2026-07-05** (41 pp, a major consistency rewrite) — the individual draft *"Low Overhead CMAF for Media over QUIC"* by [[tobbe-einarsson|Torbjörn Einarsson]] (Eyevinn) and Hugo Björs (KTH), the first IETF artifact from the wiki maintainer.
- **First implementation**: LOCMAF v0.3 shipped in [[moqlivemock]] v0.12.0 with the codec extracted into the standalone [Eyevinn/locmaf](https://github.com/Eyevinn/locmaf) module, paired with [[warp-player|Eyevinn/warp-player]] for MSE/EME playback; the redesign drops initData compression in favor of catalog-referenced init via [[moq-msf|MSF]] -01's `initData` type.
- **Adopted into CMSF by reference (not folded in)**: [[moq-cmsf|CMSF]] PR #27 registers a `locmaf` packaging that points at the standalone LOCMAF draft (the approach [[will-law|Will Law]] suggested on CMSF Issue #24), so LOCMAF stays sovereign over the format while CMSF gains the mode — reversing the earlier "fold in and retire the standalone" plan.

# Related drafts and concepts

- [[moq-loc]] — Low Overhead Media Container (WG, draft-02) — the LOC-family WG draft from which LOCMAF differentiates
- [[moq-cmsf]] — CMAF-compliant MSF (WG, draft-00) — the CMAF-equivalent reference point
- [[compressed-mp4]] — Varint compression of fMP4 boxes (Mo Zanaty individual)
- [[moq-media-interop]] — LOC media wire format for H.264/Opus/AAC
- [[moq-transport]] — base wire protocol
- [[moq-msf]] — MSF packaging umbrella draft

# Authors and stakeholders

- [[tobbe-einarsson|Torbjörn Einarsson]] — Eyevinn Technology, wiki maintainer
- Hugo Björs — KTH (Royal Institute of Technology), Stockholm

# References

- [draft-einarsson-moq-locmaf-00](https://datatracker.ietf.org/doc/draft-einarsson-moq-locmaf/) on Datatracker
- [[moqlivemock]] / mlmtest — Tobbe's interop client likely to be the first LOCMAF implementation
