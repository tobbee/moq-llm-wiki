---
title: "Streams and Framing"
tags: [concept, transport, wire-format, streams]
date: 2026-04-27
last_updated: 2026-06-22
status: current
---

How [[moq-transport]] uses QUIC/WebTransport streams, and how the inventory of stream types changed across **draft-14 → draft-16 → draft-17 → draft-18**. Companion to [[subgroups-and-objects]] (which covers what flows *inside* each stream type).

> **draft-18** (published 2026-05-12) is mostly small-delta on framing plus a large Security-Considerations buildout. The framing-relevant changes: **Required Request ID removed** (#1615 — Request ID is now retained only for Joining FETCH and GOAWAY); a **FIRST_OBJECT bit added to SUBGROUP_HEADER** (#1618); **SUBSCRIBE_NAMESPACE split** into discovery (0x50) + SUBSCRIBE_TRACKS (0x51) (#1542); **PUBLISH_OK collapsed into a REQUEST_OK alias** (#1611); **DELIVERY_TIMEOUT split** into OBJECT_/SUBGROUP_ variants (#1605); **REDIRECT reworked** (#1534/#1617). Details inline below. Post-18, the live framing-design item is **Range Filters** ([PR #1765](https://github.com/moq-wg/moq-transport/pull/1765)) — see [[joining-fetch-dissent]].

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
| 18 | Same per-request model, with vocabulary changes: **`SUBSCRIBE_NAMESPACE` split** into `SUBSCRIBE_NAMESPACE` (0x50, namespace discovery) + `SUBSCRIBE_TRACKS` (0x51, track subscription) (#1542) — so a request stream now starts with one of *seven* message types; **`PUBLISH_OK` removed** as a distinct type, now a textual `REQUEST_OK` alias (#1611, with siblings `REQUEST_UPDATE_OK`/`TRACK_STATUS_OK`/`SUBSCRIBE_NAMESPACE_OK`/`PUBLISH_NAMESPACE_OK`); **Required Request ID removed** (#1615, kept only for Joining FETCH + GOAWAY); **GOAWAY may now appear on a request stream** for per-request migration (#1617). |

The stated rationale (transport-17 §3.4) for splitting SETUP into a unidirectional pair: "Using a pair of unidirectional streams rather than a single bidirectional stream allows either peer to send data as soon as it is able. Depending on whether 0-RTT is available …" — this enables 0-RTT subscribe.

# Unidirectional streams

Stream-Type code points (the first varint on a unidirectional stream):

| Code point | Stream | -14 | -16 | -17 |
|------------|--------|-----|-----|-----|
| `0x05` | `FETCH_HEADER` | yes | yes | yes |
| `0x10..0x1D` | `SUBGROUP_HEADER` | yes (12 enumerated) | yes (bit-flag layout in `0x10..0x1F` + `0x30..0x3F`) | same as 16 |
| `0x2F00` | `SETUP` | n/a | n/a | **new** — pair of uni control streams replacing the bidi control stream |

A unidirectional Subgroup stream carries a single Subgroup; a unidirectional FETCH stream carries the response to a single FETCH request. See [[subgroups-and-objects]] for the per-Object wire format on each.

**draft-18**: a **`FIRST_OBJECT` bit (0x40)** was added to the SUBGROUP_HEADER Type, signalling that the Subgroup contains the publisher's first Object; the type byte widens from `0b00X1XXXX` to `0b0XX1XXXX` (still a 1-byte varint) (#1618). This *replaced* the rejected "Subgroup ID == first Object ID" proposal (#1608, **closed unmerged** May 1). Also new in 18: the **fill fetch** redesign reuses the FETCH stream format to deliver a subscription's past groups on a dedicated unidirectional stream ([PR #1673](https://github.com/moq-wg/moq-transport/pull/1673), OPEN) — see [[joining-fetch]].

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

PR #1606 (merged Apr 23 2026, draft-17 → main) generalised reset codes across all request streams: added `GOING_AWAY` (0x4), `EXPIRED_AUTH_TOKEN` (0x7), `SESSION_CLOSED`; aligned `TOO_FAR_BEHIND` / `EXPIRED` between stream-reset and `PUBLISH_DONE` registries. **draft-18** then **split `DELIVERY_TIMEOUT`** into `OBJECT_DELIVERY_TIMEOUT` (replacing the old code) and a new `SUBGROUP_DELIVERY_TIMEOUT` (PR #1605, merged May 12).

draft-17 also clarified termination semantics:
- Cancelling a **unidirectional** stream has no effect on outstanding subscriptions.
- Cancelling a **bidirectional request stream** terminates the corresponding `Subscription`, `Fetch`, `Track Status`, `Publish Namespace`, or `Subscribe Namespace` request.

# Setup negotiation and ALPN

ALPN strings advertise the MOQT version (and the optional [[qmux]] TCP fallback prefix):
- `moqt-18` / `qmux-00.moqt-18` — draft-18 (current; Vienna interop target)
- `qmux-00.moqt-17` — QMux v0 + draft-17
- `qmux-00.moqt-16` — QMux v0 + draft-16
- `qmux-00` (no suffix) — implies draft-14 (legacy, technically incorrect)

In **draft-17**, the SETUP message itself moved from a bidirectional control stream to a pair of unidirectional control streams (one per peer, code point `0x2F00`), carrying `CLIENT_SETUP` and `SERVER_SETUP` respectively. Either peer can begin sending immediately, without waiting for the other side's setup to land — which together with 0-RTT allows zero-round-trip SUBSCRIBE.

# Framing changes that landed in draft-18 (merged)

- **PR #1586** — Object/Group ID delta encoding in FETCH responses — **merged Apr 27** (closes Martin's #877 "Pack the bits").
- **PR #1542** — Split `SUBSCRIBE_NAMESPACE` into `SUBSCRIBE_NAMESPACE` (0x50, discovery) + `SUBSCRIBE_TRACKS` (0x51, subscription); added `TRACK_NAMESPACE_PREFIX` (0x34); removed the BOTH mode — **merged May 1**.
- **PR #1618** — `FIRST_OBJECT` bit on SUBGROUP_HEADER — **merged**; *replaced* **PR #1608** (Subgroup ID == first Object ID), which was **closed unmerged May 1**.
- **PR #1611** — Remove `PUBLISH_OK` type, make it a `REQUEST_OK` alias — **merged Apr 29**.
- **PR #1606** — Generalize stream reset codes to all request streams — **merged Apr 23**.
- **PR #1605** — Split `DELIVERY_TIMEOUT` into `OBJECT_DELIVERY_TIMEOUT` + `SUBGROUP_DELIVERY_TIMEOUT` — **merged May 12**.
- **PR #1615** — Remove Required Request ID (kept only for Joining FETCH + GOAWAY) — **merged** (headline 17→18 consensus).
- **#1534 / PR #1617** — REDIRECT reworked: a REDIRECT error code on REQUEST_ERROR for new requests + a standalone REDIRECT for established subscriptions; GOAWAY may now ride a request stream.

# Pending (post-18, OPEN as of 2026-06-22)

- **PR #1765** — *Add Range Filters* ([[mo-zanaty|Mo Zanaty]]): new `SUBGROUP_FILTER` / `OBJECTID_FILTER` / `PRIORITY_FILTER` / `PROPERTY_FILTER` types; renames "Subscription Filters" → "Subscription Location Filters". The live framing-design item, held behind the June editorial freeze.
- **PR #1673** — *Replace Joining FETCH with fill fetch streams* (afrind): delivers a subscription's past groups on a unidirectional FETCH-format stream. See [[joining-fetch]].
- **PR #1674/#1675** — *Track Switching via the `SWITCH_FROM` parameter* (hard/soft mode). See [[switch-abr]].
- **PR #1779** — in-flight rename `PUBLISH_BLOCKED` → `PUBLISH_SKIPPED`.

# Related

- [[subgroups-and-objects]] — Per-Object wire format on Subgroup, Datagram, and FETCH streams (delta-encoding details)
- [[track-properties]] — Properties / Extension Headers inside Objects
- [[publish-subscribe]] — Control-message flow on the control / request streams
- [[qmux]] — TCP fallback that multiplexes MoQT streams over TLS+TCP
- [[moq-transport]] — Full protocol specification
