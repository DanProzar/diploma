<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { useVModel } from '@vueuse/core'
import { AUTH_TYPE } from '@/types'
import type { IRLoginData, IRegisterData } from '@/types'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'login'): void
  (e: 'register'): void
  (e: 'reset'): void
}>()

const proxiedModel = useVModel(props, 'modelValue', emit)

const { t } = useI18n()
const { signUp, signIn, loginErrorMessage } = useAuth()

const chosenMethod = ref(AUTH_TYPE.Login)

const loginForm = ref()
const registerForm = ref()

const registerLoading = ref(false)
const loginLoading = ref(false)

const loginData = reactive<IRLoginData>({
  email: '',
  password: '',
})

const isLogin = computed(() => chosenMethod.value === AUTH_TYPE.Login)
const isRegister = computed(() => chosenMethod.value === AUTH_TYPE.Register)

const computedTitle = computed(() => {
  if (isLogin.value) {
    return t('dialog.login.title')
  } else if (isRegister.value) {
    return t('dialog.register.title')
  }

  return ''
})

const onGoRegister = () => {
  chosenMethod.value = AUTH_TYPE.Register
}

const onGoLogin = () => {
  chosenMethod.value = AUTH_TYPE.Login
}

const onReset = () => emit('reset')

const computedLoginErrorMessage = computed(() => {
  switch (loginErrorMessage.value) {
    case 'Email not confirmed': return t('auth.form.error_messages.email_is_not_confirmed')
    case 'Invalid login credentials': return t('auth.form.error_messages.invalid_credentioals')
    default: return loginErrorMessage.value
  }
})

const onLogin = async (data: IRLoginData) => {
  loginLoading.value = true

  const { valid } = await loginForm.value.form!.validate()

  if (!valid) {
    loginLoading.value = false
    return
  }

  if (await signIn(data)) {
    emit('login')
  }

  loginLoading.value = false
}

const onRegister = async (data: IRegisterData) => {
  registerLoading.value = true
  const { valid } = await registerForm.value.userForm.form!.validate()

  if (!valid) {
    registerLoading.value = false
    return
  }

  if (await signUp(data)) {
    emit('register')
  }

  registerLoading.value = false
}

watch(
  loginData,
  () => {
    loginErrorMessage.value = false
  },
)

</script>

<template>
  <RDialogWrapper
    v-model="proxiedModel"
    max-width="40rem"
    :title="computedTitle"
    class="r-auth__dialog"
  >
    <div class="r-auth">
      <div class="r-auth__form">
        <RLoginForm
          v-if="isLogin"
          ref="loginForm"
          v-model:data="loginData"
          :loading="loginLoading"
          :error-message="computedLoginErrorMessage"
          @click="onLogin"
          @reset="onReset"
        />

        <RRegiterForm
          v-else-if="isRegister"
          ref="registerForm"
          :loading="registerLoading"
          @submit="onRegister"
        />
      </div>

      <p class="r-auth__hint">
        <template v-if="isLogin">
          <span>{{ $t('auth.form.links.register[0]') }}</span>&nbsp;
          <a @click="onGoRegister">{{ $t('auth.form.links.register[1]') }}</a>
        </template>

        <template v-else-if="isRegister">
          <span>{{ $t('auth.form.links.login[0]') }}</span>&nbsp;
          <a @click="onGoLogin">{{ $t('auth.form.links.login[1]') }}</a>
        </template>
      </p>
    </div>
  </RDialogWrapper>
</template>

<style lang="scss">
.r-auth {
  &__form {
    @apply mt-4;
  }

  &__hint {
    @apply mt-4 text-center;
  }

  &__error {
    @apply tw-r-error font-bold block text-sm;
  }
}
</style>
