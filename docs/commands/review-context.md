# /review-context

View current project state and resume work (30 seconds).

## Overview

Lightning-fast command to see where you are and what to do next:
- Quick Reference dashboard
- Current work in progress
- Active blockers
- Next session priorities
- Last session summary
- Takes 30 seconds to read

**Run this at the start of every session** to resume work seamlessly.

## When to Use

**Use /review-context for:**
- Starting a new session (every morning)
- After breaks (>15 minutes)
- After context switches (meetings, other projects)
- Before planning next task
- Quick status check during work

**Frequency:** Every time you resume work

::: tip Perfect Session Continuity
/review-context + comprehensive SESSIONS.md = zero context loss between sessions
:::

## What It Shows

### Quick Reference (Dashboard)

```markdown
## 📊 Quick Reference

**Project:** my-app
**Phase:** MVP Development - Authentication Sprint
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

**Current Focus:** JWT authentication + email verification

**Last Session:** [Session 15 (2025-10-23)](#session-15)

**Documentation Health:** 🟢 Excellent
- Last validated: 2025-10-23
- Stale files: 0
- All critical docs current
```

### Current Work In Progress

```markdown
## Work In Progress

**HIGH: JWT Authentication Implementation**
- Location: `lib/auth.ts:145` in `generateTokens()`
- Current approach: Using jose library for JWT generation
- Next action: Implement refresh token rotation
- Blocker: None

**MEDIUM: Email Verification Flow**
- Location: `app/api/auth/verify/route.ts:34`
- Current approach: SendGrid with signed tokens
- Next action: Add rate limiting
- Blocker: SendGrid API key not in production env
```

### Active Blockers

```markdown
## Blockers & Decisions

**Current Blockers:**
- SendGrid API key missing in production environment
  - Impact: Can't test email verification in production
  - Action: Request key from DevOps (ticket #234)
  - ETA: End of day
```

### Next Session Priorities

```markdown
## Next Session

**Priority 1:** Fix production CORS issue with refresh cookies
**Priority 2:** Add password reset flow
**Priority 3:** Implement 2FA (if time permits)

**Context Notes:**
Refresh token cookies work on localhost but fail in production due to
CORS sameSite settings. See SESSIONS.md Session 15 for investigation notes.
```

### Recent Accomplishments

```markdown
## Recent Accomplishments

**Session 15 (2025-10-23):**
- ✅ Implemented JWT token generation with jose
- ✅ Added refresh token rotation
- ✅ Created email verification flow
- ✅ Added rate limiting middleware
- ⚠️ Discovered CORS issue in production

**Session 14 (2025-10-22):**
- ✅ Set up PostgreSQL with Prisma
- ✅ Created user model
- ✅ Added password hashing
```

## Example Output

```bash
$ /review-context

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 PROJECT STATUS - my-app
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Phase:** MVP Development - Authentication Sprint
**Status:** 🟢 Active

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 CURRENT FOCUS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

JWT authentication + email verification

**Work In Progress:**

  HIGH: JWT Authentication Implementation
    📍 lib/auth.ts:145 in generateTokens()
    🔨 Using jose library for Edge Runtime compatibility
    ⏭️  Next: Implement refresh token rotation
    ✅ No blockers

  MEDIUM: Email Verification Flow
    📍 app/api/auth/verify/route.ts:34
    🔨 SendGrid with signed tokens
    ⏭️  Next: Add rate limiting (3 emails/hour)
    ⚠️  Blocker: SendGrid API key missing in prod

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚧 ACTIVE BLOCKERS (1)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. SendGrid API key missing in production
   Impact: Can't test email verification
   Action: DevOps ticket #234
   ETA: End of day

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⏭️  NEXT SESSION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Priority 1: Fix production CORS issue with cookies
Priority 2: Add password reset flow
Priority 3: Implement 2FA (if time)

💡 Context: Cookies work on localhost, fail in prod
   See Session 15 SESSIONS.md for investigation

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ RECENT ACCOMPLISHMENTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Session 15 (Yesterday):
  ✅ JWT token generation with jose
  ✅ Refresh token rotation
  ✅ Email verification flow
  ✅ Rate limiting middleware
  ⚠️  Discovered CORS production issue

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 DOCUMENTATION HEALTH
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Status: 🟢 Excellent
Last validated: 2025-10-23
Stale files: 0

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚀 READY TO WORK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Start here: lib/auth.ts:145 (refresh token rotation)

Commands:
  npm run dev         # Start development
  npm test           # Run tests

Full context: context/STATUS.md
Session history: context/SESSIONS.md
```

