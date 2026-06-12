(function () {
  if (typeof CodeMirror === 'undefined') return;

  var playgrounds = document.querySelectorAll('.playground');
  if (!playgrounds.length) return;

  function updatePreview(container) {
    var html = container.CodeMirrorEditors[0].getValue();
    var css = container.CodeMirrorEditors[1].getValue();
    var js = container.CodeMirrorEditors[2].getValue();
    var iframe = container.querySelector('.playground-iframe');
    var srcdoc = '<!DOCTYPE html><html><head><style>' + css + '</style></head><body>' + html + '<script>' + js + '<\/script></body></html>';
    iframe.srcdoc = srcdoc;
  }

  function initPlayground(container) {
    var tabs = container.querySelectorAll('.playground-tab');
    var textareas = container.querySelectorAll('.playground-textarea');
    var codepenBtn = container.querySelector('.playground-btn-codepen');
    var editors = [];
    var previewTimer;

    function schedulePreview() {
      clearTimeout(previewTimer);
      previewTimer = setTimeout(function () { updatePreview(container); }, 300);
    }

    textareas.forEach(function (ta) {
      var mode;
      if (ta.classList.contains('html')) mode = 'htmlmixed';
      else if (ta.classList.contains('css')) mode = 'css';
      else if (ta.classList.contains('js')) mode = 'javascript';

      var cm = CodeMirror.fromTextArea(ta, {
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
        var panel = tab.getAttribute('data-panel');
        tabs.forEach(function (t) { t.classList.remove('is-active'); });
        tab.classList.add('is-active');

        var idx = ['html', 'css', 'js'].indexOf(panel);
        editors.forEach(function (cm, i) {
          var wrapper = cm.getWrapperElement();
          wrapper.style.display = i === idx ? '' : 'none';
          if (i === idx) {
            setTimeout(function () { cm.refresh(); }, 0);
          }
        });
      });
    });

    codepenBtn.addEventListener('click', function (e) {
      e.preventDefault();
      var form = document.createElement('form');
      form.action = 'https://codepen.io/pen/define/';
      form.method = 'POST';
      form.target = '_blank';
      var input = document.createElement('input');
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

    editors.forEach(function (cm, i) {
      cm.getWrapperElement().style.display = i === 0 ? '' : 'none';
    });

    updatePreview(container);
  }

  playgrounds.forEach(initPlayground);

  new MutationObserver(function () {
    var all = document.querySelectorAll('.playground');
    all.forEach(function (c) {
      if (c.CodeMirrorEditors) {
        c.CodeMirrorEditors.forEach(function (cm) { cm.refresh(); });
      }
    });
  }).observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
})();
