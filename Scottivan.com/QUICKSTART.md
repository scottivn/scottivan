# scottivan.com — Quick Start

## Get running locally

```bash
cd scottivan.com
npm install
npm run dev
# → http://localhost:3000
```

## Preview the exported static build

```bash
npm run build
npm start
# → http://localhost:3000 serving ./out
```

## Deploy to AWS

```bash
export SITE_DOMAIN_NAME=scottivan.com
export STACK_NAME=scottivan-static-site
export PROJECT_TAG_VALUE=scottivan-site

# First deploy: keep custom domain off to avoid ACM DNS validation blockers.
export ENABLE_CUSTOM_DOMAIN=false

# Optional if moving DNS into Route 53 now
# export CREATE_ROUTE53_RECORDS=true
# export ROUTE53_HOSTED_ZONE_ID=Z1234567890

npm run aws:deploy
```

`npm run aws:deploy` now does everything in one run:
- deploy/update infrastructure
- build + publish static files
- refresh WAF allowlist to your current public IP
- create/update a dedicated monthly budget (default `$25`) for this site

After ACM validation is ready, you can enable the custom domain:

```bash
export ENABLE_CUSTOM_DOMAIN=true
npm run aws:deploy
```

See `docs/aws-deployment.md` before the first deploy. That document also lists the manual UI steps that cannot be avoided, such as ACM DNS validation and registrar nameserver changes if DNS moves to Route 53.

## Project structure

```text
src/
  app/
    layout.tsx        # Root layout + Navbar
    globals.css       # Terminal theme, fonts, CRT scanlines
    page.tsx          # Home / Hero page
    resume/
      page.tsx        # Resume page
  components/
    Navbar.tsx        # Fixed top nav with active state
    Typewriter.tsx    # Animated terminal typewriter
docs/
  project-context.md  # Canonical project context for future agents
  aws-deployment.md   # AWS hosting architecture and operating steps
infra/aws/
  static-site.yaml    # CloudFormation for S3 + CloudFront + WAF
scripts/
  deploy-all.sh       # One-command deploy (infra + publish + allowlist + budget)
  deploy-aws.sh       # Deploy or update only the AWS stack
  publish-site.sh     # Build and publish the static site
  update-allowlist-ip.sh  # Update the WAF IP allowlist to your current IP
  setup-budget.sh     # Create or update a dedicated site budget
```

## What's built

- **Hero page** — Terminal window with animated typewriter, skill bars, cert badges, interests grid
- **Resume page** — Timeline experience, skills matrix, certs, download PDF link
- **Theme** — Dark terminal aesthetic, JetBrains Mono, green/cyan glows, CRT scanlines

## Things to customize

- Update GitHub/LinkedIn URLs in `Navbar.tsx`
- Update email in `resume/page.tsx` and `page.tsx`
- Add your actual university name in `resume/page.tsx`
- Add a real `public/resume.pdf` for the download link
- Set `SITE_DOMAIN_NAME`, `STACK_NAME`, and optionally `ROUTE53_HOSTED_ZONE_ID` before the first AWS deploy

## Coming next (future sessions)

- `/lab` — Chess widget (Lichess API), BJJ training log, investment dashboards
- `/blog` — MDX-powered writing with syntax highlighting
- `kubectl` easter egg — type commands in a search bar, get pods back
- Dark/light mode toggle
- GitHub activity feed (live commits)
