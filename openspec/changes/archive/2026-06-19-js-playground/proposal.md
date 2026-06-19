## Why

Les formateurs ont besoin d'un outil interactif pour permettre aux apprenants de tester du code HTML/CSS/JS en direct dans le navigateur, sans quitter la page de cours. Actuellement, le contenu est statique — le formateur doit rediriger vers CodePen, JSFiddle ou un autre site externe.

Un playground intégré au thème permet de :
- Tester du code en direct pendant la lecture d'une ressource
- Partir d'un exemple pré-rempli par le formateur
- Ouvrir le code dans CodePen en un clic pour le partager ou le continuer

## What Changes

- Nouvel include Liquid `{% include playground.html %}` avec paramètres `id`, `initial_html`, `initial_css`, `initial_js`
- Trois onglets (HTML / CSS / JS) avec textarea pour éditer le code
- Iframe de prévisualisation live mise à jour automatiquement (debounce 300ms)
- Bouton "Open in CodePen" qui POSTe le code vers l'API prefill de CodePen
- CSS responsive : deux colonnes (éditeur | preview) sur desktop, empilé sur mobile
- Compatible dark mode via les variables CSS du thème

## New Capabilities

- `interactive-code-playground`: Éditeur de code HTML/CSS/JS avec rendu en direct et export vers CodePen

## Impact

- `_includes/playground.html` : nouvel include
- `assets/js/playground.js` : nouveau fichier JS
- `assets/css/playground.css` : nouveau fichier CSS
- `_includes/head.html` : ajout des liens playground.css et playground.js
- `demo/js-playground.md` : page de démonstration
