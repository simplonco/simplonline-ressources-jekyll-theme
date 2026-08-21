# Design: playground-enhancements

## Context

Le playground actuel (`_includes/playground.html`, `assets/js/main.js`, `assets/css/playground.css`) exécute le JS de l'apprenant dans une iframe `srcdoc` sandboxée avec `sandbox="allow-scripts allow-modals"`. L'iframe a donc une **origine opaque** (pas d'`allow-same-origin`) : le parent ne peut pas lire le DOM de l'iframe ni intercepter son objet `console`. La seule voie de communication disponible est `postMessage`. L'onglet actif au chargement est codé en dur dans le HTML de l'include et dans `Playground.initPlayground` (index 0 forcé).

## Goals / Non-Goals

**Goals:**
- Afficher les sorties console + erreurs runtime dans un tiroir sous la prévisualisation, sans dépendance externe
- Garantir l'isolation entre plusieurs playgrounds sur une même page
- Permettre à l'auteur de choisir l'onglet initial via `default_tab`

**Non-Goals:**
- REPL interactif / évaluation d'expressions dans la console
- Support de `console.table`, `console.group`, timers, `copy()`
- Persistance des logs entre les re-renders

## Decisions

### D1 — Shim console injecté dans le srcdoc (vs accès direct)
L'origine opaque de l'iframe interdit toute interception côté parent. On injecte donc dans le `srcdoc`, **avant** le JS utilisateur, un petit script qui : sauvegarde les `console.*` natifs, les remplace par des versions sérialisant les arguments puis postant `{ source: 'playground-console', level, text }` vers `window.parent`, et hook `window.onerror` + `unhandledrejection`.
*Alternative rejetée* : retirer le sandbox → inacceptable niveau sécurité ; `console.log` via `allow-same-origin` + accès DOM → fragilise l'isolation exigée par la spec.

### D2 — Sérialisation maison, tolérante aux pannes
Fonction `formatValue` : strings bruts ; nombres/booléens/null/undefined via `String()` ; objets/tableaux via `JSON.stringify` avec `WeakSet` anti-référence-circulaire et limite de profondeur (~4) ; `Error` → `name: message` + stack tronquée ; fonctions/DOM nodes → représentation descriptive (`ƒ name()`, `<div>`). Multi-arguments joints par espace. Tout échec de sérialisation retombe sur `[unserializable]` — jamais d'exception dans la page de l'apprenant.

### D3 — Routage parent par identité de source
Un seul listener `message` global côté parent. Chaque entrée est routée en comparant `event.source === iframe.contentWindow` de chaque playground connu. Le marqueur `source: 'playground-console'` filtre le bruit. Pas d'`event.origin` exploitable (origine opaque = `"null"`).
*Alternative rejetée* : id passé dans le payload → falsifiable et redondant avec la comparaison par référence.

### D4 — Tiroir UI sous la prévisualisation, badge sur bouton
Bouton « Console » ajouté dans `.playground-tabs` (avant le bouton CodePen) avec badge compteur visible quand replié ; conteneur `.playground-console` dans le paneau preview sous l'iframe. Replié par défaut ; se déplie automatiquement à la première erreur ? Non — restons prévisible : jamais d'auto-ouverture, seule le badge informe. Vidage complet du tiroir à chaque `updatePreview` (le debounce 300ms existant amortit le coût). Plafond 200 entrées FIFO, auto-scroll bas si l'utilisateur est déjà en bas.
*Alternative rejetée* : 4e onglet « Console » → masque l'éditeur pendant la lecture des logs ; bandeau permanent → gaspille l'espace vertical.

### D5 — default_tab résolu côté Liquid, respecté côté JS
Dans l'include : `{% assign pg_default_tab = include.default_tab | default: "html" | downcase %}` + validation whitelist html/css/js sinon repli `html`. La classe `is-active` et la visibilité des textareas deviennent conditionnelles. Dans `initPlayground`, remplacer l'index codé en dur (`editors[i].style.display = i === 0 ? '' : 'none'`) par la lecture de `.playground-tab.is-active` existant dans le DOM — la logique Liquid reste la seule source de vérité.

### D6 — Styles via variables thème existantes
Le tiroir réutilise `--color-code-bg`, `--color-border`, `--color-red`, police monospace existante ; niveaux colorés (warn/error/info) avec couleurs syntaxiques déjà définies pour dark/light. Responsive mobile : tiroir pleine largeur sous la preview empilée.

## Risks / Trade-offs

- [Code utilisateur hostile boucle `console.log` infinie] → plafond 200 entrées + sérialisation défensive try/catch ; l'exécution elle-même reste hors de notre contrôle (comme aujourd'hui)
- [Messages croisés entre iframes] → comparaison stricte `event.source` ; test multi-playgrounds requis
- [Coût de re-render accru si logs massifs] → vidage tiroir avant injection + debounce existant 300ms
- [`default_tab="JS"` casse mixte] → `downcase` + whitelist ; repli silencieux documenté
- [Comportement `alert()`/`confirm()` inchangé] → hors scope, `allow-modals` conservé

## Migration Plan

Changement purement additif : aucun playground existant ne change de comportement (défauts = comportement actuel). Rollback = revert du merge.

## Open Questions

Aucune — décisions validées avec l'utilisateur (tiroir façon CodePen, capture console + erreurs runtime, paramètre facultatif).
