<script lang="ts" setup>

const supabase = useSuperbase()
const { user } = useAuth()
const {
  allHouses,
  allImages,
  getAllHouseImages,
  getAllHouses,
  loadUserHouses,
  houses,
} = useHouses()

watch(user, async (newUser, oldUser) => {
  if (newUser && !oldUser) {
    await loadUserHouses()
  }
}, { immediate: true })

</script>

<template>
  <div class="r-houses-page">
    <RHeader :dark="false" />

    <div class="tw-r-container r-houses__wrapper">
      <RHouse
        v-for="house in houses"
        :key="house.id!.toString()"
        :data="house"
        :image="house.media[0]"
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
