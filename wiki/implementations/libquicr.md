---
title: "LibQuicR (Cisco)"
tags: [implementation, cpp, go, cisco]
date: 2026-04-10
last_updated: 2026-08-22
status: current
---

**Language**: C++ with Go bindings
**Organization**: Cisco (QuicR project)
**Maintainer**: [[suhas-nandakumar]], Tim Evens
**GitHub**: [quicr/libquicr](https://github.com/quicr/libquicr)
**Go bindings**: [Quicr/quicr-go](https://github.com/Quicr/quicr-go)
**Web client**: [quicr/moq-web](https://github.com/quicr/moq-web)
**Website**: [quicr.org](http://www.quicr.org)
**Slack**: #libquicr (C08ER7J16BF)

# Overview

Cisco's C++ MOQ Transport implementation with recently open-sourced Go bindings.

# Draft Support

- **C++ library (libquicr)**: draft-16 (ALPN `moqt-16`, code defines version `0xff00010`) — registered in the [[interop-runner]] as a **relay** endpoint at **draft-14**, i.e. behind the draft-18 target
- **Go bindings (quicr-go)**: draft-16 via libquicr
- Tags exist for `draft-14` and `draft-16`
- README still references draft-04 but code is current to draft-16
- Provides chat-like examples using subscribe namespace for participant discovery
- Basic clock example included

# Recent Highlights

Day-by-day PR/issue history lives in [[log|the wiki log]]; this section keeps only durable milestones.

- **Go bindings open-sourced** (2026-03-25) by [[suhas-nandakumar]].
- **London hackathon (June 2026)**: the ecosystem's web client [quicr/moq-web](https://github.com/quicr/moq-web) (a draft-18 deploy branch) drove working publish/subscribe against three independent relays — [[imquic]], the Nokia Research relay (`moqt.nokiaresearch.com:4443`), and afrind's [[moxygen]] relay (`fb.mvfst.net:9448`) — the first successful draft-18 cross-impl media the wiki recorded.
- **Two breaking API changes landed 2026-08-19/20**, the repo's first substantial public-surface work since the Go bindings: a **New Session Callback API** ([PR #911](https://github.com/Quicr/libquicr/pull/911), @GhostofCookie, +1916/−1634) reshaping how session lifecycle is surfaced to embedders, and **spdlog removed in favour of an abstract logger interface** ([PR #904](https://github.com/Quicr/libquicr/pull/904), @GhostofCookie, +1353/−1180) — dropping a hard third-party logging dependency so consumers can inject their own. A `timeq` update ([#916](https://github.com/Quicr/libquicr/pull/916), @RichLogan) landed alongside. **No release cut** for either. Further refactors are in flight (OPEN #918 alternative notify, #917 picoquic update, #915 data-ctx, #914 caller-resolved, #892 session refactor).

# Related

- [[aiomoqt]] - Python implementation in the same ecosystem
- [[interop-runner]] - Testing framework
