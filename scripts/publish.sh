#!/usr/bin/env sh
set -eu

# Usage:
#   ./scripts/publish.sh "your commit message"
#
# Stages all changes, commits, then pushes to origin.

if [ "${1-}" = "" ]; then
  echo "Error: commit message required."
  echo "Usage: ./scripts/publish.sh \"your commit message\""
  exit 1
fi

git add -A
git commit -m "$1"
git push -u origin HEAD
