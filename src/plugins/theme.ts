import { defineNuxtPlugin } from '#app'

import { provideNuxtAsync } from '@/runtime'

import {
  INJECT_KEY,
  RThemePlugin,
} from '@/theme/plugin'

export default defineNuxtPlugin((nuxtApp) => {
  const themeInstance = new RThemePlugin()

  provideNuxtAsync(
    INJECT_KEY,
    themeInstance,
    nuxtApp,
  )
})
