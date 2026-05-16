# Content Sources

The current implementation repo does not own the original Newsense archive.

The source archive remains in the Thoughtseed vault:

- `/Volumes/madara/2026/twc-vault/01-Projects/thoughtseed/thoughtseed-labs/60-client-ecosystem/newsense/old-website/`

The initial import should pull from:

- `data/brand-summary.json`
- `data/projects.json`
- `data/team.json`
- `data/services.json`
- `data/contact.json`
- `content/pages/*.md`

The implementation repo should convert those files into normalized runtime
content inside `content/` rather than reading directly from the vault at
runtime.
