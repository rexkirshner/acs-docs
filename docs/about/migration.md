# Migration Guides

Upgrade paths and migration instructions for AI Context System.

## Current Version: v5.1.2

Latest patch release with nested repository detection and Claude Code settings conflict fix. 166 tests passing. [See changelog](/about/changelog) for details.

## Upgrade from Any Version

### Quick Upgrade (Recommended)

```bash
/update-context-system
```

**What this does:**
- Downloads latest commands from GitHub (with retry logic)
- Updates scripts with new features
- Preserves your context files (no data loss)
- Creates backup before changes (now includes VERSION and context/)
- Validates installation and auto-repairs issues
- Verifies script permissions

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

### v5.1.1 → v5.1.2

**Patch release:** Nested repository detection and Claude Code settings conflict fix.

::: tip Simple Upgrade
Just run `/update-context-system` - automatic migration handles everything.
:::

**What's Fixed:**

1. **Nested Repository Detection (Install-Time)**
   - Installer now warns when nested `.git/` directories detected
   - Warns when parent directory already has ACS installed
   - Warns when orphaned `context/` folder exists (no `.context-config.json`)

2. **Git Boundary Checking (Runtime)**
   - `find_context_folder()` now respects git boundaries
   - Stops searching at `.git/` directories to prevent context confusion
   - Clear error messages explain git boundary detection

3. **Claude Code Settings Conflict**
   - `.claude/settings.json` renamed to `.claude/acs-settings.json`
   - Fixes Claude Code showing "Settings Error" for invalid schema
   - Migration automatically removes old file if it has ACS schema

**Testing:**
- 19 new tests for nested repo detection
- 166 total tests passing

**Action required:** Run `/update-context-system`. If you see Claude Code "Settings Error" after upgrade, restart Claude Code.

---

### v4.2.1 → v5.0.x

**Major release:** Agent-based code review architecture with self-declaring contracts.

::: tip Simple Upgrade
Just run `/update-context-system` - automatic migration handles everything.
:::

**Key Changes:**

| Aspect | v4.2.1 (Before) | v5.0.0 (After) |
|--------|-----------------|----------------|
| Code review commands | Standalone skills | Agent-backed with contracts |
| Agent contracts | None | JSON Schema-validated |
| Session hooks | Manual review | Automatic health checks |
| Template sections | Standard | +Invariants, +Open Loops |
| User feedback | Overwritten on upgrade | Archived automatically |
| JSON schemas | None | 8 schemas in `.claude/schemas/` |
| Test coverage | 86+ tests | 80 tests |

**What's New:**

1. **Agent-Based Code Review Architecture**
   - 13 specialist agents (8 review domains + 5 support agents) with self-declaring contracts
   - Each agent declares: id, prefix, category, applicability, checklist, output schema
   - Commands now delegate to agents: `/code-review-security` → `security-reviewer.md`

2. **Self-Declaring Contracts**
   - Agents include JSON contract blocks
   - Contract validation via JSON Schema
   - Standardized output format

3. **Session-Start Hooks**
   - `.claude/hooks/session-start.sh` runs at conversation start
   - Automatic context health checks
   - Shows stale files, unfilled placeholders, version mismatches

4. **Template Improvements**
   - **Invariants & Non-goals section**: Prevents AI from "helpfully" undoing intentional choices
   - **Open Loops section**: Tracks unresolved questions across sessions

5. **Feedback Archiving**
   - User feedback in `context/context-feedback.md` preserved during upgrades
   - Archived to `context/context-feedback-archive-YYYY-MM-DD.md`
   - Zero data loss on upgrade

6. **Profile Settings**
   - Three detail levels: minimal, standard, comprehensive
   - Configurable in `.context-config.json`
   - Controls verbosity of saves and reviews

7. **JSON Schemas**
   - 8 schemas in `.claude/schemas/`
   - `agent-contract.json`, `audit-finding.json`, `context-config.json`, etc.
   - Enables structured data validation

**Automatic updates:**
- All 8 specialist agents installed to `.claude/agents/`
- Session-start hook created
- JSON schemas added
- Templates updated with new sections
- Feedback archived (not overwritten)

**Action required:** Run `/update-context-system` and optionally configure profile in `.context-config.json`.

---

### v4.2.0 → v4.2.1

**Patch release:** UX polish for update process.

::: tip Simple Upgrade
Just run `/update-context-system` - no breaking changes.
:::

**What's Fixed:**
- **Update notice during update** - No more confusing "Run /update-context-system" message while already running the update
- **Removed outdated docs** - Cleaned up 803-line update-guide.md that showed v3.3.0 content

