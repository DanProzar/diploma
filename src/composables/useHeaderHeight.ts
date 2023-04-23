import { tryOnMounted } from '@vueuse/core'
import { type Ref } from 'vue'

/**
 * Return window height without header
 */
export function useHeaderHeight (): Ref<number> {
  const headerHeight = ref()

  tryOnMounted(() => {
    headerHeight.value = document?.querySelector?.('header')?.offsetHeight || 0
  })

  return headerHeight
}
