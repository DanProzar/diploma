import { type NuxtApp, useNuxtApp } from '#app'

export function provideNuxt<T> (name: string, value: T, nuxtApp?: NuxtApp) {
  if (!nuxtApp) {
    nuxtApp = useNuxtApp()
  }

  nuxtApp.provide(name, value)
}

export function injectNuxt<T> (
  name: string,
  nuxtApp?: NuxtApp,
): T | undefined {
  if (!nuxtApp) {
    nuxtApp = useNuxtApp()
  }

  if (nuxtApp[`$${name}`]) {
    return nuxtApp[`$${name}`]
  }
}
