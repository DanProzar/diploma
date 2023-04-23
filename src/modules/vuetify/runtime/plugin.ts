import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
import { colors } from '@/helpers/colors'

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    ssr: true,
    icons: {
      defaultSet: 'mdi',
      sets: {
        mdi,
      },
      aliases,
    },
    theme: {
      themes: {
        light: {
          dark: false,
          colors,
        },
      },
    },
  })

  nuxtApp.vueApp.use(vuetify)
})
