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
│   ├── agents/                  # 14 specialist agents
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

**v5.2.0** - Code Review Synthesis, Session Index, Architectural Improvements

Major feature release adding the flagship code review synthesis capability:

- **Code Review Synthesis** - `synthesis-agent` combines findings with two-layer deduplication, weighted grading (A-F with severity caps), and standardized Finding IDs (`SEC-001`, `PERF-003`)
- **Session Index** - Auto-generated navigation table for large SESSIONS.md files (1500+ lines), auto-archiving at 2000 lines
- **Working Directory Detection** - `find_project_root()` searches up to 5 parent directories
- **Context Restoration** - New session template section for quick resumption
- **Configuration Health Check** - Detects TBD values, empty fields, placeholder URLs
- **Tech Stack Detection** - Auto-detects frameworks, databases, hosting
- **Date-Based Audit Naming** - Reports use `audit-YYYY-MM-DD.md` format

**v5.1.5** added documentation polish and UX improvements.

**v5.1.4** added library adoption reviewer agent.

[See full changelog →](/about/changelog)
