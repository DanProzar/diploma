import { useState } from '#imports'

import { type ComputedRef, type Ref, computed, ref } from 'vue'

export class SsrComputed<T = any> {
  public readonly orgData: Ref<T>
  public readonly ssrData: Ref<T>
  protected readonly hydrationNeeded: Ref<boolean>
  protected readonly isHydrated: Ref<boolean>

  public readonly data: ComputedRef<T>
  public readonly hydrated: Ref<boolean>

  constructor (key: string, dataGetter: () => T) {
    this.orgData = computed(dataGetter)
    this.ssrData = useState(`${key}-data`, () => this.orgData.value)
    this.hydrationNeeded = useState(`${key}-hydration`, () => process.server)
    this.isHydrated = ref(false)

    this.data = computed(() => {
      if (this.hydrationNeeded.value && !this.isHydrated.value) {
        return this.ssrData.value
      }

      return this.orgData.value
    })

    this.hydrated = computed(() => {
      return !this.hydrationNeeded.value || this.isHydrated.value
    })

    this.onHydrated = this.onHydrated.bind(this)
  }

  onHydrated () {
    this.isHydrated.value = true
  }
}

export function useSsrComputed<T = any> (key: string, dataGetter: () => T) {
  return new SsrComputed(key, dataGetter)
}
