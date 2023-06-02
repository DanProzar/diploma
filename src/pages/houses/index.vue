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

    <div class="tw-r-container">
      <h1 class="r-houses__title">
        {{ $t('houses.page.title') }}
      </h1>

      <div v-if="allHouses?.length" class="r-houses__wrapper">
        <RHouse
          v-for="house in allHouses"
          :key="house.id!.toString()"
          :data="house"
          :image="house.transformed_media?.[0]"
        />
      </div>
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

  &__title {
    @apply
      text-3xl
      mt-4
      text-center
      text-secondary
      font-bold
    ;
  }
}
</style>
