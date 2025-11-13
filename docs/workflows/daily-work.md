# Daily Work Workflow

The standard workflow for daily development with perfect session continuity.

## Overview

```bash
Start session → Review context → Work → Save frequently → Full save before break → Repeat
```

**Goal:** Never lose context, always know where you are, resume instantly.

## Morning: Start of Session

### 1. Review Context (2-3 minutes)

```bash
/review-context
```

**What you see:**
- 📊 Quick Reference (project overview)
- 📝 Last session summary
- 🔄 Current work in progress
- 🚧 Active blockers
- ✅ Recent accomplishments
- 🔍 Version check

**Example output:**
```
📊 Quick Reference
Project: TaskFlow - Async task management
Phase: MVP Development
Current Focus: Stripe payment integration
Last Session: Session 12 (2025-10-23)

📝 Last Session Summary (Session 12)
Implemented Stripe webhook handler for payment confirmation.
Added idempotency checking to prevent duplicates.
Tested with Stripe CLI successfully.

🔄 Work In Progress
- Order confirmation email (next task)
- End-to-end testing (after email)

🚧 Blockers
None currently

✅ Recent Accomplishments
- Webhook handler implementation
- Idempotency system
- Order status updates

🔍 System Version
Current: v3.3.0 (latest)
```

### 2. Orient Yourself (1 minute)

**Read the output and ask:**
- ✅ What did I accomplish last session?
- ✅ What am I working on now?
- ✅ Are there any blockers?
- ✅ What's the next task?

**Result:** You're oriented and ready to start working immediately.

### 3. Open Relevant Files (1 minute)

Based on "Work In Progress", open the files you'll need:

```bash
# From review-context output:
# "Next task: Order confirmation email"

# Open relevant files:
code app/api/webhooks/stripe/route.ts
code lib/email/orderConfirmation.ts
code context/DECISIONS.md  # Check DEC-014 about email choice
```

## Working: Active Development

### Save Frequently (Every 30-60 minutes)

```bash
/save
```

**When to save:**
- ✅ Finished a feature
- ✅ Fixed a bug
- ✅ About to take a break
- ✅ Before switching contexts
- ✅ After significant progress
- ✅ Just finished a good coding session

**What `/save` does:**
```
1. Updates STATUS.md with current work
2. Regenerates Quick Reference
3. Captures work in progress
4. Documents blockers if any
5. Takes 2-3 minutes
```

**Example workflow:**
```bash
# 9:00 AM - Start work
/review-context

# 9:05 AM - 10:30 AM
# Implement order confirmation email
# Write tests
# Debug send grid integration

# 10:30 AM - Save progress
/save

# AI updates STATUS.md:
## Work In Progress
- ✅ Order confirmation email template created
- ✅ SendGrid integration configured
- 🔄 Email trigger from webhook (in progress)
- ⏳ Test email delivery
```

### Handle Blockers

**When you encounter a blocker:**

1. **Document it immediately:**
```bash
/save
```

2. **AI prompts for blocker details:**
```
Blocker detected. Describe the issue:
> Webhook fires but email doesn't send. No errors in logs.

Impact:
> Can't test end-to-end flow without email confirmation

Options being considered:
> 1. Add more detailed logging
> 2. Test SendGrid directly (bypass webhook)
> 3. Check SendGrid dashboard for failures
```

3. **STATUS.md updated:**
```markdown
## Blockers & Decisions

**BLOCKER-002: Email Not Sending from Webhook**
- Issue: Webhook processes successfully but email not sent
- Impact: Can't test full checkout flow
- Investigation: No errors in logs, need better visibility
- Options: Add logging, test SendGrid separately, check dashboard
- Blocking: End-to-end testing
```

4. **Work on blocker or switch tasks:**
```bash
# Either:
# - Investigate blocker (add logging, test separately)
# - Switch to different task (end-to-end testing can wait)

# Document what you're doing:
/save
```

### Make Decisions

**When you make a technical decision:**

1. **Add to DECISIONS.md:**
```markdown
## DEC-016: Use SendGrid API v3

**Decision:** Use SendGrid API v3 (not v2)

**Date:** 2025-10-24

**Rationale:**
- v3 is current version (v2 deprecated 2024)
- Better TypeScript support
- Cleaner API (JSON instead of form-encoded)
```

2. **Reference in STATUS.md:**
```bash
/save

# STATUS.md shows:
### Decisions Made This Session
- DEC-016: SendGrid API v3 (see DECISIONS.md)
```

## Midday: Before Break

### Full Save Before Lunch (10-15 minutes)

```bash
/save-full
```

**Why full save:**
- Comprehensive SESSIONS.md entry
- Mental models documented
- Problem-solving approach captured
- Git operations auto-logged
- Decision rationale preserved

**What happens:**
```
1. Everything /save does (STATUS.md update)
2. Creates new SESSIONS.md entry
3. AI documents:
   - Mental models (current understanding)
   - What changed (features, bugs, refactoring)
   - Decisions made (with links)
   - Problem-solving approach
   - Files changed
   - Git operations (auto-logged)
   - Next session start point
4. Takes 10-15 minutes
```

**Example SESSIONS.md entry:**
```markdown
## Session 13 | 2025-10-24 | Order Confirmation Email

**Duration:** 3h | **Focus:** Email notifications | **Status:** ✅ Complete

### TL;DR
Implemented order confirmation email triggered from Stripe webhook.
Integrated SendGrid API v3, created email template, tested delivery.
Email sends successfully after payment confirmation.

### Mental Models

**Current understanding:**
- Webhook confirms payment → triggers email send
- SendGrid API v3 for email delivery
- Template includes order details, receipt, tracking
- Error handling: log failures, retry 3x with backoff

[... rest of entry ...]

### Next Session
Start with end-to-end testing:
1. Full checkout flow (cart → payment → email)
2. Verify email delivery
3. Test error cases
```

