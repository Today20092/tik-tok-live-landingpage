# Lumos design system

This branch uses Lumos for Astro 0.0.3, pinned to upstream commit `1a8e1777ff072a3faeaebddcadb6ff80c6951c38` from https://github.com/lumosframework/lumos-for-astro. The copied base, patterns, utilities, Heading, Section, and slot helper retain the upstream MIT license under `src/styles/lumos/LICENSE`.

Use shared tokens for color, spacing, type, widths, corners, and controls. Compose the Lumos Section and Heading components and the site's shared resource-card/control patterns. Keep page-specific layout in named component styles inside the components layer. Add a reusable variant when the same treatment appears in multiple places; document intentional exceptions in the reference page.

The stylesheet order is `base`, `patterns`, `components`, `utilities`. Site tokens override upstream defaults in the base layer. Utilities are small per-instance overrides. Content, quotations, Pagefind, and existing React behavior retain their own implementations.

Default to the warm off-white light palette, matching master. Dark mode is an explicit, remembered choice through the theme control; do not select it automatically from the operating system.

All routes now load the Lumos foundation and native component styles; there is no Tailwind compiler or utility runtime. `/lumos-preview/` demonstrates the shared tokens, headings, cards, and controls. It exists only during development or when explicitly building with `LUMOS_PREVIEW=1`; normal production builds exclude it.

Read the reference page before changing shared styles. Check both themes, narrow screens, enlarged text, focus, and the actual consuming pages. API upgrades require a reviewed diff against the pinned revision and fresh visual checks.

Component styles preserve existing layouts and interactive behavior. The compact hub and alternate editorial layouts intentionally use different compositions; shared color, type families, control height, and focus tokens remain consistent. The image viewer and Arabic quotations have documented sizing exceptions in `shared.css`.

Migrated pages inside `.site-shell` use full text line boxes. `shared.css` disables Lumos's leading-trim pseudo-elements there so section gaps, compact labels, and paragraph spacing retain their intended measurements. Keep this shared rule rather than adding separate trim overrides to each component. Run `scripts/check-site-layout.mjs` against the built preview to check every built route with expanded content in both themes and at enlarged text sizes.

The component CSS was extracted from the original utility groups and simplified to native declarations. Tailwind’s MIT attribution is retained in `src/styles/lumos/TAILWIND-LICENSE`; these files do not require Tailwind to build.

Run `scripts/check-lumos.mjs` against the built preview and development server after shared changes. See [the experiment results](lumos-migration-results.md) for commands, deliberate visual differences, and measured bundle sizes. The check detects actual cross-page overrides; it does not ban justified custom layouts.
