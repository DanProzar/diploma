<script lang="ts" setup>
import { useVModel } from '@vueuse/core'
import type { IRHouseData, IRHouseFormSubmitData } from '@/types'

const props = defineProps<{
  modelValue: boolean
}>()

const formData = reactive<IRHouseData>({
  title: '',
  description: '',
  media: [],
  location: {
    houseNumber: null,
    street: null,
    city: null,
    district: null,
    coords: null,
  },
  count_people: 0,
  type: null,
  term: null,
  has_refugees: false,
  place_id: '',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'close'): void
}>()

const proxiedModelValue = useVModel(props, 'modelValue', emit)
const loading = ref(false)

const { add } = useHouses()

const onSubmit = async (data: IRHouseFormSubmitData) => {
  loading.value = true

  await add(data)

  loading.value = false

  emit('close')
}

</script>

<script lang="ts">
export default { inheritAttrs: false }
</script>

<template>
  <RDialogWrapper
    v-model="proxiedModelValue"
    class="r-add-house-dialog"
    max-width="64rem"
    :title="$t('dialog.addHouse.title')"
  >
    <RHouseForm
      :data="formData"
      :button-text="$t('user.account.houses.add')"
      :loading="loading"
      @submit="onSubmit"
    />
  </RDialogWrapper>
</template>
