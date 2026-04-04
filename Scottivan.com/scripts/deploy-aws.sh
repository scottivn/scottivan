#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd -- "$SCRIPT_DIR/.." && pwd)"
TEMPLATE_FILE="$PROJECT_ROOT/infra/aws/static-site.yaml"

export AWS_PAGER=""

STACK_NAME="${STACK_NAME:-scottivan-static-site}"
AWS_REGION="${AWS_REGION:-us-east-1}"
SITE_DOMAIN_NAME="${SITE_DOMAIN_NAME:-scottivan.com}"
ENABLE_CUSTOM_DOMAIN="${ENABLE_CUSTOM_DOMAIN:-false}"
CREATE_ROUTE53_RECORDS="${CREATE_ROUTE53_RECORDS:-false}"
ROUTE53_HOSTED_ZONE_ID="${ROUTE53_HOSTED_ZONE_ID:-}"
PRICE_CLASS="${PRICE_CLASS:-PriceClass_100}"
PROJECT_TAG_VALUE="${PROJECT_TAG_VALUE:-scottivan-site}"

detect_public_ip() {
  curl -fsS --max-time 5 https://checkip.amazonaws.com || curl -fsS --max-time 5 https://ifconfig.me
}

normalize_cidr() {
  local value="$1"

  if [[ "$value" == */* ]]; then
    printf '%s\n' "$value"
  else
    printf '%s/32\n' "$value"
  fi
}

if [[ -z "${ALLOWED_IPV4_CIDR:-}" ]]; then
  ALLOWED_IPV4_CIDR="$(normalize_cidr "$(detect_public_ip)")"
fi

ACCOUNT_ID="$(aws sts get-caller-identity --query Account --output text)"
DEFAULT_BUCKET_NAME="${SITE_DOMAIN_NAME//./-}-${ACCOUNT_ID}"
SITE_BUCKET_NAME="${SITE_BUCKET_NAME:-$DEFAULT_BUCKET_NAME}"

STACK_STATUS="$(aws cloudformation describe-stacks \
  --region "$AWS_REGION" \
  --stack-name "$STACK_NAME" \
  --query 'Stacks[0].StackStatus' \
  --output text 2>/dev/null || true)"

if [[ "$STACK_STATUS" == "ROLLBACK_COMPLETE" ]]; then
  echo "Stack is in ROLLBACK_COMPLETE. Deleting before redeploy..."
  aws cloudformation delete-stack \
    --region "$AWS_REGION" \
    --stack-name "$STACK_NAME"

  aws cloudformation wait stack-delete-complete \
    --region "$AWS_REGION" \
    --stack-name "$STACK_NAME"
fi

echo "Deploying stack '$STACK_NAME' in $AWS_REGION"
echo "  domain: $SITE_DOMAIN_NAME"
echo "  custom domain enabled: $ENABLE_CUSTOM_DOMAIN"
echo "  bucket: $SITE_BUCKET_NAME"
echo "  allowlist: $ALLOWED_IPV4_CIDR"
echo "  route53 records: $CREATE_ROUTE53_RECORDS"
echo "  project tag: $PROJECT_TAG_VALUE"

aws cloudformation deploy \
  --region "$AWS_REGION" \
  --stack-name "$STACK_NAME" \
  --template-file "$TEMPLATE_FILE" \
  --parameter-overrides \
    SiteDomainName="$SITE_DOMAIN_NAME" \
    EnableCustomDomain="$ENABLE_CUSTOM_DOMAIN" \
    SiteBucketName="$SITE_BUCKET_NAME" \
    AllowedIPv4Cidr="$ALLOWED_IPV4_CIDR" \
    CreateRoute53Records="$CREATE_ROUTE53_RECORDS" \
    Route53HostedZoneId="$ROUTE53_HOSTED_ZONE_ID" \
    PriceClass="$PRICE_CLASS" \
    ProjectTagValue="$PROJECT_TAG_VALUE" \
  --tags \
    Project="$PROJECT_TAG_VALUE" \
    App=static-site \
    ManagedBy=cloudformation \
  --no-fail-on-empty-changeset

echo
echo "Stack outputs:"
aws cloudformation describe-stacks \
  --region "$AWS_REGION" \
  --stack-name "$STACK_NAME" \
  --query 'Stacks[0].Outputs[*].[OutputKey,OutputValue]' \
  --output table

SITE_URL="$(aws cloudformation describe-stacks \
  --region "$AWS_REGION" \
  --stack-name "$STACK_NAME" \
  --query "Stacks[0].Outputs[?OutputKey=='SiteUrl'].OutputValue" \
  --output text)"

echo
echo "Site URL: $SITE_URL"

if [[ "$ENABLE_CUSTOM_DOMAIN" == "true" ]]; then
  CERTIFICATE_ARN="$(aws cloudformation describe-stacks \
    --region "$AWS_REGION" \
    --stack-name "$STACK_NAME" \
    --query "Stacks[0].Outputs[?OutputKey=='CertificateArn'].OutputValue" \
    --output text)"

  CERTIFICATE_STATUS="$(aws acm describe-certificate \
    --region "$AWS_REGION" \
    --certificate-arn "$CERTIFICATE_ARN" \
    --query 'Certificate.Status' \
    --output text)"

  echo
  echo "Certificate status: $CERTIFICATE_STATUS"

  if [[ "$CERTIFICATE_STATUS" != "ISSUED" ]]; then
    echo "ACM certificate is not issued yet. Add the requested DNS validation record before the custom domain will work."
    echo "Use this command to inspect validation records:"
    echo "  aws acm describe-certificate --region $AWS_REGION --certificate-arn $CERTIFICATE_ARN --query 'Certificate.DomainValidationOptions[*].ResourceRecord'"
  fi
fi