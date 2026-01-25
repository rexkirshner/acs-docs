# CLAUDE.md

The entry point for your project. Auto-loaded by Claude Code at the start of every session.

## Purpose

CLAUDE.md serves as the "home page" for AI agents. It provides:

1. **Session Loop instructions** — How to start and end sessions
2. **Project overview** — What this project is and does
3. **Commands** — How to run, test, and build
4. **Constraints** — Guardrails for AI behavior
5. **Links to context** — Where to find STATUS.md and DECISIONS.md

## Template

```markdown
> **Session Loop**
> 1. Start → Read `context/STATUS.md`
> 2. End → Run `/save`

# [Project Name]

[One paragraph: what this is, what it does.]

## Commands

Run: `[command]`
Test: `[command]`
Build: `[command]`

## Constraints

- Don't refactor unrelated code
- Keep PRs under 300 lines
- If you need to touch files outside Working Set, pause, propose, update Working Set, then proceed

## Context

- Status: `context/STATUS.md`
- Decisions: `context/DECISIONS.md`

## Notes

- [Project-specific conventions]
```

## Session Loop

The blockquote at the top is the most important part:

```markdown
> **Session Loop**
> 1. Start → Read `context/STATUS.md`
> 2. End → Run `/save`
```

This creates a consistent pattern:
- **Every session starts** by reading STATUS.md for context
- **Every session ends** by running `/save` to persist state

## What to Include

### Project Description

One paragraph explaining:
- What the project is
- What problem it solves
- Who it's for

Keep it brief. Details go in README.md or other docs.

### Commands

The actual commands used to run, test, and build the project:

```markdown
## Commands

Run: `npm run dev`
Test: `npm test`
Build: `npm run build`
Lint: `npm run lint`
```

Detect these from `package.json`, `Makefile`, `Cargo.toml`, etc.

### Constraints

Guardrails that keep AI focused:

```markdown
## Constraints

- Don't refactor unrelated code
- Keep PRs under 300 lines
- If you need to touch files outside Working Set, pause, propose, update Working Set, then proceed
```

Add project-specific constraints as needed.

### Context Links

Point to the other context files:

```markdown
## Context

- Status: `context/STATUS.md`
- Decisions: `context/DECISIONS.md`
```

### Notes

Project-specific conventions, coding standards, or quirks:

```markdown
## Notes

- Use TypeScript strict mode
- All API routes in /api directory
- Database migrations in /prisma/migrations
```

## Auto-Loading

Claude Code automatically loads `CLAUDE.md` from the project root when you start a session. You don't need to explicitly read it.

This means:
1. The Session Loop instructions are always visible
2. Project context is immediately available
3. Constraints are in effect from the start

## Example

Here's a complete example:

```markdown
> **Session Loop**
> 1. Start → Read `context/STATUS.md`
> 2. End → Run `/save`

# TaskFlow

A task management app for distributed teams. Helps remote workers
organize async work with smart prioritization and deadline tracking.

## Commands

Run: `npm run dev`
Test: `npm test`
Build: `npm run build`
Lint: `npm run lint`
DB: `npm run db:push`

## Constraints

- Don't refactor unrelated code
- Keep PRs under 300 lines
- If you need to touch files outside Working Set, pause, propose, update Working Set, then proceed
- All database changes need migrations

## Context

- Status: `context/STATUS.md`
- Decisions: `context/DECISIONS.md`

## Notes

- Next.js 14 with App Router
- Prisma for database (PostgreSQL)
- Tailwind for styling
- Auth via Supabase
```

## Relationship to Other Files

| File | Role |
|------|------|
| `CLAUDE.md` | Entry point, project overview, constraints |
| `context/STATUS.md` | Current state, what's being worked on |
| `context/DECISIONS.md` | Why decisions were made |

CLAUDE.md is the stable foundation. STATUS.md changes every session. DECISIONS.md grows over time.

## Tips

### Keep It Current

Update CLAUDE.md when:
- Commands change
- New constraints are needed
- Project structure shifts significantly

### Don't Over-Document

CLAUDE.md should be scannable in 30 seconds. Put detailed documentation elsewhere.

### Trust Auto-Detection

`/init-context` detects project info from package.json, README.md, and other files. Review its work but don't fight it.
