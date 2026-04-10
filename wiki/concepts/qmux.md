---
title: "QMux - QUIC Multiplexing over TCP"
tags: [concept, transport, fallback]
date: 2026-04-10
status: current
---

# QMux - QUIC Multiplexing over TCP

A fallback transport mechanism for [[moq-transport]] when UDP/QUIC is unavailable.

## Problem

Some environments block UDP traffic (corporate networks, certain mobile networks), making QUIC unavailable. Safari also lacks WebTransport support, requiring an alternative.

## Solution

QMux provides QUIC-like multiplexing over TLS+TCP, enabling MOQT to work over TCP connections. [[luke-curley]] uses QMux for Safari support.

## ALPN Negotiation

QMux versions are indicated in the ALPN string:
- `qmux-00.moqt-17` - QMux version 0, MOQT draft-17
- `qmux-00.moqt-16` - QMux version 0, MOQT draft-16
- `qmux-00` alone implies draft-14 (legacy, technically incorrect)

When `qmux-01` comes out, it would double the ALPN permutations. Luke's qmux library automatically adds/strips the prefix for supported versions.

## Design Discussion

[[alan-frindell]] (2026-03-15): "I sort of think the right answer is to use moqt-16, and define that TLS+TCP moqt-16 => qmux-00" - generated 19 replies.

## Deployment

- Meta's [[moxygen]] relay at `fb.mvfst.net:9449` supports both QMux TLS/TCP and QUIC
- WebSocket proxy available at `wss://fb.mvfst.net:9450` proxying to TLS on port 9449

## Related

- [[moq-transport]] - Main protocol
- [[interop-endpoints]] - Relay endpoints supporting QMux
