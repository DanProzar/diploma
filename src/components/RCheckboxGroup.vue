<script lang="ts" setup>
import { useVModel } from '@vueuse/core'
import type { IRCheckboxGroupItem } from '~/types'

const props = defineProps<{
  modelValue: IRCheckboxGroupItem['value']
  data: IRCheckboxGroupItem[]
  label?: string
  color?: string
  rules: (() => true | string)[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', data: IRCheckboxGroupItem['value']): void
}>()

const proxiedModelValue = useVModel(props, 'modelValue', emit)
const proxiedData = toRef(props, 'data')

const computedColor = computed(() => props.color || 'primary')

</script>

<script lang="ts">
export default { inheritAttrs: false }
</script>

<template>
  <VRadioGroup
    v-model="proxiedModelValue"
    :label="label"
    :rules="rules"
    class="r-checkbox-group"
  >
    <VRadio
      v-for="(checkbox, i) in proxiedData"
      :key="i"
      :label="checkbox.label"
      :value="checkbox.value"
      :color="computedColor"
      :hide-details="true"
    />
  </VRadioGroup>
</template>

<style lang="scss">
.r-checkbox-group {
  .v-selection-control {
    --v-input-control-height: 32px !important;
  }
}
</style>
