---
title: "Démo : Playground SQL"
description: Exercice interactif avec un playground SQL dédié
parent: Simplonline Ressources - Jekyll Theme
show_toc: true
---

## Introduction

Ce playground SQL te permet d'exécuter des requêtes SQL directement dans ta navigateur. La base de données est pré-chargée avec des données de démonstration.

## Base de données

Nous utilisons une base de données contenant des utilisateurs et leurs commandes. La structure de la base est la suivante :

```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  age INTEGER,
  email TEXT
);

CREATE TABLE orders (
  id INTEGER PRIMARY KEY,
  user_id INTEGER,
  product TEXT NOT NULL,
  amount REAL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

{% capture db_schema %}
CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  age INTEGER,
  email TEXT
);

CREATE TABLE orders (
  id INTEGER PRIMARY KEY,
  user_id INTEGER,
  product TEXT NOT NULL,
  amount REAL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO users VALUES
  (1, 'Alice', 30, 'alice@example.com'),
  (2, 'Bob', 22, 'bob@example.com'),
  (3, 'Charlie', 28, 'charlie@example.com'),
  (4, 'Diana', 35, 'diana@example.com'),
  (5, 'Eve', 19, 'eve@example.com');

INSERT INTO orders VALUES
  (1, 1, 'Laptop', 999.99),
  (2, 1, 'Souris', 29.99),
  (3, 2, 'Clavier', 79.99),
  (4, 3, 'Écran', 349.99),
  (5, 3, 'Casque', 149.99),
  (6, 4, 'Laptop', 999.99),
  (7, 5, 'Tablette', 299.99);
{% endcapture %}

## Exercice 1 : Requêtes simples

Modifie la requête ci-dessous pour :

1. Sélectionner tous les utilisateurs de plus de 25 ans
2. Sélectionner le nom et l'email de tous les utilisateurs
3. Sélectionner tous les produits coûtant plus de 100

{% capture query_1 %}
{% endcapture %}

{% include sql-playground.html
  id="exercice-1"
  schema=db_schema
  query=query_1
%}

<details markdown="1">
<summary>Solution</summary>

```sql
-- Utilisateurs de plus de 25 ans
SELECT * FROM users WHERE age > 25;

-- Nom et email
SELECT name, email FROM users;

-- Produits plus de 100
SELECT * FROM orders WHERE amount > 100;
```
</details>

## Exercice 2 : Jointures

Écris une requête pour afficher le nom de chaque utilisateur et le produit qu'il a commandé.

{% capture query_2 %}
{% endcapture %}

{% include sql-playground.html
  id="exercice-2"
  schema=db_schema
  query=query_2
%}

<details markdown="1">
<summary>Solution</summary>

```sql
-- Jointure users-orders
SELECT users.name, orders.product, orders.amount
FROM users
JOIN orders ON users.id = orders.user_id;
```
</details>

## Exercice 3 : Agrégations

Utilise les fonctions d'agrégation pour :

1. Calculer le nombre total d'utilisateurs
2. Calculer le montant total des commandes par utilisateur
3. Trouver le produit le plus cher

{% capture query_3 %}
{% endcapture %}

{% include sql-playground.html
  id="exercice-3"
  schema=db_schema
  query=query_3
%}

<details markdown="1">
<summary>Solution</summary>

```sql
-- Nombre total d'utilisateurs
SELECT COUNT(*) as total_users FROM users;

-- Montant total par utilisateur
SELECT users.name, SUM(orders.amount) as total_spent
FROM users
JOIN orders ON users.id = orders.user_id
GROUP BY users.id;

-- Produit le plus cher
SELECT product, MAX(amount) as max_price FROM orders;
```
</details>

## Exercice 4 : Conditions et tri

Écris des requêtes pour :

1. Trouver les utilisateurs dont le nom commence par 'A' ou 'B'
2. Afficher les commandes triées par montant décroissant
3. Trouver les utilisateurs qui ont passé 2 commandes minimum

{% capture query_4 %}
{% endcapture %}

{% include sql-playground.html
  id="exercice-4"
  schema=db_schema
  query=query_4
%}

<details markdown="1">
<summary>Solution</summary>

```sql
-- Utilisateurs A ou B
SELECT * FROM users WHERE name LIKE 'A%' OR name LIKE 'B%';

-- Commandes triées par montant
SELECT * FROM orders ORDER BY amount DESC;

-- Utilisateurs avec plus de 2 commandes
SELECT users.name, COUNT(orders.id) as order_count
FROM users
JOIN orders ON users.id = orders.user_id
GROUP BY users.id
HAVING order_count >= 2;
```
</details>

## 👉 Version markdown de cette démo

Consulter la [version markdown de cette démo](https://raw.githubusercontent.com/simplonco/simplonline-ressources-jekyll-theme/refs/heads/main/demo/sql-demo.md) pour voir le code complet.
{: .alert-info }
