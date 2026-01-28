---
layout: doc
title: The AI Context System - A Swan Song
---

# The AI Context System: A Swan Song

My vibe coding journey began at the end of September 2025. I had been hearing about Cursor and Claude Code for months, but what really set me over the edge was that two of the smartest, most technical people I know were using Claude Code as their daily driver while building real businesses.

One day I got home and opened [this video](https://www.youtube.com/watch?v=PCvbhY4xV2c). My life changed. But this isn't the story of how AI agents changed my life (that story is still being written). This is the story of how quickly you can veer into a dead end when intoxicated with drastic change.

## The Seed

As I watched that video, I saw Alex Finn create a `CLAUDE.md` file and copy/paste a set of rules into "every new project":

```
Claude Code Rules:
1. First think through the problem, read the codebase for relevant files, and write a plan to tasks/todo.md.
2. The plan should have a list of todo items that you can check off as you complete them
3. Before you begin working, check in with me and I will verify the plan.
4. Then, begin working on the todo items, marking them as complete as you go.
5. Please every step of the way just give me a high level explanation of what changes you made
6. Make every task and code change you do as simple as possible. We want to avoid making any massive or complex changes. Every change should impact as little code as possible. Everything is about simplicity.
7. Finally, add a review section to the todo.md file with a summary of the changes you made and any other relevant information.
8. DO NOT BE LAZY. NEVER BE LAZY. IF THERE IS A BUG FIND THE ROOT CAUSE AND FIX IT. NO TEMPORARY FIXES. YOU ARE A SENIOR DEVELOPER. NEVER BE LAZY
9. MAKE ALL FIXES AND CODE CHANGES AS SIMPLE AS HUMANLY POSSIBLE...
```

My first thought, even before I really started building anything, was "there HAS to be a better way than copy/pasting this into every project." And as I watched Alex Finn copy/paste intermediate versions of planning docs back and forth between Claude Code and ChatGPT I began to think "what if I externalized as much planning and context documentation as possible... then ChatGPT would be able to review all of it. Maybe I would be able to bypass the effects of auto-compacting. Maybe I could make the handoff to other agents easy and avoid the trap of being locked into Claude Code."

The tipping point came after I wrote out a prompt for code reviews for the nth time... why am I rewriting the same thing over and over? 

All of this was solvable.

These were the seeds that eventually grew into the AI Context System. Seeds that grew into 22 commands, 14 agents, and 150KB of shell scripts. Into 1,100 files and 436,000 lines of code across 15 projects.

Seeds that grew into weeds... and weeds that, as of today, I have ripped out of my garden.

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
