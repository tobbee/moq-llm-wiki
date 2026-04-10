---
title: "Moxygen (Meta)"
tags: [implementation, cpp, meta]
date: 2026-04-10
status: current
---

# Moxygen

**Language**: C++ (mvfst-based)
**Organization**: Meta
**Maintainer**: [[alan-frindell]], Joseph Beshay
**Relay endpoint**: `fb.mvfst.net`

## Overview

Meta's C++ MOQ relay implementation built on their mvfst QUIC library. Primarily a relay implementation rather than a full publisher/subscriber SDK.

## Draft Support

- Draft 14 and 16 supported
- Can negotiate draft 15
- [[qmux]] support on port 9449

## Public Infrastructure

- **QUIC relay**: `moqt://fb.mvfst.net:9448` / `https://fb.mvfst.net:9448/moq-relay`
- **QMux relay**: `fb.mvfst.net:9449` (TLS/TCP and QUIC)
- **WebSocket proxy**: `wss://fb.mvfst.net:9450` (proxying to TLS on 9449)

## Notable

- [[alan-frindell]] achieved 0-RTT subscribe with draft-16 + unidirectional control streams (2026-03-16)
- Frequently used as the "reference relay" for interop testing

## Related

- [[moq-rs]] - Alternative relay implementation
- [[interop-endpoints]] - Full endpoint listing
