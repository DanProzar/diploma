<script lang="ts" setup>

withDefaults(defineProps<{
  data: string[]
  height?: number | string
}>(), {
  data: () => [],
  height: '500px',
})

const currentMediaItem = ref(0)

</script>

<template>
  <div class="r-house-gallery">
    <VCarousel
      v-if="data.length"
      v-model="currentMediaItem"
      continuous
      :height="height"
      hide-delimiter-background
      class="r-house-gallery-carousel"
    >
      <VCarouselItem
        v-for="(image, index) in data"
        :key="index"
        class="r-house-gallery-item"
      >
        <VImg
          :src="image"
          class="r-house-gallery-item__image"
          max-height="100%"
        />
      </VCarouselItem>
    </VCarousel>
  </div>
</template>

<style lang="scss">
.r-house-gallery {

}
</style>
