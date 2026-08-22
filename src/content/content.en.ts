import type { ResumeContent } from '../types';
import scautaSearchImg from '../assets/scauta-search.png';

const openerYamlSnippet = `aliases:
  code:
    command: code
  preview:
    app: Preview

open:
  directory:
    app: Finder
  patterns:
    - pattern: "*.pdf"
      app: Preview
    - pattern: "*.go"
      cmd: "code --goto"`;

const markoYamlSnippet = `variables:
  company_domain:
    default: company.com

collections:
  work:
    root: bar
    templates:
      - template: repository
        vars: { username: octocat, repo_name: marko }
    bookmarks:
      - name: Company Wiki
        url: "https://wiki.{{ .company_domain }}"`;

const sensitiveGoSnippet = `type User struct {
    Username string
    Password string \`sensitive:"true"\`
    Email    string \`sensitive:"true"\`
}

masked, secrets, err := sensitive.Detach(u)
// masked.Password == ""  masked.Email == ""

log.Printf("user: %+v", masked) // safe to log

restored, err := sensitive.Attach(masked, secrets)
// restored.Password == original value`;

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
      { href: '#projects-section', label: 'Projects' },
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
    description: [],
    icon: 'samara-university',
    dividerLabel: 'Education'
  },
  projects: {
    title: 'Side Projects',
    detail: {
      featuresTitle: 'Features',
      viewOnGithubLabel: 'View on GitHub',
      closeLabel: 'Close'
    },
    items: [
      {
        id: 'scauta',
        icon: 'scauta',
        name: 'Scauta',
        description:
          'A browser extension with instant fuzzy search over bookmarks, history, and open tabs — a compact, keyboard-only dialog that runs fully locally, with no server or sync service.',
        tech: [
          { id: 'typescript', name: 'TypeScript' },
          { id: 'react', name: 'React' }
        ],
        repoUrl: 'https://github.com/inchestnov/scauta',
        features: [
          'Fuzzy, typo-tolerant search across bookmarks, history, and open tabs',
          'Tiered ranking — exact matches always outrank fuzzy ones, frequently opened pages rank higher',
          'Fully keyboard-driven: a global shortcut, arrow-key navigation, Enter to open',
          'Runs entirely locally — no server, account, or sync service'
        ],
        media: {
          kind: 'image',
          src: scautaSearchImg,
          alt: "Screenshot of Scauta's search dialog in dark theme"
        }
      },
      {
        id: 'opener',
        name: 'opener',
        description:
          'A macOS CLI that gives one interface for opening files, directories, and applications — a thin wrapper around the native `open` command and Launch Services, with named aliases and pattern-based rules layered on top.',
        tech: [{ id: 'go', name: 'Go' }],
        repoUrl: 'https://github.com/inchestnov/opener',
        features: [
          '`opener <target>` opens files, directories, and apps through the system open command by default',
          'Named aliases route a target to a specific CLI program or macOS app via Launch Services',
          'Pattern rules match files by extension or glob, checked in order, for file-type-specific routing',
          'Fully optional ~/.opener.yaml — with no config, it behaves like plain `open`'
        ],
        media: {
          kind: 'code',
          language: 'yaml',
          filename: '.opener.yaml',
          code: openerYamlSnippet
        }
      },
      {
        id: 'marko',
        icon: 'marko',
        name: 'Marko',
        description:
          'Bookmark infrastructure as code: describe folders, links, and templates in a marko.yaml file, and a Go CLI renders the tree, diffs it against the browser’s actual bookmarks, and applies the difference.',
        tech: [
          { id: 'go', name: 'Go' },
          { id: 'yaml', name: 'YAML' }
        ],
        repoUrl: 'https://github.com/inchestnov/marko',
        features: [
          'Bookmarks declared as code in a single marko.yaml file',
          'Reusable templates with variables (Kubernetes, GitHub repos, and more)',
          'Preview mode shows the diff before anything touches the browser',
          "Writes directly to the browser's native Bookmarks file, with timestamped backups"
        ],
        media: {
          kind: 'code',
          language: 'yaml',
          filename: 'marko.yaml',
          code: markoYamlSnippet
        }
      },
      {
        id: 'sensitive-go',
        name: 'sensitive-go',
        description:
          'A tiny, zero-dependency Go library for masking and restoring sensitive struct fields via generics — detach secrets before they hit a log, database, or response, then attach them back when you actually need the real value.',
        tech: [{ id: 'go', name: 'Go' }],
        repoUrl: 'https://github.com/inchestnov/sensitive-go',
        features: [
          'Detach/Attach mask and restore struct fields tagged sensitive',
          'Generics-based, type-safe API — a shape mismatch returns an error, never a reflect panic',
          'Recursive — nested structs, slices, and maps are all walked and masked',
          'Zero dependencies beyond the Go standard library'
        ],
        media: {
          kind: 'code',
          language: 'go',
          filename: 'main.go',
          code: sensitiveGoSnippet
        }
      }
    ]
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
          { id: 'sql', name: 'SQL' }
        ]
      },
      {
        name: 'Frameworks',
        items: [
          { id: 'spring', name: 'Spring' },
          { id: 'spring-boot', name: 'Spring Boot' },
          { id: 'junit5', name: 'JUnit 5' },
          { id: 'testcontainers', name: 'Testcontainers' }
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
          { id: 'alertmanager', name: 'Alertmanager' },
          { id: 'elasticsearch', name: 'ELK' },
          { id: 'opentelemetry', name: 'OpenTelemetry' }
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
