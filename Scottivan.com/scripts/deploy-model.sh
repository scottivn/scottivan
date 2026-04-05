#!/usr/bin/env bash
set -euo pipefail

# Deploy AWS infrastructure for a single model subdomain.
# Usage: MODEL_NAME=modern-brochure bash scripts/deploy-model.sh

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"

MODEL_NAME="${MODEL_NAME:?MODEL_NAME is required (e.g. modern-brochure)}"

export STACK_NAME="scottivan-model-${MODEL_NAME}"
export SITE_DOMAIN_NAME="${MODEL_NAME}.scottivan.com"
export ENABLE_CUSTOM_DOMAIN="true"
export CREATE_ROUTE53_RECORDS="false"
export ENABLE_WAF="false"
export PRICE_CLASS="${PRICE_CLASS:-PriceClass_100}"
export PROJECT_TAG_VALUE="scottivan-model-${MODEL_NAME}"

echo "=== Deploying model: ${MODEL_NAME} ==="
echo "  stack:  ${STACK_NAME}"
echo "  domain: ${SITE_DOMAIN_NAME}"
echo ""

"$SCRIPT_DIR/deploy-aws.sh"

echo ""
echo "=== Next steps ==="
echo "1. Add ACM DNS validation CNAME in Cloudflare (check certificate output above)"
echo "2. Add CNAME: ${MODEL_NAME}.scottivan.com → <CloudFront domain from output above>"
echo "   (Set Cloudflare proxy to DNS-only / gray cloud)"
echo "3. Run: MODEL_NAME=${MODEL_NAME} bash scripts/publish-model.sh"
