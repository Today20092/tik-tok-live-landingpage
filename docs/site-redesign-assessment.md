# Site redesign: source assessment

Date: 2026-10-31. Target: `src` (slug `src`). Brief: [Confirmed redesign brief](site-redesign-brief.md).

## Evidence and limits

Two independent agents reviewed the source: Assessment A examined the visitor journey without detector output, and Assessment B ran the Impeccable detector and checked shared implementation patterns. Assessment A completed before Assessment B entered synthesis. No ignore file exists at `.impeccable/critique/ignore.md`.

The browser entry point failed with `The browser access host is unavailable`. No rendered visual review, contrast measurement, responsive inspection, interaction test, browser overlay, or full accessibility audit was completed. No visualization server was started and no temporary captures need cleanup. No numerical design or audit score is assigned. This document is a source assessment, not a completed Impeccable visual critique; no scored critique snapshot or trend was created.

The CLI detector ran once against `src`, exited successfully, and returned zero findings. There are no detector rule hits or false positives to report. This result does not establish professional visual finish or usability.

## Overall finding

The source already expresses the agreed ordering: live books, Quran resources, recent articles, further learning, optional support. The strongest opportunity is to make that journey consistent across resource disclosure, navigation, identity links, and recovery states. Visual inconsistency remains an owner-reported concern pending rendered inspection.

## Strengths to preserve

- Live books are identified and distinguished as hadith and Quran, with practical details and a free PDF where available (`src/components/ReadingResources.astro:30`).
- Free-copy eligibility and affiliate disclosures are explicit (`src/components/ReadingResources.astro:19`, `:69`, `:81`).
- Homepage articles and the article index share `ArticleList`, newest-first ordering, descriptions, and reading times (`src/components/PocketHub.astro:21`, `src/pages/articles/index.astro:7`, `src/components/ArticleList.astro:37`). This matches the owner's decision to keep chronological browsing.
- Shared controls already use tokens, minimum sizing, and keyboard focus styling. Theme control uses a named native button and handles storage failure (`src/components/ThemeControl.astro:5`, `src/styles/lumos/base.css:474`, `src/styles/lumos/shared.css:114`).

## Priorities

### P2: Main Quran choices remain hidden

`src/components/ReadingResources.astro:64` places free printed copies and alternative editions inside initially closed details elements. Reading online is directly available. Requiring expansion for the main copy choices conflicts with the confirmed brief.

Expose the primary resource destinations and eligibility directly; retain disclosures for secondary details and extra editions. Use Impeccable distill, clarify, and layout.

### P2: Mobile navigation loses current-page orientation

`src/components/SiteHeader.astro:34` computes current-page states for desktop links, while the mobile links at line 58 omit them. About is explicitly never active at line 14.

Use consistent destination matching, active treatment, and `aria-current` across both navigation presentations. Verify the resulting states on article index, individual articles, About, and search. Use Impeccable harden and adapt.

### P2: About labels point to different kinds of background

Header About and article author links lead to `why-i-started`, the article template separately recognizes `about-me`, and footer About Ayoub points externally (`src/components/SiteHeader.astro:14`, `src/pages/articles/[...id].astro:69`, `:133`, `src/components/SiteFooter.astro:37`).

Use explicit labels that distinguish Ayoub's background from the site's origin, and make identically named identity links consistent. Do not replace factual biography or invent identity claims. Use Impeccable clarify.

### P2: Search fallback messaging is incomplete

`src/pages/search.astro:56` emits loading feedback outside the no-JavaScript fallback. With JavaScript disabled, loading feedback remains alongside instructions to enable JavaScript. The failure message at line 75 points to articles above without providing a local recovery link; mobile navigation is inside Menu.

Show truthful loading, unavailable, and no-JavaScript messages, with direct links to articles and homepage resources. Verify production Pagefind behavior using a built preview. Use Impeccable harden and clarify.

### P3: Recovery could offer more direct destinations

`src/pages/404.astro:13` offers a homepage return as its only local recovery action. `src/pages/articles/index.astro:33` mentions the main page in its empty message without linking it. Shared navigation remains available, so this is an improvement opportunity rather than a blocked route.

Add relevant direct recovery links without turning these states into another menu of competing actions. Use Impeccable harden.

## Visitor journey and cognitive load

A live-stream visitor should recognize a book, reach the relevant reading or copy destination, and optionally continue learning. Current source order supports that sequence, but the closed Quran options insert an extra discovery step before the next expanded article section. Secondary learning disclosures fit the brief. Actual visible option counts, perceived density, and emotional response cannot be assessed without a render.

