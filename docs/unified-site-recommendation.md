# Making the links and articles feel like one site

Research reviewed September 11, 2026. Recommendation only; no site implementation changes.

My recommendation is to make **Live with Ayoub the identity of every page**, with Links and Articles as sections within it. Keep the compact homepage you liked. Add a consistent header, navigation, colors, and footer across the site, then let the middle of each page suit its content.

The desired experience is straightforward: someone finds a resource during a live session, opens one of your explanations, and still knows whose site they are on and how to reach the other resources.

## What is causing the separation

I inspected the current local homepage, article listing, and “Why I started Live with Ayoub” article in the browser, plus their templates. This matters because the local project has ongoing changes that may differ from production. The web research tool could not retrieve the production domain, so these findings describe the local preview.

| On the homepage | After opening Articles | Effect |
| --- | --- | --- |
| Your portrait and prominent “Live with Ayoub” title | No persistent site name or portrait | The personal identity disappears. |
| Cream and lavender in the selected preview, with geometric background | Plain pale green background | The visual change suggests a different site. |
| About, Articles, and Search together | “Back to links” and Search; individual posts use “All articles” | Navigation changes meaning and position across the journey. |
| Narrow stack of rounded resource buttons | Wider editorial list and reading column | A reasonable content adaptation, but abrupt without shared surroundings. |
| Social links and a compact about/privacy footer | The inspected article ends with a return link | The familiar beginning and ending are missing. |

The pages already share `HubPage.astro`, but its custom-content slot does not supply a shared visible header and footer. Sharing metadata and an HTML wrapper does not yet create a shared visitor experience. Article templates also explicitly paint their own full-page background.

The homepage already previews published articles. Keep that connection. The main missing piece is continuity after the click.

## What your earlier references suggest

I recovered these references from the project's earlier palette review, then revisited their live pages. These are observations and design judgments, not claims that the templates have been usability-tested for your audience.

| Reference | What I inspected | What to borrow |
| --- | --- | --- |
| [Hedger](https://hedger.ch/posts) | Posts list and [an individual post](https://hedger.ch/posts/2026/inertia-page-colocation) | The person's name, About / Posts / Projects navigation, theme control, and footer persist. A post can be very simple and still clearly belong to the same site. This is the strongest structural reference. |
| [Scholarly](https://astro-theme-scholars.pages.dev/) | Homepage and [an individual article](https://astro-theme-scholars.pages.dev/posts/astro-overview/) | The same identity and navigation remain above the article. Blog stays visibly selected. Breadcrumbs explain where the reader is. Borrow its readable editorial styling, scaled down for your compact site. |
| [Norevia](https://norevia.pages.dev/) | Homepage and [journal article](https://norevia.pages.dev/journal/morning-ritual/) | The journal retains the main brand, navigation, colors, and footer. Borrow that continuity and its consistent handling of images. Its large marketing layout and booking controls do not fit your link hub. |
| [Astro Palette](https://astro-palette.8limb.dev/) | Homepage and its displayed Rose Pine Dawn treatment | Useful for comparing coordinated colors. A palette alone will not repair missing identity or navigation. I did not complete an article transition on this reference, so it is only a color and homepage reference here. |

My preferred combination is **your existing Pocket homepage, Hedger's navigation continuity, and Scholarly's reading clarity**.

## The specific changes I would make

1. **Put a compact identity header on every page.** Use a small version of your portrait beside “Live with Ayoub,” linking home. Keep the larger portrait banner on the homepage only. Someone arriving directly at an article should immediately recognize the author and site.

2. **Use one navigation row everywhere: Links, Articles, About, Search.** Links leads to the current homepage. About can continue pointing to your origin-story article. Give the current section a visible active state. On an article, keep Articles selected and place “All articles” below the shared navigation as a breadcrumb. A back link should supplement the site navigation.

3. **Apply the same chosen palette across every route.** The background, text, accent, borders, and focus indicators should stay consistent when opening an article or search. If a theme preference is offered, carry it through navigation. Finish the palette selection separately from this structural work; the approach works with your green studies or a warm neutral palette.

4. **Carry a quieter version of the geometry into reading pages.** Use it in the outer margins or a shallow band near the header. Give the actual text an uninterrupted background. Repeating a recognizable detail is enough; the strong homepage pattern would compete with long paragraphs.

5. **Keep layouts appropriate to the task.** The homepage remains a narrow stack of easy-to-tap links. The article archive uses short previews with the same border, corner, and type conventions as the homepage previews. Articles get a comfortable reading column, roughly 60–70 characters wide, with the existing Typeset treatment. They do not need to sit inside a giant link card.

6. **Make the return journey useful.** At the end of a relevant article, show a small “Resources mentioned” section linking to the Quran, book, or recording actually discussed. Follow that with the same compact site footer. Keep these links curated; a recommendation engine is unnecessary for the current amount of content.

For mobile, use two compact header rows if needed: identity first, then the short navigation. Keep the article title and introduction close to the top. The current contents box is useful, but on small screens I would make it a native expandable “On this page” control so it does not push the introduction far down the page.

## Proposed page structure

| Homepage | Article archive | Individual article |
| --- | --- | --- |
| Shared identity and navigation | Shared identity and navigation | Shared identity and navigation |
| Portrait banner and brief purpose | Articles title and brief description | All articles breadcrumb |
| Primary Quran and recording links | Familiar article previews | Title, summary, date and author |
| Free-copy and learning resources | Simple list while the archive is small | Optional contents, then reading text |
| Latest article previews | | Relevant resources mentioned |
| Shared compact footer | Shared compact footer | Shared compact footer |

Use the same shared surroundings on Search as well. Preserve current URLs, including `/articles/`, and keep About pointing to the existing story. This does not require restructuring the content or changing hosting.

## Smallest useful implementation

Start with the shared header/navigation, site-wide theme application, and footer in the existing layout. Connect the homepage, article listing, individual articles, and search to them. Remove the duplicated page-level navigation once the shared navigation covers it. Preserve metadata, Markdown/MDX content, heading anchors, and search indexing.

Then tune article previews and the quieter background treatment. Only after that consider optional covers or motion. A font swap, more thumbnails, or an animated page transition alone will leave the navigation problem intact. There is no need to replace Astro, add a theme package, or turn this into a large publication homepage.

Before shipping, verify the complete Links → Articles → article → Links journey on a phone-sized screen and desktop. Check direct article entry, active navigation, theme persistence without a color flash, keyboard focus, readable contrast, contents links, and browser back behavior. Run the project's normal checks and build after implementation.

The first version should succeed even with images disabled: the repeated name, navigation, and colors should make it clear that every page belongs to Live with Ayoub.
