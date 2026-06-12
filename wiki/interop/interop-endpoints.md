---
title: "Public Interop Endpoints"
tags: [interop, testing, infrastructure]
date: 2026-04-10
last_updated: 2026-06-12
status: current
---

Public relay endpoints available for MOQ interop testing.

> **2026-06-12 (formal London interim Day 1-2)**: **[[moq-rs|cloudflare/moq-rs]] deploys a draft-18 relay** at `moqt://draft-18-interop.cloudflare.mediaoverquic.com:443` — auto-deployed from the `draft-18-dev` branch ([PR #176](https://github.com/cloudflare/moq-rs/pull/176)) after the draft-18 work merged ([PR #173](https://github.com/cloudflare/moq-rs/pull/173), June 11) — and is now registered with the [[interop-runner]] as `moq-rs-draft-18` (third draft-18 endpoint after `moqt-nr` + `imquic`). **afrind's [[moxygen]] `fb.mvfst.net:9448` relay now also accepts [[qmux]]-01 connections** (afrind June 11 09:51: *"draft-18 over qmux-01"*). **Mike English created a [`moq-wg/moq-transport` GitHub-wiki page `ad-hoc-interop-reports`](https://github.com/moq-wg/moq-transport/wiki/ad-hoc-interop-reports)** to track anecdotal floor interop the runner can't see (Suhas's moq-web ↔ Lorenzo/Nokia/mvfst; Kota's Moqtopus ↔ imquic). See [[discussions-2026-06]].
>
> **2026-06-11 (London hackathon Day 2)**: **Four draft-18 relays are now live for the floor** — afrind tallies them as *"Luke, Yu, Lorenzo and us"*: [[moxygen]] `fb.mvfst.net:9448`, the **Nokia Research relay `moqt.nokiaresearch.com:4443/moq`** (Yu You; the v17/v18 relay pre-announced June 2, now reachable), [[imquic]] `lminiero.it:9000`, and Luke Curley's `cdn.moq.dev`. **Suhas Nandakumar's quicr/moq-web (draft-18) reported working publish/subscribe interop against moxygen, Nokia, and imquic** over June 10 (sub-namespace flow still WIP vs imquic). **Two of these are now registered with the [[interop-runner]]** — `moqt-nr` (Nokia) and `imquic` draft-18 — breaking the matrix's 9-day 0-at-target floor. See [[discussions-2026-06]].
>
> **2026-06-10 (London hackathon Day 1)**: **afrind brought the [[moxygen]] relay up on draft-18** at `fb.mvfst.net:9448` (QUIC + WebTransport, versions **14/16/18**) — the first publicly-announced draft-18 relay endpoint; **known gaps**: no REDIRECT errors, no GOAWAY-on-request-stream, no PUBLISH_BLOCKED. **[[imquic]] `lminiero.it:9000`** also runs draft-18 (imquic `main` since May; Lorenzo merged further LOC fixes June 9). **Luke Curley's `cdn.moq.dev`** is hop-routed across 14 edge nodes. See [[discussions-2026-06]].

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
| `lminiero.it:9000` | 16, 17, **18** | QUIC + WebTransport | Runs imquic `main` (draft-18 since May 18; further LOC fixes June 9). Registered with the runner at draft-18 (June 11) |

# Nokia ([[yu-you|Yu You]])

| Endpoint | Draft | Transport | Notes |
|----------|-------|-----------|-------|
| `moqt.nokiaresearch.com:4443/moq` | 17, **18** | QUIC + WebTransport | Nokia Research relay; pre-announced June 2, live for the June 9-10 hackathon. Registered with the [[interop-runner]] as `moqt-nr` at draft-18 (June 11) |

# Related

- [[interop-runner]] - Automated test framework
- [[interop-status]] - Current interop state
