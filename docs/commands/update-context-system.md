# /update-context-system

Upgrade AI Context System to latest version from GitHub.

## Overview

Updates commands, scripts, and templates while preserving your context files:
- Downloads latest from GitHub
- Updates .claude/commands/
- Updates scripts/
- Updates templates/
- **Preserves context/ directory** (zero data loss)
- Creates backup before changes

**Safe, non-destructive, automatic updates.**

## When to Use

**Run when:**
- New version available
- Bug fixes released
- Want latest features
- Quarterly maintenance

**Check for updates:** https://github.com/rexkirshner/ai-context-system/releases

## What Gets Updated

### Commands (.claude/commands/)
- /init-context
- /migrate-context
- /save
- /save-full
- /review-context
- All other commands

### Scripts (scripts/)
- save-full-helper.sh
- update-quick-reference.sh
- common-functions.sh
- All helper scripts

### Templates (templates/)
- CONTEXT.template.md
- STATUS.template.md
- DECISIONS.template.md
- SESSIONS.template.md

### What Does NOT Change
✅ context/ directory (your documentation)
✅ .context-config.json (your settings)
✅ artifacts/ (your outputs)
✅ Custom modifications (if documented)

## How It Works

### Step 1: Backup Current Version

```bash
🔄 Creating backup...
   ✅ Backed up to .claude-backup-2025-10-23-143000/
```

### Step 2: Download Latest

```bash
📥 Downloading from GitHub...
   Repository: ai-context-system
   Branch: main
   Version: 3.2.2 → 3.3.0
```

### Step 3: Update Files

```bash
🔄 Updating files...
   ✅ .claude/commands/ (13 files)
   ✅ scripts/ (8 files)
   ✅ templates/ (6 files)
```

### Step 4: Validate Installation

```bash
✅ Validating installation...
   ✅ All commands present
   ✅ Scripts executable
   ✅ Templates valid
```

### Step 5: Run Migration (If Needed)

```bash
📦 Running v3.3.0 migrations...
   ✅ Updated .context-config.json version
   ✅ No breaking changes
```

## Example Output

```bash
$ /update-context-system

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔄 AI CONTEXT SYSTEM UPDATE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Current Version: 3.3.0
Latest Version: 3.3.0

✅ Already up to date!

Your AI Context System is running the latest version.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔄 Creating backup...
   ✅ .claude/ → .claude-backup-2025-10-23/
   ✅ scripts/ → .claude-backup-2025-10-23/scripts/

📥 Downloading latest version...
   ✅ Downloaded from GitHub (main branch)

🔄 Updating files...
   ✅ .claude/commands/ (13 commands updated)
   ✅ scripts/ (8 scripts updated)
   ✅ templates/ (6 templates updated)

✅ Validating installation...
   ✅ All commands executable
   ✅ Scripts have correct permissions
   ✅ Templates valid markdown

📝 Updating configuration...
   ✅ Updated .context-config.json to v3.3.0

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ UPDATE COMPLETE - v3.3.0
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Updated:
  ✅ Commands (13 files)
  ✅ Scripts (8 files)
  ✅ Templates (6 files)

Preserved:
  ✅ context/ (your documentation - unchanged)
  ✅ artifacts/ (your outputs - unchanged)

Backup Location:
  📁 .claude-backup-2025-10-23/
  (Remove after verifying update successful)

Next Steps:
  1. Test commands: /review-context
  2. Verify everything works
  3. Delete backup: rm -rf .claude-backup-2025-10-23/

Full changelog: https://github.com/rexkirshner/ai-context-system/blob/main/CHANGELOG.md
```

## Safety Features

### Automatic Backup

Before any changes:
```
.claude/ → .claude-backup-YYYY-MM-DD-HHMMSS/
scripts/ → .claude-backup-YYYY-MM-DD-HHMMSS/scripts/
```

### Rollback on Failure

If update fails:
```bash
❌ Update failed! Rolling back...
   🔄 Restoring from backup...
   ✅ Rollback complete - system unchanged
```

### Validation Before Commit

```bash
✅ Validating update...
   • File sizes reasonable (no 404 pages)
   • JSON files valid
   • Scripts have shebang
   • Markdown files parseable
```

### Manual Rollback

If issues after update:
```bash
# Restore previous version
rm -rf .claude scripts templates
cp -r .claude-backup-2025-10-23/.claude .
cp -r .claude-backup-2025-10-23/scripts .
cp -r .claude-backup-2025-10-23/templates .

# Verify
/review-context
```

## Non-Interactive Mode

For automation:
```bash
/update-context-system --yes

# Skips confirmation prompts
# Useful for scripts and CI/CD
```

## Best Practices

### Check Changelog First

```bash
# Before updating
# Read: https://github.com/rexkirshner/ai-context-system/blob/main/CHANGELOG.md

# Look for:
# - Breaking changes
# - Migration steps required
# - New features
```

### Update During Quiet Time

```bash
# Don't update mid-session
# Instead:
/save-full              # Save current state
/update-context-system  # Update system
/review-context        # Verify works
# Resume work
```

### Test After Update

```bash
/review-context         # Should work
/save                   # Should work
cat context/STATUS.md  # Should be readable

# If all good:
rm -rf .claude-backup-*
```

### Keep Backups Temporarily

```bash
# After successful update:
# Keep backup for 24 hours
# Then delete:
find . -name ".claude-backup-*" -mtime +1 -exec rm -rf {} \;
```

## Troubleshooting

### Update fails with "404 Not Found"

**Problem:** Network issue or repository unavailable

**Solution:**
```bash
# Check network
ping github.com

# Retry update
/update-context-system

# Or manual update:
git clone https://github.com/rexkirshner/ai-context-system.git temp
cp -r temp/.claude .
cp -r temp/scripts .
rm -rf temp
```

### Commands don't work after update

**Problem:** Permissions or path issues

**Solution:**
```bash
# Fix permissions
chmod +x .claude/commands/*.md
chmod +x scripts/*.sh

# Restart Claude Code
# (Exit and reopen project)
```

### Version number not updated

**Problem:** .context-config.json not updated

**Solution:**
```bash
# Manually update version
# Edit context/.context-config.json:
{
  "version": "3.3.0",  # Update this
  ...
}
```

## Related Commands

- [/validate-context](/commands/validate-context) - Verify update successful
- [/update-templates](/commands/update-templates) - Update doc templates

## See Also

- [Migration Guide](/about/migration) - Version-specific migrations
- [Changelog](/about/changelog) - Release notes
