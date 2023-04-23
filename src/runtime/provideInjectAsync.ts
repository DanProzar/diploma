import { type NuxtApp, useNuxtApp } from '#app'

type RAsyncProvider<T> = {
  loader?: Promise<T>
  resolve?: (value: T) => void
}

export function provideNuxtAsync<T> (name: string, value: T, nuxtApp?: NuxtApp) {
  if (!nuxtApp) {
    nuxtApp = useNuxtApp()
  }

  nuxtApp.vueApp.provide(name, value)

  if (nuxtApp[`$${name}`]) {
    (nuxtApp[`$${name}`] as RAsyncProvider<T>).resolve!(value)

    return
  }

  nuxtApp.provide(name, { loader: new Promise<T>(resolve => resolve(value)) })
}

export function injectNuxtAsync<T> (
  name: string,
  nuxtApp?: NuxtApp,
): Promise<T> {
  if (!nuxtApp) {
    nuxtApp = useNuxtApp()
  }

  if (nuxtApp[`$${name}`]) {
    return (nuxtApp[`$${name}`] as RAsyncProvider<T>).loader!
  }

  const asyncProvider: RAsyncProvider<T> = {}

  asyncProvider.loader = new Promise<T>((resolve) => {
    asyncProvider.resolve = resolve
  })

  nuxtApp!.provide(name, asyncProvider)

  return asyncProvider.loader
}
