## Architecture

### Converter Kramdown (`_plugins/stepper_converter.rb`)

Le converter intercepte les blocs de code fenced avec l'info string `stepper` et génère du HTML personnalisé.

**Algorithme :**
1. Détecter les blocs `language-stepper` dans `convert_codeblock`
2. Parser le contenu texte
3. Découper sur les titres h1 (`# Titre`)
4. Pour chaque section : extraire le titre et le contenu
5. Rendre le contenu markdown de chaque section via Kramdown
6. Générer le HTML `<details>/<summary>` avec navigation

**Structure HTML générée :**
```html
<div class="stepper" data-steps="3">
  <div class="stepper-nav">
    <button class="stepper-prev" disabled>← Précédent</button>
    <span class="stepper-progress">Étape 1 / 3</span>
    <button class="stepper-next">Suivant →</button>
  </div>
  <details open>
    <summary>Titre étape 1</summary>
    <div class="stepper-content">Contenu rendu en markdown</div>
  </details>
  <hr />
  <details>
    <summary>Titre étape 2</summary>
    <div class="stepper-content">Contenu rendu en markdown</div>
  </details>
  <hr />
  <details>
    <summary>Titre étape 3</summary>
    <div class="stepper-content">Contenu rendu en markdown</div>
  </details>
</div>
```

### CSS (`assets/css/style.css`)

Styles dans le layer `components` :
- `.stepper` : conteneur avec margin/padding
- `.stepper-nav` : flexbox pour les boutons et le compteur
- `.stepper-prev`, `.stepper-next` : styles de boutons
- `.stepper-progress` : compteur centré
- `details summary` : cursor pointer, styling PicoCSS-compatible
- `details[open]` : animation d'ouverture (optionnel)
- Dark mode : variables CSS pour les couleurs

### JavaScript (`assets/js/main.js`)

Module `Stepper` (pattern similaire à `SyntaxHighlighter`) :
1. Sélectionner tous les `.stepper`
2. Pour chaque stepper :
   - Trouver tous les `<details>` et les boutons nav
   - Initialiser l'état (premier ouvert, boutons disabled)
   - Écouter les clics sur Previous/Next
   - Écouter les changements d'état des `<details>`
3. Logique de navigation :
   - Previous : fermer courant, ouvrir précédent
   - Next : fermer courant, ouvrir suivant
   - Désactiver Previous sur premier, Next sur dernier
   - Sync navigation si l'utilisateur ouvre un accordéon manuellement
