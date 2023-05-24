<script lang="ts" setup>
import { type VForm } from 'vuetify/components'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const form = ref<VForm | null>(null)

const { resetPasswordWithEmail, loginErrorMessage } = useAuth()

const emit = defineEmits<{
  (e: 'success'): void
}>()

const email = ref('')

const loading = ref(false)

const onSubmit = async () => {
  loading.value = true
  const { valid } = await form.value!.validate()

  if (!valid) {
    loading.value = false
    return
  }

  if (await resetPasswordWithEmail(email.value)) {
    emit('success')
  }

  loading.value = false
}

const computedErrorMessage = computed(() => {
  switch (loginErrorMessage.value) {
    case 'Email not confirmed': return t('auth.form.error_messages.email_is_not_confirmed')
    case 'Invalid login credentials': return t('auth.form.error_messages.invalid_credentioals')
    default: return loginErrorMessage.value
  }
})

const { required, email: emailRule } = useRules()

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
    class="r-form-login__form"
    @submit.prevent="onSubmit"
  >
    <VTextField
      v-model="email"
      class="r-form-login__email"
      type="email"
      label="E-mail"
      :rules="[required, emailRule]"
      required
    />

    <span v-if="computedErrorMessage" class="r-auth__error">
      {{ computedErrorMessage }}
    </span>

    <VBtn
      type="submit"
      class="r-form-login__submit-button"
      color="secondary"
    >
      {{ $t('auth.reset_password.title') }}
    </VBtn>
  </VForm>
</template>

<style lang="scss">
.r-form-login {
  &__submit-button {
    @apply w-full;
  }

  &__form {
    @apply grid gap-2;
  }
}
</style>
