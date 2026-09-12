# 03: Migrate the resource hub and its card variants

**What to build:** Visitors can browse resource links, learning videos, support links, and the hub's expandable content using the shared design system.

**Blocked by:** 2.

**Status:** resolved

## Verification

The hub's resource cards now share the same resource-card patterns as the reference page. Check, lint, build, resource destination/eligibility checks, and recommendation disclosure/order checks pass. Updated a stale video-order assertion that expected raw YouTube IDs after the existing move to short links; it now checks the rendered video titles.

- [x] Preserve resource destinations, eligibility copy, card variants, thumbnails, and existing interactions.
- [x] Use shared card, text, spacing, and control variants; add real variants to the reference page instead of creating local copies.
- [x] Verify mobile wrapping, focus, expanded states, and both themes with actual content.
- [x] The hub no longer depends on its old presentation rules; remove obsolete rules when no remaining consumer needs them.
- [x] Relevant existing checks and check, lint, and build pass.

## Final integration evidence

See [migration results](../../../docs/lumos-migration-results.md) for commands, visual comparisons, bundle measurements, and limitations. The built-route checks cover both themes at 320/390/1280 pixels; search additionally covers 640 pixels. Content, metadata, keyboard interactions, enlarged text, and shared-token propagation were checked. The experiment remains separate from master.
