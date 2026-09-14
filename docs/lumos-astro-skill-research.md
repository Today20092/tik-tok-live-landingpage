# Lumos + Astro agent skill

Researched 13 September 2026. Research and recommendation only; no application changes.

## Recommendation

**No, this site does not strictly need another skill.** Its agent instructions already require reading the local design-system guide, which records the pinned framework, overrides, reference page, and verification. A second copy would create another document to keep synchronized. This agrees with the earlier [agent-guidance research](lumos-agent-guidance-research.md).

**A small reusable skill is still useful** for repeated Lumos work across projects: identify the installed adaptation, reuse its components and tokens, diagnose the cascade, and verify affected pages. Keep project-specific values and commands in [the local guide](lumos-design-system.md). The skill should teach a workflow rather than reproduce upstream documentation or sell the framework.

## Verified findings

- This is **Lumos for Astro**, not Lumos for Webflow. Upstream explicitly separates their conventions. It uses plain CSS and custom properties. [Upstream agent instructions](https://github.com/lumosframework/lumos-for-astro/blob/main/CLAUDE.md).
- Lumos establishes `base`, `patterns`, `components`, then `utilities` before importing styles. Tokens and resets establish defaults, patterns capture shared declarations, components customize them, and utilities adjust individual instances. This makes override intent explicit. [The cascade](https://lumosframework.com/docs/concepts/the-cascade/).
- For normal declarations at the same origin, later layers outrank earlier layers before specificity is compared. Normal unlayered declarations outrank layered declarations. `!important` reverses layer precedence, so “utilities always win” is an unsafe absolute. [CSS layer reference](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@layer).
- Upstream wraps component CSS in `<style is:global>` and `@layer components`, relying on component-prefixed names to avoid collisions. That is its convention, not a prerequisite for layers. Astro scopes `<style>` by default, supports layers inside scoped styles, and offers `is:global` to opt out. Preserve the consuming project's established approach; do not remove scope throughout an existing site just to match a starter example. [Lumos cascade](https://lumosframework.com/docs/concepts/the-cascade/), [Astro styling guide](https://docs.astro.build/en/guides/styling/), [Astro documentation component using scoped layers](https://github.com/withastro/docs/blob/main/src/components/starlight/PageSidebar.astro).
- Upstream recommends component/variant reuse before custom CSS and treats a repeated group of utilities as a candidate variant. The local adaptation adopts Section and Heading plus its existing resource-card/control patterns; newer upstream components and props are not automatically available here. [Upstream building guide](https://github.com/lumosframework/lumos-for-astro/blob/main/LUMOS.md), [local design system](lumos-design-system.md).
- The local guide pins Lumos for Astro 0.0.3 to `1a8e1777ff072a3faeaebddcadb6ff80c6951c38`. Its foundation lives under `src/styles/lumos/`, it preserves native component CSS and existing interactive/content behavior, and it documents explicit theme and text-line-box choices. Upstream 0.x APIs remain beta; upgrades require reviewing the local diff. [Local design system](lumos-design-system.md), [upstream README](https://github.com/lumosframework/lumos-for-astro/blob/main/README.md).

## Benefits and limits for this site

The practical reasons to keep Lumos are a shared design vocabulary, reusable presentation, and predictable overrides. Those mechanisms can reduce drift when agents follow them; they do not enforce consistency alone. The site already has checks for shared-style drift, theme behavior, and layout. [Local migration results](lumos-migration-results.md).

Do not promise faster loading, smaller CSS, guaranteed accessibility, or measured agent productivity. The recorded migration increased gzip CSS from 19,983 to 21,358 bytes and explicitly claimed no loading-speed improvement. Framework updates also require maintaining vendored beta files. These are historical experiment measurements, not a fresh benchmark of this checkout. [Local migration results](lumos-migration-results.md).

## Suggested skill scope

Use the skill when creating or editing Lumos-based Astro pages, components, tokens, themes, or cascade rules, and when reviewing a Lumos upgrade. Its workflow should:

1. Read repository instructions and its design-system guide; identify its actual Lumos files and pinned revision.
2. Inspect existing component APIs, variants, tokens, and callers before selecting an implementation.
3. Put a change at its owning level: token, shared pattern, component/variant, or isolated utility. Diagnose layer, scope, selector match, and importance before escalating specificity.
4. Consult current official docs when framework behavior or APIs matter; compare them against the installed revision.
5. Run the project's relevant checks and inspect consuming pages in both themes, at narrow widths, with enlarged text and keyboard focus. Report checks actually completed.

Avoid a scaffold generator, a bundled component library, copied upstream rulebooks, a new styling runtime, or automatic upgrades. None is needed for this workflow. Keep the rationale in this research note and the skill itself operational.

## Retrieval

Queried Context7 IDs `/lumosframework/lumos-for-astro` (exact upstream repository, Medium source reputation) and `/withastro/docs` (official Astro documentation, High reputation). Retrieved the requested cascade page directly over HTTPS after the web reader rejected it and the HTML indexing helper failed with a missing dependency. Current upstream guidance does not override the pinned local implementation. No application build was needed for this research-only note.
