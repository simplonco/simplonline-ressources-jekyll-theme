---
title: JavaScript — Les bases
description: Page d'accueil du module JavaScript avec la liste des ressources disponibles
show_toc: true
---

Bienvenue dans le module **JavaScript — Les bases**. Ce module couvre les fondamentaux du langage JavaScript : variables, fonctions, boucles, et manipulation du DOM.

## Variables et types

En JavaScript, on déclare une variable avec `let`, `const`, ou (déconseillé) `var` :

```javascript
const name = "Alice";
let age = 25;
var oldWay = "éviter";
```

### Types primitifs

Les principaux types sont :

```javascript
typeof "string"   // "string"
typeof 42         // "number"
typeof true       // "boolean"
typeof null       // "object" (c'est un bug historique)
typeof undefined  // "undefined"
```

### Tableaux

```javascript
const fruits = ["pomme", "banane", "cerise"];
fruits.push("datte");
console.log(fruits.length); // 4
```

## Fonctions

Une fonction en JavaScript peut s'écrire de plusieurs façons :

```javascript
// Fonction classique
function add(a, b) {
  return a + b;
}

// Fonction fléchée
const multiply = (a, b) => a * b;

// Fonction avec paramètre par défaut
const greet = (name = "Monde") => `Bonjour, ${name}!`;
```

## Boucles

Parcourir un tableau avec `for...of` :

```javascript
const couleurs = ["rouge", "vert", "bleu"];
for (const couleur of couleurs) {
  console.log(couleur);
}
```

Avec `forEach` :

```javascript
couleurs.forEach((c, i) => {
  console.log(`${i}: ${c}`);
});
```

## Manipulation du DOM

Sélectionner et modifier un élément :

```javascript
// Sélection
const title = document.querySelector("h1");
const allParas = document.querySelectorAll("p");

// Modification
title.textContent = "Nouveau titre";
title.style.color = "#E40046";

// Création
const div = document.createElement("div");
div.classList.add("alert-info");
div.textContent = "Ceci est une alerte !";
document.body.appendChild(div);
```

## Ressources vidéo

Regardez cette introduction aux bases de JavaScript :

[![Introduction à JavaScript](https://img.youtube.com/vi/jNQXAC9IVRw/0.jpg)](https://www.youtube.com/watch?v=jNQXAC9IVRw)


## JS Playground

Pour expérimenter avec du code HTML, CSS ou JavaScript, utilisez ce playground en ligne :
[JS Playground →](js-playground)


## Exercices

Pour pratiquer, rendez-vous sur la page des exercices :
[Exercices JavaScript →](./exercices)
