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

(function () {
  var toc = document.getElementById('toc-list');
  if (!toc) return;
  var content = document.getElementById('main-content');
  if (!content) return;
  var headings = content.querySelectorAll('h2, h3, h4, h5, h6');
  var visible = [];
  for (var hi = 0; hi < headings.length; hi++) {
    if (headings[hi].closest('.toc')) continue;
    visible.push(headings[hi]);
  }
  if (visible.length < 2) {
    var nav = toc.closest('.toc');
    if (nav) nav.style.display = 'none';
    return;
  }
  for (var i = 0; i < visible.length; i++) {
    var h = visible[i];
    if (!h.id) {
      h.id = h.textContent.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    }
    var li = document.createElement('li');
    li.className = 'toc-item h' + h.tagName[1];
    var a = document.createElement('a');
    a.href = '#' + h.id;
    a.textContent = h.textContent;
    li.appendChild(a);
    toc.appendChild(li);
  }
})();

(function () {
  var content = document.getElementById('main-content');
  if (!content) return;
  var highlights = document.querySelectorAll('.highlight');
  for (var hi = 0; hi < highlights.length; hi++) {
    var code = highlights[hi].querySelector('code');
    if (code && code.className) {
      var lang = code.className.replace(/^language-/, '');
      if (lang) highlights[hi].setAttribute('data-lang', lang);
    }
  }
})();

(function () {
  var content = document.getElementById('main-content');
  if (!content) return;
  var youtubeLinks = content.querySelectorAll('a[href*="youtube.com/watch"], a[href*="youtu.be/"]');
  for (var i = 0; i < youtubeLinks.length; i++) {
    var link = youtubeLinks[i];
    if (link.closest('pre') || link.closest('code')) continue;
    var match = link.href.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    if (!match) continue;
    var videoId = match[1];
    var wrapper = document.createElement('div');
    wrapper.className = 'youtube-embed';
    var iframe = document.createElement('iframe');
    iframe.src = 'https://www.youtube-nocookie.com/embed/' + videoId;
    iframe.title = link.querySelector('img') ? (link.querySelector('img').alt || 'YouTube video') : 'YouTube video';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;
    wrapper.appendChild(iframe);
    link.parentNode.replaceChild(wrapper, link);
  }
})();
