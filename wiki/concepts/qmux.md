---
title: "QMux - QUIC Multiplexing over TCP"
tags: [concept, transport, fallback]
date: 2026-04-10
last_updated: 2026-06-18
status: current
---

A fallback transport mechanism for [[moq-transport]] when UDP/QUIC is unavailable.

> **2026-06-18 — WG charter status: MOQT-over-QMux is OUT of the current charter.** **[[magnus-westerlund|Magnus Westerlund]] (co-chair) posted *"MOQT over QMUX"*** to the moq@ietf.org list June 17, conveying a decision from the chairs + AD (**Mike Bishop**): running MoQT over QMux is **outside the MoQ WG's current charter**. The agreed path forward: (1) maintain a **separate individual draft** documenting the technical requirements (`draft-nandakumar-moq-qmux-moqt`); (2) interested parties may **continue implementation + interop testing**; (3) **progress updates** via the list + WG sessions are permitted. **Hard constraint**: WG documents **cannot incorporate QMUX specs/discussion until a recharter happens**. This **scopes [[alan-frindell|afrind]]'s [PR #1628](https://github.com/moq-wg/moq-transport/pull/1628)** *"Add QMux framing for moqt-18 over TLS+TCP"* (OPEN, fixes [#1626](https://github.com/moq-wg/moq-transport/issues/1626)) out of the [[moq-transport]] draft for now. QMux itself is progressing in the QUIC WG as **`draft-ietf-quic-qmux`** (v01); the June-9/11 London hackathon ran live *"draft-18 over qmux-01"* TCP-fallback interop. See [[discussions-2026-06]].

# Problem

Some environments block UDP traffic (corporate networks, certain mobile networks), making QUIC unavailable. Safari also lacks WebTransport support, requiring an alternative.

# Solution

QMux provides QUIC-like multiplexing over TLS+TCP, enabling MOQT to work over TCP connections. [[luke-curley]] uses QMux for Safari support.

# ALPN Negotiation

QMux versions are indicated in the ALPN string:
- `qmux-00.moqt-17` - QMux version 0, MOQT draft-17
- `qmux-00.moqt-16` - QMux version 0, MOQT draft-16
- `qmux-00` alone implies draft-14 (legacy, technically incorrect)

When `qmux-01` comes out, it would double the ALPN permutations. Luke's qmux library automatically adds/strips the prefix for supported versions.

# Design Discussion

[[alan-frindell]] (2026-03-15): "I sort of think the right answer is to use moqt-16, and define that TLS+TCP moqt-16 => qmux-00" - generated 19 replies.

# Deployment

- Meta's [[moxygen]] relay at `fb.mvfst.net:9449` supports both QMux TLS/TCP and QUIC
- WebSocket proxy available at `wss://fb.mvfst.net:9450` proxying to TLS on port 9449

# Related

- [[moq-transport]] - Main protocol
- [[interop-endpoints]] - Relay endpoints supporting QMux
