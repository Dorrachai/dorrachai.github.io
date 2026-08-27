/**
 * Theme Management Module
 * Supports light / dark modes, system preference detection, and localStorage caching.
 */

(function () {
  const THEME_KEY = 'portfolio-theme-pref';
  const root = document.documentElement;

  function getPreferredTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme) {
      return savedTheme;
    }
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
    } else {
      root.removeAttribute('data-theme');
    }
    localStorage.setItem(THEME_KEY, theme);
  }

  // Apply immediately to prevent FOUC (flash of unstyled content)
  const initialTheme = getPreferredTheme();
  applyTheme(initialTheme);

  // Expose toggle function to window
  window.toggleTheme = function () {
    const currentTheme = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
  };

  // Listen for system theme changes if user hasn't explicitly set preference
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(THEME_KEY)) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    const themeToggles = document.querySelectorAll('.theme-toggle-btn');
    themeToggles.forEach((btn) => {
      btn.addEventListener('click', window.toggleTheme);
    });
  });
})();
