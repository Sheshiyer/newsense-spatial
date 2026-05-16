# NS-1001 / NS-604 Project Atlas Object And Fallback Spec

Date: `2026-05-08`

## Purpose

Freeze the spatial form of the Newsense project atlas and the editorial
fallback behavior it requires, so `Projects` can be implemented as the main
discovery system without drifting into poster-collage UX.

This document is the practical follow-on to:

- `planning/ia-route-model.md`
- `planning/project-taxonomy-and-launch-rules.md`
- `planning/runtime-mode-switch-contract.md`

Primary visual lock:

- `/Volumes/madara/2026/twc-vault/01-Projects/thoughtseed/thoughtseed-labs/60-client-ecosystem/newsense/brand-relaunch/gpt-image-2-strict-two-image-2026-05-08/outputs/02-project-atlas-concept-board.png`

## Core Decision

The atlas form factor is a **tiered spatial plinth system organized around a
central mast and ring logic**.

It is not:

- a flat poster wall
- a literal product carousel
- a free-floating planet field
- a game world to roam through manually

It is:

- a structured editorial display system
- a stage for grouped case-study nodes
- a route-aware spatial index

## Spatial Thesis

The atlas should feel like a gallery instrument:

- central vertical spine
- upper featured decks
- lower editorial podium
- separate shadow shelf for archive

The site’s work is not “thrown into 3D”.

It is curated into a hierarchy the user can read quickly.

## Atlas Geometry

### Central Mast

- one vertical dark spine
- stabilizes the whole composition
- acts as the visual pivot between left and right work groupings

### Upper Featured Decks

- suspended or elevated horizontal platforms
- hold the priority featured nodes
- communicate that featured work is first-wave surface area

### Lower Editorial Podium

- grounded circular or oval base
- holds the still-led cases
- calmer and lower than the upper decks

### Archive Shadow Shelf

- separate lower strip
- visually quieter
- clearly addressable but not hero-weighted

## Case-Study Node Language

Each node is abstracted from project type, not built as a literal campaign
poster.

### `motion`

Preferred geometry:

- discs
- cylinders
- solid rounded volumes

Meaning:

- movement
- duration
- flow

### `campaign-system`

Preferred geometry:

- rings
- slabs
- lamellae
- stacked panels

Meaning:

- modularity
- scalable idea systems
- structured rollout

### `editorial-stills`

Preferred geometry:

- framed planes
- shallow light-box forms
- quiet rectangular surfaces

Meaning:

- image-led clarity
- stillness
- curation

### `archive-fragment`

Preferred geometry:

- darker blocks
- smaller suppressed objects
- low-contrast shelf pieces

Meaning:

- preserved but secondary

## Launch Featured Mapping

The first-wave atlas should explicitly prioritize:

1. `re-outland`
2. `oneplus-softgold`
3. `oneplus-lava-red`
4. `ikodoo`
5. `agm-glory`
6. `oneplus-experience-store`
7. `divine-heritage`

Recommended grouping:

- upper-left cluster:
  - `re-outland`
  - `oneplus-softgold`
  - `oneplus-lava-red`
- upper-right cluster:
  - `ikodoo`
  - `agm-glory`
- lower podium:
  - `oneplus-experience-store`
  - `divine-heritage`

This keeps the atlas readable and aligned to the locked taxonomy.

## Navigation Geometry

### Reading Order

The user should be able to read the atlas in three passes:

1. featured headline grouping
2. case-study type grouping
3. deep-link selection to project detail

### Movement Model

- focus transitions between nodes
- slight camera translation between clusters
- no uncontrolled free roam

### Route Behavior

- `/projects` opens the atlas
- selecting a node resolves to `/projects/:slug`
- archive shelf resolves to `/archive` or `/archive/:slug`

## Overlay And Label Rules

Allowed:

- concise type labels
- node names
- type legends
- filter state
- short explanatory copy

Not allowed:

- full poster compositions inside nodes
- dense pitch-deck text over the scene
- fake social-post chrome

## Reduced-3D Variant

### Structural Rule

Reduced mode keeps the same hierarchy:

- mast
- featured decks
- editorial podium
- archive shelf

### Simplifications

- fewer nodes visible at once
- flatter materials
- reduced depth
- simplified labels and transitions

The atlas should still feel like a system, not a fallback apology.

## Editorial Fallback Contract

This is the `NS-604` consequence of the atlas decision.

### DOM-First Equivalent

Editorial fallback must preserve:

- featured group first
- grouping by case-study type
- archive as a separate lower-priority section
- direct route access to every project

### Minimum Content Surface

The DOM-first `/projects` page must include:

- featured projects strip
- sections for:
  - motion
  - campaign-system
  - editorial-stills
- archive entry point
- concise category explanation

### What Must Survive

- route parity
- project ordering logic
- taxonomy clarity
- archive suppression from the hero path

### What May Disappear

- sculptural depth
- spatial camera movement
- reactive highlighting

## Mobile Behavior

Detailed responsive behavior belongs to `NS-1004`, but the structural rule is
already fixed:

- mobile should not attempt to miniaturize the whole atlas scene at once
- mobile should step through grouped layers in a controlled sequence
- editorial fallback remains acceptable on low-capability devices

## Implementation Guidance

Build this as a scene-backed information architecture, not as a decorative
three.js showcase.

That means:

- explicit object IDs per case-study node
- deterministic focus targets
- stable mapping to project slugs
- clean downgrade path into DOM sections

## Acceptance For NS-1001 / NS-604

- The atlas form factor is decisively chosen.
- Project types map to distinct node families.
- Featured, live, and archive hierarchy is readable in both scene and DOM
  fallback.
- The fallback surface preserves information architecture instead of becoming a
  disconnected alternate site.
