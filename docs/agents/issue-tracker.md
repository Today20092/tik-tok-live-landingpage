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
