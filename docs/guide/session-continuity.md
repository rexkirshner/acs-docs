# Session Continuity

Pick up exactly where you left off—days, weeks, or months later—without re-explaining anything.

## The Problem

AI sessions have a critical flaw: **context loss**.

When you end a session and return later:
- You re-explain the project
- You remind the AI of past decisions
- You lose track of work in progress
- You forget why choices were made

This isn't just inconvenient—it's a productivity killer.

## The Solution

The AI Context System solves this with three files and a simple loop:

```
Session Loop:
1. Start → Read STATUS.md
2. Work → Edit Working Set files
3. End → Run /save
```

### STATUS.md Captures Current State

```markdown
# Status

SchemaVersion: 1
LastUpdated: 2026-01-24
HeadCommit: a1b2c3d
Objective: Implement user authentication

## Working Set

- src/auth/login.ts
- src/auth/session.ts
- tests/auth.test.ts

## Next Actions

- Add password hashing
- Implement JWT tokens
- Write integration tests

## Blocked On

- (None)
```

### DECISIONS.md Captures Rationale

```markdown
## 2026-01-24: [Auth] Use JWT over session-based auth
Why: Need horizontal scaling, stateless auth simplifies load balancing
Tradeoff: More complex token refresh, can't invalidate instantly
RevisitWhen: If we need instant token revocation for security
```

### CLAUDE.md Provides Entry Point

```markdown
> **Session Loop**
> 1. Start → Read `context/STATUS.md`
> 2. End → Run `/save`
```

## How It Works

### Starting a Session

1. Claude Code auto-loads `CLAUDE.md`
2. You see the Session Loop instructions
3. Read `context/STATUS.md` for current state
4. Check if `HeadCommit` matches current HEAD (staleness detection)
5. You know exactly where to pick up

### During Work

Work normally. The Working Set in STATUS.md lists the files you're touching.

If you need to edit files outside the Working Set, add them first.

### Ending a Session

Run `/save`:

```
/save
```

This updates STATUS.md with:
- Today's date
- Current git commit
- Updated objective (if changed)
- Current Working Set
- Next actions
- Blockers

It also asks about decisions:
- "Any decisions worth recording?"
- If yes, appends to DECISIONS.md

### Resuming Later

Days, weeks, or months later:

1. Open the project in Claude Code
2. `CLAUDE.md` auto-loads, showing Session Loop
3. Read `STATUS.md` — see objective, Working Set, next actions
4. Continue exactly where you left off

**Orientation time: 30 seconds.**

## Real-World Example

### Without Session Continuity

**Day 1:** Implement authentication
- AI builds JWT system
- Makes key decisions
- Session ends

**Day 8:** Resume work
- "What were we doing?"
- "Why JWT instead of sessions?"
- "What's the token expiry?"
- Re-explain everything (20 minutes)
- Risk of inconsistent decisions

### With Session Continuity

**Day 1:** Implement authentication

```
/save
```

**Day 8:** Resume work

Read STATUS.md:
```markdown
Objective: Implement user authentication

## Working Set
- src/auth/login.ts
- src/auth/session.ts

## Next Actions
- Add password hashing
- Implement refresh tokens

## Blocked On
- (None)
```

Read DECISIONS.md:
```markdown
## 2026-01-17: [Auth] Use JWT for authentication
Why: Need horizontal scaling, stateless auth preferred
...
```

**Result:** Pick up exactly where you left off in 30 seconds.

## Key Benefits

### Zero Context Loss
- AI remembers everything via files
- No re-explaining
- Consistent decision-making

### Fast Resume
- 30-second orientation
- Clear starting point
- Full context in STATUS.md

### Long-Term Projects
- Works across months
- Handles complexity
- Maintains consistency via DECISIONS.md

### AI-to-AI Handoffs
- New agent reads same files
- Perfect context transfer
- No information loss

## The Session Loop

This is the entire system:

```
┌─────────────────────────────────────┐
│                                     │
│   Start → Read STATUS.md            │
│     ↓                               │
│   Work → Edit Working Set files     │
│     ↓                               │
│   End → Run /save                   │
│     ↓                               │
│   (Next session)                    │
│                                     │
└─────────────────────────────────────┘
```

Follow this loop consistently and context persists naturally.

## Best Practices

### Save at Session End

```
/save
```

Always run before ending a session. Captures current state.

### Keep Working Set Current

Update it when focus shifts. 3-7 items is ideal.

### Record Meaningful Decisions

When you make a choice with tradeoffs, record it:

```
/save
# "Any decisions worth recording?" → Yes
```

### Trust the Loop

The system is simple by design. Follow it consistently.

## Success Metric

> **"I can end any session, return days later, read STATUS.md, and continue exactly where I left off."**

When this is true, you have session continuity.

## Next Steps

- [STATUS.md Guide](/guide/status-file) — Current state documentation
- [DECISIONS.md Guide](/guide/decisions-file) — Decision rationale
- [/save Command](/commands/save) — How context gets persisted
