import {
  addServerHandler,
  createResolver,
  defineNuxtModule,
  installModule,
} from '@nuxt/kit'

import VuetifyModule from './vuetify/module'

/**
 * The module definition calling the different module setup functions
 */
export default defineNuxtModule({
  meta: {
    configKey: 'theme-module',
    compatibility: {
      nuxt: '^3.0.0',
    },
  },
  async setup () {
    const { resolve } = createResolver(import.meta.url)

    await installModule(VuetifyModule)

    addServerHandler({
      handler: resolve('server/breakpointHandler'),
      middleware: true,
    })
  },
})
