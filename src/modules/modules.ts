import {
  defineNuxtModule,
  installModule,
} from '@nuxt/kit'

import WindiCssModule from './windicss/module'
import VuetifyModule from './vuetify/module'

/**
 * The module definition calling the different module setup functions
 */
export default defineNuxtModule({
  meta: {
    configKey: 'theme-module',
    compatibility: {
      nuxt: '^3.0.0'
    },
  },
  async setup () {

    // await installModule('@ui-library/theme-module/breakpoint')
    await installModule(VuetifyModule)
    await installModule(WindiCssModule)
    // await installModule('@ui-library/theme-module/windicss')

    // add the main plugin template
    // addPlugin(resolve('./client/plugin'), { append: true })

    // eslint-disable-next-line no-console
  },
})
