# Newsense 3D Website Rebuild Plan

Date: `2026-05-08`

## Objective

Build a new Newsense website that preserves the recovered studio content and
case studies, but presents them through a more spatial and cinematic system
instead of a flat portfolio grid. The new site should use
`momentchan/false-earth` as the immersive scene/navigation starting point while
avoiding the trap of shipping a game demo with content bolted on afterward.

## Canonical Inputs

- Legacy site archive:
  - `60-client-ecosystem/newsense/old-website/data/brand-summary.json`
  - `60-client-ecosystem/newsense/old-website/data/projects.json`
  - `60-client-ecosystem/newsense/old-website/data/team.json`
  - `60-client-ecosystem/newsense/old-website/data/services.json`
  - `60-client-ecosystem/newsense/old-website/data/contact.json`
  - `60-client-ecosystem/newsense/old-website/site-summary.md`
- Preserved brand work:
  - `60-client-ecosystem/newsense/brand-relaunch/gpt-image-2-run-2026-05-08/`
- Base code reference:
  - `https://github.com/momentchan/false-earth`
- Interaction references shortlisted from Codrops:
  - `https://tympanus.net/codrops/2026/04/21/false-earth-from-webgl-limits-to-a-webgpu-driven-world/`
  - `https://tympanus.net/codrops/2026/02/17/reactive-depth-building-a-scroll-driven-3d-image-tube-with-react-three-fiber/`
  - `https://tympanus.net/codrops/2026/02/24/from-flat-to-spatial-creating-a-3d-product-grid-with-react-three-fiber/`
  - `https://tympanus.net/codrops/2026/03/09/building-a-scroll-reactive-3d-gallery-with-three-js-velocity-and-mood-based-backgrounds/`
  - `https://tympanus.net/codrops/2026/02/19/creating-a-smooth-horizontal-parallax-gallery-from-dom-to-webgl/`
  - `https://tympanus.net/codrops/2023/04/04/case-study-crosswire/`

## Discovery Summary

- Newsense is a small independent design and film studio with a concise studio
  story, three named team members, six core services, and a portfolio centered
  on product videos, launch films, campaign systems, photography, and hybrid
  brand work.
- The preserved archive contains `19` portfolio routes. `13` are strong enough
  to act as flagship projects and `6` are placeholder/template pages that should
  be retained as archive/provenance, not promoted as live work.
- The most reusable structure in the archive is not the Wix page chrome; it is
  the repeated case-study grammar:
  - hero premise
  - client/service metadata
  - narrative sections
  - visual gallery
  - credits
  - contact CTA
- `false-earth` is a high-end React Three Fiber / Three.js WebGPU scene shell
  with strong performance thinking, loading-state patterns, and scene-state
  separation, but it is currently built around:
  - a third-person astronaut
  - procedural grass and terrain
  - game-like traversal
  - WebGPU-only assumptions
- The upstream repo also depends on a missing shared package/submodule, so it
  should not be treated as a turnkey starter that can simply be cloned and
  restyled.
- That makes `false-earth` a strong spatial foundation and a weak direct website
  starter. It should be forked as a scene/navigation engine and heavily reduced
  before real Newsense content is layered in.

## Key Decisions

- The vault remains the source of truth for recovered content, provenance, and
  brand notes.
- The actual website should live in a separate implementation repository:
  `sheshiyer/newsense`.
- The new repo should contain a normalized content package derived from the
  vault, not direct runtime reads from the vault.
- `false-earth` should be treated as a shell:
  - keep scene management, loading, performance controls, and camera/state ideas
  - remove the astronaut/gameplay premise
  - replace traversal with object selection, camera choreography, and overlays
- The heaviest 3D density should live inside `Projects`. `Studio`, `Team`, and
  `Contact` should remain stylistically integrated but operationally lighter so
  the work stays the main spatial experience.
