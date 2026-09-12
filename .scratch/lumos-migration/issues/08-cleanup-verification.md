# 08: Remove the old styling system and verify consistency across routes

**What to build:** The branch runs on one documented presentation system, and future agents have a repeatable way to check that their changes stay consistent across the site.

**Blocked by:** 5, 6, 7.

**Status:** resolved

- [x] Remove Tailwind configuration, dependencies, obsolete styles, and unused styling helpers only after confirming no retained route or component depends on them.
- [x] Keep necessary interactive dependencies and article-specific behavior. Do not replace functioning logic merely to match the starter.
- [x] Reconcile agent instructions into one authoritative design convention covering shared tokens, component reuse, variants, and justified exceptions.
- [x] Leave a small repeatable consistency check using existing verification infrastructure where possible. Demonstrate that an intentional cross-page styling regression is caught; avoid a blanket prohibition on legitimate custom styles.
- [x] Compare representative built routes with the baseline and reference page in both themes and at mobile/desktop widths. Explain any intentional visual differences.
- [x] Run check, lint, build, and the relevant existing behavior checks. Verify the static output, metadata, sitemap/robots, search, draft exclusions, and production asset paths.
- [x] Deliver a local preview and a migration summary with remaining limitations. Keep the experiment on its branch; merging or publishing is a separate decision.

## Verification

Tailwind and its configuration are removed; native Lumos tokens and component styles are the only styling system. Check, lint, build, existing behavior checks, both-theme search tests, and the final 54-route/viewport/theme browser matrix pass. The regression probe detects an injected page-local font override. Keyboard image zoom, focus return, 200% text, and quotation checks pass. Journal now follows dark mode and navigation wraps with enlarged text. Results, measured CSS cost, local preview URLs, and limitations are recorded in [the migration report](../../../docs/lumos-migration-results.md). The baseline remains master at 0f0d75d.
