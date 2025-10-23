# /save

Quick context update for regular work sessions (2-3 minutes).

## Overview

Lightweight command for frequent updates during active development:
- Updates STATUS.md with current tasks and blockers
- Auto-generates Quick Reference section (dashboard)
- Captures work in progress
- Takes 2-3 minutes

**Use this command 3-5 times per session** during active work.

## When to Use

**Use /save for:**
- Regular updates every 30-60 minutes
- After completing a task
- When switching tasks
- Before short breaks (5-15 minutes)
- Any time you want to capture current state

**Use /save-full instead for:**
- Long breaks (>1 hour)
- End of day
- Before handoffs to other developers/AI
- After major milestones
- When comprehensive documentation needed

::: tip Frequency
Most developers use /save 3-5 times per session and /save-full once at session end.
:::

## What It Updates

### STATUS.md

**Current Phase** - Where you are in project lifecycle

**Work In Progress** - Exact state of current work:
```markdown
## Work In Progress

**HIGH: User Authentication**
- Location: `lib/auth.ts:145` in `generateTokens()`
- Current approach: JWT with httpOnly cookies
- Next action: Add refresh token rotation
- Blocker: None
```

**Active Tasks** - From TodoWrite state

**Blockers** - Anything preventing progress

**Next Session** - What to do when you resume

### Quick Reference (Auto-Generated)

Top of STATUS.md gets dashboard view:

```markdown
## 📊 Quick Reference
_(This section is auto-generated - DO NOT edit manually)_

**Project:** my-app
**Phase:** MVP Development
**Status:** 🟢 Active

**URLs:**
- Production: https://my-app.com
- Staging: https://staging.my-app.com
- Repository: https://github.com/user/my-app

**Tech Stack:** Next.js 14, TypeScript, PostgreSQL, Prisma

**Commands:**
npm run dev         # Start development server
npm run build       # Build for production
npm test           # Run tests

**Current Focus:** User authentication and session management

**Last Session:** [Session 15 (2025-10-23)](#session-15)

**Documentation Health:** 🟢 Excellent
- Last validated: 2025-10-23
- Stale files: 0
```

Generated from `context/.context-config.json` + current STATUS.md content.

## How It Works

### Step 1: Capture TodoWrite State

AI reads your active todos:
- ✅ Completed tasks
- ⏳ In progress tasks
- ⏸️ Blocked tasks

### Step 2: Update STATUS.md Sections

Updates these sections only:
- **Current Phase** - If changed
- **Work In Progress** - Current state
- **Active Tasks** - From TodoWrite
- **Blockers** - If any exist
- **Next Session** - What to do next

### Step 3: Auto-Generate Quick Reference

Reads `.context-config.json` and STATUS.md, generates dashboard view automatically.

### Step 4: Optional: Update CONTEXT.md

If project fundamentals changed (rare):
- Tech stack additions
- Architecture changes
- Team structure updates

## Example Update

### Before /save

```markdown
## Work In Progress

**Task:** Implementing authentication
```

### After /save

```markdown
## Work In Progress

**HIGH: JWT Authentication Implementation**
- Location: `lib/auth.ts:145` in `generateTokens()`
- Current approach: Using jose library for JWT generation
- Why this approach: Native Edge Runtime support, no dependencies
- Next specific action: Implement refresh token rotation (7-day expiry)
- Context needed: Refresh tokens stored in httpOnly cookie, access tokens in memory
- Blocker: None

**MEDIUM: Email Verification Flow**
- Location: `app/api/auth/verify/route.ts:34`
- Current approach: SendGrid with signed tokens
- Next action: Add rate limiting (max 3 emails per hour)
- Blocker: SendGrid API key not in production env yet
```

### Quick Reference Generated

```markdown
## 📊 Quick Reference

**Project:** my-app
**Phase:** MVP Development - Authentication Sprint
**Status:** 🟢 Active

**Current Focus:** JWT authentication + email verification

**Last Session:** [Session 15 (2025-10-23)](#session-15)

**Active Blockers:** 1
- SendGrid API key missing in production environment
```

## Time Investment

- **Simple session:** 2 minutes (update WIP, no blockers)
- **Complex session:** 3 minutes (multiple tasks, blockers, phase change)
- **With CONTEXT.md update:** 4-5 minutes (rare)

**Compare to:**
- /save-full: 10-15 minutes (comprehensive documentation)
- Manual documentation: 0 minutes (but context loss on resume)

## Best Practices

### Be Specific About WIP

**Good:**
```markdown
**Work In Progress:**
- Implementing rate limiting in `middleware.ts:67`
- Using express-rate-limit with Redis store
- Next: Add custom error messages
- Blocker: Redis connection config unclear
```

**Not this:**
```markdown
**Work In Progress:**
- Working on rate limiting
```

**Why:** Future you (or AI) needs exact context to resume.

### Update Every 30-60 Minutes

During active work:
```
9:00 AM - Start work
9:30 AM - /save (after first task)
10:30 AM - /save (after second task)
11:30 AM - /save (before standup)
12:00 PM - /save-full (before lunch)
```

### Capture Blockers Immediately

When you hit a blocker:
1. Stop work
2. Run /save
3. Document blocker in STATUS.md
4. Ask for help or switch tasks

**Why:** Prevents wasted time, documents what's blocking progress.

### Link to DECISIONS.md

When documenting approach:
```markdown
**Work In Progress:**
- Implementing OAuth with NextAuth.js
- See DEC-012 for library choice rationale
```

## What /save Does NOT Do

❌ Create SESSIONS.md entries (use /save-full)

❌ Document mental models (use /save-full)

❌ Log git operations (use /save-full)

❌ Export JSON (use /save-full --with-json)

❌ Comprehensive documentation (use /save-full)

✅ Quick state capture for work continuity

## Output Example

```bash
$ /save

📝 Updating STATUS.md...

✅ Updated sections:
   • Work In Progress (2 active tasks)
   • Active Blockers (1 blocker added)
   • Next Session priorities

🔄 Regenerating Quick Reference...

✅ Quick Reference updated:
   • Project phase: MVP Development
   • Current focus: JWT authentication
   • Active blockers: 1

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ QUICK SAVE COMPLETE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Updated:
  ✅ STATUS.md (current state, Quick Reference)

Time invested: ~2 minutes

Next Session:
  • Resume: JWT refresh token rotation
  • Address: SendGrid API key blocker

💡 Tip: Use /save-full before breaks for comprehensive documentation
```

## Related Commands

- [/save-full](/commands/save-full) - Comprehensive saves (10-15 min)
- [/review-context](/commands/review-context) - View current state
- [/validate-context](/commands/validate-context) - Check documentation health

## See Also

- [Daily Work Workflow](/workflows/daily-work) - When to use /save
- [STATUS.md Guide](/guide/status-file) - Understanding STATUS.md
- [Session Continuity](/guide/session-continuity) - Zero context loss
