# /validate-context

Check documentation health and completeness.

## Overview

Comprehensive health check for your context documentation:
- Verifies all core files exist
- Checks for missing sections
- Detects stale documentation
- Calculates health score (0-100)
- Provides actionable recommendations

**Run weekly** to maintain documentation quality.

## When to Use

**Use /validate-context:**
- Weekly maintenance checks
- Before major handoffs
- After team changes
- When documentation feels outdated
- Before /export-context

**Time:** 2 minutes

## What It Checks

### File Existence
✅ CONTEXT.md exists and non-empty
✅ STATUS.md exists and non-empty
✅ DECISIONS.md exists and non-empty
✅ SESSIONS.md exists and non-empty
✅ .context-config.json valid JSON

### Required Sections

**CONTEXT.md:**
- What & Why
- How (Architecture)
- Tech Stack
- Constraints

**STATUS.md:**
- Quick Reference (auto-generated)
- Current Phase
- Work In Progress
- Next Session

**DECISIONS.md:**
- At least 1 decision documented

**SESSIONS.md:**
- At least 1 session entry
- TL;DR sections present

### Staleness Detection

**Warnings if:**
- STATUS.md not updated in 7 days
- No SESSIONS.md entry in 14 days
- Work In Progress empty for active project

### Health Score Calculation

```
Health Score = (File Completeness × 40)
             + (Section Completeness × 30)
             + (Freshness × 20)
             + (Consistency × 10)
```

**Scores:**
- 90-100: 🟢 Excellent
- 70-89: 🟡 Good
- 50-69: 🟠 Needs Improvement
- 0-49: 🔴 Poor

## Example Output

```bash
$ /validate-context

🔍 Validating Context Documentation
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📁 FILE CHECKS

✅ context/CONTEXT.md - Complete (234 lines, updated 2 days ago)
✅ context/STATUS.md - Complete (145 lines, updated 1 hour ago)
✅ context/DECISIONS.md - Complete (15 decisions)
✅ context/SESSIONS.md - Complete (15 sessions, last updated 1 hour ago)
✅ context/.context-config.json - Valid JSON

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 SECTION CHECKS

CONTEXT.md:
  ✅ What & Why section present
  ✅ How (Architecture) section present
  ✅ Tech Stack documented
  ✅ Constraints documented

STATUS.md:
  ✅ Quick Reference auto-generated
  ✅ Current Phase defined
  ✅ Work In Progress documented
  ✅ Next Session priorities set

DECISIONS.md:
  ✅ 15 decisions documented
  ✅ All decisions have rationale
  ✅ All decisions have tradeoffs

SESSIONS.md:
  ✅ 15 sessions documented
  ✅ All sessions have TL;DR
  ✅ Recent sessions comprehensive

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 FRESHNESS CHECKS

✅ STATUS.md updated recently (1 hour ago)
✅ SESSIONS.md updated recently (1 hour ago)
✅ Active development detected

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 HEALTH SCORE: 95/100 🟢 Excellent

Breakdown:
  • File Completeness: 40/40 (all files present)
  • Section Completeness: 28/30 (minor gaps)
  • Freshness: 20/20 (recently updated)
  • Consistency: 7/10 (minor issues)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ RECOMMENDATIONS

Documentation is in excellent health!

Minor improvements:
  • Consider adding "When to Reconsider" to DEC-012
  • Add mental models section to Session 14

🎉 Ready for handoff or export!

```

## Issues and Fixes

### Missing Files

```
🔴 context/CONTEXT.md - MISSING

Fix:
  /init-context  # If new project
  # or
  Create from template: templates/CONTEXT.template.md
```

### Stale Documentation

```
🟡 STATUS.md last updated 12 days ago (stale)

Fix:
  /save  # Update current state
```

### Missing Sections

```
⚠️  CONTEXT.md missing "Constraints" section

Fix:
  Edit context/CONTEXT.md
  Add ## Constraints section
  Document project limitations
```

### Empty Work In Progress

```
🟠 STATUS.md Work In Progress section is empty

Fix:
  /save  # Document current WIP
  # Or if truly nothing in progress:
  Add "No active work (maintenance mode)" note
```

## Health Score Ranges

### 90-100: 🟢 Excellent
- All files present and complete
- Recently updated
- All required sections
- Ready for handoffs

**Action:** Maintain current practices

### 70-89: 🟡 Good
- Files present but some gaps
- Mostly up to date
- Minor missing sections

**Action:** Address specific issues, run /save or /save-full

### 50-69: 🟠 Needs Improvement
- Some files missing sections
- Not recently updated
- Significant gaps

**Action:**
```bash
/save-full  # Update comprehensively
# Fix missing sections
/validate-context  # Verify improvements
```

### 0-49: 🔴 Poor
- Missing files
- Very stale
- Many missing sections

**Action:**
```bash
/init-context  # May need to reinitialize
# Or comprehensive update:
/save-full
# Edit files to add missing sections
/validate-context
```

## Automated Checks

Validation runs these checks automatically:

### File System
- File exists
- Non-zero size
- Valid encoding
- Readable

### JSON Validation
```bash
# .context-config.json must be:
- Valid JSON
- Has required fields (version, project.name)
- Version matches installed system
```

### Content Validation
- Headers present (## sections)
- Minimum content length
- Required keywords present
- No TODO markers in production

### Timestamp Validation
- File modification time
- Relative to current date
- Staleness thresholds

## Best Practices

### Weekly Validation

```bash
# Every Monday
/validate-context

# If score <90:
# - Run /save or /save-full
# - Fix identified issues
# - Re-validate
```

### Pre-Handoff Validation

```bash
# Before any handoff
/validate-context

# Must be 🟢 Excellent (90+) for handoffs
# If not:
/save-full              # Comprehensive update
# Fix any identified issues
/validate-context       # Verify 90+
/export-context        # Ready to hand off
```

### CI/CD Integration

```bash
# In GitHub Actions or CI:
- name: Validate Context
  run: /validate-context

# Fail build if score <70
```

### Post-Update Verification

```bash
# After system updates
/update-context-system
/validate-context       # Verify still healthy
```

## Configuration

Customize thresholds in `.context-config.json`:

```json
{
  "validation": {
    "staleness_days": {
      "STATUS": 7,
      "SESSIONS": 14,
      "CONTEXT": 30
    },
    "min_health_score": 70,
    "require_all_sections": true
  }
}
```

## Related Commands

- [/save](/commands/save) - Fix staleness issues
- [/save-full](/commands/save-full) - Comprehensive updates
- [/export-context](/commands/export-context) - Validate before export

## See Also

- [Documentation Health](/guide/doc-health) - Maintaining quality
- [Best Practices](/guide/best-practices) - Documentation standards
