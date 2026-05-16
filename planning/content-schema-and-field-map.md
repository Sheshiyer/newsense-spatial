# NS-201 Content Schema And Field Map

Date: `2026-05-08`

## Purpose

Define the normalized runtime content model for the Newsense website and map it
back to the recovered legacy archive.

This file is the contract for:

- `content/studio.json`
- `content/team.json`
- `content/services.json`
- `content/clients.json`
- `content/projects/*.json`
- `content/archive/*.json`
- `content/media-manifest.json`

## Source Inputs

- Vault archive root:
  - `/Volumes/madara/2026/twc-vault/01-Projects/thoughtseed/thoughtseed-labs/60-client-ecosystem/newsense/old-website/`
- Primary structured inputs:
  - `data/brand-summary.json`
  - `data/team.json`
  - `data/services.json`
  - `data/contact.json`
  - `data/clients.json`
  - `data/projects.json`
  - `content/pages/*.md`

## Global Rules

- The vault remains the source of truth.
- Runtime content in this repo is a normalized import, not a hand-maintained
  second source of truth.
- Every imported record must retain provenance:
  - source file path
  - source route or source page id where applicable
  - warning state when ambiguity exists
- Archive items are preserved but must not be promoted into featured work by
  default.

## File-Level Model

### `content/studio.json`

One object.

Required fields:

- `id`
- `slug`
- `name`
- `wordmark_asset`
- `website`
- `positioning`
- `support_copy`
- `location_city`
- `location_country`
- `contact`
- `services`
- `client_roster`
- `brand_tokens`
- `source_refs`

Notes:

- `positioning` should map from the recovered homepage description.
- `support_copy` should map from the homepage supporting copy.
- `wordmark_asset` should point to the preserved wordmark asset, not a generated
  substitute.

### `content/team.json`

Array of team member objects.

Required fields per member:

- `id`
- `slug`
- `name`
- `role`
- `bio_full`
- `bio_short`
- `order`
- `portrait_asset`
- `specialties`
- `source_refs`

Notes:

- `bio_short` is an editorial condensation for navigation overlays.
- `bio_full` preserves the recovered source copy.
- `portrait_asset` can be `null` until a final image direction is chosen.

### `content/services.json`

One object with two arrays.

Required fields:

- `studio_services`
- `project_service_tags`
- `source_refs`

Required fields per service item:

- `id`
- `slug`
- `label`
- `kind`

Rules:

- `kind` is one of:
  - `studio`
  - `project-tag`
- Studio services remain concise and public-facing.
- Project service tags preserve source variety for filtering and case-study
  metadata.

### `content/clients.json`

Array of client objects.

Required fields per client:

- `id`
- `slug`
- `name`
- `proof_sources`
- `project_slugs`
- `about_page_presence`
- `notes`

Rules:

- Client names should be normalized once here and referenced from projects.
- Known naming mismatches should be preserved in `notes`, not silently erased.

### `content/projects/*.json`

One file per live project.

Required fields:

- `id`
- `slug`
- `route`
- `title`
- `status`
- `case_study_type`
- `page_kind`
- `hero_heading`
- `hero_summary`
- `primary_client`
- `clients`
- `primary_service`
- `services`
- `year`
- `featured_rank`
- `gallery_mode`
- `credits`
- `narrative_sections`
- `outcome_sections`
- `media`
- `source_warnings`
- `source_refs`

Rules:

- `status` is one of:
  - `featured`
  - `live`
  - `archive`
- `case_study_type` is one of:
  - `motion`
  - `campaign-system`
  - `editorial-stills`
  - `archive-fragment`
- `gallery_mode` is one of:
  - `video-first`
  - `story-first`
  - `stills-first`
- `media` should reference entries in `content/media-manifest.json`, not inline
  raw source URLs.

### `content/archive/*.json`

One file per placeholder or archive-first route.

Required fields:

- `id`
- `slug`
- `route`
- `title`
- `archive_reason`
- `placeholder`
- `hero_heading`
- `clean_text`
- `media`
- `source_warnings`
- `source_refs`

Rules:

- These records preserve historical material but should never appear in the main
  featured project atlas by default.

### `content/media-manifest.json`

One object containing normalized asset records.

Required top-level fields:

- `images`
- `videos`
- `missing_assets`
- `source_warnings`

Required fields per asset:

- `id`
- `kind`
- `local_path`
- `source_url`
- `owner_record_type`
- `owner_record_slug`
- `purpose`
- `status`

Rules:

- `kind` is one of:
  - `image`
  - `video`
  - `poster`
  - `texture-candidate`
- `status` is one of:
  - `available-local`
  - `source-only`
  - `blocked`
  - `needs-replacement`

## Field Mapping

### Studio

| Runtime field | Source |
| --- | --- |
| `name` | `brand-summary.json.name` |
| `website` | `brand-summary.json.website` |
| `positioning` | `brand-summary.json.description` |
| `support_copy` | `content/pages/home.md` homepage support copy |
| `contact` | `brand-summary.json.contact` plus `contact.json` |
| `services` | `services.json.studio_services` |
| `client_roster` | `clients.json.about_page_clients` |
| `brand_tokens` | `brand-summary.json.theme_tokens` plus brand-run outputs |

### Team

| Runtime field | Source |
| --- | --- |
| `name` | `team.json[*].name` |
| `bio_full` | `team.json[*].bio` |
| `role` | parsed from leading role phrase in bio or `about.md` headings |
| `specialties` | derived from recovered bios |

### Projects

| Runtime field | Source |
| --- | --- |
| `slug` | `projects.json[*].slug` |
| `route` | `projects.json[*].url` path segment |
| `title` | `projects.json[*].title` |
| `hero_heading` | `projects.json[*].hero_heading` |
| `hero_summary` | `projects.json[*].hero_summary` |
| `primary_client` | `projects.json[*].primary_client` |
| `clients` | `projects.json[*].clients` |
| `primary_service` | `projects.json[*].primary_service` |
| `services` | `projects.json[*].services` |
| `credits` | `projects.json[*].credits` |
| `narrative_sections` | `projects.json[*].narrative_sections` |
| `outcome_sections` | `projects.json[*].outcome_sections` |
| `source_warnings` | `projects.json[*].source_warnings` |
| `media` | `local_image_assets`, `local_video_assets`, `video_asset_ids`, `gallery_items` |

## Launch Classification

### Featured / Live Work

- Real portfolio entries default to `live`.
- Launch shortlist is assigned later through `featured_rank`.

### Archive

- The following routes default to archive:
  - `alpha-source`
  - `arte-artifacts`
  - `cider-and-milk`
  - `seasalt`
  - `tune-speaker`
  - `vito-coffee`

## Known Ambiguities To Preserve

- `oneplus-experience-store` has a client warning in the source archive.
- `kaa` has a client naming mismatch between `KAA` and `Karnataka Athletic Association`.
- Some background-video posters were blocked or inconsistently exposed by Wix.
- Credits and project service labels vary in capitalization and phrasing and must
  be normalized without losing the original wording.

## Acceptance For NS-201

- The field model is detailed enough to support import work without re-deciding
  structure.
- The provenance/warning model prevents silent flattening of source ambiguity.
- The model distinguishes:
  - studio identity content
  - live project content
  - archive/provenance content
