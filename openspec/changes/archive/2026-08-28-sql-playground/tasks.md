## 1. Vendor Dependencies

- [x] 1.1 Download CodeMirror SQL mode (`sql.min.js`) et l'ajouter dans `assets/js/codemirror/`
- [x] 1.2 Télécharger sql.js (sql.js + sql-wasm.wasm) et l'ajouter dans `assets/js/sql-wasm/`

## 2. HTML Include

- [x] 2.1 Créer `_includes/sql-playground.html` avec la structure : éditeur textarea, boutons Exécuter/Réinitialiser, zone résultats
- [x] 2.2 Supporter les paramètres Liquid : `id`, `schema`, `query`

## 3. Styles

- [x] 3.1 Créer `assets/css/sql-playground.css` avec les styles pour l'éditeur, les boutons, le tableau de résultats, les messages d'erreur, et le responsive

## 4. JavaScript — SqlPlayground

- [x] 4.1 Ajouter l'objet `SqlPlayground` dans `assets/js/main.js` (séparation de `Playground`)
- [x] 4.2 Implémenter le lazy-loading de sql.js (détection de `.sql-playground` dans le DOM, chargement au premier clic)
- [x] 4.3 Implémenter l'exécution : créer la DB → exécuter schema → exécuter requête → afficher résultats en tableau HTML
- [x] 4.4 Implémenter la gestion des erreurs SQL (bloc d'erreur stylisé)
- [x] 4.5 Implémenter le bouton Réinitialiser (restaurer la query initiale)
- [x] 4.6 Initialiser les instances SqlPlayground au DOMContentLoaded

## 5. Intégration Head

- [x] 5.1 Ajouter `<link>` pour `sql-playground.css` dans `_includes/head.html`
- [x] 5.2 Ajouter `<script>` pour le mode SQL de CodeMirror dans `_includes/head.html`

## 6. Démonstration

- [x] 6.1 Créer un fichier de démo `demo/sql-demo.md` avec un exemple complet (schema Liquid + playground SQL)
