# /code-review-performance

Core Web Vitals audit analyzing LCP, INP, CLS, bundle size, and runtime performance.

::: tip Agent-Based (v5.0.0)
This command is backed by the **performance-reviewer agent** (`.claude/agents/performance-reviewer.md`) with a self-declaring contract.
:::

## Overview

Performance audit focused on user-perceived metrics:
- Core Web Vitals (LCP, INP, CLS)
- Bundle size analysis
- Image optimization
- Caching strategies
- Runtime performance patterns

## Quick Start

```bash
/code-review-performance
```

## What It Checks

### Core Web Vitals

| Metric | Target | What It Measures |
|--------|--------|------------------|
| LCP | < 2.5s | Largest Contentful Paint |
| INP | < 200ms | Interaction to Next Paint |
| CLS | < 0.1 | Cumulative Layout Shift |

### Bundle Analysis

- Total bundle size
- Per-route code splitting
- Tree shaking effectiveness
- Duplicate dependencies
- Dynamic imports usage

### Image Optimization

- Next.js Image component usage
- Format (WebP, AVIF)
- Responsive images
- Lazy loading
- Priority hints

### Caching

- Static asset caching
- API response caching
- Service worker usage
- CDN configuration

### Runtime Patterns

- Unnecessary re-renders
- Memory leaks
- Expensive computations
- Layout thrashing

## Report Output

Reports saved to `docs/audits/performance-audit-NN.md`:

```markdown
# Performance Audit Report (01)

## Executive Summary
**Grade:** A
**Bundle Size:** 245KB (gzipped)
**Core Web Vitals:** All passing

## Findings

### HIGH: Large Bundle on /dashboard
**Current:** 156KB
**Target:** < 100KB
**Fix:** Code split heavy components

...
```

## Grading Scale

| Grade | Criteria |
|-------|----------|
| A | All CWV passing, bundle < 300KB |
| B | 2/3 CWV passing, bundle < 500KB |
| C | 1/3 CWV passing, bundle < 750KB |
| D | CWV failing, bundle < 1MB |
| F | All CWV failing, bundle > 1MB |

## When to Run

- Before major releases
- After adding new features
- After dependency updates
- Weekly performance checks
- When users report slowness

## Related Commands

- [/code-review](/commands/code-review) - Master orchestrator
- [/build-check](/commands/build-check) - Pre-push validation
