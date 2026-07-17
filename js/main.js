/**
 * Application logic: language switching and rendering of localized content
 * into the static DOM skeleton defined in index.html.
 * No build step, no fetch() calls — everything runs directly on file://.
 */

const STORAGE_KEY_LANGUAGE = 'resumeSelectedLanguage';
const DEFAULT_LANGUAGE = 'ru';

let activeLanguageCode = DEFAULT_LANGUAGE;
let activeContent = contentRu;

function getContentForLanguage(languageCode) {
  return languageCode === 'en' ? contentEn : contentRu;
}

function getStoredLanguage() {
  return localStorage.getItem(STORAGE_KEY_LANGUAGE);
}

function applyLanguage(languageCode) {
  activeLanguageCode = languageCode;
  activeContent = getContentForLanguage(languageCode);
  document.documentElement.setAttribute('lang', languageCode);
  localStorage.setItem(STORAGE_KEY_LANGUAGE, languageCode);

  renderContent(activeContent);
  updateLanguageButtons(languageCode);
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
  document.getElementById('about-text').textContent = content.about.text;

  renderContactList(document.getElementById('contact-list'), content.hero.contacts);
  renderContactList(document.getElementById('footer-contact-list'), content.hero.contacts);

  document.getElementById('skills-section').setAttribute('aria-label', content.skills.title);
  renderSkills(content.skills.rows);

  document.getElementById('experience-section').setAttribute('aria-label', content.experience.title);
  renderTimeline(content.experience.jobs, content.education);

  document.getElementById('roadmap-section').setAttribute('aria-label', content.roadmap.title);
  renderRoadmap(content.roadmap.groups);

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

function renderSkills(skillRows) {
  const skillsGrid = document.getElementById('skills-grid');
  skillsGrid.innerHTML = '';
  skillRows.forEach(function (rowItems) {
    const skillsRow = document.createElement('div');
    skillsRow.className = 'skills-row';
    rowItems.forEach(function (skill) {
      const skillCard = document.createElement('div');
      skillCard.className = 'skill-card';
      skillCard.innerHTML =
        '<span class="skill-icon">' + iconMarkup[skill.id] + '</span>' +
        '<span class="skill-name">' + skill.name + '</span>';
      skillsRow.appendChild(skillCard);
    });
    skillsGrid.appendChild(skillsRow);
  });
}

function renderTimeline(jobs, education) {
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

  const educationItem = document.createElement('li');
  educationItem.className = 'timeline-item';
  educationItem.innerHTML =
    '<div class="timeline-marker" aria-hidden="true"></div>' +
    '<div class="timeline-content">' +
    '<p class="timeline-period">' + education.period + '</p>' +
    '<h3 class="timeline-company">' + education.institution + '</h3>' +
    '<p class="timeline-role">' + education.degree + '</p>' +
    '<ul class="timeline-points"><li>' + education.description + '</li></ul>' +
    '</div>';

  timeline.appendChild(educationItem);
}

function renderRoadmap(roadmapGroups) {
  const roadmap = document.getElementById('roadmap-groups');
  roadmap.innerHTML = '';
  roadmapGroups.forEach(function (group) {
    const groupElement = document.createElement('div');
    groupElement.className = 'roadmap-group';

    const nodesMarkup = group.items
      .map(function (item) {
        const iconSvg = iconMarkup[item.id];
        const iconHtml = iconSvg ? '<span class="roadmap-node-icon">' + iconSvg + '</span>' : '';
        return '<li class="roadmap-node">' + iconHtml + '<span class="roadmap-node-name">' + item.name + '</span></li>';
      })
      .join('');

    groupElement.innerHTML =
      '<div class="roadmap-group-marker" aria-hidden="true"></div>' +
      '<h3 class="roadmap-group-title">' + group.name + '</h3>' +
      '<ul class="roadmap-nodes">' + nodesMarkup + '</ul>';

    roadmap.appendChild(groupElement);
  });
}

function initializeEventListeners() {
  document.getElementById('language-button-ru').addEventListener('click', function () { applyLanguage('ru'); });
  document.getElementById('language-button-en').addEventListener('click', function () { applyLanguage('en'); });
}

function initialize() {
  const storedLanguage = getStoredLanguage() || DEFAULT_LANGUAGE;

  applyLanguage(storedLanguage);
  initializeEventListeners();
}

document.addEventListener('DOMContentLoaded', initialize);
