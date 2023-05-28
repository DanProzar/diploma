<script lang="ts" setup>
import { InfoWindow, Marker } from 'vue3-google-map'
import { mdiArrowDownThin } from '@mdi/js'
import type { IRHouseData } from '@/types'

const houseSectionRef = ref<HTMLElement | null>(null)

const { transformCoords } = useMap()

const {
  allHouses,
  getAllHouses,
} = useHouses()

await useAsyncData(async () => {
  return await getAllHouses()
})

const houseData = computed<any>(() =>
  allHouses.value.map((house: IRHouseData) => ({
    marker: {
      ...transformCoords(house.location.coords),
      icon: useCdnURL('map/marker.svg'),
    },
    link: `/houses/${house.id}`,
    house,
  })),
)

const onScrollDown = () => {
  houseSectionRef.value?.scrollIntoView({
    block: 'start',
    behavior: 'smooth',
  })
}

definePageMeta({
  name: 'home',
})

</script>

<template>
  <div class="r-main">
    <RHeader />

    <VParallax
      :src="useCdnURL('home/banner.png')"
      :scale="0.1"
    >
      <section
        class="r-main-banner"
      >
        <div class="tw-r-container">
          <h1 class="r-main-banner__title">
            {{ $t('home.banner.title') }}
          </h1>

          <p class="r-main-banner__subtitle">
            {{ $t('home.banner.subtitle') }}
          </p>
        </div>

        <div class="r-main-banner__down">
          <VBtn
            :icon="mdiArrowDownThin"
            variant="flat"
            color="white"
            @click="onScrollDown"
          />
        </div>
      </section>
    </VParallax>

    <section ref="houseSectionRef" class="r-main-houses">
      <RMap
        height="100vh"
      >
        <Marker
          v-for="house in houseData"
          :key="house.marker.position.lat"
          :options="house.marker"
        >
          <InfoWindow class="r-main-houses__info-window">
            <RHouseInfo
              :data="house.house"
              :limited-description="true"
              :to="`/houses/${house.house.id}`"
              :show-date="false"
            />
          </InfoWindow>
        </Marker>
      </RMap>
    </section>
  </div>
</template>

<style lang="scss">
@import '@/scss/main.scss';

.r-main {
  .r-header {
    @apply absolute;
  }

  &-banner {
    @apply
      bg-no-repeat
      bg-center
      bg-cover
      w-full
      relative
      min-h-screen
      text-white
      flex
      items-center
      justify-center
      flex-col
      z-2
    ;

    &__title {
      @apply text-5xl text-center font-bold;
    }

    &__subtitle {
      @apply mt-4 text-2xl text-center;
    }

    &__down {
      @apply
        absolute
        left-0
        right-0
        mx-auto
        bottom-0
        text-center
      ;
    }
  }

  &-houses {
    &__info-window {
      @apply max-w-100;
    }
  }
}
</style>
