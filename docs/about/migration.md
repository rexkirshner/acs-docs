# Migration Guides

Upgrade paths and migration instructions for AI Context System.

## Current Version: v3.2.2

Latest stable release. [See changelog](/about/changelog) for details.

## Upgrade from Any Version

### Quick Upgrade (Recommended)

```bash
/update-context-system
```

**What this does:**
- Downloads latest commands from GitHub
- Updates scripts with new features
- Preserves your context files (no data loss)
- Creates backup before changes
- Validates installation

**Time:** 2-3 minutes

### Manual Upgrade

If `/update-context-system` isn't available:

```bash
# 1. Backup current installation
cp -r .claude .claude-backup
cp -r scripts scripts-backup

# 2. Download latest
curl -sL https://raw.githubusercontent.com/rexkirshner/ai-context-system/main/install.sh | bash

# 3. Verify
/review-context
```

## Version-Specific Migrations

### v3.x → v3.2.2 (Current)

**No breaking changes.** Direct upgrade via `/update-context-system`.

**New features in v3.2.2:**
- Fixed installer bugs
- Better version detection
- Non-interactive mode support

**Action required:** None (automatic upgrade)

### v2.x → v3.x

**Breaking change:** Feedback file renamed.

**Before upgrade:**
```bash
# Check if you have feedback
ls -la context/claude-context-feedback.md
```

**Upgrade:**
```bash
/update-context-system
```

**After upgrade:**
```bash
# Feedback file automatically renamed to:
ls -la context/context-feedback.md
```

**What changed:**
- Repository: `claude-context-system` → `ai-context-system`
- Feedback file: `claude-context-feedback.md` → `context-feedback.md`
- System name: "Claude Context System" → "AI Context System"
- Multi-AI support emphasized

