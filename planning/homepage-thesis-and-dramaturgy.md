# NS-901 Homepage Thesis And Dramaturgy

Date: `2026-05-08`

## Purpose

Define what the Newsense homepage is trying to do before code is written, so
the opening experience becomes a real route-and-intent system rather than a
beautiful but empty scene.

This document is the practical follow-on to:

- `planning/ia-route-model.md`
- `planning/wordmark-monolith-spec.md`

## Homepage Thesis

The homepage is not a marketing billboard.

It is a **calm threshold into a studio whose main proof lives in work**.

The user should understand three things quickly:

1. this is Newsense
2. Newsense is a design-and-film studio with serious craft weight
3. the next meaningful action is to enter the work atlas, not to read a long
   essay

## Primary Job Of `/`

The homepage must:

- orient
- establish tone
- provide first-intent choices
- transition cleanly into `Projects`, `Studio`, or `Contact`

It must not:

- front-load all information
- behave like a campaign microsite
- bury the work system under manifesto copy

## Audience Assumptions

Likely user types:

- potential client evaluating creative range
- collaborator or talent checking studio quality
- founder-side share recipient opening a direct link
- culturally adjacent visitor browsing a visually distinctive studio

They do not need an onboarding tutorial.

They need immediate orientation plus a confident path forward.

## Opening Dramaturgy

### Beat 1: Arrival

State:

- wordmark is already visible
- monolith holds the center-right weight
- atmosphere is stable

User impression:

- quiet confidence
- architectural precision
- premium but not ostentatious

### Beat 2: Recognition

Small supporting copy and route hints establish:

- studio category
- first available paths

This should happen without a long scroll or a modal.

### Beat 3: First Intent

The user chooses one of the first-intent paths:

- enter `Projects`
- enter `Studio`
- open `Contact`

`Projects` is the dominant path.

### Beat 4: Transition

The homepage yields gracefully to the chosen route.

The monolith does not fight to remain the star after intent is clear.

## First-Intent Paths

### Primary

- `View work`
- direct route: `/projects`

### Secondary

- `About the studio`
- direct route: `/studio`

### Tertiary

- `Start a conversation`
- direct route: `/contact`

Archive is not a first-intent path.

## Copy Posture

Allowed:

- one short positioning block
- one short support line
- small route labels

Not allowed:

- dense manifesto paragraphs
- generic agency buzzword stacks
- fake campaign slogans as the main homepage thesis

Recommended direction:

- positioning:
  - independent design and film studio
- support:
  - multidisciplinary creators bringing strong ideas to life

## Visual Hierarchy

Order of attention:

1. preserved wordmark
2. monolith object
3. short thesis copy
4. primary action into work
5. secondary paths

This hierarchy should survive across all runtime modes.

## Scroll Philosophy

The first viewport should not require scroll to make sense.

If scroll exists on `/`, it should:

- deepen atmosphere
- reveal supporting cues
- not replace the first-intent action model

## Deep-Link Behavior

If a user lands on `/` directly:

- they see the full opening dramaturgy

If a user returns from a case study:

- the homepage may resume in a slightly more resolved state
- but it must still read as the same threshold, not a different page

## Fallback Requirement

In `editorial` mode, the homepage still needs the same dramaturgic order:

- wordmark
- monolith image/render
- short positioning
- `Projects` action first
- `Studio` and `Contact` second

## Acceptance For NS-901

- The homepage has a clear thesis and first-intent structure.
- `Projects` remains the dominant next action.
- The scene is treated as a threshold into work, not as an end in itself.
