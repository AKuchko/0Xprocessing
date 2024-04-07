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
        feature: 'Features',
        advantages: 'Advantages',
        support: 'Technical support',
        integration: 'Integration',
        fees: 'Fees',
        business: 'Business',
        gambling: 'Gambling',
        contacts: 'Contact us',
      },

      index: {
        table: {
          '0xProcessing': '0XProcessing',
          'fiatProcessing': 'FiatProcessing',
          'cryptoProcessing': 'CryptoProcessing',
        }
      }
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
        feature: 'Функционал',
        advantages: 'Преимущесва',
        support: 'Тех. поддержка',
        integration: 'Интеграция',
        fees: 'Fees',
        business: 'Business',
        gambling: 'Gambling',
        contacts: 'Связаться с нами',
      },

      index: {
        table: {
          '0xProcessing': '0XProcessing',
          'fiatProcessing': 'FiatProcessing',
          'cryptoProcessing': 'CryptoProcessing',
        }
      }
    },

  }
}));
