## Context

Le projet utilise un workflow OpenSpec documenté dans `AGENTS.md`, mais rien ne force son application. Les agents IA peuvent travailler directement sur `main`, sauter la création de change OpenSpec, ou oublier les étapes de sync/archive/merge.

## Goals / Non-Goals

**Goals:**
- Garantir que tout agent opencode charge `AGENTS.md` comme instructions système
- Fournir un skill opencode à déclenchement large qui rappelle le workflow
- Ajouter une pre-flight checklist visible dans AGENTS.md

**Non-Goals:**
- Git hooks (trop dépendant de la configuration utilisateur)
- Plugin opencode (trop complexe, nécessite TypeScript)
- Validation automatisée des commits (hors scope)

## Decisions

1. **`instructions: ["AGENTS.md"]`** dans `opencode.json` plutôt que `customInstructions` inline
   - Le fichier existe déjà et peut être maintenu séparément
   - opencode l'injecte dans le contexte système — le modèle ne peut pas l'ignorer
2. **Skill plutôt que plugin** pour Layer 4
   - Un skill est plus simple à créer (markdown), pas besoin de build TS
   - Description large pour matcher toute tâche dans ce projet
3. **Pre-flight checklist en tête** d'`AGENTS.md`
   - 4 points obligatoires : branche, slug, branche créée, change OpenSpec défini
   - Syntaxe explicite, pas d'ambiguïté

## Risks / Trade-offs

- [Skill non chargé] → Mitigation : `instructions` dans opencode.json reste la filet de sécurité
- [Agent ignore AGENTS.md] → Mitigation : impossible si `instructions` le charge dans le contexte système
