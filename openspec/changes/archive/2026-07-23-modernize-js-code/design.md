# Design: Modernize JS Architecture

## Architecture

Un seul fichier `main.js` contenant :

1. **DOMUtils** — utilitaires de manipulation DOM (`createElement`, `generateId`, `querySelector`)
2. **ThemeManager** — gestion du thème clair/sombre
3. **TOCGenerator** — génération de la table des matières
4. **SyntaxHighlighter** — coloration syntaxique
5. **YouTubeEmbedder** — intégration YouTube
6. **Quiz** — rendu et validation des QCM
7. **Playground** — éditeur de code avec CodeMirror

## Fichiers supprimés

- `assets/js/quiz.js` — logique intégrée dans `Quiz` dans main.js
- `assets/js/playground.js` — logique intégrée dans `Playground` dans main.js

## Fichiers ajoutés

- `assets/js/codemirror/*.min.js` — CodeMirror et ses modes (HTML, CSS, JS, XML)
- `assets/js/codemirror/codemirror.min.css` — styles CodeMirror

## Modifications

- `_includes/head.html` — chargement unique de `main.js` avec `defer`, ajout de `quiz.css`