**See:** [MIGRATION_GUIDE_v2_to_v3.md](https://github.com/rexkirshner/ai-context-system/blob/main/MIGRATION_GUIDE_v2_to_v3.md)

### v1.x → v2.x

**Major changes:**
- `/save-context` deprecated → Use `/save` or `/save-full`
- QUICK_REF.md merged into STATUS.md
- File consolidation

**Migration steps:**

1. **Upgrade system:**
```bash
/update-context-system
```

2. **Consolidate files:**
```bash
# If you have QUICK_REF.md:
cat context/QUICK_REF.md

# Content should be in STATUS.md now
# You can delete QUICK_REF.md:
rm context/QUICK_REF.md
```

3. **Update workflow:**
```bash
# Old way:
/save-context  # Deprecated

# New way:
/save          # Quick (2-3 min)
/save-full     # Comprehensive (10-15 min)
```

## Migrating Existing Documentation

### From Other Systems

**If you have existing project documentation:**

Use `/migrate-context` instead of `/init-context`:

```bash
# Don't use:
# /init-context  # This creates fresh templates

# Use:
/migrate-context  # This preserves existing docs
```

**What gets migrated:**
- README.md
- ARCHITECTURE.md
- docs/ directory
- Any existing markdown files

**How it works:**
1. Scans for existing documentation
2. Creates `context/` structure
3. Moves/references existing files
4. Consolidates to single source of truth
5. Preserves ALL content

### From Manual Documentation

**If you've been manually documenting:**

```bash
# 1. Install AI Context System
curl -sL https://raw.githubusercontent.com/rexkirshner/ai-context-system/main/install.sh | bash

# 2. Run migration
/migrate-context

# 3. AI will ask about each file:
Found: README.md
Action: [K]eep in place / [M]ove to context/ / [R]eference
> K  # Keep README.md, reference from CONTEXT.md

Found: docs/architecture.md
Action: [K]eep / [M]ove / [R]eference
> M  # Move to context/ARCHITECTURE.md

# 4. Review consolidated structure
ls -la context/
```

## Breaking Changes by Version

### v3.2.2 (Current)
- ✅ No breaking changes
- ✅ Backward compatible with v3.2.1, v3.2.0

### v3.2.1
- ✅ No breaking changes
- ✅ Backward compatible with v3.2.0

### v3.2.0
- ⚠️ Feedback file renamed (automatic migration)
- ⚠️ Repository URL changed
- ✅ Context files unchanged
- ✅ Commands unchanged

### v2.3.0
- ✅ No breaking changes
- ✅ Performance improvements only

### v2.1.0
- ⚠️ `/save-context` deprecated (still works, use `/save` or `/save-full`)
- ⚠️ QUICK_REF.md merged into STATUS.md
- ✅ Automatic migration on upgrade

### v2.0.0
- ⚠️ File structure reorganization
- ⚠️ Command name changes
- ✅ Migration guide provided

## Rollback Procedures

### Rollback to Previous Version

**If upgrade fails or causes issues:**

```bash
# 1. Check for backup
ls -la .claude-backup-*

# Example:
# .claude-backup-20251023-090757

# 2. Restore from backup
rm -rf .claude scripts
cp -r .claude-backup-20251023-090757/.claude .
cp -r .claude-backup-20251023-090757/scripts .

# 3. Verify
/review-context
cat VERSION
```

### Rollback Context Files

**If context files got corrupted:**

```bash
# 1. Check git history (if tracked)
git log context/

# 2. Restore specific file
git checkout HEAD~1 context/STATUS.md

# 3. Or restore all context
git checkout HEAD~1 context/
```

## Migration Checklist

### Before Upgrading

- [ ] Run `/save-full` (capture current state)
- [ ] Commit all changes to git
- [ ] Note current version: `cat VERSION`
- [ ] Backup important context files
- [ ] Read changelog for breaking changes

### During Upgrade

- [ ] Run `/update-context-system`
- [ ] Watch for errors
- [ ] Note backup location if created
- [ ] Verify installation success message

### After Upgrading

- [ ] Run `/review-context` (verify works)
- [ ] Check `cat VERSION` (should be new version)
- [ ] Test `/save` command
- [ ] Test `/save-full` command
- [ ] Review Quick Reference in STATUS.md
- [ ] Delete old backup if successful: `rm -rf .claude-backup-*`

## Common Migration Issues

### Commands Don't Work After Upgrade

**Symptom:**
```
/save
# No response
```

**Solution:**
```bash
# Restart Claude Code session
# Exit and reopen project

# Or verify installation:
ls -la .claude/commands/save.md
```

### Context Files Missing

**Symptom:**
```
Error: context/STATUS.md not found
```

**Solution:**
```bash
# Restore from backup
cp -r .claude-backup-*/context/ .

# Or reinitialize
/init-context
```

### Version Mismatch

**Symptom:**
```
⚠️  Version mismatch:
Commands: v3.2.2
Context: v3.0.0
```

**Solution:**
```bash
# Update context version
# Edit context/.context-config.json:
{
  "version": "3.2.2"  # Update this
}

# Then:
/save
```

## Deprecation Timeline

### Currently Deprecated

**`/save-context`** (deprecated v2.1.0)
- Still works in v3.x
- Will be removed in v4.0.0
- Use `/save` or `/save-full` instead

**Migration:**
```bash
# Old:
/save-context

# New (quick):
/save  # 2-3 minutes

# New (comprehensive):
/save-full  # 10-15 minutes
```

### Future Deprecations

No deprecations planned for v3.x series.

## FAQ

### Do I need to migrate my context files?

**No.** Context files (CONTEXT.md, STATUS.md, DECISIONS.md, SESSIONS.md) are stable across versions. Only commands and scripts get updated.

### Will I lose my session history?

**No.** SESSIONS.md is preserved during upgrades. Backups are created before changes.

### Can I skip versions?

**Yes.** You can upgrade directly from any version to latest:
```bash
v2.0.0 → v3.2.2  # Works
v1.5.0 → v3.2.2  # Works
```

### How do I know if upgrade succeeded?

```bash
# Check version
cat VERSION
# Should show: 3.2.2

# Test command
/review-context
# Should work without errors

# Check for backup (upgrade creates one)
ls -la .claude-backup-*
# If exists, upgrade ran
```

### Can I upgrade during active work?

**Not recommended.** Best practice:

```bash
# 1. Finish current work
/save-full

# 2. Commit changes
git add . && git commit -m "Save before upgrade"

# 3. Then upgrade
/update-context-system

# 4. Verify
/review-context

# 5. Continue working
```

### What if upgrade breaks my system?

```bash
# Rollback from backup:
ls -la .claude-backup-*
rm -rf .claude scripts
cp -r .claude-backup-[timestamp]/.claude .
cp -r .claude-backup-[timestamp]/scripts .

# Or restore from git:
git checkout HEAD~1 .claude/ scripts/
```

## Getting Help with Migration

**Before migrating:**
- Read [changelog](/about/changelog)
- Check [migration guides](https://github.com/rexkirshner/ai-context-system/tree/main/docs)
- Review [breaking changes](#breaking-changes-by-version)

**During migration:**
- Watch for error messages
- Note backup location
- Keep terminal output

**After migration:**
- Test core commands
- Verify context files
- Check version number

**If stuck:**
- [GitHub Issues](https://github.com/rexkirshner/ai-context-system/issues)
- [Troubleshooting Guide](/guide/troubleshooting)
- [GitHub Discussions](https://github.com/rexkirshner/ai-context-system/discussions)

## Next Steps

- [Changelog](/about/changelog) - See what's new
- [Getting Started](/guide/getting-started) - If new to system
- [Commands Reference](/commands/) - Learn available commands
- [Troubleshooting](/guide/troubleshooting) - Common issues
