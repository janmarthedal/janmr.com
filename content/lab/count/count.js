(function () {
  'use strict';

  var STORAGE_KEY = 'lab_count_counters';

  var counters = [];

  var listEl = document.getElementById('counters');
  var addBtn = document.getElementById('add-counter');

  // ==================== Persistence ====================

  function saveCounters() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(counters));
    } catch (e) {
      // Storage unavailable (e.g. private mode quota) - ignore.
    }
  }

  function loadCounters() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (raw === null) return null;
      var data = JSON.parse(raw);
      if (Array.isArray(data)) {
        return data
          .filter(function (c) { return c && typeof c === 'object'; })
          .map(function (c) {
            return {
              name: typeof c.name === 'string' ? c.name : '',
              value: typeof c.value === 'number' && isFinite(c.value) ? Math.round(c.value) : 0
            };
          });
      }
    } catch (e) {
      // Storage unavailable or corrupt - fall through to defaults.
    }
    return null;
  }

  // ==================== Rendering ====================

  function render() {
    listEl.innerHTML = '';

    if (counters.length === 0) {
      var empty = document.createElement('div');
      empty.id = 'empty';
      empty.textContent = 'No counters yet. Add one to get started.';
      listEl.appendChild(empty);
      return;
    }

    counters.forEach(function (counter, index) {
      var row = document.createElement('div');
      row.className = 'counter';

      var name = document.createElement('input');
      name.type = 'text';
      name.className = 'counter-name';
      name.placeholder = 'Counter name';
      name.value = counter.name;
      name.addEventListener('input', function () {
        counter.name = name.value;
        saveCounters();
      });

      var minus = document.createElement('button');
      minus.className = 'btn btn-step';
      minus.type = 'button';
      minus.textContent = '−'; // minus sign
      minus.setAttribute('aria-label', 'Decrement');
      minus.addEventListener('click', function () {
        counter.value -= 1;
        valueEl.textContent = counter.value;
        saveCounters();
      });

      var valueEl = document.createElement('span');
      valueEl.className = 'counter-value';
      valueEl.textContent = counter.value;

      var plus = document.createElement('button');
      plus.className = 'btn btn-step';
      plus.type = 'button';
      plus.textContent = '+';
      plus.setAttribute('aria-label', 'Increment');
      plus.addEventListener('click', function () {
        counter.value += 1;
        valueEl.textContent = counter.value;
        saveCounters();
      });

      var remove = document.createElement('button');
      remove.className = 'btn btn-remove';
      remove.type = 'button';
      remove.textContent = '×'; // multiplication sign
      remove.setAttribute('aria-label', 'Remove counter');
      remove.addEventListener('click', function () {
        counters.splice(index, 1);
        saveCounters();
        render();
      });

      row.appendChild(name);
      row.appendChild(minus);
      row.appendChild(valueEl);
      row.appendChild(plus);
      row.appendChild(remove);
      listEl.appendChild(row);
    });
  }

  // ==================== Init ====================

  addBtn.addEventListener('click', function () {
    counters.push({ name: '', value: 0 });
    saveCounters();
    render();
  });

  var stored = loadCounters();
  counters = stored !== null ? stored : [{ name: 'Counter 1', value: 0 }];
  render();
})();
