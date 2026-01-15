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
│   ├── agents/                  # 12 specialist agents (v5.0)
│   ├── schemas/                 # 7 JSON validation schemas
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

**v5.0.2** - Agent-Based Code Review Architecture

Major release introducing self-declaring specialist agents with formal contracts:

- **12 Specialist Agents** - Code Reviewer (orchestrator) + 8 Specialist Reviewers (Security, Performance, Accessibility, SEO, Database, Infrastructure, TypeScript, Testing) + 3 Support Agents (Codebase Scanner, Synthesis Agent, Audit Compare)
- **22 Slash Commands** - Full command suite including code review orchestrator, specialized audits, context management, and session workflows
- **Self-Declaring Contracts** - Agents declare their own capabilities via JSON Schema-validated contracts
- **Session-Start Hooks** - Automatic context health checks at session start
- **Scope Boundaries** - Clear ownership between agents preventing duplicate findings
- **Shell Compatibility** - Full support for bash, zsh, and sh across macOS and Linux
- **80 tests passing** - Comprehensive coverage including install, hooks, shell compatibility, and cross-platform

**v4.x** introduced modular code review, documentation health checking, and Quick Reference auto-generation.

[See full changelog →](/about/changelog)
