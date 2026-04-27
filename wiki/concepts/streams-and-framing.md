---
title: "Streams and Framing"
tags: [concept, transport, wire-format, streams]
date: 2026-04-27
last_updated: 2026-04-27
status: current
---

How [[moq-transport]] uses QUIC/WebTransport streams, and how the inventory of stream types changed across **draft-14 → draft-16 → draft-17**. Companion to [[subgroups-and-objects]] (which covers what flows *inside* each stream type).

# Stream classes

MoQT uses three transport primitives:
- **Bidirectional streams** — control + per-request
- **Unidirectional streams** — data (Subgroup, FETCH) and, in 17, control SETUP
- **Datagrams** — single-Object delivery without retransmission

# Bidirectional streams — biggest architectural change at draft-17

| Draft | Bidirectional usage |
|-------|---------------------|
| 14 | **Single control stream**, opened by client, starts with `CLIENT_SETUP`. Receiving a second bidi stream MAY be a PROTOCOL_VIOLATION. All control messages (SUBSCRIBE, PUBLISH, FETCH, TRACK_STATUS, …) flow on this one stream. |
| 16 | Same control stream + **`SUBSCRIBE_NAMESPACE`** carved out as a second permitted use of bidi streams. Spec explicitly lists "two uses of bidirectional streams". |
| 17 | **Bidi-per-request architecture.** The control stream becomes a *pair of unidirectional* SETUP streams (see below). Bidi streams are now used for *request streams*: each one starts with one of six message types — `TRACK_STATUS`, `SUBSCRIBE`, `PUBLISH`, `FETCH`, `PUBLISH_NAMESPACE`, `SUBSCRIBE_NAMESPACE`. |

The stated rationale (transport-17 §3.4) for splitting SETUP into a unidirectional pair: "Using a pair of unidirectional streams rather than a single bidirectional stream allows either peer to send data as soon as it is able. Depending on whether 0-RTT is available …" — this enables 0-RTT subscribe.

# Unidirectional streams

Stream-Type code points (the first varint on a unidirectional stream):

| Code point | Stream | -14 | -16 | -17 |
|------------|--------|-----|-----|-----|
| `0x05` | `FETCH_HEADER` | yes | yes | yes |
| `0x10..0x1D` | `SUBGROUP_HEADER` | yes (12 enumerated) | yes (bit-flag layout in `0x10..0x1F` + `0x30..0x3F`) | same as 16 |
| `0x2F00` | `SETUP` | n/a | n/a | **new** — pair of uni control streams replacing the bidi control stream |

A unidirectional Subgroup stream carries a single Subgroup; a unidirectional FETCH stream carries the response to a single FETCH request. See [[subgroups-and-objects]] for the per-Object wire format on each.

# Datagram type space

Code-point summary:

| Draft | OBJECT_DATAGRAM Type ranges |
|-------|------------------------------|
| 14 | `0x00..0x07`, `0x20..0x21` (10 enumerated values) |
| 16 | Bit-flag layout over `0x00..0x0F` + `0x20..0x21` + `0x24..0x25` + `0x28..0x29` + `0x2C..0x2D` |
| 17 | Same as 16, with `EXTENSIONS` bit renamed `PROPERTIES` and a new PROTOCOL_VIOLATION rule (`STATUS + PROPERTIES` on a non-Normal Object) |

The 16/17 datagram bit layout (`0b00X0XXXX`):

| Bit | Name (16) | Name (17) | Effect |
|-----|-----------|-----------|--------|
| 0x01 | EXTENSIONS | PROPERTIES | Property/Extension block present |
| 0x02 | END_OF_GROUP | END_OF_GROUP | Last Object of Group |
| 0x04 | ZERO_OBJECT_ID | ZERO_OBJECT_ID | Object ID field omitted; Object ID = 0 |
| 0x08 | DEFAULT_PRIORITY | DEFAULT_PRIORITY | Publisher Priority field omitted; inherited |
| 0x20 | STATUS | STATUS | Carries Object Status instead of payload |

Forbidden combinations: `STATUS + END_OF_GROUP` (16+); `STATUS + PROPERTIES` with non-Normal status (17 only).

# Stream Cancellation (RESET_STREAM error codes)

Subgroup-stream RESET_STREAM error registry has grown over time:

| Code | Name | Added |
|------|------|-------|
| 0x0 | INTERNAL_ERROR | 14 |
| 0x1 | CANCELLED | 14 |
| 0x2 | DELIVERY_TIMEOUT | 14 |
| 0x3 | SESSION_CLOSED | 14 |
| 0x4 | UNKNOWN_OBJECT_STATUS | **16** |
| 0x12 | MALFORMED_TRACK | **16** |
| 0x5 | TOO_FAR_BEHIND | **17** |
| 0x9 | EXCESSIVE_LOAD | **17** |

PR #1606 (merged Apr 23 2026, draft-17 → main) generalised reset codes across all request streams: added `GOING_AWAY` (0x4), `EXPIRED_AUTH_TOKEN` (0x7), `SESSION_CLOSED`; aligned `TOO_FAR_BEHIND` / `EXPIRED` between stream-reset and `PUBLISH_DONE` registries.

draft-17 also clarified termination semantics:
- Cancelling a **unidirectional** stream has no effect on outstanding subscriptions.
- Cancelling a **bidirectional request stream** terminates the corresponding `Subscription`, `Fetch`, `Track Status`, `Publish Namespace`, or `Subscribe Namespace` request.

# Setup negotiation and ALPN

ALPN strings advertise the MOQT version (and the optional [[qmux]] TCP fallback prefix):
- `qmux-00.moqt-17` — QMux v0 + draft-17
- `qmux-00.moqt-16` — QMux v0 + draft-16
- `qmux-00` (no suffix) — implies draft-14 (legacy, technically incorrect)

In **draft-17**, the SETUP message itself moved from a bidirectional control stream to a pair of unidirectional control streams (one per peer, code point `0x2F00`), carrying `CLIENT_SETUP` and `SERVER_SETUP` respectively. Either peer can begin sending immediately, without waiting for the other side's setup to land — which together with 0-RTT allows zero-round-trip SUBSCRIBE.

# Active and recent issues touching framing

- **PR #1586** — Object/Group ID delta encoding in FETCH responses — **merged Apr 27 2026** (closes Martin's #877 "Pack the bits").
- **PR #1542** — Split `SUBSCRIBE_NAMESPACE` into `SUBSCRIBE_NAMESPACE` (0x50, namespace discovery) and `SUBSCRIBE_TRACKS` (0x51, track subscription). Changes the request-stream message vocabulary.
- **PR #1608** — Make Subgroup ID identical to first Object ID in the Subgroup (closes #1405, #1593).
- **PR #1611** — Remove `PUBLISH_OK` message type, make it a `REQUEST_OK` alias.
- **PR #1606** — Generalize stream reset codes to all request streams (merged Apr 23 2026).
- **PR #1605** — Split `DELIVERY_TIMEOUT` into `OBJECT_DELIVERY_TIMEOUT` and `SUBGROUP_DELIVERY_TIMEOUT`.
- **#1534** — REDIRECT removed; use GOAWAY on a bidi stream instead (Apr 23 editor call).

# Related

- [[subgroups-and-objects]] — Per-Object wire format on Subgroup, Datagram, and FETCH streams (delta-encoding details)
- [[track-properties]] — Properties / Extension Headers inside Objects
- [[publish-subscribe]] — Control-message flow on the control / request streams
- [[qmux]] — TCP fallback that multiplexes MoQT streams over TLS+TCP
- [[moq-transport]] — Full protocol specification
