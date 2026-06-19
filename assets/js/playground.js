(function () {
  if (typeof CodeMirror === 'undefined') return;

  const playgrounds = document.querySelectorAll('.playground');
  if (!playgrounds.length) return;

  function updatePreview(container) {
    const html = container.CodeMirrorEditors[0].getValue();
    const css = container.CodeMirrorEditors[1].getValue();
    const js = container.CodeMirrorEditors[2].getValue();
    const iframe = container.querySelector('.playground-iframe');
    const srcdoc = '<!DOCTYPE html><html><head><style>' + css + '</style></head><body>' + html + '<script>' + js + '<\/script></body></html>';
    iframe.srcdoc = srcdoc;
  }

  function initResizer(container) {
    const resizer = container.querySelector('.playground-resizer');
    const panes = container.querySelector('.playground-panes');
    if (!resizer || !panes) return;

    let isDragging = false;

    function onMove(e) {
      if (!isDragging) return;
      const rect = panes.getBoundingClientRect();
      let pct = ((e.clientX - rect.left) / rect.width) * 100;
      pct = Math.max(15, Math.min(pct, 85));
      panes.style.gridTemplateColumns = pct + '% 1fr';
    }

    function onUp() {
      if (!isDragging) return;
      isDragging = false;
      resizer.classList.remove('is-dragging');
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    }

    resizer.addEventListener('mousedown', function (e) {
      e.preventDefault();
      isDragging = true;
      resizer.classList.add('is-dragging');
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
    });
  }

  function initLoading(container) {
    const iframe = container.querySelector('.playground-iframe');
    const loading = container.querySelector('.playground-loading');
    if (!iframe || !loading) return;

    let errorTimer;

    function clearTimer() { if (errorTimer) { clearTimeout(errorTimer); errorTimer = null; } }

    iframe.addEventListener('load', function () {
      clearTimer();
      loading.classList.add('is-hidden');
      loading.classList.remove('is-error');
    });

    function showError() {
      loading.textContent = 'Preview failed to load';
      loading.classList.add('is-error');
    }

    container._startPreviewTimer = function () {
      clearTimer();
      errorTimer = setTimeout(showError, 5000);
    };
  }

  function initPlayground(container) {
    const tabs = container.querySelectorAll('.playground-tab');
    const textareas = container.querySelectorAll('.playground-textarea');
    const codepenBtn = container.querySelector('.playground-btn-codepen');
    const editors = [];
    let previewTimer;

    initLoading(container);

    function schedulePreview() {
      clearTimeout(previewTimer);
      previewTimer = setTimeout(function () { updatePreview(container); }, 300);
    }

    textareas.forEach(function (ta) {
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

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        const panel = tab.getAttribute('data-panel');
        tabs.forEach(function (t) { t.classList.remove('is-active'); });
        tab.classList.add('is-active');

        const idx = ['html', 'css', 'js'].indexOf(panel);
        editors.forEach(function (cm, i) {
          const wrapper = cm.getWrapperElement();
          wrapper.style.display = i === idx ? '' : 'none';
          if (i === idx) {
            setTimeout(function () { cm.refresh(); }, 0);
          }
        });
      });
    });

    codepenBtn.addEventListener('click', function (e) {
      e.preventDefault();
      const form = document.createElement('form');
      form.action = 'https://codepen.io/pen/define/';
      form.method = 'POST';
      form.target = '_blank';
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = 'data';
      input.value = JSON.stringify({
        title: 'JS Playground',
        html: editors[0].getValue(),
        css: editors[1].getValue(),
        js: editors[2].getValue()
      });
      form.appendChild(input);
      document.body.appendChild(form);
      form.submit();
      form.remove();
    });

    const toggle = container.querySelector('.playground-toggle-preview');
    const preview = container.querySelector('.playground-preview');
    if (toggle && preview) {
      toggle.removeAttribute('hidden');
      toggle.addEventListener('click', function () {
        const collapsed = preview.classList.toggle('is-collapsed');
        toggle.textContent = collapsed ? '\u25BC View result' : '\u25B2 Hide result';
      });
    }

    editors.forEach(function (cm, i) {
      cm.getWrapperElement().style.display = i === 0 ? '' : 'none';
    });

    updatePreview(container);
    initResizer(container);
    if (container._startPreviewTimer) container._startPreviewTimer();
  }

  playgrounds.forEach(initPlayground);

  new MutationObserver(function () {
    const all = document.querySelectorAll('.playground');
    all.forEach(function (c) {
      if (c.CodeMirrorEditors) {
        c.CodeMirrorEditors.forEach(function (cm) { cm.refresh(); });
      }
    });
  }).observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
})();
