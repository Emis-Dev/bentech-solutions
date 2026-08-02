// BenTech Solutions - Main JavaScript Application

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
      const isNavOpen = mainNav.style.display === 'flex';
      mainNav.style.display = isNavOpen ? 'none' : 'flex';
      mainNav.style.flexDirection = 'column';
      mainNav.style.position = 'absolute';
      mainNav.style.top = '100%';
      mainNav.style.left = '0';
      mainNav.style.right = '0';
      mainNav.style.backgroundColor = '#060b17';
      mainNav.style.padding = '1.5rem';
      mainNav.style.borderBottom = '1px solid rgba(0, 200, 117, 0.2)';
    });
  }
}

// Smooth Scrolling for Anchors
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href !== '#') {
        const targetElement = document.querySelector(href);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
}

// Interactive Request Tab Switching (Spoed vs Offerte)
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

// Contact & Emergency Form Handler
function handleFormSubmit(event, formType) {
  event.preventDefault();
  const feedbackEl = document.getElementById('formFeedback');

  if (!feedbackEl) return;

  if (formType === 'spoed') {
    const name = document.getElementById('em-name').value;
    const phone = document.getElementById('em-phone').value;
    
    feedbackEl.className = 'form-feedback-message success';
    feedbackEl.innerHTML = `🚨 <strong>Oproep Ontvangen!</strong> Bedankt ${name}. Onze technicus belt u direct terug op <strong>${phone}</strong>! Probeer bij acuut gevaar ook direct te bellen op <a href="tel:+32470000000" style="text-decoration:underline;">+32 470 00 00 00</a>.`;
    event.target.reset();
  } else {
    const name = document.getElementById('q-name').value;
    
    feedbackEl.className = 'form-feedback-message success';
    feedbackEl.innerHTML = `📋 <strong>Offerte-aanvraag ontvangen!</strong> Bedankt ${name}, wij verwerken uw aanvraag en nemen binnen 24 uur contact met u op.`;
    event.target.reset();
  }
}
