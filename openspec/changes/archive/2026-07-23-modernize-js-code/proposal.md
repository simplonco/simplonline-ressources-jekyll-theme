# Proposal: Modernize JS Architecture

## Problem

Le code JavaScript du thème est dispersé dans plusieurs fichiers IIFE (`main.js`, `quiz.js`, `playground.js`) avec de la duplication potentielle et pas de structure claire. CodeMirror est chargé depuis des fichiers minifiés sans organisation.

## Solution

Consolider tout le JS dans un seul `main.js` modulaire avec des objets namespacés (`ThemeManager`, `Quiz`, `Playground`, etc.), ajouter CodeMirror en local, et charger uniquement `main.js` avec `defer`.

## Benefits

- **Un seul fichier JS** à charger (simplifie le cache et le build)
- **Code modulaire** avec des objets responsables (ThemeManager, Quiz, Playground)
- **DOMUtils** centralisé pour la manipulation du DOM
- **CodeMirror local** (pas de dépendance CDN)
- **Suppression de quiz.js et playground.js** (redondants)
