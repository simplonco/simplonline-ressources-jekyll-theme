## Context

Le thème Jekyll possède déjà un playground interactif pour HTML/CSS/JS (`_includes/playground.html` + `Playground` dans `main.js`). Il utilise CodeMirror (vendored) pour l'édition et une iframe sandboxée pour l'exécution. Ce pattern est éprouvé et bien intégré au thème.

Le besoin SQL est distinct : pas de preview iframe, pas de tabs, mais une exécution SQL côté client avec tableau de résultats. La base pédagogique doit être définissable directement dans le markdown par le formateur.

## Goals / Non-Goals

**Goals:**
- Composant SQL dédié, isolé du playground HTML/CSS/JS
- Exécution SQL côté client via sql.js (SQLite WebAssembly), aucune dépendance serveur
- Base pédagogique embarquée via variables Liquid (`{% capture %}`)
- Lazy-loading de sql.js uniquement si un composant SQL est présent sur la page
- Résultats affichés en tableau HTML
- Messages d'erreur SQL lisibles
- Mode sombre + responsive (cohérent avec le reste du thème)
- Plusieurs instances indépendantes par page

**Non-Goals:**
- Pas de support Python ni d'autre langage que SQL
- Pas de support Jupyter/notebook pour l'instant
- Pas d'import de fichier SQL externe
- Pas de persistence des résultats entre exécutions
- Pas de modification du playground HTML/CSS/JS existant

## Decisions

### D1: sql.js vendored (pas CDN)
**Choix** : Inclure sql.js + sql-wasm.wasm dans `assets/js/sql-wasm/`
**Raison** : Autonomie totale, fonctionne offline, pas de dépendance externe. Le WASM fait ~1.2 MB mais c'est acceptable pour un thème pédagogique.
**Alternative rejetée** : CDN — dépendance réseau, pas compatible offline.

### D2: Exécution sans iframe
**Choix** : sql.js tourne directement dans le contexte de la page (pas d'iframe).
**Raison** : SQL.js est sandboxé par nature (base en mémoire WASM). Pas besoin d'isolation iframe comme pour le JS. Plus simple à implémenter, partage les mêmes variables Liquid.
**Alternative rejetée** : iframe — surcomplication inutile pour du SQL.

### D3: Base recréée à chaque exécution
**Choix** : Chaque clic "Exécuter" recrée la DB depuis le schema, puis exécute la requête.
**Raison** : Évite l'accumulation d'état. Le formateur contrôle exactement ce qui est dans la base. Pas de surprise pour l'apprenant.
**Trade-off** : Pas de "persistance" entre exécutions — l'apprenant ne peut pas créer une table, l'insérer, puis la requêter en deux clics. C'est un choix pédagogique : chaque exécution est un snapshot propre.

### D4: Lazy-loading de sql.js
**Choix** : Observer le DOM pour détecter la présence d'un `.sql-playground`, charger sql.js uniquement si présent.
**Raison** : Évite de charger ~1.5 MB de WASM sur les pages qui n'utilisent pas le SQL. Le load est transparent car le premier clic "Exécuter" déclenche le chargement si pas encore prêt.
**Implémentation** : `MutationObserver` sur le body au DOMContentLoaded, ou vérification simple au moment du premier clic.

### D5: CodeMirror mode SQL vendored
**Choix** : Ajouter `sql.min.js` dans `assets/js/codemirror/` (même pattern que xml.min.js, css.min.js, etc.)
**Raison** : Cohérence avec l'architecture existante. Le mode SQL fait ~10 KB, négligeable.

### D6: Layout vertical (pas de split pane)
**Choix** : Éditeur en haut, boutons au milieu, résultats en bas. Pas de split pane horizontal.
**Raison** : Le SQL n'a pas besoin de "preview" en temps réel. Le flow éditer → exécuter → voir résultats est naturellement vertical. Plus simple à implémenter, meilleure UX mobile.

## Risks / Trade-offs

- **[Poids WASM]** ~1.2 MB de sql-wasm.wasm → Atténué par le lazy-loading. Seules les pages avec SQL payent le coût.
- **[Pas de persistence entre exécutions]** Un apprenant qui veut enchaîner CREATE → INSERT → SELECT doit tout mettre dans une seule requête ou le schema doit contenir les INSERT → Accepté : le formateur structure le schema pour inclure les données de démonstration.
- **[Taille du repo]** sql.js + WASM dans le repo git → Fichier binaire dans le repo. Acceptable car le theme n'est pas forké fréquemment. Alternative : Git LFS, mais surcomplexification pour 1.2 MB.
- **[Pas de sandboxing SQL]** L'apprenant peut exécuter DROP TABLE, etc. → Pas un risque réel : la base est recréée à chaque exécution, elle est éphémère.
