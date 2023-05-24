<!-- eslint-disable import/first -->
<script lang="ts" setup>
import { type VForm } from 'vuetify/components'
import type { IRegisterData } from '@/types'

const props = defineProps<{
  loading?: boolean
}>()

const userForm = ref<VForm | null>(null)

const { registerErrorMessage } = useAuth()

const emit = defineEmits<{
  (e: 'submit', data: IRegisterData): void
}>()

const onSubmit = (data: IRegisterData) => emit('submit', data)

defineExpose({
  userForm,
  onSubmit,
})

</script>

<template>
  <RUserForm
    ref="userForm"
    :error-message="registerErrorMessage"
    :show-passwords="true"
    :loading="loading"
    :button-text="$t('auth.register.title')"
    @submit="onSubmit"
  />
</template>
