# AI-to-AI Handoff Workflow

Seamlessly transfer a project from one AI agent to another with complete context preservation.

## Overview

```bash
Outgoing AI: /save-full → /validate-context → /export-context
Incoming AI: Read context/ → Read export → Start working
```

**Goal:** New AI agent has same understanding as original AI—zero context loss.

## Outgoing AI: Prepare for Handoff

### 1. Comprehensive Save (10-15 minutes)

```bash
/save-full
```

**Critical:** This captures your complete mental model.

**What gets documented:**
- Current understanding of system
- Architecture mental model
- Known constraints
- Assumptions and unknowns
- Recent work and decisions
- Problem-solving approaches
- Git operations (auto-logged)

**Example SESSIONS.md entry:**
```markdown
## Session 15 | 2025-10-24 | Pre-Handoff State

### Mental Models

**System Architecture:**
- Next.js 14 App Router with Server Components
- PostgreSQL database via Prisma ORM
- Redis caching layer (5min TTL)
- Stripe for payments (test mode, production pending approval)
- SendGrid for transactional emails

**Current State:**
- MVP 80% complete
- Payment integration working (webhooks + emails)
- Known bug: Rate limiting not implemented
- Technical debt: No automated tests yet

**Critical Constraints:**
- Must ship by Nov 15 (3 weeks)
- Budget: $50/month max
- Mobile-first (60% of users)
- GDPR compliant (no PII in logs)
```

### 2. Validate Documentation (2 minutes)

```bash
/validate-context
```

**What this checks:**
- All context files exist
- No missing sections
- Documentation not stale (checked timestamps)
- Health score (0-100)

**Example output:**
```
🔍 Validating Context Documentation

✅ CONTEXT.md - Complete (updated 2 days ago)
✅ STATUS.md - Complete (updated 1 hour ago)
✅ DECISIONS.md - Complete (15 decisions documented)
✅ SESSIONS.md - Complete (15 sessions, last updated 1 hour ago)
✅ .context-config.json - Valid

📊 Health Score: 95/100

🟢 Ready for handoff
```

**If issues found:**
```
⚠️ Issues Found:

🟡 STATUS.md - Last updated 5 days ago (stale)
🔴 DECISIONS.md - Missing "Reconsider if" section in DEC-012

Recommendation: Update STATUS.md and complete DEC-012
```

**Fix issues:**
```bash
# Update stale files
/save

# Complete missing decision sections
# Edit context/DECISIONS.md manually

# Revalidate
/validate-context
```

### 3. Export Context (1 minute)

```bash
/export-context
```

**What this does:**
- Combines all context files into single markdown
- Includes: CONTEXT.md, STATUS.md, DECISIONS.md, SESSIONS.md
- Adds navigation links
- Timestamps export
- Saves to `artifacts/exports/`

**Example output:**
```
📦 Exporting Context Documentation

✅ Combined all context files
✅ Added table of contents
✅ Generated navigation links

📄 Export saved to:
   artifacts/exports/context-export-2025-10-24.md

📊 Export contains:
   - CONTEXT.md (project orientation)
   - STATUS.md (current state)
   - DECISIONS.md (15 decisions)
   - SESSIONS.md (15 sessions)
   - Total: 45,000 words

Share this file with incoming AI agent
```

### 4. Final Message for Incoming AI

Create a handoff note in STATUS.md:

```markdown
## Handoff Notes for Incoming AI

**Date:** 2025-10-24
**From:** Claude Code (Sessions 1-15)
**To:** [Incoming AI]

**Quick Start for New AI:**
1. Read artifacts/exports/context-export-2025-10-24.md
2. Read context/claude.md (or your tool's header)
3. Run /review-context to see current state
4. Start with: Implement rate limiting (see STATUS.md)

**Critical Context:**
- Payment system live but in test mode
- Stripe production approval pending (due Oct 27)
- Rate limiting MVP blocker (must have before launch)
- Launch date: Nov 15 (hard deadline)

**Known Issues:**
- No automated tests (planned for next sprint)
- Email notifications sometimes delayed (investigate SendGrid)
- Mobile responsive on some pages needs work

**Read These First:**
- DEC-003: Next.js App Router choice (architecture foundation)
- DEC-007: Event-driven notifications (critical pattern)
- DEC-014: Stripe integration approach (payment system)
- Session 12: Webhook implementation (complex logic)
- Session 15: Current mental model (this session)

**My Recommendations:**
- Start with rate limiting (blocking launch)
- Then add tests (technical debt)
- Then fix email delays (user experience)

Good luck! The context is comprehensive. Trust the documentation.

— Claude Code
```

## Incoming AI: Take Over Project

### 1. Read Export First (10-15 minutes)

```bash
# Open the export file
cat artifacts/exports/context-export-2025-10-24.md
```

**Read in this order:**
1. **CONTEXT.md** - Understand project goals, constraints, tech stack
2. **STATUS.md** - See current state, active work, blockers
3. **DECISIONS.md** - Understand key decisions and why they were made
4. **SESSIONS.md** - Skim last 3-5 sessions for evolution

**Take notes:**
- Questions you have
- Unclear decisions
- Assumptions to verify

### 2. Read Tool-Specific Header (2 minutes)

```bash
# If you're Claude Code:
cat context/claude.md

# If you're Cursor:
cat context/cursor.md

# If you're Aider:
cat context/aider.md
```

**This tells you:**
- How to use the system with your tool
- Key commands available
- Workflow for your tool

### 3. Run Review Context (3 minutes)

```bash
/review-context
```

**What you see:**
- Quick Reference (project at a glance)
- Current work in progress
- Active blockers
- Recent accomplishments
- Next session start point

