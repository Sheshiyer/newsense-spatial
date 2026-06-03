# Newsense Design System

This file is the local design contract for the standalone `newsense-launch`
repo. It translates the Newsense brand material from
`60-client-ecosystem/newsense/wiki-output/` into concrete UI rules for the
website implementation.

## Brand Foundation

- Positioning:
  Newsense is the studio where restraint becomes strategic advantage, delivering
  design and film systems that make brands unmistakable without visual noise.
- Archetype:
  `The Architect`
- Voice:
  quiet editorial authority
- Core behavioral traits:
  composed, disciplined, craft-forward, low-ego

## Visual System

- Primary:
  Carbon Black `#1A1A1A`
- Secondary:
  Stone Grey `#7A8282`
- Accent:
  Patina Bronze `#A98B59`
- Support:
  Warm Linen `#E2D5BE`
- Signal:
  Living Green `#99A078`

## Typography

- Header font:
  `Forum`
- Body font intent:
  `Circular Std` tone, approximated with refined sans fallbacks in code
- Data / utility font intent:
  `DIN Next` tone, approximated with condensed/mono utility stacks in code

## Material Direction

- Surfaces should feel like charcoal plaster, raw stone aggregate, warm grey
  concrete, handmade paper, and brushed / aged bronze.
- Negative space is part of the brand. Do not overcrowd cards or detail pages.
- No digital-gloss aesthetic, no neon, no loud gradients, no stock-pose energy.

## Reusable UI Families

### Route Heroes

- `StoryHero`
  Use for document-like routes and detail states where the argument is mostly
  verbal and metric-led.
- `ExpansionTypography`
  Use when the route needs a more cinematic, authored statement. This is the
  default choice for top-level brand-facing routes.

### Brand Showcase

- `BrandShowcaseCard`
  The core reusable work card.
- Supported variants:
  - `feature`
  - `standard`
  - `archive`
- Every card must communicate:
  - project type
  - client / service context
  - one strong headline
  - one restrained supporting summary

### Brand Detail Page

- The case-study system is a reusable page grammar, not a one-off route:
  - hero
  - facts strip
  - sticky rail
  - image gallery
  - narrative chapter cards
  - credits grid
  - provenance / warning note

### Team Identity

- `TeamStageCard`
  Represents a person as both portrait and object.
- If both portrait and `scene_asset` exist:
  start with portrait and allow object reveal.
- If only `scene_asset` exists:
  default to the object stage.

## Copy Rules

- Never let an H1 describe layout mechanics.
- Prefer brand-facing statements over internal system explanation.
- Use concise rhythm and material language:
  light, surface, grain, frame, atmosphere, precision, continuity.
- Avoid hype, urgency, inflated claims, and startup cliches.

## Implementation Notes

- The `false-earth` world remains the base layer.
- Reading surfaces should use dark glass and blur rather than lowering global
  overlay opacity.
- Reuse component families before creating new bespoke route markup.
- New visual passes should be checked at minimum on:
  - `1024`
  - `1440`
  - `1920`
