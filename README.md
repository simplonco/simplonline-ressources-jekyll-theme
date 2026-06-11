---
title: Simplonline Ressources — Jekyll Theme
layout: default
show_toc: true
---

# Simplonline Ressources — Jekyll Theme

[⬅ Version française](./README-FR)

A Jekyll theme for creating learning resources (exercises, tutorials, static pages) for Simplonline learners. Branded **Wild Code School by Simplon**.

[View demo](./demo/)

## Installation

Add this line to your `_config.yml`:

```yaml
remote_theme: simplonco/simplonline-ressources-jekyll-theme
```

## Configuration

| Variable      | Type   | Default | Description |
|---------------|--------|---------|-------------|
| `title`       | string | —       | Site title displayed in header |
| `description` | string | —       | Site description |
| `lang`        | string | `en`    | HTML lang attribute |
| `show_toc`    | bool   | `false` | Show table of contents on each page |

## Page front matter

Each page can override the site defaults with its own YAML front matter:

```yaml
---
title: Page title
description: Page description for SEO and display
show_toc: true
parent: Parent page title
---
```

| Field         | Type   | Description |
|---------------|--------|-------------|
| `title`       | string | Page title (overrides site title in header and browser tab) |
| `description` | string | Page description (used in meta tags and subtitle) |
| `show_toc`    | bool   | Enable table of contents for this page |
| `parent`      | string | Title of the parent page (enables breadcrumbs and back link) |

## Features

- Dark/light mode with auto-detection and manual toggle
- Responsive design (mobile-first)
- **Table of contents** — auto-generated from H2–H6 headings when `show_toc: true`
- **Breadcrumbs** — automatic navigation trail, links back to parent page
- **Syntax highlighting** — code blocks colorized via Rouge (supports all common languages)
- **YouTube embeds** — YouTube links converted to embedded players on GitHub Pages:
  - `[![Titre](https://img.youtube.com/vi/ID/0.jpg)](https://youtu.be/ID)` — thumbnail on GitHub, player on GitHub Pages
  - `<https://youtu.be/ID>` — auto-detected and converted to player
- CSS custom properties — no Sass required
- Utility classes: `alert-info`, `alert-warning`, `text-center`, `text-end`
- MIT License

## Local development

```bash
bundle install
bundle exec jekyll serve --livereload
```

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md).

## License

MIT — see [LICENSE](./LICENSE).
