## ADDED Requirements

### Requirement: Documentation bilingue
Le thème SHALL fournir la documentation en français et en anglais.

#### Scenario: README principal en anglais
- **WHEN** un visiteur arrive sur le dépôt GitHub
- **THEN** le README.md affiche la documentation en anglais
- **AND** il contient un lien vers la version française

#### Scenario: README français
- **WHEN** le visiteur clique sur le lien vers la version française
- **THEN** il accède à README-FR.md avec la documentation en français
