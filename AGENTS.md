# Project Guide for AI Agents

## PRÉ-FLIGHT CHECKLIST (OBLIGATOIRE — exécuter avant toute action de code)

Avant d'écrire ou modifier la moindre ligne de code, vérifier DANS L'ORDRE :

1. **Quelle est la branche courante ?** Si `main`, NE RIEN FAIRE — demander la permission de créer une branche.
2. **Le changement a-t-il un slug (nom de change) ?** Sinon, le définir avec l'utilisateur.
3. **La branche de feature existe-t-elle ?** Sinon, la créer depuis `main` (`git checkout -b <slug>`).
4. **Le change OpenSpec est-il défini ?** Sinon, lancer `openspec-propose` ou demander à l'utilisateur.

Si l'un de ces points n'est pas OK, **ne pas commencer à coder**.

## Commit Policy

- **Langue** : commits en anglais
- **Format** : `<type>: <sujet court (impératif)>`
- **Types** : `feat`, `fix`, `docs`, `refactor`, `style`, `chore`
- **Scope** : optionnel entre parenthèses (ex: `fix(playground): message`)
- **Corps** : optionnel, liste à puces des changements détaillés
- **Règle importante** : **toujours demander avant de commit** — les commits ne se font qu'après validation utilisateur (tests, revue)
- **Atomicité** : un commit = une logique de changement cohérente

## Branch Strategy

- **`main`** — branche stable et livrable. Merge `--no-ff` uniquement
- **Branches de fonctionnalité** — nommées `<slug-du-change>`, créées depuis `main`
- **Workflow** :
  1. Toujours créer une branche depuis `main` avant de coder (ou demander la permission à l'utilisateur)
  2. Commits atomiques pendant le développement (toujours demander avant de commit)
  3. Sync delta specs → main specs (`openspec-sync-specs`)
  4. Archiver le change (`openspec-archive-change`)
  5. Commit les specs + archive mises à jour
  6. Merge `--no-ff` dans `main`
