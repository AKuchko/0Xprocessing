// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // devtools: { enabled: true },

  components: {
    global: true,
    dirs: ['~/components'],
  },

  css: [
    '~/assets/scss/main.scss',
  ],
  
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/scss/variables" as *;'
        }
      }
    }
  },

  plugins: [
    '~/plugins/vuelidate',
  ],

  modules: [
    '@nuxtjs/google-fonts',
    '@nuxtjs/i18n',
  ],

  googleFonts: {
    families: {
      Ubuntu: [400, 700],
    },
    preload: true,
    download: true,
    outputDir: 'assets',
  },

  i18n: {
    vueI18n: '~/i18n.config.ts',
    strategy: 'prefix_and_default',
    defaultLocale: 'en',
    locales: ['en', 'ru'],
    detectBrowserLanguage: {
      useCookie: true,
      redirectOn: 'root',
    }
  },
})
