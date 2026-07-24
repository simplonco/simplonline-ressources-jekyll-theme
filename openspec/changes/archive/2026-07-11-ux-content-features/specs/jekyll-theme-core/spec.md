## MODIFIED Requirements

### Requirement: Variables de configuration
Le thème SHALL exposer des variables de configuration dans `_config.yml` et le front matter des pages.

#### Scenario: Configuration de base
- **WHEN** l'utilisateur définit `title` et `description` dans `_config.yml`
- **THEN** le titre est affiché dans le `<header>` et l'onglet du navigateur
- **AND** la description est affichée sous le titre

#### Scenario: Titre et description par page
- **WHEN** une page définit `title` et `description` dans son front matter YAML
- **THEN** le titre de la page est affiché dans le `<header>` et l'onglet du navigateur (remplace le titre global)
- **AND** la description est utilisée dans les balises meta `og:description` et `description`

#### Scenario: Langue du document
- **WHEN** l'utilisateur définit `lang: fr` ou `lang: en`
- **THEN** l'attribut `lang` de la balise `<html>` est positionné
