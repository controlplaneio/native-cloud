/*
 * Astro Starlight + GA4 with consent management.
 *
 * In astro.config.mjs:
 * head: [{
 *   tag: 'script',
 *   attrs: { src: '/scripts/ga-consent.js', defer: true }
 * }]
 */

(() => {
  const GA_ID = "G-SD4J5BB7YH";
  const CONSENT_KEY = "site-analytics-consent-v1";

  let consent = "unset";
  let gaLoaded = false;
  let lastPageView = "";

  try {
    consent = localStorage.getItem(CONSENT_KEY) || "unset";
  } catch {
    // Fail closed when consent storage is unavailable.
  }

  function saveConsent(value) {
    consent = value;

    try {
      if (value === "unset") {
        localStorage.removeItem(CONSENT_KEY);
      } else {
        localStorage.setItem(CONSENT_KEY, value);
      }
    } catch {
      // Without persistent consent, do not enable analytics.
      if (value === "accepted") consent = "unset";
    }

    if (consent === "accepted") {
      loadAnalytics();
      trackPageView();
    } else {
      lastPageView = "";

      if (typeof window.gtag === "function") {
        window.gtag("consent", "update", {
          analytics_storage: "denied",
        });
      }

      clearAnalyticsCookies();
    }

    renderUI();
  }

  function loadAnalytics() {
    if (consent !== "accepted" || gaLoaded) return;

    gaLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };

    window.gtag("js", new Date());
    window.gtag("config", GA_ID, {
      send_page_view: false,
    });

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;

    script.onerror = () => {
      gaLoaded = false;
    };

    document.head.appendChild(script);
  }

  function trackPageView() {
    if (consent !== "accepted" || typeof window.gtag !== "function") return;

    const url = window.location.href;
    if (url === lastPageView) return;

    lastPageView = url;

    window.gtag("event", "page_view", {
      page_title: document.title,
      page_location: url,
      page_path: location.pathname + location.search,
    });
  }

  function clearAnalyticsCookies() {
    const names = document.cookie
      .split(";")
      .map((cookie) => cookie.split("=")[0].trim())
      .filter((name) => name === "_ga" || name.startsWith("_ga_"));

    for (const name of names) {
      document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`;

      const parts = location.hostname.split(".");
      if (parts.length > 2) {
        document.cookie =
          `${name}=; Max-Age=0; path=/; domain=.` + `${parts.slice(-2).join(".")}; SameSite=Lax`;
      }
    }
  }

  function renderUI() {
    const banner = document.getElementById("analytics-consent");
    const settings = document.getElementById("analytics-settings");

    if (!banner || !settings) return;

    banner.hidden = consent !== "unset";

    const isPrivacyPage = window.location.pathname.replace(/\/+$/, "") === "/privacy";

    settings.hidden = consent === "unset" || !isPrivacyPage;
  }

  function initialize() {
    if (!document.getElementById("analytics-consent")) {
      const style = document.createElement("style");
      style.textContent = `
        #analytics-consent, #analytics-settings {
          position: fixed;
          z-index: 9999;
          font: inherit;
        }
        #analytics-consent {
          inset: auto 1rem 1rem;
          max-width: 64rem;
          margin: auto;
          padding: 1.25rem;
          border: 1px solid var(--sl-color-gray-5, #aaa);
          border-radius: .75rem;
          background: var(--sl-color-bg, #fff);
          color: var(--sl-color-text, #222);
          box-shadow: 0 4px 24px #0002;
          font-size: 12px;
        }
        #analytics-consent p { margin: .5rem 0 1rem; }
        #analytics-consent .actions {
          display: flex;
          flex-wrap: wrap;
          gap: .5rem;
        }
        #analytics-consent button, #analytics-settings {
          padding: .6rem .9rem;
          border: 1px solid var(--sl-color-gray-5, #888);
          border-radius: .4rem;
          background: var(--sl-color-bg, #fff);
          color: inherit;
          cursor: pointer;
        }
        #analytics-consent .accept {
          background: var(--sl-color-accent, #245fc7);
          color: white;
        }
        #analytics-settings { right: 1rem; bottom: 1rem; }
        #analytics-consent[hidden], #analytics-settings[hidden] {
          display: none;
        }
        #analytics-consent button:focus-visible,
        #analytics-settings:focus-visible {
          outline: 2px solid var(--sl-color-accent, #3578e5);
          outline-offset: 3px;
        }
      `;
      document.head.appendChild(style);

      const banner = document.createElement("section");
      banner.id = "analytics-consent";
      banner.setAttribute("role", "dialog");
      banner.setAttribute("aria-modal", "false");
      banner.setAttribute("aria-labelledby", "analytics-consent-title");
      banner.setAttribute("aria-describedby", "analytics-consent-description");

      banner.innerHTML = `
        <strong id="analytics-consent-title">Analytics cookies</strong>
        <p id="analytics-consent-description">
          We'd like to use Google Analytics to understand how visitors use the
          site and are optional. You can change your choice at any time.
          Read our <a href="/privacy/">privacy policy</a>.
        </p>
        <div class="actions">
          <button type="button" class="accept">Accept</button>
          <button type="button" class="reject">Reject</button>
        </div>
      `;

      const settings = document.createElement("button");
      settings.id = "analytics-settings";
      settings.type = "button";
      settings.textContent = "Cookie settings";

      banner.querySelector(".accept").addEventListener("click", () => {
        saveConsent("accepted");
      });

      banner.querySelector(".reject").addEventListener("click", () => {
        saveConsent("rejected");
      });

      settings.addEventListener("click", () => {
        saveConsent("unset");
        banner.querySelector(".accept").focus();
      });

      document.body.append(banner, settings);
    }

    renderUI();

    if (consent === "accepted") {
      loadAnalytics();
      trackPageView();
    }
  }

  document.addEventListener("astro:page-load", () => {
    initialize();
    trackPageView();
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, {
      once: true,
    });
  } else {
    initialize();
  }
})();
