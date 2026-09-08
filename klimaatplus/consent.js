// BenTech Solutions — basic Consent Mode v2 for the linked Google Ads destination.
// Google tag GT-KDD6ZCX8 routes to the already-linked Ads destination AW-17549753857.
(function initMarketingConsent() {
  'use strict';

  const CONSENT_STORAGE_KEY = 'bentech_marketing_consent_v1';
  const GOOGLE_TAG_ID = 'GT-KDD6ZCX8';
  const PHONE_CONVERSION_DESTINATION = 'AW-17549753857/w1BTCIOH_-McEIH8r7BB';
  const CONSENT_GRANTED = 'granted';
  const CONSENT_DENIED = 'denied';

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() {
    window.dataLayer.push(arguments);
  };

  // The default must be queued before any Google config or event call.
  window.gtag('consent', 'default', {
    ad_storage: CONSENT_DENIED,
    analytics_storage: CONSENT_DENIED,
    ad_user_data: CONSENT_DENIED,
    ad_personalization: CONSENT_DENIED
  });

  let googleTagLoaded = false;
  let consentState = readStoredConsent();
  let returnFocusTarget = null;

  document.documentElement.dataset.marketingConsent = consentState || 'unset';
  document.documentElement.dataset.googleTag = 'blocked';

  if (consentState === CONSENT_GRANTED) {
    updateGoogleConsent(CONSENT_GRANTED);
    loadGoogleTag();
  }

  document.addEventListener('DOMContentLoaded', () => {
    const banner = document.getElementById('marketingConsentBanner');
    const acceptButton = document.getElementById('acceptMarketingConsent');
    const rejectButton = document.getElementById('rejectMarketingConsent');
    const manageButton = document.getElementById('manageMarketingConsent');

    if (!banner || !acceptButton || !rejectButton || !manageButton) return;

    const showBanner = (focusFirstAction) => {
      banner.hidden = false;
      if (focusFirstAction) rejectButton.focus();
    };

    const hideBanner = () => {
      banner.hidden = true;
      if (returnFocusTarget) returnFocusTarget.focus();
      returnFocusTarget = null;
    };

    acceptButton.addEventListener('click', () => {
      setConsent(CONSENT_GRANTED);
      hideBanner();
    });

    rejectButton.addEventListener('click', () => {
      const requiresCleanReload = googleTagLoaded;
      setConsent(CONSENT_DENIED);
      hideBanner();

      // Once loaded in this document, fully return to basic mode on a clean page load.
      if (requiresCleanReload) window.location.reload();
    });

    manageButton.addEventListener('click', () => {
      returnFocusTarget = manageButton;
      showBanner(true);
    });

    banner.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && consentState) hideBanner();
    });

    if (!consentState) showBanner(false);
  });

  // Track every current and future telephone link only after marketing consent.
  // Event delegation also covers the telephone CTA populated in the service dialog.
  document.addEventListener('click', (event) => {
    const phoneLink = event.target.closest?.('a[href^="tel:"]');
    if (!phoneLink || event.defaultPrevented || consentState !== CONSENT_GRANTED) return;

    const phoneUrl = phoneLink.href;
    let navigationStarted = false;
    const continueToPhone = () => {
      if (navigationStarted) return;
      navigationStarted = true;
      window.location.href = phoneUrl;
    };

    event.preventDefault();
    window.gtag('event', 'conversion', {
      send_to: PHONE_CONVERSION_DESTINATION,
      value: 1.0,
      currency: 'EUR',
      event_callback: continueToPhone
    });

    // Never leave a visitor waiting if Google is unavailable or blocked.
    window.setTimeout(continueToPhone, 1000);
  });

  function setConsent(nextState) {
    consentState = nextState;
    writeStoredConsent(nextState);
    document.documentElement.dataset.marketingConsent = nextState;
    updateGoogleConsent(nextState);

    if (nextState === CONSENT_GRANTED) loadGoogleTag();
  }

  function updateGoogleConsent(nextState) {
    window.gtag('consent', 'update', {
      ad_storage: nextState,
      analytics_storage: nextState,
      ad_user_data: nextState,
      ad_personalization: nextState
    });
  }

  function loadGoogleTag() {
    if (googleTagLoaded || document.querySelector('script[data-bentech-google-tag]')) return;

    googleTagLoaded = true;
    document.documentElement.dataset.googleTag = 'loading';

    const tagScript = document.createElement('script');
    tagScript.async = true;
    tagScript.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GOOGLE_TAG_ID)}`;
    tagScript.dataset.bentechGoogleTag = 'true';
    tagScript.addEventListener('load', () => {
      document.documentElement.dataset.googleTag = 'loaded';
    });
    tagScript.addEventListener('error', () => {
      googleTagLoaded = false;
      document.documentElement.dataset.googleTag = 'error';
      tagScript.remove();
    });

    document.head.appendChild(tagScript);
    window.gtag('js', new Date());
    window.gtag('config', GOOGLE_TAG_ID);
  }

  function getCookieDomain() {
    const hostname = window.location.hostname.toLowerCase();
    if (hostname === 'localhost' || hostname === '127.0.0.1' || !hostname.includes('.')) {
      return '';
    }
    if (hostname.endsWith('bentechsolutions.be')) {
      return '; Domain=.bentechsolutions.be';
    }
    if (hostname.endsWith('bentech-solutions.pages.dev')) {
      return '; Domain=.bentech-solutions.pages.dev';
    }
    const parts = hostname.split('.');
    if (parts.length >= 2) {
      return `; Domain=.${parts.slice(-2).join('.')}`;
    }
    return '';
  }

  function getCookie(name) {
    try {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) {
        return decodeURIComponent(parts.pop().split(';').shift());
      }
    } catch (e) {}
    return null;
  }

  function setCookie(name, value, days) {
    try {
      const domainPart = getCookieDomain();
      const maxAge = days * 24 * 60 * 60;
      const securePart = window.location.protocol === 'https:' ? '; Secure' : '';
      document.cookie = `${name}=${encodeURIComponent(value)}; Path=/; Max-Age=${maxAge}; SameSite=Lax${domainPart}${securePart}`;
    } catch (e) {}
  }

  function readStoredConsent() {
    try {
      // 1. Check shared cross-subdomain cookie first (.bentechsolutions.be)
      const cookieValue = getCookie(CONSENT_STORAGE_KEY);
      if (cookieValue === CONSENT_GRANTED || cookieValue === CONSENT_DENIED) {
        return cookieValue;
      }
      // 2. Check localStorage fallback (and migrate to shared cookie if present)
      const storedValue = window.localStorage.getItem(CONSENT_STORAGE_KEY);
      if (storedValue === CONSENT_GRANTED || storedValue === CONSENT_DENIED) {
        setCookie(CONSENT_STORAGE_KEY, storedValue, 365);
        return storedValue;
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  function writeStoredConsent(nextState) {
    try {
      // 1. Write shared cross-subdomain cookie (.bentechsolutions.be)
      setCookie(CONSENT_STORAGE_KEY, nextState, 365);
      // 2. Write localStorage fallback
      window.localStorage.setItem(CONSENT_STORAGE_KEY, nextState);
    } catch (error) {
      // Consent remains valid for this page view when storage is unavailable.
    }
  }
})();
