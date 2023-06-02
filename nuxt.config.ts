import { createResolver } from '@nuxt/kit'
import json5 from '@miyaneee/rollup-plugin-json5'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'

const { resolve } = createResolver(import.meta.url)

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: 'src',

  modules: [
    'nuxt-windicss',
    '~/modules/modules.ts',
  ],

  components: [
    '~/components',
    '~/components/dialogs',
    '~/components/forms',
    '~/components/panels',
  ],

  build: {
    transpile: ['vuetify'],
  },

  app: {
    head: {
      title: 'Refugee help',
    },
  },
  vite: {
    plugins: [
      json5(),
      VueI18nPlugin({
        /* options */
        // locale messages resource pre-compile option
        include: resolve('./src/locales/**'),
      }),
    ],
  },

  css: [
    '@/scss/main.scss',
  ],
  runtimeConfig: {
    public: {
      google: {
        maps: {
          api: process.env.R_GOOGLE_MAPS_API,
          type: process.env.R_GOOGLE_MAPS_MAP_TYPE,
        },
      },
      superbase: {
        url: process.env.R_SUPABASE_URL,
        key: process.env.R_SUPABASE_KEY,
      },
    },
  },
  devtools: {
    enabled: false,
  },
})
