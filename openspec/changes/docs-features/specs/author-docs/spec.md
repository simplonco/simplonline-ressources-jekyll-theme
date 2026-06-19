## ADDED Requirements

### Requirement: Features documentation exists in English

The project SHALL provide a `features.md` file at the root documenting all author-facing features of the theme. It SHALL include:

- Front matter fields (title, description, show_toc, parent) with table of parameters
- Automatic breadcrumb behavior (parent field, 4-level traversal)
- Back link rendering below breadcrumbs
- Table of Contents with `show_toc: true`
- Syntax highlighting via Rouge (supported languages, dark mode support)
- YouTube video embedding (thumbnail on GitHub, iframe on GitHub Pages)
- Interactive playground inclusion (`{% include playground.html %}`) with all parameters
- Utility CSS classes (alert boxes, text alignment)

Each feature section SHALL include the author-facing syntax and a description of the rendered output.

#### Scenario: Author reads features.md
- **WHEN** a formateur opens `features.md`
- **THEN** they see documentation for all features they can use in their markdown content
- **AND** each section includes syntax examples and parameter descriptions

### Requirement: Features documentation exists in French

The project SHALL provide a `features-fr.md` file at the root that is a complete French translation of `features.md`, covering the same features with the same level of detail.

#### Scenario: Author reads features-fr.md
- **WHEN** a formateur opens `features-fr.md`
- **THEN** they see the same documentation in French as `features.md` provides in English
