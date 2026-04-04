# Project Context

## Purpose

`scottivan.com` is a personal portfolio site that presents Scott Ivan's work in platform engineering, DevSecOps, Kubernetes, AWS, and adjacent technical interests.

## Current architecture

- Framework: Next.js 14 App Router
- Rendering target: static export
- Routes:
  - `/`
  - `/resume/`
- Styling: Tailwind utilities plus custom global CSS in `src/app/globals.css`
- Interactive UI: client components such as `Navbar`, `Typewriter`, and `KubectlEaster`

## Design conventions

- Preserve the terminal-inspired visual language unless a redesign is explicitly requested.
- Reuse the current color system centered on green, cyan, slate, and gold accents.
- Prefer content-driven components over new infrastructure or state-management layers.

## Deployment conventions

- Default hosting target is AWS S3 + CloudFront + WAF.
- The site should remain compatible with static export unless the user explicitly approves a server-hosted architecture.
- While IP restriction is enabled, DNS should resolve directly to CloudFront. If Cloudflare DNS is kept, records must remain DNS-only rather than proxied.

## Canonical docs

- `README.md` for the top-level project summary
- `docs/aws-deployment.md` for deployment and DNS operations
- `docs/aws-iam.md` for IAM layout, deploy-role permissions, and operator model
- `QUICKSTART.md` for the command workflow

## Near-term roadmap

- Add AWS infrastructure and deployment automation
- Keep access restricted to Scott's current public IP during the initial private phase
- Add future `/lab/` and `/blog/` routes without breaking static hosting unless approved
