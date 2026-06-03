# Team Models

This folder holds team-related 3D assets for the Newsense site.

## Current State

- `amyth-venkataramaiah/scene.glb`
  - mapped to the current public team member
- `sant-mote/scene.glb`
  - mapped to the current public team member
- `suraj-singh-thakur/scene.glb`
  - mapped to the current public team member
- `candidates/`
  - imported portrait GLBs that are not yet mapped to specific team members
  - includes `shesh.glb`, which is preserved but not assigned because there is
    no current public roster record for that member in the generated content
  - safe to use for experimentation while the final assignment is still being
    confirmed

When a team member model is confirmed, move it into a member-specific folder and
update `sources/team-asset-map.json` so the content build preserves the link.
