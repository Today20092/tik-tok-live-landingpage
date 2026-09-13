# Site migration review

Reviewed September 12, 2026, after the article spacing fix.

## Finding and fix

Lumos's global leading trim also compressed text outside articles. The learning
recommendation headings and copy, Journal resource labels, sharing introduction,
and footer copy still used spacing designed for full line boxes. The result was
crowded text even though the individual margin and gap declarations existed.

`src/styles/lumos/shared.css` now disables the trimming pseudo-elements for
headings and paragraphs inside `.site-shell`. This fixes the shared cause across
the actual site without editing the vendored Lumos foundation. The development
reference includes an example. Article-specific header gaps remain unchanged.

## Coverage

- All 11 built pages: homepage, Pocket, Journal, Focus, article index, three
  published articles, search, 404, and Ko-fi preview.
- Automated layout checks at 320, 390, 768, and 1280 pixels, both themes, and
  100% and 200% text. Recommendations and native disclosures are expanded.
- Visual review of mobile homepage, article index, search, Journal, Focus, and
  Ko-fi preview. The sharing and footer sections are included.
- Existing checks cover search queries and filters, shared shell consistency,
  keyboard navigation, image viewer focus, theme persistence, and all six
  articles including drafts. The development reference and podcast preview are
  included in the existing Lumos check.
- A source scan found no missing stylesheet selectors among the literal legacy
  spacing, typography, and responsive utility classes checked. Dynamic classes
  are covered only where exercised by the browser checks.

No additional functional regression was found in the tested paths. The new
`scripts/check-site-layout.mjs` discovers the built routes instead of maintaining
a separate page list. It checks full text boxes, horizontal overflow, and text
bounds in the hero, video headings, and sharing heading.

The audit is a Chromium review, not a full cross-browser accessibility audit.
Subjective spacing score: 7/10 before, 9/10 after. Firefox, Safari, and reader
feedback would be needed before calling the review complete across browsers.

## Verification

`pnpm check`, `pnpm lint`, and `pnpm build` pass, with the existing Zod
deprecation hint. Browser checks use the existing Playwright installation via
`PLAYWRIGHT_MODULE`, with the built preview on port 4321 and dev on port 4322.

Run `node scripts/check-site-layout.mjs`, `node scripts/check-lumos.mjs`,
`node scripts/check-search-ui.mjs`, and `node scripts/check-article-layout.mjs`.
