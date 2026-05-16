# NS-703 Interaction Model

Date: `2026-05-08`

## Purpose

Define how users interact with the Newsense scene shell across mouse, touch,
keyboard, and direct-link entry without drifting into game UX.

This document is the practical follow-on to:

- `planning/homepage-thesis-and-dramaturgy.md`
- `planning/project-atlas-object-and-fallback-spec.md`
- `planning/runtime-mode-switch-contract.md`

## Core Principle

The site is **scene-first but not game-like**.

Interaction should feel:

- precise
- editorial
- intentional

Not:

- exploratory sandbox
- FPS-like
- mechanically playful for its own sake

## Shared State Vocabulary

Primary scene states:

- `idle`
- `focus`
- `open`
- `return`

Input methods may differ, but they must resolve into the same state model.

## Mouse And Trackpad

### Allowed

- hover to indicate focusability
- click or tap-equivalent to enter focus/open states
- gentle wheel/scroll where a route explicitly supports it

### Not Allowed

- drag-to-orbit as the main default interaction
- camera steering by pointer position
- hidden gestures required for core navigation

## Touch

### Allowed

- tap to focus
- tap again or explicit CTA to open route
- vertical scroll on DOM content surfaces

### Not Allowed

- precision drag requirements for essential navigation
- long-press dependency for core actions
- pinch as a required route operation

## Keyboard

Required baseline:

- tab through interactive elements
- enter/space activates current focused CTA/object
- escape closes overlays or returns from transient open states where relevant

Arrow-key support may be added later for atlas traversal, but it is not a
launch requirement if tab order is strong and routes remain reachable.

## Direct Links

Direct-link entry must work for:

- `/`
- `/projects`
- `/projects/:slug`
- `/studio`
- `/team`
- `/contact`
- `/archive`
- `/archive/:slug`

The scene must not require a homepage-first boot path to become usable.

## Homepage Interaction

### Idle

- monolith visible
- primary CTA visible

### Focus

- hover or equivalent cue can acknowledge the object
- focus should remain subtle

### Open

- primary route actions resolve to scene transition plus route change

## Atlas Interaction

### Node Focus

- one node at a time gains focus
- labels or metadata clarify the selected work

### Node Open

- selecting a node opens `/projects/:slug`

### Archive Access

- archive shelf behaves like a quieter parallel system
- it should still be addressable with the same interaction grammar

## Overlay Interaction

Overlays are secondary enrichments:

- credits
- quick facts
- services taxonomy
- lightbox

They must:

- be dismissible
- not trap the user
- not replace core route access

## Reduced-3D And Editorial Behavior

The interaction grammar should degrade, not reinvent itself.

That means:

- same route actions
- same CTA hierarchy
- fewer scene-specific focus states if necessary

## Acceptance For NS-703

- Core navigation works across mouse, touch, keyboard, and direct links.
- Interaction stays scene-first without becoming game-like.
- Input differences still resolve into the same state vocabulary.
