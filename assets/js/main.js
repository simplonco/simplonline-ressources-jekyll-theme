/**
 * Script principal pour le thème Jekyll
 * Regroupe toutes les fonctionnalités JavaScript du site
 */

// ============================================
// UTILITAIRES
// ============================================

const DOMUtils = {
  querySelectorAll(scope, selector) {
    return (scope || document).querySelectorAll(selector);
  },

  querySelector(scope, selector) {
    return (scope || document).querySelector(selector);
  },

  createElement(tag, options = {}) {
    const element = document.createElement(tag);

    if (options.className) {
      element.className = options.className;
    }

    if (options.id) {
      element.id = options.id;
    }

    if (options.textContent) {
      element.textContent = options.textContent;
    }

    if (options.html) {
      element.innerHTML = options.html;
    }

    if (options.attributes) {
      Object.entries(options.attributes).forEach(([key, value]) => {
        element.setAttribute(key, value);
      });
    }

    if (options.style) {
      Object.assign(element.style, options.style);
    }

    if (options.dataset) {
      Object.entries(options.dataset).forEach(([key, value]) => {
        element.dataset[key] = value;
      });
    }

    return element;
  },

  generateId(prefix = 'id') {
    return `${prefix}-${DOMUtils._counter++}`;
  },

  _counter: 0
};

// ============================================
// GESTION DU THÈME
// ============================================

const ThemeManager = {
  STORAGE_KEY: 'theme',
  DARK_CLASS: 'dark-mode',

  init() {
    const toggle = document.getElementById('dark-mode-toggle');
    if (!toggle) return;

    const stored = localStorage.getItem(ThemeManager.STORAGE_KEY);
    const current = stored || ThemeManager.getPreferredTheme();

    ThemeManager.applyTheme(current);
    ThemeManager.setButtonLabel(current, toggle);

    toggle.addEventListener('click', () => ThemeManager.handleToggle(toggle));

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(ThemeManager.STORAGE_KEY)) {
        const theme = e.matches ? 'dark' : 'light';
        ThemeManager.applyTheme(theme);
        ThemeManager.setButtonLabel(theme, toggle);
      }
    });
  },

  getPreferredTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  },

  applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.classList.add(ThemeManager.DARK_CLASS);
    } else {
      document.documentElement.classList.remove(ThemeManager.DARK_CLASS);
    }
  },

  setButtonLabel(mode, toggle) {
    if (toggle) {
      toggle.textContent = mode === 'dark' ? '\u2600' : '\u263E';
      toggle.setAttribute('aria-label', mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    }
  },

  handleToggle(toggle) {
    const isDark = document.documentElement.classList.toggle(ThemeManager.DARK_CLASS);
    const mode = isDark ? 'dark' : 'light';
    localStorage.setItem(ThemeManager.STORAGE_KEY, mode);
    ThemeManager.setButtonLabel(mode, toggle);
  }
};

// ============================================
// GÉNÉRATION DE LA TABLE DES MATIÈRES
// ============================================

const TOCGenerator = {
  init() {
    const toc = document.getElementById('toc-list');
    if (!toc) return;

    const content = document.getElementById('main-content');
    if (!content) return;

    const headings = content.querySelectorAll('h2, h3, h4, h5, h6');
    const visible = [];

    headings.forEach((heading) => {
      if (!heading.closest('.toc')) {
        visible.push(heading);
      }
    });

    if (visible.length < 2) {
      const nav = toc.closest('.toc');
      if (nav) nav.style.display = 'none';
      return;
    }

    visible.forEach((heading) => {
      if (!heading.id) {
        // Générer un ID unique basé sur le texte du heading
        let id = heading.textContent.trim().toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '');

        // S'assurer que l'ID est unique
        let counter = 1;
        while (document.getElementById(id)) {
          id = `${id}-${counter}`;
          counter++;
        }

        heading.id = id;
      }

      const li = DOMUtils.createElement('li', {
        className: `toc-item h${heading.tagName[1]}`
      });

      const a = DOMUtils.createElement('a', {
        attributes: { href: `#${heading.id}` },
        textContent: heading.textContent
      });

      li.appendChild(a);
      toc.appendChild(li);
    });
  }
};

// ============================================
// COLORATION SYNTAXIQUE
// ============================================

