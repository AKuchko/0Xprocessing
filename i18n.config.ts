export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en',
  messages: {

    en: {
      hello: 'Hello',
      /* BASE */
      base: {
        showMore: 'Show more',
        readMore: 'Read more',
        other: 'Other...',
        name: 'Name',
        phone: 'Phone number',
        email: 'Email adress',
        send: 'Send a request',
        signIn: 'Sign in',
        signUp: 'Sign up',
      },

      /* HEADER */
      header: {
        list: [
          'Features',
          'Advantages',
          'Technical support',
          'Integration',
          'Fees',
          'Business',
          'Gambling',
          'Contact us',
        ],
      },
    },

    ru: {
      hello: 'Hi',
      /* BASE */
      base: {
        showMore: 'Покзать больше',
        readMore: 'Подробнее',
        other: 'Другие...',
        name: 'Имя',
        phone: 'Номер телефона',
        email: 'Адрес электронной почты',
        send: 'Отправить запрос',
        signIn: 'Вход',
        signUp: 'Регистрация',
      },

      /* HEADER */
      header: {
        list: [
          'Функционал',
          'Преимущесва',
          'Тех. поддержка',
          'Интеграция',
          'Fees',
          'Business',
          'Gambling',
          'Связаться с нами',
        ],
      },
    },

  }
}));
