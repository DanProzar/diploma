import { useNuxtApp } from '#app'
import type { SupabaseClient } from '@supabase/supabase-js'
import { SUPERBASE_KEY } from '@/utils'

export const CDN_URL = 'https://bagibsgyjpjkhgvggnwv.supabase.co/storage/v1/object/public/media'

export function useSuperbase (): SupabaseClient {
  const nuxtApp = useNuxtApp()

  if (nuxtApp[`$${SUPERBASE_KEY}`]) {
    return nuxtApp[`$${SUPERBASE_KEY}`]
  }

  return inject(SUPERBASE_KEY)!
}

export function useCdnURL (uri = '') {
  return `${CDN_URL}/${uri}`
}

export function useBackground (uri = '') {
  return {
    backgroundImage: `url('${CDN_URL}/${uri}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }
}
