## Context

Le playground interactif utilise `DOMUtils.createElement` pour créer dynamiquement un formulaire invisible qui POST les données du code vers l'API prefill de CodePen (`https://codepen.io/pen/define/`). Cette API accepte un champ `data` JSON contenant `title`, `html`, `css`, `js`.

Le bug : `DOMUtils.createElement` ne traite que les propriétés `className`, `id`, `textContent`, `html`, `attributes`, `style`, `dataset`. Les propriétés `action`, `method`, `target`, `type`, `name`, `value` passées directement dans l'objet options sont ignorées silencieusement.

## Goals / Non-Goals

**Goals:**
- Corriger le bouton "Open in CodePen" pour qu'il ouvre correctement CodePen avec le code pré-rempli
- Utiliser le pattern `attributes` déjà existant dans `DOMUtils.createElement`

**Non-Goals:**
- Refonte du `DOMUtils.createElement` pour supporter plus de propriétés nativement
- Ajout de nouvelles fonctionnalités au playground
- Changement du comportement attendu du bouton

## Decisions

**Décision 1 : Passer les attributs via l'option `attributes`**

L'alternative serait d'étendre `DOMUtils.createElement` pour supporter les propriétés HTML courantes (`action`, `method`, `type`, etc.). Cependant :
- Le pattern `attributes` existe déjà et est documenté
- C'est plus cohérent avec les autres appels existants
- Moins de risque de side effects

**Choix** : Utiliser l'option `attributes` existante plutôt que d'étendre l'utilitaire.

## Risks / Trade-offs

- **Risque** : Aucun. C'est un bug fix simple qui corrige un usage existant de l'API `DOMUtils.createElement`.
- **Trade-off** : Aucun.
