import * as MaskLib from 'maska'

export default defineNuxtPlugin((nuxtApp) => {
  const maskDirective = {
    mounted (el: HTMLElement, mask: any) {
      MaskLib.maska(el, mask)
    },
  }

  nuxtApp.vueApp.directive('mask', maskDirective)
})
