#!/bin/bash
git config core.hooksPath .githooks



# # Array of allowed branch name patterns
# ALLOWED_PATTERNS=("feature/*" "bugfix/*" "hotfix/*")

# # Loop through each branch being pushed
# while read -r branch; do
#   valid=false
#   for pattern in "${ALLOWED_PATTERNS[@]}"; do
#     if [[ $branch == $pattern ]]; then
#       valid=true
#       break
#     fi
#   done

#   if ! $valid; then
#     echo "Error: Branch name '$branch' does not follow an allowed pattern."
#     exit 1
#   fi
# done <<< "$(git rev-list --no-walk --exclude=refs/heads/* --exclude=refs/pull/* $GITHUB_SHA --)"
