# Guide JSON schema (one file per app: guides/<slug>.json)

{
  "slug": "spotify",
  "name": "Spotify",
  "website": "https://developer.spotify.com",
  "category": "Music / media",
  "one_liner": "Instant in dev mode for up to 25 users; going public needs a quota extension review.",
  "difficulty": "easy | moderate | hard | very_hard",
  "difficulty_reason": "one sentence",
  "time_to_first_test": "e.g. 10-15 minutes",
  "time_to_production": "e.g. 2-6 weeks (review wait)",
  "approval": {
    "required_for": "what triggers review (scopes / user count / public listing)",
    "who_reviews": "provider team / marketplace",
    "typical_wait": "as stated by provider, else 'not published' (+ community reports labelled as such)",
    "cost": "free / paid assessment $X / unknown"
  },
  "account_prerequisites": ["developer account type", "business entity?", "verified domain?", "privacy policy URL?", ...],
  "steps": [
    {"title": "...", "detail": "...", "who": "you | agent | either", "url": "official page"}
  ],
  "nuances": ["redirect URI rules, scope tiers, token expiry/refresh, per-tenant/instance apps, rate limits, etc."],
  "blockers": [{"blocker": "...", "how_to_proceed": "..."}],
  "agent_can_do": ["concrete things an agent can do: draft privacy policy, fill form fields, generate redirect URIs, check scopes..."],
  "you_must_do": ["things only a human/legal entity can do: identity/business verification, payment, legal sign-off..."],
  "composio_note": "Whether Composio offers managed OAuth for this toolkit (per docs.composio.dev/toolkits/managed-auth) and when you'd still bring your own (white-label consent screen, own rate limits, unsupported scopes).",
  "sources": [
    {"title": "...", "url": "...", "quote": "short verbatim line that supports a claim", "supports": "which claim"}
  ],
  "verification": {
    "checked_on": "2026-10-28",
    "method": "Read official docs listed in sources; no provider account created",
    "verified": ["claims directly supported by an official source quote"],
    "inferred": ["claims reasoned from docs but not stated outright"],
    "could_not_verify": ["e.g. real review wait times not published"],
    "corrections": ["anything that commonly-repeated advice gets wrong, found while checking"]
  },
  "last_updated": "2026-10-28"
}

Rules: official provider docs first. Every number (user caps, wait times, costs) must have a source quote or be labelled inferred / not published. Community anecdotes only if labelled "community report" with link. No em dashes. Plain, direct language for a developer.
