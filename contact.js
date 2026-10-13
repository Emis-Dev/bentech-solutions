// Shared navigation and contact handoff. No request is stored or sent by this site.
(function () {
  'use strict';

  window.initBenTechMobileMenu = function () {
    const toggle = document.getElementById('mobileToggle');
    const nav = document.getElementById('mainNav');
    if (!toggle || !nav || toggle.dataset.initialized) return;
    toggle.dataset.initialized = 'true';
    toggle.setAttribute('aria-controls', 'mainNav');
    toggle.setAttribute('aria-expanded', 'false');
    const setOpen = (open, restoreFocus = false) => {
      nav.classList.toggle('open', open);
      toggle.classList.toggle('is-active', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Menu sluiten' : 'Menu openen');
      if (restoreFocus) toggle.focus();
    };
    toggle.addEventListener('click', () => setOpen(!nav.classList.contains('open')));
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setOpen(false)));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && nav.classList.contains('open')) setOpen(false, true);
    });
    document.addEventListener('click', event => {
      if (!nav.contains(event.target) && !toggle.contains(event.target)) setOpen(false);
    });
    window.matchMedia('(min-width: 993px)').addEventListener('change', event => {
      if (event.matches) setOpen(false);
    });
  };

  function handoff(event, service) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const lines = ['AANVRAAG BENTECH SOLUTIONS', '', `Dienst: ${service}`];
    for (const field of form.querySelectorAll('input:not([type="hidden"]), select, textarea')) {
      if (!field.name || !field.value.trim()) continue;
      const label = form.querySelector(`label[for="${field.id}"]`)?.textContent.replace(/\s*\*\s*$/, '').trim() || field.name;
      lines.push(`${label}: ${field.value.trim()}`);
    }
    const text = lines.join('\n');
    const whatsapp = `https://wa.me/32486328645?text=${encodeURIComponent(text)}`;
    const email = `mailto:info@bentechsolutions.be?subject=${encodeURIComponent(`Aanvraag: ${service}`)}&body=${encodeURIComponent(text)}`;
    const channel = event.submitter?.dataset.channel === 'email' ? 'email' : 'whatsapp';
    let status = form.querySelector('.form-handoff-status');
    if (!status) {
      status = document.createElement('div');
      status.className = 'form-handoff-status';
      status.setAttribute('role', 'status');
      status.tabIndex = -1;
      form.append(status);
    }
    const retry = document.createElement('a');
    retry.href = channel === 'email' ? email : whatsapp;
    if (channel === 'whatsapp') {
      retry.target = '_blank';
      retry.rel = 'noopener noreferrer';
    }
    retry.textContent = channel === 'email' ? 'Open uw e-mail opnieuw' : 'Open WhatsApp opnieuw';
    const fallback = document.createElement('a');
    fallback.href = channel === 'email' ? whatsapp : email;
    if (channel === 'email') {
      fallback.target = '_blank';
      fallback.rel = 'noopener noreferrer';
    }
    fallback.textContent = channel === 'email' ? 'Gebruik WhatsApp' : 'Gebruik e-mail';
    status.replaceChildren(
      `Uw bericht staat klaar. Controleer het in ${channel === 'email' ? 'uw mailprogramma' : 'WhatsApp'} en druk daar op verzenden. BenTech heeft uw aanvraag nog niet ontvangen. `,
      retry, ' of ', fallback, '. Lukt het niet? Bel +32 486 32 86 45.'
    );
    status.focus({ preventScroll: true });
    // This is a handoff, never a confirmed lead or sale. No personal data in events.
    const serviceNames = {
      'Laadpaal': 'laadpalen', 'Thuisbatterij': 'thuisbatterijen',
      'Zonnepanelen': 'zonnepanelen', 'Volledige elektriciteitsinstallatie': 'elektrische-installaties',
      'Dringende depannage / stroompanne': 'depannage',
      'Zekeringkast vernieuwen / AREI Keuring': 'zekeringkast',
      'Elektrische herstellingen': 'herstellingen',
      'Airconditioning / warmtepomp': 'airconditioning', 'Energie-totaalproject': 'totaalproject'
    };
    document.dispatchEvent(new CustomEvent('bentech:contact-handoff', { detail: {
      channel, service: form.dataset.service || document.body.dataset.service || serviceNames[service] || 'algemeen', form_id: form.id
    } }));
    if (channel === 'email') window.location.href = email;
    else window.open(whatsapp, '_blank', 'noopener,noreferrer');
  }

  window.handleBrandFormSubmit = (event, brand) => handoff(event, brand);
  window.handleFormSubmit = (event, type) => handoff(event,
    type === 'spoed' ? 'Elektrische depannage' : document.getElementById('q-service').value);

  document.addEventListener('DOMContentLoaded', () => {
    window.initBenTechMobileMenu();
    if (window.lucide) window.lucide.createIcons();
    const requested = new URLSearchParams(window.location.search).get('dienst');
    const select = document.getElementById('q-service');
    if (requested && select && Array.from(select.options).some(option => option.value === requested)) {
      select.value = requested;
      if (typeof window.switchTab === 'function') window.switchTab('quote');
    }
  });
})();
