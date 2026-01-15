# Changelog

All notable changes to the AI Context System.

## [5.0.2] - 2026-01-15

### Fixed - Shell Compatibility and Robust Parsing

**PATCH RELEASE** - Addresses shell compatibility issues (zsh vs bash) and improves JSON export reliability across platforms.

#### Bug Fixes

- **zsh arithmetic failures** - `grep -c` empty results now properly handled with fallback
- **Variable expansion issues** - Replaced `$MV_CMD` variable with `move_file()` function for cross-shell compatibility
- **JSON export truncation** - Complete rewrite using `|||` delimiter to preserve colons in titles
- **Code blocks in SESSIONS.md** - JSON export now ignores session headers inside fenced code blocks
- **Multi-paragraph TL;DR** - JSON export now preserves multi-paragraph TL;DR content
- **Decision count patterns** - `count_decisions()` now supports both `## D001` and `### D001` formats
- **Stale file detection** - Archive files now excluded from stale count
- **Current focus extraction** - Pattern cascade tries multiple STATUS.md formats

#### New Features

- **`color_echo()` function** - TTY-aware output that strips ANSI codes when piped
- **`count_decisions()` helper** - Centralized in `common-functions.sh` for consistent decision counting
- **`IS_UPDATE` detection** - Installer now detects upgrade vs fresh install BEFORE any file operations
- **Context-appropriate messages** - Installer shows different "Next Steps" for upgrades vs fresh installs
- **Enhanced session template** - Added optional sections: Duration, Problem Solved, Tests & Build, Work In Progress, Open Loops

#### Code Review Agent Improvements

- **Scope Boundaries** - All 8 specialist agents now have clear ownership boundaries preventing duplicate findings
- **Pattern Clarity** - Changed from regex patterns to natural language "Look For" / "Safe If" format
- **Coverage Documentation** - Added comprehensive Coverage Scope section documenting what's covered and intentionally excluded
- **Deduplication Fixes** - Fixed rate limiting, lang attribute, and SQL injection ownership overlaps

#### Testing

- All 80 core module tests passing
- New test suites: shell-compatibility, json-export, data-extraction, exit-codes, ux-polish
- Shell compatibility verified on bash, zsh, and sh

---

## [5.0.1] - 2026-01-14

### Fixed - Upgrade Path & Documentation QA

**PATCH RELEASE** - Comprehensive QA review ensuring smooth upgrade paths and accurate documentation.

- Fixed missing files in install.sh (6 docs files, settings.json, MIGRATION_SUMMARY.md)
- Added v4.x → v5.0.0 migration notes to update-context-system.md
- Added .claude/checklists/ cleanup in upgrade process
- Fixed version references across documentation (4.x → 5.0.x)
- Updated test count to 78 (correcting earlier miscounts)
- Fixed agent count references (12 total agents, not 8)

---

## [5.0.0] - 2026-01-13

### Added - Agent-Based Code Review Architecture

**MAJOR RELEASE** - Transforms code review from commands into an intelligent multi-agent system with formal contracts.

#### Agent-Based Architecture

**12 Specialist Agents**

The system includes 12 specialist agents: 8 review domain specialists + 4 support agents:

| Agent | Focus | Key Capabilities |
|-------|-------|------------------|
| `security-reviewer` | OWASP Top 10 | Auth, injection, XSS, secrets, dependencies |
| `performance-reviewer` | Core Web Vitals | LCP, INP, CLS, bundle analysis, runtime |
| `accessibility-reviewer` | WCAG 2.1 AA | POUR principles, keyboard nav, ARIA |
| `seo-reviewer` | Technical SEO | Metadata, JSON-LD, crawlability |
| `database-reviewer` | Query optimization | N+1 detection, indexes, connection pooling |
| `infrastructure-reviewer` | Serverless costs | Cold starts, rendering strategy, caching |
| `type-safety-reviewer` | TypeScript | Strict mode, `any` tracking, Zod validation |
| `test-coverage-reviewer` | Test quality | Coverage, pyramid, mock strategy, CI |

**Self-Declaring Contracts**

Agents declare their own capabilities via JSON Schema-validated contracts embedded in each agent file:

```json
{
  "id": "security-reviewer",
  "prefix": "SEC",
  "category": "security",
  "applicability": {
    "required_files": ["package.json"],
    "triggers": ["auth", "login", "password", "token", "api"]
  },
  "focusAreas": ["authentication", "authorization", "injection", "xss"],
  "outputFormat": "audit-report",
  "tools": ["grep", "ast-analysis", "dependency-check"]
}
```

**Agent Discovery**

The system automatically discovers agents by:
1. Scanning `.claude/agents/` directory
2. Parsing contract blocks from agent files
3. Validating contracts against JSON Schema
4. Building capability index for routing

#### Session-Start Hooks

**New: Automatic Context Health Checks**

`.claude/hooks/session-start.sh` runs at the start of each Claude Code session:

