const root = document.documentElement;
const themeButton = document.querySelector('.theme-toggle');
const themeLabel = document.querySelector('.theme-label');
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-nav');
const colorPreference = window.matchMedia('(prefers-color-scheme: dark)');
const themeStorageKey = 'ava-watson-portfolio-theme';

function getSavedTheme() {
  try {
    const savedTheme = window.localStorage.getItem(themeStorageKey);
    return savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : null;
  } catch {
    return null;
  }
}

function activeTheme() {
  return root.dataset.theme || (colorPreference.matches ? 'dark' : 'light');
}

function updateThemeButton() {
  const isDark = activeTheme() === 'dark';
  themeButton.setAttribute('aria-pressed', String(isDark));
  themeButton.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
  themeLabel.textContent = isDark ? 'Light mode' : 'Dark mode';
}

const savedTheme = getSavedTheme();
if (savedTheme) root.dataset.theme = savedTheme;
updateThemeButton();

themeButton.addEventListener('click', () => {
  const nextTheme = activeTheme() === 'dark' ? 'light' : 'dark';
  root.dataset.theme = nextTheme;
  try {
    window.localStorage.setItem(themeStorageKey, nextTheme);
  } catch {
    // The chosen theme still applies for this visit if storage is unavailable.
  }
  updateThemeButton();
});

function closeNavigation() {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation menu');
  navigation.classList.remove('is-open');
}

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Open navigation menu' : 'Close navigation menu');
  navigation.classList.toggle('is-open', !isOpen);
});

navigation.addEventListener('click', (event) => {
  if (event.target.closest('a')) closeNavigation();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    closeNavigation();
    menuButton.focus();
  }
});

colorPreference.addEventListener?.('change', () => {
  if (!getSavedTheme()) updateThemeButton();
});

document.querySelector('#current-year').textContent = String(new Date().getFullYear());
