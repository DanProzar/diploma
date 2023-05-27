<script lang="ts" setup>
import { InfoWindow, Marker } from 'vue3-google-map'

let id = useRoute().params.id

const { get, getHouseImages, supabase } = useHouses()
const {
  formatAddress,
} = useMap()

const mapRef = ref()

const { data: house } = await useAsyncData(async () => {
  try {
    if (Array.isArray(id)) {
      id = id[0].toString()
    }

    const data = await get(id)

    if (!data) {
      return null
    }

    const { data: householders, error } = await supabase
      .from('householders')
      .select('*')
      .eq('user_id', data.householder_id)

    if (!householders || error) {
      return null
    }

    return {
      data,
      householder: householders[0],
    }
  } catch (e) {
    console.error(e)
  }
})

const marker = computed(() => {
  const coords = house.value?.data.location.coords
  const position = {
    lat: Number(coords!.lat),
    lng: Number(coords!.lng),
  }

  return {
    position,
  }
})

const route = computed(() =>
  `https://www.google.com/maps/place/?q=place_id:${house.value?.data.place_id}`,
)

const onGoRoute = () => {
  window.open(route.value)
}

</script>

<template>
  <div v-if="house" class="r-house-page">
    <RHeader :dark="false" />

    <div class="tw-r-container r-house__container">
      <div class="r-house__block">
        <RHouseGallery
          :data="house.data.transformed_media"
          height="auto"
        />

        <RHouseInfo
          :data="house.data"
          :show-user-info="true"
          class="r-house__info"
        />
      </div>

      <RMap
        ref="mapRef"
        height="600px"
        :center="marker.position"
        :zoom="9"
      >
        <Marker :options="marker">
          <InfoWindow>
            <VBtn
              color="secondary"
              @click="onGoRoute"
            >
              {{ $t('houses.page.map.get_route') }}
            </VBtn>
          </InfoWindow>
        </Marker>
      </RMap>
    </div>
  </div>
</template>

<style lang="scss">
.r-house {
  &__container {
    @apply tw-r-section;
  }

  &__block {
    @apply mb-12 grid gap-12 grid-cols-1 lg:grid-cols-2;
  }

  &__info {
    @apply <lg:(-order-1);
    .r-house-info {
      &__added {
        @apply self-start;
      }
    }
  }
}
</style>