Specific risks: first-time visitors may interpret differently targeted About links as equivalent; mobile visitors lose page orientation; visitors without JavaScript receive misleading loading feedback on search. These findings do not establish abandonment rates or physical-device failures.

## Manual check pending

`src/styles/lumos/base.css:486` globally reduces animation and transition durations to `0.01ms`. Review whether this removes useful state feedback. No loss was demonstrated, so this is not counted as a verified defect. Preserve reduced-motion accessibility when selecting any replacement treatment.

## Next design passes

1. Select concrete visual direction and composition against the confirmed brief, using real book covers and existing content.
2. Apply the shared system across homepage, navigation, footer, article index, articles, search, and recovery states. Reuse Lumos; do not add topic filters or a new component library.
3. Use distill and clarify for hierarchy and labels; typeset, layout, and adapt for reading and responsive consistency; harden for navigation and recovery.
4. Inspect rendered desktop and mobile layouts, both themes, enlarged text, keyboard focus, and search states. Finish with polish and the project's required checks.

Questions skipped: the purpose and hierarchy interview is complete; the remaining choice is visual direction, which this source-only assessment does not select.

## Change boundary

No UI, content data, shared CSS, or configuration was changed for this assessment. Existing modifications in the working tree were preserved. Only the confirmed brief and this assessment document were added.

## Implementation follow-up — 2026-10-31

The preceding source assessment is preserved as the historical starting point. Ayoub subsequently authorized implementation. This follow-up assesses the completed UX fixes within the incumbent Lumos world; it does not retroactively select a new identity or claim an approved comp or visual contract.

### Scope and disposition

Reviewer disposition: **ship for the implemented incumbent-world scope**. The original resource, orientation, identity, search, and recovery findings have been addressed. No blocking visual issue was observed in the 20 captures reviewed below. Ship is a review disposition; deployment is not recorded here.

- Main Quran options: both free-copy rows are visible without expanding details, with non-Muslim eligibility, the Clear Quran's USA/one-copy restriction, and the Quran Project's delivery/postage caveat. Secondary editions retain a disclosure.
- Navigation: desktop and mobile share destination matching. Exact destinations use `aria-current="page"`; ordinary article pages mark the Articles section with `aria-current="location"`. About Ayoub resolves to `/articles/about-me/`, including footer and author links. The origin story retains its distinct article destination.
- Search: startup feedback is enabled by JavaScript; no-JavaScript visitors receive the fallback rather than an indefinite loading message. Failed initialization hides the unavailable interface and presents recovery guidance. Article and resource links remain directly available for empty results and unavailable search.
- Recovery: the 404 page offers direct books/resources, search, and article destinations. The article index's empty-state homepage destination is linked.

### Comparison against the incumbent system

The comparison baseline is [the local Lumos guide](lumos-design-system.md), `src/styles/lumos/tokens.css`, and the existing shared patterns in `src/styles/lumos/shared.css`. The rendered pages retain the site's Source Serif 4 headings and Source Sans 3 body/control relationship, warm light background (`--background: #fbfaf6`), deep green dark background (`#14271f`), and theme-specific resource accents. Shared controls retain the small corner token (`0.5rem`) and minimum control height (`2.75rem`); optional support retains its separate orange token (`#ff6433`). These are incumbent source values, not newly approved design primitives or sampled pixel measurements.

The captures show the documented two-column live-book pair on desktop and compact cover/detail rows on mobile, visible free-copy resource rows, straight section dividers, chronological unboxed article lists, quiet shared footer, and separate article reading composition. Search and recovery use the same type, theme, and control language. Support follows learning content rather than competing with the opening book task. No replacement token system, `DESIGN.md`, or `.impeccable/design.json` was created for this pass.

### Render review ledger

The native browser entry point remained unavailable. The project's Playwright runner supplied full-page render evidence under `.impeccable/review/`; these captures were visually inspected. Every linked capture below has disposition **ship** within this scope.

