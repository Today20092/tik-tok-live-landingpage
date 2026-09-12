# 07: Migrate alternate layouts and preview pages

**What to build:** Existing alternate hub layouts and preview experiences use the same shared components as the main hub and articles, without losing their intentional differences.

**Blocked by:** 3, 4.

**Status:** resolved

- [x] Inventory all remaining alternate and preview routes, including generated routes, and migrate their presentation.
- [x] Express intentional layout differences through supported variants rather than copied component implementations.
- [x] Preserve each preview's current development-only or indexing behavior.
- [x] Confirm that all retained variants render correctly in both themes at mobile and desktop sizes.
- [x] Relevant existing checks and check, lint, and build pass.

## Final integration evidence

See [migration results](../../../docs/lumos-migration-results.md) for commands, visual comparisons, bundle measurements, and limitations. The built-route checks cover both themes at 320/390/1280 pixels; search additionally covers 640 pixels. Content, metadata, keyboard interactions, enlarged text, and shared-token propagation were checked. The experiment remains separate from master.
