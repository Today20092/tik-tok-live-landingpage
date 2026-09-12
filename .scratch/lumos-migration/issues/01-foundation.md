# 01: Prove the shared design system on a resource section and article excerpt

**What to build:** A development-only reference page shows an actual resource card and article excerpt composed with the same Lumos tokens and components. It establishes a working migration boundary before production pages change.

**Blocked by:** None.

**Status:** resolved

## Verification

Pinned upstream revision and retained license. Baseline captures cover home, article, and search in two themes at 390 and 1280 pixels. The standalone reference builds with explicit preview opt-in; the mobile check proves one token updates both theme samples and checks overflow. Astro check, lint, and the preview build pass. Evidence is under the feature's evidence directory. Source quotation data is unchanged.

- [x] Capture representative existing pages in both themes at mobile and desktop sizes before migration.
- [x] Import only the necessary Lumos foundation at a recorded revision, retaining its license notice.
- [x] Reconcile overlapping CSS classes, layers, and resets without changing existing pages. Demonstrate that isolation in the built preview as well as development.
- [x] Map the existing brand colors, fonts, reading widths, and spacing to one shared token system. Use existing content in the demonstration.
- [x] Show supported heading, text, button, link, card, and focus variants in the reference page; changing one token updates both examples consistently.
- [x] Document the component reuse rules for agents and the temporary migration boundary. Replace conflicting Tailwind-first instructions for migrated UI without encouraging two permanent systems.
- [x] Existing check, lint, and build commands pass. Compare the two examples visually, including narrow widths and enlarged text.

## Final integration evidence

See [migration results](../../../docs/lumos-migration-results.md) for commands, visual comparisons, bundle measurements, and limitations. The built-route checks cover both themes at 320/390/1280 pixels; search additionally covers 640 pixels. Content, metadata, keyboard interactions, enlarged text, and shared-token propagation were checked. The experiment remains separate from master.
