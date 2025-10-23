# Quick Start

Get up and running with the AI Context System in 10 minutes.

## Installation (2 minutes)

### One-Command Install

```bash
curl -sL https://raw.githubusercontent.com/rexkirshner/ai-context-system/main/install.sh | bash
```

**What this does:**
- Downloads system files to current directory
- Creates `.claude/`, `scripts/`, `templates/` folders
- Installs 14 slash commands
- Sets up configuration

### Verify Installation

```bash
# Check if .claude directory exists
ls -la .claude/commands/

# Should see:
# init-context.md
# save.md
# save-full.md
# review-context.md
# ... and 10 more commands
```

## Initialize Context (3 minutes)

### Run /init-context

```bash
/init-context
```

**What happens:**
1. Creates `context/` directory
2. Generates 5 core files:
   - `claude.md` - Entry point for AI
   - `CONTEXT.md` - Project orientation
   - `STATUS.md` - Current state
   - `DECISIONS.md` - Decision log
   - `SESSIONS.md` - Session history
3. Creates `.context-config.json` - Project configuration

### Fill Out CONTEXT.md

Edit `context/CONTEXT.md` with your project details:

```markdown
## What & Why

**Project:** [Your project name]
**Business Goal:** [What problem does it solve?]
**Target Users:** [Who uses it?]

## Tech Stack

**Frontend:** [e.g., Next.js 14, React, TypeScript]
**Backend:** [e.g., PostgreSQL, Express, Prisma]
**Infrastructure:** [e.g., Vercel, AWS, Docker]
```

**Time:** 3-5 minutes to fill in the basics

## Your First Session (5 minutes)

### 1. Check Current Status

```bash
/review-context
```

**What you see:**
- Quick Reference (project overview)
- Current work in progress
- Last session summary
- System version check

### 2. Start Working

Do some actual work on your project:
- Write code
- Fix bugs
- Add features
- Refactor
- Whatever you're working on

### 3. Save Your Progress

Every 30-60 minutes:

```bash
/save
```

**What this does:**
- Updates `STATUS.md` with current work
- Regenerates Quick Reference
- Captures work in progress
- **Takes 2-3 minutes**

### 4. Before Break - Comprehensive Save

At end of session (lunch, end of day):

```bash
/save-full
```

**What this does:**
- Everything `/save` does PLUS:
- Creates new `SESSIONS.md` entry
- Documents mental models
- Captures decision rationale
- Auto-logs git operations
- **Takes 10-15 minutes**

## Daily Workflow

```bash
# 1. Start of day
/review-context

# 2. Work on project
#    (code, debug, refactor, etc.)

# 3. Save frequently (every 30-60 min)
/save

# 4. Before lunch break
/save-full

# 5. More work after lunch
#    (more coding)

# 6. Save frequently
/save

# 7. End of day
/save-full
```

## Example First Session

Here's what a complete first session looks like:

### 1. Install (9:00 AM)

```bash
cd ~/projects/my-app
curl -sL https://raw.githubusercontent.com/rexkirshner/ai-context-system/main/install.sh | bash
```

### 2. Initialize (9:02 AM)

```bash
/init-context
```

Edit `context/CONTEXT.md`:
```markdown
## What & Why

**Project:** Task Management App
**Business Goal:** Help teams organize work asynchronously
**Target Users:** Remote engineering teams (10-50 people)

## Tech Stack

**Frontend:** Next.js 14, TypeScript, Tailwind
**Backend:** PostgreSQL, Prisma
**Infrastructure:** Vercel
```

### 3. Start Session (9:10 AM)

```bash
/review-context

# Shows:
# - Project: Task Management App
# - Phase: Initial Setup
# - No work in progress yet
```

### 4. Work - Build Authentication (9:10 AM - 11:00 AM)

- Set up Supabase
- Create auth pages (login, signup)
- Implement JWT session handling
- Add protected routes

### 5. First Save (11:00 AM)

```bash
/save
```

AI updates `STATUS.md`:
```markdown
## Work In Progress

**Current Focus:** Authentication setup

- ✅ Supabase project created
- ✅ Auth pages (login/signup) built
- 🔄 JWT session handling (in progress)
- ⏳ Protected routes (next)
```

### 6. Keep Working (11:00 AM - 12:30 PM)

- Finish JWT handling
- Add protected routes
- Test auth flow

### 7. Lunch Break - Full Save (12:30 PM)

```bash
/save-full
```

