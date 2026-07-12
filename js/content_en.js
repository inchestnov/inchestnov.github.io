/**
 * English localization content.
 * Loaded as a plain script (not fetched as JSON) so the site keeps working
 * when opened directly via file:// without triggering CORS restrictions.
 */
const contentEn = {
  meta: {
    pageTitle: 'Ivan Ivanov — Backend Developer | Resume'
  },
  hero: {
    name: 'Ivan Ivanov',
    role: 'Backend Developer · Java & Go',
    avatarAlt: 'Profile avatar placeholder',
    contacts: {
      telegram: {
        label: 'Telegram',
        value: 'ivan_ivanov_dev',
        href: 'https://t.me/ivan_ivanov_dev'
      },
      linkedin: {
        label: 'LinkedIn',
        value: 'ivan-ivanov-dev',
        href: 'https://linkedin.com/in/ivan-ivanov-dev'
      },
      github: {
        label: 'GitHub',
        value: 'ivan-ivanov-dev',
        href: 'https://github.com/ivan-ivanov-dev'
      },
      email: {
        label: 'Email',
        value: 'ivan.ivanov.dev@example.com',
        href: 'mailto:ivan.ivanov.dev@example.com'
      }
    }
  },
  themeToggle: {
    switchToLight: 'Switch to light theme',
    switchToDark: 'Switch to dark theme'
  },
  languageSwitcher: {
    ariaLabel: 'Language switcher'
  },
  skills: {
    title: 'Key Skills',
    items: [
      { id: 'java', name: 'Java' },
      { id: 'spring', name: 'Spring' },
      { id: 'go', name: 'Go' },
      { id: 'kafka', name: 'Kafka' },
      { id: 'postgresql', name: 'PostgreSQL' },
      { id: 'kubernetes', name: 'Kubernetes' }
    ]
  },
  about: {
    title: 'About Me',
    text: 'Backend developer with 5+ years of experience building reliable, high-load systems in Java and Go. I specialize in microservice architecture, asynchronous service integration via Kafka, and optimizing PostgreSQL performance. I have worked in fintech and at a stock exchange, where performance, fault tolerance, and attention to detail matter most. I enjoy digging into complex technical problems and sharing what I learn with the team. I am always open to picking up new technologies and approaches.'
  },
  experience: {
    title: 'Work Experience',
    jobs: [
      {
        company: 'Ozon Fintech',
        role: 'Senior Backend Developer',
        period: 'December 2023 — Present',
        points: [
          'Develop and maintain high-load microservices for the payments platform in Java and Go.',
          'Design asynchronous service integration via Kafka, reducing transaction processing time.',
          'Introduce observability practices and take part in architectural review sessions.',
          'Automate service deployment on Kubernetes, speeding up the release cycle.'
        ]
      },
      {
        company: 'Moscow Exchange (MOEX)',
        role: 'Backend Developer',
        period: 'October 2021 — December 2023',
        points: [
          'Built components of trading and clearing systems using Java and Spring.',
          'Optimized PostgreSQL interactions, improving query throughput.',
          'Took part in designing event-driven integrations between internal systems via Kafka.',
          'Conducted code reviews and introduced code quality standards within the team.'
        ]
      },
      {
        company: 'Haulmont',
        role: 'Backend Developer',
        period: 'January 2020 — October 2021',
        points: [
          'Developed business applications in Java and Spring for enterprise clients.',
          'Designed data schemas and optimized PostgreSQL queries.',
          'Wrote automated tests and helped set up CI processes.',
          'Collaborated with clients to clarify functional requirements.'
        ]
      }
    ]
  },
  education: {
    title: 'Education',
    period: '2015 — 2020',
    institution: 'Bauman Moscow State Technical University',
    degree: 'Computer Science and Engineering, Specialist Degree',
    description: 'Specialized in distributed systems and databases; thesis focused on designing fault-tolerant data storage architectures.'
  },
  languages: {
    title: 'Languages',
    items: [
      { name: 'Russian', level: 'Native' },
      { name: 'English', level: 'Upper-Intermediate (B2)' }
    ]
  },
  footer: {
    copyrightText: '© {year} Ivan Ivanov. All rights reserved.'
  }
};
