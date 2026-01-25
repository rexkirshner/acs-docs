# Multi-AI Support

The AI Context System works with any AI coding assistant. The core is universal markdown files—no tool-specific features required.

## Universal by Design

The system is built on three markdown files:

| File | Purpose |
|------|---------|
| `CLAUDE.md` | Entry point, project overview |
| `context/STATUS.md` | Current state, Working Set, next actions |
| `context/DECISIONS.md` | Append-only decision log |

**Any AI that can read and write files can use this system.**

## How It Works with Different Tools

### Claude Code (Slash Commands)

Claude Code gets convenience commands:

```bash
/init-context  # Creates the three context files
/save          # Updates STATUS.md at session end
```

But these commands just automate what you could do manually—read and write markdown files.

### Any Other AI Tool

Works identically, just without slash commands:

1. **Read** `CLAUDE.md` to understand the project
2. **Read** `context/STATUS.md` for current state
3. **Work** on files in the Working Set
4. **Update** `STATUS.md` when done
5. **Append** to `DECISIONS.md` for significant decisions

The Session Loop is the same:

```
Start → Read STATUS.md
Work → Edit Working Set files
End → Update STATUS.md
```

## Examples by Tool

### Cursor

```
1. Open project
2. @ context/STATUS.md to see current state
3. Work on files
4. Ask Cursor to update STATUS.md:
   "Update context/STATUS.md with:
    - Objective: [current goal]
    - Working Set: [files you touched]
    - Next Actions: [what's next]"
```

### Aider

```bash
# See current state
aider --read context/STATUS.md

# Work on files
aider src/feature.ts

# Update status
aider context/STATUS.md
# Ask to update fields
```

### GitHub Copilot / Any AI

```
1. Open context/STATUS.md
2. Read current state
3. Make your changes
4. Update STATUS.md manually or ask the AI
```

### API-Based AIs

```javascript
// Read context before generating code
const status = await readFile('context/STATUS.md');
const decisions = await readFile('context/DECISIONS.md');

// Include in prompt
const prompt = `
Project context:
${status}

Past decisions:
${decisions}

Task: ${userTask}
`;
```

## The File Structure

```
your-project/
├── CLAUDE.md               # Entry point (auto-loaded by Claude Code)
├── context/
│   ├── STATUS.md           # Current state
│   └── DECISIONS.md        # Decision history
└── .claude/
    └── commands/           # Claude Code slash commands (optional)
```

**Every AI tool can:**
- Read these markdown files
- Understand the structure
- Update documentation
- Reference past decisions

## AI-to-AI Handoffs

The system enables seamless handoffs between different AI tools:

### Example: Claude Code → Cursor

**Day 1: Claude Code**
```
/save
```

STATUS.md now contains:
```markdown
Objective: Implement user authentication
Working Set: src/auth/login.ts, src/auth/session.ts
Next Actions: Add password hashing, implement JWT tokens
```

**Day 2: Cursor**
```
@ context/STATUS.md
"Continue from where the last session left off"
```

Cursor reads the same STATUS.md and knows exactly what to do.

### Why It Works

- **Same files** — Both AIs read/write the same markdown
- **Same format** — STATUS.md structure is AI-agnostic
- **Same information** — Objective, Working Set, Next Actions
- **Zero context loss** — Everything persists in files

## Claude Code: Why Optimized?

Claude Code gets extra conveniences:

| Feature | Claude Code | Other AIs |
|---------|-------------|-----------|
| Slash commands | `/save`, `/init-context` | Manual updates |
| Auto-load | CLAUDE.md loads automatically | Must read manually |
| Quick Reference | Commands built-in | N/A |

But the **core system is identical**. Claude Code commands just automate:
- Reading files
- Updating fields
- Formatting entries

You can do all of this manually in any tool.

## Best Practices

### Keep Context Updated

After significant work, update STATUS.md:

```markdown
LastUpdated: [today]
HeadCommit: [current git SHA]
Objective: [what you're working toward]

## Working Set
- [files you're touching]

## Next Actions
- [what's next]

## Blocked On
- [blockers, or "(None)"]
```

### Document Decisions

When making choices with tradeoffs:

```markdown
## YYYY-MM-DD: [Area] Decision Title
Why: [reason]
Tradeoff: [what you gave up]
RevisitWhen: [trigger to revisit]
```

### Document Tool Switches

When switching between AI tools:

```markdown
## Next Actions
- Continue auth implementation (switching from Claude Code to Cursor)
- See DECISIONS.md for JWT approach rationale
```

## Success Metric

> **"I can switch between Claude Code, Cursor, Aider, or any other AI tool and continue exactly where I left off."**

When this is true, multi-AI support is working.

## Next Steps

- [Getting Started](/guide/getting-started) — Installation
- [Session Continuity](/guide/session-continuity) — How context persists
- [STATUS.md Guide](/guide/status-file) — Current state format
- [DECISIONS.md Guide](/guide/decisions-file) — Decision format
