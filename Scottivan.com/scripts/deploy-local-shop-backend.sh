#!/usr/bin/env bash
set -euo pipefail

# Deploy the local-shop backend: builds the Lambdas, zips each handler,
# uploads to S3, then deploys infra/local-shop.yml via CloudFormation.
#
# Required env vars:
#   STRIPE_SECRET_KEY      Stripe test-mode secret (sk_test_...)
# Optional env vars:
#   STRIPE_WEBHOOK_SECRET  Set after creating the Stripe webhook (whsec_...).
#                          On first deploy leave unset; deploy gives you the URL,
#                          you configure the webhook in Stripe, then re-run with this set.
#   AWS_PROFILE            AWS CLI profile (default: personal-admin)
#   AWS_REGION             AWS region (default: us-east-1)
#
# Usage:
#   STRIPE_SECRET_KEY=sk_test_... bash scripts/deploy-local-shop-backend.sh

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd -- "$SCRIPT_DIR/.." && pwd)"

MODEL_NAME="local-shop"
LAMBDAS_DIR="$REPO_ROOT/lambdas/$MODEL_NAME"
TEMPLATE_FILE="$REPO_ROOT/infra/$MODEL_NAME.yml"
STATIC_STACK_NAME="scottivan-model-$MODEL_NAME"
BACKEND_STACK_NAME="scottivan-model-$MODEL_NAME-backend"

export AWS_PROFILE="${AWS_PROFILE:-personal-admin}"
export AWS_REGION="${AWS_REGION:-us-east-1}"
export AWS_PAGER=""

if [[ -z "${STRIPE_SECRET_KEY:-}" ]]; then
  echo "Error: STRIPE_SECRET_KEY env var is required (test-mode sk_test_... key)."
  exit 1
fi

ACCOUNT_ID="$(aws sts get-caller-identity --query Account --output text)"

# Reuse the static stack's logging bucket for Lambda artifacts.
# The bucket name follows the deploy-model.sh pattern.
ARTIFACT_BUCKET="scottivan-model-${MODEL_NAME}-${ACCOUNT_ID}-logs"

if ! aws s3api head-bucket --bucket "$ARTIFACT_BUCKET" 2>/dev/null; then
  echo "Error: artifact bucket $ARTIFACT_BUCKET not found."
  echo "  Run 'MODEL_NAME=$MODEL_NAME bash scripts/deploy-model.sh' first."
  exit 1
fi

echo "==> Building Lambdas in $LAMBDAS_DIR"
(cd "$LAMBDAS_DIR" && npm run build)

# Each handler bundle is in dist/<handler>/index.mjs — zip it.
TIMESTAMP="$(date -u +%Y%m%dT%H%M%SZ)"
S3_PREFIX="lambda-artifacts/$TIMESTAMP"

declare -a HANDLERS=("checkout" "stripe-webhook" "orders-by-session")
declare -A ZIP_KEYS

for handler in "${HANDLERS[@]}"; do
  DIST_DIR="$LAMBDAS_DIR/dist/$handler"
  if [[ ! -f "$DIST_DIR/index.mjs" ]]; then
    echo "Error: missing build output $DIST_DIR/index.mjs"
    exit 1
  fi
  ZIP_PATH="$LAMBDAS_DIR/dist/$handler.zip"
  rm -f "$ZIP_PATH"
  (cd "$DIST_DIR" && zip -q "$ZIP_PATH" index.mjs)
  KEY="$S3_PREFIX/$handler.zip"
  echo "==> Uploading $KEY"
  aws s3 cp "$ZIP_PATH" "s3://$ARTIFACT_BUCKET/$KEY" --no-progress
  ZIP_KEYS[$handler]="$KEY"
done

echo ""
echo "==> Deploying CloudFormation stack: $BACKEND_STACK_NAME"

WEBHOOK_PARAM=""
if [[ -n "${STRIPE_WEBHOOK_SECRET:-}" ]]; then
  WEBHOOK_PARAM="StripeWebhookSecret=$STRIPE_WEBHOOK_SECRET"
fi

aws cloudformation deploy \
  --region "$AWS_REGION" \
  --stack-name "$BACKEND_STACK_NAME" \
  --template-file "$TEMPLATE_FILE" \
  --capabilities CAPABILITY_IAM \
  --no-fail-on-empty-changeset \
  --parameter-overrides \
    ModelName="$MODEL_NAME" \
    StaticSiteOrigin="https://${MODEL_NAME}.scottivan.com" \
    ArtifactBucket="$ARTIFACT_BUCKET" \
    CheckoutZipKey="${ZIP_KEYS[checkout]}" \
    StripeWebhookZipKey="${ZIP_KEYS[stripe-webhook]}" \
    OrdersBySessionZipKey="${ZIP_KEYS[orders-by-session]}" \
    StripeSecretKey="$STRIPE_SECRET_KEY" \
    $WEBHOOK_PARAM \
  --tags \
    Project="scottivan-model-${MODEL_NAME}" \
    App=local-shop-backend \
    ManagedBy=cloudformation

echo ""
echo "==> Stack outputs:"
aws cloudformation describe-stacks \
  --region "$AWS_REGION" \
  --stack-name "$BACKEND_STACK_NAME" \
  --query 'Stacks[0].Outputs[*].[OutputKey,OutputValue]' \
  --output table

API_URL="$(aws cloudformation describe-stacks \
  --region "$AWS_REGION" \
  --stack-name "$BACKEND_STACK_NAME" \
  --query "Stacks[0].Outputs[?OutputKey=='ApiUrl'].OutputValue" \
  --output text)"

WEBHOOK_URL="$(aws cloudformation describe-stacks \
  --region "$AWS_REGION" \
  --stack-name "$BACKEND_STACK_NAME" \
  --query "Stacks[0].Outputs[?OutputKey=='WebhookUrl'].OutputValue" \
  --output text)"

echo ""
echo "============================================================"
echo "Backend deployed."
echo ""
echo "API_URL=$API_URL"
echo "WEBHOOK_URL=$WEBHOOK_URL"
echo ""
if [[ -z "${STRIPE_WEBHOOK_SECRET:-}" ]]; then
  cat <<EOM
Next steps:
  1. Go to Stripe Dashboard → Developers → Webhooks → Add endpoint.
  2. Use: $WEBHOOK_URL
  3. Subscribe to event: checkout.session.completed
  4. Copy the resulting webhook signing secret (whsec_...).
  5. Re-run this script with STRIPE_WEBHOOK_SECRET=whsec_... set.
  6. Build the site with NEXT_PUBLIC_API_URL=$API_URL before publishing.
EOM
else
  cat <<EOM
Next steps:
  1. Build the site with NEXT_PUBLIC_API_URL=$API_URL before publishing:
     NEXT_PUBLIC_API_URL=$API_URL npm run build --workspace=@scottivan/$MODEL_NAME
  2. Publish: MODEL_NAME=$MODEL_NAME bash scripts/publish-model.sh
  3. Test: add an item, checkout with card 4242 4242 4242 4242.
EOM
fi
echo "============================================================"
