<script lang="ts" setup>
import { useVModel } from '@vueuse/core'

const props = defineProps<{
  modelValue: boolean
}>()

const { houseIdToDelete } = useHouses()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'close'): void
}>()

const proxiedModelValue = useVModel(props, 'modelValue', emit)
const loading = ref(false)

const { deleteHouse } = useHouses()

const onClose = () => {
  proxiedModelValue.value = false
}

const onDeleteHouse = async () => {
  if (!houseIdToDelete.value) {
    return
  }

  loading.value = true
  await deleteHouse(houseIdToDelete.value)
  loading.value = false
  houseIdToDelete.value = null

  onClose()
}

</script>

<script lang="ts">
export default { inheritAttrs: false }
</script>

<template>
  <RDialogWrapper
    v-model="proxiedModelValue"
    class="r-delete-house-dialog"
    max-width="24rem"
    :title="$t('dialog.deleteHouse.title')"
  >
    <p>{{ $t('dialog.deleteHouse.text') }}</p>

    <template #footer>
      <div class="r-delete-house-dialog__actions">
        <VBtn
          variant="flat"
          color="error"
          :loading="loading"
          @click="onDeleteHouse"
        >
          {{ $t('dialog.deleteHouse.yes') }}
        </VBtn>

        <VBtn
          variant="flat"
          color="secondary"
          @click="onClose"
        >
          {{ $t('dialog.deleteHouse.no') }}
        </VBtn>
      </div>
    </template>
  </RDialogWrapper>
</template>

<style lang="scss">
.r-delete-house-dialog {
  &__actions {
    @apply w-full grid grid-cols-2 gap-4;
  }
}
</style>