const SyntaxHighlighter = {
  init() {
    const content = document.getElementById('main-content');
    if (!content) return;

    const highlights = content.querySelectorAll('.highlight');

    highlights.forEach((highlight) => {
      const parentHighlighterRouge = highlight.closest('.highlighter-rouge');
      if (parentHighlighterRouge && parentHighlighterRouge.className.includes('language-')) {
        let lang = parentHighlighterRouge.className.replace(/^language-/, '');
        lang = lang.replace('highlighter-rouge', '').trim();
        highlight.setAttribute('data-lang', lang);
      }
    });
  }
};

// ============================================
// INTÉGRATION YOUTUBE
// ============================================

const YouTubeEmbedder = {
  YOUTUBE_PATTERN: /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/,

  init() {
    const content = document.getElementById('main-content');
    if (!content) return;

    const youtubeLinks = content.querySelectorAll('a[href*="youtube.com/watch"], a[href*="youtu.be/"]');

    youtubeLinks.forEach((link) => {
      if (link.closest('pre') || link.closest('code')) return;

      const match = link.href.match(YouTubeEmbedder.YOUTUBE_PATTERN);
      if (!match) return;

      const videoId = match[1];
      const wrapper = DOMUtils.createElement('div', {
        className: 'youtube-embed'
      });

      const iframe = DOMUtils.createElement('iframe', {
        attributes: {
          allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
          allowFullscreen: 'true',
          width: '560',
          height: '315',
          frameborder: '0',
          src: `https://www.youtube-nocookie.com/embed/${videoId}`,
          title: link.querySelector('img') ? (link.querySelector('img').alt || 'YouTube video') : 'YouTube video',
        },
      });

      wrapper.appendChild(iframe);
      link.parentNode.replaceChild(wrapper, link);
    });
  }
};

// ============================================
// GESTION DES QUIZ
// ============================================

const Quiz = {
  initAll() {
    const containers = document.querySelectorAll('.quiz');
    if (!containers.length) return;

    containers.forEach(Quiz.initQuiz);
  },

  initQuiz(container) {
    const script = container.querySelector('script.quiz-data');
    if (!script) return;

    let questions;
    try {
      questions = JSON.parse(script.textContent);
    } catch (e) {
      return;
    }

    if (!Array.isArray(questions) || !questions.length) return;

    script.remove();

    questions.forEach((q, qi) => Quiz.createQuestion(container, q, qi));
  },

  createQuestion(container, q, qi) {
    if (!q.question || !Array.isArray(q.options) || q.options.length < 2) return;

    const isMultiple = Array.isArray(q.correct);
    if (!isMultiple && typeof q.correct !== 'number') return;

    const correctValues = isMultiple ? q.correct : [q.correct];

    const qEl = DOMUtils.createElement('fieldset', {
      className: 'quiz-question'
    });

    const qTitle = DOMUtils.createElement('legend', {
      className: 'quiz-question-text',
      textContent: q.question
    });
    qEl.appendChild(qTitle);

    const hint = DOMUtils.createElement('span', {
      className: 'quiz-hint',
      textContent: isMultiple ? 'Plusieurs réponses possibles' : 'Une seule réponse'
    });
    qEl.appendChild(hint);

    const options = DOMUtils.createElement('div', {
      className: 'quiz-options'
    });

    const groupName = DOMUtils.generateId('quiz-q');

    q.options.forEach((opt, oi) => Quiz.createOption(options, opt, oi, groupName, isMultiple, correctValues, qEl));

    qEl.appendChild(options);

    const submitBtn = DOMUtils.createElement('button', {
      type: 'button',
      className: 'quiz-submit',
      textContent: 'Valider'
    });
    submitBtn.disabled = true;
    qEl.appendChild(submitBtn);

    submitBtn.addEventListener('click', () => Quiz.validateQuestion(qEl, options, correctValues, isMultiple, submitBtn));

    container.appendChild(qEl);
  },

  createOption(options, opt, oi, groupName, isMultiple, correctValues, qEl) {
    const inputId = DOMUtils.generateId('quiz-r');

    const label = DOMUtils.createElement('label', {
      className: 'quiz-option',
      dataset: { optionIndex: oi },
      attributes: { for: inputId }
    });

    const input = DOMUtils.createElement('input', {
      attributes: { 
        type: isMultiple ? 'checkbox' : 'radio',
        name: groupName,
        value: oi 
      },
      id: inputId
    });

    const span = DOMUtils.createElement('span', {
      textContent: opt
    });

    label.appendChild(input);
    label.appendChild(span);
    options.appendChild(label);

    input.addEventListener('change', () => {
      const qEl = input.closest('.quiz-question');
      if (qEl._answered) return;

      const submitBtn = qEl.querySelector('.quiz-submit');
      if (isMultiple) {
        submitBtn.disabled = !options.querySelector('input:checked');
      } else {
        submitBtn.disabled = false;
      }
    });
  },

  validateQuestion(qEl, options, correctValues, isMultiple, submitBtn) {
    if (qEl._answered) return;

    const checked = options.querySelector('input:checked');
    if (!checked) return;

    qEl._answered = true;
    submitBtn.disabled = true;

    const allInputs = options.querySelectorAll('input');
    allInputs.forEach((input) => {
      input.disabled = true;
    });

    if (isMultiple) {
      Quiz.validateMultipleQuestion(options, correctValues);
    } else {
      Quiz.validateSingleQuestion(options, checked, correctValues);
    }
  },

  validateMultipleQuestion(options, correctValues) {
    const allLabels = options.querySelectorAll('.quiz-option');

    allLabels.forEach((label) => {
      const oi = parseInt(label.dataset.optionIndex);
      const input = document.getElementById(label.htmlFor);
      const isInCorrect = correctValues.indexOf(oi) !== -1;

      if (input.checked && isInCorrect) {
        label.classList.add('is-correct');
      } else if (input.checked && !isInCorrect) {
        label.classList.add('is-incorrect');
      } else if (!input.checked && isInCorrect) {
        label.classList.add('is-correct');
      }
    });
  },

  validateSingleQuestion(options, checked, correctValues) {
    const selectedIndex = parseInt(checked.value);
    const selectedLabel = options.querySelector(`[data-option-index="${selectedIndex}"]`);
    const isCorrect = selectedIndex === correctValues[0];

    selectedLabel.classList.add(isCorrect ? 'is-correct' : 'is-incorrect');

    if (!isCorrect) {
      const correctLabel = options.querySelector(`[data-option-index="${correctValues[0]}"]`);
      if (correctLabel) correctLabel.classList.add('is-correct');
    }
  }
};

