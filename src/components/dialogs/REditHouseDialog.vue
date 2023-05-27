<script lang="ts" setup>
import { useVModel } from '@vueuse/core'
import type { IRHouseData, IRHouseFormSubmitData, IRHouseImage } from '@/types'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'close'): void
}>()

const { editHouseData, houseIdToEdit, houses, currentHouseImages } = useHouses()

const proxiedModelValue = useVModel(props, 'modelValue', emit)

const loading = ref(false)

const { edit } = useHouses()

const onSubmit = async (data: IRHouseFormSubmitData) => {
  loading.value = true

  delete data.data.media

  await edit(data)

  loading.value = false

  houseIdToEdit.value = null
  emit('close')
}

</script>

<script lang="ts">
export default { inheritAttrs: false }
</script>

<template>
  <RDialogWrapper
    v-model="proxiedModelValue"
    class="r-edit-house-dialog"
    max-width="64rem"
    :title="$t('dialog.editHouse.title')"
  >
    <RHouseForm
      :data="editHouseData"
      :button-text="$t('user.account.houses.edit')"
      :loading="loading"
      :images="currentHouseImages"
      @submit="onSubmit"
    />
  </RDialogWrapper>
</template>
