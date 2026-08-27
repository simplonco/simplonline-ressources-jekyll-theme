---
title: Simplonline Ressources - Jekyll Theme
layout: default
show_toc: true
---

# Simplonline Ressources - Jekyll Theme

[⬅ Version française](./README-FR)

A Jekyll theme for creating learning resources (exercises, tutorials, static pages) for Simplonline learners. Branded **Wild Code School by Simplon**.  
[View website version](https://simplonco.github.io/simplonline-ressources-jekyll-theme/)

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
gem "webrick", "~> 1.8"
gem "jekyll-remote-theme"
gem "jekyll-readme-index"
gem "jekyll-stepper"
```

{: .alert-warning }
**Do not use the `github-pages` gem.** It enforces `safe: true` which blocks non-whitelisted plugins like `jekyll-stepper`.

<a href="./sample-Gemfile" download="Gemfile">⬇ Download Gemfile</a>

### 3. _config.yml

Create a `_config.yml` with the theme reference and your settings:

```yaml
remote_theme: simplonco/simplonline-ressources-jekyll-theme

title: "My Site Title"
description: "My site description"
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
  - jekyll-stepper
```

<a href="./_config-sample.yml" download="_config.yml">⬇ Download _config.yml</a>

#### Configuration options

| Variable      | Type   | Default | Description |
|---------------|--------|---------|-------------|
| `title`       | string | —       | Site title displayed in header |
| `description` | string | —       | Site description |
| `lang`        | string | `en`    | HTML lang attribute |
| `show_toc`    | bool   | `false` | Show table of contents on each page |

### 4. Run the server

To test your content locally before deployment, you need to [install Jekyll](https://jekyllrb.com/docs/installation/#guides) on your machine.  
Once installed, install the project dependencies with Bundler:

```bash
bundle install
```
Launch the Jekyll server:

```bash
bundle exec jekyll serve --livereload
```

Your site will be available at `http://localhost:4000`.

## How pages work

{: .alert-info }
`README.md` is the entry point of your site. It is automatically converted to `index.html`. Create additional pages as Markdown files (e.g., `about.md`, `contact.md`) anywhere in the repository; each becomes a page on your site.

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

Code blocks are colorized via Rouge (kramdown's default syntax highlighter). Use standard fenced code blocks.

Supported languages: any language supported by Rouge (JavaScript, CSS, HTML, Python, Ruby, Bash, YAML, etc.).

### Javascript example
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

### CSS example
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

### Diff blocks

Fenced code blocks with the `diff` language get color-coded additions and deletions:

```markdown
​```diff
- const old = "removed";
+ const updated = "added";
​```
```

```diff
- const old = "removed";
+ const updated = "added";
```

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
| `default_tab` | no       | Tab open on load: `html`, `css` or `js` (default: `html`) |

All three code parameters can be omitted — pass only what you need.

The playground renders with three tabs (HTML, CSS, JS), a CodeMirror editor with syntax highlighting, and a live preview panel. The preview updates automatically on every change (300ms debounce). A "Open in CodePen" button exports the code. On mobile, the preview collapses below the editor with a "View result" toggle.

Console output from the executed code (`console.log`, `console.info`, `console.warn`, `console.error`, `console.debug`) is displayed in a "Console" drawer below the preview — click the Console button to expand it (a badge shows the message count). Uncaught JavaScript errors are also displayed there in red; no need to open the browser devtools.

To start on a tab other than HTML:

{% raw %}
```
{% include playground.html
  id="demo-js"
  initial_js=my_js
  default_tab="js"
%}
```
{% endraw %}

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
  default_tab="js"
%}

For a minimal playground with small initial code, you can use inline code instead of <code>&#123;% capture %}</code> blocks:

<pre><code>&#123;% include playground.html
  id="mini"
  initial_html="&lt;h1&gt;Hello&lt;/h1&gt;"
%}
</code></pre>

## Solution within content

If you want to include a solution in your content (e.g., for exercises, playground solutions, etc.), you can use the html `<details markdown="1">` element to create a collapsible section. This allows learners to reveal the solution only when they choose to. The attribute `markdown="1"` enables Markdown rendering inside the `<details>` and `<summary>` tags.

### Example

````markdown
<details markdown="1">
<summary>Show solution</summary>
```html
<h1>Hello World</h1>
```
```css
h1 { color: red; }
```
```javascript
console.log('Hello');
```
</details>
````

Will render as:

<details markdown="1">
<summary>Show solution</summary>

```html
<h1>Hello World</h1>
```

```css
h1 { color: red; }
```

```javascript
console.log('Hello');
```
</details>

## Interactive quiz

Embed a QCM (multiple choice quiz) in your pages using the `quiz.html` include.

{% raw %}
```
{% capture quiz_data %}
[{"question":"What does HTML stand for?","options":["Hyper Text Markup Language","High Tech Modern Language","Home Tool Markup Language","Hyper Transfer Markup Language"],"correct":0}]
{% endcapture %}
{% include quiz.html data=quiz_data %}
```
{% endraw %}

| Parameter | Required | Description |
|-----------|----------|-------------|
| `data`    | yes      | JSON array of questions (captured via {% raw %}`{% capture %}`{% endraw %}) |

**Question format:**

```json
{
  "question": "Question text",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "correct": 0
}
```

- `question` (string) — the question text
- `options` (array) — answer choices
- `correct` (number or array) — index of the single correct answer, **or** an array of indices for multiple correct answers

**Single-answer example:**

```json
{"question":"What does HTML stand for?","options":["Hyper Text Markup Language","High Tech Modern Language","Home Tool Markup Language","Hyper Transfer Markup Language"],"correct":0}
```

**Multiple-answer example:**

```json
{"question":"Which are programming languages?","options":["HTML","Python","CSS","JavaScript"],"correct":[1,3]}
```

Each question renders inside a `<fieldset>` with a `<legend>`. The input type (`radio` or `checkbox`) is automatically chosen based on whether `correct` is a number or an array. A "Valider" (Submit) button triggers visual feedback: green for correct answers, red for incorrect ones. Keyboard navigation is fully supported (Tab, arrow keys, Enter).

**Live example:**

{% capture quiz_data %}
[{"question":"What does HTML stand for?","options":["Hyper Text Markup Language","High Tech Modern Language","Home Tool Markup Language","Hyper Transfer Markup Language"],"correct":0},{"question":"Which are programming languages?","options":["HTML","Python","CSS","JavaScript"],"correct":[1,3]}]
{% endcapture %}
{% include quiz.html data=quiz_data %}

## Stepper

The stepper component creates an accordion with navigation for step-by-step tutorials. Use a fenced code block with the `stepper` language identifier.

### Syntax

Use 4 backticks for the outer block (to allow nested code blocks inside):

`````
````stepper
# Step title

Content in markdown...

# Another step

```html
<h1>Hello World</h1>
```
````
`````

### How it works

- Each `# Title` becomes an accordion header (`<summary>`)
- Content between titles is rendered as markdown
- A navigation bar with Previous/Next buttons is added automatically
- The first step is open by default
- Only one step can be open at a time

### Example

````stepper
# Valider la ressource suivante

Consultez la ressource sur l'introduction au HTML.

# Connaitre la structure de base

Un document HTML suit cette structure :

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Mon site</title>
</head>
<body>
    <p>Hello World</p>
</body>
</html>
```

# Créer votre premier fichier

Créez un fichier `index.html` et ajoutez le code ci-dessus.
````

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

**Combined example**:
Alert box with warning style and centered text.
{: .alert-warning .text-center}
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

## Demo

[View demo](./demo/)
