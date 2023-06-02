<script lang="ts" setup>
const { user, supabase } = useAuth()
const router = useRouter()
const route = useRoute()

const dialogs = useDialogs()

const computedUser = computed(() => {
  return {
    id: user.value?.id,
    data: {
      email: user.value?.email,
      ...user.value?.user_metadata,
    },
  }
})

const onEditProfile = () => {
  dialogs.value.editProfile = true
}

if (Object.keys(route.query).includes('redirect')) {
  dialogs.value.reset_confirm = true
}

onMounted(async () => {
  const { data: { session } } = await supabase.auth.getSession()

  if (!session?.user) {
    router.push('/')
  }
})

</script>

<template>
  <div v-if="user" class="r-account__page">
    <RHeader :dark="false" />

    <div class="tw-r-container">
      <div class="r-account__wrapper">
        <div class="r-account__form">
          <RAccountForm
            :user="computedUser"
            :editable-avatar="true"
          />
          <VBtn
            color="warning"
            @click="onEditProfile"
          >
            {{ $t('user.profile.edit') }}
          </VBtn>
        </div>

        <RHousesDashboard class="r-account__houses-panel" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.r-account {
  &__wrapper {
    @apply
    grid
    gap-6
    tw-r-section
    items-start
    xl:grid-cols-[2fr,5fr];

    place-items: inherit;

    & > div {
      @apply p-6;
    }
  }

  &__form {
    @apply border-[1px] border-primary;
  }

  &__houses-panel {
    @apply border-[1px] border-primary;
  }

}
</style>
