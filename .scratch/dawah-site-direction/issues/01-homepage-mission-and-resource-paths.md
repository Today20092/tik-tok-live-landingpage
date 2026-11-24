# Homepage mission and resource paths

Status: resolved
Blocked by: none

## Outcome

Deliver the first homepage milestone described in [the spec](../spec.md): a compact landing page and link hub that welcomes visitors to Islam with Ayoub and makes existing resources easy to find. Read the full spec and project instructions before starting.

## Acceptance criteria

- Lead with a concise mission-oriented heading and introduction, a prominent direct link to `/start/`, and immediately afterward quick links to books from the live, articles, printables, and support. Quick links go directly to the relevant page or section without requiring a menu or sign-in.
- Make discovering Islam, applying guidance, and sharing resources understandable through existing Quran and book resources, articles, and printables. Welcome visitors without requiring them to identify their faith. Avoid empty categories and unnecessary duplication.
- Keep existing Quran and hadith books, online Quran, free-copy offers and their eligibility limitations, learning videos, TikTok, YouTube, and other useful existing destinations reachable. Preserve existing `#books`, `#read`, `#copies`, `#articles`, `#join`, and `#watch` links or equivalent compatible anchors.
- Include a visible support link and a clear on-page explanation linked to the existing Ko-fi destination. Describe voluntary support for Ayoub's time and work accurately without implying a registered organization, restricted fund, or guaranteed outcome. Retain access to support on other pages. Preserve existing claims about broader work and the monthly goal unless their accuracy can be established; do not invent claims.
- Update the homepage's title, description, social metadata and structured data consistently with the broader purpose, and adjust the header's home label if needed. Preserve canonical URLs, search, article and printable navigation, `/start/`, and the pamphlet QR journey.
- Follow the project's shared Lumos design system; consider T3 Code's clarity without copying its branding. Ensure the main heading and document outline remain coherent when reusing the current reading-resources component.
- Verify desktop and narrow screens, both themes, keyboard focus, enlarged text, links and anchors, including shared components on consuming pages. Run `pnpm check`, `pnpm lint`, and `pnpm build`, and exercise `pnpm dev` and `pnpm preview` for relevant functional and visual checks. Record results and limitations below.

## Scope

No updates feed, mailing list, messaging channel, bot, analytics setup, or empty media archive. Do not rewrite the pamphlet companion or existing articles. Keep changes focused on delivering the integrated homepage experience.

## Completion evidence

- Reviewed implementation `cb9448b` against the specification. The homepage has one mission heading and a direct `/start/` action, followed by `#books`, `/articles/`, `/printables/`, and `#support`. The books and Quran sections follow a nested heading outline. The homepage title, description, Open Graph, Twitter card, JSON-LD, and production canonical agree.
- Exercised `pnpm dev` and `pnpm preview` in Chromium. Checked the homepage at 320, 390, and 1280 CSS pixels in light and dark at 100% and 200% text. The homepage fit at each size, and Tab reached the beginner guide and all four quick links in order with visible focus at 320 and 1280 pixels. Inspected the welcome and nearby books at desktop and at enlarged mobile text in the built preview. The dev server rendered the correct content and links, with a larger header portrait and different spacing than the built preview. Verified all six existing fragment links plus `#support` reached their sections.
- Checked `/start/`, `/articles/`, `/printables/`, `/search/`, the biography and a regular article for one main heading and a Ko-fi link. Confirmed the printed short link redirects to the production `/start/` URL and the pamphlet source files are untouched. The full homepage support card retains the existing Ko-fi destination, voluntary monthly invitation, Alpha Bravo Media reference and 10-supporter goal.
- The live books, online Quran, free-copy offers, learning videos and social profiles retain their existing destinations. One Message Foundation confirmed its USA, non-Muslim and one-copy limits. The Quran Project listed £0.00 and a one-copy limit for its non-Muslim option. Shipping was not tested through checkout. [One Message Foundation](https://go.alphabravomedia.co/islam-free-clear-quran) · [The Quran Project](https://www.quranproject.org/The-Quran-Project-1-p)
- `pnpm check`, `pnpm lint`, `pnpm build`, `pnpm test:search`, and `pnpm test:audit` passed. Astro reported one existing Zod deprecation hint. The preview search for “Islam” returned eight result entries, including the homepage and beginner guide. The optional search UI script still expects exactly four results. The optional Lumos script expects a footer-only support link and lists retired variant routes. Its homepage support check was covered directly against the inline card.
- The broad layout script flagged a three-pixel vertical scroll-box difference on existing playlist and share headings at 390 pixels and 200% text. A separate check found intermittent narrow-screen overflow from the pamphlet companion's existing video titles, outside the shared navigation and support controls reviewed here. No pamphlet edits were made.

## Comments

None yet.
