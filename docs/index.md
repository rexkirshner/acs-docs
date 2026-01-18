---
layout: home

hero:
  name: AI Context System
  text: Externalize AI reasoning. Enable perfect session continuity.
  tagline: Built for all AI coding assistants. Optimized for Claude Code.
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: View on GitHub
      link: https://github.com/rexkirshner/ai-context-system

features:
  - title: Session Continuity
    details: Resume exactly where you left off—days, weeks, or months later—without re-explaining anything.

  - title: Externalized Context
    details: Make AI thoughts, decisions, and mental models visible to humans in structured documentation.

  - title: Human-AI Collaboration
    details: Full visibility into AI reasoning enables programmers to work alongside AI agents effectively.

  - title: AI-to-AI Collaboration
    details: Facilitate peer review, project handoffs, and collaborative development between AI agents.

  - title: Fast & Simple
    details: Quick saves (2-3 min) for daily work. Comprehensive saves (10-15 min) before breaks.

  - title: Multi-AI Support
    details: Universal file structure works with Claude Code, Cursor, Aider, GitHub Codex, and more.
---

## Quick Start

```bash
# One-command install
curl -sL https://raw.githubusercontent.com/rexkirshner/ai-context-system/main/install.sh | bash

# Initialize context
/init-context

# Daily workflow
/review-context  # Start of session (30 sec)
/save            # Quick update (2-3 min)
/save-full       # Comprehensive save (10-15 min)
```

## What Gets Created

```
your-project/
├── CLAUDE.md                    # ← Auto-loaded by Claude Code
├── context/                     # Externalized AI context
│   ├── CONTEXT.md               # Project orientation
│   ├── STATUS.md                # Current state + Quick Reference
│   ├── DECISIONS.md             # Decision log (WHY)
│   └── SESSIONS.md              # History + mental models
├── .claude/
│   ├── commands/                # 22 slash commands
│   ├── agents/                  # 13 specialist agents (v5.1)
│   ├── schemas/                 # 8 JSON validation schemas
│   └── hooks/                   # Session automation
└── scripts/                     # Helper utilities
```

## Core Philosophy

AI reasoning is invisible. Context is lost between sessions. Decisions lack rationale. Humans can't review AI's thinking.

**The solution:** Externalize AI context into structured, visible documentation that serves four purposes:

1. **Session Continuity** - Pick up exactly where you left off
2. **Externalized Context** - Make AI reasoning visible to humans
3. **Human-AI Collaboration** - Full visibility into AI thinking
4. **AI-to-AI Collaboration** - Perfect handoffs and peer review

## Current Version

**v5.1.2** - Nested Repository Detection & Claude Code Conflict Fix

Patch release addressing two critical issues:

- **Nested repo detection** - Installer warns when nested git repositories detected
- **Parent context detection** - Warns when parent directory already has ACS installed
- **Git boundary checking** - `find_context_folder()` respects git boundaries at runtime
- **Claude Code conflict fix** - Renamed `settings.json` to `acs-settings.json` to avoid schema conflict
- **166 tests passing** - Including 19 new tests for nested repo detection

**v5.1.1** fixed shell compatibility bugs (macOS grep, parent detection, zsh output).

**v5.1.0** introduced finding deduplication, decision-aware review, and comprehensive testing infrastructure.

**v5.0** introduced agent-based code review with specialist agents and self-declaring contracts.

[See full changelog →](/about/changelog)
