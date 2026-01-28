# /save-session

Record what happened in this context window. Output: `docs/sessions/SESSION-NNN.md`

Run before `/compact` or when context is long.

## What It Does

1. Reflects on the full conversation (what was attempted, succeeded, failed)
2. Determines next session number (auto-increments)
3. Collects verified repo state from git
4. Writes structured session file

## Output Format

```markdown
# Session NNN

**Date:** YYYY-MM-DD

## Summary
[2-3 sentences: what this session was about and the outcome]

## Accomplished
- [bullet]

## Repo State
- **HEAD:** <short sha>
- **Branch:** <name>
- **Working tree:** <clean/dirty>

## Files Changed
| File | Status |
|------|--------|
| `path` | A/M/D/R/untracked |

## Commits
- `sha` — message

## Decisions
- **[Topic]:** [decision] — [why]

## Key Discussions
- [Notable insight or important exchange]

## Pointers
- `path/to/relevant/file`

## Unfinished
- [ ] [Actionable task]

## Next Session
[What to do next, in order]
```

## Hard Rules

- **Verify from git.** Commits and Files Changed must come from actual git commands. If unverifiable, write "Unknown."
- **No secrets.** Never write tokens, API keys, passwords, private keys, cookies, or connection strings. Use `[REDACTED]` for any sensitive values.
- **Stay concise.** Follow the caps in each section. Scannable > thorough.
- **Be factual.** Prefer specifics (file paths, function names) over vague descriptions.

## Secret Detection

Before writing, the command scans for:
- API key prefixes: `sk-`, `ghp_`, `AKIA`, `AIza`
- Private keys: `-----BEGIN`, `ssh-rsa`
- Auth headers: `Authorization: Bearer`
- Connection strings: `postgres://`, `mongodb://`
- High-entropy tokens

Any matches are replaced with `[REDACTED]`.
