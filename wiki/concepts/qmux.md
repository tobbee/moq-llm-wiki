---
title: "QMux - QUIC Multiplexing over TCP"
tags: [concept, transport, fallback]
date: 2026-04-10
last_updated: 2026-07-08
status: current
---

A fallback transport mechanism for [[moq-transport]] when UDP/QUIC is unavailable.

> **2026-07-08 — QMux comes back into focus: `draft-ietf-quic-qmux` hits `-02` (QUIC WG, July 6) and [[luke-curley|kixelated]] picks a QMux revision for his draft-19 MoQT implementation.** In the first *technical* `#moq` Slack traffic in ~2 weeks (July 7 21:52 CEST), **[[luke-curley|Luke Curley]]** asks *"qmux-02 or qmux-01 for draft 19?"* — i.e. which revision of the QUIC-WG QMux multiplexing protocol to target as the TCP-fallback substrate for his just-landed [[moq-transport|moqt-19]] support. **Lucas Pardue** (Cloudflare): *"There's no real difference other than some correctness enforcement… I'd suggest picking most recent [-02] as a baseline but that the wire format is backwards compatible. There's only a small risk of behavioural interop with 01 then."* **[[alan-frindell|Alan Frindell]]** (Meta): *"We're not supporting -19 so I guess it doesn't matter, but we can interop -18 on -01."* Context: **`draft-ietf-quic-qmux-02`** was published **2026-07-06** (WG document in the QUIC WG, superseding the individual `draft-opik-quic-qmux-01`), and **`draft-nandakumar-moq-qmux-moqt-00`** (the MOQT-over-QMux binding, Nandakumar/Jennings, 2026-03-01) is unchanged — so the version choice is over the *underlying* QMux layer, not the MoQ binding. Also newly noted: **`draft-kazuho-httpbis-http3-over-qmux-00`** (HTTP/3 over QMux, June 25) — QMux is accreting multiple application bindings. The exchange shows QMux still live as an implementation concern even though MOQT-over-QMux remains out of the MoQ WG charter (see below). See [[moq-dev]], [[discussions-2026-07]].
>
> **2026-06-18 — WG charter status: MOQT-over-QMux is OUT of the current charter.** **[[magnus-westerlund|Magnus Westerlund]] (co-chair) posted *"MOQT over QMUX"*** to the moq@ietf.org list June 17, conveying a decision from the chairs + AD (**Mike Bishop**): running MoQT over QMux is **outside the MoQ WG's current charter**. The agreed path forward: (1) maintain a **separate individual draft** documenting the technical requirements (`draft-nandakumar-moq-qmux-moqt`); (2) interested parties may **continue implementation + interop testing**; (3) **progress updates** via the list + WG sessions are permitted. **Hard constraint**: WG documents **cannot incorporate QMUX specs/discussion until a recharter happens**. This **scopes [[alan-frindell|afrind]]'s [PR #1628](https://github.com/moq-wg/moq-transport/pull/1628)** *"Add QMux framing for moqt-18 over TLS+TCP"* (OPEN, fixes [#1626](https://github.com/moq-wg/moq-transport/issues/1626)) out of the [[moq-transport]] draft for now. QMux itself is progressing in the QUIC WG as **`draft-ietf-quic-qmux`** (v01); the June-9/11 London hackathon ran live *"draft-18 over qmux-01"* TCP-fallback interop. See [[discussions-2026-06]].

# Problem

Some environments block UDP traffic (corporate networks, certain mobile networks), making QUIC unavailable. Safari also lacks WebTransport support, requiring an alternative.

# Solution

QMux provides QUIC-like multiplexing over TLS+TCP, enabling MOQT to work over TCP connections. [[luke-curley]] uses QMux for Safari support.

# ALPN Negotiation

QMux versions are indicated in the ALPN string:
- `qmux-01.moqt-18` - QMux version 1, MOQT draft-18 (the London hackathon ran live `draft-18 over qmux-01` TCP-fallback interop, June 9/11)
- `qmux-00.moqt-17` - QMux version 0, MOQT draft-17
- `qmux-00.moqt-16` - QMux version 0, MOQT draft-16
- `qmux-00` alone implies draft-14 (legacy, technically incorrect)

`qmux-01` (now progressing in the QUIC WG as `draft-ietf-quic-qmux`, which reached **`-02` on 2026-07-06**) doubles the ALPN permutations. Per Lucas Pardue (July 7), qmux-02 is wire-backwards-compatible with qmux-01 (the delta is "some correctness enforcement"), so `qmux-02.moqt-19` is the natural pairing for draft-19 impls while `qmux-01.moqt-18` remains interoperable. Luke's qmux library automatically adds/strips the prefix for supported versions.

# Design Discussion

[[alan-frindell]] (2026-03-15): "I sort of think the right answer is to use moqt-16, and define that TLS+TCP moqt-16 => qmux-00" - generated 19 replies.

# Deployment

- Meta's [[moxygen]] relay at `fb.mvfst.net:9449` supports both QMux TLS/TCP and QUIC
- WebSocket proxy available at `wss://fb.mvfst.net:9450` proxying to TLS on port 9449

# Related

- [[moq-transport]] - Main protocol
- [[interop-endpoints]] - Relay endpoints supporting QMux
