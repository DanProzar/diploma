import VueCropper from 'vue-cropper'

export default defineNuxtPlugin(async (nuxtApp) => {
  nuxtApp.vueApp.use(VueCropper)
})
