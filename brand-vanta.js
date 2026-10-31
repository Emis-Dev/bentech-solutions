// BenTech Solutions - Multi-Brand Desktop Vanta Topology Runtime
// Lazily loads p5.js and vanta.topology only for desktop viewports (>= 769px).
// Mobile devices (< 769px) and users with prefers-reduced-motion never load or execute this script.

(function() {
  const VANTA_DESKTOP_QUERY = '(min-width: 769px)';
  const VANTA_P5_SRC = 'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.1.9/p5.min.js';
  const VANTA_TOPOLOGY_SRC = 'https://cdn.jsdelivr.net/npm/vanta@0.5.24/dist/vanta.topology.min.js';

  const BRAND_COLORS = {
    'theme-klimaatplus': 0xea580c, // Flame orange
    'theme-batteryplus': 0x078653, // Energy green
    'theme-laadplus': 0x047857,    // Dynamic EV emerald
    'theme-serviceplus': 0x0284c7, // Storingsblauw
    'theme-solarplus': 0xe7a008    // Solar gold / amber
  };

  function loadScriptOnce(id, src, isReady) {
    if (isReady()) return Promise.resolve();

    const existingScript = document.getElementById(id);
    if (existingScript) {
      return new Promise((resolve, reject) => {
        if (existingScript.dataset.loaded === 'true' || isReady()) {
          resolve();
          return;
        }
        existingScript.addEventListener('load', resolve, { once: true });
        existingScript.addEventListener('error', reject, { once: true });
      });
    }

    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.id = id;
      script.src = src;
      script.async = true;
      script.addEventListener('load', () => {
        script.dataset.loaded = 'true';
        resolve();
      }, { once: true });
      script.addEventListener('error', reject, { once: true });
      document.head.append(script);
    });
  }

  function createP5Topology(options) {
    const vantaBasePrototype = window.VANTA?.VantaBase?.prototype;
    const originalInitThree = vantaBasePrototype?.initThree;

    if (originalInitThree) vantaBasePrototype.initThree = function() {};
    try {
      return window.VANTA.TOPOLOGY(options);
    } finally {
      if (originalInitThree) vantaBasePrototype.initThree = originalInitThree;
    }
  }

  function getBrandColor(heroEl) {
    if (heroEl.dataset.vantaColor) {
      return parseInt(heroEl.dataset.vantaColor, 16);
    }
    for (const [themeClass, color] of Object.entries(BRAND_COLORS)) {
      if (document.body.classList.contains(themeClass)) {
        return color;
      }
    }
    return 0x047857;
  }

  function initBrandVanta() {
    const heroEl = document.querySelector('.brand-hero') || document.getElementById('top');
    if (!heroEl) return;

    const desktopMedia = window.matchMedia(VANTA_DESKTOP_QUERY);
    const reducedMotionMedia = window.matchMedia('(prefers-reduced-motion: reduce)');
    let vantaEffect = null;
    let visibilityObserver = null;
    let loadPromise = null;
    let lifecycle = 0;

    const shouldRun = () => desktopMedia.matches && !reducedMotionMedia.matches;

    const stopVanta = () => {
      lifecycle += 1;
      visibilityObserver?.disconnect();
      visibilityObserver = null;
      vantaEffect?.destroy();
      vantaEffect = null;
    };

    const startVanta = () => {
      if (vantaEffect || loadPromise || !shouldRun()) return;

      const requestedLifecycle = lifecycle;
      const brandColor = getBrandColor(heroEl);

      loadPromise = (async () => {
        await loadScriptOnce('bentech-p5', VANTA_P5_SRC, () => typeof window.p5 !== 'undefined');
        if (!shouldRun() || requestedLifecycle !== lifecycle) return;

        await loadScriptOnce(
          'bentech-vanta-topology',
          VANTA_TOPOLOGY_SRC,
          () => typeof window.VANTA?.TOPOLOGY === 'function'
        );
        if (!shouldRun() || requestedLifecycle !== lifecycle) return;

        vantaEffect = createP5Topology({
          el: heroEl,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          color: brandColor,
          backgroundColor: 0xf8fafc
        });

        const effectForHook = vantaEffect;
        window.setTimeout(() => {
          if (vantaEffect !== effectForHook || !effectForHook?.p5?.draw) return;

          const originalDraw = effectForHook.p5.draw;
          effectForHook.p5.draw = function() {
            effectForHook.p5.push();
            effectForHook.p5.resetMatrix();
            effectForHook.p5.noStroke();
            effectForHook.p5.fill(248, 250, 252, 10);
            effectForHook.p5.rect(0, 0, effectForHook.p5.width, effectForHook.p5.height);
            effectForHook.p5.pop();
            originalDraw.call(this);
          };

          if ('IntersectionObserver' in window) {
            visibilityObserver = new IntersectionObserver(([entry]) => {
              if (vantaEffect !== effectForHook) return;
              if (entry.isIntersecting) effectForHook.p5.loop();
              else effectForHook.p5.noLoop();
            }, { threshold: 0.05 });
            visibilityObserver.observe(heroEl);
          }
        }, 100);
      })().catch(() => {
        stopVanta();
      }).finally(() => {
        loadPromise = null;
      });
    };

    const syncVanta = () => {
      if (shouldRun()) startVanta();
      else stopVanta();
    };

    desktopMedia.addEventListener('change', syncVanta);
    reducedMotionMedia.addEventListener('change', syncVanta);
    window.addEventListener('pagehide', stopVanta, { once: true });
    syncVanta();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBrandVanta);
  } else {
    initBrandVanta();
  }
})();