// ============================================
// GESTION DES PLAYGROUNDS
// ============================================

// Injecté tel quel dans l'iframe (via toString) : doit rester autonome
function playgroundConsoleShim() {
  var MAX_POSTS = 500;
  var posts = 0;
  var levels = ['log', 'info', 'warn', 'error', 'debug'];
  var native = {};

  levels.forEach(function (level) {
    native[level] = console[level] ? console[level].bind(console) : function () {};
  });

  function formatValue(value, depth, seen) {
    if (depth > 4) return '…';
    if (value === null) return 'null';
    if (value === undefined) return 'undefined';
    var type = typeof value;
    if (type === 'string') return value;
    if (type === 'number' || type === 'boolean' || type === 'bigint') return String(value);
    if (type === 'symbol') return value.toString();
    if (type === 'function') {
      return '\u0192 ' + (value.name || 'anonymous') + '()';
    }
    if (value instanceof Error) {
      return value.stack ? String(value.stack).split('\n')[0] : value.name + ': ' + value.message;
    }
    if (typeof Node !== 'undefined' && value instanceof Node) {
      if (value.nodeType === 1) {
        var cls = typeof value.className === 'string' && value.className.trim()
          ? '.' + value.className.trim().split(/\s+/).join('.') : '';
        return '<' + value.tagName.toLowerCase() + (value.id ? '#' + value.id : '') + cls + '>';
      }
      return '#' + String(value.nodeName || value.nodeType);
    }
    if (seen.indexOf(value) !== -1) return '[Circular]';
    seen = seen.concat([value]);
    try {
      if (Array.isArray(value)) {
        var items = value.slice(0, 100).map(function (item) {
          return formatValue(item, depth + 1, seen);
        });
        return '[' + items.join(', ') + (value.length > 100 ? ', …' : '') + ']';
      }
      if (value instanceof Date) return value.toISOString();
      if (value instanceof RegExp) return String(value);
      var keys = Object.keys(value);
      var parts = keys.slice(0, 50).map(function (key) {
        return key + ': ' + formatValue(value[key], depth + 1, seen);
      });
      var prefix = value.constructor && value.constructor.name && value.constructor.name !== 'Object'
        ? value.constructor.name + ' ' : '';
      return prefix + '{' + parts.join(', ') + (keys.length > 50 ? ', …' : '') + '}';
    } catch (err) {
      return '[unserializable]';
    }
  }

  function formatArgs(args) {
    return Array.prototype.map.call(args, function (arg) {
      return formatValue(arg, 0, []);
    }).join(' ');
  }

  function send(level, text) {
    if (posts >= MAX_POSTS) return;
    posts++;
    try {
      window.parent.postMessage({ source: 'playground-console', level: level, text: text }, '*');
    } catch (err) {}
    if (posts === MAX_POSTS) {
      try {
        window.parent.postMessage({
          source: 'playground-console',
          level: 'warn',
          text: 'Console output truncated (' + MAX_POSTS + ' messages max)'
        }, '*');
      } catch (err) {}
    }
  }

  levels.forEach(function (level) {
    console[level] = function () {
      native[level].apply(console, arguments);
      send(level, formatArgs(arguments));
    };
  });

  window.onerror = function (message, source, lineno, colno, error) {
    var text = error && error.stack
      ? String(error.stack).split('\n')[0]
      : 'Uncaught ' + message;
    if (lineno) text += ' (line ' + lineno + ')';
    send('error', text);
  };

  window.addEventListener('unhandledrejection', function (event) {
    var reason = event.reason;
    var head = reason instanceof Error && reason.stack ? String(reason.stack).split('\n')[0] : formatValue(reason, 0, []);
    send('error', 'Uncaught (in promise) ' + head);
  });
}

