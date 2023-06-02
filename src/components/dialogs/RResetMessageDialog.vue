<script lang="ts" setup>
import { useVModel } from '@vueuse/core'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const proxiedModel = useVModel(props, 'modelValue', emit)

</script>

<template>
  <RDialogWrapper
    v-model="proxiedModel"
    :title="$t('dialog.reset_password.message.title')"
    class="r-reset-message-dialog"
    max-width="40rem"
  >
    <p class="r-reset-message__text">
      {{ $t('dialog.reset_password.message.text') }}
    </p>
  </RDialogWrapper>
</template>

<style lang="scss">
.r-reset-message {
  &-dialog {
    .r-dialog__title {
      @apply text-center;
    }
  }

  &__text {
    @apply text-center text-primary text-lg my-4;
  }
}
</style>
