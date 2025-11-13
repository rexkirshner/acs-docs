# /init-context

Initialize AI Context System for a new project with minimal overhead.

## Overview

Creates 5 core files + 1 AI header that enable perfect session continuity and AI collaboration:

- **claude.md** - AI entry point (Claude Code specific)
- **CONTEXT.md** - Project orientation (platform-neutral)
- **STATUS.md** - Current state with auto-generated Quick Reference
- **DECISIONS.md** - Decision log (WHY choices were made)
- **SESSIONS.md** - Session history with mental models
- **context-feedback.md** - Feedback log for system improvements

**Philosophy:** Minimal overhead during work. Good-enough recovery when needed. Platform-neutral core with tool-specific entry points.

## When to Use

**Use /init-context for:**
- New projects with no existing documentation
- Projects with only a basic README

**Use /migrate-context instead for:**
- Projects with 2+ significant documentation files
- Existing projects with README, ARCHITECTURE.md, docs/ directory
- Projects where you want to preserve existing documentation

::: tip Auto-Detection
/init-context automatically detects mature projects and suggests /migrate-context if appropriate.
:::

## What Gets Created

### Core Files (Required)

**context/claude.md** - AI header for Claude Code
- Entry point for Claude AI
- Points to CONTEXT.md for full project context
- Tool-specific (cursor.md, aider.md for other tools)

**context/CONTEXT.md** - Project orientation (300-400 lines)
- What & Why: Project purpose and goals
- How: Architecture and tech stack
- Who: Team structure and ownership
- Constraints: Requirements and limitations
- **Rarely changes** - foundation document

**context/STATUS.md** - Current state (updated frequently)
- **Auto-generated Quick Reference** at top (dashboard)
- Current Phase and focus
- Work In Progress with exact resume points
- Active blockers
- Next session priorities
- **Single source of truth** for "what's happening now"

**context/DECISIONS.md** - Decision log
- WHY choices were made (critical for AI)
- Alternatives considered
- Tradeoffs accepted
- When to reconsider
- **AI agents need rationale, not just code**

**context/SESSIONS.md** - Session history
- Comprehensive entries (40-60 lines each)
- Mental models and problem-solving approaches
- Mandatory TL;DR for quick scanning
- Git operations auto-logged
- **Enables AI-to-AI handoffs**

**context/context-feedback.md** - Feedback log
- Bug reports about the context system itself
- Improvement suggestions
- Questions and clarifications
- Helps improve the system

### Optional Files (Created When Needed)

**context/CODE_MAP.md** - Code organization guide
- Only if project has 20+ files
- File/folder structure
- Module dependencies
- Quick navigation

**context/cursor.md, aider.md** - Other AI headers
- For multi-tool teams
- Same pattern as claude.md
- Points to CONTEXT.md

**context/PRD.md** - Product requirements
- Only for product-focused projects
- User stories and requirements
- Roadmap and priorities

**context/ARCHITECTURE.md** - System design
- Only for complex architectures
- Design patterns and decisions
- Component interactions

### Folder Structure

```
project/
├── context/                    # Core documentation
│   ├── claude.md              # AI entry point
│   ├── CONTEXT.md             # Orientation
│   ├── STATUS.md              # Current state
│   ├── DECISIONS.md           # Decision log
│   ├── SESSIONS.md            # Session history
│   ├── context-feedback.md    # System feedback
│   └── .context-config.json   # Configuration
│
└── artifacts/                  # Analysis outputs
    ├── code-reviews/
    ├── lighthouse/
    ├── performance/
    ├── security/
    ├── bundle-analysis/
    └── coverage/
```

## How It Works

### Step 1: Project Detection

Automatically analyzes your project:
- Checks for existing documentation
- Identifies tech stack (package.json, Cargo.toml, go.mod, etc.)
- Detects project type (web app, API, library, etc.)
- Finds git repository information

::: warning Multiple .claude Directories
If multiple .claude directories are detected in parent folders, you'll see a warning. Only keep .claude in your actual project root (unless you're using a meta-project setup).
:::

### Step 2: Customized Templates

Creates files customized to your project:
- Project name from package.json or directory name
- Tech stack auto-detected
- Git repository URL (if available)
- Smart defaults based on project type

### Step 3: Configuration

