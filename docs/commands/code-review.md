# /code-review

Master orchestrator for agent-based code reviews. Select and run specialized audit agents.

::: tip Agent-Based Architecture (v5.1.5)
`/code-review` coordinates **14 specialist agents** (9 review domains + 5 support agents), each with self-declaring contracts. Agents declare their own capabilities via JSON Schema-validated contracts embedded in their definition files (`.claude/agents/`). The orchestrator automatically discovers agents and routes reviews to the appropriate specialists.

**v5.1.5 improvements:** How to Execute section in reports, specialist verification checklist, `--verbose` flag for detailed output, and selection reasoning that explains why each specialist was chosen.
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
| Libraries | `/code-review-libraries` | Homegrown code → battle-tested libraries |

## Specialist Selection Logic

### How Specialists Are Selected

When running `/code-review` without explicit specialist flags:

1. **Codebase Scanner** runs first, producing `codebase-context.json` with detected features
2. **Each specialist checks** its `applicability` contract against scanner output
3. **Applicable specialists** are launched in parallel

### Selection Rules by Specialist

| Specialist | Selection Rule | Scanner Field |
|------------|----------------|---------------|
| security-reviewer | Always runs | `always: true` |
| test-coverage-reviewer | Always runs | `always: true` |
| performance-reviewer | Has UI/frontend | `structure.hasUI: true` |
| accessibility-reviewer | Has UI/frontend | `structure.hasUI: true` |
| seo-reviewer | Has UI + webapp/monorepo | `structure.hasUI: true` |
| type-safety-reviewer | TypeScript project | `structure.primaryLanguage: "typescript"` |
| database-reviewer | Has database/ORM | `structure.hasDatabase: true` |
| infrastructure-reviewer | Has CI configuration | `structure.hasCI: true` |
| library-adoption-reviewer | Manual only | Requires `--all` or `--libraries` flag |

### Manual Override

Explicit flags always run the specified specialist, regardless of scanner detection:

```bash
# Force infrastructure review even without CI detected
/code-review --infrastructure

# Force database review even without ORM detected
/code-review --database

# Run library adoption (never auto-selected)
/code-review --libraries
```

### Selection Examples

**SvelteKit app with Prisma + GitHub Actions:**
```
Scanner detects: hasUI=true, hasDatabase=true, hasCI=true, primaryLanguage=typescript

Auto-selected (8):
  ✓ security-reviewer (always)
  ✓ test-coverage-reviewer (always)
  ✓ performance-reviewer (hasUI)
  ✓ accessibility-reviewer (hasUI)
  ✓ seo-reviewer (hasUI)
  ✓ type-safety-reviewer (typescript)
  ✓ database-reviewer (hasDatabase)
  ✓ infrastructure-reviewer (hasCI)

Not selected:
  ✗ library-adoption-reviewer (requires --all or --libraries)
```

**Express.js API (no UI):**
```
Scanner detects: hasUI=false, hasDatabase=true, hasCI=false, primaryLanguage=javascript

Auto-selected (3):
  ✓ security-reviewer (always)
  ✓ test-coverage-reviewer (always)
  ✓ database-reviewer (hasDatabase)

Not selected:
  ✗ performance-reviewer (no UI)
  ✗ accessibility-reviewer (no UI)
  ✗ seo-reviewer (no UI)
  ✗ type-safety-reviewer (not typescript)
  ✗ infrastructure-reviewer (no CI)
  ✗ library-adoption-reviewer (requires flag)
```

## Quick Reference

```bash
# Interactive mode (shows menu)
/code-review

# Run specific audits
/code-review --security
/code-review --performance --accessibility
/code-review --libraries    # Library adoption recommendations

# Run presets
/code-review --all          # All 9 audits (includes libraries)
/code-review --prelaunch    # Security + Performance + A11y + SEO
/code-review --backend      # Security + Database + Testing
/code-review --frontend     # Performance + Accessibility + SEO

# With platform flags
/code-review --database --prisma
/code-review --infrastructure --vercel

# Verbose output (v5.1.5)
/code-review --verbose          # Show selection reasoning
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
9. Libraries     - Homegrown code → battle-tested libraries

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

Comprehensive review running all 9 audit types (including library adoption). Best for:
- Major releases
- Annual quality audits
- New team onboarding
- Codebase modernization

## How to Execute Section (v5.1.5)

Each audit report now includes a "How to Execute" section with ready-to-run commands:

```markdown
## How to Execute

