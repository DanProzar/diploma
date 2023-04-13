import { SUPERBASE_KEY } from '@/utils'
import { SupabaseClient } from '@supabase/supabase-js'
import { useNuxtApp } from '#app'

export function useSuperbase (): SupabaseClient {
  const nuxtApp = useNuxtApp()

  if (nuxtApp[`$${SUPERBASE_KEY}`]) {
    return nuxtApp[`$${SUPERBASE_KEY}`]
  }

  return inject(SUPERBASE_KEY)!
}

export function useCdnURL (uri = '') {
  return `https://bagibsgyjpjkhgvggnwv.supabase.co/storage/v1/object/public/media/${uri}`
}