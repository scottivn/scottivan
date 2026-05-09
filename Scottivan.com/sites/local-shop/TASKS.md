# Build Tasks: Field & Larder (Local Shop)

Generated from: `sites/local-shop/BRIEF.md`
Master plan: `/Users/scottivan/.claude/plans/peppy-skipping-penguin.md`
Aesthetic philosophy: **Modern Artisan** — warm, photography-led, characterful display serif over clean sans.

Each task below is a vertical slice (structure + styling + interaction together). Tasks are ordered so that the site is deployable mid-flight after each major checkpoint.

---

## Foundation (Phase 1)

- [ ] **Scaffold `sites/local-shop` from `_template`**: Run `bash scripts/add-model.sh local-shop`, then update `package.json` name to `@scottivan/local-shop`, install `framer-motion`, `zustand`, `lucide-react`, `clsx`. Wire `next/font/google` for **Fraunces** + **Inter** in `src/app/layout.tsx`. Import `src/styles/tokens.css` and `src/styles/globals.css` from layout. Verify `npm run dev` shows a buttercream page with Inter body type. _New site._
- [ ] **Add Local Shop entry to `/models.json`**: Append a 4th entry with `slug: "local-shop"`, `status: "coming-soon"` initially (flip to `"live"` after first publish). Capture `tagline`, `description`, `bestFor`, `screenshot` per the brief's brand identity. _Modifies: `/models.json`._
- [ ] **Site chrome — Header & Footer**: Header with logotype "Field & Larder" (Fraunces 700), center nav (Shop / Visit / About), right-side cluster (Search icon, Cart icon w/ badge, DarkModeToggle). Sticky on scroll with backdrop blur. Footer with hours, address, contact, policies, mailing-list signup, IG link — three-column desktop, stacked mobile. Both consume tokens via Tailwind utilities (`bg-bg`, `text-ink`, etc.). _New components: `Header`, `Footer`, `Logotype`._
- [ ] **DarkModeToggle**: Icon-button in header, toggles `data-theme` on `<html>`, persists to localStorage with key `local-shop-theme`. Reads system preference on first paint to avoid flash. Sun/Moon icon swap with rotation transition. _New component._
- [ ] **Shared UI primitives**: `Button` (variants: primary clay, secondary outlined-walnut, ghost), `Input`, `Badge` (variants: success / warn / danger), `IconButton`, `SegmentedControl` (used for pickup/ship toggle). All consume tokens; no hardcoded colors. _New components in `src/components/ui/`._

**Checkpoint A — site shell shipped:** layout works in light + dark, header/footer render, "Coming soon" body content. Deploy + verify URL routing (`/about`, `/visit`, `/shop` placeholders return 404 → custom `404.html`).

---

## Core UI — Public Storefront (Phase 2)

