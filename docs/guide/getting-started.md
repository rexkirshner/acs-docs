# Getting Started

Welcome to the AI Context System! This guide will help you install and start using the system in minutes.

## What is AI Context System?

The AI Context System externalizes AI reasoning into visible, structured documentation that enables:

- **Session Continuity** - Resume work exactly where you left off
- **Externalized Context** - Make AI decisions and mental models visible
- **Human-AI Collaboration** - Full visibility into AI thinking
- **AI-to-AI Collaboration** - Seamless handoffs and peer review

## Quick Installation

### Option 1: One-Command Install (Recommended)

```bash
# Install from GitHub
curl -sL https://raw.githubusercontent.com/rexkirshner/ai-context-system/main/install.sh | bash

# Initialize context
/init-context
```

### Option 2: Manual Install

```bash
# Clone the repository
git clone https://github.com/rexkirshner/ai-context-system.git

# Copy to your project
cp -r ai-context-system/.claude /path/to/your/project/
cp -r ai-context-system/scripts /path/to/your/project/
cp -r ai-context-system/templates /path/to/your/project/

# Initialize
/init-context

# Clean up
rm -rf ai-context-system
```

## What Gets Created

After running `/init-context`, you'll have:

```
your-project/
├── context/
│   ├── .context-config.json     # Project configuration
│   ├── claude.md                # Claude Code entry point
│   ├── CONTEXT.md               # Project orientation
│   ├── STATUS.md                # Current state
│   ├── DECISIONS.md             # Decision log
│   └── SESSIONS.md              # History
├── .claude/commands/            # 14 slash commands
├── scripts/                     # Helper utilities
└── templates/                   # Documentation templates
```

## Daily Workflow

```bash
# Start your session
/review-context

# Work on your project...

# Save frequently (2-3 minutes)
/save

# Before breaks/handoffs (10-15 minutes)
/save-full
```

## Next Steps

- [Quick Start Guide](/guide/quick-start) - Your first session
- [Core Concepts](/guide/session-continuity) - Understanding the system
- [Commands Reference](/commands/) - All available commands
- [Common Workflows](/workflows/) - Real-world usage patterns

## Requirements

**For Claude Code users (full features):**
- Claude Code CLI
- File system access

**For other AI tools:**
- Any AI coding assistant with file system access
- Manual use of templates and file structure
- Reference appropriate tool header (cursor.md, aider.md, etc.)

**Universal:**
- Any project (language/framework agnostic)
- Git recommended but not required

## Troubleshooting

**Commands not working?**
- Check for multiple `.claude` directories
- Only keep `.claude` in project root
- Exception: Meta-projects intentionally have multiple

**Need help?**
- [Troubleshooting Guide](/guide/troubleshooting)
- [GitHub Issues](https://github.com/rexkirshner/ai-context-system/issues)
