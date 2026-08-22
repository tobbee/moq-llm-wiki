---
title: "MediaMTX"
tags: [implementation, go, server, relay, gateway]
date: 2026-08-22
last_updated: 2026-08-22
status: current
---

**Language**: Go
**Maintainer**: [bluenviron](https://github.com/bluenviron) (Alessandro Ros)
**GitHub**: [bluenviron/mediamtx](https://github.com/bluenviron/mediamtx) — MIT, ~19.9k stars
**Role**: Multi-protocol live media server with a **native, from-scratch MoQ server**
**Draft support**: **draft-16, -17, -18, -19** (ALPN `moqt-16` … `moqt-19`), preferring **draft-19**

# Overview

MediaMTX is a widely-deployed ready-to-use live media server and proxy — RTSP, RTMP, SRT, WebRTC, LL-HLS, MPEG-TS — that added **Media over QUIC** as a first-class protocol in June 2026. Its own project description now *leads* with "Media-over-QUIC", ahead of every other protocol it speaks.

It matters to this wiki for three reasons:

1. **It is the widest draft-version support of any implementation tracked here** — it negotiates **draft-16 through draft-19** and prefers the newest offered. Most implementations pin one or two drafts.
2. **The MoQ stack is native, not a wrapper.** `internal/protocols/moq/` contains its own varint, control-message, subgroup, catalog, namespace, parameter, property, and reorderer packages; `internal/servers/moq/` provides the server, sessions, and both transports. It does not embed [[moq-dev|moq-dev]], [[moq-rs]], or any other library.
3. **It brings MoQ into an existing production media server** with a large installed base, rather than being a protocol demo — the same "MoQ as one protocol among many" position [[shaka-player]] occupies on the playback side.

# Protocol support

- **Roles**: publish and read. **PUBLISH/SUBSCRIBE only** — relaying/routing is left to MediaMTX's own path machinery rather than implemented as MOQT relay semantics.
- **Transports**: **WebTransport** (hybrid HTTP/2 + HTTP/3, default `:8892`) and **native QUIC** (default `:8893`). An optional `/moq` URL suffix is supported.
- **Media layer**: **[[moq-msf|MSF]]** catalogs with the **[[moq-loc|LOC]]** frame container.
- **Codecs**: AV1, VP9, VP8, H.265, H.264 · Opus, FLAC, AAC, G.711, LPCM.
- Draft-16 is handled as a distinct wire path (bidirectional-stream `CLIENT_SETUP`, no unidirectional SETUP), with -17 and -18/-19 sharing the newer framing.

# History

- **2026-06-02** — MoQ support lands ([PR #5815](https://github.com/bluenviron/mediamtx/pull/5815)).
- **2026-08-05** — draft-16 compatibility added (#6045).
- **2026-08-15** — track limits (#6087).
- **2026-08-18** — optional `/moq` path suffix (#6107); reorder-buffer cap (#6112).

# Interop

**Not registered in the [[interop-runner]]** — despite being the largest MoQ-capable server by installed base and the only implementation covering drafts 16–19. Registering it would be one of the highest-value additions to the matrix, particularly for the **[[interim-meetings|2026-09-02 virtual interop hackathon]]**.

# Related

- [[overview|Implementations Overview]], [[interop-runner]]
- [[moq-msf]], [[moq-loc]] — the media layers it implements
- [[shaka-player]] — the other "MoQ inside an existing production media stack" entry
