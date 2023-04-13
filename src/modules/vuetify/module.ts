import {
  addPlugin,
  createResolver,
  defineNuxtModule,
} from '@nuxt/kit'
import type { UserConfig } from 'vite'
import vuetify from 'vite-plugin-vuetify'

/**
 * Vuetify module to install and configure vuetify.
 */
export default defineNuxtModule({
  setup (options, nuxt) {
    console.info('Load vuetify theme module')

    const { resolve } = createResolver(import.meta.url)

    addPlugin(resolve('./runtime/plugin'))

    nuxt.options.build.transpile.push('vuetify')

    nuxt.options.css.push(resolve('base.scss'))

    nuxt.hook('vite:extendConfig', (config: UserConfig) => {
      config.plugins = [
        ...(
          config.plugins || []
        ),
        vuetify(),
      ]

      config.define = {
        ...(
          config.define || {}
        ),
        'process.env.DEBUG': 'false',
      }

      const vuePluginIndex = config.plugins
        .findIndex((p: any) => p.name === 'vite:vue')
      if (vuePluginIndex !== -1) {
        const vuePlugin = config.plugins.splice(vuePluginIndex, 1)[0]
        config.plugins.unshift(vuePlugin)
      }
    })
  },
})
