/**
 * Russian (default) localization content.
 * Loaded as a plain script (not fetched as JSON) so the site keeps working
 * when opened directly via file:// without triggering CORS restrictions.
 */
const contentRu = {
  meta: {
    pageTitle: 'Игорь Честнов — Software Engineer | Резюме'
  },
  hero: {
    name: 'Игорь Честнов',
    role: 'Software Engineer',
    avatarAlt: 'Аватар-заглушка профиля',
    contacts: {
      telegram: {
        label: 'Telegram',
        value: 'inchestnov',
        href: 'https://t.me/inchestnov'
      },
      linkedin: {
        label: 'LinkedIn',
        value: 'igor-chestnov',
        href: 'https://linkedin.com/in/igor-chestnov'
      },
      github: {
        label: 'GitHub',
        value: 'inchestnov',
        href: 'https://github.com/inchestnov'
      },
      email: {
        label: 'Email',
        value: 'inchestnov@gmail.com',
        href: 'mailto:inchestnov@gmail.com'
      }
    }
  },
  languageSwitcher: {
    ariaLabel: 'Переключатель языка'
  },
  skills: {
    title: 'Ключевые навыки',
    rows: [
      [
        { id: 'go', name: 'Go' },
        { id: 'java', name: 'Java' }
      ],
      [
        { id: 'postgresql', name: 'PostgreSQL' },
        { id: 'kafka', name: 'Kafka' },
        { id: 'kubernetes', name: 'Kubernetes' }
      ]
    ]
  },
  about: {
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
  },
  experience: {
    title: 'Опыт работы',
    jobs: [
      {
        company: 'Ozon Fintech',
        role: 'Principal Software Engineer',
        period: 'Декабрь 2023 — настоящее время',
        points: [
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
          'Nisi ut aliquip ex ea commodo consequat duis aute irure dolor.'
        ]
      },
      {
        company: 'Московская Биржа (MOEX)',
        role: 'Senior Java Developer',
        period: 'Октябрь 2021 — Декабрь 2023',
        points: [
          'In reprehenderit in voluptate velit esse cillum dolore eu fugiat.',
          'Nulla pariatur excepteur sint occaecat cupidatat non proident.',
          'Sunt in culpa qui officia deserunt mollit anim id est laborum.',
          'Curabitur pretium tincidunt lacus nulla gravida orci a odio.'
        ]
      },
      {
        company: 'Haulmont',
        role: 'Java Developer',
        period: 'Январь 2020 — Октябрь 2021',
        points: [
          'Nullam varius turpis et commodo pharetra est eros bibendum elit.',
          'Nec luctus magna felis sollicitudin mauris integer in mauris.',
          'Eu nibh euismod gravida duis ac tellus et risus vulputate.',
          'Vehicula donec lobortis risus a elit etiam tempor ut ullamcorper.'
        ]
      }
    ]
  },
  education: {
    period: 'сентябрь 2015 — июнь 2020',
    institution: 'Самарский университет',
    degree: 'Фундаментальная математика и механика',
    description: 'Ligula eu tempor congue eros est euismod turpis id tincidunt sapien risus.'
  },
  roadmap: {
    title: 'Технологии',
    groups: [
      {
        name: 'Языки',
        items: [
          { id: 'java', name: 'Java' },
          { id: 'go', name: 'Go' },
          { id: 'python', name: 'Python' }
        ]
      },
      {
        name: 'Инструменты',
        items: [
          { id: 'spring', name: 'Spring' },
          { id: 'spring-boot', name: 'Spring Boot' },
          { id: 'maven', name: 'Maven' },
          { id: 'gradle', name: 'Gradle' },
          { id: 'git', name: 'Git' },
          { id: 'vim', name: 'Vim' },
          { id: 'claude-code', name: 'Claude Code' }
        ]
      },
      {
        name: 'Деплой',
        items: [
          { id: 'docker', name: 'Docker' },
          { id: 'kubernetes', name: 'Kubernetes' },
          { id: 'gitlab', name: 'GitLab' },
          { id: 'github', name: 'GitHub' },
          { id: 'linux', name: 'Linux' }
        ]
      },
      {
        name: 'Базы',
        items: [
          { id: 'postgresql', name: 'PostgreSQL' },
          { id: 'kafka', name: 'Kafka' },
          { id: 'activemq', name: 'Apache ActiveMQ' }
        ]
      }
    ]
  },
  footer: {
    copyrightText: '© {year} Игорь Честнов. Все права защищены.'
  }
};
