<script lang="ts" setup>
const headerHeight = useHeaderHeight()

const style = computed(() => ({
  '--header-height': `${headerHeight.value}px`,
}))

</script>

<template>
  <div class="refugee-new-home" :style="style">
    <NuxtPage />
  </div>
</template>

<style lang="scss">
.refugee-new-home {
  @apply relative
}
.r-container {
  @apply tw-r-container;
}
</style>