| Surface | 390px light | 390px dark | 1440px light | 1440px dark |
| --- | --- | --- | --- | --- |
| Homepage | [Ship](../.impeccable/review/home-390-light.png) | [Ship](../.impeccable/review/home-390-dark.png) | [Ship](../.impeccable/review/home-1440-light.png) | [Ship](../.impeccable/review/home-1440-dark.png) |
| Article index | [Ship](../.impeccable/review/articles-390-light.png) | [Ship](../.impeccable/review/articles-390-dark.png) | [Ship](../.impeccable/review/articles-1440-light.png) | [Ship](../.impeccable/review/articles-1440-dark.png) |
| About biography | [Ship](../.impeccable/review/about-390-light.png) | [Ship](../.impeccable/review/about-390-dark.png) | [Ship](../.impeccable/review/about-1440-light.png) | [Ship](../.impeccable/review/about-1440-dark.png) |
| Missing page | [Ship](../.impeccable/review/404-390-light.png) | [Ship](../.impeccable/review/404-390-dark.png) | [Ship](../.impeccable/review/404-1440-light.png) | [Ship](../.impeccable/review/404-1440-dark.png) |
| Search empty results | [Ship](../.impeccable/review/search-390-light.png) | [Ship](../.impeccable/review/search-390-dark.png) | [Ship](../.impeccable/review/search-1440-light.png) | [Ship](../.impeccable/review/search-1440-dark.png) |

Homepage evidence shows both live books and copy eligibility before secondary learning; article-index evidence shows a consistent dated list without topic filters; biography evidence shows the reading layout and desktop contents rail; missing-page evidence shows three direct recovery paths; search captures show the focused query field, no-results message, and local recovery links. Narrow captures use the compact header with Menu. Static captures do not establish expanded-menu semantics, search failure behavior, or keyboard operation; the automated checks below supply that separate evidence.

### Implementation verification

The implementation run reported passing `pnpm check`, `pnpm lint`, and `pnpm build`; search, audit, Quran-output, and hadith-output checks; `check-unified-site`; and `check-hub-ux`. The final lint and hub UX reruns also passed. The hub runner exercised visible copy links, About orientation, successful search, empty results, no-JavaScript behavior, and aborted search-module recovery. The unified-site output check covered shared identity, exact navigation destinations, matching mobile/desktop current-state semantics, and article structure.

`check-site-layout` passed across all built routes at four widths, both themes, and 100%/200% text sizing. Final `check-lumos` passed at 320px, 390px, and 1280px across nine routes, both themes, and 100%/200% text sizing. Its checks included shared shell, footer support focus and touch targets, overflow, theme restoration, and the intentional regression probe; final interaction checks covered theme persistence, skip link, keyboard image zoom with Escape/focus return, article contents/back-to-top, quotations, and token propagation. These results are automated browser/output evidence, not a full manual accessibility certification.

The initial detector run returned `[]`; zero detector findings remain a limited structural result and do not establish visual quality. No numerical design score, scored critique snapshot, or trend is assigned.

### Remaining optional work and limits

A replacement visual world and composition have not been chosen. They remain optional future work requiring a concrete design choice; they are not unfinished prerequisites for these shipped in-world UX fixes. The original animation-duration question was not demonstrated as a defect and is not claimed resolved here. No physical-device study, human first-visit usability study, comprehensive contrast measurement, or full screen-reader audit was performed. The long biography captures support composition review at overview scale; they do not constitute a fresh quotation-by-quotation source review. Religious-output test results do not replace the project's source-verification requirements when quotations are edited.

This documentation follow-up changes only the brief and assessment. It preserves the original assessment's change boundary as a statement about that earlier stage.

## Owner refinement follow-up — 2026-10-31