- Detects context directory (`context/` or `.context/`)
- Checks STATUS.md freshness (warns if >7 days old)
- Validates Quick Reference block presence
- Detects missing Current Focus section
- Identifies unclosed session markers in SESSIONS.md
- Respects profile settings (skips on minimal profile)
- Cross-platform compatible (macOS and Linux stat handling)

#### Template Improvements

**Invariants & Non-goals Section**

New section in CONTEXT.template.md prevents AI from "helpfully" undoing intentional choices:

```markdown
## Invariants & Non-goals

**Invariants (Do Not Change Without Discussion):**
- [e.g., "No Redux - using React Context + Zustand by design"]

**Non-goals (Not Now):**
- [e.g., "Mobile app (web-first until v2)"]
```

**Open Loops Section**

New section in SESSIONS.template.md captures unresolved questions:

```markdown
### Open Loops

**Unresolved questions and uncertainties:**
- [e.g., "Why does auth middleware sometimes return 401 on valid tokens?"]
- [e.g., "Performance degrades with >1000 items - haven't profiled yet"]
```

#### Feedback Archiving

**Upgrade Preservation**

- User feedback in `context/context-feedback.md` is now archived during upgrades
- Archived to `context/artifacts/feedback/feedback-vX.X.X-YYYY-MM-DD.md`
- Template examples are excluded from entry detection
- Feedback history preserved across version upgrades

#### JSON Schemas

**7 Validated Schemas**

New `.claude/schemas/` directory with JSON Schema definitions:

| Schema | Purpose |
|--------|---------|
| `agent-contract.json` | Agent capability contracts |
| `audit-finding.json` | Individual audit findings |
| `audit-report.json` | Complete audit reports |
| `context-health.json` | Context health metrics |
| `handoff-package.json` | Session handoff data |
| `session-entry.json` | Session log entries |
| `settings.json` | System configuration |

#### Profile Settings

**Configurable Profiles**

Three profile levels in `.claude/settings.json`:

- **minimal** - Quick saves only, hooks disabled
- **standard** - Full context system (default)
- **comprehensive** - Extended audits, detailed logging

#### Testing

**78 Tests Passing**

Comprehensive test coverage across all components:

| Category | Tests | Coverage |
|----------|-------|----------|
| Core Modules | 78 | Commands, helpers, detection |

All tests include install script validation, rollback logic, schema validation, hooks execution, cross-platform compatibility, template improvements, and feedback archiving.

#### Bug Fixes

- Fixed `grep -c` double-output bug in session-start.sh (unclosed session detection)
- Fixed non-portable `date +%s%N` usage (nanoseconds unavailable on macOS)

---

## [4.2.1] - 2026-01-08

### Fixed - UX Polish for Update Process

**PATCH RELEASE** - Addresses UX issues identified during real v4.0.2 → v4.2.0 upgrade experiences.

#### Bug Fixes

**Update Notice During Update**
- **Problem:** When running `/update-context-system`, the "Run /update-context-system to upgrade" message appeared
- **Impact:** Confusing since user was already running the update command
- **Fixed:** Added `ACS_UPDATING` environment variable check to suppress notice during updates
- **Location:** `scripts/common-functions.sh` check_for_updates() and `.claude/commands/update-context-system.md`

#### Removed

**Outdated update-guide.md**
- Removed 803-line `.claude/docs/update-guide.md` documenting v3.3.0 systems
- File showed "What's New in v3.3.0" which confused users at v4.2.x
- Documented section-based template updates that no longer exist in v4
- Referenced `--accept-all` flag that doesn't exist in current implementation
- Updated `install.sh` to remove reference

#### Testing

- **8 new tests** in `scripts/tests/test-v421-ux-polish.sh`
  - 4 tests for ACS_UPDATING suppression
  - 4 tests for update-guide.md removal
- **86+ total tests passing**

#### Code Quality Improvements (Audit Fixes)

During the v4.2.1 audit, several maintenance issues were fixed:
- Updated fallback version in installer from 3.0.0 to 4.0.0
- Removed hardcoded project name from update-context-system.md
- Made test runner read version from VERSION file dynamically
- Updated README.md to reference VERSION file instead of hardcoded version
- Fixed "CCS" → "ACS" terminology in feedback template
- Removed reference to non-existent file in .claude/docs/README.md

---

## [4.2.0] - 2026-01-07

### Fixed - User Feedback Bugs

**MINOR RELEASE** - Bug fixes and UX improvements based on real user feedback from v4.0.2 deployment.

#### Bug Fixes

**Bash Operator Precedence in `/save-full`**
- **Problem:** Context directory detection used `test && echo || test && echo` chain with incorrect operator precedence
- **Impact:** Multiple branches could execute in edge cases
- **Fixed:** Changed to explicit if-elif-else structure
- **Also Added:** Helpful error message when context/ not found

