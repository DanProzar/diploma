import { createI18n } from 'vue-i18n'

import messages from '@intlify/unplugin-vue-i18n/messages'

// @ts-ignore
export default defineNuxtPlugin((nuxtApp) => {
  const { vueApp } = nuxtApp
  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    silentTranslationWarn: true,
    locale: 'ua',
    messages,
  })

  vueApp.use(i18n)
})
