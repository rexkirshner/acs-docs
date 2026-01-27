# /update-context-system

Updates command files from v6.x to v6.y. **Not for pre-v6 migrations.**

## Overview

Downloads the latest v6.x commands while preserving your context files:
- Updates `.claude/commands/` (8 command files)
- Updates `.claude/VERSION`
- **Preserves `context/` directory** (your documentation)
- **Preserves `CLAUDE.md`** (your project entry point)

**Important:** This command is for v6.x → v6.y upgrades only. For pre-v6 migrations (v5.x, v4.x, etc.), use the `migrate-to-v6.sh` script. See [Migration Guide](/about/migration).

## Pre-v6 Detection

Before proceeding, the command checks for pre-v6 installations.

**Pre-v6 indicators (any of these):**
- `scripts/` directory exists
- `.claude/agents/` directory exists
- `context/SESSIONS.md` exists
- STATUS.md contains `## Quick Reference` or `## Current Phase`

**If pre-v6 detected, the command stops and reports:**

```
This project is on a pre-v6 version.

/update-context-system is for v6.x to v6.y upgrades only.

For pre-v6 to v6.0 migration, download and run the migration script:

curl -O https://raw.githubusercontent.com/rexkirshner/ai-context-system/main/migrate-to-v6.sh
chmod +x migrate-to-v6.sh
./migrate-to-v6.sh

See: https://acs-docs.pages.dev/about/migration
```

## When to Use

**Run when:**
- New v6.x version available
- Bug fixes released
- Want latest features

**Check for updates:** https://github.com/rexkirshner/ai-context-system/releases

## What Gets Updated

### Updated

| Directory | Contents |
|-----------|----------|
| `.claude/commands/` | 8 command files |
| `.claude/VERSION` | Version number |

### Preserved (Not Changed)

| File/Directory | Contents |
|----------------|----------|
| `CLAUDE.md` | Your project entry point |
| `context/STATUS.md` | Your current state |
| `context/DECISIONS.md` | Your decision log |

## Usage

```bash
/update-context-system
```

## How It Works

### Step 1: Check Current Version

```bash
📋 Current version: 6.0.3
📋 Latest version: 6.0.5
```

### Step 2: Download Latest

```bash
📥 Downloading from GitHub...
   Cloning ai-context-system...
```

### Step 3: Update Files

```bash
🔄 Updating files...
   ✅ .claude/commands/ (8 files)
   ✅ .claude/VERSION
```

### Step 4: Clean Up

```bash
🧹 Cleaning up...
   ✅ Removed temporary files
```

## Example Output

```bash
/update-context-system

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔄 AI CONTEXT SYSTEM UPDATE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Current Version: 6.0.3
Latest Version: 6.0.5

📥 Downloading latest version...
   ✅ Downloaded from GitHub

🔄 Updating files...
   ✅ .claude/commands/ (8 files updated)
   ✅ .claude/VERSION

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ UPDATE COMPLETE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Updated:
  ✅ Commands (8 files)
  ✅ VERSION

Preserved:
  ✅ CLAUDE.md
  ✅ context/STATUS.md
  ✅ context/DECISIONS.md

⚠️  IMPORTANT: Restart Claude Code to use new commands
   Claude Code caches slash commands at session start.

Next Steps:
  1. Restart Claude Code (exit and reopen)
  2. Test commands: /save
```

## Session Restart Required

After updating, you must start a **new Claude Code session** to use the updated commands. Claude Code loads command definitions once per session.

- **In terminal:** Type `/exit`, then run `claude` again
- **In VS Code:** Close the Claude Code panel and reopen it

## Manual Update

If the command fails, you can update manually:

```bash
# Download latest
git clone --depth 1 https://github.com/rexkirshner/ai-context-system.git temp-acs

# Update commands
cp -r temp-acs/.claude/commands .claude/
cp temp-acs/.claude/VERSION .claude/

# Clean up
rm -rf temp-acs
```

## Troubleshooting

### Network Error

**Problem:** Can't reach GitHub

**Solution:**
```bash
# Check network
ping github.com

# If network is fine, try manual update (see above)
```

### Commands Not Working After Update

**Problem:** Old commands still running

**Solution:**
1. Exit Claude Code
2. Reopen project
3. Commands should now work

### Wrong Version Showing

**Check:**
```bash
cat .claude/VERSION
```

Should show the latest version number.

### Need to Rollback

**Problem:** Update caused issues, need to restore previous version

**Solution:** Use git to restore:
```bash
git checkout .claude/commands/ .claude/VERSION
```

**Note:** This assumes `.claude/` is committed to your repository. Commit it before running updates.

## See Also

- [Getting Started](/guide/getting-started) — Installation
- [Migration Guide](/about/migration) — Version-specific migrations
- [Changelog](/about/changelog) — Release notes
