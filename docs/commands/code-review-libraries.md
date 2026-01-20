# /code-review-libraries

Library adoption review that identifies homegrown implementations that could be replaced with battle-tested libraries.

::: tip Agent-Based (v5.1.4)
This command is backed by the **library-adoption-reviewer agent** (`.claude/agents/library-adoption-reviewer.md`) with a self-declaring contract.
:::

## Overview

Scans your codebase for custom implementations that could be replaced with well-maintained, battle-tested libraries:

- Date manipulation utilities
- Schema validation code
- HTTP client wrappers
- Deep cloning functions
- UUID generation
- State management patterns
- Retry logic implementations

## Quick Start

```bash
/code-review --libraries
```

Or run as part of a full review:

```bash
/code-review --all
```

## What It Detects

### High-Value Replacements (Recommended)

| Pattern | Homegrown Signs | Recommended Libraries |
|---------|-----------------|----------------------|
| Date manipulation | Manual string formatting, timezone math | date-fns, dayjs, luxon |
| Schema validation | Manual if/else chains, regex validation | zod, yup, joi, valibot |
| HTTP client | Custom fetch wrapper, manual retry logic | axios, ky, got |
| Deep cloning | `JSON.parse(JSON.stringify())` | structuredClone (native) |
| UUID generation | Math.random() patterns | uuid, nanoid |
| Encryption/hashing | Custom crypto implementations | crypto-js, bcrypt, argon2 |

### Medium-Value Replacements (Consider)

| Pattern | Homegrown Signs | Recommended Libraries |
|---------|-----------------|----------------------|
| State management | Custom pub/sub, global objects | zustand, jotai, redux-toolkit |
| Retry logic | Custom while loops with delays | p-retry, async-retry |
| Debounce/throttle | Custom setTimeout patterns | lodash-es, throttle-debounce |
| Query strings | Manual URL parsing/building | qs, query-string |
| Markdown parsing | Regex-based parsing | marked, remark, markdown-it |

### Anti-Patterns (Strongly Recommend Replacement)

| Pattern | Why It's Problematic | Recommended Solution |
|---------|---------------------|---------------------|
| Hand-rolled authentication | Security risk, edge cases | NextAuth, Auth.js, Passport |
| Custom ORM/query builder | SQL injection risk | Prisma, Drizzle, Knex |
| Manual SQL sanitization | Easy to miss cases | Parameterized queries via ORM |

## Report Output

Each finding includes comprehensive analysis:

```json
{
  "id": "LIB-001",
  "severity": "medium",
  "category": "libraries",
  "title": "Replace custom date formatting with date-fns",
  "currentApproach": {
    "description": "47-line custom date formatter",
    "linesOfCode": 47,
    "complexity": "Medium - misses edge cases"
  },
  "recommendation": {
    "library": "date-fns",
    "version": "^3.0.0",
    "documentation": "https://date-fns.org/docs/format",
    "alternativeLibraries": ["dayjs", "luxon"]
  },
  "impact": {
    "codeReduction": "47 lines removed",
    "reliability": "Handles all edge cases",
    "maintenance": "No custom code to maintain"
  },
  "downsides": {
    "bundleSize": "+6KB gzipped",
    "learningCurve": "Low",
    "migrationEffort": "Update 8 call sites"
  },
  "difficulty": "easy",
  "effortEstimate": "1-2 hours"
}
```

## Difficulty Ratings

| Rating | Definition | Examples |
|--------|------------|----------|
| easy | Drop-in replacement, < 2 hours | date formatting, UUID generation |
| medium | Moderate refactoring, 2-8 hours | validation schema migration |
| hard | Significant refactoring, > 1 day | state management overhaul |

## Priority Levels

| Priority | Meaning |
|----------|---------|
| recommended | Clear improvement, should adopt |
| consider | Good option, evaluate tradeoffs |
| optional | Nice to have, low priority |

## Honest Downsides

Every recommendation includes honest downsides:

- **Bundle size increase** - Exact KB impact
- **Learning curve** - Team ramp-up time
- **Migration effort** - Number of call sites to update
- **Dependency risk** - New package to maintain

## What It Skips

The reviewer won't flag:

- Libraries already installed in package.json
- Intentionally dependency-free code (documented in DECISIONS.md)
- Test fixtures and mocks
- Example/demo code
- Tiny utilities (< 10 lines)

## When to Run

- During codebase modernization efforts
- When onboarding to a new codebase
- Before major refactoring projects
- Periodically to catch accumulated custom code

::: info Opt-In Only
This reviewer does NOT run automatically with presets like `--prelaunch` or `--backend`. Use `--libraries` or `--all` explicitly to get library adoption recommendations.
:::

## Related Commands

- [/code-review](/commands/code-review) - Master orchestrator
- [/code-review-security](/commands/code-review-security) - Security vulnerabilities
- [/code-review-performance](/commands/code-review-performance) - Performance issues
