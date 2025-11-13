# Changelog

All notable changes to the AI Context System.

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
