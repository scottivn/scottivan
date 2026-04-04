#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd -- "$SCRIPT_DIR/.." && pwd)"

export AWS_PAGER=""

STACK_NAME="${STACK_NAME:-scottivan-static-site}"
AWS_REGION="${AWS_REGION:-us-east-1}"

if [[ ! -d "$PROJECT_ROOT/node_modules" ]]; then
  echo "Installing npm dependencies..."
  (cd "$PROJECT_ROOT" && npm install)
fi

echo "Building static site..."
(cd "$PROJECT_ROOT" && npm run build)

SITE_BUCKET_NAME="$(aws cloudformation describe-stacks \
  --region "$AWS_REGION" \
  --stack-name "$STACK_NAME" \
  --query "Stacks[0].Outputs[?OutputKey=='SiteBucketName'].OutputValue" \
  --output text)"

DISTRIBUTION_ID="$(aws cloudformation describe-stacks \
  --region "$AWS_REGION" \
  --stack-name "$STACK_NAME" \
  --query "Stacks[0].Outputs[?OutputKey=='DistributionId'].OutputValue" \
  --output text)"

echo "Syncing out/ to s3://$SITE_BUCKET_NAME"
aws s3 sync "$PROJECT_ROOT/out/" "s3://$SITE_BUCKET_NAME" --delete

echo "Creating CloudFront invalidation..."
aws cloudfront create-invalidation \
  --distribution-id "$DISTRIBUTION_ID" \
  --paths '/*' \
  --output text >/dev/null

echo "Publish complete."