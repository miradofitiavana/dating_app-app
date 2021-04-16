export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'eshop',
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

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "vue-multiselect/dist/vue-multiselect.min.css",
    "@/assets/css/style.css",
    "@/assets/scss/colors.scss",
    "@/assets/scss/variables.scss",
  ],

  styleResources: {
    scss: ['./assets/scss/*.scss']
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/api/auth.plugins.js',
    '~/plugins/api/categories.plugins.js',
    '~/plugins/api/questions.plugins.js',
    '~/plugins/api/user.plugins.js',

    '~/plugins/jwt.plugins.js',
    { src: '~/plugins/vee-validate', ssr: false },
    { src: '~/plugins/vuex-persist', ssr: false },
    '~/plugins/click-outside.plugins.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [
    '~/components/',
    { path: '~/components/ui/' },
    { path: '~/components/back/' },
    { path: '~/components/front/' },
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/fontawesome',
    '@nuxtjs/date-fns',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/apollo',
    '@nuxt/http',
    '@nuxtjs/style-resources',
    'cookie-universal-nuxt',
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
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
        httpEndpoint:
          "http://localhost:3300/graphql"
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
    API_URL: process.env.API_URL,
    API: process.env.API
  },

  server: {
    // host: '192.168.1.75',
    port: 8000 // default: 3000
  }
}
