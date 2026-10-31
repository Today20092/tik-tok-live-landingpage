# Lumos design system

This branch uses Lumos for Astro 0.0.3, pinned to upstream commit `1a8e1777ff072a3faeaebddcadb6ff80c6951c38` from https://github.com/lumosframework/lumos-for-astro. The copied base, patterns, utilities, Heading, Section, and slot helper retain the upstream MIT license under `src/styles/lumos/LICENSE`.

Use shared tokens for color, spacing, type, widths, corners, and controls. Compose the Lumos Section and Heading components and the site's shared resource-card/control patterns. Keep page-specific layout in named component styles inside the components layer. Add a reusable variant when the same treatment appears in multiple places; document intentional exceptions in the reference page.

Ko-fi support controls use the shared `--support-accent` orange and `--support-foreground` dark text tokens in both themes. The compact, floating, and full SupportCard variants appear on `/lumos-preview/`; the accent distinguishes support from green resource actions. The homepage puts its full invitation after the learning content and articles. SiteFooter provides a quiet support link; it has no fixed donation dock. Preserve the 44px minimum touch target and text wrapping at enlarged sizes. Keep the monthly invitation voluntary; the first goal is 10 monthly supporters, with no unverified progress count.

The live-book pair in ReadingResources uses two equal columns on wide screens. Below 40rem, compact rows put an unframed thumbnail beside each book's details, with actions aligned beneath the text. Cover wrappers crop out source-image margins and use equal visible heights while retaining each cover's aspect ratio. Secondary Quran editions use two columns on desktop and compact stacked rows on mobile inside their disclosure. Neither group requires horizontal swiping.

PocketHub keeps books, Quran resources, articles, and learning resources expanded. Major sections use generous top spacing and a straight divider. The FAQ is removed. "More ways to learn" groups the introductory diagram, live profiles, videos, and career resources in visible sections with compact subordinate headings. Quran.com is the first choice within Quran resources and uses the shared primary resource-card variant, with description and action inside the card. Free printed copies use neutral resource rows with eligibility and action labels; only secondary paid editions remain in a disclosure. Keep supported resource-card variants visible on `/lumos-preview/`.

The introductory diagram uses the same neutral resource-card structure as the free Quran copies, including its surface, border, corners, spacing, and shared `resource-card_action` label. Do not strip that card into a separate flat link row. Resource actions share one style definition in `shared.css`.

Live-session actions follow one concise introduction. Mobile stacks three full-width controls in this order: primary Follow on TikTok, outlined Watch recordings on YouTube, outlined Follow on Twitch. Wide screens use an equal three-column row. Reuse control height, icon sizing, spacing, and corners; allow labels to wrap at enlarged text sizes. The diagram and playlist cards keep their existing treatments.

Learning playlists use matching neutral cards with equal 16:9 thumbnails, consistent title/metadata/description placement, and outlined Watch playlist on YouTube actions. Stack the cards on mobile and show two columns on wide screens. Keep the short descriptions and the biography's AI-visuals disclosure visible. Do not add a recommendation eyebrow, Read more disclosure, or a small-thumbnail variant for the second playlist. The cards use shared tokens and are demonstrated on `/lumos-preview/`.

Desktop and mobile navigation share current-page treatment and semantics. About Ayoub consistently links to the local biography; the origin story remains an article. Search and missing-page recovery offer direct resource and article destinations using shared controls. Articles retain a chronological index.

The live-book print-edition action uses the outlined secondary control beside the primary PDF action, including on mobile. The secondary Quran-edition disclosure reuses the neutral resource-card shape, title/description pattern, and a rotating chevron; it does not use a separate pill style or underlined summary label.

Article lists keep chronological order and whole-row link targets. Titles lead, summaries follow, and date plus reading time share a quiet metadata row. The article index exposes the existing site-search destination. The About introduction omits the repeated category, summary, and author name while retaining its title, publication date, and reading time.

On mobile, long articles expose a Contents shortcut alongside Back to top after two screens of scrolling. It opens the existing contents disclosure and moves focus there; desktop retains its sticky contents rail. The controls wrap at enlarged text sizes and are excluded from print. Section-copy controls stay beside headings at every width. Desktop shows the copy icon and Copy link text; mobile uses a compact outlined copy icon with the full accessible name and a visible success checkmark. Copied feedback and address-bar fallback remain available. Examples appear on `/lumos-preview/`. The article-index search action uses an explicit component rule with `--space-5` above it; do not reference undeclared utility classes for spacing.

The stylesheet order is `base`, `patterns`, `components`, `utilities`. Site tokens override upstream defaults in the base layer. Utilities are small per-instance overrides. Content, quotations, Pagefind, and existing React behavior retain their own implementations.

Mobile visual verification must include viewport-sized captures of the actual changed controls with nearby reading content, including a long heading and enlarged text where relevant. Inspect hierarchy, breathing room, and control placement; passing overflow checks or reviewing only a reduced full-page image is insufficient. Confirm utility classes exist in the pinned CSS before relying on them.

Default to the warm off-white light palette, matching master. Dark mode is an explicit, remembered choice through the theme control; do not select it automatically from the operating system.

All routes now load the Lumos foundation and native component styles; there is no Tailwind compiler or utility runtime. `/lumos-preview/` demonstrates the shared tokens, headings, cards, and controls. It exists only during development or when explicitly building with `LUMOS_PREVIEW=1`; normal production builds exclude it.

Read the reference page before changing shared styles. Check both themes, narrow screens, enlarged text, focus, and the actual consuming pages. API upgrades require a reviewed diff against the pinned revision and fresh visual checks.

Component styles preserve existing layouts and interactive behavior. The compact hub and alternate editorial layouts intentionally use different compositions; shared color, type families, control height, and focus tokens remain consistent. The image viewer and Arabic quotations have documented sizing exceptions in `shared.css`.

Migrated pages inside `.site-shell` use full text line boxes. `shared.css` disables Lumos's leading-trim pseudo-elements there so section gaps, compact labels, and paragraph spacing retain their intended measurements. Keep this shared rule rather than adding separate trim overrides to each component. Run `scripts/check-site-layout.mjs` against the built preview to check every built route with expanded content in both themes and at enlarged text sizes.

The component CSS was extracted from the original utility groups and simplified to native declarations. Tailwind’s MIT attribution is retained in `src/styles/lumos/TAILWIND-LICENSE`; these files do not require Tailwind to build.

Run `scripts/check-lumos.mjs` against the built preview and development server after shared changes. See [the experiment results](lumos-migration-results.md) for commands, deliberate visual differences, and measured bundle sizes. The check detects actual cross-page overrides; it does not ban justified custom layouts.
