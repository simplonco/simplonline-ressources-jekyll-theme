## Context

Le thème Jekyll existant fournit une structure de base (layout, CSS, dark/light mode). Il doit maintenant être enrichi pour permettre aux formateurs de produire des ressources pédagogiques structurées et riches, en pur Markdown, sans toucher au HTML.

Les formateurs écrivent dans README.md ou des pages `.md` additionnelles. Le thème se charge du rendu : navigation, table des matières, enrichissement des médias.

## Goals / Non-Goals

**Goals:**
- Titre et description par page via le front matter YAML
- Table des matières automatique depuis les titres H2–H6, activable par page
- Sous-pages Markdown avec fil d'Ariane automatique
- Colorisation syntaxique des blocs de code (Rouge — natif Jekyll/GitHub Pages)
- Transformation des liens YouTube en player embed
- CSS responsive pour tous les nouveaux composants

**Non-Goals:**
- Pas de génération de TOC flottante / sidebar (inline en haut du contenu)
- Pas de multiple niveaux de sous-pages (un seul niveau parent/enfant)
- Pas d'édition WYSIWYG — le formateur reste en Markdown
- Pas de chargement de librairie JS externe pour le highlighting (on utilise le CSS natif de Rouge)

## Decisions

| Décision | Choix | Alternatives | Raison |
|----------|-------|-------------|--------|
| Colorisation syntaxique | Rouge (natif Jekyll + GitHub Pages) | Prism.js, highlight.js | Zero dépendance, déjà intégré à Jekyll, compatible GitHub Pages sans build |
| TOC | Généré en Liquid dans `_includes/toc.html` | JS uniquement, plugin Jekyll | Pas de dépendance externe, généré au build, pas de flash ou FOUC |
| Fil d'Ariane | Basé sur la hiérarchie des dossiers + front matter `parent` | Plugin Jekyll, JS runtime | Simple, prévisible, pas de coût runtime |
| YouTube embed | Filtre Liquid custom + include HTML | JS runtime, parsing Markdown | Transformé au build, pas de latence JS, accessible |
| Titre/description page | Front matter YAML dans chaque page | _config.yml uniquement | Permet à chaque page d'avoir ses propres métadonnées SEO |
| `show_toc` | Front matter boolean par page | _config.yml global | Permet d'activer/désactiver la TOC par ressource |

## Risks / Trade-offs

- **[Rouge highlighting]** Le thème de colorisation par défaut de Rouge peut ne pas correspondre au design → Choisir un thème clair/sombre compatible avec le dark mode
- **[YouTube embed]** Un lien YouTube standard (`https://youtu.be/...` ou `https://youtube.com/watch?v=...`) doit être détecté en Markdown → Utiliser un include custom et un filtre Liquid pour remplacer les patterns d'URL
- **[TOC sur pages longues]** Une TOC inline peut décaler le contenu sur mobile → La TOC est masquée sur mobile (accessible via un bouton toggle) ou placée après le titre
- **[Fil d'Ariane]** GitHub Pages ne sert que les fichiers `.md` à plat ou dans des dossiers → La hiérarchie doit reposer sur la convention de nommage des fichiers ou le front matter
