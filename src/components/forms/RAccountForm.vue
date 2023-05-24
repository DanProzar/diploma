<script lang="ts" setup>
import { mdiPencil } from '@mdi/js'
import { asyncComputed } from '@vueuse/core'
import type { IRHouseAccount } from '@/types'

const props = withDefaults(defineProps<{
  user: IRHouseAccount
  editableAvatar?: boolean
}>(), {
  editableAvatar: false,
})

// const { user } = useAuth()
const dialogs = useDialogs()
const defaultAvatar = useCdnURL('avatars/default.png')
const { isAvatarSet } = useUserProfile()

const computedAvatarSrc = asyncComputed(async () => {
  if (!await isAvatarSet()) {
    return defaultAvatar
  }

  return useCdnURL(`avatars/${props.user.id}`)
}, defaultAvatar)

const userData = computed(() => props.user.data)

const onEditAvatar = () => {
  if (props.editableAvatar) {
    dialogs.value.editAvatar = true
  }
}

</script>

<template>
  <div
    v-if="user"
    :class="[
      'r-account-form',
      {
        'r-account-form--editable': editableAvatar,
      },
    ]"
  >
    <div class="r-account-form__top">
      <div class="r-account-form__avatar">
        <RImage
          ref="imageRef"
          class="r-account-form__avatar-img"
          :src="computedAvatarSrc"
          :aspect-ratio="1"
          :contain="true"
          alt="avatar"
        />

        <VBtn
          v-if="editableAvatar"
          class="r-account-form__avatar-edit"
          color="white"
          :icon="mdiPencil"
          @click="onEditAvatar"
        />
      </div>
      <div v-if="userData" class="r-account-form__initials">
        <p class="r-account-form__name">
          {{ userData.name }}
        </p>

        <p class="r-account-form__surname">
          {{ userData.surname }}
        </p>
      </div>
    </div>

    <div class="r-account-form__bottom">
      <table class="r-account-form__info" cellspacing="0">
        <tbody>
          <tr class="r-account-form__info-item">
            <td><b>{{ $t('auth.form.labels.phone') }}</b></td>
            <td><a :href="`tel:${userData.phone.replace('+', '0')}`">{{ userData.phone }}</a></td>
          </tr>

          <tr class="r-account-form__info-item">
            <td><b>{{ $t('auth.form.labels.email') }}</b></td>
            <td><a :href="`mailto:${userData.email}`">{{ userData.email }}</a></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style lang="scss">
.r-account-form {
  &__avatar {
    @apply relative overflow-visible;

    &-img {
      @apply w-15 h-15 rounded-1/2;
    }

    &-cropper {
      @apply w-50 h-50 rounded-1/2;
    }

    &-edit {
      @apply
      transform
      absolute
      '!w-8'
      '!h-8'
      text-xs
      -right-2
      -top-2
      shadow
      shadow-primary
      transition
      transition-transform
      scale-0;
    }

    &:hover {
      .r-account-form__avatar-edit {
        @apply scale-100 '!w-8' '!h-8';
      }
    }
  }

  &__top {
    @apply flex gap-4 items-center;

    p {
      @apply text-primary text-lg;
    }
  }

  &__info {
    @apply my-6 border-separate;
    border-spacing: 0 0.5rem;
    &-item {
      @apply not-last:(mb-4);
      td {
        @apply text-base first:(w-100);
        b {
          @apply capitalize text-lg;
        }
      }
    }
  }
}
</style>
