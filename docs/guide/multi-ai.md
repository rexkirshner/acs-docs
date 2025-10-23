# Multi-AI Support

The AI Context System works with any AI coding assistant—built on universal concepts that transcend specific tools.

## Universal Core, Tool-Specific Optimization

### The Philosophy

**Universal concepts work everywhere:**
- File structure (`context/`, documentation files)
- Documentation philosophy (externalize reasoning)
- Mental model capture
- Decision rationale
- Session continuity

**Tool-specific optimizations:**
- Claude Code: Slash commands (`/save`, `/save-full`)
- Cursor: Manual workflows, tool-specific header
- Aider: Command-line integration
- GitHub Codex: API-based access

## Supported AI Tools

### Claude Code (Fully Optimized)

**Built-in features:**
- ✅ 14 slash commands (`/save`, `/save-full`, `/init-context`, etc.)
- ✅ TodoWrite integration (automatic task state capture)
- ✅ Interactive workflows (approval checkpoints, validation prompts)
- ✅ Command system (`.claude/commands/` architecture)

**Entry point:** `context/claude.md`

**Usage:**
```bash
/init-context    # One-time setup
/save            # Quick updates (2-3 min)
/save-full       # Comprehensive saves (10-15 min)
/review-context  # Session start
```

**Why optimized?**
This system was built using Claude Code through extensive dogfooding. The slash command system provides the best UX.

### Cursor

**Available features:**
- ✅ File structure (all documentation files)
- ✅ Templates (manual workflow)
- ✅ Externalized context (read DECISIONS.md, SESSIONS.md)
- ❌ No slash commands (manual workflow)

**Entry point:** `context/cursor.md`

**Usage:**
```
1. Read context/cursor.md for orientation
2. Manually create session entries in SESSIONS.md
3. Update STATUS.md with current state
4. Document decisions in DECISIONS.md
5. Reference templates/ for structure
```

**Example cursor.md:**
```markdown
# Cursor AI - Project Context

You are working on [Project Name].

## Quick Start
1. Read context/CONTEXT.md for project overview
2. Check context/STATUS.md for current state
3. Review context/DECISIONS.md for past decisions
4. Add session entries to context/SESSIONS.md

## Key Files
- CONTEXT.md: Project orientation
- STATUS.md: Current work in progress
- DECISIONS.md: Why choices were made
- SESSIONS.md: Session history

## Workflow
- Update STATUS.md frequently
- Add SESSIONS.md entries after significant work
- Document all decisions in DECISIONS.md
```

### Aider

**Available features:**
- ✅ File structure
- ✅ Templates
- ✅ Externalized context
- ✅ Command-line integration potential

**Entry point:** `context/aider.md`

**Usage:**
```bash
# Manual workflow
aider context/STATUS.md
# Update current state

aider context/SESSIONS.md
# Add session entry

aider context/DECISIONS.md
# Document decision
```

**Potential automation:**
```bash
# Could create aider scripts
aider-save.sh    # Update STATUS.md
aider-session.sh # Create SESSIONS.md entry
```

### GitHub Codex

**Available features:**
- ✅ File structure
- ✅ Externalized context
- ✅ API-based access
- ❌ No interactive commands

**Entry point:** `context/codex.md` or API integration

**Usage (via API):**
```javascript
// Read context before suggestions
const context = await readFile('context/STATUS.md');
const decisions = await readFile('context/DECISIONS.md');

// Generate code with context awareness
const completion = await openai.createCompletion({
  model: 'code-davinci-002',
  prompt: `${context}\n\n${decisions}\n\nImplement: ${task}`,
});
```

### Any AI Assistant with File System Access

**Minimum requirements:**
- ✅ Read files
- ✅ Write files
- ✅ Follow markdown templates

**Usage:**
```
1. Install AI Context System
2. Use templates/ as guides
3. Manually update documentation files
4. Reference context/ for all work
```

## What Works Everywhere

### File Structure

```
your-project/
├── context/
│   ├── CONTEXT.md      # Orientation (works with all AIs)
│   ├── STATUS.md       # Current state (works with all AIs)
│   ├── DECISIONS.md    # Decision log (works with all AIs)
│   ├── SESSIONS.md     # History (works with all AIs)
│   ├── claude.md       # Claude Code entry point
│   ├── cursor.md       # Cursor entry point
│   └── aider.md        # Aider entry point
├── templates/          # Documentation templates
└── scripts/            # Helper utilities
```

**Every AI tool can:**
- Read these files
- Understand the structure
- Update documentation
- Reference past decisions

### Documentation Philosophy

**Universal principles:**
1. **Externalize reasoning** - Make AI thoughts visible
2. **Document decisions** - Capture "why" not just "what"
3. **Preserve mental models** - Session-to-session continuity
4. **Enable collaboration** - Human and AI transparency

**Works with any AI** because it's about structure and philosophy, not tool-specific features.

### Templates

`templates/` directory provides:
- Session entry template
- Decision entry template
- Status update template
- Context file template

