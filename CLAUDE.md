# CLAUDE.md

## Project Overview

This is a custom static site generator for janmr.com, a personal website and blog focused on mathematics and computer science. The site is built using TypeScript and generates static HTML pages from Markdown and Nunjucks templates.

## Tech Stack

- **Bun** - Runtime and package manager; runs `src/run.ts` directly, no compile step
- **TypeScript** - Main build system language
- **Nunjucks** - Templating engine for HTML
- **Markdown-it** - Markdown parser with KaTeX (math) and Prism (syntax highlighting) plugins
- **LESS** - CSS preprocessor
- **Gray-matter** - Front matter parser for content files

## Project Structure

```
janmr.com/
├── _site/               # Generated static site (output)
├── assets-src/          # Source scripts/projects that generate content/media assets (not built)
├── content/             # Source content files
│   ├── css/             # CSS and LESS files
│   ├── files/           # Static files (copied as-is)
│   ├── lab/             # Lab/experiments
│   ├── me/              # About/personal pages
│   ├── media/           # Media files (images, etc.)
│   ├── notes/           # Notes and reference content
│   │   ├── links/       # Curated links
│   │   └── tools/       # Tools references
│   ├── posts/           # Blog posts (Markdown with front matter)
│   ├── refs/            # Reference pages
│   ├── updates/         # Updates/changelog content
│   └── *.njk            # Top-level Nunjucks templates (index, feed)
├── layouts/             # Nunjucks layout templates
│   ├── base.njk
│   ├── page.njk
│   └── reference.njk
├── og/                  # Helper images and scripts for creating Open Graph protocol images for posts
├── src/                 # TypeScript source code
│   ├── rss/             # RSS feed generation utilities
│   └── run.ts           # Main build script
├── studies/             # Study materials
├── update-archive/      # Social media post archive
│   └── drafts/          # Drafts for future updates
│       └── template.md  # Template for updates
├── package.json
└── tsconfig.json
```

`CLAUDE.md` and `SPEC.md` files may be placed inside any `content/` subdirectory
(e.g. next to a post series) to document conventions or track planned/current
posts — both filenames are excluded from the build by `IGNORE_PATTERNS` in
`src/run.ts` and never produce output.

## Link Checking

`bun run make && bun run check-links` checks links in `_site` offline with
[lychee](https://github.com/lycheeverse/lychee) (`scripts/check-links.ts`,
settings in `lychee.toml`). Internal links, including absolute
`https://janmr.com/...` ones, are resolved against `_site`; `#fragments` are
checked. Links to redirect sources in `_site/_redirects` are warnings, other
broken links are errors (exit code 1). `bun run check-links:external` also
checks external links (cached for 7 days in `.lycheecache`). In that mode,
permanent redirects (301/308) and 403 Forbidden responses are warnings, and
http(s) links matching an `exclude` pattern in `lychee.toml` (e.g. sites that
block non-browser clients) are listed as `CHECK` entries to verify by hand.
