# /code-review-testing

Test coverage and quality audit analyzing coverage metrics, test pyramid, and CI integration.

## Overview

Testing quality audit:
- Code coverage analysis
- Test pyramid distribution
- Test quality patterns
- Mock strategy review
- CI/CD integration
- Testing best practices

## Quick Start

```bash
/code-review-testing
```

## What It Checks

### Coverage Analysis

| Metric | Target |
|--------|--------|
| Statements | > 80% |
| Branches | > 70% |
| Functions | > 80% |
| Lines | > 80% |
| Critical paths | 100% |

### Test Pyramid

```
        /\
       /  \     E2E (10%)
      /----\
     /      \   Integration (20%)
    /--------\
   /          \ Unit (70%)
  --------------
```

- Unit tests: Fast, isolated, many
- Integration tests: Component interactions
- E2E tests: Critical user journeys

### Test Quality

- Assertions per test
- Setup/teardown patterns
- Test isolation
- Flaky test detection
- Test naming conventions

### Mock Strategy

```typescript
// BAD: Over-mocking
jest.mock('./database');
jest.mock('./api');
jest.mock('./utils');
jest.mock('./helpers');
// Testing implementation, not behavior

// GOOD: Strategic mocking
jest.mock('./database'); // External dependency
// Let other modules run naturally
```

### CI Integration

- Pre-commit hooks
- PR gates
- Coverage thresholds
- Test parallelization
- Failure notifications

## Report Output

Reports saved to `docs/audits/testing-audit-NN.md`:

```markdown
# Testing Audit Report (01)

## Executive Summary
**Grade:** B
**Coverage:** 78%
**Tests:** 234 (212 passing, 22 skipped)

## Coverage by Module

| Module | Statements | Branches |
|--------|------------|----------|
| auth/ | 92% | 85% |
| api/ | 45% | 32% |
| utils/ | 98% | 95% |

## Findings

### HIGH: Low API Coverage
**Current:** 45%
**Target:** 80%
**Missing:** Error handling, edge cases

...
```

## Grading Scale

| Grade | Criteria |
|-------|----------|
| A | 90%+ coverage, balanced pyramid |
| B | 80%+ coverage, good pyramid |
| C | 60%+ coverage |
| D | 40%+ coverage |
| F | < 40% coverage |

## When to Run

- Before major releases
- After adding new features
- Quality gate reviews
- Sprint retrospectives
- New team onboarding

## Related Commands

- [/code-review](/commands/code-review) - Master orchestrator
- [/build-check](/commands/build-check) - Pre-push validation
- [/code-review-typescript](/commands/code-review-typescript) - Type coverage
