# NS-202 Import Pipeline Spec

Date: `2026-05-08`

## Purpose

Define the import path for the core Newsense studio information so the
implementation repo can normalize vault-owned source material into runtime
content without manual copy-paste drift.

This document is the operational follow-on to:

- `planning/content-schema-and-field-map.md`

## Scope

`NS-202` covers only the studio-side core import surfaces:

- `content/studio.json`
- `content/team.json`
- `content/services.json`
- `content/clients.json`

It does **not** cover project/archive import. That remains under:

- `NS-203`
- `NS-204`

## Upstream Inputs

From the vault archive:

- `old-website/data/brand-summary.json`
- `old-website/data/team.json`
- `old-website/data/services.json`
- `old-website/data/contact.json`
- `old-website/data/clients.json`
- `old-website/content/pages/about.md`
- `old-website/content/pages/home.md`
- `old-website/content/pages/contact.md`

## Output Targets

- `content/studio.json`
- `content/team.json`
- `content/services.json`
- `content/clients.json`

## Pipeline Stages

### Stage 1: Source Read

Responsibilities:

- load each upstream file
- validate JSON parseability where applicable
- record source file paths for provenance

Failure mode:

- hard fail if a required upstream source is missing

### Stage 2: Normalize Studio Record

Input sources:

- `brand-summary.json`
- `contact.json`
- `services.json`
- `clients.json`
- `home.md`

Derived fields:

- `id`: `studio-newsense`
- `slug`: `newsense`
- `name`
- `website`
- `positioning`
- `support_copy`
- `location_city`: `Bengaluru`
- `location_country`: `India`
- `contact`
- `services`
- `client_roster`
- `wordmark_asset`
- `source_refs`

Rules:

- `positioning` comes from the recovered homepage description.
- `support_copy` comes from the recovered homepage support line.
- `wordmark_asset` must point to the preserved legacy wordmark source, not a
  generated derivative.

### Stage 3: Normalize Team Records

Input sources:

- `team.json`
- `about.md`

Derived fields per member:

- `id`
- `slug`
- `name`
- `role`
- `bio_full`
- `bio_short`
- `specialties`
- `order`
- `portrait_asset`
- `source_refs`

Rules:

- `order` should preserve the recovered public presentation order:
  1. Amyth Venkataramaiah
  2. Sant Mote
  3. Suraj Singh Thakur
- `portrait_asset` may be `null` until a dedicated image set is chosen.
- `bio_short` must be a condensed editorial form, not a rewrite that changes
  meaning.

### Stage 4: Normalize Services

Input sources:

- `services.json`

Outputs:

- `studio_services`
- `project_service_tags`
- `source_refs`

Rules:

- `studio_services` must remain concise and public-facing.
- `project_service_tags` preserve source specificity for filtering and metadata.
- Service items should have normalized `slug` values but keep the source
  `label`.

### Stage 5: Normalize Client Proof

Input sources:

- `clients.json`
- `projects.json` later for reconciliation, but `NS-202` can seed the structure

Outputs:

- client objects with:
  - `id`
  - `slug`
  - `name`
  - `about_page_presence`
  - `project_slugs`
  - `proof_sources`
  - `notes`

Rules:

- `about_page_presence` is `true` for clients listed on the recovered About
  page.
- `project_slugs` may be empty in the first pass, then enriched during
  `NS-203`.
- naming normalization must preserve provenance when aliases exist

## Transform Rules

### Slugging

- lowercase
- hyphen-separated
- no silent renaming of brand names beyond slug format

### Source Refs

Every output record must carry:

- `source_file`
- `source_kind`
- optional `source_route`

### Warning Preservation

If a source ambiguity affects a studio-side record, preserve it in:

- `notes`
- or `source_refs`

Do not flatten or discard it.

## Output Write Order

1. `content/studio.json`
2. `content/team.json`
3. `content/services.json`
4. `content/clients.json`

Rationale:

- studio and team power the identity layers first
- services and clients then support IA and filtering decisions

## Runtime Assumptions This Enables

After `NS-202`, the repo should be able to assume:

- there is exactly one studio record
- team order is stable
- services are split between public-facing and project metadata use
- client proof can be rendered independently of project detail pages

## Deferred To Later Tasks

- project import and media wiring
- archive import
- featured-project ranking
- portrait selection
- contact form implementation

## Acceptance For NS-202

- The import path is detailed enough to implement without re-deciding data
  structure.
- Each output target has clear inputs, transforms, and failure rules.
- Studio-side data is separated cleanly from project/archive import work.
