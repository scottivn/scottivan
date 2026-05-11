# Local Shop — Resume Doc

Drop into this file at the start of every new session. Companion to `BRIEF.md` and `TASKS.md`. Tells you exactly where we left off and what's next.

**Last updated:** 2026-05-10
**Last commit at session pause:** see `git log -1` after the commit that ships with this doc
**Branch:** `feature/lab-redesign`

---

## 🟢 What's live in production

| Endpoint | Status | Notes |
|---|---|---|
| `https://local-shop.scottivan.com/` | Live (DNS may still be propagating) | Falls through CloudFront with cert |
| `https://d3aeh1n6csfteb.cloudfront.net/` | Live | Direct CloudFront URL, always works |
| `https://scottivan.com/models/` | Live | Local Shop card shows status `Live` and clicks through |

Every static page through **Phase 3** is deployed:
- `/`, `/shop`, `/shop/[slug]` (×40), `/cart`, `/visit`, `/about`, `/contact`, `/policies`, `/_not-found`

The `/cart` checkout button **on the deployed build** still shows "Coming in Phase 4" because Phase 4 code was written *after* the last publish. See "Coded but not deployed" below.

### AWS resources in place

| Resource | ID / Name |
|---|---|
| Local-shop S3 bucket | `scottivan-model-local-shop-680467050770` |
| Local-shop S3 logs | `scottivan-model-local-shop-680467050770-logs` |
| Local-shop CloudFront | `E1HTT78O8FL8TX` (domain `d3aeh1n6csfteb.cloudfront.net`) |
| Local-shop ACM cert | `arn:aws:acm:us-east-1:680467050770:certificate/b55e8131-7fe0-4838-be5e-4ab09a6a7272` |
| Local-shop CFN stack | `scottivan-model-local-shop` |
| Portal CloudFront | `E31MW8RMAEQE1O` |
| Shared CF Function | `scottivan-static-url-rewrite` (associated with both distributions) |

**No backend stack exists yet.** `scottivan-model-local-shop-backend` (the API + DynamoDB + Lambdas) is what Phase 4 deploys.

---

## 🟡 Coded but not deployed

These are merged in this commit but live behind code, not on the running site:

- `lambdas/local-shop/` — 3 handlers (`checkout`, `stripe-webhook`, `orders-by-session`)
- `infra/local-shop.yml` — CFN template for DynamoDB + 3 Lambdas + HTTP API Gateway
- `scripts/deploy-local-shop-backend.sh` — packages and deploys the backend
- `scripts/publish-model.sh` extended to auto-detect API URL from backend stack
- `sites/local-shop/src/components/CheckoutButton.tsx` — wired into `/cart`
- `sites/local-shop/src/app/order/confirmed/page.tsx` — confirmation page
- `sites/local-shop/src/lib/api.ts` — `NEXT_PUBLIC_API_URL` plumbing

Once Phase 4 is deployed and the site is republished, the `/cart` page checkout button will be functional and visitors can complete a real Stripe test-mode purchase.

---

## 🎯 What's next — pick up here

### Phase 4 — Deploy the Stripe-backed checkout

**Blocked on:** user-provided Stripe test-mode keys.

**Two-step dance:**

```bash
# Step 1 — first deploy (no webhook secret yet)
STRIPE_SECRET_KEY=sk_test_... bash scripts/deploy-local-shop-backend.sh
# Outputs ApiUrl and WebhookUrl. Copy WebhookUrl.

# Step 2 — Stripe Dashboard → Developers → Webhooks → Add endpoint
# URL: <WebhookUrl from step 1>
# Event: checkout.session.completed
# Copy the resulting "Signing secret" (whsec_...).

# Step 3 — redeploy with the webhook secret
STRIPE_SECRET_KEY=sk_test_... STRIPE_WEBHOOK_SECRET=whsec_... \
  bash scripts/deploy-local-shop-backend.sh

# Step 4 — republish the site (auto-picks NEXT_PUBLIC_API_URL from backend stack)
MODEL_NAME=local-shop bash scripts/publish-model.sh
```

**Smoke test after deploy:** add a fixed-price item to cart → checkout → use Stripe test card `4242 4242 4242 4242` → confirm `/order/confirmed` renders with correct totals and `local-shop-orders` DynamoDB row exists.

### Phase 4.5 — By-weight pickup requests (NEW — agreed at end of last session)

**Why:** Specialty grocers carry items where the final price depends on weight or cut at the counter (whole brisket, smoked fish, bulk cheese, cured meats, produce by the head). Pretending these can be paid upfront is wrong and obvious to the prospect; doing them right makes the demo uniquely strong for this vertical.

**Approach A: "Pickup request" parallel flow** — locked in by user.

#### Catalog changes

Add a `pricingType` field to `Product`:
```ts
pricingType: "fixed" | "by-weight";
/** Only meaningful when pricingType === "by-weight" */
estimatedUnitPrice?: number;   // cents per lb
estimatedUnitLabel?: string;   // "$/lb"
```