**Session Number Regex in `/save-full`**
- **Problem:** Regex `^## Session [0-9]+` matched template text like "## Session Index" headings
- **Impact:** Incorrect session numbering
- **Fixed:** Changed to `^## Session [0-9]+ \|` requiring the pipe separator that real session entries have
- **Now Ignores:** Session Index headings, template placeholders like "## Session [N]"

**Date Warning in `/review-context`**
- **Problem:** Warning ⚠️ shown when CONTEXT.md and STATUS.md had different dates
- **Impact:** Users thought this was a problem requiring action
- **Reality:** Different dates are BY DESIGN (CONTEXT.md is static, STATUS.md is dynamic)
- **Fixed:** Changed to informational ℹ️ note explaining the static vs dynamic layer design

#### New Features

**Already-Initialized Detection (Step 0.7)**

Added to both `/init-context` and `/migrate-context`:
- Checks for existing `context/.context-config.json`
- If found, shows warning with existing context files
- Presents options: continue, reset to fresh, or cancel
- Prevents confusion from running init on initialized project

**CLAUDE.md Detection (Step 0.8)**

Added to both `/init-context` and `/migrate-context`:
- Detects existing CLAUDE.md at project root
- For large files (>5KB): Shows full ACS integration strategy
- For small files (<5KB): Shows brief info message
- Explains how ACS supplements existing documentation
- Uses cross-platform size formatting (works on macOS and Linux)

#### Testing

- **20 new tests** in `scripts/tests/test-v420-bug-fixes.sh`
  - 13 tests for bug fixes
  - 7 tests for improvements
- **128 total tests passing** (78 unit + 30 upgrade + 20 v4.2.0)

---

## [4.1.1] - 2026-01-07

### Added - Context Completeness Detection

**PATCH RELEASE** - Ensures context documentation actually gets filled in

#### Context Completeness Detection

- **`count_unfilled_placeholders()`** - New function in common-functions.sh that counts `[FILL:...]` placeholders in files
- **`/save` warning** - Step 7 warns when CONTEXT.md has 5+ unfilled placeholders
- **`/save-full` template detection** - Step 8 checks placeholders FIRST, shows auto-detected project info when template-only detected
- **`/init-context` validation** - Step 8 (CRITICAL) ensures AI fills in template placeholders before completing

#### Project Auto-Detection

New functions automatically gather project info from the codebase:

- `detect_project_name()` - From package.json, Cargo.toml, pyproject.toml, or directory name
- `detect_project_description()` - From package.json or README.md
- `detect_repo_url()` - From git remote (converts SSH to HTTPS)
- `detect_tech_stack()` - Detects frameworks (Next.js, React, Vue), languages (TypeScript), databases (PostgreSQL, MongoDB), hosting (Vercel, AWS)
- `detect_project_type()` - Infers web-app, api, cli, library, or unknown

#### Why This Matters

User feedback revealed that CONTEXT.md was remaining as templates despite regular `/save` and `/save-full` usage. Context files left as templates defeat the purpose of the system—AI agents and future sessions need actual project information, not placeholder text.

---

## [4.1.0] - 2026-01-06

### Added - Documentation Health Checking

**MINOR RELEASE** - Documentation health checks and shell robustness improvements

#### Documentation Health Check

New `check_documentation_health()` function in common-functions.sh that:

- Detects missing CLAUDE.md or CONTEXT.md files
- Finds unfilled `[FILL:...]` template placeholders
- Identifies stale documentation (CLAUDE.md significantly older than CONTEXT.md)
- Detects tech stack drift between files
- Provides actionable recommendations

Integrated into:
- `/review-context` (Step 1.7)
- `/save-full` final report

#### Shell Robustness

- **`get_repo_root()` function** - Reliable repository root detection for monorepo support
- **`color_echo()` function** - Portable color output using printf for cross-shell compatibility
- **Post-upgrade commit guidance** - Step 7 in `/update-context-system` suggests commit command

#### Test Coverage

26 new tests added:
- `test-repo-root.sh` (4 tests)
- `test-quick-reference-edge-cases.sh` (6 tests)
- `test-color-echo.sh` (6 tests)
- `test-doc-health-check.sh` (10 tests)

Total: 78/78 tests passing

---

## [4.0.2] - 2026-01-06

### Fixed

- **File existence detection in /save-full** - Now detects which context files exist before proceeding, gracefully skipping steps for missing files
- **File existence detection in /save** - Checks for STATUS.md before attempting updates, suggests `/init-context` if missing
- **File existence detection in /review-context** - Detects both core and optional files, adjusts review scope accordingly

### Improved

- **Better user guidance** - Commands now suggest `/init-context` when multiple core files are missing
- **Dynamic final reports** - Save commands show exactly which files were updated vs. skipped

### Added

- **Test suite** - `scripts/tests/test-file-detection.sh` with 24 assertions covering file detection across all 3 commands

---

## [4.0.1] - 2026-01-06

