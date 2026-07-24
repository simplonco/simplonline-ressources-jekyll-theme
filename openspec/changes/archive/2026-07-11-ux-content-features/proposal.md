## Why

Les formateurs ont besoin de produire des ressources pédagogiques riches (exercices, fiches, explications) en Markdown. Le thème doit leur fournir une navigation claire (table des matières, fil d'Ariane), de l'enrichissement visuel (code colorisé, vidéos YouTube intégrées), et des métadonnées de page (titre, description) sans qu'ils aient à toucher au HTML/CSS/JS.

## What Changes

- Titre et description par page via le front matter YAML, affichés dans le header et les meta tags SEO
- Table des matières automatique générée depuis les titres H2 à H6, activable via `show_toc: true` dans le front matter
- Support de sous-pages Markdown avec fil d'Ariane automatique
- Colorisation syntaxique des blocs de code (Rouge / Prism-like)
- Transformation automatique des liens YouTube en player embed dans le HTML rendu

## Capabilities

### New Capabilities
- `table-of-contents`: Table des matières générée automatiquement à partir des titres H2–H6, contrôlée par le front matter
- `sub-page-navigation`: Sous-pages Markdown avec fil d'Ariane automatique et navigation parent/enfant
- `rich-content-embeds`: Transformation des liens YouTube en lecteur intégré + colorisation syntaxique des blocs de code

### Modified Capabilities
- `jekyll-theme-core`: Ajout du support des métadonnées de page (title, description) dans le front matter, avec affichage dans le header et balises meta SEO

## Impact

- `_layouts/default.html` : ajout de blocs conditionnels (TOC, breadcrumbs, meta)
- `_includes/` : nouveaux includes (toc.html, breadcrumbs.html, youtube.html)
- `assets/css/style.css` : styles pour TOC, breadcrumbs, code highlighting, YouTube embed
- `assets/js/main.js` : logique pour le TOC (scroll spy optionnel)
- `_config.yml` : documentation des nouvelles variables de configuration
