## ADDED Requirements

### Requirement: Structure de thème Jekyll standard
Le thème SHALL suivre la structure standard d'un thème Jekyll compatible `remote_theme`.

#### Scenario: Répertoires et fichiers requis
- **WHEN** le thème est cloné
- **THEN** il contient les répertoires `_layouts/`, `_includes/`, `assets/css/`, `assets/js/`
- **AND** il contient `_config.yml`, `Gemfile`, `.gemspec`, `.gitignore`, `LICENSE`

### Requirement: Layout unique par défaut
Le thème SHALL fournir un layout `default.html` unique.

#### Scenario: Structure du layout
- **WHEN** une page utilise le layout `default`
- **THEN** elle contient `<head>`, `<header>`, `<main>`, `<footer>`
- **AND** le `<main>` affiche le contenu `{{ content }}`

### Requirement: Variables de configuration
Le thème SHALL exposer des variables de configuration dans `_config.yml`.

#### Scenario: Configuration de base
- **WHEN** l'utilisateur définit `title` et `description` dans `_config.yml`
- **THEN** le titre est affiché dans le `<header>` et l'onglet du navigateur
- **AND** la description est affichée sous le titre

#### Scenario: Langue du document
- **WHEN** l'utilisateur définit `lang: fr` ou `lang: en`
- **THEN** l'attribut `lang` de la balise `<html>` est positionné

### Requirement: Contenu responsive
Le thème SHALL être entièrement responsive.

#### Scenario: Affichage mobile
- **WHEN** la page est affichée sur un écran de moins de 768px
- **THEN** le contenu s'adapte sans débordement horizontal

### Requirement: Classes utilitaires CSS
Le thème SHALL fournir des classes utilitaires pour le contenu Markdown.

#### Scenario: Alertes
- **WHEN** l'utilisateur utilise `{: .alert-info }` ou `{: .alert-warning }`
- **THEN** le paragraphe est stylisé avec les couleurs d'alerte correspondantes
