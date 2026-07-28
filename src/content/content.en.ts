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
        href: 'https://www.linkedin.com/in/inchestnov'
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
  sectionNav: {
    ariaLabel: 'Quick section navigation',
    items: [
      { href: '#hero-section', label: 'About' },
      { href: '#skills-section', label: 'Skills' },
      { href: '#experience-section', label: 'Experience' },
      { href: '#roadmap-section', label: 'Stack' }
    ]
  },
  contactList: {
    emailCopiedLabel: 'Copied'
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
    paragraphs: [
      'Software engineer with experience building complex software systems. Focused on solving non-trivial engineering problems, designing architecture, and delivering high-quality software. I have experience designing and building high-load distributed systems, with particular attention to fault tolerance, scalability, observability, and maintainability.',
      'Not tied to any single programming language or domain — technology choices are driven by the requirements of the task at hand. I aim to build services that are easy to evolve, operate, and monitor in production.'
    ]
  },
  experience: {
    title: 'Work Experience',
    currentLabel: 'Current position',
    jobs: [
      {
        company: 'Ozon Bank',
        role: 'Software Engineer (Go Developer)',
        period: 'December 2023 — Present',
        startDate: '2023-12',
        endDate: null,
        summary:
          "Build and evolve the bank's core processing services. Responsible for the correctness of card transaction processing and compliance with payment system rules. Design reliable systems for storing card and cryptographic data, with a strong focus on security.",
        points: [
          'Designed and implemented card transaction processing handling a load of 200 RPS.',
          'Set up a fault-tolerant verification mechanism for cryptographic data (PIN, CVV, chip card data).',
          'Built and rolled out a 3DS server (issuer authentication for online purchases).',
          'Set up and automated document exchange between the bank and the payment system.',
          'Built and launched processing of clearing files from the payment system.'
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
        summary:
          'Helped move the platform from a legacy monolith to a modern microservices architecture. Responsible for storing client data, documents, and securities data.',
        points: [
          'Rewrote two modules of the monolithic application as target microservices on Spring Boot, deployed to Kubernetes.',
          'Designed and implemented the client and server side of OAuth 2.0 authorization between services. Wrote and rolled out platform libraries used by every developer in the department.',
          'Set up a mechanism to synchronize user privileges between the legacy Oracle database and the target Keycloak.',
          'Led a team of five: designed and rolled out the business process for listing new securities for exchange trading.'
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
        summary:
          'Built out the TESSA document management platform as part of the core team — designing server-side business logic in Java and Spring, shipping features to customer requirements, and maintaining the off-the-shelf product. Worked on a complete redesign of the system.',
        points: [
          'Implemented business processes for creating and approving documents for the governments of the Komi Republic and the Yamalo-Nenets Autonomous Okrug.',
          'Designed and implemented a one-click deduplication mechanism for database records.',
          'Delivered a complete redesign of the web layer using HTML, CSS, and Vaadin.'
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
          { id: 'python', name: 'Python' },
          { id: 'spring', name: 'Spring' },
          { id: 'spring-boot', name: 'Spring Boot' }
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
          { id: 'elasticsearch', name: 'ELK' }
        ]
      }
    ]
  },
  footer: {
    copyrightText: '© {year} Igor Chestnov'
  },
  pdfExport: {
    buttonLabel: 'PDF',
    downloadLabel: 'Download',
    fileName: 'Igor_Chestnov_Resume.pdf',
    documentTitle: 'Igor Chestnov — Resume'
  }
};
