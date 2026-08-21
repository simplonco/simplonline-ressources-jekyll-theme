## ADDED Requirements

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
