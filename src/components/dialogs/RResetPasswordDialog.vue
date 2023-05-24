<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

const emit = defineEmits<{
  (e: 'reset'): void
}>()

const dialogs = useDialogs()

const { t } = useI18n()
const resetForm = ref()

const onReset = () => emit('reset')

</script>

<template>
  <RDialogWrapper
    v-model="dialogs.reset_password"
    max-width="40rem"
    :title="$t('dialog.reset_password.title')"
    class="r-auth__dialog"
  >
    <div class="r-auth">
      <div class="r-auth__form">
        <RResetPassword
          ref="resetForm"
          @success="onReset"
        />
      </div>
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
