# Project Guide for AI Agents

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
