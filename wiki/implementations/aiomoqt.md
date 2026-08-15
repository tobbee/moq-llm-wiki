---
title: "aiomoqt (Python)"
tags: [implementation, python, async]
date: 2026-04-10
last_updated: 2026-08-15
status: current
---

**Language**: Python (asyncio)
**Maintainer**: Giovanni Marzot
**GitHub**: [gmarzot/aiomoqt](https://github.com/gmarzot/aiomoqt)
**Transport**: [gmarzot/aiopquic](https://github.com/gmarzot/aiopquic) (Python/Cython bindings to picoquic)

# Overview

Python async implementation of MOQ Transport, using aiopquic for the QUIC transport layer.

# Draft Support

- **Dual draft-14 and draft-16** with ALPN-based negotiation (`moq-00` for draft-14, `moqt-16` for draft-16), since extended toward the current interop drafts
- Latest release: **v0.10.6** (released ~July 8, 2026; PyPI [`aiomoqt`](https://pypi.org/project/aiomoqt/))
- Interop tested against 6 relay implementations across both drafts
- **draft-18 SUBSCRIBE_OK parse bug (found 2026-08-13; fix landing in v0.11.0)**: v0.10.6 decodes the SUBSCRIBE_OK Track-Properties block with **RFC 9000 varints instead of the LOC-style `vi64`**, so it runs off the end of the message whenever a property value is ≥ 64 (e.g. `TIMESCALE=1000`, encoded `83 e8`) — surfacing as *"truncated trailing extensions block."* Root-caused by Giovanni Marzot after Steven Riedl (Pluto TV) hit it subscribing to a [[moq-dev]] relay (whose SUBSCRIBE_OK is spec-correct); the encode/decode fix is bound for **aiomoqt v0.11.0** alongside **aiopquic v0.4.0** (both in-flight as of Aug-14). Workaround on v0.10.6: `MOQTMessage._tolerate_trailing_extensions = True` completes the subscribe but skips the property.
- **`relay_probe` tooling** (`python -m aiomoqt.tools.relay_probe --url …`): reports a relay's transport (QUIC vs H3/WT), its accepted draft set, and RTT — used Aug-14 to resolve WebTransport-path discovery for `fb.mvfst.net:9448` and `moqx-main.ci.openmoq.org:4433` (both want `/moq-relay`, negotiate draft-14/16/18). Ships in the examples with v0.10.6.

# Vienna Hackathon (IETF 126)

At the **July-19 IETF-126 Vienna Hackathon**, Giovanni Marzot ran a **control-plane interop regression with aiomoqt v0.10.6** ([CI run](https://github.com/gmarzot/aiomoqt/actions)), reporting *"good results"* and logging the output to the [ad-hoc interop wiki](https://github.com/moq-wg/moq-transport/wiki/ad-hoc-interop-reports). Marzot also maintains the [openmoq/moqx](https://github.com/openmoq/moqx) `moq_decode.py` decoder — used by other Hackathon participants (afrind) to debug wire-format errors — and landed a July-19 request_id cleanup ([moqx PR #496](https://github.com/openmoq/moqx/pull/496)) aligning it with draft-18.

# Related Projects

- **aiopquic** - Python/Cython bindings to picoquic (shared 2026-03-23)
- Giovanni also created content for the [moq-transport wiki](https://github.com/moq-wg/moq-transport/wiki) (2026-03-31)

# Related

- [[interop-runner]] - Testing framework
