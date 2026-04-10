---
title: "MOQ Interop Runner"
tags: [interop, testing, tooling]
date: 2026-04-10
status: current
---

# MOQ Interop Runner

Standardized cross-implementation test framework for MOQ protocol interoperability testing.

## Overview

The interop runner automates testing between MOQ implementations, publishing results as a matrix showing pass/fail status for each implementation pair.

**GitHub**: [englishm/moq-interop-runner](https://github.com/englishm/moq-interop-runner)
**Results**: [englishm.github.io/moq-interop-runner](https://englishm.github.io/moq-interop-runner/)

## Registered Implementations (as of April 2026)

1. **moq-dev-js** - [[luke-curley]]'s JavaScript implementation
2. **moq-dev-rs** - [[luke-curley]]'s Rust implementation
3. **moq-rs** - [[moq-rs|Cloudflare moq-rs]] (draft-14)
4. **moq-rs-draft-16** - Cloudflare moq-rs (draft-16 branch)
5. **moxygen** - [[moxygen|Meta's C++ relay]]
6. **xquic** - [[xquic-moq|Alibaba's XQUIC]]
7. **imquic** - [[lorenzo-miniero]]'s C library
8. **libquicr** - [[libquicr|Cisco's C++ library]]
9. **moqtail** - [[moqtail|Zafer Gurel's Rust/TS implementation]]
10. **quiche-moq** - [[martin-duke]]'s Rust implementation

## Current Target

The interop runner currently targets **draft-16** for automated testing.

## Test Results History

| Period | Total Tests | Pass | Fail | Skip |
|--------|------------|------|------|------|
| April 2026 | 93 | 19-22 | 59-62 | 12 |
| Mid-March 2026 | 93-97 | 24-25 | ~60 | 12 |
| Early March 2026 | 71 | 18-22 | varies | varies |
| February 2026 (draft-14) | 11-14 | 9-10 | 2-5 | varies |

Transition from draft-14 to draft-16 target occurred in mid-February 2026, which temporarily reduced pass rates as implementations updated.

## Best Performing Pairs

- **moq-dev-rs <-> libquicr**: 6/6 pass
- **moq-dev-rs <-> moxygen**: 6/6 pass
- **moq-rs-draft-16 <-> moxygen**: 12 pass

## Getting Started

To add a new implementation to the runner, see the [getting started guide](https://github.com/englishm/moq-interop-runner/blob/main/docs/GETTING-STARTED.md).

## Related

- [[interop-status]] - Overall interop testing status
- [[interop-endpoints]] - Public relay endpoints
