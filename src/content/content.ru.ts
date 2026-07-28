import type { ResumeContent } from '../types';

export const contentRu: ResumeContent = {
  meta: {
    pageTitle: 'Игорь Честнов | Резюме'
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
    ariaLabel: 'Переключатель языка'
  },
  sectionNav: {
    ariaLabel: 'Быстрая навигация по разделам',
    items: [
      { href: '#hero-section', label: 'Обо мне' },
      { href: '#skills-section', label: 'Навыки' },
      { href: '#experience-section', label: 'Опыт' },
      { href: '#roadmap-section', label: 'Стек' }
    ]
  },
  contactList: {
    emailCopiedLabel: 'Скопировано'
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
    paragraphs: [
      'Инженер-программист с опытом разработки сложных программных систем. Ориентирован на решение нетривиальных инженерных задач, проектирование архитектуры и создание качественного программного обеспечения. Имею опыт проектирования и разработки высоконагруженных распределённых систем, уделяя особое внимание отказоустойчивости, масштабируемости, наблюдаемости (observability) и сопровождаемости.',
      'Не ограничиваюсь конкретным языком программирования или предметной областью, выбирая технологии исходя из требований задачи. Стремлюсь создавать сервисы, которые легко развивать, эксплуатировать и мониторить в production-среде.'
    ]
  },
  experience: {
    title: 'Опыт работы',
    currentLabel: 'Текущее место работы',
    jobs: [
      {
        company: 'Озон Банк',
        role: 'Software Engineer (Go Developer)',
        period: 'Декабрь 2023 — настоящее время',
        startDate: '2023-12',
        endDate: null,
        points: [
          'Разрабатываю сервисы для обработки, хранения и доступа к карточным данным.',
          'Проектирую надёжные системы для безопасного хранения криптографических данных.',
          'Развиваю сервисы процессингового ядра банка, отвечающие за безопасность и обработку карточных операций.',
          'Отвечаю за правильность выполнения правил платёжных систем.',
          'Отвечаю за функциональность выпуска банковских карт.'
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
        company: 'Московская Биржа (MOEX)',
        role: 'Java Developer',
        period: 'Октябрь 2021 — Декабрь 2023',
        startDate: '2021-10',
        endDate: '2023-12',
        points: [
          'Выполнял декомпозицию монолитного приложения на независимые микросервисы.',
          'Отвечал за хранение клиентских данных и доступ к ним.',
          'Участвовал в рефакторинге существующей архитектуры и повышении сопровождаемости системы.',
          'Разрабатывал интеграционные решения для взаимодействия компонентов распределённой системы.'
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
        period: 'Январь 2020 — Октябрь 2021',
        startDate: '2020-01',
        endDate: '2021-10',
        points: [
          'Разрабатывал функциональность платформы ТЕЗИС по требованиям заказчиков.',
          'Участвовал в развитии и сопровождении коробочной версии продукта в составе команды ядра.',
          'Проектировал и реализовывал серверную бизнес-логику на Java и Spring Framework.',
          'Дорабатывал существующие модули системы электронного документооборота и автоматизации бизнес-процессов.',
          'Участвовал в командной разработке и сопровождении корпоративной платформы.'
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
    period: 'сентябрь 2015 — июнь 2020',
    institution: 'Самарский университет',
    degree: 'Фундаментальная математика и механика',
    description: [
      'Занимался исследованиями в области теории групп, специализируясь на треугольных группах и их суперхарактерах.',
      'Подготовил и защитил дипломную работу «Характеры треугольной группы 4-го порядка».'
    ],
    icon: 'samara-university',
    dividerLabel: 'Образование'
  },
  roadmap: {
    title: 'Технологии',
    groups: [
      {
        name: 'Языки',
        items: [
          { id: 'go', name: 'Go' },
          { id: 'java', name: 'Java' },
          { id: 'python', name: 'Python' },
          { id: 'spring', name: 'Spring' },
          { id: 'spring-boot', name: 'Spring Boot' }
        ]
      },
      {
        name: 'Деплой',
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
        name: 'Базы',
        items: [
          { id: 'postgresql', name: 'PostgreSQL' },
          { id: 'kafka', name: 'Kafka' },
          { id: 'activemq', name: 'Apache ActiveMQ' },
          { id: 'clickhouse', name: 'ClickHouse' }
        ]
      },
      {
        name: 'Протоколы',
        items: [
          { id: 'tcp-ip', name: 'TCP/IP' },
          { id: 'http', name: 'HTTP' },
          { id: 'grpc', name: 'gRPC' },
          { id: 'oauth2', name: 'OAuth 2.0' },
          { id: 'jwt', name: 'JWT' }
        ]
      },
      {
        name: 'Мониторинг',
        items: [
          { id: 'prometheus', name: 'Prometheus' },
          { id: 'grafana', name: 'Grafana' },
          { id: 'elasticsearch', name: 'ELK' }
        ]
      }
    ]
  },
  footer: {
    copyrightText: '© {year} Игорь Честнов'
  },
  pdfExport: {
    buttonLabel: 'PDF',
    downloadLabel: 'Скачать',
    fileName: 'Игорь_Честнов_Резюме.pdf',
    documentTitle: 'Игорь Честнов — Резюме'
  }
};
