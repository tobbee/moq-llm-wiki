---
title: "Aman Sharma"
tags: [person, editor, moq-transport, michigan]
date: 2026-09-03
last_updated: 2026-09-03
status: current
---

**Affiliation**: University of Michigan (`amsharma@umich.edu`)
**GitHub**: [sharmafb](https://github.com/sharmafb)
**Role**: [[moq-transport]] document editor; active interop tester and relay-conformance bug-finder

# Contributions

- **[[moq-transport]] editor** — carries editorial and design work on the core transport draft. Opened **[issue #1897](https://github.com/moq-wg/moq-transport/issues/1897)** *"FETCH doesn't need an End Location or End of Track"* (Sep-2 2026), a FETCH-range simplification surfaced by hackathon testing; and earlier **[issue #1860](https://github.com/moq-wg/moq-transport/issues/1860)** on atomic subscription bundles.
- **[[moqtail]] contributor** — landed FETCH-priority test tooling and the relay's **upstream FETCH-on-cache-miss** capability (the `[1/n]`–`[3/n]` PR series, [#186](https://github.com/moqtail/moqtail/pull/186)–[#188](https://github.com/moqtail/moqtail/pull/188), completed in [#193](https://github.com/moqtail/moqtail/pull/193)).
- **Interop bug-finder (Sep-2 2026 hackathon)** — testing clients against [[moqtail]]'s live `relay18.moqtail.dev`, root-caused a string of relay bugs that Zafer Gürel fixed live: a **concurrent-PUBLISH track-record race** (check-then-insert `has_track`/`add_track`, one record overwriting the other), a **DUPLICATE_SUBSCRIPTION** wrongly returned after a cancelled subscription, **REQUEST_ERROR sent on the control stream** instead of the request's own bidi stream, **REQUEST_UPDATE ignored for PUBLISH** (a FORWARD change not applied), and a **FIN-instead-of-reset** on a mid-subgroup upstream reset. See [[interop-runner]] and [[discussions-2026-09]].

# Related

- [[moq-transport]], [[moqtail]], [[interop-runner]], [[alan-frindell]], [[zafer-gurel]]
