# /save-full

Comprehensive session documentation for breaks and handoffs (10-15 minutes).

## Overview

Creates detailed SESSIONS.md entry with everything needed for perfect session continuity and AI collaboration:
- Mental models and problem-solving approaches
- Comprehensive file changes with context
- TodoWrite state (completed vs. pending)
- Git operations (auto-logged)
- Precise work-in-progress state
- Takes 10-15 minutes

**Use before breaks, handoffs, and milestones** for comprehensive documentation.

## When to Use

**Use /save-full for:**
- End of day
- Before breaks >1 hour
- Before handing off to another developer
- Before AI-to-AI handoffs
- After completing major milestones
- When comprehensive documentation needed

**Use /save instead for:**
- Regular updates during work (every 30-60 min)
- Quick state captures
- Short breaks (5-15 minutes)

::: tip Frequency
Most developers use /save-full 1-2 times per session (end of day, major milestones).
:::

## What It Creates

### Everything /save Does
- Updates STATUS.md (current tasks, blockers)
- Auto-generates Quick Reference section
- Captures work in progress

### PLUS Comprehensive SESSIONS.md Entry

**Session entry format (40-60 lines):**

```markdown
## Session 15 | 2025-10-23 | JWT Authentication Implementation

**Duration:** 4h | **Focus:** Implement JWT auth with refresh tokens | **Status:** ✅ Complete

### TL;DR
Implemented JWT authentication using jose library with access/refresh token pattern.
Access tokens in memory (15min), refresh in httpOnly cookie (7 days). Added rate
limiting (3 requests/min) and email verification flow. Discovered CORS issue with
cookie settings in production - documented in DEC-023.

### Accomplishments
- ✅ JWT token generation with jose library (lib/auth.ts)
- ✅ Refresh token rotation logic
- ✅ Email verification with SendGrid
- ✅ Rate limiting middleware
- ✅ CORS configuration for cookies

### Problem Solved
**Issue:** Need secure authentication for API without server-side sessions

**Constraints:**
- Must work on Edge Runtime (Vercel)
- No server-side session storage
- Mobile app needs refresh tokens
- Cookie security (httpOnly, secure, sameSite)

**Approach:**
1. Access tokens: Short-lived (15min), stored in memory
2. Refresh tokens: Long-lived (7 days), httpOnly cookies
3. Rotation: New refresh token on every refresh
4. Verification: Email with signed tokens (1-hour expiry)

**Why this approach:** Edge Runtime compatible, stateless, mobile-friendly,
follows OWASP recommendations for token storage.

### Decisions
- **DEC-023: jose over jsonwebtoken** - Edge Runtime support → See DECISIONS.md
- **DEC-024: 15min access tokens** - Balance security vs UX

### Files
**NEW:**
- `lib/auth.ts:1-234` - JWT token generation and validation
- `app/api/auth/login/route.ts:1-89` - Login endpoint
- `app/api/auth/refresh/route.ts:1-67` - Token refresh endpoint
- `app/api/auth/verify/route.ts:1-45` - Email verification

**MOD:**
- `middleware.ts:34-78` - Added authentication check
- `lib/email.ts:89-123` - Email verification templates
- `next.config.js:12-18` - CORS headers for cookies

### Mental Models
**Current understanding:**
- Access tokens must be short-lived (stolen token = 15min exposure max)
- Refresh tokens in httpOnly cookies prevent XSS attacks
- SameSite=Lax allows cookies in top-level navigation
- Edge Runtime requires jose (no native crypto in jsonwebtoken)

**Key insights:**
- Cookie SameSite settings are critical for CORS
- Production CORS different from localhost (learned hard way)
- Email verification must be rate-limited (3/hour per user)

**Gotchas discovered:**
- NextResponse.cookies() doesn't support maxAge in seconds (needs milliseconds)
- CORS preflight doesn't include cookies (need credentials: 'include')
- SendGrid rate limits at 100/day on free tier

### Work In Progress
**Task:** Fixing production CORS issue with refresh token cookies

**Location:** `middleware.ts:45` and `next.config.js:15`

**Current approach:** Adding explicit CORS headers in middleware + next.config.js

**Why this approach:** Need both middleware (runtime) and config (build-time) headers

**Next specific action:** Test with production domain, verify cookies set correctly

**Context needed:** Works on localhost, fails on Vercel production due to
cross-origin cookie restrictions

### TodoWrite State
**Completed:**
- ✅ Implement JWT token generation
- ✅ Create login endpoint
- ✅ Add refresh token logic
- ✅ Email verification flow
- ✅ Rate limiting middleware

**In Progress:**
- ⏳ Fix production CORS issue

**Pending:**
- [ ] Add password reset flow
- [ ] Implement 2FA
- [ ] Add session management UI

### Next Session
**Priority:** Fix CORS cookie issue in production, then move to password reset

**Blockers:** None

**Questions:**
- Should we add 2FA before launch? (security vs. complexity tradeoff)

### Git Operations
**MANDATORY - Auto-logged from conversation**

**Commits:** 5 commits
1. feat: Add JWT token generation with jose
2. feat: Implement login endpoint
3. feat: Add refresh token rotation
4. feat: Email verification flow
5. fix: CORS headers for production cookies

**Pushed:** Yes (to main branch)
**Branch:** main

### Tests & Build
- **Tests:** Unit tests for token generation (8/8 passing)
- **Build:** Production build successful
- **Manual Testing:** Login works on localhost, CORS issue on production
```