**Code Quality Improvements:**
- Updated installer fallback version from 3.0.0 to 4.0.0
- Removed hardcoded project names from update command
- Test runner now reads version dynamically from VERSION file
- Fixed "CCS" → "ACS" terminology in feedback template

**Testing:**
- 8 new tests for v4.2.1 UX polish
- 86+ total tests passing

---

### v4.1.1 → v4.2.0

**Minor release:** Bug fixes and UX improvements based on user feedback.

::: tip Simple Upgrade
Just run `/update-context-system` - no breaking changes.
:::

**What's Fixed:**
- **Bash operator precedence** - Fixed context directory detection in `/save-full` (changed from && || chain to if-elif-else)
- **Session regex** - Fixed session number extraction to ignore template text (now requires `## Session N |` format)
- **Date warning** - Changed misleading date mismatch warning in `/review-context` to informational note (CONTEXT.md vs STATUS.md dates differ by design)

**What's New:**
- **Already-initialized detection** - `/init-context` and `/migrate-context` warn if ACS already installed
- **CLAUDE.md detection** - Shows integration guidance when existing CLAUDE.md found (size-aware messaging)

**Testing:**
- 20 new tests for v4.2.0 bug fixes
- 128 total tests passing (78 unit + 30 upgrade + 20 v4.2.0)

---

### v4.1.0 → v4.1.1

**Patch release:** Context completeness detection and project auto-detection.

::: tip Simple Upgrade
Just run `/update-context-system` - no breaking changes.
:::

**What's New:**
- **Context completeness detection** - Warns when CONTEXT.md has unfilled placeholders
- **Project auto-detection** - Automatically gathers project name, tech stack, type from codebase
- **`/save` warning** - Step 7 warns when CONTEXT.md has 5+ unfilled `[FILL:...]` placeholders
- **`/save-full` template detection** - Step 8 shows auto-detected project info when template-only detected
- **`/init-context` validation** - Step 8 ensures AI fills in template placeholders

---

### v4.0.2 → v4.1.0

**Minor release:** Documentation health checking and shell robustness.

::: tip Simple Upgrade
Just run `/update-context-system` - no breaking changes.
:::

**What's New:**
- **Documentation health check** - New `check_documentation_health()` function
- **`get_repo_root()` function** - Reliable repository root detection
- **`color_echo()` function** - Portable color output
- **Post-upgrade commit guidance** - Step 7 in `/update-context-system` suggests commit

---

### v4.0.1 → v4.0.2

**Patch release:** Graceful handling of partial context setups.

::: tip Simple Upgrade
Just run `/update-context-system` - no breaking changes.
:::

**What's Fixed:**
- File existence detection in `/save-full`, `/save`, and `/review-context`
- Commands now gracefully skip steps for missing files instead of failing
- Better error handling for projects with partial context installations

**What's New:**
- Dynamic final reports showing exactly what was updated vs. skipped
- Test suite for file detection (`scripts/tests/test-file-detection.sh`)

---

### v4.0.0 → v4.0.1

**Patch release:** Bug fixes from first user feedback.

::: tip Simple Upgrade
Just run `/update-context-system` - no breaking changes.
:::

**What's Fixed:**
- ORGANIZATION.md download URL in installer
- Session number detection (handles gaps from archiving)
- Consistency check validation in `/review-context`

**What's Improved:**
- Manual fallbacks added to all audit commands
- Framework-specific patterns (Svelte, Vue) in security/performance audits
- Better guidance for non-React frameworks

---

### v3.6.x → v4.0.0

**Major release:** Code review system completely transformed.

::: warning Breaking Changes
This is a major release with breaking changes to the code review system.
:::

**Key Changes:**

| Aspect | v3.6.x (Before) | v4.0.0 (After) |
|--------|-----------------|----------------|
| Code review | Single monolithic command | 8 specialized + orchestrator |
| Reports location | `artifacts/code-reviews/` | `docs/audits/` |
| Report naming | `session-N-review.md` | `{type}-audit-NN.md` |
| Checklists | `.claude/checklists/` | Built into audit commands |

**Migration is automatic:**

```bash
/update-context-system
```

**What happens:**
1. Downloads 9 new audit commands
2. Creates `docs/audits/` directory
3. Moves existing `artifacts/code-reviews/*.md` to `docs/audits/archive/`
4. Creates `docs/audits/INDEX.md` for audit tracking
5. Updates `/code-review` to orchestrator pattern

**New Commands (22 total):**

