# Lumos Framework research

Researched 12 September 2026 against the requested documentation, its linked source repository, and this project. No migration or compatibility test was performed.

## Recommendation

Keep the current stack for now. Lumos is worth a small, isolated trial if maintaining Tailwind markup has become a real problem. Its strongest benefits are a ready-made component system, fluid sizing, and themes that inherit through sections. This site already has Astro, reusable components, semantic color tokens, and static deployment, so those parts are not new benefits. A full switch would spend most of its effort changing the presentation layer while taking on a young component API.

This is a judgment based on the comparison below, not a benchmark. There is no evidence here that switching would make this site faster, improve its search ranking, or reduce its hosting costs.

## What it actually is

The exact site you linked documents **Lumos for Astro**, a component and styling framework copied into an ordinary Astro project. It is not a replacement for Astro. Its documented starting command creates a project, rather than adding a CSS plugin to an existing one. The framework is free and MIT licensed; its documentation says it requires no account or per-seat subscription. The MIT notice must be retained when distributing covered code. Hosting and any optional services remain separate. Sources: [introduction](https://lumosframework.com/docs/), [installation](https://lumosframework.com/docs/installation), [license](https://github.com/lumosframework/lumos-for-astro/blob/main/LICENSE).

There is also an older Lumos framework for Webflow. Search results prominently return that product and its 2.x Notion documentation. Those version numbers, Webflow subscriptions, and Webflow export restrictions do not describe the Astro framework at the requested URL. Sources: [Astro repository](https://github.com/lumosframework/lumos-for-astro), [older Webflow documentation](https://timothyricks.notion.site/Lumos-Framework-v2-2-0-6d1139068f7442d49494ec3b581cf09d).

The current docs header and footer identify **0.0.3**, and the repository's package manifest agrees. Some introductory copy still says 0.0.1 and mentions unsettled props until 0.1.0. The repository README gives the more conservative commitment: 0.x releases can break APIs, with stability promised at 1.0. Treat this as beta software and check actual source when examples disagree. Sources: [introduction](https://lumosframework.com/docs/), [package manifest](https://github.com/lumosframework/lumos-for-astro/blob/main/package.json), [README](https://github.com/lumosframework/lumos-for-astro#readme).

## How it works

| Part | Mechanism | Practical effect |
| --- | --- | --- |
| Design tokens | CSS custom properties in `base.css` hold colors, spacing, typography, widths, radius, and focus styles. | Changing a shared value updates components that use it. |
| Fluid sizing | Minimum and maximum values generate `clamp()` sizes. The documented default viewport range is 320 to 1440 pixels, expressed through responsive sizing rules. | Type and spacing change smoothly instead of requiring a value at every breakpoint. |
| CSS cascade | Four named layers run in order: `base`, `patterns`, `components`, `utilities`. | For normal declarations, a later layer overrides an earlier layer without increasing selector specificity. |
| Themes | `theme-light`, `theme-dark`, `theme-brand`, and `theme-invert` change inherited semantic variables. | A section or card can change its descendants' colors together. |
| Layout | Astro components such as `Section`, `ContentWrapper`, and `Grid` supply layout and spacing. | Pages use typed props and slots to select common arrangements. |
| Local overrides | Utility classes can override a component instance; named variants handle repeated combinations. | Less styling needs to be repeated directly on each child element. |

Sources: [tokens](https://lumosframework.com/docs/concepts/tokens), [cascade](https://lumosframework.com/docs/concepts/the-cascade), [theming](https://lumosframework.com/docs/concepts/theming), [layout](https://lumosframework.com/docs/concepts/layout), [utilities or props](https://lumosframework.com/docs/concepts/utilities-or-props).

Its components use typed props, named slots, and a `render` flag. The documented conventions suppress empty output, forward HTML attributes, and report some invalid settings as development warnings. Its CSS uses global `block_element` class names inside cascade layers rather than Astro's usual scoped styles. That makes naming discipline part of avoiding collisions. Sources: [components](https://lumosframework.com/docs/concepts/components), [cascade](https://lumosframework.com/docs/concepts/the-cascade).

Responsiveness is not literally breakpoint-free. The system favors fluid values, automatic grid fitting, and layouts that adapt to their available space, but its layout documentation also shows breakpoint-based column props and a two-column layout that stacks below 64rem. Sources: [introduction](https://lumosframework.com/docs/), [layout](https://lumosframework.com/docs/concepts/layout).

For a new project, the documented workflow is to scaffold with `npm create lumos@latest my-site`, fill in site details in `src/consts.ts`, set brand values in `src/styles/base.css`, and assemble Astro pages from components. Framework components live in categorized folders; the docs recommend adding custom components alongside them because editing the originals complicates upgrades. This command is an explanation, not a recommendation to run it over our existing repository. Sources: [installation](https://lumosframework.com/docs/installation), [project structure](https://lumosframework.com/docs/project-structure).

## What improves, and what does not

| Potential advantage | Value for this project | Limitation |
| --- | --- | --- |
| More consistent sections, cards, and typography | Useful if we regularly add pages with the same layouts. | Our existing components already provide some reuse. The starter's visual scale still needs adapting to a compact reading site. |
| Shorter page markup | Props and shared patterns can replace repeated utility combinations. | The styling still exists in component CSS. Shorter HTML does not establish a smaller total download. |
| Nested themes | Convenient for a differently colored callout inside either page theme. | We already have global light/dark semantic tokens. This is an extension, not a prerequisite for dark mode. |
| Fluid layouts | Can reduce repeated breakpoint adjustments. | Arabic text, long quotations, zoom, and reading tools still need visual checks. |
| Accessible component defaults | Provides useful starting behavior for navigation, controls, and dialogs. | It does not certify the resulting site or choose meaningful labels and contrast for us. |
| Source ownership | MIT-licensed code lives in our project and remains editable. | We also own integration, updates, and any divergence from upstream. |

These are assessments of the mechanisms documented in [Lumos versus Tailwind](https://lumosframework.com/docs/guides/lumos-vs-tailwind), [theming](https://lumosframework.com/docs/concepts/theming), [accessibility](https://lumosframework.com/docs/concepts/accessibility), and [project structure](https://lumosframework.com/docs/project-structure), compared with [our global styles](../src/styles/global.css) and [components](../src/components).

The Tailwind comparison on Lumos's site compares a complete starter and component system with a CSS framework on its own. Our actual comparison is less dramatic: we already supply components, content handling, metadata, and deployment around Tailwind. Lumos would replace some decisions we have made, rather than supply all of those capabilities for the first time. Sources: [vendor comparison](https://lumosframework.com/docs/guides/lumos-vs-tailwind), [our package manifest](../package.json), [main page](../src/pages/index.astro), [content configuration](../src/content.config.ts).

## Accessibility and performance

Lumos documents visible focus, a skip link, semantic landmarks, reduced-motion handling, and correct button/link elements. Authors still choose alt text, heading order, link text, and color contrast. Its modal uses a native `dialog` and requires an accessible name supplied through a label. These are useful defaults, not an audit result. Sources: [accessibility](https://lumosframework.com/docs/concepts/accessibility), [modal](https://lumosframework.com/docs/components/modal).

Its static output can use our existing Cloudflare Pages hosting. No Worker migration is required. Interactive components can include browser scripts, so "static site" should not be read as "no JavaScript." Keeping our React islands would keep their client runtime costs as well. Sources: [deployment](https://lumosframework.com/docs/guides/deploying), [modal behavior](https://lumosframework.com/docs/components/modal), [our Astro configuration](../astro.config.mjs).

The documentation's shorter-markup examples do not measure this site's compressed HTML, CSS, JavaScript, loading, or interaction performance. Any speed claim requires comparing equivalent built pages. A migration might remove some duplicated markup or substitute native controls for particular islands, but neither saving is established by this research.

## Fit with our repository

The current Lumos starter declares Astro `^7.2.9`, TypeScript `^6.0.3`, and Node `>=22.12.0`. Its manifest does not include React, Tailwind, MDX, or Pagefind. Our project declares Astro `^7.3.2`, React 19, Tailwind 4, MDX, and Pagefind. The shared Astro major makes an incremental trial plausible; it is not a tested compatibility guarantee. Sources: [Lumos manifest](https://github.com/lumosframework/lumos-for-astro/blob/main/package.json), [our manifest](../package.json).

This repository now contains articles and search as well as the link hub. A presentation migration should preserve:

- Content Layer schemas, article routes, draft behavior, table of contents, related articles, and Pagefind indexing.
- `QuranVerse` and `HadithQuote`, including checked quotation data, attribution, Arabic direction/language, and failure behavior for invalid references.
- Reading tools, image viewing, interactive charts, and other existing islands until there is a specific reason to replace them.
- Canonical metadata, structured data, social images, robots and sitemap behavior, the production domain, and the current pnpm/Cloudflare Pages build.

Sources: [content configuration](../src/content.config.ts), [pages](../src/pages), [components](../src/components), [Quran guide](quran-in-articles.md), [hadith guide](hadith-in-articles.md), [Astro configuration](../astro.config.mjs), [package manifest](../package.json).

None of these systems inherently requires a rewrite just to adopt Lumos styles. Retaining them is an architectural inference based on both projects using Astro. Copying the starter wholesale would create unnecessary work and could overwrite project-specific behavior.

## Costs and risks of switching

1. **Early API changes.** The README explicitly permits breaking changes before 1.0. It describes an upgrade skill that merges releases and compares page images. Those instructions ship under `.claude/skills`; adapting and validating them for this Codex setup would be separate work. The workflow has not been exercised here and does not remove review work. [README](https://github.com/lumosframework/lumos-for-astro#readme), [bundled skills](https://github.com/lumosframework/lumos-for-astro/tree/main/.claude/skills).
2. **CSS migration and coexistence.** We would need to reconcile resets, class names, semantic variables, and layer order. Both systems can use names such as `base`, `components`, and `utilities`; Lumos also uses class names such as `container` and `gap-*`. Loading both globally without planning can change which rules win. This is an integration risk inferred from [Lumos's cascade](https://lumosframework.com/docs/concepts/the-cascade), [Section source](https://github.com/lumosframework/lumos-for-astro/blob/main/src/components/Wrapper/Section.astro), and [our stylesheet](../src/styles/global.css).
3. **A different maintenance convention.** Lumos favors component CSS, named patterns, and global classes. Our repository explicitly favors Tailwind utilities. Full adoption requires an intentional change to that convention, plus restyling custom components rather than just changing dependencies. Sources: [Lumos component conventions](https://lumosframework.com/docs/concepts/components), [project instructions](../AGENTS.md).
4. **Documentation drift.** The live docs contain old version labels and examples with flat component paths, while the project-structure page says those paths moved in 0.0.2. Use a fixed version and its actual files when testing. Sources: [introduction](https://lumosframework.com/docs/), [layout examples](https://lumosframework.com/docs/concepts/layout), [project structure](https://lumosframework.com/docs/project-structure).
5. **No automatic product gain.** This remains a code-authored Astro site. The documented editor setup is code tooling, not a built-in CMS or visual publishing workflow. Switching alone does not solve nontechnical article editing. [Installation](https://lumosframework.com/docs/installation).

## A proportionate next step

If we want to evaluate it, use an isolated branch or separate prototype with one representative link-card section and one article excerpt. Keep the same content and visual target. Compare how much code it takes to make an actual change, then check light/dark mode, narrow widths, Arabic text, keyboard interaction, and enlarged text. Run the existing check, lint, and build commands and compare the built assets.

Adopt it more broadly only if that trial demonstrates easier maintenance that outweighs the CSS migration and beta upgrade work. Otherwise, keep Tailwind and borrow specific ideas, such as a fluid spacing token or an automatic grid, where the current implementation has a concrete problem. Nothing in this research justifies a whole-site rewrite today.

## Research limits

The web search reader could not open the requested domain, but direct HTTPS retrieval returned its documentation successfully. Search results alone would have misidentified it as the older Webflow framework. The report uses the requested live pages and linked Astro repository, with no production installation, benchmark, or accessibility certification. Version findings describe what those sources exposed on the research date.
