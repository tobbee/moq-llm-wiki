---
title: "Subgroups and Objects"
tags: [concept, transport, data-model, wire-format]
date: 2026-04-10
last_updated: 2026-09-02
status: current
---

The data hierarchy in [[moq-transport]], with a focus on how the on-wire encoding evolved across **draft-14 → draft-16 → draft-17 → draft-18 → draft-19 → draft-20**.

> **draft-18** (2026-05-12) touches this page's data plane in one place: a **`FIRST_OBJECT` bit (0x40)** was added to the SUBGROUP_HEADER Type (#1618), *replacing* the rejected "Subgroup ID == first Object ID" proposal (#1608, **closed unmerged**). The per-Object record encoding is otherwise unchanged from draft-17. FETCH delta encoding (#1586) and the reset-code generalization (#1606) landed as captured below.

> **draft-19** (2026-07-06) and **draft-20** (2026-08-31) leave the per-Object record bytes alone; what changed sits around them. **draft-19**: the two delivery timeouts became **Object** as well as Track Properties ([#1476](https://github.com/moq-wg/moq-transport/pull/1476)), the Object Status payload rule became **IANA-extensible** ([#1760](https://github.com/moq-wg/moq-transport/pull/1760)), and **datagrams take precedence** in cross-forwarding-preference scheduling ties ([#1780](https://github.com/moq-wg/moq-transport/pull/1780)). **draft-20**: the `Type` field of both headers is renamed **`Type Flags`** and respecified as a bitfield ([#1774](https://github.com/moq-wg/moq-transport/pull/1774)), **`OBJECT_DELIVERY_TIMEOUT` now starts at the last header byte** rather than the first payload byte ([#1844](https://github.com/moq-wg/moq-transport/pull/1844)), and a third End-of-Range flavour **`0x20C` End of Timed-Out Range** joins `0x8C`/`0x10C` ([#1822](https://github.com/moq-wg/moq-transport/pull/1822)). See [[streams-and-framing]] for the full framing delta.

# Hierarchy

```
Track
  └── Group (identified by Group ID)
        └── Subgroup (identified by Subgroup ID)
              └── Object (identified by Object ID)
```

## Track
A named stream of related data. Identified by `(Track Namespace, Track Name)`. Has associated [[track-properties]].

- **draft-14**: Track Namespace is "an ordered N-tuple of bytes where N can be between 1 and 32" — no on-wire structure given.
- **draft-16**: Adds an explicit `Track Namespace { Number of Fields, Field... }` and `Track Namespace Field { Length, Value }` wire structure. Each field value MUST be at least 1 byte. Range still 1–32.
- **draft-17**: Lower bound relaxed to **0–32 fields**. New §1.5.1 "Parsing Serialized Names" defines bijective canonicalisation rules (lowercase hex, no redundant percent-encoding).

## Group
A collection of related objects, typically a temporal unit (e.g., a GoP). Group IDs are monotonically increasing within a Track. The conceptual definition is **identical across 14/16/17**.

- 14 had a one-line note "the increase in time between two groups is not defined by the protocol"; 16/17 expanded this to a fuller statement that ordering and inter-Group spacing is application-defined.

## Subgroup
A subdivision within a Group. Subgroups map 1:1 to QUIC streams, enabling independent delivery and prioritisation. The conceptual definition is **stable across 14/16/17**.

- 14 said *forwarding preference* was a Track-level setting; 16/17 made it a **per-Object** property. 16 adds the rule "Every Object within a Group belongs to exactly one Subgroup or Datagram", and tightens "Objects from two subgroups MUST NOT be sent on the same stream" (was a soft "cannot" in 14).

## Object
The atomic unit of data, uniquely identified by `(Track Namespace, Track Name, Group ID, Object ID)`. The four-line core definition is **identical** across 14/16/17.

- **draft-16** introduced an explicit "three-state" existence model: an Object is *known to exist*, *known not to exist* (permanent), or *unknown*. Non-existent ranges are now expressed via Properties + the FETCH End-of-Range markers (see below) rather than a dedicated Object Status code.
- **draft-16** removed the `ObjectDoesNotExist` (0x1) Object Status value. Remaining statuses: `Normal` (0x0), `EndOfGroup` (0x3), `EndOfTrack` (0x4). 17 unchanged.

# Wire Format — version-by-version

The biggest churn in the data plane happened at **draft-15/16**. **draft-17 is mostly a rename**: `Extension Headers` → `Properties` everywhere, plus a self-contained varint definition (`(i)` annotation becomes `(vi64)`).

## Subgroup-stream Object encoding

The first byte(s) on a unidirectional Subgroup stream is a `SUBGROUP_HEADER`, then a sequence of per-Object records.

### draft-14 (enumerated Type)
```
SUBGROUP_HEADER {
  Type (i) = 0x10..0x1D,
  Track Alias (i),
  Group ID (i),
  [Subgroup ID (i),]
  Publisher Priority (8),
}

Object {
  Object ID Delta (i),
  [Extension Headers Length (i), Extension Headers (...)],
  Object Payload Length (i),
  [Object Status (i)],
  Object Payload (..),
}
```
- Type space is a flat lookup of 12 enumerated values across three orthogonal axes (Subgroup ID Field Present / Subgroup ID Value 0 vs first Object ID / Extensions Present / Contains End-of-Group).
- **Publisher Priority is always present.**
- `Object ID Delta + 1` is added to the previous Object ID; first Object uses Delta as absolute.
- `Object Status` only present when payload length is zero.

### draft-16 (bit-flag Type)
```
SUBGROUP_HEADER {
  Type (i) = 0x10..0x15 / 0x18..0x1D / 0x30..0x35 / 0x38..0x3D,
  Track Alias (i),
  Group ID (i),
  [Subgroup ID (i),]
  [Publisher Priority (8),]
}

Object {
  Object ID Delta (i),
  [Extensions (..),]
  Object Payload Length (i),
  [Object Status (i),]
  [Object Payload (..),]
}
```
Type bits (`0b00X1XXXX`):

| Bit | Name | Meaning |
|-----|------|---------|
| 0x01 | EXTENSIONS | Extensions present in *all* Objects in this Subgroup |
| 0x06 | SUBGROUP_ID_MODE (2 bits) | `0b00`=zero, `0b01`=first Object ID, `0b10`=Subgroup ID field present, `0b11`=reserved (PROTOCOL_VIOLATION) |
| 0x08 | END_OF_GROUP | Subgroup contains the last Object of the Group |
| 0x20 | DEFAULT_PRIORITY | **NEW.** Publisher Priority field omitted; inherit from subscription |

`Extensions` is now a named struct: `{ Extension Headers Length (i), Extension Headers (..) }`.

### draft-17 (rename + self-contained varint)
Bytes-on-the-wire are **identical to draft-16**. Only differences:
- `Extensions` → `Properties`, `EXTENSIONS` bit (0x01) → `PROPERTIES` bit. Field becomes `Object Properties { Properties Length (vi64), Properties (..) }`.
- All field annotations switch from `(i)` (RFC 9000 varint reference) to `(vi64)` (MoQ's own self-contained varint, see [[moq-transport]] §1.4.1). Encoded byte ranges differ (no 7-byte length, the `11111100` prefix is invalid).

### draft-18 (FIRST_OBJECT bit)
Per-Object record bytes unchanged. The only header change: a **`FIRST_OBJECT` bit (0x40)** is added to the SUBGROUP_HEADER Type, signalling the Subgroup contains the publisher's first Object; the Type byte widens from `0b00X1XXXX` to `0b0XX1XXXX` (still a 1-byte varint) (PR #1618). This *replaced* the **rejected** PR #1608 ("Subgroup ID == first Object ID", closed unmerged May 1).

### draft-19 (Object-scoped timeouts, extensible status)
Per-Object record bytes unchanged. `OBJECT_DELIVERY_TIMEOUT` / `SUBGROUP_DELIVERY_TIMEOUT` gain **Object** scope alongside Track ([#1476](https://github.com/moq-wg/moq-transport/pull/1476)) — see [[track-properties]] — and the rule about which Object Statuses may carry a payload becomes an **IANA registry** rather than fixed prose ([#1760](https://github.com/moq-wg/moq-transport/pull/1760)).

### draft-20 (`Type Flags`, timeout start point)
Per-Object record bytes still unchanged. The header field is renamed `Type` → **`Type Flags`** and specified as a bitfield with explicit invalid-value rules ([#1774](https://github.com/moq-wg/moq-transport/pull/1774)): for SUBGROUP_HEADER, bit 4 MUST be **1**, `SUBGROUP_ID_MODE = 0b11` is reserved, and any value ≥ 128 is invalid; for OBJECT_DATAGRAM, bit 4 (`0x10`) MUST be **0** and any set bit with unspecified meaning is a `PROTOCOL_VIOLATION`. Bit assignments are otherwise as in 16/17/18. Separately, **`OBJECT_DELIVERY_TIMEOUT` now starts counting at the last header byte** instead of the first payload byte ([#1844](https://github.com/moq-wg/moq-transport/pull/1844), closing the payload-less-Object case in [issue #1841](https://github.com/moq-wg/moq-transport/issues/1841)).

## Datagram Object encoding

### draft-14
```
OBJECT_DATAGRAM {
  Type (i) = 0x00..0x07, 0x20..0x21,
  Track Alias (i), Group ID (i),
  [Object ID (i),]
  Publisher Priority (8),
  [Extension Headers Length (i), Extension Headers (...)],
  [Object Status (i),]
  [Object Payload (..),]
}
```
10 enumerated Type values cover (End-of-Group / Extensions / Object-ID-present / payload-vs-status). Publisher Priority always present.

### draft-16
Same field set; Type becomes a bit-flag (`0b00X0XXXX`) over a wider range (`0x00..0x0F, 0x20..0x21, 0x24..0x25, 0x28..0x29, 0x2C..0x2D`):

| Bit | Name | Effect |
|-----|------|--------|
| 0x01 | EXTENSIONS | Extensions block present |
| 0x02 | END_OF_GROUP | Last Object of the Group |
| 0x04 | ZERO_OBJECT_ID | Object ID field omitted; Object ID = 0 |
| 0x08 | DEFAULT_PRIORITY | **NEW.** Publisher Priority omitted; inherit from subscription |
| 0x20 | STATUS | Carries Object Status instead of payload |

`STATUS + END_OF_GROUP` together is forbidden.

### draft-17
Bit layout unchanged. Renames: `EXTENSIONS` bit → `PROPERTIES` bit, `Extensions (..)` → `Properties (..)`. **New normative rule**: STATUS bit + PROPERTIES bit set together with non-Normal status → PROTOCOL_VIOLATION (only Normal Objects may have Properties).

## FETCH-stream Object encoding

This is where **PR #1586** lives — the FETCH per-Object header was completely redesigned at draft-16.

### draft-14 — fixed layout, every field absolute
```
FETCH_HEADER { Type (i) = 0x5, Request ID (i) }

Object {
  Group ID (i),
  Subgroup ID (i),
  Object ID (i),
  Publisher Priority (8),
  Extension Headers Length (i),
  [Extension Headers (...)],
  Object Payload Length (i),
  [Object Status (i)],
  Object Payload (..),
}
```
No delta encoding. Object Status carries non-existence in-line. Datagram-preference Objects encoded as `Subgroup ID = Object ID`.

### draft-16 — flag-gated, delta-encoded
```
Object {
  Serialization Flags (i),
  [Group ID (i),]
  [Subgroup ID (i),]
  [Object ID (i),]
  [Publisher Priority (8),]
  [Extensions (..),]
  Object Payload Length (i),
  [Object Payload (..),]
}
```

A single varint `Serialization Flags` controls every field:

**Subgroup ID mode (lower 2 bits, mask 0x03):**

| Bits | Meaning |
|------|---------|
| 0x00 | Subgroup ID = 0 |
| 0x01 | Subgroup ID = prior Object's Subgroup ID |
| 0x02 | Subgroup ID = prior Object's Subgroup ID + 1 |
| 0x03 | Subgroup ID field is present |

**Other bits:**

| Bit | Set (1) | Cleared (0) |
|-----|---------|-------------|
| 0x04 | Object ID field present | Object ID = prior Object ID + 1 |
| 0x08 | Group ID field present | Group ID = prior Object's Group ID |
| 0x10 | Priority field present | Priority = prior Object's Priority |
| 0x20 | Extensions present | Extensions absent |
| 0x40 | Datagram-preference Object (ignore Subgroup ID mode bits) | Use Subgroup ID mode |

**Reserved Serialization Flags values for non-existence ranges:**
- `0x8C` — End of **Non-Existent** Range
- `0x10C` — End of **Unknown** Range

For these markers, only Group ID and Object ID are present; they describe the closing endpoint of a contiguous range.

If the *first* Object in the FETCH response uses a "prior Object" reference, the receiver MUST treat it as a PROTOCOL_VIOLATION.

**Object Status was removed from FETCH responses** in draft-16 — non-existence is signalled exclusively via the End-of-Range flag values.

### draft-17 — clarification of "prior Object" across End-of-Range markers
Same wire-byte layout as draft-16. Two clarifications:
- Bit 0x40 wording rephrased ("Decode the Subgroup ID as indicated by the two least significant bits" when cleared).
- New explicit semantics for "prior" fields after an End-of-Range marker (`transport-17.txt` §10.4 ff.):
  - Prior Group ID / Object ID = the values in the End-of-Range indicator.
  - Prior Subgroup ID = the Subgroup ID from the **last actual Object** before the marker. Referencing prior Subgroup ID with no prior Object is a PROTOCOL_VIOLATION.
- Plus the global `Extensions` → `Properties` rename and `(i)` → `(vi64)` annotation.

# Delta Encoding Summary

| Field | Subgroup stream | Datagram | FETCH stream (16+) | FETCH (14) |
|-------|-----------------|----------|--------------------|--|
| Group ID | header field; absolute | absolute | delta from prior, gated by flag 0x08 | absolute |
| Subgroup ID | header field; mode-encoded (16+) | n/a (Object ID may be elided to 0) | 4-mode encoding (zero / prior / prior+1 / present) | absolute |
| Object ID | `Object ID Delta + 1` from prior | `[Object ID]` or 0 (16+) | gated by flag 0x04: present, or prior+1 | absolute |
| Publisher Priority | header field; optional via DEFAULT_PRIORITY (16+) | optional via DEFAULT_PRIORITY (16+) | gated by flag 0x10 | always present |
| Properties / Extensions | gated by EXTENSIONS bit (16+); previously a length field in 14 | gated by EXTENSIONS bit (16+) | gated by flag 0x20 | always present (length may be 0) |

Beyond per-Object delta encoding, the **Key-Value-Pair Type itself** became delta-encoded inside each Properties/Extensions list at draft-16: `Delta Type (i)` carries the difference from the previous Type in the same list, starting from 0. This compresses lists of monotonically-numbered KVP types.

# Other notable encoding changes

- **Self-contained varint (`vi64`) in draft-17.** draft-14/16 reference RFC 9000 §16 varints, which max out at **2⁶²−1** (4 valid lengths: 1, 2, 4, 8 bytes). Draft-17 defines its own encoding inline (§1.4.1) using a unary-style length prefix, with eight valid encoded lengths (1, 2, 3, 4, 5, 6, 8, 9 bytes) and a **new range of 0 to 2⁶⁴−1** via the 9-byte form (prefix `11111111`, 64 usable value bits). Extending the range to the full unsigned-64 was a primary motivator for the new encoding. The 7-byte length code (prefix `11111100`) is **invalid** and MUST close the session with PROTOCOL_VIOLATION. Wire impact of PR #1595.
- **Subgroup ID = first Object ID mode.** Stable across 14/16/17/18. In 14 it's a Type lookup value; in 16/17/18 it's `SUBGROUP_ID_MODE = 0b01`. A PR to *tighten* this into a normative "Subgroup ID equal to Object ID" rule (#1608) was **rejected/closed unmerged** (May 1); draft-18 instead added an explicit **FIRST_OBJECT bit** (#1618) to mark the first-Object Subgroup.
- **Object ID delta + 1 rule** (subgroup stream) is **identical** in all three drafts.
- **Stream Cancellation reset codes** grew over time: 14 had INTERNAL_ERROR / CANCELLED / DELIVERY_TIMEOUT / SESSION_CLOSED. 16 added UNKNOWN_OBJECT_STATUS (0x4) and MALFORMED_TRACK (0x12). 17 added TOO_FAR_BEHIND (0x5) and EXCESSIVE_LOAD (0x9), and PR #1606 (Apr 23 2026) generalised the codes (`GOING_AWAY`, `EXPIRED_AUTH_TOKEN`, `SESSION_CLOSED`).
- **Malformed Tracks list** went from 4 items (14) to 10 (16); 17 expanded item 7 to mention the END_OF_GROUP bit.

# Issue / PR status (updated June 2026)

- **PR #1586** — *Make Object ID and Group ID delta encoded in Fetch responses* — **merged Apr 27** (closes Martin's long-running #877 "Pack the bits"). Captured above for the draft-16/17/18 FETCH framing.
- **PR #1608** — *Make Subgroup ID identical to first Object Id* — **CLOSED unmerged May 1**, replaced by the **FIRST_OBJECT bit** (PR #1618, in draft-18).
- **PR #1593** — Allow framing single Objects without Subgroup ID — **closed** (subsumed by the FIRST_OBJECT-bit resolution).
- **#1550** — Properties Type collision (moq-transport-16 vs loc-01) — **CLOSED Apr 30** via PR #1624 (a provisional IANA registry for LOC properties, no renumbering). **But a sibling collision remains open**: **#1632** (May 14) reports draft-18 §15.8 still assigns Property Type IDs diverging from LOC-02 (e.g. MOQT `TIMESTAMP`=0x06 vs LOC `TIMESTAMP`=0x02). See [[track-properties]].

# Related

- [[moq-transport]] — Full protocol specification
- [[track-properties]] — KVP / Properties metadata system (renamed from Extension Headers in draft-17)
- [[streams-and-framing]] — Control, request, subgroup, and FETCH stream types and how they changed across versions
- [[moq-loc]] — Container format for object payloads
