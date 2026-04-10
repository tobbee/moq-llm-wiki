---
title: "Interop Status"
tags: [interop, testing, status]
date: 2026-04-10
status: current
---

# Interop Status

Current state of cross-implementation interoperability testing.

## Latest Interop Results

### Draft-17
- **[[moq-rs]] <-> [[lorenzo-miniero]]'s impl**: First v17 interop working (2026-04-01). Rust publisher, JS subscriber. "Still a few things to iron out."
- **Daiki Matsui's impl <-> `cdn.moq.dev`**: Working (2026-03-23). Browser pub -> relay -> browser sub.

### Draft-16
- **[[moq-rs]]**: PR #131 branch
- **[[moxygen]]**: Supported
- **[[libquicr]] / quicr-go**: Draft-16 compatible
- **Cloudflare interop relay**: `draft-16-manish.cloudflare.mediaoverquic.com:443` (WIP)

### Draft-14
- Most mature interop, widest support
- **[[xquic-moq]]**: Passed all interop runner tests
- **[[moq-rs]]**: Main branch
- **[[moxygen]]**: Supported
- **[[eyevinn-moq]]**: Go transport + JS CMSF player
- **Cloudflare edge relays**: Anycast at `draft-14.cloudflare.mediaoverquic.com:443`

## Interop Runner Matrix

The [[interop-runner]] at [englishm.github.io/moq-interop-runner](https://englishm.github.io/moq-interop-runner/) runs automated tests. Latest report (2026-04-10): **19 passed / 62 failed / 12 skipped** out of 93 total.

Implementations in the matrix:
1. moq-dev-js
2. moq-dev-rs
3. moq-rs
4. moq-rs-draft-16
5. moxygen
6. xquic
7. imquic ([[lorenzo-miniero]])
8. libquicr
9. moqtail
10. quiche-moq ([[martin-duke]])

Target version is draft-16. Best results: moq-dev-rs <-> libquicr (6/6), moq-dev-rs <-> moxygen (6/6), moq-rs-draft-16 <-> moxygen (12 pass).

Individual run reports: `https://englishm.github.io/moq-interop-runner/results/<DATE>_<TIME>/report.html`

## Known Interop Issues

- **Properties Type collision** (#1550 in moq-transport, #10 in LOC) - Property type IDs conflict between moq-transport-17 and loc-01
- **Track Properties parsing** - Different implementations handle the length prefix differently (see [[track-properties]])
- **PUBLISH_NAMESPACE behavior** - Relay behavior around namespace announcements confuses some implementations (Daiki Matsui's report, 2026-03-23)

## Related

- [[interop-endpoints]] - Public relay endpoints
- [[interop-runner]] - Automated test framework
