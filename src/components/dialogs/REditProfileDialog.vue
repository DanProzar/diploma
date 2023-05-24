<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import type { IEditProfileData } from '@/types'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'edit'): void
}>()

const { user } = useAuth()

const loading = ref(false)
const proxiedModel = useVModel(props, 'modelValue', emit)
const userForm = ref()

const data = computed(() => Object.assign(
  user.value?.user_metadata || {},
  {
    email: user.value?.email,
  },
))

const { editProfile, editProfileErrorMessage } = useUserProfile()

const onEditProfile = async (data: IEditProfileData) => {
  loading.value = true

  const { valid } = await userForm.value.form!.validate()

  if (!valid) {
    loading.value = false
    return
  }

  if (await editProfile(data)) {
    emit('edit')
  }

  loading.value = false
}

</script>

<template>
  <RDialogWrapper
    v-model="proxiedModel"
    max-width="40rem"
    :title="$t('dialog.edit_profile.title')"
    class="r-edit-profile__dialog"
  >
    <RUserForm
      ref="userForm"
      :error-message="editProfileErrorMessage"
      :show-passwords="false"
      :data="data"
      :loading="loading"
      :button-text="$t('dialog.edit_profile.button')"
      @submit="onEditProfile"
    >
      <template #appendField>
        
      </template>
    </RUserForm>
  </RDialogWrapper>
</template>

<style lang="scss">
.r-edit-profile {
  &__form {
    @apply grid md:grid-cols-2 gap-x-6 gap-y-1 mt-6;
  }

  &__submit-button {
    @apply w-full col-span-2 mt-4;
  }
}
</style>
