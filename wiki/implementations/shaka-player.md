---
title: "Shaka Player (Google)"
tags: [implementation, javascript, player, google]
date: 2026-04-10
status: current
---

# Shaka Player

**Language**: JavaScript
**Organization**: Google
**GitHub**: [shaka-project/shaka-player](https://github.com/shaka-project/shaka-player)

## Overview

Google's open-source media player with experimental MOQ Transport support via MSF (MOQT Streaming Format). Primarily a subscriber/player, not a relay or publisher.

## Draft Support

- **draft-14** (experimental)
- Negotiates version `0xff00000e` (draft-14)
- Supports [[moq-msf|MSF]] draft-0 and [[moq-cmsf|CMSF]] draft-0
- Labeled "Experimental" in README

## History

- Daiki Matsui updated MOQT support from draft-11 to draft-14 in Shaka Player v5.0.5 (announced 2026-03-11)
- Alvaro Velad (Atème) built a POC that works with [[moqlivemock]] including subtitle display

## Related

- [[moqlivemock]] - Works with moqlivemock publisher
- [[moq-msf]] - Streaming format used
- [[moq-cmsf]] - CMAF format support
