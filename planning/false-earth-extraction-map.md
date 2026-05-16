# NS-502 False Earth Extraction Map

Date: `2026-05-08`

## Purpose

Identify which `false-earth` modules are reusable donors, which are reference
only, and which should be rejected for the Newsense implementation.

This document is the practical extraction follow-on to:

- `planning/false-earth-audit.md`

## Dependency Context

Important upstream constraint:

- `tsconfig.json` and `.gitmodules` reference `packages/three-core`
- that shared package is not available in a turnkey way from the reference clone

Implication:

- do not port blindly
- treat file-level extraction as selective, not wholesale

## Extraction Categories

### Category A: Donor Pattern

Use as an implementation pattern or architectural donor.

### Category B: Reference Only

Study for ideas, but do not port directly.

### Category C: Reject

Do not bring this into the Newsense production experience.

## File-Level Map

| File / Area | Category | Reason |
| --- | --- | --- |
| `src/app/App.tsx` | `A` | Useful for canvas bootstrapping, async renderer init, and scene/UI separation, but must be simplified away from game assumptions. |
| `src/index.jsx` | `A` | Minimal app entry structure; safe as a reference pattern. |
| `vite.config.js` | `A` | Useful as reference for React/Vite/GLSL/HTTPS setup, though not necessarily final config. |
| `src/core/store/gameStore.ts` | `A` | Useful as a store-shape reference for mode, readiness, and top-level scene state, but camera/game fields must be replaced. |
| `src/ui/LoadingScreen.tsx` | `B` | Strong loading-state rhythm, but the copy and interaction model are game/demo-specific and should not be ported directly. |
| `src/ui/UI.tsx` | `B` | The scene-overlay separation is useful; the actual controls and hierarchy are not. |
| `src/ui/SideBar.tsx` | `C` | Current control meanings are tied to camera cycling and quality toggles in a demo posture. |
| `src/components/WorldController.tsx` | `B` | Useful as a map of world subsystems and compile readiness, but almost every content object inside it is wrong for Newsense. |
| `src/components/camera/*` | `B` | Camera rig ideas may be useful, but first-person and follow-character assumptions are not. |
| `src/components/character/*` | `C` | Reject for launch-critical site UX. Character logic conflicts with object-first navigation. |
| `src/components/grass/*` | `C` | Grass compute stack is too specific and too heavy for Newsense’s core identity. |
| `src/components/Rose/*` | `B` | Study for asset-field population and render patterns only; not for direct inclusion. |
| `src/components/cosmic/*` | `C` | Too tied to the original world premise and likely to feel ornamental rather than purposeful. |
| `src/components/Effects/*` | `A` | Post-processing approach may be partially reusable if performance budgets allow. |
| `src/components/Terrain.tsx` | `C` | Terrain premise is not a structural fit for Newsense. |
| `src/components/background/*` | `B` | Atmosphere and sky treatment may inspire mood direction, but not direct reuse. |
| `packages/three-core` path dependency | `C` as direct dependency | Must be replaced, vendored deliberately, or avoided entirely. |

## Recommended Extraction Order

1. Extract architectural lessons from `App.tsx`, store shape, and load gating.
2. Rebuild a Newsense-native scene shell around object focus and route parity.
3. Introduce only the minimum post-processing or renderer ideas that survive the
   support matrix.
4. Keep all game-specific or world-specific systems out of the first build.

## What To Preserve Conceptually

- async readiness gating
- performance posture
- clean separation between render world and overlay/UI
- strong opening atmosphere

## What To Replace Immediately

- character-centric navigation
- gameplay camera model
- world-specific loading language
- top-right tool-demo sidebar
- game-style instruction system

## What To Defer

- any astronaut-derived reuse
- any experimental object behavior that has no clear route or content value
- any heavy post-processing that breaks Tier B or Tier C assumptions

## Relationship To Next Tasks

This extraction map should directly inform:

- `NS-503`
- `NS-602`
- `NS-701`
- `NS-901`
- `NS-1001`

## Acceptance For NS-502

- There is a file-level donor/reference/reject map.
- The implementation team can now avoid accidentally porting the demo structure
  into the website.
