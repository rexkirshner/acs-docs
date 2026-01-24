# /review-context

View current project state and resume work (30 seconds).

::: tip Automatic Health Checks (v5.0.0+)
Starting in v5.0, a **session-start hook** automatically runs when you begin a Claude Code session. It checks context health before you even type `/review-context`—warning about stale STATUS.md, missing Quick Reference, or unclosed sessions.

**New in v5.1.5:** Shows days since last session, respects `noThreshold` config for append-only files (like DECISIONS.md), and displays which loading strategy is being used for large SESSIONS.md files.
:::

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

## Session Timing Display (v5.1.5)

Shows how many days since your last session for quick context:

```bash
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📅 SESSION TIMING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Last session: 2025-10-23 (3 days ago)
```

**Why this matters:** Quickly gauge how much context you might need to review. A session from yesterday needs less review than one from 2 weeks ago.

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

::: tip Loading Strategy Visibility (v5.1.5)
The command now shows which loading strategy is being used:
```
📖 Loading SESSIONS.md (strategic: 1847 lines → index + recent 500)
```
This helps you understand why you might see partial session data in very large files.
:::

## Staleness Checks with noThreshold Support (v5.1.5)

The staleness check now respects the `noThreshold` configuration for files that are append-only by design:

```json
// In .context-config.json
"validation": {
  "stalenessThresholds": {
    "DECISIONS.md": {
      "appendOnly": true,
      "noThreshold": true
    }
  }
}
```

**What this means:**
- Files marked with `noThreshold: true` won't trigger staleness warnings
- Perfect for DECISIONS.md which is append-only and always "current"
- Reduces noise in the health check output

## How It Works

### Step 1: Read Quick Reference

From STATUS.md top section (auto-generated)

### Step 2: Parse Current State

- Current Phase
- Work In Progress
- Active Blockers
- Next Session

### Step 3: Load Recent Sessions

::: tip Smart Loading
SESSIONS.md is loaded intelligently based on file size to prevent token limit issues.
:::

From SESSIONS.md:
- **Small files (<1000 lines):** Loads fully
- **Medium files (1000-5000 lines):** Loads index + recent 500 lines strategically
- **Large files (>5000 lines):** Loads index + recent 300 lines minimally
- Result: Can handle SESSIONS.md files with 50,000+ lines

### Step 4: Cross-Document Consistency Checks

::: tip Automatic Consistency
Automatically detects drift and mismatches across context files.
:::

Checks:
- **Last Updated dates** across CONTEXT.md, STATUS.md, SESSIONS.md
- **Phase consistency** between CONTEXT.md and STATUS.md
- **Session count** accuracy in SESSIONS.md
- Warns about discrepancies with specific, actionable messages

### Step 4.5: Configuration Health Check (v5.2.0)

Checks `.context-config.json` for stale or placeholder values:

```bash
🔧 Configuration Health
━━━━━━━━━━━━━━━━━━━━━━━
⚠️  Configuration has 5 unconfigured fields:

   • 2 fields set to 'TBD'
   • 1 empty fields
   • 2 placeholder values

   Consider updating with actual values for better AI context.
```

**What this checks:**
- TBD placeholder values (lazy initialization)
- Empty string fields (incomplete setup)
- Placeholder URLs (example.com, your-project)
- Common placeholder patterns (YOUR_, placeholder)

**Why this matters:** Accurate config improves Quick Reference generation and AI understanding.

### Step 4.6: Session Continuity Check (v5.2.0)

Verifies that referenced sessions are properly documented:

```bash
🔴 CRITICAL: Session Continuity Gap Detected
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Session 15 referenced in STATUS.md
   but NOT documented in SESSIONS.md

   Impact: Context continuity broken
   AI agents cannot review what happened in Session 15

   Action Required:
   → Run /save-full to document Session 15
   → Do this BEFORE starting new work
```

**Why this matters:** Undocumented sessions break AI handoffs and reduce confidence score by 15 points.

### Step 4.7: Documentation Health Check

::: tip Documentation Health
Comprehensive documentation health analysis.
:::

Checks for:
- **Missing files** - CLAUDE.md or CONTEXT.md not found
- **Template placeholders** - Unfilled `[FILL:...]` markers
- **Stale documentation** - CLAUDE.md significantly older than CONTEXT.md
- **Tech stack drift** - Mismatches between files

```bash
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 DOCUMENTATION HEALTH CHECK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ CLAUDE.md exists (3 days old)
✅ CONTEXT.md exists (1 day old)
⚠️  CONTEXT.md has 5 unfilled [FILL:...] placeholders

Recommendations:
  • Fill in remaining placeholders in context/CONTEXT.md
```

### Step 5: Format Output

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

# Should be project root or up to 2 levels deep
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
