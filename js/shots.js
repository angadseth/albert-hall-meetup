// The shot list remembers what you've ticked, on this phone only.
(function () {
  const list = document.querySelector('.notebook');
  if (!list) return;
  const KEY = 'albert-hall-shots';
  const boxes = [...list.querySelectorAll('input[type=checkbox]')];
  const count = list.querySelector('.shots-count');
  let saved = [];
  try { saved = JSON.parse(localStorage.getItem(KEY) || '[]'); } catch (e) {}
  boxes.forEach((b, i) => { b.checked = saved.includes(i); });
  function update() {
    const done = boxes.filter(b => b.checked).length;
    count.textContent = done === boxes.length ? 'Full roll. See you there.' : `${done} of ${boxes.length} frames`;
    try { localStorage.setItem(KEY, JSON.stringify(boxes.map((b, i) => b.checked ? i : -1).filter(i => i >= 0))); } catch (e) {}
  }
  boxes.forEach(b => b.addEventListener('change', update));
  update();
})();