const PlaygroundConsole = {
  MAX_ENTRIES: 200,
  _listenerReady: false,

  ensureListener() {
    if (PlaygroundConsole._listenerReady) return;
    PlaygroundConsole._listenerReady = true;

    window.addEventListener('message', (event) => {
      const data = event.data;
      if (!data || data.source !== 'playground-console') return;

      const container = PlaygroundConsole._containerForSource(event.source);
      if (!container) return;

      PlaygroundConsole.append(container, data.level, String(data.text));
    });
  },

  _containerForSource(source) {
    for (const container of document.querySelectorAll('.playground')) {
      const iframe = container.querySelector('.playground-iframe');
      if (iframe && iframe.contentWindow === source) return container;
    }
    return null;
  },

  clear(container) {
    container._consoleCount = 0;
    const entries = container.querySelector('.playground-console-entries');
    if (entries) entries.textContent = '';
    PlaygroundConsole._updateBadge(container);
  },

  append(container, level, text) {
    const entries = container.querySelector('.playground-console-entries');
    if (!entries) return;

    const nearBottom = entries.scrollHeight - entries.scrollTop - entries.clientHeight < 30;

    const entry = document.createElement('div');
    entry.className = `playground-console-entry playground-console-entry--${level}`;
    entry.textContent = text;
    entries.appendChild(entry);

    while (entries.children.length > PlaygroundConsole.MAX_ENTRIES) {
      entries.removeChild(entries.firstChild);
    }

    container._consoleCount = Math.min((container._consoleCount || 0) + 1, PlaygroundConsole.MAX_ENTRIES);

    if (nearBottom) entries.scrollTop = entries.scrollHeight;
    PlaygroundConsole._updateBadge(container);
  },

  handleToggle(container) {
    const drawer = container.querySelector('.playground-console');
    const btn = container.querySelector('.playground-btn-console');
    if (!drawer || !btn) return;

    const open = drawer.classList.toggle('is-open');
    btn.classList.toggle('is-open', open);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');

    if (open) {
      const entries = container.querySelector('.playground-console-entries');
      if (entries) entries.scrollTop = entries.scrollHeight;
    }
    PlaygroundConsole._updateBadge(container);
  },

  _updateBadge(container) {
    const badge = container.querySelector('.playground-console-badge');
    if (!badge) return;

    const drawerOpen = container.querySelector('.playground-console').classList.contains('is-open');
    const count = container._consoleCount || 0;

    if (!drawerOpen && count > 0) {
      badge.hidden = false;
      badge.textContent = count > PlaygroundConsole.MAX_ENTRIES ? `${PlaygroundConsole.MAX_ENTRIES}+` : count;
    } else {
      badge.hidden = true;
    }
  }
};

