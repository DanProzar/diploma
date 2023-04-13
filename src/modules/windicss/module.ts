import {
  addPlugin,
  createResolver,
  defineNuxtModule,
  installModule,
} from '@nuxt/kit'
import type { FullConfig } from 'windicss/types/interfaces'


export default defineNuxtModule({
  meta: {
    name: 'windiCssModule',
    configKey: 'windiCss',
  },
  async setup ({
    windicss,
  }, nuxt) {
    console.info('Load windicss theme module')

    await installModule('nuxt-windicss')

    nuxt.hook('windicss:config' as any, (options: FullConfig) => {
      if (!options) {
        options = {}
      }
      options.plugins = [
        // @ts-ignore
        require('windicss/plugin/typography')(),
        // @ts-ignore
        require('windicss/plugin/aspect-ratio'),
        // @ts-ignore
        require('windicss/plugin/line-clamp'),
      ]
      options.shortcuts = windicss?.shortcuts
      if (!options.scanOptions) {
        options.scanOptions = {}
      }
      if (!options.extract) {
        options.extract = {}
      }
      if (windicss?.include) {
        options.scanOptions.dirs = windicss.include
        options.extract.include = windicss.include
      }
      if (windicss?.exclude) {
        options.scanOptions.exclude = windicss.exclude
        options.extract.exclude = windicss.exclude
      }
    })
    nuxt.hook('windicss:options' as any, (options: FullConfig) => {
      options.scanOptions.include.push(...(
        windicss?.include || []
      ))
      options.scanOptions.exclude = windicss?.exclude
    })

    // const { resolve } = createResolver(import.meta.url)

    // install the module plugin
    // addPlugin(resolve('./runtime/plugin'))
  },
})

