# SQL Playground

## Purpose

Permettre aux formateurs d'intégrer un éditeur SQL interactif dans leurs ressources pédagogiques, avec exécution côté client via sql.js et base pédagogique embarquée via des variables Liquid.

## Requirements

### Requirement: Include SQL playground
Le thème SHALL fournir un include `sql-playground.html` permettant d'intégrer un éditeur SQL interactif dans une page Markdown.

#### Scenario: Include avec paramètres
- **WHEN** le formateur utilise `{% include sql-playground.html id="ex1" schema=db_schema query=initial_query %}`
- **THEN** un composant SQL playground est rendu dans la page avec l'éditeur pré-rempli

#### Scenario: Include sans paramètres optionnels
- **WHEN** le formateur utilise `{% include sql-playground.html %}` sans `schema` ni `query`
- **THEN** un playground vide est rendu sans erreur

#### Scenario: ID auto-généré
- **WHEN** le formateur omet le paramètre `id`
- **THEN** un identifiant unique est généré automatiquement (pattern `sql-pg-{n}`)

### Requirement: Éditeur SQL avec coloration syntaxique
Le playground SHALL fournir un éditeur CodeMirror avec le mode SQL activé.

#### Scenario: Coloration syntaxique SQL
- **WHEN** l'utilisateur tape du code dans l'éditeur
- **THEN** le code est colorisé selon la syntaxe SQL (mots-clés, fonctions, chaînes, commentaires)

#### Scenario: Mode sombre
- **WHEN** le thème est en mode sombre
- **THEN** les couleurs de l'éditeur SQL s'adaptent au thème sombre

#### Scenario: Contenu initial
- **WHEN** le playground est inclus avec un paramètre `query`
- **THEN** l'éditeur est pré-rempli avec le contenu de `query`

### Requirement: Exécution SQL via sql.js
Le playground SHALL exécuter les requêtes SQL côté client via sql.js (SQLite WebAssembly).

#### Scenario: Lazy-loading de sql.js
- **WHEN** la page contient un composant `.sql-playground`
- **THEN** sql.js est chargé uniquement au premier clic sur "Exécuter"
- **AND** un indicateur de chargement est affiché pendant le téléchargement du WASM

#### Scenario: Pas de sql.js si absent
- **WHEN** la page ne contient aucun composant `.sql-playground`
- **THEN** sql.js n'est pas chargé

#### Scenario: Exécution du schema
- **WHEN** l'utilisateur clique sur "Exécuter"
- **THEN** le contenu du paramètre `schema` est exécuté en premier (CREATE TABLE, INSERT, etc.)

#### Scenario: Exécution de la requête
- **WHEN** le schema a été exécuté avec succès
- **THEN** le contenu de l'éditeur est exécuté sur la base créée

#### Scenario: Table recréée à chaque exécution
- **WHEN** l'utilisateur clique sur "Exécuter" une deuxième fois
- **THEN** une nouvelle base est créée depuis le schema (pas d'accumulation d'état)

### Requirement: Affichage des résultats en tableau
Le playground SHALL afficher les résultats des requêtes SELECT sous forme de tableau HTML.

#### Scenario: Requête SELECT avec résultats
- **WHEN** l'utilisateur exécute `SELECT * FROM users;` et que la requête retourne des lignes
- **THEN** un tableau HTML est affiché avec les noms de colonnes en en-tête et les données en lignes

#### Scenario: Requête SELECT vide
- **WHEN** l'utilisateur exécute une requête qui ne retourne aucune ligne
- **THEN** le message "Aucun résultat" est affiché

#### Scenario: Requête non-SELECT
- **WHEN** l'utilisateur exécute une requête INSERT, UPDATE, DELETE ou DDL
- **THEN** un message de confirmation est affiché (ex: "3 ligne(s) affectée(s)")

### Requirement: Gestion des erreurs SQL
Le playground SHALL afficher les erreurs SQL de manière lisible.

#### Scenario: Erreur de syntaxe
- **WHEN** l'utilisateur exécute une requête avec une erreur de syntaxe
- **THEN** un bloc d'erreur est affiché avec le message d'erreur SQL
- **AND** le bloc est stylisé avec un fond rouge/orange distinctif

#### Scenario: Erreur de table inexistante
- **WHEN** l'utilisateur référence une table qui n'existe pas
- **THEN** le message d'erreur explicite est affiché (ex: "no such table: users")

### Requirement: Boutons d'action
Le playground SHALL fournir des boutons pour exécuter et réinitialiser.

#### Scenario: Bouton Exécuter
- **WHEN** l'utilisateur clique sur "Exécuter"
- **THEN** le schema est exécuté puis la requête de l'éditeur

#### Scenario: Bouton Réinitialiser
- **WHEN** l'utilisateur clique sur "Réinitialiser"
- **THEN** le contenu de l'éditeur est rétabli à la requête initiale (`query`)

#### Scenario: État du bouton pendant exécution
- **WHEN** sql.js est en cours de chargement
- **THEN** le bouton "Exécuter" affiche "Chargement…" et est désactivé

### Requirement: Base pédagogique via Liquid
Le formulaire SHALL accepter le schéma de la base via une variable Liquid `{% capture %}`.

#### Scenario: Schema dans capture
- **WHEN** le formateur définit `{% capture db_schema %}CREATE TABLE...{% endcapture %}` et passe `schema=db_schema`
- **THEN** le SQL du capture est utilisé comme schéma initial de la base

#### Scenario: Schema multi-lignes
- **WHEN** le schema contient plusieurs instructions SQL séparées par des points-virgules
- **THEN** toutes les instructions sont exécutées dans l'ordre

### Requirement: Multi-instance
Le thème SHALL permettre plusieurs playgrounds SQL indépendants sur une même page.

#### Scenario: Instances multiples
- **WHEN** la page contient plusieurs `sql-playground` avec des `id` différents
- **THEN** chaque playground fonctionne indépendamment avec sa propre base en mémoire

### Requirement: Compatibilité responsive
Le playground SHALL s'adapter aux écrans mobiles.

#### Scenario: Écran étroit
- **WHEN** la page est affichée sur un écran de moins de 768px
- **THEN** l'éditeur et les résultats sont empilés verticalement
- **AND** la police de l'éditeur est ajustée pour la lisibilité
