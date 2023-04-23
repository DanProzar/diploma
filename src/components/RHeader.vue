<script lang="ts" setup>
import { mdiCheckCircle } from '@mdi/js'
import { AUTH_TYPE } from '../types'

const provideHouse = ref(false)
const { state } = useAuth()

const onGoAuth = () => {

}

</script>

<template>
  <header class="r-header">
    <div class="r-container">
      <div class="r-header__header">
        <div class="r-header__logo">
          <img :src="useCdnURL('header/logo.png')" alt="logo">
        </div>
        <div class="r-header__actions">
          <VBtn
            color="#ffffff"
            variant="outlined"
          >
            {{ $t('auth.refugee.title') }}
          </VBtn>

          <VBtn
            color="#ffffff"
            variant="outlined"
            @click="provideHouse = true"
          >
            {{ $t('auth.householder.title') }}
          </VBtn>
        </div>
      </div>
    </div>

    <RProvideHouseDialog
      v-model="provideHouse"
    />
  </header>
</template>

<style lang="scss">
.r-header {
  @apply absolute top-0 left-0 right-0 z-5;

  &__header {
    @apply py-4 flex items-center justify-between;
  }

  .r-container {
    @apply tw-r-container;
  }

  &__logo {
    @apply w-15 h-15;
    img {
      @apply w-full h-full object-contain;
    }
  }

  &__actions {
    @apply flex gap-4;
  }
}
</style>
