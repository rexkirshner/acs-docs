# DECISIONS.md

An append-only log of decisions. The only file that captures **why** choices were made.

## Purpose

DECISIONS.md answers: **"Why did we choose this approach?"**

Code shows *what*. Commits show *when*. Only DECISIONS.md explains *why*.

## Template

```markdown
# Decisions

Append-only log.

---

## 2026-01-24: [DB] Use PostgreSQL over MongoDB
Why: Need ACID transactions for payment data, complex relationships between orders/users/products
Tradeoff: Less schema flexibility, more upfront modeling
RevisitWhen: If we need document storage for unstructured data

---

## 2026-01-23: [Auth] JWT tokens in HTTP-only cookies
Why: Prevents XSS token theft, works with SSR
Tradeoff: Can't access token from JavaScript (need separate CSRF protection)
RevisitWhen: If we need token access in client-side code
```

## Entry Format

Each decision has four parts:

```markdown
## YYYY-MM-DD: [Area] Decision Title
Why: [reason for the decision]
Tradeoff: [what we gave up or risk we accepted]
RevisitWhen: [trigger condition to reconsider]
```

### Date

Use the actual date the decision was made (YYYY-MM-DD).

### Area Prefix

Tag decisions by area for easy grep:

| Prefix | Area |
|--------|------|
| `[DB]` | Database |
| `[API]` | API design |
| `[UI]` | User interface |
| `[Auth]` | Authentication/authorization |
| `[Infra]` | Infrastructure |
| `[Deps]` | Dependencies |
| `[Arch]` | Architecture |
| `[Test]` | Testing |
| `[Perf]` | Performance |

Use `[Arch]` for cross-cutting decisions.

### Why

One or two sentences explaining the reasoning:

```markdown
Why: Need ACID transactions for payment data, complex relationships between orders/users/products
```

### Tradeoff

What you gave up by making this choice:

```markdown
Tradeoff: Less schema flexibility, more upfront modeling required
```

### RevisitWhen

Conditions that would invalidate this decision:

```markdown
RevisitWhen: If we need to store unstructured user-generated content
```

## When to Record Decisions

**Record decisions that:**
- Affect future development choices
- Have meaningful tradeoffs
- Someone might ask "why did we do it this way?"

**Don't record:**
- Trivial choices (variable names, formatting)
- Obvious decisions ("use Git")
- Temporary experiments

## Examples

### Technology Choice

```markdown
## 2026-01-20: [Deps] Use Prisma for database ORM
Why: Type-safe queries, excellent TypeScript integration, schema migrations built-in
Tradeoff: Learning curve for team, some advanced SQL harder to express
RevisitWhen: If query performance becomes critical and we need raw SQL
```

### Architecture Decision

```markdown
## 2026-01-18: [Arch] Monolith over microservices for MVP
Why: Small team (2 devs), need to move fast, don't know service boundaries yet
Tradeoff: May need to split later, some coupling between features
RevisitWhen: If team grows to 5+ or deployment conflicts become frequent
```

### Security Decision

```markdown
## 2026-01-15: [Auth] Rate limit login to 5 attempts per minute
Why: Prevent brute force attacks without frustrating legitimate users
Tradeoff: Could lock out forgetful users, need account recovery flow
RevisitWhen: If we see legitimate users getting locked out frequently
```

### Process Decision

```markdown
## 2026-01-12: [Infra] Deploy staging on every push, production manually
Why: Fast feedback on staging, but want human verification before production
Tradeoff: Extra step for production, staging might drift if production deploys delayed
RevisitWhen: If test coverage exceeds 90% and we trust automated checks
```

## Searching Decisions

Find decisions by area:

```bash
grep "\[DB\]" context/DECISIONS.md
grep "\[Auth\]" context/DECISIONS.md
```

Find recent decisions:

```bash
grep "^## 2026-01" context/DECISIONS.md
```

## Append-Only

**Never delete decisions.** If a decision is reversed, add a new entry:

```markdown
## 2026-01-25: [API] Revert to REST (reverses 2026-01-10 GraphQL decision)
Why: GraphQL overhead not worth it for simple CRUD, team struggled with learning curve
Tradeoff: Lose flexible queries, but we didn't need them
RevisitWhen: If we add complex data requirements with nested relationships
```

The original decision stays in the log for historical context.

## Relationship to Other Files

| File | Role |
|------|------|
| `CLAUDE.md` | Entry point, project overview |
| `STATUS.md` | Current state, what's being worked on |
| `DECISIONS.md` | Why decisions were made |

**DECISIONS.md grows over time.** It's the historical record of reasoning.

## Best Practices

### Write When Decided

Capture the decision immediately. Rationale fades quickly.

```
/save
# "Any decisions worth recording?" → Yes
```

### Be Honest About Tradeoffs

Every choice has downsides. Document them:

```markdown
# Not helpful:
Tradeoff: None

# Helpful:
Tradeoff: Adds complexity, requires Redis dependency, team needs to learn pub/sub patterns
```

### Make RevisitWhen Specific

```markdown
# Vague:
RevisitWhen: If it becomes a problem

# Specific:
RevisitWhen: If API latency exceeds 500ms p95 or cost exceeds $200/month
```

### Keep Entries Concise

Each decision should be scannable in 10 seconds:

```markdown
## 2026-01-24: [Perf] Cache user sessions in Redis
Why: Reduce database load, sessions accessed on every request
Tradeoff: Extra infrastructure, 5-minute TTL means occasional re-auth
RevisitWhen: If Redis becomes single point of failure
```

## Next Steps

- [CLAUDE.md Guide](/guide/claude-md) — Project entry point
- [STATUS.md Guide](/guide/status-file) — Current state
- [/save Command](/commands/save) — How decisions get recorded
