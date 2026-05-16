# NS-601 Support Matrix

Date: `2026-05-08`

## Purpose

Define the delivery tiers for the Newsense site before implementation starts so
the immersive concept never outruns the actual support model.

## Principle

The immersive mode is progressive enhancement.

The site must always have a dignified content-complete fallback.

## Delivery Tiers

### Tier A: Immersive

Target:

- modern devices with `navigator.gpu`
- strong enough graphics/runtime headroom for the chosen scene shell
- no user preference requiring motion reduction severe enough to disable core
  scene behavior

Experience:

- full spatial homepage and project-atlas behavior
- richest object transitions
- highest-fidelity materials and lighting

Required content parity:

- full parity with all launch routes

### Tier B: Reduced 3D

Target:

- devices where full immersive mode is too heavy
- browsers or GPUs where WebGPU is unavailable or not selected
- environments where WebGL-class rendering is acceptable but scene complexity
  must be reduced

Experience:

- simplified object system
- fewer effects
- lower-poly or reduced-animation assets
- preserved route structure

Required content parity:

- full parity with:
  - homepage
  - projects
  - case studies
  - studio
  - team
  - contact
  - archive

### Tier C: Editorial Fallback

Target:

- unsupported or unstable graphics environments
- explicit accessibility or low-power preference paths
- fail-safe mode when 3D initialization fails

Experience:

- DOM-first editorial site
- same content architecture
- no essential information loss

Required content parity:

- complete parity for all primary routes

## Trigger Logic

### Enter Tier A When

- `navigator.gpu` is available
- capability check passes
- reduced-motion requirement does not disqualify the immersive path
- runtime health checks stay within acceptable thresholds

### Enter Tier B When

- immersive requirements fail
- but reduced 3D remains viable

### Enter Tier C When

- graphics initialization fails
- runtime becomes unstable
- accessibility or device constraints demand the simplest path

## Asset Budget Rules

### Tier A

- can use the richest object set
- can use advanced lighting and transitions
- still must obey explicit scene budgets

### Tier B

- no heavy Meshy output without optimization
- reduced geometry count
- reduced texture size
- simplified post-processing

### Tier C

- no 3D dependency
- image and video assets must degrade gracefully
- copy and navigation remain first-class

## Required Route Parity

All tiers must support:

- `/`
- `/projects`
- `/projects/:slug`
- `/studio`
- `/team`
- `/contact`
- `/archive`
- `/archive/:slug`

## Accessibility Rules

- `prefers-reduced-motion` must influence mode choice and animation behavior
- keyboard access must exist independently of 3D pointer affordances
- contact and core case-study information must never depend on scene interaction

## Planning Consequences

### For `NS-401`

- route design must assume parity across all three tiers

### For `NS-501`

- the reference repo cannot be adopted as-is because it does not satisfy this
  support model

### For Meshy Work

- generated objects must be planned with Tier B simplification in mind
- no Meshy asset is accepted without a reduced-mode strategy

## Launch Recommendation

Launch assumption:

- build for Tier C parity first
- design Tier A as the premium layer
- use Tier B as the controlled compromise path

This keeps the Newsense site from becoming a fragile demo.

## Acceptance For NS-601

- The support tiers are explicit enough to constrain later implementation.
- Every future scene or asset decision can be judged against the three-tier
  model.
