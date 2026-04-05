#!/usr/bin/env bash
set -euo pipefail

# Deploy infrastructure for all models listed in models.json.
# Usage: bash scripts/deploy-all-models.sh

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd -- "$SCRIPT_DIR/.." && pwd)"
MODELS_FILE="$REPO_ROOT/models.json"

if [[ ! -f "$MODELS_FILE" ]]; then
  echo "Error: models.json not found at $MODELS_FILE"
  exit 1
fi

# Read slugs from models.json (requires python3 for JSON parsing)
SLUGS=$(python3 -c "
import json, sys
models = json.load(open('$MODELS_FILE'))
for m in models:
    if m.get('status') == 'live':
        print(m['slug'])
")

if [[ -z "$SLUGS" ]]; then
  echo "No models with status 'live' found in models.json"
  exit 0
fi

for SLUG in $SLUGS; do
  echo ""
  echo "=============================="
  MODEL_NAME="$SLUG" "$SCRIPT_DIR/deploy-model.sh"
  echo ""
  MODEL_NAME="$SLUG" "$SCRIPT_DIR/publish-model.sh"
  echo "=============================="
done

echo ""
echo "All live models deployed and published."
