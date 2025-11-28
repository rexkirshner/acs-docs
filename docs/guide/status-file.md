# STATUS.md - Current State

**Single source of truth for "what's happening now."** Fast orientation for session continuity and handoffs.

## Purpose

STATUS.md answers the critical question: **"What's the current state of this project?"**

It provides:
- **Quick Reference** - Auto-generated project overview
- **Current phase** - Where you are in development
- **Active tasks** - What's being worked on right now
- **Blockers** - What's preventing progress
- **Next session** - Clear starting point for resuming work

**Goal:** Any AI agent can read this file and be oriented in 2-3 minutes.

## When to Update

**Update STATUS.md:**
- ✅ Every `/save` command (2-3 min, frequently)
- ✅ Every `/save-full` command (10-15 min, before breaks)
- ✅ When work in progress changes
- ✅ When blockers appear or resolve
- ✅ When moving to new development phase

**This file should always be current** - it's your safety net for session continuity.

## File Structure

### 1. Quick Reference (Auto-Generated)

**Project at a glance:**

```markdown
## 📊 Quick Reference

**Project:** TaskFlow - Async task management
**Phase:** MVP Development
**Status:** 🟢 Active
**Current Focus:** Payment integration with Stripe
**Last Session:** [Session 12 (2025-10-23)](#session-12--2025-10-23)

**Tech Stack:** Next.js 14, PostgreSQL, Redis, Stripe
**Repository:** https://github.com/user/taskflow
**Staging:** https://staging.taskflow.app
**Production:** https://taskflow.app

**Quick Links:**
- [Architecture Diagram](https://figma.com/file/abc...)
- [API Documentation](https://docs.taskflow.app)
- [Design System](https://storybook.taskflow.app)
```

**How it's generated:**
- Extracted from `.context-config.json`
- Merged with current STATUS.md data
- Updated automatically by `/save` and `/save-full`
- Parsed from headers and structured data

**Why it matters:**
- Instant project context
- No manual updating (auto-generated)
- Consistent format across projects

### 2. Current Phase

**Where you are in development:**

```markdown
## Current Phase

**Phase:** MVP Development (Sprint 4 of 6)

**Sprint Goal:** Complete payment integration and checkout flow

**Target Date:** 2025-11-15 (3 weeks remaining)

**Definition of Done:**
- ✅ Stripe account integrated
- ✅ Checkout session creation
- 🔄 Webhook handling (in progress)
- ⏳ Order confirmation emails
- ⏳ End-to-end testing
- ⏳ Production deployment
```

**Why it matters:**
- Sets scope boundaries
- Shows progress toward goal
- Enables deadline tracking

### 3. Work In Progress

**Active tasks right now:**

```markdown
## Work In Progress

**Current Sprint Tasks:**

### 🔄 In Progress
- **Stripe webhook handler** (Priority: High)
  - Listening for payment_intent.succeeded
  - Updating order status in database
  - Using idempotency keys for safety
  - Testing with Stripe CLI
  - ETA: 2 days

### ⏳ Up Next
- **Order confirmation email** (Priority: High)
  - SendGrid template created
  - Need to trigger from webhook
  - Include order details + receipt
  - ETA: 1 day

- **End-to-end checkout test** (Priority: Medium)
  - Test full flow: cart → checkout → payment → confirmation
  - Verify webhook handling
  - Check email delivery
  - ETA: 0.5 days

### ✅ Recently Completed
- Set up Stripe account and API keys (Oct 22)
- Implemented checkout session creation (Oct 23)
- Created webhook endpoint route (Oct 23)
```

**Why it matters:**
- Clear picture of active work
- Prioritization visible
- Progress tracking
- Resume point for next session

### 4. Blockers & Decisions

**What's preventing progress:**

```markdown
## Blockers & Decisions Needed

### 🚧 Current Blockers

**BLOCKER-001: Webhook Retry Strategy**
- **Issue:** Stripe retries webhooks for up to 3 days
- **Impact:** Risk of duplicate order processing if not handled
- **Options:**
  - A) Process all retries (simple but risky)
  - B) Idempotency keys + deduplication (safer, more complex)
- **Blocking:** Order confirmation email (depends on webhook being reliable)
- **Decision needed:** Which approach to use?

### ⏰ Waiting On

**WAIT-001: Stripe Production Approval**
- Submitted: Oct 20
- Expected: Oct 27 (7 days)
- Impact: Can't deploy to production until approved
- Mitigation: Continue development in test mode

### ✅ Recently Resolved

**RESOLVED-001: Payment Currency**
- Decision: USD only for MVP (Oct 22)
- Rationale: Simpler, most users in US
- International support in v2.0
```

