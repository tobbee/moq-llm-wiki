---
title: "Discussions - May 2026"
tags: [discussions, slack, github]
date: 2026-05-01
last_updated: 2026-05-25
status: current
---

Summary of active discussions in the MOQ ecosystem during May 2026.

# Activity (May 24 06:00 UTC → May 25 06:00 UTC) — **moq-dev/moq third consecutive overnight merge wave: audio FFI gap closure (`moq-audio` crate + Opus encode/decode), Rust/JS namespace cleanup (moq-lite stub removal, JS `@moq/net` as `Net`, `moq-clock` moved to example), first PRs dogfooding PR #1469 `(Written by Claude)` disclaimer norm, external metapox SUBSCRIBE_UPDATE double-merge (24-day Issue #1363 close cycle); Cullen Jennings publishes first agenda-skeptic letter on May 21 final London agenda (*"pick a limited set of important topics... filters / top N"*); moqx docker adapter PR #71 ready for May 26 matrix (expected 13/18 → ~75+/162 moqx-as-relay coverage); moqtail Day-2 relay-conformance fix (Zafer PR #201 mid-subgroup join); interop 168/42/125/0 (−3 pass vs May 24, second consecutive regression); #moq Slack quiet 5 days; google/quiche moqt quiet Day +4; no new drafts; MoQ Monthly Day +25**

## moq-dev/moq — third consecutive overnight merge wave (May 24 06:00 UTC → May 25 ~05:00 UTC)

**Cadence holds for a third day**: 24h after the May 23-24 Go-FFI + server-API + LLM-disclaimer wave, [[luke-curley|kixelated]] runs **another ~17-PR cluster** May 24 18:06 UTC → May 25 ~05:00 UTC. **Three-day cumulative total (May 22-25): ~40 merges by a single maintainer**, the largest three-day window the wiki has tracked for any MoQ implementation. Today's structural theme is **audio FFI gap closure + Rust/JS namespace cleanup + first dogfooding of the PR #1469 LLM-disclaimer norm**, complementing the May 22-23 container-format triple-merge and the May 23-24 binding + distribution wave.

### Headline merges

| PR | Title | Merged (UTC) | Significance |
|---|---|---|---|
| [#1484](https://github.com/moq-dev/moq/pull/1484) | **feat: add moq-audio crate, raw-audio FFI, and rename moq-codec to moq-video** | May 24 22:41 | **+2576/−71, 39 files**. New `rs/moq-audio` crate with Opus encode/decode over `moq-mux` + `hang`; rubato resampler so callers can pass any WebCodecs `AudioData.format`/rate; generic `Encoder`/`Decoder` traits with Opus impl at fixed 20 ms frames. `moq-ffi` + `libmoq` gain raw-audio publish/subscribe APIs so **Python/Swift/Kotlin/C callers can drive a microphone or speaker without bringing their own codec library**. ~340 KB stripped size impact for bundled libopus in `libmoq_ffi.dylib`. Renames empty `moq-codec` placeholder → `moq-video` (squat the right name). **PR description ends with `(Written by Claude)` line — first PR to apply the PR #1469 LLM-disclaimer norm in practice, less than 22h after that norm merged.** |
| [#1492](https://github.com/moq-dev/moq/pull/1492) | **Remove moq-lite stub crate** | May 24 23:00 | **+3/−479**. Drops the deprecated `rs/moq-lite` re-export of `moq-net` left over from the [PR #1428](https://github.com/moq-dev/moq/pull/1428) rename. Confirms via `grep` that no other workspace crate depends on `moq-lite`. Completes the **moq-lite → moq-net Rust-side rename** that opened May 18. Protocol-level moq-lite references (wire protocol, ALPN strings, `concept/layer/moq-lite` docs) intentionally untouched. The 0.17.0 shim on crates.io remains as the final version. |
| [#1498](https://github.com/moq-dev/moq/pull/1498) | **js: re-export @moq/net as Net (deprecate Lite/Moq aliases)** | May 25 01:36 | **+6/−0**. `@moq/publish` + `@moq/watch` + `@moq/hang` standardise on `Net` namespace, `Lite` (publish/watch) + `Moq` (hang) stay as `@deprecated` aliases for back-compat. Rationale: *"Lite is the old package name (the package is @moq/net now), and @moq/hang had drifted to a third alias (Moq). Standardizing on Net keeps the public API consistent with the actual package name across all three downstream packages."* |
| [#1494](https://github.com/moq-dev/moq/pull/1494) | **moq-clock: convert to a moq-native example** | May 25 00:02 | **+224/−764, 19 files**. Deletes standalone `rs/moq-clock` crate, moves source into `rs/moq-native/examples/clock.rs` alongside the existing `chat.rs` example. Drops `moq-clock` from Cargo workspace, Nix overlay/flake, `.release-plz.toml`, demo justfile. Fixes the `release-plz release` failure on `main` caused by `publish = false` (Cargo.toml) vs `publish = true` (release-plz default) mismatch. **Also ends with `(Written by Claude)` disclaimer — second PR to apply the norm.** |
| [#1396](https://github.com/moq-dev/moq/pull/1396) | **feat(lite): implement SUBSCRIBE_UPDATE API for JS subscriber and publisher** | May 24 22:57 | **+80/−4, 4 files** by **metapox** (taku). **Closes [Issue #1363](https://github.com/moq-dev/moq/issues/1363) from Apr 30, 24-day cycle.** Adds `track.updatePriority(priority)` method via internal Signal; subscriber watches Signal post-SubscribeOk and sends `SubscribeUpdate` when it changes; publisher applies received update. **Motivated by metapox's own [moq-multicam](https://github.com/metapox/moq-multicam) multi-camera streaming project**: *"Camera switching needs instant priority changes without re-subscribe to avoid replaying stale groups from the relay cache."* |
| [#1397](https://github.com/moq-dev/moq/pull/1397) | fix(lite): update in-flight group priorities on SUBSCRIBE_UPDATE | May 24 22:56 | metapox follow-on to #1396 fixing PriorityQueue not updating in-flight groups on SUBSCRIBE_UPDATE. |
| [#1485](https://github.com/moq-dev/moq/pull/1485) | hang: non_exhaustive VideoConfig/AudioConfig with constructors | May 24 18:06 | Continues the pre-1.0 API freeze begun by [PR #1472](https://github.com/moq-dev/moq/pull/1472) May 23 — `#[non_exhaustive]` on hang catalog config structs with constructor methods to preserve forward-compatibility. |
| [#1486](https://github.com/moq-dev/moq/pull/1486) | ci(rs): add cargo-deny and resolve outstanding advisories | May 24 18:27 | New CI step running [`cargo-deny`](https://github.com/EmbarkStudios/cargo-deny) for license + advisory + duplicate-version + ban audits across the workspace; clears the outstanding RUSTSEC advisories surfaced by the first run. |
| [#1488](https://github.com/moq-dev/moq/pull/1488) | Fix Kotlin release; stop publishing moq-clock + @moq/clock | May 24 20:33 | Cleanup of the moq-clock removal (#1494); Kotlin release workflow had `publish = true` on the now-removed crate. |
| [#1489](https://github.com/moq-dev/moq/pull/1489) | relay(stats): allow multi-segment --stats-node values; move cargo-deny to ci | May 24 20:10 | Stats config + cargo-deny CI move. |
| [#1491](https://github.com/moq-dev/moq/pull/1491) | relay(stats): fix TOML stats config silently clobbered by clap update_from | May 24 22:57 | Silent-clobber bug fix in stats TOML config loading. |
| [#1490](https://github.com/moq-dev/moq/pull/1490) | moq-token-cli: treat `-` as stdin/stdout, not a literal file path | May 24 22:15 | UX fix for token CLI piping. |
| [#1482](https://github.com/moq-dev/moq/pull/1482) / [#1483](https://github.com/moq-dev/moq/pull/1483) | docs: group language libraries under `lib/` and CLIs under `bin/` + infra: reuse SIGNING_KEY | May 24 17:07-17:08 | Doc layout reorg + apt/rpm signing-key consolidation. |
| [#1497](https://github.com/moq-dev/moq/pull/1497) | ci(rpm): skip rclone bucket probe when publishing to R2 | May 25 01:10 | Follow-on fix to PR #1457 apt/rpm packaging. |
| [#1480](https://github.com/moq-dev/moq/pull/1480) / [#1481](https://github.com/moq-dev/moq/pull/1481) | 2 dependabot bumps (docker/setup-buildx, gradle/actions) | May 24 | GitHub Actions version bumps. |
| [#1493](https://github.com/moq-dev/moq/pull/1493) / [#1475](https://github.com/moq-dev/moq/pull/1475) | release-plz auto-PRs | May 24-25 | Auto-bumps from release-plz. |

**Aggregate**: ~17 merges + 4 still-open follow-ons. Still-open: **[PR #1473](https://github.com/moq-dev/moq/pull/1473)** *"moq-net: runtime Timescale/Timestamp; container::Frame keeps source scale"* (follow-on to #1439); **[PR #1487](https://github.com/moq-dev/moq/pull/1487)** *"moq-mux: catalog filter/target and Annex-B exporters"*; **[PR #1495](https://github.com/moq-dev/moq/pull/1495)** *"moq-mux: replace anyhow with thiserror"*; **[PR #1371](https://github.com/moq-dev/moq/pull/1371)** *"hang: cross-broadcast track references in renditions"*; **[PR #1401](https://github.com/moq-dev/moq/pull/1401)** *"Refactor/video pacing rAF"* by skirsten (external); plus older #1448 still open since May 23 03:08 UTC.

**Three-day cumulative pace** (May 22 18:24 UTC → May 25 ~05:00 UTC): **~40 merges**, ~+12,000/−2500 net LOC, single-maintainer-led. The pattern is **theme-coherent waves** (May 22-23 container-format, May 23-24 binding + distribution, May 24-25 audio FFI + cleanup + LLM-disclaimer dogfooding) rather than scattershot velocity.

### PR #1484 — moq-audio crate: the second of two FFI-completeness moves in 48 hours

Two days after PR #1417 (server API, May 23) lifted FFI from client-only to client+server, **PR #1484 closes the audio side of the codec-helper gap**:

**Before PR #1484**: Audio flowed as already-encoded Opus/AAC bitstreams. `moq-mux` parsed codec configuration headers (OpusHead, AudioSpecificConfig) and passed raw Opus/AAC packets through to `moq-net` unchanged. **The browser path used WebCodecs; native callers (`moq-ffi`, `libmoq`) had to bolt on a codec library themselves**.

**After PR #1484**:
- `AudioFormat` enum mirroring WebCodecs `AudioData.format` (U8/S16/S32/F32 ± planar)
- `AudioSamples` carrier (format + rate + channels + timestamp + bytes)
- Generic `Encoder` / `Decoder` traits + Opus impl at fixed 20 ms frames
- `AudioProducer` / `AudioConsumer` wiring PCM through `moq_mux::container::Producer<legacy::Wire>` + registering/reading `hang::catalog::AudioConfig`
- moq-ffi: `MoqBroadcastProducer::publish_raw_audio_opus(name, format, rate, channels, bitrate?)` + `MoqBroadcastConsumer::subscribe_raw_audio_opus(...)`
- libmoq: `moq_publish_raw_audio_opus` / `moq_consume_raw_audio_opus` C functions

**Size cost**: `libmoq_ffi.dylib` (stripped, what ships in `py/moq-rs` Python wheels) grows from 10.50 MB → 10.83 MB = **+340 KB stripped**, almost all libopus. AAC explicitly out-of-scope (the codec module shape is generic so AAC can drop in later behind its own feature flag).

**Renamed `moq-codec` → `moq-video`**: kixelated explicitly notes *"audio and video have different enough I/O shapes to live in separate crates"*, and *"Once the input/output story for video samples is settled it can mirror `moq-audio`'s structure."* — the rename **pre-positions the video-side raw-frame FFI** that will close the symmetric gap (currently the browser uses WebCodecs; native is missing video-frame helpers).

**Structural implication**: by London, moq-dev/moq's pitch becomes *"single-tree multi-language full-stack with native codec helpers"*. Python apps can drive a microphone end-to-end via `moq_publish_raw_audio_opus(...)` without ever touching a codec library or WebCodecs. **This is a structurally different value-proposition tier than competing Go-only or Swift-only impls** — moq-dev/moq is the first MoQ project that can claim *"want to publish audio from any of 6 languages? `pip install moq-rs` / `swift package add moq` / etc., and call the publish function"*.

### PRs #1484 + #1494 — first dogfooding of the PR #1469 LLM-disclaimer norm

[PR #1469](https://github.com/moq-dev/moq/pull/1469) added the **mandatory LLM-disclaimer** norm to `CLAUDE.md` on May 23 20:34 UTC. **Within 22 hours**, kixelated applies the disclaimer in two of his own PR descriptions:

- **PR #1484** (audio FFI): description ends with **`🤖 Generated with [Claude Code](https://claude.com/claude-code)`** plus the moq-dev README footer.
- **PR #1494** (moq-clock removal): description ends with **`🤖 Generated with [Claude Code](https://claude.com/claude-code)` + `(Written by Claude)`** — the explicit *"Written by Claude"* form from the CLAUDE.md text.

**Structural significance**: the PR #1469 text added the rule **specifically to source-code comments**, but kixelated's same-day extension to PR bodies shows the norm propagating to **adjacent editorial surfaces** (the PR description is the cover-letter / review-aid layer adjacent to the diff). **This is the fastest community-norm adoption** the wiki has tracked — 22-hour norm-merge-to-dogfood cycle, vs the 4–6 day inter-event cadence of the broader AI-skeptic narrative (Mike English May 18 → Lorenzo May 19 → afrind May 22 → PR #1469 May 24 → first applied use May 24-25).

**Carry-forward**: the next AI-skeptic-narrative test is whether non-moq-dev MoQ repos move toward a similar codified marker. Most directly the `moq-wg/moq-transport` issue threads where afrind has been using a *"With apologies for answering your question with AI"* prose disclaimer — does the WG-side adopt a structural marker (e.g., an issue/PR label or a CONTRIBUTING.md note)?

### PRs #1396 + #1397 — external contributor metapox lands SUBSCRIBE_UPDATE for JS

**metapox** (taku) closes [Issue #1363](https://github.com/moq-dev/moq/issues/1363) opened **Apr 30 — 24-day cycle**. The two-PR pair:

- **PR #1396** (+80/−4, 4 files) — adds `track.updatePriority(priority)` API in `track.ts`, subscriber watching the priority Signal post-SubscribeOk and sending `SubscribeUpdate`, publisher applying the received `SubscribeUpdate` to the track (implements an existing TODO).
- **PR #1397** — fix to in-flight group priorities on SUBSCRIBE_UPDATE (PriorityQueue was not updating in-flight groups).

**Motivation as stated in the PR**: *"I'm building [moq-multicam](https://github.com/metapox/moq-multicam), a multi-camera streaming system. Camera switching needs instant priority changes without re-subscribe to avoid replaying stale groups from the relay cache."* — **first-principles product-driven contribution** from outside the corporate-contributor set (Cloudflare/Nokia/Eyevinn/OpenMOQ/AWS).

**Why this matters structurally**: metapox's product needs SUBSCRIBE_UPDATE *for dynamic priority changes*, which is exactly the use case the wire protocol's SUBSCRIBE_UPDATE message was designed to enable. The JS Subscriber had been **missing a programmatic API to change priority after subscribing**, forcing close-and-re-subscribe (which causes the relay to replay cached groups). **The 24-day cycle from Apr 30 issue → May 24 close is the moq-dev/moq median for external-contributor PRs of this complexity**, and shows the metapox-style *"build a real product, file an issue when you hit the gap, ship the PR yourself"* pattern is working through review.

### New Issue #1499 — natmurella *"old leaf discovery strategy gone?"*

External user **natmurella** opens [Issue #1499](https://github.com/moq-dev/moq/issues/1499) May 25 05:02 UTC asking about an observed relay-topology behavior change: *"old leaf discovery strategy gone?"* Plausibly a downstream consequence of the May 22-24 moq-mux / origin / consumer refactor cluster. **First downstream notice of an unannounced behavioral regression in the three-day wave.**

## Cullen Jennings — first agenda-skeptic letter on the May 21 final London agenda

**[[cullen-jennings|Cullen Fluffy Jennings]] (Cisco)** publishes [a substantive critique](https://mailarchive.ietf.org/arch/msg/moq/-k2a8R7dGz0AhlwO2MsQfaZOz3c/) of [[martin-duke|Martin Duke]]'s May 21 final agenda May 24 14:27 UTC / 08:27 PDT:

> *"I do not think we will make any progress with this agenda. Every topic on it does not have enough time for any meaningful discussion to resolve the issues."*

He recommends:

> *"Pick a limited set of important topics that needs face to face time and finish them."*

His **preferred priority**: **filters / top N**.

### Why this is structurally significant

Cullen's letter is **the first push-back on the May 21 final agenda since publication**, from a senior contributor whose own slots were among the heaviest compressed:

| Original ask | Final allocation | Compression |
|---|---:|---:|
| Secure Object (Cullen) | 50 min → 20 min | **−60%** |
| Top-N (Cullen + Mo + Suhas) | 5 min on conditional Day-2 | — |

His **filters/top-N priority aligns with [[mo-zanaty|Mo Zanaty]]'s** dominant Object Filters mailing-list voice (3-of-4 messages May 23-24). The combination is **two senior contributors converging on "more filters, less of everything else"** within 48 hours of the final agenda publication.

### Layered with the May 26 interim

The May 26 interim is now bracketed by:
- **[[interim-meetings|Magnus Westerlund's Object Filters consensus call]] closes same day**
- **[[martin-duke|Martin Duke]]'s [[interim-meetings|SWITCH/DTS show-of-hands]] meeting** (the formal Tuesday)
- **Two senior contributors** (Cullen + Mo) advocating for filter-heavy London

**Carry-forward**: if Martin concedes any agenda repacking, the targets are the prior beneficiaries — afrind's 180-min MOQT-issues block (the *"smallest cut"* at −25%) and Will Law's 35-min MSF/CMSF slot. The May 26 interim outcome (consensus close + show-of-hands) will be the **proxy disposition signal** for whether the London formal agenda holds or gets repacked.

## englishm/moq-interop-runner — moqx docker adapter PR #71 (first matrix-shape change since cadence recovery)

**[[giovanni-marzot|Giovanni Marzot]]** merges [PR #71](https://github.com/englishm/moq-interop-runner/pull/71) May 25 03:18 UTC: *"moqx: add relay docker adapter, update remote URLs, register publisher"* (+52/−2). Three changes to `implementations.json` + new adapter Dockerfile:

1. **Registers moqx as a docker-buildable relay** — new `adapters/moqx/Dockerfile.relay` wraps `ghcr.io/openmoq/moqx:latest` with the runner's `/certs` convention and UDP port 4443. Adds `roles.relay.docker` to the moqx entry. Mirrors the moxygen adapter pattern.
2. **Updates relay remote URLs** `moqx-000.ci.openmoq.org` → `moqx-main.ci.openmoq.org` (moqx-main is the stable CI-deployed hostname).
3. **Registers publisher role** under `roles.publisher.remote` pointing at moqx-main.

**Required upstream prereq** landed first: [openmoq/moqx#319](https://github.com/openmoq/moqx/pull/319) added a `MOQX_ENDPOINT` env var to the moqx docker entrypoint so the adapter can override the endpoint path to `/` (default is `/moq-relay`).

### Expected next-matrix impact

gmarzot's local validation table shows **moqx-as-relay reaching 18/18 against multiple well-behaved clients** in docker mode:

| Client → moqx relay (docker) | Result |
|---|---|
| moqx → moqx | 6/6 ✓ |
| moxygen → moqx | 6/6 ✓ |
| moq-rs → moqx (draft-14) | 6/6 ✓ |
| moq-rs-draft-16 → moqx | 6/6 ✓ |
| aiomoqt → moqx | 6/6 ✓ |
| moqlivemock → moqx | 6/6 ✓ |

**Expected matrix impact**: moqx-as-relay column moves from **13/18 (no docker, only remote)** to **~75+/162** with full docker bringup. **First matrix-shape change of the post-May-18 cadence-recovery period.**

The May 25 00:45:06 UTC report (168/42/125/0) was captured **before** PR #71 merged at 03:18 UTC, so the matrix-shape expansion will hit the **May 26 report**. If May 26's numbers show ~75 moqx passes added without breaking other rows, the matrix will have validated the **adapter-pattern-per-impl posture** as the path forward. The draft-revision lag (matrix on draft-16 vs three+ impls on draft-18) remains the structural gap PR #71 does not address — [PR #68](https://github.com/englishm/moq-interop-runner/pull/68) (draft-18 target bump) still OPEN since May 18, no new commits since May 19.

## moqtail/moqtail — Day-2 relay-conformance fix by Zafer Gürel

**Zafer Gürel** merges [PR #201](https://github.com/moqtail/moqtail/pull/201) May 24 21:15 UTC: *"fix(relay): deliver mid-subgroup objects to late subscribers"* (+165/−67, 5 files):

> *"New subscribers joining a track mid-subgroup had no open QUIC send stream for the in-progress subgroup. Objects arriving with `header_info=None` were silently dropped: `get_stream()` returned `None` and there was no fallback."*

Fix: caches the original `SubgroupHeader` in an `active_headers` map on `Track` (keyed by `StreamId`) when the first object of a new subgroup arrives; entry evicted on publisher unistream close. In `Subscription::handle_track_event()`, when `get_stream()` returns `None` for a mid-subgroup object, the cached header is used to open a new QUIC send stream so the late subscriber receives all objects from the current subgroup's start.

**This is the second consecutive day of relay-conformance bug fixes by Zafer** (PR #199 May 23 *"send FETCH_OK for all non-empty fetch ranges"* + PR #201 May 24 mid-subgroup join). **Pattern**: methodical pre-London relay hardening. PR #202 is the auto-release follow-on.

## moq-wg repos — only MSF Issue #164 sees update

- **moq-wg/msf**: [Issue #164](https://github.com/moq-wg/msf/issues/164) (kixelated, *"Require sample rate and channels"*) updated May 24 17:56 UTC with continued discussion on require-vs-optional audio metadata.
- **moq-transport / loc / secure-objects / cmsf / catalog-format / privacy-pass**: All quiet.

## Mailing list — 4 messages May 24

- **[Cullen Fluffy Jennings "Re: London Interim Preliminary Agenda"](https://mailarchive.ietf.org/arch/msg/moq/-k2a8R7dGz0AhlwO2MsQfaZOz3c/)** May 24 14:27 UTC — see Cullen agenda-skeptic section above.
- **[Weekly github digest (Repository Activity Summary Bot)](https://mailarchive.ietf.org/arch/msg/moq/JRn2aRc4w4_xAlhoAldRGvzBHIM/)** May 24 — auto-bot summary covering Issue #1633 / #1634 / #1635 / #1636 (moq-transport) and Issue #164 + initTrack discussion (msf).
- **[Mo Zanaty "Re: Consensus call on Object filters"](https://mailarchive.ietf.org/arch/msg/moq/fkYN_piZRztviDtWRpzeLHRSMQY/)** May 24 — continuation of the May 23-24 thread, already covered in May 24 wiki entry.
- **[Alan Mallett "Fwd: Your requested identity verification code"](https://mailarchive.ietf.org/arch/msg/moq/tl6aVWJYg4xdNXvgN5nUiEHsrzw/)** May 24 — **third spam from the same address in 4 days** (May 21, May 22 03:57 UTC, May 24); still no chair moderation follow-up. Pattern suggests the list-moderation channel is currently understaffed.

## Slack #moq — quiet 5 days

No new messages since gazzy's May 20 15:22 CEST Moqintosh announcement. **Longest quiet stretch since the May 11 interim**. `#moq-interop-runner`, `#moq-rs`, `#moq-js`, `#libquicr` all quiet.

The 5-day quiet period overlaps exactly with the **three consecutive overnight moq-dev/moq merge waves** — moq-dev's coordination has fully moved to GitHub PR review threads, with Slack used for community announcements rather than daily implementation discussion.

## Other implementations — all quiet

- **[[moq-rs|cloudflare/moq-rs]]**, **[[moq-js|video-dev/moq-js]]**, **[[imquic|meetecho/imquic]]**, **[[openmoq|mondain/moqxr]]**, **[[quiche-moq|birneee/quiche_moq]]**, **[[moqintosh|t-gazzy/Moqintosh]]**, **[[moqlivemock]]**, **Eyevinn/warp-player**, **Eyevinn/moqtransport**: All quiet.
- **google/quiche moqt** quiet Day +4 (last `083b83b3` martinduke May 20 22:36 UTC). Pattern of chair-coordination-displacing-engineering-bandwidth continues.

## Interop runner — 168/42/125/0, second consecutive regression

**[2026-05-25 00:45:06 UTC report](https://englishm.github.io/moq-interop-runner/results/2026-05-25_004506/report.html)**: 168 / 42 / 125 / 0. **−3 pass vs May 24** (45 → 42), pass rate 26.8% → **25.0%** (−1.8pp). **Two consecutive day-over-day regressions** (May 24 −1, May 25 −3) following the May 23 +4 recovery. Rolling 5-day band tightens to **42–46 pass**. **7 consecutive days of daily cadence holding** (May 19/20/21/22/23/24/25). Target still **draft-16** (PR #68 OPEN, no new commits since May 19).

The May 25 report ran at 00:45 UTC, **before** PR #71 (moqx docker adapter) merged at 03:18 UTC. **The May 26 report will be the first to include the docker-adapter-moqx-relay expansion.**

**Plausible attribution for −3**: continued main-branch refactor on moq-dev/moq (moq-codec → moq-video rename in #1484, moq-clock removal in #1494, moq-lite stub removal in #1492, moq-mux follow-ons). The matrix-against-`main` design continues to register the wire-level-refactor signal within 24h.

# Activity (May 23 06:00 UTC → May 24 06:00 UTC) — **moq-dev/moq second consecutive overnight merge wave: Go FFI bindings (4th language), MoQ server API, mandatory LLM-disclaimer norm, distribution-infra (Homebrew + .deb/.rpm), `moq-mux` codec/container restructure; Tobbe substantive comment on MSF Issue #153 (initTrack dedup proposal); moqtail breaks long-quiet with Zafer Gürel FETCH_OK relay fix + Ali Begen client-js commits; Mo Zanaty + afrind continue Object Filters consensus-call thread; interop 168/45/122/0 (−1 pass vs May 23 but skip 1→0); #moq Slack quiet 84h+; google/quiche moqt quiet Day +3; no new drafts; MoQ Monthly Day +24**

## moq-dev/moq — second consecutive ~14-PR overnight merge wave (May 23 17:56 UTC → May 24 01:30 UTC)

**Cadence continues**: 24h after the May 22-23 container-format triple-merge, [[luke-curley|kixelated]] runs **another ~14-PR merge cluster** May 23 afternoon → May 24 early-morning. **Net structural theme is distribution + binding + API hardening**, in contrast to the May 22 wave's pipeline/codec focus. **Two-day cumulative total (May 22-24)**: **~24 PR merges by a single maintainer**, the largest two-day window the wiki has tracked for moq-dev/moq.

### Headline merges

| PR | Title | Merged (UTC) | Significance |
|---|---|---|---|
| [#1417](https://github.com/moq-dev/moq/pull/1417) | **Add MoQ server API with session acceptance and handshake** | May 23 19:56 | **+1120/−5, 12 files**. New `MoqServer` + `MoqRequest` types in moq-ffi: bind socket, accept sessions, configure per-session or global publish/consume origins, TLS cert config, request-level ok/close. Includes Python `server_smoke.py` example. **First-class server role exposed through FFI** — previously the FFI only covered client-side. |
| [#1452](https://github.com/moq-dev/moq/pull/1452) | moq-mux: restructure into per-codec and per-container modules | May 23 20:17 | Folder reshuffle: `rs/moq-mux/src/import/{fmp4,mkv,...}.rs` → per-codec + per-container module tree. Sets up future containers (m2ts, etc.) as additive rather than file-modifying. |
| [#1456](https://github.com/moq-dev/moq/pull/1456) | Homebrew tap scaffolding for moq binaries and gst plugin | May 23 20:53 | New `homebrew-moq` tap; first end-user-installable distribution channel for moq binaries on macOS. |
| [#1457](https://github.com/moq-dev/moq/pull/1457) | **.deb/.rpm packaging + apt.moq.dev / rpm.moq.dev workers** | May 23 20:13 | Linux package distribution: Cloudflare Workers serve apt + yum repos at apt.moq.dev / rpm.moq.dev. **First Linux-package distribution for moq binaries.** |
| [#1469](https://github.com/moq-dev/moq/pull/1469) | **docs: require LLM disclaimer on AI-authored comments** | May 23 20:34 | **+2/−0 in `CLAUDE.md`**: *"when an LLM leaves a comment, it should include a short disclaimer like `// Written by Claude` so readers can tell it wasn't human-authored. Makes AI-authored comments visible at a glance during review and future maintenance, so humans don't mistake LLM commentary for verified human intent."* — **direct project-level institutional response to the May 22 [moq-wg/moq-transport Issue #1636](https://github.com/moq-wg/moq-transport/issues/1636) afrind AI-hallucination incident** (afrind's hallucinated "1 to 32 Track Namespace Fields" caught by RichLogan). **First project-level mandatory-LLM-disclaimer policy** in any tracked MoQ implementation. |
| [#1470](https://github.com/moq-dev/moq/pull/1470) | **feat(go): add Go bindings for moq-ffi** | May 23 23:02 | **+827/−4 across 13 files**. Adds Go as **4th FFI language target** (after Python + Kotlin + Swift). Uses [`uniffi-bindgen-go` v0.7.1+v0.31.0](https://github.com/NordSecurity/uniffi-bindgen-go) targeting the exact pinned UniFFI version. New `go/` skeleton (`go.mod`, hand-written `moq/cgo.go` with per-platform LDFLAGS for linux amd64/arm64, darwin amd64/arm64, windows amd64), `scripts/{check,package,publish}.sh` mirroring Kotlin/Swift. Distribution model: `moq-dev/moq-go` mirror repo populated by CI on each release tag, consumer `go get github.com/moq-dev/moq-go@vX.Y.Z`. **CI release-go.yml fires on `moq-ffi-v*` tags with 5-target matrix.** **Net language coverage**: moq-dev/moq now spans **Rust + TypeScript + Python + Swift + Kotlin + Go** from a single tree. |
| [#1471](https://github.com/moq-dev/moq/pull/1471) | ci: replace docker .rpm builds with cargo zigbuild | May 23 23:03 | Removes docker dependency from .rpm CI workflow; cross-compiles via cargo + zig. |
| [#1472](https://github.com/moq-dev/moq/pull/1472) | **Tighten public APIs ahead of release: non_exhaustive + builders** | May 23 22:28 | Pre-1.0 API hardening: adds `#[non_exhaustive]` to enums + struct exposures, introduces builder pattern for forward-compatibility. **Pre-release signal** — moq-net's stable surface freezing for `v1.0`. |
| [#1466](https://github.com/moq-dev/moq/pull/1466) | ci: skip unchanged languages with `just changed` | May 23 19:38 | CI optimisation — only re-build/test languages whose dirs changed. |
| [#1468](https://github.com/moq-dev/moq/pull/1468) | ci: fix swift toolchain and restore check-swift workflow | May 23 23:03 | Brings Swift CI back online after May 22 SPM workflow add. |
| [#1463](https://github.com/moq-dev/moq/pull/1463) / [#1464](https://github.com/moq-dev/moq/pull/1464) / [#1465](https://github.com/moq-dev/moq/pull/1465) / [#1476](https://github.com/moq-dev/moq/pull/1476) | CI maintenance (persist-credentials, dry-run PR, Determinate Nix opt-out, Cachix overlay deps + selective builds) | May 23 17:56 → May 24 00:51 | CI rollout fixes for the new Swift/Kotlin/Go publish workflows. |
| [#1477](https://github.com/moq-dev/moq/pull/1477) | ci(cachix): build only the tagged package | May 24 01:29 | Cachix selective-build follow-on. |
| [#1478](https://github.com/moq-dev/moq/pull/1478) | chore(js): bump JS package versions | May 24 01:20 | Release-plz auto-bump for JS packages post-#1452 restructure. |
| [#1474](https://github.com/moq-dev/moq/pull/1474) | fix: update gitignore exception for moved fmp4 test fixtures | May 23 23:33 | Follow-on to #1452 codec/container restructure. |
| [#1467](https://github.com/moq-dev/moq/pull/1467) | chore: release | May 23 23:28 | release-plz auto-PR. |
| [#1458](https://github.com/moq-dev/moq/pull/1458) – [#1462](https://github.com/moq-dev/moq/pull/1462) | 5 dependabot bumps (docker/build-push, actions/download-artifact, setup-java, android-actions/setup-android, actions/upload-artifact) | May 23 16:58 | GitHub Actions version bumps batched. |

**Aggregate**: ~14 merges + ~3 still-open follow-ons (#1473 *"moq-net: runtime Timescale/Timestamp; container::Frame keeps source scale"* OPENED May 23 22:18 UTC follow-on to #1439, #1475 chore release auto-PR, plus the older #1448 SPM publish from May 23 03:08 UTC remains open). **All merges by kixelated** (the 5 dependabots are auto-merged into kixelated's queue).

### PR #1469 — first project-level mandatory-LLM-disclaimer policy

The PR diff is **2 added lines** in `CLAUDE.md`:

```markdown
## Comment Conventions

When an LLM leaves a comment in the source, include a short disclaimer like
`// Written by Claude` so readers can tell it wasn't human-authored.
```

**Structural significance**: this is the first project-level mandatory disclosure policy tracked by the wiki for any MoQ codebase. **Direct causal chain**:
1. May 22 18:24 UTC: afrind opens [moq-wg/moq-transport Issue #1636](https://github.com/moq-wg/moq-transport/issues/1636) AI-generated reply with hallucinated `"between 1 and 32 Track Namespace Fields"` + non-existent line numbers
2. May 22 21:15 UTC: RichLogan catches with actual draft-18 §2.4.1 quote (`"between 0 and 32"`)
3. May 22 21:45 UTC: afrind apologises (`"Wow, that is pretty embarrassing"`)
4. **May 23 20:34 UTC: kixelated merges #1469** — making the AI-authorship norm explicit at the moq-dev/moq project level

**Carry-forward**: this is the **fourth community-side AI-skeptic-narrative event in 6 days**, and the **first one that produces a written normative artifact** rather than discussion-only. Expect this pattern (visible AI-disclosure marker on AI-authored output) to propagate to other MoQ repos that have been receiving AI-assisted contributions — most directly the `moq-wg/moq-transport` issue threads, where afrind's pre-emptive *"With apologies for answering your question with AI"* disclaimer has already started normalising it.

### PR #1470 — Go bindings make moq-dev/moq the first 6-language MoQ stack

PR #1470 body (kixelated): *"Adds Go as a fourth language target for `rs/moq-ffi`, alongside the existing Python, Kotlin, and Swift bindings. The implementation uses `uniffi-bindgen-go` v0.7.1+v0.31.0, which targets the exact UniFFI version that moq-ffi pins, so the generated surface matches what the other languages already expose."*

**Distribution model**: Mirror repo `moq-dev/moq-go`, populated by CI on each `moq-ffi-v*` tag. Consumer side: `go get github.com/moq-dev/moq-go@v0.2.11` returns generated bindings + per-platform static archives bundled. cgo links statically via build-tag stubs — no `LD_LIBRARY_PATH` or runtime `.so` discovery on consumer side. **5-target build matrix**: linux x86_64/arm64, darwin x86_64/arm64, windows x86_64.

**Net language coverage** for moq-dev/moq is now:

| Language | Path | Distribution | Status |
|---|---|---|---|
| **Rust** | `rs/moq-net`, `rs/moq-loc`, `rs/moq-token`, `rs/moq-ffi`, `rs/moq-mux`, ... | crates.io | Native (the source of truth) |
| **TypeScript** | `js/net`, `js/hang`, `js/watch`, `js/publish`, `js/loc` | npm | Native (browser+node) |
| **Python** | `py/moq-net`, `py/moq-ffi` | PyPI | UniFFI |
| **Swift** | `swift/` (SPM mirror in `moq-dev/moq-swift`, Phase A via PR #1448) | SPM (in-flight) | UniFFI |
| **Kotlin** | `kotlin/` (JVM + Android) | Maven Central (in-flight) | UniFFI |
| **Go** (**NEW May 23**) | `go/` (`moq/cgo.go` + scripts; mirror repo `moq-dev/moq-go`) | `go get github.com/moq-dev/moq-go@vX.Y.Z` | UniFFI via `uniffi-bindgen-go` |

**Carry-forward to user-relevant context**: Tobbe (the user maintaining this wiki) develops in Go (Eyevinn/moqtransport, Eyevinn/moqlivemock). **moq-dev/moq's Go bindings now provide a direct alternative to Eyevinn's pure-Go MoQ stack**, structurally analogous to how PR #1432 (May 22 Swift+Kotlin) positioned moq-dev/moq vs. gazzy's Moqintosh. The choice for Go developers becomes pure-Go (Eyevinn/moqtransport, depend only on Go ecosystem) vs UniFFI-via-Rust (moq-dev/moq-go, depend on cgo + Rust runtime). The trade-off mirrors the Swift+Kotlin case: native-language clarity vs. immediate access to all moq-dev/moq features at upstream-velocity.

### PR #1417 — server-side FFI lifts moq-dev/moq from client-library to full-stack-binding

PR #1417 body summary: *"Introduces `MoqServer` and `MoqRequest` types that allow FFI consumers to build MoQ servers. The server can bind to a socket, accept incoming sessions, and configure per-session or global publish/consume origins."*

**Server API surface**:
- `MoqServer::listen()` — binds the listening socket and returns the bound address
- `MoqServer::accept()` — accepts the next incoming session, returning a `MoqRequest`
- `MoqRequest::ok()` — completes the MoQ handshake, returns an established `MoqSession`
- `MoqRequest::close(code)` — rejects the session with an HTTP status code
- Per-request origin overrides via `set_publish()` / `set_consume()`
- Read-only properties: `url()` and `transport()`

**Net structural change**: Until #1417, moq-ffi (and therefore all its Python/Kotlin/Swift/Go bindings) was **client-only**. Server functionality required directly using the Rust `moq-relay` crate. **Now non-Rust applications can also bind a port, accept sessions, and act as MoQ relays** — significantly lowering the barrier to building relay-shaped applications in Python/Swift/Kotlin/Go.

### PR #1452 — moq-mux per-codec/per-container restructure

`rs/moq-mux/src/{import,export}/` is reorganised so each container has its own module (`fmp4.rs`, `mkv.rs`, etc.) and each codec has its own module. Test fixtures move to new paths (PR #1474 follow-on fixes gitignore). This is **pre-extensibility work** — sets up adding a future `m2ts.rs` (Paul Gregoire's [[moq-msfts|MSFTS]] individual draft) as additive rather than file-modifying.

### PRs #1456 + #1457 — first cross-platform binary distribution channels

- **Homebrew tap**: `brew tap moq-dev/moq && brew install moq` (macOS)
- **apt.moq.dev** (Debian/Ubuntu): `echo 'deb [trusted=yes] https://apt.moq.dev stable main' | sudo tee /etc/apt/sources.list.d/moq.list && sudo apt update && sudo apt install moq-relay`
- **rpm.moq.dev** (RHEL/Fedora): `sudo dnf config-manager --add-repo https://rpm.moq.dev/moq.repo && sudo dnf install moq-relay`

Both apt and rpm endpoints are served by Cloudflare Workers (kixelated is at Cloudflare). **Net distribution model post-May 23**: moq-dev/moq binaries are installable via cargo / npm / pip / PyPI / brew / apt / dnf / SPM + Maven (in-flight). Six binary distribution channels in production, three more in-flight — a unique footprint for an MoQ implementation.

## GitHub `moq-wg/msf` — Tobbe substantive comment on Issue #153 (initTrack mid-stream changes)

[Issue #153](https://github.com/moq-wg/msf/issues/153) *"`initTrack` does not work"* opened April 10 by [[victor-vasiliev|Victor Vasiliev]] received a **substantive 4-point comment from [[tobbe-einarsson|Torbjorn Einarsson]] on May 23 16:02 UTC** (10 days after the previous comment by suhasHere May 14, which asked to close the issue). Tobbe's comment outlines four open angles before closing:

1. **Cross-packaging dedup is a different case from accidental duplicates** — challenges kixelated's earlier *"properly demuxed tracks shouldn't have identical init data"* by noting that **two MoQ tracks carrying the same source media in different packagings** (CMAF and a possible CMAF-derivative wire format) **could be deliberately designed to share one init segment**, so cmaf-only and packaging-aware clients can consume the same catalog. Also raises two video tracks with same width/height/SPS/PPS-inband as a counter-example.
2. **Readability is a benefit compression cannot deliver** — inline base64 init data dominates the *uncompressed* form developers and code-review tools actually inspect; a root-level `initDatas[]` (placed by convention at end of document) makes the tracks list skim-able. Frames this as responsive to Vasiliev's #144 zlib-compression proposal but addressing readability rather than transport size — analogous to CMSF's `contentProtection` referenceIDs.
3. **Catalog override of some initData field?** — proposes that certain catalog fields could *override* corresponding values in the referenced init segment. Clearest candidate: `lang` overriding `mdhd.language`, which lets audio tracks with different languages encoded the same way share a single init. Acknowledges this is a precedence-rule change, probably a separate thread, but materially extends the dedup case.
4. **AVC3 doesn't resolve the mid-stream-change question** — for the record: **Safari (notably for FairPlay DRM) requires `avc1` / `hvc1` sample entries with parameter sets in the decoder configuration record, not `avc3` / `hev1` with inline parameter sets**. Self-initializing segments aren't an option for anyone targeting that pipeline. So Will Law's *"use AVC3"* resolution doesn't fully cover the broader *"what about init changes mid-stream"* question.

**Offers a focused PR**: *"I'd be happy to write a focused PR for `initDatas[]` + per-track `initDataRefID` (singular) — strictly inline `data` for now — if there's appetite? The syntax could also open up for referencing initData from special init tracks at a later stage."*

**On the mid-stream init-change question itself**: agrees a mechanism in the media track is needed; mentions kixelated's `trackID` proposal, a different `sampleDescriptor` suggestion from Apple (to switch between encrypted and unencrypted segments), and DASH's `emsg`-with-`publishTime` pattern as a third option (would be catalog group + object ID in MoQ's case) — still cross-layer between cmaf and catalog but at least outside the `moov` box that is normally a binary blob owned by the encoder.

**Significance**: this is the **first material `moq-wg/msf` contribution by the wiki user** while the wiki is being maintained. The comment cleanly separates the dedup question (where Tobbe sees an open design opportunity) from the mid-stream change question (where he sees AVC3 as insufficient because of Safari/FairPlay). **Carry-forward**: if Tobbe ships the offered `initDatas[]` + `initDataRefID` PR, it would be the **first MSF schema additive contribution from outside the Akamai/Cloudflare/Cisco/Google/AWS core**. The Safari/FairPlay constraint (point 4) **is a structural data-point for the Cullen Jennings Secure Object discussion at London Day-2** — DRM-related init-handling cuts across MSF, CMSF, and Secure Objects.

## moqtail — Zafer Gürel relay FETCH_OK fix + Ali Begen client-js commits break long-quiet streak

[[moqtail|moqtail/moqtail]] saw **multiple commits May 23** breaking a long quiet streak:

- **Zafer Gürel** `1c209c5b` *"fix(relay): send FETCH_OK for all non-empty fetch ranges"* (PR #199) — May 23 19:47 UTC. Conformance bug fix.
- **Ali C. Begen** `28c04571` *"refactor(client-js): move query string log level setting to app.tsx"* — May 23 20:32 UTC.
- **Ali C. Begen** `b69009be` *"fix(client-js): skip seeking if video is already playing"* — May 23 20:32 UTC.
- Two release-bot commits (PRs #198, #200).

**Significance**: moqtail's last activity in the wiki's tracking window was around May 7-13 (registry-merge to interop-runner). May 23 is **the first material moqtail dev activity post-draft-18-publication**. Zafer's FETCH_OK fix is conformance-relevant — could affect interop matrix moqtail rows. Ali's client-js work continues the post-Demuxed video.dev player polish.

## Mailing list — Object Filters consensus-call thread continues (4 messages May 23-24)

The **Magnus Westerlund "Consensus call on Object filters"** thread (opened May 12, deadline May 26) saw **4 more messages** May 23-24, with [[mo-zanaty|Mo Zanaty]] dominating and Alan Frindell responding once:

1. **Mo Zanaty May 23** *"Re: Consensus call on Object filters"* ([archive](https://mailarchive.ietf.org/arch/msg/moq/patpBIlwfAHVdd2eKxIkllhpnYc/))
2. **Alan Frindell May 23** *"Re: Consensus call on Object filters"* ([archive](https://mailarchive.ietf.org/arch/msg/moq/1IVV3tazCaLFaEnQ6rYzEkiNcO8/))
3. **Mo Zanaty May 23** *"Re: Consensus call on Object filters"* ([archive](https://mailarchive.ietf.org/arch/msg/moq/4H7rJc1i2nyZ5dNJQPtyU2E6658/))
4. **Mo Zanaty May 24** *"Re: Consensus call on Object filters"* ([archive](https://mailarchive.ietf.org/arch/msg/moq/fkYN_piZRztviDtWRpzeLHRSMQY/))

Thread continues the May 22-23 afrind ↔ Mo Zanaty PR #1518-interpretation back-and-forth. Mo Zanaty's 3-of-4-message dominance over the May 23-24 window is **structurally significant** for the **May 26 deadline** (2 days away at this writing) — Mo is the most active consensus-call participant and has prepared positions on both Magnus's Object Filters call (deadline May 26) and Martin's filter-merge call (deadline June 5).

## Slack / interop / drafts / newsletter — quiet day

- **`#moq` Slack**: no new messages since gazzy May 20 15:22 CEST [[moqintosh|Moqintosh]] announce. **84h+ quiet** (now the longest quiet stretch since the May 11 interim).
- **`#moq-interop-runner`, `#moq-rs`, `#moq-js`, `#libquicr`**: all quiet.
- **google/quiche moqt**: no new commits since `083b83b3` martinduke May 20 22:36 UTC (Day +3 quiet). The 3-day quiet aligns with [[martin-duke|Martin Duke]]'s May 21-22 chair-coordination intensity (5 mailing-list messages in 26h opening 4 simultaneous consensus calls).
- **No new IETF drafts**: WG state unchanged from May 23 (transport-18 / msf-00 / loc-02 / secure-objects-00 / privacy-pass-02 / cmsf-00). Day +12 since draft-18 publication.
- **MoQ Monthly**: archive still #0 (Mar 3) + #1 (Apr 30). **Day +24 since #1.**
- **tobbee/moq-llm-wiki**: no open issues.

## Interop runner — −1 pass vs May 23 but skip drops 1→0; cadence at 6 consecutive days

**[2026-05-24 00:43:56 UTC report](https://englishm.github.io/moq-interop-runner/results/2026-05-24_004356/report.html): 168 / 45 / 122 / 0** (total / pass / fail / skip). **−1 pass vs May 23** (46 → 45, pass rate 27.4% → 26.8%, −0.6pp), **skip count drops 1 → 0** (the previously-skipped test now runs, contributing to the +1 fail delta). **6 consecutive days of daily cadence** (May 19/20/21/22/23/24). **Target still draft-16** ([PR #68](https://github.com/englishm/moq-interop-runner/pull/68) still OPEN, no new commits since May 19).

**Net rolling-window picture** (last 5 days): 35 → 38 → 46 → 42 → 46 → 45 — the +11/−4/+4/−1 sequence shows the matrix has stabilised in a **42-46 pass band**. The −1 today is plausibly attributable to moq-dev/moq's **#1452 moq-mux restructure** (file paths changed, test fixture moves in #1474). **6-day cadence is the longest consecutive-cadence stretch since the May 14-18 5-day outage**.

---

# Activity (May 22 06:00 UTC → May 23 06:00 UTC) — **moq-dev/moq overnight 10-PR merge wave (Luke Curley, May 22 18:24 UTC → May 23 02:26 UTC, ~8h): LOC frame format + CMSF/Hang unified pipeline + Matroska/WebM all MERGED on the same night — moq-dev/moq becomes the first impl with all THREE major MoQ media container formats (CMAF/fMP4 + LOC + MKV/WebM) unified on `main`; AWS PR #1429 reborn as PR #1444 kixelated-led cleanup MERGED (+1278/−14, third AWS-vs-kixelated design-cycle resolution); Martin Duke opens "Consensus call on filters" May 22 12:22 UTC (deadline June 5) — fourth simultaneous consensus call (after DTS, SWITCH, Object Filters); Issue #1636 afrind explicit AI-hallucination apology after RichLogan catches AI-generated wrong spec quote ("between 1 and 32 Track Namespace Fields" — actually 0-32); 4-message afrind↔Mo Zanaty Object Filters thread on PR #1518 interpretation; MSF Issue #164 kixelated "Require sample rate and channels"; interop runner RECOVERS 168/46/121/1 (+4 pass restoring May 21 level, 5-day cadence intact); #moq Slack quiet 60h; google/quiche moqt quiet 70h+**

## moq-dev/moq — overnight 10-PR merge wave; LOC + CMSF + MKV/WebM all land on same night

**Highest container/codec-pipeline merge density tracked by the wiki for 2026.** Luke Curley merged **10 PRs to `main`** between May 22 18:24 UTC and May 23 02:26 UTC (~8 hour window). The cluster is **media-pipeline + stats + release infrastructure**, structurally larger than the May 18 draft-18 ship (5 PRs in 3h17m) by both PR count and aggregate LOC.

### Headline cluster — three container muxers in one night

| PR | Title | LOC | Merged (UTC) | Significance |
|---|---|---|---|---|
| [#1440](https://github.com/moq-dev/moq/pull/1440) | hang: re-emit deprecated CMAF timescale/trackId in catalog | +43/−16 | 18:24 | Backwards-compat for hang catalog readers expecting pre-MSF CMAF fields |
| [#1441](https://github.com/moq-dev/moq/pull/1441) | direnv: auto-GC stale Nix store paths once a week | — | 19:10 | Dev infrastructure |
| [#1443](https://github.com/moq-dev/moq/pull/1443) | Make reconnect timeout mandatory with 5-minute default | +32/−20 | 20:47 | Spec-adjacent: removes optional reconnect-timeout footgun |
| [#1442](https://github.com/moq-dev/moq/pull/1442) | **Add stats via MoQ broadcasts** | **+1492/−70** | 20:56 | **Per-connection stats published as MoQ broadcast — observability dogfooded over the protocol itself** |
| [#1444](https://github.com/moq-dev/moq/pull/1444) | **feat: Unified CMSF/Hang pipeline (cleanup of #1429)** | **+1278/−14** | 21:12 | **kixelated takes over the AWS CMSF PR**, strips out-of-scope C API + start_group, ships CMSF-as-CMAF-with-different-catalog merged. **Third AWS-vs-kixelated design-cycle resolution after #1413 close and #1408→#1429 rewrite.** |
| [#1394](https://github.com/moq-dev/moq/pull/1394) | Auto-detect catalog format from broadcast name extension | +243/−114 | 21:50 | Broadcast routing — implicit MSF/Hang detection |
| [#1438](https://github.com/moq-dev/moq/pull/1438) | **Add Matroska/WebM import and export support** | **+3087/−66** | 22:44 | **MKV/WebM as third container muxer/demuxer** (`webm-iterable` dep); CMAF + LOC + MKV/WebM all in same tree |
| [#1388](https://github.com/moq-dev/moq/pull/1388) | **Add Low Overhead Container (LOC) frame format support** | **+844/−16** | 22:53 | **First LOC implementation in the moq-dev/moq stack** — new `moq-loc` Rust crate + `@moq/loc` JS package, integrated into `moq-mux` + hang catalog + watch player. Opened May 7, merged 15 days later. |
| [#1446](https://github.com/moq-dev/moq/pull/1446) | Tag audio sources with a kind to drive Opus encoder settings | +69/−12 | 23:36 | Voice vs. music Opus encoder presets |
| [#1447](https://github.com/moq-dev/moq/pull/1447) | Tighten moq-ffi release pipeline ahead of first publish | +72/−27 | May 23 02:26 | Pre-flight for FFI mirror publish to Maven Central + Swift Package Mirror |

**Aggregate**: **~+7160/−355 across ~120 files** in 8 hours, all by [[luke-curley|kixelated]] (Luke Curley) as a single contributor — no review-gate. Plus PR #1448 *"swift: wire SPM mirror publish (Phase A)"* OPENED May 23 03:08 UTC (next-up in the FFI publishing chain).

### Net structural effect: three container formats on one branch

As of May 23 02:53 UTC, **moq-dev/moq is the first MoQ implementation with all three major container formats unified on `main`**:

| Container | Pre-May-22 state | Post-May-22 state | Module |
|---|---|---|---|
| **CMAF/fMP4** | Original Hang format | Still primary | `rs/moq-mux/src/import/fmp4.rs` |
| **CMSF** (PR #1429 AWS) | OPEN since May 20 | **MERGED as #1444** | `rs/moq-mux/src/import/cmsf.rs` (via hang::Catalog IR) |
| **LOC** (PR #1388) | OPEN since May 7 | **MERGED** | `rs/moq-loc/` crate + `@moq/loc` pkg |
| **MKV/WebM** (PR #1438) | OPENED May 21 22:47 UTC | **MERGED** | `rs/moq-mux/src/{import,export}/mkv.rs` |

**Carry-forward**: by the [[2026-06-09-london-interim|London hackathon]], moq-dev/moq is positioned to be **the only implementation able to interop on all three packaging values** (`cmaf`, `loc`, and `mkv` if standardised). The CMSF/Hang unified pipeline gives `hang::Catalog` as a single in-memory IR that can serialize to MSF or Hang catalog formats; the LOC frame layer is now selectable via `Container::Loc` in the catalog. The MKV/WebM exporter (subscribe → write MKV bytes) means **standard players (VLC, MPV, browsers) can consume MoQ broadcasts via a moq-dev/moq exporter** without needing a MoQ-aware player — a structural new deployment shape.

### PR #1444 — third AWS-vs-kixelated design-cycle resolution

PR #1444 body (kixelated): *"Builds on @ksletmoe-aws's #1429 (which this branch is a fork of) and addresses the review feedback. The MSF catalog work — the actual goal of the PR — stays; the two pieces of new API that turned out unnecessary or out of scope get cut. **Importer — drop `start_group` / `with_explicit_groups`**: The default behavior already creates one group per video keyframe via `append_group()`. Caller-driven group boundaries on import don't add anything: shrinking the fragment size adds per-fragment overhead with no latency win, growing it adds latency. **libmoq — drop the slim C API**: `moq_track_create` + `moq_track_config`, `moq_broadcast_start_group`, `moq_broadcast_write`, `moq_track_close`, and `moq_group_open`/`write`/`close` are gone. This was effectively 'a C API to produce fMP4' and is its own scope — the existing `moq_publish_media_ordered` + `moq_publish_media_frame` path already provides CMAF passthrough."*

**Pattern**: this is the **third AWS-vs-kixelated design-cycle resolution in 9 days**, this time with kixelated **personally cleaning up and merging** the AWS contributor work rather than asking AWS to re-file. The previous two:
- **#1413 (May 16 → 18 CLOSED unmerged)**: AWS transport-layer encoder-failover stitching → kixelated *"stitch at application level"* → AWS re-files AVC fallback separately as `#1413`-children
- **#1408 → #1429 (May 14 → 20)**: AWS parallel CMSF pipeline (+3906/−458) → kixelated *"use intermediate representation"* → AWS re-files as #1429 (+1969/−12, 50.4% smaller)
- **#1429 → #1444 (May 20 → 22)**: AWS unified pipeline → kixelated *"two new API pieces out of scope"* → kixelated forks #1429, strips out-of-scope, and merges as #1444 (+1278/−14, another 33.5% smaller than #1429). **First time kixelated has taken over an AWS PR rather than redirecting it back.**

The cumulative ksletmoe-aws contribution shape: **#1408 → #1429 → #1444 → MERGED** in 8 days from first file to merge, with **2 rounds of kixelated-led architectural pruning** stripping AWS's preferred shape (parallel CMSF pipeline, opt-in C API, caller-driven group boundaries) down to the **MSF-catalog-and-import-only** core. AWS's net code in the merged result: ~25–30% of original #1408's scope.

### PR #1388 — LOC frame format support

PR #1388 body (kixelated): *"Implements support for the Low Overhead Container (LOC) frame format defined in draft-ietf-moq-loc across the Rust and JavaScript stacks. New `moq-loc` crate providing `encode()` and `decode()` functions for LOC frame wire format. Handles QUIC-style varint encoding for properties, supports delta-encoded property type IDs (0x06 timestamp, 0x08 timescale)... Updated catalog container enum to support LOC with configurable timescale (defaults to 1,000,000 microseconds). Added LOC preference in audio source selection (prioritized after legacy, before CMAF)."*

**Net**: moq-dev/moq now has its own LOC encoder/decoder library matching the [draft-ietf-moq-loc-02](https://datatracker.ietf.org/doc/draft-ietf-moq-loc/) wire format. **Property Type IDs in this implementation match draft-ietf-moq-transport-18 §15.8-2 (TIMESTAMP=0x06, TIMESCALE=0x08)** — *not* the draft-ietf-moq-loc-02 historical values (TIMESTAMP=0x02) that triggered Issue [yuanchao-chris #20](https://github.com/moq-wg/loc/issues/20) on May 14. Kixelated has effectively voted-with-code for the moq-transport-18 assignments to win the cross-spec coordination dispute. **Carry-forward**: until the LOC spec PR #1624 (provisional IANA registry) propagates into a draft-ietf-moq-loc-03 with aligned values, moq-dev/moq's LOC implementation is the *de facto* reference for the post-draft-18 property type assignments.

### PR #1438 — Matroska/WebM bidirectional

PR #1438 body (kixelated): *"Adds comprehensive Matroska (MKV) and WebM container support to moq-mux, enabling ingestion and re-export of MKV/WebM files as MoQ broadcast streams. MKV Importer: Handles EBML parsing via `webm-iterable`, manages per-track state with deduplication across buffer replays, and supports multiple video codecs (H.264, H.265, VP8, VP9, AV1) and audio codecs (AAC, Opus). MKV Exporter: Subscribes to catalog and per-track consumers, emits EBML headers with proper track metadata, and streams frames as Matroska SimpleBlock elements with cross-track timestamp ordering."*

**Net**: MoQ ↔ MKV/WebM bidirectional conversion lands on `main`. This unblocks **ingest from MKV/WebM source files into MoQ broadcasts** (most YouTube uploads, OBS recordings, Twitch VOD downloads) and **MKV-out exporter targets** (consume MoQ broadcasts in VLC/MPV/browsers without a MoQ-aware player). **First non-CMAF, non-LOC container packaging shipped in any tracked MoQ implementation**, predating any individual draft (no `draft-*-mkv-moq` exists). **Carry-forward**: if MKV-over-MoQ gains traction at the London hackathon as the *"consume MoQ in your existing player"* path, an `mkv` packaging value extension to [[moq-msf|MSF]] may follow Paul Gregoire's [[moq-msfts|m2ts extension]] pattern.

## GitHub `moq-wg/moq-transport` — Issue #1636 AI-hallucination incident

### Issue [#1636](https://github.com/moq-wg/moq-transport/issues/1636) escalates with afrind's explicit AI-hallucination apology

The empty-namespace clarification issue opened May 21 by RichLogan (Cisco) received its **first three comments May 22**:

- **[[alan-frindell|afrind]] May 22 18:24 UTC** (initial reply, **preceded by**: *"With apologies for answering your question with AI:"*): *"Track Namespace (for tracks): Line 511 says 'between 1 and 32 Track Namespace Fields' and line 544-546 explicitly states: 'If an endpoint receives a Track Namespace consisting of 0 or greater than 32 Track Namespace Fields, it MUST close the session with a PROTOCOL_VIOLATION.' So publishing a track with a zero-element namespace is NOT allowed — it's a protocol violation. Track Namespace Prefix (in SUBSCRIBE_NAMESPACE): Line 3107-3108 says 'between 0 and 32 Track Namespace Fields.' A zero-element prefix is explicitly permitted here — it acts as a wildcard matching all namespaces. So the rules diverge intentionally: SUBSCRIBE_NAMESPACE prefix: 0-32 fields (zero is valid, matches everything); Track Namespace (in PUBLISH, SUBSCRIBE, etc.): 1-32 fields (zero is a protocol violation). Regarding empty track name: Line 548 says 'Track Name is a sequence of bytes, possibly empty.' So yes, an empty track name is explicitly allowed."*
- **RichLogan May 22 21:15 UTC reply**: *"@afrind forgive me if I'm missing (and it's late for me) but I'm not sure that's reflective of the text in the draft today. **I can't see any mention of 'between 1 and 32 Track Namespace Fields', only 'between 0 and 32'**. E.g See here the Track Naming section: [draft-18 §2.4.1](https://www.ietf.org/archive/id/draft-ietf-moq-transport-18.html#section-2.4.1) — *'Track Namespace is an ordered set of between 0 and 32 Track Namespace Fields'*. And any reference to Track Namespace I believe just links back to 2.4.1 - such as PUBLISH... Or Subscribe... I am totally fine with it being 0 elements and/or empty btw, I just wanted to double check on it."* — **catches the AI hallucination**: there is no *"between 1 and 32 Track Namespace Fields"* anywhere in draft-18; it is *"between 0 and 32"* in §2.4.1 and the lines 511 / 544-546 / 3107-3108 cited by afrind do not exist in the published text.
- **[[alan-frindell|afrind]] May 22 21:45 UTC reply**: ***"Wow, that is pretty embarrassing. I apologize. It spit out that sentence about 1 and 32 and that seemed familiar I didn't double check it. Ouch.** Per the current draft you are 100% right it's allowed to have 0 fields and a 0 length name. I'm unclear if I think it's a good idea to forbid it or not, but maybe I'm inclined to allow it. It's sort of like path=/ in HTTP?"* — **first explicit on-record acknowledged-AI-hallucination on `moq-wg/moq-transport` by an editor in spec-discussion**.

**Significance**: this is the third community-side AI-skeptic-narrative event in 4 days, after the May 18-19 Mike English ↔ Giovanni Marzot suspicious-AI-PR resolution (*"Claude being overzealous"*) and Lorenzo Miniero's May 19 07:52 UTC *"One more reason for me to stay away from AI as long as I can"*. Here the structurally novel piece is that **afrind preemptively disclosed AI assistance** (*"With apologies for answering your question with AI"*) before the answer was challenged — implying community awareness that AI-generated spec quotes carry hallucination risk has already settled at the editor level. **Carry-forward**: expect informal *"verify the citation"* norms to harden on `moq-wg/moq-transport` issue threads; explicit AI disclaimers ahead of AI-assisted answers may become a community norm. The substantive open question (*"should 0-element namespace + empty name be allowed, or restricted?"*) is now back to manual review — afrind tentatively in favour of allowing (*"it's sort of like path=/ in HTTP"*), no further comments at 06:00 UTC May 23.

## GitHub `moq-wg/msf` — Issue #164 kixelated *"Require sample rate and channels"*

[Issue #164](https://github.com/moq-wg/msf/pull/164) opened May 22 20:17 UTC by [[luke-curley|kixelated]]:

> *"These fields should be required for audio tracks. If they're optional, I have to parse the init segment (gross) just to figure out if I should subscribe to the given track. And yeah I already filed a few issues, but we should have more required fields in MSF. **It's reaally annoying that everything is optional.**"*

Net: kixelated's third successive MSF schema strengthening ask (after track-level `bitrate` / `displayResolution`, both filed May during the #1408/#1429 review cycle). The pattern is **"MSF as a subscribe-decision oracle, not a sub-spec of the init segment"** — kixelated wants the catalog to provide enough audio-track info that a subscriber can choose between mono/stereo/5.1 / 22.05 kHz / 48 kHz tracks without instantiating a decoder or fetching init segments. Currently MSF lets all of these be optional, defaulting to *"fetch init segment to find out"*. **Carry-forward**: the May 22 Will Law (MSF/CMSF) 20-min London Day-2 slot will need to land at least an editorial commitment on which MSF fields move from optional to required. kixelated has effectively pre-staged the design conversation.

## Mailing list — Martin Duke "Consensus call on filters" + 4-message Object Filters thread + 4th simultaneous consensus call

### [Moq] Consensus call on filters ([archive](https://mailarchive.ietf.org/arch/msg/moq/6g0WlQfghKJr4ufgjobT_1Dkrf0/)) — Martin Duke May 22 12:22 UTC

[[martin-duke|Martin Duke]] (MOQ chair): *"Following the interim meeting on May 11th, the chairs determined there was rough agreement to 'merge all the filters into the MOQT draft except for top N, where there were substantial concerns.' Most filter mechanisms would be incorporated into the main MOQT specification, while the 'top N' filter approach would potentially become an optional extension instead."* **The consensus call closure deadline is June 5** (1 day after the SWITCH/DTS June 4 deadline, 6 days before London opens June 11).

**Net: 4 simultaneous chair-opened consensus calls now in flight**:
1. **Joining FETCH Survey** (afrind May 11, no formal deadline — survey-shape)
2. **Consensus call on Object filters** (Magnus Westerlund, May 12, deadline May 26)
3. **Consensus Call: DTS and SWITCH** (Martin Duke, May 21, deadline June 4)
4. **Consensus call on filters** (Martin Duke, May 22, deadline June 5) — **new today**

The four consensus calls cascade: **May 26 (Object Filters close + DTS/SWITCH show-of-hands) → June 4 (DTS/SWITCH formal close) → June 5 (Filters formal close) → June 11-12 (London formal session)**. Martin Duke is effectively running a **3-week chair-coordinated decision pipeline** to maximize the inputs available at London.

**Important nuance**: Magnus's May 12 *"Object Filters"* consensus call (deadline May 26) and Martin's May 22 *"filters"* call (deadline June 5) **overlap in scope** but address different framings:
- **Magnus's call (May 12)**: should the Object Filters work in [PR #1518](https://github.com/moq-wg/moq-transport/pull/1518) be included in MOQT as **optional-to-implement with max-count signalling**?
- **Martin's call (May 22)**: which filters should be **mandatory MOQT vs. extension**? *"merge all except top-N"* implies Object Filters + Range Filters + Subscription Location Filters become MOQT-required, Top-N becomes extension.

The two calls together produce a **layered disposition matrix**: (a) what filters land in MOQT *at all* (Magnus), (b) which of those are *required vs. optional* (Martin). **Carry-forward**: London Day-1 0945–1045 (Mo Zanaty's 35-min filter slate) is now structurally **constrained by both consensus call outcomes** by the time it opens.

### [Moq] Consensus call on Object filters — 4-message thread May 22-23 (afrind ↔ Mo Zanaty)

The Magnus Westerlund May 12 thread received four substantive replies May 22-23, debating PR #1518's interpretation:

- **[[alan-frindell|afrind]] May 22 21:39 UTC** ([archive](https://mailarchive.ietf.org/arch/msg/moq/Z8FfhnHefTt_MyQIk8fX2iPJebk/)): notes ambiguity in PR text vs. consensus-call meeting discussion. *"The PR text suggests that Property filters in SUBSCRIBE_TRACKS do not impact control plane behavior — a subscriber would still receive PUBLISH messages for tracks with non-matching properties if individual objects override those properties. However... the meeting discussion [favored] a stricter interpretation where subscribers wouldn't receive PUBLISHes for non-matching tracks. Applying filters once at PUBLISH time is more efficient than filtering at the object level... The feature could reasonably exist as an optional extension rather than core specification."* — **afrind's first explicit Object-Filters-as-extension preference**, contradicting Martin Duke's same-day *"merge all except top-N"* framing.
- **[[mo-zanaty|Mo Zanaty]] May 23 00:29 UTC** ([archive](https://mailarchive.ietf.org/arch/msg/moq/patpBIlwfAHVdd2eKxIkllhpnYc/)): quotes PR #1518 directly: *"If a track has a Track Property of the specified Property Type, its value is used for filtering both the PUBLISH message and any Objects from that track that lack their own value for that Property Type."* — argues PR text is **already clear** that property filters apply to both PUBLISH and Objects; **questions whether London slot is still needed**.
- **[[alan-frindell|afrind]] May 23 00:48 UTC** ([archive](https://mailarchive.ietf.org/arch/msg/moq/1IVV3tazCaLFaEnQ6rYzEkiNcO8/)): *"Thanks for setting me straight Mo. That's clear enough and I missed it."* — concedes the misread; the *no objects from non-matching tracks are delivered* semantic is what PR #1518 already says.
- **[[mo-zanaty|Mo Zanaty]] May 23 01:38 UTC** ([archive](https://mailarchive.ietf.org/arch/msg/moq/4H7rJc1i2nyZ5dNJQPtyU2E6658/)): *"The text is clear. Should we use the London slot, or release it?"* Plus a **terminology critique**: *"the current pull request (PR#1518) refers to all property filters as 'Range Filters,' while reserving 'Track Filter' specifically for top-N functionality"* — proposes London time be reserved primarily to align terminology rather than re-debate the technical interpretation.

**Net effect on London agenda**: the **Mo Zanaty 15-min Track Property Filters slot (1015-1020) is now possibly vacated** — if Mo releases it, afrind's *"Other MOQT Issues"* 120-min block absorbs ~15 min of headroom. Watch for chair-side reshuffle in the next week. The **terminology cleanup ask** (Range Filters → Property Filters; Track Filter reserved for Top-N) is a low-controversy editorial that can land via mailing list before London.

### [Moq] Google Transparency Report — May 22 spam carry-forward

[Alan Mallett May 22 03:57 UTC](https://mailarchive.ietf.org/arch/msg/moq/bEguSuTk4CxxQobcpRzGeihgyLE/) — same spam message previously flagged on May 22 wiki entry. **No chair follow-up on moderation policy after 31 hours.** Pattern persists: dmarc-mitigation / member-moderation continues to allow non-list-member single-link spam through to the public archive.

## Slack — `#moq` quiet for 60 hours; all channels silent

`#moq` last message: gazzy May 20 15:22 CEST (Moqintosh iOS announcement). **No further messages May 21, 22, or first 6h May 23 UTC.** `#moq-interop-runner`, `#moq-rs`, `#moq-js`, `#libquicr` all quiet. The 60h silence is the **longest `#moq` quiet window since the May 11 interim** — community discussion has fully shifted to GitHub Issues / mailing list / PR review.

## Interop runner — recovers to 168/46/121/1 (+4 pass); 5-day cadence intact

**New report [2026-05-23 00:42:56 UTC](https://englishm.github.io/moq-interop-runner/results/2026-05-23_004256/report.html): 168 / 46 / 121 / 1** (total / pass / fail / skip). **+4 pass vs May 22** (42 → 46), pass rate **25.0% → 27.4% (+2.4pp)** — **fully recovers from May 22's regression**, restoring to the May 21 level. **5 consecutive days of daily cadence** (May 19, 20, 21, 22, 23). Skip count returns to 1.

The May 22 regression hypothesis (*"moq-dev/moq's record-tying May 21 PR cluster broke matrix tests"*) appears confirmed by the May 23 recovery: with kixelated's May 22 merge wave being largely **non-wire-level** (CMSF cleanup, LOC frame format, MKV/WebM I/O, stats, Opus encoder kinds, reconnect timeout) the matrix re-stabilises. **Pattern observed**: the moq-dev/moq main-branch matrix is **noise-sensitive to wire-level refactors but quickly self-corrects** when downstream PRs are pipeline/codec/library changes. The +4 / −4 oscillation over two days suggests the matrix is healthy enough to register both regressions and recoveries within one daily-cycle. **Target still draft-16** ([PR #68](https://github.com/englishm/moq-interop-runner/pull/68) still OPEN).

## google/quiche moqt — Day +2 quiet

Last commit on `quiche/quic/moqt` path: `083b83b3` martinduke *"Remove unnecessary tests from MoqtSessionTest"* May 20 22:36 UTC. **No new commits May 21, 22, or first 6h May 23 UTC** — 60h+ quiet. Martin Duke's chair workload (the 4-consensus-calls-in-flight + agenda finalisation + 3 mailing-list messages May 21 + Issue #1633 substantive thread + *"Consensus call on filters"* email May 22 12:22 UTC) has structurally redirected his Google-side engineering bandwidth into chair-coordination work.

---

# Activity (May 21 06:00 UTC → May 22 06:00 UTC) — **moq-dev/moq Swift+Kotlin FFI wrappers MERGED (PR #1432 +1997/−569, 48 files, 24h after gazzy's Moqintosh iOS announcement); Martin Duke publishes FINAL London Interim Preliminary Agenda — Mo Zanaty filter-cluster compressed 135→50 min, Tim Evens denied, only afrind/Will/Cullen/Suhas core fit; Consensus Call: DTS and SWITCH opened May 21 17:29 UTC (deadline June 4); 26 May interim re-purposed for DTS/SWITCH show-of-hands; #1633 substantive 4-comment martinduke↔ianswett make-before-break thread; #1636 RichLogan empty-namespace clarification new issue; mondain/moqxr 3 more commits (live publish API + MSF media timeline); interop runner REGRESSION 168/42/125 (-4 pass from 46→42, first regression in cadence since recovery)**

## Mailing list — Martin Duke chair-triplet (Final Agenda, Consensus Call, May 26 prep) drives the London/May-26 decision sequence

Three mailing-list messages from chair [[martin-duke|Martin Duke]] within **49 minutes** (May 21 17:19 → 18:08 UTC) **structurally lock the May 26 → June 4 → June 11-12 decision pipeline**:

### [Moq] 26 May Agenda ([archive](https://mailarchive.ietf.org/arch/msg/moq/fTAIZlLWEU16uNOwDDZwxyPxY3w/)) — May 21 17:19 UTC

*"After a few minutes of administrivia, almost the entire balance of Tuesday's meeting will be given to Gwendal and Will to discuss SWITCH and DTS: https://github.com/moq-wg/moq-transport/pull/1378 https://github.com/wilaw/dts4moq. The chairs expect them to work together to use the time constructively. ... The chairs will also take the last 15 minutes for a series of Show of Hands to supplement a consensus call that will go on the list shortly. The outcome of this meeting will be a decision to either (1) incorporate this work directly into MoQT, (2) adopt as an extension, or (3) send to /dev/null."*

**Net: interim-2026-moq-16 (May 26) is now structurally a SWITCH/DTS show-of-hands meeting**, not a general working-meeting. Other agenda items (editor + design discussions) **only get time if the SWITCH/DTS block ends early** — *"by some miracle"*, in Martin's framing. Cullen Jennings's [May 9 #moq-interop-runner OpenMOQ-fallout-suppressed message about Ali Begen's SWITCH demo](https://quicdev.slack.com/) now lands at the structurally-correct meeting — Ali + Yu have published SWITCH/DTS experimental-result demos, the chairs explicitly defer to Gwendal/Will on whether to fold those into the meeting.

### [Moq] Consensus Call: DTS and SWITCH ([archive](https://mailarchive.ietf.org/arch/msg/moq/O0Nw9uiGpDv08ZDksPDvcYUreD0/)) — May 21 17:29 UTC

*"This begins a consensus call on the disposition of DTS and SWITCH. The call ends on 4 June.* [PR #1378](https://github.com/moq-wg/moq-transport/pull/1378) *and* [wilaw/dts4moq](https://github.com/wilaw/dts4moq). *... For each of these documents, the questions are: (1) Should the Working Group adopt the contents of this work in some form? (2) If yes, should the contents of this work be incorporated into the MOQT draft (as opposed to an extension draft)?"*

**Net: the SWITCH consensus call now has a hard deadline 1 week before [[2026-06-09-london-interim|London]] starts (June 4)**. This is the **first formal SWITCH-disposition vote** since Gwendal Simon's April PR-#1378 refresh. The two-question structure — *adoption* + *integration-vs-extension* — gives DTS and SWITCH 3 possible outcomes each (decline / extension / MOQT-integration), so the call can produce nine combined outcomes. Chairs *"strongly encourage everyone to attend the 26 May interim... if you intend to do neither [attend interim or watch video], you are welcome to register your position now."* — the May 26 + June 4 deadlines are linked: the show-of-hands feeds the formal consensus disposition.

### [Moq] London Interim Preliminary Agenda ([archive](https://mailarchive.ietf.org/arch/msg/moq/RTlJvR6VcT4LGGt2yLRwfgxRAQE/)) — May 21 18:08 UTC

Martin Duke published the **final London agenda** (June 11-12), opening with *"Here is the preliminary agenda for the London Meeting on 11 and 12 June. We have decided to prioritize core MOQT draft issues and **did not have time to meet all the requests**. The gaps in the schedule are discussion time for each issue. The agenda for Friday is dependent on the outcome of the SWITCH consensus call ... which just started and concludes on 4 June. Cloudflare is also looking into catering lunch one or both days; if this happens, we may have some lunch demos that you are welcome to attend."*

**Day 1 (June 11) — MOQT core issues only**:

| Slot | Topic | Lead | Min | Reference |
|---|---|---|---|---|
| 0945–1000 | Object Range Filters | [[mo-zanaty\|Mo]] | 15 | [PR #1518](https://github.com/moq-wg/moq-transport/pull/1518) |
| 1015–1020 | Track Property Filters | [[mo-zanaty\|Mo]] | 5 | [PR #1518](https://github.com/moq-wg/moq-transport/pull/1518) |
| 1030–1045 | Subscription Location Filters | [[mo-zanaty\|Mo]] | 15 | [PR #1401](https://github.com/moq-wg/moq-transport/pull/1401) |
| 1100–1130 | Request Blocking | [[alan-frindell\|Alan]] | 30 | [Issue #1519](https://github.com/moq-wg/moq-transport/issues/1519) |
| 1300–1310 | Concurrent Subscribe | [[alan-frindell\|Alan]] | 10 | [Issue #1633](https://github.com/moq-wg/moq-transport/issues/1633) |
| 1330–1350 | Joining FETCH | [[alan-frindell\|Alan]] | 20 | [Joining Fetch Dissent label](https://github.com/moq-wg/moq-transport/issues?q=is%3Aissue%20state%3Aopen%20label%3A%22Joining%20Fetch%20Dissent%22) |
| 1445–1500 | Next Interim Planning | [[martin-duke\|Martin]] | 15 | — |
| 1500–1700 | Other MOQT Issues | [[alan-frindell\|Alan]] | 120 | [All issues](https://github.com/moq-wg/moq-transport/issues) |

**Day 2 (June 12, conditional on SWITCH/DTS being incorporated)**:

| Slot | Topic | Lead | Min |
|---|---|---|---|
| 0930–0945 | Interop Report | [[mike-english\|Mike]] | 15 |
| 0945–1000 | DOS Design team readout | [[mike-english\|Mike]] | 15 |
| 1015–1045 | SWITCH Issues (if adopted) | Gwendal | 30 |
| 1115–1130 | DTS Issues (if adopted) | [[will-law\|Will]] | 15 |
| 1300–1310 | Top-N DDOS | Cullen | 10 |
| 1320–1335 | Top-N issues | [[mo-zanaty\|Mo]] | 15 |
| 1405–1410 | Top-N Implementation | [[suhas-nandakumar\|Suhas]] | 5 |
| 1415–1435 | MSF/CMSF | [[will-law\|Will]] | 20 |
| 1505–1515 | Privacy Pass | [[suhas-nandakumar\|Suhas]] | 10 |
| 1525–1535 | Secure Objects | Cullen | 10 |

**Net request-vs-agenda compression analysis** (formal time, ignoring gap-discussion):

| Requester | Asked | Got | Compression |
|---|---|---|---|
| [[mo-zanaty\|Mo Zanaty]] | 135 min (5 filter items) | **50 min** (3 Day-1 filter items 35 min + Top-N Day 2 15 min) | **−63% (largest cut)** |
| [[suhas-nandakumar\|Suhas]] | 55 min (Top-N + Privacy Pass) | 15 min (Top-N Impl 5 + Privacy Pass 10) | −73% |
| Cullen Fluffy Jennings | 50 min (Secure Object 20 + track filter DDOS 30) | 20 min (Top-N DDOS 10 + Secure Objects 10) | −60% |
| [[will-law\|Will Law]] | 105 min (MSF/CMSF 60 + DTS 30) | 35 min (MSF/CMSF 20 + DTS 15, both conditional) | −67% |
| [[alan-frindell\|afrind]] | ~240 min (37 issues) | **180 min** (Request Blocking 30 + Concurrent Subscribe 10 + Joining FETCH 20 + Other MOQT Issues 120) | **−25% (smallest cut)** |
| Tim Evens (May 21) | 15 min (draft-evens-moq-bench) | **0 min** | **−100% (DENIED)** |

**Pattern**: the chairs **prioritised core-MOQT issues (afrind) and structurally compressed implementation-experience and external-format requests (Mo / Suhas / Cullen / Will)**. Tim Evens's late May 21 request for `draft-evens-moq-bench` (BMP-style benchmarking draft) was **dropped entirely** — first explicit late-request rejection-by-omission in the wiki's tracking. The Day-2 *"if SWITCH/DTS are incorporated"* conditional means the formal-session day-2 collapses to ~3h of Top-N+MSF/CMSF+Privacy Pass+Secure Objects if both DTS and SWITCH go to `/dev/null` on June 4.

**Day-2 Joining FETCH dissent** is NOT explicitly slotted in Day 2 — only Day 1 (20 min). The combined Filter+Joining-FETCH+Concurrent-Subscribe block on Day 1 is **75 min total (afrind+Mo)**, vs. Mo's ~135min ask. **Carry-forward**: by the time London opens June 11, the WG will have **3 disposition events** behind it: May 26 show-of-hands, June 4 consensus call close, and now-frozen agenda. The London-time pressure to land MOQT consensus is structurally maximised.

### [Moq] Re: London Agenda requests — Tim Evens (Cisco) May 21 12:13 UTC

[Tim Evens](https://mailarchive.ietf.org/arch/msg/moq/X1er3XKMSkEDDwhmhqZHFb3l7Ik/) filed *"15-minute update to `draft-evens-moq-bench`"*. **Filed ~6 hours before Martin's final agenda publication; not selected.** Tim's BMP-style MoQ benchmarking draft has no PR in `moq-wg/moq-transport` and is an individual draft — the rejection-by-omission is consistent with chair pattern of *"WG-document items first"* (draft-evens-moq-bench is not WG-adopted).

### Other mailing-list activity May 21

- **[Mo Zanaty May 21 02:50 UTC Joining FETCH Survey answers](https://mailarchive.ietf.org/arch/msg/moq/xKvUQ6-ydDdkDc9ey3hj66mSuz4/)** — Q1.1 (does not need Joining FETCH for his use case) / Q2.1 (can live with shape) / Q3 MUST replace / Q4.1 Y (past data must be FC) / Q4.3 MAY (fill semantics) / Q5 1-2 (1-2 months delay OK). **First explicit "I do not need Joining FETCH" survey vote** from a chair (well, an Apple/Cisco-affiliated chair-adjacent reviewer); softens the survey's core constituency.
- **[Victor Vasiliev May 21 01:14 UTC Joining FETCH Survey](https://mailarchive.ietf.org/arch/msg/moq/99Dcw9gpnVONG9jN9L6OQqIO8Sk/)** — *"Regarding question 2, I think we have an issue on both planes. On the control plane, we have an unsatisfying entanglement of two requests that does not really have a good way to spell it on the wire. On the data plane, we violate the general principle of 'never delivering the data that the user lacks the context to parse' whenever we start a subgroup with a random P-frame. Issue 1614 describes that fairly well. Regarding question 4, I can see this working for the previous groups too, but it's kind of pushing it? I mean, if you ask for 1000 groups, you'll surely just get almost 1000 resets. I think the non-joining fetch addresses this adequately."* — articulates the unified data-plane skepticism beyond current-group as practical-only.
- **[Alan Mallett May 22 03:57 UTC Google Transparency Report](https://mailarchive.ietf.org/arch/msg/moq/bEguSuTk4CxxQobcpRzGeihgyLE/)** — list spam (a single link to transparencyreport.google.com with no context). First moderated-through spam on `moq@ietf.org` since the Apr 18 hijacking incident; the message slipped through dmarc-mitigation / member-moderation as a list-non-member. **No mailing-list policy follow-up yet from chairs**.

## GitHub `moq-wg/moq-transport` — Issue #1636 OPENED + Issue #1633 substantive make-before-break thread

### Issue [#1636](https://github.com/moq-wg/moq-transport/issues/1636) *"Empty namespace clarification"* OPENED May 21 10:50 UTC by RichLogan (Cisco)

Body: *"I was just reading the draft-18 text regarding namespace prefixes and full track names and wanted to clarify the rules for our implementation. I understand the use-case for zero element namespace prefixes, but wanted to check that publishing a track with a zero element namespace is allowed, and in theory, given the text as it is today, a track with a zero element namespace AND an empty name is also allowed?"* — **first post-publication wire-level draft-18 clarification request from RichLogan**. No comments yet. Belongs in the *"draft-18 ambiguity backlog"* alongside #1633/#1634/#1635 (afrind May 19 tranche) and #1632 (yuanchao-chris May 14 Properties Type collision).

### Issue [#1633](https://github.com/moq-wg/moq-transport/issues/1633) — Make-before-break / next-group-boundary thread (4 May 21 comments)

The 6-day-old concurrent-subscriptions issue received 4 substantive comments May 21 18:43-21:21 UTC, building out the **make-before-break vs. REQUEST_UPDATE-on-next-group** design space surfaced by Luke Curley's May 18 SVC thread:

- **[[martin-duke|Martin Duke]] May 21 18:43 UTC**: *"Yes, 1b. The non-silly use case for this is **make-before-break or just avoiding a session_error because of a lost RESET_STREAM**. If a client does this it's going to have to deal with an object that maps to two local subscriptions and/or figure out under which handle to pass it up the stack."* — first explicit chair-side endorsement of **1b (same Track Alias, publisher coalesces)** with **make-before-break as the load-bearing use case**.
- **[[ian-swett|Ian Swett]] May 21 18:50 UTC**: *"With Subgroup filters, one clear usecase is **starting the enhancement layer Subgroup at the next group boundary**. I believe the easiest way to accomplish this is to **end the current Subscription at the end of the current Group and start a new one at the next Group with the updated Subgroup filter**."* — concrete SVC-flow design: the SGPL enhancement-layer-onboarding use case explicitly requires 2 concurrent subscriptions transitioning at group boundary.
- **[[martin-duke|Martin Duke]] May 21 18:57 UTC reply**: *"yeah, that's a make-before-break. It also highlights that the **group-as-join-point thinking in the design is still pretty muddled. Why can't a REQUEST_UPDATE be triggered to start on the next group?**"* — **opens a new design alternative**: instead of allowing 2 concurrent subscriptions for the next-group transition, extend REQUEST_UPDATE with a *"start at next group"* parameter. **First explicit chair-side framing that #1633 is downstream of a deeper Group-As-Join-Point design assumption.**
- **[[ian-swett|Ian Swett]] May 21 21:21 UTC**: *"I think a REQUEST_UPDATE could be triggered to start on the next group, but doing that for arbitrary parameters/filters might be quite complex? I think **a simpler option might be to start a new Subscription with the new filters you want**, but I could be wrong."* — pushback: REQUEST_UPDATE-with-next-group is general-purpose but combinatorially complex; new-subscription is operationally simpler. **The London #1633 10-min slot will now need to decide both proposal-1b-vs-1a AND whether REQUEST_UPDATE gets a next-group offset.**

**Carry-forward**: Issue #1633 was already the load-bearing entry for Mo Zanaty's filter cluster + afrind's London ask; now also the entry point for an even broader **"What is the structural meaning of a Group boundary?"** design conversation. The 10 minutes Martin Duke allocated for London (1300-1310) appears **dramatically under-budgeted** for the design space that opened on May 21.

## moq-dev/moq — record-tying May 21 PR cluster (7 merged, 4 opened, 1 closed-unmerged in 24h); Swift+Kotlin FFI wrappers SHIP

**Highest single-day moq-dev/moq PR activity tracked by the wiki** outside the May 18 draft-18 burst. 12 distinct PR events touched the repo between May 21 15:40 UTC and May 22 00:38 UTC.

### Headline: [PR #1432](https://github.com/moq-dev/moq/pull/1432) MERGED May 22 00:38:56 UTC — *"Add Swift and Kotlin FFI wrappers with packaging and publishing"*

[[luke-curley|kixelated]], **+1997/−569 across 48 files**. Body excerpts:

> *"This PR adds **ergonomic Swift and Kotlin wrappers** around the moq-ffi UniFFI bindings, along with complete packaging and publishing infrastructure for both platforms. Introduces two new language bindings for Media over QUIC: **Swift Package** for iOS and macOS applications, **Kotlin libraries** for Android and JVM applications. Both wrappers provide idiomatic async/await APIs that integrate with their respective platform's concurrency models (Swift's `AsyncSequence` and Kotlin's `Flow`), with automatic cleanup and cancellation propagation."*

**Net: moq-dev/moq now has first-class iOS/macOS/Android/JVM language bindings**, shipped via UniFFI + idiomatic platform-language wrappers. **The timing is structurally significant**: gazzy's [[moqintosh|Moqintosh]] iOS Swift client was announced on `#moq` **May 20 15:22 UTC** as a *"Pure Swift Client Only draft-14 based"* implementation; PR #1432 was opened May 21 16:24 UTC by kixelated — **24 hours later**, with **draft-18 (current main)** and **both client + relay capabilities** via UniFFI. This positions moq-dev/moq as **the first-party native iOS+Android stack** in a way that gazzy's exploratory `t-gazzy/Moqintosh` was *not*. **It's an open question whether gazzy's Moqintosh effort will continue independently or pivot to moq-dev/moq's FFI wrappers.**

### Second-headline: [PR #1438](https://github.com/moq-dev/moq/pull/1438) OPENED May 21 22:47 UTC — *"Add Matroska/WebM import and export support"*

[[luke-curley|kixelated]], **+3092/−39** (largest in-flight single PR on the repo). Body excerpts:

> *"Adds comprehensive Matroska (MKV) and WebM container support to moq-mux, enabling **ingestion and re-export of MKV/WebM files as MoQ broadcast streams**. Bidirectional Matroska/WebM support: Import (`rs/moq-mux/src/import/mkv.rs`): Parses MKV/WebM files and converts them to MoQ broadcast streams... Export (`rs/moq-mux/src/export/mkv.rs`): Subscribes to MoQ broadcasts and produces valid Matroska/WebM byte streams for consumption by standard media players."*

**Net: moq-dev/moq is now adding a third container muxer/demuxer pipeline** alongside CMAF (existing, also got the CMSF unification via PR #1429) and Matroska/WebM. **The structural argument is the same one kixelated has been pushing AWS toward**: *"the relay is format-agnostic; the difference is purely at the edges"* (PR #1429 May 20 framing). PR #1438 demonstrates that approach across a 3rd format. **PR #1438 is the largest container PR landed in any IETF-aligned MoQ implementation tracked by the wiki** (vs. PR #1408 AWS CMSF parallel pipeline 3906 LOC, this is +3092 in zero-duplication shape).

### Third-headline: [PR #1439](https://github.com/moq-dev/moq/pull/1439) OPENED May 21 23:10 UTC — *"Add per-track timescale and frame timestamps to moq-lite"*

[[luke-curley|kixelated]], +936/−546. Body: *"Introduces per-track timescale negotiation and per-frame timestamps to the moq-lite protocol, enabling accurate media synchronization across different frame rates and sample rates. Refactors the timestamp system from a generic `Timescale<const SCALE: u64>` type alias to a concrete `Timestamp` struct that carries both a raw value and its scale. This allows timestamps to be expressed in any unit (seconds, milliseconds, microseconds, nanoseconds) and **enables the protocol to negotiate per-track timescales via SUBSCRIBE_OK messages**."*

**Net: moq-lite gets per-track timescale negotiation at SUBSCRIBE_OK time** — a media-sync mechanism that **moq-transport draft-18 does not (yet) have at the same level**. This is the kind of moq-lite-leads-moq-transport-follows precedent that historically drove the moq-lite draft revisions; the **next moq-transport draft is the obvious carry-forward** for whether per-track timescale negotiation gets formally tracked into the WG path.

### Other moq-dev/moq merges May 21

| UTC | PR | Author | Title | LOC | State |
|---|---|---|---|---|---|
| 15:40 | #1358 | kixelated | moq-lite: rewrite Origin as a poll-driven, conducer-based model | — | **CLOSED** (after 23 days) |
| 16:11 | #1425 | moq-bot[bot] | chore: release | — | **MERGED** |
| 18:43 | #1433 | kixelated | Replace mpsc with conducer for coalesced origin consumer updates | — | **MERGED** |
| 18:50 | #1410 | YogiSotho (external) | fix(watch): hide buffering overlay while offline | — | **MERGED** |
| 18:51 | #1362 | Qizot (external) | Add audio encoder reconfiguration | — | **MERGED** (open since Apr 29) |
| 20:19 | #1435 | kixelated | Claude/cargo update 3 fx or | — | **MERGED** |
| 20:30 | #1431 | moq-bot[bot] | chore: release | — | **MERGED** |
| 22:20 | #1437 | kixelated | mux: emit avcC/hvcC in catalog description for inline-SPS/PPS importers | +358/−92 | **CLOSED unmerged** (self-close after 1h, see below) |

**[PR #1437 closing comment by kixelated May 21 22:20 UTC](https://github.com/moq-dev/moq/pull/1437)**: *"Closing — review feedback led us to the right architectural conclusion: the avc3/hev1 importers shouldn't transcode their own output. If a downstream consumer needs avc1/hvc1 (length-prefixed samples + out-of-band avcC/hvcC), that's the consumer's transcode and belongs in an exporter layer. Codec-aw..."* — **kixelated self-closing a 1-hour-old PR after review-cycle architectural redirect**. This is the **third "right architectural conclusion" self-redirect in 7 days** (after #1413 close → AVC fallback as separate PR; #1408 close → #1429 unified pipeline; #1437 close → exporter-layer transcode). **Pattern**: kixelated holds the *"format-specific edges, format-agnostic core"* line consistently, even against own-author PRs.

### Open moq-dev/moq PRs end-of-day May 21

- [PR #1389](https://github.com/moq-dev/moq/pull/1389) (stats aggregation, kixelated, OPEN since May 7 — touched May 22 05:52 UTC, 18-day-stale activity signal)
- [PR #1429](https://github.com/moq-dev/moq/pull/1429) (Unified CMSF/Hang pipeline, ksletmoe-aws +1969/−12 — touched May 21 21:37 UTC, **awaiting review since May 20**)
- [PR #1434](https://github.com/moq-dev/moq/pull/1434) (Split OriginConsumer into cheap read handle and announcement cursor, kixelated, opened May 21 17:01 UTC — follow-on to PR #1433)
- [PR #1436](https://github.com/moq-dev/moq/pull/1436) (chore: release, moq-bot[bot], opened May 21 20:34 UTC — release-plz next-cycle)
- [PR #1438](https://github.com/moq-dev/moq/pull/1438) Matroska/WebM
- [PR #1439](https://github.com/moq-dev/moq/pull/1439) Per-track timescale

**Net moq-dev/moq May 21**: 7 merges + 4 opens + 1 close-unmerged + 1 self-close = **13 distinct PR events in 24h**, **+1997/−569 +3092/−39 +936/−546 = ~+6000/−1100 net code activity**, plus 2 external merges (Qizot + YogiSotho). **The structural cadence has shifted from `merge-then-rest` to `merge-and-open-stack`** — kixelated is staging the next 4-5 PRs while #1429 (AWS CMSF) and #1389 (stats) ripen in review. **The external-contributor pipeline (Qizot 23-day-old PR merged) is healthy** — Qizot's PR #1362 was the 5th external-contributor merge of May 2026 alongside ksletmoe-aws, YogiSotho, danrossi, and Karolk99.

## mondain/moqxr — 3 more commits May 21 (live publish API, MSF media timeline track)

Paul Gregoire ([[openmoq]] member) extended the May 20 documentation/i18n sprint with **3 substantive commits May 21**:

| UTC | SHA | Subject |
|---|---|---|
| 15:49 | `8255194` | Add **live object publish API** |
| 17:12 | `8e90a0e` | Add optional **MSF media timeline track** |
| 17:17 | `5c3cf91` | Merge PR #13 from mondain/jemalloc |

**Net mondain/moqxr May 19-21 running total**: **17 commits** (8 May 19 wire-fix + 6 May 20 docs/i18n + 3 May 21 API additions). **The May 21 commits are a structural shift from compliance-fixing to feature-adding** — "Add live object publish API" and "Add optional MSF media timeline track" are forward-progress capability commits. **PR #13 jemalloc** is a memory-allocator swap (mondain-internal PR, not WG-relevant). **mondain/moqxr is now the highest-cadence open-source MoQ C++ implementation tracked by the wiki for May 2026** — 17 commits in 3 days exceeds [[imquic]]'s May draft-18 work by commit count.

## Slack `#moq` — fully quiet May 21-22 beyond join events

`#moq` channel: **only "Alina joined the channel" May 21 17:08 CEST** since the May 20 gazzy/Paul Moqintosh thread. **First fully-substantively-quiet 36h window in `#moq` since the May 11 draft-18 announcement**.

`#moq-rs`, `#moq-js`, `#libquicr`, `#moq-interop-runner`: all quiet.

## Implementations rolling status (24h window)

| Repo | Activity | Notes |
|---|---|---|
| [[moq-dev|moq-dev/moq]] | **VERY HIGH** | 7 merges + 4 opens + 2 closes |
| [[openmoq\|mondain/moqxr]] | **HIGH** | 3 commits + PR #13 merge |
| [[imquic\|meetecho/imquic]] | quiet | `main` last touch May 20 14:06:55 UTC |
| [[moq-rs\|cloudflare/moq-rs]] | quiet | quiet again after May 20 burst (PR #121 + #168) |
| google/quiche `moqt` | quiet | last commit May 20 22:36 UTC by martinduke |
| [[moqlivemock\|Eyevinn/moqlivemock]] | quiet | v0.9.0 holding |
| [[moq-js\|video-dev/moq-js]] | quiet | longer-quiet |
| [[moqtail]] | quiet | Day +9 quiet since `dbd7085` May 13 |
| [[moqintosh\|t-gazzy/Moqintosh]] | quiet | Day +2 since announcement |
| [[shaka-player]] | quiet | longer-quiet |
| Eyevinn/warp-player | quiet | 3 dependabot PRs still OPEN since May 19 |

## interop-runner — first regression in cadence

[**2026-05-22 00:43:51 UTC report**](https://englishm.github.io/moq-interop-runner/results/2026-05-22_004351/report.html): **168 / 42 / 125 / 0** (total / pass / fail / skip). **−4 pass vs May 21** (46 → 42, pass rate **27.4% → 25.0%, −2.4pp**). **First regression since cadence-recovery May 19**. **4 consecutive days of daily cadence holding** (May 19 / 20 / 21 / 22). **Target still draft-16** (PR #68 still OPEN). **Skip count drops from 1 → 0** — the one previously-skipped test is now executing and presumably contributing to the +4 fail delta. The 4-day timeline:

| Date | Total | Pass | Fail | Skip | Pass-rate | Δ pass |
|---|---|---|---|---|---|---|
| May 22 | 168 | **42** | 125 | 0 | **25.0%** | **−4** |
| May 21 | 168 | 46 | 121 | 1 | 27.4% | +8 |
| May 20 | 168 | 38 | 129 | 1 | 22.6% | +3 |
| May 19 | 168 | 35 | 132 | 1 | 20.8% | — |

**Carry-forward**: the May 21 +8 jump (the largest single-day pass-rate jump tracked) was the *real* outlier; May 22's regression to 42 brings the rolling-3-day average back to a more sustainable rate. **Hypothesis**: May 21's high-merge-volume day on moq-dev/moq (7 merges, including infrastructure-shaping ones like PR #1432 FFI wrappers and PR #1433 origin-consumer refactor) likely re-broke some moq-dev-rs/moq-dev-js test combinations that had stabilised May 19-20. **This is the cost of running the matrix against `main`-of-each-impl** — kixelated's high-velocity main-branch refactoring directly correlates with day-over-day pass-count instability.

---

# Activity (May 20 06:00 UTC → May 21 06:00 UTC) — **moq-lite → moq-net rename MERGED; AWS re-files CMSF support as PR #1429 with kixelated-feedback addressed; meetecho/imquic draft-18 lands on `main` (PR #25); cloudflare/moq-rs breaks Day +37 main-quiet streak with 2 merges; new iOS Swift implementation `Moqintosh` announced on `#moq`; Cullen re-files Secure Object + track-filter-DDOS in compliant format; Mo Zanaty files 135-min filter-focused agenda block despite Martin Duke implicitly declining the May 26 deadline-extension; interop runner +8 pass to 46/121 (3-day cadence)**

## Slack `#moq` — SVC thread extends to 19 replies; new iOS impl announcement

**SVC TPL-vs-SGPL thread** ([parent: Suhas Nandakumar May 17 02:56 UTC](https://quicdev.slack.com/archives/C046V0QF3CK/p1778986563369149)) added 2 more replies, the **first thread activity in 36 hours** after Luke Curley's May 18 20:25 UTC *"quota exceeded not a protocol violation"* close:

- [**afrind May 20 14:56 UTC**](https://quicdev.slack.com/archives/C046V0QF3CK/p1779288988400469?thread_ts=1778986563.369149): *"Another diff: you cannot NGR a subgroup - only a group."* — a previously-undocumented **TPL-vs-SGPL functional asymmetry**: New Group Request (NGR) signaling is scoped to group granularity, so subscribers using subgroup-per-layer cannot independently request the next group of one specific layer; track-per-layer keeps that capability. **This adds a 4th technical diff** to afrind's May 15 *"essentially isomorphic"* framing (the prior 3: Alias-vs-SGID, dedup contract, multi-level priority — now NGR scoping).
- [**Ian Swett May 20 15:53 UTC**](https://quicdev.slack.com/archives/C046V0QF3CK/p1779292398648829?thread_ts=1778986563.369149): *"There are a number of cases you might want multiple at once, particularly in transitions."* — first Ian Swett intervention in the SVC thread, reinforcing the same point he made on issue #1633 (*"we need to fix the SUBSCRIBE to the same Track twice problem... Filters are a forcing function"*).

**Net: the SVC thread has surfaced the unresolved [Issue #1633](https://github.com/moq-wg/moq-transport/issues/1633) "concurrent subscriptions per Track" as a *prerequisite* design decision** for whether TPL and SGPL converge under filter-based subscription, with NGR-asymmetry now flagged as a SGPL-specific gap. afrind's May 15 *"religious question"* framing has now resolved into 4 concrete technical diffs — the London discussion will not be a flame-war but a structured trade-off analysis.

### Moqintosh — new iOS Swift implementation announced

[**gazzy (Toshiro Igarashi) May 20 15:22 UTC**](https://quicdev.slack.com/archives/C046V0QF3CK/p1779290573826369): *"Hi. I have released iOS client for MoQ. I hope iOS developers use. • Pure Swift • Client Only • draft-14 based • github.com/t-gazzy/Moqintosh"* (2× 👍 reactions).

[**Paul Gregoire May 20 15:31 UTC**](https://quicdev.slack.com/archives/C046V0QF3CK/p1779291103103049?thread_ts=1779290573.826369): *"I made 'toy' I was messing around with over the weekend, I named mine nearly the same 'moqntosh'; I guess we thought of the same play on words."* — naming-coincidence note; OpenMOQ's [[paul-gregoire|Paul Gregoire]] has a private `moqntosh` toy unannounced.

[**Repo metadata (`gh api repos/t-gazzy/Moqintosh`)**](https://github.com/t-gazzy/Moqintosh): created **2026-04-10**, last push **2026-05-20 15:27 UTC**, primary language **Swift**, description *"Pure Swift Media over QUIC framework"*, 3 stars at announcement.

**Net: 14th distinct open-source MoQ implementation tracked by the wiki** (after [[moq-dev]], [[moq-rs]], [[moq-js]], [[moxygen]], [[libquicr]], [[aiomoqt]], [[xquic-moq]], [[moqlivemock]], [[moqtail]], [[imquic]], [[quiche-moq]], [[shaka-player]], [[openmoq|mondain/moqxr]]). **First iOS-targeted client**, joining gazzy's earlier `#moq` Q&A activity (May 16 OS-level audio bug, March datagram-size questions). Draft-14 baseline is **2 revisions behind** the May 12 [[moq-transport|draft-18]] watermark; positions Moqintosh as an exploratory rather than interop-target implementation. **No mention of London hackathon participation** by gazzy.

Other `#moq` channel activity: **quiet** beyond the SVC thread + Moqintosh announcement. `#moq-interop-runner`, `#moq-rs`, `#moq-js`, `#libquicr` also quiet.

## moq-dev/moq — PR #1428 MERGED, AWS PR #1429 re-frames CMSF as targeted hang-pipeline extension

### [PR #1428](https://github.com/moq-dev/moq/pull/1428) MERGED May 20 14:07:45 UTC by kixelated

*"rename moq-lite package to moq-net"* (+1230/−939, **MERGED 2 days after open**). The rename announced May 18 22:31 UTC is now live in `main` and on crates.io / npm / PyPI as **`moq-net v0.1.0`**. The deprecation shims (`moq-lite` Rust no-update, `@moq/lite` JS runtime warning + `@deprecated`, `py/moq-lite` `DeprecationWarning`) all shipped intact. **First library-rename to land cleanly in 2 days** since the late-2024 `kixelated/moq-rs` → `moq-dev/moq` org-rename took ~3 weeks. The matrix-side question — whether the [[interop-runner]] should relabel `moq-dev-rs` / `moq-dev-js` → `moq-net-rs` / `moq-net-js` — is not yet acted upon.

### [PR #1429](https://github.com/moq-dev/moq/pull/1429) OPENED May 20 08:37:20 UTC by ksletmoe-aws

*"feat: Unified CMSF/Hang pipeline"* (+1969/−12, **OPEN**). Body verbatim (excerpts):

> *"Unify CMSF support into the existing hang/CMAF pipeline. **Supersedes #1408, addressing all review feedback.**
>
> Instead of a parallel CMSF pipeline (~2400 lines duplicating CMAF logic), this extends the existing pipeline with targeted additions (+1658 lines, no duplication). **The key insight: CMSF is CMAF with a different catalog format.** The relay is format-agnostic, so the difference is purely at the edges.
>
> How it addresses #1408 feedback:
> - 'Support both via intermediate representation' → `hang::Catalog` is the IR, one pipeline, two catalog serializations
> - 'Don't copy-paste shared CMAF code' → **Zero duplicated code**
> - 'Need `--catalog msf`' → Done
> - 'C API should be a struct' → `moq_track_config` with `size` field for ABI compat
> - 'Don't want C API to be a CMAF muxer' → It's not; just track/group lifecycle
> - 'Don't want both description and init segment' → Only `init_data` in the config"*

**Simultaneously** [PR #1408](https://github.com/moq-dev/moq/pull/1408) (the original May 14 CMSF muxer/demuxer, +3906/−458) was **CLOSED unmerged by AWS at 08:37:27 UTC** — same minute as #1429's open, deliberate supersession. **Net delta: −1937 LOC** (from 3906 → 1969 addition count), 50.4% size reduction by accepting the *"CMSF is CMAF with a different catalog format"* framing kixelated had pushed in the #1408 review thread.

**Carry-forward**: This is the **second AWS-vs-kixelated design-cycle resolution in 7 days**, both ending with AWS re-architecting toward kixelated's preferred shape:

| Cycle | AWS Initial Position | kixelated Counter | AWS Final | Result |
|---|---|---|---|---|
| **#1413 (May 16 → 18)** | Transport-layer encoder-failover stitching for non-sequential groups | *"It's a lot less gross to stitch at the application level."* | Re-files AVC fallback as separate PR | CLOSED unmerged May 18 |
| **#1408 → #1429 (May 14 → 20)** | Parallel CMSF pipeline (+3906 LOC, ~2400 lines duplicated CMAF logic) | *"Support both via intermediate representation"*, *"Don't copy-paste shared CMAF code"* | `hang::Catalog` as IR, one pipeline, zero duplication (+1969 LOC) | Re-filed as #1429 May 20, **awaiting review** |

The cycle time is **6 days end-to-end** for a structural rewrite of the largest external PR ever filed against moq-dev/moq. **AWS-as-corporate-contributor signal**: the engineering team commits to live design dialogue rather than parallel-fork, even when the rework cost is multi-day. **kixelated-as-maintainer signal**: holds the *"format-agnostic relay, format-specific edges"* line consistently across multiple AWS PRs.

### Other moq-dev/moq activity May 20

- **PR #1358** *"moq-lite: rewrite Origin as a poll-driven, conducer-based model"* (kixelated, **OPEN** since Apr 28, +unknown LOC, touched **May 20 16:40 UTC**) — 22-day-stale architectural PR, signs of life via comment/rebase activity.
- **PR #1425** *"chore: release"* (release-plz auto, v0.16.4, **OPEN** since May 18 08:10 UTC, last touched **May 20 16:09 UTC**) — release-plz autopilot rebasing against May 19 changes. Awaiting human merge.
- **PR #1410** YogiSotho buffering overlay fix Day +5 stale (last touch May 19 01:11 UTC).

## meetecho/imquic — [PR #25](https://github.com/meetecho/imquic/pull/25) MERGED to `main` — draft-18 leaves branch

[**PR #25 MERGED May 20 09:25:23 UTC**](https://github.com/meetecho/imquic/pull/25) by [[lorenzo-miniero|Lorenzo Miniero]] (+2184/−1693, *"Add support for MoQT v18"*). Body verbatim:

> *"This is a series of changes (ongoing) implementing support for MoQT v18. As usual, the draft introduced many changes, including (but not limited to): a change in the SUBGROUP_HEADER flags (FIRST_OBJECT bit), delta encoding of a few IDs in FETCH, a new PADDING message that can be sent on dedicated streams, SUBSCRIBE_TRACKS as a split feature previously part of SUBSCRIBE_NAMESPACE, ability to REQUEST_UPDATE both SUBSCRIBE_NAMESPACE and SUBSCRIBE_TRACKS, a new redirect structure that can be returned via REQUEST_ERROR, new error codes, etc. The demos have been updated to try and test new functionality too, but of course it will be interop that'll tell us if the changes implemented here are correct or not."*

Lorenzo also merged **PR #26** at 14:06:55 UTC (*"Refactored RoQ client/server demos to more generic sender/receiver demos"*, +unknown LOC) — not MoQ-relevant but shows meetecho/imquic `main` is no longer parked.

**Net: imquic transitions from "moq-18 branch unmerged" (May 19) to "draft-18 on main" (May 20).** The interop-runner gating Lorenzo flagged on May 19 (*"Let me know when you're ready to go and I'll merge the v18 branch"*) appears to have moved unilaterally — imquic is no longer waiting on PR #68. **lminiero.it:9000 POC relay** is presumably now running `main` instead of branch builds. **6-day draft-18 turnaround for imquic** (May 12 → May 20 main-merge) — close to but not matching [[moq-dev]]'s 6-day-to-PR-merge cycle (PR #1418 May 18).

## mondain/moqxr — 6 more commits May 20 (14-commit total May 19-20 sprint)

Paul Gregoire continued the post-Lorenzo-interop fix-up sprint through May 20:

| UTC | SHA | Subject |
|---|---|---|
| May 20 13:15 | `617a582` | Add localized publisher API docs |
| May 20 13:31 | `cf0b22b` | Restructure README and add localized versions |
| May 20 13:32 | `0d7c082` | Add MOQT draft transport specs |
| May 20 14:25 | `7779575` | Fix WebTransport protocol offer formatting |
| May 20 14:31 | `95b912d` | Document WebTransport protocol offer formatting |

**14-commit running total** May 19 14:17 UTC → May 20 14:31 UTC (8 May 19 + 6 May 20). The May 20 commits shift from **wire-protocol fixes** to **documentation + localization** (4 of 6 are docs/i18n), suggesting Paul Gregoire considers the wire-protocol gap structurally closed and is now hardening developer onboarding. **No new Lorenzo Miniero responses** in the Slack thread after May 19 13:21 UTC ack, so the bilateral interop session has not been re-attempted post-fix.

## cloudflare/moq-rs — breaks 38-day main-quiet streak ([PR #121](https://github.com/cloudflare/moq-rs/pull/121) MERGED, [PR #168](https://github.com/cloudflare/moq-rs/pull/168) release v0.7.18)

**End of 37-day main-quiet** (prior last-merge Apr 13 carry-forward). May 20 16:34–16:45 UTC, [[mike-english]] merged 2 PRs in 11 minutes:

- [**PR #121**](https://github.com/cloudflare/moq-rs/pull/121) *"refactor: simplified remote manager"* by **itzmanish (Manish)** (+762/−647) — **OPEN since Dec 18 2025** (155 days), finally merged. Long-stale community refactor of the remote-manager subsystem.
- [**PR #168**](https://github.com/cloudflare/moq-rs/pull/168) release-plz auto-cut **moq-transport 0.14.1 → 0.14.2, moq-relay-ietf 0.7.17 → 0.7.18, moq-pub 0.8.13 → 0.8.14, moq-sub 0.4.7 → 0.4.8** (+57/−12).

The release-plz changelog cites **actual bug fixes** in `moq-transport` 0.14.2 + `moq-sub` 0.4.8: *"subscribe cleaning on drop"* — non-trivial cleanup-path fix. Plus *"tokio utils use default features"* in `moq-relay-ietf` 0.7.18 + *"check for cancelled of cancellation token when waiting for subscribe open"*. **The PR #121 refactor + release pair is the first real engineering signal from cloudflare/moq-rs since the Suhas Nandakumar filter-framework [PR #167](https://github.com/cloudflare/moq-rs/pull/167) opened May 11** (still **OPEN Day +9**, untouched). PR #131 (Manish's draft-16 work) **still OPEN** as the underlying draft-16 baseline.

**Carry-forward**: cloudflare/moq-rs's Day +37 silence had become a structural concern given the parallel [[moq-dev|moq-dev/moq]] velocity (8 PRs/day during the May 18 burst). The May 20 merge unblocks a 5-month-stale refactor that probably should have been merged earlier but was waiting on review bandwidth. **Mike English's [[interop-runner]] focus + London hackathon logistics + draft-18 register-bump work** appear to have been the bottleneck; the PR #121 merge happening within 4 hours of [[interop-runner]] PR #69 work suggests Mike batched maintenance tasks. The cloudflare/moq-rs draft-18 bump remains **not staged** — no PR to update beyond the draft-14 `main` / draft-16 PR #131 split.

## google/quiche moqt — 1 more commit (publisher refactor cleanup continues)

`083b83b39` May 20 22:36 UTC by [[martin-duke|martinduke]]: *"Remove unnecessary tests from MoqtSessionTest. Putting the logic in OutgoingSubgroupStreamTest and SubscriptionPublisherTest is more compact and cleaner conceptually."* — **third commit in the publisher-class-hierarchy refactor sequence** that began May 18 (`6460010e` Factor PublishedSubscription out → May 19 `a3f18c9` asan fix → May 20 `083b83b3` test-cleanup consolidation). Martin Duke is **rebuilding the moqt publisher path** in 3 days of small commits during the same window AWS is rebuilding its CMSF pipeline. Both are working out of internal review and not yet in interop-target shape.

## moq-transport — quiet day (no new issues / PRs / comments)

No new issues opened beyond the May 19 #1633/#1634/#1635 tranche. **[Issue #1633](https://github.com/moq-wg/moq-transport/issues/1633) comment-debate dormant** since the May 19 afrind/Swett same-day exchange. **PR #1378 SWITCH still updated_at May 15**. The AWS-side spec contributions (PR #157 in moq-wg/msf) also quiet Day +4.

## Mailing list — London Agenda **oversubscription crosses ~10 hours**; Mo Zanaty files 135-min filter block; Joining FETCH Survey 4 more responses

### London Agenda thread — Cullen re-files both rejected requests; Martin Duke implicitly declines May 26 extension; Mo Zanaty files 135 min anyway

**4 messages on May 20 + 1 on May 21**:

| UTC | Sender | Subject | Content | Action |
|---|---|---|---|---|
| May 20 ~16:00 | [**Cullen Fluffy Jennings**](https://mailarchive.ietf.org/arch/msg/moq/owPxzZ0M8GtnQMIlWrQWsMsnbn4/) | London Agenda requests - **Secure Object** | 10 min slides + 10 min discussion = **20 min**. *"updates to Secure Object and implementations updates"* | Re-files compliantly |
| May 20 ~16:30 | [**Cullen Fluffy Jennings**](https://mailarchive.ietf.org/arch/msg/moq/mLsvjUdAJ-VYkoXDId4xLX6TaWE/) | London Agenda requests - **track filter DDOS** | 10 min slides + 20 min discussion = **30 min**. *"DDOS problems with track filter with top N"* — *"major area of concerns in making a decision"*, offers to consolidate other presenters' decks. | **NEW agenda item** (sub-issues #1518 Top-N) |
| May 20 ~17:00 | [**Ali C. Begen**](https://mailarchive.ietf.org/arch/msg/moq/gpRerwUVVyNhmslXgG6-D_EfbNw/) | London Agenda requests | Reply (content unknown — not requesting time) | participatory |
| May 20 ~18:30 | [**Martin Duke**](https://mailarchive.ietf.org/arch/msg/moq/yLFMnVngcN7vq5JvZerbHCVoQN8/) | London Agenda requests | *"Hi Mo, I haven't been able to connect with Magnus on this, but we are supposed to release in-person agendas a little earlier than others. I would suggest proactively submitting requests (remember to separate presentation and discussion time) and you can cancel later if needed."* | **Implicitly declines** Mo Zanaty's May 19 May-26 deadline-extension ask |
| May 21 ~08:30 | [**Mo Zanaty**](https://mailarchive.ietf.org/arch/msg/moq/EbuKL1V2DUF8LggkielDbzniuks/) | London Agenda requests | **Files anyway with "likely change after May 26" caveat**: <br>• Object Range Filters (PR#1518) issues: 15+15=**30 min**<br>• Track Property Filters (PR#1518) clarifications: 5+10=**15 min**<br>• Top N Track Filters (PR#1518) issues: 15+30=**45 min**<br>• Subscription Location Filters (PR#1401) re-proposal: 15+15=**30 min**<br>• LOC update and issues: 5+10=**15 min**<br>**Total: 135 min** | NEW — single largest non-afrind block |

**Updated London Agenda inbox at May 21 06:00 UTC**:

| Sender | Block | Total |
|---|---|---|
| [[alan-frindell\|afrind]] | 37 non-editorial MOQT issues | **~240 min (4h)** |
| **[[mo-zanaty\|Mo Zanaty]]** | 5 filter-related items (Range, Property, Top-N, Subscription Location, LOC) | **135 min** |
| [[will-law\|Will Law]] | MSF/CMSF tech decisions + DTS | 105 min |
| [[suhas-nandakumar\|Suhas]] | Top-N + Privacy Pass | 55 min |
| Cullen Fluffy Jennings | track filter DDOS (new) | 30 min |
| Cullen Fluffy Jennings | Secure Object (re-filed) | 20 min |
| **Grand total** | | **~585 min ≈ 9h45m** |

**vs ~8 hours of formal-session capacity** = **~22% oversubscribed** at the deadline.

**Net carry-forward**:

- **Mo Zanaty / Cullen / afrind combined own ~7 hours of the 9h45m ask** (Mo + Cullen 50min + afrind 240min = 410min vs 585min total). The filter-design thread (PR #1518 + PR #1401 + #1633) is now structurally **the top London priority by allocated time** — Mo Zanaty alone reserves 135 min for filter clarifications + corrections + re-proposals.
- **Martin Duke's implicit-decline-with-pragmatic-workaround pattern**: instead of granting the May 26 extension, he tells Mo to *"proactively submit and cancel later"*. This is a **chair-pragmatic compromise** that preserves the May 20 deadline-as-policy while accommodating Mo's "I don't know yet what's important" concern.
- **Cullen's track-filter-DDOS request is the first agenda item explicitly framed as an aggregation/consolidation slot** (*"happy to consolidate everyone's concerns into one deck"*) — a chair-friendly format that may set precedent for compressing the broader filter-design block.

### Joining FETCH Survey — 4 more responses

- [**Ali C. Begen May 20**](https://mailarchive.ietf.org/arch/msg/moq/xesQxWhxnTkbS2jyVNmJHcDA-U8/), [**Zafer Gurel May 20**](https://mailarchive.ietf.org/arch/msg/moq/MNGvn0rYE5dE5rI06kMA7mGv0Fc/), [**Victor Vasiliev May 21**](https://mailarchive.ietf.org/arch/msg/moq/99Dcw9gpnVONG9jN9L6OQqIO8Sk/), [**Mo Zanaty May 21**](https://mailarchive.ietf.org/arch/msg/moq/xKvUQ6-ydDdkDc9ey3hj66mSuz4/) — 4 more responses to the Joining FETCH Survey. **Victor Vasiliev's first reply on the survey** is structurally significant (he's been the quietest of the 5 main draft-18 editors on this thread). Detailed survey responses pending in next update.

### NEW THREAD: "User case or question to Joining Fetch"

[**Zafer Gurel May 20**](https://mailarchive.ietf.org/arch/msg/moq/pp0FIUuJapQ9uvHDq62oVvAC7ss/): Despite the thread title, **the actual content is about [[moqtail]] relay cache collisions when multiple publishers send to the same track with identical group IDs**. Verbatim summary from message body:

> *"The collision problem I mentioned is more about the cache implementation of MOQtail relay. The cache key is (relay track id (maps to NS + N), group id). And each cache entity is a vector of objects."*

Zafer's proposed workaround: **use randomized base group IDs per participant rather than wall-clock-milliseconds**, which deviates from the MOQT monotonically-increasing-group-ID norm. He explicitly recognizes that Will Law's suggestion (use different Object IDs) is the spec-correct path but would require revisiting MOQtail's cache logic.

**Net**: structurally **same bug class as the May 16 AWS PR #1413 "non-sequential groups"** — a publisher-side workaround for upstream-coalescing-then-deduplication concerns, except this time the workaround is **randomize-to-avoid-collision** rather than **gap-tolerate-on-consume**. The cache key `(track id, group id)` design choice is a [[moqtail]]-specific implementation detail not present in [[moq-dev]]'s `(broadcast, track, group, subgroup)` 4-tuple cache key, and exposes a class of MOQtail-only bugs around multi-publisher tracks.

## [[interop-runner]] — May 21 report 168/46/121 (+8 pass) — 3-day cadence holding

[**New report 2026-05-21 00:45:51 UTC**](https://englishm.github.io/moq-interop-runner/results/2026-05-21_004551/report.html): **168 total / 46 pass / 121 fail / 1 skip**. **+8 pass-count vs May 20** (38 → 46), pass rate **27.4%** (vs 22.6% May 20, **+4.8pp**). **3 consecutive days of daily cadence** (May 19 / May 20 / May 21). Matrix at **13 implementation identifiers** (aiomoqt, moq-dev-js, moq-dev-rs, moq-rs, moq-rs-draft-16, moqlivemock, moqx, moxygen, xquic, imquic, libquicr, quiche-moq, **moqtail**) — moqtail visible in this report's matrix, was not enumerated in prior wiki summary at 12. **Target still draft-16** ([PR #68](https://github.com/englishm/moq-interop-runner/pull/68) still OPEN). The pass-rate climb 18.1% → 20.8% → 22.6% → 27.4% over 4 reports (May 13/19/20/21) shows the *"low-hanging fruit"* Mike English flagged is being addressed implementation-side, even without matrix expansion or target bump.

# Activity (May 19 06:00 UTC → May 20 06:00 UTC) — **mondain/moqxr ships 8 draft-18 compliance fixes in 10 hours after Lorenzo Miniero finds a bidi-vs-uni SETUP-stream regression; afrind opens 3 formal draft-18 issues (#1633 concurrent subs / #1634 FIN-RST semantics / #1635 FIN-as-PUBLISH_DONE) closing the May 18 SVC-thread procedural-gap loop; London Agenda inbox fills with 6 requests by May 19 (Suhas Top-N + Privacy Pass, Will Law revised MSF/CMSF + DTS, Cullen Secure Object 20min, Mo Zanaty deadline-extension-to-May-26 ask, afrind enormous "37-non-editorial-issues" 4+ hour ask); interop runner 168/38/129 May 20 +3-pass vs May 19, still draft-16 target; Mike English social-resolution with Giovanni Marzot on the Apr 25 suspicious-AI-PR incident**

## Slack `#moq` — moqxr ↔ imquic first-cross-impl draft-18 interop attempt

[**Thread parent: Paul Gregoire May 18 18:44 UTC (carry-over from prior entry)**](https://quicdev.slack.com/archives/C046V0QF3CK/p1779129867088989): *"@Lorenzo Miniero I've got moqxr updated to 18; github.com/mondain/moqxr."* + Lorenzo Miniero May 18 18:52 UTC: *"Thanks, I'll give it a try tomorrow!"*

Lorenzo opened the thread the next morning with **5 sequential diagnostic messages May 19 09:12 → 09:55 UTC**:

| UTC | Sender | Finding |
|---|---|---|
| 09:12 | Lorenzo | *"error: transport connect failed... my relay never sees the connection appearing. With debugging enabled I see `[picoquic-client] connect start ... alpn=moq-00` which I think is incorrect? I don't accept moq-00 anymore"* |
| 09:14 | Lorenzo | *"Yeah, using Wireshark I only see `moq-00` being offered as a QUIC ALPN, and in fact I can see the `TLS Alert Description: No application Protocol (120)` my relay sends back"* |
| 09:17 | Lorenzo | *"Even using https as an url I only see `moq-00` being offered, no `h3`: is WebTransport actually supported?"* |
| 09:19 | Lorenzo | *"Nevermind that, I found `--draft XX` 🙈"* (defaulting to draft-14 surfaced as user-error) |
| 09:55 | Lorenzo | *"Even with `--draft-18` your client is trying to use a bidirectional stream (0) for exchanging SETUP messages, while it should be two unidirectional streams instead"* |

[**Paul Gregoire May 19 13:21 UTC**](https://quicdev.slack.com/archives/C046V0QF3CK/p1779196872310729): *"Yes, lots of options on this, draft-14 is the default if --draft isn't specified. I placed more of my focus on raw moqt, so you may have probably found a bug. Thank you for testing it out and finding this!"*

**Paul's response on the wire was 8 commits in 10 hours** to [mondain/moqxr](https://github.com/mondain/moqxr):

| UTC | SHA | Subject |
|---|---|---|
| May 19 14:17 | `53ee899` | Align draft-18 WebTransport stream handling |
| May 19 15:00 | `40ee48c` | Fix MoQT control compliance gaps |
| May 19 16:11 | `c426d2d` | Fix MoQT publish framing and metadata |
| May 19 17:08 | `96baf5a` | Fix draft 17 and 18 MoQT wire semantics |
| May 19 17:34 | `7bebe08` | Fix MoQT pass 3 compliance gaps |
| May 19 21:41 | `f73427a` | Fix WebTransport protocol offers |
| May 19 22:06 | `1f222b0` | Fix draft-18 setup option delta encoding |
| May 20 00:11 | `d759426` | Fix draft 18 request stream polling |

This is the **first cross-implementation hands-on draft-18 interop attempt the wiki has tracked** (moqxr ↔ imquic). The bidi-vs-uni SETUP-stream divergence is structurally identical to draft-17's *"two-control-stream-direction"* requirement and indicates moqxr's draft-17 → draft-18 transition still has draft-14-shape residue in the WebTransport bring-up path.

### Mike English ↔ Giovanni Marzot — May 18 23:17 UTC apology thread

[**Mike English `#moq-interop-runner` May 18 23:17 UTC (21:17)**](https://quicdev.slack.com/archives/C0B2KQLJGN7/p1779139025174659): *"Closing the loop here: I had a really good call with @Giovanni Marzot last week and apologized for my overreaction to the suspicious-looking PR. It turns out it really was just Claude being overzealous about tackling a slightly under-specified prompt where the intent was just to fix some artifact links to make the repo able to run CI jobs on its own to support testing and fixing some CI issues. I'm glad we were able to sort things out and I'm grateful for Giovanni's taking initiative to improve things and I'm looking forward to working together more on improving the interop runner with some of his ideas and suggestions."*

[**Lorenzo Miniero May 19 07:52 UTC**](https://quicdev.slack.com/archives/C0B2KQLJGN7/p1779177150479799): *"One more reason for me to stay away from AI as long as I can 😂"*

This formally closes the **Apr 25 *"suspicious-AI-PR"* incident** thread where [[mike-english]] had earlier flagged a moq-interop-runner PR from [[giovanni-marzot]] as looking adversarially shaped (artifact-link manipulation pattern), but on inspection the surface was an LLM under-spec going overzealous on a CI-fix prompt. The carry-forward: the `#moq-interop-runner` channel now has an **explicit on-record norm** that LLM-shaped PRs need careful but not paranoid review, and Mike's *"working together more on improving the interop runner with some of his ideas"* signals Giovanni Marzot ([[openmoq]]) is back in the contributor loop.

### LOCMAF thread carry-forward (May 18 STS slot offer)

The May 18 LOCMAF thread (8 replies) included **Will Law's STS-Sweden talk offer** at 14:46 UTC: *"@Tobbe — I am giving a MSF talk at STS on Thursday. Can I mention locmaf there, or are you already presenting?"* and the prior reply *"You should publish an internet draft and then we can add `packaging = "locmaf"` support to CMSF."* [[tobbe-einarsson|Tobbe]] accepted both at 15:51 / 15:55 UTC: *"I'm not talking at Streaming Tech Sweden, so both Hugo and me think it would be great if you bring it up"* + Mike English's parallel suggestion about MPEG followed with *"I'm not sure this is general enough for MPEG... I'll post something on LinkedIn to reach a bigger audience."* **Net**: LOCMAF gains a second public-conference vehicle (Will Law's STS talk on Thursday May 21) and the *"publish an Internet-Draft"* prescription now has the **MSF/CMSF editor's explicit endorsement** beyond Gwendal Simon's earlier *"expand CMSF"* framing.

## moq-wg/moq-transport — 3 formal draft-18 issues opened by afrind on May 19

[[alan-frindell|afrind]] filed three issues May 19 16:33 → 18:37 UTC that **operationalise the May 18 SVC thread procedural gap** Luke Curley surfaced (*"isn't it illegal to SUBSCRIBE to the same track twice?"*) and add two FIN/RST-semantics questions on the new draft-18 control-stream model:

### [Issue #1633](https://github.com/moq-wg/moq-transport/issues/1633) — *"Should we allow more than one concurrent subscription per Track"*

OPEN, opened by [[alan-frindell|afrind]] May 19 16:33 UTC. The body lifts text from the Editors' slides shown at IETF 125, including a **4-proposal slate** with an explicit Editors' Recommendation:

| Proposal | Shape |
|---|---|
| **1a** ⭐ **(Editors' rec)** | Allow multiple subscriptions, each with unique Track Alias; **no deduplication**. Subscriber/relay is responsible for minimizing overlaps/duplication. |
| 1b | Allow multiple subscriptions, **all get the same Track Alias**; publisher coalesces these as a single subscription with union of filters. *"Conflicting parameters ¯\\_(ツ)_/¯"* |
| 2 | Keep single subscription per track. Allow unions of all filter types in control messages. Can't specify conflicting parameters. |
| 3 | Status Quo (illegal) |

**Same-day comments**:
- [[ian-swett|Ian Swett]] May 19 17:08 UTC: *"Thanks for filing an issue, I was about to. @martinduke was discussing this with me today and liked 1b better. Can you remind me what the issue is with conflicting parameters in 1b?"*
- afrind May 19 17:31 UTC: *"I can subscribe to the same track with overlapping filters and different DELIVERY_TIMEOUT, PRIORITY, GROUP_ORDER, AUTH, etc. If the publisher is deduplicating by using a single track alias, it's unclear how to apply these."* — concrete refutation of 1b's per-stream-properties coalescing.

The issue **explicitly cites the existing [PR #1451](https://github.com/moq-wg/moq-transport/pull/1451)** ("Allow multiple Subscriptions to a Track") as the long-parked precursor that *"the editors have had slides on the topic since IETF 125, but we've never had enough agenda time to discuss."* The London interim is now the **forcing-function venue** for resolving this.

### [Issue #1634](https://github.com/moq-wg/moq-transport/issues/1634) — *"[draft-18] What semantics do FIN or RST on a request stream carry?"*

OPEN, opened by afrind May 19 18:34 UTC. Body quotes draft-18 §4.5 (*"The subscriber terminates a subscription in the Pending (Subscriber) or Established states by sending STOP_SENDING"*) + §3.6 (*"Implementations SHOULD cancel requests by abruptly terminating any directions of a stream that are still open by resetting or sending STOP_SENDING"*) and asks: *"What action should a receiver take, if any, when receiving only a FIN, or only a RST_STREAM, but no STOP_SENDING?"*

afrind May 19 21:45 UTC self-comment: *"I'm inclined to say FIN almost always isn't a cancellation from the sender of the request. For TRACK_STATUS an early FIN is perfectly normal — there's never anything else to say. For requests like FETCH, PUB_NS, SUB_NS, SUB_T and SUBSCRIBE, an early FIN can mean 'I don't plan to REQUEST_UPDATE'..."*

### [Issue #1635](https://github.com/moq-wg/moq-transport/issues/1635) — *"[draft-18] Should a subscriber treat FIN/RST on a bidi stream as equivalent to PUBLISH_DONE?"*

OPEN, opened by afrind May 19 18:37 UTC. Body: *"PUBLISH_DONE conveys error information as well as stream count. Seems like FIN without PUBLISH_DONE is entirely avoidable and could be a PROTOCOL_VIOLATION?"*

**Combined carry-forward**: #1634 and #1635 are sibling issues exploring the **same control-stream-lifecycle question** from publisher- and subscriber-side respectively. They're the first post-publication semantic-gap issues filed against draft-18 (the prior 6 days were almost entirely implementation/wire-format issues like the #1632 LOC-02 Properties Type collision). #1633 is materially different: it lifts a long-parked WG-process item (PR #1451 has been open since April 13) into the London-interim-blocker queue with concrete decision-shaped proposals.

## Mailing list — London Agenda inbox fills with 6 distinct requests May 18-19

The May 18 Martin-Duke-chair-prod (*"two days out and have received zero requests for agenda time"*) → May 19 produced **6 distinct agenda requests** to the moq-chairs inbox. Listed in mailing-list-order on May 19:

| Time UTC | Sender | Request | Status |
|---|---|---|---|
| May 19 ~13:40 | Cullen Fluffy Jennings | *"20 min to talk about updates to Secure Object and implementations updates"* | **Rejected by Martin Duke** — *"The original solicitation included specific instructions to separate out presentation and discussion time. Please follow those instructions for your requests to be considered."* ([archive](https://mailarchive.ietf.org/arch/msg/moq/HfvNHwQGeUU6icZ03QCCi6llZfI/)) |
| May 19 13:40 | Will Law | (initial request, presumed similar shape) | **Rejected by Martin Duke** ([archive](https://mailarchive.ietf.org/arch/msg/moq/2Vw05JdiSVWPWyRchKofYqCmBw8/)) — *"Will, please re-read the original solicitation and follow it in order to be considered."* |
| May 19 14:28 | Suhas Nandakumar | **Top-N Track Filter Implementation Experiences** (15 min present + 20 min discuss = **35 min**) + **Privacy Pass Implementation/Demo** (10+10 = **20 min**). Format-compliant. ([archive](https://mailarchive.ietf.org/arch/msg/moq/KPUj0vVm9NVCu91zngRmOadN9iI/)) | Accepted by format |
| May 19 15:56 | [[alan-frindell|Alan Frindell]] | **MOQT draft-18 issues** — *"37 open non-editorial issues"*: Joining FETCH Dissent (4 issues, 20+40 = 60min, pending survey), Filter-related (3, ~consensus call time), ABR/SWITCH (4, ~1 hour placeholder Monday slot), **#1519 request blocking** (30+30 = 60min), **#1633 concurrent subscriptions** (10+20 = 30min, **filed same day**), remaining 22 (1-2 hours distributed). ([archive](https://mailarchive.ietf.org/arch/msg/moq/-3Fk9OWQR_ME33neQTzhUPMeKdI/)) | **Single largest ask** — collectively requesting ~4+ hours |
| May 19 ~17:00 | Will Law (revised) | **MSF/CMSF tech decisions** (20+40 = 60min) + **DTS** (15+30 = 45min, *"unless it gets resolved May 26th"*). Format-compliant. ([archive](https://mailarchive.ietf.org/arch/msg/moq/pvq02mvPo0gpdPCdd0SVWXooFs0/)) | Accepted by format |
| May 19 20:04 | Mo Zanaty | **Asks for deadline extension** May 20 → May 26 due to *"multiple outstanding consensus calls and virtual interim topics"* that will affect what should be included. ([archive](https://mailarchive.ietf.org/arch/msg/moq/1WRfzo5eJwmUWNU-bg-sH2eEHX0/)) | Procedural — Martin not yet responded at window close |

**Net inbox at May 20 06:00 UTC** (deadline T-0): **~6+ hours of agenda time requested** against **~10 hours of formal-session time across June 11-12** (2-session × 4 slots ≈ 8 hours core + breaks). Already over-subscribed before late requests, and Mo Zanaty's deadline-extension question is procedurally live. The MOQT draft-18 issues block alone (afrind) is structurally equivalent to one full day of agenda; the WG will need to either compress per-issue time or defer issues to follow-up interims.

**Carry-forward**: the rate of London agenda requests doubled in 24 hours (May 18: zero → May 19: six), validating Martin's chair-prod. The format-strict rejections of Cullen + Will Law's initial requests establish a **precedent for procedural rigor** that may bear on the May 26 IETF 126 agenda-submission window also.

## Joining FETCH Survey thread (afrind, May 11 → May 19 active)

Alan Frindell's May 11 survey thread on Joining FETCH had a **second-round response wave May 19** as the deadline approached. Notable messages:

- [**Cullen Fluffy Jennings May 19 16:44 UTC**](https://mailarchive.ietf.org/arch/msg/moq/5a7khMTyQhrOt_uktnXjgIaUpec/) replying to Q4.1 (*"Past data must be flow controlled in all cases"*) + Q4.2 (*"Past data must be flow controlled only if before the current group"*): *"I don't understand these."* — first respondent to explicitly flag the survey wording as ambiguous on flow control.
- [**Suhas Nandakumar May 19 16:29 UTC**](https://mailarchive.ietf.org/arch/msg/moq/F5ZBuxW2uJ180lFHN5qkplqof2E/) gives inline answers to Q1-4 with qualifications: *"end applications (players) will pick the right choice based on GOP duration"* + requests clarification on *"what 'performance' means"* and *"what constitutes 'small fixes needed'"* and *"depends on the change being proposed"*. Doesn't complete Q5 (acceptable delay for WGLC).
- [**afrind May 19 17:04 UTC**](https://mailarchive.ietf.org/arch/msg/moq/MDqazhCDZ232G3KQkB0zo_NKlqs/) replies to Suhas clarifying *"small fixes needed = whatever is required to resolve outstanding issues without changing the overall shape of the solution"* and disambiguating *"MAY replace"* vs *"MUST"*.

**Carry-forward**: the survey is structurally drifting toward a **dissent-shaped outcome** — respondents' confusion on Q4 flow-control wording and the proliferation of *"depends on..."* answers suggest the result will be hard to consensus-call cleanly. afrind's London agenda block reserves 60 minutes specifically for *"Joining FETCH Dissent (4 issues, pending survey results)"*.

## Implementation activity carry-forward

- **moq-dev/moq**: PR #1428 *"rename moq-lite package to moq-net"* still **OPEN** Day +2 (last touch May 18 22:04 UTC, no merge yet). Other PRs untouched. No new opens.
- **google/quiche moqt**: **1 new commit May 19 17:41 UTC** `a3f18c9` by martinduke (*"Fix asan error in moqt_session_test"*) — follow-up to the May 18 `6460010e` PublishedSubscription refactor.
- **mondain/moqxr**: 8 fix-up commits (see above table) — by far the highest commit volume on a single repo in the window.
- **Eyevinn/warp-player**: 3 dependabot PRs still **OPEN** Day +1 (#130/#131/#132).
- **Eyevinn/moqlivemock**: Quiet (last release v0.9.0 May 17).
- **moqtail/moqtail**: Day +7 quiet since `dbd7085` May 13 08:44 UTC.
- **cloudflare/moq-rs**: Day +37 main-quiet.
- **meetecho/imquic**: `moq-18` branch exists but unmerged to main (Lorenzo May 19 15:40 UTC in Mike's PR #68 thread: *"Let me know when you're ready to go and I'll merge the v18 branch in imquic, I finished the bulk of the work and the rest can wait"*). `main` last touched Apr 16.

## [[interop-runner]] — May 20 report 168/38/129 (+3 pass)

[**New report 2026-05-20 00:46:03 UTC**](https://englishm.github.io/moq-interop-runner/results/2026-05-20_004603/report.html): **168 total / 38 pass / 129 fail / 1 skip**. **+3 pass-count vs May 19** (35 → 38), pass rate **22.6%** (vs 20.8% May 19). Matrix unchanged at 12 implementations; **target still draft-16** ([PR #68](https://github.com/englishm/moq-interop-runner/pull/68) still OPEN). Daily cadence is now restored (May 19 + May 20 reports = 2 consecutive days post-CI-timeout fix). Mike English window-internal Slack activity: working through PR #68 CI issues, no merge yet.

# Activity (May 18 06:00 UTC → May 19 06:00 UTC) — **interop runner cadence resumes (105 → 168 tests, 12-impl matrix); 3 additional implementations announce draft-18 support (imquic / moqxr / moq.dev anon CDN); kixelated reframes moq-lite library as moq-net (separating library identity from wire-protocol identity); AWS PR #1413 CLOSED unmerged after kixelated rejects transport-layer encoder-failover stitching; London Agenda: Martin Duke chair prod + Will Law files first concrete request (MSF/CMSF 60min + DTS 30min)**

## Interop runner — 5-day silence broken; matrix expanded to 168 tests / 12 implementations (35 / 132)

[**Mike English May 18 23:19 CEST (21:19 UTC) `#moq-interop-runner`**](https://app.slack.com/client/T046V0QF374/C0B2KQLJGN7): *"I merged a number of new implementations last week also, and it looks like now the combinatorial explosion of test runs might be causing the test run and report generation task to time out. Investigating now to see if maybe something is just hanging or if we're really running tests for 6+ hours now."* — **diagnoses the May 14-18 cadence gap** as a CI-timeout issue triggered by the May 13 4-PR matrix-expansion merge (105 tests → 168).

[**PR #69 MERGED**](https://github.com/englishm/moq-interop-runner/pull/69) May 19 **01:35 UTC** by englishm-cloudflare, *"Add per-test timeout to prevent hanging tests from blocking CI"* (+1/−1) — the structural fix.

[**New report published May 19 01:36:37 UTC**](https://englishm.github.io/moq-interop-runner/results/2026-05-19_013637/report.html):

| | **May 19 01:36 UTC** | **May 13 00:41 UTC** | Δ |
|---|---|---|---|
| Total | **168** | 105 | **+63** (+60%) |
| Pass | **35** | 19 | **+16** |
| Fail | **132** | 72 | **+60** |
| Skip / other | 1 | 14 | -13 |
| Pass rate | **20.8%** | 18.1% | +2.7pp |
| Target draft | **draft-16** | draft-14 | +2 |
| Implementations | **12** | 11 | +1 |

[**Mike English May 19 04:21 CEST (02:21 UTC)**](https://app.slack.com/client/T046V0QF374/C0B2KQLJGN7): *"OK, added some timeouts for test runs that were just hanging and now we have a new report. Probably a lot of low hanging fruit to get some of these to green."* — frames the 20.8% pass rate as **early-baseline territory rather than regression**: new impls (mlmtest, aiomoqt, moqx-client, Nokia-via-Docker) were merged May 13 with no prior validation runs, so this is the first end-to-end pass for any of them.

**Implementation list** (12 distinct identifiers in the matrix): aiomoqt, imquic, libquicr, moq-dev-js, moq-dev-rs, moq-rs, moq-rs-draft-16, moqlivemock, moqx, moxygen, quiche-moq, xquic. **Note the `moq-rs` / `moq-rs-draft-16` split** — the matrix now treats the cloudflare/moq-rs draft-14 and draft-16 baselines as separate implementations, formalising the *"multiple-version-of-same-impl"* pattern. **No mlmtest** as a distinct identifier — Eyevinn's moqlivemock is the catalogued name (matches the May 13 PR #65 merge). **moxygen** (Meta) reappears — last in the matrix in fall 2025.

**Target draft jumped May 13 → May 19**: draft-14 → draft-16 (+2 revisions). [**PR #68 (Update interop target to draft-18)**](https://github.com/englishm/moq-interop-runner/pull/68) was OPENED May 18 21:01 UTC by englishm-cloudflare but **remains OPEN** at the report time — so draft-18 is staged but not yet the matrix target. The first matrix run hitting draft-18 (if PR #68 merges) is the next structural watermark.

[**Mike English May 18 23:20 CEST**](https://app.slack.com/client/T046V0QF374/C046V0QF3CK) `#moq`: *"Working through some CI issues, and then I'll be bumping the interop target in the automated interop test runner to draft-18, too."*

**Headline carry-forward**:

- **[[interop-runner]] is back from "unreliable" status** — daily cadence has resumed with the timeout fix in place, but the **new failure-mode is now CI-budget rather than test-flakiness**: at 168 tests with potential 6+ hour runtimes, any further matrix expansion (e.g. adding moqxr) compounds the wall-clock cost. Mike English flagged this; expect a follow-up batch of skip/timeout policy work pre-London.
- **The matrix is still one draft revision behind moq-dev/moq** (target draft-16 vs moq-dev shipped draft-18 May 18) — same gap as flagged in the May 18 wiki entry, partially mitigated by PR #68 being staged.
- **moqxr is conspicuously absent** despite Paul Gregoire's May 18 announcement and his draft-18 commits — likely the next implementation to be added to the matrix, but no PR yet to register it.

## moq-dev/moq — `moq-lite` library renamed to `moq-net` ([PR #1428](https://github.com/moq-dev/moq/pull/1428))

[**PR #1428**](https://github.com/moq-dev/moq/pull/1428) OPENED May 18 **21:31 UTC** by [[luke-curley|kixelated]] (+1230/−939, **OPEN** at window close), *"rename moq-lite package to moq-net"*. Body verbatim:

> *"The old name caused confusion because `moq-lite` is also the name of one of the wire protocols this library speaks. The new name reflects that this is the networking layer; at session setup it negotiates either the moq-lite or moq-transport wire protocol."*

**Package renames** (across all 3 language bindings):

| Stack | Old | New | Shim policy |
|---|---|---|---|
| Rust | `rs/moq-lite` | **`rs/moq-net` v0.1.0** | `rs/moq-lite` kept as re-export shim, **no further updates** |
| JS | `js/lite` (`@moq/lite`) | **`js/net` (`@moq/net`) v0.1.0** | `@moq/lite` kept as shim with runtime warning + JSDoc `@deprecated` |
| Python | `py/moq-lite` | **`py/moq-net` v0.1.0** | `py/moq-lite` kept as shim emitting `DeprecationWarning` on import |

**Protocol-level identifiers UNCHANGED**: ALPNs `moq-lite-04`, the internal `lite/` submodule that implements the moq-lite wire protocol, spec URLs. **All in-tree consumers** (`hang`, `moq-mux`, `moq-native`, `moq-relay`, `moq-ffi`, `libmoq`, `moq-cli`, `moq-clock`, `moq-boy`, `moq-gst`, `@moq/hang`, `@moq/watch`, `@moq/publish`, etc.) now depend on `moq-net` / `@moq/net`.

**Headline carry-forward**:

- **First explicit structural admission that the moq-lite library is a dual-protocol implementation**. Until PR #1428, the library name *"moq-lite"* was overloaded — referring both to (1) the wire protocol [[moq-lite|draft-lcurley-moq-lite]] and (2) the moq-dev/moq library implementing it. With moq-dev/moq now shipping [[moq-transport|draft-ietf-moq-transport-18]] via PR #1418 (May 18 05:08 UTC), this naming ambiguity became actively misleading. The rename **separates library identity from wire-protocol identity** and positions `moq-net` as a *"protocol-agnostic networking layer"*. **The implication for the [[interop-runner]]** is that the matrix entries `moq-dev-rs` and `moq-dev-js` should arguably be relabeled as `moq-net-rs` / `moq-net-js` (or the matrix should distinguish *which* wire protocol each instance speaks, not just the library).
- **The shim policy is conservative but explicit-deprecation**: existing dependents won't break, but new code is steered to the new name. The `moq-lite` shim getting *"no further updates"* (Rust) / runtime-warning (JS) / `DeprecationWarning` (Python) is the same pattern Python ecosystems use for 6–12 month deprecations.
- **The release strategy is `0.1.0` for `moq-net`** — not `v1.0.0`, signaling the new package is starting from API-stable-but-not-frozen. This is consistent with the moq-lite history (`v0.16.4` is the last legacy version, which the May 18 release PR #1425 cuts).

## moq-dev/moq — 8-PR cluster May 18 06:00 UTC → 23:43 UTC (post-#1418 stabilisation)

Beyond the May 18 05:08 UTC headline [PR #1418](https://github.com/moq-dev/moq/pull/1418), **kixelated landed 7 additional PRs and opened the moq-net rename** in the same UTC day:

| PR | Status | UTC | Title | LOC | Note |
|----|--------|-----|-------|-----|------|
| [#1420](https://github.com/moq-dev/moq/pull/1420) | MERGED 06:19 | | moq-lite: enforce cluster loop detection on announce | +67/−18 | Closes ~120 MB/hr leak |
| [#1421](https://github.com/moq-dev/moq/pull/1421) | MERGED 06:19 | | fix: bump web-transport-iroh to 0.4 to unbreak cargo update | +477/−227 | Dep bump |
| [#1422](https://github.com/moq-dev/moq/pull/1422) | MERGED 08:08 | | chore: release | (release bot) | v0.16.3 |
| [#1423](https://github.com/moq-dev/moq/pull/1423) | MERGED 07:46 | | moq-lite: tolerate Ended for unknown paths | small | Crash hardening |
| [#1424](https://github.com/moq-dev/moq/pull/1424) | MERGED 08:07 | | chore: build and cache moq-boy on release tags | CI-only | |
| [#1425](https://github.com/moq-dev/moq/pull/1425) | **OPEN** 08:10 | | chore: release | +49/−31 | v0.16.4 (release-plz auto) |
| [#1426](https://github.com/moq-dev/moq/pull/1426) | MERGED 19:50 | | moq-lite: keep probe stream errors out of the session | +73/−53 | **Generated with Claude Code** |
| [#1427](https://github.com/moq-dev/moq/pull/1427) | MERGED 10:58 | | moq-lite: fix AnnounceInterest.exclude_hop overflow on JS side | small | **Direct fix for u53 overflow caught by PR #1420** |
| [#1428](https://github.com/moq-dev/moq/pull/1428) | **OPEN** 21:31 | | rename moq-lite package to moq-net | +1230/−939 | Major rename (see above) |

**PR #1426 design notes** (also Claude-co-authored): probe-stream errors (peer reset / FIN / missing `getStats` / transport hiccup) were tearing down the entire session on both ends. The fix **scopes failures to the probe stream itself** — Subscriber/Publisher run-probe paths catch all errors, decline gracefully when the browser has no `getStats`, and the Rust side gates the probe stream on `BandwidthConsumer` existence (so viewer-only sessions skip it entirely). The PR body explicitly notes *"the actual session-tear-down bug was an unrelated `u53` overflow in `AnnounceInterest.exclude_hop`"* — fixed in the same window by PR #1427. **The Claude-Code workflow is now visible on cleanup/resilience PRs as well as feature PRs.**

[**Luke Curley May 18 22:24 CEST (20:24 UTC) `#moq`**](https://app.slack.com/client/T046V0QF374/C046V0QF3CK): *"^ also I deployed hop-based routing (14 edge nodes), pls lemme know if something is not working."* — and **22:21 CEST (20:21 UTC)**: *"I think `cdn.moq.dev/anon` (and my clients) support draft-18 now, but it's untested."* **Two operational disclosures**: (1) cluster expanded from a "13-edge mesh" (May 18 morning PR #1420 body) to **14 edge nodes** later the same day; (2) **moq.dev's anonymous CDN now claims draft-18 wire support** ahead of any verified-interop result.

## moq-dev/moq — [PR #1413](https://github.com/moq-dev/moq/pull/1413) CLOSED unmerged after kixelated rejects transport-layer encoder-failover stitching

[**PR #1413**](https://github.com/moq-dev/moq/pull/1413) CLOSED May 18 **23:43 UTC** (unmerged, by ksletmoe-aws). Discussion ran May 16 00:50 UTC (open) → May 18 23:43 UTC (close), spanning 3 days and **5 substantive comments** between kixelated and ksletmoe-aws on the non-sequential-group-sequences design.

**The technical thread**:

1. **AWS use case** (ksletmoe-aws May 18 20:39 UTC): *"we need cross-region encoder redundancy where two independent encoders in different regions produce interchangeable output for the same stream. If one region goes down, a downstream relay switches to the other region's feed seamlessly. For this to work, group IDs from both encoders must align, and the natural way to achieve that with output-locked encoders is epoch-based PTS as the group sequence (both encoders derive the same value from wall clock, no coordination needed). Sequential IDs don't work because there's no shared counter between independent encoders, and deriving one from PTS breaks with variable-length GOPs (ad breaks, etc.)."*

2. **AWS revised design** (same comment): use **MOQT `Prior Group ID Gap` extension header (Property Type 0x3C, added in draft-14)** for the publisher to declare *"the N groups before this one will never exist"* — gives the consumer the same certainty as `+= 1` without sequential numbering. *"I think you might have been thinking of Prior Object ID Gap when you mentioned gap notifications being object-only? The group-level one is there too as of draft-14."*

3. **kixelated rejection of transport-layer stitching** (May 18 21:15 UTC): *"There has to be some coordination because the encoding settings need to be identical. And stuff like timelines and FETCH assumes that a broadcast is append-only. Otherwise the moment you do an unsynchronized failover, a bunch of stuff would break. My thought process here is that you explicitly make two separate broadcasts and have the player switch between them. `camera/1234/primary` and `camera/1234/backup`, or add the unix epoch to the broadcast name directly. It's a lot less gross to stitch at the application level than stitching at the transport level."*

4. **kixelated on Prior Group ID Gap as inadequate**: *"And you're right, I didn't think Prior Group ID Gap was a thing. It's still not perfect because it can't handle two lost groups in a row (ex. audio)"*

5. **kixelated recommended pattern**: *"I recommend relying on `SUBSCRIBE_NAMESPACE` (`announced` in moq-lite) to learn when primary/backup broadcasts come and go, and it opens the door to doing active/active stuff."*

6. **AWS acceptance** (May 18 23:42 UTC): *"You're right that there's coordination already (identical encoder config, synchronized SCTE), and the separate broadcasts approach is cleaner for FETCH/DVR. I'll think more about the announced-based switching model you described. For the short term, I'll close this PR and split out the AVC description fallback (part 2) as a separate fix since that's orthogonal."*

7. **Closure** (May 18 23:43 UTC): PR closed, AVC description fallback to be re-filed.

**Headline carry-forward**:

- **kixelated's stance on non-sequential group sequences is now public and explicit**: *"Sequences numbers should be += 1 just like HLS/DASH. I strongly disagree with the IETF drafts that allow, and even encourage, sequence number gaps."* (May 16 03:49 UTC). This is **at odds with the [[moq-msf]] PR #157 (Suhas group-numbering)** editorial direction — *"each subsequent Group ID SHOULD increase by 1; intentional gaps MUST be signaled via the MOQT Prior Group ID Gap Extension header"* — which kixelated himself agreed to *"with SHOULD for both"* on May 16 19:08 UTC. **kixelated's pattern is "library-level rejection of the spec-level concession"**: he accepts the spec wording but won't implement the gap path in moq-lite the library. This is the **second case in two weeks of kixelated documenting intentional moq-lite non-compliance** (first was `LARGEST_OBJECT` in PR #1418).
- **AWS's failover use case is a real production gap in the IETF draft model**: cross-region encoder redundancy with output-locked encoders has no canonical transport pattern in MOQT today. kixelated proposes application-layer switching via `SUBSCRIBE_NAMESPACE` / `announced` — which works but requires the player to be aware of primary/backup namespace conventions. **This is the same kind of design question that the [[joining-fetch]] consultation surfaced**: where does transport responsibility end and application responsibility begin? Likely worth tracking for [[2026-06-09-london-interim|London]] as an emerging design topic.
- **AWS engagement pattern is collaborative**: PR #1408 (CMSF/EML, +3891/−457) is **still open Day +4** after the design dialogue on PR #1413. The relationship between kixelated and ksletmoe-aws has settled into a substantive design-review pattern: AWS proposes implementation-pragmatic changes, kixelated pushes back on architectural grounds, AWS reframes within his constraints. This is **healthy engagement** but is **slow relative to AWS's apparent internal cadence** (2 PRs in 24h on May 14–15, then design discussion friction throughout May 16–18).

## Three additional implementations announce draft-18 support: imquic / moqxr / moq.dev `anon` CDN

The May 18 06:00 UTC → May 19 06:00 UTC window saw **three new draft-18 implementations come online** beyond the headline moq-dev/moq PR #1418:

### meetecho/imquic — Lorenzo Miniero's QUIC-with-MoQT C library

[**Lorenzo Miniero May 18 19:53 CEST (17:53 UTC) `#moq`**](https://app.slack.com/client/T046V0QF374/C046V0QF3CK): *"Not sure if anybody else started updating to v18 too, but if you want something to test against, I updated my stack to most of the changes there (hopefully the right way). I think I'm missing the ability to REQUEST_UPDATE a SUBSCRIBE_NAMESPACE/TRACKS, but I'll try to do that in the next few days. You can reach my POC relay at the usual place ([lminiero.it](http://lminiero.it), port 9000, both raw QUIC and WebTransport)."*

The stack is [meetecho/imquic](https://github.com/meetecho/imquic) — *"QUIC library with RTP Over QUIC (RoQ) and Media Over QUIC (MoQT) support"*, C library, 73 stars, last pushed May 18 15:51 UTC. The relay endpoint at lminiero.it:9000 (raw QUIC + WebTransport) is now **a publicly available draft-18 endpoint for interop testing**.

**Subsequent Slack engagement**:

- [**Suhas Nandakumar May 18 20:38 CEST (18:38 UTC)**](https://app.slack.com/client/T046V0QF374/C046V0QF3CK): *"@Lorenzo Miniero I am in the midst of updating my client. I can run some tests and let you know?"*
- [**Paul Gregoire May 18 20:44 CEST (18:44 UTC)**](https://app.slack.com/client/T046V0QF374/C046V0QF3CK): *"@Lorenzo Miniero I've got moqxr updated to 18; github.com/mondain/moqxr."*

### mondain/moqxr — Paul Gregoire's C++ Origin Publisher for OpenMOQ

[**mondain/moqxr**](https://github.com/mondain/moqxr) — *"Origin Publisher for OpenMOQ"*, C++, 3 stars. Draft-18 work started May 16 (3 days ahead of the May 18 Slack announcement):

| Commit (UTC) | SHA | Message |
|---|---|---|
| May 16 13:16 | `05d1dec8` | Update MoQ draft WebTransport docs |
| May 16 13:49 | `d284c21c` | Add cross-draft MoQ message serde tests |
| May 16 15:01 | `cca10631` | fix draft 18 subgroup header encoding |
| May 16 15:02 | `ea11a556` | Fix psychedelic ffmpeg pipe on Windows |
| May 16 15:17 | `3360afca` | Refresh roadmap |
| May 16 15:34 | `fe6ba73f` | Implement draft-18 subscribe tracks |
| May 16 16:17 | `9454b2c0` | Clarify publisher stats API |
| May 16 16:23 | `957d5cd8` | Poll live publisher stats |
| May 17 17:22 | `07ecdcef` | Record published-object stats for non-live publish modes |
| May 18 19:07 | `903bf868` | Fix missing functional include |

This is **the first OpenMOQ-published implementation announcement on `#moq`** (compare to the May 10 OpenMOQ governance fallout where openmoq/moqx provoked the Lucas Pardue / Will Law dialogue). Paul Gregoire's moqxr is **a contribution from a single OpenMOQ member into the OpenMOQ org/identity** but is hosted on his personal `mondain/` namespace rather than `openmoq/` — separating individual work from the org-level brand.

### moq.dev `anon` CDN — Luke Curley's deployed relay claims draft-18

[**Luke Curley May 18 22:21 CEST (20:21 UTC)**](https://app.slack.com/client/T046V0QF374/C046V0QF3CK): *"I think `cdn.moq.dev/anon` (and my clients) support draft-18 now, but it's untested."*

This makes **`cdn.moq.dev/anon` the first deployed production-shaped relay to claim draft-18 support** — the same nanode cluster from PR #1420's loop-detection-debugging context, now bumped to 14 edge nodes. Untested as of the announcement.

### Updated implementation roster for draft-18

As of May 19 06:00 UTC, **the implementations claiming draft-18 wire support** are:

| Implementation | Stack | Maintainer | Status |
|---|---|---|---|
| **moq-dev/moq** (library + CDN) | Rust + JS | [[luke-curley|kixelated]] | Shipped via PR #1418 May 18 05:08 UTC |
| **meetecho/imquic** | C | [[lorenzo-miniero]] | Shipped May 18 17:53 UTC (POC relay at lminiero.it:9000) |
| **mondain/moqxr** | C++ | Paul Gregoire | Implementing since May 16 (Slack announcement May 18 18:44 UTC) |
| **cdn.moq.dev/anon** | (moq-dev/moq deployment) | kixelated | Claims draft-18, untested as of May 18 20:21 UTC |

**6 days after [[moq-transport|draft-18]] publication May 12, the count is 3 distinct codebases + 1 production deployment**. Compare to draft-17 (~3 weeks for first impl) and draft-16 (~2 weeks for first impl): **draft-18 has cleared 3 impls in less time than draft-17 cleared 1**. The accelerant is in two places: (1) the Claude-co-authored PR pattern on moq-dev/moq, and (2) **draft-18's small-delta scope** (7-byte varint, FIRST_OBJECT bit, RequestID removal, LARGEST_OBJECT) which lets implementations stage changes incrementally on top of draft-17 plumbing.

## Mailing list — London Agenda: Martin Duke chair prod + Will Law files first request

After **3 days of mailing list silence** (May 15-17), 2 messages May 18:

### Martin Duke chair prod ([archive](https://mailarchive.ietf.org/arch/msg/moq/8pyExJ38lsn17GgMoPZ6w3eFPAQ/))

*"We're two days out and have received zero requests for agenda time."* Reminds participants the **May 20 deadline** (Mike English May 15 invitation) is approaching. Re-states the format requirement: *"Please include an estimate of (1) how long you would like to present the slides and (2) how much discussion time you think you need. Requests will not be granted unless both estimates are present."*

### Will Law (Akamai) first concrete request ([archive](https://mailarchive.ietf.org/arch/msg/moq/ph_GdTjbxut1QCwstrclzZkfL-k/))

Files **the first two agenda items**:

1. **MSF/CMSF — tech decisions**: **60 minutes**
2. **DTS**: **30 minutes**, *"unless it gets resolved May 26th"*

**Headline carry-forward**:

- **MSF/CMSF 60-min slot signals it's the largest unresolved spec topic** going into London. Open MSF issues include #163 (will-law catalog draft-version field, opened May 15) and PR #157 (Suhas group-numbering / SHOULD-for-both editorial-converging). The May 14 [[moq-cmsf]] WG adoption status remains *"-00 / not yet adopted"*. **Will Law owning the agenda slot makes sense** — he's both the [[moq-msf]] editor and the catalog-format draft author.
- **DTS as a separate 30-min slot** with conditional *"unless it gets resolved May 26th"*: DTS likely refers to a contention between Will Law / Mike English / kixelated on **DASH/HLS-like timestamp scheme** for MSF/CMSF — the same area as Suhas's group-numbering PR #157 and the AWS PR #1413 epoch-PTS use case. May 26th is presumably an editor's deadline / planned issue-resolution date.
- **The "zero requests at T-2-days" pattern** is a normal IETF working group rhythm (chairs prod, requests arrive in the last 48h), not a red flag. Expect 3-5 more agenda requests in the May 19-20 window — afrind on Joining FETCH outcome (post-survey), Suhas on SVC TPL/SGPL synthesis, kixelated on draft-18 retrospective + moq-net architecture, possibly Tobbe on LOCMAF given the public Slack announcement (see below).

## Slack `#moq` — Tobbe formally announces LOCMAF on `#moq` (first wide audience)

[**Torbjorn Einarsson May 18 08:19 CEST (06:19 UTC)**](https://app.slack.com/client/T046V0QF374/C046V0QF3CK): *"CMAF chunk headers are more than 100 bytes even when wrapping a single audio frame. This is an order of magnitude more than LOC, and increases with DRM/encryption. However, all fields are essentially fixed, or can be derived, so it is possible to delta-encode them within a group. LOCMAF, see [locmaf.dev](https://locmaf.dev), is a first shot at a new wire-format for CMAF that fits well with MOQ. The actual chunk overhead can often get down two 2 bytes in steady state for common cases with fixed framerate. All details and links to a spec and implementation in. moqlivemock is at the locmaf site. This pushes the MP4 compression of @Luke Curley quite a lot further, and has been done as a part of M Sc work by Hugo Björs (report to be published in June). Any feedback is welcome. If some of you think this is a good idea, we may want to make an Internet-Draft, probably after some adjustments/approvements."*

**Two structural new elements** vs all prior LOCMAF context the wiki has tracked:

1. **`locmaf.dev` is now publicly disclosed** as a project landing page. Until May 18, the spec + implementation were buried in `Eyevinn/moqlivemock/docs/LOCMAF.md` (catalogued in the May 14 wiki entry). The `locmaf.dev` domain elevates it to a **first-class draft project URL**.
2. **First explicit mention of "may want to make an Internet-Draft"** for LOCMAF as a possibility. Until this Slack post, LOCMAF's status was *"Eyevinn-internal wire-format experiment + reference impl"*; now it's *"may be socialized as an I-D"*. The conditional framing (*"if some of you think this is a good idea, ... probably after some adjustments/approvements"*) is a **standard pre-IETF temperature-check**.

**Reaction**:

- [**Gwendal Simon May 18 15:29 CEST (13:29 UTC)**](https://app.slack.com/client/T046V0QF374/C046V0QF3CK) (gwendalsimon — author of [[moq-transport]] PR #1378 SWITCH): *"This is quite a piece of work. Thank you Tobje! You can probably expand CMSF github.com/moq-wg/cmsf. It is very interesting."*

**Headline carry-forward**:

- **Gwendal's reaction is constructive but suggests an integration path** via [[moq-cmsf]] rather than a standalone I-D — *"you can probably expand CMSF"*. This is a **specific architectural suggestion**: rather than start a parallel `LOCMAF` Internet-Draft, fold the delta-encoded CMAF overhead reduction into CMSF as an optional CMAF-mode extension. This is **politically lighter than launching a new draft** (CMSF is already WG-adopted at -00) but also means LOCMAF would inherit CMSF's bias toward DASH/HLS-compatible CMAF (vs LOCMAF's current freedom to optimise without that constraint).
- **Slack reactions are likely incomplete** — the post was made at the start of the European workday, by Tobbe at Eyevinn. Additional reactions from Luke Curley (the LOC author), Will Law, Mike English (the CMSF author) are likely to arrive in the May 19-20 window. The May 18 entry captures only the Gwendal reaction; this thread is open for follow-up.
- **For London agenda**: depending on how the May 19-20 reactions land, Tobbe may want to file an agenda slot before the May 20 deadline. The current MSF/CMSF 60-min slot Will Law requested could include a 10-15 min LOCMAF subitem if the conversation converges that way.

## google/quiche moqt — `Factor PublishedSubscription out of MoqtSession` ([6460010e](https://github.com/google/quiche/commit/6460010e))

[**6460010e**](https://github.com/google/quiche/commit/6460010e) May 18 **22:45 UTC** by martinduke: *"Factor PublishedSubscription out of MoqtSession, into SubscriptionPublisher."* **Breaks the 3-day quiet** on `quiche/quic/moqt` (last commit May 15 16:07 UTC). This is **structural / API-refactor work**, not a draft-18 implementation step — building a `SubscriptionPublisher` abstraction by extracting `PublishedSubscription` from the monolithic `MoqtSession`. Consistent with the 9-commit-in-4-days pattern preceding the May 16 quiet — Martin Duke is **re-architecting the publisher path** for the draft-18 transition rather than rushing a wire-level update.

## Eyevinn/warp-player — dependabot 3-PR re-rebase post-#127 closure

After [PR #127](https://github.com/Eyevinn/warp-player/pull/127) (eslint 9.39.4→10.4.0) was CLOSED unmerged May 19 01:27 UTC, dependabot opened 3 fresh PRs in the same minute:

- [PR #130](https://github.com/Eyevinn/warp-player/pull/130) (@types/node 25.7.0 → 25.9.0, dev-deps group)
- [PR #131](https://github.com/Eyevinn/warp-player/pull/131) (production-dependencies group, 3 updates)
- [PR #132](https://github.com/Eyevinn/warp-player/pull/132) (eslint 9.39.4 → 10.4.0)

These are mechanical dep-PR rebases triggered by recent merges (likely v0.9.0). Not material to MoQ work.

## Other channels

`#moq-rs`, `#moq-js`, `#libquicr` — all quiet in the window. `#moq-interop-runner` — see [[interop-runner]] discussion above.

---

# Activity (May 17 06:00 UTC → May 18 06:00 UTC) — **moq-dev/moq ships draft-18 (first implementation); SVC thread broadens to 4 voices with Lorenzo joining + draft-18 procedural gap surfaced; tobbee + warp-player v0.9.0 LOCMAF release**

## moq-dev/moq — first implementation to ship draft-ietf-moq-transport-18

[**PR #1418**](https://github.com/moq-dev/moq/pull/1418) MERGED May 18 **05:08 UTC** by [[luke-curley|kixelated]] (+1431/−477, `Co-authored-by: Claude`), *"Add draft-ietf-moq-transport-18 support"*. **First moq-transport-18 implementation to ship in any open-source repository** — 6 days after [[moq-transport|draft-18 publication]] May 12 23:07 UTC.

Body verbatim summary:

> *"Adds Draft18 as a negotiated version alongside Draft14-17 in both moq-lite Rust and JS implementations. Draft18 reuses the Draft17 unified SETUP path and applies the wire-format changes from the draft-17 to draft-18 changelog."*

**Spec-driven changes** (from PR body):

- **Wire version `0xff000012` / ALPN `"moqt-18"`** prepended to negotiation lists.
- **Varint 7-byte form** (`1111110x` prefix) accepted on draft-18 (resolves moq-transport [#1595](https://github.com/moq-wg/moq-transport/issues/1595)).
- **`SUBGROUP_HEADER` `FIRST_OBJECT` bit (0x40)** set on emit and ignored on decode in draft-18 per §11.4.2 (resolves [#1618](https://github.com/moq-wg/moq-transport/issues/1618)). moq-lite always starts subgroups at object 0, so the bit is constant-true on the publisher side.
- **Request ID removed** from `PUBLISH_NAMESPACE` / `SUBSCRIBE` / etc. on draft-18 (resolves [#1615](https://github.com/moq-wg/moq-transport/issues/1615)) — field is draft-17-only.
- **`SUBSCRIBE_TRACKS` (0x51, [#1542](https://github.com/moq-wg/moq-transport/pull/1542))**: explicitly rejected with a clear error rather than silently ignored, since moq-lite does not implement PUBLISH replication and the peer would otherwise wait forever for `REQUEST_OK`.
- **Optional trailing Request ID in `GOAWAY`** ([#1559](https://github.com/moq-wg/moq-transport/issues/1559)): never emitted, read-and-discarded if present.

**Intentionally NOT changed** (from PR body):

- **`LARGEST_OBJECT` ([#1621](https://github.com/moq-wg/moq-transport/pull/1621))**: *"we lie on purpose — honoring the new MUST is strictly worse for live latency"*. **First explicit spec non-compliance moq-lite has documented in a PR body**.
- **Track Properties on `REQUEST_OK` ([#1576](https://github.com/moq-wg/moq-transport/issues/1576)) and mandatory-to-understand track extensions ([#1509](https://github.com/moq-wg/moq-transport/issues/1509))**: read-and-dropped, never emitted — moq-lite does not use track properties.

**Refactor**: switch version matches changed from *"explicit newest"* to *"newest defaults forward"* per CLAUDE.md convention. Each match lists Draft14–16 (legacy) explicitly and falls through to `_` for newer drafts, so **Draft19 will inherit Draft18 behavior unless explicitly opted out**. The `SetupVersion::Draft17` internal enum variant is renamed to `Modern` to reflect *"uses ALPN-only negotiation"*. 6 commits on the PR branch (`claude/add-moq-transport-18-support-fFxsp`), all auto-co-authored by Claude per kixelated's pre-London cadence.

**Headline carry-forward**:

- **Implementation-vs-spec gap closes 6 days after draft-18 publication** — this is the **fastest implementation turnaround for any major MoQT draft revision** the wiki has tracked (draft-17 took ~3 weeks; draft-16 took ~2 weeks). Reads as **moq-dev/moq positioning for [[2026-06-09-london-interim|London hackathon]] interop on draft-18**.
- **The "we lie on purpose" comment on LARGEST_OBJECT is a procedural marker**: it concretely demonstrates the pattern the [[interop-runner]] / matrix-rebuild side will hit when implementations diverge from MUSTs for product reasons — the matrix has no signalling for *"intentionally non-compliant pass/fail"*. afrind / [[mike-english]] may need to thread this through their hackathon test design.
- **No other implementation has shipped draft-18**: cloudflare/moq-rs (Day +35 main-quiet), google/quiche moqt (Day +3 quiet), moqtail/moqtail (Day +5 quiet) all still on draft-16. The matrix's spec-vs-implementation gap **widens** with moq-dev/moq now ahead of every other matrix entry.

## moq-dev/moq — five-PR overnight merge spree by kixelated (May 18 01:51 → 05:08 UTC)

Beyond the headline #1418, **kixelated landed 4 additional `main`-branch merges** in the same 3h17m window:

| PR | Merged (UTC) | Title | Net |
|----|--------------|-------|-----|
| [#1414](https://github.com/moq-dev/moq/pull/1414) | 01:51 | audio: send each frame as its own group | +17/−50 |
| [#1412](https://github.com/moq-dev/moq/pull/1412) | 02:37 | Migrate UI from SolidJS to vanilla Web Components | +1366/−2234 |
| [#1411](https://github.com/moq-dev/moq/pull/1411) | 03:42 | Add pixel budget controls for video rendition selection | +139/−2 |
| [#1419](https://github.com/moq-dev/moq/pull/1419) | 04:44 | Drop BEM prefixes from watch and publish UI CSS | (CSS-only) |
| [#1418](https://github.com/moq-dev/moq/pull/1418) | 05:08 | Add draft-ietf-moq-transport-18 support | +1431/−477 |

**Headline**:

- **PR #1412 (SolidJS → vanilla Web Components, net −868 LOC)** lands — completes the May 15 SolidJS removal direction (closing PR #1405's peerDep blocker permanently). Removes `@moq/ui-core` SolidJS package entirely; UI now built on bare Custom Elements + the `@moq/signals` package moq-dev already depends on.
- **PR #1411 (pixel budget ABR)**: new viewport-pixel-budget-driven rendition selection algorithm — adds device-side ABR aware of actual rendering surface (display-pixel-rate × upscaling tolerance). Pairs with the May 16 audio frame-per-group revert as the **second product-side latency/quality tuning before London**.
- **PR #1414 (audio frame-per-group)** opened May 16 20:29 UTC (covered in May 17 entry) — now merged. The whole batching path is now removed from `main`.

**Pattern observation**: **moq-dev/moq's largest single-window merge volume in 2026** measured by both PR count and LOC (5 merges + ~1500 net additions). All 5 PRs are `Co-authored-by: Claude` per kixelated's documented practice. **This is the third consecutive day with material moq-dev/moq main activity** — the May 14–18 cycle now totals 8 + 4 + 5 = 17 PR merges in 5 days, well above the repo's running ~2–3 merges/day baseline.

## moq-dev/moq — two PRs opened May 18 06:00 UTC (just outside the merge window)

[**PR #1420**](https://github.com/moq-dev/moq/pull/1420) OPENED May 18 **05:54 UTC** by [[luke-curley|kixelated]] (+67/−18), *"moq-lite: enforce cluster loop detection on announce"*. **Production-debug PR** addressing a ~120 MB/hr memory leak on a live nanode relay. Body:

> *"Heap profile from a live nanode relay traced the leak to `Subscriber::start_announce → OriginNode::publish → Broadcast::produce`, ~120 MB/hr of `Broadcast` objects on a relay carrying ~zero customer traffic. Cause was a phantom anonymous publisher (`anon/la-cbs`, `anon/la-nbc`) that kept reconnecting and re-announcing. With a 13-edge mesh and no working loop detection, each announce bounced ~32 times (`MAX_HOPS`) allocating a fresh `Broadcast` per hop before finally being dropped."*

Three changes: (1) subscriber drops reflected announces (`hops.contains(self_origin)` guard); (2) `AnnounceInterest.exclude_hop` is now populated and honored (was decoded but unused); (3) **`self_origin` is now stable per relay**, not random per session — previously every `session::start` generated `Origin::random()` so cross-session loop detection at `OriginProducer::publish_broadcast` could never fire. Includes a `moq-relay 0.10.25 → 0.10.26` patch bump. **Significant signal that moq-dev/moq is running on live infrastructure carrying real-world (or real-world-shaped) traffic** — the `anon/la-cbs` / `anon/la-nbc` phantom publishers suggest someone has been testing CBS/NBC livestream feeds through a moq-dev cluster.

[**PR #1421**](https://github.com/moq-dev/moq/pull/1421) OPENED May 18 **05:58 UTC** by [[luke-curley|kixelated]] (+477/−227), *"fix: bump web-transport-iroh to 0.4 to unbreak cargo update"*. CI-unblock PR: release-plz auto-generated PR #1391 failed CI after `cargo update` picked up newly-released `pkcs8 0.11.0`, which changed `Error::KeyMalformed` from a unit variant to a tuple variant — transitively-pulled `ed25519-dalek 3.0.0-pre.1` (via iroh 0.97) still uses the old form. Bump to `web-transport-iroh 0.4` (iroh 0.98) constrains the lockfile to a self-consistent set.

## Slack — Suhas SVC thread grows from 0 to 13 replies; Lorenzo Miniero joins as 4th voice; **NEW draft-18 procedural gap surfaced**

The [[suhas-nandakumar|Suhas]] May 17 02:56 UTC top-level message (covered in May 17 entry as the *"first 3rd-party participation"* in the SVC TPL-vs-SGPL discussion) **grew 13 thread replies in the May 17 06:00 UTC → May 18 06:00 UTC window**.

**4th-party voice joins** — [[lorenzo-miniero|Lorenzo Miniero]] May 17 13:05 CEST (11:05 UTC), bringing the **WebRTC-mirror argument**:

> *"If we mirrored the way WebRTC currently does it, it would be SVC layers as subgroup, since layers per track would be more like simulcast (different spatial layers as independent streams, so different SSRCs), which makes more sense to me considering the layer dependencies in SVC. WebRTC simulcast supports SVC temporal scalability too out of the box, and that's done on the same SSRC (as expected)."*

**afrind softens to "wire-image isomorphic, adaptation layer on subscriber side"** — May 17 17:12 CEST (15:12 UTC):

> *"Oh you are on team 'both'. In any case, the wire image is essentially isomorphic so any system that can be built with one can be built with the other with an adaptation layer on the subscriber side."*

Followed by 15:14 UTC self-deprecation: *"I realize I am essentially telling the world 'you can edit files in vim or emacs'"*. **Softer than the May 15 *"religious question"* framing** — afrind is now positioning the design space as *"interchangeable with adaptation"* rather than *"design preference"*.

**Suhas refines the asymmetric-decomposition position** — May 17 20:50 CEST (18:50 UTC) introduces an **RTP analogy**:

> *"When we came with subgroups, the idea was to represent temporal layers within a given spatial layer (which is a track). The inter spatial layer dependencies can be mapped via msf attribute. There is lot of inband signaling that happens, especially with VPx and AVx codecs that makes it natural with such arrangement for "common" svc dependencies chains. Having it split even at temporal layers at track level needs another layer of additional information that needs be exchanged for decoders to set up the dependencies appropriately across multiple tracks and wth differing priorities makes it much harder. I don't see a need to bring on this additional, probably unproven complexity for apps at this stage. RTP SvC, for example has 2 modes — SRST and MRMT. The latter aligns to some extent of multi track design. The former more aligns with what we have subgroup based design. Most of the real world implementations are SRST for its simplicity for the exact same reasons."*

The RTP SRST (Single SSRC for Single Transport) / MRMT (Multi SSRC for Multi Transport) parallel maps **SGPL ≈ SRST** and **TPL ≈ MRMT** with the "most real-world implementations chose SRST" inference.

**Luke Curley surfaces a NEW draft-18 procedural gap** — May 18 00:29 CEST (May 17 22:29 UTC):

> *"isn't it illegal to SUBSCRIBE to the same track twice? how does that work with `SUBSCRIBE track=video FILTER=sub-group=0` and `SUBSCRIBE track=video FILTER=sub-group=1`"*

Followed by 00:25 → 00:28 acknowledgement that *"yeah, I understand the appeal of sub-groups for temporal scalability; it means you don't need a separate group for each b-frame"* with a counter that decoder-side metadata about subgroup contents is *"going to happen anyway"*.

**afrind concedes the gap** — May 18 01:27 CEST (May 17 23:27 UTC), after Luke clarifies the priority-per-subgroup-via-SUBSCRIBE concern:

> *"Oh, yeah, if you want subscriber control over layer priority you have to use track per layer."*

**Headline takeaway**: The May 15 *"religious question"* framing has **already been substantively walked back** by the originator. afrind's May 17 concession that **"subscriber control over per-layer priority is structurally only possible with TPL"** is the **first concrete differentiator** identified in the thread — the previous wire-image-isomorphism arguments had narrowed differences to economics (cache fragmentation, relay ingress costs). This means SGPL-with-filters has a **specific functional limitation** that depends on whether MOQT allows multiple subscriptions to the same track with different filters — which it currently doesn't ([[moq-transport]] Issue [#1451](https://github.com/moq-wg/moq-transport/issues/1451) *"Allow multiple Subscriptions to a Track"* has been open since April 13). **Carry-forward**:

- Issue #1451 may need to be re-prioritised before [[2026-06-09-london-interim|London]] if the SGPL camp wants to preserve subscriber-side priority control.
- The thread now has **4 design positions** (afrind/wire-isomorphism, Luke/economics, Suhas/decoder-asymmetry, Lorenzo/WebRTC-mirror) plus a procedural gap (priority-per-layer-only-with-TPL). **The London SVC design discussion just got significantly more complex**.

## Eyevinn — synchronised moqlivemock v0.9.0 + warp-player v0.9.0 LOCMAF release by tobbee

Three [[tobbe-einarsson|tobbee]] PRs merged into Eyevinn/moqlivemock May 17 06:47 → 09:36 UTC, plus the warp-player release at 09:40 UTC:

- **[moqlivemock PR #85](https://github.com/Eyevinn/moqlivemock/pull/85) MERGED May 17 06:47 UTC** (+354/−8), *"fix(audio): regenerate 10s loops with uniform MP4 sample durations"* — regenerates the 10s loop audio sources (AAC, Opus, AC-3) so every MP4 sample has the same duration (no trailing short sample, no `elst`, `baseMediaDecodeTime` starts at 0). Adds `utils/contentgen/trimaudio` post-processor that strips whole-frame encoder priming, drops trailing short sample, trims to codec target frame count, removes the `elst`, and re-anchors tfdts at 0. `internal/asset.go::GenCMAFChunk` now emits `orig.Dur` instead of `t.SampleDur`. **Audio-loop drift fix** that was surfacing as gradual audio/video desync over multi-loop playback.
- **[moqlivemock PR #86](https://github.com/Eyevinn/moqlivemock/pull/86) MERGED May 17 08:58 UTC** (+180/−1), *"docs(LOCMAF): add document version banner, logo, and revision history"* — adds the LOCMAF logo (light/dark variants via `<picture>`) at the top of `docs/LOCMAF.md`, plus an explicit *"Document version: 0.1 (2026-05-17) — Wire-format `locmafVersion`: \"0.1\""* banner and a Revision History table with git-tag snapshot policy (`locmaf-v0.1`, …). **First formal LOCMAF spec versioning artifact** — the wire-format version field tobbee added in [[moqlivemock|PR #82]] May 15 now has a corresponding spec-document version label.
- **[moqlivemock PR #87](https://github.com/Eyevinn/moqlivemock/pull/87) MERGED May 17 09:36 UTC** (+66/−7), *"chore(release): prepare v0.9.0"* — v0.9.0 changelog: *"LOCMAF (Low Overhead CMAF) packaging support and audio loop drift fixes. LOCMAF: a LOC-inspired variant of CMAF that encodes only the non-derivable `moof`/`moov` fields as MoQT key-value pairs using QUIC varints. The first object of every group is a LOCMAF full moof (carries every required field); subsequent objects in the group are LOCMAF delta moofs that only carry the fields that changed since the previous moof."*
- **[warp-player PR #129](https://github.com/Eyevinn/warp-player/pull/129) MERGED May 17 09:40 UTC** (+91/−13), *"chore: prepare v0.9.0 release"* — version bump 0.8.0 → 0.9.0 covering **LOCMAF (compressed CMAF) packaging support** — new `src/locmaf/` module that parses LOCMAF init / `moof` / delta-`moof` objects per v0.1 with QUIC varints and derived `baseMediaDecodeTime`, routed through the MSE pipeline; gated on the catalog's `locmafVersion` field. Also notes TypeScript 6 and other dep bumps.

**Headline takeaway**:

- **Eyevinn's LOCMAF stack is now formally version-labeled (v0.1) and synchronously released across publisher + player at v0.9.0** — Eyevinn's pre-London setup is **"freeze the wire format at LOCMAF v0.1, ship publisher + player together, then interop"**.
- **Audio-loop drift fix in PR #85 is unrelated to LOCMAF** — surfaces while debugging long-running publisher sessions during pre-London soak-testing. The `trimaudio` post-processor is a reusable tool for future codec additions.

## moq-dev/moq — 2 new issues, 1 still-open dependabot

Two issues opened by [danrossi](https://github.com/danrossi) (new contributor, opened first moq-dev/moq PR May 14 → merged as #1409 May 15):

- **Issue [#1416](https://github.com/moq-dev/moq/issues/1416)** OPENED May 17 13:28 UTC — *"Watch TS: Feature to signal when the api is ready"*. UX request for a ready signal on the TypeScript watch API surface.
- **Issue [#1415](https://github.com/moq-dev/moq/issues/1415)** OPENED May 17 11:32 UTC — *"TS: Option to enable / disable to disconnect when pausing. Error emitted"*. Behavioural toggle request.

Both filed within 5 hours of each other; reads as a real integration push by danrossi. With merged PR #1409 (Vite plugin) + 2 fresh issues + their PR #128 still open in warp-player (separate repo), danrossi is positioning as a fast-onboarding consumer-side contributor to the moq-dev/moq stack.

[[warp-player|Eyevinn/warp-player]] PR #127 (eslint 9.39.4 → 10.4.0 dev-dep bump) **still open since May 14** — Day +3 after the May 16 dependabot 7-PR burst landed everything else.

## Implementations still quiet

- **cloudflare/moq-rs**: Day +35 main-quiet (last commit Apr 13). [PR #167](https://github.com/cloudflare/moq-rs/pull/167) (Suhas filter-framework) Day +8 untouched.
- **google/quiche moqt**: Day +3 quiet (last commit `3d089cb` May 15 16:09 UTC).
- **moqtail/moqtail**: Day +5 quiet (last commit `dbd7085` May 13 08:44 UTC, [ci] release #196).
- **video-dev/moq-js**: No new commits since Feb 17 (Day +90+).
- **birneee/quiche_moq**: No new commits since Mar 13 (Day +66+).
- **Eyevinn/moqtransport**: No new commits since Apr 17 (Day +31+).
- **Quicr/cat-token**: No new commits since May 10 22:30 UTC rename.

## Mailing list

**Weekly GitHub digest May 17 02:20 UTC** (Repository Activity Summary Bot, `do_not_reply@mnot.net`) — *"[Moq] Weekly github digest (Media Over QUIC Activity Summary)"*. Summary covers May 10–17 activity across moq-wg repos: moq-transport +1/−10 issues / 6 comments / 3 PRs filed; warp-streaming-format +2/−8 issues / 17 comments / 6 PRs; loc +1/−0 issues. **Note**: this digest fell just inside yesterday's wiki entry window (02:20 UTC May 17 < the 06:00 UTC cutoff) but was missed in the May 17 log entry. **Carry-forward**: cadence has resumed (last digest was May 10, so this is Day +7, restored to normal weekly cycle).

No other on-list messages May 17 06:00 UTC → May 18 06:00 UTC. Will Law recharter thread quiet Day +7; martinduke *"On other use cases"* thread quiet; Joining FETCH consultation Day +3 since the May 15 6-message close-out.

## IETF Datatracker

No new revisions May 17 or May 18. WG state: transport-**18** (Day +6), msf-00, loc-02, secure-objects-00, privacy-pass-02, cmsf-00. Notable individual: lite-04, subscribe-rewind-02, qlog-moq-events-06, nmsf-01, gregoire-moq-msfts-00 (May 6, **Day +12**, still no on-list announcement), englishm-cdn-provisioning-00, englishm-relay-dos-00, lcurley-compressed-mp4-00.

## Interop runner

**No new run** — still 19 / 72 / 14 at 2026-05-13 00:41:38 UTC. **5 consecutive missed daily cadences** now (May 14, 15, 16, 17, **18**). Status remains *"unreliable"*. With moq-dev/moq now ahead of every other matrix entry on draft-18, the matrix is structurally one revision behind its highest-touch implementation as it approaches [[2026-06-09-london-interim|London hackathon]] — **22 days out, the matrix shows nothing of what implementations have actually shipped post-May 13**.

## MoQ Monthly

No new issue — archive still #0 (Mar 3) + #1 (Apr 30). **Day +18 since #1**.

# Activity (May 16 06:00 UTC → May 17 06:00 UTC) — **Suhas joins SVC thread with decoder-side asymmetry argument; kixelated reverts audio frame batching; msf PR #157 converges; mailing list 2-day silent; interop-runner 4 consecutive missed cadences**

## Slack — Suhas Nandakumar joins SVC TPL-vs-SGPL thread with first 3rd-party voice

[[suhas-nandakumar]] May 17 **04:56 CEST (02:56 UTC)** posts a fresh top-level message into `#moq` (not threaded into the [[alan-frindell|afrind]] 26-reply chain from May 15) pushing back on the *"it's a religious question"* framing:

> *"I think the internal details are more complicated than object model simplification. SVC has spatial, quality and temporal layers and the advanced ones have intricate layer dependencies across all the 3 degrees. Temporal layers and Spatial layers/Quality are handled pretty differently on the decoder side based on the information needed in-band vs can be found out of band. It is generally easier to separate Spatial layers/Quality then temporal layers into tracks. Can it be done, yes\*, but with adding more complexities for the applications."*

Substantive moves:

- **First 3rd-party participation** — the May 15 thread was afrind / [[luke-curley|Luke]] / [[victor-vasiliev|Victor]] only.
- **First decoder-side argument** introduced. afrind's framing was wire-format-symmetry; Luke + Victor narrowed to operational/economic concerns (cache fragmentation, alignment headaches). Suhas opens a **new axis**: decoder-internal information topology.
- **First explicit asymmetric-decomposition advocacy** — Spatial/Quality layers map cleanly to **tracks** (separable subscribe-control, out-of-band info); temporal layers map cleanly to **subgroups** (in-band dependency signalling). The implicit recommendation is **mix-and-match by layer type**, not TPL-only or SGPL-only.
- **Posted as a top-level message rather than a thread reply** — likely intentional surfacing, since threading into the 26-reply chain would have buried the point.

**Headline implication for [[2026-06-09-london-interim|London interim]]**: the SVC design discussion now has **three positions** to reconcile (TPL, SGPL, layer-type-mixed), not two. Suhas's argument also broadens the ground from *protocol design* (afrind's framing) to *decoder applicability* — a different review surface.

`#moq-rs`, `#moq-js`, `#libquicr`, `#moq-interop-runner` all quiet. The May 10 #moq-interop-runner OpenMOQ-fork-process thread formally closed May 15 16:11 CEST with afrind's fork-governance summary and Lucas Pardue *"Thank you Alan, Will et al"*.

## moq-wg/msf PR #157 — kixelated accepts wilaw's gap-signaling extension-header path

After 5 days of design exchange on **[PR #157](https://github.com/moq-wg/msf/pull/157)** ([[suhas-nandakumar]] *"Clarify Group numbering requirements for restarts (#147)"*), the editorial direction converges May 16:

- **[[suhas-nandakumar|suhasHere]] May 16 17:38 UTC**: *"It's the property of output track that we are talking about here. The same rules apply"* — addresses a question on **primary/backup-mux input handling** by clarifying that the spec-rule scope is the **output track**, not the input streams a muxer combines.
- **[[luke-curley|kixelated]] May 16 19:08 UTC**: accepts wilaw's May 15 10:03 UTC formulation *"each subsequent Group ID SHOULD increase by 1. Any intentional gaps MUST be signaled using the MOQT Prior Group ID Gap Extension header"* with the slight weakening *"I would have SHOULD for both, but that works for me"*.

**Headline takeaway**: the spec-side resolution path for **non-sequential group sequences** (the same bug class AWS hit at runtime in [[implementations/moq-dev|moq-dev]] PR #1413, where CMSF/EML's epoch-based sequences caused ~1s audio underflows) is now **the MOQT Prior Group ID Gap Extension header**. Producers using epoch-based sequences are spec-permitted-with-extension; consumers can switch into gap-aware mode on the wire-level signal.

The kixelated *"SHOULD for both"* weakening (vs wilaw's *"SHOULD…MUST"*) reflects that some producers (e.g. moq-lite) may not always cleanly predict the gap before emit; making the extension-header signalling a strong recommendation rather than a hard requirement preserves an explicit non-compliant-but-still-legal path.

## moq-dev/moq — kixelated reverts audio frame batching to one-frame-per-group

[**PR #1414**](https://github.com/moq-dev/moq/pull/1414) OPENED May 16 **20:29 UTC** by [[luke-curley|kixelated]] (+17/−50), *"audio: send each frame as its own group"*. Body:

> *"Audio frames were being packed into ~100ms groups for relay efficiency. For real-time use cases, that bounds end-to-end latency at the group boundary since the relay cannot forward a group until it is closed. Go back to one-frame-per-group: each frame is flushed to the relay immediately, and the codec's packet loss concealment (Opus PLC, AAC PLC) handles individual frame drops. Applies to the browser publish encoder and the Rust opus/aac mux importers, which all had the same 100ms grouping pattern."*

**Net -33 LOC** removing the batching path. The trade-off:

- **Removed cost**: ~100ms E2E-latency floor (the relay-cannot-forward-an-open-group constraint).
- **Added cost**: higher QUIC stream count (one stream per frame ≈ 50 streams/s for 20ms Opus, vs ~10 streams/s at 100ms batching).
- **Fallback**: Opus / AAC packet-loss concealment handles individual frame drops, so the loss-vs-latency choice is leaned toward latency.

**Pattern observation**: this is the **second moq-lite design choice this month** reversed in the *"go back to the more obvious primitive"* direction (the other: PR #1385 May 6 reverted PR #1356 `insert_track` API change, then PR #1387 re-reverted). Reads as **kixelated tightening real-time semantics ahead of the [[2026-06-09-london-interim|London hackathon]]** — moq-lite's product narrative is *"low-latency live"*, and the audio batching was a latency leak.

## moq-dev/moq — Karolk99 SolidJS peerDep PR #1405 closed unmerged

[**PR #1405**](https://github.com/moq-dev/moq/pull/1405) (Karolk99, *"Declare solid-js as a peerDependency"*) CLOSED unmerged May 16 11:36 UTC. Background: Karolk99's argument was that `@moq/publish`, `@moq/watch`, and `@moq/ui-core` import from `solid-js` but listed it only in `devDependencies`, so the published package.json files declared no solid-js while their JS still contained bare `import "solid-js"` statements — causing either unresolved imports or two parallel Solid runtime instances on consumer apps. kixelated's response May 14 20:58 UTC was *"I don't really want to make solid an explicit dependency just for the UI web component. It hurts dev UX. TBH I kind of want to revert the switch to solidjs and go back to the minimal moq/signals DOM library, since it's already a dependency. Solid feels like overkill for a simple, stock video UI."* — which became [**PR #1412**](https://github.com/moq-dev/moq/pull/1412) (SolidJS → vanilla Web Components migration, opened May 15 16:31 UTC, +1366/−2234). Karolk99 closed PR #1405 *"happy to close"* on May 15 09:48 UTC, with one flagged regression on the `<moq-watch-ui>` Web Component path (overlay button reactive signals not updating visual state — *"play icon stays on play after pausing"*). The peerDep concern is now superseded by the Solid-removal direction.

## Eyevinn/moqlivemock — tobbee LOCMAF DRM documentation

[**PR #84**](https://github.com/Eyevinn/moqlivemock/pull/84) MERGED May 16 06:55 → 10:36 UTC by [[tobbe-einarsson|tobbee]] (+326/−0, docs-only), *"docs: add DRM section to LOCMAF.md"*. The new `## DRM with LOCMAF` section covers:

- **End-to-end pipeline diagram** — encrypted CMAF source → LOCMAF wire → reconstructed CMAF → MSE/EME/CDM. **mdat bytes are byte-equal end-to-end**, so the CDM sees identical ciphertext on both sides (the LOCMAF box reconstruction is field-lossless on the encryption-relevant payload).
- **Catalog DRM signalling** — the `contentProtections` root-level array, per-track `contentProtectionRefIDs`, and the `DRMSystem` object (systemID, robustness, laURL, authzURL, certURL, pssh). Worked JSON example included. Notes that `locmafVersion` applies to DRM-protected tracks the same way it applies to clear ones.
- **`cenc` vs `cbcs` on the wire** — comparison table showing `cenc` carries a per-sample IV on every fragment (8–16 B per sample) while `cbcs` carries a constant IV once in the moov.
- **Why byte-lossy moof reconstruction is safe for DRM** — every field the CDM consumes survives the round-trip.

Continues the post-May-15 LOCMAF tooling sprint by tobbee (PRs #81, #82, #83 May 15 + #84 May 16 = 4 PRs by tobbee in 36 hours, ~+2655 LOC after PR #79 by hugobjoers on May 14). The DRM section completes the **publisher-side documentation surface** for the [[2026-06-09-london-interim|London interim]] LOCMAF demonstration with warp-player (PR #120 still open).

## Eyevinn/warp-player — dependabot 7-PR merge burst

May 16 21:07–21:22 UTC, **7 dependabot PRs merged in 15 minutes**:

- PR #121 (21:07 UTC) — `actions/dependency-review-action` v4 → v5
- PR #122 (21:07 UTC) — dev-deps group, 3 updates
- PR #125 (21:07 UTC) — `@commitlint/cli` 20.5.3 → 21.0.0
- PR #126 (21:12 UTC) — `@commitlint/config-conventional` 20.5.3 → 21.0.1
- PR #128 (21:15 UTC) — production-deps group, 5 updates (1 dir)
- PR #124 (21:22 UTC) — TypeScript 5.9.3 → **6.0.3** (major version bump)
- PR #123 — alternate production-deps group with 3 updates — **CLOSED unmerged** (21:10 UTC, superseded by #128's 5-update group)

PR #127 (eslint 9.39.4 → 10.4.0) still open after CI signal. This is the post-`v0.8.0` release-cycle dependency catch-up; **TypeScript 6.0.3** is the most consequential bump (major version, may surface type narrowing / strict-mode changes in subsequent merges).

## Mailing list — 2-day silence after May 15 6-message bundle

**No new messages May 16 or May 17** — first full 2-day on-list silence since the [[joining-fetch|Joining FETCH consultation]] opened May 11. Last on-list activity remains the May 15 bundle (Mike English London invitation + afrind Joining-FETCH-survey synthesis + Joining-FETCH use-case redesign acceptance by Yu You / Mo Zanaty / Luke Curley).

**No Weekly GitHub digest** May 17 (last digest May 10, **Day +7**). The Will Law recharter thread (Day +5 silence) and martinduke *"On other use cases"* thread (Day +18 silence) both remain quiet.

## google/quiche moqt — 2-day quiet after 9-commit burst

**No new commits to `quiche/quic/moqt` May 16 or May 17** (last `3d089cbe` *"Create OutgoingFetchStream and factor out OutgoingUniStream as a parent of both data stream types"* May 15 16:07 UTC by martinduke). 9 commits in 4 days (May 12–15) now followed by 2 days quiet — likely just IETF-week / post-IETF-week pacing.

## Interop runner — 4 consecutive missed daily cadences (May 14, 15, 16, 17)

**Still 19 / 72 / 14 at 2026-05-13 00:41:38 UTC**. Four consecutive missed daily cadences confirms this is **operator-bandwidth-limited**, not an intentional baselining pause — [[mike-english]] has been focused on London logistics + cdn-provisioning + relay-dos drafts + the May 15 invitation announcement, and the new-15-role matrix expansion he merged May 13 17:23–17:25 UTC remains uncommitted to a CI run.

**Wiki action (May 17)**: downgrade [[interop-runner]] header status from *"current"* to *"unreliable"* and flag it on the implementation pages that depend on it for status signals (specifically [[aiomoqt]], moqx-client, mlmtest, Nokia-via-Docker — all 4 newly merged on May 13 and have had **zero validation runs** since the registry expansion).

---

# Activity (May 15 09:00 UTC → May 16 06:00 UTC) — **SVC TPL-vs-SGPL Slack design thread; London interim formal invitation (June 9–12); AWS second PR within 24h**

## Slack — afrind opens substantive SVC track-per-layer vs subgroup-per-layer thread

[[alan-frindell]] May 15 **20:27 CEST** (18:27 UTC) opens **the first substantive SVC architecture design discussion on `#moq` in 2026**, addressing the long-running design question "Is SVC better as Track per layer or Subgroup per layer?". Headline framing: *"if we add subgroup filters to subscribe, the remaining differences between these two approaches is dwindling"* — the two designs now have nearly identical wire-format output (same QUIC streams, same Group/SG/Pri/Object IDs), differing only in the Track Alias.

afrind's analysis:

- **On-the-wire equivalence**: Track-per-layer and Subgroup-per-layer produce **identical bytes** except for the Track Alias.
- **Unsubscribe flexibility**: previously a TPL advantage (only-tracks-can-be-unsubscribed), but **subgroup filters in draft-18 erase the difference** — subscribers can now opt out of a layer with either model.
- **Object Model enforcement**: SGPL enforces no-duplicate-object-IDs-within-a-group; TPL is publisher-discipline only.
- **Prioritization differences** narrow to two corner cases: (1) explicit per-subscriber layer prioritization (only TPL-possible), (2) equal-priority subgroups tie-break by SGID (SGPL only).
- **Conclusion**: *"Otherwise I believe it's just a religious question of which design fits your mental model better."*

**26-reply thread** with [[luke-curley]] (17 replies) and [[victor-vasiliev]] (5 replies) — entirely a 3-author exchange. Substantive points:

- **Luke (20:30 CEST)**: filters are *optional* — TPL still has a real prioritization advantage in cross-feed scenarios (*"Bob's base layer should be higher priority than Alice's enhancement layer"*).
- **Luke (20:33 CEST)**: cross-namespace publisher-priority interaction is **undefined** in current spec — *"I don't think publisher priority should leak across namespaces and formats"*. Counter-argues Victor's *"You just need to make them different publisher priority"*.
- **Victor (20:35 CEST)**: *"I think we currently assume it's shared across the scope"* — exposes a draft-18 ambiguity about publisher-priority scope.
- **Luke (20:39–20:40 CEST)**: prefers **explicit subscriber priorities** over relying on publishers agreeing on a numbering scheme, *"especially if you ever wanted to use SVC with multiple feeds (main game camera and side-line cameras)"*.
- **Victor (20:40 CEST)**: *"If you don't like publisher priorities, set your own on the subscriber"* — Luke concedes the point.
- **Luke (20:46 CEST) — operational pushback on filters**: *"downside of filters vs separate tracks is that it produces a fragmented cache, or increases relay ingress costs"* — a CDN-economics argument against the filter-collapses-the-debate framing.
- **Victor (20:47–20:48 CEST)**: TPL *"doesn't work if you're trying to do subgroup per object on enhancement layer"* — surfaces the alignment headache when both layers want subgroup-per-object semantics.
- **Luke + Victor (20:49–20:51 CEST)**: agree that you can still group-ID-align enhancement layer subgroups across tracks, *"just you're going to identify the base layer differently"*.
- **Luke closes (20:53 CEST)**: SUBSCRIBE-can-start-at-different-groups-with-different-tracks is *"annoying, but not a big deal"*.

**Headline takeaway**: The SVC TPL-vs-SGPL design debate, which has dragged across multiple interims, is now **substantively narrowed to two real differences** — (1) cache fragmentation / relay ingress costs (favors TPL), (2) subgroup-per-object-on-enhancement-layer alignment (favors SGPL). Both are **operational, not protocol-design**, concerns. The afrind framing is likely to feed into the [[2026-06-09-london-interim]] design discussion. **The publisher-priority-cross-namespace ambiguity flagged by Victor at 20:35 CEST is a fresh draft-18 gap** — not previously flagged on any issue tracker.

`#moq-rs`, `#moq-js`, `#libquicr`, `#moq-interop-runner` all quiet. Only other Slack event: **gazzy joins `#moq-rs`** May 15 15:37 CEST (no messages, channel-join only).

## Mailing list — Mike English formally announces London interim June 9–12

**[Mike English May 15](https://mailarchive.ietf.org/arch/msg/moq/iYxssMkuvIX68SHSZGnn9u3YnOQ/)** sends *"[Moq] London interim June 9–12"* — the **formal in-person hybrid interim invitation** with full logistics:

- **Dates**: **June 9–12** (4 days, expanding the previously-recorded *"June 9–10 interop + June 11–12 working sessions"* understanding into a single contiguous 4-day in-person window)
- **Location**: **Cloudflare London office** — County Hall / The Riverside Building, Belvedere Road, London SE1 7PB
- **Schedule**: 09:00–17:00 BST (08:00–16:00 UTC) daily, with midday break
- **Registration deadline**: **Thursday June 4** — attendees must add name + affiliation to the GitHub wiki by that date for building security
- **Follow-up to come**: arrival procedures, sign-in instructions, reception timing, remote-participant details

This is the most concrete logistics communication on the London interim to date and **reframes the meeting structure** from the "2 days hackathon + 2 days sessions" mental model that has been used since IETF 125. **Implication for the wiki**: [[interim-meetings]] **needs to reflect June 9–12 as the in-person window**, not just the moq-08/09/10/11 formal session numbers (June 11–12 only). The June 9–10 days are the hackathon/interop sessions; the moq-08/09/10/11 formal session numbers cover June 11–12.

**Other mailing-list activity (5 messages)** — Joining FETCH consultation continues:

- **[afrind May 15 (1)](https://mailarchive.ietf.org/arch/msg/moq/iKE8j5l9ObVfOySxIZgBUh-ozZc/)** *"Re: Joining FETCH Survey"* — translates Luke Curley's prose-form May 14 reply into the structured survey: Q1 score **4** (*"meets your use case functionally but is not performant"*), Q2 score **3**, Q3 **MAY remove Joining FETCH**, Q4.3 **Fill semantics for relays**. Tone is *"Let me know if any of that is incorrect"* — afrind is acting as survey rapporteur, not advocate.
- **[afrind May 15 (2)](https://mailarchive.ietf.org/arch/msg/moq/jGjf6SEVW3SZ43DB9mZ4xwkG06A/)** *"Re: Joining FETCH Survey"* — follow-up to Victor Vasiliev's responses: requests clarification on Q2 (unified control plane vs separate data planes), Q4 (subscribe-style FC interpretation), and Q4.3 (*"edge cases will cause this to collapse"*). Survey synthesis still in progress.
- **[Yu You (Nokia) May 15](https://mailarchive.ietf.org/arch/msg/moq/Nc7WCviq2Xq2V5lC0j27fq4_jkQ/)** *"Re: User case or question to Joining Fetch"* — accepts the recommendations (will switch from shared-track + collision-prone Object IDs to **wall-clock-based Group ID + unique Object ID** per participant; will publish A/V info plus user-specific tracks with unique track names). **The closing of Nokia's chat use-case probe via redesign rather than spec change.**
- **[Mo Zanaty May 15](https://mailarchive.ietf.org/arch/msg/moq/7txn6FbA2R_Sa_sE0yLp3ZJLKmc/)** *"Re: User case or question to Joining Fetch"* — anti-pattern warning on the shared-chat-track design: *"MOQT says such tracks SHOULD NOT use group range filters at all"*, *"A track is malformed if different objects end a subgroup or group"*. Suggests **Subscribe Tracks per sender in a shared namespace** as the canonical alternative — *"To rewind, fetch from each sender"*. Aligns with the Luke Curley *"track-per-publisher"* mental model.
- **[Luke Curley May 15](https://mailarchive.ietf.org/arch/browse/moq/)** *"Re: User case or question to Joining Fetch"* — substantive reply on the use-case thread (track-per-publisher pattern).

**No on-list activity** on Will Law's recharter thread (Day +3 silence) or martinduke's *"On other use cases"* thread. **No Weekly GitHub digest** May 15 (last digest May 10, Day +5).

## moq-dev/moq — **Luke 4-PR merge burst + 4 new PRs in 24h; AWS PR #1413 is 2nd within 24h of #1408**

After the May 14 review burst, **[[luke-curley]] merges 4 more PRs May 15 14:08–16:48 UTC** — total **8 PRs in 24 hours**, the **largest 24-hour merge volume on moq-dev/moq in 2026**:

- **[PR #1395](https://github.com/moq-dev/moq/pull/1395)** MERGED May 15 **16:48 UTC** ([[luke-curley|kixelated]]) — *"moq-cli: rename --output to --format, --name to --broadcast, add accept subcommand"*. Co-authored-by Claude Opus 4.7 trailer.
- **[PR #1398](https://github.com/moq-dev/moq/pull/1398)** MERGED May 15 **16:14 UTC** (Jakub Perżyło / **Qizot**) — *"Expose track name and used/unused activity signals"*. Co-authored-by Claude Opus 4.7 trailer.
- **[PR #1404](https://github.com/moq-dev/moq/pull/1404)** MERGED May 15 **14:16 UTC** (Qizot) — *"Fix reading catalogs"*. Co-authored-by Luke + Claude.
- **[PR #1409](https://github.com/moq-dev/moq/pull/1409)** MERGED May 15 **14:08 UTC** (**Dan Rossi / danrossi**) — *"Vite: Add alias resolver to Vite worker plugin esbuild"*. **First merge from new contributor danrossi.**

**3 new PRs by Luke opened May 15 in the same window**:

- **[PR #1411](https://github.com/moq-dev/moq/pull/1411)** OPENED May 15 14:15 UTC — *"Add pixel budget controls for video rendition selection"* (+139/−2). Adds `pixels` attribute / `PixelsMode` to `<moq-watch>` element: `"auto"` (default, dimension-based) or fixed pixel-area budget for bandwidth control.
- **[PR #1412](https://github.com/moq-dev/moq/pull/1412)** OPENED May 15 16:31 UTC — *"Migrate UI from SolidJS to vanilla Web Components"* (**+1366/−2234 net -868**). Removes `@moq/ui-core` package entirely (shared Button/Icon/stats components); reimplements `@moq/watch/ui` and `@moq/publish/ui` as **framework-free Web Components** using `@moq/signals` for reactivity. **The largest negative-LOC PR on moq-dev/moq in 2026** — a dependency-trimming refactor that eliminates the SolidJS dependency from the production UI.
- **[PR #1410](https://github.com/moq-dev/moq/pull/1410)** OPENED May 15 13:59 UTC (**YogiSotho**, **new contributor**) — *"fix(watch): hide buffering overlay while offline"* (+101/−2). Fixes [Issue #737](https://github.com/moq-dev/moq/issues/737) where the buffering UI covered the player + controls during the offline state.

**Headline event — AWS files SECOND PR within 24 hours, this time a runtime fix**: **[PR #1413](https://github.com/moq-dev/moq/pull/1413)** OPENED May 16 **00:50 UTC** by **ksletmoe-aws** — *"fix(hang/consumer, watch/decoder): handle non-sequential groups and AVC description fallback"* (+68/−14). Two concrete bug fixes:

1. **Non-sequential group sequences** — *"The consumer assumed group sequences increment by 1 (0, 1, 2, ...) but CMSF/EML uses epoch-based sequences with large gaps (e.g. 85386781784064, 85386781832192). After consuming a group, `#active += 1` would set `#active` to a value far below the next group's sequence, causing `next()` to block until `#checkLatency` fired a skip."* Effect: *"~1s audio underflows and choppy playback"*.
2. **AVC description fallback** — *"WebCodecs rejects AVC frames without description. When the MSF/CMSF catalog doesn't carry [it]..."* fix path.

**This is the most consequential AWS contribution to date** — not the +3891/−457 packaging-layer PR #1408 (which is integration code), but the *small (+68/−14) bug fix that exposes AWS has been actively running the moq-dev/moq stack against real CMSF/EML producers* and hit these wire-level bugs in production-like conditions. **ksletmoe-aws is now the highest-touch external contributor on moq-dev/moq this week** — 2 PRs in 24h, one packaging-layer and one runtime-fix.

**Other PRs in window**: PR #1396 (metapox SUBSCRIBE_UPDATE) updated May 15 16:53 UTC; PR #1391 (release-bot v0.16.1) updated May 15 16:51 UTC, still open; PR #1405 (Karolk99 solid-js peerDependency) updated May 15 09:48 UTC.

## moq-wg/moq-transport — quiet outside of PR #1378 metadata ping

**No new issues or merged PRs in moq-transport** in the May 15 09:00 UTC → May 16 06:00 UTC window. **PR #1378** ([[gwendalsimon]], *"SWITCH for Client-side ABR"*) had its `updated_at` bumped to May 15 21:15 UTC, but timeline inspection shows **no new comments, reviews, commits, or labels since April 17** — likely an internal subscription/mention event not surfaced via the public API. Most-recent commit on the PR is still April 17 07:07 UTC (`docs(switch): strengthen SHOULD to MUST for local transition handling`). The SWITCH-for-Client-side-ABR design thread remains structurally unchanged; the open question is whether Will Law's earlier *"the SHOULD here is expected to capture such corner cases. Maybe it would be worth mentioning"* prompts another iteration before London.

## moq-wg/msf — **Issue #163 OPENED (wilaw, catalog draft-version field)**

**[Issue #163](https://github.com/moq-wg/msf/issues/163)** OPENED May 15 **10:44 UTC** by [[will-law]] — *"Version should carry draft info for interop until released"*. Full body:

> Currently all the catalog examples specify Version: 1, which will be accurate once the RFC is released, however until then for interop we should really have it specify the draft version of the spec, so that we can interop around intermediate improvements to the spec. Version is currently specified as a Number. We can
> 1. Change it to a string so we can specify `"version": "draft-01"` and also future dot improvements i.e `"1.5.342"`
> 2. Or established a convention that for release numbers smaller than 1, the decimal portion specifies the draft i.e `"version": 0.03` implies draft-03.

This is **directly motivated by the upcoming London interop**: with multiple implementations targeting different draft revisions of MSF/CMSF/LOC, the catalog `version` field's current `Number=1` (forward-looking to the RFC) gives no way for an interop endpoint to detect which draft the publisher is targeting. wilaw proposes either (a) `string` type with `"draft-NN"` semver-ish format, or (b) sub-1 decimal convention. **Carry-forward**: this is the **first MSF issue to explicitly reference the June interop as a forcing function** — pre-London editorial scope work is now visible.

**[PR #157](https://github.com/moq-wg/msf/pull/157)** ([[suhas-nandakumar]] Group numbering restarts) — [[will-law]] May 15 **10:03 UTC** comment: *"What if we said 'each subsequent Group ID SHOULD increase by 1. Any intentional gaps MUST be signaled using the MOQT Prior Group ID Gap Extension header.'?"* — proposes tying MSF group-numbering rules to **the MOQT Prior Group ID Gap Extension**, formalizing the gap-signaling path. Suhas review iteration ongoing.

**[MSF Issue #162](https://github.com/moq-wg/msf/issues/162)** (transferred from moq-transport #1631 May 14) and **[loc Issue #20](https://github.com/moq-wg/loc/issues/20)** (cross-spec Properties collision) both **no activity** in the window. The cross-spec coordination Issue #1632 → LOC-new-draft remains the open-ended item for London.

## google/quiche moqt — martinduke continues structural refactor (9th commit in 4 days)

**[3d089cb](https://github.com/google/quiche/commit/3d089cb)** May 15 **16:07 UTC** by [[martin-duke]] — *"Create OutgoingFetchStream and factor out OutgoingUniStream as a parent of both data stream types. PiperOrigin-RevId: 916033776"*. **9th moqt commit in 4 days** (May 12 → May 15) — the OutgoingDataStream / OutgoingSubgroupStream cleanup (May 14) → OutgoingFetchStream + OutgoingUniStream parent class hierarchy now in place. Pattern: martinduke is establishing **a clean class hierarchy for outgoing streams** ahead of FETCH wire-format implementation, mirroring the kind of refactor needed to support draft-18's split-out FETCH semantics.

vasilvv quiet on the moqt subdir May 15 after the May 13 *"Use new MOQT control message parser API directly"* commit.

## Eyevinn/moqlivemock — **3 PRs MERGED by tobbee (wiki owner) in one day; LOCMAF tooling lands**

Pre-London preparation push by the wiki owner himself: **[[tobbe-einarsson|tobbee]] merges 3 PRs May 15 09:36 UTC → 19:37 UTC** consolidating LOCMAF tooling:

- **[PR #81](https://github.com/Eyevinn/moqlivemock/pull/81)** MERGED May 15 **09:36 UTC** (+2115/−61) — *"LOCMAF: encoder/decoder fixes, roundtrip CLI, and design doc"*. Three commits bundled:
  - **`fix: improve locmaf encoder/decoder`** — tfhd `Has*()` gating, signed `elst.media_time`, stpp/wvtt subtitle sample entries, `track_id` propagation, skip-and-log for unknown LOCMAF object header IDs, absolute `moofBaseMediaDecodeTime` override on BMDT discontinuity.
  - **New `cmd/locmaf roundtrip` CLI** for round-trip testing.
  - **LOCMAF design document** documenting the wire format.
- **[PR #82](https://github.com/Eyevinn/moqlivemock/pull/82)** MERGED May 15 **16:45 UTC** (+70/−3) — *"LOCMAF: catalog locmafVersion field and correct bitrate reporting"*. Adds an explicit **`locmafVersion`** field to the CMSF catalog when `packaging == "locmaf"`, since the LOCMAF wire format is **still evolving** and recent changes are behavioural rather than additive (e.g., the absolute `moofBaseMediaDecodeTime` override on field ID 10 with new semantics).
- **[PR #83](https://github.com/Eyevinn/moqlivemock/pull/83)** MERGED May 15 **19:37 UTC** (+144/−4) — *"fix: report LOCMAF wire bitrate correctly in CMSF catalog"*. Catalog generation was reporting CMAF wire bitrate for LOCMAF tracks — example: **128 kbps AAC at one-sample-per-object was reporting 171.5 kbps** in the catalog instead of the realistic ~131.9 kbps. New `internal.calcLocmafBitrate` measures one full + one delta LOCMAF object pair.

**Operational reading**: with the May 14 PR #79 (hugobjoers LOCMAF support, +2886/−83) plus the May 15 trio (+2329 net), moqlivemock has had **5 LOCMAF-focused PRs in 2 days totalling ~5215 lines added** — the LOCMAF protocol-tooling iteration has accelerated significantly into the pre-London window. The version-field PR #82 explicitly hedges *"the LOCMAF wire format is still evolving"* — signaling there will be more LOCMAF wire-format change before the June interop.

[[moqlivemock]] **now includes a LOCMAF roundtrip CLI** (`cmd/locmaf`), a documented design doc, accurate bitrate reporting, and explicit catalog-side version negotiation. This is **the most actively-developed publisher/subscriber pair** in the moq-llm-wiki tracking set this week.

**[Eyevinn/warp-player](https://github.com/Eyevinn/warp-player/pull/120) PR #120** (hugobjoers LOCMAF support, opened May 5) **still open**, updated May 15 19:36 UTC — the player-side LOCMAF integration lags moqlivemock by ~10 days.

## Implementations summary

- **cloudflare/moq-rs** — Day +33 main-quiet. PR #167 (Suhas filter-framework) untouched Day +6.
- **video-dev/moq-js** — no new commits since Feb 17.
- **birneee/quiche_moq** — no new commits since Mar 13.
- **Eyevinn/moqtransport** — no new commits since Apr 17.
- **moqtail/moqtail** — quiet (post-PR-193 release cycle, last activity May 13 morning release pipeline).

## IETF Datatracker — quiet since draft-18

No new revisions May 14–16. WG state: transport-**18** (Day +4), msf-00, loc-02, secure-objects-00, privacy-pass-02, cmsf-00. Notable individual: lite-04, subscribe-rewind-02, qlog-moq-events-06, nmsf-01, gregoire-moq-msfts-00 (May 6, **Day +10, still no on-list announcement**), englishm-cdn-provisioning-00, englishm-relay-dos-00, lcurley-compressed-mp4-00 (Mar 17, ingested May 15 supplemental).

## Interop runner status — **3 consecutive missed daily runs**

Latest reading still **19 / 72 / 14** at 2026-05-13 00:41:38 UTC. **No May 14, May 15, or May 16 daily run has published** as of this update — **3 consecutive missed cadences** since the [[mike-english]] 4-PR registry expansion at May 13 17:23–17:25 UTC. The 105-test baseline (predating the 11→15 role expansion) is structurally broken without a new run. Plausible causes remain (a) re-baselining for the new role count, (b) new-image CI gating, or (c) operator absence around the May 15 London-interim announcement work. The next run is now the structural-stability check: **(1) does it publish? (2) does the test count grow above 105?**

## MoQ Monthly — quiet

No new issue. Archive remains #0 (Mar 3) + #1 (Apr 30). **Day +16 since #1**.

## tobbee/moq-llm-wiki

No new open issues.

---

# Activity (May 14 09:00 UTC → May 15 09:00 UTC) — **interop-runner registry expands by 4; AWS lands in moq-dev/moq; post-draft-18 issue triage pattern emerges**

## Interop runner — 4-PR registry-expansion burst May 13 17:23–17:25 UTC

[[mike-english|englishm-cloudflare]] merged **4 long-pending interop-runner PRs in 2 minutes** late on May 13 (after the May 13 ~00:40 UTC daily run), the **largest single-day participant expansion of 2026**:

- **[PR #67](https://github.com/englishm/moq-interop-runner/pull/67)** MERGED May 13 **17:23:32 UTC** ([[giovanni-marzot]]) — *"Add aiomoqt (Python asyncio MoQT client) to implementation registry"*. **aiomoqt** is a Python asyncio MoQT client (separate from moqx; OpenMOQ stewardship via Giovanni).
- **[PR #66](https://github.com/englishm/moq-interop-runner/pull/66)** MERGED May 13 **17:24:28 UTC** ([[giovanni-marzot]]) — *"Add moqx client role"*. Adds the missing **moqx client image** alongside the already-registered moqx relay (PR #59 Apr 11). Multi-arch (`linux/amd64` + `linux/arm64`), FRA region. **First OpenMOQ-author merge into the registry after the May 9–10 fork incident** — i.e., normal operating mode restored.
- **[PR #63](https://github.com/englishm/moq-interop-runner/pull/63)** MERGED May 13 **17:25:14 UTC** ([[tobbe-einarsson|tobbee]] / Eyevinn) — *"Add moqlivemock (Eyevinn) as interop test client"*. Adds `mlmtest` from [[moqlivemock]] as both draft-14 and draft-16 client. **Day +31 from opening** (April 12) — longest-pending non-Luke interop-runner PR resolved.
- **[PR #65](https://github.com/englishm/moq-interop-runner/pull/65)** MERGED May 13 **17:25:58 UTC** (yuyou / Nokia) — *"Docker relay url support"*. Adds configurable `RELAY_URL` to the Docker test harness so Nokia's v17 in-house implementation can target the same matrix.

**Effect on matrix**: participant count expanded from 11 to **15 registered roles** (adding mlmtest client, moqx client, aiomoqt client, and the Docker relay-URL plumbing that lets Nokia's server slot in). This is the **first expansion of the matrix since moqx relay landed Apr 11** (PR #59). The carry-forward question is whether the May 14 / May 15 runs are stalled because the larger matrix is re-baselining, or because the addition introduced a regression — see "Interop runner status" below.

## moq-dev/moq — AWS lands; Luke breaks 5-day quiet with 4-PR review burst

After a **5-day commits-to-`main` silence** (May 9 22:30 UTC → May 14 16:45 UTC), [[luke-curley]] **merged 5 PRs in ~12 hours** May 14 16:45 UTC → May 15 04:37 UTC, clearing roughly half the external-contributor backlog from May 10–11:

- **[PR #1402](https://github.com/moq-dev/moq/pull/1402)** MERGED May 14 **16:45:43 UTC** (**SteveMcFarlin** — second commit ever, first merge) — *"moq-gst: Fix MoqSink CAPS handling and per-pad EOS aggregation"*.
- **[PR #1407](https://github.com/moq-dev/moq/pull/1407)** MERGED May 14 **16:59:46 UTC** ([[luke-curley|kixelated]]) — *"Bump package versions across JS packages"* with `Co-authored-by: Claude <noreply@anthropic.com>` trailer — **explicit visible Claude co-authorship line** on a moq-dev/moq commit (matches Luke's May 11 *"gotta queue up the Claude prompt"*).
- **[PR #1399](https://github.com/moq-dev/moq/pull/1399)** MERGED May 14 **17:00:58 UTC** (skirsten) — *"fix(watch): close MultiBackend's sync and sources"*.
- **[PR #1400](https://github.com/moq-dev/moq/pull/1400)** MERGED May 15 **04:37:10 UTC** (skirsten) — *"fix: stop leaking PromiseReactions in consumer loops"*. Release-bot **[PR #1391](https://github.com/moq-dev/moq/pull/1391)** *"chore(moq-lite): release v0.16.1"* opened by moq-bot May 15 04:39 UTC, still open as of this update.

**Headline event — AWS enters moq-dev/moq**: **[PR #1408](https://github.com/moq-dev/moq/pull/1408)** OPENED May 14 **18:20:14 UTC** by **ksletmoe-aws** (Kevin Sletmoe at AWS) — *"feat(moq-mux, libmoq): add CMSF muxer, demuxer, and C API"*, **+3891/−457** the **largest single PR to moq-dev/moq in 2026**. Contents:
- CMSF Broadcast Producer (`import/cmsf_broadcast.rs`) — multi-rendition publishing, group lifecycle, keyframe-aligned group boundaries
- CMSF Broadcast Consumer (demuxer)
- fMP4-to-CMSF bridge
- **C FFI bindings** — first C API surface for the moq-dev/moq stack (alongside the existing Rust+TypeScript)

This is the **first AWS contribution to moq-dev/moq on the wiki record** and brings moq-dev/moq's first-party packaging coverage to parity with the cloudflare/moq-rs stack on the CMAF/CMSF dimension. The corporate-contributor footprint for moq-dev/moq is now **Cloudflare** (Mike English review activity), **Nokia** (yuyou), **Eyevinn** (tobbee adjacent via [[moqlivemock]]), **OpenMOQ** (gmarzot via interop-runner), and now **AWS** (ksletmoe-aws via PR #1408).

Other open PRs in the May 14–15 window: PR #1404 (Qizot, *"Fix reading catalogs"*, updated May 14 16:58 UTC); PR #1405 (Karolk99, *"Declare solid-js as a peerDependency"*, opened May 14 20:58 UTC); PR #1401 (skirsten, video pacing rAF refactor); PR #1397/#1398 (metapox/Qizot).

## moq-transport — Post-draft-18 issue triage pattern emerges

[[alan-frindell]] and [[victor-vasiliev]] established the **post-draft-18 issue-routing pattern** in three actions on May 14:

- **Issue [#1632](https://github.com/moq-wg/moq-transport/issues/1632)** (cross-spec Properties Type collision) — [[alan-frindell]] May 14 **18:43:18 UTC**: *"The LOC authors will create a new loc draft, and update the appendix in moq to reflect it so we don't keep having this problem."* — concrete resolution path: **new LOC draft + moq-transport appendix sync** rather than reopening the draft-18 cut. Confirms the cross-spec coordination work item carries to the [[2026-06-09-london-interim]].
- **Issue [#1631](https://github.com/moq-wg/moq-transport/issues/1631)** (Track-level codec switching, yuanchao-chris May 13) — **TRANSFERRED to MSF as [Issue #162](https://github.com/moq-wg/msf/issues/162)** after [[victor-vasiliev]] May 14 **11:56 UTC** comment: *"I don't think we should allow, under any circumstances, for the codec of the active stream to change. ... Either way, this is an MSF issue, and not MOQT."* — proposes the *new-track-not-codec-switch* alternative. [[will-law]] confirms within MSF May 14 16:41 UTC: *"Within MSF, we also prefer to keep codec (and other track properties) consistent once declared. ... If the publisher needs to change the codec on a track, it can stop publishing the old track, begin publishing a new track..."* **First cross-spec issue transfer post-draft-18** — sets the precedent that codec/encoding choice questions belong to MSF, not MOQT.
- **Issue [#607](https://github.com/moq-wg/moq-transport/issues/607)** (*"Do we need Group Order for Subscriptions ?"*, Suhas Nov 2024, 18 months old) — [[alan-frindell]] May 14 **19:01:43 UTC**: *"Folks seems to have use cases for this. Closing."* — closed-as-keep without action. Long-dormant question resolved against removal, reflecting the broader "draft-18 baseline is the spec; design churn is future work" stance.

**Pattern**: WG editors are actively triaging-and-deferring rather than reopening MOQT debate. Issues route to (a) dependent specs (LOC, MSF), (b) future draft cycles, or (c) closed-as-keep. **PR #1476** (afrind delivery timeouts) was updated May 14 11:50 UTC and needs rework after PR #1605 landed (DELIVERY_TIMEOUT was split into OBJECT_DELIVERY_TIMEOUT + SUBGROUP_DELIVERY_TIMEOUT in draft-18) — first concrete editorial follow-up from the draft-18 cut.

## google/quiche moqt — 2 more commits May 14 22:49–23:03 UTC

[[martin-duke]] adds 2 more commits to the post-draft-18 push:

- **9c96a40** May 14 22:49 UTC — *"Refactor: Move OutgoingDataStream to a separate file and make the interfaces with PublishedSubscription explicit."*
- **6b1d73b** May 14 23:03 UTC — *"Cleanup OutgoingSubgroupStream. Make SendObjects() private, use OnCanWrite() for public calls. Update priority of active..."*

**8 commits in 3 days (May 12–14)** — now confirmed as the most concentrated quiche-moqt activity of 2026. Pattern: martinduke is taking the moqt subdir through a structural refactor (separate files, explicit interfaces, private/public boundary cleanup) immediately after the draft-18 cut, **with vasilvv joining the moqt subdir for the first time** (May 13 *"Use new MOQT control message parser API directly"*). Reads as a coordinated draft-18-implementation push, not just incremental work.

## Eyevinn moqlivemock — PR #79 LOCMAF MERGED May 14 08:08 UTC

**[PR #79](https://github.com/Eyevinn/moqlivemock/pull/79)** MERGED May 14 **08:08:57 UTC** ([[hugo-bjoers|hugobjoers]], **+2886/−83**) — *"Add LOCMAF support"*. **Largest moqlivemock PR of 2026**. Day +9 from opening (May 5). Brings LOCMAF (LOC profile for fMP4/MP4 packaging) to moqlivemock, matching the warp-player side of the same author's work ([Eyevinn/warp-player PR #120](https://github.com/Eyevinn/warp-player/pull/120) still open). [[moqlivemock]] now supports CMSF + MSF/LOC + LOCMAF + moq-mi packaging, a comprehensive coverage matrix for the upcoming London interop.

## moqtail/moqtail — quiet post-PR-193 release cycle

No new merges since the May 13 morning release pipeline run (PRs #195/#192/#196). **PR #170** (fatih-alperen, *"fixed a race condition that caused negative object deltas"*) had its `updated_at` touched May 13 08:43 UTC but the PR was closed unmerged back on April 8 — this was likely a comment-touch from the release tagging, not a new event. moqtail repository back in normal cadence following the [4/n] upstream FETCH series completion.

## Mailing list — Filters consensus engages, recharter goes Day +3 quiet

**7 messages May 14–15**, all on already-open threads:

- **[Moq] Re: Consensus call on Object filters** (Magnus Westerlund May 12) — **5 replies May 14** from Lorenzo Miniero, Luke Curley, Victor Vasiliev (×2), Mo Zanaty. **First substantive engagement on the May 26 consensus deadline thread.** Lorenzo's reply is notable as imquic's voice on object-filter complexity.
- **[Moq] Re: Joining FETCH Survey** (afrind May 11) — 2 replies May 14 from Luke Curley and Victor Vasiliev.
- **[Moq] Re: User case or question to Joining Fetch** (Yu You May 13) — Yu You **May 15** follow-up continues the use-case probe.

**No May 14–15 follow-up on** Will Law's *"[Moq] Proposal to recharter to include non-media use cases"* (Day +3 since May 12 open, post-IAB-burst) or martinduke's *"[Moq] On other use cases"* thread. **Pattern**: filters consensus is now the active on-list workstream; recharter has gone into off-list cooling. **No Weekly GitHub digest** May 14 or 15 (last digest May 10).

## Slack — channel-join uptick

Only message in the window: **Dragana Damjanovic (Mozilla) May 14 18:09 CEST** joined `#moq`. **First Mozilla-affiliated public join to `#moq`** since the wiki started tracking (Dragana is well-known in QUIC circles via Neqo); reads as Mozilla observation interest given the draft-18 + recharter activity. No other channel activity. `#moq-rs`, `#moq-js`, `#libquicr`, `#moq-interop-runner` all quiet.

## IETF Datatracker — quiet since draft-18

No new revisions May 13–15. WG state: transport-**18** (Day +3), msf-00, loc-02, secure-objects-00, privacy-pass-02, cmsf-00. Notable individual: lite-04, subscribe-rewind-02, qlog-moq-events-06, nmsf-01, gregoire-moq-msfts-00 (May 6, **Day +9, still no on-list announcement**), englishm-cdn-provisioning-00, englishm-relay-dos-00.

## Interop runner status — May 14 / May 15 runs missing

Latest reading remains **19 / 72 / 14** at 2026-05-13 00:41:38 UTC (note: the May 13 wiki entry recorded this as `19 / 71 / 14`; the actual results page shows `19 / 72 / 14`, total 105). **No May 14 or May 15 daily run has published to the GitHub Pages site as of this update — 2 consecutive missed runs.**

The 2-day gap aligns precisely with [[mike-english]]'s **4-PR registry expansion at May 13 17:23–17:25 UTC**. Plausible causes: (a) the now-15-role matrix is re-baselining and the cadence is paused intentionally, (b) a new image build is failing CI and the run is gated on that, (c) Mike is offline and the runner hasn't auto-recovered. **Carry-forward**: a successful May 16 run with **higher total-tests count** would confirm the matrix has expanded; the 105-test baseline has held since pre-May 5 (matched the original 11-role registry). If the May 16 run is also missing, the cadence is structurally broken and needs intervention.

---

# Activity (May 13 06:00 UTC → May 14 09:00 UTC) — **first post-draft-18 cross-spec collision flagged**

## moq-transport + LOC — yuanchao-chris files twin cross-spec collision issues

**14 hours after draft-18 publication**, **yuanchao-chris** (no prior repo history before May 5, his **2nd new issue in 2 days** after [Issue #1631](https://github.com/moq-wg/moq-transport/issues/1631) on May 13) opens twin issues May 14 **03:18 UTC** (LOC) and **03:24 UTC** (moq-transport) reporting that **draft-ietf-moq-transport-18 §15.8-2 and draft-ietf-moq-loc-02 assign different Property Type IDs to the same property names**:

- **[moq-transport Issue #1632](https://github.com/moq-wg/moq-transport/issues/1632)** — *"MOQ-18: Properties Type collision with LOC-02"*
- **[moq-wg/loc Issue #20](https://github.com/moq-wg/loc/issues/20)** — *"LOC-02: Properties Type collision"*

The concrete diff table from yuanchao-chris:

| Property | LOC-02 (commit history) | MOQ-18 §15.8-2 |
|---|---|---|
| TIMESTAMP | 0x02 | 0x06 |
| TIMESCALE | (not used) | 0x08 |
| AUDIO_LEVEL | 0x06 | 0x0C |
| VIDEO_FRAME_MARKING | 0x04 | 0x0A |
| VIDEO_CONFIG | 0x0D | 0x0D |

**This is the first ever cross-spec collision flagged on both repos simultaneously by the same author** — [[issue-1550]] (April 16, 2026, also yuanchao-chris on LOC) was a one-sided LOC filing.

**Context for the failure**: [PR #1624](https://github.com/moq-wg/moq-transport/pull/1624) MERGED April 30, 2026 — *"provisional IANA registry for LOC properties"* by [[alan-frindell]] — was specifically intended to resolve [[issue-1550]] by establishing a registry of LOC property IDs. However, **draft-18 §15.8-2 went out using a *different* assignment** than what LOC-02's commit history records. So either (a) PR #1624's registry was not synced into the editor's draft-18 cut, or (b) the registry is correct and LOC-02's source needs updating but the LOC editors have not yet done so.

**Carry-forward**: Either way, **two published WG documents (draft-ietf-moq-transport-18 and draft-ietf-moq-loc-02) now diverge on assigned IANA-style codepoints**. WG editorial coordination between moq-transport and LOC is now a visible item for the [[2026-06-09-london-interim]].

## moq-transport — In-band codec switching design conversation (Issue #1631)

[Issue #1631](https://github.com/moq-wg/moq-transport/issues/1631) (yuanchao-chris May 13 02:23 UTC) generates the first concrete post-draft-18 design exchange:

- **[[alan-frindell]] May 13 05:11 UTC**: *"Seems like you could have the publisher make a new group in an ongoing track, and include codec information on properties communicated on Object 0 in the new group - or the Object 0 payload. Would something like that work?"*
- **yuanchao-chris May 13 09:23 UTC**: *"yes, this can work in stream mode. now we use datagram mode, the new codec information is added in object properties, and at subscriber side, we also add a 'ACK' semantics (use REQUEST_UPDATE) to tell publisher stop add the property"* + notes that [[moq-msf]] §5.1.24 catalog track information also needs updating to align.

This is the **first MoQ design issue actively progressed in the post-draft-18 window** — substantive enough to expose an unaddressed gap (in-band codec migration semantics for both stream and datagram modes, analogous to WebRTC PT change within an SSRC). The fact that a brand-new external contributor is driving design conversations day +1 of a new draft is a healthy WG-engagement signal — but also exposes that H265→H264 / AV1→H264 in-band migration was not addressed in the draft-18 cut.

## moq-wg/msf — 3-PR / 3-issue cleanup sequence May 13

Largest MSF main-advancement single-day in 2026:

- **[PR #158](https://github.com/moq-wg/msf/pull/158)** MERGED May 13 **10:30 UTC** ([[suhas-nandakumar]], +72/−81) — *"Replace delta update fields with ordered operations array"*. **Closes Issue #145** (Luke Curley March 1, *"Ordering of delta updates"*) — long-standing catalog-update ordering question.
- **[PR #161](https://github.com/moq-wg/msf/pull/161)** MERGED May 13 **18:43 UTC** ([[will-law]], +6/−1) — *"Update overlapping presentation time requirement"*. **Closes Issue #155** (Luke Curley April 22, *"Sequence aligned groups are too restrictive"*) — relaxes alignment constraint to overlapping-presentation-time.
- **[PR #133](https://github.com/moq-wg/msf/pull/133)** MERGED May 13 **18:42 UTC** ([[suhas-nandakumar]], +184/0) — ***"Add SCTE-35 support and CEA-608/708 accessibility fields"*** — **the long-debated event-timeline PR**, open since January 30, with 4 prior debate cycles (April 22 ContentProtection-and-Captions split, May 8 avelad split-into-3-PRs, May 8 wilaw/gwendalsimon event-timeline restructuring, May 11 Suhas's *"I do have initial drafts on..."*). **Closes Issue #95** (avelad Jan 29 close captions support).

The PR #133 outcome confirms the editorial direction: the **wilaw May 8 split-out-event-timeline-drafts proposal is future work, not blocking-merge work** — MSF is consolidating before the London interim, not expanding. The pre-staged draft text Suhas hinted at on May 8 (*"I do have initial drafts on..."*) will be spun out as separate Event-Timeline drafts in future cycles, not as MSF restructuring.

Still open (Suhas review iteration): PR #156 (Object-Stream mapping implementation-specific, updated May 13 16:27 UTC); PR #157 (Group numbering restarts, updated May 13 21:45 UTC); PR #159 (catalog compression via Track Properties — renamed from "track name suffix", updated May 14 05:42 UTC). vasilvv Issue #153 (*"`initTrack` does not work"*) updated May 14 05:46 UTC.

## Mailing list — Yu You (Nokia) opens Joining FETCH thread

**Yu You (Nokia) May 13** opens *"[Moq] User case or question to Joining Fetch"* — followed by **4 same-day replies** from **Will Law**, **Zafer Gurel**, **Mo Zanaty**, **Will Law** (second reply). First Nokia-driven on-list contribution since Yu You's May 8 3GPP SA4 Montreal conferencing PoC announcement (FS_Q4RTC_MED study, S4-261065). The thread surfaces a use-case question on Joining FETCH semantics, complementing the broader Joining FETCH design debate carried forward from afrind's May 11 *"[Moq] Joining FETCH Survey"* and Mo Zanaty's May 12 *"[Moq] Re: On other use cases"* threads.

**[[luke-curley]] May 13** replies on *"[Moq] Re: Consensus call on Object filters"* (Magnus's May 12 consensus call). Two-week consensus period (through May 26) running.

**Will Law's recharter thread shows no May 13/14 follow-up** — Day +2 silence after the May 12 IAB cross-WG burst (Hardie / Huitema / Barnes / Duke / Zanaty). May indicate the cross-WG response was load-balanced into individual side-channel conversations rather than continuing the on-list thread.

## google/quiche moqt — 4-commit May 13 burst continues draft-17/18 push

After the May 12 2-commit start (martinduke *"Remove PUBLISH_OK message"* + *"Allow fragmented MOQT object payloads"*), May 13 adds 4 more:

- **vasilvv** *"Use new MOQT control message parser API directly"* — **first vasilvv commit to the `quiche/quic/moqt` directory** on the wiki record (vasilvv is co-author of draft-ietf-moq-transport; previously committing to control message parser code outside the moqt subdir).
- **asedeno** *"Fix OSS QUICHE build"* — open-source build fix following the API churn.
- **martinduke** *"Fix ASAN/MSAN errors in MoqtSessionTest and MoqtTrackTest"* — test hardening.
- **martinduke** *"Fix an issue from AI review of cl/914368728"* — **first explicit *"AI review"* commit message** in any wiki-tracked MoQ repo. Google's internal AI code review tooling flagged an issue in cl/914368728; martinduke's fix-up commit acknowledges the tooling-driven change.

Pattern observation: AI-tooling is now visibly in the loop in MoQ implementation across the ecosystem — Google AI review (this commit), Luke Curley's Claude orchestration at moq-dev/moq (*"gotta queue up the Claude prompt"*, May 11), Giovanni Marzot's *"over zealous claude perhaps"* / *"claude overstepped"* at OpenMOQ (May 9–10).

**6 commits in 48 hours** is the most concentrated quiche-moqt activity since March 2026, all post-draft-18-publication. quiche-moq remains the dominant draft-18 implementation push.

## moqtail/moqtail — Post-PR-193 release pipeline May 13 08:41–08:44 UTC

After [PR #193](https://github.com/moqtail/moqtail/pull/193) ([4/n] upstream FETCH on cache miss) MERGED May 11 22:37:32 UTC, the auto-release pipeline ran May 13 morning:

- **PR #195** MERGED May 13 08:41 UTC (zafergurel, docs +64/0)
- **PR #192** MERGED May 13 08:42 UTC (release-bot)
- **PR #196** MERGED May 13 08:44 UTC ([ci] release)

Release bundles the completed upstream-FETCH-on-cache-miss series ([N/n] PRs #186/#187/#188 May 6 + #193 May 11). No new sharmafb work since.

## moq-dev/moq — Day +5 main-quiet

No commits to `main` since [[luke-curley]]'s May 9 22:30 UTC PR #1393 merge. 5 external-contributor PRs from May 10–11 still open with no Luke review activity visible: skirsten #1399/#1400/#1401, SteveMcFarlin #1402, Qizot #1398. Luke remains in Claude-orchestration / Town-Hall-recovery mode.

## cloudflare/moq-rs — Day +31 main-quiet

PR #167 ([[suhas-nandakumar]] filter-framework, +12163/−2197) untouched since May 10 05:03 UTC — Day +4. Suhas's May 13 effort went entirely to MSF (3 PRs reviewed / merged / iterated), not moq-rs.

## Slack `#moq` — 3 thread replies on draft-18 announcement

- **Paul Gregoire (mondain) May 13 05:59 CEST**: *"Is moqx already supporting it? I suppose I should already know the answer..."*
- **[[alan-frindell]] May 13 06:48 CEST**: *"lol no."*
- **[[alan-frindell]] May 13 06:48 CEST**: *"Goal is interop in London"*

**afrind's response is the explicit confirmation that no implementation is draft-18-ready and the June 9–10 London interop is the formal interop target.** Paul Gregoire's probe is the first non-OpenMOQ-author public reference to OpenMOQ moqx draft-18 status; afrind's "lol no" answer doubles as commentary on OpenMOQ's velocity expectations post-NAB.

## Datatracker — quiet since draft-18

No new draft revisions since draft-ietf-moq-transport-18 (May 12). gregoire-moq-msfts-00 (May 6) still has no on-list announcement (Day +8). Notable individual draft baseline: lite-04, subscribe-rewind-02, qlog-moq-events-06, nmsf-01, englishm-cdn-provisioning-00, englishm-relay-dos-00.

## Interop runner — no May 14 run

Latest reading remains **19 / 71 / 14** at 2026-05-13 00:41:38 UTC. The ~00:40 UTC daily run for May 14 has not yet published to the GitHub Pages site as of this update. The May 14 reading will be the first matrix snapshot that *could* reflect a `quiche-moq` image rebuild post-May 13 quiche-moqt commits (PUBLISH_OK removal is wire-format-affecting); if the auto-rebuild propagates, expect potentially larger movement than the +1/−1 daily variance the matrix has been showing.

---

# Activity (May 12 01:00 UTC → May 13 06:00 UTC) — **draft-18 published; Will Law proposes recharter to non-media**

## IETF Datatracker — **draft-ietf-moq-transport-18 PUBLISHED May 12, 2026**

After the May 11 6-PR editorial merge sprint assembled draft-18 candidate text on `main`, **[draft-ietf-moq-transport-18.txt](https://datatracker.ietf.org/doc/draft-ietf-moq-transport/18/) was published to the IETF Datatracker May 12, 2026** — the long-anticipated cut. **[[alan-frindell]] May 13 01:15 CEST** in `#moq`: *"It's heeeeere [datatracker.ietf.org/doc/draft-ietf-moq-transport/18/]"*. The "[Moq] I-D Action: draft-ietf-moq-transport-18.txt" notification hit the mailing list May 12.

Two further merges on May 12 (after the May 11 sprint) brought additional draft-18 substance to `main` immediately ahead of the cut:

- **[PR #1605](https://github.com/moq-wg/moq-transport/pull/1605)** MERGED May 12 23:04:53 UTC (vasilvv, +114/−76) — *"Split DELIVERY_TIMEOUT into two types of timeout"*. Splits the existing `DELIVERY_TIMEOUT` into `OBJECT_DELIVERY_TIMEOUT` (semantically equivalent, more precisely defined) + new `SUBGROUP_DELIVERY_TIMEOUT` (covers subgroups fully queued but not fully delivered). **Closes Issue #667** ("DELIVERY_TIMEOUT is unimplementable", [[martin-duke]], long-running 2024 design issue). Issue #667 CLOSED May 12 23:04:54 UTC.
- **[PR #1625](https://github.com/moq-wg/moq-transport/pull/1625)** MERGED May 12 20:02:18 UTC ([[suhas-nandakumar]], +118/−7) — *"Improve Security Considerations section"*. Adds fixes and additions to [[magnus-westerlund]]'s long-parked PR #1455. **Closes Issue #783** ("Missing aspects in the security consideration section", gloinul). Issue #783 CLOSED May 12 20:02:20 UTC, PR #1455 CLOSED in favor of this rebase.
- **[PR #1630](https://github.com/moq-wg/moq-transport/pull/1630)** MERGED May 12 23:07:53 UTC ([[alan-frindell]], +59/0) — *"Draft 18 release notes"*. Body literally: *"Behold"*. The final release-notes commit on `main` immediately before the datatracker cut.

The cut sequence is now visible end-to-end: **May 11 21:32–22:02 UTC** = 6-PR editorial sprint (PR #1544 + #1615 + #1617 + #1618 + #1621 + #1629); **May 12 20:02 → 23:07 UTC** = 3 final merges (PR #1625 Security Considerations, PR #1605 DELIVERY_TIMEOUT split, PR #1630 release notes); **May 12 ~23:30 UTC** = datatracker upload; **May 13 01:15 CEST** = afrind announcement on Slack.

### moq-transport draft-18 — Abstract change

The draft-18 abstract was rewritten to emphasize protocol generality over media-specificity: *"Despite its name referencing media, the specification emphasizes that MOQT remains content-agnostic and applicable across various use cases."* This is the spec-side framing that lands within a day of Will Law's recharter proposal (see below).

### moq-transport — Open Issues / PRs post-draft-18

- **[Issue #1631](https://github.com/moq-wg/moq-transport/issues/1631) OPENED May 13 02:23 UTC** by **yuanchao-chris** (**0 prior issues, new contributor**) — *"Track-level codec switching semantics"*. Notes that a MoQ Track is generally assumed to carry a stable codec configuration, but real-world RTC needs in-band codec migration (H265→H264, AV1→H264). In WebRTC this is handled via PT change inside the same SSRC. Asks whether codec reconfiguration can happen in-band within an existing Track. **[[alan-frindell]] May 13 05:11 UTC reply**: *"Seems like you could have the publisher make a new group in an ongoing track, and include codec information on properties communicated on Object 0 in the new group - or the Object 0 payload. Would something like that work?"* — first concrete answer to in-band codec switching, day +1 of draft-18.
- **[Issue #1614](https://github.com/moq-wg/moq-transport/issues/1614)** ((JOINING) FETCH + SUBSCRIBE prioritization, [[luke-curley]]) — kixelated re-pinged May 13 00:09 UTC.
- **[PR #1476](https://github.com/moq-wg/moq-transport/pull/1476)** (afrind, Feb 9 — *"Delivery timeouts are both Track and Object Properties"*) — updated May 13 00:07 UTC; the OBJECT_DELIVERY_TIMEOUT side of vasilvv's PR #1605 has now landed, so this older parallel PR will need rework.
- **[PR #1628](https://github.com/moq-wg/moq-transport/pull/1628)** (afrind, QMux framing for moqt-18 over TLS+TCP) — updated May 12 20:40 UTC, still open after draft-18 cut. afrind's May 11 22:53 UTC `#moq` confirmation (*"For anyone interested in draft-18 interop over QMux, we intend to use qmux-01 framing"*) stands; this PR is the spec-side anchor for QMux interop at the **June 9–10 London interop** (afrind May 12 00:56 CEST `#moq`: *"interop is 6/9-10"*).
- **[PR #1627](https://github.com/moq-wg/moq-transport/pull/1627)** ([[ian-swett]], *"SUBSCRIBE with Joining Fetch"*, +44/−139) — still open Day +10. The alternative being surveyed by afrind's Joining FETCH Survey.
- **[PR #1607](https://github.com/moq-wg/moq-transport/pull/1607)** (vasilvv, *"Largest Available Group filter"*) — updated May 12 20:03 UTC. The Magnus Object-Filters consensus call (see below) explicitly cites this PR.
- **[PR #1604](https://github.com/moq-wg/moq-transport/pull/1604)** (martinduke, *"Joining FETCH with subscription"*) — updated May 12 20:03 UTC.

## Mailing list — Will Law proposes RECHARTER to include non-media use cases

The most consequential mailing-list event since the WG was chartered in August 2022: **Will Law (Akamai) May 12 posted *"[Moq] Proposal to recharter to include non-media use cases."*** The post argues that the resulting MOQT protocol is *"payload-agnostic by design"* and has demonstrated applicability beyond media, so the charter should reflect actual usage patterns. The proposed expanded use-case list:

- **AI inference and machine learning interfaces**
- **Sensor and telemetry data distribution**
- **UAV command-and-control systems**
- **Financial market data feeds**
- **AR/VR input and output transmission**

Will emphasises this requires **no changes to MOQT itself and no compromise of its low-latency media capabilities**; the protocol mechanisms remain unchanged. Application-specific schemas (drone commands, market formats) would remain outside MoQ's scope, handled by the relevant communities. The expanded charter explicitly states the solution will be *"implementable in both browser and non-browser endpoints"* and support diverse payload types.

**Same-day responses (May 12)** — the proposal triggered an unusually broad cross-section of IETF response:

- **Ted Hardie** (long-time IAB veteran)
- **Christian Huitema** (former QUIC WG co-chair / IAB)
- **Richard Barnes** (Cisco, ex-IETF Security AD)
- **Martin Duke** (ex-TSV AD, current WG editor)
- **Mo Zanaty** (Cisco, MoQ WG participant)

**This is the first time non-MoQ-regulars from the broader IETF (Hardie, Huitema, Barnes) engage on a MoQ recharter thread on-list** — implying the proposal has carried beyond the MoQ WG's usual perimeter. The thread is the headline post-draft-18 discussion item.

The recharter direction is consistent with the **draft-18 abstract change** (see above) emphasising MOQT's content-agnostic nature, and with martinduke's parallel **"[Moq] On other use cases"** thread (May 11/12). The protocol-side framing and the WG-charter framing landed within 24 hours of each other.

## Mailing list — Magnus Westerlund opens 2 consensus calls on filters

**[[magnus-westerlund]] (Ericsson, WG chair) May 12** opened two filter-related consensus calls on-list, splitting the lukewarm meeting-poll signal into separate questions:

### Consensus call on Object Filters (May 12 → May 26 deadline)

Magnus references **PR #1518** (mzanaty, *"Filters with reduced scope, no location or group filter"*) and announces a **two-week consensus call** on whether to include **Object Filters** in the MOQT specification. Background per Magnus: *"The chairs noted that yesterday's meeting showed a good indication of there being a rough consensus for including the Object Filters part. However, the top-n track filters portion generated mixed responses requiring separate discussion."*

Key parameters:
- Object Filters support would be **optional**
- Implementers can indicate maximum filter capacity
- Consensus period runs **through May 26**

Response template (Supporting / Not Supporting + Comments).

### Support for Track Filters and Top-N (May 12, separate thread)

Magnus's parallel post on track filters and top-N functionality. The meeting poll was **7-7 (numerous support and equal opposition)**, with confusion about whether concerns centered on top-N specifically or on track filters more broadly when used with SUBSCRIBE_NAMESPACE requests. Magnus posed two questions:

1. Support for **track filters without top-N**?
2. Support for **track filters with top-N**?

Considerations to weigh: alignment with chartered use cases, MOQT completion timeline, security considerations, potential to **divide filters into core functionality vs optional extensions** — first explicit WG-chair framing of the filters-as-extension-point pattern.

**Mo Zanaty replied same-day** on the Track Filters / Top-N thread.

### Meeting cut short (May 12)

Magnus also posted a brief explanatory message: *"For your information, yesterday's abrupt ending was the result of an erroneous configuration change on Meetecho's side. This have now been addressed and should not occur next meeting."* — confirms the **May 12 MOQ Town Hall ended abruptly on Meetecho mis-configuration** (afrind May 11 20:01 CEST hinted at this with *"Brutally killed by meetecho!"*).

## Slack `#moq` — quiet day-of-Town-Hall through draft-18 announcement

Only **2 Slack `#moq` posts** in the May 12 01:00 UTC → May 13 06:00 UTC window, both from [[alan-frindell]]:

- May 12 00:53 UTC: *"For anyone interested in draft-18 interop over QMux, we intend to use qmux-01 framing."*
- May 13 01:15 CEST (May 12 23:15 UTC): *"It's heeeeere [datatracker.ietf.org/doc/draft-ietf-moq-transport/18/]"*

`#moq-rs`, `#moq-js`, `#libquicr`, `#moq-interop-runner` all unchanged. The Town Hall itself was external (Dan Rayburn LinkedIn event); WG-internal Slack chatter went silent during the meeting and resumed only with the draft-18 announcement late at night EU time.

## moq-wg/msf — Suhas continues, Will adds Suhas to authors list

After Suhas's May 11 22:21–23:08 UTC 4-PR burst (#156–159, see prior section), May 12–13 saw incremental review activity on all 4 PRs (Suhas reading review comments; no merges yet). Additionally:

- **[PR #160](https://github.com/moq-wg/msf/pull/160)** OPENED + MERGED May 12 12:30 UTC ([[will-law]]) — *"Add Suhas Nandakumar to the authors list"*. **Formalises [[suhas-nandakumar]] as co-author of MSF** alongside [[will-law]]; Suhas had been operating as de-facto co-editor (most PRs in 2026) but was not in the front-matter until now. First MSF author-list change of 2026.
- **[Issue #93](https://github.com/moq-wg/msf/issues/93)** ("Need of the Parent name", yekuiwang) — CLOSED May 12 12:32 UTC by wilaw.
- **[Issue #100](https://github.com/moq-wg/msf/issues/100)** ("How to get the latest full catalog", gwendalsimon) — CLOSED May 12 11:02 UTC.
- **[Issue #111](https://github.com/moq-wg/msf/issues/111)** ("Advertising from offsite", wilaw) — CLOSED May 12 10:59 UTC.

Will Law in **MSF issue-grooming mode** May 12 morning EU: 3 issues closed in 4 minutes, plus authors-list update merged 90 minutes later. Consistent with pre-draft-18-cut housekeeping on dependent drafts.

## Implementations — first cross-impl draft-18 motion

### google/quiche moqt — **2 commits May 12 prepping for draft-17/18**

After 7 days of quiet (last May 5), **[[martin-duke]] landed 2 commits to `quiche/quic/moqt` on May 12**:

- **May 12 14:23 UTC**: *"Remove PUBLISH_OK message"* — commit message: *"This message type is going away (in favor of REQUEST_OK) and we currently don't support PUBLISH anyway. **Part of implementing draft-17/18 PUBLISH in draft-16**."* — first **explicit draft-17/18 PUBLISH implementation work in quiche moqt**, matching the spec-side change in moq-transport PR #1611 (merged Apr 29, removed PUBLISH_OK message type code point).
- **May 12 17:52 UTC**: *"Allow fragmented MOQT object payloads. MoqtOutgoingQueue does not create objects in fragments, but MoqtLiveRelayQueue should be prepared to accept them."* — relay-side robustness fix.

This is **the first implementation activity directly cited as draft-17/18 work** in any wiki-tracked repo, landing the same day as draft-18 publication.

### moqtail/moqtail — track forwarding preference removed

- **[PR #194](https://github.com/moqtail/moqtail/pull/194)** MERGED May 12 20:00 UTC ([[zafergurel]], +27/−52) — *"refactor: remove track forwarding preference. In Draft-16, track forwarding preference was removed. It is carried in the object header. This PR removes the dead code related to track forwarding preference and renames the client arguments."* Brings moqtail fully in line with draft-16 wire format.
- **[PR #192](https://github.com/moqtail/moqtail/pull/192)** (github-actions [ci] release) updated May 12 20:01 UTC.
- **[PR #195](https://github.com/moqtail/moqtail/pull/195)** OPENED May 12 21:17 UTC ([[zafergurel]], +64/0) — *"docs: Update contributing guidelines and rules"*.
- **[Issue #148](https://github.com/moqtail/moqtail/issues/148)** ("Sketch for FETCH upstream handling", sharmafb) — CLOSED May 11 22:39 UTC, completing the [N/n] upstream-FETCH series.

### moq-dev/moq — Day +3 main-quiet, open-PR queue holds at ~12

No new Luke commits to `main` since May 9 22:30 UTC. The 5 external-contributor PRs from the May 10–11 wave (SteveMcFarlin #1402, skirsten #1399/#1400/#1401, Qizot #1398) all open, with skirsten PR #1400 updated May 12 06:43 UTC and PR #1402 updated May 12 03:48 UTC. **No Luke review activity visible May 12** — consistent with afrind's May 11 22:56 UTC *"gotta queue up the Claude prompt"* / Luke "in Claude orchestration mode" reading.

### Eyevinn/moqlivemock — CENC fix lands; LOCMAF PR still open

- **[PR #80](https://github.com/Eyevinn/moqlivemock/pull/80)** MERGED May 12 08:02 UTC — *"fix(cenc): chain IV across CMAF fragments to avoid reuse"*. CENC IV-reuse safety fix for the encrypted-CMAF demo paths.
- **[PR #79](https://github.com/Eyevinn/moqlivemock/pull/79)** (LOCMAF) updated May 12 11:11 UTC, still open Day +6.

### Eyevinn/warp-player — LOCMAF PR + dependabot burst pending

PRs #121–127 (dependabot bumps from May 11 23:33–23:35 UTC) all still open. LOCMAF PR #120 unchanged Day +6.

### cloudflare/moq-rs — Day +30 main-quiet

**PR #167** ([[suhas-nandakumar]] filter-support framework, +12163/−2197) **untouched since May 10 05:03 UTC**. Suhas's May 12 effort went entirely into the MSF and moq-transport security-considerations side, not into iterating on the moq-rs filter framework. With Magnus's May 12 Object Filters consensus call running through May 26, PR #167 is the implementation-side anchor of the spec-side filter debate but is currently stalled.

### Other implementations — quiet

- video-dev/moq-js: No new commits since Feb 17.
- birneee/quiche_moq: No new commits since Mar 13.
- Eyevinn/moqtransport: No new commits since Apr 17.

## Interop runner — back below the post-PR-#145 floor

**19 / 71 / 14 at 2026-05-13 00:41:38 UTC** (105 total) — **−1 pass / +1 fail vs May 12** (20/71/14). The post-PR-#145 floor of 20 has now been **breached on the downside**: this is the first 19-reading since May 8.

Walking arc since Apr 17:
22 → 23 → 22 → 23 → 23 → 23 → 24 → 25 → 24 → 24 → 20 → 20 → 20 → 20 → **19** → 20 → 20 → 21 → 20 → **19**.

**Plausible drivers**: the May 12 google/quiche moqt commits ("Remove PUBLISH_OK", "Allow fragmented MOQT object payloads") landed at 14:23 UTC and 17:52 UTC respectively — well before the May 13 00:41 UTC interop run cutoff — so any `quiche-moq` docker image rebuild against the new code would have been picked up. The PUBLISH_OK removal is a wire-format-affecting change, so any pair (quiche-moq vs anything-else) that had been passing on the PUBLISH_OK code point could be expected to flip. moqtail PR #194 (remove track forwarding preference) merged May 12 20:00 UTC — also pre-cutoff, potentially affecting moqtail-relay pair results.

**Pattern check**: the interop matrix has been at 20±1 for **9 of 10 May-weekday readings** since May 5 — completely insensitive to the moq-transport editorial activity above. With draft-18 now published, the spec-vs-implementation gap is at its widest: draft-18 just landed but no implementation tracks it; meanwhile the matrix is testing draft-16 + draft-14 only.

## MoQ Monthly + wiki — quiet

- **MoQ Monthly**: No new issue. Archive remains **#0 (Mar 3) + #1 (Apr 30)**. Day +13 since #1.
- **tobbee/moq-llm-wiki**: No new open issues.

---

# Activity (May 11 12:00 UTC → May 12 01:00 UTC)

## moq-wg/moq-transport — **6 PRs MERGED in 30 minutes**, draft-18 editorial sprint lands ahead of Town Hall

The May 12 MOQ Town Hall (Dan Rayburn, 13:00 ET / 17:00 UTC) is **~17 hours away** as this update is written. In a single 30-minute window (**May 11 21:32–22:02 UTC**), [[alan-frindell]] merged **6 editorial PRs** into [moq-wg/moq-transport](https://github.com/moq-wg/moq-transport) `main` — the **largest single-sitting moq-transport editorial sprint in the wiki record**:

| Time (UTC) | PR | Title | Fixes | LOC |
|---|---|---|---|---|
| 21:32:51 | **[#1544](https://github.com/moq-wg/moq-transport/pull/1544)** | *Improve Startup Latency and 0-RTT* | #420, #8 | new sections on reducing startup latency and 0-RTT |
| 21:41:22 | **[#1615](https://github.com/moq-wg/moq-transport/pull/1615)** | ***Remove Required Request ID*** | **#1603** | Removes Required Request ID (keeps Request ID for individual-request operations). **Materializes Apr 27 interim consensus.** |
| 21:53:59 | [#1617](https://github.com/moq-wg/moq-transport/pull/1617) | *Allow GOAWAY on request streams to migrate individual requests* | #1481 | +85/−73 |
| 21:55:55 | [#1618](https://github.com/moq-wg/moq-transport/pull/1618) | *Add FIRST_OBJECT bit to SUBGROUP_HEADER type* | — | +22/−10 (bit 6 / 0x40) |
| 21:56:50 | [#1621](https://github.com/moq-wg/moq-transport/pull/1621) | *Forbid relays from lying about LARGEST_OBJECT* | #1386 | +8/−1 |
| 22:02:14 | [#1629](https://github.com/moq-wg/moq-transport/pull/1629) | *Clarify definition of scope* | #1432 | +7/−0 |

**PR #1615 is the headline merge** — it lands [[ian-swett]]'s Apr 27 interim consensus (*"remove required-request-id from draft 18 and fix Joining Fetch"*) into `main`. It **closes [Issue #1603](https://github.com/moq-wg/moq-transport/issues/1603)** (martinduke, Apr 10 — *"What is the use case for required-request-id"*) and forwards the remaining "explore dependency structures between requests" piece to **[PR #1519](https://github.com/moq-wg/moq-transport/pull/1519)** (vasilvv, *"Improve design of requests blocking on other requests"*). afrind's closing comment on #1603: *"This is now tracked in #1519"*.

This is the **first time** in 2026 that `main` advances 6 substantive PRs in one editorial sitting; afrind has been clearly waiting for this moment, with all 5 of the Apr 14–30 stack-of-PRs rebased + reviewed + green-lit overnight on May 10/11 so they could land in one sequence pre-Town-Hall.

### moq-transport — Open PRs still working draft-18 candidate text

After the merge sprint, the open PR queue narrows to 4 substantive editorial PRs + 2 surrounding "spinoff" PRs:

- **[PR #1628](https://github.com/moq-wg/moq-transport/pull/1628)** ([[alan-frindell]], May 11, +11/−7, `mergeable_state=clean`) — *"Add QMux framing for moqt-18 over TLS+TCP"*. Updated again **May 11 22:43 UTC** (after the merge sprint), folding in [[lucas-pardue]]'s May 11 01:57 UTC QMux ALPN-naming feedback. **Slack confirmation: [[alan-frindell]] May 11 22:53 UTC (00:53 CEST May 12)** in `#moq`: *"For anyone interested in draft-18 interop over QMux, we intend to use qmux-01 framing."* — first explicit `qmux-01` framing target announced for draft-18 interop.
- **[PR #1627](https://github.com/moq-wg/moq-transport/pull/1627)** ([[ian-swett]], May 3, +44/−139, `mergeable_state=unknown`) — *"SUBSCRIBE with Joining Fetch"*. Body: *"A different take on #1604 that adds two new modes to SUBSCRIBE instead of allowing Joining FETCH to be sent on the SUBSCRIBE stream."* **Competing approach to Joining FETCH**, sized as a large removal (+44 / **−139** = net-shrink). Fixes #1039, #1313, #1602, #1612. Updated May 11 20:42 UTC. This is the **alternative being surveyed below**.
- **[PR #1623](https://github.com/moq-wg/moq-transport/pull/1623)** ([[ian-swett]], Apr 30, +0/−10, `mergeable_state=dirty`) — *"Remove Request ID from GOAWAY"* (reverts #1559). Updated May 11 22:19 UTC, now made redundant on most of its lines by the just-merged #1617 (GOAWAY on request streams); awaits cleanup.
- **[PR #1625](https://github.com/moq-wg/moq-transport/pull/1625)** (suhasHere, Apr 30, +132/−1, `mergeable_state=blocked`) — *"Rebased Security Considerations PR from Magnus Westerlund"*. Updated May 11 23:03 UTC after the merge sprint; rebased on top of the new `main`.
- **[PR #1605](https://github.com/moq-wg/moq-transport/pull/1605)** (vasilvv, Apr 14, +112/−77) — *"Split DELIVERY_TIMEOUT into two types of timeout"*. Updated May 11 23:56 UTC.
- **[PR #1591](https://github.com/moq-wg/moq-transport/pull/1591)** ([[ian-swett]], Apr 2, +84/−0, `mergeable_state=dirty`) — *"RFC: Add flow control for Subscriptions"*. Adds `MAX_SUB_STREAMS` and `MAX_SUB_BYTES` flow control and introduces `SUBGROUP_RESET`. Fixes #869. Updated May 11 22:18 UTC.
- **[PR #1518](https://github.com/moq-wg/moq-transport/pull/1518)** (mzanaty, Mar 2, +265/−16) — *"Filters with reduced scope, no location or group filter"*. Adds **range filters** for subgroup ID, object ID, priority, and property; track filter under subscribe namespace section; setup options + parameters for new filters. Updated May 11 16:27 UTC — first activity in weeks.
- **[PR #1519](https://github.com/moq-wg/moq-transport/pull/1519)** (vasilvv) — *"Improve design of requests blocking on other requests"*. Updated May 11 21:40 UTC. Now the **designated tracker** for the "dependency structure between requests" use cases (swap tracks, ABR, pause/unpause) that the removed required-request-id was supposed to address.

## Slack `#moq` + mailing list — **afrind opens Joining FETCH Survey, mailing list reactivates after 5-day silence**

After **5 days of human silence** on the IETF [moq] mailing list (last human post: [[yu-you]] May 8 11:52 CEST), May 11 sees a coordinated WG-wide poll campaign:

### Slack survey (May 11 18:02–18:15 UTC)

**[[alan-frindell]] May 11 20:02 CEST (18:02 UTC)** in `#moq`:

> Let me put the rest here [moved from a previous thread]
> 
> **If there's a unified data plane for past and future:**
> 4.1 Past data must be flow controlled in all cases (Y/N)
> 4.2 Past data must be flow controlled only if before the current group (Y/N)
> 4.3 Relays ____ use "Fill" semantics to retrieve all requested objects not in cache, when no existing operation will deliver them (e.g. upstream subscription). (MAY, MUST, MUST NOT)

**afrind May 11 20:03 CEST** (second survey question):

> Answer in thread
> ***I am willing to delay WGLC and RFC by ___ months to achieve a more preferable Joining FETCH outcome:***
> 0
> 1
> 2
> 3
> 4+

[[suhas-nandakumar]] May 11 20:24 CEST: *"wonder a survey monkey link or something be helpful ?"*. afrind 20:29 CEST: *"Eh, email will let people express their nuanced feelings and was less effort"*. **afrind 20:01 CEST**: *"Brutally killed by meetecho!"* — implies he had been trying to run a poll on Meetecho but it failed.

### Mailing list reactivates

The **5-day human-silence stretch** (May 6–10, only the auto-generated May 10 weekly digest) ends May 11 with **4 new thread starters / responses**:

- **May 11 — afrind: *"[Moq] Joining FETCH Survey"*** — mailing-list-posted version of the Slack questions above. *"Now available as list email, thanks for your participation."*
- **May 11 — martinduke: *"[Moq] London Agenda requests"*** — solicits agenda items for the **June 9–10 London interim/interop** ([[alan-frindell]] May 12 00:56 CEST `#moq`: *"interop is 6/9-10"*).
- **May 11 — Mo Zanaty: *"[Moq] Re: Joining FETCH Survey"***
- **May 11 — martinduke: *"[Moq] Re: Joining FETCH Survey"***
- **May 12 — martinduke: *"[Moq] On other use cases"*** — Day-of-Town-Hall thread starter
- **May 12 — Mo Zanaty: *"[Moq] Re: On other use cases"***

The pattern is clear: the WG decompressed the 5-day silence into a **coordinated pre-Town-Hall Joining FETCH survey + agenda call** the evening before the public May 12 event.

## moq-wg/msf — **Suhas opens 4 new PRs in 1 hour evening May 11** (PRs #156–159)

**[[suhas-nandakumar]] May 11 22:21–23:08 UTC** opens 4 new MSF PRs targeting the open MSF backlog:

- **[PR #156](https://github.com/moq-wg/msf/pull/156) May 11 22:21 UTC** (+7/−3, `mergeable_state=clean`) — *"Make MOQT Object to Stream mapping implementation-specific"*. Body: *"@wilaw @kixelated does this address #148"*. Relaxes spec language requiring specific object→stream mapping; pushes the decision into implementation choice.
- **[PR #157](https://github.com/moq-wg/msf/pull/157) May 11 22:29 UTC** (+10/−13) — *"Clarify Group numbering requirements for restarts (#147)"*.
- **[PR #158](https://github.com/moq-wg/msf/pull/158) May 11 22:41 UTC** (+63/−56) — *"Replace delta update fields with ordered operations array"* (addresses #145). Body: *"If we think we need a diff solution, we can add operation id and do it in the increasing order too?"*
- **[PR #159](https://github.com/moq-wg/msf/pull/159) May 11 23:08 UTC** (+40/−1) — *"Add catalog compression support via track name suffix"*. Body: *"@wilaw @vasilvv thoughts on this ?"* — adds a track-name suffix mechanism for advertising catalog compression (parallels Luke's [moq-dev/moq PR #1394](https://github.com/moq-dev/moq/pull/1394) auto-detect-catalog-format-from-broadcast-name-extension landed May 9).

Plus active discussion on already-open MSF issues:

- **[Issue #139](https://github.com/moq-wg/msf/issues/139)** — *"Required/optional fields per role"* — [[luke-curley]] (kixelated) May 11 23:23 UTC: proposes nested-object catalog structure: *"It's clearer if you can group associated fields. Instead of a flat blob of K/V pairs whose meaning/availability changes based on the value of other fields"* — gives example `"container": {"kind": "cmaf", "initData": "..."}`.
- **[Issue #129](https://github.com/moq-wg/msf/issues/129)** ([[yu-you]]) — *"Question to FORWARD parameter and catalog publishing racing"* — [[suhas-nandakumar]] May 11 21:50 UTC explains BiDi stream semantics around PUBLISH+FORWARD=1.
- **Issue #102, #111** — minor activity (advertising from offsite, tiled rendering).

[[suhas-nandakumar]] is now **clearly in MSF spec-curator mode** — splitting the omnibus document into focused PRs, with catalog/operations/object-to-stream/restart-numbering all factored into individual PRs the same evening.

## moq-dev/moq — **Day +2 of `main`-quiet, but FIVE external-contributor PRs land in 24h**

Luke Curley's `main` is still **Day +2 quiet** (no new commits since May 9 22:30 UTC PR #1393 merge). But the **open-PR queue grows by 5 new external-contributor PRs** in the May 11 window:

- **[PR #1402](https://github.com/moq-dev/moq/pull/1402) May 12 00:04 UTC** by **SteveMcFarlin** (+33/−22) — *"moq-gst: Fix MoqSink CAPS handling and per-pad EOS aggregation"*. **FIRST contribution to moq-dev/moq from SteveMcFarlin** (0 prior commits). Two correctness fixes in `sink/imp.rs`: CAPS events now passed to `event_default()` after configuring background task; EOS tracking is per-pad instead of single counter. SteveMcFarlin is the GStreamer/MoQ integrator (`moq-gst`) — a **second consecutive external contributor first** after metapox May 10.
- **[PR #1401](https://github.com/moq-dev/moq/pull/1401) May 11 20:41 UTC** by **skirsten** (4 prior commits) (+243/−139) — *"Refactor/video pacing rAF"*. Consolidates video frame pacing into the renderer's `requestAnimationFrame` loop. Removes the dual-pacing (decoder `Sync.wait()` setTimeout race + single-shot rAF in renderer).
- **[PR #1400](https://github.com/moq-dev/moq/pull/1400) May 11 20:21 UTC** by **skirsten** (+17/−12) — *"fix: stop leaking PromiseReactions in consumer loops"*. `Promise.race` against never-settling Promises (`Effect#closed`, `Effect#cancel`) was leaking `.then` reactions; each leaked reaction's closure retains the awaiter state.
- **[PR #1399](https://github.com/moq-dev/moq/pull/1399) May 11 20:18 UTC** by **skirsten** (+3/−0) — *"fix(watch): close MultiBackend's sync and sources"*. `MultiBackend.close()` only closed its own `#runElement` signal, leaving Sync and two Source instances alive — surfacing as *"Signals was garbage collected without being closed"* warnings.
- **[PR #1398](https://github.com/moq-dev/moq/pull/1398) May 11 07:21 UTC** by **Qizot** (3 prior commits) (+197/−6) — *"Expose track name and used/unused activity signals"*. Adds `name()`, `used()`, `unused()` to `MoqTrackProducer` and `MoqMediaProducer` so FFI consumers can observe subscriber activity. Mirrors the new API in the Python moq-lite bindings.

Plus **metapox PR #1396** updated May 11 08:33 UTC. **moq-dev/moq is suddenly the most externally-contributed-to MoQ impl repo** — May 10–11 sees 1 first-time contributor (SteveMcFarlin), 1 day-1 contributor (metapox May 10), and 2 active recurring external contributors (skirsten, Qizot) all moving on the same 24h window. The day's PR queue grows to **~12 open PRs**, the deepest in repo history.

## moqtail/moqtail — **PR #193 [4/n] MERGED** after Day +5 stuck; upstream FETCH series complete

**[PR #193](https://github.com/moqtail/moqtail/pull/193)** (sharmafb, *"[upstream fetches] Finish implementation of sending FETCH requests upstream for cache misses [4/n]"*, final stats: +303/−158) **MERGED May 11 22:37:32 UTC** after **Day +5 stuck with `mergeable_state=blocked`** — the longest non-Luke stall in moqtail draft-16 era now unblocked. PR #192 (release-bot triggered) is now open. This **completes the [N/n] upstream-FETCH series** (PRs #186 [1/n], #187 [2/n], #188 [3/n] all landed May 6, #193 [4/n] lands May 11). moqtail-relay now supports the full upstream-FETCH path for cache misses.

## cloudflare/moq-rs — Day +29 quiet on `main`; PR #167 untouched

[cloudflare/moq-rs](https://github.com/cloudflare/moq-rs) `main` is **Day +29 quiet** (no commits since Apr 13). **PR #167** ([[suhas-nandakumar]] filter-support framework, +12163/−2197) is untouched since May 10 05:03 UTC — Suhas's attention on May 11 evening went to MSF PRs #156–159 instead of moq-rs review.

## Eyevinn/warp-player — Dependabot burst

[Eyevinn/warp-player](https://github.com/Eyevinn/warp-player) sees a **batch of 6 dependabot PRs** (PRs #121–127) opened May 11 23:33–23:35 UTC for routine dependency bumps (eslint 9→10, typescript 5.9→6.0, commitlint 20.5→21, deps groups). LOCMAF PR #120 ([[hugo-bjoers]]) unchanged Day +5. moqlivemock PR #79 unchanged Day +5.

## Slack `#moq-interop-runner` — **OpenMOQ fork incident: Lucas Pardue calls out OpenMOQ governance, Giovanni Marzot takes blame, Will Law responds**

The new **`#moq-interop-runner` channel** (created May 9 18:09 CEST by Mike English) saw — in its first 48 hours — a **major community-governance incident** that surfaced during the May 9–10 window but went uncaptured in the May 11 update because the wiki only learned of the channel's existence via Mike English's May 9 18:23 CEST `#moq` announcement.

**Timeline**:
- **May 9 18:09 CEST**: Mike English creates `#moq-interop-runner` channel (`C0B2KQLJGN7`).
- **May 9 18:20 CEST**: Mike English notices `openmoq/moq-interop-runner` — a **fork in the OpenMOQ org with cloned issues** mirroring the upstream `englishm/moq-interop-runner` issues. Asks Giovanni Marzot (OpenMOQ): *"what's going on here?"*
- **May 9 18:23 CEST**: [[giovanni-marzot]]: *"just running local fork to get current view of interop situation.. trying out some improvement ideas happy to feed back."*
- **May 9 18:24 CEST**: Mike English: *"I'm just curious about the cloned issues. That seems like it could confuse people."*
- **May 9 18:27 CEST**: Giovanni: *"over zealous claude perhaps.. i was looking to address some of them."*
- **May 10 15:48 CEST**: Mike English follows up: *"over zealous"*.
- **May 10 16:35 CEST**: Mike English: *"I'm hoping this isn't what it looks like because forking an interop runner would be extremely counterproductive."*
- **May 10 16:48 CEST**: Giovanni: *"yes .. claude overstepped.. apologies. I only said remove the references to the links and ghcr .. i want a fully running local copy. I can make this private or move it to my personal github if it is cause grief."*
- **May 10 17:37 CEST**: Giovanni: *"ok - I just flipped that fork private for now. I had run this by Alan ever so briefly but I am not sure I (or anyone) had thought through the impact of it being in openmoq vs my personal gh or whatever."*
- **May 10 19:52 CEST**: [[lucas-pardue]] (Cloudflare) joins the channel.
- **May 10 19:57 CEST**: **[[lucas-pardue]] escalates**: *"@willlaw et al this is not a good look for OpenMoQ. Taking IETF work, forming pay to participate consortia, and then coopting running code from others. Thats not how we develop standards and a healthy ecosystem. I expect to see a post mortem on this, better governance and better community engagement."*
- **May 10 20:18 CEST**: Giovanni: *"@lucasp 2 things I have to add quickly as this seems to be spinning out. I did this independently to fix issues and feed them back. I am also unpaid by anyone and working on a volunteer capacity. This was not an official openmoq activity and that was my mistake alone."*
- **May 10 20:22 CEST**: [[lucas-pardue]]: *"Mistakes happen, no individual should take any blame. But this is something happening under the OpenMoQ org and needs to be addressed. There are many other participants past, present, and future. OpenMoQ is not the universe."*
- **May 10 20:26 CEST**: Giovanni: *"In this case it was entirely unilateral and I take the full blame."*
- **May 10 21:02 CEST**: **[[will-law]] long response (5 paragraphs)**: *"@lucasp - I was just informed about this. I have asked Giovanni to retract all changes, which he has done. He has also apologized multiple times. This is not an official OpenMOQ action. OpenMOQ is not in the business of 'co-opting code from others'. ... Your point about code governance is fair - we need an improved system for validating code provenance before it is merged into any repo managed by openmoq. I'll ask the dev team to institute that next week. ... I'd appreciate a little more empathy and a little less vitriol for those with whom you share the trenches."*

**Implications**:
- **First public OpenMOQ governance incident** captured in any tracked source. The OpenMOQ consortium (a paid-membership industry consortium converting IETF MoQ into productizable open-source) is now publicly committed to **adding code-provenance review before merge into openmoq-org repos** ([[will-law]] *"I'll ask the dev team to institute that next week"*).
- **Claude as a community-friction vector**: Giovanni cites *"over zealous claude perhaps"* and *"claude overstepped"* — the **fork-then-clone-issues was an LLM-assisted action that went further than the human contributor intended**. First MoQ-ecosystem record of an LLM-tooling-driven community incident.
- **Lucas Pardue's "pay to participate consortia" framing** characterizes OpenMOQ specifically as **converting IETF work into commercial gating**, which the WG has not previously had to confront publicly. This is the **deepest critique of OpenMOQ's IETF-relation posture** on the public record.
- **The new `#moq-interop-runner` channel** is therefore not a quiet operational channel but **a higher-visibility venue** than `#moq` for cross-org governance discussion — to be tracked closely.
- **For the wiki**: `openmoq/moq-interop-runner` fork is now private; cloned issues are retracted. The episode is closed but the policy fallout (OpenMOQ code-provenance review) is the carry-forward.

## Datatracker — no new revisions; draft-18 still GitHub-only

No new draft revisions in the May 7–12 window. WG state unchanged: transport-17 (Apr 9), msf-00, loc-02, secure-objects-00, privacy-pass-02, cmsf-00. Notable individual: lite-04 (Apr 9), nmsf-01 (Apr 7), qlog-moq-events-06 (Mar 16), **gregoire-moq-msfts-00** (May 6, **Day +6**, still no on-list announcement).

PR #1628's `moqt-18` ALPN reference + the 6-PR `main` sprint mean **draft -18 candidate text is now effectively assembled on GitHub `main`**, awaiting an editor cut. The next datatracker submission is the long-anticipated -18.

## MoQ Monthly — still on #1, Day +12

No new MoQ Monthly issue. Archive: #0 (Mar 3) + #1 *"NAB, interoperability, and a whole lot of catching up"* (Apr 30). **Day +12 since #1**, longest gap to date.

## tobbee/moq-llm-wiki — no new open issues

No new open issues (3 closed: #1, #2, #3).

---

# Activity (May 10 12:00 UTC → May 11 12:00 UTC)

## moq-wg/moq-transport — pre-Town-Hall PR burst surfaces draft-18 / QMux fallback

The [moq-wg/moq-transport](https://github.com/moq-wg/moq-transport) tracker — quiet for several days under the May 6–10 mailing-list silence — receives **7 PRs and 3 issue threads of attention on May 11 00:27–05:53 UTC**, the day before the **May 12 MOQ Town Hall** (Dan Rayburn / [[will-law]] zoom session). The burst is dominated by **[[alan-frindell]] and Victor Vasilyev (vasilvv)** rebasing and reopening editorial PRs originally cut around the Apr 27 interim, plus two newly-opened PRs and one substantive cross-repo signal:

**Newly-opened PRs (May 11 only)**:
- **[PR #1628](https://github.com/moq-wg/moq-transport/pull/1628) OPENED** May 11 01:29 UTC by **[[alan-frindell]]** (+4/−3, single file, `mergeable_state=blocked`) — *"Add QMux framing for moqt-18 over TLS+TCP"*. **Body**: *"When the moqt-18 ALPN is negotiated over TLS+TCP, the underlying framing uses QMux version 1."* Fixes **[Issue #1626](https://github.com/moq-wg/moq-transport/issues/1626)** (sharmafb, May 1 — version negotiation for QMUX). **Two firsts in one PR**:
  - **First public mention of `moqt-18` ALPN** — implies the WG editors are already cutting next-draft text for the post-interim consensus. Up to now the active draft is transport-17 (Apr 9).
  - **First spec-side commitment to MoQ-over-TLS+TCP via QMux** — confirms the "QUIC fallback on networks that block UDP" path that has been informally discussed since the [[draft-mcquistin-moq-qmux]] work (and the IETF QMux WG draft `draft-ietf-quic-qmux`).
  - **[[lucas-pardue]] (Cloudflare) comment May 11 01:57 UTC**: cites [QMux draft section 8.1-2](https://quicwg.org/qmux/draft-ietf-quic-qmux.html#section-8.1-2) — *"ALPN protocol identifiers identify the application protocol in use. Application protocols that use QMu[x] ..."* — implying afrind's `moqt-18` ALPN-over-TLS+TCP needs to be a **QMux-suffixed** identifier (not a plain `moqt-18`). First [[lucas-pardue]] comment on moq-transport in months — Cloudflare's QMux co-author tagging-in for ALPN naming review.
- **[PR #1629](https://github.com/moq-wg/moq-transport/pull/1629) OPENED** May 11 05:47 UTC by **vasilvv** (+7/−0, single file, `mergeable_state=clean`) — *"Clarify definition of scope"*. Fixes **[Issue #1432](https://github.com/moq-wg/moq-transport/issues/1432)** (michalhosna, Mar 14 — define session reuse rules / improve scope definition). Closes a long-standing scope ambiguity for whether two URIs may share a session.

**Older PRs rebased/refreshed for Town Hall** (all `afrind` + `vasilvv`, originally opened Apr 14–30):
- **[PR #1605](https://github.com/moq-wg/moq-transport/pull/1605)** (vasilvv, Apr 14, +112/−77, `mergeable_state=dirty`) — *"Split DELIVERY_TIMEOUT into two types of timeout"*. Updated May 11 04:28 UTC with *"Addressed the comments."* (vasilvv). Splits the current `DELIVERY_TIMEOUT` into `OBJECT_DELIVERY_TIMEOUT` (the existing semantic, more precisely defined) and a **new `SUBGROUP_DELIVERY_TIMEOUT`** for subgroups that have been queued but not yet fully delivered. Fixes Issue #667.
- **[PR #1617](https://github.com/moq-wg/moq-transport/pull/1617)** (afrind, Apr 28, +85/−73, `mergeable_state=dirty`) — *"Allow GOAWAY on request streams to migrate individual requests"*. Adds per-request GOAWAY with a zero-length URI (control-stream GOAWAY format minus Request ID); on receipt, the endpoint **re-issues the request on a session at the specified URI** and closes the old stream. Fixes Issue #1481. Updated May 11 05:20 UTC.
- **[PR #1618](https://github.com/moq-wg/moq-transport/pull/1618)** (afrind, Apr 28, +22/−10, `mergeable_state=clean`) — *"Add FIRST_OBJECT bit to SUBGROUP_HEADER type"*. Adds bit 6 (0x40) to signal that the subgroup contains the first object published in the subgroup by the original publisher. **The SUBGROUP_HEADER type-format byte expands from `0b00X1XXXX` to `0b0XX1XXXX`** — all valid type values still fit in a 1-byte varint. Updated May 11 04:39 UTC.
- **[PR #1621](https://github.com/moq-wg/moq-transport/pull/1621)** (afrind, Apr 28, +8/−1, `mergeable_state=clean`) — *"Forbid relays from lying about LARGEST_OBJECT"*. *"If we want to serve cached objects in response to SUBSCRIBE, lying is not the correct approach."* Fixes Issue #1386. Updated May 11 00:27 UTC.
- **[PR #1625](https://github.com/moq-wg/moq-transport/pull/1625)** (suhasHere, Apr 30, +132/−1, `mergeable_state=blocked`) — *"Rebased and Update Security Considerations PR from Magnus Westerlund"*. Rebases and extends [[magnus-westerlund]]'s original **PR #1455** (Security Considerations text). First substantive Magnus-Westerlund-related activity on moq-transport since [[magnus-westerlund]]'s May 4 framing messages went unanswered on-list. Updated May 11 01:09 UTC.

**Issue threads** (all received fresh comments May 11 00:27–03:09 UTC):
- **[Issue #1603](https://github.com/moq-wg/moq-transport/issues/1603)** (martinduke, Apr 10 — *"What is the use case for required-request-id"*, 12 comments) — **[[alan-frindell]] May 11 01:33 UTC** quotes Cullen's mailing list post enumerating the use cases: *"1) Swap tracks. In a video conference, a subscriber is subscribed to track for Alice and Bob's video and is watching Alice with Bob paused, but wants to pause Alice and unpause the track with Bob. It's pretty common to want to ensure to pause the current one ..."* Brings the Apr 27 interim consensus (*"remove required-request-id from draft 18 and fix Joining Fetch (if necessary?)"* — [[ian-swett]]) into direct collision with Cullen's swap-track use case. Pre-Town-Hall positioning.
- **[Issue #1614](https://github.com/moq-wg/moq-transport/issues/1614)** ([[luke-curley]], Apr 27 — *"(JOINING) FETCH + SUBSCRIBE prioritization"*) — gets a Day +14 ping at May 11 03:09 UTC. Luke's original framing: *"Effectively, I want to race to determine if it's faster to: download all of the current group (at network speed), or wait for the next group. SUBSCRIBE filter=CurrentGroup order=DESC does this perfectly. I don't think it's possible in the current draft."*
- **[Issue #1582](https://github.com/moq-wg/moq-transport/issues/1582)** (vasilvv, Mar 30 — *"Caching and propagation of REQUEST_ERRORs"*) — Day +42 ping at May 11 03:09 UTC.

**Read of the pattern**: This is the standard pre-meeting cleanup ahead of a public Town Hall — afrind and vasilvv are rebasing the stack of Apr 27 interim PRs so that the Town Hall presenters can point to concrete editorial PR diffs for **draft -18 candidate text** rather than just the Apr 27 minutes. The PR #1628 `moqt-18` ALPN reference is the first public spec-side artifact of -18 work.

## moq-wg/msf — Issue #8 (Content protection) heads for CMSF migration

**[moq-wg/msf Issue #8](https://github.com/moq-wg/msf/issues/8)** (*"Content protection and encryption"*) gets a Day +2 follow-up at **May 11 02:54 UTC** from **vasilvv**: *"This should probably be moved to CMSF repo, since that's where the text about content protection was moved."* This caps a 3-comment sequence:
- **May 9 19:08 UTC [[luke-curley]] (kixelated)**: first non-author engagement on this thread in many days (the wiki noted this in the May 10 entry).
- **May 9 19:08 UTC [[suhas-nandakumar]]**: *"@wilaw can we close this issue?"* — Suhas (the issue's effective steward) asks to close it.
- **May 11 02:54 UTC vasilvv**: pushes back — **migrate to CMSF** rather than close. Aligns with the broader Apr–May 2026 spec-restructuring direction where event-timeline (May 8 wilaw/gwendalsimon/suhasHere on PR #133) and content-protection text are migrating **out of MSF** into format-specific WG documents.

## Implementations — all-around quiet day on `main`

The May 10 12:00 UTC → May 11 12:00 UTC window is the **first full day of `main`-side quiet across all tracked impl repos in May**:

- **moq-dev/moq**: No new commits since [[luke-curley]]'s May 9 22:30 UTC PR #1393 merge (track group cache eviction 30s → 5s). **Day +1 of post-burst quiet.** Open-PR queue unchanged at 7 PRs / +4362/−307: PR #1374 Lite05 DATAGRAMS Day +7, PR #1388 LOC frame format Day +4, PR #1389 stats aggregation Day +4 (no further LOC growth), PR #1394 catalog-format-from-extension Day +1, PR #1395 moq-cli renames Day +1, PR #1396 metapox SUBSCRIBE_UPDATE JS Day +1, PR #1397 metapox in-flight priorities Day +1.
- **cloudflare/moq-rs**: No new commits; **PR #167** ([[suhas-nandakumar]] filter-support framework, +12163/−2197) untouched since May 10 05:03 UTC. Day +28 quiet on `main`.
- **moqtail/moqtail**: No new commits; **PR #193** [4/n] (sharmafb upstream FETCH, +248/−132, `mergeable_state=blocked`) untouched since May 9 20:29 UTC. Day +5 stuck.
- **video-dev/moq-js**: No new commits since Feb 17.
- **google/quiche** (`quiche/quic/moqt`): No new commits since May 5 01:02 UTC (Day +6 quiet post-Vasiliev parser-rewrite).
- **birneee/quiche_moq**: No new commits since Mar 13.
- **Eyevinn/moqlivemock / warp-player**: LOCMAF PRs #79/#120 unchanged Day +4.
- **Eyevinn/moqtransport**: No new commits since Apr 16.
- **Quicr/cat-rs**, **Quicr/catapult**: No new commits since May 7 04:07 UTC.

## Slack — Mike English creates `#moq-interop-runner` channel; Luke flames WebRTC

Two new `#moq` posts in the May 9 11:00 UTC → May 11 12:00 UTC window:

- **Mike English (Cloudflare/englishm) May 9 18:23 CEST (16:23 UTC)**: *"Catching up on a bunch of things.. I created `#moq-interop-runner` as a place to discuss interop runner issues"* — **new channel `C0B2KQLJGN7`** dedicated to the interop runner. **Splits interop-runner discussion off `#moq`** for the first time; previously all interop-runner queries (test failures, PR review for new clients like `mlmtest`, draft-target debates) were inline in `#moq`. Worth probing in future updates.
- **[[luke-curley]] May 9 20:13 CEST (18:13 UTC)**: *"btw I started a WebRTC flame war if anybody missed it: https://news.ycombinator.com/item?id=48051951"* — Hacker News thread (post-Luke's "MoQ vs WebRTC" or similar provocation). Reactions: `:smiling_imp:` x2. **First Luke off-spec Slack post in May**; signals public-discourse positioning ahead of the May 12 Town Hall.

`#moq-rs`, `#moq-js`, `#libquicr` all unchanged.

## Mailing list — Day +5 of human silence

The IETF [moq] mailing list shows **no new human-authored messages** since [[yu-you]]'s May 8 11:52 CEST 3GPP SA4 #136 PoC announcement. Only the auto-generated May 10 weekly digest in the May 6–11 window — **5-day human-silence stretch**, the longest in May. [[cullen-jennings]] (request-sync, May 1), [[magnus-westerlund]] (framing, May 4), [[suhas-nandakumar]], [[will-law]], [[ian-swett]], [[alan-frindell]] all silent on-list. **All the May 11 activity is happening on the GitHub tracker**, not the mailing list — consistent with the Town Hall + GitHub-issue-driven editorial cadence the WG has shifted to since the Apr 27 interim. The May 12 MOQ Town Hall is the awaited unlock event.

## Datatracker — no new revisions

No new draft revisions in the May 7–11 window. WG state unchanged: transport-17, msf-00, loc-02, secure-objects-00, privacy-pass-02, cmsf-00. Notable individual drafts: lite-04 (Apr 9), nmsf-01 (Apr 7), qlog-moq-events-06 (Mar 16), **gregoire-moq-msfts-00** (May 6, **Day +5**, still no on-list announcement). The PR #1628 reference to **`moqt-18` ALPN** suggests the editors are working draft -18 candidate text on GitHub ahead of the datatracker submission.

## MoQ Monthly — still on #1

No new MoQ Monthly issue. Archive: #0 (Mar 3) + #1 *"NAB, interoperability, and a whole lot of catching up"* (Apr 30). **Day +11 since #1.**

## tobbee/moq-llm-wiki — no new issues

No new open issues. (3 closed issues remain.)

---

# Activity (May 9 06:00 UTC → May 10 12:00 UTC)

## moq-dev/moq breaks 2-day quiet on `main` — release v0.16.0 ships, 2 fix PRs merge, 4 new PRs opened including first external contributor of May

After a 2-day quiet period on `main` (last commit May 7 18:17 UTC), [[luke-curley]] resumes the merge cadence on May 9 19:27 UTC with the release-train PR plus two small fixes, then opens two **new feature PRs** the same evening. **May 10 morning UTC** brings the **first non-Luke commits to a moq-dev/moq PR queue in May**: `metapox` (taku) opens 2 PRs at 10:58 UTC addressing pre-existing issues #1363 and #1370.

**Merged May 9 evening** (Luke):
- **[PR #1338](https://github.com/moq-dev/moq/pull/1338) MERGED** May 9 19:27 UTC (+251/−128) — release-train PR shipping `moq-lite v0.16.0`. Auto-bump after the May 7 revert-of-revert (PR #1387 brought back the `insert_track` API rework). Replaced same instant by [PR #1391](https://github.com/moq-dev/moq/pull/1391) (release-train for v0.16.1, opened May 9 19:29 UTC by `moq-bot`).
- **[PR #1392](https://github.com/moq-dev/moq/pull/1392) MERGED** May 9 21:41 UTC (Luke, +3/−3) — *moq-ffi: fix uniffi-bindgen invocation, bump 0.2.9*. Tooling fix for the FFI bindings generator.
- **[PR #1393](https://github.com/moq-dev/moq/pull/1393) MERGED** May 9 22:30 UTC (Luke, +1/−1) — *Reduce track group cache eviction timeout from 30s to 5s*. **Single-constant tuning** (Claude Code co-author); reduces idle memory footprint at the cost of more cache rebuilds for slow re-subscribers. Lands within minutes of PR #1394's open — Luke is iterating on cache/catalog hot paths in this batch.

**Opened May 9 evening** (Luke, both still open as of May 10 morning):
- **[PR #1394](https://github.com/moq-dev/moq/pull/1394) OPENED** May 9 22:04 UTC (Luke, +197/−86) — *Auto-detect catalog format from broadcast name extension*. Catalog format (Hang JSON / Hang CBOR / native) is now inferred from the trailing extension on the broadcast path rather than being passed as a separate flag. **Rationale**: simplifies the publish/subscribe CLI and aligns with the May-7-merged PR #1341 moq-mux backport that gave catalogs first-class container types.
- **[PR #1395](https://github.com/moq-dev/moq/pull/1395) OPENED** May 9 22:36 UTC (Luke, +162/−42) — *moq-cli: rename `--output` to `--format`, `--name` to `--broadcast`, add `accept` subcommand*. CLI ergonomics breaking change. The new `accept` subcommand presumably lets the CLI handle inbound subscriptions (mirror of `publish`/`subscribe`).

**Opened May 10 morning** by `metapox` (taku) — **first non-Luke contributor to moq-dev/moq in May**:
- **[PR #1396](https://github.com/moq-dev/moq/pull/1396) OPENED** May 10 10:58 UTC (metapox, +30/−4) — *feat(lite): implement SUBSCRIBE_UPDATE API for JS subscriber and publisher*. Addresses pre-existing **Issue #1363** (May 5, *"@moq/lite: implement SUBSCRIBE_UPDATE in TS subscriber"*).
- **[PR #1397](https://github.com/moq-dev/moq/pull/1397) OPENED** May 10 10:58 UTC (metapox, +176/−63) — *fix(lite): update in-flight group priorities on SUBSCRIBE_UPDATE*. Addresses pre-existing **Issue #1370** (May 6, *"@moq/lite: in-flight group priorities not updated on SUBSCRIBE_UPDATE"*). **Together** these two PRs close out the May 5–6 SUBSCRIBE_UPDATE backlog that Luke had filed but not implemented. metapox is a new external contributor to moq-dev/moq (no commits in repo history before today).

**Issue activity**:
- **[Issue #1390](https://github.com/moq-dev/moq/issues/1390) OPENED** May 10 11:07 UTC by **Dan Rossi** — *"Production ES Watch library won't connect to the dev relay"*. **Production deployment friction** — first reported issue from a non-developer outside contributor in months, suggesting at least one real production deployment of `@moq/watch` against a relay other than `relay.cloudflare.com`.

**Open-PR queue depth update**:
- PR #1374 Lite05 DATAGRAMS (+1615/−7) — Day +6 still open.
- PR #1388 LOC frame format (+799/−17) — Day +3 still open.
- PR #1389 stats aggregation — **grew +215 LOC overnight** (was +1168/−39 May 8, now +1383/−50 after May 10 00:12 UTC update). Day +3 still open and actively being iterated on.
- PR #1394 Auto-detect catalog format — Day +0 open.
- PR #1395 moq-cli renames + accept — Day +0 open.
- PR #1396 SUBSCRIBE_UPDATE JS — Day +0 open.
- PR #1397 SUBSCRIBE_UPDATE in-flight priority — Day +0 open.

**Total open PRs in moq-dev/moq**: **7 feature PRs** (was 3 on May 8). Combined diff size of the 7-PR queue is +4362/−307. Largest open-PR backlog in moq-dev/moq history.

## cloudflare/moq-rs — Suhas's PR #167 (filter-support framework) gets continued attention

[[suhas-nandakumar]]'s **[moq-rs PR #167](https://github.com/cloudflare/moq-rs/pull/167)** (filter-support framework, opened May 6, +12163/−2197) saw an update at May 10 05:03 UTC. **Diff size unchanged** (still the largest open PR in moq-rs at +12163/−2197); the May 10 ping is review iteration rather than a fresh resubmission. moq-rs `main` remains quiet — **27 days since the last commit** (Apr 13).

This PR is the May continuation of Suhas's relay observability work that was abandoned/reformulated in moq-dev/moq PR #853 (closed May 5) and PR #1389 (Luke's reformulation, +1383/−50). The cross-repo pattern: Suhas pushes filter+observability infrastructure into moq-rs while Luke reformulates the same domain inside moq-dev/moq with smaller scope.

## moq-wg/secure-objects — kixelated weighs in on issue #8

**[moq-wg/secure-objects Issue #8](https://github.com/moq-wg/secure-objects/issues/8)** (*"Content protection and encryption"*) gets a new comment from **[[luke-curley]]** May 9 19:08 UTC — first non-author engagement on the thread in many days. The issue tracks the SFrame-based content-protection design for [[moq-secure-objects]]. **No `main` commits**.

## moqtail PR #193 — still blocked Day +4

**[moqtail PR #193](https://github.com/moqtail/moqtail/pull/193)** (sharmafb upstream-FETCH-on-cache-miss [4/n], +248/−132) **still open Day +4**, with a metadata-only update at May 9 20:29 UTC. **mergeable_state=blocked** — a code change is still required for review approval. moqtail `main` itself unchanged since May 6.

## Mailing list — only the auto-generated weekly digest

The IETF [moq] mailing list shows **one new message** in the May 9–10 window:
- **May 10** — *"[Moq] Weekly github digest (Media Over QUIC Activity Summary)"* (Repository Activity Summary Bot, auto-generated weekly digest). Same cadence as the May 3 digest.

**Zero human-authored messages** May 9–10. Cullen request-sync thread / Magnus Westerlund framing thread / [[suhas-nandakumar]] / [[will-law]] all silent. **Four-day silence stretch** in human discussion (last human message: yu you May 8 about 3GPP SA4 #136 PoC).

## Slack `#moq` — quiet

**No new posts** since yu you's May 8 announcement of the 3GPP SA4 #136 PoC. `#moq-rs`, `#moq-js`, `#libquicr` all unchanged.

## Interop runner — flat 20/71/14 second consecutive day

**2026-05-10 run at 00:40:03 UTC: Pass 20 / Fail 71 / Skip 14 / Total 105 — flat vs May 9 (20/71/14)**. Walking arc since the Apr 17 floor: 18 → 18 → 18 → 20 → 22 → 22 → 23 → 24 → 22 → 23 → 22 → 23 → 23 → 23 → 24 → 25 → 24 → 24 → 20 → 20 → 20 → 20 → 19 → 20 → **20**. The May 5 −4 regression that returned the matrix to the Apr 17 floor remains uncorrected; May 8's brief dip to 19 was statistical noise. **Two-day flat at the post-PR #145 floor**; moqtail PR #193 still open so no relay rebuild has touched the matrix; moq-dev/moq's May 9 `main` commits (PRs #1338, #1392, #1393) all merged **after** the May 10 00:40 UTC run, so any builder rebuild from `0.16.0` would only show in the May 11 report.

# Activity (May 8 06:00 UTC → May 9 06:00 UTC)

## Eyevinn opens twin LOCMAF PRs — experimental Low Overhead CMAF packaging from a master's thesis

**Hugo Björs** (Eyevinn) opens twin pull requests on May 7 13:12–13:15 UTC, both updated through May 8, proposing **LOCMAF (Low Overhead CMAF)** — a compact LOC-inspired/compatible CMAF packaging format for MoQT. Body of [moqlivemock PR #79](https://github.com/Eyevinn/moqlivemock/pull/79): *"This is an experimental packaging, and a more detailed description with measurements will be published in my master's thesis at a later point."*

- **[moqlivemock PR #79](https://github.com/Eyevinn/moqlivemock/pull/79) OPENED** May 7 13:12 UTC (+2697/−83, **17 files**, **OPEN**, last update May 8 21:03 UTC) — *Add LOCMAF support*. Server-side implementation in the Eyevinn Go publisher.
- **[warp-player PR #120](https://github.com/Eyevinn/warp-player/pull/120) OPENED** May 7 13:15 UTC (+2211/−188, **14 files**, **OPEN**, last update May 8 09:42 UTC) — *Add LOCMAF support*. Client-side counterpart in the TypeScript player. Cross-references the moqlivemock PR. **A separate branch tests LOCMAF + DRM**, but DRM is not in this PR.

**Design**: LOCMAF avoids re-transmitting CMAF header fields that are fixed, derivable, or only present for structural reasons. Instead of sending full CMAF init segments and `moof` fragment headers, it stores only the fields needed to reconstruct them. Fields are encoded as MoQT/LOC-style key-value pairs, each assigned a LOCMAF ID; encoded values are aggregated into **one** LOCMAF property rather than defining a separate LOC property for every CMAF field — design choice is *"compatible with LOC while avoiding a large number of new globally coordinated property IDs."*

**LOCMAF defines three properties**:
1. **LOCMAF init segment** — non-derivable fields needed to reconstruct CMAF `ftyp` and `moov` boxes.
2. **LOCMAF full header** — non-derivable fields needed to reconstruct a complete `moof` header. **Must be sent as a stream access point and as the first object in a MoQT group**, ensuring the group is independently decodable.
3. **LOCMAF delta header** — differences relative to the previous `moof` header. Reduces overhead further when consecutive fragments are similar. **Fields listed as deleted are reset to default values rather than interpreted as deltas.**

**Decompression**: receiver creates an empty CMAF init segment or fragment header using default values, parses the LOCMAF KV map, and fills in required fields. For delta headers, the receiver applies the stored differences relative to the previous header.

**Two key optimizations** (PR body):
- `tfdt.baseMediaDecodeTime` is calculated from the previous `baseMediaDecodeTime` and the previous sample durations — **does not need to be sent over the wire**.
- When only 1 sample is sent per fragment, the sample size is **omitted** because it equals the LOCMAF payload length.

**Significance**: LOCMAF is the **first impl-side proposal to bridge the LOC↔CMAF gap** since [[luke-curley]]'s `draft-lcurley-compressed-mp4-00` (Mar 18, individual). The two attempts come from opposite directions:

| Approach | Path | Author | Status |
|----------|------|--------|--------|
| **compressed-mp4** | Compress full CMAF stream with a generic compressor | [[luke-curley]] | Individual draft Mar 18 |
| **LOCMAF** | Encode only non-derivable CMAF fields as LOC KV pairs | Hugo Björs (Eyevinn) | Experimental impl May 7 |

**Author context**: Hugo Björs previously implemented **CMSF ContentProtection** in moqlivemock + warp-player ([moq-wg/cmsf PR #18](https://github.com/moq-wg/cmsf/pull/18), merged Apr 14) — the spec contribution that is now Eyevinn's primary [[moq-cmsf]] DRM track. LOCMAF is therefore his **second media-pipeline contribution**, in a master's-thesis context. **Concrete measurements pending thesis submission**.

## moq-wg/msf — PR #133 escalates to spec-restructuring debate

After avelad's May 7 11:50 UTC suggestion to split [PR #133](https://github.com/moq-wg/msf/pull/133) (Suhas SCTE-35 + CEA-608/708) into 3 PRs, May 8 brings **3 new comments** in 7 hours that escalate the discussion from PR-splitting into spec-level restructuring of the MSF event-timeline coverage:

- **wilaw May 8 11:29 UTC**: *"I notice another anomaly here. The current draft has a section for defining the event timeline carriage of SCTE-35 data, but then it punts the definition of the carriage of WebVTT and IMSCI to external drafts. Wouldn't be better to specify all event timeline formats outside of the MSF spec? That way the MSF spec stays clean. If there is agreement on this approach, then we can spin up 3 separate drafts: SCTE-35 transmission in MSF Event Timeline format, WebVTT transmission in MSF Event Timeline format, IMSCI transmission in MSF Event Timeline format."*
- **gwendalsimon May 8 13:09 UTC**: agrees with wilaw's restructuring direction (quoting wilaw's anomaly observation).
- **suhasHere May 8 18:30 UTC**: *"@wilaw @gwendalsimon I do have initial drafts on..."* (truncated in the API view) — **reveals pre-staged draft text already exists** for the SCTE-35 / WebVTT / IMSC1 separation.

**Direction**: 3 separate Event-Timeline format drafts (SCTE-35, WebVTT, IMSC1) likely to spin out as **individual drafts**; CEA-608/708 accessibility metadata stays in MSF. Extends the [[moq-msf|MSF Packaging Extensions]] pattern (precedent: [[moq-msfts]] for `m2ts`) into **Event-Timeline Extensions** — making MSF an umbrella draft with two modular extension axes.

**Significance**: First time a moq-wg PR's spec restructuring is shaped openly in a 3-author exchange (wilaw + gwendalsimon + suhasHere) rather than via interim meeting or chair direction. The Day -1 (May 7) avelad split-into-3-PRs comment was the trigger; today's exchange formalizes the spec-level direction. Editorial cadence is shifting toward *"spec text first, individual drafts when ready"* — Suhas reveals he had already drafted the separation text without on-list announcement.

## Slack #moq — yu you announces 3GPP SA4 #136 conferencing PoC over MOQT

**[[yu-you|yu you]] (Nokia) May 8 11:52 CEST** posts in `#moq` (first new post since [[suhas-nandakumar]]'s May 6 17:49 CEST CAT4MOQ + Will Law's May 6 09:44 CEST MOQ Town Hall announcements):

> FYI
>
> We will present a conferencing PoC over MOQT at the upcoming 3GPP SA4 #136 meeting next week in Montreal, Canada.
> The document is now available online at:
> [3GPP S4-261065 input document](https://www.3gpp.org/ftp/tsg_sa/WG4_CODEC/TSGS4_136_Montreal/Docs/S4-261065.zip)
> (the PoC is based on our in-house MOQT v17 implementation and provided as an informative input to the ongoing study in SA4: [FS_Q4RTC_MED](https://www.3gpp.org/ftp/TSG_SA/TSG_SA/TSGS_110_Baltimore_2025-12/Docs/SP-251661.zip))

**Two new disclosures**:
1. **Nokia maintains an in-house MOQT v17 implementation** — not previously disclosed publicly, sitting alongside the open-source moq-rs/moq-js/moq-dev/moqtail/moxygen/imquic/libquicr/quiche-moq stack.
2. **First MOQT cross-pollination into 3GPP standardization** — informational input to the FS_Q4RTC_MED study at 3GPP SA4. MOQT has previously been informational at Demuxed, IETF Hackathon, Mile High Video, and NAB but not at 3GPP.

**Timing**: SA4 Montreal #136 is May 11–15, so the PoC will be presented next week. Cross-posted to the IETF moq mailing list as *"Web conferencing demo over MOQT"* on the same day.

`#moq-rs`, `#moq-js`, `#libquicr` all unchanged.

## Mailing list — Cullen returns; yu you cross-posts SA4 PoC

After 3 consecutive quiet days, the moq IETF mailing list reactivates with **two new messages May 8**:

- **yu you (Nokia)** opens new thread *"Web conferencing demo over MOQT"* — same content as the Slack post above. **First IETF-archive cross-post of the 3GPP SA4 PoC.**
- **Cullen Fluffy Jennings** replies on *"Knowing the start of a Subgroup"* — **first Cullen reply on this thread**. Disputes Ian Swett's May 5 claim that the WG had agreed to a single-byte priority encoding: *"since even the pre-WG draft proposal we have always had a pretty complicated prioritization including object ID (lower goes first when doing datagrams and streams), group ID (both directions), subscriber priority, publisher priority."* Pushback against Ian's framing that subgroup-design topics are closed for draft -18.

**Stale threads continue**: Cullen's *"Request Synchronization Use Case"* thread (May 1) and Magnus Westerlund's three May 4 framing messages remain unanswered for **8 days** and **5 days** respectively. **No on-list announcement** posted for the [[moq-msfts|MSFTS draft]] — Day +3 since Datatracker submission.

**Significance**: Cullen's reply is the first material on-list pushback against Ian's May 5 framing. Tightens the topic for the May 12 MOQ Town Hall (Will Law / Dan Rayburn) and likely re-enters the editorial backlog before draft-18 cutoff.

## moq-dev/moq — quiet day after the day-3 burst

**No new commits on `main`** since May 7 18:17 UTC. Day +1 of post-burst quiet. The 3 large Claude-Code-generated PRs from the May 4 → May 7 window remain **all open**:

| PR | Opened | Lines | Status |
|----|--------|-------|--------|
| **#1374 Lite05 DATAGRAMS** | May 4 22:57 UTC | +1615/−7 | OPEN, **Day +4** |
| **#1388 LOC frame format** | May 7 17:42 UTC | +799/−17 | OPEN, **Day +1** |
| **#1389 stats aggregation** | May 7 18:23 UTC | +1168/−39 | OPEN, **Day +1** |

**Combined open-PR diff: +3582/−63 across 3 PRs** — largest open-PR backlog in moq-dev/moq history. Pattern signal: Luke is accumulating review feedback before merging the wire-level Lite05 changes, since #1388 (LOC) and #1389 (stats) both depend on the moq-lite session model.

## moqtail — 2nd consecutive completely quiet day

No new commits, no PR updates, no new issues — extends the May 7 silence. PR #193 [4/n] (sharmafb upstream FETCH on cache miss, +248/−132, OPEN since May 6 23:11 UTC) untouched **48h+ later** — earliest stale PR signal since the May 4 PR #145 merge.

## Other repos — all quiet

- **cloudflare/moq-rs**: Day +26 (no commits since Apr 13).
- **video-dev/moq-js**: Last commit Feb 17.
- **google/quiche** (`quiche/quic/moqt`): Day +4 quiet post-Vasiliev parser-rewrite (no commits since May 5 01:02 UTC).
- **birneee/quiche_moq**: Last commit Mar 13.
- **Eyevinn/moqtransport**: Last commit Apr 16.

## Datatracker / MoQ Monthly / wiki

- **No new draft revisions**. WG state unchanged: transport-17, msf-00, loc-02, secure-objects-00 (-01 still **not** on Datatracker), privacy-pass-02, cmsf-00. Notable individual: lite-04 (Apr 9), nmsf-01 (Apr 7), gregoire-moq-msfts-00 (May 6, **Day +3**).
- **MoQ Monthly**: No new issue. Day +9 since #1.
- **tobbee/moq-llm-wiki**: No new open issues.

## Interop runner — 20/71/14 — partial recovery (+1 pass / −1 fail vs May 8)

**Bounce-back to the May 4–7 floor.** Walking arc since the Apr 17 floor: 18 → 18 → 18 → 20 → 22 → 22 → 23 → 24 → 22 → 23 → 22 → 23 → 23 → 23 → 24 → 25 → 24 → 24 → 20 → 20 → 20 → 20 → 19 → **20**. moqtail PR #193 still **open** Day +3, so this is not a `moqtail-relay` rebuild effect; moq-dev/moq main is quiet. **Most plausible cause**: natural per-run variance / single image rebuild for one of the matrix entries (moq-rs, moq-rs-draft-16, moqx, quiche-moq, libquicr, xquic, imquic) flipping a single test back to pass. **Two-day net effect (May 7 20 → May 8 19 → May 9 20) is zero** — the May 8 reading was statistical noise, not a regression.

---

# Activity (May 7 06:00 UTC → May 8 06:00 UTC)

## moq-dev/moq — Day-3 burst: PR #1387 "Revert the revert" un-reverts PR #1356 within 24h; PR #1386 Firefox stats merged; PR #1388 LOC frame format opened; PR #1389 stats aggregation opened

[[luke-curley]]'s third consecutive day with material `main`-branch activity, all between **17:42 and 18:24 UTC** May 7. Headline element: **PR #1387 reverts the May 6 revert (PR #1385) of PR #1356** — the type-level cleanup is back in `main` with the underlying clone-counting bug fixed in-place. Plus a major *new* feature-PR pair: LOC frame format support and stats aggregation, both Claude-Code-generated.

- **[PR #1387](https://github.com/moq-dev/moq/pull/1387) MERGED** May 7 17:47:35 UTC by [[luke-curley]] (+167/−177) — *Revert the revert*. One-line body: *"Actually fix the issue by incrementing the dynamic count when cloning."* Un-reverts PR #1385's revert of PR #1356 (`insert_track` takes `TrackConsumer`). **Cycle**: PR #1356 merged May 5 22:15 UTC → reverted via #1385 May 6 22:08 UTC (−24h) → reverted-back via #1387 May 7 17:47 UTC (+19h 39m). **Total cycle 43h 32m. First merge → revert → revert-of-revert cycle on `main` in moq-dev/moq history.** Yesterday's wiki entry framed PR #1385 as a "first merge-then-revert-within-24h" event; today it is reframed as a *transient* revert. The `TrackConsumer::produce()` removal from #1300 is again gone.
- **[PR #1386](https://github.com/moq-dev/moq/pull/1386) MERGED** May 7 18:17:23 UTC by [[luke-curley]] (+72/−177) — *@moq/watch: source network stats from the connection, not navigator*. Final shape +72/−177 (vs opened-shape +88/−130 on May 6 — the reviewed form deletes more code than originally drafted). Replaces `navigator.connection` (Firefox doesn't expose, others report unreliably) with QUIC-connection-sourced stats. **Second Firefox-compatibility PR to land in 3 days; sibling PR #1307 (Lite03+ via legacy SETUP) still open.**
- **[PR #1388](https://github.com/moq-dev/moq/pull/1388) OPENED** May 7 17:42:06 UTC by [[luke-curley]] (+799/−17, **OPEN**) — *Add Low Overhead Container (LOC) frame format support*. **First adoption of an IETF-spec media container format in moq-dev/moq alongside its native Hang stack.** New `moq-loc` Rust crate + `@moq/loc` JS package implementing encode/decode for the [[moq-loc|draft-ietf-moq-loc]] wire format; QUIC-style varint property block (delta-encoded type IDs `0x06`=timestamp, `0x08`=timescale) followed by raw codec payload. **Catalog integration**: hang catalog gains `Container::Loc { timescale }` (default 1,000,000 µs); audio source selection prioritizes LOC after legacy, before CMAF. Watch player audio/video decoders + MSE backends instantiate the appropriate LOC decoder based on catalog config. Per-frame timescale (`0x08` property) overrides catalog default. *"Even-typed properties carry varint values; odd-typed properties carry length-prefixed bytes. Unknown properties are silently skipped on decode, never emitted on encode."* Body marked *"🤖 Generated with Claude Code"*.
- **[PR #1389](https://github.com/moq-dev/moq/pull/1389) OPENED** May 7 18:23:35 UTC by [[luke-curley]] (+1168/−39, **OPEN**) — *Add stats aggregation and publishing for moq-lite sessions*. New `Stats` module (`rs/moq-lite/src/stats.rs`); per-broadcast and per-prefix stats published as **`.stats/<level>/<name>` JSON broadcasts** (1Hz snapshot, atomic counters with `Relaxed` ordering, RAII guards record open/close + frames + bytes + groups). **Hidden-path filtering**: new `Path::is_hidden()` (segments starting with `.`) so stats infrastructure doesn't recursively generate its own stats traffic; `OriginConsumer::announced()` filters hidden paths, complementary `announced_hidden()` exposes them. New `StatsConfig` in moq-relay (`name` + `levels` for per-prefix bucketing depth). API surface: `Client::with_stats()` / `Server::with_stats()` builders. Body marked *"🤖 Generated with Claude Code"*. **Same problem domain as the May 5-closed PR #853** (fcancela's "Minimal observability metrics", +1261/−38) — Luke's reformulation lands as a 1168-line opening within 2 days, occupying adjacent design space with three novel mechanisms (in-band stats broadcasts, hidden-path filtering, per-prefix bucketing).
- **[PR #1338](https://github.com/moq-dev/moq/pull/1338) updated** May 7 18:32 UTC — `chore: release` (moq-bot[bot]). Auto-bumped after #1387 + #1386 merges; the day-1 revert + day-3 revert-of-revert net no-op rolls forward, plus the Firefox stats fix.
- **[PR #1374](https://github.com/moq-dev/moq/pull/1374) (Lite05 DATAGRAMS) updated** May 7 19:25 UTC — still **open**, Day +3 since open. No movement towards merge.
- **[PR #853](https://github.com/moq-dev/moq/pull/853) — note**: closed-not-merged on May 5; received an automated cross-reference timestamp ping May 7 17:50 UTC when PR #1389 opened (PR #1389 occupies adjacent design space). State remains CLOSED.

**Net**: Day-3 lands **two merges** that net to zero net code change but unwind yesterday's revert with the underlying bug fixed in-place, and **opens two large new feature PRs** (+799 LOC frame format, +1168 stats aggregation). Both new PRs are Claude-Code-generated. Combined moq-dev/moq diff opened in the 4-day May 4 → May 7 window: PR #1374 (Lite05) +1615/−7 + PR #1378 +295/−240 + PR #1388 +799/−17 + PR #1389 +1168/−39 = **+3877/−303 added across 4 Claude-Code-generated PRs**, of which only PR #1378 has merged.

## moq-wg/msf — avelad asks for PR #133 (SCTE-35 + CEA-608/708) to be split into 3 PRs

After 70+ days open with periodic updates, [[suhas-nandakumar]]'s [PR #133](https://github.com/moq-wg/msf/pull/133) (+259/0, *Add SCTE-35 support and CEA-608/708 accessibility fields*) gets the **first new comment in 12 days** from a new reviewer.

- **avelad** (Alvaro Velad / Google, Shaka Player engineer) May 7 11:50 UTC: *"Perhaps this should be separated into 3 PRs, one for CEA, one for SCTE-35, and one for IMSC1 and WebVTT?"*
- The PR adds 4 separable concerns: accessibility metadata, SCTE-35 timeline events, IMSC1 caption events, WebVTT references. avelad's split suggestion would distribute these into 3 PRs (CEA-608/708 alone; SCTE-35 alone; IMSC1+WebVTT bundled).
- **First moq-wg/msf review activity from a Google engineer in this PR thread.** Prior reviewer engagement was Will Law (Akamai) on Apr 27. Comes 1 day after avelad's May 6 14:27 UTC ping requesting Will Law's review.
- **Process pushback, not technical pushback** — but the cadence change of moving from 1 PR (open Feb 27 → May 7+) to 3 PRs would extend the merge timeline considerably and may force the SCTE-35 + accessibility separation discussion into the May 12 MOQ Town Hall window.

## moq-transport — afrind reframes Issue #1622 (GOAWAY Request ID removal) as repurposable Group-ID slot

[Issue #1622](https://github.com/moq-wg/moq-transport/issues/1622) was opened Apr 30 by [[ian-swett]] with the title *"Request ID in GOAWAY isn't useful"*. Body argues request IDs are not the right primitive in MoQ, citing [[victor-vasiliev]]'s reluctance on PR #1559. After ianswett's open + afrind's brief Apr 30 18:31 UTC counter (*"trivial to put the request ID in goaway, and might be useful"*), the issue sat untouched for a week.

- **[[alan-frindell]] May 7 18:53 UTC** ([comment](https://github.com/moq-wg/moq-transport/issues/1622#issuecomment-...)): *"Perhaps we want to use the Request ID slot to convey a Group ID when sent on an individual subscription or fetch stream."*
- Reframes the GOAWAY Request-ID slot as **repurposable wire field for a different per-stream identifier**, rather than removing it. Suggests the slot itself is valuable but the *meaning* may need to change to be useful.
- Combined with Required Request ID removal (PR #1615), Vasiliev's PR #1559 hesitation, and the Apr 30 Joining FETCH discussion, the editorial team appears to be **converging on per-stream identifier signalling as a subgroup of the Request-ID cleanup direction**.
- **First substantive afrind comment on Issue #1622 since the original Apr 30 reply.**

Other moq-transport open PRs (#1621, #1618, #1617, #1613, #1544, #1455-CLOSED) received label/timestamp pings on May 7 18:13–18:37 UTC but no code pushes. Likely afrind doing review-cleanup labelling on a single sit-down.

## Slack #moq — quiet for 1 day

No new posts since May 6 17:49 CEST (Suhas CAT4MOQ + Will Law MOQ Town Hall announcements). `#moq-rs` (C09CG9V7A2Y), `#moq-js` (C09BZ7KH0BZ), `#libquicr` (C08ER7J16BF) all unchanged.

## Mailing list — quiet for 3rd consecutive day

No new messages on May 6 or May 7. Cullen Jennings's *"Request Synchronization Use Case"* thread (May 1) and Magnus Westerlund's three May 4 framing messages remain unanswered for **7 days** and **4 days** respectively. **No on-list announcement** posted for the new MSFTS draft (Day +2 since Datatracker submission).

## moqtail and other repos — completely quiet day

[[zafer-gurel]] and contributors take May 7 off — no new commits, PRs, or issues on `moqtail/moqtail` after the **9 merges across May 5–6**. PR #193 [4/n] (sharmafb upstream FETCH on cache miss, +248/−132, OPEN since late May 6) remains untouched 24h+ later.

`cloudflare/moq-rs` Day +25 quiet; `google/quiche` moqt Day +3 quiet (no commits since the May 5 Vasiliev parser rewrite); `video-dev/moq-js`, `birneee/quiche_moq`, all Eyevinn repos all quiet.

**One implementation-side commit elsewhere**: [`Quicr/cat-rs`](https://github.com/Quicr/cat-rs) (newly open-sourced May 6) gets May 7 04:07 UTC commit `1e4423e` *"Security hardening: fix all audit findings"* by Suhas — Day +1 of post-open-source maintenance.

## Datatracker / MoQ Monthly / wiki

- **No new draft revisions**. WG state unchanged: transport-17, msf-00, loc-02, secure-objects-00 (-01 substantively ready in repo, **still not on Datatracker**), privacy-pass-02, cmsf-00. Notable individual: lite-04 (Apr 9), nmsf-01 (Apr 7), gregoire-moq-msfts-00 (May 6, **Day +2**).
- **MoQ Monthly**: No new issue. Day +7 since #1.
- **tobbee/moq-llm-wiki**: No new open issues.

## Interop runner — 19/72/14 — breaks the 4-day floor downward

**−1 pass / +1 fail vs 4 prior days at 20/71/14.** New post-NAB low; the matrix has now returned to the **Apr 17–21 floor reading of 19** (which was the early-floor reading before the late-April recovery wave to 25). moqtail PR #193 (upstream FETCH on cache miss) **did not merge** May 7 — yesterday's wiki noted it as the next candidate to move the matrix once `moqtail-relay` rebuilds, but the rebuild hasn't happened. Likely cause is **another image's rebuild** or natural per-run variance. Walking arc since the Apr 17 floor: 18 → 18 → 18 → 20 → 22 → 22 → 23 → 24 → 22 → 23 → 22 → 23 → 23 → 23 → 24 → 25 → 24 → 24 → 20 → 20 → 20 → 20 → **19**.

---

# Activity (May 6 06:00 UTC → May 7 06:00 UTC)

## IETF Datatracker — NEW individual draft `draft-gregoire-moq-msfts-00` (Gregoire/Simon, MPEG-2 TS over MoQ)

**[`draft-gregoire-moq-msfts-00`](https://datatracker.ietf.org/doc/draft-gregoire-moq-msfts/) submitted** May 6, 2026 — 21 pages — *MPEG-2 Transport Stream Packaging for Media Over QUIC Transport*.

- **Authors**: **Paul Gregoire** (Red5) and **Gwendal Simon** (Synamedia).
- **Scope**: extends [[moq-msf]] by registering the **`m2ts`** packaging value alongside CMSF (`cmaf`) and LOC. Defines catalog fields for transport-stream track description and specifies receiver/relay behavior for joining, switching, and validating packetized streams. Preserves existing MPEG-2 semantics while mapping consecutive source packets into MOQT Objects.
- **m2ts-specific catalog fields** (10 total):
  1. `m2tsPacketSize` (required, 188 or 192 octets)
  2. `m2tsPacketsPerObject` (optional, typical packets per object)
  3. `m2tsProgramNumber` (optional, program carried)
  4. `m2tsPmtPid` (optional, locates PMT)
  5. `m2tsPcrPid` (optional, identifies PCR location)
  6. `m2tsPsiInterval` (optional, PSI repetition interval in ms)
  7. `m2tsRandomAccess` (optional, signals whether groups begin at access points)
  8. `m2tsTimestampMode` (optional, timestamp interpretation for 192-octet packets)
  9. `m2tsScte35Pid` (optional, splice signaling)
  10. `initData` (optional, Base64-encoded initialization packets)
- **Significance**: **first non-CMAF, non-LOC packaging format proposed for the MSF umbrella** — extends MSF to broadcast/contribution workflows where MPEG-2 TS is still the dominant container. The 192-octet variant accommodates the M2TS source-packet form (4-byte timestamp prefix). SCTE-35 PID is explicitly modeled, signaling intent to support ad-insertion / splice points end-to-end.
- **First MoQ contribution from Paul Gregoire** (Red5), who maintains [`moqxr`](https://github.com/mondain/moqxr) (recent v0.2.1 release, Apr 17 Slack post). Co-author **[[gwendal-simon]]** is also the author of moq-transport [PR #1378 (SWITCH for client-side ABR)](https://github.com/moq-wg/moq-transport/pull/1378), still active. **First IETF-side artifact from Gwendal after the late-April spec/impl cross-pollination wave.**
- **No mailing-list announcement message yet** — both authors might announce on `moq@ietf.org` in the May 7+ window, or wait for the London June interim.

## moq-dev/moq — Evening burst day-2: PR #1385 REVERTS yesterday's PR #1356 within 24h; PR #1382/#1383 polish; PR #1386 opened; Issue #1384

[[luke-curley]] returns May 6 evening (~20:00–22:30 UTC) for a second burst building on the May 5 seven-PR run. Notable element: **PR #1385 reverts PR #1356 (`insert_track` takes `TrackConsumer`)** ~24 hours after it merged.

- **[PR #1382](https://github.com/moq-dev/moq/pull/1382) MERGED** May 6 20:03 UTC by [[luke-curley]] (+3/−0) — *Unignore moq-mux test fixtures*. Test-fixture file inclusion fix following the moq-mux backport (PR #1341). Cosmetic.
- **[PR #1383](https://github.com/moq-dev/moq/pull/1383) MERGED** May 6 21:09 UTC by [[luke-curley]] (+15/−5) — *@moq/watch: don't tear down a broadcast when an unrelated path flaps*. Targeted fix in the TypeScript `watch` package for spurious broadcast tear-downs when an unrelated subscription/announcement path changes state.
- **[Issue #1384](https://github.com/moq-dev/moq/issues/1384) OPENED** May 6 20:41 UTC by [[luke-curley]] — *@moq/signals improvements*. Tracks reactive-signals layer cleanup in the TypeScript `signals` package.
- **[PR #1386](https://github.com/moq-dev/moq/pull/1386) OPENED** May 6 21:51 UTC by [[luke-curley]] (+88/−130, **OPEN**) — *@moq/watch: source network stats from the connection, not navigator*. Replaces use of `navigator.connection` (which Firefox doesn't expose, and which other browsers report unreliably) with stats sourced directly from the QUIC connection object. **Second Firefox-compatibility-affecting PR** in two days (after PR #1307 legacy SETUP fallback, also still open).
- **[PR #1385](https://github.com/moq-dev/moq/pull/1385) MERGED** May 6 22:08 UTC by [[luke-curley]] (+160/−117) — *Revert "moq-lite: switch insert_track to take TrackConsumer (#1356)"*. Body is the standard auto-generated revert text (*"This reverts commit `b611acd1`."*). **Backs out PR #1356 ~24 hours after it merged on May 5 22:15 UTC** — the type-level cleanup that was supposed to land the `TrackConsumer::produce()` removal from #1300 has been pulled back. No follow-up issue or new PR yet explaining the regression that prompted the revert; the next release-train PR (#1338) will roll without that change. **First merge-then-revert-within-24h cycle on `main` since the Apr 30 PR #1357 → PR #1372 fetch_group revert (which took 2 days).**
- **[PR #1338](https://github.com/moq-dev/moq/pull/1338) updated** May 6 22:24 UTC — `chore: release` (moq-bot[bot]). Auto-bumped after the day's merges; will drop PR #1356 from the staging release line.
- **[PR #1358](https://github.com/moq-dev/moq/pull/1358) updated** May 6 21:32 UTC — Origin poll-driven rewrite, still open.
- **[PR #1149](https://github.com/moq-dev/moq/pull/1149) updated** May 6 19:06 UTC — catalog registry, still open.
- **[Issue #1364](https://github.com/moq-dev/moq/issues/1364) CLOSED** May 6 06:00 UTC — Dan Rossi's *"Cloudflare Relay"* question. No comment on close.
- **[PR #1374](https://github.com/moq-dev/moq/pull/1374) (Lite05 DATAGRAMS) — no movement** today (Day +2 since open).
- **[PR #1307](https://github.com/moq-dev/moq/pull/1307) (Firefox legacy-SETUP fallback) — no movement** today.

**Net**: Day-2 follow-up to the May 5 burst lands two small fixes (#1382, #1383) and **a notable revert (#1385)** that pulls PR #1356 back out of `main` within 24 hours of landing. PR #1386 (network-stats source change) is the day's only **new** open PR; it continues a Firefox-compatibility theme alongside the still-open PR #1307. Lite05 DATAGRAMS PR #1374 remains untouched for a 2nd day.

## moqtail — sharmafb upstream-FETCH 3-PR series MERGED in 27 minutes; PR #179 (Firefox docs) merges; PR #193 [4/n] opens

[[zafer-gurel]] merges **all 3 of sharmafb's upstream-FETCH PRs** (#186, #188, #187 in that order — note non-sequential merge order) on May 6 between 14:31 and 14:58 UTC, plus **davemevans's PR #179 Firefox docs** at 15:04 UTC. Late evening, **sharmafb opens PR #193** as the final piece of the upstream-FETCH series.

- **[PR #186](https://github.com/moqtail/moqtail/pull/186) MERGED** May 6 14:31 UTC by zafergurel (+15/0) — *[upstream fetches] Add command-line args for FETCH upstream timeout and gap limit [1/n]* (sharmafb / Aman Sharma). Adds two new relay command-line flags configuring upstream-FETCH timeout and gap-tolerance behavior.
- **[PR #188](https://github.com/moqtail/moqtail/pull/188) MERGED** May 6 14:56 UTC by zafergurel (+154/−8) — *[upstream fetches] Function to send upstream fetch [3/n]* (sharmafb). Adds the relay-side primitive for sending upstream FETCH requests to a publisher when a cache miss occurs. **Merged out of order vs #187** (the [2/n] plumbing PR).
- **[PR #187](https://github.com/moqtail/moqtail/pull/187) MERGED** May 6 14:58 UTC by zafergurel (+71/−6) — *[upstream fetches] Plumbing to forward FETCH data received from upstream [2/n]* (sharmafb). Adds the data-forwarding plumbing connecting the upstream FETCH response back to the requesting downstream subscriber. **Merge order 1 → 3 → 2** (likely cherry-pick / linearization rather than fast-forward).
- **[PR #179](https://github.com/moqtail/moqtail/pull/179) MERGED** May 6 15:04 UTC by zafergurel (+11/−2) — *docs: add instructions for Firefox testing using private CA* (davemevans / David Evans, opened Apr 29). Documents the `network.http.http3.disable_when_third_party_roots_found` Firefox config required when running moqtail behind mkcert + private CA. **Second non-maintainer-authored PR to land on `main` in 2 days** (after thexeos's co-authorship in PR #191 yesterday).
- **[PR #192](https://github.com/moqtail/moqtail/pull/192) OPENED** May 6 15:05 UTC by github-actions[bot] — *[ci] release*. Standard release-line bump capturing #186/#187/#188/#179.
- **[PR #193](https://github.com/moqtail/moqtail/pull/193) OPENED** May 6 23:11 UTC by sharmafb (+248/−132, **OPEN**) — *[upstream fetches] Finish implementation of sending FETCH requests upstream for cache misses [4/n]*. **Capstone of the 4-PR series.** Body summary:
  - **Upstream fetch on cache miss**: relay now iterates group-by-group and sends a FETCH upstream to the publisher for any groups missing from the local cache, rather than serving only from the cache.
  - **Split `fetch_requests` into incoming and outgoing**: separated the single `fetch_requests` map into `incoming_fetch_requests` (fetches the client sent to the relay) and `outgoing_fetch_requests` (fetches the relay sent to the publisher).
  - **Use publisher's track alias**: upstream FETCH requests now use the publisher's own track alias instead of the relay's internal track ID, so the response stream can be resolved correctly.
  - **Manual test plan**: 4-terminal local setup with relay, publish-namespace client (modified to respond to incoming FETCH by replaying objects), subscribe client, and fetch client; relay-side logs confirm cache hits and misses.
- **[Commit `ccf9d2e`](https://github.com/moqtail/moqtail/commit/ccf9d2e)** May 6 08:59 UTC by **Ali C. Begen** — *docs: update reference*. Co-maintainer commit on `main`.

**Net**: moqtail completes a key relay capability — **upstream FETCH on cache miss** — through a contributor-led 3-PR series merged in a 27-minute window, with the 4th and largest PR (the actual upstream fetch logic) opened the same evening. Combined with **PR #179 (davemevans Firefox docs)** also merging, this is the **second consecutive day with non-maintainer-authored merges on `main`** (after thexeos's co-authorship in PR #191 on May 5). The moqtail contributor base is widening visibly — sharmafb and davemevans both had multiple PRs land in the May 5–6 window.

## moq-wg/secure-objects — First commits in many weeks: Suhas merges PR #87 (diagram fix)

After a multi-week silent period on `main`, **[[suhas-nandakumar]]** lands a 2-commit diagram fix.

- **Commit `8d789cf`** May 6 13:30 UTC by Suhas Nandakumar — *Fix encryption/decryption diagrams to match SECURE_OBJECT_AAD structure*.
- **Commit `68f9f0b`** May 6 13:45 UTC by Suhas Nandakumar — *Merge pull request #87 from moq-wg/pic-fix*.

**Diagram-only fix** aligning the figure-level depiction of encryption/decryption flow with the SECURE_OBJECT_AAD wire structure. **No normative change**. First commits on `main` in moq-wg/secure-objects since the May 1 editorial wave; the secure-objects-01 substantive draft (containing the SFRAME RFC reference, additional test vectors, and en-dash fix from the still-open #83/#84/#85 trio) is **still not on Datatracker** as of May 7.

## moq-wg/moq-transport — Quiet day on `main`; only PR #1604 timestamp ping

No new commits, merges, or new issues opened on `main` in the May 6 06:00 UTC → May 7 06:00 UTC window.

- **[PR #1604](https://github.com/moq-wg/moq-transport/pull/1604) (Joining FETCH with subscription)** — touched at May 6 15:04 UTC; no new comment surfaced — likely a label/state update rather than a substantive comment after [[alan-frindell]]'s May 5 16:36 UTC reframing.

Open PR slate unchanged.

## Mailing list — Quiet for 2nd consecutive day

**No new messages** on `moq@ietf.org` on May 6 or May 7 (through the wiki window). Cullen's *"Request Synchronization Use Case"* thread (May 1) and Magnus Westerlund's three May 4 framing messages now sit unanswered for **6 days** and **3 days** respectively. **Notably, no announcement message** was posted for the new `draft-gregoire-moq-msfts-00` draft. The "Knowing the start of a Subgroup" thread is also dormant since [[alan-frindell]]'s twin May 5 pushback messages.

## Slack #moq — CAT4MOQ libraries open-sourced; Dan Rayburn MOQ Town Hall scheduled May 12

Two new posts in the May 6 06:00 UTC → May 7 06:00 UTC window — first `#moq` activity since [[torbjorn-einarsson]]'s May 5 06:43 CEST moqlivemock+warp-player announcement.

- **[[suhas-nandakumar]] May 6 17:49 CEST** — *"Just some updates on CAT4MOQ related implementation work"*:
  1. **`catapult`** (C++ library, [github.com/Quicr/catapult](https://github.com/Quicr/catapult)) — open-sourced for a while, used in internal dev/testing.
  2. **`cat-rs`** (Rust library, [github.com/Quicr/cat-rs](https://github.com/Quicr/cat-rs)) — **newly open-sourced**. Both libraries up to date with C4M spec, full CAT token implementation with **DPoP support**.
  3. Cisco/Quicr commits to keeping both libs current and welcomes feedback.
  - **Significance**: First open-sourcing of a Rust CAT4MOQ implementation. Pairs with the existing C++ `catapult` to give the [[moq-privacy-pass|privacy-pass]] / CAT4MOQ track its first cross-language client-side coverage. Suhas is a [[moq-wg/secure-objects|secure-objects]] co-editor, so the timing aligns with this morning's diagram-fix merge as a coherent Cisco/Quicr push.
- **Will Law (Akamai) May 6 09:44 CEST** — Dan Rayburn is hosting a **live MOQ Town Hall Zoom session on May 12 at 1pm ET**, open to everyone. *"Please join to answer the questions, promote your project or service, or debate the nuances of MOQT."* [LinkedIn announcement](https://www.linkedin.com/posts/danrayburn_moq-openmoq-streamingmedia-share-7457463529865113602-KstM).
  - **Significance**: First public-facing moderated MoQ town hall (vs IETF interim or Demuxed-style talks). Dan Rayburn is a streaming-industry analyst (StreamingMediaBlog); the framing is industry-promotion + practitioner debate. Falls 6 days before the next regular WG cadence; slot timing (1pm ET = 19:00 CEST = 17:00 UTC = 10am PT) hits both EU and US working hours.

`#moq-rs` (C09CG9V7A2Y), `#moq-js` (C09BZ7KH0BZ), `#libquicr` (C08ER7J16BF) all unchanged.

## Other implementations — quiet

- **cloudflare/moq-rs**: No new commits since Apr 13 (Day +24 of upstream-fork quiet).
- **video-dev/moq-js**: No new commits since Apr 16.
- **google/quiche** (`quiche/quic/moqt`): No new commits since the May 5 01:02 UTC `1ceadc7` Vasiliev *"Rewrite MOQT control message parser"* — Day +2 of post-rewrite quiet.
- **birneee/quiche_moq**: No new commits since Mar 13.
- **Eyevinn/moqlivemock + warp-player**: No new commits since the May 5 v0.8.0 release.
- **Eyevinn/moqtransport**: No new commits.

# Activity (May 5 06:00 UTC → May 6 06:00 UTC)

## moq-dev/moq — Luke's biggest single-day merge run; 7 PRs land (incl. PR #1341 +2588/−3594 moq-mux backport, PR #1378 API tightening, Origin renames, DNS fix, TOML config); PR #1307 OPENED for Firefox legacy-SETUP fallback

[[luke-curley]]'s most active day on `main` since the Apr 29–30 wave. Seven PRs merged in a ~9-hour window, ranging from a 2588-line moq-mux backport to a single-line social-image swap. **No new wire-version increments** today (Lite05 PR #1374 still open).

- **[PR #1377](https://github.com/moq-dev/moq/pull/1377) MERGED** May 5 17:17:23 UTC by [[luke-curley]] (+52/−1, 4 files; closes [#1376](https://github.com/moq-dev/moq/issues/1376)) — *fix(config): accept single string or array for TOML list fields*. Several relay TLS/auth fields are typed as `Vec<_>` but were documented in `demo/relay/prod.toml` as plain strings, so loading those configs failed with *"invalid type: string, expected a sequence."* Applies `serde_with::OneOrMany<_, PreferMany>` (already used elsewhere) so a bare string and a TOML array both deserialize into a `Vec`. Affected fields: `server.tls.{cert,key,generate,root}`, `tls.root` (`ClientTls`), `web.https.root`, `auth.tls.root`, `auth.domains`. **Smallest production-fixing PR** of the day; closes a real config-load failure.
- **[PR #1380](https://github.com/moq-dev/moq/pull/1380) MERGED** May 5 18:51:38 UTC by [[luke-curley]] (+130/−127, 7 files) — *moq-lite: port Origin API renames from #1358*. Stacked on #1378. **Ports the public-API renames from #1358 without the new state model.** The existing `OriginNode` tree, `web_async::spawn` cleanup, and tokio mpsc fan-out stay untouched. Renames: `OriginProducer::publish_only` → `scope`; `OriginConsumer::consume_only` → `scope`; `OriginConsumer::try_consume_broadcast` → `get_broadcast`; `OriginProducer::consume_only` and `try_consume_broadcast` **dropped** (callers write `producer.consume().scope(p)` / `.get_broadcast(p)` instead). Rationale: every `consume_xxx` on `OriginProducer` was a one-liner shortcut for `producer.consume().xxx()`. **Picks up the consumer-facing API surface from PR #1358's massive Origin rewrite without merging the substrate change itself.**
- **[PR #1379](https://github.com/moq-dev/moq/pull/1379) MERGED** May 5 19:22:22 UTC by [[luke-curley]] (+110/−11, 3 files) — *Fix DNS resolution to prefer matching address family*. **Fixes DNS resolution issues on Windows and other platforms where sockets may be bound to a single address family.** New utility `pick_addr()` in `util.rs` selects a single DNS entry from multiple results, preferring one whose address family matches the local socket; falls back to the first entry if no family match. Resolves `AddrNotAvailable` errors when DNS returned both A and AAAA but the local socket was bound to only one family. **Cross-platform stability fix** — moq-relay clients on Windows previously saw spurious connect failures.
- **[PR #1381](https://github.com/moq-dev/moq/pull/1381) MERGED** May 5 20:03:32 UTC by [[luke-curley]] — *Update OG image with proper dimensions for social sharing*. Cosmetic, no code impact.
- **[PR #1378](https://github.com/moq-dev/moq/pull/1378) MERGED** May 5 20:08:31 UTC by [[luke-curley]] (+295/−240 across 20 files) — *moq-lite: tighten public API surface and remove deprecated methods*. Body: *"Make `ALPN_*` constants, `MAX_HOPS`, the coding module, and the encode_params!/decode_params! macros crate-private; re-export `DecodeError`/`EncodeError`/`BoundsExceeded` from the crate root. Drop deprecated `TrackProducer::close`, `TrackConsumer::poll_next_group`, `TrackConsumer::next_group` (alias), `FrameProducer::write_chunk`, and the `OriginProducer/OriginConsumer consume_broadcast` methods. The sync lookup is preserved as `try_consume_broadcast` for callers (e.g. libmoq's FFI) that genuinely need it. Rename `TrackConsumer::next_group_ordered/poll_next_group_ordered` back to `next_group/poll_next_group` now that the deprecated aliases are gone, and clarify the `recv_group` vs `next_group` docs. Add `Origin::new(id)` for callers that need a stable identifier. Add a Producers/Consumers and Async section to the crate-level docs, and fill in missing doc-strings across the model module. Migrate moq-relay (`web.rs` uses `announced_broadcast` within the fetch deadline; `cluster.rs` drops the unused `Cluster::get`) and `libmoq / moq-ffi` to the new method names."* Test plan: `cargo check --workspace`, `cargo test -p moq-lite --lib` 278/278 pass. Body marked *"🤖 Generated with Claude Code"*. **Largest API-surface tightening of the moq-lite cycle; finalizes the deprecation queue accumulated since Lite03.**
- **[PR #1356](https://github.com/moq-dev/moq/pull/1356) MERGED** May 5 22:15:50 UTC by [[luke-curley]] (+117/−160, 7 files) — *moq-lite: switch insert_track to take TrackConsumer*. Body: *"Change `BroadcastProducer::insert_track` to take `TrackConsumer` (by value) instead of `&TrackProducer`. Remove `TrackConsumer::produce()` from #1300 — it was added as a workaround that this change supersedes. Add `TrackConsumer::weak()` (`pub(crate)`) so the broadcast can derive its `TrackWeak` from a consumer."* The `&TrackProducer` parameter was effectively a witness that *some* producer existed, but the API misleadingly suggested the broadcast was taking ownership of publishing rights. **Lands the type-level cleanup that was in flight since Apr 28.**
- **[PR #1341](https://github.com/moq-dev/moq/pull/1341) MERGED** May 6 01:20:29 UTC by [[luke-curley]] (+2588/−3594 across 82 files) — *moq-mux backport + dual-API cleanup*. **Largest moq-dev/moq merge of the post-NAB period.** Backports the `moq-mux` structural refactor from `dev` to `main`, then collapses the dual API surface that grew during the merge into a single canonical one. Backport elements: module reorg `moq_mux::import` / `moq_mux::export` / `moq_mux::container` / `moq_mux::convert`; catalog-side `Container::Cmaf { init: Bytes }` (init segment in the catalog) replacing the old `timescale` / `track_id` shape; **all codec support always compiled (no per-codec feature flags)**; lazy track creation, dropped per-track stats/drift tracking, simplified producer lifecycle; `Decoder` → `Framed`, `DecoderFormat` → `FramedFormat`; `convert::cmaf::Convert` and `convert::hang::Convert` for in-process container rewriting; `hang` catalog API: `Audio::insert` / `Video::insert` / `remove`, `OrderedProducer`, `Container::Cmaf { init }` schema. Cleanup (final commit `5e6d5a3`) collapses the parallel APIs in `moq_mux::export`: `OrderedConsumer<F: ContainerFormat>` → `Consumer<F: Container>`; `ContainerFormat` trait → `container::Container` trait; `OrderedFrame` (`BufList` payload) → `container::Frame` (`Bytes` payload); `OrderedMuxer<F>` (static `Vec<(name, OrderedConsumer)>`) → `Muxed` (catalog-driven, handles track changes); `export::Cmaf { timescale }` → `container::Cmaf { trak }`. **Net deletion of ~1000 lines** despite being a backport — much of the dev branch's transient API churn evaporates. ksletmoe-aws's #1359 effectively flowed back into the codebase via this merge in a different shape.
- **[PR #1307](https://github.com/moq-dev/moq/pull/1307) OPENED / updated** May 5 21:45:24 UTC by [[luke-curley]] (+150/−13, 7 files) — *moq-lite: negotiate Lite03+ via legacy SETUP when ALPN is unavailable*. Body: *"Firefox's WebTransport doesn't expose an ALPN selection API, so clients there can never pick `moq-lite-03`/`moq-lite-04`. Previously the fallback SETUP path (bare `moql` ALPN or no ALPN at all) only advertised `[Lite02, Lite01, Draft14]`, stranding Firefox on Lite02. Extend the fallback to advertise every supported moq-lite version in the draft-14 SETUP versions list. When the peer selects Lite03+, gracefully close the bootstrap SETUP stream and run the rest of the session as if it had been ALPN-negotiated (no SessionInfo control messages). Mirror the change in the Rust and TypeScript client/server paths, and add unit + integration tests covering the no-ALPN / `moql` negotiation of Lite03 and Lite04."* **Direct Firefox-WebTransport-compatibility fix.** Lifts Firefox from Lite02-only to full Lite03+ parity via legacy-SETUP fallback.
- **[PR #1338](https://github.com/moq-dev/moq/pull/1338) updated** May 5 22:37 UTC — `chore: release` (moq-bot[bot]). Staging PR for next moq-lite release; rolls in today's merges.
- **[PR #853](https://github.com/moq-dev/moq/pull/853) CLOSED unmerged** May 5 21:45:47 UTC — fcancela's *"Minimal observability metrics (relay & client)"* (+1261/−38, 29 files). **Major housekeeping close** — observability metrics PR was open from a much earlier era of the repo (note: this is from the `kixelated/moq-rs` legacy numbering). No comment on close.
- **[PR #856](https://github.com/moq-dev/moq/pull/856) CLOSED unmerged** May 5 21:45:33 UTC — ac-freeman's *"WIP: Delivery timeout"* (+225/−54, 14 files). Same housekeeping wave; long-stale WIP PR retired.
- **[PR #1374](https://github.com/moq-dev/moq/pull/1374) updated** May 5 16:17 UTC — Lite05 DATAGRAMS PR remains **open**, no merge today. Last activity is a refresh.
- **[PR #1371](https://github.com/moq-dev/moq/pull/1371) updated** May 5 16:07 UTC — `hang: cross-broadcast track references` remains **open**.

**Net**: Luke's largest single-day landings since Apr 29–30. **Six substantive merges (#1341, #1378, #1380, #1379, #1377, #1356)** clean up moq-lite's API surface, fix Windows DNS resolution, accept TOML config strings in list fields, and backport the entire `moq-mux` refactor with deletions. **Lite05 (PR #1374) is still on the open queue**, but the day's work has prepared the ground: API tightening (#1378), Origin API renames (#1380), and config robustness (#1377) all reduce the surface area that the Lite05 PR has to maintain compatibility with. The two-PR housekeeping close (#853, #856) retires multi-year-old open PRs predating the moq-lite split. Firefox-fallback PR #1307 is the day's only **new** open PR — addresses a known Firefox-WebTransport ergonomics blocker by gracefully degrading SETUP through the bare `moql` ALPN.

## moqtail — PR #189 + PR #191 MERGED (per-subscription early-discard, isValidTrackAlias BigInt fix); PR #156 closed in favor of #191; release commits

[[zafer-gurel]] continues the post-umbrella draft-16 release line — two more `moqtail-ts` API fixes and a CI release bump, all in a single ~25-minute window.

- **[PR #189](https://github.com/moqtail/moqtail/pull/189) MERGED** May 5 13:40:06 UTC by zafergurel (+18/−4, 4 files) — *feat(moqtail-ts): set early discard policy per subscription*. Body: *"Early discard policy can be set for each subscription separately."* **Refines the `setEarlyDiscardPolicy` API from May 4's PR #184 (which exposed it as a moqtail-ts-wide setting) to a per-subscription scope.** Subscribers can now apply different slow-stream thresholds to different tracks (e.g. video vs audio, hero vs PiP camera).
- **[PR #191](https://github.com/moqtail/moqtail/pull/191) MERGED** May 5 14:00:08 UTC by zafergurel (+51/−4, 4 files; closes [#156](https://github.com/moqtail/moqtail/pulls/156); co-authored by **@thexeos**) — *fix(moqtail-ts): adds isValidTrackAlias validator*. Body: *"Add `isValidTrackAlias` type guard in `src/client/util/validators.ts`, consolidating three inconsistent checks (`!trackAlias`, `=== undefined`, and a compound condition) into one canonical test that correctly accepts 0 as a valid alias."* **Fixes a BigInt-falsy bug** — several methods used `if (!trackAlias)` to check whether a `Map.get()` returned a value; since `trackAlias` is a `BigInt` and `0n` is falsy in JavaScript (`!0n === true`), the relay's first-assigned `trackAlias = 0` was incorrectly treated as missing. **First moqtail-ts merge with a non-maintainer co-author** — thexeos's PR #156 (filed earlier with the strict-undefined-check approach) was closed unmerged in favor of zafergurel's broader-validator landing, with attribution preserved via Co-Authored-By.
- **[PR #156](https://github.com/moqtail/moqtail/pull/156) CLOSED unmerged** May 5 14:01:57 UTC — thexeos's *"fix(moqtail-ts): use strict undefined check for trackAlias"*. Issue body cited the same draft-16 wire constraint (relay assigns `trackAlias = 0` to first announcer); the maintainer's broader fix landed via #191 with thexeos credited.
- **[PR #190](https://github.com/moqtail/moqtail/pull/190) MERGED** May 5 14:04:21 UTC by github-actions[bot] — *[ci] release*. Cuts the next moqtail release line (presumably v0.9.x continuation) capturing #189 + #191.
- **[PR #179](https://github.com/moqtail/moqtail/pull/179) updated** May 5 10:04:48 UTC by **davemevans** (David Evans) — *docs: add instructions for Firefox testing using private CA*. Still open. Documents the `network.http.http3.disable_when_third_party_roots_found` Firefox config required when running moqtail behind mkcert + private CA. **Today's only externally-authored open PR.**
- **PRs #186 / #187 / #188** (sharmafb's upstream-FETCH 3-PR series) — **all 3 still open**, no movement vs May 4–5 baseline. No new commits or comments.

**Net**: Two-merge polish day on `moqtail-ts`. The per-subscription early-discard refinement (#189) signals that moqtail-ts's slow-stream API is being driven by real-application feedback (likely from the `apps/meet` WebRTC-over-MoQ demo). The thexeos co-authorship in #191 establishes a template for absorbing externally-proposed fixes — the maintainer takes the "right" broader fix while preserving credit. The CI release line (#190) suggests moqtail-ts will publish frequent post-umbrella draft-16 patches as the API is hardened.

## moq-wg/moq-transport — Quiet day; 2-commit SWITCH message-type fix on PR #1378; afrind comment on PR #1604

No new commits, merged PRs, or new issues opened on `main` between May 5 06:00 UTC and May 6 06:00 UTC. Two PR-level updates:

- **[PR #1378](https://github.com/moq-wg/moq-transport/pull/1378) (gwendalsimon SWITCH for client-side ABR) updated** May 5 09:55–09:59 UTC with **two commits**:
  - `c301893` 09:55:31 UTC — *fix(switch): change SWITCH message type from 0x12 to 0x1F*
  - `77e5326` 09:59:51 UTC — *fix(switch): change SWITCH message type to 0x1B*
  Two consecutive code-point assignments in a 4-minute window suggests Gwendal pulled the registry table mid-edit and reconciled to **0x1B** as the final SWITCH type. PR #1378 is **+168/−0, 1 file** (single message-section addition). Open since Nov 24, 2025; received its first push in months as the Joining-FETCH-vs-SWITCH design space heats up.
- **[PR #1604](https://github.com/moq-wg/moq-transport/pull/1604) (martinduke Joining FETCH with subscription) — afrind comment** May 5 16:36:31 UTC. Replying to the design-rationale debate from prior days: *"Luke indicated in another issue a case where you want future SUBSCRIBE groups > FETCH current group > SUBSCRIBE current group. But that also can't be expressed in any form in MOQ today."* Frames the priority-overlap concern as an open gap in the spec rather than a blocker on PR #1604.

Open PR slate unchanged: #1627 (ianswett SUBSCRIBE-with-Joining-Fetch alternative), #1604, #1617, #1615, #1625, #1607, #1544, #1623, #1618, #1621, #1591, #1605, **#1378 (now active)**, #1613.

## moq-wg/loc — Luke OPENS Issue #19 ("How do you encode LOC Private Properties?")

[[luke-curley]] opens the **first new LOC issue since the Apr 30 PR #1624 LOC-properties registry merge.**

- **[Issue #19](https://github.com/moq-wg/loc/issues/19) OPENED** May 5 22:12:11 UTC by **kixelated** ([[luke-curley]]) — *"How do you encode LOC Private Properties?"*. Body: *"The encoding of LOC Public Properties depend on the moq-transport version, but it's how are we supposed to encode private properties? I don't know the version, nor will it be the same between an arbitrary publisher/subscriber with a relay in the middle."* Follow-up self-comment May 5 22:14:17 UTC: *"Based on `vi64` I can guess that moq-transport-17 encoding is being used, but LOC itself is going to have to specify a specific version/encoding for anything in the payload."* **Argues LOC needs to lock down its own version/encoding contract for private properties** rather than implicitly inheriting whatever moq-transport version the connection negotiated — the publisher and subscriber may not even agree on the wire-version since relays can bridge them. **Direct conceptual challenge to LOC's current "borrow moq-transport's encoding" stance**; likely intersects with Yuanchao Chris's earlier #1550 (Properties Type collision moq-16 ↔ loc-01) but at a deeper architectural layer.

## Mailing List — afrind weighs in twice on "Knowing the start of a Subgroup"; pushes back on revisiting Subgroup ID size and varint audit

After 4 implementer voices (ian-swett, mo-zanaty, suhas-nandakumar, luke-curley) probed the single-byte Subgroup ID question on May 4, **[[alan-frindell]] enters the thread** with two replies in a 6-minute window taking a **conservative editor's stance**.

- **[[alan-frindell]] May 5 16:56 UTC** ([msg](https://mailarchive.ietf.org/arch/msg/moq/ikxGhCS3LMvDeEA9YjKF_zPqgBY/)) — replying to Luke Curley's May 4 use-case question (*"What are the use-cases for a sub-group per object/datagram? I think for media, it would be sending each b-frame as a separate sub-group."*). **Pushes back on revisiting Subgroup ID width**: *"We've already been over this ground and I don't see any need to revisit the size of the subgroup ID field."* Counter-frames the prioritization argument: *"Group IDs and Object IDs are varints and are also part of the priority scheme, so 'we only have 1 byte for prioritization' is already the wrong place to start from."* Concedes one editorial gap: *"It would be nice to have a specification for how to rationalize the priority of mixed subgroup and datagram groups that's not 'implementation defined'"* — but tags it as a tertiary concern, not sufficient justification to reopen Subgroup ID encoding.
- **[[alan-frindell]] May 5 17:02 UTC** ([msg](https://mailarchive.ietf.org/arch/msg/moq/-VFBqpRny-7ZehuT7nD20x4GiXg/)) — replying to a Cullen suggestion that group/track/subgroup starts could be addressed simultaneously since they represent the same problem. **Splits the problem into three cases:**
  1. **Group starts** — already solved: *"either it starts at Object ID = 0, or the OP can include a Gap header indicating the objects from 0 - the actual start do not exist."*
  2. **Track starts** — non-trivial because *"publishers can lose state between publishing instances"*. Acknowledges adding a Track Property is plausible but *"we've been at this four years and no one has needed it"* — argues against speculative implementation without demonstrated need.
  3. **Subgroup ID priority overlap** — restates the Group/Object ID varint counter-argument from his earlier message; closes the door on a fresh varint-vs-fixed-width audit.

**Net**: afrind walks back **both fronts of Mo Zanaty's May 4 04:24 UTC varint-vs-fixed-width audit call** (Subgroup ID width + broader varint review) by reframing them as already-decided. Combined with Ian Swett's May 3 22:38 UTC FIRST_OBJECT-bit decision message, the editorial direction now signals: **subgroup-design topics are closed for draft -18; the varint-audit reopening would need fresh on-list advocacy.** Magnus Westerlund's May 4 framing on request-synchronization ("problem-solving, not removal of consensus") stands unanswered by Cullen for a **5th day**.

## Slack #moq — Quiet (no new posts since Tobbe's May 5 06:43 CEST moqlivemock announcement)

`#moq` shows zero new posts in the May 5 06:00 UTC → May 6 06:00 UTC window. The 3 react-clap reactions on Tobbe's announcement are the only post-Slack-MCP-probe activity. `#moq-rs` (C09CG9V7A2Y), `#moq-js` (C09BZ7KH0BZ), `#libquicr` (C08ER7J16BF) all unchanged.

## Other implementations — quiet

- **cloudflare/moq-rs**: No new commits since Apr 13 (Day +23 of upstream-fork quiet).
- **video-dev/moq-js**: No new commits since Apr 16.
- **google/quiche** (`quiche/quic/moqt`): No new commits since the May 5 01:02 UTC `1ceadc7` *"Rewrite MOQT control message parser"* (Vasiliev) — Day +1 of post-rewrite quiet.
- **birneee/quiche_moq**: No new commits since Mar 13.
- **Eyevinn/moqlivemock + warp-player**: No new commits since the May 5 04:15 UTC v0.8.0 release.
- **Eyevinn/moqtransport**: No new commits in window.
- **moq-wg/secure-objects, msf, cmsf, catalog-format, privacy-pass**: No new activity since the May 1 secure-objects editorial wave. Open secure-objects PRs remain #83 (SFRAME RFC ref), #84 (test vectors), #85 (en-dash fix). draft-ietf-moq-secure-objects-01 still **not** on Datatracker.

## tobbee/moq-llm-wiki — No open issues

No new issues. (3 issues all closed: #1 OpenMOQ, #2 broken interop-runner links, #3 factual corrections.)

## MoQ Monthly — No new issue

Archive remains #0 (Mar 3) + #1 (Apr 30 / May 1). Day +5 since #1 publication.

# Interop Runner (May 6 00:36 UTC)

**20 pass / 71 fail / 14 skip** (105 tests). **Flat day** vs May 5 00:37 UTC's identical 20/71/14 — no recovery from the May 5 −4 pass / +4 fail regression. Walking arc: 18 → 18 → 18 → 20 → 22 → 22 → 23 → 24 → 22 → 23 → 22 → 23 → 23 → 23 → 24 → 25 → 24 → 24 → 20 → **20**. Two consecutive days at the Apr 17–21 floor reading.

Implementation activity in the May 5 02:00 UTC → May 6 00:36 UTC window:
- **moq-dev/moq merged 7 PRs** (#1341, #1356, #1377, #1378, #1379, #1380, #1381) — final merge `34dc7c9` at May 6 01:20 UTC was **after** the May 6 00:36 UTC interop run, so the moq-mux backport (largest of the day) does **not** affect this report. Earlier merges (PRs #1377–#1380, all merged 17:17–22:15 UTC May 5) **could** be reflected if `moq-dev-rs` / `moq-dev-js` builders rebuilt before the run. None of these are wire-format changes; they are API-surface and platform-portability fixes, so wire interop should be preserved.
- **moqtail merged PR #189 + #191 + #190** (May 5 13:40–14:04 UTC). `moqtail-ts`-only changes; Rust relay code unchanged, so the interop matrix should be unaffected on the moqtail-relay rows.
- **moq-transport had no `main` merges** in window.
- **moqtail PR #145 (umbrella draft-16) merged into `main` May 4 19:23 UTC** is now ~30 hours old — the moqtail-relay docker image rebuild that drove the May 5 regression has presumably stabilized. **Net zero on the matrix today** suggests the post-umbrella moqtail-relay state is the new normal until specific pair-level fixes land.

Pair-level diff inspection still warranted to confirm which moqtail × {moq-dev / moq-rs / others} pairs flipped on May 5 and remain flipped today.

---

# Activity (May 4 06:00 UTC → May 5 06:00 UTC)

## moqtail — PR #145 (umbrella draft-16) FINALLY MERGED into main; draft-14 docs removed; setEarlyDiscardPolicy added; sharmafb opens upstream-FETCH 3-PR series

After being open since **March 6** and absorbing 29 commits / 216 files / +17,114 / −11,744, [[zafer-gurel]]'s draft-16 umbrella PR landed on `main`.

- **[PR #145](https://github.com/moqtail/moqtail/pull/145) MERGED** May 4 19:23:22 UTC by **zafergurel** — *feat: draft-16 compatibility*. Body: *"Here is a substantial PR thanks to the huge difference between draft-14 and draft-16."* Brings moqtail into full compliance with [draft-ietf-moq-transport-16](https://datatracker.ietf.org/doc/html/draft-ietf-moq-transport-16). Highlights from the merge body:
  - **Setup/Session**: New ALPN-based ClientSetup/ServerSetup negotiation (#132). Two new demo apps: `apps/client-js` (browser subscriber) and `apps/meet` (WebRTC-over-MoQ video conferencing demo). Renamed `request_id` → `max_request_id` (#146).
  - **Control Message Overhaul**: Replaced VersionParameter with **MessageParameter** (#153) — typed parameters: `DeliveryTimeout`, `Expires`, `Forward`, `GroupOrder`, `LargestObject`, `NewGroupRequest`, `SubscriberPriority`, `SubscriptionFilter`. **Track Extensions** + **Object Extensions** (#155) added across `Publish`/`Subscribe`/`Fetch`/`PublishOk`/`SubscribeOk`/`FetchOk`. **Unified request ID registry** (#163).
  - This is the largest single moqtail merge since the project's draft-14 baseline; the `draft-16` integration branch (existed since Mar 6) is now collapsed into `main`.
- **[PR #181](https://github.com/moqtail/moqtail/pull/181) MERGED** May 4 19:39:57 UTC by zafergurel — *refactor: clean up object status values* (closes Issue #117 *"Remove 0x1 from Object Status"*).
- **[PR #182](https://github.com/moqtail/moqtail/pull/182) MERGED** May 4 20:12:09 UTC by zafergurel — *docs: remove draft 14 texts*. **moqtail formally drops draft-14 documentation** ~30 minutes after the umbrella draft-16 lands. moqtail is now a single-draft project (draft-16).
- **[PR #184](https://github.com/moqtail/moqtail/pull/184) MERGED** May 4 21:21:20 UTC by zafergurel — *feat: add setEarlyDiscardPolicy to moqtail-ts API* (+85/−38). Body: *"add setEarlyDiscardPolicy to cancel slow subgroup streams after a configurable timeout."* New developer-facing API for slow-stream protection.
- **README updated** May 4 20:27 UTC by **Ali C. Begen** (`1d39865`) — first commit on `main` from the co-maintainer in this update window.
- **CI release commits** (#173, #183, #185) bumped versions on `main`. v0.9.x release line presumably published.
- **PR #186 OPENED** May 4 21:37:33 UTC by **sharmafb** (Aman Sharma) — *[upstream fetches] Add command-line args for FETCH upstream timeout and gap limit [1/n]* (+15/0). Body: *"This is going to be the first in a series of commits that aims to implement upstream fetches."* Underscore-prefixed unused vars to be filled in by [2/n] and [3/n].
- **PR #187 OPENED** May 5 02:35:51 UTC by **sharmafb** — *[upstream fetches] Plumbing to forward FETCH data received from upstream [2/n]* (+71/−6, 4 files). Body: *"making some plumbing changes so that in handle_uni_stream, when we receive objects in a stream from the upstream, we can forward it to the downstream."*
- **PR #188 OPENED** May 5 02:50:23 UTC by **sharmafb** — *[upstream fetches] Function to send upstream fetch [3/n]* (+154/−8, 5 files). Body: *"writing a function send_upstream_fetch_for_range to send FETCHes upstream."*

**Net**: moqtail's biggest week of the year. The draft-14→draft-16 wholesale migration on `main` is done; the relay can now host upstream FETCH plumbing as a feature increment (Aman Sharma's 3-PR series). Combined with the May 4 20:02 UTC `fix: fix relay url for the player`, moqtail is positioning for a clean draft-16 production release.

## moq-dev/moq — Luke OPENS PR #1374 (DATAGRAMS control stream + QUIC datagram delivery, Lite05 wire version)

[[luke-curley]] introduced moq-lite's biggest wire-level addition since the protocol's inception — opt-in unreliable datagram delivery as a brand-new wire version.

- **[PR #1374](https://github.com/moq-dev/moq/pull/1374) OPENED** May 4 22:57:32 UTC by [[luke-curley]] — *moq-lite: add DATAGRAMS control stream + QUIC datagram delivery (Lite05)* (+1615/−7 across 21 files; both Rust and TypeScript libraries). Body: *"New wire version Lite05 / DRAFT_05 (ALPN moq-lite-05, code 0xff0dad05) gating an opt-in unreliable delivery path."* Key elements:
  - **New `DATAGRAMS` bidi control stream (`0x6`)** parallel to `SUBSCRIBE`. Sharing the same `subscribe_id` namespace lets a single QUIC datagram body be routed by ID alone.
  - **QUIC datagram body**: `subscribe_id (i) | sequence (i) | payload (b)`, **payload capped at 1200 B**. Sequence number is preserved on the wire (ignored by Lite05 semantics) so a future moq-transport adapter can reuse the encoding.
  - **33 ms publisher-side cache**; per-subscriber `max_latency` filters stale entries on forward. *"max_latency = 0 is strict: only fresh arrivals (no congestion-delayed retries)."*
  - **Public API**: groups-mirroring — `TrackProducer.write_datagram` / `append_datagram`, `TrackConsumer.subscribe_datagrams` → `DatagramsConsumer`. JS exposes `Track.writeDatagram` / `appendDatagram` / `recvDatagram` / `skipDatagramsToLatest`.
  - **Spec draft** section + Lite05 changelog entry live in the separate `moq-wg/moq-drafts` repo.
  - 17 new Rust tests, 12 new TS tests; manual-relay round-trip and Lite04↔Lite05 cross-version sanity still pending.
  - PR body explicitly notes: *"🤖 Generated with Claude Code"*.
- **[PR #1356](https://github.com/moq-dev/moq/pull/1356) updated** May 4 23:10 UTC by [[luke-curley]] — *moq-lite: switch insert_track to take TrackConsumer* (+39/−93). Body: *"The `&TrackProducer` parameter was effectively a witness... `TrackConsumer` is the honest type for 'I have a handle to this track.'"* Removes `TrackConsumer::produce()` from #1300.
- **[PR #1373](https://github.com/moq-dev/moq/pull/1373) updated** May 4 22:25 UTC by **skirsten** — playback stalls / frame-rate beating fix (still open, follow-up to PR #1367).
- **[PR #1341](https://github.com/moq-dev/moq/pull/1341) updated** May 4 22:24 UTC by [[luke-curley]] — *Refactor media producers and simplify fMP4 CMAF passthrough* (+3808/−2025 across 79 files). Includes module reorg `moq_mux::import` → `moq_mux::producer`, removed feature gates, init-segments now base64-encoded ftyp+moov in catalog.

**Net**: PR #1374 introduces the **Lite05** wire version with optional datagram delivery, opening a new dimension to moq-lite's design — the framework for low-latency unreliable transport as a peer to subgroup-stream delivery. The 33ms freshness cap is a firm latency target; per-subscriber `max_latency` is a novel knob. Lite05 spec text lives in moq-drafts (a separate repo not yet visible to the wiki crawler). Notable that this is a **wire-version increment** (Lite04 → Lite05) — earlier moq-lite changes typically remained inside Lite04.

## moq-wg/moq-transport — Quiet (no new PRs / merges in the window)

No new commits, merged PRs, or issues opened on `main` between May 4 06:00 UTC and May 5 06:00 UTC. Open PRs unchanged: #1627 (ianswett SUBSCRIBE-with-Joining-Fetch alternative), #1604 (martinduke Joining FETCH carry on SUBSCRIBE stream), #1617 (afrind GOAWAY individual requests), #1615 (ianswett Remove RRID, *Merge Ready*), #1625 (Magnus Security rebase), #1607 (Largest Available Group filter), #1544 (Improve Startup Latency / 0-RTT), #1623 (Remove Request ID from GOAWAY), #1618 (FIRST_OBJECT bit), #1621 (Forbid relays lying about LARGEST_OBJECT), #1591 (flow control for Subscriptions), #1605 (Split DELIVERY_TIMEOUT), #1378 (SWITCH for client-side ABR), #1613 (MAX_REQUEST_UPDATES setup option).

## google/quiche `moqt` — First commit since Apr 22 (Day +13)

- **`1ceadc7`** May 5 01:02:22 UTC — *Rewrite MOQT control message parser* (Vasiliev). **First moqt commit on `google/quiche` `main` since the Apr 22 `1004527` "Allow MoqtClient and MoqtServer to control session parameters."** Ends a 13-day quiet period. Suggests Vasiliev is back on the moqt subtree after the late-April pause.

## Mailing List — Heavy May 4 day; 'Knowing the start of a Subgroup' (single-byte Subgroup ID debate continues), 'Request Synchronization Use Case' (Magnus replies), Magnus on minutes quality

After Cullen's May 1 *"Request Synchronization Use Case"* sat unanswered for 3 days, [[magnus-westerlund]] returned to the list and replied substantively. The Subgroup ID thread also got a fresh round, this time digging into single-byte feasibility.

### Knowing the start of a Subgroup (4 new May 4 messages)

- **[[ian-swett]]** May 4 12:56 EDT (16:56 UTC) ([msg](https://mailarchive.ietf.org/arch/msg/moq/dpfivbI043m20hxziKNBYN38V2I/)) — replies to Mo Zanaty's varint critique. **Calls limiting Subgroup ID to a single byte *"a very appealing change"***, but flags the cost: *"if you wanted to do Object-per-Subgroup and couldn't or didn't want to use datagrams, you'd be limited to 256 Objects per Group."* References Issue #1405 (single-object subgroups). Repeats the broader concern: both Subgroup ID and Priority overlap as prioritization mechanisms within a Group; Priority was previously agreed to be a single byte, while Subgroup ID currently creates a much larger namespace. *"Maybe I'm overthinking it... worth exploring simplifications."*
- **[[mo-zanaty]]** May 4 17:36 UTC ([msg](https://mailarchive.ietf.org/arch/msg/moq/xShnVHc5vXqEBrhUfU8czjTnkkU/)) — proposes a workaround for object-per-subgroup applications: *"transmit numerous objects as separate streams using identical identifiers (such as 0) and reset values."* Acknowledges this is inelegant, suggests a **specialized header format for single-object streams** as an alternative — references Issue #1405, notes conceptual similarity to datagrams, and proposes a dedicated header type combining desired characteristics of both. **If stream-per-object is achievable without consuming many Subgroup IDs, a single byte for Subgroup ID would suffice.**
- **[[suhas-nandakumar]]** May 4 17:40 UTC (10:40 PDT) ([msg](https://mailarchive.ietf.org/arch/msg/moq/JHLULNLlNJ-o_RikD_XB8Ba-2-4/)) — *"Is there a use-case where we need more than 256 subgroups and needs to be considered for prioritization? I cannot think of one but appreciate inputs from others."*
- **[[luke-curley]]** May 4 20:00 UTC (13:00 PDT) ([msg](https://mailarchive.ietf.org/arch/msg/moq/tPHPb_3nf893KMqICMIUJqE0NFI/)) — questions the use case: *"What are the use-cases for a sub-group per object/datagram? I think for media, it would be sending each b-frame as a separate sub-group."* Asks the WG how prioritization should work in that pattern.

### Request Synchronization Use Case (3 May 4 replies; thread breaks 3-day silence)

- **[[magnus-westerlund]]** May 4 10:04 UTC ([msg](https://mailarchive.ietf.org/arch/msg/moq/bSQf02Wcdvul4VNWro4_WikggSM/)) — replies to Cullen's May 1 framing. **Clarifies the WG poll was about whether request synchronization needed resolution in draft-18, with intent to defer discussion to London.** *"The discussion also indicated that there are some different views on why a request synchronization mechanism is needed. Thus, we asked for clarification on the use cases from the WG participants to enable discussion and proposals."* Proposes two paths: explicitly state request-synchronization capability remains, **or** retain `required_request_id` in draft -18 with notes documenting its issues. **Frames this as problem-solving, not removal of consensus.**
- **[[magnus-westerlund]]** May 4 10:15 UTC ([msg](https://mailarchive.ietf.org/arch/msg/moq/UoDRMucPSFVAKzwJPeKVex1f0Io/)) — follow-up clarifier. **Asks Cullen to detail three specific scenarios**: (1) Swap Tracks (does pausing use REQUEST_UPDATE forward-flag, or new subscriptions w/ termination?), (2) Client Side ABR (REQUEST_UPDATE / new subscriptions / SWITCH?), (3) Pause/Unpause (*"requests will be delivered and processed in the order transmitted assuming the QUIC connection doesn't time out."* — questions whether reorder-via-REQUEST_UPDATE is achievable).
- **[[luke-curley]]** May 4 17:10 UTC (10:10 PDT) ([msg](https://mailarchive.ietf.org/arch/msg/moq/6X8WPyp6GXcTVnMgN8D1aozmEbc/)) — identifies a **deadlock concern with draft-17's `required_request_id`**: *"if either side RESETs a request, it can cause a deadlock. The peer may never learn about a specific `request_id` referenced via a `required_request_id` so it will block (until some timeout)."* States the issue is *"addressable"* — alternative approaches may exist; encourages clarifying actual use cases.

### Re: Minutes from Interim meeting 27 of April 2026

- **[[magnus-westerlund]]** May 4 07:59 UTC ([msg](https://mailarchive.ietf.org/arch/msg/moq/ykbgFMG2I4KaMtzhlah8gc1u1rQ/)) — responds to Cullen's earlier criticism about minutes quality. *"Minutes at least indicating which issues was discussed, some of the argument and outcome"* serves as a useful pointer for deeper investigation; full details are in the Meetecho recording transcript. **Proposes more discussion via email**: *"For keeping the arguments more easily available we should in fact have more discussion over email as there the full argumentation would be available in the mail archive."* Implicit position: list-as-system-of-record over interim minutes.

**Net**: This is the **first substantive activity from Magnus Westerlund on the list since the REWIND consensus call** — three messages in a single day, all on contested topics (Cullen's request-sync framing, minutes quality, deferral to London). Magnus appears to be re-engaging the list as the formal venue for unresolved post-interim issues. Cullen has not yet replied to either Magnus message.

## Slack #moq — Day +7 silence broken; yuyou (London venue), Martin Duke ("yes"), Tobbe (moqlivemock 0.8 / MSF / LOC / WebCodecs / moq-mi)

The 7-day silence on `#moq` since Giovanni Marzot's Apr 27 `:disappointed:` ended.

- **yuyou** May 4 08:47 CEST — *"For the June interim in London, are the interop and the meeting at the same venue?"* Logistics question for London hybrid-interim.
- **[[martin-duke]]** May 4 16:19 CEST — single-word reply: *"yes"*. Confirms interop and meeting share venue.
- **[[torbjorn-einarsson]]** May 5 06:43 CEST — announces moqlivemock + warp-player update: *"I've updated moqlivemock and warp-player to support MSF/LOC and use WebCodecs for rendering. There is the same wall-clock synchronized loop with AVC, HEVC, AAC, Opus content as for CMSF/LOC. I also added moq-mi support to the server and to my Go client, so it may be interesting to interop test it."* Demo URL: [https://moqlivemock.demo.osaas.io](https://moqlivemock.demo.osaas.io). **First confirmation that moqlivemock now ships LOC + MSF + moq-mi support alongside CMSF.**

## Eyevinn repos (moqlivemock, warp-player) — v0.8.0 release wave; LOC HEVC + WebCodecs LOC pipeline

Tobbe's [[moqlivemock]] and [[warp-player]] both bumped to **v0.8.0** in coordinated May 4–5 commits.

- **moqlivemock** `d174037` May 5 03:59 UTC — *chore: bump version to 0.8.0*.
  - `77d67b0` May 3 22:13 UTC — *feat(catalog): expose accurate per-packaging bitrate*.
  - `2d08ea1` May 3 21:20 UTC — *feat(loc): add HEVC support for LOC packaging*. Closes Issue #23 (*Add support for LoC*) via PR #76.
  - PR #77 *feat(catalog): expose accurate per-packaging bitrate* MERGED May 5 03:47 UTC.
  - PR #78 *Version 0.8.0* MERGED May 5 04:04 UTC.
- **warp-player** `05ded99` May 5 04:15 UTC — *chore: bump version to 0.8.0*.
  - `421e8da` May 5 03:54 UTC — *docs: cover MSF catalog and WebCodecs LOC pipeline in README and CLAUDE.md*.
  - `48378e9` May 3 21:32 UTC — *feat(loc): add HEVC support to WebCodecs LOC pipeline*.
  - `f154020` May 3 20:56 UTC — *fix(transport): handle wt.closed rejection so Safari doesn't flag it*.
  - `95a653d` May 3 20:36 UTC — *feat(ui): add engine legend, mute toggle, and namespace filtering*.

**Net**: Eyevinn's v0.8.0 wave covers HEVC for LOC, MSE+WebCodecs LOC pipelines, namespace filtering UI, and the Safari `wt.closed` rejection fix. Combined with the moq-mi support announced on Slack, moqlivemock now exercises four packaging formats (CMSF, LOC, MSF, moq-mi) and warp-player exercises both MSE and WebCodecs rendering paths. Major step forward for media-format interop.

## moq-wg/secure-objects, msf, loc, cmsf, catalog-format, privacy-pass — Quiet

No new activity since the May 1 editorial wave for secure-objects. Open secure-objects PRs remain #83 (SFRAME RFC ref), #84 (test vectors), #85 (en-dash fix). draft-ietf-moq-secure-objects-01 still **not** on Datatracker.

## tobbee/moq-llm-wiki — No open issues

No new issues since #3 (factual corrections) closed earlier this week.

## Other implementations — mostly quiet

- **cloudflare/moq-rs**: No new commits since Apr 13 (Day +22 of upstream-fork quiet).
- **video-dev/moq-js**: No new commits since Apr 16.
- **birneee/quiche_moq**: No new commits since Mar 13.

# Interop Runner (May 5 00:37 UTC)

**20 pass / 71 fail / 14 skip** (105 tests). **Major regression**: −4 pass / +4 fail vs May 4 00:38 UTC's 24/67/14. Walking arc since the Apr 17 floor: 18 → 18 → 18 → 20 → 22 → 22 → 23 → 24 → 22 → 23 → 22 → 23 → 23 → 23 → 24 → 25 → 24 → 24 → **20**. **Largest single-day regression since Apr 17 (back to that floor level).**

Most plausible cause: image rebuilds for `moqtail-relay` and `moq-dev-rs` / `moq-dev-js` now picking up large changes from May 3–4:
- **moqtail PR #145 merged May 4 19:23 UTC** — `main` now reflects the wholesale draft-14→draft-16 migration (216 files, +17,114/−11,744). Substantially new wire behavior on the moqtail-relay rows.
- **moq-dev/moq PR #1359 closed May 4 21:25 UTC** (Consumer unify across container formats) — referenced as the Consumer refactor path; status shown as closed (not merged).
- The May 5 build also predates moq-dev's PR #1374 (DATAGRAMS Lite05) which was opened May 4 22:57 UTC and is not yet merged.

The regression is large enough that pair-level diff inspection is warranted; it likely reflects a moqtail × {moq-dev / moq-rs / others} pair flipping fail after the umbrella merge.

---

# Activity (May 3 06:00 UTC → May 4 06:00 UTC)

## moq-wg/moq-transport — ianswett OPENS Issue #1627 (SUBSCRIBE with Joining Fetch — alternative to martinduke's PR #1604)

- **[Issue #1627](https://github.com/moq-wg/moq-transport/issues/1627) OPENED** May 3 07:40:15 UTC by [[ian-swett]] — *"SUBSCRIBE with Joining Fetch"*. Body: *"A different take on #1604 that adds two new modes to SUBSCRIBE instead of allowing Joining FETCH to be sent on the SUBSCRIBE stream."* Notes: (1) *"Might be able to remove Request ID once #1615 lands"*, (2) *"Could use some more text on what happens to the FETCH_HEADER stream if the Subscription is cancelled"*, (3) *"Could use clarification on how prioritization of Objects is intended to work."* **Fixes #1039, #1313, #1602, #1612** — same set [[martin-duke]]'s [PR #1604](https://github.com/moq-wg/moq-transport/pull/1604) targets, framed as a competing simpler design (collapse the function into SUBSCRIBE message types instead of carrying Joining FETCH on the SUBSCRIBE stream).
- **[PR #1604](https://github.com/moq-wg/moq-transport/pull/1604) — ianswett comments** May 3 06:39 + 06:42 UTC, replying to gwendalsimon's Apr 16 SWITCH-relay-proactive-FETCH framing: *"Thanks for the detailed reply, as well as your reply on the list, that was helpful for me. I'd like to put the question of whether Objects are delivered on the control stream in your SWITCH proposal and this one as a separate question. If we want to do that, we should do it for FETCH as well. **This conversation makes me think using a single message would be better.**"* Then on the priority concern: *"I thought about this, and I don't think there's a compelling use case for updating the priority separately. You're issuing a message to Join a Track... I can't imagine a case when you're much more interested in the FETCH data, but not more interested in the SUBSCRIBE data."* The two May 3 comments are the proximate trigger for opening Issue #1627 ~1 hour later.

**Net**: Joining FETCH redesign now has two competing live proposals — Martin Duke's PR #1604 (carry Joining FETCH on the SUBSCRIBE stream) vs. Ian Swett's Issue #1627 (collapse Joining FETCH into new SUBSCRIBE modes). Both target the same four issues (#1039 / #1313 / #1602 / #1612). No other new transport activity in the window.

## Mailing List — "Knowing the start of a Subgroup" thread reignites; ianswett commits to FIRST_OBJECT bit; Mo Zanaty raises broader varint concern; weekly GitHub digest

After 3 days of relative quiet, the *"Knowing the start of a Subgroup"* thread restarted late on May 3 with a clear direction signal from Ian Swett.

- **[[ian-swett]]** May 3 22:38 UTC ([msg](https://mailarchive.ietf.org/arch/msg/moq/dL1-WD_iTNa4WR-dHfZrHPKhNXA/)) — thanks Mo Zanaty for the detailed earlier response and **announces decision to proceed with the bitfield approach** (the FIRST_OBJECT bit in [PR #1618](https://github.com/moq-wg/moq-transport/pull/1618), already approved). Raises a small reservation: *"having both Subgroup ID and Priority serve as methods for prioritizing objects within a group"* — previously the WG agreed priority should be limited to a single byte, but Subgroup ID creates a much larger namespace. *"Likely no practical problem, but suggests exploring potential simplifications to the Object model that wouldn't compromise real-world applications."* Effectively closes the design dispute: PR #1618 (FIRST_OBJECT bit) is the WG-adopted answer, confirming the May 1 PR #1608 closure.
- **[[mo-zanaty]]** May 4 04:24 UTC ([msg](https://mailarchive.ietf.org/arch/msg/moq/_OwGvDKV9OaYxgOc6tJH7osmn3I/)) — replies to Ian's post by **broadening the topic**: proposes reconsidering varints across the spec, suggesting *"Subgroup ID to a single byte"* could be more appropriate than the current implementation. Argues varints were applied as default encoding without sufficient justification, and recommends a **broader review of all variable-length integer fields** to determine whether they genuinely require that encoding approach. **First explicit on-list call for a varint-vs-fixed-width audit** — could be picked up as London hybrid-interim agenda item.
- **Repository Activity Summary Bot** May 3 ([msg](https://mailarchive.ietf.org/arch/msg/moq/umr1H3WzgiNKptknCbeSZHCNCCg/)) — weekly GitHub digest covering moq-wg repos (transport, charter, requirements, warp-streaming-format, loc, wg-materials). For moq-transport: *"3 new issues created (incl. QMUX version negotiation, Request ID in GOAWAY isn't useful), 12 issues received 15 comments, 14 issues closed, 10 PRs submitted."* Notable PRs: #1625 (Magnus Security Considerations rebase), #1615 (Remove Required Request ID — *"Merge Ready"*), #1608 (Subgroup ID, 6 comments), #1607 (Largest Available Group filter). For warp-streaming-format: *"2 PRs incl. SCTE-35 + CEA-608/708 accessibility fields and initial zapping specifications"* — first wiki-visible mention of warp-streaming-format SCTE-35/CC PR work this cycle.

**Net**: The May 1 PR #1608 closure is now formally backed by an on-list direction message from Ian; Mo Zanaty's varint concern reopens at a higher level (codec-class encoding choices) rather than relitigating the closed PR. No chair-summary message on REWIND consensus has appeared — Day +3 since the May 1 deadline.

## moq-dev/moq — skirsten OPENS PR #1373 fixing PR #1367 (pull-mode renderer); ksletmoe-aws revises PR #1359

- **[PR #1373](https://github.com/moq-dev/moq/pull/1373) OPENED** May 3 16:53:49 UTC by **skirsten** (+146/−144, *@moq/watch: fix playback stalls and frame-rate beating*, **closes #1367**). Body terse: *"Detailed description of both fixes is in the commits."* Effectively a follow-up that supersedes the pull-mode-renderer work in PR #1367 (skirsten, opened May 1) — same author, near-zero net diff, addresses two distinct symptoms (playback stalls + frame-rate beating). coderabbitai bot review May 3 17:02 UTC: *"No actionable comments were generated in the recent review."* skirsten now has 4 PRs in the May 1–3 window (#1349 catalog merged, #1365 AudioContext merged, #1367 still open, #1373 superseding #1367).
- **[PR #1359](https://github.com/moq-dev/moq/pull/1359) updated** May 3 04:30 UTC by **ksletmoe-aws** — *feat(player): unify Consumer across container formats* (now +1002/−1173 across 14 files, vs. earlier reading of +971/...). Author note: *"Replace the two separate consumer implementations (Legacy and CMAF) with a single generic `Consumer` class that accepts a `ContainerFormat` strategy for frame parsing. This mirrors the Rust `moq-mux` `Consumer<F: Container>` pattern and eliminates ~90% code duplication. Additionally, add a `sequential` delivery mode flag to fix audio stuttering caused by inter-group serialization."* Earlier Luke review nits (May 2 20:47–20:49): *"Just call it `Frame`... `Legacy.LegacyFormat` should be avoided IMO... We should reuse `Frame` and `DecodedFrame`."* The May 3 push presumably addresses those nits — first revision turn-around since Luke's Apr 30 design suggestion.
- **No new merges in the window.** PR #1370 (metapox PriorityQueue fix), PR #1371 (Luke cross-broadcast track refs), PR #1367 (skirsten pull-mode), PR #1373 (skirsten playback fix), PR #1359 (ksletmoe-aws Consumer unify), PR #1362 (Qizot audio reconfiguration), PR #1356/#1358/#1341 (Luke earlier work) all open.

## moqtail — PR #145 (umbrella draft-16) gets 3 race-condition / logging commits May 3

The DRAFT: draft-16 umbrella PR ([PR #145](https://github.com/moqtail/moqtail/pull/145), zafergurel, open since Mar 6) picked up three new commits May 3:

- `6f79910` 18:10 UTC *fix: fixes a race condition*
- `ee9f7e0` 19:02 UTC *refactor: proper logging for moqtail-ts*
- `ad78f25` 23:39 UTC *fix: fixes a race condition*

Two race-condition fixes ~5.5 hours apart bracket a logging-refactor commit. Now at 29 commits, +17187/−11733, 240 files vs. main. Still not landed on `main` despite PR #180 (separate stream for SUBSCRIBE_NAMESPACE) merging into the `draft-16` branch May 1.

## moq-wg/secure-objects, msf, loc, cmsf, catalog-format, privacy-pass — Quiet

No new activity since the May 1 editorial wave. Open secure-objects PRs remain #83 (SFRAME RFC ref), #84 (test vectors), #85 (en-dash fix). draft-ietf-moq-secure-objects-01 still not on Datatracker.

## Implementation repos (moq-rs / moq-js / google/quiche / birneee) — Quiet

- **cloudflare/moq-rs**: No new commits since Apr 13 (Day +21 of upstream-fork quiet).
- **video-dev/moq-js**: No new commits since Apr 16.
- **google/quiche** `quiche/quic/moqt`: No new commits since Apr 22 (Day +12).
- **birneee/quiche_moq**: No new commits since Mar 13.

## Slack — Day +7 of #moq silence

`#moq` (C046V0QF3CK) shows no new posts since Apr 27 18:50 CEST (Giovanni Marzot's :disappointed:). `#moq-rs` (C09CG9V7A2Y), `#moq-js` (C09BZ7KH0BZ), `#libquicr` (C08ER7J16BF) all quiet.

## MoQ Monthly — No new issue

Archive shows #0 (Mar 3) and #1 (Apr 30 / May 1) only. Day +3 since #1 publication.

## tobbee/moq-llm-wiki — No new issues

3 issues all closed (#1 OpenMOQ, #2 broken interop-runner links, #3 factual corrections). No new requests.

# Interop Runner (May 4 00:38 UTC)

**24 pass / 67 fail / 14 skip** (105 tests). **Flat day vs. May 3**: identical to May 3 00:38 UTC's 24/67/14. Walking arc since the Apr 17 floor: 18 → 18 → 18 → 20 → 22 → 22 → 23 → 24 → 22 → 23 → 22 → 23 → 23 → 23 → 24 → 25 → 24 → **24**. The May 2 21:18 UTC PR #1372 revert (Luke removing the partial fetch_group / Subscription API) presumably reached the moq-dev-rs / moq-dev-js builder before this run, so any restoration-effect from the revert is already baked in — net zero on the matrix.

---

# Implementation Activity (May 2 → May 3 06:00 UTC)

## moq-dev/moq — Luke REVERTS PR #1357 (fetch_group + TrackDynamic) via PR #1372; metapox opens PR #1370 (PriorityQueue SUBSCRIBE_UPDATE bug); Luke opens PR #1371 (cross-broadcast track refs); PR #1369 MERGED

A surprisingly busy day on `moq-dev/moq`: a notable design U-turn from [[luke-curley]], a substantive bug report from a new external contributor (with a working fix in their fork), and a new feature PR opened.

- **[PR #1372](https://github.com/moq-dev/moq/pull/1372) MERGED** May 2 21:18:50 UTC by [[luke-curley]] — *Revert moq-lite FETCH/Subscription API changes*. **Reverts [PR #1357](https://github.com/moq-dev/moq/pull/1357) (fetch_group API + TrackDynamic) and [PR #1348](https://github.com/moq-dev/moq/pull/1348) (Subscription model API for FETCH readiness).** Body: *"FETCH isn't hooked up yet, so the breaking API change isn't worth it; the API also wasn't quite right."* Hop-based clustering (PR #1322) and per-frame buffer changes (PR #1353) are preserved. **Significant U-turn**: PR #1357 was merged Apr 30 00:01 UTC and was described in the Apr 30 wiki entry as the *"first track-level FETCH path API"*. Three days later Luke pulls it back as not-ready.
- **[PR #1371](https://github.com/moq-dev/moq/pull/1371) OPENED** May 2 20:28:59 UTC by [[luke-curley]] — *hang: cross-broadcast track references in renditions*. Adds optional `broadcast` field on video/audio rendition configs (e.g. `"../source"`) so a downstream catalog can reference tracks published in another broadcast without republishing bytes. New `PathRelative` type + `Path::resolve` in moq-lite Rust with full unit coverage; mirror `resolveBroadcast` helper for `@moq/hang`. `@moq/watch`'s `Broadcast.trackBroadcast(effect, configBroadcast)` looks up the override broadcast on the same connection; audio/video decoder + MSE backends honor it. PR body explicitly notes *"🤖 Generated with [Claude Code](https://claude.com/claude-code)"*. Use case: worker-style flow where a sidecar catalog aggregates source tracks without re-broadcasting them.
- **[PR #1370](https://github.com/moq-dev/moq/pull/1370) OPENED** May 2 15:28:56 UTC by **metapox** — *fix(lite): PriorityQueue does not update in-flight groups on SUBSCRIBE_UPDATE*. **Detailed bug report citing [draft-ietf-moq-transport-13 §6.1](https://www.ietf.org/archive/id/draft-ietf-moq-transport-13.html#section-6.1)**: *"When subscriber priority is changed, a best effort SHOULD be made to apply the change to all objects that have not been sent."* In moq-lite, `PriorityQueue::insert()` copies the `track` value at insertion time and provides no API to update it; when `run_track` receives `SUBSCRIBE_UPDATE` and calls `subscriber.update()`, the `PriorityQueue` is not notified — existing `PriorityHandle`s keep their stale position. Real-world impact: *"Under bandwidth constraints, switching camera focus via SUBSCRIBE_UPDATE takes several seconds because old groups from the previously-focused camera continue to be served at high priority, starving the newly-focused camera."* Proposed fix: add `subscription_id` to `PriorityItem`, add `PriorityQueue::update_subscription(subscription_id, new_track)` that re-sorts and notifies all handles via watch channels; widen quinn priority spread to `index * 64`; wrap `write_all` in `tokio::select!` with `priority.next()` so priority changes take effect during blocked writes. metapox confirms: *"We have a working implementation in our fork and can submit a PR if interested."* References related Issues #699 (priority tie-breaking) and #1363 (their own JS SUBSCRIBE_UPDATE issue from Apr 30). **First substantive bug-report-with-fix-offer from metapox**, who previously opened Issue #1363 about JS Subscriber lacking SUBSCRIBE_UPDATE.
- **[PR #1369](https://github.com/moq-dev/moq/pull/1369) MERGED** May 2 14:53:33 UTC by [[luke-curley]] (sidsethupathi author, +39/−2, *moq-gst: fix moqsink eos*). The gst-launch EOS fix opened May 2 03:27 UTC lands in ~11.5 hours. **sidsethupathi's second merged PR** after #1294 (Apr 12). MLB engineering presence on `moq-gst` is now well-established.

## moqtail — PR #180 MERGED (separate stream for SUBSCRIBE_NAMESPACE) ahead of upstream PR #1542

- **[PR #180](https://github.com/moqtail/moqtail/pull/180) MERGED** May 1 12:45:51 UTC by **zafergurel** (+1150/−488, *feat: separate stream for subscribe_namespace*) into the `draft-16` branch. Reviewer: DenizUgur. **moqtail merged the impl-side SUBSCRIBE_NAMESPACE/SUBSCRIBE_TRACKS split design ~10 hours BEFORE moq-transport PR #1542 itself merged** (May 1 22:59 UTC) — first impl actually shipping the split design. Note: still on the `draft-16` branch, not yet in `main` (PR #145 umbrella tracker still open).

## moq-wg/moq-transport — Quiet day, no new commits or PRs

No new merges or PRs opened in the May 2 → May 3 window. Issue #1313 (ianswett's "Joining FETCH as a separate control message creates edge cases and feature gaps") got a comment May 3 06:00 UTC.

## Mailing List — Quiet (no new on-list messages May 2-3 visible)

The REWIND consensus deadline message-of-record from a chair has still **not appeared on the list** as of May 3 06:00 UTC. Cullen's *"Request Synchronization Use Case"* thread (May 1) has had no replies. The "Knowing the start of a Subgroup" thread is also quiet.

## MoQ Monthly — No new issue since #1 (Apr 30 / May 1)

The newsletter archive shows #0 (Mar 3) and #1 (Apr 30) only. No #2 in the May 2-3 window.

# Interop Runner (May 3 00:38 UTC)

**24 pass / 67 fail / 14 skip** (105 tests). **First regression after 4 consecutive +1/day recovery days**: −1 pass / +1 fail vs May 2's 25/66/14. Walking arc since Apr 17 floor: 18 → 18 → 18 → 20 → 22 → 22 → 23 → 24 → 22 → 23 → 22 → 23 → 23 → 23 → 24 → 25 → **24**.

The regression coincides roughly with image rebuilds for `moq-dev-rs` / `moq-dev-js` likely picking up the May 1 → May 2 PR landings (PR #1366 flake bump, PR #1368 doc fix, PR #1369 moqsink EOS). The notable revert on May 2 21:18 UTC (PR #1372 reverting #1357 + #1348) happened **after** the May 3 00:38 UTC report, so its effect on the matrix would only show up in the May 4 run.

---

# Implementation + WG Activity (May 1 → May 2 04:00 UTC)

## moq-wg/moq-transport — PR #1542 (SUBSCRIBE_NAMESPACE/SUBSCRIBE_TRACKS split) MERGED; new Issue #1626 (QMUX version negotiation)

The post-interim editorial wave continued with the most structurally consequential merge of the cycle: the SUBSCRIBE_NAMESPACE / SUBSCRIBE_TRACKS split that moqtail's PR #180 had been preparing for.

- **[PR #1542](https://github.com/moq-wg/moq-transport/pull/1542) MERGED** May 1 22:59:13 UTC by [[alan-frindell]] (+215/−135, *Split SUBSCRIBE_NAMESPACE into SUBSCRIBE_NAMESPACE and SUBSCRIBE_TRACKS*, fixes #1458). Replaces single SUBSCRIBE_NAMESPACE (0x11) with two messages: **SUBSCRIBE_NAMESPACE (0x50)** for namespace discovery and **SUBSCRIBE_TRACKS (0x51)** for track subscriptions. Removes the SUBSCRIBE_NAMESPACE_OPTIONS parameter and the "BOTH" mode entirely. Adds **TRACK_NAMESPACE_PREFIX parameter (0x34)** allowing REQUEST_UPDATE to change the prefix. Approvals from ianswett (Mar 9), vasilvv (Apr 27), and [[suhas-nandakumar]] (final APPROVED May 1 18:32:48 UTC on commit `4aa849a`). Closes Issue #1458 (one of the longest-standing draft-17 design splits). The afrind 3/30 design note framed it as: *"1) We want to remove this option and bake it into the message type: no more 'BOTH'. 2) We want to allow updating the prefix via REQUEST_UPDATE..."*
- **[Issue #1626](https://github.com/moq-wg/moq-transport/issues/1626) OPENED** May 1 23:50:05 UTC by **sharmafb** (Suhas Sathyanarayana): *"Version negotiation for QMUX"*. Body: *"We have an idea of how version negotiation works for MoQ-over-HTTP/3 and how it works for MoQ-over-QUIC, but do we know how it's going to work for MoQ-over-QMUX?"* **[[alan-frindell]] reply** May 2 02:19:30 UTC: *"We discussed quite a bit last IETF. The plan is to say something like TLS ALPN moqt-18 implies qmux-01"* — first explicit statement of the QMUX/transport ALPN coupling for draft-18.
- **PR #1608 formally CLOSED** May 1 18:35 UTC ([[alan-frindell]]: *"Closing in favor of 1618"*) — confirms the FIRST_OBJECT bit (PR #1618) as the WG-adopted answer to "Knowing the start of a Subgroup".
- **Open PR state** (post-May 1): PR #1620 (Joining FETCH unaffected by fwd→0), PR #1618 (FIRST_OBJECT bit), PR #1623 (Remove Request ID from GOAWAY, contested), PR #1625 (Magnus Security Considerations rebase) all remain open.

## moq-wg/secure-objects — Editorial wave largely concludes (PRs #77, #82, #86 MERGED, #78 superseded)

The 30-hour Apr 29 → May 1 wave wrapped up its main body in a coordinated burst on May 1 21:05–21:33 UTC.

- **[PR #82](https://github.com/moq-wg/secure-objects/pull/82) MERGED** May 1 21:05:19 UTC by [[fluffy]] ([[suhas-nandakumar]] author, +66/0, *Add padding property for byte boundary alignment*). **Closes Issue #54** (fluffy Nov 2025 — *"add a private header extension for pad to N byte boundary"*). Adds the byte-boundary alignment property promised since November.
- **[PR #77](https://github.com/moq-wg/secure-objects/pull/77) MERGED** May 1 21:06:12 UTC self-merged by [[fluffy]] (+50/0, *describe threat model*). Body: *"This most Fixes #49 but making a separate PR to describe the fan out attacks."* **Mostly fixes Issue #49** ("Describe achieved security properties"); the fan-out attack got its own follow-up.
- **PR #78 CLOSED unmerged** May 1 21:29 UTC (the *"DO NOT MERGE YET"* fan-out attack PR), **superseded by PR #86**.
- **[PR #86](https://github.com/moq-wg/secure-objects/pull/86) OPENED + MERGED** in the same 6-minute window May 1 21:27:42 → 21:33:18 UTC by [[fluffy]] (opened) → [[suhas-nandakumar]] (merged) (+27/0, *Explain Fan Out Attack*, *"This replaces PR#78 and is part of Fixes #49"*). Closes the fan-out-attack documentation gap.
- **Open PRs remaining**: #83 (SFRAME RFC ref), #84 (test vectors), #85 (en-dash fix). All editorial polish — secure-objects is now substantively at the -01 release line. **draft-ietf-moq-secure-objects-01 has NOT yet been published on Datatracker** despite the merge wave.

## Mailing List — Cullen opens "Request Synchronization Use Case"; REWIND consensus deadline reached without chair conclusion

The May 1 REWIND consensus call deadline came and went **without a chair-summary message** on the list. Magnus Westerlund, Suhas Nandakumar, and Alan Frindell have not yet posted an interpretation of the split outcome.

- **Cullen Fluffy Jennings** opened a new thread *"Request Synchronization Use Case"* May 1 16:10:06 -0600 (22:10:06 UTC) ([msg](https://mailarchive.ietf.org/arch/msg/moq/YIkbDmf8BZ0Dx41j8QJ7nj0BZMU/)). Three concrete use cases for request ordering: (1) swap tracks in video conference (pause Alice before un-pause Bob to avoid congestion), (2) client-side ABR, (3) rapid pause/unpause where reorders cause opposite-of-desired state. Key quotes:
  - *"I'm a bit concerned with how the chairs are positioning this... after the call I realized what was happening here was the chairs are going to treat this as we no longer have the consensus we had on drafts up to -17 where there was a way to indicate ordering of requests to the proxy. We had no objections to this in last call of -17. We are trying to get to done and reopening base issues about what the requirements are is not helpful."*
  - *"I would have objected to bidi if it did not have a way to synchronize - this is a fundamental part of bidi."*
  - *"I'm fine with punting this to London."*
- **Net**: this is Cullen's framing of the situation absent a chair message — the absence of formal consensus on draft-17's request-ordering mechanism (now removed via PR #1615 RRID + PR #1623 GOAWAY) reopens what he believed was settled. Likely to drive London hybrid-interim agenda.
- **"Knowing the start of a Subgroup"** thread: ~1 additional Cullen reply on May 1; PR #1608 was formally closed the same day.

## moq-dev/moq — PR #1368 doc fix MERGED, PR #1367 (pull-mode renderer) + PR #1369 (moqsink EOS fix, sidsethupathi back) OPENED

[[luke-curley]] kept main moving forward with a small doc fix and a flake bump; two new contributor-driven PRs opened on May 1–2.

- **[PR #1368](https://github.com/moq-dev/moq/pull/1368) MERGED** May 1 18:08:59 UTC by [[luke-curley]] (+1/−1, *Update Cloudflare limitation note for latency=real-time*). Single-line doc note clarifying that Cloudflare doesn't support both `reload` AND `latency=real-time`.
- **[PR #1366](https://github.com/moq-dev/moq/pull/1366) MERGED** May 1 14:58 UTC — flake.lock dependency bump. Routine.
- **[PR #1367](https://github.com/moq-dev/moq/pull/1367) OPENED** May 1 15:17:12 UTC by **skirsten** (Simon Kirsten) (+46/−4, *@moq/watch: add pull mode to video renderer*). Body: on Chrome with 144Hz+ monitors the existing Renderer caused Chrome to render at 120fps despite the draw logic being correct. Wrapping `requestAnimationFrame` recursively syncs to the monitor's vsync. Adds `mode: "push" | "pull"` prop on Renderer; `"pull"` runs self-recursive rAF and redraws only on frame change. MultiBackend WebCodecs path now uses `mode: "pull"`. skirsten notes *"we can also drop the push mode if you want."* — fourth skirsten PR after #1349, #1355, #1365 (all now merged).
- **[PR #1369](https://github.com/moq-dev/moq/pull/1369) OPENED** May 2 03:27:40 UTC by **sidsethupathi** (Sid Sethupathi, MLB) (+39/−2, *moq-gst: fix moqsink eos*). Fixes the gst-launch pipeline `videotestsrc num-buffers=120 ! ... ! moqsink` so that EOS from `num-buffers` is honored — previously the pipeline ran indefinitely; with the fix it exits after 2 seconds. **Second sidsethupathi PR** after #1294 (Apr 12 *"use generated name if no sink pad name provided"*) — the moq-gst contributor base is solidifying around MLB engineering.

## moqtail — quiet day after May 1 PR #180 + PR #178 work

No new PRs opened May 1–2 after the heavy Apr 30 day. PR #180 (separate stream for SUBSCRIBE_NAMESPACE) is now structurally aligned with the just-merged moq-transport PR #1542.

## MoQ Monthly #1 published (May 1)

**[MoQ Monthly #1](https://buttondown.com/moqmonthly/archive/moq-monthly-1/)** *"NAB, interoperability, and a whole lot of catching up"* by Mike English (Cloudflare) — first issue since #0 (Mar 4 2026). ~3,500 words. Highlights:

- **NAB 2026 (Apr 18–22)**: Qualabs / Ateme / EZDRM C2PA + DRM + MoQ demo on Cloudflare's global relay; Oracle Video@Edge multi-vendor (Ateme / Broadpeak / Cloudflare / Bitmovin); Wowza OBS → Shaka via CMAF/CMSF; Norsk native MoQ.
- **Spec status**: Draft-14 widely implemented; Draft-16 interop underway; **Draft-18 named as next interop target**.
- **Browser support**: Safari 26.4 shipped WebTransport without dev-mode flag → WebTransport now Baseline.
- **Implementation activity**: OpenMOQ added Vindral; aiomoqt resumed by Giovanni Marzot.
- **Upcoming**: Streaming Tech Sweden May 21 Stockholm; **IETF MoQ Interim June 9–12 London (Cloudflare hosting)**.
- **Wiki shout-out**: explicit URL `tobbee.github.io/moq-llm-wiki/`. Phrasing: *"Torbjörn is also running an experiment using Andrej Karpathy's LLM Wiki concept to build a living MoQ ecosystem reference"* — described as *"updated daily from the mailing list, Slack, GitHub, and Datatracker"*. Earlier in the spec section: *"For a current summary of all active drafts and their status, the MoQ LLM Wiki has a useful table."*
- **moqlivemock shout-out**: *"Torbjörn Einarsson (Eyevinn Technology) has shipped a significant update to moqlivemock and warp-player: draft-14 and draft-16 support with auto-negotiation, DRM (Widevine, PlayReady, FairPlay, ClearKey) following CMSF PR 18, and confirmed working WebTransport on Safari 26.4 including iOS."*

# Interop Runner (May 2 00:37 UTC)

**25 pass / 66 fail / 14 skip** (105 tests). +1 pass / -1 fail vs May 1 00:40 UTC's 24/67/14. Gradual recovery from the Apr 17 regression continues at +1/day.

# Implementation + WG Activity (Apr 30 → May 1 04:00 UTC)

## moq-wg/moq-transport — PR #1534 (REDIRECT) MERGED, PR #1624 (LOC properties registry) MERGED, mailing-list "Knowing the start of a Subgroup" thread expands to 10+ messages

The post-interim editorial wave culminates with two more merges. The "Knowing the start of a Subgroup" thread on the list grew from 3 messages (Apr 29) to 10+ (Apr 30), with first explicit positions from Magnus Westerlund, Mo Zanaty, and Luke Curley.

### Merges (Apr 30 18:10 → May 1 01:11 UTC)

- **[PR #1534](https://github.com/moq-wg/moq-transport/pull/1534) MERGED** May 1 01:11:59 UTC by [[alan-frindell]] (+50/−1, *Add REDIRECT for request errors and established subscriptions*). Lands the redirection mechanism. Adds:
  - **Redirect structure** (Connect URI + Full Track Name) and **REDIRECT error code** to REQUEST_ERROR — allows publishers/relays to redirect new requests (SUBSCRIBE, FETCH, TRACK_STATUS, SUBSCRIBE_NAMESPACE) to a different location.
  - **Standalone REDIRECT message** for redirecting **established** subscriptions (SUBSCRIBE, PUBLISH, SUBSCRIBE_NAMESPACE, PUBLISH_NAMESPACE) without tearing down the session.
  - PROTOCOL_VIOLATION rules: servers receiving a non-empty Connect URI MUST close with PROTOCOL_VIOLATION; non-empty Track Namespace + empty Connect URI is an internal track redirect.
  - Vasilvv (Apr 27 23:01 UTC) + suhasHere (Apr 29 17:56:52 UTC) approvals before merge. **Closes Issue #1481** ([[fluffy]] Feb 9 — *"Do we need a way to move / goaway for individual track"*). Resolves the long-running redirect debate that started Feb 11 between afrind, suhasHere, and others.
- **[PR #1624](https://github.com/moq-wg/moq-transport/pull/1624) MERGED** Apr 30 18:10:18 UTC by [[alan-frindell]] (+11/0, *Add provisional registry for LOC properties*, fixes #1550). [[suhas-nandakumar]]'s tiny patch establishing a provisional IANA registry for LOC property type codepoints. **Closes Issue #1550** (yuanchao-chris's Mar 11 *"draft-17: Properties Type collision between moq-16 and loc-01"* — the cross-draft 0x02/0x04 collision afrind flagged Apr 16 also affected loc-02). The fix avoids changing existing codepoints; adds the registry needed to coordinate across MOQT and LOC going forward.

### Issue #1622 follow-up

- **[Issue #1622](https://github.com/moq-wg/moq-transport/issues/1622)** *"Request ID in GOAWAY isn't useful"* (ianswett, Apr 30 00:52 UTC) — **[[alan-frindell]] counter Apr 30 18:31:57 UTC**: *"My counter is - it's trivial to put the request ID in goaway, and might be useful. If nothing else it can speed up retry when a new request is racing a GOAWAY."* afrind's first explicit pushback against ianswett's walk-back of PR #1559. PR #1623 (the revert) is now contested.

### Open PR state (post-Apr 30)

- **PR #1542** (SUBSCRIBE_NAMESPACE/SUBSCRIBE_TRACKS split) — APPROVED, ready to merge.
- **PR #1620** (Joining FETCH unaffected by fwd→0) — APPROVED, ready to merge.
- **PR #1618** (FIRST_OBJECT bit) — APPROVED but parallel list debate ongoing (see below).
- **PR #1623** (Remove Request ID from GOAWAY) — afrind opposed, ianswett unmoved; needs WG resolution.
- **PR #1625** (Magnus Security Considerations rebase) — awaiting gloinul review.

## Mailing List — "Knowing the start of a Subgroup" thread expands to 10+ messages (Apr 30)

Apr 30 saw a 7-message burst on the new thread, bringing total messages to 10. Magnus Westerlund, Luke Curley, Suhas Nandakumar, and Mo Zanaty all weighed in, and Luke proposed a third design alternative.

- **Magnus Westerlund Apr 30** ([msg](https://mailarchive.ietf.org/arch/msg/moq/LjT4jA8TH4koIfygE8rxIBpy3nM/)): replied to ianswett+afrind's request for examples broken by #1608.
- **Ian Swett Apr 30 follow-up** ([msg](https://mailarchive.ietf.org/arch/msg/moq/WCj_TkgQogAPfE_3RBXKf2AfO7g/)).
- **[[luke-curley]] Apr 30 ~10:41 PDT** ([msg](https://mailarchive.ietf.org/arch/msg/moq/eIEyCkv8E2dwf-bduz5s_hOnsPg/)): **Critical of both proposals.** Against #1608: enforcing `Subgroup ID == first Object ID` is impractical without tight encoder control and *"information is already implicit via FETCH or SUBSCRIBE object arrival order"*. Against #1618 alone: the bit *"only helps REWIND (if there's a fragmented cache) for the first object… not expensive to add, but you still need a plan to handle the rest of the gaps"*. **Proposes a third option**: an **0-indexed counter per object within a subgroup** (incrementing by one) so relays can detect cache gaps on a subgroup basis. *First proposal of an explicit per-subgroup object index since the Apr 17 LargestGroup/CurrentGroup convergence.*
- **[[alan-frindell]] Apr 30 follow-up** ([msg](https://mailarchive.ietf.org/arch/msg/moq/K7PCeHtL66kMCc1QfsJ07AYAq24/)).
- **[[suhas-nandakumar]] Apr 30** ([msg](https://mailarchive.ietf.org/arch/msg/moq/fDDf7ZkatVbdUb9MJk9-lgtoTwI/)).
- **[[luke-curley]] Apr 30 follow-up** ([msg](https://mailarchive.ietf.org/arch/msg/moq/nHSUhOI9s2QhfyxDrny55ElxHW0/)).
- **Mo Zanaty Apr 30 22:06 UTC** ([msg](https://mailarchive.ietf.org/arch/msg/moq/k8-VOGI2V1wWcApiZIH5nMB3C8o/)): **Endorses the FIRST_OBJECT-bit approach (#1618) over #1608.** Concrete AV1 example to motivate explicit signaling: temporal-only AV1 layering produces frame numbers (0-5) ≠ layer numbers (0,2,1,2,0,2), violating any rule that ties Subgroup ID to first Object ID. Calls #1608 *"a footgun for devs to screw up"* — *"even the working group fell into this trap"*. On the side, on subgroup-vs-datagram tie-breaking with equal priority: *"subgroup wins"* (datagrams at matching priority are *"disposable and therefore lower priority"*).

**Net effect**: the list debate is now a three-way design discussion (#1608 / #1618 / Luke's per-subgroup counter) on top of an already-merged-leaning PR #1618. Cullen and Mo aligned with #1618, Magnus engaged but unclear, Suhas weighing in, Luke proposing a fourth path. The PR is **APPROVED but not yet merged** as of May 1 04:00 UTC.

## moq-wg/secure-objects — MASSIVE editorial wave (Apr 29 → May 1, 4 PRs MERGED, 5 issues CLOSED, 6 PRs OPENED)

After being quiet since draft-00 was published Mar 2, secure-objects had its largest activity wave to date. Issue #74 ("Authentication of Track Properties") landed a working-group consensus decision: **option #1 — no E2E security for track properties** (applications add properties needing E2E to first object of group instead).

### Merged PRs (May 1 03:02–03:24 UTC, all by [[suhas-nandakumar]] as committer)

- **[PR #79](https://github.com/moq-wg/secure-objects/pull/79) MERGED** May 1 03:02:45 UTC ([[suhas-nandakumar]], *Use fixed-width integers for AAD and nonce formation to avoid varint ambiguity*). **Closes Issue #58** (vasilvv Feb 23 — *"Varints"* in AAD). Eliminates the varint canonicalization ambiguity that would have allowed two valid encodings of the same AAD to produce different ciphertext-AEAD outputs.
- **[PR #80](https://github.com/moq-wg/secure-objects/pull/80) MERGED** May 1 03:04:41 UTC ([[suhas-nandakumar]], *Add Publisher Priority to E2E authenticated data*). **Closes Issue #71** ([[fluffy]] Mar 16 — *"Add publisher priority to e2e authenticated data"*). Brings publisher priority under the AEAD authentication tag so relays cannot manipulate it.
- **[PR #75](https://github.com/moq-wg/secure-objects/pull/75) MERGED** May 1 03:24:17 UTC ([[fluffy]], *guidance on track extentions* [sic]). Adds guidance on how track extensions interact with secure-objects authentication.
- **[PR #76](https://github.com/moq-wg/secure-objects/pull/76) MERGED** May 1 03:24:52 UTC ([[fluffy]], *Explain 32-bit object ID nonce limitation*). **Closes Issue #70** ([[alan-frindell]] Mar 15 — *"Is using 32 bits of Object ID in the nonce ok?"*). Documents the implication that publishers must rotate keys before exhausting the 32-bit Object-ID space within a key generation.

### AAD structural change (commit-only, not in a merged-PR)

- **Commit `87a95f77`** ([[suhas-nandakumar]] May 1 03:17:34 UTC): *"Remove Track Namespace and Track Name from AAD structure"*. PR #81 (which proposed this *"Simplify SECURE_OBJECT_AAD to contain only Serialized Immutable Properties"*) was closed without merge, but the underlying change landed via a follow-on commit. **This is the most consequential change of the wave**: the AAD no longer authenticates Track Namespace + Track Name, only the serialized immutable properties. Aligns with the Issue #74 consensus that track-level data is signaled via control messages and not protected end-to-end.
- **Commit `56248619`** ([[suhas-nandakumar]] May 1 03:01:33 UTC): *"make object id 32 bits"*. Wire-format finalization for the Object ID nonce field discussed in PR #76 / Issue #70.

### Issues closed (Apr 29 → May 1)

- **Issue #74** *"Authentication of Track Properties"* ([[fluffy]] Apr 29 19:57 UTC opened → CLOSED May 1 03:24:18 UTC). Body documents WG decision: *"track properties appear only in control message and thus are not authenticated. Looked at various options including: Option #1: Don't provide end to end security for track properties. Applications will just add properties that need end to end security as object properties to first object of the group. Option #2: Provide authentication only for track properties when an object is received. Option #3: Provide authentication + encryption for track properties when an object is received. Option #4: Provide a separate End to End Encryption / Protection for track properties in control messages. **Consensus was option #1.**"*
- **Issue #70** (32-bit Object ID nonce) — closed via PR #76 merge.
- **Issue #71** (Publisher priority in E2E AAD) — closed via PR #80 merge.
- **Issue #58** (Varints in AAD) — closed via PR #79 merge.
- **Issue #61** (vasilvv Feb 23 — *"Private extensions set-up"*) — CLOSED Apr 29 20:37:06 UTC.

### Open PRs (still in flight as of May 1 04:00 UTC)

- **[PR #77](https://github.com/moq-wg/secure-objects/pull/77)** ([[fluffy]] Apr 30 — *describe threat model*, mostly fixes #49 — *"Describe achieved security properties with this solution"*).
- **[PR #78](https://github.com/moq-wg/secure-objects/pull/78)** ([[fluffy]] Apr 30 — *Describe the fan out attack — DO NOT MERGE YET*). Tracks the multi-subscriber AEAD-collision class.
- **[PR #82](https://github.com/moq-wg/secure-objects/pull/82)** ([[suhas-nandakumar]] Apr 30 — *Add padding property for byte boundary alignment*, fixes Issue #54 — fluffy Nov 2025 *"add a private header extension for pad to N byte boundary"*).
- **[PR #83](https://github.com/moq-wg/secure-objects/pull/83)** ([[fluffy]] Apr 30 — *Change the SFRAME ref to point at the RFC*).
- **[PR #84](https://github.com/moq-wg/secure-objects/pull/84)** ([[fluffy]] Apr 30 — *Add test vectors in appendix*).
- **[PR #85](https://github.com/moq-wg/secure-objects/pull/85)** ([[fluffy]] Apr 30 — *fix up inconsistent dash in end-to-end and hob-by-hop*).

### Other Cullen Apr 30 commit

- **`37a08eb0`** Apr 30 03:31:05 UTC ([[fluffy]]): *"Update draft-ietf-moq-secure-objects.md"* — direct main-branch edit (no PR), part of the editorial cleanup.

### Net effect

In ~30 hours secure-objects went from a quiet draft-00 to a coordinated cleanup: AAD structure simplified, varint ambiguity removed, publisher priority authenticated, 32-bit Object-ID limitation documented, track-property authentication scope formally decided (option #1: not in scope). The remaining open PRs are threat-model/test-vectors/editorial work — secure-objects is converging on a publishable -01.

## moq-dev/moq — PR #1357 (fetch_group + TrackDynamic) merged Apr 30 00:01 UTC; PR #1365 (skirsten AudioContext) merged May 1 01:38 UTC; PR #1359 (ksletmoe-aws OrderedConsumer) review begins

- **[PR #1357](https://github.com/moq-dev/moq/pull/1357) MERGED** Apr 30 00:01:46 UTC by [[luke-curley]] — already noted in the Apr 30 wiki entry; the fetch_group + TrackDynamic API is now on `main`.
- **[PR #1365](https://github.com/moq-dev/moq/pull/1365) MERGED** May 1 01:38:38 UTC (skirsten, *@moq/watch: expose AudioContext on the audio backend*, +11/0). Body: *"The WebCodecs decoder owns its own AudioContext but doesn't surface it past the Decoder class. Browsers create the context in `suspended` state when there's no user gesture, and applications need a handle on it to prompt the user (e.g. a 'click to enable audio' button) and call `resume()` from within the gesture handler."* Companion to PR #1349 (static catalog format) and PR #1355 (sampleRate override) — completes the Hang/moq-watch audio-handling polish for end users hitting browser autoplay policies.
- **[PR #1359](https://github.com/moq-dev/moq/pull/1359)** (ksletmoe-aws *feat(player): unify Consumer across container formats*, +1083/−1173) — author **self-summary Apr 30 21:16:33 UTC**: *"This PR grew a bit from the original fix — I took the opportunity to create a unified `Consumer` that mirrors the Rust `Consumer<F: Container>` pattern. **What started it:** The CMAF decoder paths…"*. Apr 30 22:10:45 UTC: *"Sorry for the churn on this one — the commit history is messier than it should be. In hindsight I should have closed the original PR and opened a fresh one once the scope expanded from a targeted fix"*. **[[luke-curley]] Apr 30 22:29:47 UTC**: *"No worries, I'll take a look at it soon."* PR remains open with major scope increase per Luke's design suggestion.
- **New issue [#1364](https://github.com/moq-dev/moq/issues/1364)** *"Cloudflare Relay"* opened Apr 30 14:20:51 UTC by **danrossi** (David Ross). Reports moq-js can't connect to Cloudflare's draft-14 / draft-07 relays from `moqlivemock` URLs. CodeRabbit auto-flagged as possible duplicate of #586.

## moqtail — PR #178 (relay scheduling algorithm) MERGED, PR #180 (separate stream for SUBSCRIBE_NAMESPACE) OPENED

- **[PR #178](https://github.com/moqtail/moqtail/pull/178) MERGED** Apr 30 12:23:13 UTC by **zafergurel** (+455/−62, *feat: implementation of the scheduling algorithm in the relay*). Lands draft-17 §7.2 prioritization scheduling at the relay layer. Closes Issue #176. **First moqtail merge implementing draft-17-specific behaviour.**
- **[PR #180](https://github.com/moqtail/moqtail/pull/180) OPENED** Apr 30 18:51:59 UTC by **zafergurel** (+1150/−488, *feat: separate stream for subscribe_namespace*) against `draft-16`. Major refactor moving SUBSCRIBE_NAMESPACE handling onto its own bidirectional stream — anticipates the [[moq-transport]] PR #1542 SUBSCRIBE_NAMESPACE/SUBSCRIBE_TRACKS split that is now APPROVED upstream. Reviewer: DenizUgur. **First moqtail PR adopting the post-Apr-29 SUBSCRIBE_NAMESPACE split design** before it lands in draft-18.

## Slack & Other Channels

- **#moq**: No new posts since Apr 27 18:50 CEST. Channel quiet across the post-interim editorial wave.
- **#moq-rs / #moq-js / #libquicr**: Quiet since channel-creation period (mid-March 2026).

## Implementation Repos — Other

- **[[moq-rs]]** (cloudflare): No new commits since Apr 13. itzmanish's PR #134 (PUBLISH_NAMESPACE replacement) and #121 (remote-manager refactor) still open.
- **video-dev/[[moq-js]]**: Quiet since mid-March.
- **[[quiche-moq]]** (google/quiche moqt dir): No new commits since Apr 22.

# Interop Runner (May 1 00:40 UTC)

**24 pass / 67 fail / 14 skip** (105 tests). +1 pass / -1 fail vs Apr 30 23:17 UTC's 23/68/14. Gradual recovery continues from the Apr 17 regression (18/73/14).

# Draft Status Watch

- **draft-cenzano-moq-media-interop-03** is **EXPIRED** (Apr 23). No -04 has been published. [[moq-media-interop]] page should reflect "expired" status.
- **draft-ietf-moq-secure-objects-00** is in active editorial cleanup; -01 likely soon given the wave above.
- **REWIND consensus call** closed **today (May 1, 2026)**. Chair Magnus Westerlund will need to interpret a split outcome (Cullen explicit option-#1, Luke + Ian-individually for option-3 with CurrentGroupFill, Martin Duke compromise-floor, Gwendal pushing back on Joining FETCH removal).

# Key Themes

1. **REWIND consensus call deadline reached today (May 1)** — split outcome with at least one explicit option-#1 vote (Cullen), option-3-with-CurrentGroupFill positions (Luke, Ian individually), Martin Duke compromise-floor framing, Gwendal Simon live-streaming pushback.
2. **REDIRECT lands** — PR #1534 merged after a 60-day editorial cycle that began with the Feb 9 Issue #1481 (fluffy). MOQT now has both a REDIRECT REQUEST_ERROR variant and a standalone REDIRECT message for established subscriptions.
3. **LOC properties registry lands** — PR #1624 closes the cross-draft #1550 collision saga. Provisional IANA registry coordinates LOC and MOQT codepoints going forward.
4. **secure-objects editorial wave** — 4 merged PRs, 5 closed issues, 6 open PRs in 30 hours. Track Namespace + Track Name removed from AAD; track-property E2E protection formally out of scope (Issue #74 option #1). Object ID nonce nailed down as 32 bits.
5. **"Knowing the start of a Subgroup" debate is now three-way** — #1608 closed but ianswett still backs it; #1618 (FIRST_OBJECT bit) APPROVED with Cullen + Mo Zanaty support; Luke proposes 0-indexed per-subgroup counter as a third design.
6. **Request ID GOAWAY contested** — afrind pushes back on ianswett's PR #1623 walk-back, calling Request-ID-in-GOAWAY *"trivial to put in… might be useful… can speed up retry when a new request races GOAWAY"*. PR #1623 needs WG resolution.
7. **moqtail jumps to draft-17** — first PR (#178) implementing draft-17 §7.2 prioritization scheduling lands; PR #180 already prepares for the SUBSCRIBE_NAMESPACE split.
8. **moq-dev/moq Hang audio polish complete** — PRs #1349, #1355, #1365 form a sequence finishing the static catalog + AudioContext exposure + sampleRate override audio handling for browser autoplay constraints.
9. **media-interop draft expired** — draft-cenzano-moq-media-interop-03 expired Apr 23; no -04. LOC media-interop testing now relies on what's already implemented.
10. **moqtail PR #145 still not merged to main** — the umbrella draft-16 tracking PR (+12,200/−10,236) absorbed PR #168 + #169 on Apr 25 but has not landed on `main`.

# Pages Updated This Cycle (May 1)

- [[discussions-2026-04]] — last_updated bumped (cycle complete; rolls into May)
- [[moq-transport]] — PR #1534 + #1624 moved to "Recently Merged"; Issue #1550 + #1481 closed
- [[moq-secure-objects]] — added "Recent Editorial Wave" section + open-PR list
- [[moqtail]] — PR #178 merged, PR #180 opened
- [[moq-dev]] — PR #1365 + PR #1359 review state
- [[interop-status]] — 24/67/14 latest
- [[joining-fetch-dissent]] — Apr 30 list-thread additions
- [[moq-media-interop]] — marked expired
