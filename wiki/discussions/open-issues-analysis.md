---
title: "Open Issues Analysis (April 2026)"
tags: [analysis, issues, status]
date: 2026-04-10
status: current
---

# Open Issues Analysis - April 2026

Summary and evaluation of all open issues across moq-wg repos.

## moq-transport (48 open issues, 17 open PRs)

### Implementation Blockers

- **#1459** - Request ID validation broken in draft-16. SUB_NS request IDs don't follow increment-by-2 rule. Labeled BLOCKED - needs input from assignee. Critical for anyone implementing draft-16.
- **#1550** - Properties Type collision between moq-16 and loc-01. Cross-draft bug that breaks LOC interop. Has corresponding LOC issue #10.

### Hot Design Topics

**Joining Fetch** (6 issues, 2 PRs) - See [[joining-fetch-dissent]]. The April 13 interim has REWIND slides. Likely heading toward convergence on Martin Duke's rewind approach extended by Alan Frindell's filters.

**ABR / SWITCH** (4 issues, 1 PR) - See [[switch-abr]]. #1354 has 39 comments. Unresolved tension between transport-level and application-level switching.

**Subscription Flow Control** (PR #1591) - Ian Swett proposes rate limiting subscriptions to prevent DoS. Security-labeled.

**Filters** (PR #1518, #1362) - Mo Zanaty's reduced-scope filters and Ian Swett's Prior Group filter. Both labeled Needs Discussion.

**SUBSCRIBE_NAMESPACE split** (PR #1542) - Alan Frindell's proposal to split into SUBSCRIBE_NAMESPACE + SUBSCRIBE_TRACKS. Already discussed on Slack and partly implemented.

### Wire Format

- **PR #1593** - Single Objects without Subgroup ID (simplification)
- **PR #1586** - Delta encoding in Fetch responses
- **#1405** - Single Object Subgroups don't need Subgroup ID

### Security

- **#1503** - PUBLISH_NAMESPACE as namespace bypass (Security/DoS)
- **PR #1455** - Security Consideration Extension (Magnus Westerlund)
- **PR #1591** - Subscription flow control

### Other Notable

- **#1582** - REQUEST_ERROR caching at relays (Victor Vasiliev)
- **PR #1534** - REDIRECT for request errors (afrind)
- **PR #1544** - Improve 0-RTT startup latency
- **#1316** - VOD support improvements (Ye-Kui Wang, Needs Discussion)

### Editorial Backlog

~15 editorial issues, mostly from Ye-Kui Wang's systematic review. Important for spec clarity but not blocking.

## MSF (49 open issues, 3 open PRs)

### Catalog Design (largest cluster, ~12 issues)

The catalog is the weakest part of MSF. Key concerns:
- Delta update mechanism is not generic (#135, #136)
- JSON Merge Patch vs JSON Patch (#140)
- Compression needed (#144)
- Required/optional fields unclear per role (#139)
- How to get the latest full catalog (#100)

### Media Mapping (3 issues)

- #153 - `initTrack` doesn't work (Victor Vasiliev, Apr 10 - very fresh)
- #148 - Media Mapping to MoQT needs clarification
- #147 - Confusing Media Transmission section

### Timeline Issues

- **#150** - Wall clock is problematic (Luke Curley). Fundamental concern about wall-clock based synchronization.

### OTT/Broadcast Features

- #110 - Zapping / quick switching (PR #122 open)
- #73 - CMCD-compatible data
- #65 / #74 - Access token mechanisms
- **#23** - Encryption/DRM info for CMAF (open since 2023!)
- **#8** - Content protection / encryption (open since 2023)

### Open PRs

- **PR #133** - SCTE-35 + CEA-608/708 accessibility. Important for broadcast workflows.
- **PR #122** - Zapping text. Important for OTT channel switching.
- **PR #118** - Authorization flows.

## LOC (9 open issues)

- **#13** - Duplicate extension ID (bug, needs fix)
- **#10** - Properties Type collision (same as transport #1550)
- **#9** - Track Property authentication gap
- **#14** - WebCodecs avc3/hev1 format fix needed
- **#15-18** - Timestamps, frame marking, catalog overlap

## secure-objects (8 open issues)

Crypto design questions: AAD serialization (#72), nonce 32-bit Object ID (#70), varints (#58). Mostly from editors.

## privacy-pass (2 open issues)

Editorial only.

## CMSF (4 open issues)

DRM/key-rotation signaling (#17) and Denver meeting issues (#16).

## Key Observations

1. **Joining Fetch and ABR/SWITCH** are the two biggest unresolved design debates
2. **MSF catalog** design has the most open issues and is architecturally immature
3. **Properties Type collision** (#1550/#10) is a cross-draft bug that needs coordinated fix
4. **Draft-16 Request ID validation** (#1459) is an implementation blocker labeled BLOCKED
5. The spec is progressing fast - ~100 open issues down from many more, but remaining ones are harder
6. **Media/OTT features** (DRM, SCTE-35, captions, CMCD) are mostly in MSF/CMSF and need attention for broadcast use cases

## Related

- [[joining-fetch-dissent]] - Joining mechanism debate
- [[switch-abr]] - ABR switching debate
- [[moq-transport]] - Transport spec with issue links
- [[moq-msf]] - Streaming format with issue links
