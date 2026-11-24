# Dawah site direction — working brief

Status: homepage specification drafted; implementation tickets created. Visual treatment and final copy are implementation decisions.

## Mission

Help people discover the truth of Islam, apply its guidance in everyday life, and share it with others—starting with ourselves.

The project is currently Ayoub's personal work and may grow into an organization. Welcome Muslims, non-Muslims, curious people, and skeptics without requiring visitors to identify themselves. Present Islamic belief clearly and welcome honest questions. Ultimate outcomes are with Allah; the project should still strive to act responsibly and evaluate its work.

## Visitor intent

- Discover Islam: find approachable fundamentals, the Quran, and answers. The existing `/start` Getting to Know Islam page is the agreed starting resource; it also serves the printed pamphlet.
- Live the guidance: find sourced lessons and personal reflections with a meaningful next step. That step may be outward practice or inward reflection, questioning, and intention; these are working labels, not rigid categories.
- Share Islam: find printables, books, and useful resources for conversations and outreach.
- Find resources mentioned during live streams quickly, and follow Ayoub's videos and future podcasts on his existing channels.
- Understand and support the work. Support should be reasonably prominent across relevant pages and accurately explain that it helps sustain Ayoub's time, production, materials, and outreach.

## Experience principles

The homepage should feel like a clear, beautiful, compact landing page and link hub, with enough context to make each destination understandable. Paths should follow visitor intent rather than require a religious identity. Distinguish personal reflection and experience from Quran, hadith, and identified scholarly sources. Encourage visitors to carry lessons into life instead of maximizing time on the website or social media.

Existing resources include the homepage link hub, `/start`, articles, printables, search, live-reading resources, and Ko-fi. Preserve the pamphlet QR journey and its existing short link when planning changes.

## Transparency and growth

Share honest updates about activities, what support makes possible, and eventually relevant financial information at a sustainable level. Do not imply a formal organization, charitable status, restricted fund, or promised outcomes that do not exist. Future tabling updates may use photographs or video, with care for participants' choices and privacy.

## First milestone: homepage and existing resources

Purpose: give visitors a clear, compact introduction to the mission and fast access to useful resources, including those mentioned on live streams.

- Introduce the mission briefly and prominently link to the existing Getting to Know Islam page. Preserve the pamphlet companion and its QR journey.
- Lead with the brief mission and beginner guide, followed immediately by quick access to books from the live, articles, printables, and support; refine exact presentation during design.
- Guide visitors toward discovering Islam, living its guidance, and sharing it, using existing articles, Quran and book resources, and printables. Exact headings and layout remain design decisions.
- Keep live-reading resources and the existing TikTok and YouTube destinations easy to find. Preserve useful existing destinations and eligibility explanations for free Quran offers.
- Make voluntary support reasonably prominent, accurately explain what it sustains, and retain support access on relevant pages. Do not imply funds are restricted to a specific purpose.
- Use the existing shared site patterns, accessible navigation and themes. Preserve search, working routes, metadata, structured data, and the site's responsive behavior.
- Update homepage title and description to reflect the broader mission. Review all affected shared layouts and resource links before changing them.
- Validate the result on mobile and desktop, in light and dark themes, with keyboard navigation and enlarged text; run the project's required checks. Review the result against the visitor tasks above rather than a purely visual checklist.

The current homepage already links to `/start`, articles, live recordings, printables, and support, but leads with books from the live. Article pages already include a compact support card and other pages have footer support. Design the change around these existing paths.

### Homepage structure and acceptance criteria

