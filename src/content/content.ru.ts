import type { ResumeContent } from '../types';
import scautaSearchImg from '../assets/scauta-search.png';

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
      { href: '#projects-section', label: 'Проекты' },
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
      'Инженер-программист с опытом разработки сложных программных систем. Ориентирован на решение нетривиальных инженерных задач, проектирование архитектуры и создание качественного программного обеспечения. Имею опыт проектирования и разработки высоконагруженных распределённых систем, уделяю особое внимание отказоустойчивости, масштабируемости, наблюдаемости (observability) и сопровождаемости.',
      'Не ограничиваюсь конкретным языком программирования или предметной областью, выбираю технологии исходя из требований задачи. Стремлюсь создавать сервисы, которые легко развивать, эксплуатировать и мониторить в production-среде.'
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
        summary:
          'Разрабатываю и развиваю сервисы процессингового ядра банка. Отвечаю за корректность проведения карточных транзакций, соблюдение правил платёжной системы. Проектирую надёжные системы хранения карточных и криптографических данных, уделяя особое внимание безопасности.',
        points: [
          'Спроектировал и реализовал обработку карточных транзакций с нагрузкой 200 RPS.',
          'Настроил отказоустойчивый механизм проверки криптографических данных (ПИН-код, CVV, данные с чипа карты).',
          'Разработал и внедрил 3DS-сервер (эмитентская аутентификация при покупках в интернете).',
          'Настроил и автоматизировал документооборот между банком и платёжной системой.',
          'Построил и запустил обработку клирингов от платёжной системы.'
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
        summary:
          'Участвовал в переходе от легаси-монолитной системы к современной микросервисной архитектуре. Отвечал за хранение клиентских данных, документов и данных по ценным бумагам.',
        points: [
          'Переписал два модуля монолитного приложения на целевые микросервисы на Spring Boot с деплоем в Kubernetes.',
          'Спроектировал и реализовал клиентскую и серверную часть OAuth 2.0 авторизации между сервисами. Написал и внедрил платформенные библиотеки, которыми пользовались все разработчики департамента.',
          'Настроил механизм синхронизации привилегий пользователей между legacy базой данных Oracle и целевым Keycloak.',
          'Руководил командой из пяти человек: спроектировал и внедрил бизнес-процесс заведения новых ценных бумаг для торгов на бирже.'
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
        summary:
          'Развивал платформу электронного документооборота ТЕЗИС в составе команды ядра — проектировал серверную бизнес-логику на Java и Spring, реализовывал функциональность по требованиям заказчиков и сопровождал коробочный продукт. Занимался полным редизайном системы.',
        points: [
          'Реализовал бизнес-процессы создания и согласования документов для правительств Республики Коми и Ямало-Ненецкого автономного округа.',
          'Спроектировал и реализовал механизм дедупликации записей в базе данных по кнопке.',
          'Реализовал полный редизайн веб-части с использованием HTML, CSS и Vaadin.'
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
    description: [],
    icon: 'samara-university',
    dividerLabel: 'Образование'
  },
  projects: {
    title: 'Пет-проекты',
    detail: {
      featuresTitle: 'Возможности',
      viewOnGithubLabel: 'Открыть на GitHub',
      closeLabel: 'Закрыть'
    },
    items: [
      {
        id: 'scauta',
        icon: 'scauta',
        name: 'Scauta',
        description:
          'Расширение для браузера с мгновенным нечётким поиском по закладкам, истории и открытым вкладкам — компактный диалог, полностью управляемый с клавиатуры и работающий локально, без сервера и синхронизации.',
        tech: [
          { id: 'typescript', name: 'TypeScript' },
          { id: 'react', name: 'React' },
          { id: 'googlechrome', name: 'Chrome Extension' }
        ],
        repoUrl: 'https://github.com/inchestnov/scauta',
        features: [
          'Нечёткий, нечувствительный к опечаткам поиск по закладкам, истории и открытым вкладкам',
          'Многоуровневое ранжирование: точные совпадения всегда выше нечётких, часто открываемые — выше',
          'Полностью клавиатурный интерфейс: своя горячая клавиша, стрелки, Enter',
          'Работает целиком локально — без сервера, аккаунта и синхронизации'
        ],
        media: {
          kind: 'image',
          src: scautaSearchImg,
          alt: 'Скриншот поиска Scauta в тёмной теме'
        }
      },
      {
        id: 'marko',
        icon: 'marko',
        name: 'Marko',
        description:
          'Инфраструктура закладок браузера как код: описываете папки, ссылки и шаблоны в marko.yaml, а CLI на Go рендерит дерево, сравнивает его с реальными закладками браузера и применяет разницу.',
        tech: [
          { id: 'go', name: 'Go' },
          { id: 'yaml', name: 'YAML' }
        ],
        repoUrl: 'https://github.com/inchestnov/marko',
        features: [
          'Закладки декларативно описываются в одном YAML-файле',
          'Переиспользуемые шаблоны с переменными (Kubernetes, GitHub-репозитории и др.)',
          'Режим preview показывает diff до применения к браузеру',
          'Прямая запись в нативный файл Bookmarks с автоматическим бэкапом'
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
          'Библиотека на Go без внешних зависимостей для маскирования и восстановления чувствительных полей структур на дженериках — «отсоединяйте» секреты перед логированием и восстанавливайте их обратно, когда они снова нужны.',
        tech: [{ id: 'go', name: 'Go' }],
        repoUrl: 'https://github.com/inchestnov/sensitive-go',
        features: [
          'Detach/Attach маскируют и восстанавливают помеченные поля структуры',
          'API на дженериках типобезопасен — несовпадение форм возвращает ошибку, а не reflect-панику',
          'Рекурсивная обработка вложенных структур, срезов и map',
          'Ноль внешних зависимостей, только стандартная библиотека'
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
    title: 'Технологии',
    groups: [
      {
        name: 'Языки',
        items: [
          { id: 'go', name: 'Go' },
          { id: 'java', name: 'Java' },
          { id: 'python', name: 'Python' },
          { id: 'sql', name: 'SQL' }
        ]
      },
      {
        name: 'Фреймворки',
        items: [
          { id: 'spring', name: 'Spring' },
          { id: 'spring-boot', name: 'Spring Boot' },
          { id: 'junit5', name: 'JUnit 5' },
          { id: 'testcontainers', name: 'Testcontainers' }
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
          { id: 'alertmanager', name: 'Alertmanager' },
          { id: 'elasticsearch', name: 'ELK' },
          { id: 'opentelemetry', name: 'OpenTelemetry' }
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
