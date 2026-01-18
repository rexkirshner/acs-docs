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

**./CLAUDE.md** - AI header for Claude Code (at project root)
- Auto-loaded by Claude Code at conversation start
- Points to CONTEXT.md for full project context
- Other tools use `context/cursor.md`, `context/aider.md`, etc.

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
├── docs/
│   └── audits/                 # Code review reports (v4.0.0+)
│
└── artifacts/                  # Other analysis outputs
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

::: warning Nested Git Repositories (v5.1.2+)
If nested git repositories are detected, you'll see a warning:

```bash
⚠️  Nested git repositories detected:
   ./child-app/.git
   ./another-repo/.git

This may cause context confusion. Each git repo should have its own
AI Context System installation, or use only the parent's context.
```

This prevents context confusion where a child repo accidentally uses a parent repo's context files.
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
  "version": "5.1.2",
  "project": {
    "name": "your-project",
    "type": "application",
    "tech_stack": ["Next.js", "TypeScript", "PostgreSQL"]
  },
  "created": "2026-01-18"
}
```

This config drives the **auto-generated Quick Reference** in STATUS.md.

### Step 3.5

::: tip
/init-context now automatically detects project information from your codebase.
:::

Before creating files, the command gathers info from:
- `package.json` (name, description, dependencies)
- `Cargo.toml`, `pyproject.toml`, `go.mod` (language-specific projects)
- `git remote` (repository URL)
- Project files (framework, database, hosting detection)

```bash
📊 Auto-Detected Project Information:
  Project Name: my-app
  Description: A Next.js web application with user authentication
  Repository: https://github.com/user/my-app
  Tech Stack: Next.js, TypeScript, PostgreSQL, Prisma
  Project Type: web-app
```

This information is used to pre-populate templates, reducing manual work.

### Step 3.6

::: tip
/init-context now detects if ACS is already installed and prevents accidental re-initialization.
:::

If the command finds an existing `context/.context-config.json`:

```bash
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚠️  AI Context System Already Initialized
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Found existing context/.context-config.json

Existing context files:
  ✅ CONTEXT.md (exists)
  ✅ STATUS.md (exists)
  ✅ DECISIONS.md (exists)
  ✅ SESSIONS.md (exists)

Options:
  [C] Continue anyway (may overwrite files)
  [R] Reset to fresh installation
  [X] Cancel and keep existing
```

This prevents confusion when running init on an already-initialized project.

### Step 3.7

::: tip
/init-context now detects existing CLAUDE.md files and provides integration guidance.
:::

If an existing CLAUDE.md is found at the project root:

**For large files (>5KB):**
```bash
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ℹ️  Existing CLAUDE.md Detected (12.3 KB)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

This file is larger than typical ACS templates.

How ACS supplements existing CLAUDE.md:
  • CLAUDE.md: Project rules, coding standards, AI instructions
  • context/CONTEXT.md: Project orientation, tech stack, goals
  • context/STATUS.md: Current state, work in progress
  • context/SESSIONS.md: Session history, mental models

Recommendation: Keep your CLAUDE.md for project rules,
use context/ files for session state and continuity.
```

**For small files (<5KB):**
```bash
ℹ️  Note: Existing CLAUDE.md (2.1 KB) will be preserved.
   ACS context/ files supplement, not replace, your CLAUDE.md.
```

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
   ✅ ./CLAUDE.md (at project root, auto-loaded)
   ✅ context/CONTEXT.md (customized for Next.js)
   ✅ context/STATUS.md
   ✅ context/DECISIONS.md
   ✅ context/SESSIONS.md
   ✅ context/context-feedback.md
   ✅ context/.context-config.json

📁 Creating directories...
   ✅ docs/audits/
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

### Fill In Template Placeholders (Critical!)

::: warning
/init-context now validates that template placeholders are filled in before completing.
:::

After file creation, the command shows unfilled `[FILL:...]` placeholders:

```bash
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚠️  CRITICAL: Fill In Template Placeholders
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CONTEXT.md has 17 [FILL:...] placeholders that need your project info.

Key placeholders to fill:
  • [FILL: Project Name] - Use: my-app (auto-detected)
  • [FILL: 2-3 sentence description] - Use: A Next.js web application...
  • [FILL: Primary goal 1] - Your project's main goal
  • [FILL: e.g., Next.js 15] - Use: Next.js (auto-detected)

Please fill these in now to ensure AI agents have proper context.
```

**Why this matters:** Context files left as templates defeat the purpose of the system. AI agents need actual project information, not placeholder text.

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
