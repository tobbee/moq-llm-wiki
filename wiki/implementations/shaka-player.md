---
title: "Shaka Player (Google)"
tags: [implementation, javascript, player, google]
date: 2026-04-10
last_updated: 2026-04-15
status: current
---

**Language**: JavaScript
**Organization**: Google
**GitHub**: [shaka-project/shaka-player](https://github.com/shaka-project/shaka-player)

# Overview

Google's open-source media player with experimental MOQ Transport support via MSF (MOQT Streaming Format). Primarily a subscriber/player, not a relay or publisher.

# Draft Support

- **draft-14** (experimental)
- Negotiates version `0xff00000e` (draft-14)
- Supports [[moq-msf|MSF]] draft-0 and [[moq-cmsf|CMSF]] draft-0
- Labeled "Experimental" in README

# ContentProtection / DRM Support

[PR #9972](https://github.com/shaka-project/shaka-player/pull/9972) (merged Apr 14 by Álvaro Velad Galván) added CMSF `contentProtection` signaling support to Shaka Player. This implements the spec defined in [moq-wg/cmsf PR #18](https://github.com/moq-wg/cmsf/pull/18), making Shaka Player the **second implementation** (after [[moqlivemock|warp-player]]) to support DRM over CMSF.

# History

- Daiki Matsui updated MOQT support from draft-11 to draft-14 in Shaka Player v5.0.5 (announced 2026-03-11)
- Álvaro Velad Galván (Atème) built a POC that works with [[moqlivemock]] including subtitle display
- Álvaro Velad Galván merged CMSF contentProtection support (Apr 14, 2026)

# Related

- [[moqlivemock]] - Works with moqlivemock publisher
- [[moq-msf]] - Streaming format used
- [[moq-cmsf]] - CMAF format support (including ContentProtection signaling)
