# Verify search and AI discovery after deployment

Status: ready-for-agent

Blocked by: 02 Tune search snippets and social previews

Check the deployed canonical, robots and sitemap, PDF response headers, and crawler access policies. Inspect the URL in Google Search Console and Bing Webmaster Tools where available, submit the sitemap or request indexing where appropriate, and record the outcome. Confirm the policy for OAI-SearchBot and check verified crawler traffic if available.

## Acceptance criteria

- Record HTTP status, canonical, indexing eligibility, and available first-party index status for the production page.
- Compare U.S. impressions and clicks for the canonical page over 28-day windows when sufficient data exists. Record whatever cited-page visibility the dashboards expose.
- Sample searches such as “free dawah brochure PDF” and “printable postcards explaining Islam” in regular and AI search. Record date, query, platform, and whether the canonical page appears. Use these samples as observations rather than acceptance gates for ranking.

## Comments

The production baseline is in the spec. Repeat the checks after the change deploys. First-party index coverage and the 28-day comparison are pending.
