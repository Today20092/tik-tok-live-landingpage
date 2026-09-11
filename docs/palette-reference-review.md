# Palette reference review

Reviewed September 11, 2026 for the Quran link hub.

## What the references show

The [Astro August roundup](https://astro.build/blog/whats-new-august-2026/#themes--templates) mixes reading themes with large agency and commerce templates. I inspected the live Astro Palette, Hedger, Scholarly, and Norevia sites. I also reviewed the catalogue entries for A Quiet Publication and Sandstone; those two were not visually audited.

[Astro Palette](https://github.com/joshruggles/astro-palette) is a blog theme with a palette switcher, not an independent palette generator. The current repository lists 32 schemes. Its [CSS definitions](https://github.com/joshruggles/astro-palette/blob/main/public/css/style.css) provide actual values. I inspected the live Vesper and Rose Pine Dawn treatments and read the CSS values for the other selected schemes.

- [Hedger](https://hedger.ch/posts): neutral charcoal, white headings, restrained gray descriptions. Hierarchy comes mostly from type and spacing. Its background computed to `oklch(0.205 0 none)`, approximately `#171717`.
- [Scholarly](https://astro-theme-scholars.pages.dev/): warm off-white `#fbfaf6`, nearly black headings `#161918`, subdued blue-green links, and comparatively little colored area. The warm neutral treatment is a strong fit for reading and resource links.
- [Norevia](https://norevia.pages.dev/): in the inspected dark mode, background `#0e1315`, surfaces `#161c1e` and `#1e2629`, cyan accent `#6eb4c2`. The photography contributes substantially to its appearance; copying the color values cannot reproduce that effect by itself.

## Added to the development preview

These are adaptations to our existing card roles, not ports of the source themes. Published background/accent values are retained; secondary text, control outlines, and some supporting surfaces are chosen for this page's contrast requirements. No source theme implementation was imported.

| Preview choice | Source | Background / main accent | Small-text minimum |
| --- | --- | --- | --- |
| Rosé Pine Dawn | Astro Palette | `#faf4ed` / `#907aa9` | 5.43:1 |
| Gruvbox Light | Astro Palette | `#fbf1c7` / `#076678` | 6.40:1 |
| Kanagawa Lotus | Astro Palette | `#f2ecbc` / `#4d699b` | 5.39:1 |
| Nord | Astro Palette | `#2e3440` / `#88c0d0` | 4.92:1 |
| Vesper | Astro Palette | `#101010` / `#ffc799` | 6.22:1 |
| Hedger neutral | Hedger, visual adaptation | `#171717` / `#e5e5e5` | 5.52:1 |
| Scholarly inspired | Scholarly, visual adaptation | `#fbfaf6` / `#335966` | 5.90:1 |
| Norevia inspired | Norevia, visual adaptation | `#0e1315` / `#6eb4c2` | 6.23:1 |

The minimum includes foreground and secondary text on page, card, hover, hero, and support surfaces, and a conservative bound for black or white geometry at Bold opacity. Main-button text is checked separately against 4.5:1, and focus/control pairs against 3:1. Run `node scripts/check-palettes.mjs`. This is a palette check, not a full accessibility audit.

## Recommendation

Try Rosé Pine Dawn for a warm light option, Scholarly inspired for a neutral reading option, and Vesper for dark mode. Gruvbox Light and Kanagawa Lotus are useful comparisons if a stronger yellow paper base is appealing.

My design judgment is that the earlier attempts used too much tinted background area. Neutral card surfaces and a single clear accent preserve the link hierarchy better. Compare each new palette with geometry off first, then with Rosettes at Medium strength, so the pattern does not mask the palette decision.
