<script lang="ts" setup>
import { CustomControl, CustomMarker, GoogleMap, InfoWindow, Marker, MarkerCluster } from 'vue3-google-map'
import { useMounted } from '@vueuse/core'
import { mdiAccount } from '@mdi/js'
import type { USER_TYPE } from '@/types'

const { user } = useAuth()
const config = useRuntimeConfig().public
const email = ref('')

const mounted = useMounted()
const welcome = ref(false)

const onRegister = (asWho: USER_TYPE) => {
}

const center = { lat: 40.689247, lng: -74.044502 };

</script>

<template>
  <div class="refugee-page">
    <RHeader />

    <RWelcome
      v-model="welcome"
      @click="onRegister"
    />

    <section
      class="refugee-banner"
      :style="useBackground('home/banner.jpg')"
    >
      <div class="tw-r-container">
        
      </div>
    </section>
  </div>
</template>

<style lang="scss">
@import '@/scss/main.scss';

.refugee {
  &-banner {
    @include useBackdrop();
    @apply
    bg-no-repeat
    bg-center
    bg-cover
    w-full
    relative
    min-h-screen
    tw-p-header
    z-2
    ;
  }

  &-page {
    .r-header {
      @apply absolute;
    }
  }
}
</style>
