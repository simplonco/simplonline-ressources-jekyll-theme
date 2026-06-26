## Context

La section Installation actuelle montre uniquement `remote_theme: simplonco/simplonline-ressources-jekyll-theme`. Pour un nouveau site, l'utilisateur a besoin de deux fichiers complets qu'il peut copier-coller.

## Goals / Non-Goals

**Goals:**
- Fournir `_config.sample.yml` et `Gemfile.sample` prêts à l'emploi
- Enrichir la section Installation avec des instructions étape par étape
- Maintenir la symétrie EN/FR

**Non-Goals:**
- Modifier les fichiers de configuration réels du thème
- Ajouter des plugins ou dépendances non nécessaires

## Decisions

1. **Fichiers `.sample` plutôt que `.example`** — convention explicite, l'utilisateur les copie et retire le suffixe
2. **Section Installation structurée en étapes** (1. Gemfile, 2. config, 3. bundle + serve)
3. **READme EN = source, FR = traduction** — la section EN est écrite d'abord, la FR en est la traduction fidèle

## Risks / Trade-offs

- [Samples obsolètes si la config change] → Mitigation : mettre à jour les samples en même temps que la config réelle
