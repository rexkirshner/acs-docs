# Externalized Context

Make AI thoughts, decisions, and mental models visible to humans. Turn invisible AI reasoning into tangible documentation that programmers can read, review, and reference.

## The Problem

AI reasoning is invisible by default.

When an AI agent works on your codebase:
- **Decisions are hidden** - Why did it choose approach A over B?
- **Mental models are opaque** - What does it understand about your system?
- **Constraints are unclear** - Did it understand your requirements?
- **Thought process is lost** - How did it solve that problem?

**Result:** You can see the code changes, but not the reasoning behind them.

## The Solution

**Externalize AI context** - Make AI reasoning visible in structured documentation.

The AI Context System captures:
- ✅ **Decisions with rationale** → DECISIONS.md
- ✅ **Mental models** → SESSIONS.md
- ✅ **Current understanding** → STATUS.md
- ✅ **Project constraints** → CONTEXT.md

## What Gets Externalized

### 1. Decision Rationale (DECISIONS.md)

**Problem:** AI makes technical decisions without explaining why.

**Solution:** Document every decision with:
- What was decided
- Why it was chosen
- What alternatives were considered
- What constraints influenced it
- When to reconsider

**Example:**
```markdown
## DEC-004: Use PostgreSQL Instead of MongoDB

**Decision:** Use PostgreSQL for primary database

**Context:** Building e-commerce platform with complex relationships

**Options Considered:**
1. MongoDB (document store, flexible schema)
2. PostgreSQL (relational, ACID transactions)
3. MySQL (relational, simpler than Postgres)

**Decision:** PostgreSQL

**Rationale:**
- Need ACID transactions for order processing
- Complex relationships (users, orders, products, inventory)
- JSON columns provide flexibility where needed
- Strong consistency required for financial data

**Tradeoffs:**
- ✅ ACID guarantees, complex queries, proven reliability
- ❌ Schema migrations require planning
- ❌ Slightly steeper learning curve than MySQL

**Reconsider if:**
- Data becomes primarily document-based
- Need horizontal sharding at massive scale
- Schema flexibility becomes more important than consistency
```

**Why This Matters:**
- Humans can review the reasoning
- Future developers understand why
- New AI agents can build on decisions
- Bad assumptions can be caught early

### 2. Mental Models (SESSIONS.md)

**Problem:** AI has a mental model of your system, but it's invisible.

**Solution:** Explicitly document what the AI understands.

**Example:**
```markdown
## Session 5 | 2025-10-22 | Payment Integration

### Mental Models

**Current understanding:**
- Payment flow: Cart → Checkout → Stripe → Confirmation
- Using Stripe Checkout (hosted pages, simplest integration)
- Webhook handles async payment confirmation
- Order status: pending → processing → confirmed
- Idempotency keys prevent duplicate charges

**Architecture understanding:**
- Frontend (Next.js) → API (Express) → Stripe API
- Webhooks endpoint at /api/webhooks/stripe
- Order state machine in database (PostgreSQL)
- Redis caching for session data

**Known constraints:**
- PCI compliance required (Stripe handles via Checkout)
- Must handle webhook retries (Stripe retries up to 3 days)
- Need idempotency for double-click protection
- HTTPS required in production

**Unknowns/Assumptions:**
- Assuming standard Stripe pricing (not negotiated rates)
- Not yet handling refunds (future feature)
- Subscription billing not in scope (one-time purchases only)
```

**Why This Matters:**
- You can verify AI understood correctly
- Catch misunderstandings early
- See what AI assumes vs. knows
- Enable course-correction

### 3. Current State (STATUS.md)

**Problem:** AI's view of current project state is invisible.

**Solution:** Auto-generated Quick Reference + current work.

**Example:**
```markdown
## 📊 Quick Reference

**Project:** E-commerce Platform
**Phase:** MVP Development
**Status:** 🟢 Active
**Current Focus:** Payment integration (Stripe Checkout)
**Tech Stack:** Next.js 14, Express, PostgreSQL, Redis, Stripe

## Work In Progress

**Sprint Goal:** Complete checkout flow with Stripe integration

**Active Tasks:**
- ✅ Set up Stripe account and API keys
- ✅ Implement checkout session creation
- 🔄 Build webhook handler for payment confirmation (in progress)
- ⏳ Add order confirmation email
- ⏳ Test end-to-end checkout flow

**Current Blocker:**
Need to decide webhook retry strategy (Stripe retries for 3 days)
- Option A: Process all retries (risk of duplicate processing)
- Option B: Idempotency keys + deduplication (safer, more complex)

**Next Session:**
- Implement idempotency key checking in webhook handler
- Test webhook with Stripe CLI
- Deploy to staging for end-to-end test
```

**Why This Matters:**
- See what AI thinks is important
- Verify priorities align
- Check for misunderstandings
- Human-readable project state

### 4. Project Understanding (CONTEXT.md)

