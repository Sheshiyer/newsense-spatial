# NS-402 Project Taxonomy And Launch Rules

Date: `2026-05-08`

## Purpose

Freeze the project taxonomy and the boundary between featured work, live work,
 and archive material before implementation starts.

This document is the practical follow-on to:

- `planning/ia-route-model.md`
- `planning/content-schema-and-field-map.md`

## Canonical Project Set

Recovered routes: `19`

### Real Project Routes

`13`

- `agm-glory`
- `agm-x2`
- `agm-x2-football`
- `agm-x3`
- `agm-x5`
- `divine-heritage`
- `ikodoo`
- `kaa`
- `oneplus-experience-store`
- `oneplus-lava-red`
- `oneplus-softgold`
- `op-roadtrip`
- `re-outland`

### Archive / Placeholder Routes

`6`

- `alpha-source`
- `arte-artifacts`
- `cider-and-milk`
- `seasalt`
- `tune-speaker`
- `vito-coffee`

## Core Taxonomy

### Type A: `motion`

Use for:

- product-video-led
- launch-film-led
- motion-first case studies

Projects:

- `agm-glory`
- `agm-x2`
- `agm-x3`
- `agm-x5`
- `ikodoo`
- `op-roadtrip`

### Type B: `campaign-system`

Use for:

- concept/process/outcome narratives
- identity systems
- multi-deliverable campaigns

Projects:

- `re-outland`
- `oneplus-softgold`
- `oneplus-lava-red`
- `kaa`
- `agm-x2-football`

### Type C: `editorial-stills`

Use for:

- photography-first
- still-led
- environment or presentation-led work

Projects:

- `oneplus-experience-store`
- `divine-heritage`

### Type D: `archive-fragment`

Use for:

- preserved but not promoted work
- placeholder/template-origin routes

Projects:

- `alpha-source`
- `arte-artifacts`
- `cider-and-milk`
- `seasalt`
- `tune-speaker`
- `vito-coffee`

## Status Model

### `featured`

Reserved for launch-priority projects surfaced first in the homepage and atlas.

### `live`

Real project routes available in the atlas and case-study system but not in the
top launch shortlist.

### `archive`

Accessible through archive routes only.

## Launch Feature Rules

### Launch Shortlist Criteria

Favor projects that provide:

- stronger editorial depth
- clearer media availability
- broader service representation
- higher signal for Newsense as a studio

### Recommended Launch Featured Set

Tier 1:

- `re-outland`
- `oneplus-softgold`
- `oneplus-lava-red`
- `ikodoo`

Tier 2:

- `agm-glory`
- `oneplus-experience-store`
- `divine-heritage`

Rationale:

- `re-outland` is the strongest full-system case
- `oneplus-softgold` is a strong concept-heavy campaign piece
- `oneplus-lava-red` adds another concept-led large-brand signal
- `ikodoo` gives hybrid live-action and 3D production credibility
- `agm-glory` is a clean motion-led product case
- `oneplus-experience-store` and `divine-heritage` diversify the still-led side

### Live But Not Initially Featured

- `agm-x2`
- `agm-x3`
- `agm-x5`
- `agm-x2-football`
- `kaa`
- `op-roadtrip`

These remain public under `/projects/:slug` but are not first-wave homepage
anchors.

## Archive Rules

Archive items:

- do not appear in the primary featured ring by default
- may appear in an archive drawer or archive landing
- must retain provenance and placeholder awareness

## Atlas Grouping Rules

Primary grouping dimensions:

1. `case_study_type`
2. `featured` vs `live`
3. `client`
4. `service`

Default homepage/atlas emphasis:

- featured first
- then live work grouped by type

## Known Source Cautions

- `oneplus-experience-store` carries a client warning in source data
- `kaa` has a naming mismatch that should remain visible in normalized metadata
- some routes have shallow narrative depth and should not be forced into the
  same storytelling weight as `re-outland` or `oneplus-softgold`

## Acceptance For NS-402

- Every recovered route has a stable case-study type.
- The featured/live/archive boundary is frozen for launch planning.
- Archive items are preserved without contaminating the main hero path.
