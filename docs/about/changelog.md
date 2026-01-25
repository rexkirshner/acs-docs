# Changelog

All notable changes to the AI Context System.

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
| 15 commands | Rarely used, added complexity |
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
| 4 review commands | Audits |

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
