# Sources

This directory holds the focused legacy Newsense source bundle required to
rebuild the runtime content package without depending on the Obsidian vault.

Included:

- `old-website/data/`: structured JSON extracted from the preserved Wix site
- `old-website/content/pages/`: markdown page captures used for provenance
- `old-website/assets/images/`: only the image subset referenced by the current
  content build pipeline

Intentionally excluded:

- the full raw vault archive
- unused source images
- raw HTML dumps
- video binaries not required by the current content build
