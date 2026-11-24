# Review the completed homepage experience

Status: resolved
Blocked by: 01 — Homepage mission and resource paths

## Outcome

Review the implemented homepage against [the spec](../spec.md) as a visitor and verify the integrated result. Fix small discrepancies found during review, or document substantial follow-up work separately.

## Acceptance criteria

- Walk through finding the beginner guide, live books, an article, printables, and Ko-fi from the homepage; record destinations and any friction. Check that descriptions are honest and that personal reflection is not presented as scholarly authority.
- Check existing section-anchor URLs and free Quran eligibility text, plus shared navigation and support on the pages affected by ticket 01. Confirm the pamphlet route and its QR journey are unchanged.
- Inspect narrow and desktop layouts, both themes, enlarged text, and keyboard focus, and note any remaining accessibility or usability issues. Review whether the page is compact and understandable, not just whether links work.
- Confirm ticket 01's required project checks and browser verification passed on the final changes; rerun relevant checks only when fixes or unresolved concerns warrant it. Record evidence and outstanding limitations below.

## Completion evidence

- **Standards review.** Compared `83cb1a4` with `origin/master` (`c01ba5e`). The homepage uses the shared Lumos controls and tokens, one main heading, and nested resource headings. The shared header, support variants, and search destinations remain in use. Fixed one existing standards issue: the Quran Project card now states the one-copy limit confirmed in ticket 01. Both offers describe who qualifies and the Quran Project card directs readers to check delivery eligibility and postage. No orders were placed. [The Quran Project](https://www.quranproject.org/The-Quran-Project-1-p)
- **Spec review.** In the built preview, followed the welcome to `/start/`, the books shortcut to `/#books`, Articles to `/articles/` and then `/articles/preparing-for-marriage/`, Printables to `/printables/`, and support to `/#support`. The sample article explicitly identifies the author's reflection and separately attributes its Quran translation. All five paths were direct and understandable. The support card describes voluntary support for time, materials, outreach, and broader work, with the existing goal and Alpha Bravo Media reference. The linked short URL redirected to the existing Ko-fi tip page. Ko-fi returned HTTP 403 to the command-line client, so the payment page itself remains unverified.
- Opened direct URLs for `#books`, `#read`, `#copies`, `#articles`, `#join`, `#watch`, and `#support` and confirmed that each target came into view. The beginner guide, articles index and sample article, printables, search, and biography each rendered one main heading, shared navigation with a working mobile menu, and one link to Ko-fi. The pamphlet route and content have no diff from `origin/master`, and the printed short link reached the production `/start/` with HTTP 200.
- Tested keyboard order and visible focus for the guide and all four shortcuts in Chromium at 320 and 1280 CSS pixels, in light and dark with 100% and 200% root text size. No horizontal overflow occurred in the homepage matrix. Reviewed viewport captures at enlarged text. The narrow layout wraps the shortcuts into a vertical stack while keeping each control readable and in order. At 390 pixels and 200% text, the playlist and share headings had the same one-pixel scroll-box differences in the baseline and the new build, without horizontal overflow. The intermittent pamphlet title overflow reported in ticket 01 did not reproduce in this run at 320 pixels and 200% text on either build.
- `pnpm check`, `pnpm lint`, `pnpm build`, `pnpm test:search`, and `pnpm test:audit` passed after the eligibility wording change. The existing Zod deprecation hint remains. Confirmed the final heading and copy in `pnpm dev` and exercised the integrated journeys in `pnpm preview`. T3 preview could not produce screenshot frames, so the review used local Chromium. Ticket 01 records the optional script limitations. The live-books script also assumes the cover immediately follows the header, which predates the specified welcome and shortcut layout.

## Comments

None yet.