**Problem:** AI's understanding of project goals/constraints is invisible.

**Solution:** Explicit documentation of orientation.

**Example:**
```markdown
## What & Why

**Project:** E-commerce platform for artisan goods marketplace

**Business Goal:** Enable small artisans to sell online without technical knowledge

**Target Users:**
- Sellers: Non-technical artisans (jewelry, pottery, art)
- Buyers: Consumers looking for unique handmade goods

**Key Constraints:**
- Must be extremely simple for sellers (no coding required)
- Mobile-first design (most artisans use phones)
- PCI compliant (handling payments)
- Budget: $500/month hosting (keeps costs low for artisans)

## How We Work

**Communication Preferences:**
- Explain decisions before implementing
- Show examples for UI changes
- Ask before major architecture changes

**Anti-Patterns (What NOT to do):**
- Don't add features without discussing impact on simplicity
- Don't use bleeding-edge tech (stability matters)
- Don't optimize prematurely (ship MVP first)
```

**Why This Matters:**
- AI knows the "why" not just the "what"
- Constraints are explicit
- Can self-correct when drifting
- Humans can verify understanding

## How Externalization Works

### Automatic Capture

Commands automatically externalize context:

**`/save` - Quick context capture (2-3 min)**
```bash
/save
```
- Updates STATUS.md with current state
- Regenerates Quick Reference
- Captures work in progress

**`/save-full` - Comprehensive capture (10-15 min)**
```bash
/save-full
```
- Everything /save does PLUS:
- New SESSIONS.md entry with mental models
- Decision rationale if any made
- Problem-solving approach
- Auto-logs git operations

### Review by Humans

**Read the externalized context:**

```bash
# See what AI decided and why
cat context/DECISIONS.md

# See AI's current mental model
cat context/SESSIONS.md | tail -100

# See AI's view of current state
cat context/STATUS.md
```

**Result:** Full transparency into AI reasoning.

## Real-World Example

### Without Externalized Context

**AI implements caching:**
- Adds Redis
- Caches API responses
- Works fine

**Human reviews:**
- "Why Redis instead of in-memory?"
- "How long is cache TTL?"
- "What happens when cache is stale?"
- AI can't explain (reasoning not captured)

**Problem:** Invisible decisions, no rationale, hard to verify.

### With Externalized Context

**AI implements caching:**
```bash
/save-full
```

**Human reads DECISIONS.md:**
```markdown
## DEC-008: Use Redis for API Response Caching

**Decision:** Redis with 5-minute TTL for product listing API

**Rationale:**
- Product data changes infrequently (artisans update monthly)
- In-memory cache lost on deploy (Heroku restarts)
- Redis persists across restarts
- 5min TTL balances freshness vs. load reduction

**Measured Impact:**
- API response time: 800ms → 45ms
- Database load: -75% on product queries
- Cost: $15/month Redis (worth it for 75% load reduction)

**Reconsider if:**
- Need real-time product updates
- Redis cost becomes prohibitive
- Deploy frequency increases (cache invalidation needed)
```

**Result:** Complete transparency, reviewable reasoning, verifiable understanding.

## Key Benefits

### 1. Human Review Enabled
- Read AI's reasoning like documentation
- Verify assumptions
- Catch misunderstandings early

### 2. Collaborative Development
- Human and AI share mental model
- Course-corrections easier
- Trust builds through transparency

### 3. Knowledge Transfer
- New team members read context
- Onboarding in hours not weeks
- Decisions documented permanently

### 4. AI-to-AI Handoffs
- New AI reads previous reasoning
- Builds on decisions (doesn't redo)
- Maintains consistency

## Best Practices

### 1. Externalize Everything
```markdown
# Not just big decisions
# Also capture:
- Why you chose library X
- Why you structured code this way
- What you understand about the domain
- What constraints you're working within
```

### 2. Be Honest About Unknowns
```markdown
**Known:** Users want email notifications
**Unknown:** How often? Immediately or batched?
**Assumption:** Assuming immediate (verify with user)
```

### 3. Document Thought Process
```markdown
**Problem-Solving Approach:**
1. Researched async job queues (Bull, BeeQueue, Agenda)
2. Tested Bull locally (performance good, 1000 jobs/sec)
3. Decided on Bull (most active maintenance)
```

### 4. Review Regularly
- Read DECISIONS.md after major changes
- Check SESSIONS.md mental models for accuracy
- Verify STATUS.md matches reality

## Success Metric

> **"I can read DECISIONS.md and SESSIONS.md and understand exactly what the AI was thinking and why."**

When this is true, you have truly externalized AI context.

## Next Steps

- [Mental Models](/guide/mental-models) - How AI understanding is captured
- [DECISIONS.md Guide](/guide/decisions-file) - Decision log structure
- [SESSIONS.md Guide](/guide/sessions-file) - Mental model documentation
- [Human Review Workflow](/workflows/human-review) - How to review AI work
