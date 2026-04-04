# Copilot Instructions

Use this repository as the canonical source of truth for project context. Before making meaningful changes, read `README.md` and the docs in `docs/` that match the task.

## Required context sources

- `docs/project-context.md` for project purpose, architecture, conventions, and near-term roadmap.
- `docs/aws-deployment.md` for deployment architecture, DNS assumptions, and the private-access workflow.
- `QUICKSTART.md` for the current local dev and deployment commands.

## Working conventions

- Keep the site static-export compatible unless the user explicitly approves a move back to server-hosted Next.js.
- Treat AWS S3 + CloudFront + WAF as the default deployment target.
- While the site is IP-restricted, do not put Cloudflare in front of CloudFront as a proxy. If Cloudflare DNS is used, records must stay DNS-only so the WAF sees the real client IP.
- Prefer small focused changes over broad refactors. Preserve the existing terminal-inspired design language unless the user asks for a redesign.
- Update `docs/project-context.md` or `docs/aws-deployment.md` when architectural or deployment assumptions change.

## Persistent context strategy

- Committed repo files are the shared memory for future agents.
- Local memory can supplement that during a session, but the repo docs remain authoritative.