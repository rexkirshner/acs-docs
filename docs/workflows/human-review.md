# Human Review of AI Work

How programmers review AI-generated code and decisions using externalized context.

## Overview

```
Read DECISIONS.md → Check SESSIONS.md → Review STATUS.md → Verify understanding → Approve or course-correct
```

**Goal:** Verify AI understood requirements, made sound decisions, and implemented correctly.

## Why Review AI Work?

### Catch Misunderstandings Early

**Problem:** AI might misinterpret requirements.

**Solution:** Review externalized reasoning.

**Example:**
```markdown
# AI documented in SESSIONS.md:
"Implementing real-time notifications using WebSockets"

# Human reads this and thinks:
"Wait, we wanted async-first, not real-time!"

# Course-correct before code is written
```

### Verify Decision Rationale

**Problem:** AI makes technical decisions—are they sound?

**Solution:** Read DECISIONS.md for reasoning.

**Example:**
```markdown
## DEC-005: Use MongoDB

**Rationale:** Need flexible schema for evolving product data

# Human reviews:
# - Do we really need flexible schema?
# - What about ACID transactions for orders?
# - Should we reconsider PostgreSQL with JSON columns?
```

### Learn AI's Thought Process

**Problem:** Code shows *what*, not *why* or *how* AI solved problem.

**Solution:** Read SESSIONS.md problem-solving approach.

**Example:**
```markdown
### Problem-Solving Approach

**Challenge:** N+1 query causing slow API (1.2s)

**Investigation:**
1. Added query logging
2. Found 100+ SELECT statements per request
3. Missing eager loading in ORM

**Solution:** Added .include({ relations: true })
**Result:** 1.2s → 120ms

# Human learns:
# - How AI debugged performance
# - What tools AI used
# - Pattern for future optimization
```

## Review Workflow

### 1. Read DECISIONS.md (5-10 minutes)

**What to look for:**
- ✅ Are decisions sound?
- ✅ Were alternatives considered?
- ✅ Do tradeoffs make sense?
- ✅ Are constraints understood correctly?

**Review each decision:**
```markdown
## DEC-007: Event-Driven Architecture for Notifications

**Decision:** Publish/subscribe pattern with Redis

**Rationale:**
- Decouples notification logic
- Easy to add new notification types
- Redis already in stack

**Alternatives Considered:**
1. Direct service calls (tight coupling)
2. RabbitMQ (overkill for our scale)
3. Webhooks (external dependency)

**Tradeoffs:**
- ✅ Loose coupling, extensible
- ❌ More complex than direct calls
```

**Questions to ask:**
- Is decoupling really needed here?
- Is Redis pub/sub reliable enough?
- What if we need guaranteed delivery?
- Should we start simpler and refactor later?

**If sound:** ✅ Approve

**If questionable:** Add comment to DECISIONS.md:
```markdown
## DEC-007: Event-Driven Architecture

**Human Review (2025-10-24):**
⚠️ Concern: Redis pub/sub not persistent. If subscriber down,
messages lost. Consider RabbitMQ if we need guaranteed delivery.

**Action:** Monitor in production. If >1% message loss,
migrate to RabbitMQ. See DEC-007-FOLLOWUP.
```

### 2. Check SESSIONS.md Mental Models (10-15 minutes)

**What to look for:**
- ✅ Does AI understand the system correctly?
- ✅ Are assumptions valid?
- ✅ Did AI understand constraints?
- ✅ Are there knowledge gaps?

**Read latest session:**
```markdown
## Session 12 | Stripe Webhook Implementation

### Mental Models

**Current understanding:**
- Webhooks can fire multiple times (retries)
- Need idempotency to prevent duplicate orders
- Using Stripe event ID as idempotency key
- Database transaction for atomicity

**Known constraints:**
- Webhook signature expires after 300 seconds
- Stripe retries for up to 3 days
- Must return 200 OK quickly

**Assumptions:**
- Event IDs are globally unique ✅
- Signature prevents replay attacks ✅
- Order confirmation email <5s ⚠️ (need to verify)
```

