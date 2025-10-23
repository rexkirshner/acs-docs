# Commands Reference

The AI Context System provides 14 slash commands organized into four categories.

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

## Collaboration Commands

### [/code-review](/commands/code-review)
AI peer review with full context understanding. Comprehensive audit leveraging DECISIONS.md and SESSIONS.md.

### [/export-context](/commands/export-context)
Package all context for handoffs. Combines documentation into single markdown file.

### [/validate-context](/commands/validate-context)
Check documentation health. Reports staleness, missing sections, and health score.

## Maintenance Commands

### [/update-context-system](/commands/update-context-system)
Updates commands and scripts from GitHub. Ensures latest features and fixes.

### [/update-templates](/commands/update-templates)
Compare context files with latest templates. Interactive updates with visual diffs.

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