The [latest owner refinement](site-redesign-brief.md#latest-owner-refinement) supersedes the earlier supporting-learning disclosures: the FAQ is removed, its introductory diagram is retained under learning, and live sessions, recordings, videos, and career resources are visible under subordinate headings. Learning-video titles use `h4` beneath their section heading. Quran.com now leads Quran resources as a shared primary resource card, with description and action inside; free-copy cards retain the same structure with neutral treatment. Existing buttons and the incumbent Lumos identity remain.

The `latest_ui_review` reviewer inspected the four refreshed homepage captures at 390px/1440px in both themes and returned **ship**, with no material issues. These replace the earlier homepage render evidence; the prior results above remain historical records of their respective revisions. No new identity, approved comp, visual contract, or `DESIGN.md` was introduced.

For this refinement, `pnpm check`, `pnpm lint`, `pnpm build`, search-index checks, unified-site output checks, and the updated hub UX assertions passed. Hub assertions cover FAQ removal, visible learning groups, and the primary online-reading card. One current-change detector run returned `[]`. The fresh `check-site-layout` run completed successfully across all built routes at four widths, in both themes, with 100% and 200% text sizing.

## Button and disclosure refinement — 2026-10-31

The owner requested that the secondary print action and paid-edition disclosure better match the existing neutral resource controls. “My print edition” now uses the shared outlined control on desktop and mobile. “Other Quran editions” reuses the neutral resource-card title and description pattern, explicitly identifies the editions as paid, and uses a chevron that rotates when the native details element opens. The separate pill and underlined summary treatment are removed.

Independent reviewer disposition: **ship** for this refinement. Review of the current ReadingResources source and the four refreshed homepage captures (`home-390-light.png`, `home-390-dark.png`, `home-1440-light.png`, and `home-1440-dark.png` under `.impeccable/review/`) found no material issue. The outlined print action remains subordinate to the PDF action while visibly reading as a control; the disclosure fits the adjacent resource rows in both themes and widths. This extends the incumbent Lumos world and introduces no replacement identity or `DESIGN.md`.

The implementation run reports passing check, lint, build, and updated hub UX checks in both themes and viewport sizes, including the print control's 44px height and border, keyboard Enter disclosure activation, and visibility of the paid link after expansion. One detector run returned `[]`. The reviewer did not repeat these checks. Physical-device use and a full screen-reader audit remain untested; the captures show the closed disclosure, with expansion behavior supported by the implementation's automated checks.

## Article and edition refinement — 2026-10-31

Six approved Apple-informed recommendations were implemented within the incumbent Lumos system:

- Secondary Quran editions use two desktop columns and stacked compact mobile rows; the carousel and its script are removed.
- Article lists put title and summary before combined date/duration metadata, with the whole row linked.
- The article index offers a search control leading to the existing `/search/` route.
- About's article header keeps title and date/reading time while removing repetitive category, summary, and author presentation.
- Visible heading Copy link controls sit beside desktop headings and below mobile headings, with copied feedback and fallback. Original heading titles remain available for footnote naming.
- After two mobile screen heights, Contents appears beside Back to top, opens the existing contents disclosure, and focuses its summary. The desktop contents rail remains.

Reviewer `article_grid_finish_review` inspected 15 current captures and returned **ship**, with no material findings. This pass extends the existing identity and the [documented Lumos patterns](lumos-design-system.md); it introduces no new `DESIGN.md` or visual contract. Earlier review entries remain historical evidence for their revisions.

The final implementation run reports passing check, lint, build, static search/unified-site/Quran/hadith/audit checks, hub UX including edition-grid visibility without swiping plus keyboard/enlarged-text checks, article-heading copy feedback/fallback checks, and article-spacing checks. Full article-reader development tests passed mobile Contents focus, footnote round trips, print, no-JavaScript, and enlarged-text cases. The current all-built-route layout run completed at four widths, both themes, and 100%/200% text sizing. `check-lumos` passed nine routes at 320px/390px/1280px in both themes and both text sizes, including final theme/focus, image zoom, contents/back-to-top, quotation, and token-propagation checks. One current-change detector run returned `[]`.

These results use browser emulation and automated checks; physical-device use and a full screen-reader audit remain unverified.

## Introductory diagram card correction — 2026-10-31

Reviewer disposition: **ship for the diagram card correction**. The owner's screenshot showed a flat icon/link row where the surrounding Quran resources used cards. The introductory diagram now uses the existing neutral resource-card surface, border, corners, spacing, title, description, and an explicit “Open the diagram” action. Resource actions share one rule in `shared.css`; the primary Quran.com card preserves its inherited foreground color.

The independent reviewer inspected the owner screenshot, four fresh `diagram-390-light.png`, `diagram-390-dark.png`, `diagram-1440-light.png`, and `diagram-1440-dark.png` captures, plus `home-390-light.png` for surrounding context under `.impeccable/review/`. The card reads consistently with the free Quran-copy cards in both themes and widths; no material issue was found. This is a narrow correction within the documented Lumos system.

The implementation reports passing check, lint, build, search-index checks, and hub UX checks, plus matching computed neutral-card surface, border, corners, padding, and depth at both viewport sizes in both themes. One detector run returned `[]`. The reviewer did not repeat those checks. Video-playlist recommendations were requested separately; no playlist change is implemented in this correction. Physical-device use and a full screen-reader audit remain unverified.

## Mobile article correction review — 2026-10-31

Reviewer disposition: **ship for the two reported corrections**. The owner's screenshots exposed a composition failure that the earlier passing bounds checks missed: placing a full Copy link control below each mobile heading interrupted the reading rhythm, and an undeclared `u-mt-4` utility left the article-index search control touching its introduction. The earlier mobile-row approval is superseded by this review.

The corrective scope is `ArticleExtras.astro`, shared `interactions.css`, and `articles/index.astro`. Section controls now remain beside headings, with an outlined icon on mobile, the text label on desktop, an accessible section-specific name, live copied feedback, and a visible success checkmark. The index search action receives its spacing explicitly from `--space-5`. Existing Lumos typography, colors, controls, content, and reading layout remain the reference.

The reviewer inspected both owner screenshots and the current `mobile-heading-light-normal.png`, `mobile-heading-dark-normal.png`, `mobile-heading-light-large.png`, `mobile-heading-dark-large.png`, `articles-390-light.png`, `articles-390-dark.png`, `about-390-light.png`, and `about-1440-light.png` under `.impeccable/review/`. At normal mobile text size, the owner's exact heading remains a readable two-line group with a subordinate control at its top right; the paragraph follows without an extra action row. Both article-index themes now separate introduction, search action, and first article clearly. About retains the compact mobile reading column and desktop contents rail. At enlarged text size, the heading wraps to five lines and the control grows with the shared token; their side-by-side relationship survives. The existing floating reading controls stack over lower prose in those enlarged captures, so these images do not establish unobstructed reading at every scroll position.

The implementation reports passing check, lint, build, copy feedback/fallback/focus checks at 320px/390px/1280px with normal/enlarged text across two articles, and a detector result of `[]`. The reviewer did not repeat those checks. After review, the current whole-site layout run completed successfully across all built routes, four widths, both themes, and normal/enlarged text. No physical-device or full screen-reader review was performed.

## Matching learning playlists — 2026-10-31

Reviewer disposition: **ship for the approved playlist refinement**. Both playlists now use matching neutral cards with equal 16:9 thumbnails, consistent padding and corners, visible short descriptions, and outlined “Watch playlist on YouTube” controls. They form two columns on desktop and stack on mobile. The copy distinguishes Mufti Menk's broad Stories of the Prophets playlist from the fuller biography of Prophet Muhammad; the biography's disclosure that its AI-generated visuals depict imagined scenes remains visible. The recommendation eyebrow and Read more expansion are removed, along with their React islands. This implements the separately requested playlist work noted as pending in the historical diagram correction above.

The independent reviewer compared the owner's original screenshot with fresh `playlists-390-light.png`, `playlists-390-dark.png`, `playlists-1440-light.png`, and `playlists-1440-dark.png` captures under `.impeccable/review/`, plus `home-390-light.png` for surrounding context. The cards preserve the incumbent Lumos palette, typography, surfaces, and controls. Thumbnail proportions and content alignment match, desktop actions align, and the mobile stack has clear separation. No material rendered issue was found.

The implementation reports passing check, lint, build, search-index checks, and updated hub UX checks at 390px and 1440px in both themes. The hub checks cover two cards, equal 16:9 thumbnails, mobile stacking, visible descriptions and AI disclosure, watch labels, touch targets, keyboard focus, and absence of Read more controls and playlist islands. One current-change detector run returned `[]`. The reviewer did not repeat these checks. After review, the current whole-site layout check completed across all built routes at four widths, in both themes, with 100%/200% text; the full Lumos shared-style and interaction checks also passed. Physical-device use and a full screen-reader audit remain unverified.

## Live-session actions refinement — 2026-10-31

Reviewer disposition: **ship for the approved live-session refinement**. One concise sentence introduces three matching controls: primary “Follow on TikTok”, outlined “Watch recordings on YouTube”, and outlined “Follow on Twitch”. They stack at full width on mobile and form equal columns on desktop. This remains within the incumbent Lumos system; the diagram and playlist treatments are preserved.

The independent reviewer inspected fresh `live-actions-390-light.png`, `live-actions-390-dark.png`, `live-actions-1440-light.png`, and `live-actions-1440-dark.png` captures under `.impeccable/review/`, plus `home-390-light.png` for surrounding context. The action hierarchy is clear, icon placement and control dimensions are consistent, and the group fits between the diagram and learning videos in both themes. No material issue was found within this scope.

The implementation reports passing lint, build, and hub UX checks covering labels and order, equal dimensions, 44px minimum targets, mobile stacking, desktop columns, keyboard focus, and 200% text wrapping at 390px/1440px in both themes. One detector run returned `[]`. The reviewer did not repeat these checks. Physical-device use and a full screen-reader audit remain unverified.
