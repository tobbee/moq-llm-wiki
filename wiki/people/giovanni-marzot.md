---
title: "Giovanni Marzot"
tags: [person, openmoq, implementer]
date: 2026-08-22
last_updated: 2026-08-22
status: current
---

**GitHub**: [gmarzot](https://github.com/gmarzot)
**Affiliation**: [[openmoq|OpenMOQ]]
**Role**: Author of [[aiomoqt]]; [[openmoq|moqx]] contributor; interop-runner registrant

# Contributions

- Author of **[[aiomoqt]]** — the Python asyncio MoQT client, registered in the [[interop-runner]] as `aiomoqt` plus two relay roles (`aiomoqt-relay`, `aiomoqt-relay-quic`). On the 2026-08-22 cut aiomoqt scores a clean **18/18** against `moqx`, `moxygen`, and `moq-rs-draft-18`.
- Registered the **moqx client role** (runner PR #66) and **aiomoqt** (PR #67), both merged 2026-05-13.
- Active on [[moxygen]] interop-client **ALPN derivation** work — issues/PRs #220 → #222 → #223 (deriving ALPNs, adding `--versions`, reporting the negotiated draft), part of the tracked gap where moxygen's interop *client* lacked `moqt-18` in `kInteropAlpns`.
- Contributes metrics and error-handling fixes to [[openmoq|moqx]].

# Related

- [[aiomoqt]], [[openmoq]], [[moxygen]], [[interop-runner]]
