<script lang="ts" setup>
const emit = defineEmits<{
  (e: 'success'): void
}>()

const dialogs = useDialogs()
const resetForm = ref()

const onReset = () => emit('success')

</script>

<template>
  <RDialogWrapper
    v-model="dialogs.reset_password"
    max-width="40rem"
    :title="$t('dialog.reset_password.confirmTitle')"
    class="r-auth__dialog"
  >
    <div class="r-auth">
      <div class="r-auth__form">
        <RResetPasswordConfirm
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
