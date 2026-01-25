# Common Workflows

The AI Context System is built around one core workflow: **The Session Loop**.

## The Session Loop

Every development session follows this pattern:

```
Start → Read STATUS.md
Work → Edit Working Set files
End → Run /save
```

That's it. Follow this loop consistently and context persists naturally.

## Daily Work

Your typical development session:

```bash
# 1. Start session
# Read context/STATUS.md for current state
# See: Objective, Working Set, Next Actions

# 2. Work on your project
# ... coding, debugging, refactoring ...

# 3. End session
/save
```

## AI-to-AI Handoff

Transfer project to another AI agent:

```bash
# 1. End current session
/save

# 2. New AI reads same files
# - CLAUDE.md (project overview)
# - context/STATUS.md (current state)
# - context/DECISIONS.md (past decisions)

# Result: Perfect context transfer
```

The new AI picks up exactly where the previous one left off.

## Human Review of AI Work

Verify AI understood your project:

```bash
# 1. Check AI's reasoning
# Read context/DECISIONS.md
# Understand WHY choices were made

# 2. Review current state
# Read context/STATUS.md
# See what's being worked on

# 3. Check Working Set
# Ensure AI is touching the right files
```

## New Project Setup

Starting from scratch:

```bash
# 1. Install
git clone --depth 1 https://github.com/rexkirshner/ai-context-system.git
mkdir -p .claude
cp -r ai-context-system/.claude/commands .claude/
cp ai-context-system/.claude/VERSION .claude/
rm -rf ai-context-system

# 2. Initialize
/init-context

# 3. Customize
# Edit CLAUDE.md with project details
# Fill in context/STATUS.md

# 4. Start working
# Follow the Session Loop
```

## Switching Between Tools

Using multiple AI tools (Claude Code, Cursor, Aider, etc.):

```bash
# All tools read the same files:
# - CLAUDE.md
# - context/STATUS.md
# - context/DECISIONS.md

# Claude Code users:
/save

# Other tools:
# Manually update STATUS.md
# Or ask the AI to update it
```

## Best Practices

### Save at Session End

```bash
/save
```

Always. Every time. Build the habit.

### Keep Working Set Current

3-7 items is ideal. Update when focus shifts.

### Record Meaningful Decisions

When you make a choice with tradeoffs, the AI records it automatically:

```bash
/save
# AI autonomously records significant decisions
```

### Read Before Starting

Before diving into work, read STATUS.md:
- What's the current Objective?
- What files are in the Working Set?
- What are the Next Actions?
- Are there any Blockers?

## Success Metrics

**Session Continuity:**
> "I can end any session, return days later, read STATUS.md, and continue exactly where I left off."

**Decision Clarity:**
> "I can read DECISIONS.md and understand why choices were made."

**AI Handoffs:**
> "A new AI agent can read the context files and understand the entire project."

When these are true, the system is working.
