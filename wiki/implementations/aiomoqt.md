---
title: "aiomoqt (Python)"
tags: [implementation, python, async]
date: 2026-04-10
last_updated: 2026-09-04
status: current
---

**Language**: Python (asyncio)
**Maintainer**: Giovanni Marzot
**GitHub**: [gmarzot/aiomoqt](https://github.com/gmarzot/aiomoqt)
**Transport**: [gmarzot/aiopquic](https://github.com/gmarzot/aiopquic) (Python/Cython bindings to picoquic)

# Overview

Python async implementation of MOQ Transport, using aiopquic for the QUIC transport layer.

# Draft Support

- **Dual draft-14 and draft-16** with ALPN-based negotiation (`moq-00` for draft-14, `moqt-16` for draft-16), since extended toward the current interop drafts and now exercised on **draft-18** (ALPN `moqt-18`) at the Sep-2 hackathon
- Latest release: **v0.11.0rc3** (pre-release to PyPI Sep-3 2026, `pip install --pre aiomoqt==0.11.0rc3` — "substantially more draft-18 conformant"); **rc2** cut Sep-2 ("all 8 jobs green"). The 0.11.0 line finally ships the long-in-flight **SUBSCRIBE_OK `vi64` decode fix** (see below); no final 0.11.0 tag yet. Prior stable: **v0.10.6** (~July 8, 2026; PyPI [`aiomoqt`](https://pypi.org/project/aiomoqt/))
- **draft-18 conformance now passing 12/12 (Sep-3)**: the aiomoqt CI conformance job (moq-test from a **pinned [[moxygen]] build**) reached its **first green run — d16 + d18 12/12** on Sep-3, the payoff of the Sep-2/3 hackathon relay hardening.
- **Relay role added (Sep-2), hardened into "ersatz-relay" (Sep-3)**: aiomoqt grew a relay — self-described *"pseudo-relay … a vehicle for testing pub/sub flows as both client and server,"* registered in the [[interop-runner]] as `aiomoqt-relay` / `aiomoqt-relay-quic`. Its Sep-2 conformance run drove the first relay fixes (*"relay dials upstream origins,"* *"forward the publisher's priority through the relay,"* *"relay serves the bare-PUBLISH flow,"* *"relay forwards objects upstream to downstream,"* *"relay matches announced namespaces by prefix,"* *"never send a control message the draft doesn't define,"* *"d18 LARGEST_OBJECT carries its Length field"*). On **Sep-3** [[aman-sharma|Aman Sharma]] surfaced a further batch — the relay was sending the removed **`PUBLISH_NAMESPACE_DONE`**, putting **`REQUEST_OK`/`REQUEST_ERROR` on the control stream** instead of the request bidi stream, doing a **namespace equality check instead of prefix matching**, a **delivery-semantics bug** (a second pub/sub run against a fresh relay delivered nothing), and not handling **`TRACK_STATUS`** — and [[giovanni-marzot|Marzot]] fixed them plus added real **`SUBSCRIBE_TRACKS` → `PUBLISH` fan-out (§9.5)**, GOAWAY send/receive, and SETUP validation. Marzot promoted the name from *"next stop ersatz-relay"* to *"ersatz-relay now copyrighted"* while keeping the "not a real relay" disclaimer.
- Interop tested against 6 relay implementations across both drafts
- **draft-18 SUBSCRIBE_OK parse bug (found 2026-08-13; fix landing in v0.11.0)**: v0.10.6 decodes the SUBSCRIBE_OK Track-Properties block with **RFC 9000 varints instead of the LOC-style `vi64`**, so it runs off the end of the message whenever a property value is ≥ 64 (e.g. `TIMESCALE=1000`, encoded `83 e8`) — surfacing as *"truncated trailing extensions block."* Root-caused by Giovanni Marzot after Steven Riedl (Pluto TV) hit it subscribing to a [[moq-dev]] relay (whose SUBSCRIBE_OK is spec-correct); the encode/decode fix is bound for **aiomoqt v0.11.0** alongside **aiopquic v0.4.0** (both in-flight). As of **Aug-15** the fix is on Marzot's dev branch, and debugging it *"stimulated some additional bug finds in filter support"* — Marzot will validate against Pluto's public relay (among others) before cutting v0.11.0. Workaround on v0.10.6: `MOQTMessage._tolerate_trailing_extensions = True` completes the subscribe but skips the property.
- **v0.10.6 is session-fatal against moq-relay ≥ 0.14.8 (Aug-15)**: moq-dev's relay got stricter at 0.14.8 ([PR #2667](https://github.com/moq-dev/moq/pull/2667): the session is closed on a malformed NAMESPACE), so aiomoqt v0.10.6's draft-18 subscribe flow now fails the whole session (`err=unexpected message`) where older relays warned and continued. Reported by Steven Riedl (Pluto TV), who is upgrading Pluto's public relay to 0.14.8 — another reason to validate v0.11.0 against a current relay before release.
- **`relay_probe` tooling** (`python -m aiomoqt.tools.relay_probe --url …`): reports a relay's transport (QUIC vs H3/WT), its accepted draft set, and RTT — used Aug-14 to resolve WebTransport-path discovery for `fb.mvfst.net:9448` and `moqx-main.ci.openmoq.org:4433` (both want `/moq-relay`, negotiate draft-14/16/18). Ships in the examples with v0.10.6.

# Vienna Hackathon (IETF 126)

At the **July-19 IETF-126 Vienna Hackathon**, Giovanni Marzot ran a **control-plane interop regression with aiomoqt v0.10.6** ([CI run](https://github.com/gmarzot/aiomoqt/actions)), reporting *"good results"* and logging the output to the [ad-hoc interop wiki](https://github.com/moq-wg/moq-transport/wiki/ad-hoc-interop-reports). Marzot also maintains the [openmoq/moqx](https://github.com/openmoq/moqx) `moq_decode.py` decoder — used by other Hackathon participants (afrind) to debug wire-format errors — and landed a July-19 request_id cleanup ([moqx PR #496](https://github.com/openmoq/moqx/pull/496)) aligning it with draft-18.

# Related Projects

- **aiopquic** - Python/Cython bindings to picoquic (shared 2026-03-23)
- Giovanni also created content for the [moq-transport wiki](https://github.com/moq-wg/moq-transport/wiki) (2026-03-31)

# Related

- [[interop-runner]] - Testing framework
