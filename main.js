// BenTech Solutions - Main JavaScript

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initSmoothScroll();
});

// Mobile Navigation Toggle
function initMobileMenu() {
  const mobileToggle = document.getElementById('mobileToggle');
  const mainNav = document.getElementById('mainNav');

  if (mobileToggle && mainNav) {
    mobileToggle.addEventListener('click', () => {
      mainNav.classList.toggle('open');
    });

    // Close menu when clicking a nav link
    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('open');
      });
    });
  }
}

// Smooth Scrolling for Anchors
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

// Tab Switching (Spoed vs Offerte)
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

    message = `🚨 SPOEDMELDING\n\nNaam: ${name}\nTelefoon: ${tel}\nLocatie: ${location}\nProbleem: ${issue}`;
  } else {
    const name = document.getElementById('q-name').value;
    const tel = document.getElementById('q-phone').value;
    const email = document.getElementById('q-email').value;
    const service = document.getElementById('q-service').value;
    const details = document.getElementById('q-details').value;

    message = `📋 OFFERTE AANVRAAG\n\nNaam: ${name}\nTelefoon: ${tel}\nE-mail: ${email}\nDienst: ${service}\nDetails: ${details || 'Geen extra details'}`;
  }

  const encoded = encodeURIComponent(message);
  window.open(`https://wa.me/${phone}?text=${encoded}`, '_blank');
}
