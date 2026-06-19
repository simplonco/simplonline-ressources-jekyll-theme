## ADDED Requirements

### Requirement: Project loads AGENTS.md as system instructions

The project MUST load `AGENTS.md` as system instructions for all opencode sessions. This is configured via the `instructions` field in `opencode.json`.

#### Scenario: AGENTS.md is loaded in system context
- **WHEN** opencode starts in this project
- **THEN** `AGENTS.md` content is included in the system instructions

### Requirement: Pre-flight checklist is enforced

`AGENTS.md` MUST contain a mandatory pre-flight checklist at the top, before any other content, with 4 steps:
1. Check current branch — block if `main`
2. Ensure change has a slug
3. Ensure feature branch exists
4. Ensure OpenSpec change is defined

#### Scenario: Agent reads pre-flight checklist
- **WHEN** an agent reads `AGENTS.md`
- **THEN** the pre-flight checklist is the first content visible

### Requirement: Workflow-enforcer skill is available

A skill named `workflow-enforcer` SHALL exist in `.opencode/skills/workflow-enforcer/SKILL.md` with a description broad enough to match all coding tasks in this project.

#### Scenario: Skill is loaded on any task
- **WHEN** an agent starts a coding task in this project
- **THEN** the `workflow-enforcer` skill description matches the task
- **AND** the skill body reminds the agent to follow the workflow
