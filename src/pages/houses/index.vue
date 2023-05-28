<script lang="ts" setup>
const { user } = useAuth()
const {
  getAllHouses,
  allHouses,
} = useHouses()

definePageMeta({
  name: 'houses',
})

await getAllHouses()

</script>

<template>
  <div class="r-houses-page">
    <RHeader :dark="false" />

    <div class="tw-r-container r-houses__wrapper">
      <RHouse
        v-for="house in allHouses"
        :key="house.id!.toString()"
        :data="house"
        :image="house.transformed_media?.[0]"
      />
    </div>
  </div>
</template>

<style lang="scss">
.r-houses {
  &__wrapper {
    @apply
    tw-r-section
    grid
    gap-6
    grid-cols-1
    md:grid-cols-2
    xl:grid-cols-3;
  }
}
</style>
