// BenTech Solutions - Premium JavaScript
// Anime.js scroll-reveal + Lucide icons + Mobile menu + WhatsApp forms

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  initMobileMenu();
  initSmoothScroll();
  initScrollReveal();
});

// Mobile Navigation Toggle
function initMobileMenu() {
  const mobileToggle = document.getElementById('mobileToggle');
  const mainNav = document.getElementById('mainNav');

  if (mobileToggle && mainNav) {
    mobileToggle.addEventListener('click', () => {
      mainNav.classList.toggle('open');
      // Animate hamburger to X
      mobileToggle.classList.toggle('is-active');
    });

    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('open');
        mobileToggle.classList.remove('is-active');
      });
    });
  }
}

// Smooth Scrolling
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href !== '#') {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
}

// Scroll Reveal with anime.js
function initScrollReveal() {
  const revealElements = document.querySelectorAll(
    '.section-header, .emergency-card, .bento-card, .step-card, ' +
    '.review-card, .faq-item, .about-grid, .request-box-wrapper, ' +
    '.lamp-portrait-wrapper, .floating-badge'
  );

  // Set initial state
  revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'none';
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = getStaggerDelay(el);

        // Use anime.js if available, otherwise CSS fallback
        if (typeof anime !== 'undefined') {
          anime({
            targets: el,
            opacity: [0, 1],
            translateY: [24, 0],
            duration: 700,
            delay: delay,
            easing: 'cubicBezier(0.16, 1, 0.3, 1)'
          });
        } else {
          // CSS fallback
          setTimeout(() => {
            el.style.transition = 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
          }, delay);
        }

        observer.unobserve(el);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

// Calculate stagger delay based on sibling index
function getStaggerDelay(el) {
  const parent = el.parentElement;
  if (!parent) return 0;

  const siblings = Array.from(parent.children).filter(child =>
    child.style && child.style.opacity === '0'
  );
  const index = siblings.indexOf(el);
  return Math.max(0, index) * 80;
}

// Tab Switching
function switchTab(tabName) {
  const emergencyTab = document.getElementById('tabEmergency');
  const quoteTab = document.getElementById('tabQuote');
  const emergencyBtn = document.getElementById('tabEmergencyBtn');
  const quoteBtn = document.getElementById('tabQuoteBtn');

  if (tabName === 'emergency') {
    emergencyTab.classList.add('active');
    quoteTab.classList.remove('active');
    emergencyBtn.classList.add('active');
    quoteBtn.classList.remove('active');
  } else {
    quoteTab.classList.add('active');
    emergencyTab.classList.remove('active');
    quoteBtn.classList.add('active');
    emergencyBtn.classList.remove('active');
  }
}

// Form Handler — Redirects to WhatsApp
function handleFormSubmit(event, formType) {
  event.preventDefault();

  const phone = '32486328645';
  let message = '';

  if (formType === 'spoed') {
    const name = document.getElementById('em-name').value;
    const tel = document.getElementById('em-phone').value;
    const location = document.getElementById('em-location').value;
    const issue = document.getElementById('em-issue').value;

    message = `SPOEDMELDING\n\nNaam: ${name}\nTelefoon: ${tel}\nLocatie: ${location}\nProbleem: ${issue}`;
  } else {
    const name = document.getElementById('q-name').value;
    const tel = document.getElementById('q-phone').value;
    const email = document.getElementById('q-email').value;
    const service = document.getElementById('q-service').value;
    const details = document.getElementById('q-details').value;

    message = `OFFERTE AANVRAAG\n\nNaam: ${name}\nTelefoon: ${tel}\nE-mail: ${email}\nDienst: ${service}\nDetails: ${details || 'Geen extra details'}`;
  }

  const encoded = encodeURIComponent(message);
  window.open(`https://wa.me/${phone}?text=${encoded}`, '_blank');
}
