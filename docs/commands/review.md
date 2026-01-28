# /review

Comprehensive code review. Output: `docs/audits/CODE-REVIEW-NN.md`

## What It Does

A read-only audit across multiple dimensions:

- **Performance** — hot paths, renders, loops, queries, caching, memory, bundle size
- **Cloud-Cost** — serverless patterns, Prisma/db ops, API call volume
- **Reliability** — timeouts, retries, error boundaries, idempotency
- **Security** — authz/authn, input validation, secrets, injection risks
- **Maintainability** — complexity, duplication, naming, dead code
- **Docs-Types** — type coverage, comments for complex logic
- **Accessibility** — semantic HTML, ARIA, keyboard nav (if UI exists)

## Scope Options

When you run `/review`, it will ask what to review:

- **(A) Specific files/directories** — you provide paths
- **(B) Recent changes** — staged + unstaged diff, plus last 1-3 commits
- **(C) Full codebase** — uses sampling strategy for large repos

Default: Recent changes.

## Non-Negotiables

- **Read-only.** Does not modify any code, config, or lockfiles.
- **No installs.** Won't run `npm install` or similar.
- **No network.** Avoids commands that fetch remote resources.
- **No secrets.** Redacts any sensitive values in evidence.

## Output Format

```markdown
# Code Review #NN

**Date:** YYYY-MM-DD
**Scope:** [what was reviewed]

## Executive Summary
- [3-6 bullets: biggest risks/opportunities]

## Top 5 Actions
1. [Outcome-oriented action] (See F1)
2. [Action] (See F3)
...

## Findings

### F1 [P0] [Security] Title
**Evidence:** `path:line`
[snippet]
**Problem:** ...
**Impact:** ...
**Suggested fix:** ...
**Verify:** ...

## Notes
- [Positive patterns worth keeping]

## Appendix
**Stack detected:** ...
**Files reviewed:** ...
**Areas skipped:** ...
```

## Finding Format

Each finding includes:

- **ID:** F1, F2, F3...
- **Priority:** P0 (prod/security), P1 (major perf/cost), P2 (maintainability), P3 (nice-to-have)
- **Dimension:** Performance / Cloud-Cost / Reliability / Security / Maintainability / Docs-Types / Accessibility
- **Effort:** S (< 1 hr), M (1-4 hrs), L (> 4 hrs)
- **Confidence:** High / Med / Low
- **Evidence:** `path:line` + code snippet
- **Impact:** Why it matters
- **Suggested fix:** Clear steps
- **Verify:** How to prove it's fixed

Max 12 findings. More issues get collapsed into themes with checklists.
