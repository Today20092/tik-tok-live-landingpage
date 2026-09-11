# Background principles for the Quran resource hub

Research date: 11 September 2026. Research only; no application changes. The recommendations below are design judgments for a compact resource hub with an ivory/teal scholarly palette, not claims that one background is objectively best.

## 1. Let the background clarify the content hierarchy

**Source evidence:** Refactoring UI explicitly recommends reducing excessive borders and separating elements with space, background changes, or shadows. Its published contents place background decoration among finishing touches, alongside chapters on hierarchy and consistent text contrast. Its palette offering includes shade scales and example interfaces rather than isolated swatches. [Refactoring UI, Adam Wathan and Steve Schoger](https://refactoringui.com/)

**Application judgment:** Start with the selected ivory background, opaque reading surfaces, and teal accents. Compare that plain baseline before adding an effect. A repeated page-wide motif adds visible edges between every card; in this particular compact hub, those edges may compete with the links. A small ornament near the title or a footer divider could retain Islamic visual identity without placing a repeating pattern behind the whole page.

## 2. Use showcases for composition, not as a prescription

**Source evidence:** Tailwind’s official showcase spans hosting, commerce, developer tools, and personal-site templates. Its public Spotlight demo is a personal site organized around an introduction, articles, and supporting information. These are useful sources of examples, but neither inclusion in a showcase nor use of Tailwind establishes that a background suits this hub. [Tailwind showcase](https://tailwindcss.com/showcase), [Spotlight demo](https://spotlight.tailwindui.com/)

**Application judgment:** Borrow separation, spacing, and controlled emphasis from content-oriented sites. Do not adopt a large marketing hero, animated particles, or a dark technical grid simply because a software-company site uses it well. The test is whether the resource titles and eligibility descriptions remain the first things a visitor notices.

## 3. Contrast is measurable; visual calm still needs judgment

**Requirement:** WCAG AA normally requires text contrast of at least 4.5:1. The 3:1 exception applies to large text: at least 18pt (24 CSS px), or 14pt bold (approximately 18.67 CSS px), with equivalent treatment for other scripts. A heading is not automatically large text. [WCAG 2.2: Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)

**Technique:** Evaluate the background immediately behind the letters. With an image, pattern, or gradient, testing only the base background color is insufficient; the actual composited background must preserve the required ratio wherever text appears. Solid text surfaces are one practical way to do this. [W3C Technique G18](https://www.w3.org/WAI/WCAG22/Techniques/general/G18.html)

**Requirement scope:** Non-text contrast of 3:1 applies to visual information needed to identify relevant controls/states and understand graphics. It is not a requirement to make purely decorative geometry 3:1 against the page. [WCAG 2.2: Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html)

**Application judgment:** A contrast pass does not establish that a dense pattern feels comfortable. Test desktop and mobile with the actual content, including the smallest explanatory text. Keep any ornament outside reading areas, with no animation required.

## 4. An npm package generates an effect; it does not select a good design

**Source evidence:** GeoPattern’s official repository documents an npm-installable generator that produces tiling SVG patterns from a string, with options for color and pattern selection. It also exposes SVG output. That is an implementation capability, not evidence of readability or suitability for a religious resource hub. [GeoPattern repository](https://github.com/btmills/geopattern)

**Application judgment:** Do not add a dependency to solve the present uncertainty. For a fixed background, plain CSS or a static SVG is enough. Decide the composition first; consider a generator only if the site later needs many dynamically generated patterns.

## Recommended comparison

Keep the scholarly palette constant and compare only three compositions: plain ivory; ivory with a very broad, restrained teal tint restricted to the upper margins; and ivory with a single small geometric ornament near the heading or footer. Prefer plain ivory as the baseline. These are proposed directions, not implemented or user-tested findings. The sources do not establish a universal ideal opacity, tile size, or background hue.
