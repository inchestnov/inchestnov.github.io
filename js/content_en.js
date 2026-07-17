/**
 * English localization content.
 * Loaded as a plain script (not fetched as JSON) so the site keeps working
 * when opened directly via file:// without triggering CORS restrictions.
 */
const contentEn = {
  meta: {
    pageTitle: 'Igor Chestnov — Software Engineer | Resume'
  },
  hero: {
    name: 'Igor Chestnov',
    role: 'Software Engineer',
    avatarAlt: 'Profile avatar placeholder',
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
    ariaLabel: 'Language switcher'
  },
  skills: {
    title: 'Key Skills',
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
    title: 'Work Experience',
    jobs: [
      {
        company: 'Ozon Fintech',
        role: 'Principal Software Engineer',
        period: 'December 2023 — Present',
        points: [
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
          'Nisi ut aliquip ex ea commodo consequat duis aute irure dolor.'
        ]
      },
      {
        company: 'Moscow Exchange (MOEX)',
        role: 'Senior Java Developer',
        period: 'October 2021 — December 2023',
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
        period: 'January 2020 — October 2021',
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
    period: 'September 2015 — June 2020',
    institution: 'Samara University',
    degree: 'Fundamental Mathematics and Mechanics',
    description: 'Ligula eu tempor congue eros est euismod turpis id tincidunt sapien risus.'
  },
  roadmap: {
    title: 'Technology Stack',
    groups: [
      {
        name: 'Languages',
        items: [
          { id: 'java', name: 'Java' },
          { id: 'go', name: 'Go' },
          { id: 'python', name: 'Python' }
        ]
      },
      {
        name: 'Tools',
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
        name: 'Deploy',
        items: [
          { id: 'docker', name: 'Docker' },
          { id: 'kubernetes', name: 'Kubernetes' },
          { id: 'gitlab', name: 'GitLab' },
          { id: 'github', name: 'GitHub' },
          { id: 'linux', name: 'Linux' }
        ]
      },
      {
        name: 'Databases',
        items: [
          { id: 'postgresql', name: 'PostgreSQL' },
          { id: 'kafka', name: 'Kafka' },
          { id: 'activemq', name: 'Apache ActiveMQ' }
        ]
      }
    ]
  },
  footer: {
    copyrightText: '© {year} Igor Chestnov. All rights reserved.'
  }
};