Convert / add 4-6 catalog entries to demonstrate (suggested):
- New "Counter" category (or fold into "Prepared")
- "Hand-Cut Ribeye · ~$32/lb"
- "House Pâté · sliced to order"
- "Smoked Whitefish · cut to order"
- "Whole Brisket · pickup-only, sold by the weight"
- Maybe also re-flag one produce item (e.g., heritage tomatoes by the lb)

#### UX changes

- `ProductCard` and `ProductDetail` show "Pricing at pickup · est. $X/lb" instead of a firm price for by-weight items
- `StockBadge` says "Available · weighed at counter" instead of "In stock"
- Add-to-cart still works; cart shows the line as "est. ~$X · final price at pickup"
- New cart utility `cartHasByWeight(lines)` toggles checkout behavior
- If `cartHasByWeight`:
  - `/cart` checkout button changes to "**Submit pickup request**"
  - Form requires customer email + phone + preferred pickup date (drop-down: today/tomorrow/this week)
  - Submission goes to a new `POST /api/pickup-request` Lambda (not Stripe)
  - Customer lands on `/pickup/confirmed?id=...` instead of `/order/confirmed`
- A mixed cart (fixed + by-weight items) defaults to pickup-request mode so the shop completes the whole thing in person; could refine later

#### Backend changes

- New DynamoDB table `local-shop-pickup-requests` (same pattern as orders)
- New Lambda `pickup-request` handler at `lambdas/local-shop/src/handlers/pickup-request.ts`
  - Validates payload, writes row to DynamoDB
  - Sends notification email to shop owner via SES (set up SES sandbox identity for `ivan.procurement@gmail.com` or similar)
  - Returns request ID + summary
- Extend `infra/local-shop.yml`:
  - Add `PickupRequestsTable` (DynamoDB)
  - Add `PickupRequestFunction` (Lambda)
  - Add `POST /api/pickup-request` route
  - IAM grant to Lambda for DynamoDB + SES SendEmail
- New page `/pickup/confirmed?id=...` mirroring `/order/confirmed` but with "We'll call you when it's ready" copy

#### Admin (carries into Phase 6)

- Phase 6 admin already plans Orders tab — extend with **Pickup Requests** tab
- Admin can mark a pickup-request as "completed at $X.XX" (records actual paid amount; closes the loop)

**Estimated work:** ~3 hours (mostly UI + a fourth Lambda + table; pattern is the same as orders).

### Phase 5 — Customer order lookup

Public `/orders/lookup` page (order # + email form) + `GET /api/orders/lookup` Lambda enforcing email match.

Extend with **pickup-request lookup** so customers can check status of their pickup as well.

### Phase 6 — Admin panel (largest remaining)

- Magic-link auth via SES
- Admin shell with sidebar nav
- Product CRUD (S3 photo upload via presigned PUT)
- Orders list + detail + mark-fulfilled
- Pickup requests list + detail + complete-with-price
- Low-stock dashboard

Largest single piece. Plan to break into Phase 6a–f when starting.

### Phase 7 — Polish

Real photography (replace gradient placeholders), Lighthouse ≥ 90, full a11y audit, error/empty states, mobile sweep, trust signals on checkout.

---

## ✋ Known gotchas to remember next session

- **Trailing-slash bug history:** when the next model is created, the static-site CFN template already wires `scottivan-static-url-rewrite` in via the `UrlRewriteFunctionArn` parameter (default points to the existing function ARN). Don't recreate this.
- **CloudFront cache:** after `publish-model.sh` runs, invalidation can take 30-60s to settle. Hard-reload (Cmd+Shift+R) when testing.
- **Stripe test cards:** `4242 4242 4242 4242` (success), `4000 0000 0000 0002` (declined), any future expiry, any CVC.
- **SES sandbox:** sender + recipient both need verified identities in sandbox mode. If you want notifications going to a real inbox, verify it in SES before Phase 4.5 deploy or use the sandbox-default region's verified addresses.
- **Models.json sync:** the portal site reads it at build time; flipping a status from `coming-soon` → `live` requires republishing portal, not just the model.
- **Skip "Other / dependency / vuln" rabbit holes:** `npm install` reports 7-9 vulns from upstream deps. Not introduced by us — leave alone unless we choose to address.

---

## Quick "where am I" commands

```bash
# Stack status check
aws cloudformation describe-stacks --region us-east-1 \
  --stack-name scottivan-model-local-shop \
  --profile personal-admin --query 'Stacks[0].StackStatus' --output text

# Backend stack status (returns error if not yet deployed)
aws cloudformation describe-stacks --region us-east-1 \
  --stack-name scottivan-model-local-shop-backend \
  --profile personal-admin --query 'Stacks[0].StackStatus' --output text

# Local dev
cd sites/local-shop && npm run dev   # port 3004

# Verify build is clean
npm run build --workspace=@scottivan/local-shop

# Lambdas typecheck
cd lambdas/local-shop && npm run typecheck && npm run build
```
