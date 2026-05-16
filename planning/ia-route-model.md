# NS-401 IA Route Model

Date: `2026-05-08`

## Purpose

Freeze the route map, view model, and deep-link behavior for the Newsense site
before implementation starts.

## Primary IA Decision

`Projects` is the dominant spatial surface.

`Studio`, `Team`, and `Contact` are fully supported but lighter-weight than the
work-discovery system.

`Archive` is preserved but suppressed from the main hero path.

## Top-Level Routes

- `/`
- `/projects`
- `/projects/:slug`
- `/studio`
- `/team`
- `/contact`
- `/archive`
- `/archive/:slug`

Optional later routes:

- `/lab`
- `/credits`

`/lab` is where any astronaut cameo or experimental worldbuilding should live if
it survives later planning. It should not be part of launch-critical navigation.

## View Model

### `Stage View`

Route:

- `/`

Role:

- primary homepage
- houses wordmark anchor
- opens into the project atlas and supporting objects

### `Project Atlas View`

Route:

- `/projects`

Role:

- main discovery view
- grouped browsing by case-study type, client, service, or featured state

### `Case Study View`

Route:

- `/projects/:slug`

Role:

- deep editorial view for live projects
- supports motion, campaign/system, and editorial case-study variants

### `Studio View`

Route:

- `/studio`

Role:

- positioning
- manifesto
- services
- method

### `Team View`

Route:

- `/team`

Role:

- dedicated addressable surface for the core team
- may remain visually coupled to Studio in immersive mode

### `Contact View`

Route:

- `/contact`

Role:

- direct CTA and inquiry surface
- must remain reachable from any mode

### `Archive View`

Route:

- `/archive`
- `/archive/:slug`

Role:

- preserved historical or placeholder routes
- provenance-aware

## Object-To-View Map

| Object | Primary route | Opens |
| --- | --- | --- |
| `Wordmark Monolith` | `/` | `Stage View` |
| `Atlas Ring` | `/projects` | `Project Atlas View` |
| `Method Tower` | `/studio` | `Studio View` |
| `Portrait Prism` | `/team` | `Team View` |
| `Signal Beacon` | `/contact` | `Contact View` |
| `Shadow Shelf` | `/archive` | `Archive View` |

## Overlay Rules

### Overlays Allowed

- credits drawer
- services taxonomy
- client proof
- quick facts
- media lightbox
- contact sheet

### Overlays Not Allowed To Replace Routes

- full case studies
- full studio story
- primary archive landing

Rule:

- overlays can enrich a route
- overlays cannot become the only way to access core information

## Deep-Link Behavior

### Stable Deep Links

- every top-level route
- every project slug
- every archive slug

### Optional State Deep Links

Allowed as query params or hash later if useful:

- selected panel
- credits open state
- filter state
- lightbox media index

Rule:

- core navigation must work without ephemeral UI state in the URL

## Fallback Parity Rules

This IA depends materially on the support matrix in `support-matrix.md`.

Required parity across immersive, reduced-3D, and editorial modes:

- `/`
- `/projects`
- `/projects/:slug`
- `/studio`
- `/team`
- `/contact`
- `/archive`

No mode is allowed to hide:

- project content
- team bios
- contact info
- archive provenance

## Launch Project Routing

### Live / Featured

All real project routes resolve under:

- `/projects/:slug`

### Archive

Archive-first routes resolve under:

- `/archive/:slug`

Archive launch set:

- `alpha-source`
- `arte-artifacts`
- `cider-and-milk`
- `seasalt`
- `tune-speaker`
- `vito-coffee`

## Structural Decisions Locked Here

- No astronaut-led main route.
- No game-style traversal route.
- No hidden content accessible only in the 3D layer.
- No featured placeholder routes in the main atlas.

## Acceptance For NS-401

- The route map is stable enough to guide UI and content implementation.
- The object map aligns with route structure.
- Fallback parity is explicit enough to constrain later scene decisions.
