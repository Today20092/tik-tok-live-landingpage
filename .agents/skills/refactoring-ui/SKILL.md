---
name: refactoring-ui
description: Improve frontend visual design when building an interface, polishing components, or reviewing hierarchy, spacing, typography, color, depth, and imagery. Apply the existing project's design system and use concrete visual checks.
license: MIT
metadata:
  author: wondelai
  version: "2.0.0"
---

# Refactoring UI

Apply practical design principles from Adam Wathan and Steve Schoger's *Refactoring UI*. Preserve the user's brief, brand, content, and project conventions. This skill works with any frontend stack and requires neither Tailwind nor the source PDF.

## Workflow

1. **Establish the task.** Identify the user's main action, necessary content, and audience. Inspect the current interface and shared components and tokens before choosing changes. Done when the primary action, constraints, and reusable patterns are identified.
2. **Resolve structure.** For new work, design one useful feature with realistic content before deciding the surrounding navigation. For existing work, find the largest hierarchy or grouping problem. Use a grayscale sketch or preview when color obscures the issue. Done when primary content and actions are distinguishable and related elements form clear groups.
3. **Refine in context.** Fix layout and text before decorative details. Reuse project scales; add a token or variant only for a demonstrated gap. Read the relevant section of [book principles](references/book-principles.md) when choosing or diagnosing a treatment. Done when the requested change works within its consuming page and preserves required behavior.
4. **Verify the result.** Inspect the rendered UI at narrow and wide widths, with enlarged text and keyboard focus. Check supported themes and relevant empty, error, loading, selected, and long-content states. Run applicable project checks. Done when observed regressions are fixed and unavailable checks are disclosed. For advice-only work, identify evidence and proposed checks without claiming implementation.

Report specific changes and their user benefit, with checks performed. In a review, prioritize actionable findings and their locations. Use observed problems rather than an invented numerical design score.

## Decision rules

- Establish emphasis through size, weight, contrast, and spacing together. If the main action is lost, quiet its competitors before making it larger. Keep secondary content readable.
- Give data labels the prominence needed for scanning. A specification label can deserve more emphasis than its value. Preserve explicit form labels and semantic heading structure independently of visual styling.
- Make gaps between groups larger than gaps within them. Start spacious when exploring, then adjust to the task. Dense operational interfaces can be intentional.
- Size content for its use. Constrain prose and forms; let data-heavy areas use the space they need. Prefer a content-sized sidebar and flexible main area over arbitrary percentage columns. Rebalance large headings and padding independently on small screens.
- Use a small, deliberate type scale. Choose readable fonts for their actual size and script. Align mixed-size text on its baseline. Let line length and font size guide line height; align prose with its reading direction.
- Use named foreground/background roles and a bounded palette. Tune shades in real components. Colored panels need compatible foreground colors; transparency can make text unreliable over images. A quiet badge can use dark text on a pale tint.
- Match depth to elevation and state. Flat designs can use background contrast or overlap. Keep shadows and decoration subordinate to content.
- Use images at an appropriate crop and resolution, and icons near their intended optical size. Check text over the actual image and its responsive crops. Empty states should explain what happened and offer an appropriate next step.
- Preserve accessible names, visible focus, discoverable links, and non-color status cues. Required text contrast is at least 4.5:1, or 3:1 for large text, defined as at least 24 CSS px regular or about 18.67 CSS px bold. Measure actual foreground/background pairs; a palette name cannot guarantee contrast. See [W3C contrast guidance](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum).

## References on demand

- [Book principles](references/book-principles.md): section summaries, page ranges, exceptions, and reasons for this revision. Start here for design decisions.
- The pre-existing supplements below extend beyond the book. Load one only when its topic is needed. Treat sample values, framework snippets, and aesthetic prescriptions as examples; the workflow and decision rules above take precedence. Verify version-sensitive code and accessibility requirements against current official documentation before implementing them.
  - [Advanced patterns](references/advanced-patterns.md): forms, menus, navigation, and component states.
  - [Theming](references/theming-dark-mode.md): theme tokens and dark-mode implementation.
  - [Accessibility](references/accessibility-depth.md): keyboard behavior, focus management, and assistive technology checks.
  - [Data visualization](references/data-visualization.md): chart selection and dashboard composition.
  - [Animation](references/animation-microinteractions.md): motion when it communicates an interaction or state change.
