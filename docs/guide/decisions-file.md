# DECISIONS.md - Decision Log

**WHY choices were made.** Critical for AI collaboration, peer review, and understanding project evolution.

## Purpose

DECISIONS.md answers the question: **"Why did we choose this approach?"**

It documents:
- **What** was decided
- **Why** it was chosen over alternatives
- **What alternatives** were considered
- **What constraints** influenced the decision
- **When to reconsider** the decision

**Goal:** Anyone (human or AI) can understand the reasoning behind every significant choice.

## Why This Matters

### For AI Agents

**Problem:** AI makes decisions but doesn't explain why.

**Solution:** Document rationale so future AI (or same AI later) understands reasoning.

**Example:**
```markdown
## DEC-005: Use PostgreSQL Instead of MongoDB

**Why we chose this:** Need ACID transactions for financial data,
complex relationships between entities, strong consistency required.

**Why not MongoDB:** Document store works for flexible schemas,
but we need relational integrity for orders/payments/inventory.
```

**Result:** New AI agent reads this, understands why PostgreSQL, builds on it instead of questioning it.

### For Humans

**Problem:** Code shows *what* but not *why*.

**Solution:** Decision log explains reasoning.

**Example:**
Developer sees Redis caching layer, wonders "Why Redis?"

Reads DECISIONS.md:
```markdown
## DEC-008: Redis for Session Caching

**Why:** Session data needs to persist across server restarts (Heroku),
in-memory cache would lose sessions on deploy. Redis provides
persistence + speed. 5-minute TTL balances freshness vs. load.
```

**Result:** Developer understands reasoning, can make informed changes.

### For Collaboration

**Problem:** Team members (human or AI) redo work because they don't know decisions were already made.

**Solution:** Decision log prevents re-litigation.

**Example:**
New developer suggests "We should use MongoDB for flexibility!"

Read DECISIONS.md DEC-005, see it was already considered and rejected for specific reasons.

**Result:** No wasted time re-debating, can discuss if constraints changed instead.

## File Structure

### Decision Entry Format

Each decision follows this structure:

```markdown
## DEC-XXX: [Short Decision Title]

**Decision:** [One sentence: what was decided]

**Date:** YYYY-MM-DD

**Context:** [Why this decision was needed]

**Status:** ✅ Active | ⏸️ Superseded | ❌ Reversed

**Options Considered:**
1. [Option A with brief description]
2. [Option B with brief description]
3. [Option C with brief description]

**Decision:** [Option chosen]

**Rationale:**
- [Key reason 1]
- [Key reason 2]
- [Key reason 3]

**Tradeoffs:**
- ✅ **Pros:** [Benefits of this choice]
- ❌ **Cons:** [Downsides accepted]

**Impact:**
- [What this affects]
- [What changes as a result]

**Reconsider if:**
- [Condition 1 that would invalidate decision]
- [Condition 2 that would invalidate decision]

**References:**
- [Link to spike/research]
- [Link to discussion]
- [External documentation]
```

### Numbering Convention

**DEC-XXX:** Sequential numbering (DEC-001, DEC-002, etc.)

**Why sequential:** Easy to reference, shows decision timeline, no categorization needed.

**Gaps are okay:** If decision reversed, keep number but mark status as ❌ Reversed.

## Real-World Examples

### Example 1: Technology Choice

```markdown
## DEC-003: Use Next.js App Router Instead of Pages Router

**Decision:** Build new features using Next.js 14 App Router (Server Components)

**Date:** 2025-10-15

**Context:** Starting new project, Next.js 13+ offers App Router with Server Components.
Need to decide: Pages Router (stable, familiar) vs. App Router (modern, better performance).

**Status:** ✅ Active

**Options Considered:**
1. **Pages Router** - Stable, team knows it, lots of examples
2. **App Router** - Newer, Server Components, better performance
3. **Different framework** - Remix, SvelteKit (more disruption)

**Decision:** App Router (Option 2)

**Rationale:**
- Server Components reduce client JS bundle (faster load times)
- Streaming SSR improves perceived performance
- Better data fetching patterns (no getServerSideProps complexity)
- Next.js 14 is stable enough (not bleeding edge anymore)
- Team willing to learn (not huge productivity hit)

**Tradeoffs:**
- ✅ **Pros:** Better performance, modern patterns, future-proof
- ❌ **Cons:** Fewer Stack Overflow answers, some libraries incompatible,
              team learning curve (~1 week)

**Impact:**
- All new pages use App Router structure (app/ directory)
- Components default to Server Components
- Client Components only when needed (use 'use client')
- Migration path for existing Pages Router code (gradual)

**Reconsider if:**
- Major bugs discovered in App Router in production
- Team productivity drops significantly (>20% slower)
- Critical library incompatibility blocks feature

**References:**
- [Next.js App Router Docs](https://nextjs.org/docs/app)
- [Performance spike results](./spikes/app-router-perf.md)
```

