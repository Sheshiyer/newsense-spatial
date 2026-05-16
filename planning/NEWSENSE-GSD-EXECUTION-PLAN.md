# Newsense GSD Execution Plan

Date: `2026-05-08`

## Purpose

Expand the current `20` high-level GitHub issues into a detailed pre-build
execution map before implementation starts.

This plan intentionally keeps the current `20` issues as epics and adds a second
layer of atomic execution issues under them.

## Issue Model

- Current GitHub issues `NS-001` to `NS-020` become epics.
- New execution issues use `NS-101` onward and map back to a parent epic.
- Target total issue count:
  - `20` epics
  - `79` execution issues
  - `99` total issues

## New Planning Constraints

- `Projects` remains the primary spatial surface.
- `Studio`, `Team`, and `Contact` remain important but lighter-weight than the
  work system.
- `false-earth` remains a scene-shell reference, not a turnkey site starter.
- `Meshy AI` is now an explicit part of the plan for:
  - text-to-3D ideation
  - image-to-3D generation
  - multi-image-to-3D experiments
  - retexture and remesh workflows
- The existing Newsense brand run is now a first-class source artifact, not a
  side reference.

## Meshy AI Planning Note

Meshy is available locally through an existing `MESHY_API_KEY` environment
variable. For planning purposes, the relevant official API surfaces are:

