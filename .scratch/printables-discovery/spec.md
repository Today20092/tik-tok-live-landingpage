# Help U.S. readers find free Islamic printables

The canonical landing page is https://islam.ayoubabed.xyz/printables/. Help people searching for free dawah materials, a brochure explaining Islam, Islamic outreach postcards, or a Qur’an bookmark find the page and download the matching PDF. These are search-intent examples. Search volume and rankings were outside this baseline.

## Baseline checked November 22, 2026

- Production serves the page, lists it in the generated sitemap, and serves robots.txt with a wildcard allow rule. This verifies public discovery signals. Search engine index status, authenticated dashboards, and verified crawler visits remain unconfirmed.
- The page describes the resources, gives the print instructions, and links to the PDFs. The sixteen postcard questions appear in control labels, while the answers are missing from readable page text. Local Poppler extraction returned text for 19 of 20 PDFs. The Jesus postcard returned zero characters.
- squirrelscan 0.0.190 ran locally with cloud features and publishing disabled. The targeted run reported 40 passes, two warnings, and zero failures across the selected categories. It flagged the 178-character description and estimated visible text at about 7% of HTML. Whole-site sitemap checks and crawler probes were outside the run. Treat the text-density threshold as a diagnostic.
- Reproduce the targeted run with `squirrel audit https://islam.ayoubabed.xyz/printables/ --offline --no-publish --passive --disable-discovery-probes --target-url /printables/ --rule-include core,crawl,links,social,ax,schema --max-duration 35 --format llm`.

## Tools and skills

- Use the [MIT-licensed squirrelscan CLI](https://github.com/squirrelscan/squirrelscan) with its [optional upstream skill](https://github.com/squirrelscan/skills) for repeatable SEO and agent-readability checks. Use the installed CLI directly for this work.
- Use [Lighthouse](https://github.com/GoogleChrome/lighthouse) for independent mobile performance and accessibility checks. Use Poppler's `pdftotext` to compare text in the actual PDF exports with the web copy.
- Use [Google Search Console](https://search.google.com/search-console/about) and [Bing Webmaster Tools](https://www.bing.com/webmasters/about) for first-party search evidence. These are hosted services that require site access. For ChatGPT search, verify the policy for OAI-SearchBot separately from the GPTBot training control. [OpenAI crawler documentation](https://developers.openai.com/api/docs/bots)
- Google recommends ordinary SEO fundamentals for its AI search features. Prioritize crawlable links and visible, accurate text. Leave llms.txt and special AI markup out of the initial work. [Google Search Central](https://developers.google.com/search/docs/appearance/ai-features)
- Apply modern-web-guidance and the local Lumos guide for UI work, pdf for PDF inspection, and web-perf or verify-and-stop for validation. The vidIQ publishing skill is relevant if Ayoub asks to publish social assets.

## Ownership and order

Keep one host-managed worktree and one PR for the page changes in tickets 01 and 02. A single implementer should own the Astro page, since both tickets touch it. A separate agent can do the read-only PDF and copy comparison for 01 or prepare the draft social assets in 04. Keep header and navigation edits with their existing owner. Run production verification after deployment, then record a 28-day comparison when data is available.

1. [Make printable content readable and downloadable](issues/01-readable-printables.md)
2. [Tune search snippets and social previews](issues/02-search-and-social-metadata.md)
3. [Verify search and AI discovery after deployment](issues/03-production-discovery.md)
4. [Prepare social and community distribution](issues/04-distribution.md)
