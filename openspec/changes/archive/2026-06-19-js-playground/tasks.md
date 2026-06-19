## 1. Include playground template

- [x] 1.1 Create `_includes/playground.html` with tabs (HTML/CSS/JS), textareas, iframe preview, and CodePen button
- [x] 1.2 Support Liquid parameters: `id`, `initial_html`, `initial_css`, `initial_js`

## 2. Playground JavaScript

- [x] 2.1 Create `assets/js/playground.js` with tab switching logic
- [x] 2.2 Implement debounced (300ms) live preview via iframe `srcdoc`
- [x] 2.3 Implement "Open in CodePen" — POST form to `codepen.io/pen/define/`
- [x] 2.4 Support multiple independent playground instances on the same page

## 3. Playground CSS

- [x] 3.1 Create `assets/css/playground.css` with grid layout (editor | preview)
- [x] 3.2 Style tabs, active state, and buttons
- [x] 3.3 Add dark mode support via `html.dark-mode`
- [x] 3.4 Add responsive layout (stacked on mobile <768px)

## 4. Integration

- [x] 4.1 Load `playground.css` and `playground.js` from `_includes/head.html`
- [x] 4.2 Create demo page `demo/js-playground.md` with working example and documentation

## 5. Syntax highlighting (CodeMirror)

- [x] 5.1 Add CodeMirror 5 CDN scripts and CSS to `_includes/head.html`
- [x] 5.2 Rewrite `playground.js` to create CodeMirror instances from textareas
- [x] 5.3 Show/hide CodeMirror wrappers on tab switch, refresh on show
- [x] 5.4 Add syntax colors (light + dark theme) via CodeMirror CSS overrides

## 6. Improvements

- [x] 5.1 Generate unique `id` automatically if not provided
- [x] 5.2 Add collapsed "View result" toggle on mobile to save vertical space
- [x] 5.3 Show a loading state or error if the iframe fails to load
- [x] 5.4 Allow resizing the editor/preview split
