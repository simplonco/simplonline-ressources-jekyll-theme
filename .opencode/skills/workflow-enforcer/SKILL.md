---
name: workflow-enforcer
description: >-
  Utiliser SYSTÉMATIQUEMENT pour toute tâche de code dans ce projet simplonline-ressources-jekyll-theme.
  Ne JAMAIS travailler sans ce skill. Enforce le workflow OpenSpec :
  créer des branches depuis main, commits atomiques, sync specs, archive, merge --no-ff.
  Concerne toute modification de code, documentation, configuration ou contenu.
---

# Workflow Enforcer

Tu DOIS suivre le workflow décrit dans `AGENTS.md` pour chaque changement de code.

Règles impératives :

1. **Toujours créer une branche de feature** depuis `main` avant d'écrire la moindre ligne de code. Ne jamais travailler directement sur `main`.
2. **Commits atomiques** — un commit = une logique cohérente. Toujours demander la permission avant de commit.
3. **Respecter le format de commit** : `<type>: <sujet (impératif)>` — types: `feat`, `fix`, `docs`, `refactor`, `style`, `chore`.
4. **Suivre le cycle complet** pour chaque change : sync specs → archive → commit specs → merge `--no-ff` dans `main`.
5. **Ne pas écrire de code tant que** la branche n'est pas créée ET que l'utilisateur n'a pas validé le plan.

Si tu détectes qu'un travail est en cours sur `main` ou sans branche, **interromps-toi** et signale-le immédiatement.
