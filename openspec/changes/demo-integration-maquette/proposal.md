## Why

Les formateurs ont besoin de démos thématiques montrant comment utiliser le playground dans un contexte d'exercice réel, avec maquette et solution dans `<details>` replié.

## What Changes

- Déplacer `Card-miss-light.png` vers `assets/images/demo-mockup.png`
- Créer `demo/integration-maquette.md` : exercice d'intégration HTML/CSS avec maquette, étapes, vidéo YouTube, solution dans `<details>` + playground
- Ajouter `initDetails()` dans `assets/js/playground.js` pour `cm.refresh()` à l'ouverture du `<details>`

## Capabilities

### New Capabilities
- `demo-mockup-exercise`: exercice thématique d'intégration HTML/CSS avec maquette, solution interactive dans `<details>`, et support playground pour contenu masqué

### Modified Capabilities

- *(aucune)*

## Impact

- `assets/images/demo-mockup.png` : nouvelle image
- `demo/integration-maquette.md` : nouveau fichier
- `assets/js/playground.js` : modification (ajout `initDetails`)
