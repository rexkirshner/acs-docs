# Commands Reference

The AI Context System provides 22 slash commands organized into five categories.

## Setup Commands (Run Once)

### [/init-context](/commands/init-context)
Creates fresh context structure for new projects. Best for projects starting from scratch.

### [/migrate-context](/commands/migrate-context)
Migrates existing documentation to AI Context System structure. Preserves all existing content.

## Daily Use Commands

### [/save](/commands/save)
**Quick save (2-3 min)** - Updates STATUS.md with auto-generated Quick Reference. Run frequently during work.

### [/save-full](/commands/save-full)
**Comprehensive save (10-15 min)** - Everything /save does + SESSIONS.md entry with mental models. Run before breaks/handoffs.

### [/review-context](/commands/review-context)
**Run at session start** - Verifies documentation is current. Shows Quick Reference. Checks for updates.

## Code Review Commands

::: tip New in v4.0.0
The code review system is now modular. Use `/code-review` as the orchestrator or run individual audits directly.
:::

### [/code-review](/commands/code-review)
**Master orchestrator** - Select and run specialized audits via interactive menu or command-line arguments. Supports presets like `--prelaunch`, `--backend`, `--frontend`.

### [/code-review-security](/commands/code-review-security)
OWASP Top 10 security audit. Authentication, injection, XSS, secrets, dependencies.

### [/code-review-performance](/commands/code-review-performance)
Core Web Vitals audit. LCP, INP, CLS, bundle size, caching.

### [/code-review-accessibility](/commands/code-review-accessibility)
WCAG 2.1 AA compliance audit. Keyboard navigation, screen readers, ARIA.

### [/code-review-seo](/commands/code-review-seo)
Technical SEO audit. Metadata, structured data (JSON-LD), crawlability.

### [/code-review-database](/commands/code-review-database)
Database efficiency audit. N+1 detection, indexes, connection pooling.

### [/code-review-infrastructure](/commands/code-review-infrastructure)
Serverless cost optimization. Cold starts, rendering strategy, caching.

### [/code-review-typescript](/commands/code-review-typescript)
TypeScript type safety audit. Strict mode, `any` tracking, type coverage.

### [/code-review-testing](/commands/code-review-testing)
Test coverage and quality audit. Coverage metrics, test pyramid, CI integration.

### [/build-check](/commands/build-check)
Pre-push build gate. Sequential: lint → typecheck → tests → build.

## Collaboration Commands

### [/export-context](/commands/export-context)
Package all context for handoffs. Combines documentation into single markdown file.

### [/validate-context](/commands/validate-context)
Check documentation health. Reports staleness, missing sections, and health score.

## Maintenance Commands

### [/update-context-system](/commands/update-context-system)
Updates commands and scripts from GitHub. Ensures latest features and fixes.

### [/update-templates](/commands/update-templates)
Compare context files with latest templates. Interactive updates with visual diffs.

### [/add-ai-header](/commands/add-ai-header)
Create AI tool-specific entry points (CLAUDE.md, cursor.md, etc.).

### [/organize-docs](/commands/organize-docs)
Interactive documentation cleanup and organization.

### [/session-summary](/commands/session-summary)
Generate summary of current session for handoff.

## Command Quick Reference

| Category | Commands |
|----------|----------|
| Setup | `/init-context`, `/migrate-context` |
| Daily | `/save`, `/save-full`, `/review-context` |
| Code Review | `/code-review`, + 8 specialized audits, `/build-check` |
| Collaboration | `/export-context`, `/validate-context` |
| Maintenance | `/update-context-system`, `/update-templates`, `/add-ai-header`, `/organize-docs`, `/session-summary` |

## Command Philosophy

All commands follow these principles:

1. **Non-destructive** - Never overwrite without confirmation
2. **Transparent** - Show exactly what will change
3. **Auditable** - Log all operations
4. **Resumable** - Safe to interrupt and restart
5. **Helpful** - Provide guidance and next steps

## Universal Commands

These commands are universal and work with any AI coding assistant. They're organized in `.claude/commands/` following Claude Code's slash command paradigm, but the workflows themselves are generalizable.

**For Claude Code users:** Use slash commands directly

**For other AI tools:** Reference command files manually (e.g., `.claude/commands/save.md`) to follow the same workflows
