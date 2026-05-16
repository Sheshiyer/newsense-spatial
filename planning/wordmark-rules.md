# NS-302 Wordmark Rules

Date: `2026-05-08`

## Purpose

Freeze the non-negotiable rules around the preserved Newsense wordmark before
any scene, UI, Meshy, or image-generation work moves further.

## Canonical Asset

Current canonical source:

- `/Volumes/madara/2026/twc-vault/01-Projects/thoughtseed/thoughtseed-labs/60-client-ecosystem/newsense/old-website/assets/images/bf852dca99-dd4e19_cedf7c7c65604fe4b55695791e9f634c-mv2.png`

This is the only accepted upstream source for the current preserved wordmark.

## Core Rule

Preserve the existing `newsense` text-based logo exactly.

That means:

- no redraw
- no tracing
- no font swap
- no letterform reinterpretation
- no kerning redesign
- no capitalization change
- no replacing it with a generated approximation

## Allowed Usage

### Allowed

- scale proportionally
- place on neutral or restrained backgrounds
- render in compositions that preserve legibility
- use as the homepage anchor object conceptually
- mask-protect it during image-generation workflows

### Allowed With Care

- inverse presentation on dark backgrounds
- subtle emboss, foil, print, or material simulations if the wordmark itself is
  not deformed
- 2D placement inside 3D scenes as signage or anchored interface text

### Not Allowed

- warping the wordmark onto curved geometry
- extruding it into unreadable sculptural forms
- fragmenting letters across motion transitions
- turning it into an icon mark
- blending it into busy client imagery
- having AI regenerate it from prompt alone

## Layout Rules

### Clear Space

Use a minimum clear space of `0.5x`, where `x` is the rendered wordmark height.

Rule:

- no other typography or object edges should intrude into that zone

### Minimum Size

Until the final responsive system is tested:

- desktop minimum width: `160px`
- mobile minimum width: `120px`

Below that threshold, use a simplified layout before shrinking the mark further.

### Placement

Preferred use:

- calm anchor placement
- strong margins
- no crowding at the viewport edge

Avoid:

- center-stacking with heavy copy blocks
- tiny token-like placement when the mark is expected to carry orientation

## Color Rules

Primary behavior:

- preserve the mark in its original black-on-light form when possible

Secondary behavior:

- use a single high-contrast inverse treatment when necessary

Not allowed:

- gradient fills
- texture fills inside the letterforms
- multicolor stylization
- glows that reduce legibility

## Image Generation Rules

Any future FAL or image-generation workflow must:

- use the canonical asset as an input
- use preserve-mask logic when the mark appears in generated outputs
- explicitly instruct the model not to respell, redraw, or redesign the mark

If a generation run distorts the mark:

- discard the output for logo-reference purposes
- do not manually “accept” the drift because the rest of the image looks good

## 3D Scene Rules

If the wordmark appears in the immersive scene:

- it should behave as a stable anchor, not a novelty object
- readability beats spectacle
- the 3D environment should frame it, not consume it

Good uses:

- anchored monolith face
- signage plane
- framed UI title element

Bad uses:

- character wearable logo as the main public mark
- floating scattered glyphs
- exploded logo particles

## Relationship To Meshy

Meshy may support surrounding objects, but not the wordmark itself.

Rule:

- use Meshy to generate branded objects around the identity
- do not use Meshy to regenerate or reinterpret the identity mark

## Acceptance For NS-302

- The canonical wordmark source is frozen.
- The allowed vs forbidden transformations are explicit.
- Future image and 3D work has a clear rule set to prevent logo drift.