**Any AI can use these** as guides for creating consistent documentation.

## Claude Code: Why Optimized?

### Built Through Dogfooding

This system was created using Claude Code over months of real-world usage:
- Developed slash commands iteratively
- Refined workflows based on actual use
- Discovered pain points and solved them
- Optimized for Claude Code's strengths

### Slash Command Advantages

**Claude Code's slash commands provide:**

```bash
/save
```
vs.
```
"Please update context/STATUS.md with current state,
 regenerate Quick Reference from .context-config.json,
 capture work in progress, and format according to
 templates/status-template.md"
```

**Slash commands:**
- ✅ Faster (single command)
- ✅ Consistent (same every time)
- ✅ Discoverable (type `/` to see all)
- ✅ No prompt engineering needed

### TodoWrite Integration

**Claude Code captures task state automatically:**

```bash
/save-full
```

**Auto-captures:**
- Active tasks from TodoWrite
- Task status (pending/in_progress/completed)
- Work timeline

**Other AIs must:**
- Manually track tasks
- Remember to document
- No automatic capture

### Interactive Workflows

**Claude Code commands can:**
- Prompt for confirmation
- Show diffs before changes
- Validate inputs
- Guide through steps

**Example:**
```bash
/migrate-context

# Shows:
# - Files to be migrated
# - Preview of consolidation
# - Confirmation prompt
# - Step-by-step progress
```

**Other AIs:**
- Manual multi-step process
- No built-in validation
- More error-prone

## Future Plans

### Broader AI Tool Support

**Roadmap:**

**Phase 1 (Current):**
- ✅ Claude Code fully optimized
- ✅ Universal file structure
- ✅ Templates for all tools

**Phase 2 (Planned):**
- 🔜 Cursor-specific commands
- 🔜 Aider script automation
- 🔜 VSCode extension (Copilot integration)

**Phase 3 (Future):**
- 🔮 JetBrains plugin
- 🔮 Vim/Neovim integration
- 🔮 Web-based dashboard

### Community Contributions

**We welcome:**
- Tool-specific headers (e.g., windsurf.md, cody.md)
- Integration scripts
- Workflow guides
- Template improvements

**Contributing:**
- Fork [ai-context-system](https://github.com/rexkirshner/ai-context-system)
- Add your tool integration
- Submit PR with documentation

## Getting Started with Your AI Tool

### Claude Code Users

```bash
# One-command install
curl -sL https://raw.githubusercontent.com/rexkirshner/ai-context-system/main/install.sh | bash

# Initialize
/init-context

# Daily workflow
/save
/save-full
```

### Other AI Tools

```bash
# 1. Install
curl -sL https://raw.githubusercontent.com/rexkirshner/ai-context-system/main/install.sh | bash

# 2. Create tool-specific header
# Edit context/[your-tool].md with instructions

# 3. Reference context files
# Point your AI to context/ directory

# 4. Use templates
# Follow templates/ for consistent structure

# 5. Manual workflow
# Update CONTEXT.md, STATUS.md, DECISIONS.md, SESSIONS.md
```

## Success Stories

### Claude Code + Cursor Handoff

**Project:** portfolio-tracker (10-day development)

**Workflow:**
1. Claude Code: Initial development + v3.2.1 dogfooding
2. Cursor: Frontend refinements
3. Both AIs read same context/
4. Zero context loss in handoff

**Result:** Seamless collaboration between two AI tools

### Aider + GitHub Codex

**Project:** CLI tool development

**Workflow:**
1. Aider: Core implementation
2. GitHub Codex: Code suggestions with context
3. Manual SESSIONS.md updates
4. Shared DECISIONS.md

**Result:** Context-aware suggestions from Codex

## Best Practices

### 1. Keep Context Updated

**Regardless of tool:**
```bash
# After significant work
# Update STATUS.md, SESSIONS.md, DECISIONS.md
```

### 2. Use Templates

**All tools benefit from:**
- Consistent structure
- Complete documentation
- Easier reading

### 3. Document Tool Switches

```markdown
## Session 5 | 2025-10-23 | Tool Switch: Claude Code → Cursor

**Why switching:** Need Cursor's multi-file edit for refactor

**Handoff notes:**
- Read DECISIONS.md for architecture choices
- Current work: Refactoring auth system (see STATUS.md)
- Known issues: Rate limiting not implemented (TODO)
```

### 4. Contribute Back

**If you create integrations:**
- Share with community
- Add to repository
- Help other users of your tool

## Success Metric

> **"The system works perfectly across Claude Code, Cursor, Aider, and GitHub Codex with the same quality of context preservation."**

When this is true, multi-AI support is successful.

## Next Steps

- [Installation Guide](/guide/installation) - Set up for your tool
- [Commands Reference](/commands/) - See Claude Code commands
- [Workflows](/workflows/) - Adapt workflows to your tool
- [GitHub Repository](https://github.com/rexkirshner/ai-context-system) - Contribute integrations
