---
title: "MOQtail"
tags: [implementation, relay, publisher, subscriber]
date: 2026-04-10
last_updated: 2026-04-25
status: current
---

**GitHub**: [moqtail/moqtail](https://github.com/moqtail/moqtail)
**Maintainers**: Zafer Gurel, Ali C. Begen
**Draft support**: draft-14 (main), draft-16 (in progress)
**Updated**: 2026-04-16

# Overview

Draft-14 compliant MOQ Transport protocol libraries for publisher, subscriber, and relay components. Features real-time, live, and on-demand demo applications using both [[moq-loc|LOC]] and [[moq-cmsf|CMSF]] formats.

# Components

- **Relay** - Public relay at `relay.moqtail.dev`
- **Publisher** - Media publishing library
- **Subscriber** - Media subscription library
- **Demo apps** - Real-time, live, and on-demand examples

# Interop

- Registered in [[interop-runner]] matrix
- Successfully tested with [[moq-rs]] and [[moxygen]] (Feb 2026 Boulder hackathon)
- Published namespace, subscribed to tracks, and received objects with both relays
- FETCH working with [[moxygen]]

# Draft-16 Progress (April 2026)

Major push toward draft-16 compliance. PRs merged April 14–16:
- **PR #163**: Unified registry mapping messages and request_ids (+937/−1398, 47 files) — centralized correlation of REQUEST_OK, REQUEST_ERROR, and REQUEST_UPDATE messages with source requests
- **PR #160**: SubgroupHeader per draft-16 §10.4.2 (24 new type definitions, by ctllmp)
- **PR #162**: Consolidated OK messages into unified REQUEST_OK (fatih-alperen)
- **PR #159**: REQUEST_UPDATE refactoring (fatih-alperen)
- **PR #157**: Datagram draft-16 compatibility (beyzademirr)
- **PR #164 (merged Apr 16)**: `refactor: request error` — unified all ERROR messages under REQUEST_ERROR per draft-16 (fatih-alperen)
- **PR #165 (merged Apr 16)**: Removed draft-14-era hack that used a fake SUBSCRIBE to establish subscriptions with PUBLISH. Draft-16 publish-update makes the hack unnecessary (fatih-alperen).

**Open**:
- **PR #169**: "Fix/message parameters fix" — update fetch, subscribe-namespace, publish-namespace, and track-status messages to use the new message parameters (older drafts' key-value pairs were still in place).
- **PR #168**: Feature/draft16 fetch object — still in progress. **Apr 23 19:49–19:56 UTC**: @ctllmp resolved conflicts and merged `draft-16` back into the feature branch (`0570542`, `bf84690`, `1f967c1`), rebase work ahead of a push to land. **Apr 23 20:01 UTC**: @beyzademirr posted a detailed status comment on the PR describing the final wire-format and API shape (author's canonical PR description):
  - FETCH_HEADER (Type=0x05, Request ID) unchanged.
  - Replaced the fixed field sequence with a **Serialization Flags varint up front**: low 2 bits = subgroup mode (zero / prior / prior+1 / explicit); 0x04 `object_id` present (else prior+1); 0x08 `group_id` (else prior); 0x10 `priority` (else prior); 0x20 extensions; 0x40 datagram. 0x8C = End of Non-Existent Range, 0x10C = End of Unknown Range (§10.4.4.2). Any other value ≥ 128 → `ProtocolViolation`.
  - **FETCH objects no longer carry Object Status**; zero-length payload = zero-length Normal object.
  - **API**: Fetch stream entries are now a sum type. Rust: `enum FetchObject { Object(FetchObjectPayload), EndOfRange { kind, group_id, object_id } }`. TS: `FetchObject` class with `kind: 'object' | 'end_of_range'` and `newObject` / `newEndOfRange` factories. Added `FetchObjectContext` threaded through serialize/deserialize on both sides, mirroring the existing `previous_object_id` pattern used for `SubgroupObject`. Encoder emits the compact form by diffing against prior context; first object on a stream must be fully explicit.
  - **Datagram bit**: added `forwarding_preference` to `FetchObjectPayload` so FETCH-carried datagram objects round-trip without losing that metadata; drops the old kludge in `try_into_fetch` that stuffed `object_id` into `subgroup_id`.
  - Files touched: Rust `libs/moqtail-rs/src/model/data/{fetch_object.rs,object.rs}`, `libs/moqtail-rs/src/transport/data_stream_handler.rs`, `apps/relay/src/server/{track_cache.rs,message_handlers/fetch_handler.rs}`; TS `libs/moqtail-ts/src/model/data/{fetch_object.ts,object.ts}`, `libs/moqtail-ts/src/client/{data_stream.ts,publication/fetch.ts,client.ts}`. Relay cache now stores `FetchObjectPayload`; `EndOfRange` is wire-level-only. The client-js / meet / Rust client apps stay source-compatible — the enum transform is internal to the libs.
  +1094/−443 overall.
- **PR #145**: Umbrella draft-16 tracking PR (+12,200 / −10,236, zafergurel).

A v0.9.1 release is pending (PR #173), including a fix for a race condition causing negative object deltas.

- **PR #175 (merged Apr 21)**: *"fix wrong termination of a subscription"* — subscription inactivity timeout raised from **1s to 5s** to tolerate congested links; plus minor optimizations (+47/−42, zafergurel).
- **Issue #176 (opened Apr 21)**: *"Implement the scheduling algorithm (Draft 16 Section 7.2)"*. The current relay does not honor subscribe/publish message priorities (zafergurel).

Draft-16 tracking PR: [#145](https://github.com/moqtail/moqtail/pull/145) (zafergurel)

# Known Issues

- Reported sending AUTHORITY param back in server setup (Feb 2026, noted by sandarsh)
- Empty extensionHeaders bug reported by Daiki Matsui ([moqtail#147](https://github.com/moqtail/moqtail/issues/147))

# Related

- [[interop-runner]] - Automated test framework
- [[interop-endpoints]] - Public relay endpoints
- [[interop-status]] - Cross-implementation testing
