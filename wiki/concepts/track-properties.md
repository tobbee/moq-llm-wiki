---
title: "Track Properties"
tags: [concept, transport, metadata, wire-format]
date: 2026-04-10
last_updated: 2026-09-02
status: current
---

Metadata system in [[moq-transport]] for conveying information about tracks and objects. Built on **Key-Value-Pair (KVP)** lists.

> **draft-18** (2026-05-12) does **not** rename or re-encode Properties — the wire format below is unchanged from draft-17. Two developments touch this page: the #1550 cross-draft collision was **resolved Apr 30** (PR #1624) but a sibling collision (#1632) remains open (see Known Issues); and post-18, **Range Filters** ([PR #1765](https://github.com/moq-wg/moq-transport/pull/1765), OPEN) introduces a `PROPERTY_FILTER` letting subscribers filter on Object Properties — the first message-level *consumer* of the Properties system. See [[joining-fetch-dissent]].

# Naming Evolution

The same concept has been renamed twice on its way through the WG:

| Draft | Top-level term | Object-side term | Wire-struct name |
|-------|----------------|------------------|------------------|
| 14 | "Object Extension Headers" (Object-only) | Extension Headers | inline `Extension Headers Length, Extension Headers` |
| 16 | "Extension Headers" (promoted to §2.5 as a Track-and-Object concept) | Extension Headers | `Extensions { Length, Headers }` |
| 17 | **"Properties"** | Object Properties | `Object Properties { Properties Length (vi64), Properties (..) }` |

