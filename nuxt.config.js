export default {
  head: {
    title: 'Dating APP',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  css: [
    // "viewerjs/dist/viewer.css",
    "vue-multiselect/dist/vue-multiselect.min.css",
    "@/assets/scss/style.scss",
    "@/assets/scss/colors.scss",
    "@/assets/scss/variables.scss",
  ],

  styleResources: {
    scss: ['./assets/scss/*.scss']
  },

  plugins: [
    '~/plugins/api/auth.plugins.js',
    '~/plugins/api/categories.plugins.js',
    '~/plugins/api/questions.plugins.js',
    '~/plugins/api/user.plugins.js',

    '~/plugins/utils/date.plugins.js',

    '~/plugins/jwt.plugins.js',
    // '~/plugins/img-viewer.plugins.js',
    { src: '~/plugins/vee-validate', ssr: false },
    { src: '~/plugins/vuex-persist', ssr: false },
    '~/plugins/click-outside.plugins.js',
  ],

  components: [
    '~/components/',
    { path: '~/components/ui/' },
    { path: '~/components/back/' },
    { path: '~/components/front/' },
  ],

  buildModules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/fontawesome',
    '@nuxtjs/date-fns',
    '@nuxtjs/style-resources',
    'cookie-universal-nuxt',
    '@nuxtjs/pwa'
  ],

  modules: [
    '@nuxtjs/apollo',
    '@nuxt/http'
  ],

  build: {
    extend(config) {
      config.node = {
        fs: 'empty',
        net: 'empty'
      }
    }
  },

  serverMiddleware: [
    '~/api/send-email.js'
  ],

  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: process.env.GRAPHQL_URL
      },
    }
  },

  fontawesome: {
    component: 'fa',
    icons: {
      solid: true,
      brands: true
    }
  },

  dateFns: {
    locale: ['fr']
  },

  env: {
    API: process.env.API,
    API_URL: process.env.API_URL,
    GRAPHQL_URL: process.env.GRAPHQL_URL,
  },

  pwa: {
    manifest: {
      lang: 'fr',
      name: 'Dating APP by Question',
      short_name: 'Dating APP',
      display: 'standalone',
      theme_color: '#d3156a'
    },
    // workbox: {
    //   dev: process.env.NODE_ENV !== 'production'
    // }
  }

  // server: {
  //   host: "0.0.0.0"
  // }
}
