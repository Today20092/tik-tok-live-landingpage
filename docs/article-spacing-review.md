# Article spacing review

The local article lists now have clear separation between titles, descriptions, and reading times. These changes have not been deployed.

The workspace already contained the core CSS correction. I verified and retained it: remove the inherited heading margin and disable Lumos leading-trim pseudo-elements inside article lists. Those trimming rules compressed the apparent gaps despite the existing margins. This applies to the homepage list, article index, and related articles.

The gaps remain two spacing units, or 0.5rem. This matches Tailwind's default `mt-2` spacing, based on its [0.25rem spacing token](https://github.com/tailwindlabs/tailwindcss.com/blob/main/src/docs/theme.mdx). No Tailwind dependency is needed.

I also constrained the article page to its available width to prevent related articles overflowing at 320px with doubled text. The development design reference now includes real article-list examples.

Validation passed: `pnpm check`, `pnpm lint`, `pnpm build`, the shared Lumos browser checks, and article spacing checks at 320px, 390px, and 1280px in both themes at 100% and 200% text. Astro check reports one existing Zod deprecation hint. The shared browser checks cover keyboard focus, theme persistence, and navigation.

## Suggested follow-ups

- Fix homepage resource-card overflow at 320px with 200% text. This is separate from the article lists and remains present.
- Consider keeping the theme button beside the brand on very narrow screens. At 320px it wraps onto a separate navigation row. Its touch target and keyboard behavior passed checks.

My visual assessment of the article-list spacing is 9/10 after the fix. The remaining priority for the wider layout is enlarged-text reflow, rather than adding more decoration or increasing every gap.
