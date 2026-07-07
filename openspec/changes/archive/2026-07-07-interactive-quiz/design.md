## Context

Le thème Jekyll Simplonline dispose déjà d'un composant interactif (le Playground, éditeur de code) selon le pattern `_includes/component.html` + `assets/js/component.js` + `assets/css/component.css`. Le quiz suit exactement le même pattern.

Le rendu est intégralement côté client : les données JSON sont passées via un `<script type="application/json">` dans l'include Liquid, et le JavaScript construit le DOM.

## Goals / Non-Goals

**Goals:**
- Permettre aux formateurs d'ajouter un QCM dans une page via `{% capture quiz_data %}...{% endcapture %}` + `{% include quiz.html data=quiz_data %}`
- Support des questions à réponse unique (radio) et réponses multiples (checkbox)
- Feedback visuel immédiat (vert/rouge) après clic sur "Valider"
- Accessibilité clavier : `<fieldset>` + `<legend>` + `label[for]` + navigation par flèches
- Aucune dépendance externe (JavaScript vanilla)

**Non-Goals:**
- Score ou persistance des résultats
- Questions avec saisie libre (texte)
- Timer ou mode examen

## Decisions

1. **Données via JSON dans script tag** plutôt que parsing Liquid complexe — les données JSON sont passées dans un `<script type="application/json">` à l'intérieur du conteneur, parsé côté client. Simple, sécurisé (pas d'encoding HTML), flexible.

2. **Validation différée par bouton "Valider"** plutôt que validation immédiate au clic — la validation au `change` des radios empêche la navigation clavier (les flèches déclenchent la réponse). Un bouton "Valider" désactivé tant qu'aucune option n'est cochée résout le problème.

3. **`correct` comme nombre OU tableau** — un nombre pour réponse unique (rétrocompatible), un tableau pour réponses multiples. Le JS détecte `Array.isArray(q.correct)` pour choisir `input[type=radio]` ou `input[type=checkbox]`.

4. **Pattern en 3 fichiers** comme le Playground — `_includes/quiz.html`, `assets/js/quiz.js`, `assets/css/quiz.css`. Cohérence avec l'existant.

5. **Feedback visuel plein pour les réponses correctes non cochées** — une bonne réponse que l'utilisateur n'a pas sélectionnée apparaît en vert au même titre que les bonnes réponses cochées. L'utilisateur voit visuellement ce qu'il a manqué.

## Risks / Trade-offs

- **Rendu côté client** → le contenu du quiz n'est pas indexé par les moteurs de recherche. Acceptable pour un outil pédagogique.
- **JSON dans le Markdown** → peut être verbeux pour de grands quiz. Alternative future : définir les quiz dans `_data/`.
