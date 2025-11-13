# /export-context

Export all context documentation to single markdown file for handoffs.

## Overview

Combines all context files into one comprehensive document:
- CONTEXT.md (orientation)
- STATUS.md (current state)
- DECISIONS.md (decision log)
- SESSIONS.md (history)
- Adds table of contents
- Adds navigation links
- Timestamps export

Perfect for **AI-to-AI handoffs** and **developer onboarding**.

## When to Use

**Use /export-context before:**
- AI-to-AI handoffs (Claude → Cursor)
- Developer handoffs (vacation, team changes)
- Sharing project context with stakeholders
- Creating project documentation snapshot
- Archiving project state

**Time:** 1 minute

## What Gets Exported

### Single File Output

```
artifacts/exports/context-export-2025-10-23.md
```

Contains:
- Table of contents with jump links
- CONTEXT.md (full content)
- STATUS.md (full content)
- DECISIONS.md (full content)
- SESSIONS.md (full content or last N sessions)
- Export metadata (date, version, file sizes)

### Example Structure

```markdown
# AI Context System - Project Export

**Exported:** 2025-10-23 14:30:00
**Version:** 3.3.0
**Project:** my-app

## Table of Contents

1. [Project Context (CONTEXT.md)](#project-context)
2. [Current Status (STATUS.md)](#current-status)
3. [Decisions (DECISIONS.md)](#decisions)
4. [Session History (SESSIONS.md)](#session-history)

---

## Project Context

[Full CONTEXT.md content...]

---

## Current Status

[Full STATUS.md content...]

---

## Decisions

[Full DECISIONS.md content...]

---

## Session History

[Last 10 sessions or full history...]
```

## How It Works

### Step 1: Validate Context

```bash
📋 Validating context files...
   ✅ CONTEXT.md (2,345 lines)
   ✅ STATUS.md (456 lines)
   ✅ DECISIONS.md (1,234 lines)
   ✅ SESSIONS.md (5,678 lines)
```

### Step 2: Combine Files

Merges all content with:
- Section headers
- Navigation links
- Proper formatting

### Step 3: Add Metadata

```markdown
**Export Information:**
- Date: 2025-10-23 14:30:00
- Exporter: Claude Code v1.5
- System Version: 3.3.0
- Files Included: 4
- Total Size: 45,234 words
```

### Step 4: Save Export

```bash
📦 Export saved to:
   artifacts/exports/context-export-2025-10-23.md

📊 Export contains:
   - CONTEXT.md (project orientation)
   - STATUS.md (current state)
   - DECISIONS.md (15 decisions)
   - SESSIONS.md (15 sessions)
   - Total: 45,000 words

Share this file with incoming AI agent or developer
```

## Example Output

```markdown
# AI Context System - my-app Export

**Exported:** 2025-10-23 14:30:00 UTC
**Version:** 3.3.0
**Project:** my-app (Next.js application)
**Phase:** MVP Development - Authentication Sprint

## Quick Navigation

- [Project Context](#project-context) - What, why, how
- [Current Status](#current-status) - Where we are now
- [Decisions](#decisions) - Why choices were made (15 decisions)
- [Session History](#session-history) - What happened (15 sessions)

## Export Stats

| File | Lines | Last Updated |
|------|-------|--------------|
| CONTEXT.md | 234 | 2025-10-20 |
| STATUS.md | 145 | 2025-10-23 |
| DECISIONS.md | 456 | 2025-10-23 |
| SESSIONS.md | 2,345 | 2025-10-23 |

---

## Project Context

### What & Why

[Full CONTEXT.md content here...]

---

## Current Status

### 📊 Quick Reference

**Project:** my-app
**Phase:** MVP Development
**Current Focus:** JWT authentication implementation

[Full STATUS.md content here...]

---

## Decisions

### Decision Log

All technical decisions with rationale...

#### DEC-001: Next.js over Create React App

[Full decision content...]

---

## Session History

### Recent Sessions

#### Session 15 | 2025-10-23 | JWT Authentication

[Full session content...]

---

*End of Export*
```

## Export Options

### Full Export (Default)

```bash
/export-context
```

Includes everything, all sessions.

### Recent Sessions Only

```bash
/export-context --recent=10
```