1. **Welcome:** The first main heading and a concise introduction communicate Islam with Ayoub's mission. A prominent link labeled clearly as an introduction opens `/start/`. The page remains welcoming to visitors of any faith or none, without asking them to identify themselves.
2. **Quick access:** Immediately after the welcome, provide clearly labeled links to the books from the live, articles, printables, and support. Each goes directly to the relevant existing page or section, and the books link reaches the actual live reading resources. No sign-in or extra menu is required.
3. **Discover, live, share:** Existing Quran and book resources, articles, and printables are findable through understandable labels and brief context. These intents can be expressed through links or sections; do not force three empty categories or duplicate all content.
4. **Live resources:** Keep the current Quran and hadith book destinations, online Quran, available free-copy offers and qualifications, learning resources, and links to TikTok and YouTube reachable from the homepage. Preserve existing useful destinations, including Twitch, unless a specific change is justified. Preserve `#books`, `#read`, `#copies`, `#articles`, `#join`, and `#watch` anchor targets or supply equivalent backward-compatible anchors.
5. **Support:** Include a visible quick link and an on-page explanation with the existing Ko-fi destination. Explain that voluntary support enables Ayoub's time and work, including materials and outreach, without suggesting a formal charity, restricted fund, or a guaranteed outcome. Review the existing filmmaking-education reference and monthly goal for accuracy rather than silently claiming support is exclusively for dawah. Preserve support access from other pages.
6. **Navigation and metadata:** Update the current header's “Books & resources” label if it misrepresents the broadened homepage while retaining navigation to articles, printables, about, and search. Update the homepage title, description, canonical and social metadata, and structured data consistently; preserve valid existing URLs and do not change the pamphlet short link or `/start/` content as part of this milestone.
7. **Quality:** Reuse the documented Lumos system and existing components when suitable. Check navigation and destinations on mobile and desktop, both themes, enlarged text, and keyboard focus. Verify that direct anchor links work and free-copy eligibility remains accurate. Run `pnpm check`, `pnpm lint`, and `pnpm build`; exercise `pnpm dev` and `pnpm preview` for the relevant visual and functional checks.

The initial milestone does not add an updates feed, mailing list, messaging channel, AI bot, analytics provider, or empty video/podcast archive. Existing article content and the pamphlet companion are not rewritten. The design should remain compact and legible rather than optimizing for time on site.

## Later milestones

1. Publish occasional project updates on the website as a durable home for outreach and progress, sharing them through existing channels. Decide update format, privacy, and reporting cadence when there is material to publish.
2. Curate Ayoub's relevant TikTok and YouTube content, and add podcasts when available. Organize around visitor needs, not empty content categories.
3. Audit account-level analytics and define useful measurements and privacy boundaries before any changes. Page visits and referrers alone do not measure understanding, faith, or donations.
4. Reassess email, messaging channels, and the Tampa Facebook group by audience and maintenance capacity. An AI assistant may eventually help find reliable published updates, but is not a substitute for their source.

## Design reference: T3 Code

Ayoub likes the clean, organized [T3 Code landing page](https://t3.codes/). Its public [marketing site](https://github.com/pingdotgg/t3code/tree/main/apps/marketing) uses Astro, with TypeScript, variable Inter and Sharp in its [manifest](https://github.com/pingdotgg/t3code/blob/main/apps/marketing/package.json). Its desktop and web app stacks are separate from its marketing site. Its configuration references Vercel, though the live hosting provider was not independently verified.

Consider its clear purpose, primary action, focused sections, and accessible secondary navigation as inspiration. Adapt them to quick resource access and the dawah mission; do not copy branding or assume a stack migration is necessary. The reference research reviewed rendered text and source, not a visual screenshot audit.

## Open decisions

- Exact homepage wording and visual treatment, within the agreed structure and acceptance criteria.
- Update cadence, ownership, moderation, and privacy; whether a separate email or messaging channel is warranted.
- Appropriate scope and cadence of financial and activity reporting.
- Analytics: no application beacon was found in code or the live homepage response checked during discovery; account-level configuration and dashboard data remain unverified. Decide measurement questions and privacy boundaries before changing collection.
- How to curate videos and future podcasts, and when the amount of material justifies dedicated collections.

## Future possibilities, not commitments

Tabling reports, optional video clips, podcasts, additional learning pathways, and tools that help others do dawah. Avoid building an empty structure or a new publishing channel before there is content and capacity to maintain it.
