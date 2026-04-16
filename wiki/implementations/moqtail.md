---
title: "MOQtail"
tags: [implementation, relay, publisher, subscriber]
date: 2026-04-10
last_updated: 2026-04-16
status: current
---

**GitHub**: [moqtail/moqtail](https://github.com/moqtail/moqtail)
**Maintainers**: Zafer Gurel, Ali C. Begen
**Draft support**: draft-14 (main), draft-16 (in progress)
**Updated**: 2026-04-16

# Overview

Draft-14 compliant MOQ Transport protocol libraries for publisher, subscriber, and relay components. Features real-time, live, and on-demand demo applications using both [[moq-loc|LOC]] and [[moq-cmsf|CMSF]] formats.

# Components

- **Relay** - Public relay at `relay.moqtail.dev`
- **Publisher** - Media publishing library
- **Subscriber** - Media subscription library
- **Demo apps** - Real-time, live, and on-demand examples

# Interop

- Registered in [[interop-runner]] matrix
- Successfully tested with [[moq-rs]] and [[moxygen]] (Feb 2026 Boulder hackathon)
- Published namespace, subscribed to tracks, and received objects with both relays
- FETCH working with [[moxygen]]

# Draft-16 Progress (April 2026)

Major push toward draft-16 compliance with 5 PRs merged on April 14-15:
- **PR #163**: Unified registry mapping messages and request_ids (+937/−1398, 47 files) — centralized correlation of REQUEST_OK, REQUEST_ERROR, and REQUEST_UPDATE messages with source requests
- **PR #160**: SubgroupHeader per draft-16 §10.4.2 (24 new type definitions, by ctllmp)
- **PR #162**: Consolidated OK messages into unified REQUEST_OK (fatih-alperen)
- **PR #159**: REQUEST_UPDATE refactoring (fatih-alperen)
- **PR #157**: Datagram draft-16 compatibility (beyzademirr)

A v0.9.1 release is pending (PR #173), including a fix for a race condition causing negative object deltas.

Draft-16 tracking PR: [#145](https://github.com/moqtail/moqtail/pull/145) (zafergurel)

# Known Issues

- Reported sending AUTHORITY param back in server setup (Feb 2026, noted by sandarsh)
- Empty extensionHeaders bug reported by Daiki Matsui ([moqtail#147](https://github.com/moqtail/moqtail/issues/147))

# Related

- [[interop-runner]] - Automated test framework
- [[interop-endpoints]] - Public relay endpoints
- [[interop-status]] - Cross-implementation testing
