---
title: "Discussions - February 2026 (Boulder Interim)"
tags: [discussions, slack, github, boulder]
date: 2026-04-10
last_updated: 2026-04-14
status: current
---

February was dominated by the Boulder interim meeting and associated hackathon (Feb 9-12).

# Boulder Interim (Feb 9-12)

## Interop Hackathon Results
Major live interop testing at Google's Boulder office:

- [[martin-duke]]'s quiche-moq relay at `quichemoq.dev` passed [[alan-frindell]]'s conformance test: 41/41 tests passed for draft-16 WebTransport
- [[suhas-nandakumar]]: 4-5 simulcast video tracks published and received over draft-16, tested with both [[moxygen]] and quiche relay
- [[luke-curley]]: [[moq-dev]] Rust publisher to JS subscriber working through Martin's relay
- MOQtail (Zafer Gurel): Successfully published namespace, subscribed to tracks, got objects with both [[moq-rs]] (cloudflare/moq-rs) and [[moxygen]]
- [[lorenzo-miniero]]: Testing v16 relay against other implementations
- [[moq-rs]] (cloudflare/moq-rs) draft-16 branch: 4/6 interop tests passing against Google's draft-16 relay
- Akamai test tools: `moq-test.akaleapi.net` and beta version at `moq-test-beta.akaleapi.net`

## Interop Runner Launch
Mike English announced the [[interop-runner]] reports are now live at `englishm.github.io/moq-interop-runner/`. Key details:
- Everyone can register in `implementations.json`
- VERSION-MATCHING.md documents how version matching works
- PR #34 added quiche-moq relay Docker image
- Output format change planned for better defined results

## Priority Queue Performance (Feb 15)
[[alan-frindell]] shared benchmarks on priority implementation:
- Spec requires two-level priority queue (per-track + cross-track)
- Compared to single "flattened heap" approach
- Two-level is 25-60% slower depending on track structure
- Question: Does the fairness benefit justify the cost?
- For aligned tracks with similar stream counts, output is basically the same

## MSF/CMSF Offsite Meeting (Feb 5)
[[will-law]] shared a group photo from a dedicated offsite meeting on MSF/CMSF formatting.

## Request ID Bug (Feb 5-9)
Spec bug discovered: REQUEST_ERROR accidentally lost Request ID and Error Code fields during varint PR (#1016). SUBSCRIBE_NAMESPACE request IDs don't follow the same increment-by-2 rule as control stream request IDs.

# Key Meetings
- Boulder interim: Feb 9-12 at Google's Boulder office
- Interim meetings: Feb 9 and Feb 10 with Meetecho/Google Meet
- Slides deadline: Feb 5

# New Implementations Noted
- Shaka Player v5.0.5: Updated MOQT support from draft-11 to draft-14 (Daiki Matsui, announced Mar 11 but relevant)
- sandarsh: Building moxygen client for interop harness
- moqtail: Draft-14 relay at `relay.moqtail.dev`

# Additional Relays
- [[martin-duke]]: `quichemoq.dev:443` (draft-16)
- MOQtail: `relay.moqtail.dev` (draft-14)
- Akamai: `moq-test.akaleapi.net`
