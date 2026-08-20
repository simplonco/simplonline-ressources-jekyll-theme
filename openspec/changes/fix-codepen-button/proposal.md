## Why

Le bouton "Open in CodePen" dans les playgrounds JS ne fonctionne pas. Lorsqu'on clique dessus, rien ne se passe — pas d'ouverture de CodePen. Le form POST n'est pas correctement configuré car les attributs HTML (`action`, `method`, `target`, `type`, `name`, `value`) sont passés comme propriétés directes à `DOMUtils.createElement` au lieu d'être dans l'objet `attributes`.

## What Changes

- Correction du `handleCodePenClick` dans `assets/js/main.js` pour passer les attributs HTML via l'option `attributes` de `DOMUtils.createElement`
- Le form sera correctement configuré avec `action`, `method`, `target`
- L'input hidden sera correctement configuré avec `type`, `name`, `value`

## Capabilities

### Modified Capabilities

- `interactive-code-playground`: Le requirement "Export vers CodePen" existe déjà (l.39-45) et est correct. C'est l'implementation qui est défaillante. Pas de changement de spec requis.

### New Capabilities

Aucune.

## Impact

- **Code affecté** : `assets/js/main.js` — fonction `Playground.handleCodePenClick` (lignes 623-646)
- **Aucun changement** : pas d'impact sur l'HTML, le CSS, ni sur les autres fonctionnalités du playground
- **Aucune dépendance** : le fix est autonome, pas besoin de nouvelles librairies
