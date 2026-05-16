# NS-602 Runtime Mode-Switch Contract

Date: `2026-05-08`

## Purpose

Define how the Newsense runtime selects between immersive, reduced-3D, and
editorial fallback modes.

This document is the execution follow-on to:

- `planning/support-matrix.md`

## Modes

- `immersive`
- `reduced3d`
- `editorial`

## Selection Principle

Mode selection must be deterministic, explainable, and reversible.

It cannot depend on vague aesthetic preference alone.

## Inputs To Mode Selection

### Environment Inputs

- `navigator.gpu` availability
- WebGL availability
- device class heuristics
- viewport size
- runtime initialization success/failure

### User Preference Inputs

- `prefers-reduced-motion`
- explicit mode override if the product later exposes one

### App Health Inputs

- renderer initialization status
- asset-load failure state
- runtime performance failures severe enough to downgrade safely

## Initial Decision Tree

### Step 1

If the editorial fallback is explicitly forced by accessibility or fatal runtime
failure:

- enter `editorial`

### Step 2

If immersive prerequisites pass:

- enter `immersive`

### Step 3

If immersive prerequisites fail but reduced 3D prerequisites pass:

- enter `reduced3d`

### Step 4

Otherwise:

- enter `editorial`

## Prerequisite Contract

### `immersive`

Requires:

- WebGPU support
- successful immersive renderer init
- no hard reduced-motion disqualifier
- asset plan compatible with Tier A budgets

### `reduced3d`

Requires:

- successful reduced renderer init
- scene shell can render with simplified assets/effects

### `editorial`

Requires:

- nothing beyond standard page rendering

## Route Contract By Mode

All modes must support:

- `/`
- `/projects`
- `/projects/:slug`
- `/studio`
- `/team`
- `/contact`
- `/archive`
- `/archive/:slug`

### `immersive`

- routes may open as scene-first views plus overlays

### `reduced3d`

- routes may use simplified object and transition logic

### `editorial`

- routes must resolve as DOM-first pages or views

## Override Contract

If a future mode switcher is added:

- user override may downgrade from `immersive` to `reduced3d` or `editorial`
- user override should not silently upgrade into unsupported modes

No launch dependency is placed on a manual override UI, but the contract should
allow one later.

## Failure Handling

### Failure During Immersive Init

- log failure
- fall back to `reduced3d` if viable
- otherwise fall back to `editorial`

### Failure During Reduced 3D Init

- log failure
- fall back to `editorial`

### Failure After Initial Load

If runtime instability is severe:

- prefer a controlled downgrade or safe reload path
- do not trap the user in a broken scene state

## Asset Implications

### For Meshy Assets

- every candidate asset needs:
  - Tier A target
  - Tier B simplification plan
  - Tier C representation strategy

### For Motion

- transitions must have reduced equivalents
- essential navigation cannot rely on long cinematic animations

## Runtime State Contract

The app should expose or internally maintain:

- `selectedMode`
- `modeReason`
- `initStatus`
- `fallbackReason` when downgrade occurs

This is valuable for:

- analytics
- QA
- debugging

## QA Expectations

This contract must eventually be testable through:

- forced mode simulation
- capability mocking
- failure-state testing

## Acceptance For NS-602

- The selection logic is explicit enough to implement consistently.
- Route parity is preserved across modes.
- Failure handling is clear enough to prevent ambiguous downgrade behavior.
