## Context

Le playground `<details>` est important car il permet de cacher la solution jusqu'à ce que l'apprenant clique. Mais CodeMirror ne s'affiche pas correctement dans un élément caché — il faut rafraîchir l'éditeur quand le `<details>` s'ouvre.

## Goals / Non-Goals

**Goals:**
- Créer un exercice complet dans `demo/README.md` avec maquette, consignes, étapes, ressources
- Solution interactive dans `<details>` avec playground
- Le playground fonctionne correctement même dans `<details>` initialement fermé
- Nettoyer les anciennes démos (exercices, js-playground)

**Non-Goals:**
- Créer d'autres exercices (un seul pour l'instant)
- Modifier le comportement du thème

## Decisions

1. **`<details>` pour la solution** — standard HTML, accessible, sans JS
2. **`initDetails()` dans playground.js** — écoute l'événement `toggle` et appelle `cm.refresh()`
3. **Images dans `demo/`** — maquette et image d'intégration au même niveau que la page

## Risks / Trade-offs

- [Solution visible dans le HTML source] → Acceptable, c'est un exercice auto-corrigé
