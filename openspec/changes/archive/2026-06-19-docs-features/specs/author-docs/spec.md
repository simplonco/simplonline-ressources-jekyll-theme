## ADDED Requirements

### Requirement: README documents all author-facing features

The project SHALL include detailed documentation of all author-facing features in `README.md` (EN) and `README-FR.md` (FR). Each SHALL include:

- Front matter fields (title, description, show_toc, parent) with table of parameters
- Breadcrumb behavior (parent field, 4-level traversal)
- Back link rendering below breadcrumbs
- Table of Contents with `show_toc: true`
- Syntax highlighting via Rouge (supported languages, dark mode support)
- YouTube video embedding (thumbnail on GitHub, iframe on GitHub Pages)
- Interactive playground inclusion (`{% include playground.html %}`) with all parameters
- Utility CSS classes (alert boxes, text alignment)

Each feature SHALL include the author-facing syntax with examples and parameter tables where applicable.

#### Scenario: Author reads README.md
- **WHEN** a formateur opens `README.md`
- **THEN** they see documentation for all features they can use in their markdown content
- **AND** each section includes syntax examples and parameter descriptions

### Requirement: README-FR.md is the French translation

The project SHALL maintain `README-FR.md` as a complete French translation of `README.md`, covering the same features with the same level of detail.

#### Scenario: Author reads README-FR.md
- **WHEN** a formateur opens `README-FR.md`
- **THEN** they see the same documentation in French as `README.md` provides in English