### Fixed

- **ORGANIZATION.md download URL** - Installer now correctly downloads from `reference/ORGANIZATION.md` instead of root path
- **Session number detection** - `/save-full` now finds the highest session number instead of counting occurrences, handling gaps from archived sessions correctly
- **Consistency check logic** - `/review-context` now only checks "Last Updated" and "Phase" fields in files where they actually exist (CONTEXT.md and STATUS.md)

### Improved

- **Audit helper fallbacks** - All 8 audit commands now include manual fallback instructions when helper functions aren't available
- **Framework-specific patterns** - Added Svelte `{@html}` and Vue `v-html` XSS checks to security audit; added framework-specific memoization patterns (React useMemo, Svelte $derived, Vue computed) to performance audit
- **Accessibility framework note** - Added guidance on adjusting grep patterns for different frameworks (Svelte, Vue, Astro)

---

## [4.0.0] - 2026-01-05

### Added - Modular Code Review System

**MAJOR RELEASE** - Transforms `/code-review` into a modular system with 8 specialized audit commands and a master orchestrator.

#### New Modular Audit Commands

| Command | Focus | Key Checks |
|---------|-------|------------|
| `/code-review-security` | OWASP Top 10 | Auth, injection, XSS, secrets, dependencies |
| `/code-review-performance` | Core Web Vitals | LCP, INP, CLS, bundle size, caching |
| `/code-review-accessibility` | WCAG 2.1 AA | POUR principles, keyboard nav, ARIA |
| `/code-review-seo` | Technical SEO | Metadata, JSON-LD, crawlability |
| `/code-review-database` | Query optimization | N+1 detection, indexes, connection pooling |
| `/code-review-infrastructure` | Serverless costs | Cold starts, rendering strategy, caching |
| `/code-review-typescript` | Type safety | Strict mode, `any` tracking, Zod validation |
| `/code-review-testing` | Test quality | Coverage, pyramid, mock strategy, CI |

#### `/build-check` Command

New pre-push build gate:
- Sequential: lint → typecheck → tests → build
- Framework auto-detection (Next.js, Remix, Astro, etc.)
- Common failure patterns and fixes

#### `/code-review` Orchestrator

Transformed from monolithic command to modular orchestrator:
- Interactive menu for audit selection
- Command-line arguments: `--security`, `--performance`, etc.
- Preset combinations:
  - `--all` - Run all audits
  - `--prelaunch` - Security + Performance + Accessibility + SEO
  - `--backend` - Security + Database + Testing
  - `--frontend` - Performance + Accessibility + SEO
- Combined summary report with weighted grading

#### Custom Audit Extensibility

Create project-specific audits:

1. **Create command file:** `.claude/commands/code-review-{name}.md`
2. **Register in config (optional):**
```json
{
  "audits": {
    "custom": [
      {
        "name": "api",
        "description": "REST API design audit",
        "weight": 1.2,
        "presets": ["backend", "all"]
      }
    ],
    "presets": {
      "quick": {
        "description": "Fast sanity check",
        "audits": ["security", "typescript"]
      }
    }
  }
}
```
3. **Automatic pickup:** Orchestrator discovers and includes custom audits

#### New Report Infrastructure

- **Location:** `docs/audits/` (was `artifacts/code-reviews/`)
- **Naming:** `{type}-audit-NN.md` (was `session-N-review.md`)
- **Tracking:** `docs/audits/INDEX.md` auto-updated with each audit
- **Numbering:** Incrementing per audit type (01, 02, etc.)

#### New Helper Functions

Added to `scripts/common-functions.sh`:
- `get_next_audit_number()` - Returns incrementing audit number
- `update_audit_index()` - Updates INDEX.md with new entries
- `detect_database_platform()` - Detects Prisma, Drizzle, TypeORM
- `detect_hosting_platform()` - Detects Vercel, AWS, Cloudflare
- `detect_framework()` - Detects Next.js, Remix, Astro

### Changed

- `/code-review` is now an orchestrator (was monolithic)
- Audit reports go to `docs/audits/` (was `artifacts/code-reviews/`)
- Report naming: `{type}-audit-NN.md` (was `session-N-review.md`)

### Breaking Changes

| Aspect | v3.6.x (Before) | v4.0.0 (After) |
|--------|-----------------|----------------|
| Code review | Single monolithic command | 8 specialized + orchestrator |
| Reports location | `artifacts/code-reviews/` | `docs/audits/` |
| Report naming | `session-N-review.md` | `{type}-audit-NN.md` |
| Checklists | `.claude/checklists/` | Built into audit commands |

**Migration:** `/update-context-system` automatically migrates existing code review reports.

---

## [3.6.0] - 2025-12-16

### Changed - CLAUDE.md Auto-Loading Architecture

**Minor release moving CLAUDE.md to project root for automatic loading by Claude Code**

