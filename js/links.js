// Point every register button at the form, and every map link at the museum.
(function () {
  const { FORM_URL, MAPS_URL } = window.MEETUP;
  document.querySelectorAll('[data-register]').forEach(a => {
    a.href = FORM_URL;
    if (/^https?:/.test(FORM_URL)) { a.target = '_blank'; a.rel = 'noopener'; }
  });
  document.querySelectorAll('[data-maps]').forEach(a => { a.href = MAPS_URL; a.target = '_blank'; a.rel = 'noopener'; });
})();
