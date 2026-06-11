---
title: Exercice — HTML Basics
description: Créer votre première page HTML avec les balises essentielles
parent: Exercices JavaScript
show_toc: true
---

Dans cet exercice, vous allez créer une page HTML structurée avec les balises sémantiques de base.

## Consigne

Créez un fichier `index.html` qui respecte les consignes suivantes :

### Structure

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ma première page</title>
</head>
<body>
  <header>
    <h1>Mon site</h1>
  </header>
  <main>
    <p>Contenu principal</p>
  </main>
  <footer>
    <p>&copy; 2026</p>
  </footer>
</body>
</html>
```

### Balises à utiliser

| Balise | Usage |
|--------|-------|
| `<header>` | En-tête de la page |
| `<main>` | Contenu principal |
| `<footer>` | Pied de page |
| `<section>` | Section thématique |
| `<article>` | Contenu indépendant |

## Validation

Validez votre page avec le [W3C Validator](https://validator.w3.org/).

## Ressource vidéo

Regardez cette démo sur les bases du HTML :

[![Démo HTML](https://img.youtube.com/vi/jNQXAC9IVRw/0.jpg)](https://www.youtube.com/watch?v=jNQXAC9IVRw)

## Code de correction attendu

```html
<!-- Solution -->
<section>
  <h2>À propos</h2>
  <p>Ceci est ma première page HTML.</p>
</section>
```

```css
/* Style de base */
body {
  font-family: sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
}
```