| Command | Purpose |
|---------|---------|
| `/code-review` | Master orchestrator (select audits) |
| `/code-review-security` | OWASP Top 10 audit |
| `/code-review-performance` | Core Web Vitals audit |
| `/code-review-accessibility` | WCAG 2.1 AA audit |
| `/code-review-seo` | Technical SEO audit |
| `/code-review-database` | N+1, indexes, pooling |
| `/code-review-infrastructure` | Serverless costs audit |
| `/code-review-typescript` | Type safety audit |
| `/code-review-testing` | Test coverage audit |
| `/build-check` | Pre-push build gate |

**New Feature: Custom Audits**

Create project-specific audits:

```json
// context/.context-config.json
{
  "audits": {
    "custom": [
      {
        "name": "api",
        "description": "REST API design audit",
        "weight": 1.2,
        "presets": ["backend", "all"]
      }
    ]
  }
}
```

**Workflow Changes:**

```bash
# Old way (v3.6.x)
/code-review  # Single long review

# New way (v4.0.0)
/code-review                    # Interactive menu
/code-review --security         # Single audit
/code-review --prelaunch        # Preset combination
/code-review --all              # Comprehensive
```

**Action required:** Run `/update-context-system` and explore the new modular system.

---

### v3.5.x → v3.6.0

**One breaking change:** CLAUDE.md location moved. Migration is automatic.

**Key change: CLAUDE.md Auto-Loading**

| Before (v3.5.x) | After (v3.6.0) |
|-----------------|----------------|
| `context/claude.md` | `./CLAUDE.md` (project root) |
| Not auto-loaded | Auto-loaded by Claude Code |

**Why:** Claude Code automatically loads `CLAUDE.md` from project root at every conversation start. The old location in `context/` was never auto-loaded, requiring manual file reads.

**Migration scenarios:**

1. **You have `context/claude.md`:**
   - `/update-context-system` will detect and offer to move it
   - Your customizations are preserved

2. **You already have `./CLAUDE.md`:**
   - No action needed
   - System detects correct location

3. **You have both files:**
   - Warning shown to merge and delete old file
   - `/validate-context` will remind you

4. **You have neither:**
   - Fresh file created from enhanced template

**New features in v3.6.0:**
- **Enhanced CLAUDE.md template** with Project Identity, Critical Rules, Working Style sections
- **TROUBLESHOOTING.md** documentation for common issues
- **Preflight checks** validate environment before commands run
- **Dependency checks** verify curl, git, jq with install hints
- **Standardized exit codes** across all scripts

**Automatic updates:**
- `/init-context` creates CLAUDE.md at root
- `/update-context-system` handles migration automatically
- `/validate-context` warns about old location
- New documentation files added to `.claude/docs/`

**Action required:** Run `/update-context-system` and follow prompts.

---

### v3.x → v3.5.0

**No breaking changes.** Direct upgrade via `/update-context-system`.

::: warning Note
v3.5.0 placed CLAUDE.md in `context/claude.md`. This was changed in v3.6.0 to `./CLAUDE.md` at project root for auto-loading. If upgrading from v3.5.0, see the v3.6.0 migration section above.
:::

**New features in v3.5.0:**
- **Automatic Session Archiving:** `/save-full` prompts when SESSIONS.md exceeds 2000 lines
- **Smart Loading:** File size-based loading strategy prevents token crashes
- **Cross-Document Consistency:** Automatic drift detection across context files
- **Auto-Report Generation:** Code review reports saved automatically to artifacts/

**Critical bug fixes:**
- Fixed version detection in zsh shells
- Fixed zsh/bash version command compatibility
- Fixed token limit crashes with large SESSIONS.md files
- Fixed subdirectory context detection (searches up to 3 parent directories)
- Fixed session count accuracy
- Fixed upgrade path testing

**Test coverage:**
- 101/101 tests passing (78 unit, 12 integration, 11 manual)
- Comprehensive quality gates for deployment readiness

**Automatic updates:**
- New archiving helper script (scripts/archive-sessions-helper.sh)
- Enhanced /save-full with archiving prompt
- Enhanced /review-context with smart loading and consistency checks
- Enhanced /code-review with auto-report generation
- Test suite added for validation

**Action required:** None (automatic upgrade). All features work out-of-the-box.

### v3.x → v3.4.0

**No breaking changes.** Direct upgrade via `/update-context-system`.

