# OAuth Ready

**Live:** https://oauth-guides.muralikd.workers.dev

How long until your users can connect an app? Type an app, get a guide for registering an OAuth app with that provider and getting it approved: the steps, the wait, what can block approval, what an agent can do for you, and the evidence behind every claim.

Built for the Composio APM, Integrations take-home (brief in `BRIEF.md`).

## The developer's problem, as I read it

A developer building an agent knows *what* they want their users to connect. What they don't know is the shape of the path before launch:

- Is this a 15-minute form or a 6-week review?
- Is there a gate I can't pass at all (a user cap, a business-entity check, a paid security assessment)?
- Do I need one app, or does every customer have to set something up on their side?
- Which parts can I hand to an agent, and which need a human or a legal entity?

Docs answer these in pieces, scattered across developer docs, help centers and policy pages, and they rarely say how long review takes. So each guide leads with **difficulty, time to a first test, time to real users, and cost**, then the steps, and it says plainly when a provider doesn't publish a number instead of guessing one.

The Composio angle matters too. Of the **382 Composio toolkits that use OAuth, 258 need you to bring your own OAuth app** (no managed app), and for the other 124 you still bring your own when you want your name on the consent screen, custom scopes or your own rate limits (per `docs.composio.dev/toolkits/managed-auth`). Every guide says which case applies. The data comes from Composio's public `docs/public/data/toolkits.json`, so the search box autocompletes all 382.

## Scope: why these six apps

I picked apps for the *setup pattern* they represent, not popularity. Together they cover the main paths a developer will hit:

| App | Pattern | Difficulty |
|---|---|---|
| GitHub | Self-serve, no review; only per-org approval | Easy |
| Slack | Self-serve to distribute; review only to list (and to lift new rate limits) | Moderate |
| Shopify | Instant per store; public app needs App Store review | Hard |
| ServiceNow | No central app at all; every customer's admin registers your client | Hard |
| Google (Gmail) | Restricted scopes: verification plus a paid annual security assessment | Very hard |
| Spotify | Dev mode user cap; public access needs Extended Quota, now limited to large orgs | Very hard |

Anything outside the library goes to the live agent.

## How it works

**Reviewed guides** (`guides/*.json`) were researched by parallel research agents, one per app, reading official docs only, then checked by hand (below).

**Live agent** (`worker/src/index.js`, Cloudflare Worker + Workers AI, `gpt-oss-120b`) for any other app:

1. Checks Composio's toolkit list: managed or bring-your-own.
2. Finds the provider's official docs domain, then searches **only inside it** (an early version wandered into Google and Atlassian docs when asked about Notion).
3. Reads the most relevant pages, plus Composio's toolkit page for that app.
4. Drafts the guide with the model, which must copy an exact supporting quote for every concrete claim.
5. **Checks every quote in code** against the page it cites. Quotes that don't appear are flagged on the page and moved to "could not verify". The model is never trusted to say its own evidence is good.
6. Saves the result so the link is shareable (`/g/<app>`), with a "Re-run agent" button.

Progress streams to the page as the agent works, so you can watch it search, read and check.

## What I checked, corrected, or could not verify

Full log: `VERIFICATION.md`. Tools: `tools/verify-quotes.mjs` (raw fetch) and `tools/verify-rendered.mjs` (headless Chromium).

- 158 quotes across the six reviewed guides were re-fetched and string-matched against their source pages, independent of the agents that wrote them.
- Pages that render client-side or block scripts (ServiceNow docs, some Composio and Google pages, tables) were re-checked by rendering or reading them in full. After that, every remaining quote is supported.
- **Corrections from the check:** one quoted list of Composio's default GitHub scopes was not on the cited page, so I removed it and marked it unverified; one ServiceNow line was a paraphrase, so I replaced it with the exact sentence.
- **Notable things the research surfaced** that common advice gets wrong or out of date: Spotify's development mode now allows 5 users (cut from 25 in a February 2026 change; existing apps are grandfathered) and Extended Quota is only for organizations with 250k+ MAU; Slack apps outside the Marketplace get a 1 request/minute cap on `conversations.history`; Google's 6-week restricted-scope estimate is not guaranteed, and the CASA assessment by a third-party lab likely adds time on top (inferred; marked as such in the guide).
- **Could not verify:** real review wait times where providers don't publish them (Slack, Shopify, Spotify partner approval), and anything that would need an actual setup attempt.

I did **not** create provider accounts or attempt real setups (the brief says no paid accounts or approvals are needed). The guides say so, and the "agent can do / you must do" split is based on what the docs require, not on a run-through.

## Running it

```bash
cd worker
npx wrangler kv namespace create GUIDES   # put the id in wrangler.toml
npx wrangler deploy                       # serves ../site and the API
node ../tools/verify-quotes.mjs           # from the repo root: re-check reviewed guides
```

No API keys or credentials are needed. Workers AI and KV come from the Cloudflare account. The free AI quota is protected by a per-IP and a daily cap on live generations; library guides always work.

## Limitations

- **Live guides are drafts.** A free open model writes them from 6 to 7 pages. The quote check catches invented evidence, not every wrong inference. They are labelled "Agent-generated, not reviewed".
- **Search depends on DuckDuckGo's lite endpoint** (the regular one blocks Cloudflare IPs). A paid search API would be steadier.
- **Docs that render only with JavaScript** (ServiceNow) can't be read by the live agent's fetcher. It falls back to other pages and says less.
- Wait times are as published by providers. Real-world waits need data from actual submissions.

## What I'd build next

1. **Fill the library to 100** from Composio's own list, starting with the 258 bring-your-own toolkits, ranked by how often users try to connect them.
2. **Re-verify on a schedule:** the quote checker already exists, so run it weekly and flag guides whose sources changed. Policies move (Spotify changed its rules in May 2025 and again in February 2026).
3. **Let the agent do more of the setup:** pre-fill the provider's app registration form with the right redirect URI and scopes for Composio, and draft the privacy policy and review-video script that Google and Slack ask for.
4. **Real wait times:** ask developers who connect through Composio when they submitted and when they were approved, and show the distribution next to the provider's estimate.
