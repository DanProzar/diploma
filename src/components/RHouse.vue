<script lang="ts" setup>
import type { IRHouseData } from '@/types'

defineProps<{
  data: IRHouseData
  image: string
}>()

</script>

<template>
  <div class="r-house">
    <RHousePanel
      :data="data"
      :image="image"
      :vertical="true"
      :editable="false"
      :limited-description="true"
    />
  </div>
</template>

<style lang="scss">
.r-house {
}
</style>
