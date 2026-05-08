---
title: "Interop Status"
tags: [interop, testing, status]
date: 2026-04-14
last_updated: 2026-05-08
status: current
---

Current state of cross-implementation interoperability testing.

# Latest Interop Results

## Draft-17
- **[[moq-dev]] <-> [[lorenzo-miniero]]'s [[imquic]]**: First v17 interop working (2026-04-01). Rust publisher, JS subscriber. "Still a few things to iron out."
- **Daiki Matsui's impl <-> [[moq-dev]] (`cdn.moq.dev`)**: Working (2026-03-23). Browser pub -> relay -> browser sub.

## Draft-16
- **[[moq-rs]]**: PR #131 branch
- **[[moxygen]]**: Supported
- **[[libquicr]] / quicr-go**: Draft-16 compatible
- **Cloudflare interop relay**: `draft-16-manish.cloudflare.mediaoverquic.com:443` (WIP)

## Draft-14
- Most mature interop, widest support
- **[[xquic-moq]]**: Passed all interop runner tests
- **[[moq-rs]]**: Main branch
- **[[moxygen]]**: Supported
- **[[moqlivemock]]**: Go transport + JS CMSF player (draft-14 and draft-16)
- **Cloudflare edge relays**: Anycast at `draft-14.cloudflare.mediaoverquic.com:443`

# Interop Runner Matrix

The [[interop-runner]] at [englishm.github.io/moq-interop-runner](https://englishm.github.io/moq-interop-runner/) runs automated tests. Latest report (2026-05-08 00:38 UTC): **19 passed / 72 failed / 14 skipped** out of 105 total — **−1 pass / +1 fail** vs the prior 4-day plateau at 20/71/14. **Breaks the 4-day floor downward** — new post-NAB low, returning the matrix to the early Apr 17–21 floor reading of 19. moqtail PR #193 (sharmafb upstream FETCH on cache miss, +248/−132, OPEN since late May 6) **did not merge** May 7, so this is **not** a moqtail-relay rebuild effect; the most likely cause is another image's rebuild or natural per-run variance. moq-dev/moq merges in the May 7 06:00 UTC → May 8 06:00 UTC window are PR #1387 (revert-of-revert, type-level only) + PR #1386 (Firefox network stats source) — neither is a wire-format change, so the regression is in implementation pairs rather than a spec change. moq-dev/moq PR #1388 (LOC frame format support, OPEN +799/−17) and PR #1389 (stats aggregation, OPEN +1168/−39) opened May 7 — neither merged yet, so neither could affect this matrix. moq-dev/moq PR #1374 (DATAGRAMS Lite05) remains **open** Day +3. Walking arc since the Apr 17 floor: 18 → 18 → 18 → 20 → 22 → 22 → 23 → 24 → 22 → 23 → 22 → 23 → 23 → 23 → 24 → 25 → 24 → 24 → 20 → 20 → 20 → 20 → **19**.

Implementations in the matrix (11):
1. moq-dev-js (client)
2. moq-dev-rs (client + relay)
3. moq-rs (client + relay, draft-14)
4. moq-rs-draft-16 (client + relay)
5. moxygen (client + relay)
6. xquic (client + relay)
7. imquic (relay, [[lorenzo-miniero]])
8. libquicr (relay)
9. moqtail (relay)
10. quiche-moq (relay, Google QUICHE C++ — [[martin-duke]], Victor Vasiliev)
11. **moqx** (relay, [[openmoq|OpenMOQ]]'s moxygen fork) — **new since Apr 10**

Target version is draft-16. Version distribution: 48 tests at draft-16, 8 at draft-17, 49 at draft-14.

Best results: moq-rs-draft-16 self-test (all pass), moq-dev-js <-> moqx (6/6), moq-rs-draft-16 <-> moqx (5-6/6), moq-rs-draft-16 <-> moxygen (5-6/6), moq-rs-draft-16 <-> imquic (5-6/6), moq-rs self-test (all pass), moq-rs <-> moqx (all pass).

Individual run reports: `https://englishm.github.io/moq-interop-runner/results/<DATE>_<TIME>/report.html`

# Known Interop Issues

- **Properties Type collision** (#1550 in moq-transport, #10 in LOC) - Property type IDs conflict between moq-transport-17 and loc-01
- **Track Properties parsing** - Different implementations handle the length prefix differently (see [[track-properties]])
- **PUBLISH_NAMESPACE behavior** - Relay behavior around namespace announcements confuses some implementations (Daiki Matsui's report, 2026-03-23)

# Media Wire Format Interop

**[[moq-media-interop]]** (draft-cenzano-moq-media-interop-03) defines the concrete media wire format used for LOC-based media interop. It specifies how H.264 video, Opus/AAC-LC audio, and text are packaged into MOQT objects with extension headers. This is the format used by Meta's [[moxygen]] relay and is relevant for any LOC-based interop testing. **The draft expired 2026-04-23 with no -04 published** — check [datatracker](https://datatracker.ietf.org/doc/draft-cenzano-moq-media-interop/) for any renewal. LOC media-interop testing currently relies on what's already implemented.

# Related

- [[interop-endpoints]] - Public relay endpoints
- [[interop-runner]] - Automated test framework
- [[moq-media-interop]] - Media wire format specification for LOC interop
