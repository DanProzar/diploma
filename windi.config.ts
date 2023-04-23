import { defineConfig } from 'windicss/helpers'
import { colors } from '@/helpers'

export default defineConfig({
  safelist: [],
  include: [
    'src/components/*.vue',
    'src/pages/*.vue',
    'src/scss/main.scss',
  ],
  theme: {
    colors,
  },
  shortcuts: {
    'tw-r-container': 'mx-auto w-full max-w-[calc(100%-2rem)] sm:max-w-[calc(100%-3rem)] lg:max-w-[75%]',
  },
  stylesheets: [
    './src/assets/fonts/fonts.css',
  ],
})
