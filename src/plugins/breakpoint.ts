import { INJECT_KEY, RTheme } from '@/services'
import { injectNuxtAsync } from '@/runtime'
import { type RThemePlugin, INJECT_KEY as THEME_INJECT_KEY } from '@/theme'
import { getBreakpointFromSsrBreakpoint } from '@/theme'

export default defineNuxtPlugin((nuxtApp) => {
  const request = useRequestEvent()

  const ssrBreakpointState = useState(
    'ssr-breakpoints',
    request
      ? () => getBreakpointFromSsrBreakpoint(request.context.breakpoint!)
      : undefined,
  )

  const themeModule = new RTheme(
    ssrBreakpointState,
  )

  useThemeAsync().then((themePlugin) => {
    themePlugin.registerThemeModule(INJECT_KEY, themeModule)
    themePlugin.registerBreakpointProvider(themeModule)
  })
})

export async function useThemeAsync () {
  const result = injectNuxtAsync<RThemePlugin>(THEME_INJECT_KEY)

  if (!result) {
    throw new Error('Theme plugin not installed async')
  }

  return result
}
