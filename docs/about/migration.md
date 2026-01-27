# Migration Guide

How to upgrade to AI Context System v6.0.

## Current Version: v6.0.6

v6.0 is a **radical simplification**:

| Aspect | v5.x | v6.0 |
|--------|------|------|
| Commands | 22 | 8 |
| Agents | 14 | 0 |
| Scripts | 150KB+ | 0 |
| Schemas | 8 | 0 |
| Hooks | Yes | No |
| Context files | 5+ | 3 |

**Philosophy change:** From mechanical validation to advisory prompts.

---

## Two Upgrade Paths

| From | To | Method |
|------|-----|--------|
| Pre-v6 (v5.x, v4.x, etc.) | v6.0+ | Run `migrate-to-v6.sh` script |
| v6.x | v6.y | Run `/update-context-system` command |

**Important:** These paths are mutually exclusive. Use the correct one for your situation.

---

## Fresh Install (New Projects)

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
# Should show 8 files
```

---

## Upgrading from Pre-v6 (v5.x, v4.x, etc.)

If you're on a pre-v6 version, you **must** use the migration script. The `/update-context-system` command will not work for pre-v6 projects.

### How to Identify Pre-v6

You're on pre-v6 if you have any of:
- `scripts/` directory
- `.claude/agents/` directory
- `context/SESSIONS.md` file
- STATUS.md with `## Quick Reference` or `## Current Phase` section

### Migration Steps

**Before you start:** Commit your files to git. The script doesn't create backups — use `git checkout` to rollback if needed.

**1. Download and run the migration script:**

```bash
curl -O https://raw.githubusercontent.com/rexkirshner/ai-context-system/main/migrate-to-v6.sh
chmod +x migrate-to-v6.sh
./migrate-to-v6.sh
```

**2. Restart Claude Code** (exit and reopen)

**3. Run `/init-context`**

```
/init-context
```

This command detects the post-migration state and:
- Reads your old context files (SESSIONS.md, CONTEXT.md, etc.)
- Extracts valuable information
- Creates v6.0 format STATUS.md and DECISIONS.md
- Adds Session Loop to CLAUDE.md if missing
- Deletes old files (SESSIONS.md, CONTEXT.md)

**4. Verify with `/save`**

### What the Script Does

1. **Checks for git** — Required for downloading v6.0 commands
2. **Verifies pre-v6 installation** — Refuses to run on fresh or v6.0+ projects
3. **Deletes v5.x infrastructure** (no valuable content):
   - `scripts/`, `templates/`, `config/`, `test/`, `reference/`, `artifacts/`
   - `.claude/agents/`, `.claude/skills/`, `.claude/schemas/`, `.claude/hooks/`, `.claude/docs/`
   - `install.sh`, `VERSION` (root level)
4. **Keeps context files for migration:**
   - `context/SESSIONS.md`, `context/CONTEXT.md` — Claude extracts value, then deletes
   - `context/STATUS.md`, `context/DECISIONS.md` — Claude updates to v6.0 format
5. **Downloads v6.0 commands** from GitHub
6. **Deletes itself** — The script is no longer needed

**No backup is created.** Use `git checkout` to rollback if needed.

### Context File Formats

**STATUS.md v6.0 format:**

```markdown
# Status

SchemaVersion: 1
LastUpdated: YYYY-MM-DD
HeadCommit: [git SHA or N/A]
Objective: [current goal]

## Working Set

- [3-7 files/directories being touched]

## Next Actions

- [concrete next steps]

## Blocked On

- (None)
```

**DECISIONS.md v6.0 format:**

```markdown
# Decisions

Append-only log.

---

## YYYY-MM-DD: [Area] Decision Title
Why: [reason for the decision]
Tradeoff: [what we gave up]
RevisitWhen: [trigger to revisit]
```

### If Something Goes Wrong

Use git to restore the previous state:

```bash
# Restore all deleted files
git checkout -- .

# Or restore specific files
git checkout -- context/ .claude/ CLAUDE.md
```

---

## Upgrading from v6.x to v6.y

For projects already on v6.0+, use the built-in command:

```bash
/update-context-system
```

That's it. The command:
1. Checks current version
2. Downloads latest v6.x commands
3. Updates `.claude/commands/` and `.claude/VERSION`
4. Reports success

No migration steps needed for v6.x → v6.y upgrades.

---

## What Changed in v6.0

### Removed

| Feature | Why Removed |
|---------|-------------|
| 22 commands → 8 | Most were rarely used |
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
| 5 review commands | Useful audits |

### Added

| Feature | Purpose |
|---------|---------|
| Session Loop | Simple, memorable pattern |
| SchemaVersion | Future-proofs STATUS.md |
| Working Set | Explicit containment boundary |

---

## Troubleshooting Migration

### "/update-context-system says I'm on pre-v6"

This is correct. The command only handles v6.x → v6.y upgrades. Use the migration script instead:

```bash
curl -O https://raw.githubusercontent.com/rexkirshner/ai-context-system/main/migrate-to-v6.sh
chmod +x migrate-to-v6.sh
./migrate-to-v6.sh
```

### "/save says STATUS.md is in v5.x format"

Your context files need migration. Either:

1. **Run the migration script** (if you haven't yet)
2. **Manually update STATUS.md** to v6.0 format (see format above)

### "migrate-to-v6.sh says I'm already on v6.x"

Correct. You don't need the migration script. Use `/update-context-system` for v6.x → v6.y upgrades.

### "migrate-to-v6.sh says no v5.x installation detected"

This means you don't have any v5.x artifacts. Either:
- This is a fresh project — use `/init-context` to set up
- You already migrated — use `/update-context-system` for future upgrades

### Old commands still work

**Problem:** v5.x commands like `/save-full` still execute

**Solution:** Delete old command files:
```bash
rm -rf .claude/commands/
# Then reinstall v6.0 commands
```

---

## Need Help?

- [Getting Started](/guide/getting-started) — Full setup guide
- [Troubleshooting](/guide/troubleshooting) — Common issues
- [GitHub Issues](https://github.com/rexkirshner/ai-context-system/issues) — Report problems
