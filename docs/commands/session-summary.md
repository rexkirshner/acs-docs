# /session-summary

View condensed session history for quick navigation.

## Overview

Fast index view of all sessions:
- Session numbers and dates
- TL;DR summaries only
- Quick jump links to detailed sessions
- Perfect for finding specific work

**Time:** 10 seconds to scan

## When to Use

**Use /session-summary when:**
- Looking for specific session
- Want project history overview
- Need to find when decision was made
- Reviewing project timeline

## Example Output

```bash
$ /session-summary

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 SESSION HISTORY SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Total Sessions: 15
Date Range: 2025-09-01 to 2025-10-23
Project: my-app

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Session 15 | 2025-10-23 | JWT Authentication
  TL;DR: Implemented JWT auth with jose library. Refresh tokens
  in httpOnly cookies, access tokens in memory. Discovered CORS
  issue in production.
  [Full session →](/sessions/15)

Session 14 | 2025-10-22 | Database Setup
  TL;DR: Set up PostgreSQL with Prisma. Created user model.
  Added password hashing with bcrypt.
  [Full session →](/sessions/14)

Session 13 | 2025-10-21 | API Structure
  TL;DR: Designed REST API structure. Created base routes.
  Implemented error handling middleware.
  [Full session →](/sessions/13)

... (sessions 1-12)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Navigation:
  • Full history: context/SESSIONS.md
  • Current state: /review-context
  • Export all: /export-context
```

## Use Cases

### Find Specific Work

```bash
$ /session-summary | grep "authentication"

Session 15 | 2025-10-23 | JWT Authentication
Session 8 | 2025-10-10 | Initial Auth Planning
```

### Project Timeline

Quick overview of project evolution over time.

### Handoff Context

Share summary with new team members for quick orientation.

## Related Commands

- [/review-context](/commands/review-context) - Current state
- [/export-context](/commands/export-context) - Full export

## See Also

- [SESSIONS.md Guide](/guide/sessions-file) - Understanding sessions
