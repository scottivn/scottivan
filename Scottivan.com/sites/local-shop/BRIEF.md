# Design Brief: Local Shop — Field & Larder

A portfolio-grade demo of a full local specialty-grocer storefront. Lives at `local-shop.scottivan.com`. Audience: small-business prospects evaluating whether to hire us to build their site — the goal is for them to leave thinking "this is more polished than what I have, and they could actually run my shop online."

## Problem

The owner of a neighborhood specialty grocer wants to sell online, take pickup orders, and update inventory daily without paying Shopify a monthly tax. They've seen the templated, sea-of-sameness Shopify storefronts and want something that **feels like their shop** — considered, warm, current. They want a customer to land on the home page and immediately understand: this place cares.

The visiting prospect (a small-business owner browsing the portfolio) needs to feel: *"This is the level I want my own site to operate at, and these people clearly know how to do it."*

## Solution

A photography-forward, light-default storefront with a small dark-mode toggle. A curated home page with a hero, a "this week" freshness module, and a featured-categories grid. A real catalog with search, filters, in-store pickup vs. ship toggle, and proper product detail pages with allergens and stock. A frictionless cart drawer and Stripe-hosted checkout. A customer order-lookup page. An owner-side admin with magic-link auth, product CRUD, photo upload, stock edits, and an order list.

The whole thing should feel like a confident, modern specialty-food brand — closer to a magazine or curated shop than a generic e-commerce template.

## Experience Principles

1. **Photography over prose** — Let the food carry the page. Type and chrome stay restrained so images dominate every above-the-fold composition.
2. **Specific over generic** — Every label, microcopy line, and category name names the actual thing ("Tellicherry peppercorns, 2oz") rather than category-level filler ("Spices"). Trust comes from specificity.
3. **Quiet over loud** — No sales banners, urgency timers, or popups. Calm, considered surfaces — the antithesis of templated Shopify chrome.

## Aesthetic Direction

- **Philosophy:** Modern Artisan — warm, photography-led, characterful display serif over clean sans body. Confident craft.
- **Tone:** Restrained craft. Confident specifics. Short sentences. Lets the work speak. ("Whole grain. Long ferment. Open crumb.")
- **Reference points:**
  - **Tartine Manufactory** (sf) — site & in-store identity, moody lighting, considered photography
  - **Sqirl** (la) — color, voice, embrace of "today only" specificity
  - **Bub & Grandma's** (la) — bread photography style, restraint
  - **Moonshine** (the studio) — typographic restraint
  - **Cereal magazine** — composition, whitespace discipline
