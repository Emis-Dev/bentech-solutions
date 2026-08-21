// BenTech Solutions - Premium JavaScript
// Anime.js scroll-reveal + Lucide icons + Mobile menu + WhatsApp forms

const SERVICE_DETAILS = {
  depannage: {
    anchor: 'dienst-depannage',
    icon: 'siren',
    kicker: '24/7 storingsdienst',
    title: 'Dringende depannage & herstellingen',
    intro: 'Bij een plotse stroomuitval, kortsluiting of een onveilige elektrische situatie helpt BenTech Solutions u snel weer op een veilige manier verder.',
    image: 'assets/video_scene1_dark_fusebox.jpg',
    imageAlt: 'Controle van een elektrische zekeringkast tijdens een storing',
    visualLabel: 'Snel en veilig ter plaatse',
    chips: ['24/7 bereikbaar', 'Gerichte diagnose', 'Duidelijke prijsafspraak'],
    scope: [
      'Telefonische inschatting van de urgentie en eerste veiligheidsadvies',
      'Opsporen van kortsluiting, verliesstroom en defecte kringen',
      'Veilig herstellen of tijdelijk beveiligen wanneer een definitieve oplossing later volgt'
    ],
    fit: [
      'Volledige of gedeeltelijke stroomuitval',
      'Zekeringen of differentieel die blijven uitschakelen',
      'Vonken, brandgeur, warme stopcontacten of zichtbare schade'
    ],
    note: 'Ruikt u verbranding of ziet u vonken? Raak de installatie niet aan, schakel alleen uit wanneer dat veilig kan en bel meteen de spoedlijn.',
    primaryLabel: 'Bel de spoedlijn',
    primaryHref: 'tel:+32486328645'
  },
  zekeringkasten: {
    anchor: 'dienst-zekeringkasten',
    icon: 'cable',
    kicker: 'Veilig & AREI-conform',
    title: 'Zekeringkasten & AREI-keuring',
    intro: 'Een overzichtelijke en correct beveiligde verdeelkast vormt het hart van uw elektrische installatie. Ik breng de situatie in kaart en werk toe naar een veilige, keuringsklare oplossing.',
    image: 'assets/service-zekeringkast-arei-v2.webp',
    imageAlt: 'Elektricien die een AREI-controle uitvoert aan een moderne verdeelkast',
    visualLabel: 'Keuringsklaar afgewerkt',
    chips: ['Analyse ter plaatse', 'Correcte beveiliging', 'Heldere documentatie'],
    scope: [
      'Controle van kringen, differentieelschakelaars, aarding en beveiligingen',
      'Vernieuwing, uitbreiding of overzichtelijke herindeling van de zekeringkast',
      'Labeling en voorbereiding van de nodige schema’s voor de keuring'
    ],
    fit: [
      'Een verouderde, onoverzichtelijke of afgekeurde installatie',
      'Renovatie, verzwaring of toevoeging van nieuwe elektrische verbruikers',
      'Voorbereiding op verkoop, verhuur of een geplande AREI-keuring'
    ],
    note: 'U krijgt vooraf een duidelijke aanpak. Na de werken wordt alles getest en krijgt u uitleg over de vernieuwde installatie.',
    primaryLabel: 'Vraag een plaatsbezoek aan',
    primaryHref: '#offerte',
    formValue: 'Zekeringkast vernieuwen / AREI Keuring'
  },
  herstellingen: {
    anchor: 'dienst-herstellingen',
    icon: 'wrench',
    kicker: 'Gericht opgelost',
    title: 'Elektrische herstellingen',
    intro: 'Van een defect stopcontact tot verlichting die blijft flikkeren: BenTech Solutions zoekt de oorzaak, herstelt zorgvuldig en controleert de werking voor vertrek.',
    image: 'assets/video_scene2_yassir_van.jpg',
    imageAlt: 'Yassir van BenTech Solutions naast zijn interventiewagen',
    visualLabel: 'Vakman rechtstreeks bereikbaar',
    chips: ['Woning & zaak', 'Meten voor herstellen', 'Netjes opgeleverd'],
    scope: [
      'Foutzoeken aan stopcontacten, schakelaars, verlichting en bedrading',
      'Vervangen van beschadigde onderdelen en herstellen van slechte verbindingen',
      'Controle en functietest na de herstelling'
    ],
    fit: [
      'Stopcontacten, schakelaars of lichtpunten die niet meer werken',
      'Terugkerende kleine storingen of onverklaarbare uitval',
      'Beschadigde bekabeling of uitbreidingen die veilig moeten worden afgewerkt'
    ],
    note: 'Door eerst te meten en de oorzaak vast te stellen, vermijden we onnodige vervangingen en krijgt u een duurzame oplossing.',
    primaryLabel: 'Beschrijf uw herstelling',
    primaryHref: '#offerte',
    formValue: 'Elektrische herstellingen'
  },
  installaties: {
    anchor: 'dienst-installaties',
    icon: 'hard-hat',
    kicker: 'Van plan tot oplevering',
    title: 'Volledige elektriciteitsinstallaties',
    intro: 'Voor nieuwbouw, renovatie en uitbreiding verzorg ik een samenhangende elektrische installatie met aandacht voor veiligheid, toekomstig gebruik en een nette afwerking.',
    image: 'assets/service-elektriciteitsinstallatie-v2.webp',
    imageAlt: 'Elektricien die een volledige installatie afwerkt tijdens een woningrenovatie',
    visualLabel: 'Eén aanspreekpunt van A tot Z',
    chips: ['Nieuwbouw & renovatie', 'Doordachte planning', 'Getest bij oplevering'],
    scope: [
      'Plan en praktische indeling van stopcontacten, verlichting en vaste aansluitingen',
      'Leidingwerk, bekabeling, verdeelkast, aarding en differentieelbeveiliging',
      'Test, afwerking en voorbereiding van de installatie voor keuring'
    ],
    fit: [
      'Een volledige nieuwbouw- of renovatie-installatie',
      'Uitbreiding van woonruimte, kantoor, keuken of bijgebouw',
      'Modernisering met extra comfort, capaciteit en overzicht'
    ],
    note: 'We stemmen de uitvoering en betalingsmomenten vooraf helder af, zodat materiaalbestellingen en planning zonder verrassingen verlopen.',
    primaryLabel: 'Bespreek uw project',
    primaryHref: '#offerte',
    formValue: 'Volledige elektriciteitsinstallatie'
  },
  laadpalen: {
    anchor: 'dienst-laadpalen',
    icon: 'plug-zap',
    kicker: 'Slim & veilig laden',
    title: 'Laadpalen voor thuis en op het werk',
    intro: 'Laad uw elektrische wagen snel, veilig en efficiënt met een professioneel geplaatste laadoplossing die is afgestemd op uw elektrische installatie en dagelijkse gebruik.',
    image: 'assets/yassir-laadpaal-installatie.jpeg',
    imageAlt: 'Yassir van BenTech Solutions tijdens de installatie van een laadpaal',
    visualLabel: 'Echte installatie door BenTech',
    chips: ['Advies op maat', 'Load balancing', 'App ingesteld'],
    scope: [
      'Advies over vermogen, plaatsing en de beste laadoplossing voor uw situatie',
      'Professionele montage, veilige aansluiting en voorbereiding voor keuring',
      'Load balancing, slimme functies en configuratie van de mobiele app'
    ],
    fit: [
      'U wilt thuis of op het werk comfortabel elektrisch laden',
      'Uw elektrische aansluiting moet slim over het beschikbare vermogen verdelen',
      'U wilt laadpaal, zonnepanelen en thuisbatterij later kunnen combineren'
    ],
    note: 'U krijgt een nette installatie met kwaliteitsmaterialen, een volledige functietest en duidelijke uitleg over het laden en de app.',
    primaryLabel: 'Vraag laadpaaladvies aan',
    primaryHref: '#offerte',
    formValue: 'Laadpaal'
  },
  thuisbatterijen: {
    anchor: 'dienst-thuisbatterijen',
    icon: 'battery-charging',
    kicker: 'Meer eigen energie gebruiken',
    title: 'Thuisbatterijen op maat van uw verbruik',
    intro: 'Bewaar de energie die uw zonnepanelen overdag produceren en gebruik ze wanneer uw woning ze nodig heeft. Zo haalt u meer uit uw eigen productie en beheert u energie slimmer.',
    image: 'assets/service-thuisbatterij-v2.webp',
    imageAlt: 'Elektricien die een professioneel geplaatste thuisbatterij in gebruik neemt',
    visualLabel: 'Capaciteit correct berekend',
    chips: ['Verbruiksanalyse', 'Slim energiebeheer', 'Nazorg inbegrepen'],
    scope: [
      'Analyse van uw energieverbruik, zonneproductie en dagelijkse verbruikspieken',
      'Advies over de batterijcapaciteit die past bij uw huidige of toekomstige installatie',
      'Professionele plaatsing, configuratie, ingebruikname en ondersteuning'
    ],
    fit: [
      'U wilt meer van uw zelf opgewekte zonne-energie gebruiken',
      'Uw verbruik ligt vaak buiten de uren met de meeste zonneproductie',
      'U zoekt een toekomstgerichte uitbreiding voor bestaande of geplande zonnepanelen'
    ],
    note: 'Een passende batterij begint bij correcte data. Daarom kijken we eerst naar verbruik, productie en installatie voor we een capaciteit adviseren.',
    primaryLabel: 'Bespreek uw thuisbatterij',
    primaryHref: '#offerte',
    formValue: 'Thuisbatterij'
  },
  zonnepanelen: {
    anchor: 'dienst-zonnepanelen',
    icon: 'sun',
    kicker: 'Duurzaam zelf opwekken',
    title: 'Zonnepanelen voor woning of onderneming',
    intro: 'Verlaag uw afhankelijkheid van het elektriciteitsnet met een correct gedimensioneerde zonne-installatie. BenTech Solutions begeleidt u van persoonlijk advies tot veilige aansluiting en oplevering.',
    image: 'assets/service-zonnepanelen-v2.webp',
    imageAlt: 'Elektricien die zonnepanelen installeert op een Vlaamse woning',
    visualLabel: 'Van advies tot oplevering',
    chips: ['Correct gedimensioneerd', 'Kwaliteitsmaterialen', 'Veilig getest'],
    scope: [
      'Persoonlijk advies en dimensionering op basis van dak, installatie en verbruik',
      'Professionele montage van zonnepanelen, omvormer en elektrische beveiliging',
      'Veilige aansluiting, functietest en duidelijke uitleg bij oplevering'
    ],
    fit: [
      'U wilt uw energiekosten structureel verlagen met eigen productie',
      'U zoekt een duurzame investering voor uw woning of onderneming',
      'U wilt zonnepanelen combineren met een laadpaal of thuisbatterij'
    ],
    note: 'BenTech Solutions werkt met duurzame kwaliteitsmaterialen en stemt elk onderdeel af op een veilige, betrouwbare en nette installatie.',
    primaryLabel: 'Vraag zonne-energieadvies aan',
    primaryHref: '#offerte',
    formValue: 'Zonnepanelen'
  }
};

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  initMobileMenu();
  initServiceExperience();
  initQuoteShortcuts();
  initSmoothScroll();
  initScrollReveal();
  initVantaHero();
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
    if (link.hasAttribute('data-service-link') || link.closest('#serviceModal')) return;

    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href !== '#') {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          if (window.location.hash !== href) {
            window.history.pushState({}, '', href);
          }
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
}

