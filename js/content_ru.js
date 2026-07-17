/**
 * Russian (default) localization content.
 * Loaded as a plain script (not fetched as JSON) so the site keeps working
 * when opened directly via file:// without triggering CORS restrictions.
 */
const contentRu = {
  meta: {
    pageTitle: 'Иван Иванов — Backend Developer | Резюме'
  },
  hero: {
    name: 'Иван Иванов',
    role: 'Software Engineer',
    avatarAlt: 'Аватар-заглушка профиля',
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
    text: 'Backend-разработчик с более чем 5-летним опытом создания надёжных высоконагруженных систем на Java и Go, специализируюсь на микросервисах, Kafka и PostgreSQL. Работал в финтехе и на бирже — люблю сложные технические задачи и всегда открыт новым технологиям.'
  },
  experience: {
    title: 'Опыт работы',
    jobs: [
      {
        company: 'Ozon Fintech',
        role: 'Senior Backend-разработчик',
        period: 'Декабрь 2023 — настоящее время',
        points: [
          'Разрабатываю и поддерживаю высоконагруженные микросервисы платёжной платформы на Java и Go.',
          'Проектирую асинхронную интеграцию сервисов через Kafka, снижая время обработки транзакций.',
          'Внедряю практики observability и участвую в ревью архитектурных решений команды.',
          'Автоматизирую развёртывание сервисов в Kubernetes, ускоряя релизный цикл.'
        ]
      },
      {
        company: 'Московская Биржа (MOEX)',
        role: 'Backend-разработчик',
        period: 'Октябрь 2021 — Декабрь 2023',
        points: [
          'Разрабатывал компоненты торговых и клиринговых систем на Java и Spring.',
          'Оптимизировал взаимодействие с PostgreSQL, повысив пропускную способность запросов.',
          'Участвовал в проектировании event-driven интеграций между внутренними системами через Kafka.',
          'Проводил код-ревью и внедрял стандарты качества кода в команде.'
        ]
      },
      {
        company: 'Haulmont',
        role: 'Backend-разработчик',
        period: 'Январь 2020 — Октябрь 2021',
        points: [
          'Разрабатывал бизнес-приложения на Java и Spring для корпоративных заказчиков.',
          'Проектировал схемы данных и оптимизировал запросы к PostgreSQL.',
          'Писал автотесты и участвовал в настройке CI-процессов.',
          'Взаимодействовал с заказчиками для уточнения требований к функциональности.'
        ]
      }
    ]
  },
  education: {
    period: 'сентябрь 2015 — июнь 2020',
    institution: 'Московский государственный технический университет им. Н.Э. Баумана',
    degree: 'Информатика и вычислительная техника, специалист',
    description: 'Специализация — распределённые системы и базы данных; дипломная работа посвящена проектированию отказоустойчивых хранилищ данных.'
  },
  roadmap: {
    title: 'Технологии',
    groups: [
      {
        name: 'Языки',
        items: ['Java', 'Go', 'Python']
      },
      {
        name: 'Инструменты',
        items: ['Spring', 'Spring Boot', 'Maven', 'Gradle', 'Git', 'Vim', 'Claude Code']
      },
      {
        name: 'Деплой',
        items: ['Docker', 'Kubernetes', 'GitLab', 'GitHub', 'Linux']
      },
      {
        name: 'Базы',
        items: ['PostgreSQL', 'Kafka', 'Apache ActiveMQ']
      }
    ]
  },
  footer: {
    copyrightText: '© {year} Иван Иванов. Все права защищены.'
  }
};
