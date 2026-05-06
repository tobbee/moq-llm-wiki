---
title: "MOQtail"
tags: [implementation, relay, publisher, subscriber]
date: 2026-04-10
last_updated: 2026-05-06
status: current
---

**GitHub**: [moqtail/moqtail](https://github.com/moqtail/moqtail)
**Maintainers**: Zafer Gurel, Ali C. Begen
**Draft support**: **draft-16 only on `main`** (draft-14 docs removed May 4 2026)
**Updated**: 2026-05-05

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

**Merged Apr 25** (both into the `draft-16` integration branch via PR #145):
- **PR #168 MERGED** Apr 25 17:15 UTC by @ctllmp (+1094/−443) — closes [#115](https://github.com/moqtail/moqtail/issues/115). Lands the FETCH-object wire format finalized in the Apr 23 PR comment: bitmask `FetchObjectSerializationFlags`, delta encoding, `0x8C`/`0x10C` end-of-range markers, datagram-forwarded objects (bit `0x40`), first-object-must-be-fully-explicit `ProtocolViolation` enforcement, and the Rust `enum FetchObject { Object, EndOfRange }` / TS `FetchObject` class API in both `moqtail-rs` and `moqtail-ts`.
- **PR #169 MERGED** Apr 25 17:17 UTC by @fatih-alperen (+994/−593). Migrates `FETCH`, `SUBSCRIBE_NAMESPACE`, `PUBLISH_NAMESPACE`, and `TRACK_STATUS` messages from older-draft key-value pairs to the draft-16 **Message Parameters** encoding. Validated by running the meet application before merge.

**PR #168 history** (merged Apr 25 17:15 UTC; details preserved here for reference): **Apr 23 19:49–19:56 UTC**: @ctllmp resolved conflicts and merged `draft-16` back into the feature branch (`0570542`, `bf84690`, `1f967c1`), rebase work ahead of the push that landed Apr 25. **Apr 23 20:01 UTC**: @beyzademirr posted a detailed status comment on the PR describing the final wire-format and API shape (author's canonical PR description):
  - FETCH_HEADER (Type=0x05, Request ID) unchanged.
  - Replaced the fixed field sequence with a **Serialization Flags varint up front**: low 2 bits = subgroup mode (zero / prior / prior+1 / explicit); 0x04 `object_id` present (else prior+1); 0x08 `group_id` (else prior); 0x10 `priority` (else prior); 0x20 extensions; 0x40 datagram. 0x8C = End of Non-Existent Range, 0x10C = End of Unknown Range (§10.4.4.2). Any other value ≥ 128 → `ProtocolViolation`.
  - **FETCH objects no longer carry Object Status**; zero-length payload = zero-length Normal object.
  - **API**: Fetch stream entries are now a sum type. Rust: `enum FetchObject { Object(FetchObjectPayload), EndOfRange { kind, group_id, object_id } }`. TS: `FetchObject` class with `kind: 'object' | 'end_of_range'` and `newObject` / `newEndOfRange` factories. Added `FetchObjectContext` threaded through serialize/deserialize on both sides, mirroring the existing `previous_object_id` pattern used for `SubgroupObject`. Encoder emits the compact form by diffing against prior context; first object on a stream must be fully explicit.
  - **Datagram bit**: added `forwarding_preference` to `FetchObjectPayload` so FETCH-carried datagram objects round-trip without losing that metadata; drops the old kludge in `try_into_fetch` that stuffed `object_id` into `subgroup_id`.
  - Files touched: Rust `libs/moqtail-rs/src/model/data/{fetch_object.rs,object.rs}`, `libs/moqtail-rs/src/transport/data_stream_handler.rs`, `apps/relay/src/server/{track_cache.rs,message_handlers/fetch_handler.rs}`; TS `libs/moqtail-ts/src/model/data/{fetch_object.ts,object.ts}`, `libs/moqtail-ts/src/client/{data_stream.ts,publication/fetch.ts,client.ts}`. Relay cache now stores `FetchObjectPayload`; `EndOfRange` is wire-level-only. The client-js / meet / Rust client apps stay source-compatible — the enum transform is internal to the libs.
  +1094/−443 overall.

**Still open**:
- **PR #145**: Umbrella draft-16 tracking PR against `main` (+12,200 / −10,236, zafergurel) — absorbed PR #168 + PR #169 on Apr 25 17:15/17:17 UTC; still has not landed on `main`.

A v0.9.1 release is pending (PR #173), including a fix for a race condition causing negative object deltas.

- **PR #175 (merged Apr 21)**: *"fix wrong termination of a subscription"* — subscription inactivity timeout raised from **1s to 5s** to tolerate congested links; plus minor optimizations (+47/−42, zafergurel).
- **Issue #176 (opened Apr 21)**: *"Implement the scheduling algorithm (Draft 16 Section 7.2)"*. The current relay does not honor subscribe/publish message priorities (zafergurel).

Draft-16 tracking PR: [#145](https://github.com/moqtail/moqtail/pull/145) (zafergurel)

## Apr 29 → 30 PRs (Scheduling Algorithm Lands, SUBSCRIBE_NAMESPACE Stream Split, Firefox Private-CA Docs)

- **[PR #178](https://github.com/moqtail/moqtail/pull/178) MERGED** Apr 30 12:23:13 UTC by **zafergurel** (+455/−62) — *feat: implementation of the scheduling algorithm in the relay*. Body: *"This PR implements the scheduling algorithm in the relay defined in the draft. Look at the comments for a detailed explanation of how priorities are computed based on the subscriber and publisher priorities."* Lands draft-17 §7.2 prioritization scheduling at the relay layer. **First moqtail merge implementing a draft-17-specific feature** rather than chasing draft-16 conformance. Closes Issue #176.
- **[PR #180](https://github.com/moqtail/moqtail/pull/180) MERGED** May 1 12:45:51 UTC by **zafergurel** (opened Apr 30 18:51:59 UTC, +1150/−488) into the `draft-16` branch — *feat: separate stream for subscribe_namespace*. Reviewer: DenizUgur. **moqtail merged the impl-side SUBSCRIBE_NAMESPACE/SUBSCRIBE_TRACKS split design ~10 hours BEFORE moq-transport PR #1542 itself merged** (May 1 22:59 UTC) — first impl actually shipping the split design. Still on the `draft-16` branch (PR #145 umbrella tracker still not landed on `main`).
- **[PR #179](https://github.com/moqtail/moqtail/pull/179) OPENED** Apr 29 09:44:42 UTC by **davemevans** (David Evans) (+11/−2) — *docs: add instructions for Firefox testing using private CA*. Firefox-specific HTTP/3 trust-quirk workaround: `network.http.http3.disable_when_third_party_roots_found` must be set when using mkcert + private CA. **First moqtail PR from David Evans** (new external contributor). Still open as of May 1.

## May 3 PR #145 (umbrella draft-16) gets 3 commits — two race-condition fixes bracketing a logging refactor

- **[PR #145](https://github.com/moqtail/moqtail/pull/145) updated** May 3 with three new commits from zafergurel:
  - `6f79910` 18:10 UTC — *fix: fixes a race condition*
  - `ee9f7e0` 19:02 UTC — *refactor: proper logging for moqtail-ts*
  - `ad78f25` 23:39 UTC — *fix: fixes a race condition*
  Two race-condition fixes ~5.5 hours apart bracket a logging refactor. PR now at 29 commits, +17187/−11733, 240 files vs. main. Still on the `draft-16` branch — has not landed on `main` despite PR #180 (separate stream for SUBSCRIBE_NAMESPACE) merging into the branch May 1.

## May 4 — PR #145 (umbrella draft-16) FINALLY MERGED into main; draft-14 docs removed; setEarlyDiscardPolicy added; sharmafb opens upstream-FETCH 3-PR series

After being open since **March 6** and absorbing 29 commits / 216 files / +17,114 / −11,744, the draft-16 umbrella PR landed on `main`.

- **[PR #145](https://github.com/moqtail/moqtail/pull/145) MERGED** May 4 19:23:22 UTC by **zafergurel** — *feat: draft-16 compatibility*. Body: *"Here is a substantial PR thanks to the huge difference between draft-14 and draft-16."* Brings moqtail into full compliance with [draft-ietf-moq-transport-16](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-16). Highlights:
  - **Setup/Session**: New ALPN-based ClientSetup/ServerSetup negotiation (#132). Two new demo apps: `apps/client-js` (browser subscriber) and `apps/meet` (WebRTC-over-MoQ video conferencing demo). Renamed `request_id` → `max_request_id` (#146).
  - **Control Message Overhaul**: Replaced VersionParameter with **MessageParameter** (#153) — typed parameters: `DeliveryTimeout`, `Expires`, `Forward`, `GroupOrder`, `LargestObject`, `NewGroupRequest`, `SubscriberPriority`, `SubscriptionFilter`. **Track Extensions** + **Object Extensions** (#155) added across `Publish`/`Subscribe`/`Fetch`/`PublishOk`/`SubscribeOk`/`FetchOk`. **Unified request ID registry** (#163).
- **[PR #181](https://github.com/moqtail/moqtail/pull/181) MERGED** May 4 19:39:57 UTC by zafergurel — *refactor: clean up object status values* (closes Issue #117 *"Remove 0x1 from Object Status"*).
- **[PR #182](https://github.com/moqtail/moqtail/pull/182) MERGED** May 4 20:12:09 UTC by zafergurel — *docs: remove draft 14 texts*. **moqtail formally drops draft-14 documentation** ~30 minutes after the umbrella draft-16 lands. moqtail is now a single-draft project (draft-16).
- **[PR #184](https://github.com/moqtail/moqtail/pull/184) MERGED** May 4 21:21:20 UTC by zafergurel — *feat: add setEarlyDiscardPolicy to moqtail-ts API* (+85/−38). Body: *"add setEarlyDiscardPolicy to cancel slow subgroup streams after a configurable timeout."* New developer-facing API for slow-stream protection.
- **README updated** May 4 20:27 UTC by **Ali C. Begen** (`1d39865`) — first commit on `main` from the co-maintainer in this update window.
- **CI release commits** (#173, #183, #185) bumped versions on `main`. v0.9.x release line presumably published.

### Aman Sharma upstream-FETCH 3-PR series (open)

- **[PR #186](https://github.com/moqtail/moqtail/pull/186) OPENED** May 4 21:37:33 UTC by **sharmafb** (Aman Sharma) — *[upstream fetches] Add command-line args for FETCH upstream timeout and gap limit [1/n]* (+15/0). Body: *"This is going to be the first in a series of commits that aims to implement upstream fetches."* Underscore-prefixed unused vars to be filled in by [2/n] and [3/n].
- **[PR #187](https://github.com/moqtail/moqtail/pull/187) OPENED** May 5 02:35:51 UTC by **sharmafb** — *[upstream fetches] Plumbing to forward FETCH data received from upstream [2/n]* (+71/−6, 4 files). Body: *"making some plumbing changes so that in handle_uni_stream, when we receive objects in a stream from the upstream, we can forward it to the downstream."*
- **[PR #188](https://github.com/moqtail/moqtail/pull/188) OPENED** May 5 02:50:23 UTC by **sharmafb** — *[upstream fetches] Function to send upstream fetch [3/n]* (+154/−8, 5 files). Body: *"writing a function send_upstream_fetch_for_range to send FETCHes upstream."*

**Net**: moqtail's biggest week of the year. Single-draft (draft-16) project on `main`; relay can now host upstream FETCH plumbing as a feature increment. The wholesale migration likely caused the **−4 pass / +4 fail** matrix regression on the May 5 interop runner once images rebuild.

## May 5 — moqtail-ts polish: per-subscription early-discard (#189), isValidTrackAlias BigInt fix (#191, co-authored by thexeos)

[[zafer-gurel]] continues the post-umbrella draft-16 release line — two `moqtail-ts` API fixes and a CI release bump in a ~25-minute window.

- **[PR #189](https://github.com/moqtail/moqtail/pull/189) MERGED** May 5 13:40:06 UTC by zafergurel (+18/−4, 4 files) — *feat(moqtail-ts): set early discard policy per subscription*. Body: *"Early discard policy can be set for each subscription separately."* **Refines the `setEarlyDiscardPolicy` API from May 4's PR #184** (which exposed it as a moqtail-ts-wide setting) to a per-subscription scope. Subscribers can now apply different slow-stream thresholds to different tracks (e.g. video vs audio, hero vs PiP camera).
- **[PR #191](https://github.com/moqtail/moqtail/pull/191) MERGED** May 5 14:00:08 UTC by zafergurel (+51/−4, 4 files; closes [#156](https://github.com/moqtail/moqtail/pulls/156); **co-authored by @thexeos**) — *fix(moqtail-ts): adds isValidTrackAlias validator*. Adds an `isValidTrackAlias` type guard in `src/client/util/validators.ts`, consolidating three inconsistent checks (`!trackAlias`, `=== undefined`, and a compound condition) into one canonical test that correctly accepts `0n` as a valid alias. **Fixes a BigInt-falsy bug** — several methods used `if (!trackAlias)` to check whether a `Map.get()` returned a value; since `trackAlias` is a `BigInt` and `0n` is falsy in JavaScript, the relay's first-assigned `trackAlias = 0` was incorrectly treated as missing. **First moqtail-ts merge with a non-maintainer co-author** — thexeos's PR #156 (filed earlier with the strict-undefined-check approach) was closed unmerged in favor of zafergurel's broader-validator landing, with attribution preserved via Co-Authored-By.
- **[PR #156](https://github.com/moqtail/moqtail/pull/156) CLOSED unmerged** May 5 14:01:57 UTC by **thexeos** — *"fix(moqtail-ts): use strict undefined check for trackAlias"*. Cited the same draft-16 wire constraint (relay assigns `trackAlias = 0` to first announcer); the maintainer's broader fix landed via #191 with thexeos credited.
- **[PR #190](https://github.com/moqtail/moqtail/pull/190) MERGED** May 5 14:04:21 UTC by github-actions[bot] — *[ci] release*. Cuts the next moqtail release line capturing #189 + #191.
- **[PR #179](https://github.com/moqtail/moqtail/pull/179) updated** May 5 10:04 UTC by **davemevans** — *docs: add instructions for Firefox testing using private CA*. Still open. Documents the `network.http.http3.disable_when_third_party_roots_found` Firefox config required when running moqtail behind mkcert + private CA.
- **PRs #186 / #187 / #188** (sharmafb's upstream-FETCH 3-PR series) — **all 3 still open**, no movement.

**Net**: Two-merge polish day on `moqtail-ts`. The per-subscription early-discard refinement (#189) signals the slow-stream API is being driven by real-application feedback (likely from `apps/meet`). The thexeos co-authorship in #191 establishes a template for absorbing externally-proposed fixes — the maintainer takes the broader fix while preserving credit. The CI release line (#190) suggests moqtail-ts will publish frequent post-umbrella draft-16 patches as the API hardens.

# Known Issues

- Reported sending AUTHORITY param back in server setup (Feb 2026, noted by sandarsh)
- Empty extensionHeaders bug reported by Daiki Matsui ([moqtail#147](https://github.com/moqtail/moqtail/issues/147))

# Related

- [[interop-runner]] - Automated test framework
- [[interop-endpoints]] - Public relay endpoints
- [[interop-status]] - Cross-implementation testing
