---
title: "Public Interop Endpoints"
tags: [interop, testing, infrastructure]
date: 2026-04-10
last_updated: 2026-06-10
status: current
---

Public relay endpoints available for MOQ interop testing.

> **2026-06-10 (London hackathon Day 1)**: **afrind brought the [[moxygen]] relay up on draft-18** at `fb.mvfst.net:9448` (QUIC + WebTransport, versions **14/16/18**) — the first publicly-announced draft-18 relay endpoint; **known gaps**: no REDIRECT errors, no GOAWAY-on-request-stream, no PUBLISH_BLOCKED. **[[imquic]] `lminiero.it:9000`** also runs draft-18 (imquic `main` since May; Lorenzo merged further LOC fixes June 9). **Luke Curley's `cdn.moq.dev`** is hop-routed across 14 edge nodes. See [[discussions-2026-06]].

# Cloudflare ([[moq-rs]])

| Endpoint | Draft | Transport | Notes |
|----------|-------|-----------|-------|
| `draft-14.cloudflare.mediaoverquic.com:443` | 14 | QUIC + WebTransport | Anycast edge relay |
| `draft-07.cloudflare.mediaoverquic.com:443` | 07 | QUIC + WebTransport | Deprecated |
| `interop-relay.cloudflare.mediaoverquic.com:443` | 14 | QUIC + WebTransport | Single instance, mlog enabled |
| `draft-16-manish.cloudflare.mediaoverquic.com:443` | 16 | QUIC + WebTransport | WIP, mlog enabled |

Interop relays support `--mlog-serve`: grab relay-side traces at `/mlog/<connection-id>` over HTTPS.

# Meta ([[moxygen]])

| Endpoint | Draft | Transport | Notes |
|----------|-------|-----------|-------|
| `fb.mvfst.net:9448` | 14, 16, **18** | QUIC + WebTransport | Main relay (`moqt://` or HTTPS); draft-18 since June 9 hackathon (no REDIRECT/GOAWAY-on-request-stream/PUBLISH_BLOCKED yet) |
| `fb.mvfst.net:9449` | 16 | QUIC + QMux TLS/TCP | [[qmux]] enabled |
| `wss://fb.mvfst.net:9450` | 16 | WebSocket -> TLS | Proxy via websocat |

# Luke Curley ([[moq-dev]])

| Endpoint | Draft | Transport | Notes |
|----------|-------|-----------|-------|
| `cdn.moq.dev/anon` | 14-17 | QUIC + WebTransport | Browser pub/sub testing |

Interop docs: [doc.moq.dev/concept/standard/interop.html](https://doc.moq.dev/concept/standard/interop.html)

# Alibaba ([[xquic-moq]])

| Endpoint | Draft | Transport | Notes |
|----------|-------|-----------|-------|
| `47.96.89.233:4433` | 14 | QUIC only | Passed all interop runner tests |

# Martin Duke ([[quiche-moq|Google QUICHE MoQT]])

| Endpoint | Draft | Transport | Notes |
|----------|-------|-----------|-------|
| `quichemoq.dev:443` | 16 | QUIC + WebTransport | 41/41 conformance tests passed (Feb 2026) |

# MOQtail

| Endpoint | Draft | Transport | Notes |
|----------|-------|-----------|-------|
| `relay.moqtail.dev` | 14 | WebTransport | Zafer Gurel's relay |

# Akamai

| Endpoint | Draft | Transport | Notes |
|----------|-------|-----------|-------|
| `moq-test.akaleapi.net` | - | - | Test tools |
| `moq-test-beta.akaleapi.net` | - | - | Beta version |

# Lorenzo Miniero (imquic)

| Endpoint | Draft | Transport | Notes |
|----------|-------|-----------|-------|
| `lminiero.it:9000` | 16, 17, **18** | QUIC + WebTransport | Runs imquic `main` (draft-18 since May 18; further LOC fixes June 9) |

# Related

- [[interop-runner]] - Automated test framework
- [[interop-status]] - Current interop state
