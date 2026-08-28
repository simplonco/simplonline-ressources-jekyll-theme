## Why

Les formateurs Wild Code School ont besoin d'intégrer des playgrounds SQL directement dans leurs ressources pédagogiques. Certains formatent leurs contenus en style "notebook" (cellules de requêtes avec résultats), d'autres veulent juste un éditeur SQL + exécution. Le playground HTML/CSS/JS existant ne couvre pas ce cas. Un composant SQL dédié, avec base pédagogique embarquée via des variables Liquid, répond à ce besoin sans dépendance externe.

## What Changes

- Nouveau composant `sql-playground.html` : éditeur CodeMirror (mode SQL) + bouton Exécuter + tableau de résultats
- Exécution SQL côté client via sql.js (SQLite compilé en WebAssembly, vendored)
- Lazy-loading de sql.js uniquement si un `sql-playground` est présent sur la page
- Base pédagogique définie dans le markdown via `{% capture %}` + variables Liquid passées à l'include
- Mode SQL ajouté à CodeMirror (mode vendored)
- Styles dédiés pour le composant (tableau de résultats, messages d'erreur, layout vertical)
- Le composant existant `playground.html` (HTML/CSS/JS) reste inchangé

## Capabilities

### New Capabilities
- `sql-playground`: Composant interactif SQL dédié — éditeur, exécution sql.js, résultats en tableau, base pédagogique via Liquid, lazy-loading

### Modified Capabilities

_(aucune — le playground existant n'est pas modifié)_

## Impact

- Fichiers créés : `_includes/sql-playground.html`, `assets/css/sql-playground.css`, `assets/js/codemirror/sql.min.js`, `assets/js/sql-wasm/` (sql.js + sql-wasm.wasm)
- Fichiers modifiés : `_includes/head.html` (ajout CSS), `assets/js/main.js` (ajout `SqlPlayground`)
- Dépendances ajoutées : sql.js (~1.5 MB vendored, dont ~1.2 MB WASM), CodeMirror mode SQL (~10 KB)
- Pas de changement de build (pas de Node.js, pas de Sass)
- Compatible GitHub Pages
