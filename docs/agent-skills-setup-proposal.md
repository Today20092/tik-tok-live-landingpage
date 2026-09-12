# Project-wide agent skills setup

Approved and applied on 12 September 2026. Local Markdown tickets, default triage labels, and the `AGENTS.md` setup block are configured on all eight local branches. The blocks below record the approved configuration.

The setup commit on `master` is `0f0d75d`. Verified identical configuration files and setup blocks across all local branches, with only the four setup files in each commit. This workspace is back on `experiment/lumos-migration`. Remote refs and the detached worktree were not changed.

## Add to AGENTS.md

```markdown
## Agent skills

### Issue tracker

Track issues and specs as local Markdown under `.scratch/`. Before creating, reading, or updating tickets, read `docs/agents/issue-tracker.md`.

### Triage labels

Use the default five triage roles. Before assigning triage status, read `docs/agents/triage-labels.md`.

### Domain docs

Use a single-context layout. Before exploring domain concepts or proposing architectural changes, read `docs/agents/domain.md`.
```

## docs/agents/issue-tracker.md

```markdown
# Issue tracker: local Markdown

Issues and specs live in this repository. Publishing a ticket means writing a local file.

## Files

- Feature spec: `.scratch/<feature-slug>/spec.md`.
- Tickets: `.scratch/<feature-slug>/issues/<NN>-<slug>.md`, one file per ticket, numbered from `01` in dependency order.
- Record `Status` and `Blocked by` near the top. Blockers identify ticket numbers and titles within the feature; use an explicit path for a blocker in another feature.
- Use the triage roles in `triage-labels.md`. During execution, `claimed` and `resolved` record progress; these are workflow states, not additional triage labels.
- Append discussion under `## Comments`. Keep acceptance criteria and completion evidence with the ticket.
- Keep these files tracked in Git so each branch carries its work history. Merge ticket updates when integrating the corresponding work.

## Workflow

Read the full ticket and its blockers before starting. A ticket is actionable when it is `ready-for-agent` and every blocker is `resolved`. Work actionable tickets in number order unless instructed otherwise.

Set `Status: claimed` before implementation. Resolve a ticket only after its acceptance criteria pass; record the verification evidence and set `Status: resolved`. A `wontfix` blocker requires revising the dependency or scope before dependent work begins.

If given only a ticket number and multiple features match, ask which feature instead of guessing.

## Wayfinding

When using a wayfinding skill, keep its map at `.scratch/<feature-slug>/map.md` and its child tickets in the same issues directory. Record each child's type. On resolution, append the answer to the ticket and a linked summary to the map's decisions.
```

## docs/agents/triage-labels.md

```markdown
# Triage labels

Use these strings for local ticket triage status.

| Canonical role | Local status | Meaning |
| --- | --- | --- |
| needs-triage | needs-triage | Needs maintainer evaluation |
| needs-info | needs-info | Waiting for information |
| ready-for-agent | ready-for-agent | Specified for agent implementation, subject to blockers |
| ready-for-human | ready-for-human | Requires human implementation |
| wontfix | wontfix | Will not be implemented |

Execution states and dependency rules are defined in `issue-tracker.md`.
```

## docs/agents/domain.md

```markdown
# Domain docs

This is a single-context project.

Before exploring domain concepts or proposing architectural changes:

1. Read the root `CONTEXT.md` if present.
2. Read relevant architectural decisions in `docs/adr/` if present.
3. Use the glossary's terms in tickets, implementation, and tests. Flag conflicts with an existing decision explicitly before proposing a replacement.

If these documents do not exist, continue without creating placeholders. Record terminology and decisions when the domain-modeling workflow resolves them.

Keep the shared glossary at `CONTEXT.md` and numbered architectural decisions under `docs/adr/`.
```

## Applying the setup across branches

- Create one commit containing only the setup block and three configuration files on local `master`.
- Propagate that setup to `experiment/lumos-migration` and the other existing local branches, preserving each branch's surrounding instructions and work.
- Inspect checked-out worktrees before changing them. If their setup files have conflicting edits, report that specific branch rather than overwrite the edits.
- Future branches inherit the setup from an updated branch. Detached worktrees and remote refs remain unchanged; pushing is separate.
- Keep Lumos research, the migration proposal, and unrelated drafts out of the setup commit.

The migration ticket breakdown remains a separate pending approval. This setup does not publish or start those tickets.
