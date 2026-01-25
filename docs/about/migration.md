# Migration Guide

How to upgrade to AI Context System v6.0.

## Current Version: v6.0.0

v6.0 is a **radical simplification**:

| Aspect | v5.x | v6.0 |
|--------|------|------|
| Commands | 22 | 7 |
| Agents | 14 | 0 |
| Scripts | 150KB+ | 0 |
| Schemas | 8 | 0 |
| Hooks | Yes | No |
| Context files | 5+ | 3 |

**Philosophy change:** From mechanical validation to advisory prompts.

## Fresh Install (Recommended for New Projects)

```bash
# 1. Clone and copy
git clone --depth 1 https://github.com/rexkirshner/ai-context-system.git
mkdir -p .claude
cp -r ai-context-system/.claude/commands .claude/
cp ai-context-system/.claude/VERSION .claude/
rm -rf ai-context-system

# 2. Initialize
/init-context

# 3. Verify
ls .claude/commands/
# Should show 7 files
```

## Migrating from v5.x

### Step 1: Delete v5.x Artifacts

```bash
# Remove directories that no longer exist in v6.0
rm -rf .claude/agents/
rm -rf .claude/docs/
rm -rf .claude/schemas/
rm -rf .claude/hooks/
rm -rf scripts/
rm -rf templates/
rm -f .claude/acs-settings.json
rm -f .claude/.last-update-check
```

### Step 2: Update Commands

```bash
# Get v6.0 commands
git clone --depth 1 https://github.com/rexkirshner/ai-context-system.git
cp -r ai-context-system/.claude/commands .claude/
cp ai-context-system/.claude/VERSION .claude/
rm -rf ai-context-system
```

### Step 3: Simplify Context Files

**CLAUDE.md** — Add the Session Loop blockquote at the top:

```markdown
> **Session Loop**
> 1. Start → Read `context/STATUS.md`
> 2. End → Run `/save`

# [Your Project Name]

[Your existing content...]
```

**STATUS.md** — Simplify to v6.0 format:

```markdown
# Status

SchemaVersion: 1
LastUpdated: [today]
HeadCommit: [git SHA or N/A]
Objective: [your current objective]

## Working Set

- [files you're touching]

## Next Actions

- [what's next]

## Blocked On

- (None)
```

Remove these sections (no longer used):
- Quick Reference
- Current Phase
- Work In Progress details
- Active Tasks
- Context Restoration

**DECISIONS.md** — Keep as-is (format unchanged).

**Delete these files** (no longer used):
- `context/CONTEXT.md`
- `context/SESSIONS.md`
- `context/context-feedback.md`
- `context/.context-config.json`

### Step 4: Verify

```bash
# Check version
cat .claude/VERSION
# Should show: 6.0.0

# List commands
ls .claude/commands/
# Should show 7 files

# Test the Session Loop
# Read context/STATUS.md
# Run /save
```

## What Changed in v6.0

### Removed

| Feature | Why Removed |
|---------|-------------|
| 22 commands → 7 | Most were rarely used |
| 14 agents | Over-engineered for most projects |
| JSON schemas | Mechanical validation unnecessary |
| Session hooks | Added complexity without value |
| SESSIONS.md | STATUS.md is sufficient |
| CONTEXT.md | CLAUDE.md covers this |
| Quick Reference | Manual editing is fine |
| .context-config.json | Not needed |
| scripts/ | No shell scripts needed |
| templates/ | Templates embedded in commands |

### Kept

| Feature | Why Kept |
|---------|----------|
| CLAUDE.md | Entry point, works well |
| STATUS.md | Essential for session continuity |
| DECISIONS.md | Captures "why" - irreplaceable |
| /init-context | Still needed for setup |
| /save | Core of Session Loop |
| /update-context-system | Needed for updates |
| 4 review commands | Useful audits |

### Added

| Feature | Purpose |
|---------|---------|
| Session Loop | Simple, memorable pattern |
| SchemaVersion | Future-proofs STATUS.md |
| Working Set | Explicit containment boundary |

## Troubleshooting Migration

### Old commands still work

**Problem:** v5.x commands like `/save-full` still execute

**Solution:** Delete old command files:
```bash
rm -rf .claude/commands/
# Then reinstall v6.0 commands
```

### STATUS.md has wrong format

**Problem:** STATUS.md still has v5.x format with Quick Reference, etc.

**Solution:** Manually update to v6.0 format (see Step 3 above).

### Missing DECISIONS.md

**Problem:** DECISIONS.md doesn't exist

**Solution:** Create it:
```markdown
# Decisions

Append-only log.

---
```

## Need Help?

- [Getting Started](/guide/getting-started) — Full setup guide
- [Troubleshooting](/guide/troubleshooting) — Common issues
- [GitHub Issues](https://github.com/rexkirshner/ai-context-system/issues) — Report problems
