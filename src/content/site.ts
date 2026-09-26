import type { SiteContent } from "./types";
import { aboutMainImage, aboutSupportImage, ctaImage, doctorImages, heroImage, ogImageUrl, smileImages } from "./images";

/**
 * All visible text of the site. Copied from the Knowledge Base document
 * "Site Copy (Russian) — УлыбкаFAMILY". Edit text here, not in components.
 */

const NBSP = "\u00A0";
const city = "Москва";
const street = "ул. Бауманская, 11, стр. 2";
const address = `${city}, ${street}`;
const mapQuery = encodeURIComponent(address);

export const siteContent: SiteContent = {
  meta: {
    title: "УлыбкаFAMILY — семейная стоматология в центре Москвы",
    description:
      "Лечение зубов, имплантация, эстетическая стоматология, отбеливание, ортодонтия и гигиена. Опытные врачи, современное оборудование, запись онлайн.",
    ogImage: ogImageUrl,
    ogImageAlt: heroImage.alt,
  },

  clinic: {
    name: "УлыбкаFAMILY",
    brandPrimary: "Улыбка",
    brandSecondary: "FAMILY",
    descriptor: "Семейная стоматология",
    legalName: "ООО «Улыбка Фэмили»",
    licence: "Лицензия на медицинскую деятельность № Л041-01137-77/00368512",
    city,
    street,
    address,
    metro: `5 минут пешком от м.${NBSP}«Бауманская»`,
    phoneDisplay: `+7${NBSP}(495)${NBSP}120-45-67`,
    phoneHref: "tel:+74951204567",
    email: "info@ulybkafamily.ru",
    hours: [
      { days: "Пн–Пт", time: "09:00–20:00" },
      { days: "Сб", time: "10:00–16:00" },
      { days: "Вс", time: "выходной", closed: true },
    ],
    social: [
      { network: "telegram", label: "Telegram", href: "https://t.me/ulybkafamily" },
      { network: "vk", label: "ВКонтакте", href: "https://vk.com/ulybkafamily" },
      { network: "whatsapp", label: "WhatsApp", href: "https://wa.me/74951204567" },
    ],
    mapEmbedUrl: `https://www.google.com/maps?q=${mapQuery}&hl=ru&z=16&output=embed`,
    mapLinkUrl: `https://www.google.com/maps/dir/?api=1&destination=${mapQuery}`,
  },

  navigation: {
    ariaLabel: "Основная навигация",
    items: [
      { id: "uslugi", label: "Услуги" },
      { id: "o-klinike", label: "О клинике" },
      { id: "vrachi", label: "Врачи" },
      { id: "otzyvy", label: "Отзывы" },
      { id: "kontakty", label: "Контакты" },
    ],
    cta: "Записаться на приём",
    openMenuLabel: "Открыть меню",
    closeMenuLabel: "Закрыть меню",
  },

  hero: {
    eyebrow: "Семейная стоматология в центре Москвы",
    title: "Здоровая улыбка начинается с правильного ухода.",
    lead: "Современная стоматология с заботой о вашем здоровье, комфорте и уверенности в своей улыбке.",
    primaryCta: "Записаться на приём",
    secondaryCta: "Наши услуги",
    image: heroImage,
    trustCards: [
      { value: "15+", caption: "лет опыта" },
      { value: `5${NBSP}000+`, caption: "пациентов" },
      { value: `4,9${NBSP}/${NBSP}5`, caption: "рейтинг" },
    ],
  },

  services: {
    eyebrow: "Услуги",
    title: "Всё необходимое для здоровья вашей улыбки",
    lead: "От профилактики до сложной имплантации — все направления современной стоматологии в одной клинике.",
    actionLabel: "Записаться",
    items: [
      {
        id: "treatment",
        title: "Лечение зубов",
        description: "Бережно лечим кариес и каналы под микроскопом. Сохраняем собственные зубы даже в сложных случаях.",
        icon: "tooth",
      },
      {
        id: "implants",
        title: "Имплантация",
        description: "Восстанавливаем утраченные зубы на имплантатах премиальных систем. Цифровое планирование и точная установка.",
        icon: "implant",
      },
      {
        id: "aesthetic",
        title: "Эстетическая стоматология",
        description: "Виниры, реставрации и цифровой дизайн улыбки. Естественный результат в гармонии с чертами лица.",
        icon: "gem",
      },
      {
        id: "whitening",
        title: "Отбеливание",
        description: "Профессиональное отбеливание в клинике и домашние системы. Заметно светлее — без вреда для эмали.",
        icon: "sparkles",
      },
      {
        id: "orthodontics",
        title: "Ортодонтия",
        description: "Исправляем прикус брекетами и элайнерами у детей и взрослых. Результат видно заранее на 3D-модели.",
        icon: "aligner",
      },
      {
        id: "hygiene",
        title: "Профессиональная гигиена",
        description: "Удаление зубного камня и налёта, Air Flow и полировка. Основа здоровья зубов и дёсен.",
        icon: "droplets",
      },
    ],
  },

  about: {
    eyebrow: "О клинике",
    title: "Стоматология, которой можно доверять",
    paragraphs: [
      "УлыбкаFAMILY — клиника, в которой лечат так, как лечили бы своих близких. Мы не торопимся, подробно объясняем каждый этап и предлагаем только то лечение, которое действительно нужно.",
      "В клинике работают дентальный микроскоп, 3D-томограф и внутриротовой сканер. Диагностика, планирование и лечение проходят в одном месте, поэтому решения принимаются быстрее и точнее.",
      "Для каждого пациента мы составляем индивидуальный план лечения с понятными сроками и стоимостью, которая не меняется без вашего согласия.",
    ],
    quote: {
      text: "«Хорошая стоматология — это когда пациент уходит спокойным и уверенным, что о нём по-настоящему позаботились».",
      author: "Дмитрий Соколов, главный врач",
    },
    stats: [
      { value: "12", caption: "врачей в команде" },
      { value: "6", caption: "оборудованных кабинетов" },
      { value: `98${NBSP}%`, caption: "пациентов рекомендуют нас близким" },
    ],
    mainImage: aboutMainImage,
    supportImage: aboutSupportImage,
  },

  doctors: {
    eyebrow: "Врачи",
    title: "Наши специалисты",
    lead: "Врачи, которым пациенты доверяют самое ценное — здоровье и красоту улыбки.",
    items: [
      {
        id: "sokolov",
        name: "Дмитрий Соколов",
        role: "Главный врач, хирург-имплантолог",
        experience: "18 лет опыта",
        bio: "Провёл более 3 000 имплантаций. Работает по цифровому протоколу с навигационными шаблонами.",
        portrait: doctorImages.sokolov,
      },
      {
        id: "petrova",
        name: "Анна Петрова",
        role: "Врач-стоматолог-терапевт",
        experience: "12 лет опыта",
        bio: "Лечит кариес и каналы под микроскопом. Особенно внимательна к пациентам, которые боятся лечения.",
        portrait: doctorImages.petrova,
      },
      {
        id: "volkov",
        name: "Михаил Волков",
        role: "Врач-стоматолог-ортопед",
        experience: "14 лет опыта",
        bio: "Специалист по эстетическому протезированию: виниры, керамические коронки, реставрации на имплантатах.",
        portrait: doctorImages.volkov,
      },
      {
        id: "morozova",
        name: "Елена Морозова",
        role: "Врач-ортодонт",
        experience: "10 лет опыта",
        bio: "Исправляет прикус брекетами и элайнерами. Работает с детьми с 6 лет и со взрослыми.",
        portrait: doctorImages.morozova,
      },
      {
        id: "lebedeva",
        name: "Ольга Лебедева",
        role: "Врач-стоматолог-гигиенист",
        experience: "8 лет опыта",
        bio: "Проводит профессиональную гигиену и подбирает домашний уход, который действительно работает.",
        portrait: doctorImages.lebedeva,
      },
    ],
    rail: {
      label: "Список врачей",
      previous: "Предыдущий врач",
      next: "Следующий врач",
      position: "{current} из {total}",
    },
  },

  advantages: {
    eyebrow: "Преимущества",
    title: "Почему пациенты выбирают нас",
    items: [
      {
        id: "equipment",
        title: "Современное оборудование",
        description: "Дентальный микроскоп, 3D-томограф и внутриротовой сканер обеспечивают точность на каждом этапе.",
        icon: "microscope",
      },
      {
        id: "specialists",
        title: "Опытные специалисты",
        description: "Врачи с опытом от 8 лет регулярно проходят обучение в России и за рубежом.",
        icon: "award",
      },
      {
        id: "individual",
        title: "Индивидуальный подход",
        description: "План лечения составляем после диагностики и заранее согласовываем с вами каждый шаг и стоимость.",
        icon: "heart-handshake",
      },
      {
        id: "comfort",
        title: "Комфортное лечение",
        description: "Современная анестезия, спокойная атмосфера и лечение во сне для тех, кто сильно волнуется.",
        icon: "armchair",
      },
      {
        id: "safety",
        title: "Безопасность и стерильность",
        description: "Одноразовые материалы и многоступенчатая стерилизация инструментов по требованиям СанПиН.",
        icon: "shield-check",
      },
      {
        id: "diagnostics",
        title: "Точная диагностика",
        description: "Цифровые снимки и КТ прямо в клинике — видим проблему до того, как она начнёт беспокоить.",
        icon: "scan-line",
      },
    ],
  },

  beforeAfter: {
    eyebrow: "Результаты",
    title: "До и после",
    lead: "Примеры работ наших врачей. Передвигайте разделитель, чтобы сравнить результат.",
    beforeLabel: "До",
    afterLabel: "После",
    sliderLabel: "Сравнение до и после",
    casesLabel: "Примеры работ",
    notice:
      "Изображения приведены в качестве примера. Результат лечения зависит от клинической ситуации и определяется на консультации.",
    items: [
      {
        id: "aesthetic",
        title: "Эстетическая реставрация",
        treatment: "Керамические виниры на 6 передних зубов",
        duration: "2 визита",
        image: smileImages.aesthetic,
      },
      {
        id: "whitening",
        title: "Профессиональное отбеливание",
        treatment: "Отбеливание в клинике",
        duration: "1 визит",
        image: smileImages.whitening,
      },
      {
        id: "aligners",
        title: "Исправление прикуса",
        treatment: "Лечение элайнерами",
        duration: "14 месяцев",
        image: smileImages.aligners,
      },
    ],
  },

  testimonials: {
    eyebrow: "Отзывы",
    title: "Пациенты о нас",
    lead: "Средняя оценка 4,9 из 5 по отзывам наших пациентов.",
    ratingLabel: "Оценка {N} из 5",
    items: [
      {
        id: "irina",
        name: "Ирина К.",
        treatment: "Лечение зубов",
        rating: 5,
        text: "Всегда боялась стоматологов, а здесь впервые лечила зуб спокойно. Анна Петрова всё объясняла и спрашивала, как я себя чувствую. Теперь хожу только сюда.",
      },
      {
        id: "alexey",
        name: "Алексей М.",
        treatment: "Имплантация",
        rating: 5,
        text: "Ставил два импланта у Дмитрия Соколова. План показали на 3D-модели, стоимость назвали сразу и без сюрпризов. Всё прижилось, жую как своими.",
      },
      {
        id: "natalia",
        name: "Наталья С.",
        treatment: "Ортодонтия",
        rating: 5,
        text: "Дочь носит брекеты у Елены Морозовой уже год. Ребёнок идёт на приём без слёз, а результат видно уже сейчас. Спасибо за терпение!",
      },
      {
        id: "viktor",
        name: "Виктор П.",
        treatment: "Профессиональная гигиена",
        rating: 5,
        text: "Прохожу гигиену раз в полгода. Быстро, аккуратно и без неприятных ощущений. Удобно, что можно записаться на вечер после работы.",
      },
      {
        id: "ekaterina",
        name: "Екатерина Л.",
        treatment: "Эстетическая стоматология",
        rating: 5,
        text: "Сделала виниры перед свадьбой. Михаил Волков подобрал оттенок так, что никто не верит, что это не мои зубы.",
      },
      {
        id: "roman",
        name: "Роман Д.",
        treatment: "Отбеливание",
        rating: 4,
        text: "Результатом отбеливания доволен, разница заметная. Немного подождал в холле, но администратор извинился и предложил кофе. В целом рекомендую.",
      },
    ],
    rail: {
      label: "Отзывы пациентов",
      previous: "Предыдущий отзыв",
      next: "Следующий отзыв",
      position: "{current} из {total}",
    },
  },

  bookingCta: {
    title: "Готовы позаботиться о своей улыбке?",
    lead: "Запишитесь на консультацию — мы подберём оптимальный план лечения именно для вас.",
    cta: "Записаться на приём",
    phoneLead: "или позвоните нам:",
    image: ctaImage,
  },

  bookingForm: {
    eyebrow: "Запись на приём",
    title: "Оставьте заявку",
    lead: "Администратор перезвонит вам в течение 15 минут в рабочее время и подтвердит дату и время визита.",
    fields: {
      name: { label: "Имя", placeholder: "Как к вам обращаться" },
      phone: { label: "Телефон", placeholder: "+7 (___) ___-__-__" },
      service: { label: "Выберите услугу", placeholder: "Выберите из списка" },
      date: { label: "Желаемая дата", placeholder: "дд.мм.гггг" },
      comment: { label: "Комментарий", placeholder: "Опишите, что вас беспокоит, или задайте вопрос" },
    },
    serviceOptions: [
      { value: "consultation", label: "Консультация врача" },
      { value: "treatment", label: "Лечение зубов" },
      { value: "implants", label: "Имплантация" },
      { value: "aesthetic", label: "Эстетическая стоматология" },
      { value: "whitening", label: "Отбеливание" },
      { value: "orthodontics", label: "Ортодонтия" },
      { value: "hygiene", label: "Профессиональная гигиена" },
    ],
    submit: "Отправить заявку",
    submitting: "Отправляем…",
    consent: "Нажимая «Отправить заявку», вы соглашаетесь на обработку персональных данных.",
    errors: {
      nameRequired: "Укажите ваше имя",
      nameTooShort: "Имя должно содержать не менее 2 букв",
      nameInvalidCharacters: "Имя должно содержать только буквы, пробелы и дефисы",
      nameTooLong: "Имя не должно превышать 60 символов",
      phoneRequired: "Укажите номер телефона",
      phoneInvalid: "Проверьте номер: после +7 должно быть 10 цифр",
      serviceRequired: "Выберите услугу",
      dateRequired: "Выберите желаемую дату",
      datePast: "Эта дата уже прошла — выберите другую",
      dateTooFar: "Запись доступна на ближайшие 3 месяца",
      dateSunday: "В воскресенье клиника не работает — выберите другой день",
      commentTooLong: "Комментарий не должен превышать 500 символов",
    },
    submitError: "Не удалось отправить заявку. Проверьте соединение и попробуйте ещё раз.",
    successTitle: "Спасибо, заявка принята!",
    successText: "Мы свяжемся с вами в ближайшее время, чтобы подтвердить дату и время приёма.",
    successAction: "Отправить ещё одну заявку",
  },

  contacts: {
    eyebrow: "Контакты",
    title: "Как нас найти",
    lead: "Ждём вас в центре Москвы, в 5 минутах пешком от метро «Бауманская».",
    labels: { address: "Адрес", phone: "Телефон", email: "Email", hours: "Часы работы" },
    mapTitle: "Карта: УлыбкаFAMILY на ул. Бауманской",
    mapLinkLabel: "Построить маршрут",
    mapLoading: "Загружаем карту…",
    mapFallback: "Не удалось загрузить карту. Откройте адрес в Google Картах.",
  },

  footer: {
    descriptor: "Семейная стоматология премиум-класса в центре Москвы.",
    columns: { navigation: "Навигация", services: "Услуги", contacts: "Контакты" },
    medicalNotice: "Имеются противопоказания. Необходима консультация специалиста.",
    legalLine: "ООО «Улыбка Фэмили» · Лицензия на медицинскую деятельность № Л041-01137-77/00368512",
    copyright: "© 2026 УлыбкаFAMILY. Все права защищены.",
    backToTopLabel: "Наверх",
  },

  system: {
    skipLink: "Перейти к содержанию",
    notFoundTitle: "Страница не найдена",
    notFoundText: "Возможно, страница была перемещена или адрес введён с ошибкой.",
    notFoundAction: "На главную",
  },
};
