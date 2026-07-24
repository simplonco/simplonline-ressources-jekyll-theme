## 1. Page metadata (front matter title/description)

- [x] 1.1 Update `_layouts/default.html` to read `page.title` and `page.description` from front matter with fallback to `site.title` and `site.description`
- [x] 1.2 Add `og:title`, `og:description`, `og:type`, `og:url` meta tags in `_includes/head.html` using page front matter
- [x] 1.3 Update header to display `page.title` when present

## 2. Table of contents

- [x] 2.1 Create `_includes/toc.html` that parses `content` and extracts H2-H6 headings with anchors
- [x] 2.2 Add conditional TOC rendering in `_layouts/default.html` based on `page.show_toc`
- [x] 2.3 Style TOC in `assets/css/style.css` (indentation, hover, responsive)
- [x] 2.4 Add heading anchor generation (IDs from heading text) in JS

## 3. Breadcrumbs and sub-page navigation

- [x] 3.1 Create `_includes/breadcrumbs.html` with home link and current page trail
- [x] 3.2 Add breadcrumbs to `_layouts/default.html` (hidden on home page)
- [x] 3.3 Create `_includes/parent-link.html` for "← Retour" navigation based on front matter `parent` field
- [x] 3.4 Style breadcrumbs in CSS

## 4. Code syntax highlighting

- [x] 4.1 Enable Rouge in `_config.yml` with a theme compatible with dark/light mode
- [x] 4.2 Add CSS for syntax highlighting (light theme variables)
- [x] 4.3 Add CSS for syntax highlighting (dark theme variables via `prefers-color-scheme`)
- [x] 4.4 Style code blocks (background, border, language label, monospace font)

## 5. YouTube embed

- [x] 5.1 Create `_includes/youtube.html` with responsive iframe wrapper
- [x] 5.2 Create JS that detects YouTube URLs in content and replaces them with embeds
- [x] 5.3 Style the YouTube embed (responsive 16:9 aspect ratio, max-width)

## 6. Configuration and documentation

- [x] 6.1 Add `show_toc` and `parent` to `config-sample.yml` with comments
- [x] 6.2 Document new front matter fields in README.md / README-FR.md
