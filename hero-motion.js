// One illustrative signal sequence. No hardware connection or external runtime.
(() => {
  'use strict';
  const hero = document.getElementById('hero');
  const toggle = document.getElementById('heroMotionToggle');
  if (!hero || !toggle || !('IntersectionObserver' in window)) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let paused = false;
  let visible = false;
  const sync = () => {
    hero.dataset.motion = !paused && visible && !document.hidden && !reducedMotion.matches ? 'running' : 'paused';
    toggle.hidden = reducedMotion.matches;
    toggle.setAttribute('aria-pressed', String(paused));
    toggle.querySelector('span').textContent = paused ? 'Beweging hervatten' : 'Beweging pauzeren';
    toggle.querySelector('use').setAttribute('href', paused ? '#i-play' : '#i-pause');
  };
  hero.classList.add('motion-ready');
  sync();
  toggle.addEventListener('click', () => { paused = !paused; sync(); });
  const observer = new IntersectionObserver(entries => {
    visible = entries[0].isIntersecting;
    sync();
  }, { threshold: 0 });
  observer.observe(hero);
  document.addEventListener('visibilitychange', sync);
  reducedMotion.addEventListener('change', sync);
  window.addEventListener('pageshow', sync);
})();
