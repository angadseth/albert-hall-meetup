// On phones, a register bar slides up once the hero's button has scrolled out of view.
(function () {
  const dock = document.querySelector('.dock');
  const heroBtn = document.querySelector('.hero [data-register]');
  const end = document.querySelector('#register');
  if (!dock || !heroBtn || !('IntersectionObserver' in window)) return;
  let heroGone = false, atEnd = false;
  const sync = () => dock.classList.toggle('show', heroGone && !atEnd);
  new IntersectionObserver(([e]) => { heroGone = !e.isIntersecting && e.boundingClientRect.top < 0; sync(); }).observe(heroBtn);
  if (end) new IntersectionObserver(([e]) => { atEnd = e.isIntersecting; sync(); }).observe(end);
})();
