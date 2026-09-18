---
title: "Shaka Player (Google)"
tags: [implementation, javascript, player, google, msf, cmsf, locmaf]
date: 2026-04-10
last_updated: 2026-09-18
status: current
---

**Language**: JavaScript (Closure-compiled)
**Project**: [shaka-project](https://github.com/shaka-project) (Google) — the MoQ work is driven almost single-handedly by **Álvaro Velad Galván** (`avelad`, **Ateme**), a Shaka Player maintainer
**GitHub**: [shaka-project/shaka-player](https://github.com/shaka-project/shaka-player)
**Docs**: [Media over QUIC tutorial](https://github.com/shaka-project/shaka-player/blob/main/docs/tutorials/moq.md)
**Role**: **Subscriber / player only** — it does not publish and is not a relay
**Build**: experimental build only — `+@msf` is in `@manifests`, but `build/all.py` builds every non-experimental dist with `-@msf`, so MoQ ships in `shaka-player.experimental.js` alone

# Overview

Shaka Player is Google's open-source browser player (DASH / HLS / MSS), and since January 2026 it also carries an **[[moq-msf|MSF]] manifest parser** that plays live MoQ over WebTransport. A stream is loaded by passing `'application/msf'` as the MIME type to `player.load()`; Shaka then performs MoQT session setup, subscribes to (or auto-discovers) the catalog namespace, parses the JSON catalog, and feeds each track's objects into its ordinary **MSE/EME** pipeline.

That pipeline is what makes it distinctive here. Most implementations this wiki tracks are transports, relays or publishers; Shaka is a **production player retrofitted onto MoQ** — ABR, multi-DRM, subtitles, accessibility descriptors and codec handling all arrive from the DASH/HLS side, and MoQ is simply a fourth manifest parser behind them. Only **live** content is supported: a catalog with `isLive: false` is rejected.

MoQ support is still labelled **experimental** and will stay so "until the underlying specifications are finalized and no longer in draft status".

# Draft support

Five MoQT drafts are implemented on `main`, each behind a self-registering *dialect* (`shaka.msf.DialectRegistry`); an application can register its own dialect or unregister one it does not want offered.

| Draft | Subprotocol | Status |
|---|---|---|
| **draft-21** | `moqt-21` | Supported (Sep-17, [#10598](https://github.com/shaka-project/shaka-player/pull/10598)) — the **current published [[moq-transport]] revision** |
| **draft-20** | `moqt-20` | Supported (Sep-17, same PR) — the **Seattle interop target** |
| **draft-18** | `moqt-18` | Supported (Aug-19, [#10383](https://github.com/shaka-project/shaka-player/pull/10383)) — the nightly [[interop-runner]] target |
| draft-16 | `moqt-16` | **Deprecated** Sep-17; removed in v6 |
| draft-14 | `moq-00` | **Deprecated** Aug-19; removed in v6 |

`MsfVersion.AUTO` (the default) offers all five newest-first — `moqt-21, moqt-20, moqt-18, moqt-16, moq-00` — and a specific `MsfVersion.DRAFT_*` pins one.

**How the dialects are organised** mirrors the shape of the drafts themselves:

- **draft-16 and draft-18 are separate implementations**, because draft-17 was a wire break: it replaced the variable-length integer encoding, moved the control plane from one bidirectional stream to a pair of unidirectional ones, gave each request its own bidirectional stream, and reassigned message type IDs.
- **draft-18 / -20 / -21 share one implementation.** The draft-20 dialect subclasses draft-18 and only swaps the message writer, because the single change Shaka can observe is that FETCH lost its Fetch Type field and its Start/End Locations to the `LOCATION_FILTER` parameter. Draft-21 changed nothing on the wire at all — it is the same dialect class under a different name and subprotocol.
- **draft-14 predates subprotocol negotiation** (introduced in draft-15) and negotiates in band with a version list in `CLIENT_SETUP`.

**Negotiation is deliberately tolerant of relays** ([#10519](https://github.com/shaka-project/shaka-player/pull/10519), Sep-4): some relays accept the offered subprotocol but leave `WebTransport.protocol` empty, so Shaka does not require the echo. A single offer is unambiguous without one; when several were offered and nothing was echoed, Shaka reconnects offering **one draft at a time, newest first**, rather than guessing — at the cost of up to one handshake per supported draft, avoidable by setting `version` explicitly.

# Packaging support

Packagings self-register the same way dialects do (`shaka.msf.PackagingRegistry`), and a track whose packaging is unsupported is skipped while the rest of the catalog still plays.

| `packaging` | Object payload | Spec | Landed |
|---|---|---|---|
| `cmaf` / `chunk-per-object` | One CMAF chunk — self-describing, appendable on its own, lowest latency | [[moq-cmsf\|CMSF]] | Jan 2026 |
| `loc` | One frame of a raw elementary bitstream; codec and timing come from the catalog, and a transmuxer wraps frames for MSE | [[moq-loc\|LOC]]-04 | May 2026 ([#10035](https://github.com/shaka-project/shaka-player/pull/10035)) |
| **`locmaf`** | **Tagged fields + unchanged sample data; the `moof` is rebuilt receiver-side** | **[[moq-locmaf\|LOCMAF]] v0.3** | **Sep 2026 ([#10538](https://github.com/shaka-project/shaka-player/pull/10538))** |
| `m2ts` | A run of whole transport packets (188- and 192-octet) | [[moq-msfts\|MSFTS]] | Aug 2026 ([#10444](https://github.com/shaka-project/shaka-player/pull/10444)) |

Codec coverage on the `loc` path is `avc1` / `hvc1` / `av01` / `mp4a` / Opus, AV1 having been added Sep-4 ([#10517](https://github.com/shaka-project/shaka-player/pull/10517)). `m2ts` requires the transmuxer as a separate build target (`+@transmuxer` alongside `+@msf`) and has **Group-level latency** by construction, since a transport packet carries no timing of its own and an object boundary falls wherever the publisher cut it.

# LOCMAF

**[[moq-locmaf|LOCMAF]] landed on `main` 2026-09-17** ([PR #10538](https://github.com/shaka-project/shaka-player/pull/10538), +3,027/−1 across 12 files) — `lib/msf/locmaf_parser.js` (1,345 lines) plus a 233-line packaging shim, backed by ~1,350 lines of unit tests. This makes Shaka Player the **first LOCMAF implementation merged outside Eyevinn** — a second non-Eyevinn one, [[openmoq|moq-playa]]'s [PR #15](https://github.com/openmoq/moq-playa/pull/15), has been open since Sep-14 — which matters for a draft the WG has said it intends to adopt (pending the MPEG liaison — see [[moq-locmaf]]).

What the implementation does and assumes:

- **Version-exact**: it supports `locmafVersion` **`0.3`** and *skips* a track declaring anything else rather than guessing, because an unknown version would reinterpret wire syntax as plausible nonsense that the bytes give no way to detect.
- **Init is mandatory and catalog-referenced**: the `moof` is reconstructed from tagged fields ahead of the sample data, and a chunk carrying only what changed since the previous one cannot be read without the initialization segment — so a `locmaf` track with no init data is skipped. This is the [[moq-msf|MSF]]-01 `initData` / `initRef` mechanism that lets a `cmaf` and a `locmaf` rendition share one init entry.
- **Duplicate-variant caveat**: because a publisher may offer the same rendition twice — once as `cmaf`, once as `locmaf`, sharing one init entry — registering the packaging **doubles the variant list** for such a catalog, and nothing in the catalog marks either as preferred. Choosing is the application's job via `manifest.msf.catalogPreprocessor`; the demo ships `shakaAssets.preferLocmafTracks` as the worked example.
- **Demo assets**: *"moqlivemock LOCMAF"* and *"moqlivemock LOCMAF Multi-DRM"* both point at Eyevinn's public [[moqlivemock]] endpoint `https://moqlivemock.demo.osaas.io/moq` (namespaces `cmsf/clear` and `cmsf/drm-cbcs`), so the LOCMAF path is exercised against an independent publisher — and, in the Multi-DRM case, **through EME**.

# Catalog and session features

- **[[moq-msf|MSF]]-01 / [[moq-cmsf|CMSF]]-01 catalogs** ([#10176](https://github.com/shaka-project/shaka-player/pull/10176), Jun-4), including accessibility descriptors for **CEA-608/708** ([#10040](https://github.com/shaka-project/shaka-player/pull/10040), May-12).
- **Namespace discovery**: either an explicit `manifest.msf.namespaces`, or passive discovery from a server `PUBLISH_NAMESPACE` announcement when left empty.
- **Catalog retrieval by SUBSCRIBE or FETCH** (`useFetchCatalog`), the former picking up catalog updates mid-session.
- **`authorizationToken`** sent in the MoQT client setup with alias type `USE_VALUE` (`0x03`).
- **Subscribe filter** configurable between `LARGEST_OBJECT` and `NEXT_GROUP_START`.
- **`fingerprintUri`** for pinning a self-signed relay certificate — the local-relay testing path.
- **`catalogPreprocessor`** ([#9990](https://github.com/shaka-project/shaka-player/pull/9990)) for filtering or rewriting the parsed catalog before track selection.
- **ABR over MoQ**: per-group bandwidth reporting feeds Shaka's ordinary adaptation logic ([#10016](https://github.com/shaka-project/shaka-player/pull/10016), [#10371](https://github.com/shaka-project/shaka-player/pull/10371)).

# DRM

DRM is configured exactly as for DASH or HLS. **[[moq-cmsf|CMSF]] `contentProtections`** entries in the catalog (key-system UUID, PSSH, license-server URL) are read automatically into Shaka's EME subsystem; explicit `drm.servers` / `drm.advanced` configuration is only needed when the catalog omits the license server or the application wants robustness or header control. Support landed Apr-14 ([#9972](https://github.com/shaka-project/shaka-player/pull/9972)), making Shaka the **second implementation of CMSF ContentProtection** after [[moqlivemock]] / [[warp-player]]. The demo carries Widevine / PlayReady / FairPlay and ClearKey (ECCP) variants against moqlivemock.

# Releases

MoQ ships only in the **experimental** build, and there is a **large gap between `main` and the newest release**. The latest tag is **v5.2.10** (2026-09-11), but that is a patch on the 5.2 line: *every* MoQ feature merged since v5.2.0 — draft-18, draft-20, draft-21, `m2ts`, LOCMAF and AV1 on the LOC path — is unreleased, queued in the open release PR [#10385](https://github.com/shaka-project/shaka-player/pull/10385) for **v5.3.0**. **A released Shaka Player therefore still tops out at draft-16**; anything newer means building from `main`.

| Capability | Release |
|---|---|
| draft-14 + the MSF parser (experimental) | v5.0.5 (2026-03-09) |
| draft-16; CMSF `contentProtections` / multi-DRM | v5.1.0 (2026-04-15) |
| LOC packaging; MSF-01 / CMSF-01 catalogs; CEA-608/708; `catalogPreprocessor`; ABR bandwidth | v5.2.0 (2026-07-10) |
| **draft-18 · draft-20 · draft-21; `m2ts`; LOCMAF; AV1 on the LOC path** | **pending v5.3.0** |

# Recent Highlights

Day-by-day PR/issue history lives in [[log|the wiki log]]; this section keeps only durable milestones.

- **LOCMAF on `main`** (2026-09-17, [#10538](https://github.com/shaka-project/shaka-player/pull/10538), +3,027/−1) — the **first [[moq-locmaf|LOCMAF]] implementation merged outside Eyevinn**, exercised in the demo against [[moqlivemock]] in both clear and multi-DRM form; it is so far the only non-Eyevinn one that plays **protected** LOCMAF through EME. See [LOCMAF](#locmaf).
- **draft-20 + draft-21, draft-16 deprecated** (2026-09-17, [#10598](https://github.com/shaka-project/shaka-player/pull/10598), +547/−82) — puts the player simultaneously at the **Seattle draft-20 interop target** and at the **current published draft-21**, nine days after that revision was cut. Only [[moq-dev]] (`moqt-21`, Sep-10) got there earlier.
- **draft-18 support, draft-14 deprecated** (2026-08-19, [#10383](https://github.com/shaka-project/shaka-player/pull/10383), +5,527/−1,426 across 38 files) — the big one: it introduced the dialect split that separates the pre- and post-draft-17 wire formats and made everything after it incremental.
- **Relay-tolerant version negotiation** (2026-09-04, [#10519](https://github.com/shaka-project/shaka-player/pull/10519)) — stops treating a missing WebTransport subprotocol echo as a failure, and falls back to offering one draft per connection attempt. A small change with outsized interop value, since relays are inconsistent here.
- **`m2ts` packaging** (2026-08-27, [#10444](https://github.com/shaka-project/shaka-player/pull/10444)) — MPEG-2 TS over MSF per [[moq-msfts|MSFTS]], both 188- and 192-octet packet sizes, with PCR-discontinuity re-anchoring.
- **LOC packaging** (2026-05-06, [#10035](https://github.com/shaka-project/shaka-player/pull/10035)) plus **AV1 in the LOC transmuxer** (2026-09-04, [#10517](https://github.com/shaka-project/shaka-player/pull/10517)) — frames are transmuxed into MP4 for MSE, covering avc1/hvc1/av01/mp4a/Opus.
- **MSF-01 / CMSF-01 catalogs** (2026-06-04, [#10176](https://github.com/shaka-project/shaka-player/pull/10176)) and **CEA-608/708 accessibility descriptors** (2026-05-12, [#10040](https://github.com/shaka-project/shaka-player/pull/10040)).
- **CMSF ContentProtection / multi-DRM** (2026-04-14, [#9972](https://github.com/shaka-project/shaka-player/pull/9972)) — the second implementation of CMSF DRM signaling after [[moqlivemock]] / [[warp-player]], and the origin of the demo's Widevine/PlayReady/FairPlay assets.

# Interop

Shaka Player is **not registered in the [[interop-runner]]** — the matrix runs headless client/relay containers, and Shaka is a browser player that needs both a relay and a publisher. Its practical interop surface is the demo asset list, which pairs it against two independent stacks:

| Endpoint | Owner | Namespaces exercised |
|---|---|---|
| `https://moqlivemock.demo.osaas.io/moq` | Eyevinn ([[moqlivemock]]) | `cmsf/clear`, `cmsf/drm-cbcs`, `cmsf/eccp-cbcs`, `msf/clear` (LOC), plus the two LOCMAF variants |
| `https://relay.moqtail.dev` | [[moqtail]] | `moqtail/testsrc`, `moqtail/ch00`–`ch02` |

Cross-implementation feedback runs both ways: `avelad` files issues on the publisher side (e.g. [[moqlivemock]] [#103](https://github.com/Eyevinn/moqlivemock/issues/103) *"Add TS support"*, [#140](https://github.com/Eyevinn/moqlivemock/issues/140) *"Add LOCMAF subtitles"*) and reviews [[moq-msf|MSF]] spec PRs in `moq-wg/msf`.

# Related

- [[moq-msf]] — the catalog/streaming format Shaka parses; [[moq-cmsf]], [[moq-loc]], [[moq-locmaf]], [[moq-msfts]] — the four packagings it supports
- [[moqlivemock]] / [[warp-player]] — Eyevinn's publisher and the other CMSF+LOCMAF player; the demo's main test source
- [[moqtail]] — the other public endpoint in the demo list
- [[overview|Implementations Overview]], [[interop-runner]]
