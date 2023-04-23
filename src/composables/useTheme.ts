
import { INJECT_KEY, type RThemePlugin } from '@/theme'

export function useTheme () {
  const result = inject<RThemePlugin>(INJECT_KEY)

  if (!result) {
    throw new Error('Theme plugin not installed')
  }

  return result.use()
}