## How It Works

### Step 1: Helper Script Analysis (Optional)

If `scripts/save-full-helper.sh` exists, runs automatically:
- Auto-detects session number
- Gathers git information (commits, status, diff)
- Creates draft template at `context/.session-draft.md`
- You review and append to SESSIONS.md

### Step 2: Manual Process (Fallback)

If helper script not available:
1. Gather session information (git log, status, TodoWrite)
2. Create session entry from template
3. Fill in all sections
4. Append to SESSIONS.md

### Step 3: Update STATUS.md

Same as /save:
- Current Phase
- Work In Progress
- Active Tasks
- Blockers
- Next Session

### Step 4: Update DECISIONS.md (If Needed)

If significant technical decisions were made this session:
- Add decision entry with full rationale
- Link from SESSIONS.md entry

### Step 5: Update Quick Reference

Auto-generate dashboard at top of STATUS.md

### Step 6: Optional Files

If complexity demands:
- Update ARCHITECTURE.md (major system design changes)
- Update PRD.md (product vision changes)

### Step 7

::: tip
/save-full now detects unfilled template placeholders and helps you fill them in.
:::

Before completing, /save-full checks CONTEXT.md for `[FILL:...]` placeholders:

```bash
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚠️  ACTION REQUIRED: CONTEXT.md Needs Information
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CONTEXT.md has 17 unfilled [FILL:...] placeholders.
This file appears to still be in template state.

📊 Auto-Detected Project Information:
  Project Name: my-app
  Description: A Next.js web application
  Repository: https://github.com/user/my-app
  Tech Stack: Next.js, TypeScript, PostgreSQL
  Project Type: web-app

Please fill in the [FILL:...] placeholders in context/CONTEXT.md
using the auto-detected information above as a starting point.
```

**Project auto-detection** gathers info from:
- `package.json` (name, description, dependencies)
- `git remote` (repository URL)
- Project files (framework, database, hosting detection)

This ensures context files contain actual project information instead of placeholder text.

## Mental Models Section (Critical!)

This section is **why /save-full is essential for AI collaboration**:

```markdown
### Mental Models

**Current understanding:**
- How you understand the system architecture
- Your mental model of the problem space
- Key relationships and dependencies

**Key insights:**
- Things you learned during this session
- Patterns that emerged
- Connections you made

**Gotchas discovered:**
- Non-obvious issues you encountered
- Things that surprised you
- Common mistakes to avoid
```

**Why this matters:** Future AI agents (or you in 2 weeks) need to understand HOW you think about the problem, not just WHAT code you wrote.

## Example Use Cases

### End of Day

```bash
# After 6 hours of work
/save-full

# Documents:
# - All work completed today
# - Current mental model
# - Where to resume tomorrow
# - Blockers to address

# Time: 12 minutes
# Value: Perfect continuity tomorrow morning
```