- [Quickstart](https://docs.meshy.ai/en/api/quick-start)
- [Text to 3D](https://docs.meshy.ai/api/text-to-3d)
- [Image to 3D](https://docs.meshy.ai/en/api/image-to-3d)
- [Multi-Image to 3D](https://docs.meshy.ai/en/api/multi-image-to-3d)
- [Retexture](https://docs.meshy.ai/en/api/retexture)
- [Remesh](https://docs.meshy.ai/en/api/remesh)

Planning implication:

- `Text to 3D` is best for abstract Newsense-first navigation objects.
- `Image to 3D` and `Multi-Image to 3D` are best for turning curated Newsense
  brand references into object candidates.
- `Retexture` and `Remesh` are best for either:
  - existing meshes from the reference repo
  - purchased or base meshes
  - a possible astronaut customization experiment

## Astronaut Decision

Primary recommendation:

- Do **not** keep the astronaut as the main navigation language.
- Keep the main system centered on Newsense-specific objects.

Optional experiment:

- Keep an astronaut customization path as a secondary guide/avatar or `Lab`
  surface if it can be retextured and reframed to feel like a designed witness
  rather than a game character.

Why:

- Newsense is a design and film studio, not a game.
- A strong branded object system scales better across projects, studio, and
  archive views.
- The astronaut can still become useful as a cinematic motif, onboarding guide,
  or ambient presence if it is deliberately subordinated to the main IA.

## Phase and Wave Map

| Phase | Waves | Focus | Issue Count |
| --- | --- | --- | --- |
| `Phase 0 Foundation` | `0A` to `0D` | repo governance, content modeling, brand system, IA freeze | `16` |
| `Phase 1 Scene Shell` | `1A` to `1C` | false-earth audit, capability modes, navigation state, accessibility | `15` |
| `Phase 2 Experience` | `2A` to `2D` | homepage, atlas, case-study templates, project curation | `19` |
| `Phase 3 Studio + Assets` | `3A` to `3E` | studio/team/contact, brand-run integration, Meshy, interaction language | `26` |
| `Phase 4 Release Gate` | `4A` | QA, deployment, editorial handoff, risk gate | `3` |

## Wave Breakdown

### Wave 0A: Program Setup

- `NS-101`
- `NS-102`
- `NS-103`

### Wave 0B: Content Modeling

- `NS-201`
- `NS-202`
- `NS-203`
- `NS-204`

### Wave 0C: Brand System

- `NS-301`
- `NS-302`
- `NS-303`
- `NS-304`
- `NS-305`

### Wave 0D: Information Architecture Freeze

- `NS-401`
- `NS-402`
- `NS-403`
- `NS-404`

### Wave 1A: Reference Repo Reduction

- `NS-501`
- `NS-502`
- `NS-503`
- `NS-504`

### Wave 1B: Capability Modes

- `NS-601`
- `NS-602`
- `NS-603`
- `NS-604`

### Wave 1C: Navigation and Controls

- `NS-701`
- `NS-702`
- `NS-703`
- `NS-704`
- `NS-801`
- `NS-802`
- `NS-803`

### Wave 2A: Homepage and Stage

- `NS-901`
- `NS-902`
- `NS-903`
- `NS-904`

### Wave 2B: Project Atlas

- `NS-1001`
- `NS-1002`
- `NS-1003`
- `NS-1004`

### Wave 2C: Case-Study Templates

- `NS-1101`
- `NS-1102`
- `NS-1103`
- `NS-1201`
- `NS-1202`
- `NS-1203`
- `NS-1204`
- `NS-1301`
- `NS-1302`
- `NS-1303`
- `NS-1304`

### Wave 2D: Project Curation

- `NS-1401`
- `NS-1402`
- `NS-1403`
- `NS-1404`

### Wave 3A: Studio Surfaces

- `NS-1501`
- `NS-1502`
- `NS-1503`
- `NS-1601`
- `NS-1602`
- `NS-1603`
- `NS-1701`
- `NS-1702`
- `NS-1703`

### Wave 3B: Brand-Run Integration

- `NS-1801`
- `NS-1802`
- `NS-1803`

### Wave 3C: Meshy AI Pipeline

- `NS-1804`
- `NS-1805`
- `NS-1806`
- `NS-1807`
- `NS-1808`

### Wave 3D: Astronaut Experiment

- `NS-1809`
- `NS-1810`

### Wave 3E: Final Interaction Language

- `NS-1901`
- `NS-1902`
- `NS-1903`

### Wave 4A: Release Gate

- `NS-2001`
- `NS-2002`
- `NS-2003`

## Epic Expansion

### `NS-001` Repo and GSD Setup

- `NS-101` Establish repo governance, branch/worktree policy, and definition of done.
- `NS-102` Configure issue taxonomy, labels, milestones, and GSD operating conventions.
- `NS-103` Create planning index, ADR log, and issue/backlog sync workflow.

### `NS-002` Content Normalization

- `NS-201` Define normalized content schemas and field-mapping matrix.
- `NS-202` Build studio/team/services/contact import pipeline.
- `NS-203` Build project/archive/provenance import pipeline.
- `NS-204` Build media manifest, missing-asset audit, and source-warning registry.

### `NS-003` Brand Guardrails

- `NS-301` Catalog brand-run outputs, prompts, masks, and manifests.
- `NS-302` Freeze wordmark rules, lockups, clear space, and misuse constraints.
- `NS-303` Translate the brand run into color, material, typography, and motion tokens.
- `NS-304` Write studio-first visual guardrails and anti-collage rules.
- `NS-305` Build reusable prompt/reference packs for FAL and Meshy asset runs.

### `NS-004` IA, Objects, and URL Model

- `NS-401` Freeze route map, view model, and deep-link behavior.
- `NS-402` Freeze project taxonomy and featured/archive rules.
- `NS-403` Freeze object-to-view mapping, overlay architecture, and state boundaries.
- `NS-404` Define SEO surface, editorial URL model, and fallback information parity.

### `NS-005` False Earth Reduction

- `NS-501` Audit `false-earth`, dependency gaps, and missing submodule risk.
- `NS-502` Extract reusable shell patterns and isolate gameplay-only systems.
- `NS-503` Decide port/fork/transplant strategy for scene-shell adoption.
- `NS-504` Build source asset inventory for astronaut, terrain, FX, lighting, UI, and audio.

### `NS-006` Capability and Fallback Modes

- `NS-601` Define support matrix and immersive capability thresholds.
- `NS-602` Design runtime capability detection and mode-switching contract.
- `NS-603` Define reduced-3D mode scope, asset budgets, and visual concessions.
- `NS-604` Define editorial fallback experience and content parity requirements.

### `NS-007` Navigation State and Camera

- `NS-701` Define scene state machine for `idle`, `focus`, `open`, and `return`.
- `NS-702` Design camera choreography and focus rails for all primary objects.
- `NS-703` Define interaction model for mouse, touch, keyboard, and direct links.
- `NS-704` Design DOM/scene synchronization for overlays, routing, and content state.

### `NS-008` Loading, Audio, Accessibility

- `NS-801` Design loading narrative, progress states, and perceived performance cues.
- `NS-802` Define audio policy, mute-first behavior, and optional sonic identity.
- `NS-803` Define reduced-motion, keyboard, and accessibility control requirements.

### `NS-009` Homepage and Stage

- `NS-901` Define homepage thesis, opening dramaturgy, and first-intent paths.
- `NS-902` Design the wordmark monolith or equivalent primary anchor object.
- `NS-903` Define homepage atmospheric system, horizon treatment, and motion mood.
- `NS-904` Write home overlay copy, microcopy, and entry paths into work/studio/contact.

### `NS-010` Project Atlas

- `NS-1001` Choose project atlas form factor and navigation geometry.
- `NS-1002` Define project grouping, filtering, and sequencing logic.
- `NS-1003` Design preview, focus, and archive behavior inside the atlas.
- `NS-1004` Define responsive and mobile variants for the project atlas.

### `NS-011` Motion Case Template

- `NS-1101` Define motion-case template structure and reading order.
- `NS-1102` Design video, still, and playback modules for motion-led work.
- `NS-1103` Design credits, impact, and related-project modules for motion cases.

### `NS-012` Campaign/System Template

- `NS-1201` Define campaign/system case-study structure and reading rhythm.
- `NS-1202` Design process-sequence, collateral, and concept storytelling modules.
- `NS-1203` Design proof, metrics, and outcomes treatment for campaign cases.
- `NS-1204` Define long-read motion behavior for narrative-heavy projects.

### `NS-013` Editorial and Archive Template

- `NS-1301` Define still-led editorial case-study structure and gallery rhythm.
- `NS-1302` Design image rail, lightbox, captions, and zoom treatment.
- `NS-1303` Define archive-fragment template and provenance surfacing.
- `NS-1304` Design source-warning components for ambiguous client/media/credit cases.

### `NS-014` Project Curation and Import

- `NS-1401` Map every preserved project to its final template type and route state.
- `NS-1402` Normalize client names, credits, service tags, and terminology across projects.
- `NS-1403` Audit local video assets, poster needs, image heroes, and missing media.
- `NS-1404` Curate featured-project shortlist and archive boundary for launch.

### `NS-015` Studio Surface

- `NS-1501` Define studio story, manifesto, and positioning modules.
- `NS-1502` Design services/method presentation and the requirement-to-outcome narrative.
- `NS-1503` Define how `Studio` behaves spatially relative to `Projects`.

### `NS-016` Team and Client-Proof Surface

- `NS-1601` Define team presentation model, role framing, and portrait strategy.
- `NS-1602` Design client roster, credits proof, and trust surfaces.
- `NS-1603` Decide whether `Team` is a separate object, overlay, or `Studio` subview.

### `NS-017` Contact Surface

- `NS-1701` Define contact hierarchy and collaboration intake approach.
- `NS-1702` Design contact object/overlay and always-reachable access pattern.
- `NS-1703` Define fallback contact route, CTA variants, and inquiry-tracking needs.

### `NS-018` Brand-Run and Meshy Asset Pipeline

- `NS-1801` Audit existing Newsense brand-run outputs, manifests, and strongest frames.
- `NS-1802` Extract reusable surface/material motifs from the brand run.
- `NS-1803` Build Meshy-ready reference packs from studio-owned imagery and generated refs.
- `NS-1804` Define Meshy API integration surface, credential handling, and endpoint contract.
- `NS-1805` Run text-to-3D ideation track for abstract Newsense navigation objects.
- `NS-1806` Run image-to-3D track from curated brand-run references.
- `NS-1807` Run multi-image-to-3D track for multi-view object generation experiments.
- `NS-1808` Run retexture and remesh experiments on existing meshes.
- `NS-1809` Evaluate astronaut customization as optional guide/avatar, not default nav.
- `NS-1810` Define 3D asset QA: poly budget, PBR maps, export formats, decimation, provenance.

### `NS-019` Final Interaction Language

- `NS-1901` Map shortlisted Codrops patterns to concrete interaction candidates.
- `NS-1902` Define the final transition vocabulary across stage, atlas, case study, studio, and contact.
- `NS-1903` Decide what stays ambient vs reactive vs playful so the site does not drift into game UX.

### `NS-020` QA, Deployment, and Build Gate

- `NS-2001` Define QA matrix, device coverage, performance budgets, and acceptance gates.
- `NS-2002` Define preview/deployment workflow, environment assumptions, and editorial handoff.
- `NS-2003` Run pre-implementation risk review and phase gate before the first build sprint.

## Recommended First Build Slice

Even with the backlog expanded, the first actual build wave should still start
with:

- `NS-201`
- `NS-301`
- `NS-401`
- `NS-501`
- `NS-601`

Reason:

- without normalized content and IA, the 3D decisions are guesswork
- without the brand-system lock, Meshy and asset generation will drift
- without the false-earth audit, the scene path remains ambiguous
- without capability mode definitions, the immersive approach has no delivery guardrail
