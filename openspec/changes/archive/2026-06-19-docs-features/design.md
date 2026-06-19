## Context

Le thème offre plusieurs fonctionnalités (breadcrumbs, TOC, syntax highlighting, YouTube, playground, utility classes) mais aucune documentation centralisée n'existe pour les formateurs. Chaque feature est documentée dans son propre code, sans vue d'ensemble accessible.

## Goals / Non-Goals

**Goals:**
- Documenter toutes les features exploitables par les auteurs dans un fichier unique
- Fournir des exemples concrets d'utilisation (code markdown, front matter)
- Maintenir une version EN et FR

**Non-Goals:**
- Documenter l'infrastructure (favicon, footer, dark mode auto)
- Créer une documentation technique du code
- Modifier le thème ou son comportement

## Decisions

1. **Deux fichiers séparés** (`features.md`, `features-fr.md`) plutôt qu'un seul bilingue
   - Un fichier par langue, plus simple à maintenir et à versionner
   - Navigation évidente : le fichier EN est celui par défaut, le FR est suffixé
2. **Documentation orientée auteur** plutôt que technique
   - Chaque section = une feature avec syntaxe d'utilisation, paramètres, rendu
   - Exemples en markdown copiable directement
3. **Tableaux pour les paramètres** plutôt que texte libre
   - Plus lisible pour les signatures de fonctions/includes

## Risks / Trade-offs

- [Documentation obsolète] → Mitigation : chaque change qui ajoute/modifie une feature devra mettre à jour ces fichiers
- [Pas de validation automatique] → Mitigation : les examples markdown sont testables visuellement sur le site
