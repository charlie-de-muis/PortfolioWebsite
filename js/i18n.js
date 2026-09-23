const scriptPath = document.currentScript.src;
const basePath = scriptPath.substring(0, scriptPath.lastIndexOf('/js/'));

async function loadLanguage(lang) {
  try {
    const response = await fetch(`${basePath}/lang/${lang}.json`);
    const translations = await response.json();

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[key]) {
        el.textContent = translations[key];
      }
    });

    document.querySelectorAll('.btn-lang').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    localStorage.setItem('preferredLang', lang);
    document.documentElement.lang = lang;

    document.dispatchEvent(new CustomEvent('languagechange', { detail: { lang } }));
  } catch (err) {
    console.error('Kon vertaling niet laden:', err);
  }
}

document.querySelectorAll('.btn-lang').forEach(btn => {
  btn.addEventListener('click', () => loadLanguage(btn.dataset.lang));
});

const savedLang = localStorage.getItem('preferredLang') || 'nl';
loadLanguage(savedLang);