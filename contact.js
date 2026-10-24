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

  function requestText(form, service) {
    const lines = ['AANVRAAG BENTECH SOLUTIONS', '', `Dienst: ${service}`];
    for (const field of form.querySelectorAll('input:not([type="hidden"]), select, textarea')) {
      if (!field.name || field.name === 'service' || !field.value.trim()) continue;
      const label = form.querySelector(`label[for="${field.id}"]`)?.textContent.replace(/\s*\*\s*$/, '').trim() || field.name;
      lines.push(`${label}: ${field.value.trim()}`);
    }
    return lines.join('\n');
  }

  function requestStatus(form) {
    let status = form.querySelector('.form-handoff-status');
    if (!status) {
      status = document.createElement('div');
      status.className = 'form-handoff-status';
      status.setAttribute('role', 'status');
      status.tabIndex = -1;
      form.append(status);
    }
    return status;
  }

  function handoff(event, service) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const text = requestText(form, service);
    const whatsapp = `https://wa.me/32486328645?text=${encodeURIComponent(text)}`;
    const email = `mailto:info@bentechsolutions.be?subject=${encodeURIComponent(`Aanvraag: ${service}`)}&body=${encodeURIComponent(text)}`;
    const channel = event.submitter?.dataset.channel === 'email' ? 'email' : 'whatsapp';
    const status = requestStatus(form);
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
    status.focus();
    // This is a handoff, never a confirmed lead or sale. No personal data in events.
    const serviceNames = {
      'PLC-automatisering': 'plc', 'LOGO!-domotica': 'logo',
      'Troubleshooting PLC / LOGO!': 'troubleshooting'
    };
    document.dispatchEvent(new CustomEvent('bentech:contact-handoff', { detail: {
      channel, service: serviceNames[service] || 'algemeen', form_id: form.id
    } }));
    if (channel === 'email') window.location.href = email;
    else window.open(whatsapp, '_blank', 'noopener,noreferrer');
  }

  document.addEventListener('DOMContentLoaded', () => {
    window.initBenTechMobileMenu();
    const panel = document.getElementById('offerte');
    const form = document.getElementById('quoteForm');
    const select = document.getElementById('q-service');
    document.querySelectorAll('a[href="#offerte"]').forEach(link => {
      link.addEventListener('click', event => {
        if (!panel || !select) return;
        if (event.button || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        panel.open = true;
        if (link.dataset.serviceChoice) select.value = link.dataset.serviceChoice;
        if (window.location.hash !== '#offerte') history.pushState(null, '', '#offerte');
        const target = link.dataset.projectExample ? document.getElementById('q-details') : select;
        target?.focus({ preventScroll: true });
        target?.scrollIntoView({ behavior: 'instant', block: 'center' });
      });
    });
    form?.addEventListener('submit', event => handoff(event, select.value));
    document.getElementById('copyRequest')?.addEventListener('click', async () => {
      if (!form.reportValidity()) return;
      const text = requestText(form, select.value);
      const status = requestStatus(form);
      try {
        await navigator.clipboard.writeText(text);
        status.textContent = 'Aanvraag gekopieerd. Plak en verzend ze in uw e-mail of WhatsApp. BenTech heeft uw aanvraag nog niet ontvangen.';
        status.focus();
      } catch {
        status.textContent = 'Automatisch kopiëren lukt hier niet. Selecteer en kopieer uw aanvraag hieronder en verzend ze zelf. BenTech heeft uw aanvraag nog niet ontvangen.';
        const fallback = document.createElement('textarea');
        fallback.className = 'copy-fallback';
        fallback.readOnly = true;
        fallback.setAttribute('aria-label', 'Uw aanvraag om te kopiëren');
        fallback.value = text;
        status.append(fallback);
        fallback.focus();
        fallback.select();
      }
    });
    // Enable personal-data fields only after the no-network submit handler is bound.
    const fields = form?.querySelector('fieldset');
    if (fields) fields.disabled = false;
    if (window.location.hash === '#offerte' && panel) panel.open = true;
    const requested = new URLSearchParams(window.location.search).get('dienst');
    if (requested && select && Array.from(select.options).some(option => option.value === requested)) {
      select.value = requested;
      if (panel) panel.open = true;
    }
  });
})();