- Newsense brand surfaces and Newsense client work must stay separated:
  - studio identity drives the homepage and global atmosphere
  - client visuals are used inside work/case-study contexts only
- The site must support an immersive mode and a dignified fallback mode. A
  studio website cannot disappear for users who lack WebGPU support.

## Proposed Repo Topology

New repository: `sheshiyer/newsense`

Suggested local clone root:
`/Volumes/madara/2026/twc-vault/01-Projects/thoughtseed/newsense`

Suggested structure:

- `README.md`
- `planning/`
- `content/`
- `content/studio.json`
- `content/team.json`
- `content/services.json`
- `content/clients.json`
- `content/projects/*.json`
- `content/archive/*.json`
- `content/media-manifest.json`
- `public/assets/newsense/`
- `scripts/import-newsense-archive.py`
- `src/app/`
- `src/scene/`
- `src/objects/`
- `src/views/`
- `src/content/`
- `src/ui/`
- `src/lib/`
- `src/fallback/`

## Content Model

### Studio Layer

- Wordmark and canonical logo usage
- Positioning statement
- Founder/studio manifesto
- Services
- Team
- Client roster
- Contact details

### Work Layer

- Featured projects
- Project taxonomy
- Credits
- Supporting media
- Outcome/proof snippets where available

### Archive Layer

- Placeholder routes from the Wix import
- Source warnings and provenance notes
- Incomplete or ambiguous media mappings

## Case Study Taxonomy

### Type A: Motion Case

Use for product videos and launch films with strong video emphasis.

Likely projects:
- `agm-glory`
- `agm-x2`
- `agm-x3`
- `agm-x5`
- `ikodoo`
- `op-roadtrip`
- `oneplus-lava-red`

### Type B: Campaign/System Case

Use for work with strategy, narrative sections, brand logic, collateral, or
multi-medium storytelling.

Likely projects:
- `re-outland`
- `oneplus-softgold`
- `kaa`
- `agm-x2-football`

### Type C: Editorial/Stills Case

Use for photography, environment, or presentation-first work where the image
set carries the experience.

Likely projects:
- `oneplus-experience-store`
- `divine-heritage`

### Type D: Archive Placeholder

Use for preserved-but-not-promoted routes.

Projects:
- `alpha-source`
- `arte-artifacts`
- `cider-and-milk`
- `seasalt`
- `tune-speaker`
- `vito-coffee`

## View Taxonomy

- `Stage View`
  - scene-first landing state
  - atmosphere, wordmark, minimal orientation
- `Project Atlas`
  - project discovery surface
  - grouped by content type, service, or client
- `Motion Case View`
  - video-first layout
  - moving stills, credits rail, outcome/proof notes
- `Campaign Case View`
  - narrative-first layout
  - process sequence, brand assets, collateral, proof
- `Editorial Case View`
  - still-first layout
  - gallery rhythm, captions, client context
- `Studio View`
  - about, positioning, method, services
- `Team View`
  - founders and collaborators presented as distinct voices
- `Contact View`
  - inquiry CTA, email, phone, location
- `Archive Drawer`
  - placeholder work and provenance surfaces

## 3D Object Navigation Map

| Menu item | Scene object | Opens | Notes |
| --- | --- | --- | --- |
| `Home` | `Wordmark Monolith` | `Stage View` | Preserve the text logo and use it as the calmest anchor in the scene. |
| `Projects` | `Atlas Ring` | `Project Atlas` | Primary navigation object; can borrow the cylindrical or curved-grid logic from Codrops references. |
| `Studio` | `Method Tower` | `Studio View` | Lighter than Projects; houses positioning, services, and process voice. |
| `Team` | `Portrait Prism` | `Team View` | Dedicated object or tightly coupled subview; preserve addressability without overbuilding it. |
| `Contact` | `Signal Beacon` | `Contact View` | Minimal, clear, always reachable, and suitable for overlay fallback. |
| `Archive` | `Shadow Shelf` | `Archive Drawer` | Secondary access path for placeholder/provenance work. |