## Smart Loading for Large Files

If SESSIONS.md is large (>1000 lines), /review-context uses progressive loading:

**<1000 lines:** Reads full file

**1000-5000 lines:** Strategic loading
- First 100 lines (recent sessions)
- Last 50 lines (current state)
- Key session markers

**>5000 lines:** Indexed loading
- Session headers only
- Last 3 sessions in full
- Current state from STATUS.md

**Why:** Prevents Read tool failures on large files while maintaining fast performance.

## How It Works

### Step 1: Read Quick Reference

From STATUS.md top section (auto-generated)

### Step 2: Parse Current State

- Current Phase
- Work In Progress
- Active Blockers
- Next Session

### Step 3: Load Recent Sessions

From SESSIONS.md:
- Last 1-2 session TL;DRs
- Recent accomplishments
- Lessons learned

### Step 4: Format Output

Pretty-prints information for quick scanning

## Use Cases

### Morning Routine

```bash
# After arriving at work
$ /review-context

# Shows:
# - What you were working on yesterday
# - Where to resume (exact file + line)
# - Any blockers to address
# - Priorities for today

# Time: 30 seconds to read
# Result: Instantly know what to do
```

### After Meetings

```bash
# After 2-hour meeting
$ /review-context

# Reminds you:
# - What you were doing before meeting
# - Current mental model
# - Where code is
# - Next specific action

# No "where was I?" confusion
```

### After Context Switch

```bash
# Been working on other project for 3 days
$ /review-context

# Refreshes memory:
# - Project state when you left
# - Decisions made
# - Current approach
# - Known issues

# Quick re-immersion
```

### Before AI Handoff

```bash
# About to hand off to AI assistant
$ /review-context

# Shows AI:
# - Current project state
# - What's in progress
# - Blockers to avoid
# - Priorities

# AI knows exactly where to start
```

## Best Practices

### Run at Session Start

Make it a habit:
```
1. Open project in editor
2. Run /review-context
3. Read output (30 seconds)
4. Resume work at exact location
```

### Trust the Documentation

If /review-context shows something unexpected:
- Documentation is out of date → Run /save or /save-full
- Memory is wrong → Trust the docs, not memory

### Use with SESSIONS.md

For deeper context:
```bash
# Quick overview
/review-context

# Need more detail?
cat context/SESSIONS.md | tail -200
# Read last session entry in full
```

### Keep STATUS.md Updated

/review-context is only as good as your documentation:
- Run /save every 30-60 min
- Run /save-full before breaks
- Keep WIP section current

## Troubleshooting

### "Context directory not found"

**Problem:** Running from wrong directory

**Solution:**
```bash
# Check current directory
pwd

# Should be project root or up to 3 levels deep
cd /path/to/your/project
/review-context
```

### Empty or missing sections

**Problem:** STATUS.md hasn't been updated

**Solution:**
```bash
# Update documentation
/save

# Then review
/review-context
```

### SESSIONS.md too large (timeout)

**Problem:** File >5000 lines, read times out

**Solution:** System automatically uses progressive loading. If still failing:
```bash
# Archive old sessions
mkdir -p context/archive/
# Move sessions 1-50 to context/archive/SESSIONS-2024.md
```

## Related Commands

- [/save](/commands/save) - Quick updates to keep docs current
- [/save-full](/commands/save-full) - Comprehensive saves before breaks
- [/validate-context](/commands/validate-context) - Check doc health

## See Also

- [Session Continuity](/guide/session-continuity) - Zero context loss
- [Daily Work Workflow](/workflows/daily-work) - Using /review-context daily
- [STATUS.md Guide](/guide/status-file) - Understanding current state
