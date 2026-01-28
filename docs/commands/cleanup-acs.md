# /cleanup-acs

Remove AI Context System artifacts from a project.

Use this if you installed ACS previously and want to remove all traces of it.

## Flags

- `--dry-run` — Show deletion plan without prompting, then exit
- `--force` — Skip confirmation prompt (for CI/automation)

## What Gets Removed

**High-confidence targets** (removed entirely):
- `context/` directory
- `.claude-backup-*/` (migration backups)
- `.claude/commands/`, `.claude/agents/`, `.claude/skills/`, `.claude/schemas/`, `.claude/hooks/`, `.claude/docs/`
- `.claude/VERSION`, `.claude/acs-settings.json`, `.claude/.last-update-check`, `.claude/.install-manifest.json`
- Root-level `install.sh`, `VERSION`

**Conditional targets** (only matching files removed):
- `scripts/` — `acs-*.sh`, `install-acs.sh`, `migrate-*.sh`, `*-helper.sh`, `common-functions.sh`
- `templates/` — `acs/**` subdir, files referencing `.claude/` or `context/`
- `config/` — `acs-*.json`, `*context-config*.json`
- `reference/`, `artifacts/` — files matching `*acs*` or `*context-system*`

## What Gets Kept

- `CLAUDE.md`, `AGENTS.md`
- `.claude/settings.local.json`

## Safety Rules

- **Stay in repo root.** All paths verified to be within repository.
- **Don't follow symlinks.** Symlinks are skipped and reported.
- **Always confirm.** Requires typing `DELETE` (case-sensitive) unless `--force` is set.
- **Plan before delete.** Shows full plan before asking for confirmation.

## Procedure

1. **Preflight** — Verify git repo and ACS markers exist
2. **Scan** — Find all targets (tracked and untracked)
3. **Plan** — Print deletion plan grouped by confidence
4. **Confirm** — Wait for `DELETE` confirmation
5. **Delete** — Use `git rm` for tracked, `rm` for untracked
6. **Cleanup** — Remove empty directories
7. **Report** — Show what was removed/kept/skipped

## Post-Cleanup

Check `CLAUDE.md` for stale references to deleted files (e.g., `context/STATUS.md`). Remove or update these manually.

## Recovery

- **Tracked deletions:** `git restore` or `git checkout`
- **Untracked deletions:** Cannot be restored via git
