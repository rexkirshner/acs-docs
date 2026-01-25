---
layout: home

hero:
  name: AI Context System
  text: Externalize AI context. Enable session continuity.
  tagline: 3 files. 7 commands. Zero scripts. Built for Claude Code.
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: View on GitHub
      link: https://github.com/rexkirshner/ai-context-system

features:
  - title: Session Continuity
    details: Resume exactly where you left off. The Session Loop pattern ensures context persists across sessions and AI-to-AI handoffs.

  - title: Radical Simplicity
    details: v6.0 cut 22 commands to 7, 14 agents to 0, and 150KB of scripts to zero. Pure prompts, no machinery.

  - title: Working Set Boundary
    details: 3-7 files you're actively touching. Simple containment without complex validation.

  - title: Decision Memory
    details: DECISIONS.md captures why choices were made. The only file that preserves rationale for future reference.
---

## Quick Start

```bash
# Clone and copy to your project
git clone --depth 1 https://github.com/rexkirshner/ai-context-system.git
mkdir -p /path/to/your/project/.claude
cp -r ai-context-system/.claude/commands /path/to/your/project/.claude/
cp ai-context-system/.claude/VERSION /path/to/your/project/.claude/
rm -rf ai-context-system

# In Claude Code, initialize
/init-context
```

This creates `CLAUDE.md`, `context/STATUS.md`, and `context/DECISIONS.md`.

## What Gets Created

```
your-project/
├── CLAUDE.md              # Entry point (auto-loaded by Claude Code)
├── .claude/
│   ├── VERSION            # Installed version (6.0.0)
│   └── commands/          # 7 slash commands
└── context/
    ├── STATUS.md          # Current state + Working Set
    └── DECISIONS.md       # Decision log (why)
```

## The Session Loop

Every session follows this pattern:

1. **Start** → Read `context/STATUS.md`
2. **Work** → Edit files in Working Set
3. **End** → Run `/save`

That's it. No complex workflows. No validation machinery.

## Commands

| Command | Purpose |
|---------|---------|
| `/init-context` | Create context files (asks before overwriting) |
| `/save` | Update STATUS.md, optionally record decisions |
| `/update-context-system` | Update to latest version |
| `/review-security` | Security audit (report only) |
| `/review-performance` | Performance review (report only) |
| `/review-accessibility` | Accessibility review (report only) |
| `/review-seo` | SEO review (report only) |

## Current Version

**v6.0.0** — Radical Simplification

- **3 files** instead of 8
- **7 commands** instead of 22
- **0 scripts** — Claude handles logic
- **Advisory, not mechanical** — Guidelines, not enforcement

[See full changelog →](/about/changelog)

## Philosophy

> **The value is in the subtraction.**

v5.x had 22 commands, 14 agents, and 150KB of shell scripts. It was overengineered.

v6.0 asks: what's the minimum needed for session continuity? Three files and a simple loop.
