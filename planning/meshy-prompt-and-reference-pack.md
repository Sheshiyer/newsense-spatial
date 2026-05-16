# NS-305 / NS-1803 To NS-1808 Meshy Prompt And Reference Pack

Date: `2026-05-08`

## Purpose

Define the first reusable Meshy pack for Newsense so object generation starts
from studio-owned architectural language instead of mixed client imagery or
generic sci-fi props.

This document is the practical follow-on to:

- `planning/wordmark-rules.md`
- `planning/wordmark-monolith-spec.md`
- `planning/project-atlas-object-and-fallback-spec.md`
- `planning/runtime-mode-switch-contract.md`

## Core Rule

Meshy supports the **surrounding object system**, not the Newsense wordmark
itself.

Allowed:

- support geometry
- atlas nodes
- scene accessories
- plinths
- rings
- framed slabs

Not allowed:

- regenerating the `newsense` logo
- inventing a replacement icon mark
- building client-specific hero props as the core studio identity

## Source Pack Boundary

Use only Newsense-owned or Newsense-normalized sources:

- `/Volumes/madara/2026/twc-vault/01-Projects/thoughtseed/thoughtseed-labs/60-client-ecosystem/newsense/brand-relaunch/gpt-image-2-strict-two-image-2026-05-08/outputs/01-stage-concept-board.png`
- `/Volumes/madara/2026/twc-vault/01-Projects/thoughtseed/thoughtseed-labs/60-client-ecosystem/newsense/brand-relaunch/gpt-image-2-strict-two-image-2026-05-08/outputs/02-project-atlas-concept-board.png`
- `/Volumes/madara/2026/twc-vault/01-Projects/thoughtseed/thoughtseed-labs/60-client-ecosystem/newsense/brand-relaunch/gpt-image-2-run-2026-05-08/outputs/03-asset-moodboard.png`
- `planning/wordmark-monolith-spec.md`
- `planning/project-atlas-object-and-fallback-spec.md`

Do not seed Meshy from:

- motorcycle imagery
- rider imagery
- literal OnePlus / AGM / Royal Enfield ads
- collage screenshots from the earlier loose pass

## Target Asset Families

### Family A: Stage Support Objects

Use for:

- plinth blocks
- bronze side masses
- smoked-glass threshold pieces
- frame walls
- low accessory planes

These surround the monolith without replacing it.

### Family B: Atlas Node Objects

Use for:

- motion discs
- campaign rings
- stacked campaign slabs
- editorial frames
- archive blocks

These become reusable node classes inside `/projects`.

### Family C: Utility Scene Objects

Use for:

- route markers
- filter totems
- pedestal variants
- low ambient sculptural pieces

These must remain subordinate to content navigation.

## Visual Vocabulary

Primary adjectives:

- architectural
- restrained
- editorial
- monolithic
- sculptural
- matte
- oxidized
- smoked
- mineral
- premium

Primary materials:

- pale stone
- near-black matte metal
- oxidized bronze
- smoked glass
- dark paper fiber

Disallowed vocabulary:

- cyberpunk
- spaceship
- astronaut
- weapon
- fantasy relic
- hyper-luxury chrome
- glossy toy

## Runtime Budget Tiers

Every generated candidate needs three representations.

### Tier A: `immersive`

- target use: primary 3D mode
- triangle target:
  - support objects: `20k` to `60k`
  - featured atlas nodes: `10k` to `40k`
- textures:
  - hero: up to `2k`
  - support: `1k` to `2k`

### Tier B: `reduced3d`

- simplified or decimated mesh
- triangle target:
  - `5k` to `20k`
- textures:
  - `1k` max preferred

### Tier C: `editorial`

- no mesh required for runtime
- rendered still, SVG-like silhouette, or DOM card equivalent is acceptable

## Meshy Track Allocation

### `NS-1805` Text-To-3D

Best for:

- abstract support objects
- rings
- plinths
- framed blocks

### `NS-1806` Image-To-3D

Best for:

- objects derived from cropped concept-board details
- selected atlas node candidates

### `NS-1807` Multi-Image-To-3D

Best for:

- approved objects after multi-view reference sheets exist
- consistency recovery after a promising first generation

### `NS-1808` Retexture And Remesh

Best for:

- standardizing material language
- bringing disparate candidates into the same Newsense family
- optimizing approved meshes for runtime

## Prompt Templates

### Prompt A: Stage Support Block

```text
Create an abstract architectural support object for a premium independent design and film studio website.

The object should feel calm, monolithic, editorial, and materially rich.
Use pale mineral stone, near-black matte structure, oxidized bronze accents, and smoked glass details.

This is not a logo object, not a sculpture mascot, and not a product prop.
It should function as a supporting scene object near a preserved text wordmark.

Avoid people, vehicles, creatures, weapons, fantasy relics, chrome sci-fi styling, or decorative ruins.

Deliver a clean, structurally plausible 3D object with readable silhouette and premium surface separation.
```

### Prompt B: Motion Node

```text
Create an abstract case-study node object for the motion category of a scene-first portfolio atlas.

The object should suggest movement and duration through discs, cylinders, or rounded massing, but stay minimal and architectural.
Use dark matte structure with restrained bronze or stone contrast.

This is not a product render and not a poster. It is a reusable navigation object for a premium editorial website.
```

### Prompt C: Campaign-System Node

```text
Create an abstract campaign-system atlas object using rings, slabs, stacked panels, or lamellae.

The object should express modularity, system thinking, and scalable rollout. Keep it restrained, premium, and materially coherent with pale stone, oxidized bronze, and matte black.

Do not include text, logos, people, ads, or literal campaign posters.
```

### Prompt D: Editorial-Stills Node

```text
Create a quiet framed atlas object for an editorial-stills category in a premium studio website.

The object should feel like a minimal image-bearing plane or framed light box with architectural dignity, not a gadget screen.
Use shallow depth, subtle material contrast, and clean silhouette.
```

## Reference Pack Build Guidance

For image-based Meshy tasks, crop the concept boards into:

- material swatch details
- isolated object silhouettes
- single-node family references

Do not upload the entire board when only one object family is needed.

## Output Handling Contract

Recommended future output root:

- `public/assets/meshy/source/`
- `public/assets/meshy/generated/`
- `public/assets/meshy/approved/`

Recommended metadata per asset:

- `asset_id`
- `family`
- `track`
- `prompt_version`
- `source_refs`
- `tier_a_status`
- `tier_b_status`
- `tier_c_strategy`
- `license_or_origin_notes`

## Credential And API Handling

`MESHY_API_KEY` stays in local environment configuration only.

Rules:

- do not commit the key
- log task IDs and outputs, not secrets
- store generation metadata alongside outputs

This document defines the content contract first. The exact invocation surface
belongs to `NS-1804`.

## Acceptance For NS-305 / NS-1803 To NS-1808

- Meshy work now has a bounded Newsense-first reference pack.
- Prompting is anchored to abstract architectural object language.
- Each asset family has a clear generation track and runtime-tier expectation.
- The pack prevents the project from drifting back into mixed client imagery or
  logo distortion.