Includes only last 10 sessions (keeps file size manageable).

### Exclude Sessions

```bash
/export-context --no-sessions
```

Only CONTEXT.md, STATUS.md, DECISIONS.md (for quick orientation).

### JSON Format

```bash
/export-context --format=json
```

Exports as structured JSON for programmatic access:
```json
{
  "exported": "2025-10-23T14:30:00Z",
  "version": "3.3.0",
  "project": {
    "name": "my-app",
    "phase": "MVP Development"
  },
  "context": "...",
  "status": "...",
  "decisions": [...],
  "sessions": [...]
}
```

## Use Cases

### AI-to-AI Handoff

```bash
# Claude Code preparing to hand off
/save-full                    # Document current state
/export-context              # Create export

# Share with incoming AI:
# "Read artifacts/exports/context-export-2025-10-23.md
#  for complete project context"

# Incoming AI reads export and continues work
```

### Developer Onboarding

```bash
# Before new developer starts
/export-context

# Email them the export file
# They read it for project overview
# Then dive into specific areas
```

### Project Snapshot

```bash
# End of sprint
/export-context

# Archive for records:
mv artifacts/exports/context-export-2025-10-23.md \
   artifacts/snapshots/sprint-5-complete.md
```

### Stakeholder Update

```bash
# Quarterly review
/export-context --no-sessions

# Share context + status + decisions
# Without detailed session history
```

## File Size Management

### Large SESSIONS.md Files

If SESSIONS.md >5000 lines:

```bash
# Option 1: Recent sessions only
/export-context --recent=20

# Option 2: Exclude sessions entirely
/export-context --no-sessions

# Option 3: Archive old sessions first
# Move sessions 1-50 to context/archive/
# Then export
```

### Export Size Limits

- **Small:** <1 MB (easy to share)
- **Medium:** 1-5 MB (consider recent sessions only)
- **Large:** >5 MB (definitely use --recent flag)

## Best Practices

### Before Handoffs

```bash
# Complete handoff preparation
/save-full                   # 1. Document everything
/validate-context            # 2. Verify completeness
/export-context              # 3. Create export

# Handoff note in STATUS.md:
# "See artifacts/exports/context-export-2025-10-23.md
#  for complete project context"
```

### Version Control

```bash
# Don't commit exports to git (too large)
echo "artifacts/exports/" >> .gitignore

# Instead: Share via file sharing
# Or: Archive important snapshots separately
```

### Naming Convention

Exports are automatically named:
```
context-export-YYYY-MM-DD.md
context-export-YYYY-MM-DD-HH-MM.md  # If multiple per day
```

### Review Before Sharing

```bash
# Create export
/export-context

# Review it
cat artifacts/exports/context-export-$(date +%Y-%m-%d).md | less

# Verify:
# - No sensitive data
# - No API keys
# - No passwords
# - Complete context
```

## Output Example

```bash
$ /export-context

📋 Validating context files...
   ✅ context/CONTEXT.md (234 lines)
   ✅ context/STATUS.md (145 lines)
   ✅ context/DECISIONS.md (456 lines)
   ✅ context/SESSIONS.md (2,345 lines)

📦 Combining files...
   ✅ Added table of contents
   ✅ Added navigation links
   ✅ Added metadata

💾 Saving export...

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ EXPORT COMPLETE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📄 Export saved to:
   artifacts/exports/context-export-2025-10-23.md

📊 Export contains:
   - CONTEXT.md (project orientation)
   - STATUS.md (current state)
   - DECISIONS.md (15 decisions)
   - SESSIONS.md (15 sessions)
   - Total: 45,234 words

📤 Ready to share:
   • AI-to-AI handoff: Provide file path to incoming AI
   • Developer onboarding: Email or share via file sharing
   • Documentation snapshot: Archive for records

💡 Tip: This export is comprehensive. For quick orientation,
   use /export-context --no-sessions for smaller file.
```

## Related Commands

- [/save-full](/commands/save-full) - Prepare comprehensive state before export
- [/validate-context](/commands/validate-context) - Verify completeness before export

## See Also

- [AI-to-AI Handoff](/workflows/ai-handoff) - Complete handoff workflow
- [Session Continuity](/guide/session-continuity) - Zero context loss