**Verify:**
- ✅ Understanding correct
- ✅ Assumptions marked appropriately
- ⚠️ One assumption needs verification (email speed)

**Action:** Test email speed, update assumption.

### 3. Review STATUS.md (3-5 minutes)

**What to look for:**
- ✅ Is current work aligned with priorities?
- ✅ Are blockers being addressed?
- ✅ Does next session plan make sense?

**Read current state:**
```markdown
## Work In Progress

**HIGH: Rate Limiting Implementation**
- Using express-rate-limit library
- 100 req/15min per IP
- Redis for distributed limiting

**MEDIUM: Email Optimization**
- SendGrid batch API
- Queue for async delivery

**LOW: UI Polish**
- Mobile responsive tweaks
```

**Questions:**
- Are priorities correct? (HIGH/MEDIUM/LOW)
- Should rate limiting be higher priority than email?
- Is UI polish really low priority before launch?

**If misaligned:** Update STATUS.md priorities:
```markdown
## Work In Progress

**CRITICAL: Rate Limiting** (launch blocker)
**HIGH: Email Reliability** (user experience)
**MEDIUM: UI Polish** (nice to have)
```

### 4. Spot-Check Code (15-30 minutes)

**What to review:**
- Critical paths (authentication, payments, security)
- Complex logic (algorithms, business rules)
- External integrations (APIs, webhooks)
- Security-sensitive code (auth, data access)

**Example: Review webhook handler**
```typescript
// app/api/webhooks/stripe/route.ts

export async function POST(req: Request) {
  // Read SESSIONS.md Session 12 for context

  const sig = req.headers.get('stripe-signature');

  // Verify signature (good - prevents attacks)
  const event = stripe.webhooks.constructEvent(
    await req.text(),
    sig,
    process.env.STRIPE_WEBHOOK_SECRET
  );

  // Check idempotency (good - prevents duplicates)
  const existing = await db.webhookEvent.findUnique({
    where: { eventId: event.id }
  });

  if (existing) return new Response('OK', { status: 200 });

  // Process payment (in transaction - good)
  await db.$transaction(async (tx) => {
    await tx.webhookEvent.create({
      data: { eventId: event.id, processedAt: new Date() }
    });

    await tx.order.update({
      where: { id: event.data.object.metadata.orderId },
      data: { status: 'confirmed' }
    });
  });

  return new Response('OK', { status: 200 });
}
```

**Verify:**
- ✅ Signature verification (security)
- ✅ Idempotency check (correctness)
- ✅ Database transaction (atomicity)
- ✅ Returns 200 OK (Stripe requirement)

**Matches documented approach:** ✅ Yes (see SESSIONS.md Session 12)

### 5. Approve or Course-Correct

**If everything looks good:**
```markdown
# Add human approval to SESSIONS.md:

## Session 12 | Stripe Webhook Implementation

**Human Review (2025-10-24):**
✅ Reviewed webhook implementation
✅ Verified signature checking
✅ Confirmed idempotency approach sound
✅ Code matches documented mental model
✅ Approved for production

Reviewer: [Your name]
```

**If issues found:**
```markdown
## Session 12 | Stripe Webhook Implementation

**Human Review (2025-10-24):**
⚠️ Issue found: No error handling for database failures

**Concern:** If database transaction fails, webhook returns 500.
Stripe will retry, but order might be in inconsistent state.

**Action Required:**
1. Add try/catch around transaction
2. Log error details
3. Return 200 OK even on failure (let Stripe retry)
4. Add dead letter queue for failed webhooks

**Status:** Needs refactor before production

Reviewer: [Your name]
```

## Review Checklists

### Decision Review Checklist

- [ ] All decisions documented in DECISIONS.md
- [ ] Rationale makes sense
- [ ] Alternatives were considered
- [ ] Tradeoffs are acceptable
- [ ] Constraints understood correctly
- [ ] "Reconsider if" is concrete
- [ ] References provided

