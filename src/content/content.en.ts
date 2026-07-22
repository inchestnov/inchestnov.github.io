import type { ResumeContent } from '../types';

export const contentEn: ResumeContent = {
  meta: {
    pageTitle: 'Igor Chestnov | Resume'
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
        value: 'inchestnov',
        href: 'https://www.linkedin.com/in/inchestnov/'
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
    text: 'Software engineer with experience building complex software systems. Focused on solving non-trivial engineering problems, designing architecture, and delivering high-quality software. Not tied to any single programming language or domain — technology choices are driven by the requirements of the task at hand. I have experience designing and building high-load distributed systems, with particular attention to fault tolerance, scalability, observability, and maintainability. I aim to build services that are easy to evolve, operate, and monitor in production.'
  },
  experience: {
    title: 'Work Experience',
    jobs: [
      {
        company: 'Ozon Bank',
        role: 'Software Engineer (Go Developer)',
        period: 'December 2023 — Present',
        startDate: '2023-12',
        endDate: null,
        points: [
          'Develop services for processing, storing, and accessing card data.',
          'Design reliable systems for the secure storage of cryptographic data.',
          "Evolve the bank's core processing services responsible for security and card operation handling.",
          'Ensure the correct application of payment system rules.',
          'Responsible for bank card issuance functionality.'
        ],
        technologies: [
          { id: 'go', name: 'Go' },
          { id: 'postgresql', name: 'PostgreSQL' },
          { id: 'kafka', name: 'Kafka' },
          { id: 'kubernetes', name: 'Kubernetes' }
        ],
        icon: 'ozon-bank'
      },
      {
        company: 'Moscow Exchange (MOEX)',
        role: 'Java Developer',
        period: 'October 2021 — December 2023',
        startDate: '2021-10',
        endDate: '2023-12',
        points: [
          'Decomposed a monolithic application into independent microservices.',
          'Was responsible for storing client data and controlling access to it.',
          'Participated in refactoring the existing architecture to improve maintainability.',
          'Built integration solutions for communication between components of the distributed system.'
        ],
        technologies: [
          { id: 'java', name: 'Java' },
          { id: 'spring', name: 'Spring' },
          { id: 'spring-boot', name: 'Spring Boot' },
          { id: 'postgresql', name: 'PostgreSQL' }
        ],
        icon: 'moex'
      },
      {
        company: 'Haulmont',
        role: 'Java Developer',
        period: 'January 2020 — October 2021',
        startDate: '2020-01',
        endDate: '2021-10',
        points: [
          'Developed functionality for the TESSA platform based on customer requirements.',
          "Participated in the development and maintenance of the product's off-the-shelf version as part of the core team.",
          'Designed and implemented server-side business logic in Java and Spring Framework.',
          'Enhanced existing modules of the document management and business process automation system.',
          'Participated in team development and maintenance of the corporate platform.'
        ],
        technologies: [
          { id: 'java', name: 'Java' },
          { id: 'spring', name: 'Spring' },
          { id: 'spring-boot', name: 'Spring Boot' },
          { id: 'postgresql', name: 'PostgreSQL' }
        ],
        icon: 'haulmont'
      }
    ]
  },
  education: {
    period: 'September 2015 — June 2020',
    institution: 'Samara University',
    degree: 'Fundamental Mathematics and Mechanics',
    description: [
      'Conducted research in group theory, focusing on triangle groups and their supercharacters.',
      'Wrote and defended a thesis on the characters of the 4th-order triangle group.'
    ],
    icon: 'samara-university',
    dividerLabel: 'Education'
  },
  roadmap: {
    title: 'Technology Stack',
    groups: [
      {
        name: 'Languages',
        items: [
          { id: 'go', name: 'Go' },
          { id: 'java', name: 'Java' },
          { id: 'python', name: 'Python' }
        ]
      },
      {
        name: 'Tools',
        items: [
          { id: 'spring', name: 'Spring' },
          { id: 'spring-boot', name: 'Spring Boot' },
          { id: 'git', name: 'Git' },
          { id: 'claude-code', name: 'Claude Code' }
        ]
      },
      {
        name: 'Deploy',
        items: [
          { id: 'docker', name: 'Docker' },
          { id: 'kubernetes', name: 'Kubernetes' },
          { id: 'helm', name: 'Helm' },
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
          { id: 'activemq', name: 'Apache ActiveMQ' },
          { id: 'clickhouse', name: 'ClickHouse' }
        ]
      },
      {
        name: 'Protocols',
        items: [
          { id: 'tcp-ip', name: 'TCP/IP' },
          { id: 'http', name: 'HTTP' },
          { id: 'grpc', name: 'gRPC' },
          { id: 'oauth2', name: 'OAuth 2.0' },
          { id: 'jwt', name: 'JWT' }
        ]
      },
      {
        name: 'Monitoring',
        items: [
          { id: 'prometheus', name: 'Prometheus' },
          { id: 'grafana', name: 'Grafana' },
          { id: 'elasticsearch', name: 'ELK Stack' }
        ]
      }
    ]
  },
  footer: {
    copyrightText: '© {year} Igor Chestnov. All rights reserved.'
  }
};
