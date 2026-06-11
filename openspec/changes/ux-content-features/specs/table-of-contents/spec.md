## ADDED Requirements

### Requirement: Table des matières automatique
Le thème SHALL fournir une table des matières générée automatiquement à partir des titres de la page.

#### Scenario: TOC activée via front matter
- **WHEN** une page définit `show_toc: true` dans son front matter
- **THEN** une table des matières est générée à partir des titres H2 à H6
- **AND** la TOC est affichée en haut du contenu, après le titre de la page

#### Scenario: TOC désactivée par défaut
- **WHEN** une page n'a pas `show_toc` dans son front matter
- **THEN** la table des matières n'est pas affichée

#### Scenario: Liens ancrés dans la TOC
- **WHEN** l'utilisateur clique sur un lien de la TOC
- **THEN** la page défile jusqu'à la section correspondante
- **AND** l'URL de la page est mise à jour avec l'ancre correspondante

#### Scenario: Hiérarchie des titres
- **WHEN** la page contient des titres de niveaux H2, H3, H4
- **THEN** la TOC reflète la hiérarchie avec une indentation visuelle
- **AND** chaque titre a une ancre HTML unique pour le linking direct