const Playground = {
  initAll() {
    const playgrounds = document.querySelectorAll('.playground');
    if (!playgrounds.length) return;

    // Attendre que CodeMirror soit chargé si ce n'est pas déjà le cas
    if (typeof CodeMirror === 'undefined') {
      // Si CodeMirror n'est pas chargé, attendre le signal
      const checkCodeMirror = setInterval(() => {
        if (typeof CodeMirror !== 'undefined') {
          clearInterval(checkCodeMirror);
          Playground._initPlaygrounds(playgrounds);
        }
      }, 100);

      // Timeout de sécurité
      setTimeout(() => {
        clearInterval(checkCodeMirror);
        
      }, 5000);
      return;
    }

    Playground._initPlaygrounds(playgrounds);
  },

  _initPlaygrounds(playgrounds) {
    if (!playgrounds.length || typeof CodeMirror === 'undefined') return;

    PlaygroundConsole.ensureListener();

    playgrounds.forEach(Playground.initPlayground);

    new MutationObserver(() => {
      const all = document.querySelectorAll('.playground');
      all.forEach((container) => {
        if (container.CodeMirrorEditors) {
          container.CodeMirrorEditors.forEach((cm) => cm.refresh());
        }
      });
    }).observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  },

  initPlayground(container) {
    const tabs = container.querySelectorAll('.playground-tab');
    const textareas = container.querySelectorAll('.playground-textarea');
    const codepenBtn = container.querySelector('.playground-btn-codepen');
    const editors = [];
    let previewTimer;

    Playground.initLoading(container);

    const schedulePreview = () => {
      clearTimeout(previewTimer);
      previewTimer = setTimeout(() => Playground.updatePreview(container), 300);
    };

    textareas.forEach((ta) => {
      let mode;
      if (ta.classList.contains('html')) mode = 'htmlmixed';
      else if (ta.classList.contains('css')) mode = 'css';
      else if (ta.classList.contains('js')) mode = 'javascript';

      const cm = CodeMirror.fromTextArea(ta, {
        mode: mode,
        lineNumbers: false,
        viewportMargin: Infinity,
        indentUnit: 2,
        tabSize: 2
      });

      cm.on('change', schedulePreview);
      editors.push(cm);
    });

    container.CodeMirrorEditors = editors;

    Playground.initDetails(container);

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => Playground.handleTabClick(tab, editors));
    });

    if (codepenBtn) {
      codepenBtn.addEventListener('click', (e) => Playground.handleCodePenClick(e, container, editors));
    }

    const toggle = container.querySelector('.playground-toggle-preview');
    const preview = container.querySelector('.playground-preview');
    if (toggle && preview) {
      toggle.removeAttribute('hidden');
      toggle.addEventListener('click', () => Playground.handlePreviewToggle(toggle, preview));
    }

    const consoleBtn = container.querySelector('.playground-btn-console');
    if (consoleBtn) {
      consoleBtn.addEventListener('click', () => PlaygroundConsole.handleToggle(container));
    }

    const panels = ['html', 'css', 'js'];
    const activeTab = container.querySelector('.playground-tab.is-active');
    let activeIdx = panels.indexOf(activeTab ? activeTab.getAttribute('data-panel') : 'html');
    if (activeIdx < 0) activeIdx = 0;

    editors.forEach((cm, i) => {
      cm.getWrapperElement().style.display = i === activeIdx ? '' : 'none';
    });

    Playground.updatePreview(container);
    Playground.initResizer(container);
    if (container._startPreviewTimer) container._startPreviewTimer();
  },

  updatePreview(container) {
    const html = container.CodeMirrorEditors[0].getValue();
    const css = container.CodeMirrorEditors[1].getValue();
    const js = container.CodeMirrorEditors[2].getValue();
    const iframe = container.querySelector('.playground-iframe');

    PlaygroundConsole.clear(container);

    const shim = `<script>(${playgroundConsoleShim.toString()})();<\/script>`;
    const srcdoc = `<!DOCTYPE html><html><head><style>${css}</style></head><body>${html}${shim}<script>${js}<\/script></body></html>`;
    iframe.srcdoc = srcdoc;
  },

  initResizer(container) {
    const resizer = container.querySelector('.playground-resizer');
    const panes = container.querySelector('.playground-panes');
    if (!resizer || !panes) return;

    let isDragging = false;

    const onMove = (e) => {
      if (!isDragging) return;
      const rect = panes.getBoundingClientRect();
      let pct = ((e.clientX - rect.left) / rect.width) * 100;
      pct = Math.max(15, Math.min(pct, 85));
      panes.style.gridTemplateColumns = `${pct}% 1fr`;
    };

    const onUp = () => {
      if (!isDragging) return;
      isDragging = false;
      resizer.classList.remove('is-dragging');
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };

    resizer.addEventListener('mousedown', (e) => {
      e.preventDefault();
      isDragging = true;
      resizer.classList.add('is-dragging');
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
    });
  },

  initLoading(container) {
    const iframe = container.querySelector('.playground-iframe');
    const loading = container.querySelector('.playground-loading');
    if (!iframe || !loading) return;

    let errorTimer;

    const clearTimer = () => {
      if (errorTimer) {
        clearTimeout(errorTimer);
        errorTimer = null;
      }
    };

    iframe.addEventListener('load', () => {
      clearTimer();
      loading.classList.add('is-hidden');
      loading.classList.remove('is-error');
    });

    const showError = () => {
      loading.textContent = 'Preview failed to load';
      loading.classList.add('is-error');
    };

    container._startPreviewTimer = () => {
      clearTimer();
      errorTimer = setTimeout(showError, 5000);
    };
  },

  initDetails(container) {
    const details = container.closest('details');
    if (!details) return;
    const editors = container.CodeMirrorEditors;
    if (!editors) return;

    details.addEventListener('toggle', () => {
      if (details.open) {
        editors.forEach((cm) => setTimeout(() => cm.refresh(), 0));
      }
    });
  },

  handleTabClick(tab, editors) {
    const panel = tab.getAttribute('data-panel');
    const tabs = tab.closest('.playground-tabs').querySelectorAll('.playground-tab');

    tabs.forEach((t) => t.classList.remove('is-active'));
    tab.classList.add('is-active');

    const idx = ['html', 'css', 'js'].indexOf(panel);
    editors.forEach((cm, i) => {
      const wrapper = cm.getWrapperElement();
      wrapper.style.display = i === idx ? '' : 'none';
      if (i === idx) {
        setTimeout(() => cm.refresh(), 0);
      }
    });
  },

  handleCodePenClick(e, container, editors) {
    e.preventDefault();
    const form = DOMUtils.createElement('form', {
      attributes: {
        action: 'https://codepen.io/pen/define/',
        method: 'POST',
        target: '_blank'
      }
    });

    const input = DOMUtils.createElement('input', {
      attributes: {
        type: 'hidden',
        name: 'data',
        value: JSON.stringify({
          title: 'JS Playground',
          html: editors[0].getValue(),
          css: editors[1].getValue(),
          js: editors[2].getValue()
        })
      }
    });

    form.appendChild(input);
    document.body.appendChild(form);
    form.submit();
    form.remove();
  },

  handlePreviewToggle(toggle, preview) {
    const collapsed = preview.classList.toggle('is-collapsed');
    toggle.textContent = collapsed ? '\u25BC View result' : '\u25B2 Hide result';
  }
};

