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

### 1. Scaffold the project

```bash
mkdir my-site
cd my-site
git init
```

Create a `.gitignore`:

```gitignore
_site/
.sass-cache/
.jekyll-cache/
.jekyll-metadata
Gemfile.lock
.vendor/
.bundle/
```

Add your remote (replace the URL with your actual repository):

```bash
git remote add origin https://github.com/username/my-site.git
```

### 2. Gemfile

Create a `Gemfile` in your project root:

```ruby
source "https://rubygems.org"

gem "jekyll", "~> 4.3"
gem "jekyll-remote-theme"
gem "jekyll-readme-index"
```

<a href="./Gemfile.sample" download>⬇ Download Gemfile.sample</a>

### 3. _config.yml

Create a `_config.yml` with the theme reference and your settings:

```yaml
remote_theme: simplonco/simplonline-ressources-jekyll-theme

title: My Site Title
description: My site description
lang: en

show_toc: true

readme_index:
  with_frontmatter: true

markdown: kramdown
kramdown:
  input: GFM
  syntax_highlighter: rouge
  auto_ids: true

defaults:
  - scope:
      path: ""
    values:
      layout: default

plugins:
  - jekyll-readme-index
  - jekyll-remote-theme
```

<a href="./_config.sample.yml" download>⬇ Download _config.sample.yml</a>

#### Configuration options

| Variable      | Type   | Default | Description |
|---------------|--------|---------|-------------|
| `title`       | string | —       | Site title displayed in header |
| `description` | string | —       | Site description |
| `lang`        | string | `en`    | HTML lang attribute |
| `show_toc`    | bool   | `false` | Show table of contents on each page |

### 4. Run the server

```bash
bundle install
bundle exec jekyll serve --livereload
```

Your site will be available at `http://localhost:4000`.

{: .alert-info }
**How pages work:** `README.md` is the entry point of your site. It is automatically converted to `index.html`. Create additional pages as Markdown files (e.g., `about.md`, `contact.md`) anywhere in the repository; each becomes a page on your site.

## Page front matter

Each page can define metadata in its YAML front matter:

```yaml
---
title: Page title
description: Page description
show_toc: true
parent: Parent page title
---
```

| Field         | Type   | Required | Description |
|---------------|--------|----------|-------------|
| `title`       | string | no       | Page title (overrides site title in `<title>` and header) |
| `description` | string | no       | Meta description for SEO, displayed as subtitle |
| `show_toc`    | bool   | no       | Set `true` to show the table of contents sidebar |
| `parent`      | string | no       | Title of the parent page (enables breadcrumbs + back link) |

## Breadcrumbs

Breadcrumbs appear automatically when the page has a `parent` in its front matter and that parent page exists. The trail traverses up to 4 levels.

```
Home > JavaScript > Variables
```

If no `parent` is set, no breadcrumbs are shown.

## Parent-link (back link)

When `parent` is set, a "← Back to [parent title]" link appears at the top of the page content, just below the breadcrumbs. Styled in the theme's red color.

## Table of contents

Enable with `show_toc: true` in the page front matter. The TOC is generated from H2 through H6 headings. On screens wider than 1200px, it appears as a sticky sidebar; on smaller screens it shows at the top of the content. `id` attributes on headings are generated automatically by kramdown, so you can link to them directly.


## Syntax highlighting

Code blocks are colorized via Rouge (kramdown's default syntax highlighter). Use standard fenced code blocks:

<pre>
```javascript
const name = "Alice";
let age = 25;
```
</pre>
will render as:
```javascript
const name = "Alice";
let age = 25;
```

<pre>
```css
.card {
  background: #fff;
  border-radius: 8px;
}
```
</pre>
will render as:
```css
.card {
  background: #fff;
  border-radius: 8px;
}
```

Supported languages: any language supported by Rouge (JavaScript, CSS, HTML, Python, Ruby, Bash, YAML, etc.).

## YouTube embeds

YouTube links are automatically converted to embedded video players on GitHub Pages.

### Thumbnail syntax (recommended)

```markdown
[![Video title](https://img.youtube.com/vi/VIDEO_ID/0.jpg)](https://youtu.be/VIDEO_ID)
```

[![Video title](https://img.youtube.com/vi/jNQXAC9IVRw/0.jpg)](https://youtu.be/jNQXAC9IVRw)


On GitHub this shows the video thumbnail as a link. On GitHub Pages the thumbnail is replaced by a 16:9 iframe player with YouTube's privacy-enhanced mode (`youtube-nocookie.com`).


## Interactive playground

Embed a live code editor with preview using the `playground.html` include.

{% raw %}
```
{% capture my_html %}
<h1>Hello World</h1>
{% endcapture %}

{% capture my_css %}
h1 { color: red; }
{% endcapture %}

{% capture my_js %}
console.log('Hello');
{% endcapture %}

{% include playground.html
  id="demo"
  initial_html=my_html
  initial_css=my_css
  initial_js=my_js
%}
```
{% endraw %}

| Parameter     | Required | Description |
|---------------|----------|-------------|
| `id`          | no       | Unique identifier (auto-generated if omitted) |
| `initial_html`| no       | Initial HTML code (via {% raw %}`{% capture %}`{% endraw %}) |
| `initial_css` | no       | Initial CSS code |
| `initial_js`  | no       | Initial JavaScript code |

All three code parameters can be omitted — pass only what you need.

The playground renders with three tabs (HTML, CSS, JS), a CodeMirror editor with syntax highlighting, and a live preview panel. The preview updates automatically on every change (300ms debounce). A "Open in CodePen" button exports the code. On mobile, the preview collapses below the editor with a "View result" toggle.

{% capture my_html %}
<h1>Hello World</h1>
{% endcapture %}

{% capture my_css %}
h1 { color: red; }
{% endcapture %}

{% capture my_js %}
console.log('Hello');
{% endcapture %}

{% include playground.html
  id="demo"
  initial_html=my_html
  initial_css=my_css
  initial_js=my_js
%}

For a minimal playground with small initial code, you can use inline code instead of <code>&#123;% capture %}</code> blocks:

<pre><code>&#123;% include playground.html
  id="mini"
  initial_html="&lt;h1&gt;Hello&lt;/h1&gt;"
%}
</code></pre>

## Utility classes

Thanks to kramdown's Markdown parser, you can add classes to any block element by appending `{:.classname}` after the block. For example:

Available utility classes:
- `alert-info` — blue left border, for informational messages
- `alert-warning` — orange left border, for warnings
- `text-center` — center-align text
- `text-end` — right-align text


```html
**Info**: Remember to check your syntax.
{: .alert-info} 

**Warning**: This feature is deprecated.
{: .alert-warning}

**Text aligned center**
{: .text-center}

**Text aligned right**
{: .text-end}
```

**Info**: Remember to check your syntax.
{: .alert-info} 

**Warning**: This feature is deprecated.
{: .alert-warning}

**Text aligned center**
{: .text-center}

**Text aligned right**
{: .text-end}

**Combined example**:
Alert box with warning style and centered text.
{: .alert-warning .text-center}

## Quotes
Use blockquotes for quotes:

```markdown
> This is a quote.
> It can span multiple lines.
```

> This is a quote.  
> It can span multiple lines.

## Tips
Breaklines with two spaces at the end of a line, or use `<br>` for a hard break:

```markdown
This is a line with a break after it.  
This is the next line.

This is a line with a hard break.<br>
This is the next line.
```

This is a line with a break after it.  
This is the next line.

This is a line with a hard break.<br>
This is the next line.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md).

## License

MIT — see [LICENSE](./LICENSE).
