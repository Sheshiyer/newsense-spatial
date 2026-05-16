# NS-903 Homepage Atmosphere And Motion

Date: `2026-05-08`

## Purpose

Freeze the atmospheric and motion behavior of the Newsense homepage so the
scene shell has a coherent mood before implementation begins.

This document is the practical follow-on to:

- `planning/homepage-thesis-and-dramaturgy.md`
- `planning/wordmark-monolith-spec.md`

## Atmospheric Thesis

The homepage should feel like:

- dusk or controlled low-light
- still air
- premium architectural silence
- soft heat in material edges

It should not feel like:

- sci-fi spectacle
- fog-heavy fantasy ruin
- hyperactive motion-demo environment

## Horizon Treatment

### Core Rule

Use a **low horizon** with restrained gradient separation between ground and
sky volume.

### Sky Direction

- near-black to warm charcoal
- subtle neutral bloom near horizon
- no saturated sunset theatrics

### Ground Direction

- matte reflective floor or dense stone plane
- enough reflection to ground the object
- not a mirror-showcase surface

## Light Behavior

Primary lighting:

- diffused frontal or lateral fill
- soft edge reveal on stone and bronze planes
- controlled depth shadow in recesses

Accent lighting:

- mild warm lift on bronze
- slight glow in glass edges if needed

Disallowed:

- hard nightclub lighting
- colorful rim-light gimmicks
- flashing or pulsing highlights

## Motion Mood

The homepage motion language is:

- slow
- weighted
- confident
- sparse

### Allowed Motion

- subtle camera drift
- slow dolly
- gentle atmospheric parallax
- material reveal through light angle

### Not Allowed

- constant orbiting
- idle spin of the main object
- floating particle storms
- rapid cinematic cuts

## Temporal Rhythm

### Arrival

- immediate stable frame
- no long logo pre-roll

### Idle

- nearly still
- micro movement only

### Intent Transition

- one clear motion response to input
- no stacked flourish animation

### Return

- graceful settle back to stage posture

## Color Mood

Core palette:

- near-black
- charcoal
- pale mineral
- oxidized bronze
- smoked neutral

Allowed accent behavior:

- extremely subtle warm highlight

Not allowed:

- bright accent color as homepage identity
- neon edge language

## Runtime Variants

### `immersive`

- full atmospheric gradient
- subtle shadow depth
- soft reflective floor
- high-fidelity material response

### `reduced3d`

- flatter background gradient
- lower reflection intensity
- fewer shadow nuances
- same overall mood

### `editorial`

- static hero render or still
- preserve low horizon and dark-to-warm tonal structure
- no dependency on live scene motion for the mood to read

## Relationship To Copy

Atmosphere should support copy, not compete with it.

The left-side thesis area must remain legible without adding heavy glass cards
or noisy overlays.

## Acceptance For NS-903

- The homepage atmosphere is decisively restrained and architectural.
- Motion is sparse and weighted rather than demo-like.
- Horizon, light, and color behavior survive across all runtime tiers.
