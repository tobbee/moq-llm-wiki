---
title: "QPACK Compression for MoQ Transport (MOQPACK)"
tags: [draft, extension, compression, individual]
date: 2026-04-11
status: current
draft_version: 0
ietf_url: "https://datatracker.ietf.org/doc/draft-frindell-moq-moqpack/"
---

# QPACK Compression for MoQ Transport (MOQPACK)

**draft-frindell-moq-moqpack-00** | Individual submission | Expires 2026-09-03

## Authors
- [[alan-frindell]] (Meta)

## Abstract

This extension enables QPACK compression for [[moq-transport]] control messages. MOQT control message fields and parameters can contain large, repeated values (e.g., track names, authorization tokens). MOQPACK leverages QPACK's dynamic table to compress these repeated values, significantly reducing overhead for sessions with many subscriptions.

**Example**: Sending 100 identical 500-byte authorization tokens consumes ~50KB uncompressed but only ~600 bytes with MOQPACK compression.

## Key Technical Details

### Extension Negotiation

Three setup options govern MOQPACK activation:
- `MOQT_QPACK_MAX_TABLE_CAPACITY` (0x10) - maximum dynamic table size
- `MOQT_QPACK_BLOCKED_STREAMS` (0x11) - stream blocking limits
- `MOQT_QPACK_INDEX_SETUP_AUTH` (0x12) - authorization token caching in dynamic table

QPACK compression activates only when both endpoints advertise non-zero table capacity.

### Message Format

A flag bit (0x40) distinguishes MOQPACK-formatted messages from standard MOQT encoding. For example, standard SUBSCRIBE (0x03) becomes MOQPACK SUBSCRIBE (0x43). Reserved message type range: 0x42-0x5E.

### Pseudo-Parameter Types

Three new parameter types encode namespace and track information as QPACK fields:
- `TRACK_NAMESPACE_ELEMENT` (0x0A) - individual namespace tuple elements
- `TRACK_NAMESPACE_SET` (0x0B) - complete serialized namespace tuples
- `TRACK_NAME` (0x0C) - track identifiers

### QPACK Adaptation

Rather than using QPACK's HTTP static table, the extension reinterprets the static table index as the MOQT parameter type integer, allowing existing QPACK libraries to work with minimal modification. Several standard QPACK encodings are prohibited:
- Static table indexed references (no predefined values)
- Dynamic name references (parameter types are always known integers)
- Huffman-encoded string literals
- Literal name encodings

### Stream Infrastructure

Two unidirectional streams carry QPACK signaling:
- `QPACK_ENCODER_STREAM` (0x1f107a60)
- `QPACK_DECODER_STREAM` (0x1f107a61)

### Error Handling

New session error code `MOQPACK_DECOMPRESSION_FAILED` (0xTBD) terminates sessions on undecodable blocks, oversized decompressed messages (>65,535 bytes), or QPACK protocol violations.

## Security Considerations

- **Dynamic table state**: Attackers with table knowledge could infer authorization patterns through compression ratio analysis
- **Compression oracles**: Mixing attacker-controlled data with secret tokens creates leakage risks
- **Resource exhaustion**: Endpoints must enforce negotiated capacity limits
- When `MOQT_QPACK_INDEX_SETUP_AUTH` is enabled, setup tokens enter the dynamic table; endpoints requiring "Never-Indexed Literal" semantics must disable this and send tokens as literals

## Links

- **Source repo**: [afrind/draft-frindell-moq-moqpack](https://github.com/afrind/draft-frindell-moq-moqpack)
- **Discussion**: moq@ietf.org mailing list
- **Datatracker**: https://datatracker.ietf.org/doc/draft-frindell-moq-moqpack/

## Notes

This is an individual submission (not yet adopted by the MOQ working group). It is a Standards Track draft. The approach is designed to be compatible with existing QPACK library implementations, requiring only configuration changes rather than code modifications.
