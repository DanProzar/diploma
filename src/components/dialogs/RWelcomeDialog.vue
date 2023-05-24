<script lang="ts" setup>
import { mdiCheckCircle } from '@mdi/js'
import { useVModel } from '@vueuse/core'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'close'): void
}>()

const proxiedModel = useVModel(props, 'modelValue', emit)

const { t } = useI18n()

const computedButtonText = computed(() => {
  return `${t('auth.login.title')} / ${t('auth.register.title')}`
})

const onClose = () => {
  proxiedModel.value = false
  emit('close')
}

</script>

<template>
  <RDialogWrapper
    v-model="proxiedModel"
    :title="true"
    class="r-provide-house-dialog"
    max-width="40rem"
    content-class="r-provide-house-dialog__content"
  >
    <template #title>
      <div class="r-provide-house-dialog__title">
        {{ $t('dialog.provideHouse.title') }}
      </div>
    </template>

    <div class="r-provide-house-dialog__description">
      {{ $t('dialog.provideHouse.description') }}
    </div>

    <ul class="r-provide-house-dialog__list">
      <li
        v-for="(n, i) in 3"
        :key="i"
        class="r-provide-house-dialog__hint"
      >
        <VIcon
          color="secondary"
          :icon="mdiCheckCircle"
          :start="true"
        />
        <p>
          {{ $t(`dialog.provideHouse.steps[${i}]`) }}
        </p>
      </li>
    </ul>

    <VBtn
      color="secondary"
      :ripple="false"
      class="r-provide-house-dialog__button"
      @click="onClose"
    >
      <span>{{ computedButtonText }}</span>
    </VBtn>
  </RDialogWrapper>
</template>

<style lang="scss">
.r-provide-house-dialog {
  @apply text-primary;

  &__title {
    @apply text-2xl font-bold;
  }

  &__description {
    @apply my-4 text-lg;
  }

  &__content {
    @apply '!py-8 px-6';
  }

  &__list {
    @apply flex flex-col gap-2;
  }

  &__hint {
    @apply flex items-center;
  }

  &__button {
    @apply mt-6 w-full;
  }
}
</style>
