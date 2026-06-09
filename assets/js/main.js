(function () {
  var toggle = document.getElementById('dark-mode-toggle');
  var stored = localStorage.getItem('theme');

  function getPreferredTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
  }

  function setButtonLabel(mode) {
    if (toggle) {
      toggle.textContent = mode === 'dark' ? '\u2600' : '\u263E';
      toggle.setAttribute('aria-label', mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    }
  }

  var current = stored || getPreferredTheme();
  applyTheme(current);
  setButtonLabel(current);

  if (toggle) {
    toggle.addEventListener('click', function () {
      var isDark = document.documentElement.classList.toggle('dark-mode');
      var mode = isDark ? 'dark' : 'light';
      localStorage.setItem('theme', mode);
      setButtonLabel(mode);
    });
  }

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
    if (!localStorage.getItem('theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
      setButtonLabel(e.matches ? 'dark' : 'light');
    }
  });
})();
