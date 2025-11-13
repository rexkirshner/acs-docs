# Troubleshooting

Common issues and solutions for AI Context System.

## Commands Not Working

### Slash Commands Don't Execute

**Symptoms:**
- Type `/save` and nothing happens
- No command suggestions when typing `/`
- Commands not recognized

**Cause:** Multiple `.claude` directories in parent folders.

**Check:**
```bash
# Search for all .claude directories
find ~ -name ".claude" -type d 2>/dev/null

# Output (problematic):
/Users/you/projects/.claude           # Parent
/Users/you/projects/my-app/.claude     # Your project
```

**Solution:**
```bash
# Remove .claude from parent directories
rm -rf /Users/you/projects/.claude

# Keep only your project's .claude
# Keep: /Users/you/projects/my-app/.claude
```

**Exception:** Meta-projects intentionally have `.claude` in parent. This is normal if configured as meta-project in `.context-config.json`.

### Commands Can't Find Context Files

**Symptoms:**
```
Error: Cannot find context directory
```

**Cause:** Running commands from too deep in directory tree.

**Check:**
```bash
pwd
# Output: /Users/you/projects/my-app/src/components/auth/forms

# Too deep (>3 levels from context/)
```

**Solution:**
```bash
# Move closer to project root
cd /Users/you/projects/my-app

# Or run from any level (system searches up to 3 parents)
/save  # Auto-finds context/
```

## Context Files

### Quick Reference Not Generated

**Symptoms:**
- STATUS.md has empty Quick Reference section
- "Quick Reference" header exists but no content below

**Cause:** Missing or invalid `.context-config.json`

**Check:**
```bash
cat context/.context-config.json

# Should see JSON with project info
```

**Solution:**
```bash
# If file missing, reinitialize
/init-context

# If file exists but invalid, check JSON syntax
# Then regenerate Quick Reference
/save
```

### SESSIONS.md Growing Too Large

**Symptoms:**
- SESSIONS.md exceeds 25,000 tokens
- `/review-context` slow or fails
- File takes long to read

**Cause:** Many sessions accumulated over time.

**Solution:** System handles this automatically with progressive loading:

- **<1000 lines:** Reads full file
- **1000-5000 lines:** Strategic loading (first, last, key sections)
- **>5000 lines:** Indexed loading (headers + recent entries)

**Manual archive (optional):**
```bash
# Create archive directory
mkdir -p context/archive/

# Move old sessions (keep recent 10)
# Edit SESSIONS.md, move sessions 1-50 to:
# context/archive/SESSIONS-2024-Q1.md
```

## Git Integration

### Git Status Blank

**Symptoms:**
```
ℹ️  Not a git repository (skipping git data)
```

**But you have a .git directory:**
```bash
ls -la .git/  # Exists!
```

**Cause 1:** Running from subdirectory of non-git parent.

**Check:**
```bash
pwd
# /Users/you/projects/my-app/backend

git rev-parse --git-dir
# .git  # Git repo exists here
```

**Solution:** This is expected if parent is meta-project. See meta-project documentation.

**Cause 2:** `.git` file instead of directory (submodule).

**Check:**
```bash
cat .git
# Output: gitdir: ../.git/modules/my-app
```

**Solution:** This is a git submodule. Commands work but git status handled differently.

### Git Operations Not Auto-Logged

**Symptoms:**
- Run `/save-full`
- SESSIONS.md has no "Git Operations" section
- Recent commits not listed

**Cause:** No commits since last session.

**Check:**
```bash
git log --since="1 day ago"
# Shows recent commits

# If empty, no commits to log
```

**Solution:** This is expected if you haven't committed yet. Git operations only logged if commits exist since last session.

## Installation Issues

### Install Script Fails

**Symptoms:**
```
curl: (404) Not Found
```

**Cause:** Trying to install from wrong URL or network issue.

**Solution:**
```bash
# Use correct URL:
curl -sL https://raw.githubusercontent.com/rexkirshner/ai-context-system/main/install.sh | bash

# Or download and inspect first:
curl -sL https://raw.githubusercontent.com/rexkirshner/ai-context-system/main/install.sh -o install.sh
bash install.sh
```

### Commands Installed But Not Available

**Symptoms:**
- `.claude/commands/` directory exists
- Files like `save.md` are there
- But `/save` doesn't work

**Cause:** Claude Code not detecting commands.

**Solution:**
```bash
# Restart Claude Code session
# Exit and reopen project

# Or:
# Open Claude Code settings
# Verify custom commands path is .claude/commands/
```

## Performance Issues

### /save-full Takes Too Long

**Symptoms:**
- `/save-full` takes >20 minutes
- Should be 10-15 minutes

**Cause:** Helper script analyzing too many files.

**Check:**
```bash
# See what files changed
git status

# If hundreds of files:
# - Large refactor?
# - node_modules/ not in .gitignore?
```

**Solution:**
```bash
# Add to .gitignore:
node_modules/
.next/
dist/
build/
coverage/

# Commit .gitignore
git add .gitignore
git commit -m "Add gitignore"

# Then /save-full should be faster
```

### /review-context Slow

**Symptoms:**
- `/review-context` takes >30 seconds
- Should be 2-3 seconds

**Cause:** SESSIONS.md too large (see above).

**Solution:** System auto-handles with progressive loading. If still slow, archive old sessions manually.

## Configuration Issues

### Wrong Project Name in Quick Reference

**Symptoms:**
```
Project: example-project
```

**But your project is called "my-app"**.

**Cause:** `.context-config.json` has wrong project name.

