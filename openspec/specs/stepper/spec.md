# Stepper

## Purpose

Système d'accordéon avec navigation pour les étapes pédagogiques, rendu à partir de blocs de code markdown fenced avec le language `stepper`.

## Requirements

### Requirement: Bloc de code stepper
Le thème SHALL interpréter les blocs de code fenced avec l'info string `stepper` comme un composant stepper.

#### Scenario: Syntaxe de base
- **WHEN** un bloc de code fenced utilise `` ```stepper `` avec 4 backticks
- **THEN** le contenu est rendu en HTML avec des `<details>/<summary>` pour chaque étape

#### Scenario: Imbrication de blocs de code
- **WHEN** le stepper contient des blocs de code imbriqués (ex: `` ```html ``)
- **THEN** les blocs imbriqués sont rendus correctement avec syntax highlighting

### Requirement: Titres comme accordeons
- **WHEN** le stepper contient des titres h1 (`# Titre`)
- **THEN** chaque titre devient un `<summary>` dans un `<details>`

### Requirement: Navigation
Le stepper SHALL fournir des boutons Previous/Next pour naviguer entre les étapes.

#### Scenario: État initial
- **WHEN** le stepper est affiché
- **THEN** le premier accordéon est ouvert
- **AND** le bouton Previous est désactivé
- **AND** le compteur affiche "Étape 1 / N"

#### Scenario: Bouton Next
- **WHEN** l'utilisateur clique sur Next
- **THEN** l'accordéon courant se ferme
- **AND** l'accordéon suivant s'ouvre
- **AND** le compteur est mis à jour

#### Scenario: Bouton Previous
- **WHEN** l'utilisateur clique sur Previous
- **THEN** l'accordéon courant se ferme
- **AND** l'accordéon précédent s'ouvre
- **AND** le compteur est mis à jour

#### Scenario: Dernière étape
- **WHEN** l'utilisateur est à la dernière étape
- **THEN** le bouton Next est désactivé

#### Scenario: Interaction manuelle
- **WHEN** l'utilisateur ouvre un accordéon manuellement (clic sur summary)
- **THEN** la navigation se synchronise avec l'état ouvert

### Requirement: Style visuel
Le stepper SHALL avoir un style distinctif pour les états ouvert/fermé.

#### Scenario: État ouvert
- **WHEN** un accordéon est ouvert
- **THEN** le background est `var(--color-border)`
- **AND** une bordure rouge de 3px s'affiche à gauche

#### Scenario: État fermé
- **WHEN** un accordéon est fermé
- **THEN** le background est `var(--color-code-bg)`

#### Scenario: Hover
- **WHEN** l'utilisateur survole un accordéon
- **THEN** le background devient `var(--color-border)`
