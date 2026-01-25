# /update-context-system

Updates command files to the latest version from GitHub.

## Overview

Downloads the latest commands while preserving your context files:
- Updates `.claude/commands/` (7 command files)
- Updates `.claude/VERSION`
- **Preserves `context/` directory** (your documentation)
- **Preserves `CLAUDE.md`** (your project entry point)

## When to Use

**Run when:**
- New version available
- Bug fixes released
- Want latest features

**Check for updates:** https://github.com/rexkirshner/ai-context-system/releases

## What Gets Updated

### Updated

| Directory | Contents |
|-----------|----------|
| `.claude/commands/` | 7 command files |
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
📋 Current version: 6.0.0
📋 Latest version: 6.0.1
```

### Step 2: Download Latest

```bash
📥 Downloading from GitHub...
   Cloning ai-context-system...
```

### Step 3: Update Files

```bash
🔄 Updating files...
   ✅ .claude/commands/ (7 files)
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

Current Version: 6.0.0
Latest Version: 6.0.1

📥 Downloading latest version...
   ✅ Downloaded from GitHub

🔄 Updating files...
   ✅ .claude/commands/ (7 files updated)
   ✅ .claude/VERSION

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ UPDATE COMPLETE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Updated:
  ✅ Commands (7 files)
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

## Migration from v5.x

If you're updating from v5.x (22 commands, agents, scripts), this update will:
1. Replace all commands with the simplified v6.0 versions
2. **Not** delete old v5.x files (agents/, docs/, schemas/, hooks/, scripts/)

For a clean v6.0 installation, see the [Migration Guide](/about/migration).

## See Also

- [Getting Started](/guide/getting-started) — Installation
- [Migration Guide](/about/migration) — Version-specific migrations
- [Changelog](/about/changelog) — Release notes
