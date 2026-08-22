---
title: "Mathis Engelbart"
tags: [person, tum, implementer, qlog]
date: 2026-08-22
last_updated: 2026-08-22
status: current
---

**Organization**: TU München (TUM)
**GitHub**: [mengelbart](https://github.com/mengelbart)
**Slack**: @Mathis Engelbart
**Role**: Author of the Go [[moqtransport]] library; active on transport encoding and **mlog/qlog** events

# Contributions

- Created **[mengelbart/moqtransport](https://github.com/mengelbart/moqtransport)** — the principal Go MOQ Transport library, built on `quic-go` + `webtransport-go` and registered in the [[interop-runner]]. Eyevinn maintains a downstream fork. See [[moqtransport]].
- **[Issue #1837](https://github.com/moq-wg/moq-transport/issues/1837)** *"FETCH and REQUEST_ERROR encoding"* (2026-07-31) — a WGLC-hygiene encoding question still open, reactivated Aug-20/21 when [[alan-frindell|afrind]] called for input and [[martin-duke|Martin Duke]] argued that moving joining fetch to a `SUBSCRIBE` parameter would beat either encoding option.
- **[PR #1836](https://github.com/moq-wg/moq-transport/pull/1836)** — `CLIENT_SETUP` → `SETUP` naming fix.
- **mlog / qlog event definitions**: in [[alan-frindell|Frindell]]'s Aug-19 Slack thread on logging QUIC-level stream resets, Engelbart established the current gap — mlog has only `stream_type_set`, which is **missing the new stream types**; with correct types a QUIC `reset_stream_frame` event could be matched to the originating MoQ request, otherwise dedicated events are needed.

# Related

- [[moqtransport]], [[moq-transport]], [[joining-fetch]]
- [[lucas-pardue]] — qlog/mlog counterpart in the same thread