draft-17 is a global rename — the bytes-on-the-wire are unchanged from draft-16, but every "Extensions" identifier becomes "Properties":
- The `EXTENSIONS` bit (0x01) in OBJECT_DATAGRAM and SUBGROUP_HEADER Type fields is renamed `PROPERTIES`. (In **draft-20** those `Type` fields are themselves renamed **`Type Flags`** and specified as bitfields, [#1774](https://github.com/moq-wg/moq-transport/pull/1774) — the `PROPERTIES` bit keeps `0x01` in both.)
- `Extensions Length` → `Properties Length`.
- §2.5 "Extension Headers" → §2.5 "Properties".
- §10.2.1.2 "Object Extension Headers" → "Object Properties".

# Wire Format

Track Properties are encoded as a list of Key-Value-Pairs. Each pair is `Type (i), [Length (i),] Value (..)` where `Length` is present iff `Type` is odd (the standard MoQT KVP convention; stable across 14/16/17).

## In Objects (Datagrams and Subgroup streams)
Objects include a Properties block with an explicit length prefix, allowing [[relays]] to skip the block if needed. However, since some properties convey core MOQT info (e.g., gap markers), most relays parse them.

- **draft-14**: two adjacent fields `Extension Headers Length (i)` + `Extension Headers (...)`.
- **draft-16**: packaged as a named struct `Extensions { Extension Headers Length (i), Extension Headers (..) }`. Maximum value length 2¹⁶−1 bytes.
- **draft-17**: same struct, renamed `Object Properties { Properties Length (vi64), Properties (..) }`.

Presence on Subgroup streams is gated by the `EXTENSIONS`/`PROPERTIES` bit in the SUBGROUP_HEADER `Type` / `Type Flags` (16+). Presence on Datagrams is gated by the same-named bit in the OBJECT_DATAGRAM `Type` / `Type Flags`. Presence on FETCH streams is gated by Serialization Flags bit 0x20 (16+).

**draft-20 asymmetry worth knowing**: in a datagram, `PROPERTIES = 1` with a Properties Length of **0** is a `PROTOCOL_VIOLATION`. In a SUBGROUP_HEADER it is **legal and expected** — that is exactly how a property-less Object is encoded inside a Subgroup whose header advertises properties for all its Objects.

## In Request Messages
Track Properties also appear in **REQUEST_OK** (added in draft-17, PR #1576). For request messages there is no separate length prefix — Properties are the last block and their length is inferred from remaining bytes in the message.

## Delta-encoded KVP Type (16+)

A subtle but important encoding change at **draft-16**: inside each KVP list, the `Type` field is now **delta-encoded** from the previous Type in the same list (or from 0 for the first entry):

> "Key-Value-Pairs encode a Type value as a delta from the previous Type value, or from 0 if there is no previous Type value." — `transport-16` §6.4.

This compresses lists of monotonically-numbered Property/Extension types and SETUP parameters. draft-14 used absolute `Type (i)`.

## Reserved code-point ranges (draft-17)

draft-17 carved out application-private ranges for Properties:
- `0x38..0x3F` — 8 code points encodable in 1 byte, for tight-space applications.
- `0x3800..0x3FFF` — 2048 code points (including grease) for 2-byte applications.

# Status / Existence interactions

- **draft-14**: "Object Does Not Exist" was an Object Status value (0x1). Properties were tied to Normal Objects only via prose.
- **draft-16**: removed the `ObjectDoesNotExist` status. Non-existence is now expressed via Properties (gap markers) and the FETCH End-of-Range serialization flags. Tightened "Properties only on Normal Objects" — non-Normal Objects with Properties is a PROTOCOL_VIOLATION.
- **draft-17**: added an explicit Datagram check — if both `STATUS` and `PROPERTIES` bits are set in OBJECT_DATAGRAM and the status is not Normal, it is a PROTOCOL_VIOLATION.

# Known Issues

## Properties Type Collision (#1550 → #1632) — RESOLVED in draft-20
Type-ID collision between **moq-transport-16** and **loc-01**. [[alan-frindell]] noted Apr 16 2026 that loc-02 also had unresolved collisions. **#1550 was CLOSED Apr 30** via **PR #1624** — a *provisional IANA registry for LOC properties* that resolved the 0x02/0x04 cross-draft collision **without renumbering existing codepoints**.

The fix didn't fully stick at first: **#1632** (yuanchao-chris, May 14) reported that the §15.8 tables still clashed. Verified against the draft text, the clash was real and survived two revisions — in **draft-18 and draft-19**, MOQT's own table assigned `0x06` to `SUBGROUP_DELIVERY_TIMEOUT` while the provisional table assigned the **same `0x06`** to LOC `TIMESTAMP`, in a space the draft explicitly says the two tables *share*. LOC `VIDEO_FRAME_MARKING` sat at `0x0A`.

**draft-20 renumbers the provisional entries and closes it** ([#1807](https://github.com/moq-wg/moq-transport/pull/1807), [#1818](https://github.com/moq-wg/moq-transport/pull/1818), [#1848](https://github.com/moq-wg/moq-transport/pull/1848)): LOC `TIMESTAMP` moves `0x06` → **`0x10`**, `VIDEO_FRAME_MARKING` moves `0x0A` → **`0x09`**, and [[moq-secure-objects|secure-objects]] gets its first provisional rows (`ENCRYPTED_LIST` = `0x0A`, `PADDING` = `0x32`). Nothing in the two draft-20 tables overlaps. A LOC **-03** carrying the matching numbers is still pending — until it ships, LOC implementations and MOQT-20 relays disagree about `0x06`/`0x10`.

## Property registry as of draft-20 (§15.8)

MOQT's own properties:

| Type | Name | Scope |
|------|------|-------|
| `0x02` | `OBJECT_DELIVERY_TIMEOUT` | Track, Object |
| `0x04` | `MAX_CACHE_DURATION` | Track |
| `0x06` | `SUBGROUP_DELIVERY_TIMEOUT` | Track, Object |
| `0x0B` | `IMMUTABLE_PROPERTIES` | Track, Object |
| `0x0E` | `DEFAULT_PUBLISHER_PRIORITY` | Track |
| `0x22` | `DEFAULT_PUBLISHER_GROUP_ORDER` | Track |
| `0x30` | `DYNAMIC_GROUPS` | Track |
| `0x3C` | `PRIOR_GROUP_ID_GAP` | Object |
| `0x3E` | `PRIOR_OBJECT_ID_GAP` | Object |
| `0x7f * N + 0x9D` | Reserved for greasing | Any |

Provisional registrations for sibling WG drafts, **sharing the same space**:

| Type | Name | Scope | Draft |
|------|------|-------|-------|
| `0x08` | `TIMESCALE` | Track, Object | [[moq-loc]] |
| `0x09` | `VIDEO_FRAME_MARKING` | Object | [[moq-loc]] |
| `0x0A` | `ENCRYPTED_LIST` | Object | [[moq-secure-objects]] |
| `0x0C` | `AUDIO_LEVEL` | Object | [[moq-loc]] |
| `0x0D` | `VIDEO_CONFIG` | Track, Object | [[moq-loc]] |
| `0x0F` | `AUDIO_CONFIG` | Track, Object | [[moq-loc]] |
| `0x10` | `TIMESTAMP` | Object | [[moq-loc]] |
| `0x32` | `PADDING` | Object | [[moq-secure-objects]] |

The two delivery-timeout properties gained **Object** scope in draft-19 ([#1476](https://github.com/moq-wg/moq-transport/pull/1476)); in draft-18 both were Track-only. Endpoints MUST ignore unknown Property types, skipping them per the KVP encoding.

## Parsing confusion in request messages
[[lorenzo-miniero]] (2026-03-18) reported confusion over Object Properties (length-prefixed) vs. request-message Properties (length inferred from remainder). [[alan-frindell]] confirmed the 14→16 diff removed the length field from the request-side diagram while the surrounding text still referenced it; cleaned up since.

## Authentication
Track Properties are **not authenticated** — relays can modify them undetected. Tracked as LOC issue #9.

# Related

- [[moq-transport]] — Protocol specification
- [[subgroups-and-objects]] — Where Properties appear in the Object wire format and how the surrounding framing changed across drafts
- [[moq-loc]] — LOC extensions registered as Properties
