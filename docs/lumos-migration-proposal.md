# Lumos migration ticket proposal

Branch: `experiment/lumos-migration`

Status: proposed breakdown, awaiting review and tracker selection. These are not published tickets.

## Intended outcome

Keep pages consistent when different agents work on the site. Adopt Lumos for Astro as the shared presentation system while retaining the site's compact appearance, content, URLs, Astro rendering, and Cloudflare Pages deployment. This is a migration experiment, not a redesign or a move to Webflow.

Consistency means the same semantic tokens, component variants, page widths, typography, controls, and interaction states across pages. Agents should compose existing components rather than invent page-specific versions. New exceptions must have a concrete reason and appear in the shared reference page.

Use a fixed Lumos revision. Its current component API is beta. Do not copy its starter over this project or automatically accept upstream updates. Preserve the pinned pnpm workflow and existing content safeguards.

## Proposed breakdown

1. **Prove the shared design system on a resource section and article excerpt**

   **Blocked by:** None.

   **What it delivers:** A development-only reference page shows an actual resource card and article excerpt composed with the same Lumos tokens and components. It establishes a working migration boundary before production pages change.

   Acceptance criteria:
   - Capture representative existing pages in both themes at mobile and desktop sizes before migration.
   - Import only the necessary Lumos foundation at a recorded revision, retaining its license notice.
   - Reconcile overlapping CSS classes, layers, and resets without changing existing pages. Demonstrate that isolation in the built preview as well as development.
   - Map the existing brand colors, fonts, reading widths, and spacing to one shared token system. Use existing content in the demonstration.
   - Show supported heading, text, button, link, card, and focus variants in the reference page; changing one token updates both examples consistently.
   - Document the component reuse rules for agents and the temporary migration boundary. Replace conflicting Tailwind-first instructions for migrated UI without encouraging two permanent systems.
   - Existing check, lint, and build commands pass. Compare the two examples visually, including narrow widths and enlarged text.

2. **Use one shared page shell across the site**

   **Blocked by:** 1.

   **What it delivers:** Visitors see the same header, footer, navigation, content boundaries, and theme controls while moving between the hub, articles, search, and not-found page.

   Acceptance criteria:
   - Migrate the shared shell and its controls using the approved foundation; page bodies can remain on the temporary old styling boundary.
   - Theme persistence, initial theme rendering, keyboard navigation, skip navigation, and mobile navigation keep working.
   - Preserve each route's canonical metadata, structured data, social metadata, and indexing rules.
   - Demonstrate consistent shell states on the hub, an article, search, and the not-found page in both themes.
   - Relevant existing checks and check, lint, and build pass.

3. **Migrate the resource hub and its card variants**

   **Blocked by:** 2.

   **What it delivers:** Visitors can browse resource links, learning videos, support links, and the hub's expandable content using the shared design system.

   Acceptance criteria:
   - Preserve resource destinations, eligibility copy, card variants, thumbnails, and existing interactions.
   - Use shared card, text, spacing, and control variants; add real variants to the reference page instead of creating local copies.
   - Verify mobile wrapping, focus, expanded states, and both themes with actual content.
   - The hub no longer depends on its old presentation rules; remove obsolete rules when no remaining consumer needs them.
   - Relevant existing checks and check, lint, and build pass.

4. **Migrate article discovery and reading content**

   **Blocked by:** 2.

   **What it delivers:** Readers can open an article from the article list and read its headings, links, images, and quotations with consistent typography and spacing.

   Acceptance criteria:
   - Preserve article ordering, routes, draft exclusion, related articles, heading anchors, and search-index annotations.
   - Use shared list/card variants and a single article typography treatment, including supported rich content.
   - Preserve checked Quran and hadith text, attribution, source links, validation behavior, Arabic language/direction, and quotation semantics.
   - Verify a long article and representative quotation content in both themes, on mobile, and with enlarged text.
   - Existing Quran/hadith checks and relevant article checks pass, along with check, lint, and build.

5. **Make article interactions follow the shared control system**

   **Blocked by:** 4.

   **What it delivers:** Readers can use the existing reading tools, image viewer, sharing controls, and interactive article content without encountering a different set of controls and styles.

   Acceptance criteria:
   - Preserve the current reading, image-viewing, sharing, and chart behavior; retain React where interaction still needs it.
   - Apply shared control tokens and variants to interactive islands, including relevant hover, focus, active, disabled, and open states.
   - Verify keyboard operation, dialog focus and dismissal, reduced motion, and mobile operation where applicable.
   - Relevant existing interaction checks and check, lint, and build pass. Record any asset-size change rather than claiming an unmeasured performance gain.

6. **Migrate the complete search experience**

   **Blocked by:** 2.

   **What it delivers:** Visitors can submit a query, filter results, and open a result through a search interface that matches the rest of the site.

   Acceptance criteria:
   - Retain Pagefind generation, resource/article indexing, draft exclusions, and working result destinations.
   - Style the search input, filters, results, loading, empty, and error states with shared tokens and controls.
   - Verify keyboard navigation, narrow widths, and both themes against the built search index.
   - Existing search checks and check, lint, and build pass.

7. **Migrate alternate layouts and preview pages**

   **Blocked by:** 3, 4.

   **What it delivers:** Existing alternate hub layouts and preview experiences use the same shared components as the main hub and articles, without losing their intentional differences.

   Acceptance criteria:
   - Inventory all remaining alternate and preview routes, including generated routes, and migrate their presentation.
   - Express intentional layout differences through supported variants rather than copied component implementations.
   - Preserve each preview's current development-only or indexing behavior.
   - Confirm that all retained variants render correctly in both themes at mobile and desktop sizes.
   - Relevant existing checks and check, lint, and build pass.

8. **Remove the old styling system and verify consistency across routes**

   **Blocked by:** 5, 6, 7.

   **What it delivers:** The branch runs on one documented presentation system, and future agents have a repeatable way to check that their changes stay consistent across the site.

   Acceptance criteria:
   - Remove Tailwind configuration, dependencies, obsolete styles, and unused styling helpers only after confirming no retained route or component depends on them.
   - Keep necessary interactive dependencies and article-specific behavior. Do not replace functioning logic merely to match the starter.
   - Reconcile agent instructions into one authoritative design convention covering shared tokens, component reuse, variants, and justified exceptions.
   - Leave a small repeatable consistency check using existing verification infrastructure where possible. Demonstrate that an intentional cross-page styling regression is caught; avoid a blanket prohibition on legitimate custom styles.
   - Compare representative built routes with the baseline and reference page in both themes and at mobile/desktop widths. Explain any intentional visual differences.
   - Run check, lint, build, and the relevant existing behavior checks. Verify the static output, metadata, sitemap/robots, search, draft exclusions, and production asset paths.
   - Deliver a local preview and a migration summary with remaining limitations. Keep the experiment on its branch; merging or publishing is a separate decision.

## Why these dependencies

The foundation must prove CSS coexistence first. The shell then establishes the common boundary for page migrations. Hub, article, and search work can proceed independently after that. Article interactions depend on the migrated reading page. Alternate layouts reuse the migrated hub and article patterns. Cleanup waits for every migration branch of the dependency graph to finish.

## Review requested

- Does the granularity feel right, or are any tickets too large or too small?
- Do the blockers represent real prerequisites?
- Should any tickets be merged or split?

No tracker configuration was found. Run `/setup-matt-pocock-skills` to configure one, or explicitly select local ticket files for this experiment. After approval, publish one ticket per file or tracker issue, with the stated blocking relationships and the configured triage status.
