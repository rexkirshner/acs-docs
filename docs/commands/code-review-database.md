# /code-review-database

Database efficiency audit detecting N+1 queries, missing indexes, and connection issues.

## Overview

Database performance audit:
- N+1 query detection
- Index analysis
- Query optimization
- Connection pooling
- Caching strategies
- Platform-specific patterns

## Quick Start

```bash
# Auto-detect platform
/code-review-database

# Specify platform
/code-review-database --prisma
/code-review-database --drizzle
/code-review-database --typeorm
```

## Platform Support

| Platform | Auto-Detected By |
|----------|------------------|
| Prisma | prisma/schema.prisma |
| Drizzle | drizzle.config.ts |
| TypeORM | ormconfig.json |
| Raw SQL | pg, mysql2 imports |

## What It Checks

### N+1 Query Detection

```typescript
// BAD: N+1 pattern
const users = await db.user.findMany();
for (const user of users) {
  user.posts = await db.post.findMany({ where: { userId: user.id } });
}

// GOOD: Single query
const users = await db.user.findMany({
  include: { posts: true }
});
```

### Index Analysis

- Missing indexes on WHERE/JOIN columns
- Unused indexes
- Composite index opportunities
- Full table scans

### Connection Pooling

- Pool size configuration
- Connection timeouts
- Serverless-specific patterns
- Connection string validation

### Query Patterns

- SELECT * usage
- Unbounded queries
- Missing pagination
- Transaction isolation
- Prepared statements

## Report Output

Reports saved to `docs/audits/database-audit-NN.md`:

```markdown
# Database Audit Report (01)

## Executive Summary
**Grade:** C
**N+1 Issues:** 3
**Missing Indexes:** 5

## Findings

### CRITICAL: N+1 in User List
**Location:** app/api/users/route.ts:23
**Queries:** 1 + N (101 for 100 users)
**Fix:** Use include/eager loading

...
```

## Grading Scale

| Grade | Criteria |
|-------|----------|
| A | No N+1, all indexes present |
| B | ≤1 N+1, minimal missing indexes |
| C | ≤3 N+1, some missing indexes |
| D | 4-6 N+1 issues |
| F | 7+ N+1 or critical issues |

## When to Run

- After schema changes
- When adding new queries
- After slow query reports
- Before scaling
- Monthly optimization

## Related Commands

- [/code-review](/commands/code-review) - Master orchestrator
- [/code-review-infrastructure](/commands/code-review-infrastructure) - Serverless costs
