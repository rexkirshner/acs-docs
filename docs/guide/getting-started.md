# Getting Started

Get up and running with the AI Context System in 5 minutes.

## Installation

### Copy Files to Your Project

```bash
# Clone the repo
git clone --depth 1 https://github.com/rexkirshner/ai-context-system.git

# Copy to your project
mkdir -p /path/to/your/project/.claude
cp -r ai-context-system/.claude/commands /path/to/your/project/.claude/
cp ai-context-system/.claude/VERSION /path/to/your/project/.claude/

# Clean up
rm -rf ai-context-system
```

### Verify Installation

```bash
ls .claude/commands/
# Should show 8 files:
# init-context.md, save.md, update-context-system.md,
# review-security.md, review-performance.md,
# review-accessibility.md, review-seo.md
```

## Initialize Context

In Claude Code, run:

```
/init-context
```

This creates three files:

| File | Purpose |
|------|---------|
| `CLAUDE.md` | Project entry point (auto-loaded by Claude Code) |
| `context/STATUS.md` | Current state, Working Set, next actions |
| `context/DECISIONS.md` | Append-only decision log |

The command detects your project info from `package.json`, `README.md`, or asks you.

## Your First Session

### 1. Start

Claude Code auto-loads `CLAUDE.md`. Read `context/STATUS.md` to see current state.

### 2. Work

Do your normal development work. The Working Set in STATUS.md lists 3-7 files you're touching.

If you need to edit files outside the Working Set, add them first.

### 3. End

Run `/save` when you're done:

```
/save
```

This updates STATUS.md with:
- Today's date
- Current git commit
- Updated Working Set
- Next actions
- Any blockers

It also asks: "Any decisions worth recording?" If yes, appends to DECISIONS.md.

## The Session Loop

This is the core pattern:

```
┌─────────────────────────────────────┐
│                                     │
│   Start → Read STATUS.md            │
│     ↓                               │
│   Work → Edit Working Set files     │
│     ↓                               │
│   End → Run /save                   │
│     ↓                               │
│   (Next session)                    │
│                                     │
└─────────────────────────────────────┘
```

Every session follows this loop. That's the entire system.

## Commands Reference

### Daily Use

| Command | When | What It Does |
|---------|------|--------------|
| `/init-context` | Once (setup) | Creates the three context files |
| `/save` | End of session | Updates STATUS.md, records decisions |

### Maintenance

| Command | When | What It Does |
|---------|------|--------------|
| `/update-context-system` | When updates available | Updates commands, runs migrations |

### Optional Reviews

| Command | What It Does |
|---------|--------------|
| `/review-security` | Security audit (report only) |
| `/review-performance` | Performance review (report only) |
| `/review-accessibility` | Accessibility review (report only) |
| `/review-seo` | SEO review (report only) |
| `/review-cost` | Cost optimization review (report only) |

## Requirements

- Claude Code CLI (for slash commands)
- Any project (language/framework agnostic)
- Git (optional — enables HeadCommit staleness detection)
- macOS, Linux, or Windows with WSL/Git Bash

Works with any AI tool that can read markdown files.

## Next Steps

- [CLAUDE.md Guide](/guide/claude-md) — Understanding the entry point
- [STATUS.md Guide](/guide/status-file) — Current state and Working Set
- [DECISIONS.md Guide](/guide/decisions-file) — Recording decisions
- [Session Continuity](/guide/session-continuity) — How context persists

## Tips

### Save Often

Run `/save` whenever you finish a logical chunk of work. It only takes a moment.

### Keep Working Set Small

3-7 items is ideal. If you're touching more files, you might be doing too much at once.

### Record Meaningful Decisions

Not every choice needs recording. Focus on decisions that:
- Affect future development
- Have meaningful tradeoffs
- Someone might ask "why did we do it this way?"

### Trust the System

The Session Loop is simple by design. Follow it consistently and context persists naturally.

## Troubleshooting

**Commands not working?**
- Make sure you're in the project root
- Check that `.claude/commands/` exists with 8 files

**Need help?**
- [Troubleshooting Guide](/guide/troubleshooting)
- [GitHub Issues](https://github.com/rexkirshner/ai-context-system/issues)
