// Counts down to 4:30 PM IST on 10 October, whatever the visitor's own time zone.
(function () {
  const ticket = document.querySelector('.ticket');
  if (!ticket) return;
  const start = new Date(window.MEETUP.START).getTime();
  const out = {
    d: ticket.querySelector('[data-cd="d"]'),
    h: ticket.querySelector('[data-cd="h"]'),
    m: ticket.querySelector('[data-cd="m"]'),
    s: ticket.querySelector('[data-cd="s"]'),
  };
  const pad = n => String(n).padStart(2, '0');
  function tick() {
    const left = Math.max(0, start - Date.now());
    if (left === 0) { ticket.classList.add('is-live'); return; }
    const sec = Math.floor(left / 1000);
    out.d.textContent = pad(Math.floor(sec / 86400));
    out.h.textContent = pad(Math.floor(sec / 3600) % 24);
    out.m.textContent = pad(Math.floor(sec / 60) % 60);
    out.s.textContent = pad(sec % 60);
    setTimeout(tick, 1000 - (Date.now() % 1000));
  }
  tick();
})();
