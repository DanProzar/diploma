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
          api: 'AIzaSyCOdoNtNn0iDzfz4TYi5LOWrty-3J2EQ20',
        },
      },
      superbase: {
        url: 'https://bagibsgyjpjkhgvggnwv.supabase.co',
        key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJhZ2lic2d5anBqa2hndmdnbnd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQ1MDA3MjcsImV4cCI6MTk5MDA3NjcyN30.jH2QyPEZktOYqousdYJd5Krhgvo7JK00HPs0g-5_foI',
      },
    },
  },
})