- [ ] **Home — Hero**: Full-width photography (4:5 mobile, 16:9 desktop) with restrained type overlay using `display-1` Fraunces. Subhead in Inter body. Two CTAs ("Shop the Larder", "Visit us"). Includes "this week" eyebrow tag in `mono-tag` style. _New component: `HomeHero`._
- [ ] **Home — "This Week" module**: Horizontal scroll-snap row of 6–8 currently-available perishables. Each tile shows photo + name + mono-styled price + tag ("Today only" / "Just baked" / "Limited"). Mobile = full-bleed scroll, desktop = padded. Uses `ProductCard` in compact mode. _Depends on: ProductCard._
- [ ] **Home — Categories grid**: 6-tile grid (Field side: Produce, Prepared, Bread, Dairy & Eggs; Larder side: Pantry, Sweets) with image + label + arrow. Subtle hover lift via Framer Motion. _New component: `CategoryTile`._
- [ ] **Home — Story / brand block**: Two-up section (photo + ¶ of restrained-craft copy + link to `/about`). Establishes voice. _New component._
- [ ] **Home — Hours strip**: Before footer; today's hours highlighted, link to `/visit` for full schedule. _New component: `HoursStrip`._
- [ ] **Static catalog seed**: Build `src/data/products.ts` with ~40 hand-written products across all categories — names, prices, descriptions, allergens, tags, stock. (This will move to DynamoDB in Phase 6 admin work; for Phase 2 it's a typed const so the storefront feels real without backend.) _New file._
- [ ] **`ProductCard` component**: Photo (4:5 ratio with `object-cover`), name in Fraunces `h3`, price in `font-mono`, optional eyebrow tag, optional `StockBadge`. Hover: subtle scale + accent-soft underline on title. Compact and full variants. Click → product detail. _New component._
- [ ] **`StockBadge` component**: 3 states (In stock / Low stock — N left / Sold out) with color + icon + text — color is never the only signal. _New component._
- [ ] **Shop catalog page (`/shop`)**: Sidebar category nav (desktop) / drawer (mobile) with Field & Larder parent groups + sub-categories. Grid of `ProductCard` (4-col desktop / 3-col tablet / 2-col mobile). FilterBar above grid: price range, dietary tags, in-stock-only, pickup-eligible. Sort menu (newest / price asc / price desc / name). Empty state ("No matches — try clearing filters"). _New page + components: `CategoryNav`, `FilterBar`, `SortMenu`._
- [ ] **Search**: Header search-icon expands inline (desktop) / full-screen sheet (mobile) with debounced client-side fuzzy search across `products.ts` (Fuse.js or hand-rolled match). Results show thumb + name + category. Enter → `/shop?q=...`. _New component: `SearchPanel`._
- [ ] **Product detail page (`/shop/[slug]`)**: Static-generated for every product slug. Gallery left (with thumb strip), info right on desktop; stacked on mobile. Fraunces title, mono price, `StockBadge`, allergens chip row, sourcing notes paragraph, qty stepper, **Add to cart** button, pickup/ship toggle. Below: 2–3 "You might also like" cards. _New page + components: `ProductGallery`, `QtyStepper`, `AllergenChips`._
- [ ] **Cart store (Zustand + localStorage)**: `useCart()` with `items`, `addItem`, `removeItem`, `updateQty`, `setFulfillment` (pickup/ship). Persists to `localStorage["local-shop-cart"]`. Hydration-safe (no mismatch warnings). _New file: `src/lib/cart.ts`._
- [ ] **`CartDrawer`**: Right-slide drawer (Framer Motion, 200ms easeOut, focus trap, Escape to close). Line items via `CartLineItem` with thumbnails + qty steppers + remove. Totals row, pickup/ship `SegmentedControl`, "Checkout" button (disabled when empty). Auto-opens on add-to-cart, auto-closes after 4s of no interaction unless hovered. Reduced-motion respected. _New component._
- [ ] **Cart page (`/cart`)**: Fuller layout of the same data (drawer for quick edits, page for considered review). Order summary card sticky on right desktop. Empty state with "Browse the shop" link. _New page._

**Checkpoint B — full browsing demo shippable:** browse, search, filter, add to cart, see totals. No checkout yet — Checkout button can route to `/checkout-coming-soon` placeholder.

---

## Local-Business Essentials (Phase 3)

- [ ] **`/visit` page**: Hours table (highlighting today), full address, embedded static map (Mapbox Static API free tier — fallback to OSM), parking notes, accessibility notes, "Get directions" button. _New page._
- [ ] **`/about` page**: Long-form story with serif `display-2` headline, two-column body+photo blocks. Three sections: Our story / Our growers & makers / Our team. Photo treatment matches Modern Artisan reference points. _New page._
- [ ] **`/contact` page + form**: Reuses Formspree pattern from `sites/portal/src/components/ContactModal.tsx` but as a full page. Same `xykblgpy` endpoint or new endpoint TBD. Subject dropdown (general / wholesale / press / catering). Honeypot + success state. _New page; reuses Formspree integration pattern._
- [ ] **`/policies` page**: Anchor-linked sections (Shipping, Returns, Allergens, Store policies, Privacy). `prose` typography. _New page._

**Checkpoint C — full local-business site shippable.** All public-facing content present; site can stand on its own as a brochure even before Stripe is wired.

---

## Backend Infrastructure (Phase 4 prerequisite)

- [ ] **CloudFormation `infra/local-shop.yml`**: DynamoDB tables (`local-shop-products`, `local-shop-orders`, `local-shop-admin-tokens` with TTL on tokens). Lambda functions (`checkout`, `stripe-webhook`, `orders-by-session`, `orders-lookup`, `admin-login`, `admin-auth`, `admin-products-*`, `admin-orders-*`). API Gateway HTTP API with routes mapped to lambdas. SES verified-identity (use existing if available, else add). IAM roles per Lambda — least privilege per table/Stripe key. CloudWatch log retention 14 days. _New file._
- [ ] **Lambda repo `lambdas/local-shop/`**: TypeScript, `esbuild` bundler, shared `types.ts` (Product, Order, CartItem, OrderStatus). One handler file per route. Local dev via `sam local invoke` or thin lightweight harness. _New directory._
- [ ] **Extend `scripts/deploy-model.sh`**: If `infra/${MODEL}.yml` exists, run `aws cloudformation deploy` with capabilities for IAM. Pass through Stripe secret key + JWT secret + admin email allowlist as parameters from environment. _Modifies existing script._
- [ ] **Extend `scripts/publish-model.sh`**: If `lambdas/${MODEL}/` exists, run `npm run build --workspace=@scottivan/lambdas-${MODEL}` and `sam deploy` for the lambdas before the static site sync. _Modifies existing script._
- [ ] **Seed products in DynamoDB**: One-shot script `scripts/seed-local-shop.ts` that takes the typed const from Phase 2 and writes each product to DynamoDB. After this runs, the storefront can switch from importing the const to fetching at build time. _New file._

---

## Stripe Checkout Flow (Phase 4)

- [ ] **`POST /api/checkout` Lambda**: Accepts cart payload, validates each line against DynamoDB stock, creates Stripe Checkout session (test mode) with line items + shipping options + customer email collection, returns `{ url, sessionId }`. Writes a pending intent record. _New Lambda._
- [ ] **Frontend checkout submit**: Cart drawer + cart page Checkout button POSTs to `/api/checkout` and `window.location.assign(url)`. Loading state on the button; failure shows inline error. _Modifies: CartDrawer, /cart page._
- [ ] **`POST /api/stripe-webhook` Lambda**: Verifies signature with `STRIPE_WEBHOOK_SECRET`. On `checkout.session.completed`: write order to `local-shop-orders` (orderId derived from session, email, items, total, fulfillment, status `paid`). Idempotent (skip if already written). _New Lambda._
- [ ] **Order confirmation page (`/order/confirmed`)**: Reads `?session_id=` from URL, calls `GET /api/orders/by-session/{id}` Lambda. Hero order number in mono, line items, total, pickup-vs-ship details, "save this order ID + your email to look up later" prompt. Print-friendly. _New page + Lambda._

**Checkpoint D — real test-mode payments working end-to-end.** Use Stripe test card `4242 4242 4242 4242`. Confirm DynamoDB row. Confirm confirmation page renders details.

---

## Order Lookup (Phase 5)

- [ ] **Order lookup page (`/orders/lookup`)**: Two-input form (order # + email). On submit calls `GET /api/orders/lookup?orderId=&email=`. Shows the same layout as the confirmation page on success; inline error on mismatch. Rate-limit feedback ("Try again in 30s") on too-many-attempts. _New page._
- [ ] **`GET /api/orders/lookup` Lambda**: Reads `local-shop-orders` by orderId, returns 404 if not found, returns the order only if email (case-insensitive) matches the stored email. Throttles via API Gateway. _New Lambda._

**Checkpoint E — customer self-service complete.** Customer can place an order, find it again later.

---

## Admin Panel (Phase 6)

- [ ] **Magic-link auth backend**: `POST /api/admin/login` accepts email, checks against `ADMIN_EMAIL_ALLOWLIST` env var, generates signed token (15-min expiry, single-use), writes to `local-shop-admin-tokens` with TTL, sends magic-link email via SES with branded HTML template (Field & Larder). `GET /api/admin/auth?token=` validates token (single-use → delete), sets httpOnly+SameSite=strict JWT cookie (12h), redirects to `/admin`. Plain-GET URL works without JS. _New Lambdas._
- [ ] **`/admin/login` page**: Single email input, "Send me a link" submit, success state ("Check your inbox"). Failure state for non-allowlisted emails (intentionally vague: "If that email is on the allowlist, we sent a link."). _New page._
- [ ] **Admin auth gate**: Client-side guard component that checks for JWT cookie via a tiny `GET /api/admin/me` endpoint at mount; redirects to `/admin/login` if missing/expired. Admin pages all use this layout. _New component + Lambda._
- [ ] **`AdminShell`**: Sidebar nav (Dashboard / Products / Orders / Sign out), top bar with current admin email and dark-mode toggle. Sign-out POSTs to `/api/admin/logout` to clear cookie. _New component._
- [ ] **`/admin` dashboard**: Today's orders count + revenue, low-stock alerts list (products with stock ≤ threshold), 7-day trend mini-chart (orders by day). Static charting (e.g., handmade SVG sparkline — no heavy library). _New page._
- [ ] **`/admin/products` list**: Sortable table (name, category, price, stock, status). Inline stock-edit cell — click → input → enter/blur saves via PATCH; success flash, error shake-and-revert. Search box + category filter. "+ New product" CTA. _New page; Lambdas: `GET /api/admin/products`, `PATCH /api/admin/products/{id}/stock`._
- [ ] **`/admin/products/new` and `/admin/products/[id]`**: Form with all product fields (name, category, slug, price, stock, allergens multi-select, dietary tags multi-select, description markdown, pickup-eligible toggle, ship-eligible toggle). Photo upload component drag-drops to a `POST /api/admin/products/{id}/upload` Lambda that gets a presigned S3 PUT URL and uploads from the browser. Multiple photos with reorder + alt text required. Save as draft / publish. Delete with confirm. _New pages; Lambdas: `POST /api/admin/products`, `PUT /api/admin/products/{id}`, `DELETE`, presigned upload._
- [ ] **`/admin/orders` list + detail**: Table of orders with status pill (paid / fulfilled / cancelled), customer email, total, fulfillment, date. Click row → detail page with line items, customer info, "Mark fulfilled" button (PATCH status), notes field. Filter by status + date range. _New pages; Lambdas: `GET /api/admin/orders`, `GET /api/admin/orders/{id}`, `PATCH /api/admin/orders/{id}/status`._
- [ ] **Switch storefront to live DynamoDB**: Change product reads from the static const to a build-time fetch (Next.js `generateStaticParams` + `fetch` to a public `GET /api/products` Lambda). Stock checks at add-to-cart make a live call. Trigger redeploy on admin product mutation via a tiny "Republish" button in admin (calls a Lambda that triggers CloudFront invalidation + S3 sync — or for v1, just a manual `npm run aws:publish:local-shop`). _Modifies: storefront product loading; new public Lambda + admin button._

**Checkpoint F — owner can fully run the shop.** Admin signs in, edits stock, adds a product, sees orders, marks fulfilled.

---

## Polish & A11y (Phase 7)

- [ ] **Loading / empty / error states**: Sweep every async surface — search, cart, checkout, admin lists, order lookup. Each has a designed empty state, designed loading state (skeleton not spinner), and designed error state (recoverable when possible). _Touches: many._
- [ ] **Mobile sweep**: Real-device test pass (iPhone Safari + Android Chrome). Confirm cart drawer becomes near-full-screen sheet on small viewports. All touch targets ≥ 44×44. Sticky header doesn't jump on iOS keyboard open. _Touches: layout, header, drawer, forms._
- [ ] **A11y audit**: Keyboard nav every interactive surface. Focus rings visible everywhere (`shadow-focus`). All product images have alt text (admin form enforces). Cart drawer is focus-trapped. Stock badges use icon+text in addition to color. Run axe-core in CI; fix all violations. Verify clay accent contrast ratios on buttercream — adjust to a darker clay if any AA contrast falls short on small text. _Touches: many._
- [ ] **Realistic seed content**: Replace any placeholder copy with real-feeling product names/descriptions/allergens. No lorem ipsum. Source 40 photographs (Unsplash + AI-generated for the long tail) with consistent warm-light styling so the gallery reads as one shop. _Touches: data + images._
- [ ] **Trust signals on checkout**: Lock icon + "Secured by Stripe" + visible link to `/policies` near the Checkout button. _Touches: CartDrawer, /cart._
- [ ] **Lighthouse pass**: Run on home, /shop, product detail, checkout. Target ≥ 90 on perf / a11y / SEO / best-practices. Fix LCP image loading priority, font display swap, any CLS from late-loading images. _Touches: layout, image components._
- [ ] **Cost & log audit**: Verify CloudWatch log retention is 14 days on all lambdas. Confirm projected monthly cost at demo volume < $5 (free-tier confirmation for Lambda + DynamoDB + SES + API Gateway). _Touches: infra._
- [ ] **Flip `/models.json` status to "live"** and add screenshot at `sites/portal/public/screenshots/local-shop.png`.

---

## Review

- [ ] **Design review**: Run `/design-review` against `BRIEF.md` — confirm aesthetic direction held, principles upheld (photography over prose, specific over generic, quiet over loud), references read in the final result. Note any drift to address.
- [ ] **End-to-end verification per master plan §"Verification"**: Run all 14 checks in `/Users/scottivan/.claude/plans/peppy-skipping-penguin.md`.

---

## Notes

- Tasks within the same Phase can often be parallelized within a single session.
- Checkpoints A–F are deploy gates — site is shippable at each one. Stop here if scope needs trimming.
- Backend infrastructure is gated on AWS Stripe & SES setup decisions — flag any blockers as soon as they surface.
- If the clay accent fails AA contrast on small text against buttercream, swap to a darker clay (~#A04A1F) and propagate via tokens.
