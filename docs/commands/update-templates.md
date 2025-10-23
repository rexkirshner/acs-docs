# /update-templates

Compare and update context files with latest templates.

## Overview

Interactive tool to update your documentation files with latest template improvements:
- Compares your files to latest templates
- Shows visual diffs of changes
- Updates only what you approve
- Preserves your custom content

**Safe, selective template updates.**

## When to Use

**Run when:**
- After /update-context-system
- Want latest template improvements
- Migrating between major versions
- Documentation structure feels outdated

**Time:** 2-5 minutes

## What It Compares

- context/CONTEXT.md ↔ templates/CONTEXT.template.md
- context/STATUS.md ↔ templates/STATUS.template.md
- context/DECISIONS.md ↔ templates/DECISIONS.template.md
- context/SESSIONS.md ↔ templates/SESSIONS.template.md

## How It Works

```bash
$ /update-templates

🔍 Comparing context files with templates...

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📄 CONTEXT.md

Changes in template:
  + Added "Known Issues" section
  + Updated "Tech Stack" format
  - Removed deprecated "Dependencies" section

Show diff? [Y/n] y

[Visual diff shown...]

Apply changes? [Y/n/s] s  # Skip

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📄 STATUS.md

Changes in template:
  + Added "Documentation Health" subsection
  + Improved Quick Reference format

Show diff? [Y/n] y

[Visual diff shown...]

Apply changes? [Y/n/s] y  # Apply

✅ Updated STATUS.md

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ TEMPLATE UPDATE COMPLETE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Updated: 1 file (STATUS.md)
Skipped: 1 file (CONTEXT.md)
No changes: 2 files

Next: Review changes with /review-context
```

## Best Practices

### Review Diffs Carefully

Always review before applying - your custom content matters.

### Merge Manually for Complex Changes

If major differences:
```bash
# Skip auto-update
/update-templates  # Skip all

# Manual merge
diff context/STATUS.md templates/STATUS.template.md
# Manually add sections you want
```

### Backup First

```bash
# Create backup
cp -r context context-backup

# Update templates
/update-templates

# If issues:
cp -r context-backup/* context/
```

## Related Commands

- [/update-context-system](/commands/update-context-system) - Update system first
- [/validate-context](/commands/validate-context) - Verify after update
