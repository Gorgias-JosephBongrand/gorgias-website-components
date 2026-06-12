# Gorgias Design System

Code-first Webflow design system. The repo is the source of truth — Webflow is the canvas.

## Architecture

```
src/
  tokens/
    brand.css       ← @theme {} — canonical token source of truth
    brand.ts        ← TS mirror for JS/dataLayer/Variables API scripting
  globals.css       ← Tailwind + token imports, injected into every shadow root
  globals.ts        ← Webflow globals decorator (referenced in webflow.json)
  components/
    ui/             ← Base components (Button, Badge, …)
    pricing/        ← Pricing page sections
preview/            ← Next.js app → deploy to Vercel for visual testing
webflow.json        ← Webflow CLI config
webpack.webflow.js  ← shadcn path alias (@)
```

## Prerequisites

- Node ≥ 22.13.0 (see `.nvmrc`)
- Webflow CLI: `npm install -g @webflow/cli`
- Webflow Workspace plan that supports Libraries / Code Components
- Admin or Owner role on the Workspace

## Setup

```bash
# 1. Install root deps (Webflow CLI, Tailwind, React types)
npm install

# 2. Auth with Webflow
webflow auth login

# 3. Start local dev server (serves components into the Designer)
npm run dev
```

## Vercel preview

The `preview/` directory is a standalone Next.js app for visual testing.

```bash
cd preview
npm install
npm run dev        # localhost:3000
```

**Deploying to Vercel:**
1. Push this repo to GitHub
2. Import in Vercel dashboard
3. Set **Root Directory** → `preview`
4. Framework preset: Next.js — done

Vercel previews validate SSR parity (Webflow SSRs code components by default) and serve as the migration-readiness proof from Story 4.

## Webflow Variables sync

`src/tokens/brand.ts` exports `webflowVariables` — a flat array ready to POST to the [Variables API](https://developers.webflow.com/data/reference/designer/variables/). Use this to keep the Webflow Variable collection in sync with the repo's `@theme {}` without manual edits in the Designer.

## Component naming rules

> ⚠️ A `.webflow.tsx` filename is a stable identifier. Renaming it creates a new component in Webflow and silently breaks every existing canvas instance that used the old name.

- Name files after what they render: `PricingCard.webflow.tsx`, not `card.webflow.tsx`
- Never rename a `.webflow.tsx` that has been shared to a Workspace Library

## Shadow DOM rules

Site Webflow **classes** do not cross the shadow boundary. Brand **Variables** (`var(--token)`) do.

- ✅ Use `var(--color-brand-primary)` in component styles
- ❌ Don't rely on site-level CSS classes inside components
- Embeds that self-inject via `document.querySelector` (HubSpot forms, chat widgets) must live in **slots** or **native wrappers** — never inside the shadow tree
- Anchor / targeting IDs belong on the host element or in a slot

## Tracking

Interactive components emit `dataLayer` events via a `ctaId` prop:

```ts
dataLayer.push({ event: "cta_click", cta_id: ctaId })
```

This keeps GTM working across the shadow boundary. GTM CSS-selector triggers cannot pierce a shadow root — component-emitted dataLayer events are the fix.

## Sharing to Webflow

```bash
npm run share   # runs: webflow library share
```

Install the shared Library in the target Webflow site via the Designer → Assets → Libraries.

## Adding a new component

1. Create `src/components/{category}/{Name}/{Name}.tsx`
2. Create `src/components/{category}/{Name}/{Name}.webflow.tsx` with `declareComponent()`
3. Run `npm run dev` — the Designer picks it up automatically
4. Test in the preview app first: `cd preview && npm run dev`
