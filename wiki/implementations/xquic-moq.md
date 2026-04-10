---
title: "XQUIC MOQ (Alibaba)"
tags: [implementation, alibaba]
date: 2026-04-10
status: current
---

# XQUIC MOQ

**Organization**: Alibaba
**Maintainer**: Minghui Jiang
**Relay endpoint**: `47.96.89.233:4433` (raw QUIC only)

## Overview

Alibaba's XQUIC-based MOQ relay implementation. Passed all tests on the [[interop-runner]] and has been merged into the interop test matrix.

## Draft Support

- Draft-14 (interop runner target at time of testing)

## Status

- Available for public interop testing (announced 2026-03-13)
- Raw QUIC only (no WebTransport)
- Passed all interop runner tests

## Related

- [[interop-runner]] - Testing framework
- [[interop-endpoints]] - Full endpoint listing
