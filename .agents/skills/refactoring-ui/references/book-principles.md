# Book principles

Original summaries of *Refactoring UI* by Adam Wathan and Steve Schoger, 2018, based on the supplied 252-page PDF. Page numbers below are one-based PDF pages and match printed numbers where present. Front matter occupies pages 1-6. All pages were covered by text extraction and reading; representative visual examples were also inspected. These notes retain design decisions and exceptions without reproducing the book's prose or illustrations.

Read the section relevant to the current problem. The skill's workflow governs implementation and verification. Modern implementation adaptations are identified separately below.

## Starting from scratch, pages 7-34

- Begin with a concrete user task and its necessary controls. Designing the application shell first asks navigation questions before features provide answers.
- Explore structure at low fidelity. Grayscale makes spacing, size, and contrast carry the hierarchy. Move to a working interface once the direction is clear; disposable sketches do not need polishing.
- Implement a small useful feature, then resolve real edge cases in short design/build cycles. Include only functionality that will actually ship.
- Coordinate typography, color, corner treatment, and language with the desired personality. Use the audience and brief rather than imposing one aesthetic on every project.
- Narrow recurring choices into scales. Compare a candidate with neighboring scale values rather than adjusting one pixel at a time. Define further scales as recurring decisions arise.

Use this when a new page has no direction or design work is expanding ahead of implementation. A usable feature should supply evidence for the next layout decision.

## Hierarchy is everything, pages 35-64

- Assign different emphasis to primary, supporting, and incidental information. Weight and contrast often establish this without extreme font sizes.
- Reduce competing emphasis when the intended focus cannot stand out. This applies to entire sidebars as well as individual links.
- On colored backgrounds, choose supporting text in relation to that background. Generic gray can look unrelated; translucent white can look disabled or inherit a noisy image underneath.
- Omit a data label when format or context explains the value, or combine the explanation with the value. This advice does not remove form labels. In a specifications list, emphasize labels when users scan for the property name first.
- Choose heading elements for document structure and visual treatment for the screen's task. An account-page heading need not compete with account controls.
- Balance visual area with contrast. A solid icon can overpower adjacent text; a softer color can restore balance. A slightly thicker, softer border can separate content without a harsh dark line.
- Style actions by importance as well as meaning. A destructive action can be secondary on the main screen and prominent in its confirmation dialog.

Use this when every element competes or important content is hard to find. Check which element attracts attention first and whether that matches the task.

## Layout and spacing, pages 65-100

- Try more space than seems necessary, then reduce it in the complete layout. Keep density when users benefit from seeing more information at once.
- Build spacing and sizing scales with small steps at the small end and larger steps at the large end. Every multiple of four still leaves too many nearly identical large values.
- Give each region the width its content needs. A narrow form may sit beside explanatory text without stretching its fields. A wide table may legitimately need a wider container.
- Use grids where proportional growth helps. Sidebars often need a stable content width while the main region flexes. A bounded card should shrink only when available space requires it.
- Reassess proportions across sizes. Large headings usually need a greater reduction than body copy; button padding and text need not scale at the same rate.
- Make membership clear through spacing. Keep labels close to inputs, headings close to the content they introduce, and wrapped list-item lines closer than separate list items.

Use this for clutter, excessive width, awkward breakpoints, or ambiguous grouping. Check intermediate widths as well as mobile and desktop.

## Designing text, pages 101-136

- Choose a restricted type scale with useful interface sizes. A mathematical ratio is an option; a hand-picked scale can supply the intermediate sizes a UI needs.
- Avoid accidental compounding through nested relative-to-parent type sizes. Inspect the computed result, not just the declared token.
- Choose fonts for legibility at the intended size. A display face may work poorly for small controls even after tracking changes. Popularity and weight-count heuristics help find candidates but do not prove quality.
- Aim for roughly 45-75 characters per line in ordinary prose. An image or other large component can extend beyond that reading width.
- Align mixed-size text using its baseline. Tune line height for font size and line length: long lines and small text generally need more separation than large headlines.
- Make inline links identifiable within prose. Link-heavy navigation can use quieter emphasis so every item does not compete equally.
- Align text with its language direction. Reserve centered text for short blocks; align numeric columns for comparison. Justified prose needs careful word spacing and hyphenation where supported.
- Trust default tracking first. A text face used for a large heading may benefit from tighter tracking; Latin all-caps labels may need wider tracking. Judge the actual script and font.

Use this for difficult reading, uneven text rows, or oversized mobile headings. Check realistic text, wrapping, and the fonts that actually load.

## Working with color, pages 137-170

- Treat the palette as neutrals, primary colors, and supporting or semantic colors, each with enough shades for actual roles. The book suggests roughly 8-10 neutrals and 5-10 shades for colors needing a full range. These are starting points, not quotas.
- Pick a useful middle shade, then a dark text shade and a pale background shade. Fill the gaps and adjust while using the palette in real components. Avoid accumulating almost-identical ad hoc shades.
- HSL makes hue, saturation, and lightness separately adjustable. Equal HSL lightness does not mean equal perceived brightness, and HSL is not HSB.
- Light and dark shades can need more saturation to preserve their color. Small hue shifts can add brightness or richness; choose the direction relative to the original hue rather than shifting every palette toward the same color.
- Neutrals can carry a warm or cool tint when that supports the personality. Neutral gray and pure black remain valid choices when the brief calls for them.
- Keep less-important colored elements quiet with a pale background and darker foreground. Check contrast after changes instead of assuming white text works on a brand color.
- Pair color with another cue for status or comparison, such as text, icons, line styles, or direct labels. Hue differences alone are insufficient.

