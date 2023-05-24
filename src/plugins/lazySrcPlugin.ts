type Image = HTMLImageElement & {
  lazySrc: string
  isIntersecting?: boolean
}

const lazyObserver = typeof window !== 'undefined'
  && 'IntersectionObserver' in window
  && new IntersectionObserver(
    (entries) => {
      entries
        .filter(entry => entry.isIntersecting)
        .forEach(entry => loadImage(entry.target as Image))
    },
    {
      rootMargin: `${window.screen.height / 2}px 0px`,
      threshold: 0,
    },
  )

async function loadImage (imageEl: Image) {
  const src = imageEl.lazySrc
  imageEl.isIntersecting = true

  imageEl.setAttribute('src', src)

  unObserveImage(imageEl)
}

function unObserveImage (imageEl: HTMLImageElement) {
  if (lazyObserver) {
    lazyObserver.unobserve(imageEl)
  }
}

const LazySrc = {
  async mounted (imageEl: Image, { value }: { value: string }) {
    imageEl.lazySrc = value

    if (lazyObserver) {
      lazyObserver.observe(imageEl)
    } else {
      await loadImage(imageEl)
    }
  },
  async updated (imageEl: Image, { value }: { value: string }) {
    if (imageEl.lazySrc === value) {
      return
    }

    imageEl.lazySrc = value

    if (imageEl.isIntersecting) {
      await loadImage(imageEl)
    }
  },
  unmounted (imageEl: Image) {
    unObserveImage(imageEl)
  },
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('lazy-src', LazySrc)
})
