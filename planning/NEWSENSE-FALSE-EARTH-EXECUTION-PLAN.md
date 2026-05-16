# Newsense False Earth Execution Plan

Date: `2026-05-13`

## Purpose

Turn the locked Newsense vision into a concrete build plan now that
`momentchan/false-earth` is a non-negotiable runtime base rather than a loose
reference.

This document supersedes the earlier donor-only assumption for active
implementation planning.

## Current Truth

- `false-earth` is the actual immersive runtime base.
- Newsense is not adapting a normal portfolio template.
- The 3D world is the primary shell for:
  - orientation
  - work discovery
  - route transitions
  - storytelling
- The site still requires full fallback parity for non-immersive modes.

## Core Product Statement

Newsense is a scene-first studio website about **finding signal in noise**.

The website should feel like:

- entering a field of perception
- leaving nuisance and clutter behind
- seeing creative work resolve into legible systems

The website should not feel like:

- a game
- a VFX demo
- a generic 3D portfolio
- a floating-object showroom

## Source Inputs

Primary planning inputs:

- `planning/homepage-thesis-and-dramaturgy.md`
- `planning/homepage-atmosphere-and-motion.md`
- `planning/ia-route-model.md`
- `planning/project-atlas-object-and-fallback-spec.md`
- `planning/project-atlas-grouping-filtering-sequencing.md`
- `planning/content-schema-and-field-map.md`
- `planning/support-matrix.md`
- `planning/wordmark-monolith-spec.md`

Primary source content:

- `/Volumes/madara/2026/twc-vault/01-Projects/thoughtseed/thoughtseed-labs/60-client-ecosystem/newsense/old-website/`

Primary object assets:

- `public/models/newsense/stage-support.glb`
- `public/models/newsense/motion-node.glb`
- `public/models/newsense/editorial-frame.glb`

## Architectural Consequence

We are not building a custom lightweight shell in parallel anymore.

We are transplanting Newsense onto a modified `false-earth` runtime. That means:

1. keep the world bootstrapping, render shell, and atmospheric discipline
2. replace the original world premise, loading language, and traversal logic
3. install Newsense route state, objects, and content surfaces in their place

## Experience Model

### `/`

Role:

- threshold into clarity
- first stable orientation surface

Primary object:

- `Wordmark Monolith`

### `/projects`

Role:

- main signal atlas
- grouped discovery system for work

Primary object system:

- `Project Atlas`
- featured decks
- lower podium
- archive shelf

### `/projects/:slug`

Role:

- focused editorial case-study resolution

Primary behavior:

- one signal comes into full view

### `/studio`

Role:

- explain method
- explain how Newsense turns scattered inputs into coherent work

### `/team`

Role:

- humanize the signal-making system

### `/contact`

Role:

- direct next action
- conversation as continuation of clarity

### `/archive`

Role:

- provenance
- suppressed historical layer

## Phase Plan

## Phase 1: Runtime Adoption

Goal:

- stand up `false-earth` as the canonical immersive app base inside the
  Newsense repo

Tasks:

- vendor or initialize the `packages/three-core` dependency intentionally
- replace `False Earth` loading copy and onboarding language
- remove launch-critical dependence on astronaut/game traversal UX
- define the new app-level route/mode/object store

Exit condition:

- the base world boots as Newsense infrastructure, not as the original artwork

## Phase 2: Narrative Shell

Goal:

- encode the Newsense story into world states and transitions

Tasks:

- implement `idle`, `focus`, `open`, `return` state model
- translate homepage threshold behavior into real camera and object logic
- preserve the wordmark as the first stable orientation surface

Exit condition:

- `/` reads as Newsense before any project content is opened

## Phase 3: Content Runtime

Goal:

- normalize the recovered portfolio into runtime records

Tasks:

- implement `content/` import pipeline
- generate `studio`, `team`, `services`, `clients`, and `projects` records
- preserve provenance and warnings from the vault archive

Exit condition:

- the immersive layer and editorial layer both read from the same content model

## Phase 4: Atlas World

Goal:

- make `Projects` the main discovery surface

Tasks:

- build featured/live/archive grouping
- map project types to object families
- support filters without changing route structure
- preserve context when opening and returning from case studies

Exit condition:

- `/projects` is the clearest statement of the Newsense portfolio

## Phase 5: Case-Study Resolution

Goal:

- bring project stories into focused readable states

Tasks:

- implement project route transitions
- build media-aware case-study layouts
- differentiate motion, campaign-system, and still-led case studies

Exit condition:

- `/projects/:slug` feels like a true editorial deep read, not a modal or card

## Phase 6: Studio Surfaces And Fallback

Goal:

- complete the supporting routes and non-immersive parity

Tasks:

- implement `Studio`, `Team`, `Contact`, and `Archive`
- ensure Tier B and Tier C parity
- preserve route truth independent of scene readiness

Exit condition:

- the site remains content-complete even without immersive mode

## Immediate Build Slice

The next implementation slice should be:

1. adopt `false-earth` runtime structure cleanly
2. replace its opening copy and scene intent with Newsense threshold language
3. install the shared navigation store
4. mount the first Newsense owned objects into the world
5. wire `/` and `/projects` as the first real route pair

## Immediate Non-Goals

- no launch-critical astronaut path
- no free-roam navigation
- no decorative object spam
- no project atlas built from placeholder routes
- no content hidden only inside the 3D scene

## Acceptance

- The current implementation direction is unambiguous.
- `false-earth` is treated as the runtime base.
- Newsense story, portfolio, and route model are now expressed as a build plan.
