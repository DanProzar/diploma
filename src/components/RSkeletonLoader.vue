<script lang="ts" setup>
import { computed, useAttrs } from 'vue'

const props = withDefaults(defineProps<{
  loading?: boolean
  aspectRatio?: number | string
}>(), {
  loading: false,
})

const attrs = useAttrs()

const setAspectRatio = computed(() => {
  return props.aspectRatio ? `aspect-ratio: ${props.aspectRatio}` : null
})

</script>

<template>
  <div
    :class="[
      'r-skeleton-loader',
      { 'is-loading': loading },
      attrs.class
    ]"
    :style="setAspectRatio"
  />
</template>

<style lang="scss">
  @keyframes shimmer {
    0% {
      left: -100%;
    }
    100% {
      left: 100%
    }
  }

  .r-skeleton-loader {
    @apply
      relative
      bg-tw-grey_light
      opacity-0
      pointer-events-none
      overflow-hidden
      transition-opacity
      z-1

      after:(
        content-DEFAULT
        absolute
        top-0
        left-0
        block
        w-full
        h-full
        opacity-60
      )
    ;

    &::after {
      background:
        linear-gradient(
          90deg,
          theme('colors.tw-grey_light') 0%,
          theme('colors.tw-grey_white') 50%,
          theme('colors.tw-grey_light') 100%,
        )
      ;
      animation: shimmer 1.5s infinite;
    }

    &.is-loading {
      @apply
        opacity-100
        pointer-events-auto
      ;
    }
  }
</style>
