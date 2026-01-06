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
├── .claude/commands/            # 22 slash commands
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

**v4.0.1** - Bug Fixes & Framework Improvements

Patch release with fixes from first user feedback:
- Fixed ORGANIZATION.md download URL in installer
- Fixed session number detection (handles gaps from archiving)
- Fixed consistency check validation logic
- Added manual fallbacks for audit helper functions
- Added framework-specific patterns (Svelte, Vue) to audits

**v4.0.0** introduced the Modular Code Review System with 8 specialized audit commands:

- **Security** - OWASP Top 10, authentication, injection, XSS
- **Performance** - Core Web Vitals, bundle analysis, runtime
- **Accessibility** - WCAG 2.1 AA, keyboard navigation, ARIA
- **SEO** - Metadata, structured data, crawlability
- **Database** - N+1 detection, indexes, query optimization
- **Infrastructure** - Serverless costs, caching, builds
- **TypeScript** - Type safety, strict mode, any tracking
- **Testing** - Coverage, test quality, CI integration

Plus custom audit extensibility for project-specific audits. [See changelog →](/about/changelog)
