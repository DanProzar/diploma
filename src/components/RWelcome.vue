<script lang="ts" setup>
import { useVModel } from '@vueuse/core'
import { USER_TYPE } from '@/types'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'click', asWho: USER_TYPE): void
}>()

const proxiedModel = useVModel(props, 'modelValue', emit)

const onClick = (asWho: USER_TYPE) => {
  emit('click', asWho)
  proxiedModel.value = false
}

</script>

<template>
  <VDialog
    v-model="proxiedModel"
    :fullscreen="true"
    width="100%"
    height="100%"
  >
    <div class="r-welcome">
      <div
        class="r-welcome__left"
        @click="onClick(USER_TYPE.Householder)"
      >
        <h2>{{ $t('welcome.provide') }}</h2>
      </div>
      <div
        class="r-welcome__right"
        @click="onClick(USER_TYPE.Refugee)"
      >
        <h2>{{ $t('welcome.need') }}</h2>
      </div>
    </div>
  </VDialog>
</template>

<style lang="scss">
.r-welcome {
  @apply
  w-full
  h-screen
  items-stretch
  overflow-hidden
  relative
  text-white
  fixed
  top-0
  left-0
  right-0
  bottom-0
  z-100
  flex;

  & > div {
    @apply
    flex
    items-center
    justify-center
    transition-all
    flex-shrink-1
    relative
    cursor-pointer
    bg-[var(--welcome-option-bg)]
    basis-1/2
    ;

    h2 {
      @apply text-4xl transform transition-transform;
    }

    &:hover {
      @apply
      transition-all
      transform
      basis-3/5
      ;

      h2 {
        @apply scale-125;
      }
    }
  }

  &__left {
    --welcome-option-bg: #1e3a8a;
  }

  &__right {
    --welcome-option-bg: #064e3b;
  }
}

</style>
