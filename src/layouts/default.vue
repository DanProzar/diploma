<script lang="ts" setup>
import { RAuth } from '@/composables/useAuth'
const headerHeight = useHeaderHeight()

const style = computed(() => ({
  '--header-height': `${headerHeight.value}px`,
}))

onBeforeUnmount(() => {
  RAuth.watcher?.unsubscribe()
  RAuth.watcher = null
})

</script>

<template>
  <div class="r-layout--default" :style="style">
    <slot />
  </div>
</template>

<style lang="scss">
.r-layout--default {
  @apply relative
}

</style>