**Why it matters:**
- Identifies what's blocking progress
- Documents decisions needed
- Shows what's waiting on external factors
- Tracks resolution of blockers

### 5. Recent Accomplishments

**What's been done recently:**

```markdown
## Recent Accomplishments

**This Week (Oct 21-27):**
- ✅ Integrated Stripe SDK and configured API keys
- ✅ Built checkout session creation endpoint
- ✅ Created webhook listener route
- ✅ Implemented basic order status tracking
- ✅ Added idempotency key generation

**Last Week (Oct 14-20):**
- ✅ Designed payment flow (cart → checkout → confirmation)
- ✅ Created order data model in PostgreSQL
- ✅ Built shopping cart API endpoints
- ✅ Implemented cart session management with Redis
```

**Why it matters:**
- Shows momentum
- Useful for status updates
- Helps with retrospectives
- Morale boost (visible progress)

### 6. Next Session

**Where to start when you return:**

```markdown
## Next Session Start Point

**When you return, start here:**

1. **Read this STATUS.md** (you're doing it now! ✅)
2. **Check webhook handler progress:**
   - Review `app/api/webhooks/stripe/route.ts`
   - Test with Stripe CLI: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`
   - Verify idempotency key checking works
3. **If webhook works, move to email:**
   - Trigger order confirmation email from webhook
   - Test email template rendering
   - Verify email delivery
4. **If stuck, see BLOCKER-001** (webhook retry strategy)

**Estimated session time:** 3-4 hours to complete webhook + email

**Context files to review:**
- DECISIONS.md: DEC-012 (Stripe integration approach)
- SESSIONS.md: Session 12 (webhook implementation details)
```

**Why it matters:**
- Zero orientation time
- Clear action items
- Immediate productivity
- No context loss

## Auto-Generated Quick Reference

The Quick Reference section is **automatically generated** by `/save` and `/save-full` commands.

### What Gets Extracted

**From `.context-config.json`:**
```json
{
  "project": {
    "name": "TaskFlow",
    "description": "Async task management for remote teams",
    "repository": "https://github.com/user/taskflow"
  },
  "techStack": {
    "frontend": "Next.js 14",
    "backend": "PostgreSQL",
    "infrastructure": "Vercel"
  },
  "urls": {
    "staging": "https://staging.taskflow.app",
    "production": "https://taskflow.app"
  }
}
```

**From STATUS.md itself:**
```markdown
## Current Phase
Phase: MVP Development

## Work In Progress
Current Focus: Payment integration with Stripe
```

**Result:**
```markdown
## 📊 Quick Reference
**Project:** TaskFlow - Async task management for remote teams
**Phase:** MVP Development
**Status:** 🟢 Active
**Current Focus:** Payment integration with Stripe
**Tech Stack:** Next.js 14, PostgreSQL, Vercel
```

### How It Works

1. `/save` or `/save-full` runs
2. `scripts/update-quick-reference.sh` executes
3. Reads `.context-config.json`
4. Parses STATUS.md for current phase/focus
5. Links to latest SESSIONS.md entry
6. Generates formatted Quick Reference
7. Updates STATUS.md in place

**You never manually edit Quick Reference** - it's always current.

## Cross-Document Consistency

::: tip New in v3.5.0
Automatic consistency checking detects drift across context files.
:::

The `/review-context` command now automatically checks for inconsistencies across your context files:

### What Gets Checked

**Last Updated Dates:**
- Compares timestamps across CONTEXT.md, STATUS.md, and SESSIONS.md
- Warns if files have drifted (e.g., STATUS.md updated but CONTEXT.md not)
- Suggests running `/save` or `/save-full` to synchronize

**Phase Consistency:**
- Verifies current phase matches between CONTEXT.md and STATUS.md
- Detects mismatches (e.g., "MVP Development" in one, "Beta Testing" in another)
- Recommends updating the outdated file

**Session Count Accuracy:**
- Validates session numbering in SESSIONS.md
- Checks for gaps or duplicate session numbers
- Ensures session index matches actual session count

### Example Warnings

```markdown
⚠️  Consistency Check Results:

1. Last Updated Drift Detected
   - STATUS.md: 2025-10-23
   - CONTEXT.md: 2025-10-15 (8 days old)
   - Action: Run /save to update CONTEXT.md

