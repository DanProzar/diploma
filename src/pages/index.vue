<script lang="ts" setup>
import { GoogleMap, Marker, InfoWindow, CustomMarker, CustomControl, MarkerCluster } from 'vue3-google-map'
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

</script>

<template>
  <div class="refugee-page">
    <section class="refugee-banner" :style="`background-image: url('${useCdnURL('home/banner.jpg')}')`">
      <div class="sus">
        <VTextField
          v-model="email"
          type="email"
          label="E-mail"
          bg-color="#ffffff"
          required
        />
      </div>
    </section>
  </div>
</template>

<style lang="scss">
.refugee {
  &-banner {
    @apply
    bg-no-repeat
    bg-center
    bg-cover
    w-full
    relative
    h-[100vh];

    &::before {
      content: '';
      @apply
      absolute
      top-0
      left-0
      right-0
      bottom-0
      bg-opacity-55
      bg-dark-900
      ;
    }

    .sus {
      @apply tw-refugee-container;
    }
  }
}
</style>