## Codrops Reference Fit

| Reference | Use for Newsense | Do not copy blindly |
| --- | --- | --- |
| `false-earth` | scene shell, loading flow, performance posture, immersive feeling | astronaut, game controls, grass world, full WebGPU dependency as the only delivery mode |
| `Reactive Depth` | project atlas motion model, synchronized DOM overlay, cylindrical media loop | literal helmet aesthetic or tube-as-gimmick everywhere |
| `3D Product Grid` | curved work index, spatial grouping, camera rig ideas | product-card retail logic |
| `Scroll-Reactive 3D Gallery` | project-specific mood backgrounds and palette blending | scroll-only architecture if object selection feels stronger |
| `Horizontal Parallax Gallery` | case-study media rails and still galleries | DOM-only layout when the immersive stage needs GPU continuity |
| `Crosswire` | simplifying complex service stories inside a 3D environment | turning Newsense into a corporate explainer interface |

## False Earth Adaptation Strategy

### Reuse

- React Three Fiber app shell
- renderer setup patterns
- performance monitor logic
- loading screen structure
- scene/UI separation
- central store/state approach
- ambient scene-layering ideas

### Replace

- character and movement controls
- world narrative and terrain logic
- side-bar control semantics
- audio logic tied to locomotion
- contentless scene objects

### Add

- content import pipeline
- project atlas object system
- object-selection state machine
- overlay/view router
- fallback renderer path
- editorial typography and layout system

## Delivery Modes

### Mode 1: Immersive

- WebGPU-capable devices
- full spatial scene
- animated object navigation
- richest media treatment

### Mode 2: Reduced 3D

- devices that can run standard Three.js / WebGL but not full WebGPU
- simplified geometry, fewer effects, preserved object logic

### Mode 3: Editorial Fallback

- DOM-first mode for non-supported or accessibility-constrained contexts
- same content architecture and case-study templates
- no core information loss

## Phase Map

### Phase 0: Foundation

Outcome:
- dedicated repo exists
- source content is normalized
- object map and content taxonomy are frozen

### Phase 1: Scene Shell

Outcome:
- `false-earth` is reduced into a navigable Newsense scene shell with fallback
  logic and scene state

### Phase 2: Work Experience

Outcome:
- project atlas and the three main case-study templates are live
- preserved projects are imported

### Phase 3: Studio Surfaces

Outcome:
- about, services, team, client proof, and contact are fully integrated into the
  immersive system

### Phase 4: Polish and Release

Outcome:
- transition language is unified
- performance and accessibility are verified
- deployment and editorial handoff are ready

## Wave Plan

### Wave 1

- repo scaffold
- content normalization
- brand guardrails
- object map

### Wave 2

- scene-shell reduction
- capability detection
- camera/object interaction
- performance controls

### Wave 3

- homepage/stage
- project atlas
- case-study templates
- project import

### Wave 4

- studio/about
- team
- client proof
- contact
- owned asset pack

### Wave 5

- Codrops-inspired motion polish
- QA
- deployment
- handoff

## GitHub Issue Backlog

Issue definitions live in:
`60-client-ecosystem/newsense/newsense-website-backlog.json`

The backlog is intentionally structured so that:
- one issue maps to one owned workstream
- issue dependencies are explicit
- scene-shell work and content work can run in parallel once Phase 0 lands

## Recommendation

Proceed with a separate `sheshiyer/newsense` repo now. Treat the vault as the
canonical archive and planning layer, then import a normalized snapshot into the
new repo for implementation. Build the first shippable version around:

- `Home`
- `Projects`
- `Studio`
- `Team`
- `Contact`

Keep `Projects` as the dominant spatial system and `Archive` as a secondary
surface. That preserves everything important from the scrape without forcing
placeholder routes or overly heavy support pages into the hero path.
