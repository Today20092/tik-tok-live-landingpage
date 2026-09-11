# Unified site preview

Preview: http://127.0.0.1:4330/

Worktree: `C:/Users/User/Documents/tik-tok-live-unified-preview`

Branch: `codex/unified-site-preview`

The starting snapshot is `1cde4c084f49215e2fe707d0406e09db9acc54e2`. It includes the original workspace's tracked and untracked non-ignored files at the start of this task, including uncommitted articles, assets, components, and configuration. Dependencies were installed separately from the pinned lockfile. The original workspace and its index were not staged, stashed, reset, or checked out by this task.

Changes made by other tasks after that snapshot are not automatically copied here. This branch has not been pushed, deployed, or merged.

The preview adds shared identity, Links / Articles / About / Search navigation, an active section indicator, and a shared footer. Homepage and archive article cards use one component. Individual articles keep the existing reading typography, with expandable contents and curated resource links on the origin story. Scholarly colors apply consistently; faint lattice is limited to outer margins, leaving the reading column plain.

## Run again

From this worktree:

```powershell
pnpm build
pnpm preview --host 127.0.0.1 --port 4330
```

The production preview includes working search. A separate development server was also started at http://127.0.0.1:4323/ for draft and contents verification.

## Verification

- `pnpm check`: no errors or warnings; one inherited Zod deprecation hint.
- `pnpm lint`: passed.
- `pnpm build`: passed.
- `node scripts/check-unified-site.mjs`: shared navigation, active states, identity, footer, and heading targets passed.
- `node scripts/check-search.mjs`: published content and exclusions passed.
- `node scripts/check-toc.mjs http://127.0.0.1:4323`: draft and short-article contents checks passed.
- Browser review covered the homepage, archive, individual article, and search at desktop and narrow phone widths. Search for “Quran” returned all three indexed pages. Contents navigation reached the requested heading. No horizontal overflow was observed on the inspected narrow article.

## Review and later integration

Compare the design changes against the snapshot, rather than against the old `master` commit:

```powershell
git diff 1cde4c084f49215e2fe707d0406e09db9acc54e2 HEAD
```

When the design is approved, reconcile any newer work in the original workspace before merging. The design is committed separately from the snapshot so it can also be cherry-picked onto a saved current version without reapplying the initial snapshot.