### Mental Model Review Checklist

- [ ] AI understands architecture correctly
- [ ] Business logic grasped accurately
- [ ] Constraints documented
- [ ] Assumptions marked clearly
- [ ] Unknowns identified
- [ ] No obvious knowledge gaps

### Code Review Checklist

- [ ] Matches documented approach
- [ ] Security best practices followed
- [ ] Error handling adequate
- [ ] Performance acceptable
- [ ] Tests exist for critical paths
- [ ] No obvious bugs

## Real-World Example

### Scenario: Review Payment Integration

**1. Read DEC-014 (Stripe Integration):**
```markdown
## DEC-014: Stripe Checkout (Hosted Pages)

**Decision:** Use Stripe Checkout instead of Elements

**Rationale:**
- Simpler integration (hosted pages)
- PCI compliance handled by Stripe
- Faster to market

**Tradeoffs:**
- ✅ Less code to maintain
- ❌ Less UI customization
```

**Human thinks:**
- Checkout makes sense for MVP
- Can migrate to Elements later if needed
- ✅ Approved

**2. Check Session 12 Mental Model:**
```markdown
**Mental Models:**
- Checkout creates session → redirects to Stripe
- Webhook confirms payment → updates order
- Email sent after confirmation

**Assumptions:**
- Webhook always fires ⚠️
```

**Human catches:**
- ⚠️ Webhooks can fail (network, downtime)
- Need fallback: polling Stripe API
- Add to STATUS.md as blocker

**3. Review Webhook Code:**
```typescript
// No error handling! ❌
await db.order.update(...);
```

**Human finds:**
- ❌ No try/catch
- ❌ No logging
- ❌ Returns 500 on error (Stripe retries)

**4. Course-Correct:**
```markdown
## Action Items for AI:

1. Add error handling to webhook:
   - try/catch around database operations
   - Log all errors with context
   - Return 200 OK always (Stripe retries)

2. Implement fallback:
   - Cron job: check pending orders >15min
   - Poll Stripe API for payment status
   - Update order if payment succeeded

3. Add monitoring:
   - Alert on webhook failures
   - Dashboard for failed webhooks

4. Update DEC-014:
   - Document fallback strategy
   - Note webhook reliability concern
```

## Tips for Effective Review

### 1. Review Incrementally

```bash
# Don't wait weeks to review
# Review after each /save-full

# Daily cadence:
- AI runs /save-full
- Human reads SESSIONS.md entry
- Human spot-checks code
- Approve or course-correct quickly
```

### 2. Focus on Critical Paths

```markdown
# Review exhaustively:
- Authentication/authorization
- Payment processing
- Data security
- External API integrations

# Review lightly:
- UI components
- CSS styling
- Minor refactoring
```

### 3. Verify Constraints Understood

```markdown
# Check AI got the constraints:
- Performance requirements
- Security requirements
- Budget limits
- Technical constraints
- Business rules

# If AI misunderstood, update CONTEXT.md
# Then re-run /save to update understanding
```

### 4. Use Decisions as Checkpoints

```markdown
# Before AI implements feature:
# 1. AI documents decision in DECISIONS.md
# 2. Human reviews decision
# 3. Human approves or suggests alternative
# 4. AI implements with approved approach

# Prevents wasted work on wrong approach
```

### 5. Document Review Outcomes

```markdown
# Always add review notes to SESSIONS.md:
**Human Review (2025-10-24):**
✅ Approved
OR
⚠️ Issues found: [list]
OR
❌ Rejected: [reason]

# Creates audit trail
# Future AI knows what was reviewed
```

## Success Metric

> **"I can read DECISIONS.md and SESSIONS.md and confidently verify the AI understood requirements and made sound technical choices."**

When this is true, review process is effective.

## Next Steps

- [DECISIONS.md Guide](/guide/decisions-file)
- [SESSIONS.md Guide](/guide/sessions-file)
- [Externalized Context](/guide/externalized-context)
- [Daily Work Workflow](/workflows/daily-work)
