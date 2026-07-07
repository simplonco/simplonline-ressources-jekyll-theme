## Why

Les ressources pédagogiques Simplonline manquent d'un outil interactif pour tester les connaissances des apprenants. Un quiz QCM intégré permet aux formateurs d'ajouter des auto-évaluations dans leurs fiches sans outil externe.

## What Changes

- Nouvel include Liquid `{% include quiz.html %}` pour intégrer un quiz dans une page
- Support des QCM à réponse unique (via `input[type=radio]`) et réponses multiples (via `input[type=checkbox]`)
- Feedback visuel immédiat : vert pour les bonnes réponses, rouge pour les mauvaises
- Validation différée via un bouton "Valider" pour préserver la navigation clavier
- Composant rendu intégralement côté client (JavaScript vanilla, aucune dépendance externe)
- Exemple de quiz ajouté dans la page de démo

## Capabilities

### New Capabilities
- `interactive-quiz`: Quiz QCM interactif embarqué dans les pages Markdown via include Liquid, avec feedback visuel immédiat et accessibilité clavier

### Modified Capabilities

Aucune — nouveau composant, aucun spec existant modifié.

## Impact

- Nouveaux fichiers : `_includes/quiz.html`, `assets/js/quiz.js`, `assets/css/quiz.css`
- Fichier modifié : `_includes/head.html` (chargement CSS + JS)
- Aucune dépendance externe ni changement de configuration
