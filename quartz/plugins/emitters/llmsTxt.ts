import { getDate } from "../../components/Date"
import { FullSlug, SimpleSlug, joinSegments, simplifySlug } from "../../util/path"
import { QuartzEmitterPlugin } from "../types"
import { write } from "./helpers"

type PageEntry = {
  slug: SimpleSlug
  title: string
  description: string
  content: string
  date?: Date
}

const SECTION_LABELS: Record<string, string> = {
  drafts: "IETF Drafts",
  concepts: "Concepts",
  people: "People",
  implementations: "Implementations",
  discussions: "Discussions",
  interop: "Interop",
}
const SECTION_ORDER = ["drafts", "concepts", "implementations", "interop", "discussions", "people"]

function sectionOf(slug: SimpleSlug): string {
  const first = String(slug).split("/")[0]
  return first in SECTION_LABELS ? first : "other"
}

function absUrl(base: string, slug: SimpleSlug): string {
  return `https://${joinSegments(base, encodeURI(slug))}`
}

export const LlmsTxt: QuartzEmitterPlugin = () => ({
  name: "LlmsTxt",
  async *emit(ctx, content) {
    const cfg = ctx.cfg.configuration
    const base = cfg.baseUrl ?? ""

    const pages: PageEntry[] = []
    let indexEntry: PageEntry | undefined

    for (const [, file] of content) {
      const slug = simplifySlug(file.data.slug!)
      const title = file.data.frontmatter?.title ?? String(slug)
      const description = (file.data.description ?? "").trim()
      const text = (file.data.text ?? "").trim()
      const date = getDate(cfg, file.data)

      const entry: PageEntry = { slug, title, description, content: text, date }
      if (String(slug) === "" || String(slug) === "index") {
        indexEntry = entry
      } else {
        pages.push(entry)
      }
    }

    // Group by top-level folder
    const grouped = new Map<string, PageEntry[]>()
    for (const p of pages) {
      const key = sectionOf(p.slug)
      if (!grouped.has(key)) grouped.set(key, [])
      grouped.get(key)!.push(p)
    }
    for (const list of grouped.values()) {
      list.sort((a, b) => a.title.localeCompare(b.title))
    }

    const orderedSections = [
      ...SECTION_ORDER.filter((s) => grouped.has(s)),
      ...[...grouped.keys()].filter((s) => !SECTION_ORDER.includes(s)),
    ]

    // ----- llms.txt (curated index) -----
    const lines: string[] = []
    lines.push(`# ${cfg.pageTitle}`)
    lines.push("")
    const tagline =
      indexEntry?.description ||
      "A living knowledge base tracking the Media over QUIC (MOQ) protocol ecosystem."
    lines.push(`> ${tagline}`)
    lines.push("")
    lines.push(
      "This file follows the llmstxt.org convention. It lets LLMs and retrieval systems " +
        "enumerate the pages of this site. Use `llms-full.txt` for the concatenated full content.",
    )
    lines.push("")
    lines.push(`- Site: https://${base}/`)
    lines.push(`- Sitemap: https://${base}/sitemap.xml`)
    lines.push(`- RSS: https://${base}/index.xml`)
    lines.push(`- Full content: https://${base}/llms-full.txt`)
    lines.push("")

    for (const section of orderedSections) {
      const label = SECTION_LABELS[section] ?? section[0].toUpperCase() + section.slice(1)
      lines.push(`## ${label}`)
      lines.push("")
      for (const p of grouped.get(section)!) {
        const url = absUrl(base, p.slug)
        const desc = p.description ? `: ${p.description}` : ""
        lines.push(`- [${p.title}](${url})${desc}`)
      }
      lines.push("")
    }

    yield write({
      ctx,
      content: lines.join("\n"),
      slug: "llms" as FullSlug,
      ext: ".txt",
    })

    // ----- llms-full.txt (concatenated full content) -----
    const fullParts: string[] = []
    fullParts.push(`# ${cfg.pageTitle} — Full Content`)
    fullParts.push("")
    fullParts.push(`> ${tagline}`)
    fullParts.push("")
    fullParts.push(`Source: https://${base}/`)
    fullParts.push(`Generated: ${new Date().toISOString()}`)
    fullParts.push("")
    fullParts.push("---")
    fullParts.push("")

    if (indexEntry) {
      fullParts.push(`# ${indexEntry.title}`)
      fullParts.push("")
      fullParts.push(`Source: ${absUrl(base, indexEntry.slug)}`)
      fullParts.push("")
      if (indexEntry.content) fullParts.push(indexEntry.content)
      fullParts.push("")
      fullParts.push("---")
      fullParts.push("")
    }

    for (const section of orderedSections) {
      for (const p of grouped.get(section)!) {
        fullParts.push(`# ${p.title}`)
        fullParts.push("")
        fullParts.push(`Source: ${absUrl(base, p.slug)}`)
        if (p.date) fullParts.push(`Last updated: ${p.date.toISOString().slice(0, 10)}`)
        fullParts.push("")
        if (p.content) fullParts.push(p.content)
        fullParts.push("")
        fullParts.push("---")
        fullParts.push("")
      }
    }

    yield write({
      ctx,
      content: fullParts.join("\n"),
      slug: "llms-full" as FullSlug,
      ext: ".txt",
    })

    // ----- robots.txt -----
    // GitHub Pages project sites serve at a subpath (tobbee.github.io/moq-llm-wiki/),
    // and crawlers honor only the origin-root robots.txt. This file is still useful
    // as an explicit allow-signal that AI crawlers (Perplexity, OpenAI, etc.) do
    // check at subpaths, and as human-readable documentation of our crawl policy.
    const robots = [
      "User-agent: *",
      "Allow: /",
      "",
      "# AI / LLM crawlers — explicitly allowed.",
      "# This wiki is an LLM-maintained knowledge base of public MOQ sources;",
      "# letting LLMs ingest and cite it aligns with the project's purpose.",
      ...[
        "GPTBot",
        "ChatGPT-User",
        "OAI-SearchBot",
        "ClaudeBot",
        "Claude-Web",
        "PerplexityBot",
        "Perplexity-User",
        "Google-Extended",
        "Applebot-Extended",
        "CCBot",
      ].flatMap((ua) => [`User-agent: ${ua}`, "Allow: /", ""]),
      `Sitemap: https://${base}/sitemap.xml`,
      "",
    ].join("\n")

    yield write({
      ctx,
      content: robots,
      slug: "robots" as FullSlug,
      ext: ".txt",
    })
  },
})
