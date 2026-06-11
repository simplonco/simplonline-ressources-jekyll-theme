---
title: Simplonline Ressources — Thème Jekyll
layout: default
---

# Simplonline Ressources — Thème Jekyll

[⬅ English version](./README.md)

Un thème Jekyll pour créer des ressources pédagogiques (exercices, tutoriels, pages statiques) à destination des apprenants Simplonline. Marqué **Wild Code School by Simplon**.

[Voir la démo](./demo/)

## Installation

Ajoutez cette ligne dans votre `_config.yml` :

```yaml
remote_theme: simplonco/simplonline-ressources-jekyll-theme
```

## Configuration

| Variable      | Type   | Défaut | Description |
|---------------|--------|--------|-------------|
| `title`       | string | —      | Titre affiché dans l'en-tête |
| `description` | string | —      | Description du site |
| `lang`        | string | `en`   | Attribut HTML lang |
| `show_toc`    | bool   | `false` | Afficher la table des matières |

## Front Matter des pages

Chaque page peut définir ses propres métadonnées dans l'en-tête YAML :

```yaml
---
title: Titre de la page
description: Description pour le SEO
show_toc: true
parent: Titre de la page parente
---
```

| Champ        | Type   | Description |
|--------------|--------|-------------|
| `title`      | string | Titre de la page (remplace le titre global) |
| `description`| string | Description de la page |
| `show_toc`   | bool   | Activer la table des matières pour cette page |
| `parent`     | string | Titre de la page parente (fil d'Ariane + lien retour) |

## Fonctionnalités

- Mode sombre/clair avec détection automatique et bascule manuelle
- Design responsive (mobile-first)
- **Table des matières** — générée automatiquement depuis les titres H2–H6
- **Fil d'Ariane** — navigation automatique avec lien retour vers la page parente
- **Colorisation syntaxique** — blocs de code colorisés via Rouge
- **Vidéos YouTube** — les liens YouTube convertis en lecteur intégré sur GitHub Pages :
  - `[![Titre](https://img.youtube.com/vi/ID/0.jpg)](https://youtu.be/ID)` — vignette sur GitHub, player sur GitHub Pages
  - `<https://youtu.be/ID>` — auto-détecté et converti en player
- Variables CSS natives — pas de Sass nécessaire
- Classes utilitaires : `alert-info`, `alert-warning`, `text-center`, `text-end`
- Licence MIT

## Développement local

```bash
bundle install
bundle exec jekyll serve --livereload
```

## Contribution

Voir [CONTRIBUTING.md](./CONTRIBUTING.md).

## Licence

MIT — voir [LICENSE](./LICENSE).
