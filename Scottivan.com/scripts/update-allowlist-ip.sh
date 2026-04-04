#!/usr/bin/env bash
set -euo pipefail

STACK_NAME="${STACK_NAME:-scottivan-static-site}"
AWS_REGION="${AWS_REGION:-us-east-1}"

export AWS_PAGER=""

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

TARGET_CIDR="${1:-$(normalize_cidr "$(detect_public_ip)")}"
if [[ "$TARGET_CIDR" != */* ]]; then
  TARGET_CIDR="$(normalize_cidr "$TARGET_CIDR")"
fi

IP_SET_ID="$(aws cloudformation describe-stacks \
  --region "$AWS_REGION" \
  --stack-name "$STACK_NAME" \
  --query "Stacks[0].Outputs[?OutputKey=='WafIpSetId'].OutputValue" \
  --output text)"

IP_SET_NAME="$(aws cloudformation describe-stacks \
  --region "$AWS_REGION" \
  --stack-name "$STACK_NAME" \
  --query "Stacks[0].Outputs[?OutputKey=='WafIpSetName'].OutputValue" \
  --output text)"

LOCK_TOKEN="$(aws wafv2 get-ip-set \
  --region "$AWS_REGION" \
  --scope CLOUDFRONT \
  --id "$IP_SET_ID" \
  --name "$IP_SET_NAME" \
  --query 'LockToken' \
  --output text)"

echo "Updating WAF allowlist to $TARGET_CIDR"

aws wafv2 update-ip-set \
  --region "$AWS_REGION" \
  --scope CLOUDFRONT \
  --id "$IP_SET_ID" \
  --name "$IP_SET_NAME" \
  --lock-token "$LOCK_TOKEN" \
  --addresses "$TARGET_CIDR" >/dev/null

echo "Done. Only $TARGET_CIDR can reach the site through CloudFront."