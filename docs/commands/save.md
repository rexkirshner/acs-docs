# /save

Updates STATUS.md at the end of a session. The core of the Session Loop.

## Overview

Run `/save` at the end of every session to capture current state. This is what enables session continuity.

## What It Updates

### STATUS.md

Updates all fields:

| Field | What It Captures |
|-------|------------------|
| `LastUpdated` | Today's date (YYYY-MM-DD) |
| `HeadCommit` | Current git SHA (`git rev-parse --short HEAD`) |
| `Objective` | Current goal (update if changed) |
| `Working Set` | Files/directories being touched (3-7 items) |
| `Next Actions` | Concrete next steps |
| `Blocked On` | Any blockers (or "None") |

### DECISIONS.md (Optional)

After updating STATUS.md, the command asks:

> "Any decisions worth recording?"

If yes, appends a new entry to DECISIONS.md:

```markdown
---

## YYYY-MM-DD: [Area] Decision Title
Why: [reason for the decision]
Tradeoff: [what we gave up]
RevisitWhen: [trigger to revisit]
```

## Usage

```bash
/save
```

## When to Use

**Run /save:**
- At the end of every session
- Before taking a break
- When switching to a different task
- Before handoffs to other developers or AI tools

**Build the habit:** End every session with `/save`.

## Example

### Before /save

```markdown
# Status

SchemaVersion: 1
LastUpdated: 2026-01-22
HeadCommit: a1b2c3d
Objective: Implement user authentication

## Working Set

- src/auth/login.ts
- src/auth/session.ts

## Next Actions

- Add password hashing
- Implement JWT tokens

## Blocked On

- (None)
```

### After /save

```markdown
# Status

SchemaVersion: 1
LastUpdated: 2026-01-24
HeadCommit: f4e5d6c
Objective: Implement user authentication

## Working Set

- src/auth/login.ts
- src/auth/session.ts
- src/auth/jwt.ts
- tests/auth.test.ts

## Next Actions

- Add refresh token rotation
- Write integration tests
- Update auth documentation

## Blocked On

- (None)
```

## The Session Loop

`/save` is the third step of the Session Loop:

```
Start → Read STATUS.md
Work → Edit Working Set files
End → Run /save  ← You are here
```

Follow this loop consistently and context persists naturally.

## What /save Asks

The command prompts for:

1. **Objective** — Is the current objective still accurate?
2. **Working Set** — What files are you actively touching?
3. **Next Actions** — What should happen next session?
4. **Blockers** — Anything preventing progress?
5. **Decisions** — Any decisions worth recording?

## Best Practices

### Be Specific About Next Actions

**Good:**
```markdown
## Next Actions

- Add password hashing to src/auth/login.ts
- Implement JWT token generation in src/auth/jwt.ts
- Write tests for login flow in tests/auth.test.ts
```

**Not this:**
```markdown
## Next Actions

- Continue work
- Finish auth
```

### Keep Working Set Current

Update it when focus shifts:
- Add files when you start touching them
- Remove files you're done with
- 3-7 items is ideal

### Document Blockers Immediately

When you hit a blocker:
```markdown
## Blocked On

- Waiting for API credentials from DevOps
- Need design review for login page
```

### Record Meaningful Decisions

When prompted, capture decisions that:
- Affect future development
- Have meaningful tradeoffs
- Someone might ask "why did we do it this way?"

## Output Example

```bash
/save

📝 Updating STATUS.md...

Objective: Implement user authentication
(Press Enter to keep, or type new objective)
>

Working Set:
- src/auth/login.ts
- src/auth/session.ts
Add/remove files? (Enter to keep)
> + src/auth/jwt.ts

Next Actions:
> Add refresh token rotation
> Write integration tests
> (blank to finish)

Blocked On:
> (None)

Any decisions worth recording? (y/N)
> y

Decision: [Auth] Use httpOnly cookies for JWT storage
Why: Prevents XSS token theft
Tradeoff: Can't access token from JavaScript
RevisitWhen: If we need client-side token access

✅ STATUS.md updated
✅ DECISIONS.md updated (1 new entry)
```

## See Also

- [Session Continuity](/guide/session-continuity) — How context persists
- [STATUS.md Guide](/guide/status-file) — Current state format
- [DECISIONS.md Guide](/guide/decisions-file) — Decision log format
- [/init-context](/commands/init-context) — Creates context files
