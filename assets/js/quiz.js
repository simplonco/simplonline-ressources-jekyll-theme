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
      if (!q.question || !Array.isArray(q.options) || q.options.length < 2) return;
      var isMultiple = Array.isArray(q.correct);
      if (!isMultiple && typeof q.correct !== 'number') return;

      var correctValues = isMultiple ? q.correct : [q.correct];

      var qEl = document.createElement('fieldset');
      qEl.className = 'quiz-question';

      var qTitle = document.createElement('legend');
      qTitle.className = 'quiz-question-text';
      qTitle.textContent = q.question;
      qEl.appendChild(qTitle);

      var hint = document.createElement('span');
      hint.className = 'quiz-hint';
      hint.textContent = isMultiple ? 'Plusieurs réponses possibles' : 'Une seule réponse';
      qEl.appendChild(hint);

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
        input.type = isMultiple ? 'checkbox' : 'radio';
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
          if (isMultiple) {
            submitBtn.disabled = !options.querySelector('input:checked');
          } else {
            submitBtn.disabled = false;
          }
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

        var allInputs = options.querySelectorAll('input');
        for (var ii = 0; ii < allInputs.length; ii++) {
          allInputs[ii].disabled = true;
        }

        if (isMultiple) {
          q.options.forEach(function (opt, oi) {
            var label = options.querySelector('[data-option-index="' + oi + '"]');
            if (!label) return;
            var input = document.getElementById(label.htmlFor);
            var isInCorrect = correctValues.indexOf(oi) !== -1;
            if (input.checked && isInCorrect) {
              label.classList.add('is-correct');
            } else if (input.checked && !isInCorrect) {
              label.classList.add('is-incorrect');
            } else if (!input.checked && isInCorrect) {
              label.classList.add('is-correct');
            }
          });
        } else {
          var selectedIndex = parseInt(checked.value);
          var selectedLabel = options.querySelector('[data-option-index="' + selectedIndex + '"]');
          var isCorrect = selectedIndex === q.correct;
          selectedLabel.classList.add(isCorrect ? 'is-correct' : 'is-incorrect');
          if (!isCorrect) {
            var correctLabel = options.querySelector('[data-option-index="' + q.correct + '"]');
            if (correctLabel) correctLabel.classList.add('is-correct');
          }
        }
      }

      submitBtn.addEventListener('click', validate);

      container.appendChild(qEl);
    });
  });
})();
