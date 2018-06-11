import Vue from 'vue'
import Vuetify from 'vuetify'
import colors from 'vuetify/es5/util/colors'

//Vue.use(Vuetify)
Vue.use(Vuetify, {
    theme: {
      original: colors.purple.base,
      primary: colors.red.darken1, // #E53935
      secondary: colors.red.lighten4, // #FFCDD2
      accent: colors.indigo.base, // #3F51B5
      theme: '#4A33F6',
      background: '#FAFAFB',
      purpleBoingu: '#23218B',
      blackBlack: '#180836',
      greyBoingu: '#b9b4ca',
      redBoingu: '#ff3827',
      yellowBoingu: '#d89263',
      twitter: '#00aced'
    },
    options: {
      themeVariations: ['original', 'secondary']
    }
})