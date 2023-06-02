<script lang="ts" setup>
import { type VForm } from 'vuetify/components'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const form = ref<VForm | null>(null)

const { updateUserWithNewPassword, loginErrorMessage } = useAuth()

const emit = defineEmits<{
  (e: 'success'): void
}>()

const loading = ref(false)

const password = ref('')
const passwordConfirm = ref('')

const onSubmit = async () => {
  loading.value = true
  const { valid } = await form.value!.validate()

  if (!valid) {
    loading.value = false
    return
  }

  if (await updateUserWithNewPassword(password.value)) {
    emit('success')
  }

  loading.value = false
}

const { required, password_match, password_min } = useRules()

const passwordMatchRule = (v: string) => password_match(v, password.value)

defineExpose({
  form,
  onSubmit,
})

</script>

<script lang="ts">
export default { inheritAttrs: false }
</script>

<template>
  <VForm
    ref="form"
    class="r-form-reset-confirm__form"
    @submit.prevent="onSubmit"
  >
    <VTextField
      v-model="password"
      class="r-form-reset-confirm__password"
      :rules="[required, password_min]"
      type="password"
      :label="$t('auth.form.labels.password')"
      required
    />

    <VTextField
      v-model="passwordConfirm"
      class="r-form-reset-confirm__password-confirm"
      type="password"
      :rules="[required, passwordMatchRule]"
      :label="$t('auth.form.labels.password_confirm')"
      required
    />

    <VBtn
      type="submit"
      class="r-form-reset-confirm__submit-button"
      color="secondary"
      :loading="loading"
    >
      {{ $t('auth.reset_password.confirmTitle') }}
    </VBtn>
  </VForm>
</template>

<style lang="scss">
.r-form-reset-confirm {
  &__submit-button {
    @apply w-full;
  }

  &__form {
    @apply grid gap-2;
  }
}
</style>
