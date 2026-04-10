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

echo "=== MOQ Wiki Update: $(date -Iseconds) ===" >> "$LOG_FILE"

cd "$WIKI_DIR"

/Users/tobbe/.local/bin/claude -p \
  --allowedTools "Bash,Read,Write,Edit,Glob,Grep,WebFetch,WebSearch,mcp__claude_ai_Slack__slack_read_channel,mcp__claude_ai_Slack__slack_search_channels" \
  "Update the MOQ wiki. Follow the update workflow in CLAUDE.md:
1. Read latest Slack #moq messages (channel C046V0QF3CK) since the last update noted in wiki/log.md
2. Check GitHub moq-wg repos for new issues and merged PRs (moq-transport, msf, loc)
3. Fetch recent threads from https://mailarchive.ietf.org/arch/browse/moq/
4. Check https://datatracker.ietf.org/group/moq/documents/ for new draft versions
5. Update the relevant wiki pages (discussions, drafts, interop, implementations)
6. Update wiki/log.md with what changed
7. Commit all changes with a descriptive message
Do NOT push to remote." \
  >> "$LOG_FILE" 2>&1

echo "=== Update complete: $(date -Iseconds) ===" >> "$LOG_FILE"
echo "" >> "$LOG_FILE"
