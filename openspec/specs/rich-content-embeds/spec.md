# Rich Content Embeds

## Purpose

Enrichir le contenu des pages avec de la colorisation syntaxique et des intégrations multimedia.

## Requirements

### Requirement: Colorisation syntaxique des blocs de code
Le thème SHALL coloriser les blocs de code selon le langage spécifié.

#### Scenario: Code block avec langage
- **WHEN** l'utilisateur écrit un bloc de code avec un langage spécifié (ex: ```python)
- **THEN** le bloc est rendu avec une colorisation syntaxique adaptée au langage
- **AND** le nom du langage est affiché en haut du bloc

#### Scenario: Code block sans langage
- **WHEN** l'utilisateur écrit un bloc de code sans spécifier de langage
- **THEN** le bloc est rendu sans colorisation syntaxique
- **AND** il conserve un style lisible (fond contrasté, police monospace)

#### Scenario: Compatibilité dark mode
- **WHEN** le thème est en mode sombre
- **THEN** les couleurs de la colorisation syntaxique s'adaptent au fond sombre

### Requirement: Transformation des liens YouTube
Le thème SHALL transformer automatiquement les liens YouTube en lecteur vidéo intégré.

#### Scenario: Lien YouTube converti en embed
- **WHEN** le formateur insère un lien YouTube dans le Markdown (`https://youtu.be/XXX` ou `https://youtube.com/watch?v=XXX`)
- **THEN** le lien est remplacé par un lecteur YouTube intégré (iframe)
- **AND** le lecteur est responsive (s'adapte à la largeur du conteneur)

#### Scenario: Lien YouTube non converti
- **WHEN** un lien YouTube est dans un bloc de code ou une balise d'ancrage existante
- **THEN** il n'est pas transformé en embed
