# /update-context

Update CLAUDE.md and AGENTS.md with **permanent, repo-specific learnings** from this session.

Run before `/compact` or when context is long.

## Goal

Make future sessions faster by capturing only what will still matter later.

## What Gets Extracted

Only items true about the PROJECT that will remain useful:

- **Commands** — actually used/verified (run, test, build, deploy)
- **Constraints** — "don't touch X", "must use Y"
- **Patterns** — architecture, naming, folder structure conventions
- **Quirks** — non-obvious gotchas
- **Preferences** — workflow choices that affect *this repo*

## What Gets Ignored

Things true only about right now:

- Current task, temporary blockers, WIP state, TODOs, timestamps, debugging notes

**Heuristic:** Affects future sessions → keep. About this moment → drop.

## Hard Rules

- **No guessing.** Only record commands/conventions verified from repo files or session evidence.
- **No secrets.** Never write API keys, tokens, private URLs, or credentials.
- **No logs/traces.** Never paste stack traces or long error output; summarize the takeaway.
- **No placeholders.** If a section would be empty, omit it entirely.
- **Idempotent.** Running twice with no new learnings = zero changes.
- **Minimal diff.** Don't reorder sections or reformat unless needed.
- **Deduplicate.** Merge near-duplicates; keep the most specific version.
- **Tight bullets.** Short, imperative. ≤120 chars when possible.
- **Size limit.** Small repos <50 lines, complex repos <100 lines.

## File Structure

```markdown
# [Project Name]

[One-line description]

## Commands
- Run: `<command>`
- Test: `<command>`
- Build: `<command>`
- Deploy: `<command>`

## Constraints
## Patterns
## Quirks
## Preferences
```

Use exactly these labels. Omit any section that would be empty.

## Mirror Behavior

Both CLAUDE.md and AGENTS.md are updated identically. If they differ, they're merged by union + dedupe, then mirrored byte-for-byte.

If nothing new: "No new learnings. Context files unchanged."
