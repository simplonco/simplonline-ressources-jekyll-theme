## Why

Certaines quêtes utilisent un marquage markdown "stepper" (blocs de code fenced avec le language `stepper`) pour décrire des étapes pédagogiques. Actuellement, ces blocs ne sont pas mis en forme et apparaissent comme du code brut. Un rendu en accordéon avec navigation permettrait aux apprenants de suivre les étapes de manière interactive.

## What Changes

- Ajout d'un converter Kramdown (`_plugins/stepper_converter.rb`) qui transforme les blocs ` ```stepper ` en HTML `<details>/<summary>` avec navigation
- Ajout des styles CSS pour le composant stepper (compatible PicoCSS, dark mode)
- Ajout d'un module JavaScript pour la navigation Previous/Next entre les étapes

## Capabilities

### New Capabilities
- `stepper`: Système d'accordéon avec navigation pour les blocs de code stepper

### Modified Capabilities
_(aucune)_

## Impact

- **Nouveau fichier** : `_plugins/stepper_converter.rb`
- **Modifié** : `assets/css/style.css` (ajout des styles stepper)
- **Modifié** : `assets/js/main.js` (ajout du module Stepper)
- **Aucun impact** sur les sites existants qui n'utilisent pas le markup `stepper`
