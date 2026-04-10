---
title: "Subgroups and Objects"
tags: [concept, transport, data-model]
date: 2026-04-10
status: current
---

# Subgroups and Objects

The data hierarchy in [[moq-transport]].

## Hierarchy

```
Track
  └── Group (identified by Group ID)
        └── Subgroup (identified by Subgroup ID)
              └── Object (identified by Object ID)
```

### Track
A named stream of related data. Identified by (namespace, track name). Has associated [[track-properties]].

### Group
A collection of related objects, typically representing a temporal unit (e.g., a GOP in video). Groups are assigned monotonically increasing IDs.

### Subgroup
A subdivision within a group. Subgroups map to QUIC streams, enabling independent delivery and prioritization. A subgroup stream carries objects sequentially and can be FINed or RESET.

### Object
The atomic unit of data in MOQT. Contains the actual media payload (e.g., a video frame packaged in [[moq-loc]]).

## Wire Format

Objects are sent on subgroup streams. Each object has:
- Group ID (delta encoded within a subgroup)
- Object ID
- Properties block (with explicit length prefix)
- Payload

### Framing Questions
- **PR #1593** - Allow framing single Objects without Subgroup ID (simplification for single-object subgroups)
- **PR #1586** - Delta encoding of Group ID and Object ID in Fetch responses

## Ordering

- **GROUP_ORDER**: Controls delivery priority between groups. Value 0x0 was removed in a recent fix (PR #1575).
- Within a subgroup, objects must be delivered in order
- Across subgroups, delivery is independent

## Related

- [[moq-transport]] - Full protocol specification
- [[track-properties]] - Metadata on objects and tracks
- [[moq-loc]] - Container format for object payloads
