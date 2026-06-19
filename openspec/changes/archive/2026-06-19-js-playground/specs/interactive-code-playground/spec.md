# Interactive Code Playground

## Purpose

Permettre aux apprenants d'éditer et d'exécuter du code HTML/CSS/JS en direct depuis la page de cours, avec export vers CodePen.

## Requirements

### Requirement: Éditeur de code avec onglets
Le thème SHALL fournir un éditeur de code avec trois onglets (HTML, CSS, JS).

#### Scenario: Onglets fonctionnels
- **WHEN** l'utilisateur clique sur un onglet (HTML, CSS ou JS)
- **THEN** le textarea correspondant est affiché
- **AND** les autres textarea sont masqués
- **AND** l'onglet actif est visuellement distinct

#### Scenario: Contenu initial
- **WHEN** le playground est inclus avec des paramètres `initial_html`, `initial_css`, `initial_js`
- **THEN** chaque textarea est pré-rempli avec le contenu correspondant

#### Scenario: Coloration syntaxique
- **WHEN** l'utilisateur modifie le code dans un onglet
- **THEN** le code est colorisé selon la syntaxe du langage (HTML, CSS ou JS)
- **AND** les couleurs s'adaptent au thème clair/sombre

### Requirement: Prévisualisation en direct
Le thème SHALL afficher un aperçu du code exécuté dans une iframe sandboxée.

#### Scenario: Mise à jour automatique
- **WHEN** l'utilisateur modifie le contenu d'un textarea
- **THEN** la prévisualisation est mise à jour automatiquement après 300ms d'inactivité

#### Scenario: Isolation
- **WHEN** le code est exécuté dans la prévisualisation
- **THEN** il est isolé dans une iframe avec l'attribut `sandbox="allow-scripts allow-modals"`
- **AND** le code de la page parente n'est pas accessible depuis l'iframe

### Requirement: Export vers CodePen
Le thème SHALL fournir un bouton pour ouvrir le code dans CodePen.

#### Scenario: Ouverture dans CodePen
- **WHEN** l'utilisateur clique sur "Open in CodePen"
- **THEN** un nouvel onglet s'ouvre vers CodePen avec le code HTML, CSS et JS pré-rempli
- **AND** le titre "JS Playground" est défini

### Requirement: Multi-playground
Le thème SHALL permettre plusieurs instances indépendantes sur une même page.

#### Scenario: Instances multiples
- **WHEN** la page contient plusieurs playgrounds avec des `id` différents
- **THEN** chaque playground fonctionne indépendamment
- **AND** les onglets et la prévisualisation sont isolés par instance

### Requirement: Compatibilité thème
Le thème SHALL s'intégrer visuellement au design existant.

#### Scenario: Mode dark
- **WHEN** le thème est en mode sombre
- **THEN** le playground utilise les couleurs du thème dark
- **AND** le texte des textarea est lisible (fond contrasté)

#### Scenario: Responsive
- **WHEN** la page est affichée sur un écran de moins de 768px
- **THEN** l'éditeur et la prévisualisation sont empilés verticalement
