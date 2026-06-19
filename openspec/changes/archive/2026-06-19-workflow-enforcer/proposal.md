## Why

Les agents IA (opencode) ne suivent pas systématiquement le workflow OpenSpec (créer une branche, commits atomiques, sync specs, archive, merge --no-ff). Il faut des garde-fous techniques pour garantir l'application de ce workflow à chaque changement.

## What Changes

- Créer `opencode.json` avec le champ `instructions` pointant vers `AGENTS.md`
- Créer un skill opencode `workflow-enforcer` auto-déclenché sur toute tâche
- Renforcer `AGENTS.md` avec une pre-flight checklist obligatoire avant toute action

## Capabilities

### New Capabilities
- `workflow-enforcer`: ensemble de mécanismes (opencode.json, skill, AGENTS.md) garantissant l'application du workflow OpenSpec par tout agent travaillant sur ce projet

### Modified Capabilities

- *(aucune — change purement configuration/méta)*

## Impact

- `opencode.json` : nouveau fichier à la racine
- `.opencode/skills/workflow-enforcer/SKILL.md` : nouveau skill
- `AGENTS.md` : modifications (ajout pre-flight checklist)
- Aucun impact sur le thème, le rendu, ou les utilisateurs formateurs
