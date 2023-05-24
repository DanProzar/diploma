<script lang="ts" setup>
import { useVModel } from '@vueuse/core'
import { mdiClose } from '@mdi/js'

const props = withDefaults(defineProps<{
  modelValue: boolean
  title?: boolean | string
  contentClass?: string
  maxWidth?: number | string
  persistent?: boolean
}>(), {
  title: true,
  maxWidth: '100%',
  persistent: true,
  contentClass: '',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const isTitleBoolean = computed(() => typeof props.title === 'boolean')
const proxiedModel = useVModel(props, 'modelValue', emit)

const onClose = () => {
  proxiedModel.value = false
}

</script>

<script lang="ts">
export default { inheritAttrs: false }
</script>

<template>
  <VDialog
    v-model="proxiedModel"
    :max-width="maxWidth"
    :persistent="persistent"
    :class="['r-dialog', $attrs.class]"
  >
    <VCard
      class="r-dialog__card"
    >
      <VBtn
        class="r-dialog__close"
        :icon="mdiClose"
        @click="onClose"
      />

      <VCardText
        :class="['r-dialog__content', contentClass]"
      >
        <template v-if="title">
          <slot v-if="isTitleBoolean" name="title" />

          <div
            v-else
            class="r-dialog__title"
          >
            {{ title }}
          </div>
        </template>

        <slot />
      </VCardText>

      <VCardActions v-if="$slots.footer">
        <slot name="footer" />
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<style lang="scss">
.r-dialog {
  &__title {
    @apply text-2xl font-bold;
  }
  &__card {
    @apply '!relative';
  }
  &__close {
    @apply '!absolute' right-1 top-1 '!shadow-none';
  }
}
</style>