### Example 2: Architecture Decision

```markdown
## DEC-007: Event-Driven Architecture for Notifications

**Decision:** Use event-driven pattern (publish/subscribe) for notifications instead of direct service calls

**Date:** 2025-10-18

**Context:** Notifications need to trigger from multiple places (task created, user mentioned,
deadline approaching, etc.). Current approach: direct calls to notification service from each feature.
Problem: Tight coupling, hard to add new notification types.

**Status:** ✅ Active

**Options Considered:**
1. **Direct calls** - Service A calls NotificationService.send() directly
2. **Event bus** - Services publish events, NotificationService subscribes
3. **Message queue** - RabbitMQ/SQS for async processing
4. **Webhooks** - External webhook system

**Decision:** Event bus with Redis pub/sub (Option 2)

**Rationale:**
- Decouples features from notification logic
- Easy to add new notification types (just subscribe)
- Can add multiple subscribers (email + in-app + push)
- Redis already in stack (no new dependency)
- Simpler than full message queue for our scale
- Synchronous enough for immediate notifications

**Tradeoffs:**
- ✅ **Pros:** Loose coupling, extensible, maintainable
- ❌ **Cons:** More complex than direct calls, harder to trace flow,
              Redis pub/sub not persistent (messages lost if subscriber down)

**Impact:**
- All notification triggers publish events (TaskCreated, UserMentioned, etc.)
- NotificationService subscribes to relevant events
- Easy to add: push notifications, Slack integration, SMS
- Better testing (can mock event bus)

**Reconsider if:**
- Need guaranteed delivery (Redis pub/sub not persistent) → migrate to RabbitMQ
- Scale beyond Redis pub/sub capacity (100K+ events/sec)
- Notification delays become unacceptable (want <100ms)

**References:**
- [Event-Driven Architecture Patterns](https://example.com)
- Implementation: `lib/events/eventBus.ts`
```

### Example 3: Process Decision

```markdown
## DEC-011: Continuous Deployment to Staging, Manual to Production

**Decision:** Auto-deploy to staging on merge to main, require manual approval for production

**Date:** 2025-10-20

**Context:** Need to balance speed (deploy often) with safety (don't break production).
Current: manual deploys to both staging and production (slow feedback).

**Status:** ✅ Active

**Options Considered:**
1. **Manual everywhere** - Engineer clicks deploy for staging and production
2. **Auto staging, manual prod** - CI/CD to staging, button for production
3. **Continuous deployment everywhere** - Auto-deploy to production on merge
4. **Scheduled deploys** - Deploy to production daily at 9am

**Decision:** Auto staging, manual production (Option 2)

**Rationale:**
- Fast feedback loop (staging deploys in 5 min after merge)
- Catch issues in staging before production
- Production deploy requires conscious decision
- Can batch multiple PRs into one production deploy
- Allows testing in staging-production parity environment

**Tradeoffs:**
- ✅ **Pros:** Fast iteration, safety gate, flexibility on prod timing
- ❌ **Cons:** Extra click for prod, staging might drift if prod deploys delayed

**Impact:**
- GitHub Actions auto-deploys to staging on main branch merge
- Vercel staging URL updates automatically
- Production deploy via "Deploy to Production" button in Vercel
- Slack notification on staging deploy success
- Weekly reminder if production behind staging >5 days

**Reconsider if:**
- Automated tests reach >95% confidence (could auto-deploy to prod)
- Staging deploys breaking too often (need more checks before staging)
- Team wants faster prod deploys (could try deploy windows)

**References:**
- CI/CD config: `.github/workflows/deploy.yml`
- [Continuous Deployment Best Practices](https://example.com)
```

### Example 4: Reversed Decision

```markdown
## DEC-002: Use GraphQL for API (REVERSED)

**Decision:** ~~Use GraphQL instead of REST API~~ **REVERSED - See DEC-009**

**Date:** 2025-10-10

**Status:** ❌ Reversed (2025-10-16)

**Original Rationale:**
- Flexible queries (clients request only needed data)
- Strong typing with schema
- Single endpoint (simpler routing)

**Why Reversed:**
- Overhead not worth it for simple CRUD operations
- Team unfamiliar with GraphQL (learning curve slowing development)
- Frontend didn't need flexible queries (fixed page layouts)
- REST with TypeScript provides enough type safety
- Caching more complex with GraphQL

**Reversed By:** DEC-009 (Switch to REST API with tRPC)

**Lessons Learned:**
- Don't adopt tech just because it's popular
- Consider team experience vs. theoretical benefits
- Start simple, add complexity when needed
- GraphQL makes sense for complex data requirements (not our case)

**References:**
- Original spike: `docs/spikes/graphql-evaluation.md`
- Migration PR: #145
```

