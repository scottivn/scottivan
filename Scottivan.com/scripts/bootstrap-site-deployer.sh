#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd -- "$SCRIPT_DIR/.." && pwd)"
POLICY_FILE="$PROJECT_ROOT/infra/aws/iam/site-deployer-policy.json"
TRUST_TEMPLATE_FILE="$PROJECT_ROOT/infra/aws/iam/site-deployer-trust-policy.json"

AWS_REGION="${AWS_REGION:-us-east-1}"
SITE_DEPLOY_ROLE_NAME="${SITE_DEPLOY_ROLE_NAME:-scottivan-site-deployer}"
SITE_DEPLOY_POLICY_NAME="${SITE_DEPLOY_POLICY_NAME:-scottivan-site-deployer-policy}"

if [[ -z "${OPERATOR_PRINCIPAL_ARN:-}" ]]; then
  echo "Set OPERATOR_PRINCIPAL_ARN to the IAM user or role ARN that should assume this deploy role."
  exit 1
fi

ACCOUNT_ID="$(aws sts get-caller-identity --query Account --output text)"
TRUST_POLICY_FILE="$(mktemp)"
cleanup() {
  rm -f "$TRUST_POLICY_FILE"
}
trap cleanup EXIT

sed "s|__OPERATOR_PRINCIPAL_ARN__|$OPERATOR_PRINCIPAL_ARN|g" "$TRUST_TEMPLATE_FILE" > "$TRUST_POLICY_FILE"

ROLE_ARN="arn:aws:iam::$ACCOUNT_ID:role/$SITE_DEPLOY_ROLE_NAME"

if aws iam get-role --role-name "$SITE_DEPLOY_ROLE_NAME" >/dev/null 2>&1; then
  echo "Updating trust policy for existing role $SITE_DEPLOY_ROLE_NAME"
  aws iam update-assume-role-policy \
    --role-name "$SITE_DEPLOY_ROLE_NAME" \
    --policy-document "file://$TRUST_POLICY_FILE" >/dev/null
else
  echo "Creating role $SITE_DEPLOY_ROLE_NAME"
  aws iam create-role \
    --role-name "$SITE_DEPLOY_ROLE_NAME" \
    --assume-role-policy-document "file://$TRUST_POLICY_FILE" \
    --description "Deploy role for static AWS-hosted sites such as scottivan.com" >/dev/null
fi

echo "Putting inline policy $SITE_DEPLOY_POLICY_NAME on $SITE_DEPLOY_ROLE_NAME"
aws iam put-role-policy \
  --role-name "$SITE_DEPLOY_ROLE_NAME" \
  --policy-name "$SITE_DEPLOY_POLICY_NAME" \
  --policy-document "file://$POLICY_FILE" >/dev/null

echo
echo "Role ready: $ROLE_ARN"
echo "Use it with an AWS CLI profile or assume-role flow before running deployment commands."
echo "Example:"
echo "  AWS_PROFILE=scottivan-site npm run aws:deploy"
