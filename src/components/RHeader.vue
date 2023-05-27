<script lang="ts" setup>
import { mdiAccount } from '@mdi/js'
import { useMounted } from '@vueuse/core'

const props = withDefaults(defineProps<{
  dark?: boolean
}>(), {
  dark: true,
})

const dialogs = useDialogs()
const router = useRouter()

const { user, signOut } = useAuth()

const route = useRoute()

const onClickProvide = () => {
  dialogs.value.welcome = true
}

const onClickFind = () => {
  router.push('/houses')
}

const onGoToAccount = () => {
  navigateTo('/account')
}

const isAccountPage = computed(() => route.name === 'account')
const computedColor = computed(() => props.dark ? 'white' : 'primary')

const mounted = useMounted()

const onLogout = async () => {
  if (await signOut()) {
    router.push('/')
  }
}

</script>

<template>
  <header
    :class="[
      'r-header',
      {
        'is-dark': dark,
      }
    ]"
  >
    <div class="tw-r-container">
      <div class="r-header__header">
        <div class="r-header__logo">
          <RImage
            :src="useCdnURL('header/logo.png')"
            :aspect-ratio="1"
            to="/"
          />
        </div>
        <div v-if="mounted" class="r-header__actions">
          <VBtn
            :color="computedColor"
            variant="outlined"
            @click="onClickFind"
          >
            {{ $t('auth.refugee.title') }}
          </VBtn>

          <template v-if="user">
            <a v-if="isAccountPage" @click="onLogout">
              {{ $t('auth.logout.title') }}
            </a>

            <VIcon
              v-else
              :color="computedColor"
              :icon="mdiAccount"
              :size="36"
              @click="onGoToAccount"
            />
          </template>

          <VBtn
            v-else
            :color="computedColor"
            variant="outlined"
            @click="onClickProvide"
          >
            {{ $t('auth.householder.title') }}
          </VBtn>
        </div>
      </div>
    </div>
  </header>
</template>

<style lang="scss">
.r-header {
  @apply static top-0 left-0 right-0 z-5;

  &__header {
    @apply py-4 flex items-center justify-between gap-4;
  }

  &__logo {
    @apply max-w-15 max-h-15 flex-shrink-0;

    img {
      @apply w-full h-full object-contain select-none;
    }
  }

  &__actions {
    @apply flex gap-4 items-center;
  }
}
</style>
