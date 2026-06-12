## Context

Le thème Jekyll permet aux formateurs de créer des ressources pédagogiques en Markdown avec navigation, code colorisé et vidéos intégrées. Pour aller plus loin, il manque un outil de code interactif : un "bac à sable" où l'apprenant peut modifier et exécuter du code HTML/CSS/JS sans quitter la page.

## Goals / Non-Goals

**Goals:**
- Éditeur HTML/CSS/JS avec onglets (un textarea par langage)
- Prévisualisation live dans une iframe sandboxée, mise à jour en temps réel
- Bouton "Open in CodePen" pour exporter le code
- Plusieurs playgrounds indépendants sur une même page (via `id`)
- CSS responsive et compatible dark mode
- Zero dépendance externe (vanilla JS, CSS natif)

**Non-Goals:**
- Pas de support npm packages ou bundler dans le preview
- Pas de coloration syntaxique dans l'éditeur (textarea brut)
- Pas de sauvegarde automatique ou d'historique
- Pas de multi-fichiers (un seul bloc HTML/CSS/JS)

## Decisions

| Décision | Choix | Alternatives | Raison |
|----------|-------|-------------|--------|
| Éditeur | Textarea brut | CodeMirror, Monaco | Zero dépendance, léger, suffisant pour des exemples simples |
| Preview | Iframe sandbox avec `srcdoc` | DOM direct, eval | Isolation complète du code utilisateur |
| Mise à jour | `input` event + debounce 300ms | MutationObserver, interval | Simple, performant, pas de latence perceptible |
| Export CodePen | POST form vers API prefill | Embed CodePen, JSFiddle API | Gratuit, zero dépendance, ouvre dans un nouvel onglet |
| Onglets | JS basique (show/hide) | Composant Web, jQuery | Minimal, pas de framework |
| Paramètres initiaux | Liquid `{% capture %}` | Front matter JSON, includes séparés | Syntaxe Markdown naturelle, multi-lignes supporté |

## Risks / Trade-offs

- **[Textarea brut]** Pas de coloration syntaxique dans l'éditeur → Les formateurs peuvent préférer CodeMirror à terme. Acceptable pour une V1.
- **[Iframe sandbox]** Le sandboxing empêche certains APIs (localStorage, cookies) → Le code démo typique (manipulation DOM, console) fonctionne sans problème.
- **[Multi-playground]** Chaque playground doit avoir un `id` unique → Risque d'oubli. Le JS pourrait générer un ID automatiquement si non fourni.
- **[CodePen prefill]** L'API prefill a une limite de taille (quelques KB) → Les très gros exemples seront tronqués. Acceptable pour des démos pédagogiques.
