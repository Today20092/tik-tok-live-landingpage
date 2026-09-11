# Stack recommendations for the Quran live-session link hub

_Research date: 2026-09-11. Sources are official project documentation, source repositories, and the current repository._

## Recommendation

Keep the current stack: **Astro 7 static output + Tailwind CSS 4 + small React islands + Astro Content Layer + Cloudflare Pages**. Do not add TanStack, a state library, a CMS, an Astro server adapter, or a broad component library now.

The site is a single content-led link hub whose data is available at build time. Astro is already the framework optimized for that shape: framework components render HTML by default, and a `client:*` directive opts only interactive components into browser JavaScript. The current project already has Astro, React, Tailwind, Lucide, validated content collections, and the official sitemap integration installed ([package.json](../package.json), [Astro framework components](https://docs.astro.build/en/guides/framework-components/), [Astro content collections](https://docs.astro.build/en/guides/content-collections/)).

The highest-value additions are not npm packages:

1. Enable **Cloudflare Web Analytics** in the Pages dashboard if traffic measurement is wanted. Pages has a one-click setup that injects the beacon on the next deployment, so no application dependency or hand-maintained script is needed ([Cloudflare Pages Web Analytics](https://developers.cloudflare.com/pages/how-to/web-analytics/)).
2. Add a `public/_headers` file when security-header policy is ready. Cloudflare Pages applies `_headers` rules to static responses and supports headers such as CSP, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, and `Permissions-Policy` ([Cloudflare Pages custom headers](https://developers.cloudflare.com/pages/configuration/headers/)).
3. Use Astro's built-in Audit toolbar during development before adding an accessibility test dependency. It catches common accessibility and performance problems, though Astro explicitly says it is not a replacement for dedicated tooling or human review ([Astro dev toolbar](https://docs.astro.build/en/guides/dev-toolbar/)).

## What the repository already has

| Area | Current choice | Assessment |
|---|---|---|
| Framework | Astro `^7.3.2` | Keep. Correct fit for a static, content-first site. |
| Interactivity | React 19 via `@astrojs/react` | Keep, but hydrate only what truly needs browser state. |
| Styling | Tailwind CSS 4 through `@tailwindcss/vite` | Keep. Already configured in the supported Vite shape. |
| Content | Astro Content Layer collections with Zod schemas | Keep. It already validates link and drawing data at build time. |
| Icons | `lucide-react` | Keep. Replacing an existing icon family would add churn without user value. |
| SEO | Canonical, description, Open Graph, Twitter cards, JSON-LD, robots, sitemap | Keep the manual metadata; no SEO package is needed. |
| Hosting | Static output intended for Cloudflare Pages | Keep static output; no Cloudflare adapter is needed. |
| UI kit | `components.json` initialized for shadcn/ui, no generated UI components | Treat as an available tool, not a required layer. |

Local evidence: [astro.config.mjs](../astro.config.mjs), [src/pages/index.astro](../src/pages/index.astro), [src/content.config.ts](../src/content.config.ts), and [components.json](../components.json).

## Options compared

| Option | Use now? | Why |
|---|---:|---|
| Astro-only components and native HTML | **Yes, default** | Smallest dependency and JavaScript surface. Use Astro components for static content and native elements such as links, buttons, `details`/`summary`, and `dialog` where they meet the interaction. |
| React islands | **Yes, selectively** | The project already uses React. Astro supports `client:load`, `client:idle`, `client:visible`, `client:media`, and `client:only`; the directive controls when browser code loads ([Astro client directives](https://docs.astro.build/en/reference/directives-reference/#client-directives)). |
| shadcn/ui | **Only per component** | The repo is already initialized for it. shadcn copies component source into the project and installs the component's dependencies, so each addition becomes code the project owns rather than a single runtime library switch ([shadcn/ui Astro setup](https://ui.shadcn.com/docs/installation/astro), [shadcn/ui open code](https://ui.shadcn.com/docs)). Add one component only when a complex accessible primitive such as Dialog, Popover, Select, or Menu is genuinely needed. |
| TanStack Query | **No** | Query solves asynchronous server-state fetching, caching, synchronization, refetching, pagination, and mutations. This site's content is local and build-time, so there is no server state to cache ([TanStack Query overview](https://tanstack.com/query/latest/docs/framework/react/overview)). |
| TanStack Router | **No** | Router provides type-safe client-side routes, loaders, nested layouts, prefetching, and validated search parameters for React/Solid applications. Astro already owns file-based routing, and this is intentionally one page ([TanStack Router overview](https://tanstack.com/router/latest/docs/framework/react/overview)). |
| TanStack Start | **No** | Start is a full-stack React framework with SSR, streaming, server functions, and client/server builds. It would replace Astro rather than enhance this static site ([TanStack Start overview](https://tanstack.com/start/latest/docs/framework/react/overview)). |
| Global state library | **No** | Current interactions are local UI state. React's built-in state is enough; a store would introduce a second state model without a shared-state problem. |
| CMS/database | **No** | The content is small, versioned, and already schema-validated in the repository. Add a CMS only when a non-developer must edit frequently without Git. |

## Astro integrations

### Keep

- `@astrojs/react`: required for the existing interactive React component.
- `@astrojs/sitemap`: correctly configured with the production `site` URL. The official integration generates entries from statically generated routes ([Astro sitemap integration](https://docs.astro.build/en/guides/integrations-guide/sitemap/)).

There is also a hand-authored [public/sitemap.xml](../public/sitemap.xml). Prefer one source of truth. Since the official integration is already installed, let it generate the sitemap and remove the manual duplicate during a cleanup pass.

### Add only when the requirement appears

- `@astrojs/mdx`: add only if content authors need JSX expressions or components inside Markdown. Plain Markdown already handles the current bio and FAQ content, while MDX exists specifically to add JSX variables, expressions, and components ([Astro MDX integration](https://docs.astro.build/en/guides/integrations-guide/mdx/)).
- `@astrojs/cloudflare`: add only if the site gains on-demand rendered routes, Astro Actions, sessions, server islands, or Cloudflare bindings. Astro's official docs state that a static site builder does not need the adapter ([Astro Cloudflare adapter](https://docs.astro.build/en/guides/integrations-guide/cloudflare/)).
- A dedicated accessibility runner such as Pa11y/Lighthouse: add to CI only when accessibility regressions become frequent or releases need a repeatable gate. Until then, use semantic HTML, keyboard testing, screen-reader spot checks, and Astro's built-in Audit toolbar.

### Skip

- SEO integrations: the one page already owns its title, description, canonical URL, social cards, and JSON-LD in [src/pages/index.astro](../src/pages/index.astro). A wrapper package would mostly relocate the same tags.
- Client router/view-transition integration: the site has one route. Astro has a built-in `ClientRouter`, but it is for client-side navigation between pages and brings lifecycle tradeoffs that do not exist here ([Astro view transitions](https://docs.astro.build/en/guides/view-transitions/)).
- Third-party script offloading: Cloudflare Web Analytics can be enabled at the platform layer; there is no present bundle of third-party scripts that justifies another integration.

## React-island recommendation

The current page mounts `<Editions ... client:load />` as the entire body in [src/pages/index.astro](../src/pages/index.astro). `client:load` renders initial HTML and then immediately loads and hydrates the component; Astro also offers delayed and visibility-based directives for less urgent interactions ([Astro framework components](https://docs.astro.build/en/guides/framework-components/)).

Do not add another frontend framework. Instead, choose one of these two simple paths:

- If `Editions` is still an active theme/edition preview, keep the single React island until the design is settled.
- If this is the production UI, move stable page content back into `.astro` markup and retain small React islands only for controls that need state. This restores Astro's main advantage without changing the stack.

Do not split purely for architectural neatness. Split after measuring a meaningful JavaScript or interaction-cost problem.

## Content, SEO, images, and accessibility

- Keep Content Layer schemas. Astro schemas validate content shape and generate TypeScript types, which is exactly useful for public links and eligibility wording ([Astro content schemas](https://docs.astro.build/en/guides/content-collections/#defining-the-collection-schema)). Follow the repository rule to import `z` from `astro/zod` when the content config is next touched.
- Keep SEO metadata explicit in the page. For a single route, a reusable SEO component is more indirection than value.
- Prefer Astro's built-in `astro:assets` `Image` or `Picture` for local editorial images moved under `src/`; it infers dimensions, requires alt text, and can emit optimized WebP/AVIF and responsive sources without an image plugin ([Astro images](https://docs.astro.build/en/guides/images/)). Images rendered deep inside a React island can be passed in as Astro-generated children if needed.
- Keep accessibility at the semantic-component level. If a future fullscreen viewer needs robust focus trapping, escape handling, and restored focus, that is the point where one shadcn Dialog is justified. The shadcn composition rules require a Dialog title for accessibility ([shadcn Dialog composition](https://ui.shadcn.com/docs/components/dialog)).

## Cloudflare Pages implications

Cloudflare Pages' documented Astro settings are a build command such as `npm run build` and output directory `dist`; with this repository's pinned package manager, use `pnpm build` and `dist` ([Cloudflare Astro guide](https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/), [package.json](../package.json)). Static output needs neither a Worker deploy command nor `@astrojs/cloudflare`.

The repository currently also contains [.github/workflows/deploy.yml](../.github/workflows/deploy.yml) configured for GitHub Pages. That conflicts with the README and project instruction that Cloudflare Pages is the deployment target. Pick one deployment owner; for Cloudflare Pages Git integration, the GitHub Pages workflow is redundant because Pages rebuilds on pushed commits and provides preview deployments ([Cloudflare Astro guide](https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/)).

A local `pnpm build` verification succeeded on 2026-09-11. The generated client JavaScript totals about 237 KB raw and 75 KB compressed; most of it comes from hydrating the full-page React root. That is small enough to ship, but it confirms that reducing the island is the first performance lever if measurements justify work.

## Minimal adoption order

1. **Now:** add no dependencies; finish the production design on the current stack.
2. **When traffic data matters:** enable Cloudflare Web Analytics in the dashboard.
3. **When deployment policy is cleaned up:** keep Cloudflare Pages Git deployment, retire the GitHub Pages workflow, and add `public/_headers` with a tested CSP/security policy.
4. **When performance data says so:** reduce the all-page React island and route local raster images through `astro:assets`.
5. **When a genuinely complex interactive control appears:** add only that shadcn component.
6. **When the site gains live remote data or app-like multi-page navigation:** reconsider TanStack Query or Router then, not before.

## Bottom line

The stack is already complete. The practical next move is **less client JavaScript and cleaner hosting configuration, not more libraries**. shadcn is available as a selective escape hatch; TanStack currently solves problems this site does not have.
