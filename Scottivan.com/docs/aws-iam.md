# AWS IAM Model

## Recommended model

For one-person multi-site AWS work, use two layers of identity:

1. `personal-admin` as the high-privilege operator identity you use to administer the account.
2. A narrower per-site role such as `scottivan-site-deployer` that you assume when deploying or maintaining this specific site.

Do not use the AWS root account for normal work.

## Personal admin principal

For a single personal AWS account, the practical best practice is:

- Keep the root account locked down with MFA and no day-to-day use.
- Use a dedicated IAM user or IAM Identity Center admin role for your human operator identity.
- Give that operator identity AWS managed `AdministratorAccess`.

Why use the managed admin policy here instead of inventing a custom broad policy:

- It avoids brittle gaps when you need to create new services later.
- It is easier to reason about than a homemade almost-admin policy.
- The real blast-radius control comes from not using that identity for app deployment and automation.

## Reusable site deployer role

This repo includes a reusable policy for a site-specific deploy role:

- `infra/aws/iam/site-deployer-policy.json`
- `infra/aws/iam/site-deployer-trust-policy.json`

That role is intended to be assumed by your broader operator identity, not used as a long-lived login.

## What the site deployer can do

The deploy role is scoped for this workflow:

- CloudFormation stack deploy and stack reads
- S3 static site bucket upload and listing
- CloudFront invalidations and distribution reads
- ACM certificate inspection
- WAF IP-set reads and updates
- Route 53 record changes if you choose to manage DNS in AWS

It does not grant broad IAM administration or unrelated service access.

## Bootstrap flow

Once you have a proper admin-capable AWS principal active in your CLI, create the deploy role with:

```bash
export OPERATOR_PRINCIPAL_ARN="arn:aws:iam::<account-id>:user/personal-admin"
export SITE_DEPLOY_ROLE_NAME="scottivan-site-deployer"
bash scripts/bootstrap-site-deployer.sh
```

If your operator principal is a role rather than a user, use that role ARN instead.

## If bootstrap fails with AccessDenied

If you see an error such as `iam:CreateRole` or `iam:PutRolePolicy` access denied, the current caller is not your intended operator identity yet.

You have two valid fixes:

1. Switch the CLI to your broader `personal-admin` principal.
2. Grant the current bootstrap caller the minimal IAM permissions in `infra/aws/iam/bootstrap-role-admin-policy.json`.

For the current bootstrap script, the caller needs at least:

- `iam:GetRole`
- `iam:CreateRole`
- `iam:UpdateAssumeRolePolicy`
- `iam:PutRolePolicy`
- `sts:GetCallerIdentity`

If you are standardizing on `personal-admin`, that principal can simply use AWS managed `AdministratorAccess` and no extra custom bootstrap policy is needed.

## After the role exists

Assume it before running the site deployment scripts, or configure an AWS CLI profile that does it automatically.

Example profile shape in `~/.aws/config`:

```ini
[profile personal-admin]
region = us-east-1

[profile scottivan-site]
role_arn = arn:aws:iam::<account-id>:role/scottivan-site-deployer
source_profile = personal-admin
region = us-east-1
```

Then run deployment commands with that profile:

```bash
AWS_PROFILE=scottivan-site npm run aws:deploy
AWS_PROFILE=scottivan-site npm run aws:publish
AWS_PROFILE=scottivan-site npm run aws:allowlist-ip
```

## When to create additional roles

Create separate deploy roles per site or per client when:

- resources should stay logically separated
- a repo should not be able to affect another repo's infrastructure
- billing visibility or future account separation may matter

For a future multi-client setup, keep `personal-admin` as the operator identity and create one deploy role per project.
