---
title: "Adaptive Bitrate (ABR) in MOQ"
tags: [concept, media, streaming]
date: 2026-04-10
last_updated: 2026-06-22
status: current
---

How MOQ supports switching between quality levels during streaming.

# Overview

[[moq-msf]] defines support for adaptive bitrate switching between time-synchronized tracks. Different quality representations are published as separate tracks that share a common timeline.

# Mechanism

1. The [[catalog-format]] describes all available tracks and their quality parameters (in [[moq-msf|MSF -01]], `codec`/`width`/`height` are required for video, `sampleRate`/`channels` for audio, so a subscriber can pick a rendition without parsing the init segment; `targetBuffer` gives per-track buffer guidance)
2. Tracks within a `renderGroup` share a timeline, but strict per-group time alignment has been loosened — MSF #128 ("relax time alignment on RenderGroup") and #155 ("sequence-aligned groups are too restrictive", [[luke-curley]]) both **closed**, settling on shared PTS without mandatory group-boundary alignment
3. Subscribers can switch between tracks by changing their subscription
4. The [[publish-subscribe]] model means switching is a client-side decision

# Latency Modes

MSF defines three latency regimes that affect ABR behavior:
- **Real-time** (<500ms) - Minimal buffering, aggressive quality drops
- **Interactive** (500-2500ms) - Some buffer for smoothing
- **Standard** (>2500ms) - Traditional ABR with deep buffers

# Zapping

PR #122 in the MSF repo adds initial text on "zapping" - quickly switching between different content streams (like changing TV channels). This is related to but distinct from ABR switching.

# Transport-Level Switching (June 2026)

Whether the transport needs dedicated machinery for seamless ABR switching was debated through spring 2026. The June London interim settled it: track switching uses a **`SWITCH_FROM` parameter** (afrind PR #1674, hard mode) rather than a standalone SWITCH message, and the catch-up half is handled by **fill fetch** + **Range Filters**. Decode-timestamp signaling proceeds as an extension (`draft-ietf-moq-dts4moq`). See [[switch-abr]] and [[joining-fetch-dissent]] for the full resolution.

# Related

- [[moq-msf]] - Streaming format with ABR support
- [[catalog-format]] - Describes available quality tracks
- [[joining-fetch]] - ABR implications when joining mid-stream
- [[media-packaging]] - Container format affects ABR granularity
