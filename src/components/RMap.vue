<script lang="ts" setup>
import { GoogleMap, Marker } from 'vue3-google-map'
import type { IRHouseLocation, IRHouseMarker } from '~/types'

const mapRef = ref<InstanceType<typeof GoogleMap> | null>(null)
const apiKey = useRuntimeConfig().public.google.maps.api

const props = withDefaults(defineProps<{
  width?: string | number
  height: string | number
  center?: IRHouseLocation
  markers?: IRHouseMarker[]
  zoom?: number
}>(), {
  width: '100%',
  center: () => ({
    lat: 48.2258,
    lng: 31.1056,
  }),
  markers: () => [],
  zoom: 5.8,
})

const emit = defineEmits<{
  (e: 'click', position: IRHouseLocation): void
}>()

const computedStyle = computed(() => {
  const metricW = typeof props.width === 'number' ? 'px' : ''
  const metricH = typeof props.height === 'number' ? 'px' : ''

  return `width: ${props.width}${metricW}; height: ${props.height}${metricH}`
})

const computedCenter = computed(() => props.center)

const onClick = (e: any) => {
  const { lat, lng } = e.latLng

  const position = {
    lat: lat(),
    lng: lng(),
  }

  emit('click', position)
}

watch(
  computedCenter,
  (center) => {
    mapRef.value?.map.panTo(center)
  },
  { deep: true },
)

const restrictBounds = {
  north: 52.3793713,
  south: 44.2924,
  west: 22.137159,
  east: 40.2204802,
}

const restriction = {
  latLngBounds: restrictBounds,
}

defineExpose({
  mapRef,
})

</script>

<template>
  <div class="r-map">
    <GoogleMap
      ref="mapRef"
      :api-key="apiKey"
      :style="computedStyle"
      :disable-double-click-zoom="true"
      :libraries="['places', 'geometry']"
      :restriction="restriction"
      language="uk"
      gesture-handling="cooperative"
      :center="center"
      :zoom="zoom"
      :min-zoom="5.8"
      :disable-default-ui="true"
      @click="onClick"
    >
      <template #default="options">
        <slot :options="options" />
        <template v-if="markers.length">
          <Marker
            v-for="(marker, i) in markers"
            :key="i"
            :options="marker"
          />
        </template>
      </template>
    </GoogleMap>
  </div>
</template>
