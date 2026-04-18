---
title: "OpenMOQ Software Consortium"
tags: [implementation, consortium, organization]
date: 2026-04-12
last_updated: 2026-04-18
status: current
---

**Website**: [openmoq.org](http://openmoq.org/)
**GitHub**: [openmoq](https://github.com/openmoq)

# Overview

An industry consortium advancing MOQ-based technology through high-performance, open-source software. Mission: deliver practical implementations that enable the next generation of media transport.

# Members

## Charter Members
- Akamai
- CDN77
- Cisco
- RED5
- Synamedia
- YouTube

## Standard Members
- Ateme
- Bitmovin
- Nano Cosmos
- Qualabs
- Vindral
- Wowza

## Academic Members
- University of Klagenfurt
- Özyeğin University

# Repositories

## openmoq/moxygen (moqx)
- **GitHub**: [openmoq/moxygen](https://github.com/openmoq/moxygen)
- Fork of Meta's [[moxygen]] relay, serving as the buffer repo for the planned **moqx** server/relay
- C++
- Updated: 2026-04-10
- **Now in the [[interop-runner]]** (added Apr 2026): strong results as a relay — moq-dev-js <-> moqx 6/6, moq-rs-draft-16 <-> moqx 5-6/6, moq-rs <-> moqx all pass

## openmoq/moq-relay-test
- **GitHub**: [openmoq/moq-relay-test](https://github.com/openmoq/moq-relay-test)
- Interop testing tool for MOQT relays
- Updated: 2026-03-20

## mondain/moqxr
- **GitHub**: [mondain/moqxr](https://github.com/mondain/moqxr)
- Origin Publisher, Contribution, and Ingest CLI for OpenMOQ
- C++
- Latest release: **v0.2.1** (Apr 17, 2026) — draft-16 interop fixes
- Prior: v0.2.0 (Apr 15) added draft-16 SUBSCRIBE KVP parser, dropped WebTransport subprotocol for draft-14, and made control-message handling non-blocking
- Updated: 2026-04-17

## red5pro/moq-playa (planned)
- Player component for OpenMOQ
- Not yet publicly available (as of 2026-04-10)

# Goals

- Distribute development costs across organizations
- Accelerate MOQ through collective expertise
- Ensure interoperability via standardized implementations
- Lower market barriers for new use cases beyond media (financial feeds, gaming, IoT, AR/VR)

# Development Status

Core infrastructure development is ongoing. The consortium has completed industry alignment, established a technical roadmap, and finalized legal structure and governance.

# Related

- [[moxygen]] - Meta's original relay that openmoq/moxygen forks
- [[interop-runner]] - Interop testing (moq-relay-test is a related tool)
- [[will-law]] - Akamai, charter member
- [[suhas-nandakumar]] - Cisco, charter member
