# /init-context

Creates the three context files for a new project.

## What It Creates

| File | Location | Purpose |
|------|----------|---------|
| `CLAUDE.md` | Project root | Entry point (auto-loaded by Claude Code) |
| `STATUS.md` | `context/` | Current state, Working Set, next actions |
| `DECISIONS.md` | `context/` | Append-only decision log |

## When to Use

**Use this command:**
- For new projects with no context files
- After installing the AI Context System for the first time

**Don't use if:**
- Context files already exist (they'll be overwritten)

## Usage

```bash
/init-context
```

The command:
1. Detects project information from `package.json`, `README.md`, etc.
2. Creates `CLAUDE.md` at project root with Session Loop instructions
3. Creates `context/` directory with `STATUS.md` and `DECISIONS.md`
4. Reports what was created

## What Gets Created

### CLAUDE.md (Project Root)

```markdown
> **Session Loop**
> 1. Start → Read `context/STATUS.md`
> 2. End → Run `/save`

# [Project Name]

[Auto-detected or prompted description]

## Commands

Run: `[detected command]`
Test: `[detected command]`
Build: `[detected command]`

## Constraints

- Don't refactor unrelated code
- Keep PRs under 300 lines
- If you need to touch files outside Working Set, pause, propose, update Working Set, then proceed

## Context

- Status: `context/STATUS.md`
- Decisions: `context/DECISIONS.md`
```

### context/STATUS.md

```markdown
# Status

SchemaVersion: 1
LastUpdated: [today]
HeadCommit: [git SHA or N/A]
Objective: TBD

## Working Set

- TBD

## Next Actions

- TBD

## Blocked On

- (None)
```

### context/DECISIONS.md

```markdown
# Decisions

Append-only log.

---

[Empty - decisions will be added as they're made]
```

## Auto-Detection

The command automatically detects:

| Source | Information |
|--------|-------------|
| `package.json` | Project name, description, npm scripts |
| `Cargo.toml` | Rust project info |
| `pyproject.toml` | Python project info |
| `go.mod` | Go project info |
| `README.md` | Project description |
| Git | Repository URL, current HEAD |

## Example Output

```bash
/init-context

📦 Detected: my-app (Next.js + TypeScript)

✅ Created:
   CLAUDE.md (project root)
   context/STATUS.md
   context/DECISIONS.md

Next steps:
1. Review CLAUDE.md - customize if needed
2. Read context/STATUS.md
3. Start working
4. Run /save at end of session
```

## If Context Already Exists

If context files already exist:

```bash
/init-context

⚠️  Context files already exist:
   ✓ CLAUDE.md
   ✓ context/STATUS.md
   ✓ context/DECISIONS.md

Options:
[K] Keep existing (cancel)
[O] Overwrite all (fresh start)
```

Choose based on whether you want to preserve existing content.

## After Initialization

1. **Review CLAUDE.md** — Customize project description and commands
2. **Start the Session Loop:**
   - Read `context/STATUS.md` to see current state
   - Work on your project
   - Run `/save` when done

## Troubleshooting

### Files not created

**Check:** Are you in the project root?

```bash
pwd
# Should be /path/to/your-project (not a subdirectory)
```

### Wrong project info detected

**Solution:** Edit the files manually after creation. The auto-detection is a starting point, not the final word.

### Already have CLAUDE.md

**Solution:** The system will ask whether to keep or overwrite. If you have custom content in CLAUDE.md, choose "Keep" and add the Session Loop blockquote manually:

```markdown
> **Session Loop**
> 1. Start → Read `context/STATUS.md`
> 2. End → Run `/save`
```

## See Also

- [Getting Started](/guide/getting-started) — Full setup guide
- [CLAUDE.md Guide](/guide/claude-md) — Entry point details
- [STATUS.md Guide](/guide/status-file) — Current state format
- [DECISIONS.md Guide](/guide/decisions-file) — Decision log format
- [/save](/commands/save) — End of session updates
