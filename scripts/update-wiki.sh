#!/bin/bash
# MOQ Wiki auto-update script
# Runs claude in headless mode to check all sources and update the wiki.
# Intended to be run via cron, e.g.:
#   0 9 * * 1  /Users/tobbe/proj/github/tobbee/moq-llm-wiki/scripts/update-wiki.sh
#
# Prerequisites:
#   - claude CLI authenticated (run `claude` interactively first)
#   - Slack MCP available via Claude.ai plugin auth

set -euo pipefail

WIKI_DIR="/Users/tobbe/proj/github/tobbee/moq-llm-wiki"
LOG_FILE="${WIKI_DIR}/scripts/update.log"
PROMPT_FILE="${WIKI_DIR}/scripts/update-prompt.md"

echo "=== MOQ Wiki Update: $(date -Iseconds) ===" >> "$LOG_FILE"

cd "$WIKI_DIR"

cat "$PROMPT_FILE" | /Users/tobbe/.local/bin/claude -p \
  --allowedTools "Bash,Read,Write,Edit,Glob,Grep,WebFetch,WebSearch,mcp__claude_ai_Slack__slack_read_channel,mcp__claude_ai_Slack__slack_search_channels" \
  >> "$LOG_FILE" 2>&1

echo "=== Update complete: $(date -Iseconds) ===" >> "$LOG_FILE"
echo "" >> "$LOG_FILE"
