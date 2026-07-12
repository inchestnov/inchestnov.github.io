/**
 * Application logic: language switching, theme switching and rendering of
 * localized content into the static DOM skeleton defined in index.html.
 * No build step, no fetch() calls — everything runs directly on file://.
 */

const STORAGE_KEY_LANGUAGE = 'resumeSelectedLanguage';
const STORAGE_KEY_THEME = 'resumeSelectedTheme';
const DEFAULT_LANGUAGE = 'ru';
const DEFAULT_THEME = 'dark';

let activeLanguageCode = DEFAULT_LANGUAGE;
let activeContent = contentRu;

function getContentForLanguage(languageCode) {
  return languageCode === 'en' ? contentEn : contentRu;
}

function getStoredLanguage() {
  return localStorage.getItem(STORAGE_KEY_LANGUAGE);
}

function getStoredTheme() {
  return localStorage.getItem(STORAGE_KEY_THEME);
}

function applyTheme(themeName) {
  document.documentElement.setAttribute('data-theme', themeName);
  localStorage.setItem(STORAGE_KEY_THEME, themeName);
  updateThemeToggleButton();
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
}

function updateThemeToggleButton() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const themeToggleButton = document.getElementById('theme-toggle-button');
  const themeToggleIcon = document.getElementById('theme-toggle-icon');
  const isDark = currentTheme === 'dark';

  themeToggleButton.setAttribute('aria-pressed', String(isDark));
  themeToggleButton.setAttribute(
    'aria-label',
    isDark ? activeContent.themeToggle.switchToLight : activeContent.themeToggle.switchToDark
  );
  themeToggleButton.title = themeToggleButton.getAttribute('aria-label');
  themeToggleIcon.innerHTML = isDark ? iconMarkup.sun : iconMarkup.moon;
}

function applyLanguage(languageCode) {
  activeLanguageCode = languageCode;
  activeContent = getContentForLanguage(languageCode);
  document.documentElement.setAttribute('lang', languageCode);
  localStorage.setItem(STORAGE_KEY_LANGUAGE, languageCode);

  renderContent(activeContent);
  updateLanguageButtons(languageCode);
  updateThemeToggleButton();
}

function updateLanguageButtons(activeCode) {
  document.getElementById('language-button-ru').setAttribute('aria-pressed', String(activeCode === 'ru'));
  document.getElementById('language-button-en').setAttribute('aria-pressed', String(activeCode === 'en'));
  document.getElementById('language-switcher').setAttribute('aria-label', activeContent.languageSwitcher.ariaLabel);
}

function renderContent(content) {
  document.title = content.meta.pageTitle;
  document.getElementById('page-title').textContent = content.meta.pageTitle;

  document.getElementById('hero-name').textContent = content.hero.name;
  document.getElementById('hero-role').textContent = content.hero.role;
  document.getElementById('hero-avatar-image').setAttribute('alt', content.hero.avatarAlt);

  renderContactList(document.getElementById('contact-list'), content.hero.contacts);
  renderContactList(document.getElementById('footer-contact-list'), content.hero.contacts);

  document.getElementById('about-title').textContent = content.about.title;
  document.getElementById('about-text').textContent = content.about.text;

  document.getElementById('skills-title').textContent = content.skills.title;
  renderSkills(content.skills.items);

  document.getElementById('experience-title').textContent = content.experience.title;
  renderExperience(content.experience.jobs);

  document.getElementById('education-title').textContent = content.education.title;
  renderEducation(content.education);

  document.getElementById('languages-title').textContent = content.languages.title;
  renderLanguages(content.languages.items);

  document.getElementById('footer-copyright').textContent =
    content.footer.copyrightText.replace('{year}', String(new Date().getFullYear()));
}

function renderContactList(listElement, contacts) {
  listElement.innerHTML = '';
  Object.keys(contacts).forEach(function (contactKey) {
    const contact = contacts[contactKey];
    const listItem = document.createElement('li');
    listItem.className = 'contact-item';

    const link = document.createElement('a');
    link.className = 'contact-link';
    link.href = contact.href;
    link.setAttribute('aria-label', contact.label);
    if (contact.href.indexOf('http') === 0) {
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    }
    link.innerHTML =
      '<span class="contact-icon">' + iconMarkup[contactKey] + '</span>' +
      '<span class="contact-value">' + contact.value + '</span>';

    listItem.appendChild(link);
    listElement.appendChild(listItem);
  });
}

function renderSkills(skillItems) {
  const skillsGrid = document.getElementById('skills-grid');
  skillsGrid.innerHTML = '';
  skillItems.forEach(function (skill) {
    const skillCard = document.createElement('div');
    skillCard.className = 'skill-card';
    skillCard.innerHTML =
      '<span class="skill-icon">' + iconMarkup[skill.id] + '</span>' +
      '<span class="skill-name">' + skill.name + '</span>';
    skillsGrid.appendChild(skillCard);
  });
}

function renderExperience(jobs) {
  const timeline = document.getElementById('experience-timeline');
  timeline.innerHTML = '';
  jobs.forEach(function (job) {
    const timelineItem = document.createElement('li');
    timelineItem.className = 'timeline-item';

    const pointsMarkup = job.points
      .map(function (point) { return '<li>' + point + '</li>'; })
      .join('');

    timelineItem.innerHTML =
      '<div class="timeline-marker" aria-hidden="true"></div>' +
      '<div class="timeline-content">' +
      '<p class="timeline-period">' + job.period + '</p>' +
      '<h3 class="timeline-company">' + job.company + '</h3>' +
      '<p class="timeline-role">' + job.role + '</p>' +
      '<ul class="timeline-points">' + pointsMarkup + '</ul>' +
      '</div>';

    timeline.appendChild(timelineItem);
  });
}

function renderEducation(education) {
  const timeline = document.getElementById('education-timeline');
  timeline.innerHTML = '';

  const timelineItem = document.createElement('li');
  timelineItem.className = 'timeline-item';
  timelineItem.innerHTML =
    '<div class="timeline-marker" aria-hidden="true"></div>' +
    '<div class="timeline-content">' +
    '<p class="timeline-period">' + education.period + '</p>' +
    '<h3 class="timeline-company">' + education.institution + '</h3>' +
    '<p class="timeline-role">' + education.degree + '</p>' +
    '<ul class="timeline-points"><li>' + education.description + '</li></ul>' +
    '</div>';

  timeline.appendChild(timelineItem);
}

function renderLanguages(languageItems) {
  const languagesList = document.getElementById('languages-list');
  languagesList.innerHTML = '';
  languageItems.forEach(function (languageItem) {
    const listItem = document.createElement('li');
    listItem.className = 'language-item';
    listItem.innerHTML =
      '<span class="language-name">' + languageItem.name + '</span>' +
      '<span class="language-level">' + languageItem.level + '</span>';
    languagesList.appendChild(listItem);
  });
}

function initializeEventListeners() {
  document.getElementById('theme-toggle-button').addEventListener('click', toggleTheme);
  document.getElementById('language-button-ru').addEventListener('click', function () { applyLanguage('ru'); });
  document.getElementById('language-button-en').addEventListener('click', function () { applyLanguage('en'); });
}

function initialize() {
  const storedTheme = getStoredTheme() || DEFAULT_THEME;
  const storedLanguage = getStoredLanguage() || DEFAULT_LANGUAGE;

  applyTheme(storedTheme);
  applyLanguage(storedLanguage);
  initializeEventListeners();
}

document.addEventListener('DOMContentLoaded', initialize);
