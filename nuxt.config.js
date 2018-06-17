const parseArgs = require("minimist")
const argv = parseArgs(process.argv.slice(2), {
  alias: {
    H: "hostname",
    p: "port"
  },
  string: ["H"],
  unknown: parameter => false
})

const port =
  argv.port ||
  process.env.PORT ||
  process.env.npm_package_config_nuxt_port ||
  "3000"
const host =
  argv.hostname ||
  process.env.HOST ||
  process.env.npm_package_config_nuxt_host ||
  "localhost"

// `DEPLOY_ENV` が `GH_PAGES` の場合のみ `router.base = '/<repository-name>/'` を追加する
const basePath = process.env.DEPLOY_ENV === 'GH_PAGES' ? '/boingu/' : '/'
const routerBase = process.env.DEPLOY_ENV === 'GH_PAGES' ? {
  router: {
    base: basePath
  }
} : {}
const generateFolder = process.env.DEPLOY_ENV === 'GH_PAGES' ? 'docs' : 'dist'
module.exports = {
  mode: 'spa',
  ...routerBase,
  env: {
    baseUrl:
      process.env.BASE_URL ||
      `http://${host}:${port}`
  },
  head: {
    title: "ぼいんぐ Boingu",
    meta: [
      { charset: "utf-8" },
      {
        name: "viewport",
        content:
          "width=device-width, initial-scale=1"
      },
      {
        hid: "description",
        name: "description",
        content: "Nuxt.js project"
      }
    ],
    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href: basePath + "favicon.ico"
      },
      {
        rel:  'stylesheet',
        type: 'text/css',
        href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      },
      {
        rel:  'stylesheet',
        type: 'text/css',
        href: 'https://unpkg.com/vuetify/dist/vuetify.min.css'    
      }
    ]
  },
  /*
  router: {
    routes: [
      { name: 'nextPage', path: '/nextPage', component: nextPage, props: true }
    ]
  },
  */
  /*
  ** Customize the progress-bar color
  */
  loading: { color: "#3B8070" },
  plugins: [
    { src: '~/plugins/plugin.ts', ssr: false},
    { src: '~/plugins/vuetify.ts', ssr: false},
    { src: '~/plugins/firebase.ts', ssr: false}
  ],
  /*
  ** Build configuration
  */
  css: ["~/assets/css/main.css", '~/assets/app.styl'],
  vendor: ['vuetify', 'vue-beautiful-chat', 'firebase'],
  build: {
    /*
    extend (config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules|vendor)/,
        })
      }
      config.module.rules = config.module.rules.map((rule) => {
        if (rule.loader === 'babel-loader') {
          rule.exclude = /node_modules|vendor/
        }
        return rule
      })
    }
    */
  },
  generate: {
    dir: generateFolder
  },
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/sitemap',
    '@nuxtjs/dotenv',
    '~/modules/typescript.js'
  ],
  axios: {},
  sitemap: {
    path: '/sitemap.xml',
    hostname: 'https://hukusuke1007.github.io/boingu/',
    generate: true,
    exclude: [
    ],
    routes: [
      '/nextPage'
    ]
  },
}
