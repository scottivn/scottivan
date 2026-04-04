# AWS Deployment

## Chosen architecture

This repo is set up for static hosting on AWS:

- S3 bucket stores the exported `out/` site
- CloudFront serves the site and terminates TLS
- ACM issues the certificate in `us-east-1`
- WAFv2 blocks all traffic except an allowlisted IPv4 CIDR

This architecture is the best fit for the current app because the site is content-driven and does not currently require SSR, APIs, or server actions.

## Why this over Amplify or EC2

- Lower operational overhead than EC2 or container hosting
- Lower cost profile for a static portfolio
- Cleaner edge-level IP restriction via WAF than an nginx allowlist on a server
- Fully scriptable from the AWS CLI except for external DNS or registrar touchpoints

## Current assumptions

- AWS CLI is already configured
- The caller is using a deploy-capable IAM principal rather than the AWS root account
- The CloudFormation stack is deployed in `us-east-1`
- The ACM certificate is issued in `us-east-1` because CloudFront requires it there
- The site remains static-export compatible

For the IAM model behind that assumption, see `docs/aws-iam.md`.

## Commands

One-command deploy (recommended):

```bash
export SITE_DOMAIN_NAME=scottivan.com
export STACK_NAME=scottivan-static-site
export PROJECT_TAG_VALUE=scottivan-site
export ENABLE_CUSTOM_DOMAIN=false
npm run aws:deploy
```

This command performs all steps:

- deploy/update CloudFormation
- build and publish static artifacts
- update WAF allowlist to the current public IP
- create or update a dedicated budget (default `$25/month`)

Infra-only deploy:

```bash
npm run aws:infra
```

Build and publish only:

```bash
npm run aws:publish
```

Update the allowlisted IP to the machine running the command:

```bash
npm run aws:allowlist-ip
```

Budget-only refresh:

```bash
npm run aws:budget
```

Default budget behavior:

- Budget name: `scottivan-site-monthly`
- Limit: `$25/month`
- Filter: `Project=scottivan-site` tag

## Manual UI and DNS touchpoints

These are the remaining actions that usually cannot be avoided completely:

1. ACM certificate validation if DNS is not already in Route 53.
2. Cloudflare DNS changes if Cloudflare remains the DNS host.
3. Cloudflare registrar nameserver update if DNS is moved into Route 53.

## Important DNS note

If Cloudflare stays in the path while WAF IP restriction is enabled, do not proxy the site through Cloudflare. Use DNS-only records so CloudFront and WAF see the real client IP.

## Route 53 vs Cloudflare DNS

Move to Route 53 if the priority is AWS consolidation and fewer split-control-plane concerns.

Keep Cloudflare DNS for the first cutover if the priority is minimizing initial changes.

## Outputs expected from the CloudFormation stack

- Site bucket name
- CloudFront distribution ID and domain name
- WAF IP set ID and name
- ACM certificate ARN
- Site URL (CloudFront URL unless custom domain is enabled)

The scripts in `scripts/` use these outputs so they can stay mostly configuration-free after the first deploy.