Use this for mismatched shades, excessive accent colors, or weak text on colored panels. Measure contrast separately from judging harmony.

## Creating depth, pages 171-198

- When simulating lighting, keep a consistent direction. Top highlights with shadows below suggest raised objects; inner top shadows with lighter lower edges suggest recessed objects.
- Assign shadows by intended elevation. A control, dropdown, and modal can occupy different levels; raising or pressing an element can change its shadow to explain the interaction.
- A two-part shadow separates a broad, soft cast shadow from a tight contact shadow. The contact shadow should diminish as apparent elevation increases.
- Flat interfaces can express depth through lighter or darker surfaces, crisp offsets, or overlap. Shadows are optional.
- Overlap establishes layers. A background-colored gap can prevent overlapping images from colliding visually.
- Keep physical cues restrained. Extra realism that distracts from the interface undermines the purpose of depth.

Use this when layering is unclear. Check whether apparent elevation matches behavior and overlap survives responsive layouts.

## Working with images, pages 199-218

- Design around suitable, high-quality imagery. A composition that works only with a perfect placeholder may fail with the available assets.
- Text over photography needs consistent local contrast. An overlay, contrast adjustment, color treatment, or restrained text glow can help. Judge the actual image region behind the text.
- Match artwork to its intended size. A small SVG icon remains sharp when enlarged but may become optically crude. Use a suitable illustration or give the smaller icon a larger container.
- Crop or capture a focused application view instead of shrinking a detailed screenshot until its text is unreadable. Simplify tiny logos deliberately for their display size.
- Contain variable uploads in consistent frames. Choose an appropriate crop; a subtle inner shadow or translucent edge can separate an image from a similar page background.

Use this for weak hero imagery, unreadable screenshots, or inconsistent thumbnails. Check narrow-screen crops, extreme source ratios, and missing media.

## Finishing touches, pages 219-248

- Improve existing details before adding elements. List markers, quotation marks, link treatment, and selected control states can carry personality.
- A restrained accent border or background treatment can distinguish a region. Keep patterns and decorative graphics quiet enough for content to remain dominant.
- Design the empty state as an actual first-use experience. Explain the state and provide a useful action. Illustration is optional. Hide supporting controls only when they truly have no use in that state.
- Test whether spacing or different backgrounds already separate regions before adding borders. Retain borders when they carry necessary grouping or control visibility.
- Adapt familiar containers to the information. A dropdown can group related choices; a table can combine related, non-independently-sortable data; a radio group can use selectable cards.

Use this after structure and readability work. Preserve expected semantics and interaction while changing presentation.

## Leveling up, pages 249-252

Study specific decisions in interfaces you admire, especially choices you would not have made. Recreating a small interface and comparing the result can expose differences in spacing, typography, and layering. Capture a reusable decision with its context rather than copying an entire visual style into every project.

Use this for deliberate practice or when a reference design reveals a technique worth testing.

## Modern implementation adaptations

These are implementation guidance for this revision, rather than claims about the 2018 book.

- Keep the project's established CSS system and color representation. The HSL discussion does not require migrating a working palette. Prefer existing tokens and components over adding a dependency.
- Use text sizing that respects user settings, direction-aware alignment, and semantic images with suitable alternative text. Decorative presentation should not replace accessible form controls or headings.
- Keep links and controls discoverable for keyboard and touch users. Distinguish a first-use empty state from a filtered zero-result state, where filters may be needed to recover.
- Verify supported themes independently. Dark mode, animation implementation, and extensive chart/accessibility patterns in the older reference files are supplementary topics, not book chapters.
- Correct the book's approximate text-size shorthand using [W3C's contrast definition](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum). Normal text needs 4.5:1. Large text needs 3:1 and means 18pt regular or 14pt bold, equivalent to 24 CSS px or approximately 18.67 CSS px. Do not infer accessibility from the visual examples.

## Why revise the previous skill this way

| Change | Reason |
| --- | --- |
| Replace mandatory 10/10 scoring with observed findings and verification | A score without a rubric cannot establish usability or correctness. |
| Put shared workflow in the entrypoint and section detail here | Agents can act without loading every topic on each task. |
| Restore feature-first design, independent sizing, optical image sizing, and first-use states | These lessons were missing or underdeveloped in the old summary. |
| Replace fixed dimensions and blanket style rules with context-sensitive decisions | Dense dashboards, restrained hubs, and editorial pages have different needs. |
| Correct linear spacing, mandatory modular type scales, and the large-text threshold | The first two misrepresented the book's advice; the last confused pixels with points. |
| Separate supplements and modern adaptations from book summaries | Guidance has clear provenance, and dated snippets do not become universal requirements. |
| Keep the entrypoint and references together without PDF or framework dependencies | The same folder supports other projects without loading the book again. |
