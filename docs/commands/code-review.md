# /code-review

Master orchestrator for modular code reviews. Select and run specialized audits.

::: tip New in v4.0.0
`/code-review` has been transformed from a monolithic command into a modular orchestrator. It now coordinates 8 specialized audit commands and supports custom audits.
:::

## Overview

The `/code-review` command is the entry point for all code quality audits:
- **Interactive menu** for selecting which audits to run
- **Command-line arguments** for scripted execution
- **Preset combinations** for common scenarios
- **Combined summary reports** with weighted grading
- **Custom audit support** for project-specific checks

## Available Audit Types

| Audit | Command | Focus |
|-------|---------|-------|
| Security | `/code-review-security` | OWASP Top 10, auth, injection, XSS |
| Performance | `/code-review-performance` | Core Web Vitals, bundle, runtime |
| Accessibility | `/code-review-accessibility` | WCAG 2.1 AA, keyboard nav, ARIA |
| SEO | `/code-review-seo` | Metadata, structured data, crawlability |
| Database | `/code-review-database` | N+1 detection, indexes, pooling |
| Infrastructure | `/code-review-infrastructure` | Serverless costs, caching, builds |
| TypeScript | `/code-review-typescript` | Type safety, strict mode, any usage |
| Testing | `/code-review-testing` | Coverage, quality, CI integration |

## Quick Reference

```bash
# Interactive mode (shows menu)
/code-review

# Run specific audits
/code-review --security
/code-review --performance --accessibility

# Run presets
/code-review --all          # All 8 audits
/code-review --prelaunch    # Security + Performance + A11y + SEO
/code-review --backend      # Security + Database + Testing
/code-review --frontend     # Performance + Accessibility + SEO

# With platform flags
/code-review --database --prisma
/code-review --infrastructure --vercel
```

## Interactive Mode

When run without arguments, presents a selection menu:

```
Code Review Orchestrator

Select audits to run (enter numbers separated by commas, or 'all'):

Built-in Audits:
1. Security      - OWASP Top 10, authentication, injection, XSS
2. Performance   - Core Web Vitals, bundle analysis, runtime
3. Accessibility - WCAG 2.1 AA, keyboard navigation, screen readers
4. SEO           - Metadata, structured data, crawlability
5. Database      - N+1 detection, indexes, query optimization
6. Infrastructure- Serverless costs, caching, build times
7. TypeScript    - Type safety, strict mode, any usage
8. Testing       - Coverage, test quality, CI integration

Presets:
A. All audits (comprehensive)
P. Pre-launch (Security + Performance + Accessibility + SEO)
B. Backend focus (Security + Database + Testing)
F. Frontend focus (Performance + Accessibility + SEO)

Selection: >
```

## Presets

### --prelaunch

Essential audits before going live:
- **Security** - Prevent vulnerabilities
- **Performance** - Fast load times
- **Accessibility** - ADA/WCAG compliance
- **SEO** - Search engine ready

### --backend

For API and data-focused projects:
- **Security** - Auth, injection, secrets
- **Database** - Queries, indexes, N+1
- **Testing** - Coverage, quality

### --frontend

For UI-heavy applications:
- **Performance** - Core Web Vitals
- **Accessibility** - WCAG compliance
- **SEO** - Metadata, structure

### --all

Comprehensive review running all 8 audit types. Best for:
- Major releases
- Annual quality audits
- New team onboarding

## Report Output

Each audit generates its own report in `docs/audits/`:

```
docs/audits/
├── INDEX.md                    # Audit tracking
├── security-audit-01.md        # Individual reports
├── performance-audit-01.md
├── accessibility-audit-01.md
└── combined-audit-01.md        # Summary when multiple
```

### Combined Summary

When running multiple audits, a combined report is generated:

```markdown
# Combined Audit Report

| Audit | Grade | Critical | High | Medium |
|-------|-------|----------|------|--------|
| Security | B | 1 | 2 | 3 |
| Performance | A | 0 | 1 | 2 |
| Accessibility | C | 2 | 3 | 5 |
| **Overall** | **B** | **3** | **6** | **10** |
```

## Grading Weights

Combined grades are weighted by importance:

| Audit | Weight | Rationale |
|-------|--------|-----------|
| Security | 1.5x | Critical for production |
| Performance | 1.0x | User experience |
| Accessibility | 1.2x | Legal compliance |
| SEO | 0.8x | Marketing value |
| Database | 1.0x | Data integrity |
| Infrastructure | 0.8x | Cost optimization |
| TypeScript | 0.8x | Maintainability |
| Testing | 1.0x | Quality assurance |

## When to Use

**Use /code-review when:**
- You need multiple audit types
- Preparing for a release
- Want comprehensive quality overview
- Setting quality baselines

**Use individual commands when:**
- You know exactly what audit you need
- Focused on one area
- Following up on specific findings
- Time is limited

## Custom Audits

Create project-specific audits that integrate with the orchestrator.

### Step 1: Create Command File

Create `.claude/commands/code-review-{name}.md`:

```markdown
---
name: code-review-api
description: REST API design audit
---

# /code-review-api Command

[Your audit instructions here]
```

### Step 2: Register in Config (Optional)

Add to `context/.context-config.json`:

```json
{
  "audits": {
    "custom": [
      {
        "name": "api",
        "description": "REST API design audit",
        "weight": 1.2,
        "presets": ["backend", "all"]
      }
    ]
  }
}
```

### Step 3: Automatic Pickup

Custom audits automatically appear in the menu and can be run with `--api`.

## Migration from v3.x

If you used the monolithic `/code-review`:

| v3.x Behavior | v4.0.0 Approach |
|---------------|-----------------|
| Single long report | Multiple focused reports + summary |
| `artifacts/code-reviews/` | `docs/audits/` |
| `session-N-review.md` | `{type}-audit-NN.md` |
| One checklist file | Built into each command |

**Migration:** Run `/update-context-system` to automatically migrate existing reports.

## Related Commands

- [/code-review-security](/commands/code-review-security) - OWASP security audit
- [/code-review-performance](/commands/code-review-performance) - Core Web Vitals
- [/code-review-accessibility](/commands/code-review-accessibility) - WCAG 2.1 AA
- [/build-check](/commands/build-check) - Pre-push build gate
- [/validate-context](/commands/validate-context) - Documentation health
