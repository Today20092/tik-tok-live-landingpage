# Git workflow

`master` is the only long-lived branch. Each task gets its own branch and pull request into `master`; there is no integration branch and no stacked PRs.

## Work on a task

1. Work in a worktree the host manages, based on current `origin/master`. A T3 Code thread on the main checkout moves itself with `t3_worktree_handoff` before editing; the project's worktree script runs `pnpm install --frozen-lockfile`. Without host worktree tools, use `git worktree add` and run `pnpm install --frozen-lockfile`.
2. Commit work in progress instead of using `git stash`: stashes are shared by every worktree.
3. Make the change and run `pnpm check`, `pnpm lint` and `pnpm build`.
4. End every code task with a commit and a pull request to `master`, without being asked. Opening a PR is safe; only a merge deploys the site.
5. The `check` job runs on the PR. Watch it and fix failures until it passes. To merge without waiting, queue it with `gh pr merge --auto --merge`; GitHub merges once the required checks pass.
6. Merge only when the user asks, with a merge commit.

Fetch before choosing a base. Use `git pull --ff-only` to advance a local `master`; inspect divergent histories and merge deliberately. Never force-push `master`.

## What runs where

| Event | Effect |
| --- | --- |
| Pull request | [Check](../.github/workflows/check.yml) runs; Cloudflare Pages builds a preview |
| Push or merge to `master` | Check runs, and Cloudflare Pages deploys production in parallel ([deployment](deployment.md)) |
| Monthly | [Dependabot](../.github/dependabot.yml) opens one grouped minor-and-patch PR per ecosystem; majors one PR each. Merged by hand |

## Repository controls

`master` requires a pull request, the `check` check and resolved conversations; rules apply to administrators, and force pushes and deletion are blocked. It also requires branches to be up to date before merging, because Cloudflare deploys a push without waiting for Check: the PR's checks are the last test before production. Auto-merge is allowed and merged branches are deleted automatically.

## Cleanup

GitHub deletes a merged PR's branch. Remove the task's worktree through the host (or `git worktree remove`) once it has no uncommitted or unmerged work.
