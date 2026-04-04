#!/usr/bin/env bash
set -euo pipefail

ACCOUNT_ID="${ACCOUNT_ID:-$(aws sts get-caller-identity --query Account --output text)}"
AWS_REGION="${AWS_REGION:-us-east-1}"

export AWS_PAGER=""

BUDGET_NAME="${BUDGET_NAME:-scottivan-site-monthly}"
BUDGET_LIMIT_USD="${BUDGET_LIMIT_USD:-25}"
PROJECT_TAG_KEY="${PROJECT_TAG_KEY:-Project}"
PROJECT_TAG_VALUE="${PROJECT_TAG_VALUE:-scottivan-site}"

BUDGET_FILE="$(mktemp)"
trap 'rm -f "$BUDGET_FILE"' EXIT

cat >"$BUDGET_FILE" <<JSON
{
  "BudgetName": "${BUDGET_NAME}",
  "BudgetLimit": {
    "Amount": "${BUDGET_LIMIT_USD}",
    "Unit": "USD"
  },
  "TimeUnit": "MONTHLY",
  "BudgetType": "COST",
  "CostFilters": {
    "TagKeyValue": [
      "user:${PROJECT_TAG_KEY}\$${PROJECT_TAG_VALUE}"
    ]
  },
  "CostTypes": {
    "IncludeCredit": true,
    "IncludeDiscount": true,
    "IncludeOtherSubscription": true,
    "IncludeRecurring": true,
    "IncludeRefund": false,
    "IncludeSubscription": true,
    "IncludeSupport": true,
    "IncludeTax": true,
    "IncludeUpfront": true,
    "UseAmortized": false,
    "UseBlended": false
  }
}
JSON

if aws budgets describe-budget \
  --region "$AWS_REGION" \
  --account-id "$ACCOUNT_ID" \
  --budget-name "$BUDGET_NAME" >/dev/null 2>&1; then
  echo "Updating existing budget '$BUDGET_NAME' to \$${BUDGET_LIMIT_USD}/month"
  aws budgets update-budget \
    --region "$AWS_REGION" \
    --account-id "$ACCOUNT_ID" \
    --new-budget "file://$BUDGET_FILE" >/dev/null
else
  echo "Creating budget '$BUDGET_NAME' at \$${BUDGET_LIMIT_USD}/month"
  aws budgets create-budget \
    --region "$AWS_REGION" \
    --account-id "$ACCOUNT_ID" \
    --budget "file://$BUDGET_FILE" >/dev/null
fi

echo "Budget configured for tag ${PROJECT_TAG_KEY}=${PROJECT_TAG_VALUE}."
echo "If no costs appear, activate the '${PROJECT_TAG_KEY}' cost allocation tag in Billing > Cost allocation tags."