### Take Break

- Lunch
- Meeting
- Context switch to different project
- End of day

**You're safe to step away** - full context preserved in SESSIONS.md.

## Afternoon: Resume After Break

### Review Context Again (2 minutes)

```bash
/review-context
```

**What you see:**
- Last session: Session 13 (morning work)
- Current work: End-to-end testing
- Next steps: Full checkout flow test

**Result:** Pick up exactly where you left off, zero context loss.

### Continue Working

Same pattern as morning:
- Work on tasks
- `/save` frequently (30-60 min)
- Document blockers
- Make decisions
- Test features
- Write code

## End of Day: Comprehensive Save

### Full Save Before Ending (10-15 minutes)

```bash
/save-full
```

**Creates Session 14 entry:**
```markdown
## Session 14 | 2025-10-24 | End-to-End Testing & Bug Fixes

**Duration:** 2.5h | **Focus:** Testing and debugging | **Status:** ✅ Complete

### TL;DR
Completed end-to-end testing of checkout flow. Found and fixed
email template rendering bug. Verified full flow works: cart →
checkout → payment → email. Ready for staging deployment.

[... mental models, changes, etc ...]

### Next Session
Deploy to staging:
1. Push to main branch
2. Verify Vercel deployment
3. Test on staging.taskflow.app
4. Check Stripe test mode webhooks
```

### Review Tomorrow's Start Point

```bash
# Read SESSIONS.md entry you just created
# Verify "Next Session" is clear
# Ensure you'll know where to start tomorrow
```

### Push to GitHub (if ready)

```bash
git add .
git commit -m "Add order confirmation email + end-to-end tests"
git push origin main

# Git operations auto-logged in SESSIONS.md
```

## Real-World Example: Full Day

### 9:00 AM - Start

```bash
/review-context

# Output:
Project: TaskFlow
Last Session: Session 12 (Webhook implementation)
Current Focus: Order confirmation email
Next Task: Trigger email from webhook
```

### 9:05 AM - 10:30 AM: Work

- Implement email trigger
- Write SendGrid integration
- Create email template
- Add error handling

### 10:30 AM: Save

```bash
/save

# STATUS.md updated:
## Work In Progress
- ✅ Email template created
- ✅ SendGrid integration done
- 🔄 Testing email delivery
```

### 10:30 AM - 12:00 PM: More Work

- Test email with real data
- Fix template rendering bug
- Verify email looks good

### 12:00 PM: Lunch - Full Save

```bash
/save-full

# Creates Session 13 entry
# Documents morning's work
# Captures mental models
# Auto-logs git commits
```

### 12:00 PM - 1:00 PM: Lunch Break

Walk away confident - full context saved.

### 1:00 PM: Resume

```bash
/review-context

# Output:
Last Session: Session 13 (Email implementation)
Current Focus: End-to-end testing
Next Task: Test full checkout flow
```

### 1:05 PM - 3:00 PM: Work

- Full checkout flow test
- Test error cases
- Fix bugs found
- Verify webhooks reliable

### 3:00 PM: Save

```bash
/save

# STATUS.md updated with test results
```

### 3:00 PM - 5:00 PM: More Work

- Write additional tests
- Refactor email service
- Update documentation
- Prep for staging deploy

### 5:00 PM: End of Day - Full Save

```bash
/save-full

# Creates Session 14 entry
# Documents afternoon's work
# Sets up tomorrow's start point
```

### 5:15 PM: Done

Leave confident - tomorrow you'll pick up instantly.

## Tips for Daily Workflow

### 1. Start Every Session with /review-context

```bash
# ALWAYS first command:
/review-context

# Even if you just left 10 minutes ago
# Builds the habit
# Ensures you never miss context
```

### 2. Save More Than You Think You Need

```bash
# Don't just save at breaks
# Save after meaningful progress

# Good times to save:
- Finished implementing a feature
- Fixed an annoying bug
- Made a decision
- Before switching tasks
- Just completed good work

# It's fast (2-3 min) and safe
```

### 3. Use /save-full at All Boundaries

```bash
# Lunch breaks
/save-full

# Meetings
/save-full

# End of day
/save-full

# Context switches
/save-full

# Before big refactors
/save-full
```

### 4. Read Your SESSIONS.md Entries

```bash
# After /save-full, read what was created:
cat context/SESSIONS.md | tail -100

# Verify:
# - Mental models accurate?
# - Next session clear?
# - Problem-solving captured?

# Make manual edits if needed
# This is YOUR history
```

### 5. Trust the Process

```markdown
# System captures more than you think:
- Git operations (auto-logged)
- File changes (extracted from commits)
- Decision rationale (from your input)
- Mental models (AI documents understanding)

# You don't need to remember everything
# The system remembers for you
```

## Success Metric

> **"I can end work abruptly, start days later, run /review-context, and be productive within 5 minutes."**

When this is true, daily workflow is working.

## Next Steps

- [/save Command](/commands/save) - Quick saves
- [/save-full Command](/commands/save-full) - Comprehensive saves
- [/review-context Command](/commands/review-context) - Session start
- [AI-to-AI Handoff](/workflows/ai-handoff) - Project handoffs
