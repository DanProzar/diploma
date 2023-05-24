<script lang="ts" setup>
import { type VForm } from 'vuetify/components'
import { useVModel } from '@vueuse/core'
import type { IRLoginData } from '@/types'

const form = ref<VForm | null>(null)

const props = withDefaults(defineProps<{
  data: IRLoginData
  loading?: boolean
  errorMessage?: string | false
}>(), {
  loading: false,
  errorMessage: false,
})

const emit = defineEmits<{
  (e: 'update:data', data: IRLoginData): void
  (e: 'click', data: IRLoginData): void
  (e: 'reset'): void
}>()

const proxiedData = useVModel(props, 'data', emit)

const { required, email } = useRules()

const onSubmit = () => emit('click', proxiedData.value)

const onReset = () => emit('reset')

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
      v-model="proxiedData.email"
      class="r-form-login__email"
      type="email"
      label="E-mail"
      :rules="[required, email]"
      required
    />

    <VTextField
      v-model="proxiedData.password"
      class="r-form-login__password"
      type="password"
      animate="pulse"
      label="Пароль"
      :rules="[required]"
      required
    />

    <span v-if="errorMessage" class="r-auth__error">
      {{ errorMessage }}
    </span>

    <VBtn
      type="submit"
      class="r-form-login__submit-button"
      color="secondary"
    >
      {{ $t('auth.login.title') }}
    </VBtn>

    <a class="r-form-login__reset" @click="onReset">
      {{ $t('auth.form.forgot_password') }}
    </a>
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

  &__reset {
    @apply text-center mt-2;
  }
}
</style>