// Services dropdown, shareable anchors and dynamic detail dialog
function initServiceExperience() {
  const dialog = document.getElementById('serviceModal');
  const dropdown = document.querySelector('.nav-dropdown');
  const dropdownLink = document.querySelector('.nav-dropdown-link');
  const dropdownToggle = document.getElementById('servicesDropdownToggle');
  const closeButton = document.getElementById('serviceModalClose');
  const serviceLinks = document.querySelectorAll('[data-service-link]');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!dialog || !serviceLinks.length) return;

  const modalImage = document.getElementById('serviceModalImage');
  const modalVisualLabel = document.getElementById('serviceModalVisualLabel');
  const modalIcon = document.getElementById('serviceModalIcon');
  const modalKicker = document.getElementById('serviceModalKicker');
  const modalTitle = document.getElementById('serviceModalTitle');
  const modalIntro = document.getElementById('serviceModalIntro');
  const modalChips = document.getElementById('serviceModalChips');
  const modalScope = document.getElementById('serviceModalScope');
  const modalFit = document.getElementById('serviceModalFit');
  const modalNote = document.getElementById('serviceModalNote');
  const modalPrimary = document.getElementById('serviceModalPrimary');
  const modalPrimaryLabel = document.getElementById('serviceModalPrimaryLabel');
  const mainNav = document.getElementById('mainNav');
  const mobileToggle = document.getElementById('mobileToggle');
  let lastTrigger = null;
  let openingTimer = null;
  let scrollEndHandler = null;
  let preserveHashOnClose = false;
  const findServiceEntryForHash = () => {
    const directMatch = Object.entries(SERVICE_DETAILS).find(([, detail]) => `#${detail.anchor}` === window.location.hash);
    if (directMatch) return directMatch;
    return window.location.hash === '#dienst-energie' ? ['laadpalen', SERVICE_DETAILS.laadpalen] : null;
  };

  const closeDropdown = () => {
    if (!dropdown || !dropdownToggle) return;
    dropdown.classList.remove('is-open');
    dropdownToggle.setAttribute('aria-expanded', 'false');
    dropdownToggle.setAttribute('aria-label', 'Toon submenu met diensten');
  };

  const clearPendingOpen = () => {
    window.clearTimeout(openingTimer);
    openingTimer = null;
    if (scrollEndHandler) {
      window.removeEventListener('scrollend', scrollEndHandler);
      scrollEndHandler = null;
    }
  };

  if (dropdown && dropdownToggle) {
    dropdownToggle.addEventListener('click', (event) => {
      event.stopPropagation();
      const isOpen = dropdown.classList.toggle('is-open');
      dropdownToggle.setAttribute('aria-expanded', String(isOpen));
      dropdownToggle.setAttribute('aria-label', isOpen ? 'Verberg submenu met diensten' : 'Toon submenu met diensten');
    });

    dropdownLink?.addEventListener('click', (event) => {
      closeDropdown();
      if (event.detail > 0) dropdownLink.blur();
    });

    document.addEventListener('click', (event) => {
      if (!dropdown.contains(event.target)) closeDropdown();
    });
  }

  const renderList = (container, items) => {
    container.replaceChildren(...items.map(item => {
      const listItem = document.createElement('li');
      listItem.textContent = item;
      return listItem;
    }));
  };

  const populateDialog = (key) => {
    const detail = SERVICE_DETAILS[key];
    if (!detail) return;

    dialog.dataset.service = key;
    modalImage.src = detail.image;
    modalImage.alt = detail.imageAlt;
    modalVisualLabel.textContent = detail.visualLabel;
    modalIcon.innerHTML = `<i data-lucide="${detail.icon}" class="icon-sm"></i>`;
    modalKicker.textContent = detail.kicker;
    modalTitle.textContent = detail.title;
    modalIntro.textContent = detail.intro;
    modalChips.replaceChildren(...detail.chips.map(chip => {
      const item = document.createElement('span');
      item.className = 'service-modal-chip';
      item.textContent = chip;
      return item;
    }));
    renderList(modalScope, detail.scope);
    renderList(modalFit, detail.fit);
    modalNote.textContent = detail.note;
    modalPrimary.href = detail.primaryHref;
    modalPrimary.dataset.formValue = detail.formValue || '';
    modalPrimaryLabel.textContent = detail.primaryLabel;

    if (typeof lucide !== 'undefined') lucide.createIcons();
  };

  const openService = (key, trigger = null, updateHistory = true) => {
    const detail = SERVICE_DETAILS[key];
    if (!detail) return;

    const matchingCard = document.getElementById(detail.anchor);
    lastTrigger = trigger?.closest('#servicesDropdown') ? matchingCard : (trigger || lastTrigger);
    closeDropdown();
    if (mainNav) mainNav.classList.remove('open');
    if (mobileToggle) mobileToggle.classList.remove('is-active');

    const nextHash = `#${detail.anchor}`;
    if (updateHistory && window.location.hash !== nextHash) {
      window.history.pushState({ service: key }, '', nextHash);
    }

    clearPendingOpen();
    populateDialog(key);

    const revealDialog = () => {
      clearPendingOpen();
      openingTimer = window.setTimeout(() => {
        if (!dialog.open) dialog.showModal();
        document.body.classList.add('service-modal-open');
        openingTimer = null;
      }, prefersReducedMotion ? 0 : 110);
    };

    const target = matchingCard;
    if (!target || prefersReducedMotion) {
      target?.scrollIntoView({ behavior: 'auto', block: 'center' });
      revealDialog();
      return;
    }

    const targetRect = target.getBoundingClientRect();
    const scrollDistance = Math.abs((targetRect.top + targetRect.height / 2) - window.innerHeight / 2);
    if (scrollDistance < 24) {
      revealDialog();
      return;
    }

    scrollEndHandler = revealDialog;
    window.addEventListener('scrollend', scrollEndHandler, { once: true });
    openingTimer = window.setTimeout(revealDialog, 1600);
    target.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  serviceLinks.forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      openService(link.dataset.serviceLink, link, true);
    });
  });

  closeButton?.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && dialog.open) {
      event.preventDefault();
      dialog.close();
    }
  });

  dialog.addEventListener('close', () => {
    document.body.classList.remove('service-modal-open');
    if (!preserveHashOnClose && SERVICE_DETAILS[dialog.dataset.service]) {
      window.history.replaceState({}, '', '#diensten');
    }
    preserveHashOnClose = false;
    lastTrigger?.focus({ preventScroll: true });
  });

  modalPrimary.addEventListener('click', (event) => {
    const href = modalPrimary.getAttribute('href');
    if (!href || !href.startsWith('#')) return;

    const target = document.querySelector(href);
    if (!target) return;

    event.preventDefault();
    const formValue = modalPrimary.dataset.formValue;
    const serviceSelect = document.getElementById('q-service');
    if (formValue && serviceSelect) serviceSelect.value = formValue;
    switchTab('quote');

    preserveHashOnClose = true;
    dialog.close();
    window.history.pushState({}, '', href);
    target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
  });

  window.addEventListener('hashchange', () => {
    const entry = findServiceEntryForHash();
    if (entry) {
      if (!dialog.open || dialog.dataset.service !== entry[0]) openService(entry[0], null, false);
    } else if (dialog.open) {
      preserveHashOnClose = true;
      dialog.close();
    }
  });

  const initialEntry = findServiceEntryForHash();
  if (initialEntry) requestAnimationFrame(() => openService(initialEntry[0], null, false));
}

