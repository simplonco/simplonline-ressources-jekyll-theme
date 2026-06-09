# Dark/Light Mode

## Purpose

Support du mode sombre et clair avec détection automatique via `prefers-color-scheme` et bascule manuelle par l'utilisateur, avec persistance du choix.

## Requirements

### Requirement: Détection automatique du mode
Le thème SHALL détecter automatiquement la préférence de l'utilisateur via la media query `prefers-color-scheme`.

#### Scenario: Mode sombre automatique
- **WHEN** le système d'exploitation est en mode sombre
- **THEN** le thème s'affiche en mode sombre par défaut

#### Scenario: Mode clair automatique
- **WHEN** le système d'exploitation est en mode clair
- **THEN** le thème s'affiche en mode clair par défaut

### Requirement: Bascule manuelle
Le thème SHALL fournir un bouton de bascule entre les modes.

#### Scenario: Changement de mode
- **WHEN** l'utilisateur clique sur le bouton de bascule
- **THEN** le thème passe du mode clair au mode sombre ou inversement

### Requirement: Persistance du choix
Le thème SHALL persister le choix de l'utilisateur.

#### Scenario: Mémorisation du mode
- **WHEN** l'utilisateur change de mode
- **THEN** sa préférence est stockée dans `localStorage`
- **AND** au prochain chargement de page, le mode choisi est restauré
