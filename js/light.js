// Lays the evening's light on the timeline: meet, golden hour, sunset, blue hour, dusk.
(function () {
  const band = document.querySelector('.light-band');
  if (!band || !window.Sun) return;
  const e = window.Sun.evening();
  const t0 = e.meet.getTime(), t1 = e.dusk.getTime();
  const pct = d => ((d.getTime() - t0) / (t1 - t0) * 100).toFixed(1) + '%';
  band.style.setProperty('--g', pct(e.golden));
  band.style.setProperty('--s', pct(e.sunset));
  band.style.setProperty('--b', pct(e.blue));

  const fmt = d => d.toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit', timeZone: 'Asia/Kolkata' })
    .replace(/\s?(am|pm)/i, (_, x) => ' ' + x.toUpperCase());
  document.querySelectorAll('.mark').forEach(m => {
    const d = e[m.dataset.at];
    if (!d) return;
    m.querySelector('time').textContent = fmt(d);
    m.querySelector('time').dateTime = d.toISOString();
    if (window.matchMedia('(min-width: 721px)').matches) m.style.left = pct(d);
  });
})();