**Solution:**
```bash
# Edit config
nano context/.context-config.json

# Update:
{
  "project": {
    "name": "my-app",  # Change this
    ...
  }
}

# Regenerate Quick Reference
/save
```

### Commands Using Wrong Paths

**Symptoms:**
- Commands can't find files
- Errors about missing directories

**Cause:** Working directory changed or project moved.

**Check:**
```bash
# From project root:
ls -la context/
ls -la .claude/
ls -la scripts/

# All should exist
```

**Solution:**
```bash
# Ensure you're in project root
cd /path/to/your/project

# Verify structure
pwd  # Should be project root
```

## Version Issues

### System Version Outdated

**Symptoms:**
```
⚠️  Update available: v3.3.0 (you have v3.0.0)
```

**Solution:**
```bash
/update-context-system

# Upgrades commands and scripts from GitHub
```

### Upgrade Fails

**Symptoms:**
```
❌ Installation failed
🔄 Restoring from backup...
```

**Cause:** Network issue, wrong URL, or validation failure.

**Check:**
```bash
# Check network
ping github.com

# Check backup exists
ls -la .claude-backup-*
```

**Solution:**
```bash
# If backup exists, system auto-restored
# Try upgrade again with better network

# Or manually upgrade:
git clone https://github.com/rexkirshner/ai-context-system.git
cp -r ai-context-system/.claude/* .claude/
cp -r ai-context-system/scripts/* scripts/
```

## Common Workflow Issues

### Can't Resume After Break

**Symptoms:**
- Run `/review-context`
- Don't know where to start
- Last session unclear

**Cause:** Didn't run `/save-full` before break.

**Solution:**
```bash
# Always before breaks:
/save-full

# This creates comprehensive SESSIONS.md entry
# With "Next Session" section
```

### Lost Work

**Symptoms:**
- Made changes yesterday
- STATUS.md doesn't reflect them
- Can't remember what was done

**Cause:** Didn't save before ending session.

**Prevention:**
```bash
# Build habit:
# 1. Work on code
# 2. /save every 30-60 min
# 3. /save-full before breaks
# 4. /save-full at end of day

# Every session ends with:
/save-full
```

### Blockers Not Captured

**Symptoms:**
- Hit blocker yesterday
- Forgot what it was
- No record in STATUS.md

**Solution:**
```bash
# When blocker appears:
/save

# AI prompts for blocker details
# Documents in STATUS.md immediately
```

## Meta-Project Issues

### Sub-Repo Commands Not Working

**Symptoms:**
- Run `/save` from backend/
- Error: Commands not found

**Cause:** System checking wrong `.claude` directory.

**Solution:**
```bash
# Ensure only one .claude in hierarchy
ls -la .claude/              # Should not exist in sub-repo
ls -la ../.claude/           # Should exist in parent

# Remove if in sub-repo:
rm -rf backend/.claude
```

### Git Status Shows Wrong Repo

**Symptoms:**
- Working in `backend/`
- Git status shows `frontend/` changes

**Cause:** Running from wrong directory.

**Solution:**
```bash
# Check current directory
pwd
# /projects/portfolio/frontend  # Wrong!

# Go to correct repo
cd ../backend/
/save
```

## Getting Help

### Where to Get Support

**Documentation:**
- [Getting Started](/guide/getting-started)
- [Quick Start](/guide/quick-start)
- [Commands Reference](/commands/)
- [Workflows](/workflows/)

**GitHub:**
- [Issues](https://github.com/rexkirshner/ai-context-system/issues)
- [Discussions](https://github.com/rexkirshner/ai-context-system/discussions)

### Reporting Bugs

**Include:**
1. What you were trying to do
2. What command you ran
3. What error you got
4. Your system info:
   ```bash
   # Version
   cat VERSION

   # OS
   uname -a

   # Directory structure
   ls -la .claude/commands/
   ls -la context/
   ```

### Feature Requests

File an issue with:
- Use case (what are you trying to do?)
- Current workaround (if any)
- Proposed solution
- Examples from other systems

## Emergency Recovery

### System Completely Broken

**Symptoms:**
- No commands work
- Context files corrupted
- Can't recover

**Nuclear Option - Reinstall:**
```bash
# 1. Backup current context
cp -r context/ context-backup/

# 2. Remove system
rm -rf .claude/ scripts/ templates/

# 3. Reinstall
curl -sL https://raw.githubusercontent.com/rexkirshner/ai-context-system/main/install.sh | bash

# 4. Initialize
/init-context

# 5. Restore content from backup
cp -r context-backup/* context/

# 6. Verify
/review-context
```

### Context Files Corrupted

**Symptoms:**
- SESSIONS.md won't open
- STATUS.md has invalid format
- Can't read context files

**Recovery:**
```bash
# 1. Check git history (if tracked)
git log context/SESSIONS.md
git checkout HEAD~1 context/SESSIONS.md

# 2. Or restore from backup
ls -la .claude-backup-*/
cp .claude-backup-*/context/SESSIONS.md context/

# 3. Or recreate from templates
cp templates/sessions-template.md context/SESSIONS.md
# Manually add recent sessions
```

## Still Stuck?

If none of these solutions work:

1. Check [GitHub Issues](https://github.com/rexkirshner/ai-context-system/issues) for similar problems
2. Search [documentation](/) for your specific error
3. File a new issue with details
4. Ask in [GitHub Discussions](https://github.com/rexkirshner/ai-context-system/discussions)

**Remember:** When in doubt, `/save`!
