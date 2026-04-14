---
title: "aiomoqt (Python)"
tags: [implementation, python, async]
date: 2026-04-10
last_updated: 2026-04-14
status: current
---

**Language**: Python (asyncio)
**Maintainer**: Giovanni Marzot
**GitHub**: [gmarzot/aiomoqt](https://github.com/gmarzot/aiomoqt)
**Transport**: [gmarzot/aiopquic](https://github.com/gmarzot/aiopquic) (Python/Cython bindings to picoquic)

# Overview

Python async implementation of MOQ Transport, using aiopquic for the QUIC transport layer.

# Draft Support

- **Dual draft-14 and draft-16** with ALPN-based negotiation (`moq-00` for draft-14, `moqt-16` for draft-16)
- Latest release: v0.6.2
- Interop tested against 6 relay implementations across both drafts

# Related Projects

- **aiopquic** - Python/Cython bindings to picoquic (shared 2026-03-23)
- Giovanni also created content for the [moq-transport wiki](https://github.com/moq-wg/moq-transport/wiki) (2026-03-31)

# Related

- [[interop-runner]] - Testing framework
