const originalTexts = {};

// Store originals once DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (key && !(key in originalTexts)) {
      originalTexts[key] = el.innerHTML;
    }
  });
});

function getFilenameWithoutExtension(path) {
  // Get last part of path after last slash
  const lastSegment = path.substring(path.lastIndexOf('/') + 1);

  if (!lastSegment) {
    // Path ends with '/' (homepage or folder)
    return 'index';
  }

  // Find last dot index in last segment
  const lastDotIndex = lastSegment.lastIndexOf('.');

  if (lastDotIndex === -1) {
    // No extension found, return whole segment
    return lastSegment;
  }

  // Return filename without extension
  return lastSegment.substring(0, lastDotIndex);
}


i18next
  .use(i18nextHttpBackend)
  .use(i18nextBrowserLanguageDetector)
  .init({
    fallbackLng: null,
    debug: false,
    whitelist: ['en', 'pt', 'pt-br'],
    load: 'languageOnly',
    backend: {
        loadPath: function(lngs, namespaces) {
          // Get current HTML filename, e.g., 'page.html'
          const path = window.location.pathname;
          const filename = getFilenameWithoutExtension(path);

          // Map language similarly, including your pt/pt-br to br mapping
          const lng = Array.isArray(lngs) ? lngs[0] : lngs;
          if (typeof lng !== 'string') return '';
          const language = lng.toLowerCase();

          // Map all Portuguese-speaking countries to 'br'
          const portugueseLanguages = ['pt', 'pt-br', 'pt-pt', 'pt-ao', 'pt-mz', 'pt-gw', 'pt-tl', 'pt-gq', 'pt-st'];
          const lang = portugueseLanguages.includes(language) ? 'br' : language;

          if (lang === 'en') {
            return '';
          }

          return `lang/${lang}/${filename}.json`;
        }
    },
    detection: {
      order: ['localStorage', 'cookie', 'navigator', 'querystring', 'htmlTag'],
      caches: ['localStorage', 'cookie']
    }
  }, function(err, t) {
    if (i18next.language && i18next.language !== 'en') {
      updateContent();
    }
  });

function normalizeLangCode(lng) {
  if (!lng) return 'en';
  const portugueseLanguages = ['pt', 'pt-br', 'pt-pt', 'pt-ao', 'pt-mz', 'pt-gw', 'pt-tl', 'pt-gq', 'pt-st'];
  const lowerLng = lng.toLowerCase();
  return portugueseLanguages.includes(lowerLng) ? 'pt' : 'en';
}


function updateContent() {
  const currentLang = i18next.language || 'en';
  const normLang = normalizeLangCode(currentLang);
  
  // Update displayed language code in button
  const languageCurrent = document.getElementById('language-current');
  if (languageCurrent) {
    languageCurrent.textContent = normLang;
  }

  // Update translations or restore original text
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (!key) return;

    if (normLang === 'en') {
      if (key in originalTexts) {
        el.innerHTML = originalTexts[key];
      }
    } else {
      const translation = i18next.t(key);
      if (translation !== key) {
        el.innerHTML = translation;
      }
    }
  });

  document.documentElement.lang = currentLang;
}


const languageButton = document.getElementById('language-button');
const languageDropdown = document.getElementById('language-dropdown');
const languageCurrent = document.getElementById('language-current');

// Toggle the dropdown menu visibility
languageButton.addEventListener('click', () => {
  const expanded = languageButton.getAttribute('aria-expanded') === 'true';
  languageButton.setAttribute('aria-expanded', String(!expanded));
  languageDropdown.style.display = expanded ? 'none' : 'block';
});

// Click on a language option
languageDropdown.querySelectorAll('li').forEach(li => {
  li.addEventListener('click', () => {
    const selectedLang = li.getAttribute('data-lang');
    languageCurrent.textContent = selectedLang;
    i18next.changeLanguage(selectedLang, () => {
      updateContent();
    });
    languageDropdown.style.display = 'none';
    languageButton.setAttribute('aria-expanded', 'false');
  });

  // Handle keyboard selection for accessibility
  li.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      li.click();
    }
  });
});

// Close dropdown if clicked outside
document.addEventListener('click', (event) => {
  if (!document.getElementById('language-menu').contains(event.target)) {
    languageDropdown.style.display = 'none';
    languageButton.setAttribute('aria-expanded', 'false');
  }
});

// Initialize current language on page load
document.addEventListener('DOMContentLoaded', () => {
  const lang = i18next.language || 'en';
  languageCurrent.textContent = (lang === 'pt-br' || lang === 'pt') ? 'pt' : 'en';
});
