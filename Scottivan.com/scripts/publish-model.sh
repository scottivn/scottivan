#!/usr/bin/env bash
set -euo pipefail

# Build and publish a single model site to its S3 bucket + CloudFront.
# Usage: MODEL_NAME=modern-brochure bash scripts/publish-model.sh

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd -- "$SCRIPT_DIR/.." && pwd)"

MODEL_NAME="${MODEL_NAME:?MODEL_NAME is required (e.g. modern-brochure)}"
SITE_DIR="$REPO_ROOT/sites/${MODEL_NAME}"

export AWS_PAGER=""

STACK_NAME="scottivan-model-${MODEL_NAME}"
AWS_REGION="${AWS_REGION:-us-east-1}"

if [[ ! -d "$SITE_DIR" ]]; then
  echo "Error: site directory not found at $SITE_DIR"
  exit 1
fi

if [[ ! -d "$REPO_ROOT/node_modules" ]]; then
  echo "Installing npm dependencies..."
  (cd "$REPO_ROOT" && npm install)
fi

echo "Building model: ${MODEL_NAME}..."
(cd "$REPO_ROOT" && npm run build --workspace="@scottivan/${MODEL_NAME}")

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
aws s3 sync "$SITE_DIR/out/" "s3://$SITE_BUCKET_NAME" --delete

echo "Creating CloudFront invalidation..."
aws cloudfront create-invalidation \
  --distribution-id "$DISTRIBUTION_ID" \
  --paths '/*' \
  --output text >/dev/null

echo "Model '${MODEL_NAME}' published."
