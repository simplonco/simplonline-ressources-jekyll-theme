# Proposal: playground-enhancements

## Why

Les apprenants écrivent du JavaScript dans le playground mais ne voient pas les sorties `console.log()` sans ouvrir les devtools du navigateur, ce qui casse le flux d'apprentissage dans la page de cours. Par ailleurs, l'onglet HTML est toujours ouvert par défaut alors que certains exercices démarrent sur CSS ou JS ; un paramètre facultatif permettrait à l'auteur du cours de choisir l'onglet initial.

## What Changes

- Afficher les sorties console (`log`, `info`, `warn`, `error`, `debug`) et les erreurs d'exécution JS non interceptées (erreurs globales et promesses rejetées) dans un tiroir repliable sous la prévisualisation, façon CodePen
- Ajouter un bouton « Console » avec badge compteur dans la barre d'onglets pour déplier/replier le tiroir
- Vider automatiquement la console à chaque re-render de la prévisualisation
- **BREAKING** : aucun — tout est additif
- Nouveau paramètre Liquid facultatif `default_tab` (`html`, `css` ou `js`, défaut `html`) pour choisir l'onglet ouvert au chargement ; valeur invalide → repli sur `html`
- Mise à jour des documentations README.md / README-FR.md

## Capabilities

### New Capabilities

(aucune)

### Modified Capabilities

- `interactive-code-playground` : ajout de deux requirements — « Sortie console intégrée » (capture console.* + erreurs runtime via postMessage, tiroir UI, badge, vidage au re-render, isolation multi-playgrounds) et « Onglet actif paramétrable » (paramètre `default_tab` avec validation et repli)

## Impact

- `_includes/playground.html` : bouton console + conteneur tiroir ; logique Liquid pour `default_tab` (classe `is-active` et visibilité des textareas)
- `assets/js/main.js` : injection d'un shim console dans le `srcdoc` avant le JS utilisateur, écoute `postMessage` côté parent avec routage par `event.source`, gestion du tiroir/badge, lecture de l'onglet actif au lieu de l'index codé en dur
- `assets/css/playground.css` : styles du tiroir (niveaux colorés, dark mode, responsive), styles du bouton + badge
- `README.md`, `README-FR.md` : documentation des nouveaux comportements et du paramètre `default_tab`
- Aucune dépendance externe nouvelle ; JavaScript vanilla uniquement
