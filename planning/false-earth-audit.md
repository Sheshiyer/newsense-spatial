# NS-501 False Earth Audit

Date: `2026-05-08`

## Purpose

Audit `momentchan/false-earth` as a Newsense reference base and decide what is
reusable, what is risky, and what should be rejected.

## Source

Reference repo:

- `https://github.com/momentchan/false-earth`

Local temporary audit copy used earlier:

- `/tmp/false-earth`

## Core Finding

`false-earth` is a strong spatial reference and a weak direct website starter.

It should be treated as a scene-shell donor or reference system, not as the
literal production foundation for Newsense.

## What Is Reusable

### Scene-Shell Patterns

- React Three Fiber application shell
- scene/UI separation
- loading-state gating
- performance monitor and adaptive DPR patterns
- camera/state orchestration concepts
- ambient scene layering

### Useful Aesthetic Behaviors

- quiet, high-fidelity atmosphere
- long-form camera mood
- cinematic environmental staging

### Possible Asset Reuse Candidates

- only after audit and optimization:
  - selected lighting logic
  - post-processing ideas
  - maybe a base mesh or silhouette reference

## What Is Not Reusable As-Is

### Gameplay Premise

- astronaut as primary guide
- movement/traversal logic
- joystick and first-person / third-person camera assumptions
- game-world onboarding posture

### World Logic

- terrain narrative
- procedural grass emphasis
- cosmic-beam storytelling
- demo-like spectacle as the main content carrier

### Delivery Model

- WebGPU as mandatory core path
- full compute-heavy world as baseline experience

## Technical Risks

### Missing Shared Package / Submodule Risk

The upstream clone depends on a missing shared package path and should not be
assumed to build as a turnkey starter.

Planning implication:

- do not anchor implementation milestones to a blind fork
- use a transplant-or-rebuild posture until the dependency story is resolved

### Content-System Gap

`false-earth` is not a mature content site.

Missing or weak as a direct fit:

- content model
- case-study templates
- SEO surface
- fallback route parity
- editorial information architecture

### Performance Risk

The reference scene is too heavy to be treated as launch-default website UX.

Planning implication:

- heavy world systems must be optional or removed
- capability tiers must be explicit

## Recommended Adoption Posture

### Keep

- scene shell patterns
- selected performance and load-control ideas
- cinematic pacing
- object focus logic as a replacement for traversal

### Reject

- astronaut-first narrative
- traversal as primary navigation
- terrain/grass spectacle as homepage identity
- autoplay demo logic

### Defer

- any astronaut customization
- any reference-asset salvage beyond concept stage

## Recommended Strategy

Use `false-earth` in this order:

1. audit it
2. isolate reusable shell patterns
3. define a clean Newsense-owned object/navigation system
4. only then decide what code or assets are worth transplanting

Do not:

1. fork the whole repo
2. rename it
3. start stuffing Newsense content into the demo structure

## Relationship To Current Plan

This audit supports:

- `NS-601`
- `NS-701`
- `NS-901`
- `NS-1001`
- Meshy object planning under `NS-1804` to `NS-1810`

It also reinforces the current directional decision:

- branded Newsense-owned objects are the main navigation language
- any astronaut path remains optional and non-blocking

## Acceptance For NS-501

- The repo is correctly framed as a reference/donor, not a turnkey base.
- Reusable, rejectable, and deferrable parts are separated clearly enough to
  prevent implementation drift.
