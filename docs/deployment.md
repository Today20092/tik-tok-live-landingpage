# Cloudflare Pages deployment

The static Astro site builds on Cloudflare Pages from the GitHub repository
`Today20092/tik-tok-live-landingpage`.

- Account: `de011be818652cd288a0b1d934502de3`
- Pages project: `tik-tok-live-landingpage`
- Production branch: `master`
- Build command: `pnpm build && node scripts/check-mobile-hub.mjs`
- Build output: `dist`
- Environment: `NODE_VERSION=22`, `PNPM_VERSION=11.21.0`
- Pages URL: https://tik-tok-live-landingpage.pages.dev
- Custom domain: https://islam.ayoubabed.xyz

Cloudflare's Git integration builds and deploys pushes automatically. GitHub
Actions runs validation only. No deployment API token is stored in GitHub.

Draft articles are excluded from production. Preview them with `pnpm dev`.

Build history and rollbacks are available in the Cloudflare Pages dashboard.
Do not use Worker deployment commands for this project.
