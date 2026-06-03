# Design Assets

This directory holds imported design-development assets that should stay in the
standalone repo but are not yet part of the live runtime by default.

## Contents

- `object-ideation/`
  - imported Meshy and image-to-3D source packs for the Newsense object family
  - useful as provenance and future prompt/reference material
- `../team-asset-map.json`
  - manual curation layer for team fallback portraits and candidate team GLBs

## Runtime Boundary

These files are source/reference material.

- Runtime-ready team images live in `public/content-media/team/`
- Runtime-ready team model candidates live in `public/models/team/`
- The builder reads `sources/team-asset-map.json` to preserve confirmed team
  asset links in generated content