**Orient yourself:**
- What's the current focus?
- What blockers exist?
- Where should I start?

### 4. Verify Mental Model (5 minutes)

**Read last session's mental models:**
```bash
cat context/SESSIONS.md | tail -100
```

**Ask yourself:**
- Do I understand the architecture?
- Do I know the constraints?
- Are there unknowns I need to clarify?

**If confused:**
- Re-read relevant DECISIONS.md entries
- Check CONTEXT.md for constraints
- Look at recent git commits for code examples

### 5. Start Working (with confidence)

```bash
# You now have full context
# Begin where previous AI left off

# First task from STATUS.md:
# "Implement rate limiting"

# Read relevant decisions:
cat context/DECISIONS.md | grep -A 20 "rate limiting"

# Check if decision already made
# If not, make decision and document

# Start implementing
```

## Real-World Example: Claude Code → Cursor

### Outgoing: Claude Code (Oct 24, 5:00 PM)

```bash
# Wrapping up Session 15
/save-full

# Creates comprehensive session entry
# Mental models documented
# Git operations logged

# Validate before handoff
/validate-context

# Output:
Health Score: 95/100
Ready for handoff

# Export everything
/export-context

# Creates:
# artifacts/exports/context-export-2025-10-24.md
```

**Claude Code adds handoff note to STATUS.md:**
```markdown
## Handoff Notes for Cursor

**Next task:** Implement rate limiting
**Start here:** DEC-017 discusses rate limiting approach
**Blocker:** None currently
**Deadline:** Nov 15 (3 weeks)

Key context in Session 12 (webhook logic) and Session 15 (current state).
```

### Incoming: Cursor (Oct 25, 9:00 AM)

```bash
# Read export
cat artifacts/exports/context-export-2025-10-24.md

# Learns:
# - Next.js App Router architecture
# - Payment system with Stripe
# - Event-driven notifications
# - Rate limiting is next task
# - Launch deadline Nov 15

# Read Cursor-specific instructions
cat context/cursor.md

# Shows:
# - How to update STATUS.md
# - How to add SESSIONS.md entries
# - Reference templates for structure

# Review current state
# (Cursor doesn't have /review-context, reads files directly)
cat context/STATUS.md

# Sees:
# Current Focus: Rate limiting implementation
# Next Task: Add rate limiting middleware
# Reference: DEC-017 (rate limiting decision)

# Read rate limiting decision
cat context/DECISIONS.md | grep -A 30 "DEC-017"

# Learns:
# - Using express-rate-limit library
# - 100 requests per 15 minutes per IP
# - Redis for distributed rate limiting

# Start implementing
# ... code rate limiting middleware ...

# Update STATUS.md manually
# ... add work in progress entry ...

# When session ends, add SESSIONS.md entry
# ... document what was done ...
```

**Result:** Cursor has full context, continues work seamlessly.

## Handoff Checklist

### Outgoing AI

- [ ] Run `/save-full` (comprehensive state capture)
- [ ] Run `/validate-context` (ensure documentation complete)
- [ ] Fix any validation issues found
- [ ] Run `/export-context` (create handoff package)
- [ ] Add handoff note to STATUS.md
- [ ] List critical decisions/sessions to read
- [ ] Mention known issues and blockers
- [ ] Provide recommendations for priority

### Incoming AI

- [ ] Read `artifacts/exports/context-export-[date].md`
- [ ] Read CONTEXT.md (project overview)
- [ ] Read STATUS.md (current state)
- [ ] Skim DECISIONS.md (key decisions)
- [ ] Read last 3-5 SESSIONS.md entries
- [ ] Read tool-specific header (claude.md, cursor.md, etc.)
- [ ] Run `/review-context` if available
- [ ] Verify understanding of mental models
- [ ] Identify where to start
- [ ] Begin working with confidence

## Cross-Tool Handoffs

### Claude Code → Cursor

**Outgoing (Claude Code):**
```bash
/save-full
/validate-context
/export-context
```

**Incoming (Cursor):**
- Read export file
- Read context/cursor.md for workflow
- Manually update STATUS.md
- Manually add SESSIONS.md entries
- Reference templates/ for structure

### Claude Code → Aider

**Outgoing (Claude Code):**
```bash
/save-full
/export-context
```

**Incoming (Aider):**
```bash
# Read export
cat artifacts/exports/context-export-[date].md

# Read aider-specific instructions
cat context/aider.md

# Update files via aider
aider context/STATUS.md  # Update current work
aider context/SESSIONS.md  # Add session entry
```

### Any AI → Any AI

**Universal process:**
1. Outgoing AI: Document everything in context/
2. Create export (manually if no /export-context)
3. Incoming AI: Read context/ directory
4. Follow templates/ for structure
5. Continue work

## Success Metrics

> **"The incoming AI agent understands the project as deeply as the outgoing AI—no context loss, no re-explaining, seamless continuation."**

> **"The incoming AI makes decisions consistent with previous decisions because it understands the rationale."**

When these are true, handoff was successful.

## Common Pitfalls

### ❌ Skipping /save-full

**Problem:** Incomplete mental models

**Solution:** Always run /save-full before handoff

### ❌ Not Validating Context

**Problem:** Stale or missing documentation

**Solution:** Run /validate-context, fix issues

### ❌ Not Reading Export

**Problem:** Incoming AI missing critical context

**Solution:** Incoming AI must read full export

### ❌ Assuming Obvious Things

**Problem:** "Obvious" decisions not documented

**Solution:** Document everything in DECISIONS.md

## Next Steps

- [/export-context Command](/commands/export-context)
- [/validate-context Command](/commands/validate-context)
- [Mental Models Guide](/guide/mental-models)
- [SESSIONS.md Guide](/guide/sessions-file)
