## Why

Les formateurs Wild Code School ont besoin d'un thème Jekyll moderne, open source, pour générer des ressources pédagogiques (exercices, fiches, pages statiques) à destination des apprenants Simplonline. Le thème existant (`workshops-jekyll-theme`) ne correspond plus aux besoins techniques et graphiques actuels : on repart de zéro avec une stack plus légère (CSS natif, pas de Sass) et le branding Wild Code School by Simplon.

## What Changes

- Création d'un thème Jekyll complet utilisable comme `remote_theme` via GitHub Pages
- Template unique (extensible) avec support du dark/light mode
- Branding Wild Code School by Simplon
- Documentation bilingue (FR/EN)
- CSS natif moderne (variables, nesting, `@layer`) — pas de Sass
- Structure standard : `_layouts/`, `_includes/`, `assets/css/`, assets/js/
- Gemspec + Gemfile pour compatibilité Jekyll
- Licence MIT — contribution open source

## Capabilities

### New Capabilities
- `jekyll-theme-core`: Structure de base du thème Jekyll (layouts, includes, assets, configuration)
- `dark-light-mode`: Support du mode sombre et clair avec détection automatique et bascule manuelle
- `bilingual-support`: Documentation et contenu bilingue français/anglais

### Modified Capabilities

- *Aucune — premier change, pas de specs existantes*

## Impact

- Création du dossier `_layouts/` (default.html)
- Création du dossier `_includes/` (header.html, footer.html, head.html)
- Création de `assets/css/style.css` (CSS natif, pas de Sass)
- Création de `assets/js/main.js`
- Création de `_config.yml`, `Gemfile`, `simplonline-ressources-jekyll-theme.gemspec`
- Création de `.gitignore`, `LICENSE`, `README.md`, `README-FR.md`, `CONTRIBUTING.md`
- Aucune dépendance externe additionnelle (Jekyll gem standard + jekyll-remote-theheme plugin)
