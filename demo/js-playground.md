---
title: JS Playground
description: Testez et éditez du code HTML/CSS/JS en direct
show_toc: true
---

## Présentation

Ce playground vous permet d'expérimenter avec du code HTML, CSS et JavaScript en temps réel. Modifiez le code dans les éditeurs et voyez les résultats instantanément dans la prévisualisation.

{% capture demo1_html %}
<h1>Hello Wild Code School</h1>
<p>Modifie ce texte pour voir le rendu en direct !</p>
<button id="btn">Clique-moi</button>
<ul>
  <li>HTML</li>
  <li>CSS</li>
  <li>JS</li>
</ul>
{% endcapture %}

{% capture demo1_css %}
body {
  font-family: system-ui, sans-serif;
  padding: 2rem;
  background: #f9f9f9;
  color: #333;
}

h1 {
  color: #E40046;
}

button {
  background: #E40046;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  opacity: 0.9;
}
{% endcapture %}

{% capture demo1_js %}
document.getElementById('btn').addEventListener('click', function () {
  alert('Hello Wild !');
});
{% endcapture %}

{% include playground.html
  id="demo-js"
  initial_html=demo1_html
  initial_css=demo1_css
  initial_js=demo1_js
%}

## Utilisation

Ajoute un playground dans n'importe quelle page Markdown :

<pre><code>&#123;% capture mon_html %}
&lt;h1&gt;Hello&lt;/h1&gt;
&#123;% endcapture %}

&#123;% capture mon_css %}
h1 {
  color: red;
}
&#123;% endcapture %}

&#123;% capture mon_js %}
console.log('Hello, World!');
&#123;% endcapture %}

&#123;% include playground.html
  id="mon-playground"
  initial_html=mon_html
  initial_css=mon_css
  initial_js=mon_js
%}
</code></pre>

### Paramètres

| Paramètre | Description |
|-----------|-------------|
| `id` | Identifiant unique du playground |
| `initial_html` | Code HTML initial (via <code>&#123;% capture %}</code>) |
| `initial_css` | Code CSS initial (via <code>&#123;% capture %}</code>) |
| `initial_js` | Code JavaScript initial (via <code>&#123;% capture %}</code>) |

Pour du code court, tu peux passer une chaîne directement :

<pre><code>&#123;% include playground.html
  id="mini"
  initial_html="&lt;h1&gt;Hello&lt;/h1&gt;"
%}
</code></pre>
