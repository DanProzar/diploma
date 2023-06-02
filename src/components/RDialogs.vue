<script lang="ts" setup>

const dialogs = useDialogs()

const onGoToAuthDialog = () => {
  dialogs.value.auth = true
}

const onLogin = () => {
  dialogs.value.auth = false

  navigateTo('/account')
}

const onRegister = () => {
  dialogs.value.auth = false
}

const onGoToReset = () => {
  dialogs.value.auth = false
  dialogs.value.reset_password = true
}

const onResetPassword = () => {
  dialogs.value.reset_password = false
  dialogs.value.reset_message = true
}

const onEditProfile = () => {
  dialogs.value.editProfile = false
}

const onAddHouse = () => {
  dialogs.value.addHouse = false
}

const onEditHouse = () => {
  dialogs.value.editHouse = false
}

const onDeleteHouse = () => {
  dialogs.value.deleteHouse = false
}

const onEditAvatar = () => {
  dialogs.value.editAvatar = false
}

const onUpdatePassword = () => {
  dialogs.value.reset_confirm = false
}

</script>

<template>
  <RWelcomeDialog
    v-model="dialogs.welcome"
    @close="onGoToAuthDialog"
  />

  <RAuthDialog
    v-model="dialogs.auth"
    @login="onLogin"
    @register="onRegister"
    @reset="onGoToReset"
  />

  <RResetPasswordDialog
    v-model="dialogs.reset_password"
    @reset="onResetPassword"
  />

  <REditAvatarDialog
    v-model="dialogs.editAvatar"
    @cropped="onEditAvatar"
  />

  <REditProfileDialog
    v-model="dialogs.editProfile"
    @edit="onEditProfile"
  />

  <RAddHouseDialog
    v-model="dialogs.addHouse"
    @close="onAddHouse"
  />

  <REditHouseDialog
    v-model="dialogs.editHouse"
    @close="onEditHouse"
  />

  <RDeleteHouseDialog
    v-model="dialogs.deleteHouse"
    @close="onDeleteHouse"
  />

  <RResetMessageDialog
    v-model="dialogs.reset_message"
  />

  <RResetConfirmDialog
    v-model="dialogs.reset_confirm"
    @success="onUpdatePassword"
  />
</template>
