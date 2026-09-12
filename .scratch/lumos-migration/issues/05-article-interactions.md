# 05: Make article interactions follow the shared control system

**What to build:** Readers can use the existing reading tools, image viewer, sharing controls, and interactive article content without encountering a different set of controls and styles.

**Blocked by:** 4.

**Status:** resolved

- [x] Preserve the current reading, image-viewing, sharing, and chart behavior; retain React where interaction still needs it.
- [x] Apply shared control tokens and variants to interactive islands, including relevant hover, focus, active, disabled, and open states.
- [x] Verify keyboard operation, dialog focus and dismissal, reduced motion, and mobile operation where applicable.
- [x] Relevant existing interaction checks and check, lint, and build pass. Record any asset-size change rather than claiming an unmeasured performance gain.

## Final integration evidence

See [migration results](../../../docs/lumos-migration-results.md) for commands, visual comparisons, bundle measurements, and limitations. The built-route checks cover both themes at 320/390/1280 pixels; search additionally covers 640 pixels. Content, metadata, keyboard interactions, enlarged text, and shared-token propagation were checked. The experiment remains separate from master.
