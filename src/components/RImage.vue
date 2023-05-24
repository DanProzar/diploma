<script lang="ts" setup>
import { useMounted } from '@vueuse/core'

const props = withDefaults(defineProps<{
  src: string
  aspectRatio?: number | string
  fetchPrio?: string
  alt?: string
  lazy?: boolean
  to?: string
  contain?: boolean | ''
  caption?: {
    text: string
    color?: 'white' | 'black'
  } | null
}>(), {
  alt: 'image',
  aspectRatio: 'auto',
  fetchPrio: 'auto',
  lazy: true,
  caption: null,
  contain: false,
})

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
  (e: 'loaded', status: boolean): true
  (e: 'action', event: MouseEvent): void
}>()

const isMounted = useMounted()

const imageRef: Ref<HTMLImageElement | null> = ref(null)
const imgLoaded = ref<boolean>(false)
const ssrImageElement = ref<string>('')

const isContainImage = computed(() => props.contain || props.contain === '')

const style = computed(() => {
  if (props.aspectRatio) {
    return {
      aspectRatio: props.aspectRatio,
    }
  }

  return null
})

onServerPrefetch(() => {
  ssrImageElement.value = `<img
    src="${props.src}"
    alt="${props.alt}" 
  />`
})

const onImageLoad = () => {
  imgLoaded.value = !!imageRef.value?.complete
  emit('loaded', imgLoaded.value)
}

const onClick = (e: MouseEvent) => {
  emit('click', e)

  if (props.to) {
    navigateTo(props.to)
  }
}

</script>

<template>
  <div
    :class="[
      'r-image',
      $attrs.class,
      {
        'r-image--contained': isContainImage,
        'r-image--clickable': !!to,
      }
    ]"
    @click="onClick"
  >
    <RSkeletonLoader
      :class="[
        'r-image__skeleton',
        { 'r-image__skeleton--hide': imgLoaded }
      ]"
      :loading="!imgLoaded && props.lazy"
      :aspect-ratio="aspectRatio"
    />
    <div
      :style="style"
      :class="[
        'r-image__img',
        {
          'r-image__img--contained': isContainImage
        }
      ]"
    >
      <img
        ref="imageRef"
        v-lazy-src="src"
        :fetchPriority="fetchPrio"
        :alt="alt"
        @load="onImageLoad"
      >

      <noscript
        v-if="!isMounted"
        v-html="ssrImageElement"
      />
    </div>

    <p
      v-if="caption"
      :class="[
        'r-image__img-caption',
        {
          [`r-image__img-caption--${caption.color}`]: !!caption.color,
        }
      ]"
    >
      <span>
        {{ caption.text }}
      </span>
    </p>
  </div>
</template>

<style lang="scss">
.r-image {
  @apply
    overflow-hidden
    relative
    text-center
    flex
    flex-col
    justify-center
  ;

  &--clickable {
    img {
      @apply cursor-pointer;
    }
  }

  &--contained {
    @apply w-full;
  }

  &__img {
    @apply
      relative
      overflow-hidden
      flex
      items-center
      flex-col
      justify-center
      w-full
      h-full
      bg-transparent
    ;

    &-caption {
      @apply
        mt-1
        text-[0.375rem]
        text-center
        md:(text-[0.5rem])
        lg:(text-[0.625rem])
      ;

      &--white {
        @apply '!text-white';
      }

      &--black {
        @apply '!text-tw-primary';
      }
    }

    img {
      @apply
        max-w-full
        max-h-full
      ;
    }

    &--contained img {
      @apply
        w-full
        h-full
        object-cover
      ;
    }
  }

  &__skeleton {
    @apply
      '!absolute'
      top-0
      right-0
      left-0
      bottom-0
      transition
      '!z-6'
    ;

    &--hide {
      @apply
        opacity-0
        hidden
      ;
    }
  }
}
</style>