function initQuoteShortcuts() {
  const serviceSelect = document.getElementById('q-service');

  document.querySelectorAll('[data-quote-service]').forEach(link => {
    link.addEventListener('click', () => {
      const service = link.dataset.quoteService;
      if (service && serviceSelect) serviceSelect.value = service;
      switchTab('quote');
    });
  });
}

// Scroll Reveal with anime.js
function initScrollReveal() {
  const revealElements = document.querySelectorAll(
    '.section-header, .emergency-card, .bento-card, .step-card, ' +
    '.review-card, .faq-item, .about-grid, .request-box-wrapper, ' +
    '.process-project-note, .payment-spread, ' +
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

// Vanta Topology hero: restore the original desktop effect without shipping its
// p5/Vanta runtime to mobile visitors. Keep this breakpoint aligned with CSS.
const VANTA_DESKTOP_QUERY = '(min-width: 769px) and (hover: hover) and (pointer: fine)';
const VANTA_P5_SRC = 'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.1.9/p5.min.js';
const VANTA_TOPOLOGY_SRC = 'https://cdn.jsdelivr.net/npm/vanta@0.5.24/dist/vanta.topology.min.js';

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

  // Vanta's shared base tries to initialize THREE even for p5-only effects.
  // Bypass that irrelevant step only while constructing Topology; never fake a
  // renderer, because its missing canvas caused the original desktop failure.
  if (originalInitThree) vantaBasePrototype.initThree = function() {};
  try {
    return window.VANTA.TOPOLOGY(options);
  } finally {
    if (originalInitThree) vantaBasePrototype.initThree = originalInitThree;
  }
}

function initVantaHero() {
  const heroEl = document.getElementById('home');
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
        el: '#home',
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0x00c875,
        backgroundColor: 0x050a15
      });

      const effectForHook = vantaEffect;
      window.setTimeout(() => {
        if (vantaEffect !== effectForHook || !effectForHook?.p5?.draw) return;

        const originalDraw = effectForHook.p5.draw;
        effectForHook.p5.draw = function() {
          effectForHook.p5.push();
          effectForHook.p5.resetMatrix();
          effectForHook.p5.noStroke();
          effectForHook.p5.fill(5, 10, 21, 10);
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
      // The solid hero background is the intentional resilient fallback.
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
