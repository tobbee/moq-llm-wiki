#!/usr/bin/env node
// Validates wiki page YAML frontmatter the way Quartz does.
//
// Quartz parses every page's frontmatter with js-yaml, and one malformed block
// aborts `npx quartz build` outright -- taking the GitHub Pages deploy with it
// (see .github/workflows/deploy.yml). js-yaml rejects duplicate mapping keys,
// so an update that appends a second `last_updated:` instead of editing the
// existing one is enough to freeze the published site until the red Actions
// run gets noticed. That happened on 2026-08-19 and went unseen for a week.

import { readFileSync } from "node:fs"
import yaml from "js-yaml"

let failed = 0

for (const file of process.argv.slice(2)) {
  let text
  try {
    text = readFileSync(file, "utf8")
  } catch {
    continue // deleted or renamed in this commit
  }

  const lines = text.split("\n")
  if (lines[0].trim() !== "---") continue // no frontmatter block to check

  const end = lines.findIndex((line, i) => i > 0 && line.trim() === "---")
  if (end === -1) {
    console.error(`${file}: frontmatter opened with '---' but never closed\n`)
    failed++
    continue
  }

  try {
    yaml.load(lines.slice(1, end).join("\n"))
  } catch (err) {
    // Reported verbatim: line numbers are relative to the frontmatter block,
    // matching what the failing `npx quartz build` prints.
    console.error(`${file}: ${err.message}\n`)
    failed++
  }
}

if (failed > 0) {
  console.error(`${failed} page(s) with invalid frontmatter -- \`npx quartz build\` would fail on these.`)
  process.exit(1)
}
