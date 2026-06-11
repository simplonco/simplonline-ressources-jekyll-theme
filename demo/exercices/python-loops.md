---
title: Exercice — Boucles en Python
description: Manipuler les boucles for et while en Python
parent: Exercices JavaScript
show_toc: true
---

## Objectif

Écrire plusieurs fonctions utilisant les boucles en Python.

## Consignes

### 1. Somme des pairs

Écrivez une fonction qui prend une liste d'entiers et retourne la somme des nombres pairs :

```python
def sum_even(numbers):
    total = 0
    for n in numbers:
        if n % 2 == 0:
            total += n
    return total
```

### 2. Compte à rebours

Utilisez une boucle `while` pour afficher un compte à rebours :

```python
def countdown(start):
    while start > 0:
        print(start)
        start -= 1
    print("Décollage !")
```

### 3. Filtre de mots

Filtrez les mots de plus de 5 lettres avec une compréhension de liste :

```python
def filter_long_words(words):
    return [w for w in words if len(w) > 5]
```

## Tests

```python
assert sum_even([1, 2, 3, 4, 5, 6]) == 12
assert filter_long_words(["chat", "éléphant", "chien", "hippopotame"]) == ["éléphant", "hippopotame"]
```
