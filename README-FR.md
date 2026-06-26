---
title: Simplonline Ressources — Thème Jekyll
layout: default
show_toc: true
---

# Simplonline Ressources — Thème Jekyll

[⬅ English version](./README.md)

Un thème Jekyll pour créer des ressources pédagogiques (exercices, tutoriels, pages statiques) à destination des apprenants Simplonline. Marqué **Wild Code School by Simplon**.

[Voir la démo](./demo/)

## Installation

### 1. Préparer le projet

```bash
mkdir mon-site
cd mon-site
git init
```

Créez un `.gitignore` :

```gitignore
_site/
.sass-cache/
.jekyll-cache/
.jekyll-metadata
Gemfile.lock
.vendor/
.bundle/
```

Ajoutez votre dépôt distant (remplacez l'URL par votre véritable dépôt) :

```bash
git remote add origin https://github.com/utilisateur/mon-site.git
```

### 2. Gemfile

Créez un `Gemfile` à la racine de votre projet :

```ruby
source "https://rubygems.org"

gem "github-pages", group: :jekyll_plugins
gem "webrick", "~> 1.8"
```

<a href="./sample-Gemfile" download="Gemfile">⬇ Télécharger Gemfile</a>

### 3. _config.yml

Créez un `_config.yml` avec la référence au thème et vos réglages :

```yaml
remote_theme: simplonco/simplonline-ressources-jekyll-theme

title: Titre de mon site
description: Description de mon site
lang: fr

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

<a href="./_config-sample.yml" download="_config.yml">⬇ Télécharger _config.yml</a>

#### Configuration options

| Variable      | Type   | Défaut | Description |
|---------------|--------|--------|-------------|
| `title`       | string | —      | Titre affiché dans l'en-tête |
| `description` | string | —      | Description du site |
| `lang`        | string | `en`   | Attribut HTML lang |
| `show_toc`    | bool   | `false`| Afficher la table des matières |

### 4. Lancez le serveur

```bash
bundle install
bundle exec jekyll serve --livereload
```

Votre site sera accessible à l'adresse `http://localhost:4000`.

{: .alert-info }
**Fonctionnement des pages :** `README.md` est le point d'entrée de votre site. Il est automatiquement converti en `index.html`. Ajoutez d'autres pages en Markdown (ex : `about.md`, `contact.md`) à n'importe quel endroit du dépôt ; chacune devient une page de votre site.

## Front Matter des pages

Chaque page peut définir ses métadonnées dans l'en-tête YAML :

```yaml
---
title: Titre de la page
description: Description pour le SEO
show_toc: true
parent: Titre de la page parente
---
```

| Champ        | Type   | Requis | Description |
|--------------|--------|--------|-------------|
| `title`      | string | non    | Titre de la page (remplace le titre global dans `<title>` et l'en-tête) |
| `description`| string | non    | Description SEO, affichée comme sous-titre |
| `show_toc`   | bool   | non    | Mettre `true` pour afficher la table des matières |
| `parent`     | string | non    | Titre de la page parente (active le fil d'Ariane + lien retour) |

## Fil d'Ariane

Le fil d'Ariane apparaît automatiquement quand la page a un `parent` dans son front matter et que cette page parente existe. La remontée traverse jusqu'à 4 niveaux.

```
Accueil > JavaScript > Variables
```

Si `parent` n'est pas défini, aucun fil d'Ariane n'est affiché.

## Lien retour

Quand `parent` est défini, un lien "← Retour vers [titre parent]" apparaît en haut du contenu, juste sous le fil d'Ariane. Stylisé dans la couleur rouge du thème.

## Table des matières

Activez avec `show_toc: true` dans le front matter de la page. La TOC est générée à partir des titres H2 à H6. Sur écran large (≥1200px), elle s'affiche en sidebar sticky ; sur les écrans plus petits, elle apparaît en haut du contenu.

> La TOC est générée côté client par JavaScript. Tous les titres doivent avoir un attribut `id` (kramdown les génère automatiquement).

## Colorisation syntaxique

Les blocs de code sont colorisés via Rouge (le surligneur par défaut de kramdown). Utilisez les blocs de code standards :

<pre>
```javascript
const name = "Alice";
let age = 25;
```
</pre>

<pre>
```css
.card {
  background: #fff;
  border-radius: 8px;
}
```
</pre>

Langages supportés : tous les langages supportés par Rouge (JavaScript, CSS, HTML, Python, Ruby, Bash, YAML, etc.). Les blocs de code apparaissent avec un fond sombre, des numéros de ligne et des couleurs syntaxiques qui s'adaptent automatiquement en mode sombre.

## Vidéos YouTube

Les liens YouTube sont automatiquement convertis en lecteur vidéo intégré sur GitHub Pages.

### Syntaxe avec vignette (recommandée)

```markdown
[![Titre vidéo](https://img.youtube.com/vi/ID_VIDEO/0.jpg)](https://youtu.be/ID_VIDEO)
```

Sur GitHub : affiche la vignette YouTube cliquable. Sur GitHub Pages : la vignette est remplacée par un lecteur iframe 16:9 avec YouTube en mode confidentialité renforcée (`youtube-nocookie.com`).

### Syntaxe URL seule

```
https://youtu.be/ID_VIDEO
```

Auto-détectée et convertie de la même manière. Plein écran disponible.

## Playground interactif

Intégrez un éditeur de code en direct avec aperçu grâce à l'inclusion `playground.html`.

{% raw %}
```
{% capture mon_html %}
<h1>Bonjour le monde</h1>
{% endcapture %}

{% capture mon_css %}
h1 { color: red; }
{% endcapture %}

{% capture mon_js %}
console.log('Bonjour');
{% endcapture %}

{% include playground.html
  id="demo"
  initial_html=mon_html
  initial_css=mon_css
  initial_js=mon_js
%}
```
{% endraw %}

| Paramètre      | Requis | Description |
|----------------|--------|-------------|
| `id`           | non    | Identifiant unique (auto-généré si omis) |
| `initial_html` | non    | Code HTML initial (via {% raw %}`{% capture %}`{% endraw %}) |
| `initial_css`  | non    | Code CSS initial |
| `initial_js`   | non    | Code JavaScript initial |

Les trois paramètres de code sont optionnels — passez seulement ce dont vous avez besoin.

Le playground affiche trois onglets (HTML, CSS, JS), un éditeur CodeMirror avec colorisation syntaxique, et un aperçu en direct. L'aperçu se met à jour automatiquement à chaque changement (délai de 300ms). Un bouton "Open in CodePen" exporte le code. Sur mobile, l'aperçu se replie sous l'éditeur avec un bouton "View result".

## Classes utilitaires

Utilisez ces classes CSS dans du HTML inline au sein de votre Markdown :

```html
<div class="alert-info">
  <strong>Info :</strong> Pensez à vérifier votre syntaxe.
</div>

<div class="alert-warning">
  <strong>Attention :</strong> Cette fonctionnalité est dépréciée.
</div>
```

```html
<p class="text-center">Texte centré</p>
<p class="text-end">Texte aligné à droite</p>
```

Les encadrés d'alerte s'affichent avec une bordure colorée à gauche (bleu pour info, orange pour attention). Les classes d'alignement alignent le texte comme attendu.

## Contribution

Voir [CONTRIBUTING.md](./CONTRIBUTING.md).

## Licence

MIT — voir [LICENSE](./LICENSE).
