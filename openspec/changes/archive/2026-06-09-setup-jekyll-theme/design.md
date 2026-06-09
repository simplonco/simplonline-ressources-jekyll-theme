## Context

Création d'un thème Jekyll pour les formateurs Wild Code School, permettant de générer des ressources pédagogiques statiques (exercices, fiches, pages avec vidéos YouTube). Le thème doit être utilisable comme `remote_theme` via GitHub Pages, léger, maintenable, et ouvert aux contributions.

## Goals / Non-Goals

**Goals:**
- Template Jekyll unique avec mise en page claire pour du contenu pédagogique
- Support dark/light mode (détection automatique + bascule manuelle)
- CSS natif moderne (pas de Sass, pas de framework CSS)
- Branding Wild Code School by Simplon
- Documentation bilingue FR/EN
- Licence MIT, prêt pour contributions open source

**Non-Goals:**
- Pas de multiple templates (on commence avec un seul, extensible plus tard)
- Pas de Sass/SCSS
- Pas de générateur statique autre que Jekyll
- Pas de déploiement autre que GitHub Pages

## Decisions

| Décision | Choix | Alternatives | Raison |
|----------|-------|-------------|--------|
| CSS natif vs Sass | CSS natif | Sass | Le CSS moderne gère variables, nesting, `@layer` — une dépendance en moins |
| Dark/light mode | `prefers-color-scheme` + bascule JS | Uniquement auto | L'utilisateur doit pouvoir forcer le mode |
| Template unique | Layout `default` | Multi-templates | On commence simple, on ajoutera si besoin |
| remote_theme | GitHub Pages + gemspec | Gem Ruby seulement | Compatible GitHub Pages sans build supplémentaire |
| Polices | Google Fonts (system fallback) | Polices locales | Simplicité, pas de fichier à charger |

## Risques / Trade-offs

- **[CSS natif]** Le nesting CSS est récent (2023+). Les vieux Jekyll utilisant des transformateurs HTML pourraient mal l'interpréter → Utiliser PostCSS ou un simple fichier `.css` standard dans `assets/`
- **[Dark/light mode]** Sans Sass, il faut gérer les variables CSS dans un seul fichier → Utiliser `@media (prefers-color-scheme)` et une classe `.dark-mode` sur `<html>`
- **[remote_theme]** La gem `jekyll-remote-theme` ne supporte pas le `_sass` par défaut pour les thèmes → Puisqu'on utilise du CSS natif, ce n'est pas un problème

## Charte graphique

| Élément | Valeur |
|---------|--------|
| Typographie titres | DM Sans |
| Typographie texte courant | Poppins |
| Fond | Blanc |
| Rouge | `#E40046` |
| Gris foncé | `#00313C` |
| Orange | `#FF8674` |
| Organisation hôte | simplonco (GitHub) |

## Open Questions

- Logo SVG exact pour Wild Code School by Simplon (transmis plus tard)
- Couleurs spécifiques pour le mode sombre (à préciser)