**New features in v3.4.0:**
- **Smart Issue Grouping:** 25 identical errors → 1 grouped task
- **Auto-TodoWrite Generation:** 40+ findings → 7-10 actionable tasks (30 min → 30 sec)
- **KNOWN_ISSUES.md Integration:** Critical issues persist across sessions
- **STATUS.md Auto-Update:** Review summary visible in project status
- **Review History Tracking:** All reviews tracked in artifacts/code-reviews/INDEX.md
- **Automatic Comparison:** Auto-detects and compares with previous reviews

**New dependency:**
- **jq required:** Install via `brew install jq` (macOS) or `apt-get install jq` (Linux)

**Automatic updates:**
- New scripts/code-review-helpers.sh installed
- /code-review command updated with Step 8: Integration & Actionability
- Test suite added for validation

**Action required:** Install `jq` if not already present. All other updates apply automatically.

### v3.x → v3.3.1

**No breaking changes.** Direct upgrade via `/update-context-system`.

**New features in v3.3.1:**
- **Installer Reliability:** Download retry logic, portable version sync, post-installation validation
- **Command Fixes:** /save and /save-full bash parsing issues resolved
- **Better Backup:** VERSION file and context/ directory now included in backup/rollback
- **Auto-Repair:** Installation validates and fixes issues automatically

**Action required:** None (automatic upgrade). All fixes apply automatically.

### v3.x → v3.3.0

**No breaking changes.** Direct upgrade via `/update-context-system`.

**New features in v3.3.0:**
- **Template Markers:** HTML comments protect critical sections (prevents 80-90% of deletion errors)
- **Deletion Protection:** Interactive confirmation before file deletion
- **Staleness Detection:** Automatic warnings when documentation becomes stale
- **Decision Guidance:** Proactive prompts for DECISIONS.md documentation
- **Upgrade Documentation:** "What's New" display after upgrade

**Automatic updates:**
- Helper functions added to common-functions.sh
- Staleness detection active in /save-full and /review-context
- Deletion protection integrated
- Decision guidance in claude.md template

**Optional (recommended):**
```bash
/update-templates  # Add template markers to your context files
```

**Action required:** None (automatic upgrade). Optionally run `/update-templates` to get template markers.

### v3.x → v3.2.2

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

### v5.1.2 (Current)
- ✅ No breaking changes (patch release)
- ✅ Nested repo detection: Installer warns about nested git repositories
- ✅ Git boundary checking: `find_context_folder()` respects git boundaries at runtime
- ✅ Claude Code conflict fix: Renamed `settings.json` to `acs-settings.json`
- ✅ 166 tests passing
- ✅ Simple upgrade: `/update-context-system`

### v5.1.1
- ✅ No breaking changes (patch release)
- ✅ macOS grep compatibility: Fixed BRE patterns that failed on BSD grep
- ✅ Parent directory detection: Now checks ancestors only, not siblings
- ✅ zsh debug output: Fixed spurious variable output in loops
- ✅ 80 tests passing
- ✅ Simple upgrade: `/update-context-system`

### v5.1.0
- ⚠️ Code review now considers DECISIONS.md (decision-aware review)
- ✅ Finding deduplication: Synthesis agent combines overlapping findings
- ✅ New: cost-optimizer agent (13 total agents now)
- ✅ New: codebase-context.json schema (8 total schemas now)
- ✅ Upgrade protection: Idempotent upgrades with automatic backup/rollback
- ✅ Monorepo support: Multi-project configurations
- ✅ Hook security: Enhanced permission model
- ✅ 80 tests passing
- ✅ Shell compatibility: bash, zsh, and sh across macOS and Linux

### v5.0.x
- ⚠️ Code review commands now delegate to specialist agents
- ⚠️ Session-start hook added (may run automatically)
- ⚠️ New template sections (Invariants, Open Loops) in fresh installs
- ✅ Migration automatic: `/update-context-system` handles everything
- ✅ No data loss: Existing context files unchanged
- ✅ Feedback preserved: Archived during upgrade
- ✅ 80 tests passing
- ✅ New features: 13 agents, contracts, hooks, schemas, profiles
- ✅ Shell compatibility: bash, zsh, and sh across macOS and Linux

### v4.2.1
- ✅ No breaking changes (patch release)
- ✅ UX polish for update process
- ✅ 86+ tests passing
- ✅ Simple upgrade: `/update-context-system`

### v4.2.0
- ✅ No breaking changes (minor release)
- ✅ Bug fixes and UX improvements
- ✅ Simple upgrade: `/update-context-system`

### v4.1.1
- ✅ No breaking changes (patch release)
- ✅ Context completeness detection
- ✅ Simple upgrade: `/update-context-system`

