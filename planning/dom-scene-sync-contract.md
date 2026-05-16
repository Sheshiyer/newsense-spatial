# NS-704 DOM And Scene Synchronization Contract

Date: `2026-05-08`

## Purpose

Define how routing, overlays, scene focus, and content state stay synchronized
between the 3D layer and the DOM layer.

This document is the practical follow-on to:

- `planning/interaction-model.md`
- `planning/runtime-mode-switch-contract.md`
- `planning/ia-route-model.md`

## Core Principle

There is one navigation truth model.

The scene visualizes it.

The DOM exposes it.

Neither layer is allowed to invent an incompatible second state machine.

## Required Shared State

Minimum app-level state should include:

- `route`
- `selectedMode`
- `sceneState`
- `focusedObjectId`
- `openOverlay`
- `selectedProjectSlug`
- `selectedArchiveSlug`
- `filterState`
- `fallbackReason`

## Route As Source Of Truth

Route owns:

- top-level page identity
- project slug
- archive slug

Scene owns:

- camera choreography
- focus animation
- atmosphere response

DOM owns:

- readable content modules
- CTA surfaces
- fallback layouts

## Object-To-Route Synchronization

When a scene object is opened:

1. scene moves into `focus` or `open`
2. route updates
3. DOM content for that route becomes authoritative

When a direct route is opened:

1. route is already authoritative
2. scene resolves matching object state if available
3. DOM renders regardless of scene readiness

## Overlay Contract

Overlays may be scene-triggered or DOM-triggered, but they must be represented
through shared state.

Allowed overlay state examples:

- `credits`
- `quick-facts`
- `services`
- `lightbox`

Rule:

- closing an overlay must not mutate the underlying route unexpectedly

## Atlas Filter Contract

Filter state is subordinate to route state.

That means:

- route remains `/projects`
- filter state may sync to query params later
- scene and DOM both read the same active filter

## Fallback Contract

If scene initialization fails or mode downgrades:

- DOM content must remain fully functional
- route state persists
- overlays degrade to DOM-native surfaces where relevant
- scene-only focus affordances may disappear without breaking navigation

## Loading Contract

DOM must not wait for full scene readiness to render core route content.

Preferred order:

1. route resolves
2. shell content becomes available
3. scene layer attaches or downgrades as capability allows

## Back/Forward Behavior

Browser history must follow route changes, not scene events alone.

That means:

- selecting a project creates route history
- returning from a case study restores atlas context where possible
- overlays alone should not create noisy history entries unless explicitly
  designed to

## Analytics And Debugging Surface

Useful sync events to expose later:

- route entered
- object focused
- overlay opened
- fallback triggered
- scene attach success or failure

## Acceptance For NS-704

- Route remains the authoritative navigation surface.
- Scene and DOM consume the same shared state vocabulary.
- Fallback mode preserves navigation integrity even when scene behavior drops
  away.
