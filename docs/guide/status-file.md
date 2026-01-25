# STATUS.md

The current state of your project. Updated every session with `/save`.

## Purpose

STATUS.md answers: **"Where are we right now?"**

- **Objective** — What you're working toward
- **Working Set** — Files you're actively touching (3-7 items)
- **Next Actions** — Concrete next steps
- **Blocked On** — What's preventing progress

Any AI agent can read this file and be oriented in 30 seconds.

## Template

```markdown
# Status

SchemaVersion: 1
LastUpdated: 2026-01-24
HeadCommit: a1b2c3d
Objective: Implement user authentication

## Working Set

- src/auth/login.ts
- src/auth/session.ts
- src/middleware/auth.ts
- tests/auth.test.ts

## Next Actions

- Add password reset flow
- Implement OAuth providers
- Write integration tests

## Blocked On

- (None)
```

## Fields

### Metadata

| Field | Description |
|-------|-------------|
| `SchemaVersion` | Always `1` (for future migrations) |
| `LastUpdated` | Today's date (YYYY-MM-DD) |
| `HeadCommit` | Current git SHA (`git rev-parse --short HEAD`) or `N/A` |
| `Objective` | Current goal in one line |

### Working Set

The 3-7 files or directories you're actively touching.

```markdown
## Working Set

- src/components/Button.tsx
- src/components/Modal.tsx
- src/hooks/useModal.ts
- tests/components/
```

**Guidelines:**
- Keep it to 3-7 items
- Can be files or directories
- Update when focus shifts
- If you need to touch files outside this list, add them first

### Next Actions

Concrete next steps for the next session:

```markdown
## Next Actions

- Finish Button component styling
- Add keyboard navigation to Modal
- Write unit tests for useModal hook
```

**Guidelines:**
- Be specific and actionable
- Order by priority
- Should be resumable by any agent

### Blocked On

What's preventing progress:

```markdown
## Blocked On

- Waiting for design review of Button component
- Need API endpoint for user preferences
```

If nothing is blocking, use:

```markdown
## Blocked On

- (None)
```

## When to Update

**Update STATUS.md:**
- Every `/save` command (end of session)
- When objective changes
- When Working Set shifts
- When blockers appear or resolve

**The file should always be current** — it's your safety net for session continuity.

## HeadCommit and Staleness

The `HeadCommit` field enables staleness detection:

```markdown
HeadCommit: a1b2c3d
```

When you start a new session:
1. Check if `HeadCommit` matches current `git rev-parse --short HEAD`
2. If they differ, commits were made outside this session
3. STATUS.md might be stale — review before continuing

**For non-git repos:** Use `N/A` and rely on `LastUpdated` date.

## Example: Active Project

```markdown
# Status

SchemaVersion: 1
LastUpdated: 2026-01-24
HeadCommit: f4e5d6c
Objective: Complete checkout flow for MVP

## Working Set

- src/pages/checkout.tsx
- src/components/PaymentForm.tsx
- src/api/orders.ts
- src/hooks/useCart.ts
- prisma/schema.prisma

## Next Actions

- Add Stripe payment intent creation
- Handle payment success/failure states
- Create order confirmation page
- Write e2e test for checkout flow

## Blocked On

- Waiting for Stripe production account approval (expected Jan 28)
```

## Example: New Project

```markdown
# Status

SchemaVersion: 1
LastUpdated: 2026-01-24
HeadCommit: N/A
Objective: TBD

## Working Set

- TBD

## Next Actions

- TBD

## Blocked On

- (None)
```

## Relationship to Other Files

| File | Role |
|------|------|
| `CLAUDE.md` | Entry point, project overview, constraints |
| `STATUS.md` | Current state, what's being worked on now |
| `DECISIONS.md` | Why decisions were made |

**STATUS.md changes every session.** It's the most frequently updated file.

## Best Practices

### Keep It Current

```
/save
```

Run at the end of every session. Takes seconds.

### Be Specific

```markdown
# Too vague:
Objective: Work on frontend

# Better:
Objective: Implement user dashboard with activity feed
```

### Right-Size the Working Set

```markdown
# Too broad:
- src/

# Better:
- src/components/Dashboard.tsx
- src/components/ActivityFeed.tsx
- src/hooks/useActivities.ts
```

### Make Actions Resumable

```markdown
# Not helpful:
- Continue work

# Helpful:
- Add pagination to ActivityFeed (currently shows all items)
- Fix date formatting in activity timestamps
- Write tests for useActivities hook
```

## Next Steps

- [CLAUDE.md Guide](/guide/claude-md) — Project entry point
- [DECISIONS.md Guide](/guide/decisions-file) — Recording decisions
- [/save Command](/commands/save) — How STATUS.md gets updated
