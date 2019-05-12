const nodeExternals = require('webpack-node-externals')
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
module.exports = {
  mode: 'spa',
  srcDir: 'src',
  
  head: {
    title: 'R39',
    meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { hid: 'description', name: 'description', content: 'Nuxt.js + Vuetify.js project' }
    ],
    link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }
    ]
  },
  
  plugins: [
  {src: '~/plugins/fireauth'},
  {src: '~/plugins/vuetify'},
  {src: '~/plugins/vuelidate'}
  ],

  router: { middleware: 'auth' },

  css: [ {src: '~/assets/style/app.styl', lang: 'stylus'} ],

  loading: { color: '#3B8070' },
  
  build: {
    transpile: [/^vuetify/],
    vendor: [ 'vuelidate' ],
    plugins: [ new VuetifyLoaderPlugin() ],
    extractCSS: true,
    extend (config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
          options : {
            fix : true
          }
        })
      }
      if (process.server) {
        config.externals = [
        nodeExternals({
          whitelist: [/^vuetify/]
        })
        ]
      }
    }
  }
}
