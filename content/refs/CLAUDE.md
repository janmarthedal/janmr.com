# Reference Files Format

Each `*.md` file in this folder represents a reference to a book or academic paper.
The files use YAML front matter followed by optional Markdown body content.
Each filename references either the title of the book/paper or the main author
followed by an optional two-digit year (referencing the publication year).

## Front Matter Fields

### Required

- `layout: reference` — Always set to `reference`
- `title` — Title of the book or paper
- `authors` — YAML list of author full names

### Optional

- `date` — Publication year (e.g., `'1997'`) or full date (e.g., `'1944-01-22'`), quoted as a string. Full date is preferred.
- `isbn` — ISBN for books (no dashes or with dashes, quoted as a string)
- `journal` — Journal citation string for papers (e.g., `"Bell System Technical Journal. 27 (3): 379–423, 1948"`)
- `tags` — YAML list of tags; e.g., `[classic, computer-science]`. The `classic` tag marks a reference as a classic paper. Category tags include: `computer-graphics`, `computer-science`, `data-science`, `information-theory`, `numerical-analysis`
- `links` — YAML list of related links, each with:
  - `name` — Display text for the link
  - `url` — URL (can be absolute or site-relative like `/files/papers/...`)
  - `about` — (rare) Additional HTML text displayed after the link

## Body Content

- For books: typically a cover image, e.g., `![](/media/books/taocp1.jpg)`
- For papers: typically a prose summary/description of the paper's significance
- Can be empty

## Other Files

- `index.njk` — Lists all references
