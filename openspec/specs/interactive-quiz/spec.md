# Interactive Quiz

## Purpose

Permettre aux formateurs d'intégrer des QCM interactifs dans leurs pages de cours, avec feedback visuel immédiat et support des réponses uniques ou multiples.

## Requirements

### Requirement: Quiz data from Liquid include
Le quiz SHALL être défini via un include Liquid `{% include quiz.html data=quiz_data %}` où `quiz_data` est une chaîne JSON capturée via `{% capture %}`.
L'include SHALL accepter un tableau de questions.

### Requirement: Question format
Chaque question SHALL avoir les champs :
- `question` (string) — l'intitulé
- `options` (array of strings) — les choix proposés
- `correct` (number ou array of numbers) — l'index de la réponse correcte (unique) ou les indices des réponses correctes (multiples)

Le quiz SHALL détecter le type de question : si `correct` est un nombre → réponse unique, si `correct` est un tableau → réponses multiples.

### Requirement: Single-answer question rendering
Une question à réponse unique SHALL utiliser des `input[type=radio]` regroupés dans un `<fieldset>` avec `<legend>` pour l'intitulé.
Chaque `input` SHALL avoir un `id` unique et son `label` SHALL pointer vers cet `id` via `htmlFor`.

#### Scenario: Single-answer renders radios
- **WHEN** `correct` est un nombre
- **THEN** les options sont rendues avec des `input[type=radio]`
- **AND** les radios partagent le même `name`

### Requirement: Multiple-answer question rendering
Une question à réponses multiples SHALL utiliser des `input[type=checkbox]` dans un `<fieldset>`.

#### Scenario: Multiple-answer renders checkboxes
- **WHEN** `correct` est un tableau
- **THEN** les options sont rendues avec des `input[type=checkbox]`

### Requirement: Validation via submit button
Chaque question SHALL avoir un bouton "Valider" désactivé tant qu'aucune option n'est cochée.
La validation SHALL se déclencher au clic sur ce bouton, pas au changement de sélection.

#### Scenario: Button enables on selection
- **WHEN** l'utilisateur sélectionne une option (radio) ou coche une case (checkbox)
- **THEN** le bouton "Valider" devient actif

#### Scenario: Single-answer validation
- **WHEN** l'utilisateur clique sur "Valider"
- **AND** la réponse est correcte
- **THEN** l'option sélectionnée reçoit la classe `.is-correct`
- **WHEN** la réponse est incorrecte
- **THEN** l'option sélectionnée reçoit `.is-incorrect`
- **AND** la bonne réponse reçoit `.is-correct`

#### Scenario: Multiple-answer validation
- **WHEN** l'utilisateur clique sur "Valider"
- **THEN** chaque option cochée et correcte reçoit `.is-correct`
- **AND** chaque option cochée et incorrecte reçoit `.is-incorrect`
- **AND** chaque option non cochée mais correcte reçoit `.is-correct`

### Requirement: Inputs disabled after validation
Après validation, tous les `input` de la question SHALL être désactivés (`disabled=true`).

#### Scenario: Post-validation state
- **WHEN** l'utilisateur a cliqué sur "Valider"
- **THEN** tous les inputs de la question sont désactivés
- **AND** le bouton "Valider" est désactivé

### Requirement: Visual feedback
Le feedback visuel SHALL utiliser les classes CSS `.is-correct` (fond vert) et `.is-incorrect` (fond rouge).
Le thème supporte le dark mode SHALL adapter ces couleurs.

### Requirement: Accessibility
Le quiz SHALL utiliser la sémantique HTML appropriée : `<fieldset>` + `<legend>`, `label[for]`, `input:focus-visible`.
La navigation clavier (Tab, flèches) SHALL être fonctionnelle.

#### Scenario: Keyboard navigation
- **WHEN** l'utilisateur navigue au clavier
- **THEN** Tab permet de passer d'un champ à l'autre
- **AND** les flèches permettent de naviguer entre les radios d'une même question
- **AND** Enter ou Espace active le bouton "Valider"
