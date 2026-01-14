# /code-review-seo

Technical SEO audit covering metadata, structured data, and crawlability.

::: tip Agent-Based (v5.0.0)
This command is backed by the **seo-reviewer agent** (`.claude/agents/seo-reviewer.md`) with a self-declaring contract.
:::

## Overview

SEO audit for search engine optimization:
- Metadata completeness
- Structured data (JSON-LD)
- Crawlability and indexing
- Open Graph / Twitter cards
- Sitemap and robots.txt
- Framework-specific patterns

## Quick Start

```bash
/code-review-seo
```

## What It Checks

### Metadata

| Element | Check |
|---------|-------|
| Title | Present, unique, < 60 chars |
| Description | Present, unique, 120-160 chars |
| Canonical | Present, correct URL |
| Viewport | Mobile-friendly |
| Language | html lang attribute |

### Structured Data

- JSON-LD implementation
- Schema.org types
- Required properties
- Rich result eligibility
- Validation against spec

### Crawlability

- robots.txt configuration
- XML sitemap presence
- Internal linking structure
- Broken links
- Redirect chains

### Social Sharing

- Open Graph tags
- Twitter card tags
- Image dimensions
- URL handling

### Framework-Specific

- Next.js Metadata API usage
- generateMetadata function
- Head component patterns
- Dynamic metadata

## Report Output

Reports saved to `docs/audits/seo-audit-NN.md`:

```markdown
# SEO Audit Report (01)

## Executive Summary
**Grade:** B
**Pages Analyzed:** 24
**Rich Results Ready:** 18/24

## Findings

### MEDIUM: Missing Meta Descriptions
**Pages:** /blog/*, /docs/*
**Impact:** Lower CTR in search results
**Fix:** Add generateMetadata with descriptions

...
```

## Grading Scale

| Grade | Criteria |
|-------|----------|
| A | All meta complete, JSON-LD valid |
| B | 90%+ meta, structured data present |
| C | 75%+ meta, some structured data |
| D | 50%+ meta |
| F | Major SEO issues |

## When to Run

- Before public launch
- After adding new pages
- When restructuring URLs
- After CMS changes
- Monthly SEO audits

## Related Commands

- [/code-review](/commands/code-review) - Master orchestrator
- [/code-review-performance](/commands/code-review-performance) - Performance (affects SEO)
