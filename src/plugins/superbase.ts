import { useRuntimeConfig } from '#app'
import { createClient } from '@supabase/supabase-js'
import { SUPERBASE_KEY } from '@/utils'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig().public

  const superbase = createClient(
    config.superbase.url,
    config.superbase.key,
  )

  nuxtApp.vueApp.provide(SUPERBASE_KEY, superbase)

  return {
    provide: {
      [SUPERBASE_KEY]: superbase,
    },
  }
})
