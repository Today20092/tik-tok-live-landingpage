# Lumos migration experiment

Approved for implementation by the user on 12 September 2026.

Keep pages consistent when different agents work on the site. Adopt Lumos for Astro as the shared presentation system while retaining the site's compact appearance, content, URLs, Astro rendering, and Cloudflare Pages deployment. This is a migration experiment, not a redesign or a move to Webflow.

Consistency means the same semantic tokens, component variants, page widths, typography, controls, and interaction states across pages. Agents should compose existing components rather than invent page-specific versions. New exceptions must have a concrete reason and appear in the shared reference page.

Use a fixed Lumos revision. Its current component API is beta. Do not copy its starter over this project or automatically accept upstream updates. Preserve the pinned pnpm workflow and existing content safeguards.


## Delivery

Complete the eight tickets in dependency order on `experiment/lumos-migration`. Preserve `master`, run behavior and visual verification, and leave both experimental and baseline previews available for comparison.
