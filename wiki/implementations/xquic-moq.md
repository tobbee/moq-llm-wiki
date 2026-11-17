---
title: "XQUIC MOQ (Alibaba)"
tags: [implementation, alibaba]
date: 2026-04-10
last_updated: 2026-11-17
status: current
---

**Organization**: Alibaba
**Maintainer**: Minghui Jiang; Yanmei Liu (active in IETF 127 interop)
**Public relay**: `https://moq.xquic.org/moqt` (WebTransport + raw QUIC; CA-signed cert since Nov-15 2026)
**Legacy relay endpoint**: `47.96.89.233:4433` (raw QUIC only, March 2026)

# Overview

Alibaba's XQUIC-based MOQT implementation — a client and a relay built on the XQUIC QUIC stack. It first joined the [[interop-runner]] matrix in March 2026 (draft-14, raw QUIC) and by the IETF 127 hackathon (Nov 2026) was one of the most active draft-22 test participants, running its own 40-case draft-22 suite against other relays.

# Draft Support

- **Draft-22** (client + relay) — registered in the runner on Nov-13 2026 ([#189](https://github.com/englishm/moq-interop-runner/pull/189)), the client case list grew to forty cases on Nov-15 ([#198](https://github.com/englishm/moq-interop-runner/pull/198)), and the client was fixed to use BoringSSL and system CA paths ([#196](https://github.com/englishm/moq-interop-runner/pull/196)). Exercised over raw QUIC, WebTransport draft-16 (which requires the `reset_stream_at` transport parameter `0x1d`) and WebTransport draft-07.
- Draft-14 (runner target at original enrollment, March 2026)

# Status

- Public draft-22 relay at `moq.xquic.org` (announced on Slack Nov-15 2026; runner [#194](https://github.com/englishm/moq-interop-runner/pull/194)).
- **All draft-22 scenarios passing on Suhas Nandakumar's moq-web end-to-end interop report** (Nov-16 2026) — the report's newest "gold" relay.
- During the IETF 127 hackathon the team fixed a FILL_PARAMETERS inner-count decode bug (found by Steven Riedl's moq-net client) and FETCH group-order handling when a FETCH omits GROUP_ORDER; a datagram-duplication report was still open on Nov-17. Its testing also surfaced issues in other relays: moxygen did not advertise `reset_stream_at` for WT-16, and quichemoq.dev omitted WT-Protocol. See [[discussions-2026-11]].

# Related

- [[interop-runner]] - Testing framework
- [[interop-endpoints]] - Full endpoint listing
