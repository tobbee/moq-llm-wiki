---
title: "MOQ Interop Runner"
tags: [interop, testing, tooling]
date: 2026-04-14
last_updated: 2026-04-14
status: current
---

Standardized cross-implementation test framework for MOQ protocol interoperability testing.

# Overview

The interop runner automates testing between MOQ implementations, publishing results as a matrix showing pass/fail status for each implementation pair.

**GitHub**: [englishm/moq-interop-runner](https://github.com/englishm/moq-interop-runner)
**Results**: [englishm.github.io/moq-interop-runner](https://englishm.github.io/moq-interop-runner/)

# Registered Implementations (as of April 2026)

1. **moq-dev-js** - [[moq-dev|moq-dev/moq]] JavaScript/Hang player ([[luke-curley]])
2. **moq-dev-rs** - [[moq-dev|moq-dev/moq]] Rust ([[luke-curley]])
3. **moq-rs** - [[moq-rs|cloudflare/moq-rs]] (draft-14)
4. **moq-rs-draft-16** - Cloudflare moq-rs (draft-16 branch)
5. **moxygen** - [[moxygen|Meta's C++ relay]]
6. **xquic** - [[xquic-moq|Alibaba's XQUIC]]
7. **imquic** - [[lorenzo-miniero]]'s C library
8. **libquicr** - [[libquicr|Cisco's C++ library]]
9. **moqtail** - [[moqtail|Zafer Gurel's Rust/TS implementation]]
10. **quiche-moq** - [[martin-duke]]'s Rust implementation
11. **moqx** - [[openmoq|OpenMOQ]]'s moxygen fork relay (added Apr 2026)

# Current Target

The interop runner currently targets **draft-16** for automated testing.

# Test Results History

| Period | Total Tests | Pass | Fail | Skip |
|--------|------------|------|------|------|
| April 14, 2026 | 105 | 21 | 70 | 14 |
| April 13, 2026 | 105 | 20 | 71 | 14 |
| April 12, 2026 | 105 | 21 | 70 | 14 |
| Early April 2026 | 93 | 19-22 | 59-62 | 12 |
| Mid-March 2026 | 93-97 | 24-25 | ~60 | 12 |
| Early March 2026 | 71 | 18-22 | varies | varies |
| February 2026 (draft-14) | 11-14 | 9-10 | 2-5 | varies |

The jump from 93 to 105 tests (Apr 12) coincides with moqx joining the matrix, adding new client-relay pairs. Transition from draft-14 to draft-16 target occurred in mid-February 2026, which temporarily reduced pass rates as implementations updated.

# Best Performing Pairs

- **moq-rs-draft-16 <-> moq-rs-draft-16**: All tests pass (self-test)
- **moq-dev-js <-> moqx**: 6/6 pass
- **moq-rs-draft-16 <-> moqx**: 5-6/6 pass
- **moq-rs-draft-16 <-> moxygen**: 5-6/6 pass
- **moq-rs-draft-16 <-> imquic**: 5-6/6 pass
- **moq-rs <-> moq-rs**: All tests pass (self-test, draft-14)
- **moq-rs <-> moqx**: All tests pass (draft-14)

# Getting Started

To add a new implementation to the runner, see the [getting started guide](https://github.com/englishm/moq-interop-runner/blob/main/docs/GETTING-STARTED.md).

# Related

- [[interop-status]] - Overall interop testing status
- [[interop-endpoints]] - Public relay endpoints
