#!/usr/bin/env bash
set -euo pipefail

# Scaffold a new model site from the _template.
# Usage: MODEL_NAME=my-new-model bash scripts/add-model.sh

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd -- "$SCRIPT_DIR/.." && pwd)"

MODEL_NAME="${MODEL_NAME:?MODEL_NAME is required (e.g. my-new-model)}"
TEMPLATE_DIR="$REPO_ROOT/sites/_template"
TARGET_DIR="$REPO_ROOT/sites/${MODEL_NAME}"

if [[ -d "$TARGET_DIR" ]]; then
  echo "Error: $TARGET_DIR already exists"
  exit 1
fi

if [[ ! -d "$TEMPLATE_DIR" ]]; then
  echo "Error: template directory not found at $TEMPLATE_DIR"
  exit 1
fi

echo "Scaffolding new model: ${MODEL_NAME}"
cp -r "$TEMPLATE_DIR" "$TARGET_DIR"

# Replace placeholder name in package.json
sed -i '' "s/@scottivan\\/template/@scottivan\\/${MODEL_NAME}/g" "$TARGET_DIR/package.json"

echo "Installing workspace dependencies..."
(cd "$REPO_ROOT" && npm install)

echo ""
echo "Model scaffolded at: sites/${MODEL_NAME}/"
echo ""
echo "Next steps:"
echo "  1. Edit sites/${MODEL_NAME}/src/app/page.tsx"
echo "  2. Update models.json with the new model entry"
echo "  3. npm run dev --workspace=@scottivan/${MODEL_NAME}"
echo "  4. MODEL_NAME=${MODEL_NAME} bash scripts/deploy-model.sh"
echo "  5. MODEL_NAME=${MODEL_NAME} bash scripts/publish-model.sh"
