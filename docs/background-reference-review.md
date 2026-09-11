# Background research for Live with Ayoub

Reviewed September 11, 2026. Research only; no application code changed.

## Recommendation

Keep the selected Scholarly inspired colors and try a plain ivory background first. The existing portrait, serif heading, teal primary link, and cream cards already provide identity. My design judgment is that repeating geometry adds too many competing edges around this compact stack of links. Making tiles smaller increased their density; it did not address that composition problem.

The current background's fit is **6/10**, a subjective Refactoring UI assessment, not an accessibility score. To improve it: remove repetition behind the reading column, preserve the primary link's visual priority, and judge the page with the development controls collapsed. A contrast pass alone cannot establish whether a page feels comfortable or composed.

## References inspected

I used [Astro's August roundup](https://astro.build/blog/whats-new-august-2026/#themes--templates) and the [Tailwind showcase](https://tailwindcss.com/showcase) to find relevant examples. This is a shortlist for this site's purpose, not an objective ranking of the best websites. The observations below come from live desktop screenshots in light mode, rather than promotional thumbnail images.

| Reference | Observed background treatment | What to borrow |
| --- | --- | --- |
| [Scholarly](https://astro-theme-scholars.pages.dev/) | Predominantly warm off-white, with a faint cool wash near the profile image. Teal links and lightly tinted labels. No repeating all-page pattern visible. | Closest match. Keep the warm base and restrained teal. If decoration is needed, contain it near the portrait. |
| [Tailwind Spotlight](https://spotlight.tailwindui.com/) | White central content area, subtly darker outer margins and a faint boundary. Photos and typography carry the visual interest. | Separate the page from its surroundings using two close neutral tones, without adding texture. Avoid adding another strongly outlined panel around already boxed cards. |
| [Steph Ango's Flexoki page](https://stephango.com/flexoki) | Plain cream canvas, dark text, small navigation, and ample uninterrupted space around prose. | Paper character can come from color alone. This is a background reference, not a recommendation to reopen palette selection. |
| [Monograph](https://monograph.xocoweb.workers.dev/) | Plain light canvas, strong headlines, fine section rules, and blue metadata. | Let content and spacing establish hierarchy. The [author's listing](https://astro.build/themes/details/monograph/) explicitly describes its monochrome palette and restrained accent. |

Flexoki's creator describes using Oklab to develop perceptual relationships, but also explains that mathematically even colors can appear washed out in actual use. Color science informs a palette; it does not automatically produce an appealing composition. Its neutral system has separate background, interface, and text roles. [Creator's explanation](https://stephango.com/flexoki).

## What makes a background work here

- It stays visually quieter than the link titles. Repeated lines introduce additional shapes even when each line is faint.
- It gives text a stable backdrop. Keep patterns, photographs, and stronger gradients outside unboxed descriptions and navigation.
- It reinforces the existing color family. The selected ivory and teal already do this; extra colors are unnecessary.
- It works beyond the first screen. A decorative hero can end; an all-page repeat continues competing with every later section.
- It survives a narrow viewport. Desktop side decoration has little useful space on a phone.
- It keeps accessibility and comfort separate. Verify required contrast, then inspect density and hierarchy visually. Neither a pale background nor a high contrast ratio proves universal eye comfort.

These are design recommendations for this page, not measured usability-study findings. See [background principles and accessibility sources](background-principles-research.md) for the underlying guidance.

## Next comparison, if implemented

Hold the selected palette, content, typography, and card layout constant. Compare only:

1. **Plain ivory**, `#fbfaf6`, with no overlay. Recommended baseline.
2. **Contained wash**, a broad, very faint cool tint near the portrait that fades out before the link list. Inspired by the observed Scholarly treatment; exact values require visual comparison.
3. **Neutral frame**, slightly darker warm outer margins around a plain reading area on wide screens. Collapse the framing on phones. Inspired by Spotlight.

If an Islamic motif is still wanted, test one small ornamental divider or a cropped header detail separately. It should have a specific location rather than repeat behind every section. Do not combine that experiment with all three background treatments at once.

No package is needed for these options. Background generators help produce effects; they do not decide which effect fits the content. Start with the least decorated version and add only what improves the actual page.

## Limits

This review did not audit accessibility or performance of the reference websites. A Quiet Publication's catalogue page could not be retrieved and was excluded. No new background was implemented or contrast-tested in this research pass.