AI creates `SESSIONS.md` entry:
```markdown
## Session 1 | 2025-10-24 | Initial Authentication Setup

**TL;DR:** Set up Supabase auth, built login/signup pages,
implemented JWT session handling, added protected routes.
Auth flow working end-to-end.

### Mental Models

**Current understanding:**
- Using Supabase for authentication (email + OAuth)
- JWT tokens in HTTP-only cookies
- Protected routes check session validity
- Next.js middleware handles route protection

**What's working:**
- ✅ User can sign up with email
- ✅ User can log in
- ✅ Session persists across page reloads
- ✅ Protected routes redirect to login

### Next Session

Start here:
1. Add password reset flow
2. Implement OAuth providers (Google, GitHub)
3. Test error cases (invalid email, network errors)
```

### 8. Resume After Lunch (1:30 PM)

```bash
/review-context

# Sees:
# - Last session: Authentication setup
# - Next steps: Password reset, OAuth
# - Current work: Auth complete, ready for next feature
```

Continue with password reset flow...

### 9. End of Day (5:00 PM)

```bash
/save-full

# Creates Session 2 entry
# Documents password reset implementation
# Captures decision about email service
# Auto-logs git commits
```

## Next Day

```bash
# 9:00 AM next day
/review-context

# Immediately see:
# - Project state
# - What was done yesterday
# - Where to continue
# - Any blockers

# Resume work with full context in 2 minutes
# No re-explaining needed
# Zero context loss
```

## Key Commands Reference

| Command | When | Time | What It Does |
|---------|------|------|--------------|
| `/init-context` | Once (setup) | 3 min | Creates context structure |
| `/review-context` | Start of session | 2 min | Shows current state + Quick Reference |
| `/save` | Every 30-60 min | 2-3 min | Quick STATUS.md update |
| `/save-full` | Before breaks | 10-15 min | Comprehensive save + SESSIONS.md |
| `/validate-context` | Before handoffs | 2 min | Check documentation health |
| `/export-context` | For handoffs | 1 min | Package everything for sharing |

## Tips for Success

### 1. Save Often

```bash
# Don't wait until end of day
# Save every 30-60 minutes
/save

# Safety net for unexpected interruptions
# Captures incremental progress
```

### 2. Full Saves at Boundaries

```bash
# Before any break:
/save-full

# Lunch, meetings, end of day, context switches
# Comprehensive state capture
```

### 3. Review at Start

```bash
# First thing every session:
/review-context

# Orientation in 2 minutes
# Know where to start
# No context loss
```

### 4. Trust the System

```markdown
# Document even "obvious" decisions
# Capture mental models honestly
# Future you will thank present you

# Example:
## DEC-001: Use PostgreSQL

**Decision:** PostgreSQL for database

**Why:** Need ACID transactions, complex relationships

# Even if "obvious", document it
# New AI agent needs to know
```

### 5. Read the Documentation

**After first session, read:**
- [Session Continuity](/guide/session-continuity) - How it works
- [STATUS.md Guide](/guide/status-file) - What to update
- [SESSIONS.md Guide](/guide/sessions-file) - Session history
- [Commands Reference](/commands/) - All available commands

## Troubleshooting

### Commands Not Working?

**Problem:** Slash commands don't work

**Solution:**
```bash
# Check for multiple .claude directories
find ~ -name ".claude" -type d

# Should only have one in your project root
# If multiple found, remove extras

# Keep only:
/path/to/your-project/.claude
```

### Can't Find Context Files?

**Problem:** Commands can't find context/ directory

**Solution:**
```bash
# Make sure you're in project root
pwd

# Should see:
/path/to/your-project

# Not a subdirectory like:
/path/to/your-project/src  # Wrong!
```

The system auto-detects context up to 3 parent directories, but works best from project root.

### Quick Reference Not Generated?

**Problem:** STATUS.md Quick Reference section is empty

**Solution:**
```bash
# Check .context-config.json exists
ls context/.context-config.json

# If missing, run:
/init-context

# Then run:
/save
```

## Success Checklist

After first session, verify:

- [ ] `context/` directory exists
- [ ] `context/CONTEXT.md` filled out with project details
- [ ] `context/STATUS.md` shows current work
- [ ] `context/SESSIONS.md` has Session 1 entry
- [ ] Quick Reference auto-generated in STATUS.md
- [ ] `/review-context` shows project state
- [ ] `/save` updates STATUS.md successfully
- [ ] `/save-full` creates SESSIONS.md entry

**If all checked:** You're ready to use the system! 🎉

## Next Steps

**Learn the concepts:**
- [Session Continuity](/guide/session-continuity)
- [Externalized Context](/guide/externalized-context)
- [Mental Models](/guide/mental-models)

**Explore commands:**
- [/save Command](/commands/save)
- [/save-full Command](/commands/save-full)
- [/review-context Command](/commands/review-context)

**Learn workflows:**
- [Daily Work](/workflows/daily-work)
- [AI-to-AI Handoff](/workflows/ai-handoff)
- [Human Review](/workflows/human-review)

## Remember

> **"When in doubt, /save!"**

The system is your safety net. Save frequently, trust the process, and enjoy perfect session continuity.
