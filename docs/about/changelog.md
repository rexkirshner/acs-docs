# Changelog

All notable changes to the AI Context System.

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
