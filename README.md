---
layout: default
---

# Simplonline Ressources — Jekyll Theme

[⬅ Version française](./README-FR)

A Jekyll theme for creating learning resources (exercises, tutorials, static pages) for Simplonline learners. Branded **Wild Code School by Simplon**.

[View demo](https://simplonco.github.io/simplonline-ressources-jekyll-theme)

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
| `show_toc`    | bool   | `true`  | Show table of contents |

## Features

- Dark/light mode with auto-detection and manual toggle
- Responsive design (mobile-first)
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