// ============================================
// STEPPER
// ============================================

const Stepper = {
  initAll() {
    const steppers = DOMUtils.querySelectorAll(document, '.stepper');
    steppers.forEach((stepper) => Stepper.init(stepper));
  },

  init(stepper) {
    const details = Array.from(stepper.querySelectorAll('details'));
    if (!details.length) return;

    const totalSteps = details.length;
    let currentIndex = details.findIndex((d) => d.open);
    if (currentIndex === -1) currentIndex = 0;

    const updateUI = () => {
      details.forEach((detail, index) => {
        const prevBtn = detail.querySelector('.stepper-prev');
        const nextBtn = detail.querySelector('.stepper-next');
        const progress = detail.querySelector('.stepper-progress');

        if (progress) {
          progress.textContent = `Étape ${index + 1} / ${totalSteps}`;
        }
        if (prevBtn) {
          prevBtn.disabled = index === 0;
        }
        if (nextBtn) {
          nextBtn.disabled = index === totalSteps - 1;
        }
      });
    };

    const openStep = (index) => {
      details.forEach((d, i) => {
        d.open = i === index;
      });
      currentIndex = index;
      updateUI();
    };

    details.forEach((detail, index) => {
      const prevBtn = detail.querySelector('.stepper-prev');
      const nextBtn = detail.querySelector('.stepper-next');

      if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          if (currentIndex > 0) openStep(currentIndex - 1);
        });
      }

      if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          if (currentIndex < totalSteps - 1) openStep(currentIndex + 1);
        });
      }

      detail.addEventListener('toggle', () => {
        if (detail.open && index !== currentIndex) {
          openStep(index);
        }
      });
    });

    openStep(currentIndex);
  }
};


