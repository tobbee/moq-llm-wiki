---
title: "Michal Hošna"
tags: [person, moq-transport, cdn77, prague]
date: 2026-10-20
last_updated: 2026-10-20
status: current
---

**Affiliation**: [CDN77](https://www.cdn77.com/) (Prague)
**GitHub**: [michalhosna](https://github.com/michalhosna) · **Web**: [michalhosna.com](https://michalhosna.com)
**Role**: [[moq-transport]] contributor — design work on Properties, Publisher Priority, scope/session reuse, and the CAT4MOQ access-token format

# Contributions

- **Properties design thread (Oct 2026).** Opened the **Subgroup Properties** proposal — [#2023](https://github.com/moq-wg/moq-transport/pull/2023) *"Add Subgroup Properties"* (carries per-Subgroup properties in `SUBGROUP_HEADER` and a new FETCH Subgroup entry, filterable via `SUBGROUP_PROPERTY_FILTER`; refs [#1857](https://github.com/moq-wg/moq-transport/issues/1857)) and [#2024](https://github.com/moq-wg/moq-transport/pull/2024) (`SKIP_SUBGROUP_PROPERTIES`) — then extended "make it a Property" to **Publisher Priority** in [#2030](https://github.com/moq-wg/moq-transport/pull/2030), resolving the long-running [#1270](https://github.com/moq-wg/moq-transport/issues/1270) tension of a value that is both a header field and an immutable default. Followed up by filing gaps in his own design: [#2027](https://github.com/moq-wg/moq-transport/issues/2027) (duplicate Properties), [#2028](https://github.com/moq-wg/moq-transport/issues/2028) (Property used outside its scope), [#2029](https://github.com/moq-wg/moq-transport/issues/2029) (grease/Mandatory-Track-Property range overlap). All tentative/unmerged; transport stays at draft-22. See [[discussions-2026-10]].
- **REDIRECT semantics.** [#2000](https://github.com/moq-wg/moq-transport/issues/2000) *"Relay behavior for REDIRECT is underspecified"* (Oct-15) — which cache key a relay uses when following a name-changing REDIRECT, and its Malformed-Track interaction.
- **Publisher Priority (earlier).** [#1770](https://github.com/moq-wg/moq-transport/pull/1770) made the Default Publisher Priority updatable (mid-2026).
- **Scope / session reuse.** [issue #1432](https://github.com/moq-wg/moq-transport/issues/1432) (Mar 2026) asked to define session-reuse rules and tighten the scope definition; [[victor-vasiliev|Vasiliev]] closed it with [#1629](https://github.com/moq-wg/moq-transport/pull/1629).
- **CAT4MOQ auth.** Tracks the **Common Access Token for MoQ** format (moqx [issue #551](https://github.com/openmoq/moqx/issues/551), draft-01) — the token format behind the CAT-token expiration/renewal work. See [[moq-c4m]].

# Related

- [[moq-transport]], [[moq-c4m]], [[alan-frindell]], [[victor-vasiliev]], [[ian-swett]]