### Before Handoff to Another Developer

```bash
# Handing off feature to teammate
/save-full

# Documents:
# - What's been done
# - Current approach and why
# - Exact WIP state
# - Known issues

# Teammate reads SESSIONS.md entry
# Can continue without asking questions
```

### AI-to-AI Handoff

```bash
# Claude Code → Cursor handoff
/save-full

# Claude creates comprehensive entry:
# - Mental models
# - Decision rationale
# - Problem-solving approach
# - Exact resume point

# Cursor reads entry
# Understands context completely
# Continues work seamlessly
```

### Major Milestone

```bash
# Just completed authentication feature
/save-full

# Documents:
# - What was accomplished
# - Decisions made along the way
# - Mental models developed
# - Lessons learned

# Creates historical record
# Helps future refactoring
```

## Time Investment

::: tip Duration Estimation (v5.1.5)
The command now provides duration estimates based on session complexity to help you plan your time.
:::

- **Simple session:** 10 minutes (straightforward work)
- **Complex session:** 12 minutes (multiple decisions, gotchas)
- **With new decision:** 15 minutes (need DECISIONS.md entry)
- **With architecture update:** 18 minutes (rare)

**Compare to:**
- /save: 2-3 minutes (quick state only)
- No documentation: 0 minutes (context loss on resume)
- Manual writeup: 30+ minutes (comprehensive but tedious)

**Worth it?** Absolutely - enables perfect session continuity and AI collaboration.

## Best Practices

### Capture Mental Models Honestly

Don't sanitize your thinking:

**Good:**
```markdown
**Mental Models:**
I initially thought rate limiting should be per-IP, but realized
that breaks shared NAT users. Switched to per-user-id, which required
authentication first. This ordering dependency isn't obvious from code.
```

**Not this:**
```markdown
**Mental Models:**
Rate limiting implemented per user.
```

**Why:** Future you (or AI) needs to understand the thought process, not just the outcome.

### Document Gotchas Immediately

While pain is fresh:
```markdown
**Gotchas discovered:**
- NextResponse.cookies() maxAge is in MILLISECONDS not seconds
  - Lost 2 hours debugging "cookies expire immediately"
  - Always multiply by 1000: maxAge: 7 * 24 * 60 * 60 * 1000
```

### Link Decisions to Rationale

```markdown
**Decisions:**
- DEC-023: jose over jsonwebtoken → See DECISIONS.md for full rationale
```

Then in DECISIONS.md:
```markdown
## DEC-023: Use jose Library for JWT

**Decision:** Use jose instead of jsonwebtoken

**Rationale:**
- Edge Runtime compatible (no Node.js crypto dependencies)
- Modern API (async/await)
- Better TypeScript support
- JOSE standard compliant

**Alternatives considered:**
1. jsonwebtoken - Not Edge Runtime compatible
2. auth0/node-jsonwebtoken - Same issue
3. Roll our own - Security risk, reinventing wheel

**Tradeoffs:**
- ✅ Edge Runtime support (critical for Vercel)
- ✅ Smaller bundle size
- ❌ Less familiar to team (learning curve)

**Reconsider if:** Edge Runtime becomes unnecessary
```

### Use TL;DR Effectively

TL;DR should answer: "What happened this session?" in 2-3 sentences:

**Good:**
```markdown
### TL;DR
Implemented JWT authentication with refresh token rotation. Discovered CORS
issue in production with httpOnly cookies. Created DEC-023 for library choice,
documented gotchas with NextResponse cookie API.
```

**Not this:**
```markdown
### TL;DR
Worked on authentication.
```

## Session Index for Large Files (v5.1.5)

When SESSIONS.md grows large, the command now generates a **Session Index** at the top of the file for easy navigation:

```markdown
# Session Index (65 sessions)

| # | Date | Focus |
|---|------|-------|
| 65 | 2025-10-23 | JWT authentication with refresh tokens |
| 64 | 2025-10-22 | Database schema and user model |
| 63 | 2025-10-21 | Project setup and initialization |
| ... | ... | ... |
```