## When to Create Decision Entries

### ✅ Document These Decisions

**Technology choices:**
- Framework selection (React vs. Vue vs. Svelte)
- Database choice (PostgreSQL vs. MongoDB vs. MySQL)
- Infrastructure (AWS vs. Vercel vs. Railway)
- Library selection (authentication, payment, email, etc.)

**Architecture decisions:**
- Monolith vs. microservices
- Event-driven vs. request-response
- Caching strategy
- API design (REST vs. GraphQL vs. tRPC)

**Process decisions:**
- Deployment strategy (CI/CD approach)
- Testing strategy (unit vs. integration vs. e2e)
- Code review process
- Release cadence

**Security decisions:**
- Authentication method (JWT vs. sessions)
- Authorization model (RBAC vs. ABAC)
- Data encryption approach
- API rate limiting

**UX/Product decisions:**
- Major feature scope choices
- User flow decisions
- Pricing model
- Feature prioritization with rationale

### ❌ Don't Document These

**Trivial choices:**
- Variable naming
- File organization (unless significant)
- Minor refactoring
- Formatting preferences

**Temporary decisions:**
- "Let's try this for now"
- Experiments without commitment
- Exploratory work

**Obvious decisions:**
- "Use Git for version control"
- "Write tests"
- Standard industry practices

## Best Practices

### 1. Write Decision WHEN It's Made

```markdown
# Immediately after deciding:
/save-full

# Add decision entry to DECISIONS.md
# Capture: what, why, alternatives, tradeoffs

# Don't wait:
- Memory fades
- Rationale gets lost
- Alternatives forgotten
```

### 2. Include Alternatives Considered

```markdown
# Not helpful:
"Decided to use Redis"

# Helpful:
"Considered: in-memory (lost on restart), Redis (persistent),
 Memcached (no persistence). Chose Redis for persistence + speed."
```

### 3. Document Tradeoffs Honestly

```markdown
**Tradeoffs:**
- ✅ **Pros:** Fast, familiar to team, well-documented
- ❌ **Cons:** Adds $50/month cost, requires maintenance,
              locks us into vendor ecosystem
```

### 4. Make "Reconsider If" Concrete

```markdown
# Vague:
"Reconsider if this becomes a problem"

# Specific:
"Reconsider if:
 - API latency exceeds 500ms p95
 - Cost exceeds $200/month
 - Team size grows beyond 10 engineers"
```

### 5. Reference Other Decisions

```markdown
# Build on previous decisions:
"This builds on DEC-003 (Next.js choice) by using App Router
 features. See DEC-007 for event system we'll integrate with."
```

### 6. Update Status When Reversed

```markdown
## DEC-002: Use GraphQL (REVERSED)

**Status:** ❌ Reversed (2025-10-16)

**Reversed By:** DEC-009

**Why:** [Explanation]

# Keep entry for historical context
# Future devs can learn from this
```

## Integration with Other Files

**DECISIONS.md works with:**

- **CONTEXT.md** - Decisions flow from constraints in CONTEXT.md
- **STATUS.md** - Current decisions referenced from active work
- **SESSIONS.md** - Decision-making process documented in sessions

**Flow:**
1. Constraint in CONTEXT.md ("Must support mobile")
2. Options explored in session
3. Decision made and documented in DECISIONS.md (DEC-XXX)
4. Decision referenced in SESSIONS.md ("Made DEC-015 about responsive design")
5. Decision impacts work in STATUS.md ("Implementing responsive layout per DEC-015")

## Success Metrics

> **"A new team member can read DECISIONS.md and understand why the system is built the way it is."**

> **"An AI agent can make informed decisions that align with previous choices because it understands the rationale."**

When these are true, DECISIONS.md is effective.

## Next Steps

- [SESSIONS.md Guide](/guide/sessions-file) - Where decisions are made
- [Externalized Context](/guide/externalized-context) - Why documenting decisions matters
- [/save-full Command](/commands/save-full) - Creates decision entries
- [Human Review Workflow](/workflows/human-review) - Reviewing AI decisions
