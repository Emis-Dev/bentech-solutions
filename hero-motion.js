// A small local photo carousel. No external runtime or tracking.
(() => {
  'use strict';
  const hero = document.getElementById('hero');
  const toggle = document.getElementById('heroMotionToggle');
  const controls = document.getElementById('heroGalleryControls');
  const photos = document.getElementById('heroPhotos');
  if (!hero || !toggle || !controls || !photos || !('IntersectionObserver' in window)) return;

  const slides = [...photos.querySelectorAll('.hero-slide')];
  const selectors = [...controls.querySelectorAll('[data-slide]')];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let paused = false;
  let visible = false;
  let hovering = false;
  let current = 0;
  let timer;
  const ready = index => {
    const img = slides[index].querySelector('img');
    return img.complete && img.naturalWidth > 0;
  };
  const nextReady = direction => {
    for (let step = 1; step < slides.length; step++) {
      const candidate = (current + direction * step + slides.length) % slides.length;
      if (ready(candidate)) return candidate;
    }
    return current;
  };
  const show = (index, manual = false) => {
    if (!ready(index)) return;
    if (manual) paused = true;
    slides.forEach((slide, i) => {
      slide.classList.toggle('is-active', i === index);
      slide.setAttribute('aria-hidden', String(i !== index));
      selectors[i].setAttribute('aria-pressed', String(i === index));
    });
    current = index;
    document.getElementById('heroPhotoName').textContent = slides[index].dataset.title;
    document.getElementById('heroPhotoCount').textContent = `${index + 1} / ${slides.length}`;
    if (manual) document.getElementById('heroSlideStatus').textContent = `Foto ${index + 1} van ${slides.length}: ${slides[index].dataset.title}`;
  };
  const sync = () => {
    clearTimeout(timer);
    const running = !paused && !hovering && visible && !document.hidden && !reducedMotion.matches;
    hero.dataset.motion = running ? 'running' : 'paused';
    photos.setAttribute('aria-live', running ? 'off' : 'polite');
    toggle.hidden = reducedMotion.matches;
    toggle.setAttribute('aria-pressed', String(paused));
    toggle.querySelector('span').textContent = paused ? 'Beweging hervatten' : 'Beweging pauzeren';
    toggle.querySelector('use').setAttribute('href', paused ? '#i-play' : '#i-pause');
    if (running) timer = setTimeout(() => { show(nextReady(1)); sync(); }, 8000);
  };
  hero.classList.add('motion-ready');
  controls.hidden = false;
  sync();
  toggle.addEventListener('click', () => { paused = !paused; hovering = false; sync(); });
  selectors.forEach(button => button.addEventListener('click', () => { show(Number(button.dataset.slide), true); sync(); }));
  const move = direction => { show(nextReady(direction), true); sync(); };
  document.getElementById('heroPrevious').addEventListener('click', () => move(-1));
  document.getElementById('heroNext').addEventListener('click', () => move(1));
  controls.addEventListener('keydown', event => {
    if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    move(event.key === 'ArrowRight' ? 1 : -1);
  });
  controls.addEventListener('focusin', event => {
    if (!toggle.contains(event.target)) { paused = true; sync(); }
  });
  controls.addEventListener('pointerenter', () => { hovering = true; sync(); });
  controls.addEventListener('pointerleave', () => { hovering = false; sync(); });
  let touchStart;
  hero.addEventListener('touchstart', event => {
    const touch = event.touches.length === 1 ? event.touches[0] : undefined;
    touchStart = touch ? { x: touch.clientX, y: touch.clientY } : undefined;
  }, { passive: true });
  hero.addEventListener('touchend', event => {
    const touch = event.changedTouches[0];
    if (!touchStart || !touch) return;
    const dx = touch.clientX - touchStart.x;
    const dy = touch.clientY - touchStart.y;
    if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.5) move(dx < 0 ? 1 : -1);
    touchStart = undefined;
  }, { passive: true });
  hero.addEventListener('touchcancel', () => { touchStart = undefined; }, { passive: true });
  slides.forEach((slide, i) => {
    const img = slide.querySelector('img');
    selectors[i].disabled = !ready(i);
    const failed = () => {
      selectors[i].disabled = true;
      if (i === current) show(nextReady(1));
    };
    img.addEventListener('error', failed);
    img.addEventListener('load', () => {
      selectors[i].disabled = false;
      if (!ready(current)) show(i);
    });
    if (img.complete && !img.naturalWidth) failed();
  });
  const observer = new IntersectionObserver(entries => {
    visible = entries[0].isIntersecting;
    sync();
  }, { threshold: 0 });
  observer.observe(hero);
  document.addEventListener('visibilitychange', sync);
  reducedMotion.addEventListener('change', sync);
  window.addEventListener('pageshow', sync);
  window.addEventListener('pagehide', () => { clearTimeout(timer); hero.dataset.motion = 'paused'; });
})();

// One short signal follows the delivery steps; all copy stays visible and still.
(() => {
  'use strict';
  const steps = document.querySelector('.process-steps');
  if (!steps || !('IntersectionObserver' in window)) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let started = false;
  let visible = false;
  let suspended = false;
  let complete = false;
  const finish = () => {
    complete = true;
    steps.classList.remove('process-motion-ready');
    steps.dataset.processMotion = 'complete';
    observer.disconnect();
  };
  const sync = () => {
    if (complete) return;
    if (reduced.matches) { finish(); return; }
    steps.dataset.processMotion = started && visible && !document.hidden && !suspended ? 'running' : 'paused';
  };
  const observer = new IntersectionObserver(entries => {
    const entry = entries[0];
    visible = entry.isIntersecting;
    if (!started && entry.intersectionRatio >= 0.3 && !reduced.matches) {
      started = true;
      steps.classList.add('process-motion-ready');
    }
    sync();
  }, { threshold: [0, 0.3] });
  observer.observe(steps);
  steps.addEventListener('animationend', event => {
    if (event.animationName === 'process-node' && event.target === steps.lastElementChild.querySelector('.step-number')) finish();
  });
  document.addEventListener('visibilitychange', sync);
  reduced.addEventListener('change', sync);
  window.addEventListener('pagehide', () => { suspended = true; sync(); });
  window.addEventListener('pageshow', () => { suspended = false; sync(); });
  sync();
})();
