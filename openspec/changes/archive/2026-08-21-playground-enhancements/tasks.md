# Tasks: playground-enhancements

## 1. Feature console intégrée

- [x] 1.1 Ajouter le shim console (sérialisation défensive + override `console.*` + `window.onerror`/`unhandledrejection` + `postMessage`) injecté avant le JS utilisateur dans `updatePreview`
- [x] 1.2 Ajouter l'écoute `message` côté parent avec routage par `event.source === iframe.contentWindow` et filtrage par marqueur
- [x] 1.3 Implémenter le rendu des entrées dans un tiroir `.playground-console` : niveaux colorés, plafond 200 entrées FIFO, auto-scroll conditionnel, vidage au re-render, badge compteur sur le bouton toggle

## 2. UI du tiroir console

- [x] 2.1 Ajouter bouton « Console » + conteneur tiroir dans `_includes/playground.html`
- [x] 2.2 Styler le tiroir et le badge dans `playground.css` (variables thème, dark mode, responsive mobile)

## 3. Feature default_tab

- [x] 3.1 Résoudre `default_tab` en Liquid (défaut `html`, downcase, whitelist avec repli) et rendre dynamiques la classe `is-active` et la visibilité des textareas
- [x] 3.2 Remplacer l'index éditeur codé en dur dans `initPlayground` par la lecture de l'onglet `.is-active` du DOM

## 4. Documentation

- [x] 4.1 Documenter la console intégrée et le paramètre `default_tab` dans README.md (tableau de paramètres + description)
- [x] 4.2 Documenter les mêmes points dans README-FR.md

## 5. Vérification

- [x] 5.1 Build Jekyll sans erreur (`bundle exec jekyll build`)
- [x] 5.2 Préparer la page de démo / liste de cas de test manuels pour validation utilisateur
