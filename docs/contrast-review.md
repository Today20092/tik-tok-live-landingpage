# Site color contrast review

## Implementation update

The selected Scholarly inspired palette now supersedes the green light-theme colors below: warm ivory `#fbfaf6`, ink `#161918`, secondary text `#45433e`, and blue-teal primary `#335966`. Lattice repeats at 96px by default; the development rosette option repeats at 112px. `node scripts/check-palettes.mjs` verifies a conservative minimum text contrast of 5.90:1, including the strongest available pattern setting. Primary text passes 4.5:1 and tested focus/control pairs pass 3:1. Earlier measurements remain as historical records.

All recommendations below were applied on September 11, 2026. The original review is retained as the before-state record.

- Journal's unselected layout links now use 80% opacity, giving 6.01:1.
- The shared light secondary-text color is now `#485f50`; homepage descriptions use that token. Eligibility descriptions and the paid-paperback note are now 14 pixels.
- Homepage cards, page backgrounds, primary-button text, social hover backgrounds and the hero use matching theme tokens. The secondary-card hover now uses the existing accent background. Dark colors were verified by temporarily activating `.dark` in the browser, then restoring light mode. No theme switch or automatic dark-mode activation was added.
- The hero heading has an opaque, full-height accent background behind its text, protecting it from the portrait. Verified at a 320-pixel viewport.
- Search input and filter boundaries use the stronger input token, `#7b8f7d` in light mode and `#8aa18a` in dark mode. Decorative result borders retain their original color. Search highlights use Pagefind's `--pf-mark` token so they stay readable in dark mode.
- Rendered homepage text had no measured failures in either settled theme: lowest resting contrast was 5.97:1 in light mode and 6.24:1 in dark mode. Expanded footer text also passed. Search dark-theme text and highlights passed.
- `pnpm check`, `pnpm lint`, and `pnpm build` passed. The checker reported one existing Zod deprecation hint. Other concurrent working-tree changes were preserved.

## Original review

Reviewed September 11, 2026 against the current local source and production build.

The main homepage's measured text colors pass WCAG AA. Keep the green palette. I found one confirmed text-contrast failure in the alternate Journal layout, plus a few worthwhile improvements.

## Standard used

WCAG 2.2 AA requires normal text to reach **4.5:1** against its background. Large text requires **3:1**, meaning at least 24 CSS pixels, or about 18.67 pixels when bold. Small captions and secondary descriptions still need 4.5:1. Ratios below the threshold cannot be rounded up to pass. See [W3C's text contrast guidance](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html).

Visual information needed to identify controls and their states generally needs **3:1** against adjacent colors. This does not mean every decorative border must reach 3:1. See [W3C's non-text contrast guidance](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html).

## Measured text pairs

| Location | Text / background | Ratio | AA result |
| --- | --- | ---: | --- |
| Main text and headings | `#243a30` / `#f7f9f5` | 11.51:1 | Pass |
| Descriptions, footer, article metadata and search placeholder | `#52695b` / `#f7f9f5` | 5.62:1 | Pass |
| Pale-green card descriptions | `#52695b` / `#eaf0e5` | 5.12:1 | Pass |
| Same descriptions on card hover | `#52695b` / `#e0e9d9` | 4.77:1 | Pass, limited margin |
| Main Quran button title | `#ffffff` / `#254f39` | 9.31:1 | Pass |
| Main Quran button subtitle | `#d4e4cf` / `#254f39` | 7.00:1 | Pass |
| Support description on hover | `#52695b` / `#fff1eb` | 5.39:1 | Pass |
| Hero title against its solid green backdrop | `#243a30` / `#e1eadc` | 9.87:1 | Pass for solid backdrop |
| Journal's unselected layout links | `#303a32` at 60% opacity / `#f8f5ed` | **3.47:1** | **Fail** |

Displayed ratios are rounded; pass/fail decisions use unrounded values. Opacity is composited with the background before calculating contrast.

## What to change and why

### 1. Fix the Journal layout links

`src/components/VariantHub.astro:75` uses `opacity-60` for the unselected Flow, Pocket and Focus links. These are enabled links, not disabled controls, so they still need normal text contrast. At 12 pixels they require 4.5:1 and currently reach only 3.47:1.

Change `opacity-60` to `opacity-80`, which gives approximately **6.01:1** on the Journal background. Removing the opacity also works. The active link already has a separate underline, so the lower opacity is not essential to communicate selection. This issue is on `/journal/`, not the main homepage.

### 2. Optionally darken small secondary text

`src/components/PocketHub.astro:48` defines the card hover background; descriptions throughout that component use `#52695b`. Their **4.77:1** hover contrast passes, so changing them is optional.

If you want more margin, use **`#485f50`** for secondary text. That gives **5.56:1** on the hover background, **5.97:1** on normal pale-green cards and **6.55:1** on the page. It keeps the same subdued green appearance. Update both the shared muted-text token and the homepage's hardcoded secondary text if adopting this change.

Many descriptions are 12 pixels. Increasing important eligibility descriptions to 14 pixels would improve reading comfort independently of contrast. No need to enlarge every metadata label.

### 3. Strengthen the search input boundary

`src/pages/search.astro:119` maps the search border to `#d4ded0`. Against `#f7f9f5`, that is only **1.31:1**. The placeholder and typed text pass, and the focused input has a visible blue border, but the resting field is faint.

Use **`#7b8f7d`** for the input's resting border, giving **3.27:1** against the page. Scope this to the input or controls that need a boundary; keep decorative card separators subtle. This is a usability recommendation, not a blanket finding that every faint border violates WCAG. Whether a boundary is required depends on the other visual cues identifying the control.

### 4. Keep the hero's text area protected from the portrait

`src/components/PocketHub.astro:60–69` combines a solid green background with a masked portrait. The solid color pair is excellent, but **9.87:1 is not a measurement of every photograph pixel behind the letters**.

The heading remained readable in the desktop screenshot and at 320- and 375-pixel viewport widths. At 320 pixels, the final word enters the faded edge of the portrait. I found no visible overlap problem requiring a redesign. Preserve the fade and keep a solid backing behind the full text area if changing the photograph, crop or heading. That makes contrast independent of the photograph.

### 5. Treat dark mode as unfinished, not as an audited active theme

The current homepage uses fixed light colors and exposes no theme switch. `src/layouts/HubPage.astro` does not activate the `.dark` class. The dark palette in `src/styles/global.css` has strong intended text pairs, but it is not a complete dark homepage implementation.

Do not enable `.dark` alone: some homepage captions use theme tokens while their backgrounds stay fixed light. For example, dark muted text `#b7c9b5` on the fixed `#f7f9f5` background would be only **1.65:1**. If adding dark mode, convert the homepage's fixed colors to matching foreground/background tokens together, then test search highlights and other inherited component colors too.

## Verification and limits

- Built the site successfully with `pnpm build` and inspected the production preview, including the actual Pagefind search interface.
- Checked the homepage, article listing, both current articles, search results for “Quran”, search placeholder, filter menu, and the Journal and Focus alternatives. Measured computed text colors and reviewed source-defined hover colors.
- Search result text and highlights passed. Search includes visually hidden screen-reader labels and a disabled Clear control; these are not visible text failures.
- Video titles sit beside thumbnails. The white play icon has its own 70%-black backing, avoiding direct dependence on the thumbnail's colors.
- This is a targeted contrast review, not a full WCAG conformance certification or an exhaustive pixel audit of photography. Experimental style and podcast previews, third-party pages, and text embedded inside external thumbnails were outside the detailed review.
- No site styling or application code was changed. Only this report was added; existing working-tree edits were preserved.
