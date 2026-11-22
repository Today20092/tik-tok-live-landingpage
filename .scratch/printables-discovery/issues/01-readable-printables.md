# Make printable content readable and downloadable

Status: resolved

Blocked by: None

Add a short introduction explaining that these are free English dawah PDFs for U.S. printing and give the pamphlet, postcards, and bookmark distinct descriptions. Render each postcard question and verified answer as accessible HTML and give each a stable anchor and a descriptive PDF link. Review matching PDFs against the text and use the actual printed back to verify the Jesus postcard. Use the pamphlet project as the copy authority and follow the site's religious citation rules.

## Acceptance criteria

- Raw HTML includes 16 question and answer pairs and descriptive download links. Existing previews and print options still work by keyboard and at mobile widths.
- All linked PDF URLs resolve and match their labels. Free usage and printing terms match the published materials.
- Log the Jesus postcard extraction gap and compare its visible artwork with the web text. Any PDF re-export follows the print project workflow.
- Run pnpm check, lint, and build, plus a mobile preview.

## Comments

The built page contains 16 visible question and answer summaries, each with its own anchor. All 20 PDF links and the ZIP returned HTTP 200 in the built preview. The summaries were checked against extracted PDF text for 15 postcards and the rendered PDF back for the Jesus postcard. At a 433 CSS pixel viewport, the page fit without horizontal overflow and Enter flipped the Jesus postcard. pnpm check, lint, and build passed.
