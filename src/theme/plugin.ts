import { type App } from 'vue'

/**
 * Composable key of the theme module
 */
export const INJECT_KEY = 'theme-module'

/**
 * Composable which takes care of ThemeModule runtime actions
 */
export class RThemePlugin {
  /**
   * Registered theme modules
   */
  readonly modules: Record<string, any>
  /**
   * Provider to get a new breakpoint instance
   * @protected
   */
  protected breakpointProvider?: any
  /**
   * Flag to keep track of the initialization status
   * @protected
   */
  protected initialized = false

  constructor (
    modules: Record<string, any> = {},
    breakpointProvider?: any,
  ) {
    this.modules = modules
    this.breakpointProvider = breakpointProvider
  }

  registerBreakpointProvider (provider: any) {
    if (this.breakpointProvider) {
      throw new Error('Breakpoint provider already registered')
    }

    this.breakpointProvider = provider
  }

  registerThemeModule (name: string, themeModule: any) {
    if (this.modules[name]) {
      throw new Error(
        `There is already a theme module with this name '${name}'`,
      )
    }

    this.modules[name] = themeModule
  }

  use () {
    if (!this.breakpointProvider) {
      throw new Error('No breakpoint provider installed')
    }

    if (!this.initialized) {
      for (const themeModule of Object.values(this.modules)) {
        themeModule.init()
      }
    }

    return this
  }

  get breakpoints () {
    return this.breakpointProvider!.getBreakpoints()
  }

  install (app: App) {
    app.provide(INJECT_KEY, this)
  }
}
