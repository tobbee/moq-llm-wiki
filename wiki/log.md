---
title: Wiki Log
tags: [log, maintenance]
date: 2026-04-14
last_updated: 2026-04-22
status: current
---

Chronological record of all ingestions, queries, and maintenance operations.

# 2026-04-22 - moq-rs datagram rate restored, quiche session-parameter API, moqtail timeout fix, interop +2 again

**Operation**: Update
**Sources**:
- Slack: No MCP access this session — skipped.
- GitHub moq-wg repos: Only activity — two comments from [[luke-curley]] on [msf#153](https://github.com/moq-wg/msf/issues/153) (Apr 21 16:21/16:26 UTC) reopening the static-init / annexb simplification path for `initTrack`. No new issues/PRs on moq-transport, msf (besides the comments), loc, secure-objects, cmsf, catalog-format, privacy-pass. PR #1607 quiet since Apr 20.
- Implementation repos:
  - **cloudflare/moq-rs**: [[suhas-nandakumar]] pushed **five more commits** to PR #157 on Apr 21 06:39–08:46 UTC, follow-up to the 03:13–05:30 UTC debug run in yesterday's log. Fixes on the forwarding path (track_extensions propagation, stream header type mismatch, datagram broadcast-channel queueing, **datagram rate restored 1/sec → 50/sec**, SUBSCRIBE-flow object encoding).
  - **google/quiche (moqt)**: Two Apr 22 commits by [[martin-duke]] — `c8ff6dc4` (03:59 UTC) moves non-message data structures out of `moqt_messages.h`; `10045277` (04:16 UTC) lets `MoqtClient`/`MoqtServer` control session parameters (groundwork for partial-object delivery).
  - **moqtail/moqtail**: PR #175 merged Apr 21 06:17 UTC by [[zafergurel]](https://github.com/zafergurel) — subscription inactivity timeout raised **1s → 5s** for congested links (+47/−42). New Issue #176 opened Apr 21 17:42 UTC — *"Implement the scheduling algorithm (Draft 16 Section 7.2)"* — relay currently does not honor message priorities.
  - **video-dev/moq-js**: PR #70 still open, no new activity since Apr 20 18:55 UTC.
  - **moq-dev/moq**: Quiet Apr 21 (PRs #1322, #1330, #1335, #1338 unchanged; #1330 and #1335 were in fact merged earlier on Apr 20 — status carried forward correctly in tree).
  - **birneee/quiche_moq**: Quiet.
- Mailing list: No new messages since Apr 19 weekly digest.
- IETF Datatracker: No new WG or individual draft versions since moq-lite-04 (Apr 9).
- Interop runner: Apr 22 00:30 UTC run at **22 / 69 / 14** — **second consecutive +2 pass** (Apr 20 18/73/14 → Apr 21 20/71/14 → Apr 22 22/69/14). Now just 1 short of the Apr 16 baseline.
- MoQ Monthly: Still only issue #0 (Mar 4).
- tobbee/moq-llm-wiki issues: No open issues, none updated since Apr 21.

**Pages updated**: discussions/discussions-2026-04.md, drafts/moq-msf.md, implementations/moq-rs.md, implementations/moqtail.md, implementations/quiche-moq.md, interop/interop-runner.md, index.md

**Key findings**:

*cloudflare/moq-rs PR #157 — forwarding-path repair (Apr 21 morning UTC)* — After the lifecycle fixes in the 03:13–05:30 UTC session, Suhas ran a second batch between 06:39 and 08:46 UTC focused on the relay's forwarding path:
- `7f95515` — Forward `track_extensions` through PUBLISH messages so extensions survive relay hops.
- `4e33675` — Fix stream header type mismatch when forwarding objects that have no extensions.
- `0112f91` — Move datagram forwarding onto a broadcast channel so per-subscriber queues drain correctly.
- `1148fa1` — **Fix datagram forwarding rate from 1/sec back to 50/sec** (a regression in the earlier refactor that had serialized datagram delivery).
- `5c0606d` — Fix object encoding in the SUBSCRIBE flow to match the header type.

The 50/sec vs 1/sec restoration is the most visible change — it directly affects interop pairs that exercise datagram-mode delivery.

*Luke on msf#153 `initTrack` — push toward static-only init or annexb (Apr 21)* — Two comments. The first (16:21 UTC) accepts Vasiliev's race framing but proposes a generic in-band fix using MP4 `track_id` switching: a `moof` referencing an unknown `track_id` blocks the player until the matching `moov` arrives, and the new init can carry both old and new `track_id` entries briefly for new subscribers. The second (16:26 UTC) is the stronger opinion — he'd rather use **annexb** and drop dynamic init segments entirely, and is fine reverting `initTrack` if init data (and codec mime) are made static with inline fallback. This reopens the static-init simplification path alongside Will Law's `inits[]` proposal and Vasiliev's original remove-`initTrack` stance.

*google/quiche session parameters (Apr 22)* — Martin Duke's `10045277` commit adds an API letting applications control MoQT session parameters on both client and server. Commit message specifically cites *partial-object delivery on the relay* as the motivating use case, which ties directly into the partial-cache debate Luke opened on moq-transport PR #1607 on Apr 19.

*moqtail subscription timeout fix (Apr 21)* — Zafer Gürel's PR #175 raises the no-event subscription termination window from **1 second to 5 seconds** because congested links were producing spurious terminations. Combined with the new Issue #176 acknowledging the relay doesn't yet implement draft-16 §7.2 scheduling (subscribe/publish priorities), this is part of the broader robustness push in moqtail's draft-16 migration.

*Interop runner continues to climb* — Three daily runs now: 18/73/14 (Apr 20) → 20/71/14 (Apr 21) → 22/69/14 (Apr 22). Two consecutive +2-pass recoveries after four days stuck at the Apr 17 regression floor. Likely drivers: moqtail PR #175's timeout fix (less spurious termination on congested pair tests) and Suhas's datagram-rate restoration on moq-rs.

---

# 2026-04-21 - Suhas iterates on moq-rs Pub/Sub Namespace PR, moq-js lifecycle fix, interop partial recovery

**Operation**: Update
**Sources**:
- Slack: No MCP access this session — skipped
- GitHub moq-wg repos: Only activity — [[victor-vasiliev|Victor Vasiliev]]'s PR #1607 (Largest Available Group filter) got two typo review comments from Aman Sharma (@sharmafb) on Apr 20 23:14–23:33 UTC (draft text `available`/`Available` casing). No new issues/PRs on moq-transport, msf, loc, secure-objects, cmsf, catalog-format.
- Implementation repos:
  - **cloudflare/moq-rs**: [[suhas-nandakumar]] pushed **9 commits** to PR #157 between 03:13 and 05:30 UTC on Apr 21 — lifecycle/cleanup fixes for SUBSCRIBE_NAMESPACE and PUBLISH_NAMESPACE flows (self-exclusion, wait for PUBLISH_OK, stale namespace on reconnect, handle lifetime). PR now at +6270/−2083 across 82 files.
  - **video-dev/moq-js**: New PR #70 by Manish (@itzmanish, Apr 20 18:55 UTC) — *"fix: moq-js player lifecycle and browser audio playback"* (+9542/−6440). Substantive playback rework; bulk of diff is deletion of legacy `web/` blog site.
  - moq-dev/moq, google/quiche (moqt), moqtail/moqtail, birneee/quiche_moq: quiet since Apr 20 covered in previous log entry.
- Mailing list: No new messages since Apr 19 weekly digest.
- IETF Datatracker: No new WG or individual draft versions since moq-lite-04 (Apr 9).
- Interop runner: Apr 21 00:33 UTC run at **20 / 71 / 14** — **first partial recovery** (+2 pass, −2 fail) after four consecutive days flat at the 18/73/14 regression floor since Apr 17. Still 3 short of Apr 16 baseline.
- MoQ Monthly: Still only issue #0 (Mar 4).
- tobbee/moq-llm-wiki issues: All 3 closed, no new issues.

**Pages updated**: discussions/discussions-2026-04.md, implementations/moq-rs.md, implementations/moq-js.md, interop/interop-runner.md, index.md

**Key findings**:

*cloudflare/moq-rs PR #157 late-night iteration (Apr 21 03:13–05:30 UTC)* — Suhas ran a focused debugging session on the SUBSCRIBE_NAMESPACE / PUBLISH_NAMESPACE relay flow that sits on top of Manish's draft-16 migration branch. Nine commits in ~2 hours:
- `c8cb923` `REQUEST_UPDATE` with `forward=1` when a subscriber arrives for a paused track.
- `12ac6bf` `PublishNamespace` handle lifetime + stale-track cleanup.
- `54a3557` Remove stale namespace entry on publisher reconnect.
- `cd0bdcd` Keep `PublishNamespace` handles alive in `serve_subscribe_namespace`.
- `a29815e` Send `NAMESPACE` (not `PUBLISH`) on `SUBSCRIBE_NAMESPACE`.
- `43b5665` Wait for `PUBLISH_OK` before streaming.
- `4dcaa7a` Self-exclusion on `SUBSCRIBE_NAMESPACE` (mirrors PR #1596 in the spec).
- `fbefe1d` Send `PUBLISH` for existing tracks on `SUBSCRIBE_NAMESPACE`.
- `eddc7bc` Only `PUBLISH` for tracks, not `PUBLISH_NAMESPACE`.

The PR as a whole bundles: draft-16 migration (subsumes PR #131), a new relay `subscriber_registry`, preserved subgroup-header forwarding (EndOfGroup fix), a fix for a 1-second freeze on group transitions, and `web-transport` crate v0.10 with subprotocol negotiation.

*video-dev/moq-js PR #70 (Apr 20 18:55 UTC)* — First substantive moq-js PR since Ali Begen's mid-April UI work. The real code changes are concentrated in `lib/playback/worker/audio.ts` (+137/−9), `lib/video-moq/index.ts`, `lib/playback/worker/{index,timeline,video}.ts`, and `lib/transport/subscriber.ts`. Most of the +9542/−6440 volume is deleting the legacy `web/` blog pages (quic-powers, replacing-hls-dash, never-use-datagrams, etc.) and bundling a fresh `demo/lib/publish.iife.js` (+9066).

*Interop runner partial recovery* — 20/71/14 is the first movement after four days stuck at 18/73/14. Coincides with continued draft-16 fixes in [[moqtail]] and [[moq-dev]] plus active iteration on the [[moq-rs]] SUBSCRIBE_NAMESPACE flow. Pair-level diff still needed to identify which two tests flipped back to pass.

*PR #1607 — typo-only activity*: Aman Sharma's two inline comments are the only moq-wg repo activity in this 24-hour window. No substantive movement on the partial-cache debate Luke opened on Apr 19.

---

# 2026-04-20 - moq-dev burst (hop-clustering, MSF catalog), PR #1607 review, quiche cleanup

**Operation**: Update
**Sources**:
- Slack: No MCP access this session — skipped
- GitHub moq-wg repos: PR #1607 saw its first substantive review on Apr 19 (Luke Curley). No new issues/PRs on moq-transport, msf, loc, secure-objects, cmsf, catalog-format.
- Implementation repos:
  - **moq-dev/moq** very active: PR #1322 (hop-based clustering refactor, open), #1330 (MSF catalog auto-negotiation, open), #1335 (WebSocket fallback tuning, open); merged #1332 (DNS bind), #1331 (fly.toml), #1333 (flake.lock), #1284 (crate READMEs), #1336/#1337 (Nix crane downgrade, Apr 20), #1321/#1334 (release bumps).
  - **google/quiche**: Apr 20 commit `9843feb` by [[martin-duke]] removing `moqt::SubscribeWindow`.
  - cloudflare/moq-rs, video-dev/moq-js, moqtail/moqtail, birneee/quiche_moq: quiet.
- Mailing list: Apr 19 automated "Weekly github digest" from Repository Activity Summary Bot; Apr 20 quiet.
- IETF Datatracker: No new WG or individual draft versions since moq-lite-04 (Apr 9).
- Interop runner: Apr 20 run still at **18 / 73 / 14** across 105 tests — unchanged since the Apr 17 regression (now three consecutive daily runs at the same numbers).

**Pages updated**: discussions/discussions-2026-04.md, drafts/moq-transport.md, implementations/moq-dev.md, implementations/quiche-moq.md, interop/interop-runner.md, index.md

**Key findings**:

*moq-dev/moq burst of activity (Apr 19–20)* — Luke opened three substantive PRs in rapid succession:
- **#1322 (hop-based clustering)**: Replaces the three-tier `primary`/`secondary`/`combined` origin model and the `cluster: bool` token flag with a single `OriginProducer` per relay tagged by a stable `OriginId`. Broadcasts now carry `hops: Vec<OriginId>` for loop detection and shortest-path routing. `MAX_HOPS` tightened 256 → 32. CLI collapses into `--cluster-connect` for full-mesh config. `Claims::cluster` is now `#[deprecated]`. Flagged by `cargo-semver-checks` as a **breaking change** on `moq-lite` and `moq-relay` (+857/-900).
- **#1330 (MSF catalog)**: Adds a `@moq/msf` package and race-based Hang/MSF auto-negotiation in `<moq-watch>` — Hang gets a 100ms head start, then `Promise.any()` picks the first successful fetch. Concrete step toward MSF being a first-class catalog format in Luke's stack.
- **#1335**: WebSocket fallback head start 200 → 500 ms, with a synchronous bail-out when WebTransport has already won.
- Plus merged infra work: DNS-in-bind (#1332), Fly.io docker image (#1331), Nix toolchain alignment (#1336/#1337), crate READMEs (#1284).

*PR #1607 has live sub-debate on "partial cache / partial group"*:
- [[luke-curley]] reviewed Vasiliev's "Largest Available Group" filter PR on Apr 19 and pushed back: *"The MUST is too strong and requiring a full cache is too narrow."* Counter-proposal: `MAY attempt to reconstruct subscription from a partial cache; MUST NOT serve an object until all prior objects in that sub-group have been served`.
- Convergence on the overall filter shape continues, but partial-cache handling is still being negotiated.

*google/quiche*: Martin Duke removed `moqt::SubscribeWindow` (Apr 20) — continues the cleanup of legacy SUBSCRIBE window tracking as draft-17's PUBLISH/SUBSCRIBE model settles.

*Interop runner*: Three consecutive daily runs (Apr 18, 19, 20) all at 18/73/14. Pair-level investigation of the Apr 17 regression still pending.

---

# 2026-04-19 - Gwendal Simon dissents on REWIND consensus, interop still at 18/73/14

**Operation**: Update
**Sources**:
- Slack: No MCP access this session — skipped
- GitHub moq-wg repos (moq-transport, msf, loc, secure-objects, cmsf, catalog-format): no new issues or PRs since the Apr 18 update. PR #1607 (Largest Available Group filter) remains the most recent activity.
- Implementation repos: moq-dev/moq had only a release bot PR #1321 (Apr 18); no new commits since Apr 17. cloudflare/moq-rs, video-dev/moq-js, moqtail, google/quiche MoQT, birneee/quiche_moq all quiet in this window.
- Mailing list: One new message — **Gwendal Simon's reply** to the REWIND consensus thread ([msg](https://mailarchive.ietf.org/arch/msg/moq/1DoFuRdZDWMVXb9e7AXxpgR_EZ8/), Apr 18) — not covered in the Apr 18 update.
- IETF Datatracker: No new WG or individual draft versions since Apr 9 (moq-lite-04).
- Interop runner: Apr 19 00:32 UTC run still at **18 / 73 / 14** — unchanged since the Apr 17 regression.
- MoQ Monthly: Still only issue #0 (Mar 4).
- tobbee/moq-llm-wiki issues: All 3 closed, no new issues.

**Pages updated**: concepts/joining-fetch-dissent.md, concepts/switch-abr.md, discussions/discussions-2026-04.md, interop/interop-runner.md, index.md

**Key findings**:

*Gwendal Simon's dissent on REWIND consensus (Apr 18, mailing list)*:
- Pushes back on the Alan/Luke/Victor convergence around a narrow LargestGroup/CurrentGroup/CurrentGroupFill filter (documented in the Apr 18 log entry).
- **Charter argument**: ABR track switching is an explicit MoQ charter deliverable; dismissing it as "innovation for extensions or V2" contradicts the charter.
- **Not an edge case**: A subscriber is "almost always behind the live edge" during a switch because congestion and intentional buffering both create lag.
- **CurrentGroup is insufficient**: It covers *joining* in one group, but ABR switching requires "an arbitrary range of past groups."
- **Real blocker is semantic, not HOL**: The V1 constraint he wants the WG to reconsider is that **past objects are not allowed in a PUBLISH stream**.
- **Proposed path**: "Joining PUBLISH with live semantics" — already prototyped in PR #1378 (SWITCH).
- This is currently the only documented dissent on the LargestGroup convergence. Consensus call closes May 1, 2026.

*Everything else is quiet*: this is a settle-down day after the heavy Apr 16–18 activity. moq-wg repos had zero new issues/PRs, implementation repos had only release bots, and no new drafts appeared. Interop runner is still at the Apr 17 regression baseline (18/73/14) with no recovery yet.

---

# 2026-04-18 - LargestGroup/CurrentGroup filter convergence (PR #1607)

**Operation**: Update
**Sources**:
- Slack #moq / #moq-rs / #moq-js / #libquicr: nothing new since 2026-04-17 evening update
- GitHub moq-wg repos: **PR #1607 (vasilvv, Apr 18)** — new Draft/RFC "Largest Available Group filter"; nothing else new
- Mailing list: four new replies in "Consensus call on way forward on REWIND" thread ([[luke-curley]] Apr 17 and Apr 18, [[victor-vasiliev|Victor Vasiliev]] Apr 18, [[alan-frindell]] Apr 18) all coalescing around a LargestGroup / CurrentGroup filter
- Implementation repos: moq-dev/moq merged PR #1327 (Luke, Apr 17 23:48 UTC) — fix TrackConsumer::read_frame respect start_at — and PR #1318 (Lullabee, Apr 17 23:39 UTC) — add JSON data to py_lib
- IETF Datatracker: no new WG or individual draft versions

**Pages updated**: concepts/joining-fetch-dissent.md, discussions/discussions-2026-04.md, drafts/moq-transport.md, index.md

**Key findings**:

*REWIND consensus thread converging on LargestGroup / CurrentGroup filter (Apr 17–18)*:
- **Luke Curley, Apr 17**: argues FETCH is inherently HOL-prone; proposes **LargestGroup filter for SUBSCRIBE** to cover 99% of the join-live case.
- **Luke Curley, Apr 18**: "Yeah, I just want to adopt CurrentGroup so we can make *some* progress."
- **Victor Vasiliev, Apr 18**: "Not against the LargestGroup idea." Turns it into concrete **PR #1607** — current group only, always complete group, no relay backfill, "probably really easy to implement."
- **Alan Frindell, Apr 18**: does not object; has drafted a parallel "CurrentGroupFill" PR in his own fork.
- Practical direction: drop REWIND for v1; land a narrow SUBSCRIBE filter instead.

*moq-transport PR #1607 — Largest Available Group filter (new, vasilvv, Apr 18)*: Draft/RFC. Sits alongside afrind/moq-transport#15 CurrentGroupFill and Luke's LargestGroup as three shapes of the same minimal filter direction.

*moq-dev/moq late Apr 17*: Luke merged PR #1327 fixing TrackConsumer::read_frame to respect start_at. Lullabee merged PR #1318 adding JSON data support to py_lib.

---

# 2026-04-17 (evening) - Supplemental: moqlivemock mlmtest, moqxr v0.2.1, Alan's REWIND reply

**Operation**: Update
**Sources**:
- Slack #moq (via MCP): new messages since morning update (Torbjörn on mlmtest PR #63, Paul Gregoire on moqxr v0.2.1, yuyou on moq-dev-rs v17 build, Torbjörn's Apr 12 moqlivemock dual-draft update)
- GitHub moq-wg repos: minor churn only — PR #1378 SWITCH got new gwendalsimon review comments Apr 17
- Implementation repos: cloudflare/moq-rs (release v0.7.17 on Apr 13), moq-dev/moq (heavy Apr 16-17 activity), video-dev/moq-js (Ali Begen UI work Apr 13-17), Quicr/libquicr (PUBLISH_OK filter), google/quiche (Apr 14-16 fixes), mondain/moqxr (v0.2.0 Apr 15, v0.2.1 Apr 17)
- Mailing list: Alan Frindell's Apr 17 reply on REWIND consensus call (backs Option 1)

**Pages updated**: discussions/discussions-2026-04.md, drafts/moq-transport.md, concepts/joining-fetch-dissent.md, implementations/openmoq.md, interop/interop-runner.md

**Key findings**:

*Alan Frindell on REWIND consensus (Apr 17)*: Backs **Option 1 — no action**. Argues FILL_TIMEOUT=0 (PR #1490, merged Apr 14) already removes the HOL-blocking scenarios REWIND was designed to fix. Recommends "stabilise around the core."

*moqlivemock / Eyevinn stack update (Apr 12 + Apr 17)*: Torbjörn posted a substantial update — dual draft-14/16 auto-negotiation; new namespaces `cmsf/clear`, `cmsf/drm-cbcs`, `cmsf/ecpp-cbcs`; iOS Safari 26.4 via managed source buffers + EME. Interop-runner PR #63 opened Apr 12, updated Apr 17, adds `mlmtest` component as a runner client.

*moqxr v0.2.0 + v0.2.1 releases (Apr 15 + Apr 17, Paul Gregoire / rwl4)*: Brings moqxr to working draft-16 base. v0.2.0 fixed SUBSCRIBE KVP parser, dropped WebTransport subprotocol for draft-14, unblocked unknown-control-message handling. v0.2.1 is additional draft-16 interop fixes.

---

# 2026-04-17 (late) - Supplemental: Luke Curley MoQ Boy demo

**Operation**: Update
**Sources**:
- Mailing list: "[Moq] MoQ Boy" by Luke Curley (2026-04-17)
- Blog: moq.dev/blog/moq-boy/

**Key findings**: Game Boy emulator demo streaming via MOQT. Showcases SUBSCRIBE_NAMESPACE as a flow-control + discovery primitive: encoding/emulation pauses when no active SUBSCRIBE for a track; player auto-unsubscribes invisible/muted tracks; bidirectional emulator↔player namespace publishing with per-viewer authorization. Timely given PR #1542 (SUBSCRIBE_NAMESPACE split) and PR #1562 (`.session` reserved namespace, merged Apr 16).

**Pages updated**: discussions/discussions-2026-04.md, people/luke-curley.md

---

# 2026-04-17 - Wiki update: REWIND consensus call, Session-Level Tracks merged, interop regression

**Operation**: Update
**Sources**:
- Slack #moq: No new messages (Endel joined #moq, #moq-rs, #moq-js on Apr 16 — no substantive posts)
- GitHub: moq-transport — PR #1562 (Session-Level Tracks) + PR #1596 (own-track filter) MERGED Apr 16; new PR #1606 (stream reset codes); PR #1542 (SUBSCRIBE_NAMESPACE split) reworked; PR #1378 SWITCH polish; PR #1604 new Gwendal Simon comment
- GitHub: moq-wg/loc — Issue #10 new Alan Frindell comment (loc-02 also has collisions)
- GitHub: moq-dev/moq — 10+ PRs merged Apr 16–17 (broadcast backup queue, auth refactor, --cert/--key split, moq-boy games, landing page)
- GitHub: moqtail — 2 draft-16 cleanup PRs merged (REQUEST_ERROR unification, publish hack removal); PR #169 open
- GitHub: cloudflare/moq-rs, video-dev/moq-js, birneee/quiche_moq — no new activity
- GitHub: google/quiche — 1 MoQT commit (cancel subgroups on STOP_SENDING)
- Mailing list: 2 new threads (REWIND consensus call + interim-13 minutes) from Magnus Westerlund
- IETF Datatracker: No new WG draft versions; no new individual drafts
- Interop runner: **Regression** to 18/73/14 (from 23/68/14) in Apr 17 00:32 UTC run
- MoQ Monthly: Still only #0 (March 4). No #1 yet.
- tobbee/moq-llm-wiki: No new issues (all 3 existing closed)

**Pages updated**: discussions-2026-04.md, moq-transport.md, joining-fetch.md, moq-dev.md, moqtail.md, interop-runner.md, index.md

**Key findings**:

### Spec activity
- **PR #1562 MERGED (Apr 16)**: Session-Level Tracks — reserves `.session` namespace tuple[0] for transport-internal tracks. Relays MUST NOT forward; unrecognized tracks MUST be rejected with NOT_SUPPORTED. IANA registry established under Specification Required policy. Useful for extending transport via existing sub/obj machinery (referenced by #1507).
- **PR #1596 MERGED (Apr 16)**: Exclude your own tracks from SUBSCRIBE_NAMESPACE (4-line fix for #1585).
- **PR #1606 NEW (Apr 16)**: Alan Frindell generalizes stream reset codes to all request streams. Adds GOING_AWAY (0x4), EXPIRED_AUTH_TOKEN (0x7), SESSION_CLOSED. Renumbers UNKNOWN_OBJECT_STATUS 0x4→0x6. Aligns TOO_FAR_BEHIND at 0x5 and EXPIRED at 0x6 in PUBLISH_DONE. Fixes #1581.
- **PR #1542 reworked (Apr 16)**: Split into SUBSCRIBE_NAMESPACE (0x50, namespace discovery) + SUBSCRIBE_TRACKS (0x51, track subscriptions). Removes SUBSCRIBE_NAMESPACE_OPTIONS and BOTH mode entirely — behavior now determined by message type. Adds TRACK_NAMESPACE_PREFIX (0x34) for REQUEST_UPDATE prefix changes. Fixes #1458.
- **PR #1604 (Apr 16)**: Gwendal Simon explicitly connects #1604 and SWITCH #1378 — same catch-up-on-PUBLISH-bidi pattern; difference is subscriber- vs relay-initiated.
- **PR #1378 (Apr 16)**: Continued prose polish — consistent terminology, trimmed redundant sections, clearer failure flow.

### Mailing list
- **REWIND consensus call (Apr 16)**: Magnus Westerlund opened formal three-way vote. Options: (1) no action until MOQT published, (2) adopt as extension, (3) basis for PR to merge. Deadline **May 1, 2026**. Follows interim-13 decision to keep REWIND as separate experimental extension.
- **Interim-13 minutes (Apr 16)**: Luke Curley + Victor Vasiliev worried REWIND's cache-dependent unreliability undermines utility; Alan Frindell flagged the "relay cheats by fetching upstream" idea creates substantial implementer complexity. Cullen Jennings vs Will Law on where joining complexity belongs (client library vs relay). Editors will develop FETCH timeout and subgroup filter PRs for immediate HOL relief.

### Implementation activity
- **moq-dev/moq**: Major day — broadcast backup queue (PR #1319, FIFO, avoids reannounces), major moq-relay auth refactor with ~15 new tests using wiremock + axum-server TLS integration test (PR #1311), --identity replaced with --cert/--key (PR #1308), moq-boy game server maintenance (capybara→songbird, fofk→runiestory), Python raw-track support (PR #1318 open). Releases: moq-lite 0.15.14, moq-cli 0.7.18, moq-clock 0.10.16, moq-ffi 0.2.6.
- **moqtail**: REQUEST_ERROR unification (PR #164), removed draft-14-era fake-SUBSCRIBE hack for PUBLISH (PR #165), message parameters PR #169 open.
- **google/quiche**: Commit cancels subgroups permanently on STOP_SENDING.
- **cloudflare/moq-rs**: No new activity since Apr 14.
- **video-dev/moq-js**: Still quiet since mid-March.

### LOC Properties collision
- Alan Frindell comments on loc issue #10: loc-02 still collides with moqt-17 on Properties Type 0x02/0x04. Recommends moving to highest one-byte code points in next LOC revision.

### Interop regression
- **18/73/14 (Apr 17)** vs **23/68/14 (Apr 16)** — 5 tests flipped from pass to fail. Regression coincides with moqtail draft-16 merges and moq-dev broadcast/auth changes. Pair-level investigation needed.

### Status watch
- **draft-cenzano-moq-media-interop-03** expires in 6 days (April 23) — no renewal
- **REWIND consensus call** closes May 1, 2026 (14 days)

---

# 2026-04-16 - Wiki update: NAB Show MoQ showcase, SWITCH redesign, implementation activity

**Operation**: Update
**Sources**:
- Slack #moq: No new messages (channel quiet since Feb 5). #moq-rs and #moq-js: only new member joins (Endel).
- GitHub: moq-transport — PR #1378 (SWITCH) major redesign Apr 15-16; PR #1604 new review comments; PR #1562 4th approval
- GitHub: moq-dev/moq — 4 PRs merged + 4 opened Apr 15-16 (browser compat, moq-lite negotiation, TLS config)
- GitHub: moqtail — 5 draft-16 PRs merged Apr 14-15 (unified message registry, SubgroupHeader, REQUEST_OK)
- GitHub: cloudflare/moq-rs — PR #163 qlog alignment work; v0.7.17 released
- GitHub: google/quiche — Joining FETCH fix (largest_object at SUBSCRIBE time) by Martin Duke
- GitHub: msf, loc, secure-objects, cmsf, catalog-format — no activity since Apr 15
- Mailing list: No new threads since April 13
- IETF Datatracker: No new draft versions
- Interop runner: Unchanged at 23/68/14 (105 tests, Apr 16)
- MoQ Monthly: Only #0 published (March 4). No #1 yet.
- tobbee/moq-llm-wiki: No new issues (all 3 existing issues closed)
- Web search: NAB Show 2026 MoQ demos from Wowza, Oracle, Bitmovin, Broadpeak, Synamedia

**Pages updated**: discussions-2026-04.md, moq-transport.md, switch-abr.md, moq-dev.md, moq-rs.md, moqtail.md, quiche-moq.md, interop-runner.md, index.md

**Key findings**:

### NAB Show 2026 (April 18-22)
Largest public display of MoQ technology to date with multiple live demonstrations:
- **Wowza + Cloudflare**: CMAF-to-MoQ relay demo (Java/Kwik stack → moq-rs relay) at Cloudflare booth W2300
- **Oracle Video @ Edge (OVE)**: MoQT relay network with partner demos — Ateme (ingest), Broadpeak (packaging), Bitmovin Player Web X (playback)
- **Bitmovin Player Web X**: Commercial MoQ player using WebTransport + WebCodecs, sub-second latency against Cloudflare's 330+ city relay network
- **Broadpeak**: "Half MoQ relay" for HAS/MoQ coexistence at booth W3034
- **Synamedia**: Quortex PowerVu & MEG with MoQ track-based affiliate distribution

### Spec activity
- **SWITCH PR #1378 redesigned**: Gwendal Simon replaced FETCH+SUBSCRIBE delivery with relay-initiated PUBLISH + inline catch-up (7 commits Apr 15-16)
- **Session-Level Tracks PR #1562**: 4th approval (Suhas Nandakumar), close to merge
- **Joining FETCH PR #1604**: Detailed feedback from Gwendal Simon on priority/parameter edge cases

### Implementation activity
- **moq-dev/moq**: Safari/Firefox compatibility fixes (avc3→avc1, AudioDecoder, WebTransport BiDi workaround), moq-lite ALPN fallback, releases moq-cli v0.7.18 + moq-relay v0.10.21
- **moqtail**: Major draft-16 push — unified message registry (+937/−1398), SubgroupHeader, REQUEST_OK/UPDATE refactoring, datagram compat. v0.9.1 pending.
- **cloudflare/moq-rs**: qlog alignment with draft-pardue-moq-qlog-moq-events-03 (+346/−242); v0.7.17 released
- **quiche-moq**: Joining FETCH limited to largest_object at SUBSCRIBE time (prepares for REWIND)
- **video-dev/moq-js**: No activity since mid-March

### Status watch
- **draft-cenzano-moq-media-interop-03** expires in 7 days (April 23) — still no renewal
- **Interop runner** stable at 23/68/14 with 11 implementations

---

# 2026-04-15 - Add people pages, fix editor/author roles

**Operation**: Expansion + Correction

**Pages created**: ian-swett.md, victor-vasiliev.md, mike-english.md
**Pages updated**: alan-frindell.md, suhas-nandakumar.md, moq-transport.md, index.md, discussions-2026-04.md, discussions-2026-03.md, discussions-2026-02.md, discussions-2026-01.md, open-issues-analysis.md, joining-fetch.md, joining-fetch-dissent.md, quiche-moq.md, moq-rs.md, moq-js.md, interop-runner.md

**Key changes**:
- **Three new people pages**: Ian Swett (Google, co-editor of moq-transport), Victor Vasiliev (Google, author of moq-transport, quiche-moq co-developer), Mike English (Cloudflare, maintainer of moq-rs/moq-js, interop runner operator, MoQ Monthly publisher).
- **Role corrections**: Alan Frindell and Ian Swett are the **editors** of draft-ietf-moq-transport. Suhas Nandakumar and Victor Vasiliev are **authors**. Previously the wiki listed Suhas as co-editor. Alan's page updated to "Co-editor", Suhas's page corrected from "Editor" to "Author".
- **moq-transport.md authors section** now lists all four authors with wikilinks.
- **Wikilinks added** across 11 wiki pages: all plain-text mentions of Ian Swett, Victor Vasiliev, and Mike English converted to `[[wikilink]]` format.
- People section in index.md expanded from 6 to 9 entries.

---

# 2026-04-15 - CMSF ContentProtection merged, Shaka Player DRM support

**Operation**: Update
**Sources**:
- GitHub: moq-wg/cmsf PR #18 (merged Apr 14 by Will Law)
- GitHub: shaka-project/shaka-player PR #9972 (merged Apr 14 by Álvaro Velad Galván)
- User (maintainer) confirmed both merges

**Pages updated**: moq-cmsf.md, shaka-player.md, moqlivemock.md, discussions-2026-04.md

**Key changes**:
- **CMSF ContentProtection signaling** (PR #18): DRM signaling proposal by Torbjörn Einarsson (Eyevinn) merged into the CMSF spec. Defines `contentProtections` with `refID`s and per-track `contentProtectionRefIDs`. Supports Widevine, PlayReady, FairPlay, and ECCP (ClearKey). Based on DASH/DASH-IF attributes. Key rotation not yet covered.
- **moqlivemock/warp-player DRM**: DRM support implemented by Hugo Björs (Eyevinn). Supports Widevine, PlayReady, FairPlay, and ClearKey/ECCP.
- **Shaka Player DRM support** (PR #9972): Álvaro Velad Galván (Atème) added CMSF contentProtection support to Shaka Player. This makes Shaka Player the **second implementation** of CMSF ContentProtection, after moqlivemock/warp-player. Two independent implementations is a significant milestone for the feature.

---

# 2026-04-15 - Wiki update: issue #3 corrections, DELIVERY_TIMEOUT PR, interop improvement

**Operation**: Update + Corrections
**Sources**:
- Slack #moq: No new messages (channel quiet since Feb 11)
- GitHub: moq-transport — new PR #1605 (Split DELIVERY_TIMEOUT, Victor Vasiliev, Apr 14)
- GitHub: msf — no new activity since Apr 14; loc — no new activity
- Mailing list: No new threads since Apr 13
- IETF Datatracker: No new draft versions
- Interop runner: Improved to 23 pass / 68 fail / 14 skip (from 21/70/14 on Apr 14)
- tobbee/moq-llm-wiki: Issue #3 filed by Mike English (englishm) — detailed fact-check with corrections

**Pages updated**: moq-rs.md, moq-js.md, quiche-moq.md (rewritten), moq-transport.md, interop-runner.md, interop-status.md, interop-endpoints.md, discussions-2026-04.md, publish-subscribe.md (via moq-transport.md), martin-duke.md, index.md

**Key changes**:

### Issue #3 corrections (Mike English):
- **moq-rs history rewritten**: Corrected Mike English's role — he did not help with the Go→Rust translation (that was Luke Curley). Mike joined mid-2023 as a close collaborator, contributing relay deployments, moq-pub, C FFI exploration, and draft-04 support. Added detailed timeline and key contributors (Manish, Jacob, Scott Godin, Zafer Gurel).
- **quiche-moq disambiguation**: The wiki incorrectly described quiche-moq as a Rust implementation (birneee/quiche_moq). The interop runner's "quiche-moq" is actually **Google's QUICHE MoQT** — a C++ implementation inside Google's QUICHE library (part of Chromium), primarily developed by Martin Duke and Victor Vasiliev with ~74+ source files. Rewrote the page entirely. birneee/quiche_moq is a separate Rust project on Cloudflare's quiche crate, not in the interop runner.
- **moq-js Montevideo Tech context**: Added history about video-dev/moq-js development coming from the Montevideo Tech Summer Camp 2025, with Mike as technical sponsor and Qualabs community contributors. The 2026 Summer Camp features both Mike and Luke as co-sponsors.
- **moqpack label**: Changed status from "Active" to "Individual" in index to clarify it's not a WG document.
- **publish-subscribe fix**: Corrected "REQUEST" to "REQUEST_OK/REQUEST_ERROR" in the moq-transport Key Concepts list (there is no bare "REQUEST" message in the spec).
- **Community resources**: Added section to index with MoQ Monthly newsletter (Mike English), Demuxed MoQ Talks playlist, Montevideo Tech Summer Camp, moq.dev Discord, and link to IETF Datatracker for all 24+ individual drafts.
- **Individual drafts listing**: Added note about notable uncovered individual drafts (rewind, qlog, hang, cdn-provisioning, relay-dos).

### New findings:
- **Transport PR #1605** (Apr 14): Victor Vasiliev proposes splitting DELIVERY_TIMEOUT into two separate types of timeout.
- **Interop runner improvement**: 23/68/14 — best result since test count expanded to 105. Two additional tests passing compared to Apr 14.
- **draft-cenzano-moq-media-interop-03** expires in 8 days (Apr 23) — still no renewal.

---

# 2026-04-14 - Wiki update: GraphQL mailing list thread, MSF authz merge, CARP origin, interop recovery

**Operation**: Update
**Sources**:
- Slack #moq: New messages Apr 13-14 (visa question for London interim, Hugo Björs joined)
- GitHub: msf — PR #118 (authorization flows) merged Apr 13, issue #119 closed
- GitHub: moq-transport — no new issues/PRs since Apr 13; loc — no new activity
- Mailing list: New thread "Using MOQT for graphql subscriptions with draft-17 requires extensions" by Alan Frindell (Apr 13)
- IETF Datatracker: No new WG draft versions; noted draft-law-moq-carp-00 (Nov 2025) as CMSF origin
- Interop runner: Recovery to 21 pass / 70 fail / 14 skip (from 20/71/14 on Apr 13)
- tobbee/moq-llm-wiki: No open issues

**Pages updated**: discussions-2026-04.md, interop-runner.md, interop-status.md, moq-msf.md, moq-cmsf.md, will-law.md, alan-frindell.md, index.md

**Key findings**:
- **GraphQL subscriptions on MOQT** (mailing list, Apr 13): Alan Frindell argues draft-17's inflexible message parameters are a mistake. Key issues: 4KB track name limit forces query body into namespace/name; custom parameters require negotiation at every hop; 64KB control message size limit may be too small; no HTTP-like header forwarding for auth. Broader question about MOQT suitability for non-media use cases.
- **MSF PR #118 merged** (Apr 13): Authorization flows documentation added to MSF spec by Suhas Nandakumar.
- **CARP → CMSF lineage**: draft-law-moq-carp-00 ("CARP - a CMAF compliant implementation of WARP", Nov 2025) was adopted by the WG and became draft-ietf-moq-cmsf-00 (Dec 2025). Added history to CMSF page.
- **Interop runner**: Recovered from 20/71 (Apr 13) back to 21/70 (Apr 14). One test flipped back to pass.
- **draft-cenzano-moq-media-interop-03** expires in 9 days (Apr 23) — still no renewal.
- Slack activity minimal: Aman Sharma asked about visa invitation for London interim; Hugo Björs joined #moq.

---

# 2026-04-13 - Wiki update: add moq-lite and NMSF drafts, interop regression, #1405 resolution

**Operation**: Update
**Sources**:
- GitHub: moq-transport issues/PRs checked — #1405 updated Apr 12 (Ian Swett inclined to close)
- GitHub: msf — no new activity since Apr 10; loc — no new activity since Mar 23
- Mailing list: Only weekly GitHub digest on Apr 12, no new substantive threads
- IETF Datatracker: No new WG draft versions; two individual drafts added to wiki
- Interop runner: Slight regression (21→20 pass, 70→71 fail)
- tobbee/moq-llm-wiki: No open issues

**Pages created**: wiki/drafts/moq-lite.md, wiki/drafts/moq-nmsf.md
**Pages updated**: index.md, discussions-2026-04.md, interop-runner.md, interop-status.md, moq-transport.md, luke-curley.md, moq-dev.md

**Key findings**:
- **draft-lcurley-moq-lite-04** (Apr 9): Luke Curley's simplified transport protocol, now at version 04. Removes subgroups, object properties, datagrams, and 30+ message types from moq-transport. Pull-only, stream-based design. Individual submission, not WG-adopted. This is the spec behind moq-dev/moq.
- **draft-herz-moq-nmsf-01** (Apr 7): Erik Herz (Vivoh) proposes extending MSF with Neural Video Codec packaging. Dual-track model (hyperprior + latent) for priority-aware delivery. Supports DCVC-RT, SSF, FVC, and other learned codecs. 18 pages, individual submission.
- **Issue #1405** (Single Object Subgroup ID): Ian Swett commented Apr 12 that he's inclined to close with no action after PR #1593 saw no WG interest. Will put before WG to confirm.
- **Interop runner**: Slight regression from 21 pass / 70 fail to 20 pass / 71 fail (105 tests, 14 skip unchanged). One test flipped from pass to fail.
- **Virtual interim 13** happening today (Apr 13) with REWIND slides on agenda.
- **draft-cenzano-moq-media-interop-03** expires in 10 days (Apr 23) — still monitoring for renewal.
- Slack #moq: No new messages (channel quiet since Feb 11).

---

# 2026-04-12 - Add London interim details

**Operation**: Update
**Sources**: IETF Datatracker (interim-2026-moq-08 through moq-11 session pages)

**Pages updated**: interim-meetings.md, discussions-2026-04.md

**Key changes**:
- Added London interim details: County Hall / The Riverside Building, Belvedere Road, London SE1 7PB
- June 11 (moq-08): 2 sessions (hackathon/interop day)
- June 12 (moq-09, moq-10 at 08:30 UTC, moq-11 at 12:30 UTC): 3 working sessions
- Remote participation via Meetecho (details TBD)
- Explained numbering: moq-08 through moq-11 registered on datatracker before the virtual interims

---

# 2026-04-12 - Rename Eyevinn MOQ Stack to moqlivemock, major update

**Operation**: Update + Rename
**Sources**: User (maintainer) provided updated feature list; GitHub repos checked for versions.

**File renamed**: `wiki/implementations/eyevinn-moq.md` -> `wiki/implementations/moqlivemock.md`
**Pages updated**: moqlivemock.md (full rewrite), index.md (renamed + updated draft versions), interop-status.md (renamed + added draft-16), shaka-player.md (updated wikilinks), discussions-2026-01.md (updated wikilink)

**Key changes**:
- Renamed from "Eyevinn MOQ Stack" to "moqlivemock" (the central component)
- Draft support upgraded from draft-14 only to **draft-14 and draft-16** with ALPN negotiation
- Catalog now supports both **FETCH and SUBSCRIBE**
- Content protection documented with three namespace modes: clear (`cmsf/clear`), commercial DRM (`cmsf/drm-{scheme}`), and ClearKey/ECCP (`cmsf/eccp-{scheme}`)
- All repos at v0.7.0+ (moqtransport v0.7.0, moqlivemock v0.7.0, warp-player v0.7.1)
- All `[[eyevinn-moq]]` wikilinks updated to `[[moqlivemock]]`

---

# 2026-04-12 - Add draft-cenzano-moq-media-interop-03

**Operation**: Ingest
**Sources**:
- HTML: https://afrind.github.io/draft-cenzano-media-interop/draft-cenzano-moq-media-interop.html
- IETF Datatracker: https://datatracker.ietf.org/doc/draft-cenzano-moq-media-interop/

**Pages created**: wiki/drafts/moq-media-interop.md
**Pages updated**: index.md (added to drafts table), alan-frindell.md (added as co-author), media-packaging.md (added Media Interop section), interop-status.md (added media wire format interop section)

**Key findings**:
- Individual submission by Jorge Cenzano-Ferret and Alan Frindell (both Meta), currently at version 03
- Defines concrete media wire format over LOC for H.264 video, Opus audio, AAC-LC audio, and UTF-8 text
- Uses MOQT extension headers (0x0A, 0x15, 0x0D, 0x0F, 0x11, 0x13) for media metadata
- Supports mid-stream encoding parameter changes
- **Expires 2026-04-23** — needs monitoring for renewal. If not renewed, the draft lapses.
- Not adopted by the MOQ working group (individual submission)
- Documents the wire format used by moxygen and LOC-based media interop

---

# 2026-04-12 - Fix moq-rs production draft version, add doc.moq.dev

**Operation**: Correction + Enhancement
**Sources**:
- Slack #moq thread (2026-04-11): Mike English noted moq-rs wiki page incorrectly listed draft-07 as Cloudflare's current production deployment — it's actually draft-14
- Slack #moq thread (2026-04-11): Luke Curley pointed to [doc.moq.dev](https://doc.moq.dev/) as documentation for moq-dev/moq

**Pages updated**:
- moq-rs.md — Fixed draft support: production deployment is draft-14, not draft-07
- moq-dev.md — Added doc.moq.dev as documentation link

# 2026-04-12 - Wiki update: interop runner expansion, required-request-id debate, rewind-02

**Operation**: Update
**Sources**:
- Slack #moq: No new messages (channel quiet since Feb 11)
- GitHub: moq-transport issues/PRs checked — #1603 has new comments from Ian Swett (Apr 11)
- GitHub: msf, loc — no new activity since Apr 10
- Mailing list: No new threads since last update
- IETF Datatracker: No new WG draft versions; draft-duke-moq-subscribe-rewind-02 published Apr 2
- Interop runner: Test count expanded from 93 to 105; moqx (OpenMOQ relay) added as 11th implementation
- tobbee/moq-llm-wiki: No open issues

**Pages updated**: interop-status.md, interop-runner.md, discussions-2026-04.md, joining-fetch-dissent.md, martin-duke.md, openmoq.md

**Key findings**:
- Interop runner expanded to 105 tests (was 93) with 21 pass / 70 fail / 14 skip. The growth is from moqx (OpenMOQ's moxygen fork) joining the matrix as an 11th relay. moqx shows strong results: 6/6 with moq-dev-js, 5-6/6 with moq-rs-draft-16.
- Ian Swett commented on #1603 (Apr 11): required-request-id was added for "feature parity" with single control stream model but "it was never clear exactly what functionality this provided." Stream IDs in WebTransport aren't exposed to applications. He also expressed that Joining FETCH's dependency on another Request is a design concern.
- draft-duke-moq-subscribe-rewind-02 published Apr 2 — refines the "Rewind" subscription filter for best-effort past group retrieval. Key topic for interim-13 meeting (Apr 13).
- Virtual interim 13 is tomorrow (Apr 13) with REWIND slides on the agenda.

---

# 2026-04-11 - Split moq-rs/moq-js into separate implementation pages

**Operation**: Restructure
**Sources**:
- Slack #moq: Mike English's clarification (2026-04-11) about the relationship between cloudflare/moq-rs, moq-dev/moq, and video-dev/moq-js
- GitHub API: Repo metadata for all four projects

**Context**: Mike English explained that cloudflare/moq-rs (was englishm/moq-rs) and moq-dev/moq (was kixelated/moq-rs) are "sibling" implementations that both started from Luke Curley's original codebase but are now independent. Similarly, video-dev/moq-js and the JS in moq-dev/moq are separate codebases. The forks were born when Luke was not going to support the IETF WG specs directly. Luke's Hang player is a total rewrite, not derived from the old moq-js.

**Pages created**: wiki/implementations/moq-dev.md (moq-dev/moq — Luke Curley's Rust+TS monorepo with moq-lite + Hang)
**Pages updated**:
- moq-rs.md — Clarified as Cloudflare's IETF-aligned fork; added history section; updated maintainer to Mike English
- moq-js.md — Clarified as video-dev's IETF-aligned JS; added history section
- index.md — Added moq-dev/moq to implementations list and draft support table
- luke-curley.md — Updated references from [[moq-rs]] to [[moq-dev]]
- interop-endpoints.md — Fixed Luke Curley entry to reference [[moq-dev]]
- interop-status.md — Fixed v17 interop to reference [[moq-dev]] instead of [[moq-rs]]
- interop-runner.md — Updated wikilinks for moq-dev-rs and moq-dev-js entries
- imquic.md — Fixed v17 interop reference to [[moq-dev]]

**Timeline**:
- 2022-06-29: kixelated/moq-rs created (Luke Curley's original)
- 2023-05-24: kixelated/moq-js created (companion JS library)
- 2024-10-15: englishm/moq-rs and video-dev/moq-js created (IETF-aligned forks)
- 2025-06-20: kixelated/moq-js archived ("Moved to kixelated/moq")
- Now: kixelated/moq-rs → moq-dev/moq (monorepo), englishm/moq-rs → cloudflare/moq-rs

---

# 2026-04-11 - Fix broken interop-runner links (issue #2)

**Operation**: Maintenance
**Changes**:
- Removed duplicate `wiki/implementations/interop-runner.md` (content already covered by `wiki/interop/interop-runner.md`)
- Moved `[[interop-runner]]` listing from Implementations to Interop section in `wiki/index.md`
- All `[[interop-runner]]` wikilinks now resolve unambiguously

# 2026-04-11 - Wiki update: new transport issue/PR, MSF initTrack debate

**Operation**: Update
**Sources**:
- Slack #moq: No new messages since Feb 11 (channel quiet)
- Slack #moq-rs, #moq-js, #libquicr: No substantive new activity
- GitHub: moq-transport, msf, loc — checked for new issues/PRs since Apr 10
- Mailing list: No new threads since last update
- IETF Datatracker: No new draft versions (still at transport-17, msf-00, loc-02, etc.)
- Interop runner: Unchanged — 93 tests, 19 pass / 62 fail / 12 skip (draft-16 target)
- tobbee/moq-llm-wiki: No open issues

**Pages updated**: discussions-2026-04.md, moq-transport.md, joining-fetch-dissent.md, moq-msf.md

**Key findings**:
- New transport issue #1603 by Martin Duke: questions whether required-request-id is needed for all request types (suggests limiting to REQUEST_UPDATE and FETCH only)
- New transport PR #1604 by Martin Duke: implements #1602 proposal to move Joining FETCH onto SUBSCRIBE/PUBLISH stream; Alan Frindell reviewed noting shared parameter state constraints
- Transport PR #1540 (coalescing REQUEST_UPDATE processing, merged Apr 9) was missed in previous update, now captured
- Transport PR #1562 (Session-Level Tracks reserved namespace) updated Apr 10, now listed as open PR
- MSF PR #118 (authorization flows) updated Apr 10, now listed in MSF page
- MSF issue #153 (initTrack synchronization problem) expanded with Victor Vasiliev's analysis favoring removal of initTrack feature

---

# 2026-04-11 - Add draft-frindell-moq-moqpack-00

**Operation**: Ingest
**Sources**:
- IETF Datatracker: https://datatracker.ietf.org/doc/draft-frindell-moq-moqpack/
- Full text: draft-frindell-moq-moqpack-00.txt (1792 lines)

**Pages created**: wiki/drafts/moq-moqpack.md
**Pages updated**: index.md (added to drafts table), alan-frindell.md (added as author)

**Key findings**:
- New individual submission by Alan Frindell (Meta), published 2026-03-02
- Proposes QPACK-based compression for MOQT control messages to reduce overhead from repeated values (auth tokens, track names)
- Uses flag bit 0x40 on message types to signal compressed format
- Designed for compatibility with existing QPACK libraries
- Not yet adopted by the MOQ working group

---

# 2026-04-10 - Wiki update: OpenMOQ repos, MSF PR coverage

**Operation**: Update
**Sources**:
- Slack #moq: Messages through 2026-04-10 (no new activity since last update)
- GitHub: moq-transport, msf, loc — checked for new issues/PRs
- GitHub: tobbee/moq-llm-wiki issue #1 ("Add OpenMOQ")
- Mailing list: No new threads since last update
- IETF Datatracker: No new draft versions
- Interop runner: Unchanged — 93 tests, 19 pass / 62 fail / 12 skip (draft-16 target)

**Pages updated**: openmoq.md (added moqx relay context, playa player, moqxr description), moq-msf.md (added merged PR #124)

**Key findings**:
- Wiki issue #1 requested adding OpenMOQ repos: moqx (server/relay) not yet public — openmoq/moxygen fork serves as buffer repo; red5pro/moq-playa (player) not yet public; mondain/moqxr already listed but description enriched
- MSF had PR #124 (clarify first object in event/media timeline track) merged Apr 9, not previously captured
- No new IETF drafts, mailing list threads, or interop runner changes since last update

---

# 2026-04-10 - Wiki update: mailing list, interop runner, discussion enrichment

**Operation**: Update
**Sources**:
- Slack #moq: Messages through 2026-04-10
- GitHub: moq-transport (issues/PRs), msf (issues/PRs), loc (issues/PRs)
- Mailing list: https://mailarchive.ietf.org/arch/browse/moq/ (threads through Apr 10)
- IETF Datatracker: No new draft versions (still at transport-17, msf-00, loc-02, secure-objects-00, privacy-pass-02, cmsf-00)
- Interop runner: 93 tests, 19-22 pass / 59-62 fail / 12 skip (draft-16 target)

**Pages created**: interop-runner.md
**Pages updated**: discussions-2026-04.md, discussions-2026-03.md, interim-meetings.md, moq-transport.md

**Key findings**:
- Mailing list had active threads not previously captured: consensus call on draft-17 (Mar 24 → Apr 10), 7-byte varint debate (Mar 19 → Apr 7), MoQ charter and QMUX scope, Presence/Notifications proposal
- 7-byte varint debate resolved with PR #1595 (merged Apr 9)
- Virtual interim 12 (Mar 30) minutes posted, interim 13 (Apr 13) agenda posted with REWIND discussion
- PUBLISH_DONE / subgroup FIN handling question raised by Alan Frindell (Mar 31)
- New varint encoding example bug found and acknowledged (Mar 3)
- Luke Curley published security camera blog post (Mar 10)
- No new draft versions published since last update

---

# 2026-04-10 - GitHub issues/PRs analysis, SWITCH status, interim schedule

**Operation**: Analysis + Ingest
**Sources**:
- GitHub: All open issues across moq-transport (48), msf (49), loc (9), secure-objects (8), privacy-pass (2), cmsf (4)
- GitHub: All open PRs across moq-transport (17), msf (3)
- IETF datatracker API: Interim meeting schedule through June 2026
- AI minutes index: ietfminutes.org

**Pages created**: switch-abr.md, joining-fetch-dissent.md, open-issues-analysis.md, interim-meetings.md
**Pages updated**: index.md

**Key findings**:
- 48 open transport issues, 17 open PRs - Joining Fetch and SWITCH are biggest debates
- SWITCH (#1354) has 39 comments, most discussed open issue
- Next interim is April 13 with REWIND slides
- Properties Type collision (#1550) is a cross-draft bug needing coordinated fix
- Request ID validation (#1459) is an implementation blocker labeled BLOCKED

---

# 2026-04-10 - Ingest full Slack history (Jan 12 - Apr 10) and interop matrix

**Operation**: Ingest
**Sources**:
- Slack #moq: Complete history from 2026-01-12 through 2026-04-10
- Interop runner matrix: https://englishm.github.io/moq-interop-runner/

**Pages created**: discussions-2026-01.md, discussions-2026-02.md
**Pages updated**: index.md, interop-status.md (added matrix details), interop-endpoints.md (added quiche-moq, moqtail, akamai, imquic), eyevinn-moq.md (media support details)

**Key findings**:
- 10 implementations in the interop runner matrix
- Draft-16 published Jan 14, draft-17 published Mar 3
- Boulder interim hackathon (Feb 9-12) drove major interop progress
- Eyevinn moqlivemock announced with HEVC, Opus, AC-3, subtitles (Jan 27)
- Shaka Player v5.0.5 updated to draft-14 support

---

# 2026-04-10 - Add draft-14 and Eyevinn implementations

**Operation**: Ingest
**Sources**:
- Downloaded draft-ietf-moq-transport-14.txt (Sept 2025)
- Eyevinn GitHub repos: moqtransport, moqlivemock, warp-player

**Pages created**: wiki/implementations/eyevinn-moq.md
**Pages updated**: index.md, interop-status.md

---

# 2026-04-10 - Initial Wiki Creation

**Operation**: Full initial setup
**Sources ingested**:
- IETF drafts: moq-transport-17, moq-msf-00, moq-loc-02, moq-secure-objects-00, moq-privacy-pass-auth-02, moq-cmsf-00
- GitHub activity: moq-wg/moq-transport (issues up to #1602, PRs up to #1599), moq-wg/msf, moq-wg/loc
- Slack #moq channel: messages from 2026-03-12 through 2026-04-10
- IETF Datatracker: MOQ WG document listing

**Pages created**: 30+ pages covering drafts, concepts, people, implementations, discussions, and interop
**Cross-references**: Established between all pages using Obsidian wikilinks
