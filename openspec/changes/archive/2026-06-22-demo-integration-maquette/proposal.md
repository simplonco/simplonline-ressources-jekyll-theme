## Why

Les formateurs ont besoin de démos thématiques montrant comment utiliser le playground dans un contexte d'exercice réel, avec maquette, consignes, et solution dans `<details>` replié.

## What Changes

- Placer `demo/demo-mockup.png` : maquette de référence pour l'exercice
- Placer `demo/miss-light.png` : image à intégrer par l'apprenant
- Réécrire `demo/README.md` : exercice d'intégration HTML/CSS avec maquette, étapes, vidéo YouTube, solution dans `<details>` + playground
- Supprimer `demo/js-playground.md` et `demo/exercices/` (anciennes démos)
- Ajouter `initDetails()` dans `assets/js/playground.js` pour `cm.refresh()` à l'ouverture du `<details>`
- Améliorer `README.md` : playground réel, syntaxe kramdown pour classes utilitaires, sections Quotes/Tips

## Capabilities

### New Capabilities
- `demo-mockup-exercise`: exercice thématique d'intégration HTML/CSS avec maquette, solution interactive dans `<details>`, et support playground pour contenu masqué

### Modified Capabilities

- *(aucune)*

## Impact

- `demo/demo-mockup.png` : nouvelle image (maquette)
- `demo/miss-light.png` : nouvelle image (intégration)
- `demo/README.md` : réécrit
- `assets/js/playground.js` : modification (ajout `initDetails`)
- `README.md` : améliorations
- `demo/js-playground.md`, `demo/exercices/` : supprimés
