# scrolly.to

Marketing site and backend for [scrolly.to](https://scrolly.to) — interactive visual explainers that make complex topics click.

## What This Is

A Next.js app that serves:

1. **Landing page** — Hero, feature marquee, how-it-works walkthrough, gallery of example explainers, open-source install section, email waitlist, and footer
2. **Waitlist API** — `POST /api/waitlist` collects emails in Supabase
3. **Pixel endpoint** — `GET /pixel` logs anonymous views from generated explainers

## Stack

- **Next.js 16** — App Router, React 19, TypeScript
- **Tailwind CSS 4** — `@theme inline` design system
- **Supabase** — PostgreSQL for waitlist + pixel events
- **Fonts** — Instrument Serif (display), Barlow Condensed (headings), DM Mono (code)

## Setup

```bash
npm install
cp .env.local.example .env.local
# Fill in your Supabase credentials
npm run dev
```

### Environment Variables

| Variable | Description |
|----------|-------------|
| `SUPABASE_URL` | Your Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key (server-side only, never exposed to client) |
| `NEXT_PUBLIC_UMAMI_WEBSITE_ID` | Umami analytics site ID (optional) |

### Database

Run the migrations in your Supabase SQL Editor (in order):

- `supabase/migrations/001_create_pixel_events.sql` — pixel event tracking
- `supabase/migrations/002_create_waitlist.sql` — email waitlist

## API Endpoints

### `POST /api/waitlist`

Accepts `{ "email": "user@example.com" }`. Validates server-side, inserts into `waitlist` table. Idempotent on duplicate emails (returns 200, not 409). Returns 503 gracefully if Supabase is not configured.

### `GET /pixel`

```
GET /pixel?s=oss&e=EXPLAINER_UUID&v=1
```

Returns a 1x1 transparent GIF and logs the view to Supabase. No cookies, no PII.

| Param | Description | Values |
|-------|-------------|--------|
| `s` | Source | `oss` (open-source skill) or `hosted` (platform) |
| `e` | Explainer ID | Unique UUID per explainer |
| `v` | Schema version | `1` |

## How It Connects to `/scrolly`

The `/scrolly` Claude Code skill generates interactive HTML explainers. Each one includes:

1. **Analytics pixel** — `<img src="https://scrolly.to/pixel?s=oss&e=UUID&v=1">` (opt-out with `--no-telemetry`)
2. **Attribution footer** — "Built with Scrolly" link (opt-out with `--no-footer`)

## License

MIT