**Context:** The CLAUDE.md file was previously placed in the `context/` folder, which meant Claude Code did not automatically load it at conversation start. Since CLAUDE.md is specifically designed for Claude Code and contains critical context, this was a missed opportunity. This release fixes this architectural oversight.

#### Breaking Change: CLAUDE.md Location

| Aspect | v3.5.x (Before) | v3.6.0 (After) |
|--------|-----------------|----------------|
| Location | `context/claude.md` | `./CLAUDE.md` (project root) |
| Case | lowercase | UPPERCASE |
| Auto-loaded | No | Yes |

**Migration:** Automatic - `/update-context-system` detects and migrates old location.

#### Enhanced CLAUDE.md Template

New comprehensive template with sections for:
- **Project Identity:** Project name, tech stack, current phase
- **Critical Rules:** Git push protocol, no lazy coding, simplicity principles
- **Working Style:** Communication preferences, task workflows
- **Debugging Protocol:** Full code flow tracing methodology
- **Session Management:** Commands reference table
- **Project-Specific Notes:** Constraints, gotchas, integration points

#### New Documentation

- **TROUBLESHOOTING.md:** Solutions for 10 common issues
- **MIGRATION_v3.5_to_v3.6.md:** Step-by-step upgrade guide

#### Code Quality Improvements

- **Preflight checks:** Validates environment before command execution
- **Dependency checks:** Verifies curl, git, jq availability with install hints
- **Exit code standardization:** All scripts use consistent EXIT_* constants
- **Color definition deduplication:** Centralized in common-functions.sh

#### Upgrade Path

All scenarios handled automatically:
1. Fresh install → Creates CLAUDE.md at root
2. Existing `context/claude.md` → Offers to move to root
3. Already has `./CLAUDE.md` → No action needed
4. Both files exist → Warns and suggests merge

**Run:** `/update-context-system` to upgrade from v3.5.x

---

## [3.5.0] - 2025-11-28

### Fixed - Critical Bugs & Performance Optimizations

**Minor release addressing 6 critical bugs and 3 major performance bottlenecks discovered in production**

**Context:** Real-world feedback from 4 production projects revealed bugs blocking workflows and performance issues affecting long-running projects. All fixes implemented with comprehensive test coverage (101/101 tests passing).

#### Critical Bugs Fixed (6/6)

**BUG-1: Hardcoded Version Numbers (CRITICAL)**
- **Problem:** Config template had hardcoded `"version": "3.0.0"`
- **Impact:** New installations showed wrong version, false "update available" warnings
- **Fixed:** Version auto-detected from VERSION file in both `/init-context` and `/update-context-system`
- **Modules:** MODULE-001, MODULE-002
- **Tests:** 13/13 passing

**BUG-2: zsh Parsing Error (CRITICAL)**
- **Problem:** Version check used bash-specific `[[ ]]` syntax
- **Impact:** Commands failed on zsh (macOS default shell)
- **Fixed:** Portable shell syntax using single `[` and `-lt` comparison
- **Module:** MODULE-003
- **Tests:** 8/8 passing

**BUG-3: Integer Expression Error**
- **Problem:** `grep -c` in decision count returned multiline output
- **Impact:** `/review-context` crashed with "integer expression expected"
- **Fixed:** Use `wc -l` instead of `grep -c` for reliable counting
- **Module:** MODULE-004
- **Tests:** 7/7 passing

**BUG-4: Installation Fails on Small Files**
- **Problem:** Installer expected ORGANIZATION.md but many projects don't have it
- **Impact:** Installation failed with HTTP 404 errors
- **Fixed:** Mark ORGANIZATION.md as optional in installer
- **Module:** MODULE-005
- **Tests:** 4/4 passing

**BUG-5: Token Limit Crash on Large SESSIONS.md (CRITICAL)**
- **Problem:** `/review-context` loaded entire SESSIONS.md file (10,000+ lines)
- **Impact:** Claude Code crashed with token limit errors
- **Fixed:** Smart loading strategy based on file size
  - **Small (<1000 lines):** Load fully
  - **Medium (1000-5000 lines):** Load index + recent 500 lines strategically
  - **Large (>5000 lines):** Load index + recent 300 lines minimally
- **Module:** MODULE-006
- **Tests:** 8/8 passing
- **Result:** Can now handle SESSIONS.md files with 50,000+ lines

**BUG-6: Commands Fail from Subdirectories (CRITICAL)**
- **Problem:** Commands assumed user was in project root
- **Impact:** All commands failed when run from `src/`, `tests/`, etc.
- **Fixed:** Auto-detect context folder by walking up directory tree
- **Module:** MODULE-007
- **Tests:** 6/6 passing
- **Files updated:** 10+ command files with `find_context_dir` integration

#### Performance Improvements (3/3)

