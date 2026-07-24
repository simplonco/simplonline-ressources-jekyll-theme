## ADDED Requirements

### Requirement: Sous-pages Markdown
Le thème SHALL permettre de créer des sous-pages en Markdown en complément du README.md principal.

#### Scenario: Page supplémentaire
- **WHEN** le formateur crée un fichier `.md` à la racine ou dans un sous-dossier
- **THEN** la page est accessible via son chemin (ex: `/exercice-1/`)
- **AND** elle utilise le même layout et style que la page d'accueil

#### Scenario: README.md comme page d'accueil
- **WHEN** le formateur visite la racine du site GitHub Pages
- **THEN** le contenu du README.md est affiché comme page d'accueil

### Requirement: Fil d'Ariane automatique
Le thème SHALL afficher un fil d'Ariane sur chaque sous-page.

#### Scenario: Fil d'Ariane sur une sous-page
- **WHEN** l'utilisateur visite une sous-page (ex: `/exercices/html-basics/`)
- **THEN** un fil d'Ariane est affiché en haut de la page
- **AND** il contient un lien vers la page d'accueil
- **AND** il contient le titre de la sous-page courante (non cliquable)

#### Scenario: Pas de fil d'Ariane sur la page d'accueil
- **WHEN** l'utilisateur visite la page d'accueil
- **THEN** le fil d'Ariane n'est pas affiché

### Requirement: Navigation parent-enfant
Le thème SHALL permettre d'établir une relation de parenté entre les pages.

#### Scenario: Lien de retour vers le parent
- **WHEN** l'utilisateur visite une sous-page
- **THEN** un lien "← Retour" vers la page parente est affiché
- **AND** le lien pointe vers le README.md principal ou la page parente définie dans le front matter
