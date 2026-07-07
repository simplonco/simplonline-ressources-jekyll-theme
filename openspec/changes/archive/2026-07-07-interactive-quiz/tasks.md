## 1. Scaffolding

- [x] 1.1 Create `_includes/quiz.html` — template include avec `<script type="application/json">`
- [x] 1.2 Create `assets/js/quiz.js` — rendu client et validation
- [x] 1.3 Create `assets/css/quiz.css` — styles du quiz
- [x] 1.4 Add CSS and JS links in `_includes/head.html`

## 2. Single-answer Implementation

- [x] 2.1 Render `input[type=radio]` with `<fieldset>` + `<legend>` + `label[for]`
- [x] 2.2 Disable submit button until a radio is selected
- [x] 2.3 Validate on submit click: green for correct, red for incorrect + show correct answer
- [x] 2.4 Disable all inputs after validation

## 3. Multiple-answer Implementation

- [x] 3.1 Detect `Array.isArray(q.correct)` → render `input[type=checkbox]`
- [x] 3.2 Enable submit button when at least one checkbox is checked
- [x] 3.3 Validate all options: green for correct (checked or not), red for incorrect checked

## 4. Demo & Documentation

- [x] 4.1 Add single-answer quiz examples in `demo/README.md`
- [x] 4.2 Add multiple-answer quiz example in `demo/README.md`

## 5. Accessibility

- [x] 5.1 Use `<fieldset>` + `<legend>` for question grouping
- [x] 5.2 Link labels to inputs via `htmlFor` / `id`
- [x] 5.3 Validate on button click (not on `change`) for keyboard navigation
- [x] 5.4 Shared `name` across radios for arrow key navigation
