## ADDED Requirements

### Requirement: Demo mockup exercise page exists

The project SHALL provide a demo exercise page at `demo/integration-maquette.md` that SHALL include:

- A mockup image for the learner to replicate
- Written instructions with steps
- Code snippets for the learner to use as a starting point
- A YouTube video resource link
- The solution inside a `<details>` element with the playground

#### Scenario: Learner opens the exercise page
- **WHEN** a learner navigates to `/demo/integration-maquette`
- **THEN** they see a mockup image, written instructions, code snippets, and a video resource
- **AND** the solution is hidden inside a `<details>` element

#### Scenario: Learner reveals the solution
- **WHEN** the learner clicks the `<details>` element
- **THEN** the playground loads and displays the solution code

### Requirement: Playground works inside collapsed details

The playground SHALL support being placed inside a `<details>` element. When the `<details>` is opened (toggle event), all CodeMirror instances inside SHALL be refreshed to ensure proper rendering.

#### Scenario: Details is opened after page load
- **WHEN** a user opens a `<details>` element containing a playground
- **THEN** each CodeMirror editor inside is refreshed
- **AND** the editors render correctly
