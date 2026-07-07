(function () {
  var containers = document.querySelectorAll('.quiz');
  if (!containers.length) return;

  function getId(prefix) {
    return prefix + '-' + (getId._counter = (getId._counter || 0) + 1);
  }

  containers.forEach(function (container) {
    var script = container.querySelector('script.quiz-data');
    if (!script) return;

    var questions;
    try {
      questions = JSON.parse(script.textContent);
    } catch (e) {
      return;
    }

    if (!Array.isArray(questions) || !questions.length) return;

    script.remove();

    questions.forEach(function (q, qi) {
      if (!q.question || !Array.isArray(q.options) || q.options.length < 2 || typeof q.correct !== 'number') return;

      var qEl = document.createElement('fieldset');
      qEl.className = 'quiz-question';

      var qTitle = document.createElement('legend');
      qTitle.className = 'quiz-question-text';
      qTitle.textContent = q.question;
      qEl.appendChild(qTitle);

      var options = document.createElement('div');
      options.className = 'quiz-options';

      var groupName = getId('quiz-q');

      q.options.forEach(function (opt, oi) {
        var inputId = getId('quiz-r');

        var label = document.createElement('label');
        label.className = 'quiz-option';
        label.htmlFor = inputId;
        label.dataset.optionIndex = oi;

        var input = document.createElement('input');
        input.type = 'radio';
        input.id = inputId;
        input.name = groupName;
        input.value = oi;

        var span = document.createElement('span');
        span.textContent = opt;

        label.appendChild(input);
        label.appendChild(span);
        options.appendChild(label);

        input.addEventListener('change', function () {
          if (q._answered) return;
          submitBtn.disabled = false;
        });
      });

      qEl.appendChild(options);

      var submitBtn = document.createElement('button');
      submitBtn.type = 'button';
      submitBtn.className = 'quiz-submit';
      submitBtn.textContent = 'Valider';
      submitBtn.disabled = true;
      qEl.appendChild(submitBtn);

      function validate() {
        if (q._answered) return;
        var checked = options.querySelector('input:checked');
        if (!checked) return;
        q._answered = true;
        submitBtn.disabled = true;

        var selectedIndex = parseInt(checked.value);
        var selectedLabel = options.querySelector('[data-option-index="' + selectedIndex + '"]');

        var allInputs = options.querySelectorAll('input');
        for (var ii = 0; ii < allInputs.length; ii++) {
          allInputs[ii].disabled = true;
        }

        var isCorrect = selectedIndex === q.correct;
        selectedLabel.classList.add(isCorrect ? 'is-correct' : 'is-incorrect');

        if (!isCorrect) {
          var correctLabel = options.querySelector('[data-option-index="' + q.correct + '"]');
          if (correctLabel) correctLabel.classList.add('is-correct');
        }
      }

      submitBtn.addEventListener('click', validate);

      container.appendChild(qEl);
    });
  });
})();
