# Troubleshooting

Common issues and solutions for AI Context System v6.0.

## Commands Not Working

### Slash Commands Don't Execute

**Symptoms:**
- Type `/save` and nothing happens
- No command suggestions when typing `/`
- Commands not recognized

**Check:**
```bash
ls .claude/commands/
# Should show 7 files:
# init-context.md, save.md, update-context-system.md,
# review-security.md, review-performance.md,
# review-accessibility.md, review-seo.md
```

**Solution:**
```bash
# If missing, reinstall:
git clone --depth 1 https://github.com/rexkirshner/ai-context-system.git
cp -r ai-context-system/.claude/commands .claude/
cp ai-context-system/.claude/VERSION .claude/
rm -rf ai-context-system

# Then restart Claude Code session
```

### Multiple .claude Directories

**Symptoms:**
- Commands execute but affect wrong project
- Context files appear in wrong location

**Cause:** Multiple `.claude` directories in parent folders.

**Check:**
```bash
find ~ -name ".claude" -type d 2>/dev/null | head -20
```

**Solution:**
```bash
# Remove .claude from parent directories
rm -rf /path/to/parent/.claude

# Keep only your project's .claude
```

## Context Files

### Missing Context Files

**Symptoms:**
- `context/STATUS.md` doesn't exist
- `/save` fails to update status

**Solution:**
```bash
# Initialize context files
/init-context
```

This creates:
- `CLAUDE.md` — Entry point (at project root)
- `context/STATUS.md` — Current state
- `context/DECISIONS.md` — Decision log

### Context Files Exist But Wrong Format

**Symptoms:**
- Files have v5.x format (SESSIONS.md, Quick Reference, etc.)
- `/save` behaves unexpectedly

**Solution:**

The system may have been set up with a previous version. You can either:

1. **Migrate manually:** Update STATUS.md to v6.0 format:
   ```markdown
   # Status

   SchemaVersion: 1
   LastUpdated: YYYY-MM-DD
   HeadCommit: [git SHA or N/A]
   Objective: [current goal]

   ## Working Set

   - [files you're touching]

   ## Next Actions

   - [concrete next steps]

   ## Blocked On

   - (None)
   ```

2. **Start fresh:** Back up and reinitialize:
   ```bash
   mv context context-backup
   /init-context
   ```

## Git Integration

### HeadCommit Shows N/A

**Symptoms:**
```markdown
HeadCommit: N/A
```

**Cause:** Not a git repository, or running from subdirectory.

**Check:**
```bash
git rev-parse --short HEAD
```

**Solution:**
- If not a git repo, this is expected behavior
- If git repo, ensure you're running from project root

### HeadCommit Stale (Different from Current HEAD)

**Symptoms:**
- STATUS.md shows `HeadCommit: abc123`
- But `git rev-parse --short HEAD` shows `def456`

**Cause:** Commits were made outside the context system (by another tool, team member, or CI).

**Solution:**
This is a warning that STATUS.md might be outdated. Review before continuing:

```bash
# See what changed
git log abc123..HEAD --oneline

# Then update
/save
```

## Installation Issues

### Clone Fails

**Symptoms:**
```
fatal: could not create work tree dir
```

**Check:**
```bash
# Verify you have write permission
ls -la .

# Check disk space
df -h
```

**Solution:**
- Ensure you have write permissions to current directory
- Free up disk space if needed

### Commands Not Recognized After Install

**Symptoms:**
- Files exist in `.claude/commands/`
- But `/save` doesn't work

**Solution:**
```bash
# Exit and restart Claude Code
exit
claude
```

Claude Code loads command definitions once per session. After installation, you need to start a new session.

## Version Issues

### Need to Update

**Check current version:**
```bash
cat .claude/VERSION
```

**Update to latest:**
```bash
/update-context-system
```

Or manually:
```bash
git clone --depth 1 https://github.com/rexkirshner/ai-context-system.git
cp -r ai-context-system/.claude/commands .claude/
cp ai-context-system/.claude/VERSION .claude/
rm -rf ai-context-system
```

### Migrating from v5.x

If you have v5.x installed (22 commands, agents, scripts), see [Migration Guide](/about/migration).

Key changes:
- Delete `.claude/agents/`, `.claude/docs/`, `.claude/schemas/`, `.claude/hooks/`
- Delete `scripts/` and `templates/`
- Remove SESSIONS.md (no longer used)
- Update STATUS.md to v6.0 format
- Simplify CLAUDE.md with Session Loop blockquote

## Common Workflow Issues

### Can't Resume After Break

**Symptoms:**
- Don't know where to start
- Last session unclear

**Cause:** Didn't run `/save` before break.

**Prevention:**
```bash
# Always before breaks:
/save
```

**Recovery:**
```bash
# Check git log for recent changes
git log --oneline -10

# Check file modification times
ls -lt src/

# Reconstruct and update STATUS.md manually
```

### Lost Track of Working Set

**Symptoms:**
- Working Set lists files you're no longer touching
- Forgot to update it when focus shifted

**Solution:**
```bash
# Update STATUS.md with current Working Set
/save
```

The `/save` command prompts you to confirm or update the Working Set.

### Decisions Not Captured

**Symptoms:**
- Made important decision yesterday
- No record in DECISIONS.md

**Prevention:**
```bash
# When prompted by /save:
# "Any decisions worth recording?" → Yes
```

**Manual entry:**
Add to `context/DECISIONS.md`:
```markdown
---

## YYYY-MM-DD: [Area] Decision Title
Why: [reason for the decision]
Tradeoff: [what you gave up]
RevisitWhen: [trigger to revisit]
```

## Emergency Recovery

### Reinstall Everything

**If system is broken:**

```bash
# 1. Backup context
cp -r context context-backup

# 2. Remove old installation
rm -rf .claude

# 3. Reinstall
git clone --depth 1 https://github.com/rexkirshner/ai-context-system.git
mkdir -p .claude
cp -r ai-context-system/.claude/commands .claude/
cp ai-context-system/.claude/VERSION .claude/
rm -rf ai-context-system

# 4. Restore context
mv context-backup/* context/

# 5. Restart Claude Code
exit
claude
```

### Context Files Corrupted

**If STATUS.md or DECISIONS.md are broken:**

```bash
# Check git history
git log context/STATUS.md
git checkout HEAD~1 context/STATUS.md

# Or recreate from template
/init-context
# (Will create new files, then merge in old content manually)
```

## Getting Help

### Documentation

- [Getting Started](/guide/getting-started)
- [CLAUDE.md Guide](/guide/claude-md)
- [STATUS.md Guide](/guide/status-file)
- [DECISIONS.md Guide](/guide/decisions-file)

### GitHub

- [Issues](https://github.com/rexkirshner/ai-context-system/issues)
- [Discussions](https://github.com/rexkirshner/ai-context-system/discussions)

### Reporting Bugs

Include:
1. What you were trying to do
2. What command you ran
3. What error you got
4. System info:
   ```bash
   cat .claude/VERSION
   ls -la .claude/commands/
   ls -la context/
   ```

## Still Stuck?

If none of these solutions work:

1. Check [GitHub Issues](https://github.com/rexkirshner/ai-context-system/issues)
2. File a new issue with details
3. Ask in [GitHub Discussions](https://github.com/rexkirshner/ai-context-system/discussions)

**Remember:** When in doubt, `/save`!