2. Phase Mismatch
   - CONTEXT.md shows: "MVP Development"
   - STATUS.md shows: "Beta Testing"
   - Action: Update CONTEXT.md phase to match current state

3. Session Count Issue
   - SESSIONS.md header shows: "23 sessions"
   - Actual session entries: 24
   - Action: Update session index count
```

### Benefits

- **Automatic Detection:** No manual checking required
- **Actionable Warnings:** Specific, clear fix instructions
- **Zero Drift:** Keeps all context files synchronized
- **Trust in Documentation:** Confidence that files are current

### How It Works

1. `/review-context` runs
2. Reads metadata from all context files
3. Compares timestamps, phases, session counts
4. Generates warnings for any mismatches
5. Provides specific actions to resolve

**You don't need to do anything** - the system warns you automatically when files drift.

## Real-World Example

Complete STATUS.md for active project:

```markdown
# Project Status

## 📊 Quick Reference

**Project:** TaskFlow - Async task management for remote teams
**Phase:** MVP Development (Sprint 4 of 6)
**Status:** 🟢 Active
**Current Focus:** Stripe payment integration
**Last Session:** [Session 12 (2025-10-23)](#session-12)

**Tech Stack:** Next.js 14, PostgreSQL, Redis, Stripe
**Repository:** https://github.com/acme/taskflow
**Staging:** https://staging.taskflow.app
**Production:** https://taskflow.app (not yet deployed)

**Quick Links:**
- [Figma Designs](https://figma.com/file/...)
- [API Docs](https://docs.taskflow.app)
- [Storybook](https://storybook.taskflow.app)

---

## Current Phase

**Phase:** MVP Development (Sprint 4 of 6)

**Sprint Goal:** Complete payment integration and checkout flow

**Target Date:** 2025-11-15 (3 weeks remaining)

**Sprint Scope:**
- ✅ Stripe account setup
- ✅ Checkout session creation
- 🔄 Webhook handling (in progress)
- ⏳ Order confirmation emails
- ⏳ End-to-end testing
- ⏳ Production deployment

**Post-MVP Roadmap:**
- v1.1: Recurring subscriptions
- v1.2: Team billing
- v2.0: Multi-currency support

---

## Work In Progress

### 🔄 Active Tasks

**HIGH: Stripe Webhook Handler**
- Implementing payment_intent.succeeded handler
- Using idempotency keys for duplicate prevention
- Database transaction for order status update
- Testing with Stripe CLI
- **ETA:** 2 days
- **Assigned:** Claude Code Session 12
- **Branch:** feature/stripe-webhooks

**MEDIUM: Order Confirmation Email**
- SendGrid template created
- Trigger from webhook on successful payment
- Include: order details, receipt, tracking info
- **ETA:** 1 day
- **Blocked by:** Webhook handler completion
- **Branch:** feature/order-emails

### ⏳ Queued (Up Next)

**End-to-End Testing**
- Full checkout flow test (cart → payment → email)
- Test error cases (failed payment, timeout, etc.)
- Verify webhook reliability
- **ETA:** 0.5 days

**Production Deployment**
- Stripe production keys
- Environment variable setup
- Deploy to Vercel
- DNS configuration
- **ETA:** 0.5 days
- **Blocked by:** Stripe production approval

### ✅ Recently Completed (This Sprint)

- Stripe SDK integration (Oct 22)
- Checkout session API endpoint (Oct 23)
- Webhook route creation (Oct 23)
- Idempotency key generation (Oct 23)
- Basic order status tracking (Oct 23)

---

## Blockers & Decisions

### 🚧 Active Blockers

**BLOCKER-001: Webhook Retry Strategy**
- **Issue:** Stripe retries failed webhooks for up to 3 days
- **Risk:** Duplicate order processing if webhook fires multiple times
- **Impact:** Blocking order confirmation email (need reliable webhook)
- **Options:**
  - A) Process all retries blindly (risky - could duplicate orders)
  - B) Check idempotency key + order status before processing (safer)
  - C) Use Stripe's idempotency guarantees + our own dedup (recommended)
- **Decision needed:** Which approach? Leaning toward C.
- **Research done:** Stripe docs, best practices articles
- **Timeline:** Need decision today to proceed with email

### ⏰ Waiting On

**WAIT-001: Stripe Production Account Approval**
- **Submitted:** Oct 20, 2025
- **Expected:** Oct 27, 2025 (7 business days)
- **Impact:** Cannot deploy to production
- **Mitigation:** Continue development in test mode
- **Fallback:** Manual approval request if delayed

### ✅ Recently Resolved

**RESOLVED-001: Payment Currency Support**
- **Resolved:** Oct 22, 2025
- **Decision:** USD only for MVP
- **Rationale:** 95% of beta users in US, simpler implementation
- **Future:** Multi-currency in v2.0
- **Documented:** DECISIONS.md DEC-012

---

## Recent Accomplishments

**Week of Oct 21-27 (Current):**
- ✅ Integrated Stripe SDK (checkout + webhooks)
- ✅ Built checkout session creation endpoint
- ✅ Created webhook listener route
- ✅ Implemented idempotency key system
- ✅ Added order status tracking in database
- 🔄 Webhook handler implementation (in progress)

**Week of Oct 14-20:**
- ✅ Designed end-to-end payment flow
- ✅ Created PostgreSQL order schema
- ✅ Built shopping cart API (CRUD operations)
- ✅ Implemented cart session management (Redis)
- ✅ Added cart item validation

**Week of Oct 7-13:**
- ✅ User authentication (email + OAuth)
- ✅ Product catalog API
- ✅ Product detail pages
- ✅ Image upload to Supabase Storage
- ✅ Basic search functionality

---

## Next Session Start Point

**When you return:**

1. ✅ **Read STATUS.md** (you're here!)
2. **Check webhook handler:**
   - File: `app/api/webhooks/stripe/route.ts`
   - Run Stripe CLI: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`
   - Test payment flow: create test order, trigger webhook
   - Verify idempotency key prevents duplicates
3. **Resolve BLOCKER-001:**
   - Review Stripe docs on idempotency
   - Implement chosen retry strategy
   - Write test cases for duplicate webhooks
4. **Move to order email:**
   - Trigger SendGrid from webhook
   - Test template rendering
   - Verify delivery

**Estimated time:** 3-4 hours to complete webhook + email

**If stuck:**
- Review DECISIONS.md DEC-012 (Stripe integration rationale)
- Check SESSIONS.md Session 12 (webhook implementation notes)
- Stripe docs: https://stripe.com/docs/webhooks/best-practices

**Success criteria:**
- Webhook handles successful payments reliably
- No duplicate orders from retries
- Email sent immediately after payment
- Order status updates correctly

---

**Last Updated:** 2025-10-23 15:30 (Session 12)
**Next Review:** After webhook handler completion
```

## Best Practices

### 1. Update Frequently

```bash
# Every 30-60 minutes during active work
/save

# Before any break (lunch, end of day, context switch)
/save-full
```

**Why:** STATUS.md should always reflect current reality.

### 2. Be Specific in Work In Progress

```markdown
# Too vague:
- Working on webhooks

# Better:
- Implementing payment_intent.succeeded webhook handler
- Using idempotency keys for duplicate prevention
- Testing with Stripe CLI
- ETA: 2 days
```

### 3. Document Blockers Thoroughly

```markdown
# Include:
- What's blocked
- Why it's blocked
- Impact (what can't proceed)
- Options being considered
- Decision timeline
- Who needs to decide
```

### 4. Keep Next Session Actionable

```markdown
# Not helpful:
"Continue working on payments"

# Helpful:
"Test webhook with Stripe CLI:
 stripe listen --forward-to localhost:3000/api/webhooks/stripe
 Then verify idempotency key checking in route.ts"
```

### 5. Trust Auto-Generation

```markdown
# Don't manually edit Quick Reference
# Let /save and /save-full handle it
# Update .context-config.json if base info changes
```

## Integration with Other Files

**STATUS.md works with:**

- **CONTEXT.md** - References project overview (doesn't duplicate)
- **DECISIONS.md** - Links to relevant decisions (e.g., "See DEC-012")
- **SESSIONS.md** - Links to recent sessions for detailed history
- **.context-config.json** - Source data for auto-generated Quick Reference

**Flow:**
1. Work happens
2. `/save` updates STATUS.md + regenerates Quick Reference
3. `/save-full` also adds SESSIONS.md entry
4. STATUS.md always shows "now"
5. SESSIONS.md preserves history

## Success Metric

> **"I can read STATUS.md and know exactly what's happening, what's blocking progress, and where to start—in under 3 minutes."**

When this is true, STATUS.md is effective.

## Next Steps

- [DECISIONS.md Guide](/guide/decisions-file) - Document decision rationale
- [SESSIONS.md Guide](/guide/sessions-file) - Session history
- [/save Command](/commands/save) - Quick STATUS.md updates
- [/save-full Command](/commands/save-full) - Comprehensive updates with sessions
