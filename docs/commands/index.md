# Commands

Three global commands, installed to `~/.claude/commands/` (Claude Code) and `~/.codex/prompts/` (OpenAI Codex).

## Installation

```bash
git clone https://github.com/rexkirshner/ai-context-system.git
./ai-context-system/install.sh
rm -rf ai-context-system
```

This copies the command files to your global config directories. No per-project installation needed.

## The Commands

| Command | Purpose |
|---------|---------|
| [/update-context](/commands/update-context) | Extract permanent learnings → update CLAUDE.md and AGENTS.md |
| [/save-session](/commands/save-session) | Record session history to `docs/sessions/SESSION-NNN.md` |
| [/review](/commands/review) | Comprehensive code review to `docs/audits/CODE-REVIEW-NN.md` |

## Philosophy

These commands are pure prompts—no scripts, no validation, no machinery. They work because:

1. **Global installation** — One install, works everywhere
2. **Tool-agnostic** — Same commands work in Claude Code and OpenAI Codex
3. **Minimal footprint** — No per-project files except what you create
