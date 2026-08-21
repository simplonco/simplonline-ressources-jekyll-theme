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

### Requirement: Sortie console intégrée
Le thème SHALL capturer les sorties `console.log`, `console.info`, `console.warn`, `console.error` et `console.debug` du code exécuté dans la prévisualisation et les afficher dans un tiroir repliable sous l'iframe.

#### Scenario: Affichage des logs
- **WHEN** le code JS de l'apprenant appelle `console.log("text", 42, {a: 1}, [1,2])`
- **THEN** la ligne apparaît dans le tiroir console avec tous les arguments sérialisés et joints par un espace

#### Scenario: Sérialisation des valeurs
- **WHEN** un argument est un objet, un tableau, une fonction, un nœud DOM, `null`, `undefined`, ou contient une référence circulaire
- **THEN** il est affiché sous forme lisible sans lever d'erreur ni casser l'exécution

#### Scenario: Capture des erreurs runtime
- **WHEN** le code JS lève une erreur non interceptée ou rejette une promesse sans handler
- **THEN** l'erreur est ajoutée au tiroir console avec le niveau « error »

#### Scenario: Tiroir repliable
- **WHEN** l'utilisateur clique sur le bouton « Console » de la barre d'onglets
- **THEN** le tiroir se déplie/replie sous la prévisualisation
- **AND** le bouton affiche un badge avec le nombre de messages lorsque le tiroir est replié

#### Scenario: Vidage au re-render
- **WHEN** la prévisualisation est mise à jour (modification du code)
- **THEN** le contenu du tiroir console est vidé avant l'exécution du nouveau code

### Requirement: Isolation des consoles multi-playgrounds
Le thème SHALL router chaque message console vers l'instance de playground qui l'a émis.

#### Scenario: Instances multiples
- **WHEN** la page contient plusieurs playgrounds exécutant du JS simultanément
- **THEN** chaque tiroir console affiche uniquement les messages de sa propre iframe

#### Scenario: Plafond de messages
- **WHEN** le nombre de messages dépasse 200 pour une instance
- **THEN** les messages les plus anciens sont supprimés pour éviter la saturation mémoire

### Requirement: Onglet actif paramétrable
Le thème SHALL permettre de choisir l'onglet ouvert au chargement via le paramètre facultatif `default_tab`.

#### Scenario: Paramètre valide
- **WHEN** le playground est inclus avec `default_tab="js"` (ou `css`)
- **THEN** l'onglet correspondant est actif au chargement et son éditeur est visible

#### Scenario: Comportement par défaut
- **WHEN** le playground est inclus sans `default_tab`
- **THEN** l'onglet HTML est actif au chargement (comportement inchangé)

#### Scenario: Valeur invalide
- **WHEN** `default_tab` a une valeur autre que `html`, `css` ou `js` (casse indifférente)
- **THEN** le playground retombe sur l'onglet HTML
