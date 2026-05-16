# NS-1002 Project Atlas Grouping, Filtering, And Sequencing

Date: `2026-05-08`

## Purpose

Define how projects are grouped, filtered, and sequenced inside the Newsense
atlas so the spatial form translates into a usable discovery system.

This document is the practical follow-on to:

- `planning/project-atlas-object-and-fallback-spec.md`
- `planning/project-taxonomy-and-launch-rules.md`

## Primary Grouping Logic

The atlas groups work in this priority order:

1. `featured` vs non-featured
2. `case_study_type`
3. `client`
4. `service`

This keeps the atlas readable at first glance while still allowing deeper
filtering.

## Default Atlas Sequence

### Featured Layer First

The homepage and `/projects` atlas should surface the launch featured set first:

1. `re-outland`
2. `oneplus-softgold`
3. `oneplus-lava-red`
4. `ikodoo`
5. `agm-glory`
6. `oneplus-experience-store`
7. `divine-heritage`

### Live Layer Second

After featured work, show the remaining live work grouped by type:

- `motion`
- `campaign-system`
- `editorial-stills`

### Archive Third

Archive is explicitly separated and never mixed into the main featured/live
sequence.

## Filtering Model

### First-Wave Filters

Allowed at launch:

- `All work`
- `Motion`
- `Campaign system`
- `Editorial stills`

### Second-Wave Filters

Available later if needed:

- by client
- by service

These should not clutter the first atlas frame by default.

## Filter Behavior

Rule:

- filtering changes visible node groups, not the route structure

That means:

- `/projects` remains the route
- filter state may live in query params later
- filter changes should not become separate pages

## Sequencing Inside Types

### `motion`

Sequence by:

1. strongest launch value
2. media completeness
3. rhythm diversity

Recommended order:

- `ikodoo`
- `agm-glory`
- `agm-x2`
- `agm-x3`
- `agm-x5`
- `op-roadtrip`

### `campaign-system`

Recommended order:

- `re-outland`
- `oneplus-softgold`
- `oneplus-lava-red`
- `kaa`
- `agm-x2-football`

### `editorial-stills`

Recommended order:

- `oneplus-experience-store`
- `divine-heritage`

## Archive Sequencing

Archive should be ordered by preservation clarity, not by false prestige.

Suggested order:

- `alpha-source`
- `arte-artifacts`
- `cider-and-milk`
- `seasalt`
- `tune-speaker`
- `vito-coffee`

## Preview Rules

Project previews in the atlas should expose:

- project name
- type
- maybe one short metadata cue

They should not expose:

- full case-study copy
- long service lists
- fake metrics

## Transition Rules

From atlas to case study:

- selected node gains focus
- route resolves to `/projects/:slug`
- content transition should preserve object continuity where possible

From case study back to atlas:

- user returns to the same atlas grouping/filter context if possible

## Editorial Fallback Equivalence

The DOM-first `/projects` page must preserve:

- same featured order
- same type sections
- same archive separation

No hidden alternate ordering logic is allowed in fallback mode.

## Acceptance For NS-1002

- Atlas grouping order is explicit.
- Featured/live/archive sequencing is frozen.
- First-wave filters are tight and readable.
- Scene and DOM fallback preserve the same content hierarchy.
