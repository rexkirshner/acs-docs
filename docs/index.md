---
layout: doc
title: The AI Context System - A Swan Song
---

# The AI Context System: A Swan Song

I spent three months building a system to help AI coding assistants maintain context across sessions. It grew to 22 commands, 14 agents, and 150KB of shell scripts. Then I deleted all of it from 15 projects, over 1,100 files and 436,000 lines of code, and felt nothing but relief.

This is the story of what I built, why I killed it, and what I actually learned.

## The Itch

It started in mid-October 2025 with a simple annoyance: I kept copy/pasting the same instructions into `CLAUDE.md` files across projects. So I thought, what if I could share commands across projects? What if Claude could remember what we were working on between sessions?

I didn't know what Claude Code actually needed to be effective, so I made everything available and figured Claude would pick what's useful.

That was the first mistake. Over the next few months the system grew into something monstrous: 22 commands, 14 specialized agents, 150KB of shell scripts, JSON schemas, git hooks, multiple context files, templates, migration scripts, and 80 unit tests. Every time Claude suggested an improvement, I built it. Every edge case got handled. Every feature got documented.

I assumed more structure meant more effective AI. I was solving problems I had never verified existed.

## The Wake-Up Call

In January I recorded a podcast episode with some friends about AI tools. One of them made an offhand comment I couldn't stop thinking about:

> "Claude Code really hits your addiction centers strongly. You really feel like you're doing so much, but that doesn't really mean you're doing anything."

I started asking questions I'd been avoiding. Is any of this actually helping Claude? Have I ever verified that Claude reads my status files unprompted? When I start a new session, Claude already has CLAUDE.md, the codebase, and git history. I tell it what I'm working on. Is that enough?

I had never tested any of my assumptions.

So I tried rebuilding with a bare-bones version. Eight commands instead of 22. No shell scripts. No agents. But as I iterated, optimizing install paths and adding migration guides and tracking versions, I realized I was still chasing the same thing that led me here in the first place. The system was simpler but the impulse was identical: build more, solve problems that might not exist.

## What Actually Matters

A few things were worth the detour.

Claude Code reads `CLAUDE.md` automatically. OpenAI Codex reads `AGENTS.md`. This is the one verified mechanism. Everything else is speculation. Build on what you know works.

Putting reusable prompts in `~/.claude/commands/` is a real productivity win. That part was worth discovering.

AI feedback loops push toward more building. Every time I asked Claude to review the system, it suggested improvements. Every suggestion felt reasonable. Every improvement added complexity. The AI will never tell you to stop. You have to decide that yourself.

Git already does decision tracking. Commit frequently with good messages and that's your decision log.

What we ended up with: three global commands installed to `~/.claude/commands/` and `~/.codex/prompts/`:

1. [/update-context](/commands/update-context) extracts permanent learnings and updates CLAUDE.md
2. [/save-session](/commands/save-session) records session history when you want it
3. [/review](/commands/review) runs a comprehensive code review

No framework. No installation per-project. No versions.

## The Aftermath

Once I made the decision I built a cleanup command and removed the AI Context System from every project I'd installed it in. Fifteen projects. Over 1,100 files. 436,000 lines of code, most of it backup directories from migrations between versions I'd already abandoned.

It felt like taking off a heavy backpack I'd forgotten I was wearing.

## The Bottom Line

I spent three months building a complex system to manage AI context. The answer was to just use the context file that already auto-loads.

The journey wasn't wasted. I learned how to use commands effectively, how nested context files work, and how easy it is to keep building when the AI is your only feedback loop.

Now I have three commands, one context file, and no machinery I don't need.

*The podcast episode that sparked this: [Signaling Theory Episode 14](https://sigtheory.com/episodes/sigtheory14/) (January 29, 2026)*