### v4.1.0
- ✅ No breaking changes (minor release)
- ✅ Documentation health checking
- ✅ Simple upgrade: `/update-context-system`

### v4.0.2
- ✅ No breaking changes (patch release)
- ✅ Graceful file existence detection
- ✅ Simple upgrade: `/update-context-system`

### v4.0.1
- ✅ No breaking changes (patch release)
- ✅ Bug fixes and framework improvements
- ✅ Simple upgrade: `/update-context-system`

### v4.0.0
- ⚠️ Major breaking change: `/code-review` is now an orchestrator (runs specialized audits)
- ⚠️ Report location changed: `artifacts/code-reviews/` → `docs/audits/`
- ⚠️ Report naming changed: `session-N-review.md` → `{type}-audit-NN.md`
- ⚠️ `.claude/checklists/` removed (built into audit commands)
- ✅ Migration automatic: `/update-context-system` handles everything
- ✅ No new dependencies
- ✅ New features: 8 modular audits, custom audit extensibility, /build-check

### v3.6.0
- ⚠️ Minor breaking change: CLAUDE.md location moved from `context/claude.md` to `./CLAUDE.md` (project root)
- ✅ Backward compatible with all v3.x versions (migration is simple `git mv`)
- ✅ No new dependencies
- ✅ New feature: CLAUDE.md auto-loading by Claude Code
- ✅ Bug fixes: Config template version, template filename, production TODO removed

### v3.5.0
- ✅ No breaking changes
- ✅ Backward compatible with all v3.x versions
- ✅ No new dependencies
- ✅ New features: Automatic archiving, smart loading, consistency checks, auto-report generation
- ✅ Critical bug fixes: Version detection, token crashes, subdirectory support

### v3.4.0
- ✅ No breaking changes
- ✅ Backward compatible with all v3.x versions
- ✅ New dependency: jq (for JSON processing)
- ✅ New features: Code review actionability, smart grouping, auto-TodoWrite generation

### v3.3.1
- ✅ No breaking changes
- ✅ Backward compatible with all v3.x versions
- ✅ New features: Installer improvements, command fixes, enhanced backup

### v3.3.0
- ✅ No breaking changes
- ✅ Backward compatible with all v3.x versions
- ✅ New features: Template markers, deletion protection, staleness detection

### v3.2.2
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
Commands: v5.0.0
Context: v4.0.0
```

**Solution:**
```bash
# Update context version
# Edit context/.context-config.json:
{
  "version": "5.1.2"  # Update this
}

# Then:
/save
```

## Deprecation Timeline

### Removed in v4.0.0

**`/save-context`** (deprecated v2.1.0, removed v4.0.0)
- Use `/save` or `/save-full` instead

**`.claude/checklists/`** (removed v4.0.0)
- Checklists now built into modular audit commands
- `/code-review-security`, `/code-review-accessibility`, etc.

**`artifacts/code-reviews/`** (moved v4.0.0)
- Reports now in `docs/audits/`
- Existing reports migrated automatically

### Future Deprecations

No deprecations currently planned for v5.x series.

**Note on v5.0.0 changes:**
- Code review commands still work the same way, but now delegate to agents
- No commands removed - all v4.x commands remain available
- Agents are additive (new capability, not replacement)

## FAQ

### Do I need to migrate my context files?

**No.** Context files (CONTEXT.md, STATUS.md, DECISIONS.md, SESSIONS.md) are stable across versions. Only commands and scripts get updated.

### Will I lose my session history?

**No.** SESSIONS.md is preserved during upgrades. Backups are created before changes.

### Can I skip versions?

**Yes.** You can upgrade directly from any version to latest:
```bash
v2.0.0 → v5.1.2  # Works
v3.5.0 → v5.1.2  # Works
v4.0.0 → v5.1.2  # Works
v4.2.1 → v5.1.2  # Works
v5.0.x → v5.1.2  # Works
v5.1.0 → v5.1.2  # Works
v5.1.1 → v5.1.2  # Works
```

### How do I know if upgrade succeeded?

```bash
# Check version
cat VERSION
# Should show: 5.1.2

# Test command
/review-context
# Should work without errors

# Check for backup (upgrade creates one)
ls -la .claude-backup-*
# If exists, upgrade ran

# Check new agents exist (v5.0.0+)
ls .claude/agents/
# Should show 13 specialist agents

# Check new schemas exist (v5.0.0+)
ls .claude/schemas/
# Should show 8 JSON schemas

# Check settings file renamed (v5.1.2+)
ls .claude/acs-settings.json
# Should exist (not settings.json)
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
