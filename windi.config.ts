import { defineConfig } from 'windicss/helpers'
import { colors } from './src/helpers'

export default defineConfig({
  safelist: [],
  include: [
    'src/components/*.vue',
    'src/pages/*.vue',
    'src/scss/*.scss',
  ],
  theme: {
    colors,
  },
  shortcuts: {
    'tw-r-container': 'mx-auto w-full max-w-[calc(100%-2rem)] sm:max-w-[calc(100%-3rem)] lg:max-w-[75%]',
    'tw-r-link': 'text-secondary font-bold underline',
    'tw-r-error': 'text-error font-bold',
    'tw-p-header': 'pt-[var(--header-height)]',
    'tw-r-section': 'py-6 md:py-12 py-18',
  },
  stylesheets: [
    './src/assets/fonts/fonts.css',
  ],
})
