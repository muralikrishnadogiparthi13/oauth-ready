# Composio APM - Integrations: take-home brief (copied 2026-10-28)

Problem: A developer building an AI agent wants their users to connect an app. Before launch they may need to create an OAuth app with the provider and get it approved. Today devs piece together docs, unfamiliar setup flows, and email providers. Hard to tell if setup takes an hour or weeks of waiting, how much work, or what blocks approval.

Assignment: Build a working experience that gives developers and agent builders clear, actionable guidance for setting up an OAuth app and getting it approved. Know where to start, what next, time/effort, how to proceed at a blocker.
Goal = a library of ready-to-use guides for 100 OAuth apps; a developer can also submit the name or website of any app; an agent investigates and generates a shareable guide in real time (incl. apps outside the library). For the take-home: a few varied apps + the live generation flow; not all 100.

A developer should understand:
- How easy or difficult it is to get their OAuth app ready for use.
- Likely time and effort, including any wait for approval.
- Requirements and nuances that could affect setup.
- What an agent can do for them and where they need to take over.
Use agents to investigate and attempt as much of the setup as practical. Let discoveries shape guidance. Be clear about what you tested, what sources support, and what remains uncertain.

Start: understand what a provider OAuth app is and how it relates to a developer's integration and their users' connections (https://docs.composio.dev/toolkits/managed-auth). Choose a focused scope and explain why.

Show us it works:
1. Demo on a few real apps with different setup challenges; they'll submit an unfamiliar app and watch the agent generate its guide live.
2. Check a sample of the guidance against real sources or setup attempts; show what was learned, corrected, or could not be verified.
3. Submit a link to the working experience + source repo + short README (setup, key decisions, limitations).
Judged on: understanding of the developer's problem, useful guidance, sound judgment about evidence, thoughtful use of agents.
Budget 6-8h. No paid accounts / provider approvals / production needed. Keep credentials out.
Submit: https://forms.gle/uHLgNSe7C8GtqE3w8
