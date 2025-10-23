# /add-ai-header

Add header file for a new AI coding tool.

## Overview

Creates tool-specific entry point for multi-AI teams:
- Generates context/toolname.md header
- Points to CONTEXT.md for full context
- Provides tool-specific workflow guidance

**For teams using multiple AI coding assistants.**

## When to Use

**Use /add-ai-header when:**
- Adding new AI tool to workflow
- Team uses multiple AI assistants (Claude, Cursor, Aider)
- Want tool-specific entry points
- Setting up multi-AI project

**Time:** 1 minute

## Supported Tools

- Claude Code (claude.md)
- Cursor (cursor.md)
- Aider (aider.md)
- GitHub Copilot (copilot.md)
- Custom tools

## Example

```bash
$ /add-ai-header cursor

📝 Creating AI header for Cursor...

✅ Created: context/cursor.md

Contents:
  • Entry point for Cursor
  • Points to CONTEXT.md
  • Tool-specific workflow

Next: Cursor users can read context/cursor.md
```

## What Gets Created

**context/cursor.md:**
```markdown
# Cursor Entry Point

**Read this first when using Cursor with this project.**

## Quick Start

1. Read [CONTEXT.md](./CONTEXT.md) for full project context
2. Run manual equivalent of /review-context:
   - Read STATUS.md for current state
   - Check SESSIONS.md for recent work
3. Update STATUS.md when you make changes
4. Add session entries to SESSIONS.md

## Cursor-Specific Workflow

Since Cursor doesn't have slash commands:

**Instead of /save:**
- Manually update STATUS.md Work In Progress section
- Run update-quick-reference.sh to regenerate Quick Reference

**Instead of /save-full:**
- Create session entry in SESSIONS.md
- Use session template from templates/sessions-template.md
- Update STATUS.md

**Instead of /review-context:**
- Read STATUS.md Quick Reference
- Check Work In Progress section
- Review last SESSIONS.md entry

## Commands Reference

All workflows documented in .claude/commands/ are tool-agnostic.
Follow the same patterns manually.

See [Multi-AI Support](/guide/multi-ai-support) for details.
```

## Multi-AI Setup

For teams using multiple tools:

```bash
# Create headers for all tools
/add-ai-header cursor
/add-ai-header aider
/add-ai-header copilot

# Result:
context/
├── claude.md      # Claude Code entry
├── cursor.md      # Cursor entry
├── aider.md       # Aider entry
├── copilot.md     # Copilot entry
└── CONTEXT.md     # Shared context (all point here)
```

## Best Practices

### Keep CONTEXT.md Platform-Neutral

All tool headers point to shared CONTEXT.md.
Don't duplicate content - maintain single source of truth.

### Document Tool-Specific Workflows

Each header explains how to use the system with that specific tool.

### Team Coordination

If team uses multiple tools, document which tool each person uses.

## Related Commands

- [/init-context](/commands/init-context) - Creates initial claude.md

## See Also

- [Multi-AI Support](/guide/multi-ai-support) - Using multiple AI tools
- [CONTEXT.md Guide](/guide/context-file) - Platform-neutral docs
