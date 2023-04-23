import { type App, type Ref, computed, ref } from 'vue'
import { useBreakpoints, useMounted } from '@vueuse/core'

/**
 * Composable key of vuetify
 */
export const INJECT_KEY = 'theme-module-breakpoint'

/**
 * Module which takes care of breakpoint runtime actions
 */
export class RTheme {
  private readonly ssrDisplayState?: Ref<any>

  constructor (
    ssrDisplayState?: Ref<any>,
  ) {
    this.ssrDisplayState = ssrDisplayState
  }

  protected buildThemeBreakPoints () {
    const breakpoints = useBreakpoints({
      xs: 0,
      sm: 600,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    })

    const breakpoint = {
      xs: breakpoints.between('xs', 'sm'),
      sm: breakpoints.between('sm', 'md'),
      md: breakpoints.between('md', 'lg'),
      lg: breakpoints.between('lg', 'xl'),
      xl: breakpoints.between('xl', 'xxl'),
      xxl: breakpoints.greaterOrEqual('xxl'),
      smAndUp: breakpoints.greaterOrEqual('sm'),
      mdAndUp: breakpoints.greaterOrEqual('md'),
      lgAndUp: breakpoints.greaterOrEqual('lg'),
      xlAndUp: breakpoints.greaterOrEqual('xl'),
      smAndDown: breakpoints.smaller('md'),
      mdAndDown: breakpoints.smaller('lg'),
      lgAndDown: breakpoints.smaller('xl'),
      xlAndDown: breakpoints.smaller('xxl'),
    }

    return breakpoint
  }

  getBreakpoints () {
    const themeBreakpoints = this.buildThemeBreakPoints()
    const breakpoint = computed(() => themeBreakpoints)

    const mounted = useMounted()

    const useCurrentDisplay = computed(
      () => mounted.value || !this.ssrDisplayState,
    )

    return {
      name: computed(() => {
        if (!useCurrentDisplay.value) {
          return this.ssrDisplayState!.value.name
        }

        if (breakpoint.value.xs.value) {
          return 'xs'
        } else if (breakpoint.value.sm.value) {
          return 'sm'
        } else if (breakpoint.value.md.value) {
          return 'md'
        } else if (breakpoint.value.lg.value) {
          return 'lg'
        } else if (breakpoint.value.xl.value) {
          return 'xl'
        } else {
          return 'xxl'
        }
      }),
      xs: computed(() => useCurrentDisplay.value
        ? breakpoint.value.xs.value
        : this.ssrDisplayState!.value.xs),
      sm: computed(() => useCurrentDisplay.value
        ? breakpoint.value.sm.value
        : this.ssrDisplayState!.value.sm),
      md: computed(() => useCurrentDisplay.value
        ? breakpoint.value.md.value
        : this.ssrDisplayState!.value.md),
      lg: computed(() => useCurrentDisplay.value
        ? breakpoint.value.lg.value
        : this.ssrDisplayState!.value.lg),
      xl: computed(() => useCurrentDisplay.value
        ? breakpoint.value.xl.value
        : this.ssrDisplayState!.value.xl),
      xxl: computed(() => useCurrentDisplay.value
        ? breakpoint.value.xxl.value
        : this.ssrDisplayState!.value.xxl),
      smAndUp: computed(() => useCurrentDisplay.value
        ? breakpoint.value.smAndUp.value
        : this.ssrDisplayState!.value.smAndUp),
      mdAndUp: computed(() => useCurrentDisplay.value
        ? breakpoint.value.mdAndUp.value
        : this.ssrDisplayState!.value.mdAndUp),
      lgAndUp: computed(() => useCurrentDisplay.value
        ? breakpoint.value.lgAndUp.value
        : this.ssrDisplayState!.value.lgAndUp),
      xlAndUp: computed(() => useCurrentDisplay.value
        ? breakpoint.value.xlAndUp.value
        : this.ssrDisplayState!.value.xlAndUp),
      smAndDown: computed(() => useCurrentDisplay.value
        ? breakpoint.value.smAndDown.value
        : this.ssrDisplayState!.value.smAndDown),
      mdAndDown: computed(() => useCurrentDisplay.value
        ? breakpoint.value.mdAndDown.value
        : this.ssrDisplayState!.value.mdAndDown),
      lgAndDown: computed(() => useCurrentDisplay.value
        ? breakpoint.value.lgAndDown.value
        : this.ssrDisplayState!.value.lgAndDown),
      xlAndDown: computed(() => useCurrentDisplay.value
        ? breakpoint.value.xlAndDown.value
        : this.ssrDisplayState!.value.xlAndDown),
      thresholds: computed(
        () => breakpoint.value,
      ),
    }
  }

  init () {
  }

  /**
   * Install the composable in the vue instance
   * @param app The vue app
   */
  install (app: App) {
    app.provide(INJECT_KEY, this)
  }
}
