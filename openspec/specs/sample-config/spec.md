## Purpose

This capability provides ready-to-use sample configuration files and comprehensive installation instructions for new projects using the theme.

## ADDED Requirements

### Requirement: Sample _config.yml exists

The project SHALL provide a `_config.sample.yml` file that contains a complete, commented `_config.yml` for a new site using this theme. It SHALL include `remote_theme`, `title`, `description`, `lang`, `show_toc`, `readme_index`, kramdown configuration, defaults, and plugins.

#### Scenario: User copies sample config
- **WHEN** a user copies `_config.sample.yml` to `_config.yml`
- **THEN** the site builds correctly with the theme

### Requirement: Sample Gemfile exists

The project SHALL provide a `Gemfile.sample` file with the required dependencies (`jekyll`, `jekyll-remote-theme`, `jekyll-readme-index`).

#### Scenario: User uses sample Gemfile
- **WHEN** a user copies `Gemfile.sample` to `Gemfile` and runs `bundle install`
- **THEN** the dependencies install correctly

### Requirement: Installation section is comprehensive

The `README.md` and `README-FR.md` SHALL include a step-by-step Installation section covering: Gemfile creation, config file creation, and running the server. The section SHALL reference the sample files.

#### Scenario: User follows installation steps
- **WHEN** a user reads the Installation section
- **THEN** they see clear numbered steps to set up their project
- **AND** they can copy the complete sample files