Creates `.context-config.json` with:
```json
{
  "version": "3.3.0",
  "project": {
    "name": "your-project",
    "type": "application",
    "tech_stack": ["Next.js", "TypeScript", "PostgreSQL"]
  },
  "created": "2025-10-23"
}
```

This config drives the **auto-generated Quick Reference** in STATUS.md.

### Step 4: Ready to Use

After initialization:
- Run `/review-context` to see current state
- Start working on your project
- Use `/save` every 30-60 min to update STATUS.md
- Use `/save-full` before breaks to create comprehensive session entries

## Example Output

```bash
$ /init-context

🔍 Checking project maturity...
✅ No existing documentation detected
   /init-context is the correct command

📦 Analyzing project...
   Project: my-app
   Type: Next.js application
   Tech: TypeScript, React, Tailwind CSS
   Git: https://github.com/user/my-app

✅ Creating core documentation files...
   ✅ context/claude.md
   ✅ context/CONTEXT.md (customized for Next.js)
   ✅ context/STATUS.md
   ✅ context/DECISIONS.md
   ✅ context/SESSIONS.md
   ✅ context/context-feedback.md
   ✅ context/.context-config.json

📁 Creating artifact directories...
   ✅ artifacts/code-reviews/
   ✅ artifacts/lighthouse/
   ... (6 total)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ INITIALIZATION COMPLETE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Core Files Created (6):
  ✅ claude.md (AI entry point)
  ✅ CONTEXT.md (orientation - customize with project details)
  ✅ STATUS.md (current state)
  ✅ DECISIONS.md (decision log)
  ✅ SESSIONS.md (history)
  ✅ context-feedback.md (system feedback)

Next Steps:
  1. Review and customize context/CONTEXT.md
  2. Run /review-context to see current state
  3. Start working - use /save frequently
  4. Before breaks: use /save-full

Documentation: https://acs.rexkirshner.com/
```

## Best Practices

### Customize CONTEXT.md Immediately

After initialization, customize CONTEXT.md with:
- Project purpose and goals
- Architecture decisions
- Tech stack rationale
- Team structure
- Known constraints

**Why:** This rarely changes, so invest time upfront. AI agents use this to understand your project's foundation.

### Use /save Frequently

During work:
- `/save` every 30-60 minutes
- Updates STATUS.md
- Auto-generates Quick Reference
- Takes 2-3 minutes

### Use /save-full for Breaks

Before breaks/handoffs:
- `/save-full` creates comprehensive session entry
- Captures mental models
- Documents problem-solving approach
- Takes 10-15 minutes
- **Critical for AI handoffs**

### Document Decisions in Real-Time

When making significant technical decisions:
- Add entry to DECISIONS.md immediately
- Include rationale, alternatives, tradeoffs
- Link from SESSIONS.md
- **AI agents need WHY, not just WHAT**

## Troubleshooting

### "Multiple .claude directories detected"

**Problem:** Parent folder has .claude directory

**Solution:**
```bash
# If parent is NOT a project:
rm -rf ../.claude

# If parent IS a meta-project:
# Edit parent's context/.context-config.json:
{
  "project": {
    "type": "meta-project"
  }
}
```

### "Detected existing documentation"

**Problem:** Project has 2+ documentation files

**Solution:** Use `/migrate-context` instead to preserve existing docs

### Context files missing after init

**Problem:** Files weren't created

**Check:**
```bash
ls -la context/
# Should show: claude.md, CONTEXT.md, STATUS.md, DECISIONS.md, SESSIONS.md

# If missing, verify you're in project root:
pwd
# Should be your project directory, not a subdirectory
```

## Related Commands

- [/migrate-context](/commands/migrate-context) - For projects with existing docs
- [/review-context](/commands/review-context) - View current state
- [/save](/commands/save) - Quick updates
- [/save-full](/commands/save-full) - Comprehensive saves
- [/validate-context](/commands/validate-context) - Check documentation health

## See Also

- [Session Continuity](/guide/session-continuity) - Zero context loss
- [CONTEXT.md Guide](/guide/context-file) - Project orientation
- [STATUS.md Guide](/guide/status-file) - Current state
- [DECISIONS.md Guide](/guide/decisions-file) - Decision logging
- [Getting Started](/guide/getting-started) - Full setup guide
