---
layout: default
---

# Simplonline Ressources — Thème Jekyll

[⬅ English version](./README.md)

Un thème Jekyll pour créer des ressources pédagogiques (exercices, tutoriels, pages statiques) à destination des apprenants Simplonline. Marqué **Wild Code School by Simplon**.

[Voir la démo](https://simplonco.github.io/simplonline-ressources-jekyll-theme)

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
| `show_toc`    | bool   | `true` | Afficher la table des matières |

## Fonctionnalités

- Mode sombre/clair avec détection automatique et bascule manuelle
- Design responsive (mobile-first)
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
