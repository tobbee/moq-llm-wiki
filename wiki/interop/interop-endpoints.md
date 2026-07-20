---
title: "Public Interop Endpoints"
tags: [interop, testing, infrastructure]
date: 2026-04-10
last_updated: 2026-07-19
status: current
---

Public relay endpoints available for MOQ interop testing.

# Cloudflare ([[moq-rs]])

| Endpoint | Draft | Transport | Notes |
|----------|-------|-----------|-------|
| `draft-14.cloudflare.mediaoverquic.com:443` | 14 | QUIC + WebTransport | Anycast edge relay |
| `draft-07.cloudflare.mediaoverquic.com:443` | 07 | QUIC + WebTransport | Deprecated |
| `interop-relay.cloudflare.mediaoverquic.com:443` | 14 | QUIC + WebTransport | Single instance, mlog enabled |
| `draft-16-manish.cloudflare.mediaoverquic.com:443` | 16 | QUIC + WebTransport | WIP, mlog enabled |
| `draft-18-interop.cloudflare.mediaoverquic.com:443` | **18** | QUIC + WebTransport | Auto-deployed from `draft-18-dev` ([PR #176](https://github.com/cloudflare/moq-rs/pull/176)); registered as `moq-rs-draft-18`. Since June 11-12 interim. |

Interop relays support `--mlog-serve`: grab relay-side traces at `/mlog/<connection-id>` over HTTPS.

# Meta ([[moxygen]])

| Endpoint | Draft | Transport | Notes |
|----------|-------|-----------|-------|
| `fb.mvfst.net:9448` | 14, 16, **18** | QUIC + WebTransport + **[[qmux]]** | Main relay (`moqt://` or HTTPS); draft-18 since June 9 hackathon (no REDIRECT/GOAWAY-on-request-stream/PUBLISH_BLOCKED yet); accepts qmux-01 conns since June 11 (afrind) |
| `fb.mvfst.net:9449` | 16 | QUIC + QMux TLS/TCP | [[qmux]] enabled |
| `wss://fb.mvfst.net:9450` | 16 | WebSocket -> TLS | Proxy via websocat |

# Luke Curley ([[moq-dev]])

| Endpoint | Draft | Transport | Notes |
|----------|-------|-----------|-------|
| `cdn.moq.dev/anon` | 14-17 | QUIC + WebTransport | Browser pub/sub testing; hop-routed across 14 edge nodes |
| `cdn.moq.pro/anon` | **14-19** | QUIC + WebTransport | Hang CDN relay; announced at the July-18 Vienna Hackathon as supporting the full draft-14…19 range. Also fronts RTMP (`rtmps://cdn.moq.pro:1935`), SRT (`srt://cdn.moq.pro:877`), and WHEP (`https://cdn.moq.pro/whep/…`) converters into/out of Hang broadcasts. **Caveats (July-19 Hackathon):** the IETF path is *"nowhere near as tested"* as Hang's own clients (Luke Curley) — SUBSCRIBE against a foreign publisher was hitting *"Track does not exist"* / *"publisher not found"* for Miniero, Jordi Cenzano, and afrind; the relay currently sends **unsolicited `PUBLISH_NAMESPACE`** (a legacy holdover for clients that don't implement `SUBSCRIBE_NAMESPACE`, to be changed to require it); QUIC `PATH` support was recently added but may not be deployed. **Filters are not implemented and Luke says he likely never will** — they *"complicate billing"* (a relay would have to charge on the unfiltered byte count) |

**Clients (Luke Curley):** the JS player/publisher at `moq.pub?relay=<host>` and `moq.watch?relay=<host>` and the Rust `moq-cli` (`cargo install moq-cli`) both support draft-14…19 against any relay (demoed at the July-18 Hackathon).

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

# Lorenzo Miniero ([[imquic]])

| Endpoint | Draft | Transport | Notes |
|----------|-------|-----------|-------|
| `lminiero.it:9000` | 16, 17, 18, **19** (partial) | QUIC + WebTransport | Runs imquic `main` (draft-18 since May 18; further LOC fixes June 9). Registered with the runner at draft-18 (June 11). **A first draft-19 build was deployed here July 18** for the Vienna Hackathon — filter serialization/deserialization works, but `OBJECT_PROPERTY_FILTER` / `TRACK_PROPERTY_FILTER` are currently ignored |

# Nokia ([[yu-you|Yu You]])

| Endpoint | Draft | Transport | Notes |
|----------|-------|-----------|-------|
| `moqt.nokiaresearch.com:4443/moq` | 17, **18** | QUIC + WebTransport | Nokia Research relay; pre-announced June 2, live for the June 9-10 hackathon. Registered with the [[interop-runner]] as `moqt-nr` at draft-18 (June 11). **Actively re-tested at the July-19 Vienna Hackathon** with fixes for redundant request_ids and force-forwarding changes by subscribers; both **PUB_NS + SUBSCRIBE** and **PUBLISH + SUBSCRIBE_TRACKS** flows verified working (afrind, Kota Yatagai). Note: by default the relay only issues upstream subscriptions when there is an active publisher for a track (a `RENDEZVOUS_TIMEOUT`=0 behavior) — a rendezvous-semantics interpretation Yu You patched mid-Hackathon so PUB_NS-then-SUBSCRIBE routes without a timeout |

# Related

- [[interop-runner]] - Automated test framework
- [[interop-status]] - Current interop state
- [[discussions-2026-06]] - June 2026 discussion notes
