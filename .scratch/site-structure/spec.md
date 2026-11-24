# Site structure refactor

Status: ready-for-agent

## Goal

Reorganize the code into a clear page → layout → section → component hierarchy that can be reused as a standard on other Astro sites. Visitors see no change.

Evidence and the proposed standard: [Astro site structure research](../../docs/astro-site-structure-research.md).

## Must stay the same

- The set of built routes and public files.
- Visual appearance of every built page at 320, 390, 768 and 1280px, light and dark, including enlarged text.
- Visible copy, links, metadata, JSON-LD, element ids and anchors, Pagefind indexing, scripts and island behavior.
- Quran and hadith quotations, sources and attribution.

Keep class names and DOM structure unless a change is required. Every difference in normalized built HTML needs a written explanation.

## Out of scope

Copy, design or dependency upgrades. New features. Project updates content. The `kofi-preview` (it ships to production), `podcast-preview` and `lumos-preview` pages stay, apart from import and dead-link fixes.

## Tickets

1. [Folder structure](issues/01-folder-structure.md)
2. [Homepage sections and cleanup](issues/02-homepage-sections.md)

Both ship in one pull request, as separate commits, followed by an independent review.
