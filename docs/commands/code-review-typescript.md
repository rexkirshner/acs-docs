# /code-review-typescript

TypeScript type safety audit analyzing strict mode, `any` usage, and type coverage.

## Overview

TypeScript quality audit:
- tsconfig.json analysis
- Strict mode assessment
- `any` type tracking
- Type coverage metrics
- Runtime validation gaps
- Type inference quality

## Quick Start

```bash
/code-review-typescript
```

## What It Checks

### tsconfig.json Analysis

| Setting | Recommended |
|---------|-------------|
| strict | true |
| noImplicitAny | true |
| strictNullChecks | true |
| noUncheckedIndexedAccess | true |
| exactOptionalPropertyTypes | true |

### `any` Tracking

```typescript
// BAD: Explicit any
function process(data: any) { ... }

// BAD: Implicit any (with noImplicitAny: false)
function process(data) { ... }

// GOOD: Proper typing
function process(data: UserData) { ... }

// ACCEPTABLE: unknown with validation
function process(data: unknown) {
  if (isUserData(data)) { ... }
}
```

### Type Coverage

- Percentage of typed symbols
- Files with most `any` usage
- Type assertion counts
- Non-null assertion counts

### Runtime Validation

- API response validation (Zod, etc.)
- Form data validation
- Environment variable typing
- External data handling

## Report Output

Reports saved to `docs/audits/typescript-audit-NN.md`:

```markdown
# TypeScript Audit Report (01)

## Executive Summary
**Grade:** B
**Type Coverage:** 87%
**Explicit any:** 12 occurrences
**Strict Mode:** Partial

## Findings

### MEDIUM: Missing Strict Null Checks
**Impact:** Potential runtime null errors
**Fix:** Enable strictNullChecks in tsconfig

### HIGH: Unvalidated API Response
**Location:** lib/api.ts:45
**Risk:** Type mismatch at runtime
**Fix:** Add Zod schema validation

...
```

## Grading Scale

| Grade | Criteria |
|-------|----------|
| A | Full strict mode, < 5 any, 95%+ coverage |
| B | Partial strict, < 15 any, 85%+ coverage |
| C | Basic typing, < 30 any, 70%+ coverage |
| D | Significant any usage |
| F | Minimal type safety |

## When to Run

- Before enabling strict mode
- Tech debt cleanup sessions
- After major refactors
- Onboarding new developers
- Monthly type health checks

## Related Commands

- [/code-review](/commands/code-review) - Master orchestrator
- [/code-review-testing](/commands/code-review-testing) - Test coverage
