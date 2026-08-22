---
title: "Lucas Pardue"
tags: [person, cloudflare, qlog]
date: 2026-08-22
last_updated: 2026-08-22
status: current
---

**Organization**: Cloudflare
**GitHub**: [LPardue](https://github.com/LPardue)
**Role**: Author of `draft-pardue-moq-qlog-moq-events`; QUIC/HTTP transport-logging specialist

# Contributions

- Author of **`draft-pardue-moq-qlog-moq-events`** (at **-07**, 2026-07-28) — the qlog event definitions for MOQT, the basis for the **mlog** structured logging implementations carry ([[moq-rs]] `--mlog-serve`, [[moxygen]], [[openmoq|moqx]]).
- Drove the IETF-125 feedback that produced [[mike-english|Mike English]]'s [[moq-rs]] [PR #163](https://github.com/cloudflare/moq-rs/pull/163) aligning mlog output with the -03 event set.
- **2026-08-19 Slack thread** on logging the QUIC-level resets that replaced draft-16's `FETCH_CANCEL` / `UNSUBSCRIBE` frames: argued that since **MoQ defines application-layer error codes for resets**, those codes belong in the mlog draft *"like how H3 error codes do"* — with raw values acceptable in the interim.

# Related

- [[mathis-engelbart]], [[alan-frindell]], [[mike-english]]
- [[moq-transport]], [[discussions-2026-08]]
