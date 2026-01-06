# /code-review-infrastructure

Serverless cost optimization audit analyzing cold starts, rendering strategy, and caching.

## Overview

Infrastructure audit for serverless/edge deployments:
- Cost surface analysis
- Rendering strategy optimization
- Cold start mitigation
- Caching configuration
- Build time optimization
- Platform-specific patterns

## Quick Start

```bash
# Auto-detect platform
/code-review-infrastructure

# Specify platform
/code-review-infrastructure --vercel
/code-review-infrastructure --aws
/code-review-infrastructure --cloudflare
```

## Platform Support

| Platform | Auto-Detected By |
|----------|------------------|
| Vercel | vercel.json, .vercel/ |
| AWS | serverless.yml, sam template |
| Cloudflare | wrangler.toml |
| Netlify | netlify.toml |

## What It Checks

### Cost Surface Inventory

- Function count and regions
- Execution time patterns
- Memory configuration
- Invocation frequency
- External API calls

### Rendering Strategy

| Strategy | When to Use |
|----------|-------------|
| Static (SSG) | Content doesn't change |
| ISR | Content changes occasionally |
| SSR | Personalized/real-time |
| Edge | Auth, geolocation |

### Cold Start Analysis

- Bundle size per function
- Import optimization
- Connection reuse
- Warming strategies

### Caching

- Static asset caching
- API response caching
- Cache invalidation
- CDN configuration
- stale-while-revalidate

## Report Output

Reports saved to `docs/audits/infrastructure-audit-NN.md`:

```markdown
# Infrastructure Audit Report (01)

## Executive Summary
**Grade:** B
**Estimated Cost:** $45/month
**Functions:** 12 (8 optimizable)

## Findings

### HIGH: SSR Overuse
**Routes:** /blog/*, /docs/*
**Current:** Server-rendered
**Recommendation:** Convert to ISR
**Savings:** ~$20/month

...
```

## Grading Scale

| Grade | Criteria |
|-------|----------|
| A | Optimal rendering, < $50/month |
| B | Minor optimizations, < $100/month |
| C | Some overprovisioning |
| D | Significant waste |
| F | Critical cost issues |

## When to Run

- Monthly cost reviews
- Before scaling
- After adding new routes
- When costs spike
- Before migration

## Related Commands

- [/code-review](/commands/code-review) - Master orchestrator
- [/code-review-performance](/commands/code-review-performance) - Performance audit
- [/code-review-database](/commands/code-review-database) - Database costs