// ============================================
// PLAYGROUND SQL (sql.js + CodeMirror)
// ============================================

const SqlPlayground = {
  _sqlReady: null,
  _cmInstances: new Map(),

  _loadSqlJs() {
    if (this._sqlReady) return this._sqlReady;
    this._sqlReady = new Promise(async (resolve, reject) => {
      try {
        if (typeof initSqlJs === 'undefined') {
          const script = document.createElement('script');
          script.src = document.currentScript
            ? document.currentScript.src.replace(/main\.js.*$/, 'sql-wasm/sql-wasm.js')
            : (function () {
                const scripts = document.querySelectorAll('script[src*="main.js"]');
                const src = scripts.length ? scripts[scripts.length - 1].src : '';
                return src.replace(/main\.js.*$/, 'sql-wasm/sql-wasm.js');
              })();
          script.onload = () => this._doInit(resolve, reject);
          script.onerror = () => reject(new Error('Failed to load sql.js'));
          document.head.appendChild(script);
        } else {
          this._doInit(resolve, reject);
        }
      } catch (e) {
        reject(e);
      }
    });
    return this._sqlReady;
  },

  _doInit(resolve, reject) {
    try {
      const wasmPath = (function () {
        const scripts = document.querySelectorAll('script[src*="main.js"]');
        const src = scripts.length ? scripts[scripts.length - 1].src : '';
        return src.replace(/main\.js.*$/, 'sql-wasm/sql-wasm.wasm');
      })();
      initSqlJs({ locateFile: (file) => wasmPath.replace('sql-wasm.wasm', file) })
        .then(resolve)
        .catch(reject);
    } catch (e) {
      reject(e);
    }
  },

  _escapeHtml(str) {
    if (str === null || str === undefined) return '';
    const div = document.createElement('div');
    div.textContent = String(str);
    return div.innerHTML;
  },

  _formatCell(value) {
    if (value === null || value === undefined) return '<span class="sql-null">NULL</span>';
    return this._escapeHtml(value);
  },

  _renderResults(container, results) {
    if (!results || !results.values || results.values.length === 0) {
      container.innerHTML = '<div class="sql-empty">Aucun résultat</div>';
      return;
    }

    const columns = results.columns;
    const rows = results.values;

    let html = '<table><thead><tr>';
    for (const col of columns) {
      html += '<th>' + this._escapeHtml(col) + '</th>';
    }
    html += '</tr></thead><tbody>';
    for (const row of rows) {
      html += '<tr>';
      for (const cell of row) {
        html += '<td>' + this._formatCell(cell) + '</td>';
      }
      html += '</tr>';
    }
    html += '</tbody></table>';
    container.innerHTML = html;
  },

  _renderInfo(container, message) {
    container.innerHTML = '<div class="sql-info">' + this._escapeHtml(message) + '</div>';
  },

  _renderError(container, message) {
    container.innerHTML = '<div class="sql-playground-error">' + this._escapeHtml(message) + '</div>';
  },

  _renderStatus(statusEl, text, isLoading) {
    if (text) {
      statusEl.textContent = text;
      statusEl.className = 'sql-playground-status' + (isLoading ? ' is-loading' : '');
    } else {
      statusEl.textContent = '';
      statusEl.className = 'sql-playground-status';
    }
  },

  async _execute(pgEl) {
    const runBtn = pgEl.querySelector('.sql-playground-run');
    const statusEl = pgEl.querySelector('.sql-playground-status');
    const resultsEl = pgEl.querySelector('.sql-playground-results');
    const textarea = pgEl.querySelector('.sql-playground-textarea');

    const schema = textarea.dataset.schema || '';
    const cm = this._cmInstances.get(pgEl);
    const query = cm ? cm.getValue().trim() : textarea.value.trim();

    if (!schema && !query) {
      this._renderError(resultsEl, 'Aucune requête à exécuter');
      return;
    }

    runBtn.disabled = true;
    const originalText = runBtn.textContent;
    runBtn.textContent = '⏳ Chargement…';
    this._renderStatus(statusEl, 'Chargement de sql.js…', true);
    resultsEl.innerHTML = '';

    try {
      await this._loadSqlJs();
    } catch (e) {
      this._renderError(resultsEl, 'Erreur de chargement de sql.js : ' + e.message);
      runBtn.disabled = false;
      runBtn.textContent = originalText;
      this._renderStatus(statusEl, '', false);
      return;
    }

    runBtn.textContent = '⏳ Exécution…';
    this._renderStatus(statusEl, 'Exécution…', true);

    try {
      const SQL = await this._sqlReady;
      const db = new SQL.Database();

      // Execute schema
      if (schema) {
        try {
          db.run(schema);
        } catch (e) {
          this._renderError(resultsEl, 'Erreur dans le schéma : ' + e.message);
          db.close();
          runBtn.disabled = false;
          runBtn.textContent = originalText;
          this._renderStatus(statusEl, '', false);
          return;
        }
      }

      // Execute query
      if (query) {
        try {
          const results = db.exec(query);
          if (results.length > 0) {
            this._renderResults(resultsEl, results[0]);
          } else {
            // Non-SELECT query
            const changes = db.getRowsModified();
            this._renderInfo(resultsEl, changes + ' ligne(s) affectée(s)');
          }
        } catch (e) {
          this._renderError(resultsEl, 'Erreur SQL : ' + e.message);
        }
      } else {
        this._renderInfo(resultsEl, 'Schéma chargé. Entrez une requête pour voir les résultats.');
      }

      db.close();
    } catch (e) {
      this._renderError(resultsEl, 'Erreur inattendue : ' + e.message);
    }

    runBtn.disabled = false;
    runBtn.textContent = originalText;
    this._renderStatus(statusEl, '', false);
  },

  _initInstance(pgEl) {
    const textarea = pgEl.querySelector('.sql-playground-textarea');
    const runBtn = pgEl.querySelector('.sql-playground-run');
    const resetBtn = pgEl.querySelector('.sql-playground-reset');
    const initialQuery = textarea.dataset.initialQuery || '';

    // Initialize CodeMirror if available
    if (typeof CodeMirror !== 'undefined') {
      const cm = CodeMirror.fromTextArea(textarea, {
        mode: 'text/x-sql',
        lineNumbers: true,
        lineWrapping: true,
        matchBrackets: true,
        indentWithTabs: false,
        tabSize: 2,
        viewportMargin: Infinity
      });
      this._cmInstances.set(pgEl, cm);
    }

    runBtn.addEventListener('click', () => this._execute(pgEl));

    resetBtn.addEventListener('click', () => {
      if (typeof CodeMirror !== 'undefined') {
        const cm = this._cmInstances.get(pgEl);
        if (cm) {
          cm.setValue(initialQuery);
        }
      } else {
        textarea.value = initialQuery;
      }
      const resultsEl = pgEl.querySelector('.sql-playground-results');
      resultsEl.innerHTML = '';
      this._renderStatus(pgEl.querySelector('.sql-playground-status'), '', false);
    });
  },

  initAll() {
    const playgrounds = DOMUtils.querySelectorAll(document, '.sql-playground');
    for (const pg of playgrounds) {
      this._initInstance(pg);
    }
  }
};


// ============================================
// INITIALISATION
// ============================================

// Initialisation automatique au chargement du DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeAll);
} else {
  // DOM est déjà prêt
  initializeAll();
}

function initializeAll() {
  // Ces fonctionnalités ne dépendent pas de CodeMirror
  ThemeManager.init();
  TOCGenerator.init();
  SyntaxHighlighter.init();
  YouTubeEmbedder.init();
  Quiz.initAll();
  Stepper.initAll();

  // Playground dépend de CodeMirror, donc on l'initialise séparément
  Playground.initAll();

  // SQL Playground (lazy-loads sql.js uniquement si présent)
  SqlPlayground.initAll();
}

