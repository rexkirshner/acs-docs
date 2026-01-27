# Changelog

All notable changes to the AI Context System.

## [6.0.4] - 2026-01-27

### Fixed

- **`/init-context` handles existing CLAUDE.md** — When CLAUDE.md already exists but lacks the Session Loop block, the command now detects this and displays the snippet to add. Previously, existing CLAUDE.md files were silently preserved without the core ACS mechanism, leaving future sessions unaware of context/STATUS.md and `/save`.
- **Installation docs clarify session restart** — Added warning that Claude Code must be restarted after copying command files for new commands to be available. Previously, users encountered "Unknown skill" errors when running `/init-context` immediately after installation.
- **`/update-context-system` no longer creates backup files** — Removed redundant backup step since git is required for updates. Rollback now uses `git checkout`.

---

## [6.0.3] - 2026-01-26

### Changed

- **`/review-cost` rebalanced for serverless stacks** — Serverless & Edge Platforms section moved to top with Vercel-specific cost drivers (rendering strategy, image optimization, build minutes, bandwidth). Database section renamed to Database & ORM with Prisma-specific items. Traditional Infrastructure moved lower with "skip for serverless" guidance.

### Fixed

- **`/save` session history clarification** — Added note explaining STATUS.md is replaced each session (not appended). Session history preserved in git commits; persistent context goes in DECISIONS.md.
- **`/save` mixed DECISIONS.md formats** — Clarified that new entries should always use v6.0 format even if file contains older v5.x entries.
- **`/update-context-system` verification wording** — Changed "8 files" to "8 command files (*.md)" to avoid confusion.
- **`/update-context-system` rollback placeholders** — Fixed inconsistent placeholder naming in rollback section.
- **All review commands formatting consistency** — All 5 review commands now use consistent bold formatting with brief explanations for each checklist item.

---

## [6.0.2] - 2026-01-25

### Fixed

- **Pre-v6 migration failures** — v5.x users running `/update-context-system` encountered broken upgrades due to script dependencies being deleted mid-execution
- **`/save` corrupting v5.x STATUS.md** — Now detects v5.x format and provides migration instructions instead of corrupting files

### Added

- **`migrate-to-v6.sh`** — One-time bootstrap script for pre-v6 → v6.0 migration
  - Checks for git availability before proceeding
  - Detects and refuses v6.0+ projects (directs to `/update-context-system`)
  - Detects and refuses fresh projects (directs to `/init-context`)
  - Creates timestamped backup before migration
  - Deletes all v5.x artifacts (scripts/, agents/, templates/, etc.)
  - Downloads v6.0 commands from GitHub with clear error handling
  - Deletes itself after successful completion
- **Format guard in `/save`** — Detects v5.x STATUS.md format and stops with clear migration instructions
- **Pre-v6 detection in `/update-context-system`** — Refuses pre-v6 systems with migration script instructions

### Changed

- **Two upgrade paths** — Clear separation:
  - Pre-v6 → v6.0: Run `migrate-to-v6.sh` script
  - v6.x → v6.y: Run `/update-context-system` command
- **`/update-context-system` simplified** — Now only handles v6.x → v6.y upgrades (migration logic moved to script)

### Removed

- **`install.sh`** — Superseded by two-path upgrade strategy (fresh installs use git clone + cp, pre-v6 migrations use migrate-to-v6.sh)

---

## [6.0.1] - 2026-01-25

### Fixed

- **Working Set scope limitation for review commands** — Added "Scope Expansion" sections to all review commands with critical paths to include when Working Set lacks review-relevant files
- **`/save` decision recording now autonomous** — AI evaluates session and records decisions without prompting user, reducing friction

### Added

- Scope expansion guidance for all 5 review commands (security, accessibility, cost, performance, seo)
- Automated tool suggestions: `npm audit` for security, Lighthouse/axe-core for accessibility, bundle analyzer for performance
- "Good Patterns Found" section to security review output format

---

## [6.0.0] - 2026-01-24

### Changed - Radical Simplification

**MAJOR RELEASE** - Complete redesign focused on simplicity. Reduced from 22 commands to 8, eliminated all scripting, removed agents and schemas.

#### Philosophy Shift

From mechanical validation to advisory prompts:
- Commands are now pure markdown prompts
- Claude interprets guidelines, not scripts
- Human-readable, no embedded bash
- "Advisory, not mechanical"

#### What Was Removed

| Feature | Reason |
|---------|--------|
| 14 commands | Rarely used, added complexity |
| 14 agents | Over-engineered |
| 8 JSON schemas | Mechanical validation unnecessary |
| Session hooks | Added complexity without value |
| 150KB+ of scripts | No shell scripts needed |
| SESSIONS.md | STATUS.md is sufficient |
| CONTEXT.md | CLAUDE.md covers project overview |
| Quick Reference | Manual editing is fine |
| .context-config.json | Not needed |
| templates/ | Embedded in commands |

#### What Was Kept

| Feature | Role |
|---------|------|
| CLAUDE.md | Entry point |
| STATUS.md | Current state |
| DECISIONS.md | Decision log |
| /init-context | Setup |
| /save | Session end |
| /update-context-system | Updates |
| 5 review commands | Audits |

#### New Features

- **Session Loop** — Simple, memorable pattern: Start → Read STATUS.md, End → Run /save
- **SchemaVersion** — Future-proofs STATUS.md format
- **Working Set** — Explicit containment boundary (3-7 files)

#### Migration

See [Migration Guide](/about/migration) for v5.x → v6.0 upgrade steps.

---

## [5.2.1] - 2026-01-24

*Note: v5.x releases are archived below for historical reference.*

### Fixed

- Session date regex for both `|` and `-` separators
- zsh arithmetic compatibility in config health check
- CLAUDE.md case sensitivity for Linux
- Duplicate checkmarks in log_success()
- Staleness threshold config reading
- Archive message accuracy

---

## [5.2.0] - 2026-01-23

### Added

- Code review synthesis agent
- Session index for SESSIONS.md navigation
- Working directory detection from subdirectories
- Context restoration section in session template
- Config drift detection

---

## [5.1.2] - 2026-01-15

### Fixed

- Nested repository detection
- Git boundary checking
- Claude Code settings conflict

---

## [5.1.1] - 2026-01-10

### Fixed

- SESSIONS.md progressive loading
- Session header parsing
- Health check thresholds

---

## [5.1.0] - 2026-01-05

### Added

- Progressive SESSIONS.md loading
- Cost-optimizer agent
- Library adoption reviewer

---

## [5.0.0] - 2025-12-20

### Changed

- Agent-based code review architecture
- JSON Schema contracts
- Session hooks

---

## Earlier Versions

For complete history of versions prior to 5.0.0, see the [GitHub releases](https://github.com/rexkirshner/ai-context-system/releases).
