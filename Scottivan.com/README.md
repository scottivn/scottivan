# scottivan.com

Personal portfolio site for Scott Ivan, built with Next.js App Router and a terminal-inspired visual style.

## Why this repo exists

The site is the public portfolio and resume surface for cloud platform, DevSecOps, and AWS/Kubernetes work. It is intentionally lightweight and content-driven, which makes it a good fit for static hosting on AWS.

## Stack

- Next.js 14 App Router
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion

## Key routes

- `/` home page with terminal hero, skills, certifications, and project callouts
- `/resume/` expanded resume and project details

## Local workflow

```bash
npm install
npm run dev
```

To preview the exported production build locally:

```bash
npm run build
npm start
```

## Deployment target

The default deployment target is AWS static hosting:

- S3 for site artifacts
- CloudFront for CDN and TLS termination
- ACM for the certificate
- WAFv2 for temporary IP allowlisting

See `docs/aws-deployment.md` for architecture, cost tradeoffs, and the commands used to provision and publish.

## Shared context for future agents

This repo stores its durable AI context in committed files so future agents can inherit the same baseline information:

- `.github/copilot-instructions.md`
- `docs/project-context.md`
- `docs/aws-deployment.md`
- `docs/aws-iam.md`
- `QUICKSTART.md`

When architectural assumptions or deployment decisions change, update those files in the same change set.
