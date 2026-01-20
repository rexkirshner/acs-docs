# /organize-docs

Guided cleanup of loose documentation files.

## Overview

Interactive tool to organize scattered documentation:
- Detects files in wrong locations
- Suggests proper organization
- Moves files with confirmation
- Cleans up project structure

**Run occasionally** to maintain clean structure.

## When to Use

**Use /organize-docs when:**
- Root directory has many loose .md files
- Planning files scattered everywhere
- Artifacts in wrong locations
- Project feels cluttered

**Frequency:** Monthly or as needed

## What It Detects

### Loose Documentation

```
README.md                    ✅ Keep (project entry)
ARCHITECTURE.md             ⚠️  Move to context/
notes.md                    ⚠️  Move to docs/planning/ or delete
planning-2025-Q1.md         ⚠️  Move to docs/planning/ or archive
code-review-notes.md        ⚠️  Move to docs/audits/
```

### Misplaced Artifacts

```
lighthouse-report.json      ⚠️  Move to artifacts/lighthouse/
coverage.html               ⚠️  Move to artifacts/coverage/
review-001.md               ⚠️  Move to docs/audits/
```

### Old Planning Files

```
brainstorm-ideas.md         ⚠️  Archive or delete
2024-roadmap.md             ⚠️  Archive (outdated)
initial-design.md           ⚠️  Move to artifacts/planning/
```

## Example Session

```bash
$ /organize-docs

🧹 Scanning for loose documentation...

Found 8 files to organize:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📄 ARCHITECTURE.md (root directory)
Suggested: Move to context/ARCHITECTURE.md

Options:
  [M] Move to context/
  [K] Keep in root
  [D] Delete
Choice: M

✅ Moved to context/ARCHITECTURE.md

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📄 notes.md (root directory)
Suggested: Archive or delete

Options:
  [A] Archive to artifacts/planning/
  [D] Delete
  [K] Keep
Choice: D

✅ Deleted notes.md

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📄 lighthouse-report.json
Suggested: Move to artifacts/lighthouse/

Options:
  [M] Move to artifacts/lighthouse/
  [D] Delete
Choice: M

✅ Moved to artifacts/lighthouse/

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ ORGANIZATION COMPLETE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Actions taken:
  • Moved: 3 files
  • Deleted: 1 file
  • Kept: 4 files

Root directory is now clean!
```

## Suggested Locations

### Documentation
- Active docs → context/
- Planning → docs/planning/
- Old ideas → artifacts/planning/ or delete

### Artifacts
- Code reviews → docs/audits/
- Lighthouse → artifacts/lighthouse/
- Coverage → artifacts/coverage/
- Performance → artifacts/performance/

### Keep in Root
- README.md (entry point)
- CONTRIBUTING.md (contribution guide)
- LICENSE
- CHANGELOG.md

## Best Practices

### Run After Features

```bash
# After completing feature
# Likely created planning docs, notes, etc.
/organize-docs

# Clean up before moving on
```

### Monthly Maintenance

```bash
# First Monday of month
/organize-docs

# Keep project tidy
```

### Before Handoffs

```bash
# Before handing off project
/organize-docs      # Clean structure
/validate-context   # Verify docs
/export-context    # Ready to share
```

## Safety Features

### Confirmation Required

Never deletes or moves without confirmation.

### Git Integration

If files are tracked:
```bash
# Uses git mv instead of mv
git mv notes.md artifacts/planning/notes.md

# Preserves git history
```

### Dry Run Mode

```bash
/organize-docs --dry-run

# Shows what would be done
# Doesn't actually move/delete
```

## Related Commands

- [/validate-context](/commands/validate-context) - Check organization
- [/migrate-context](/commands/migrate-context) - Initial organization

## See Also

- [Getting Started](/guide/getting-started) - Standard file structure
- [Quick Start](/guide/quick-start) - Workflow best practices
