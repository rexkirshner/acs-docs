# Commands Reference

The AI Context System v6.0 uses **7 slash commands** — pure prompts with no scripts or machinery.

## Command Overview

| Command | Purpose | When to Use |
|---------|---------|-------------|
| `/init-context` | Create context files | Once, at project setup |
| `/save` | Update STATUS.md | End of every session |
| `/update-context-system` | Get latest version | When updates available |
| `/review-security` | Security audit | Before deployment |
| `/review-performance` | Performance check | Before deployment |
| `/review-accessibility` | Accessibility audit | Before deployment |
| `/review-seo` | SEO review | Before deployment |

## Core Commands

### [/init-context](/commands/init-context)

Creates the three context files for a new project:

- `CLAUDE.md` — Entry point (at project root)
- `context/STATUS.md` — Current state
- `context/DECISIONS.md` — Decision log

**Usage:**
```bash
/init-context
```

**When:** Once per project, at setup.

### [/save](/commands/save)

Updates STATUS.md with current state. The core of the Session Loop.

**Updates:**
- LastUpdated date
- HeadCommit (git SHA)
- Objective (if changed)
- Working Set
- Next Actions
- Blocked On

**Also asks:** "Any decisions worth recording?" — if yes, appends to DECISIONS.md.

**Usage:**
```bash
/save
```

**When:** End of every session. Build the habit.

### [/update-context-system](/commands/update-context-system)

Updates command files from the GitHub repository.

**Usage:**
```bash
/update-context-system
```

**When:** Periodically, or when you see an update notice.

## Review Commands

These are optional audits you can run before deployment. Each produces a report — no automatic changes.

### /review-security

OWASP Top 10 security audit. Checks:
- Authentication and authorization
- Input validation and injection
- XSS and CSRF protection
- Secrets and credentials
- Dependency vulnerabilities

### /review-performance

Performance review. Checks:
- Core Web Vitals (LCP, INP, CLS)
- Bundle size and code splitting
- Caching strategies
- Database query efficiency

### /review-accessibility

WCAG 2.1 AA compliance audit. Checks:
- Keyboard navigation
- Screen reader compatibility
- Color contrast
- ARIA usage
- Focus management

### /review-seo

Technical SEO review. Checks:
- Meta tags and OpenGraph
- Structured data (JSON-LD)
- Sitemap and robots.txt
- URL structure
- Canonical URLs

## Command Philosophy

v6.0 commands are:

1. **Pure prompts** — No embedded bash scripts
2. **Advisory** — Claude follows guidelines, no mechanical validation
3. **Simple** — Each command does one thing well
4. **Human-readable** — Anyone can understand what a command does

## Architecture

```
.claude/
├── commands/           # 7 slash command files
│   ├── init-context.md
│   ├── save.md
│   ├── update-context-system.md
│   ├── review-security.md
│   ├── review-performance.md
│   ├── review-accessibility.md
│   └── review-seo.md
└── VERSION             # Current version (6.0.0)
```

No agents. No schemas. No hooks. No scripts.

## The Session Loop

The most important pattern:

```
Start → Read STATUS.md
Work → Edit Working Set files
End → Run /save
```

Follow this loop consistently and context persists naturally.