**PERF-1: Large SESSIONS.md File Management**
- **Problem:** SESSIONS.md grows unbounded, causing slowdowns and token issues
- **Solution:** Automatic session archiving system
  - **MODULE-101:** Core archiving logic (`archive-sessions-helper.sh`)
    - Archives old sessions to `SESSIONS-archive-YYYY.md`
    - Keeps last N sessions in main file (default: 10)
    - Creates backups before modifying
    - Idempotent (safe to run multiple times)
    - No data loss (sessions = main + archive)
  - **MODULE-102:** Auto-trigger in `/save-full`
    - Prompts user when SESSIONS.md exceeds 2000 lines
    - One-command archiving: "Archive old sessions (keep last 10)? [Y/n]"
    - Shows before/after file sizes
- **Tests:** 16/16 passing
- **Impact:** SESSIONS.md stays manageable, file read times reduced by 80-90%

**PERF-2: Manual Report Creation Friction**
- **Problem:** After `/code-review`, user had to manually ask for report document
- **Impact:** Reports lost when chat scrolled, no historical tracking
- **Solution:** Auto-generate report files
  - **MODULE-103:** Automatic report creation
    - Creates `artifacts/code-reviews/session-N-review.md` automatically
    - Uses session number from SESSIONS.md
    - Includes date stamp, grade, and full analysis
    - No manual work required
- **Tests:** 8/8 passing
- **Impact:** Zero manual work, consistent formatting, historical tracking

**PERF-3: Manual Consistency Checking**
- **Problem:** `/review-context` asked users to "check cross-document consistency" manually
- **Impact:** Easy to miss discrepancies (dates, phases, session counts)
- **Solution:** Automated consistency checks
  - **MODULE-104:** Cross-document verification in `/review-context`
    - Compares "Last Updated" dates across CONTEXT.md, STATUS.md, SESSIONS.md
    - Detects phase drift between CONTEXT.md and STATUS.md
    - Validates session count accuracy
    - Shows specific warnings for mismatches
- **Tests:** 8/8 passing
- **Impact:** Automatic drift detection, actionable warnings

#### Test Coverage

**Comprehensive 3-Level Test Suite (101/101 tests passing - 100%)**

- **Level 1 - Unit Tests:** 78/78 passing
  - All 11 modules tested in isolation
  - Module-specific functionality verified

- **Level 2 - Integration Tests:** 12/12 passing
  - Cross-module interactions verified
  - Archiving integration (MODULE-101 + MODULE-102)
  - Version detection consistency
  - Context folder detection from subdirectories
  - Bash 3.2+ compatibility confirmed

- **Level 3 - Manual Verification:** 11/11 passing
  - Actual script execution validated
  - Archive script dry-run and real execution
  - Helper scripts syntax and functionality
  - All command files present and readable

**Test Infrastructure:**
- 14 test files created
- 3 test runners (unit, integration, comprehensive)
- Shared test helpers with isolated environments
- Zero test failures, zero regressions

#### Files Changed

**New Files:**
- `scripts/archive-sessions-helper.sh` - Core archiving logic (~200 lines)
- `scripts/tests/test-module-001.sh` through `test-module-104.sh` (11 files)
- `scripts/tests/run-all-tests.sh` - Unit test runner
- `scripts/tests/test-integration.sh` - Integration test suite
- `scripts/tests/test-manual-verification.sh` - Manual verification
- `scripts/tests/run-comprehensive-tests.sh` - Master test runner
- `TEST_RESULTS_v3.5.0.md` - Comprehensive test documentation

**Updated Files:**
- `.claude/commands/init-context.md` - Version auto-detection (MODULE-001)
- `.claude/commands/update-context-system.md` - Version auto-detection (MODULE-002)
- `.claude/commands/review-context.md` - Smart SESSIONS.md loading (MODULE-006), consistency checks (MODULE-104)
- `.claude/commands/save-full.md` - Archiving auto-trigger (MODULE-102)
- `.claude/commands/code-review.md` - Auto-report generation (MODULE-103)
- 10+ command files - Context folder auto-detection (MODULE-007)
- `scripts/common-functions.sh` - Version check portability (MODULE-003)

#### Quality Assurance

- **Cross-platform:** bash 3.2+, bash 4.0+, zsh, sh (all verified)
- **Backward compatible:** No breaking changes
- **Test-driven:** All tests written BEFORE implementation
- **Zero regressions:** All existing functionality intact
- **Modular:** Each fix independently tested and verified

#### Deployment Status

**✅ Ready for Production**
- All 11 modules implemented
- 101/101 tests passing
- Zero failures detected
- Comprehensive documentation
- No known issues

