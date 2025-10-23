# Common Workflows

Learn how to use the AI Context System for real-world scenarios.

## Daily Work

Your typical development session:

```bash
# 1. Start session
/review-context

# 2. Work on your project
# ... coding, debugging, refactoring ...

# 3. Save frequently (2-3 min)
/save

# 4. Before lunch/break (10-15 min)
/save-full
```

[Learn more →](/workflows/daily-work)

## AI-to-AI Handoff

Transfer project to another AI agent:

```bash
# 1. Capture current state
/save-full

# 2. Validate completeness
/validate-context

# 3. Package everything
/export-context

# 4. Share export with new AI
# New AI reads context/ folder
```

[Learn more →](/workflows/ai-handoff)

## Human Review of AI Work

Verify AI understood your project:

```bash
# 1. Check AI's reasoning
# Read context/DECISIONS.md (see WHY)

# 2. Review mental models
# Check context/SESSIONS.md

# 3. Understand current state
# Review context/STATUS.md

# 4. Verify constraints
# Ensure AI understood your requirements
```

[Learn more →](/workflows/human-review)

## Meta-Projects

Managing parent directory with multiple sub-repositories:

```bash
# 1. Install in parent directory
curl -sL https://... | bash

# 2. Configure as meta-project
# .context-config.json: "projectType": "meta-project"

# 3. Use from any subdirectory
cd sub-repo-1/backend/
/save  # Auto-detects context folder

# 4. Track cross-repo decisions
# DECISIONS.md captures architecture choices
```

[Learn more →](/workflows/meta-projects)

## New Project Setup

Starting from scratch:

```bash
# 1. Install system
curl -sL https://raw.githubusercontent.com/rexkirshner/ai-context-system/main/install.sh | bash

# 2. Initialize
/init-context

# 3. Fill out core files
# Edit context/CONTEXT.md (project orientation)
# Edit context/STATUS.md (current goals)

# 4. Start coding
# /save frequently
# /save-full before breaks
```

## Existing Project Migration

Adding to mature project:

```bash
# 1. Install system
curl -sL https://... | bash

# 2. Migrate existing docs
/migrate-context

# 3. Review consolidation
# Check context/ folder
# Verify all docs preserved

# 4. Continue work
# Use /save and /save-full
```

## Best Practices

1. **Save often** - Run `/save` every 30-60 minutes
2. **Full saves at boundaries** - Always `/save-full` before breaks
3. **Review at start** - Always `/review-context` when opening project
4. **Validate before handoffs** - Run `/validate-context` before sharing
5. **Read externalized context** - Review DECISIONS.md and SESSIONS.md regularly
6. **Trust the system** - It captures more than you think

## Success Metrics

**Session Continuity:**
> "I can end abruptly, start days later, run /review-context, and continue exactly where I left off."

**Externalized Context:**
> "I can read DECISIONS.md and understand exactly what the AI was thinking."

**Human-AI Collaboration:**
> "I can verify the AI understood my constraints by reading its reasoning."

**AI-to-AI Collaboration:**
> "A new AI agent can read context/ and understand the entire project."
