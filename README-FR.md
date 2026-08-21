---
title: Simplonline Ressources - Thème Jekyll
layout: default
show_toc: true
---

# Simplonline Ressources - Thème Jekyll

[⬅ English version](./)

Un thème Jekyll pour créer des ressources pédagogiques (exercices, tutoriels, pages statiques) à destination des apprenants Simplonline. Marqué **Wild Code School by Simplon**.  
[Voir la version web](https://simplonco.github.io/simplonline-ressources-jekyll-theme/)

## Installation

### 1. Préparer le projet

```bash
mkdir mon-site
cd mon-site
git init
```

Créez un `.gitignore` :

```gitignore
_site/
.sass-cache/
.jekyll-cache/
.jekyll-metadata
Gemfile.lock
```

Ajoutez votre dépôt distant (remplacez l'URL par votre véritable dépôt) :

```bash
git remote add origin https://github.com/utilisateur/mon-site.git
```

### 2. Gemfile

Créez un `Gemfile` à la racine de votre projet :

```ruby
source "https://rubygems.org"

gem "jekyll", "~> 4.3"
gem "webrick", "~> 1.8"
gem "jekyll-remote-theme"
gem "jekyll-readme-index"
gem "jekyll-stepper"
```

{: .alert-warning }
**N'utilisez pas le gem `github-pages`.** Il impose `safe: true` ce qui bloque les plugins non-autorisés comme `jekyll-stepper`.

<a href="./sample-Gemfile" download="Gemfile">⬇ Télécharger Gemfile</a>

### 3. _config.yml

Créez un `_config.yml` avec la référence au thème et vos réglages :

```yaml
remote_theme: simplonco/simplonline-ressources-jekyll-theme

title: "Titre de mon site"
description: "Description de mon site"
lang: fr

show_toc: true

readme_index:
  with_frontmatter: true

markdown: kramdown
kramdown:
  input: GFM
  syntax_highlighter: rouge
  auto_ids: true

defaults:
  - scope:
      path: ""
    values:
      layout: default

plugins:
  - jekyll-readme-index
  - jekyll-remote-theme
  - jekyll-stepper
```

<a href="./_config-sample.yml" download="_config.yml">⬇ Télécharger _config.yml</a>

#### Configuration options

| Variable      | Type   | Défaut | Description |
|---------------|--------|--------|-------------|
| `title`       | string | —      | Titre affiché dans l'en-tête |
| `description` | string | —      | Description du site |
| `lang`        | string | `en`   | Attribut HTML lang |
| `show_toc`    | bool   | `false`| Afficher la table des matières |

### 4. Lancez le serveur

Pour tester localement vos contenus avant déploiement, il est nécessaire
d'[installer Jekyll](https://jekyllrb.com/docs/installation/#guides) sur votre machine.  
Une fois cela fait, installez les dépendances du projet avec Bundler :
```bash
bundle install
```
Lancer le serveur Jekyll :
```bash
bundle exec jekyll serve --livereload
```

Votre site sera accessible à l'adresse `http://localhost:4000`.

## Fonctionnement des pages

{: .alert-info }
`README.md` est le point d'entrée de votre site. Il est automatiquement converti en `index.html`. Ajoutez d'autres pages en Markdown (ex : `about.md`, `contact.md`) à n'importe quel endroit du dépôt ; chacune devient une page de votre site.

## Front Matter des pages

Chaque page peut définir ses métadonnées dans l'en-tête YAML :

```yaml
---
title: Titre de la page
description: Description pour le SEO
show_toc: true
parent: Titre de la page parente
---
```

| Champ        | Type   | Requis | Description |
|--------------|--------|--------|-------------|
| `title`      | string | non    | Titre de la page (remplace le titre global dans `<title>` et l'en-tête) |
| `description`| string | non    | Description SEO, affichée comme sous-titre |
| `show_toc`   | bool   | non    | Mettre `true` pour afficher la table des matières |
| `parent`     | string | non    | Titre de la page parente (active le fil d'Ariane + lien retour) |

## Fil d'Ariane

Le fil d'Ariane apparaît automatiquement quand la page a un `parent` dans son front matter et que cette page parente existe. La remontée traverse jusqu'à 4 niveaux.

```
Accueil > JavaScript > Variables
```

Si `parent` n'est pas défini, aucun fil d'Ariane n'est affiché.

## Lien retour

Quand `parent` est défini, un lien "← Retour vers [titre parent]" apparaît en haut du contenu, juste sous le fil d'Ariane. Stylisé dans la couleur rouge du thème.

## Table des matières

Activez avec `show_toc: true` dans le front matter de la page. La TOC est générée à partir des titres H2 à H6. Sur écran large (≥1200px), elle s'affiche en sidebar sticky ; sur les écrans plus petits, elle apparaît en haut du contenu.

> La TOC est générée côté client par JavaScript. Tous les titres doivent avoir un attribut `id` (kramdown les génère automatiquement).

## Colorisation syntaxique

Les blocs de code sont colorisés via Rouge (le surligneur par défaut de kramdown). Utilisez les blocs de code standards.

Langages supportés : tous les langages supportés par Rouge (JavaScript, CSS, HTML, Python, Ruby, Bash, YAML, etc.). Les blocs de code apparaissent avec un fond sombre et des couleurs syntaxiques qui s'adaptent automatiquement en mode sombre.
### Exemple en JavaScript
<pre>
```javascript
const name = "Alice";
let age = 25;
```
</pre>
```javascript
const name = "Alice";
let age = 25;
```

### Exemple en CSS
<pre>
```css
.card {
  background: #fff;
  border-radius: 8px;
}
```
</pre>
```css
.card {
  background: #fff;
  border-radius: 8px;
}
```

## Vidéos YouTube

Les liens YouTube sont automatiquement convertis en lecteur vidéo intégré sur GitHub Pages.

### Syntaxe avec vignette (recommandée)

```markdown
[![Titre vidéo](https://img.youtube.com/vi/ID_VIDEO/0.jpg)](https://youtu.be/ID_VIDEO)
```
[![Video title](https://img.youtube.com/vi/jNQXAC9IVRw/0.jpg)](https://youtu.be/jNQXAC9IVRw)

Sur GitHub : affiche la vignette YouTube cliquable. Sur GitHub Pages : la vignette est remplacée par un lecteur iframe 16:9 avec YouTube en mode confidentialité renforcée (`youtube-nocookie.com`).

### Syntaxe URL seule

```
https://youtu.be/ID_VIDEO
```

Auto-détectée et convertie de la même manière. Plein écran disponible.

## Playground interactif

Intégrez un éditeur de code en direct avec aperçu grâce à l'inclusion `playground.html`.

{% raw %}
```
{% capture mon_html %}
<h1>Bonjour le monde</h1>
{% endcapture %}

{% capture mon_css %}
h1 { color: red; }
{% endcapture %}

{% capture mon_js %}
console.log('Bonjour');
{% endcapture %}

{% include playground.html
  id="demo"
  initial_html=mon_html
  initial_css=mon_css
  initial_js=mon_js
%}
```
{% endraw %}

| Paramètre      | Requis | Description |
|----------------|--------|-------------|
| `id`           | non    | Identifiant unique (auto-généré si omis) |
| `initial_html` | non    | Code HTML initial (via {% raw %}`{% capture %}`{% endraw %}) |
| `initial_css`  | non    | Code CSS initial |
| `initial_js`   | non    | Code JavaScript initial |

Les trois paramètres de code sont optionnels — passez seulement ce dont vous avez besoin.

Le playground affiche trois onglets (HTML, CSS, JS), un éditeur CodeMirror avec colorisation syntaxique, et un aperçu en direct. L'aperçu se met à jour automatiquement à chaque changement (délai de 300ms). Un bouton "Open in CodePen" exporte le code. Sur mobile, l'aperçu se replie sous l'éditeur avec un bouton "View result".

Les sorties `console.log`, `console.info`, `console.warn`, `console.error` et `console.debug` du code exécuté s'affichent dans un tiroir « Console » sous l'aperçu — cliquez sur le bouton Console pour le déplier (un badge indique le nombre de messages). Les erreurs JavaScript non interceptées y sont également affichées en rouge ; inutile d'ouvrir la console du navigateur.

{% capture my_html %}
<h1>Hello World</h1>
{% endcapture %}

{% capture my_css %}
h1 { color: red; }
{% endcapture %}

{% capture my_js %}
console.log('Hello');
{% endcapture %}

{% include playground.html
  id="demo"
  initial_html=my_html
  initial_css=my_css
  initial_js=my_js
%}

For a minimal playground with small initial code, you can use inline code instead of <code>&#123;% capture %}</code> blocks:

<pre><code>&#123;% include playground.html
  id="mini"
  initial_html="&lt;h1&gt;Hello&lt;/h1&gt;"
%}
</code></pre>

## Solution intégrée au contenu

Si vous souhaitez inclure une solution dans votre contenu (par exemple pour des exercices, des solutions de playground, etc.), vous pouvez utiliser l'élément HTML `<details markdown="1">` pour créer une section rétractable. Cela permet à l'apprenant de révéler la solution uniquement quand il le souhaite. L'attribut `markdown="1"` active le rendu Markdown à l'intérieur des balises `<details>` et `<summary>`.

### Exemple

````markdown
<details markdown="1">
<summary>Voir la solution</summary>
```html
<h1>Bonjour le monde</h1>
```
```css
h1 { color: red; }
```
```javascript
console.log('Bonjour');
```
</details>
````

Donne :

<details markdown="1">
<summary>Voir la solution</summary>

```html
<h1>Bonjour le monde</h1>
```

```css
h1 { color: red; }
```

```javascript
console.log('Bonjour');
```
</details>

## Quiz interactif

Intégrez un QCM interactif dans vos pages avec l'inclusion `quiz.html`.

{% raw %}
```
{% capture quiz_data %}
[{"question":"Que signifie HTML ?","options":["Hyper Text Markup Language","High Tech Modern Language","Home Tool Markup Language","Hyper Transfer Markup Language"],"correct":0}]
{% endcapture %}
{% include quiz.html data=quiz_data %}
```
{% endraw %}

| Paramètre | Requis | Description |
|-----------|--------|-------------|
| `data`    | oui    | Tableau JSON de questions (chaîne capturée via {% raw %}`{% capture %}`{% endraw %}) |

**Format d'une question :**

```json
{
  "question": "L'intitulé",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "correct": 0
}
```

- `question` (string) — l'intitulé de la question
- `options` (array) — les choix proposés
- `correct` (number ou array) — index de la réponse unique, **ou** tableau d'indices pour les réponses multiples

**Exemple à réponse unique :**

```json
{"question":"Que signifie HTML ?","options":["Hyper Text Markup Language","High Tech Modern Language","Home Tool Markup Language","Hyper Transfer Markup Language"],"correct":0}
```

**Exemple à réponses multiples :**

```json
{"question":"Langages de programmation ?","options":["HTML","Python","CSS","JavaScript"],"correct":[1,3]}
```

Le quiz rend chaque question dans un `<fieldset>` avec `legend`. Le type d'input (`radio` ou `checkbox`) est automatiquement choisi selon que `correct` soit un nombre ou un tableau. Un bouton "Valider" déclenche le feedback visuel : vert pour les bonnes réponses, rouge pour les mauvaises. La navigation clavier est supportée (Tab, flèches, Enter).

**Exemple en direct :**

{% capture quiz_data %}
[{"question":"Que signifie HTML ?","options":["Hyper Text Markup Language","High Tech Modern Language","Home Tool Markup Language","Hyper Transfer Markup Language"],"correct":0},{"question":"Parmi ces langages, lesquels sont des langages de programmation ?","options":["HTML","Python","CSS","JavaScript"],"correct":[1,3]}]
{% endcapture %}
{% include quiz.html data=quiz_data %}

## Stepper

Le composant stepper crée un accordéon avec navigation pour les tutoriels pas à pas. Utilisez un bloc de code avec l'identifiant de langage `stepper`.

### Syntaxe

Utilisez 4 backticks pour le bloc extérieur (pour autoriser les blocs de code imbriqués) :

`````
````stepper
# Titre de l'étape

Contenu en markdown...

# Autre étape

```html
<h1>Bonjour le monde</h1>
```
````
`````

### Fonctionnement

- Chaque `# Titre` devient un en-tête d'accordéon (`<summary>`)
- Le contenu entre les titres est rendu en markdown
- Une barre de navigation avec les boutons Précédent/Suivant est ajoutée automatiquement
- La première étape est ouverte par défaut
- Une seule étape peut être ouverte à la fois

### Exemple

````stepper
# Valider la ressource suivante

Consultez la ressource sur l'introduction au HTML.

# Connaitre la structure de base

Un document HTML suit cette structure :

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Mon site</title>
</head>
<body>
    <p>Hello World</p>
</body>
</html>
```

# Créer votre premier fichier

Créez un fichier `index.html` et ajoutez le code ci-dessus.
````

## Classes utilitaires

Grâce au parser Markdown de kramdown, vous pouvez ajouter des classes à n'importe quel élément bloc en ajoutant `{:.nomdeclasse}` après le bloc. Par exemple :

Classes utilitaires disponibles :
- `alert-info` — bordure bleue à gauche, pour les messages informatifs
- `alert-warning` — bordure orange à gauche, pour les avertissements
- `text-center` — centre le texte
- `text-end` — aligne le texte à droite

```markdown
**Info** : Pensez à vérifier votre syntaxe.
{: .alert-info}

**Attention** : Cette fonctionnalité est dépréciée.
{: .alert-warning}

**Texte centré**
{: .text-center}

**Texte aligné à droite**
{: .text-end}

**Exemple combiné** :
Encadré d'alerte avec style warning et texte centré.
{: .alert-warning .text-center}
```

**Info** : Pensez à vérifier votre syntaxe.
{: .alert-info}

**Attention** : Cette fonctionnalité est dépréciée.
{: .alert-warning}

**Texte centré**
{: .text-center}

**Texte aligné à droite**
{: .text-end}

**Exemple combiné** :  
Encadré d'alerte avec style warning et texte centré.
{: .alert-warning .text-center}

## Citations

Utilisez les blocs de citation :

```markdown
> Ceci est une citation.  
> Elle peut s'étendre sur plusieurs lignes.
```

> Ceci est une citation.  
> Elle peut s'étendre sur plusieurs lignes.

## Conseils

Saut de ligne avec deux espaces en fin de ligne, ou utilisez `<br>` pour un saut forcé :

```markdown
Ceci est une ligne avec un saut après celle-ci.  
Voici la ligne suivante.

Ceci est une ligne avec un saut forcé.<br>
Voici la ligne suivante.
```

Ceci est une ligne avec un saut après celle-ci.  
Voici la ligne suivante.

Ceci est une ligne avec un saut forcé.<br>
Voici la ligne suivante.

## Démo

[Voir la démo](./demo/)
