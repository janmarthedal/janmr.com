# CLAUDE.md

## Project Overview

This is a custom static site generator for janmr.com, a personal website and blog focused on mathematics and computer science. The site is built using TypeScript and generates static HTML pages from Markdown and Nunjucks templates.

## Tech Stack

- **TypeScript** - Main build system language
- **Nunjucks** - Templating engine for HTML
- **Markdown-it** - Markdown parser with KaTeX (math) and Prism (syntax highlighting) plugins
- **LESS** - CSS preprocessor
- **Gray-matter** - Front matter parser for content files

## Project Structure

```
janmr.com/
├── content/          # Source content files
│   ├── blog/        # Blog posts (Markdown with front matter)
│   ├── css/         # CSS and LESS files
│   ├── cv/          # CV/resume content
│   ├── files/       # Static files (copied as-is)
│   ├── lab/         # Lab/experiments
│   ├── links/       # Links pages
│   ├── media/       # Media files (images, etc.)
│   ├── refs/        # Reference pages
│   └── *.njk        # Top-level Nunjucks templates
├── layouts/         # Nunjucks layout templates
│   ├── base.njk
│   ├── page.njk
│   └── reference.njk
├── src/             # TypeScript source code
│   ├── rss/         # RSS feed generation utilities
│   └── run.ts       # Main build script
├── build/           # Compiled JavaScript (generated)
├── _site/           # Generated static site (output)
└── package.json
```