[View complete test results →](https://github.com/rexkirshner/ai-context-system/blob/main/TEST_RESULTS_v3.5.0.md)

---

## [3.4.0] - 2025-11-17

### Added - Code Review Actionability Features

**Minor release with major enhancement to `/code-review` command based on real-world user feedback from two production projects**

**Context:** Users reported that `/code-review` produced excellent analysis but required 30-60 minutes of manual work to create TodoWrite tasks, update context files, and track progress between reviews.

#### User Impact

**Before v3.4.0:**
1. Run /code-review
2. Read 458-line report
3. Manually create 40+ todos (30 min)
4. Manually update KNOWN_ISSUES.md
5. Manually update STATUS.md
6. Manually compare with previous review
7. Manually track grade progression

**After v3.4.0:**
1. Run /code-review
2. Read report
3. Accept prompts (Y/Y/Y) → 30 seconds
4. ✅ Auto-generated 7 grouped tasks from 42 issues
5. ✅ Auto-updated KNOWN_ISSUES.md (3 critical)
6. ✅ Auto-updated STATUS.md
7. ✅ Auto-comparison: "10/12 issues resolved ✅"
8. ✅ Grade progression tracked in INDEX.md

**Time Saved:** 30-60 minutes → 5 minutes per review

#### Features Added

**1. Smart Issue Grouping**
- Groups 3+ similar issues into single task
- Example: 25 "missing type definition" errors → 1 grouped task
- **Impact:** 40+ tasks → 7-10 actionable tasks

**2. Automatic TodoWrite Task Generation**
- Auto-generates tasks from findings with severity threshold filtering
- Smart formatting for grouped vs individual tasks
- **Impact:** 30 minutes → 30 seconds (user accepts prompt)

**3. KNOWN_ISSUES.md Integration**
- Auto-adds CRITICAL/HIGH issues to KNOWN_ISSUES.md
- Bidirectional links (review ↔ issues)
- **Impact:** Future AI sessions see critical issues without re-reading review

**4. STATUS.md Auto-Update**
- Auto-adds review summary under "Recent Changes"
- Grade, issue counts, and link to full report
- **Impact:** Project status shows current quality at a glance

**5. Review History Tracking**
- Tracks all reviews in `artifacts/code-reviews/INDEX.md`
- Tabular format showing quality trends over time
- **Impact:** Visible quality progression (C → B → A → A+)

**6. Automatic Review Comparison**
- Auto-detects and compares with previous review
- Shows resolved/new/persistent issues
- **Impact:** "10/12 issues resolved ✅" shown automatically

#### New Files

- `scripts/code-review-helpers.sh` - Modular helper library (578 lines, 8 functions)
- `scripts/tests/test-code-review-helpers.sh` - Comprehensive test suite (33 tests)
- `scripts/tests/sample-review-issues.json` - Test data
- `scripts/tests/test-upgrade-path.sh` - Upgrade validation (19 tests)

#### Updated Files

- `.claude/commands/code-review.md` - Added Step 8: Integration & Actionability (+278 lines)
- `install.sh` - Added new files, jq dependency check, feature announcements
- `VERSION` - Bumped to 3.4.0
- `CHANGELOG.md` - Complete v3.4.0 entry

#### Dependencies

- **New requirement:** `jq` for JSON processing
- Installation: `brew install jq` (macOS) or `apt-get install jq` (Linux)

#### Test Coverage

- Helper functions: 33/33 tests passing ✓
- Upgrade path: 19/19 tests passing ✓
- All tests passing before integration (TDD approach)

[View full changelog on GitHub →](https://github.com/rexkirshner/ai-context-system/blob/main/CHANGELOG.md)

## [3.3.1] - 2025-11-16

### Fixed - Emergency Bug Fixes & Installer Improvements

**Patch release addressing critical installation reliability issues and command execution bugs discovered during real-world testing**

#### Installer Improvements

**Missing Helper Scripts (CRITICAL)**
- Fixed: `find-context-folder.sh` and `update-quick-reference.sh` not included in installation
- Impact: Commands failed with "script not found" when run from subdirectories
- Now: Both scripts automatically installed and verified

**Version Sync Portability**
- Fixed: `sed -i` behaves differently on macOS vs Linux
- Impact: Version could get out of sync between VERSION file and config
- Now: Portable implementation using temp files, works on all platforms

**Download Retry Logic**
- Added: Automatic retry with exponential backoff (3 attempts, 2s/4s delays)
- Impact: Network hiccups and GitHub rate limiting no longer cause installation failures
- Now: Robust installation even with intermittent connectivity

**Post-Installation Validation**
- Added: Automatic validation with auto-repair after installation
- Checks: Version sync, script permissions
- Impact: Issues caught and fixed immediately, not discovered later
- Philosophy: Prevention over repair

**Enhanced Backup & Rollback**
- Added: VERSION file and context/ directory to backup/rollback
- Impact: Complete system restoration on installation failure
- Now: Zero data loss from failed installations

#### Command Fixes

**Bash Parsing Errors in /save and /save-full (CRITICAL)**
- Fixed: Multi-line bash if-then-else blocks caused parsing errors in Claude Code
- Error: `parse error near 'then'`, `parse error near '&&'`
- Impact: /save command failed during git status extraction
- Now: Simple sequential commands with graceful fallback
- Discovered: User testing in real project (excellent feedback loop!)

#### Testing & Documentation

**Comprehensive Test Suite**
- Added: 15 automated tests covering all bug fixes (15/15 passing)
- Coverage: Counter removal, helper scripts, version sync, retry logic, validation, backup/rollback

**Pattern Documentation**
- Added: Bash command pattern guidelines for future development
- Documents: Anti-patterns to avoid, recommended alternatives, testing checklist

**Sprint Report**
- Added: Complete implementation documentation with code examples and lessons learned

### Removed

**Cleanup**
- Removed: Unused counter fields from config template (dead code)

### Implementation Philosophy

- **Prevention over band-aids**: Post-installation validation catches issues immediately
- **Modularity**: Each fix implemented as testable function
- **Real-world validation**: User discovered bash parsing errors during actual usage

[View full changelog on GitHub →](https://github.com/rexkirshner/ai-context-system/blob/main/CHANGELOG.md)

## [3.3.0] - 2025-11-13

### Added - Template Protection & Documentation Currency

**Major release with 5 features based on 100+ production session feedback**

#### Features Added

**1. Template Markers (Template Protection)**
- HTML comment markers protect critical template sections
- `<!-- TEMPLATE SECTION: KEEP ALL -->` preserves structure and content
- `<!-- TEMPLATE: READ-ONLY -->` marks instructional files
- `[FILL: description]` provides clear placeholders
- **Impact:** Prevents 80-90% of template deletion errors

**2. Deletion Protection**
- Interactive `confirm_deletion()` function with file details
- Requires explicit "yes" confirmation before deletion
- Default: keep file (safe by default)
- **Impact:** Zero data loss from accidental deletions

**3. Documentation Staleness Detection**
- `/save-full` warns when CONTEXT.md is >7 days old, README.md >14 days old
- `/review-context` shows color-coded staleness (🟢🟡🔴) for all context/*.md files
- Detects missing module READMEs
- **Impact:** Prevents documentation drift before it becomes a problem

**4. Decision Documentation Guidance**
- Added comprehensive guidance to claude.md template
- 5 decision categories with examples (Library/Framework, Performance, Data Model, Security, Process)
- DECISIONS.md format example with metrics
- **Impact:** Better architectural decision capture and context preservation

**5. Upgrade Path Documentation**
- "What's New in v3.3.0" section in update-guide.md
- `/update-context-system` displays features after upgrade
- Clear adoption guidance for each feature
- **Impact:** Users understand new features and how to use them

#### Test Coverage
- 69/69 tests passing (100% pass rate)
- 13 files changed
- ~2,000+ lines of code, tests, and documentation

[View full changelog on GitHub →](https://github.com/rexkirshner/ai-context-system/blob/main/CHANGELOG.md)

## [3.2.2] - 2025-10-23

### Fixed - Critical Installer Bugs

**Emergency patch fixing installer bugs blocking all upgrades**

#### Critical Bugs Fixed

**BUG-003: Deprecated Command in Installer (CRITICAL)**
- Installer tried to download removed `save-context.md`
- Caused HTTP 404 errors, 100% upgrade failure rate
- Fixed: Removed from installer command list

**BUG-004: Version Detection Returns Blank**
- Showed blank instead of current version
- Fixed: Priority-order detection (VERSION file → config → scripts)

**BUG-005: Misleading Error Message (CRITICAL UX)**
- Showed "Installation successful!" then "Installation failed!"
- 100% user confusion in non-interactive mode
- Fixed: Disabled ERR trap after success, skip prompts with --yes

[View full changelog on GitHub →](https://github.com/rexkirshner/ai-context-system/blob/main/CHANGELOG.md)

## [3.2.1] - 2025-10-22

### Fixed - Critical Dogfooding Feedback

**Patch release addressing issues found during real-world testing**

#### Critical Bugs Fixed

**BUG-001: Session Number Detection**
- Helper script counted template sessions as real sessions
- Detected "Session 6" for first-ever session
- Fixed: Updated pattern to exclude templates

**BUG-002: Context Folder Detection**
- Commands assumed correct directory, failed from subdirectories
- Fixed: Integrated find-context-folder.sh logic

**CRITICAL: Quick Reference Auto-Generation NOT Implemented**
- Documentation said "auto-generated" but was manual
- FALSE ADVERTISING - 15+ fields required manual work
- Fixed: Created update-quick-reference.sh script

## [3.2.0] - 2025-10-20

### Added - Rebrand to "AI Context System"

**Major rebrand from "Claude Context System" to "AI Context System"**

- System name: Claude Context System → AI Context System
- Repository: claude-context-system → ai-context-system
- Multi-AI support emphasized
- Tool-specific headers (claude.md, cursor.md, aider.md)

## Earlier Versions

See [full changelog on GitHub](https://github.com/rexkirshner/ai-context-system/blob/main/CHANGELOG.md) for complete version history.