**Benefits:**
- Quick navigation to specific sessions
- At-a-glance project history
- Helps `/review-context` find recent sessions efficiently
- Automatically maintained by `/save-full`

## Quick Reference Checklist (v5.1.5)

Before completing, `/save-full` now validates that the Quick Reference section in STATUS.md is complete and accurate:

```bash
📋 Quick Reference Validation
  ✅ Project name present
  ✅ Tech stack current
  ✅ URLs configured
  ⚠️  Last session link outdated (updating...)
```

## Automatic Session Archiving

::: tip
Automatic archiving keeps SESSIONS.md manageable and prevents token limit issues.
:::

When SESSIONS.md grows large (>2000 lines), `/save-full` automatically prompts you to archive old sessions:

```bash
📦 SESSIONS.md is large (2847 lines)
   Archiving old sessions improves performance.

Archive old sessions (keep last 10)? [Y/n]
```

**If you accept (Y):**
- Old sessions moved to `context/SESSIONS-archive-2025.md`
- Last 10 sessions kept in main SESSIONS.md
- Backup created before modification
- File size reduced by 80-90%
- Zero data loss (sessions = main + archive)

**Benefits:**
- Prevents token limit crashes during `/review-context`
- Faster file reads and context loading
- Maintains historical record in archive files
- Automatic, safe, and reversible

**Manual archiving:**
```bash
bash scripts/archive-sessions-helper.sh --keep 10
```

## Append-Only Strategy

For large SESSIONS.md files (1000-2000 lines) before archiving:

```bash
# Create draft first
/save-full
# ... creates context/.session-draft.md

# Review draft
cat context/.session-draft.md

# Append to SESSIONS.md
cat context/.session-draft.md >> context/SESSIONS.md

# Clean up
rm context/.session-draft.md
```

**Why:** Avoids Read tool limits on large files, zero corruption risk.

::: tip Automatic Archiving
Once SESSIONS.md exceeds 2000 lines, use automatic archiving instead of manual append-only strategy.
:::

## Output Example

```bash
$ /save-full

📊 Gathering session information...

✅ Git data collected:
   - 5 commits since last save
   - 8 files modified
   - Current branch: main

🔢 Detecting session number...
   Next session: 16

📝 Creating comprehensive session entry...

✅ Session entry created:
   - TL;DR: 3 sentences
   - Accomplishments: 5 items
   - Problem Solved: Full context
   - Mental Models: Current understanding + gotchas
   - Files: 7 files (3 new, 4 modified)
   - TodoWrite State: 5 completed, 1 in progress, 3 pending

✅ Updated STATUS.md:
   - Current Phase
   - Work In Progress
   - Active Tasks
   - Quick Reference

✅ Updated DECISIONS.md:
   - DEC-023: Library choice (jose vs jsonwebtoken)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ COMPREHENSIVE SAVE COMPLETE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Core Updates:
  ✅ SESSIONS.md - Comprehensive session entry (Session 16, 58 lines)
  ✅ STATUS.md - Updated tasks, blockers, priorities, Quick Reference
  ✅ DECISIONS.md - Decision DEC-023 added

For AI Agents:
  • Mental models captured in SESSIONS.md
  • Decision rationale in DECISIONS.md
  • Full context available for review/takeover

Time Invested: ~12 minutes (comprehensive documentation)

Next Session:
  • Use /save for quick updates (2-3 min)
  • Use /save-full again before next break/handoff

💡 Perfect session continuity achieved!
```

## Related Commands

- [/save](/commands/save) - Quick updates (2-3 min)
- [/review-context](/commands/review-context) - View current state
- [/export-context](/commands/export-context) - Export for handoffs
- [/validate-context](/commands/validate-context) - Check documentation health

## See Also

- [Daily Work Workflow](/workflows/daily-work) - When to use /save-full
- [AI-to-AI Handoff](/workflows/ai-handoff) - Using /save-full for handoffs
- [SESSIONS.md Guide](/guide/sessions-file) - Understanding session entries
- [Mental Models](/guide/mental-models) - Externalizing your thinking
