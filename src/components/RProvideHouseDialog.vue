<script lang="ts" setup>
import { mdiCheckCircle } from '@mdi/js'
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
  <VDialog
    v-model="proxiedModel"
    class="r-provide-house-dialog"
  >
    <VCard
      ref="cardRef"
    >
      <VCardText
        class="r-provide-house-dialog__text"
      >
        <div
          class="r-provide-house-dialog__title"
        >
          {{ $t('dialogs.provideHouse.title') }}
        </div>

        <div class="r-provide-house-dialog__description">
          {{ $t('dialogs.provideHouse.description') }}
        </div>

        <ul class="r-provide-house-dialog__list">
          <li
            v-for="(n, i) in 2"
            :key="i"
            class="r-provide-house-dialog__hint"
          >
            <VIcon
              color="secondary"
              :icon="mdiCheckCircle"
              :start="true"
            />
            <p>
              {{ $t(`dialogs.provideHouse.steps[${i}]`) }}
            </p>
          </li>
        </ul>

        <VBtn
          color="secondary"
          :ripple="false"
          class="r-provide-house-dialog__button"
        >
          <span>
            {{ $t('auth.login.title') }} / {{ $t('auth.register.title') }}
          </span>
        </VBtn>
      </VCardText>
    </VCard>
  </VDialog>
</template>

<style lang="scss">
.r-provide-house-dialog {
  @apply text-primary max-w-150;

  &__title {
    @apply text-2xl font-bold;
  }
  &__description {
    @apply my-4 text-lg;
  }
  &__text {
    @apply '!py-8 px-6';
  }
  &__list {
    @apply flex flex-col gap-2;
  }
  &__hint {
    @apply flex;
  }
  &__button {
    @apply mt-6 w-full;
  }
}
</style>
