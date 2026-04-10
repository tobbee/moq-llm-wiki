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

## Interop Runner

The [[interop-runner]] at [englishm.github.io/moq-interop-runner](https://englishm.github.io/moq-interop-runner/) provides automated cross-implementation testing with 10+ implementations.

## Known Interop Issues

- **Properties Type collision** (#1550 in moq-transport, #10 in LOC) - Property type IDs conflict between moq-transport-17 and loc-01
- **Track Properties parsing** - Different implementations handle the length prefix differently (see [[track-properties]])
- **PUBLISH_NAMESPACE behavior** - Relay behavior around namespace announcements confuses some implementations (Daiki Matsui's report, 2026-03-23)

## Related

- [[interop-endpoints]] - Public relay endpoints
- [[interop-runner]] - Automated test framework
