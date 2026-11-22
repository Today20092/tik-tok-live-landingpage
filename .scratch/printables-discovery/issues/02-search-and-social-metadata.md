# Tune search snippets and social previews

Status: resolved

Blocked by: 01 Make printable content readable and downloadable

Use the existing layout's metadata options to describe free dawah PDFs, including the English brochure, postcards, and bookmark. Choose a social preview image that represents these downloads. Check for an appropriate contextual link from an existing related page while coordinating any shared component touches.

## Acceptance criteria

- The page has one canonical URL and descriptive title, meta description, and social tags. The social image resolves on production and has descriptive alt metadata.
- The description is concise and describes the page accurately. A normal crawlable link leads to the page, and the generated sitemap still lists it.
- Review the share preview and rerun the targeted squirrelscan baseline. Record before and after warnings alongside manual results.

## Comments

The built preview uses the canonical printables URL, a shorter description, and the existing brochure artwork for the social image. The online companion already links directly to the brochure section. In the targeted preview audit the description warning cleared and estimated visible text rose from 7% to 13%, with the text-density warning still present. Production validation is tracked in ticket 03.
