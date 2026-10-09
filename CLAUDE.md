# sof-ia-site

Static site for sof-ia.io, served by GitHub Pages (`CNAME`). No build step. Plain HTML, CSS and a little JS. Pages share fonts (Cormorant Garamond, Newsreader, Work Sans), `favicon.png?v=2`, the dark palette (`--bg #2f2e2b`, `--accent #a9a0ff`) and `lang="en-GB"` on the inner pages. There is no analytics.

## The Human Read (`human-read/`)

Newspaper-style weekly, one folder per edition.

- `human-read/001/` is Edition No. 1, a permanent address. It holds `index.html` and its images (`human-read-01-lead.webp`, `human-read-01-dispatch.webp`, `human-read-01-og.jpg`). The styles are inline in the page.
- `human-read/index.html` is a copy of the latest edition. It is a real copy, not a redirect, because many fetchers ignore meta refresh. It differs from the edition only in image paths (prefixed `001/`), the favicon path (`../favicon.png`) and a comment. Its canonical stays on the permanent edition URL.
- Shipping a new edition: add `human-read/00N/` with its own images, copy its `index.html` over `human-read/index.html` and adjust those paths, add the edition to `sitemap.xml`, and update the `llms.txt` line if the permanent address should change. Add a homepage pill only if asked.
- Dark theme only. The `.np.paper` CSS variables are kept, unused, for a later light version.
- Layout rules that must survive edits:
  - Single column (container under 916px): lead story, "The human read" box, Signal Log, then Advertisements. Wide: ads sit under the lead. This is done with grid areas and a container query, with no duplicated markup.
  - The four "Also this week" cards use subgrid (`grid-row: span 5`) so their rows align. Their "Read on" / "Close" buttons keep `aria-expanded` correct.
- Do not rewrite or shorten the paper's text unless asked.

## Homepage pills

`index.html` has link pills in `.hero-features`. The four small ones sit in `.hero-features-more`: it is `display: contents` on narrow screens, and a centred two-by-two grid from 840px up. Raising the pill count or widths means re-checking for horizontal scroll at 820 and 1360px.

## Before shipping layout changes

Open the page at 390, 820 and 1360px with the real Google Fonts loaded and confirm there is no horizontal scroll. Do not push until the owner has seen the screenshots, if they asked for that.