### Finding SEC-001: SQL Injection in user search
**File:** `app/api/users/route.ts:45`
**Fix:** Use parameterized query

```bash
# Navigate to file
code app/api/users/route.ts

# Run tests after fix
npm test -- --grep "user search"
```

### Finding SEC-002: Missing CSRF protection
**File:** `app/api/forms/route.ts:12`
**Fix:** Add CSRF token validation

```bash
# Install csrf library if needed
npm install csrf

# Add to route handler
```
```

## Specialist Verification Checklist (v5.1.5)

Reports now include a verification checklist to ensure thorough review:

```markdown
## Verification Checklist

Before marking this audit complete, verify:

- [ ] All CRITICAL findings addressed or documented as accepted risk
- [ ] HIGH findings have tickets/issues created
- [ ] MEDIUM findings reviewed with team
- [ ] Re-run `/code-review --security` after fixes
- [ ] Tests added for security-sensitive changes
```

## Selection Reasoning (v5.1.5)

When using `--verbose`, the orchestrator explains why each specialist was selected:

```bash
$ /code-review --security --verbose

🔍 Specialist Selection Reasoning:

| Specialist | Selected | Reason |
|------------|----------|--------|
| security-reviewer | ✅ | Explicitly requested via --security |
| auth-analyzer | ✅ | Detected: lib/auth.ts, middleware.ts |
| api-auditor | ✅ | Detected: app/api/ routes |
| crypto-reviewer | ❌ | No crypto/encryption patterns found |
```

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

## Agent Contracts

Each specialist agent declares its capabilities via a contract block:

```json
{
  "id": "security-reviewer",
  "prefix": "SEC",
  "category": "security",
  "applicability": {
    "required_files": ["package.json"],
    "triggers": ["auth", "login", "password", "token", "api"]
  },
  "focusAreas": ["authentication", "authorization", "injection", "xss"],
  "outputFormat": "audit-report",
  "tools": ["grep", "ast-analysis", "dependency-check"]
}
```

**Contract fields:**
- **id** - Unique agent identifier
- **prefix** - Finding ID prefix (e.g., SEC-001)
- **category** - Audit category for routing
- **applicability** - When this agent is relevant
- **focusAreas** - What the agent specializes in
- **outputFormat** - Report format (validated by schema)
- **tools** - Capabilities the agent can use

The orchestrator uses contracts to:
1. Automatically discover available agents
2. Route reviews to appropriate specialists
3. Validate agent outputs against schemas
4. Build capability indexes for smart routing

## Migration from Earlier Versions

### From v3.x

| v3.x Behavior | v4.0+ Approach |
|---------------|-----------------|
| Single long report | Multiple focused reports + summary |
| `artifacts/code-reviews/` | `docs/audits/` |
| `session-N-review.md` | `{type}-audit-NN.md` |
| One checklist file | Built into each command |

### From v4.x to v5.0.x

| v4.x Behavior | v5.0.x Approach |
|---------------|-----------------|
| Commands in `.claude/commands/` | Commands + agents in `.claude/agents/` |
| Checklists in `.claude/checklists/` | Removed (built into agents) |
| Ad-hoc code reviews | Specialist agents with contracts |

**Migration:** Run `/update-context-system` to automatically migrate existing configuration.

## Related Commands

- [/code-review-security](/commands/code-review-security) - OWASP security audit
- [/code-review-performance](/commands/code-review-performance) - Core Web Vitals
- [/code-review-accessibility](/commands/code-review-accessibility) - WCAG 2.1 AA
- [/code-review-libraries](/commands/code-review-libraries) - Library adoption
- [/build-check](/commands/build-check) - Pre-push build gate
- [/validate-context](/commands/validate-context) - Documentation health
