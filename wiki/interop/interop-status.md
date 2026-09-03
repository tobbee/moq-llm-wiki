---
title: "Interop Status"
tags: [interop, testing, status]
date: 2026-04-14
last_updated: 2026-09-02
status: current
---

Orientation page for MOQ interoperability. **The live numbers are not kept here** — they live on the pages below, which are updated on every wiki refresh.

> **Where to look**
> - **[[interop-runner]]** — the automated nightly matrix: current cut, daily deltas, registered endpoints, and the interop target draft. **This is the authoritative source for pass/fail counts.**
> - **[[interop-endpoints]]** — public relay endpoints you can point a client at.
> - **[[interim-meetings]]** — scheduled interop events, including the **2026-09-02 virtual interop hackathon** on draft-18.
>
> This page previously duplicated the runner's matrix and drifted badly out of date (it asserted a draft-16 target and a 105-cell matrix months after both had changed). The duplicated tables were removed on 2026-08-22; what remains is the durable, non-numeric material.

# Interop target

The interop target is a WG decision, distinct from the newest published draft:

- **Current automated target: draft-18.** Reaffirmed by [[alan-frindell|Alan Frindell]] on Slack (July 18) — implementers are welcome to try draft-19, but draft-18 is the target.
- **Named successor: draft-22.** The [[interim-meetings|interim-2026-moq-21]] minutes (posted 2026-08-14) state *"Draft 22 will be published as the next official interop target"*, after draft-20 and draft-21 (the editorial-meeting output). **Note**: the minutes billed draft-20 as "a purely-editorial cut", but the **published draft-20 is not** — it carries the fill-fetch replacement of Joining FETCH, `PUBLISH_STATE_NOTIFY`, the `Type Flags` bitfield respec and more (see [[moq-transport]]). Implementations retargeting 18 → 20 for Seattle should budget for real wire work.
- **draft-20 is the target for the Seattle hybrid interim (Oct 12–15)**, per [[mike-english|Mike English]]'s Aug-21 hackathon announcement.

Note that the newest *published* revision ([[moq-transport|transport-19]], 2026-07-06) runs ahead of the interop target — so an implementation on draft-19 is "ahead", not "current". See [[moq-go]] for what that currently costs an implementation in the runner.

# Known interop issues

- **Properties Type collision** ([#1550](https://github.com/moq-wg/moq-transport/issues/1550) in moq-transport, #10 in LOC) — property type IDs conflict between moq-transport-17 and loc-01.
- **Track Properties parsing** — implementations handle the length prefix differently. See [[track-properties]].
- **PUBLISH_NAMESPACE behavior** — relay behaviour around namespace announcements confuses some implementations (Daiki Matsui's report, 2026-03-23). Still live as a spec question: [issue #1800](https://github.com/moq-wg/moq-transport/issues/1800) is scheduled for the **Aug-24 interim** and [issue #1854](https://github.com/moq-wg/moq-transport/issues/1854) is labeled **BLOCKED**.
- **Interop-client ALPN gaps** — [[moxygen]]'s interop *client* binary lacked `moqt-18` in `kInteropAlpns`, so draft-18-only relays failed the handshake even though the moxygen *relay* negotiates draft-18 correctly; [[openmoq|moqx]] likely shares the gap. Documented in runner [PR #111](https://github.com/englishm/moq-interop-runner/pull/111), with fixes in flight ([moxygen #221/#222/#223](https://github.com/facebookexperimental/moxygen/issues/219)). A reminder that a matrix cell can fail for handshake-configuration reasons rather than protocol ones.
- **Transport asymmetry** — on recent cuts the **remote-quic** transport outperforms **docker** for several draft-18 pairings, and `xquic` over docker fails broadly. Transport choice, not just draft version, moves results.

# Media wire format interop

**[[moq-media-interop]]** (`draft-cenzano-moq-media-interop-03`, [[jordi-cenzano|Jordi Cenzano]]) defines the concrete media wire format for LOC-based media interop — how H.264 video, Opus/AAC-LC audio, and text are packaged into MOQT objects with extension headers. It is the format [[moxygen|Meta's moxygen]] relay uses.

**The draft expired 2026-04-23 with no -04 published.** LOC media-interop testing currently relies on what is already implemented rather than on a live specification. See [[moq-media-interop]].

# Live vs automated interop

The two are complementary and give different signals:

- **Automated** (the nightly [[interop-runner]]) — broad, repeatable, but short-clip based. It catches handshake and basic data-plane regressions.
- **Live / human-run** (hackathons, ad-hoc sessions) — narrower but deeper. The Vienna Hackathon surfaced things the matrix could not, e.g. [[yu-you|Yu You]]'s conformance client scoring 4/7 against the Cloudflare draft-18 relay because it rejected the upstream `PUBLISH` flow.
- Results from live sessions are gathered on the [ad-hoc interop reports wiki](https://github.com/moq-wg/moq-transport/wiki/ad-hoc-interop-reports).

[[steven-riedl|Steven Riedl]] (Pluto TV) has argued for closing the gap between the two — continuously-running live channels with **mid-stream joiners** *"surface different behavior than short test clips"* — and [[mike-english|Mike English]] has signalled **broader data-plane test coverage** as a planned runner improvement for the Sep-2 hackathon.

# Related

- [[interop-runner]] — automated test framework and current results
- [[interop-endpoints]] — public relay endpoints
- [[interim-meetings]] — interop events and the WG interim schedule
- [[moq-media-interop]] — media wire format for LOC interop
- [[overview|Implementations Overview]] — who implements what
