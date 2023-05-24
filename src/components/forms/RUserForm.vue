<!-- eslint-disable import/first -->
<script lang="ts" setup>
// eslint-disable-next-line import/order
import { type VForm } from 'vuetify/components'
import type { IRegisterData } from '@/types'

const props = withDefaults(defineProps<{
  loading?: boolean
  showPasswords?: boolean
  errorMessage?: string
  buttonText: string
  data?: Partial<IRegisterData>
}>(), {
  showPasswords: true,
})

const form = ref<VForm | null>(null)

const emit = defineEmits<{
  (e: 'submit', data: Partial<IRegisterData>): void
}>()

const data = reactive({
  email: props.data?.email || '',
  password: '',
  password_confirm: '',
  name: props.data?.name || '',
  surname: props.data?.surname || '',
  phone: props.data?.phone || '',
})

const onSubmit = () => emit('submit', data)

const { required, email, password_match, password_min } = useRules()

const passwordMatchRule = (v: string) => password_match(v, data.password)

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
    :class="['r-user-form__form', $attrs.class]"
    @submit.prevent="onSubmit"
  >
    <slot name="append" />

    <div class="r-user-form__form-wrapper">
      <VTextField
        v-model="data.name"
        class="r-user-form__name"
        type="text"
        :rules="[required]"
        :label="$t('auth.form.labels.name')"
        required
      />

      <VTextField
        v-model="data.surname"
        class="r-user-form__surname"
        type="text"
        :rules="[required]"
        :label="$t('auth.form.labels.surname')"
        required
      />

      <VTextField
        v-model="data.phone"
        v-mask="'+38 (0##) ### ####'"
        class="r-user-form__phone"
        type="text"
        :rules="[required]"
        :label="$t('auth.form.labels.phone')"
        required
      />

      <VTextField
        v-model="data.email"
        class="r-user-form__email"
        type="email"
        :rules="[required, email]"
        :label="$t('auth.form.labels.email')"
        required
      />

      <template v-if="showPasswords">
        <VTextField
          v-model="data.password"
          class="r-user-form__password"
          :rules="[required, password_min]"
          type="password"
          :label="$t('auth.form.labels.password')"
          required
        />

        <VTextField
          v-model="data.password_confirm"
          class="r-user-form__password-confirm"
          type="password"
          :rules="[required, passwordMatchRule]"
          :label="$t('auth.form.labels.password_confirm')"
          required
        />
      </template>

      <slot name="additionalField" />

      <span v-if="errorMessage" class="r-auth__error">
        {{ errorMessage }}
      </span>

      <VBtn
        type="submit"
        class="r-user-form__submit-button"
        color="secondary"
        :loading="loading"
      >
        {{ buttonText }}
      </VBtn>
    </div>
  </VForm>
</template>

<style lang="scss">
.r-user-form {
  &__form-wrapper {
    @apply grid md:grid-cols-2 gap-x-6 gap-y-1;
  }

  &__submit-button {
    @apply w-full col-span-2 mt-4;
  }
}
</style>
