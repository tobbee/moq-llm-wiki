---
title: "LibQuicR (Cisco)"
tags: [implementation, cpp, go, cisco]
date: 2026-04-10
last_updated: 2026-06-11
status: current
---

> **2026-06-11 (London hackathon Day 2)**: **The quicr ecosystem's web client, [quicr/moq-web](https://github.com/quicr/moq-web) (a draft-18 deploy branch at `quicr.github.io/moq-web/branches/draft-18/`), drove the floor's cross-implementation draft-18 interop.** [[suhas-nandakumar|Suhas Nandakumar]] reported working publish/subscribe flow against three independent relays over June 10 — Lorenzo's [[imquic]] (sub-namespace flow still WIP), the Nokia Research relay (`moqt.nokiaresearch.com:4443/moq`), and afrind's [[moxygen]] relay (`fb.mvfst.net:9448`) — the first *successful* draft-18 cross-impl media the wiki has recorded. See [[discussions-2026-06]], [[interop-runner]].

**Language**: C++ with Go bindings
**Organization**: Cisco (QuicR project)
**Maintainer**: [[suhas-nandakumar]], Tim Evens
**GitHub**: [quicr/libquicr](https://github.com/quicr/libquicr)
**Go bindings**: [Quicr/quicr-go](https://github.com/Quicr/quicr-go)
**Website**: [quicr.org](http://www.quicr.org)
**Slack**: #libquicr (C08ER7J16BF)

# Overview

Cisco's C++ MOQ Transport implementation with recently open-sourced Go bindings.

# Draft Support

- **C++ library (libquicr)**: draft-16 (ALPN `moqt-16`, code defines version `0xff00010`)
- **Go bindings (quicr-go)**: draft-16 via libquicr
- Tags exist for `draft-14` and `draft-16`
- README still references draft-04 but code is current to draft-16
- Provides chat-like examples using subscribe namespace for participant discovery
- Basic clock example included

# Recent Activity

- Go bindings open-sourced (2026-03-25) by [[suhas-nandakumar]]

# Related

- [[aiomoqt]] - Python implementation in the same ecosystem
- [[interop-runner]] - Testing framework
