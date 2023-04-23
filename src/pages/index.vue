<script lang="ts" setup>
import { CustomControl, CustomMarker, GoogleMap, InfoWindow, Marker, MarkerCluster } from 'vue3-google-map'
import { useMounted } from '@vueuse/core'
import type { USER_TYPE } from '@/types'

const client = useSuperbase()
// const { data: user } = await client.auth.getUser()

// let { data: householders, error } = await client
//   .from('houses')
//   .select('title')

// const { data: d } = await client.storage.updateBucket('media', {
//   public: true
// })
// const {data: sus} = await client.storage.from('media').getPublicUrl('avatars/Screenshot_1.png')

// const onClick = async () => {
//   // const {data, error} = await client.auth.signInWithOAuth({ provider: 'google' })
// }

// const avatarFile = ref<File | null>(null)

// const imgRef = ref<HTMLImageElement>()

// const setActiveFile = (event: any) => {
//   avatarFile.value = event.target.files[0]
// }

// const onUploadAvatar = async () => {
//   if (!avatarFile.value) {
//     return
//   }

//   const { data: dataPath, error } = await client.storage
//     .from('media')
//     .upload(
//       `avatars/${user.user?.id}/avatar`,
//       avatarFile.value
//     )

//   if (error || !dataPath) {
//     console.error(error.message);
//     return
//   }

//   if (!imgRef.value) {
//     return
//   }

//   imgRef.value.src = useCdnURL(dataPath.path)
// }

const config = useRuntimeConfig().public
const email = ref('')

const mounted = useMounted()
const welcome = ref(false)

const onRegister = (asWho: USER_TYPE) => {
  console.log(asWho)
}

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
    h-screen
    ;

    .sus {
      @apply tw-r-container;
    }
  }
}
</style>
