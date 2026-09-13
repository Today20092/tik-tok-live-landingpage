# Lumos guidance for agents

Researched 13 September 2026. Recommendation only; no application code or agent instructions changed.

## Recommendation

Replace the opening paragraph under `AGENTS.md` → Styling with:

> Before styling pages or components, changing shared styles, or upgrading Lumos, read [the shared design system](docs/lumos-design-system.md). This project uses a pinned adaptation of Lumos for Astro; follow its local structure and documented overrides when upstream examples differ.

This expands the existing pointer to shared-style changes and upgrades, and tells agents how to resolve upstream differences. Keep detailed rules in the existing design-system document. Its pinned revision, CSS layers, theme behavior, reference page, and verification requirements already cover the implementation-specific guidance. [Current agent instructions](../AGENTS.md), [local design system](lumos-design-system.md).

## Source findings

- The requested site documents **Lumos for Astro**. Upstream explicitly distinguishes it from Lumos for Webflow, whose naming and structure belong to a different product. [Project structure](https://lumosframework.com/docs/project-structure/), [upstream agent instructions](https://github.com/lumosframework/lumos-for-astro/blob/main/CLAUDE.md).
- The project-structure page describes the starter's `src/styles/base.css` and categorized component folders. It also retains an example with flat component imports while explaining that version 0.0.2 moved those files into categories. Treat examples as guidance and resolve imports against the actual checkout. [Project structure](https://lumosframework.com/docs/project-structure/).
- This repository intentionally keeps the copied foundation under `src/styles/lumos/`, preserves its own component styles and content systems, and documents a fixed upstream revision. Copying the starter's directory map into `AGENTS.md` would misrepresent this adaptation. [Local design system](lumos-design-system.md), [current key-file guidance](../AGENTS.md).
- Upstream advises adding custom components alongside framework components because edits to originals complicate upgrades. Local guidance already requires reuse first and reviewed diffs against the pinned revision for upgrades; another always-loaded rule offers little additional value. [Project structure](https://lumosframework.com/docs/project-structure/), [local design system](lumos-design-system.md).
- Upstream describes four cascade layers and reusable layout/content components. The local design-system document already specifies the layer order and the adopted Section/Heading components. Avoid duplicating those details in the pointer. [Starter README](https://github.com/lumosframework/lumos-for-astro/blob/main/packages/create-lumos/README.md), [local design system](lumos-design-system.md).

## Scope and retrieval

Fetched current upstream documentation through Context7 (`/lumosframework/lumos-for-astro`) and read the requested live page through direct HTTPS after the web reader and HTML indexing helper failed. Live upstream material is not a compatibility guarantee for the pinned revision. The older [framework research](lumos-framework-research.md) predates the migration; its Tailwind-era recommendation does not describe the current implementation. No build was needed for this research-only note.
