// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: 'src',
  modules: [
    '~/modules/modules.ts',
  ],
  build: {
    transpile: ['vuetify'],
  },
  windicss: {
    safelist: [],
    include: [
      'src/components/*.vue',
      'src/pages/*.vue'
    ],
    exclude: [
      'node_modules',
    ],
    shortcuts: {
      'tw-refugee-container': 'mx-auto w-full max-w-[calc(100%-2rem)] sm:max-w-[calc(100%-3rem)] lg:max-w-[75%]',
    },
  },
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
      }
    }
  }
})
