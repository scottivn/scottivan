#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"

SETUP_BUDGET="${SETUP_BUDGET:-true}"

"$SCRIPT_DIR/deploy-aws.sh"
"$SCRIPT_DIR/publish-site.sh"
"$SCRIPT_DIR/update-allowlist-ip.sh"

if [[ "$SETUP_BUDGET" == "true" ]]; then
  "$SCRIPT_DIR/setup-budget.sh"
fi

echo
echo "Full deploy completed: infra, publish, IP allowlist, and budget check."