- **Anti-references:**
  - Generic Shopify themes (Dawn, Sense, etc.) — sticky banners, identical hero structures
  - Fast-fashion / drop-culture sites — countdowns, urgency, hype
  - Big-box grocery (Whole Foods, Trader Joe's) — corporate, signage-heavy
  - Restaurant sites of the late 2010s — full-bleed video heroes with autoplay

## Brand Identity (Demo)

**Name:** Field & Larder
**Positioning line:** *"A neighborhood pantry. Field-fresh and shelf-considered."*
**Hero copy direction:** Quiet, specific. e.g., "This week: Hudson Valley apricots, our own kraut, fresh focaccia from Mariners' Bakery."

The name and positioning give the catalog a natural split:
- **Field** — produce, prepared foods, dairy & eggs, bread (perishable, fast turnover, "today/this week" framing)
- **Larder** — oils & vinegars, pasta & grains, jams & ferments, coffee & tea, salts & spices, sweets (shelf-stable, gift-able)

This split is reflected in nav, filters, and homepage modules.

## Existing Patterns

The monorepo has three established sites with distinct vocabularies — `local-shop` should be visually distinct from all of them while staying within the same toolchain.

| Site | Existing vocabulary | What we borrow / avoid |
|---|---|---|
| `portal` (scottivan.com) | Dark, neon-accent, JetBrains Mono | Avoid — completely different register |
| `me` (me.scottivan.com) | Terminal-personal, Bricolage display + DM Sans + JetBrains Mono | Avoid — different voice |
| `modern-brochure` | Cream/ink editorial, Georgia serif, single warm orange (#E8552D) accent | Borrow philosophy of restraint; differentiate via **darker, deeper palette** and a more characterful display serif |

**Conventions reused:**
- Next.js 14 App Router with `output: "export"` static export
- Tailwind v3 with site-local `tailwind.config.ts`
- Framer Motion for tasteful page-level transitions and cart drawer (matches `sites/portal/src/components/ContactModal.tsx` motion patterns)
- Formspree contact form pattern (`sites/portal/src/components/ContactModal.tsx`) for `/contact` until our own backend covers it
- CloudFront URL-rewrite function pattern from `/tmp/url-rewrite.js` (drafted earlier this session) — applied at distribution creation

**Typography (new for this site):**
- Display: **Fraunces** (variable, Google Fonts) — characterful, slightly bookish, sized & weighted variably for hero / section titles
- Body: **Inter** (variable, Google Fonts) — workhorse, clean, sets at 16/24
- Mono (price tickers, order numbers, code-like labels): **JetBrains Mono** (already in monorepo)

**Color palette (light mode default):**
- `--bg`: `#F5EBD9` buttercream (page surface, warm)
- `--surface`: `#FFFFFF` (card surfaces over the buttercream)
- `--ink`: `#1A130C` near-black with warm undertone
- `--ink-2`: `#52443A` warm gray for secondary text
- `--rule`: `#E5D8C3` warm divider
- `--accent`: `#C25E2A` clay (a warmer, more natural cousin to modern-brochure's #E8552D — clearly distinct)
- `--accent-soft`: `#F5DCC9` clay-tint for hover/badge backgrounds
- `--success`: `#5C7A4F` muted leaf green (in-stock, paid)
- `--warn`: `#B5882A` mustard (low stock)
- `--danger`: `#A84432` brick (out of stock, errors)

**Color palette (dark mode):**
- `--bg`: `#1A130C` espresso
- `--surface`: `#241A11` lifted espresso
- `--ink`: `#F5EBD9` buttercream
- `--ink-2`: `#C9B89B` warm cream-gray
- `--rule`: `#3B2D20`
- `--accent`: `#D8743D` (slightly brighter clay so it survives dark)
- All other tokens stay structurally parallel

**Spacing scale:** 4-based — `4, 8, 12, 16, 24, 32, 48, 64, 96, 128`. Generous whitespace: most sections breathe at `py-24` or `py-32`.

**Type scale (display sizes use Fraunces, all others Inter):**
- `display-1`: 64–88px, Fraunces, `optical-sizing: auto`, weight 400, tracking -0.02em
- `display-2`: 48–56px, Fraunces, weight 400
- `h1`: 36–44px, Fraunces, weight 500
- `h2`: 28px, Inter, weight 600, tracking -0.01em
- `h3`: 20px, Inter, weight 600
- `body`: 16/24, Inter, weight 400
- `small`: 14/20, Inter, weight 400
- `eyebrow`: 12px, Inter, weight 600, tracking 0.12em, uppercase
- `mono-tag`: 12–14px, JetBrains Mono, weight 500

## Component Inventory

| Component | Status | Notes |
|---|---|---|
| Header / Nav | New | Logotype left ("Field & Larder" in Fraunces), nav center (Shop / Visit / About), cart-icon + dark-mode toggle right. Sticky on scroll with backdrop blur. |
| Footer | New | Hours, address, contact, policies, mailing list signup, IG link. Three-column on desktop, stacked on mobile. |
| Hero (home) | New | Single full-width photo + restrained type overlay or photo-left, type-right (responsive). Display-1 with current week's specifics. |
| "This Week" module | New | Horizontally scrollable card row of currently-available perishables. Subtle "today only / this week / restocked" tags. |
| Categories grid (home) | New | 6-tile grid: Field side (Produce, Prepared, Bread, Dairy & Eggs) and Larder side (Pantry, Sweets). Image + label, hover lifts subtly. |
| ProductCard | New | Photo (4:5 ratio), name in Fraunces, price in mono, optional eyebrow tag (e.g., "Today only", "New"). |
| ProductDetail | New | Gallery left, info right on desktop. Allergens, sourcing notes, stock indicator, qty stepper, add-to-cart, pickup/ship toggle. |
| Category nav (shop page) | New | Sidebar on desktop, drawer-triggered on mobile. Two parent groups (Field, Larder) with sub-categories. |
| FilterBar | New | Inline pills above grid: price range, dietary tags (gluten-free, vegan, etc.), in-stock-only, pickup-eligible. |
| SearchInput | New | Icon-button in header expands to full-width input on mobile, inline expansion on desktop. |
| CartDrawer | New | Slide-in from right (Framer Motion), line items with thumbnails, qty steppers, totals, pickup/ship toggle, checkout CTA. |
| CartLineItem | New | Compact horizontal row, used in drawer + cart page. |
| StockBadge | New | Three states: "In stock" (success), "Low stock — N left" (warn), "Sold out" (danger). |
| StripeCheckout button | New | Disabled when cart empty, shows trust badge ("Secured by Stripe") below. |
| OrderConfirmation | New | Hero number, line items, pickup-vs-ship details, "save this order ID" prompt. |
| OrderLookupForm | New | Two-field form (order #, email), inline error states. |
| AdminLogin | New | Single-input email form, "we sent you a link" success state. |
| AdminShell | New | Sidebar nav (Dashboard / Products / Orders / Sign out), top bar with current admin email. |
| AdminProductTable | New | Sortable table with inline stock-edit; bulk-restock action. |
| AdminProductForm | New | Photo upload (drag-drop to S3), name, price, stock, category, tags, allergens, description (markdown). |
| AdminOrderTable | New | List with status (paid / fulfilled / cancelled), customer info, click-through to detail. |
| ContactForm (existing pattern) | Reuse | Mirror `sites/portal/src/components/ContactModal.tsx` Formspree wiring on `/contact` page. |
| DarkModeToggle | New | Header icon-button. Toggles `data-theme` on `<html>`; tokens drive everything. Persists to localStorage. |

## Key Interactions

**Add to cart (product detail):**
- User selects qty, clicks "Add to cart". Button briefly shows ✓ check, cart icon in header increments with a subtle scale pulse, cart drawer slides in from right (200ms easeOut). Drawer auto-closes after 4s of no interaction or stays if user hovers.

**Search (header):**
- User clicks search icon → input expands inline (desktop) or full-width (mobile). Typing fetches matches client-side from a static index built at deploy time. Results appear below input as a list with thumb + name. Hitting enter goes to `/shop?q=`.

**Pickup vs Ship toggle:**
- Two-state segmented control on cart drawer, cart page, and checkout. Switching ship → pickup zeros out shipping line. Switching pickup → ship reveals shipping address fields. Toggling animates the totals row count up/down.

**Checkout:**
- User clicks Checkout → button enters loading state → frontend POSTs cart to `/api/checkout` Lambda → receives Stripe session URL → redirects to Stripe-hosted checkout. On return, lands on `/order/confirmed?session_id=...` which fetches details from `/api/orders/by-session/{id}`.

**Admin magic-link login:**
- Owner enters email → "Check your inbox" success state. Email contains link with token. Clicking link hits `/api/admin/auth?token=` which validates, sets httpOnly JWT cookie, redirects to `/admin`. Tokens single-use, 15-min expiry.

**Stock edit (admin):**
- Inline stock cell in product table — click number, it becomes editable input. Blur or Enter persists via PATCH; cell briefly flashes success green. Errors shake + revert to previous value.

## Responsive Behavior

- **Mobile (< 640px):** Single column. Header collapses to logo + cart + menu (drawer for nav). Product grid: 2-col. Hero: photo-on-top, copy-below. Cart drawer becomes near full-screen sheet from bottom on iOS-feeling sizes.
- **Tablet (640–1024px):** Product grid: 3-col. Sidebar category nav becomes a top filter bar. Two-up product detail.
- **Desktop (≥ 1024px):** Product grid: 4-col. Sidebar category nav fixed left on `/shop`. Cart drawer: 480px wide overlay from right.
- **Wide (≥ 1440px):** Container caps at 1280–1360px, generous side gutters. Hero photography can bleed full-width.

Touch targets ≥ 44×44 throughout. Hover states never the only affordance.

## Accessibility Requirements

- WCAG 2.2 AA contrast for body and interactive surfaces (verified against the token palette in both modes — clay accent #C25E2A on buttercream #F5EBD9 needs validation; will adjust if it falls short on small text).
- Full keyboard nav. Visible 2px focus ring (`--accent`) on all interactive elements; never `outline: none` without a replacement.
- All product photos have meaningful alt text in the form "<product> — <short visual description>" (admin form requires alt).
- Cart drawer is a focus-trapped dialog; Escape closes; returns focus to invoker.
- Stock badges and price changes use both color **and** text/icon — color is never the only signal.
- Magic-link login does not rely on JS — link is a plain GET URL.
- Reduced motion: respect `prefers-reduced-motion` for cart drawer, hover lifts, and any scroll-linked animation.

## Out of Scope (this build)

- Real customer accounts (sign-in, order history, saved addresses) — guest checkout only via Stripe; the owner is the only authenticated user.
- Real-time inventory across multiple physical locations — single-store demo.
- Subscription / recurring orders — Stripe Checkout one-shot only.
- Fulfillment / shipping label generation — orders sit in DynamoDB; admin marks fulfilled manually.
- Tax calculation beyond what Stripe Checkout's automatic-tax handles in the demo region.
- Internationalization — English/USD only.
- A native mobile app, PWA install prompts, or push notifications.
- SEO blog / content marketing pages beyond `/about`.
- Photography commissioning — placeholder photography sourced from Unsplash + AI generation; replaceable per real client.

---

*This brief drives Phase 0–7 of the Local Shop build plan at `/Users/scottivan/.claude/plans/peppy-skipping-penguin.md`. The next step is the design-tokens skill, which converts the palette/type/spacing decisions above into `sites/local-shop/src/styles/tokens.css` and Tailwind theme extensions.*
