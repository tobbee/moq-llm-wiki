---
title: "Adaptive Bitrate (ABR) in MOQ"
tags: [concept, media, streaming]
date: 2026-04-10
last_updated: 2026-04-14
status: current
---

How MOQ supports switching between quality levels during streaming.

# Overview

[[moq-msf]] defines support for adaptive bitrate switching between time-synchronized tracks. Different quality representations are published as separate tracks that share a common timeline.

# Mechanism

1. The [[catalog-format]] describes all available tracks and their quality parameters
2. Tracks within a `renderGroup` are time-aligned (though PR #142 clarified this doesn't imply strict time alignment)
3. Subscribers can switch between tracks by changing their subscription
4. The [[publish-subscribe]] model means switching is a client-side decision

# Latency Modes

MSF defines three latency regimes that affect ABR behavior:
- **Real-time** (<500ms) - Minimal buffering, aggressive quality drops
- **Interactive** (500-2500ms) - Some buffer for smoothing
- **Standard** (>2500ms) - Traditional ABR with deep buffers

# Zapping

PR #122 in the MSF repo adds initial text on "zapping" - quickly switching between different content streams (like changing TV channels). This is related to but distinct from ABR switching.

# Related

- [[moq-msf]] - Streaming format with ABR support
- [[catalog-format]] - Describes available quality tracks
- [[joining-fetch]] - ABR implications when joining mid-stream
- [[media-packaging]] - Container format affects ABR granularity
