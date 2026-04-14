---
title: "Track Properties"
tags: [concept, transport, metadata]
date: 2026-04-10
last_updated: 2026-04-14
status: current
---

Metadata system in [[moq-transport]] for conveying information about tracks and objects.

# Overview

Track Properties are Key-Value Pairs (KVPs) attached to tracks and objects. They can convey:
- Core MOQT information (e.g., Gap indication)
- Application-level metadata
- [[moq-loc]] extensions (timestamps, frame marking, audio level)

# Wire Format

## In Objects (Datagram and Subgroup)
Objects include a properties block with an explicit length prefix, allowing [[relays]] to skip the block if needed. However, since some properties convey core MOQT info, all relays may need to parse them.

## In Request Messages
Track Properties appear in REQUEST_OK (added in draft-17, PR #1576). For request messages, there is no separate length prefix - the properties are the last block and their length is inferred from remaining bytes in the message.

# Known Issues

## Properties Type Collision (#1550)
There is a collision between moq-transport-16 and loc-01 property type IDs. This needs resolution to avoid breaking interop between LOC and the transport layer.

## Parsing Confusion
[[lorenzo-miniero]] (2026-03-18) reported confusion about parsing Track Properties in request messages vs object properties - the lack of explicit length prefix in request messages tripped up his parser. [[alan-frindell]] clarified the 14->16 diff removed the length field from the diagram but the text still referenced it.

## Authentication (#9 in LOC)
Track Properties currently can't be authenticated - they could be modified by relays without detection.

# Related

- [[moq-transport]] - Protocol specification
- [[moq-loc]] - LOC extensions use track properties
- [[subgroups-and-objects]] - Properties appear in the object wire format
